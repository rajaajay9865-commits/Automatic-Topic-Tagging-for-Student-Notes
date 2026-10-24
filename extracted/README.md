# NoteWise — Automatic Topic Tagging for Student Notes

An educational capstone prototype that suggests useful topic tags for student notes and lets the student correct them. The interface is a static, browser-based demo; the evaluation script compares a transparent keyword baseline with a TF-IDF multi-label classifier.

## Run the prototype

1. Open `index.html` in a current browser. No server or installation is needed.
2. Sign in with **student@demo.com** and **learn123**.
3. Search notes, choose a topic in the sidebar, add a note, or select a note and edit its topic chips.
4. Select **Reset to suggestions** to discard manual tag edits for that note.

The sign-in is a demo gate only: the credentials and app code are visible to the user, and it is not suitable for protecting private data. Notes and corrections are saved in this browser's local storage. Do not enter sensitive or real student information.

## Reproduce the model comparison

Use Python 3.10+ and install the free, open-source dependencies:

```powershell
python -m pip install -r requirements.txt
python train_evaluate.py
```

The script reads the manually labelled `notes.csv`, cleans markup while preserving headings/technical text, creates a fixed seeded holdout split, and reports micro precision, recall, F1, per-tag scores, and held-out error examples for the keyword and TF-IDF models. Small-sample scores are illustrative and vary in meaning with the sample; do not present them as evidence of production performance.

## Project materials

- `taxonomy.json` — compact taxonomy with tag definitions and include/exclude guidance.
- `notes.csv` — 30 original, manually labelled educational examples, including multi-topic, short, code-heavy, and unfamiliar/technical examples.
- `train_evaluate.py` — reproducible preprocessing, baseline, TF-IDF model, evaluation, and error inspection.
- `user-guide.md` — prototype and correction guide.
- `final-report.md` — project question, methods, limitations, and results template.
- `presentation.md` — concise presentation outline.

## Free tools used / suitable

Python, pandas, scikit-learn, and a modern web browser. The prototype's HTML/CSS/JavaScript runs without a paid service, API key, or external AI model. Fonts use Google Fonts if internet access is available; the interface falls back to local sans-serif fonts offline.

## Reproducibility and permissions

All sample notes are short, original educational examples written for this project; no external source text is included. The labelled sample and taxonomy are included in this folder. The split seed and model threshold are constants near the top of `train_evaluate.py`. Python package versions are specified as minimums in `requirements.txt`.
