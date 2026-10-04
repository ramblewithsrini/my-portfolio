# MDM engine — Python edition

The Python twin of the interactive MDM playground on my website
(`/lab/mdm`, built in TypeScript in `src/lib/mdm.ts`).

Both implementations read the **same sample data**
(`src/data/mdm-sample.json`) and must produce **identical results**:

- the Python tests check the engine against `src/data/mdm-parity.json`, and
- the website build checks the TypeScript engine against the same file,
  failing if the two ever disagree.

It illustrates master data management concepts — probabilistic matching,
survivorship and householding — with fictional data. It is not any
employer's algorithm.

## Files

| File | What it is |
| --- | --- |
| `mdm.py` | The engine: normalising, matching, clustering, survivorship, households |
| `test_mdm.py` | Tests, including parity with the TypeScript engine |
| `export_parity.py` | Regenerates `src/data/mdm-parity.json` |
| `mdm_walkthrough.ipynb` | A step-by-step notebook walkthrough with pandas |

## Run it

From the repository root:

```bash
python -m pip install -r python/requirements.txt
python python/mdm.py                 # one-line summary
python -m pytest python              # run the tests
python python/export_parity.py       # after changing the engine or the data
```

Open the notebook with `jupyter notebook python/mdm_walkthrough.ipynb`,
or just read it on GitHub.

Built with Claude Code; reviewed and understood by me.
