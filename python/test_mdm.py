"""Tests for the Python MDM engine. Run with:  python -m pytest python"""

import json

import pytest

from mdm import (
    ROOT,
    field_scores,
    household_key,
    jaro_winkler,
    load_sample,
    normalise_address,
    parse_dob,
    run,
    standardise_address,
)

RECORDS, DEFAULTS = load_sample()
BY_ID = {r["id"]: r for r in RECORDS}


def default_run(**overrides):
    thresholds = {**DEFAULTS["thresholds"], **overrides.get("thresholds", {})}
    rules = {**DEFAULTS["survivorship"], **overrides.get("rules", {})}
    return run(RECORDS, DEFAULTS["weights"], thresholds, rules)


# ------------------------------------------------------------------ building blocks

@pytest.mark.parametrize("raw", ["1980-03-12", "12/03/1980", "12-03-1980"])
def test_dates_in_any_format_parse_the_same(raw):
    assert parse_dob(raw) == (1980, 3, 12)


def test_addresses_normalise_abbreviations_and_postcodes():
    a = normalise_address("14 Oak Ln, Leeds LS1 4AB")
    assert a["postcode"] == "LS14AB"
    assert a["house"] == "14"
    assert "lane" in a["tokens"]
    assert household_key("14 Oak Lane LS14AB") == household_key("14 Oak Ln, Leeds LS1 4AB")


def test_standardised_address_is_readable():
    assert standardise_address("3 Mill St, York YO1 6AA") == "3 Mill Street York, YO1 6AA"


def test_jaro_winkler_rewards_small_typos():
    assert jaro_winkler("smith", "smith") == 1
    assert jaro_winkler("smith", "smyth") > 0.85
    assert jaro_winkler("smith", "evans") < 0.5


def test_missing_email_does_not_count_against_a_match():
    scores = field_scores(BY_ID["P1"], BY_ID["C1"])  # C1 has no email
    assert scores["email"] is None


# ------------------------------------------------------------------ behaviour

def test_name_variants_of_the_same_person_merge():
    golden_ids = [g["id"] for g in default_run()["golden"]]
    assert "P1+C1+W1" in golden_ids  # Jonathan / Jon / J. Smyth


def test_similar_names_at_one_address_go_to_review_not_merge():
    result = default_run()
    pair = next(p for p in result["pairs"] if {p["a"], p["b"]} == {"W3", "C3"})
    assert pair["decision"] == "review"  # Daniel and Danielle Evans


def test_a_lower_threshold_creates_a_false_match():
    result = default_run(thresholds={"auto": 80})
    golden_ids = [g["id"] for g in result["golden"]]
    assert "W3+C3" in golden_ids  # the trade-off the playground demonstrates


def test_most_complete_name_ignores_typos():
    golden = {g["id"]: g for g in default_run()["golden"]}
    assert golden["P3+C2"]["name"] == "Priya Patel"  # not "Priya Patell"


def test_survivorship_rule_changes_the_household():
    recent = default_run(thresholds={"auto": 80})
    trusted = default_run(thresholds={"auto": 80}, rules={"address": "most-trusted"})
    sarah_recent = next(g for g in recent["golden"] if g["id"] == "P2+W2")
    sarah_trusted = next(g for g in trusted["golden"] if g["id"] == "P2+W2")
    assert "Elm Road" in sarah_recent["address"]
    assert "Oak Lane" in sarah_trusted["address"]


def test_default_summary():
    assert default_run()["summary"] == {"records": 10, "customers": 7, "households": 4, "review": 2}


# ------------------------------------------------------------------ parity with TypeScript

def test_committed_parity_file_matches_this_engine():
    """The website compares these committed results with the TypeScript engine.
    If this fails, run:  python python/export_parity.py"""
    committed = json.loads((ROOT / "src" / "data" / "mdm-parity.json").read_text(encoding="utf-8"))
    assert committed == default_run()
