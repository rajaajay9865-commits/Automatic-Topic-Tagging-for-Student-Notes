"""Reproducible multi-label tagging comparison for the NoteWise capstone."""

from __future__ import annotations

import re
from pathlib import Path

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.preprocessing import MultiLabelBinarizer

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "notes.csv"
SEED = 28
TEST_SIZE = 0.30
THRESHOLD = 0.35

KEYWORDS = {
    "Algebra": ["algebra", "equation", "variable", "function", "quadratic", "parabola", "vertex", "coefficient", "solve", "polynomial", "gradient", "moles", "n = m/m", "f = ma", "v₀", "½at"],
    "Biology": ["biology", "cell", "membrane", "dna", "gene", "allele", "genetics", "organism", "photosynthesis", "chloroplast", "osmosis", "diffusion", "phospholipid", "ecosystem", "habitat", "respiration"],
    "Chemistry": ["chemistry", "chemical", "reaction", "atom", "molecule", "element", "acid", "base", "ph ", "neutralisation", "h2o", "co2", "bond", "subscript", "molar", "mole", "oxygen", "glucose"],
    "Computer Science": ["computer science", "python", "code", "algorithm", "loop", "iterable", "list", "complexity", "csv", "sorting", "program", "data structure", "range(", "indexerror", "function", "debugging"],
    "Physics": ["physics", "newton", "force", "acceleration", "velocity", "energy", "pendulum", "friction", "motion", "kinetic", "gravitational", "f = ma", "m/s", "kinematics", "displacement"],
    "History": ["history", "revolution", "1789", "estate", "historical", "primary source", "provenance", "chronology", "sovereignty", "secondary source", "corroborate", "historical claim"],
    "Writing": ["writing", "thesis", "essay", "argument", "claim", "evidence", "paragraph", "composition", "grammar", "corroboration", "persuasive"],
}


def clean_text(text: str) -> str:
    """Remove markup and excess whitespace while retaining headings and technical terms."""
    text = re.sub(r"```.*?```", " ", str(text), flags=re.DOTALL)
    text = re.sub(r"(?m)^\s{0,3}#{1,6}\s*", "", text)
    text = re.sub(r"[*_`]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def keyword_predict(texts: list[str], topics: list[str]) -> list[list[str]]:
    predictions = []
    for text in texts:
        normalized = text.lower()
        matches = [topic for topic in topics if any(term in normalized for term in KEYWORDS[topic])]
        predictions.append(matches)
    return predictions


def print_metrics(name: str, truth, predicted, encoder: MultiLabelBinarizer) -> None:
    print(f"\n{name} (micro precision/recall/F1)")
    print(
        f"precision={precision_score(truth, predicted, average='micro', zero_division=0):.3f}  "
        f"recall={recall_score(truth, predicted, average='micro', zero_division=0):.3f}  "
        f"F1={f1_score(truth, predicted, average='micro', zero_division=0):.3f}"
    )
    print(classification_report(truth, predicted, target_names=encoder.classes_, zero_division=0, digits=3))


def main() -> None:
    data = pd.read_csv(DATA_PATH).fillna("")
    data["clean_text"] = data.apply(lambda row: clean_text(f"{row['title']}\n{row['text']}"), axis=1)
    data["labels"] = data["gold_tags"].map(lambda value: [tag.strip() for tag in value.split(";") if tag.strip()])
    topics = sorted({tag for labels in data["labels"] for tag in labels})
    encoder = MultiLabelBinarizer(classes=topics)
    all_y = encoder.fit_transform(data["labels"])

    train_idx, test_idx = train_test_split(
        data.index, test_size=TEST_SIZE, random_state=SEED
    )
    train_text = data.loc[train_idx, "clean_text"].tolist()
    test_text = data.loc[test_idx, "clean_text"].tolist()
    y_train, y_test = all_y[train_idx], all_y[test_idx]

    baseline_names = keyword_predict(test_text, topics)
    baseline_y = encoder.transform(baseline_names)
    print(f"Dataset: {len(data)} notes; train={len(train_idx)}, test={len(test_idx)}; seed={SEED}")
    print("Note: a single split on this small, hand-labelled sample is illustrative, not a generalisation claim.")
    print_metrics("Keyword/rule baseline", y_test, baseline_y, encoder)

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2), min_df=1, max_features=12000, sublinear_tf=True,
        token_pattern=r"(?u)\b[\w+#.-]+\b",
    )
    x_train = vectorizer.fit_transform(train_text)
    x_test = vectorizer.transform(test_text)
    model = OneVsRestClassifier(LogisticRegression(max_iter=1000, class_weight="balanced", random_state=SEED))
    model.fit(x_train, y_train)
    probabilities = model.predict_proba(x_test)
    tfidf_y = (probabilities >= THRESHOLD).astype(int)
    print(f"TF-IDF + one-vs-rest logistic regression (threshold={THRESHOLD})")
    print_metrics("TF-IDF classifier", y_test, tfidf_y, encoder)

    print("Held-out error inspection (false positives / false negatives):")
    errors = 0
    for row_index, predicted in zip(test_idx, tfidf_y):
        actual_labels = set(data.loc[row_index, "labels"])
        predicted_labels = set(encoder.inverse_transform(predicted.reshape(1, -1))[0])
        extra, missed = sorted(predicted_labels - actual_labels), sorted(actual_labels - predicted_labels)
        if extra or missed:
            print(f"- {data.loc[row_index, 'title']}: extra={extra or 'none'}; missed={missed or 'none'}")
            errors += 1
    if not errors:
        print("- No TF-IDF errors on this split. Inspect borderline/ambiguous notes manually as well.")

    print("\nShort/code-heavy checks (rules):")
    for text in ["DNA", "for i in range(3): print(i)", "F = ma. Check units."]:
        print(f"- {text!r} -> {keyword_predict([text], topics)[0]}")


if __name__ == "__main__":
    main()
