# Presentation outline — NoteWise

## Slide 1 — The problem
- Students create notes faster than they organise them.
- Can a system suggest helpful topics and still let students correct mistakes?

## Slide 2 — The solution
- NoteWise: searchable notes, compact subject tags, and an editable suggestion workflow.
- Seven tags: Algebra, Biology, Chemistry, Computer Science, Physics, History, Writing.

## Slide 3 — Data and preparation
- 30 original, manually labelled examples; source permission is clear because the examples were written for this project.
- Includes multi-topic notes, short notes, code, symbols, and technical vocabulary.
- Preserve headings and technical content; clean only markup and whitespace.

## Slide 4 — Methods
- Explainable keyword/rule baseline.
- Comparison: word uni-/bi-gram TF-IDF with one-vs-rest logistic regression.
- Fixed 70/30 split, seed 28; threshold 0.35; multiple topics per note.

## Slide 5 — Results
- Run `python train_evaluate.py` and paste the measured micro and per-topic precision/recall/F1.
- Show one false positive and one false negative printed by the script.
- Discuss why overlapping topics and short notes are difficult.

## Slide 6 — Human control and demo
- Search, filter, create notes, add/remove tags, and reset suggestions.
- Manual choices override suggestions and persist locally.
- Demo login: student@demo.com / learn123. This is not real authentication.

## Slide 7 — Limitations and next steps
- Small synthetic-style sample is not representative; scores are illustrative.
- Collect permitted notes, double-label them, use a larger held-out test set, and tune thresholds.
- Treat every tag as a suggestion; protect privacy in any real deployment.
