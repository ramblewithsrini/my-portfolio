"""Write the Python engine's results with the default settings to
src/data/mdm-parity.json.

The website build compares these results with the TypeScript engine's and
fails if they differ, so the two implementations can never drift apart.
Run this after changing either the engine or the sample data:

    python python/export_parity.py
"""

import json

from mdm import ROOT, load_sample, run

OUTPUT = ROOT / "src" / "data" / "mdm-parity.json"

if __name__ == "__main__":
    records, defaults = load_sample()
    result = run(records, defaults["weights"], defaults["thresholds"], defaults["survivorship"])
    OUTPUT.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT)}: {result['summary']}")
