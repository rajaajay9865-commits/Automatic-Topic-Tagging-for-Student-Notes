# Final report — Automatic Topic Tagging for Student Notes

## Project question

Can a text-processing system assign useful topic tags to student notes while allowing users to correct mistakes?

## Summary

NoteWise is a small, multi-label tagging prototype. A transparent keyword/rule baseline proposes topics, a TF-IDF one-vs-rest classifier provides an offline comparison, and a browser interface lets a student search notes and directly override any suggestion. The system treats all automatic tags as suggestions, never as authoritative labels.

## Taxonomy

Seven compact tags are defined in `taxonomy.json`: Algebra, Biology, Chemistry, Computer Science, Physics, History, and Writing. Definitions include example subjects and exclusions. Notes may have zero, one, or several topics. Overlap is intentional where a note substantively spans disciplines—for example, Newton's law plus its equation (Physics + Algebra), or a history essay that analyses sources (History + Writing).

## Data, permissions, and labels

`notes.csv` contains 30 original examples written for this project; no external educational text is reproduced. Each example was manually assigned one or more gold tags. The set deliberately includes short notes, code-heavy notes, scientific symbols, unfamiliar technical terms, and overlapping subjects. These examples are a small classroom-style demonstration set, not a representative sample of a school's notes.

## Preprocessing and methods

The Python pipeline removes simple Markdown emphasis and heading markers and normalises whitespace. It keeps heading words, code, symbols, units, and technical terms because these may be useful signals.

1. **Baseline:** each taxonomy tag has a transparent list of subject-specific cues; every matching tag is returned. This supports multiple labels and makes suggestions explainable, but ambiguous words and unseen terminology can cause errors.
2. **Comparison:** word uni-/bigrams are TF-IDF weighted and passed to independent logistic-regression classifiers (one-vs-rest). A 0.35 probability threshold permits multiple tags. This learns from the labelled examples but can overfit such a small dataset.
3. **Evaluation:** `train_evaluate.py` uses a deterministic 70/30 train/test split (seed 28). It reports micro precision, recall, F1 and per-topic precision/recall/F1, then prints TF-IDF false positives and false negatives. It also prints keyword outputs for short/code-style samples.

## Results and error analysis

Run `python train_evaluate.py` to produce the measured results for this fixed split. Record the exact console output here before submission:

| Method | Micro precision | Micro recall | Micro F1 |
|---|---:|---:|---:|
| Keyword/rule baseline | _Run script_ | _Run script_ | _Run script_ |
| TF-IDF one-vs-rest | _Run script_ | _Run script_ | _Run script_ |

The script prints per-tag scores and concrete TF-IDF errors. Review errors involving overlapping labels carefully: a missed secondary tag may be less harmful than a confidently wrong primary topic, and gold labels can themselves be ambiguous. Short notes provide little context; code-heavy notes may expose useful tokens such as `range()` but can also have vocabulary the model never saw. Exact labels on this small split should not be interpreted as broad generalisation.

## Prototype and correction policy

The browser-only prototype offers search, topic filters, note creation, multi-tag edits, local persistence, and reset-to-suggestion controls. A manually selected tag set overrides the automatic recommendation for that note. This avoids silently changing a user's decision and makes the human correction loop explicit.

## Limitations and next steps

- Thirty hand-authored examples are insufficient to estimate real-world quality; collect consented, representative notes and double-label a larger test set.
- Tune thresholds on a validation set, report macro metrics and per-topic support, and evaluate calibration and abstention.
- The rule list and classifier are English-oriented and domain-limited. New terms or subjects may be missed.
- Browser storage and the demo login are not secure or collaborative; a deployed service would require proper server-side authentication, consent, retention controls, and privacy review.
- A future study should log corrections only with informed consent and use them to improve a separately validated model, not silently retrain on private notes.

## Reproducibility

See `README.md` for setup. The dataset, taxonomy, preprocessing, random seed, threshold, and dependency list are included. Python, pandas, scikit-learn, and a browser are free tools used or suitable for this project.
