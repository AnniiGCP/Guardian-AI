"""Prepare training artifacts (vectorizer + manifest) from augmented data.

This script does NOT start model training. It fits a TF-IDF vectorizer on
`data/processed/augmented_train.csv` and saves the vectorizer as joblib.

Run with the ML venv (do NOT run automatically):

  . ml/.venv/bin/activate
  python3 ml/train_prepare.py
"""
from pathlib import Path
import csv
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

ROOT = Path(__file__).resolve().parents[1]
IN = ROOT / 'data' / 'processed' / 'augmented_train.csv'
OUT_DIR = ROOT / 'ml' / 'models' / 'grooming_model'
OUT_DIR.mkdir(parents=True, exist_ok=True)


def load_texts(path: Path):
    texts = []
    labels = []
    with path.open(encoding='utf-8') as f:
        r = csv.DictReader(f)
        for row in r:
            texts.append(row.get('text',''))
            labels.append(row.get('label',''))
    return texts, labels


def main():
    texts, labels = load_texts(IN)
    print('Loaded', len(texts), 'rows')

    vec = TfidfVectorizer(max_features=20000, ngram_range=(1,2))
    vec.fit(texts)
    joblib.dump(vec, OUT_DIR / 'vectorizer.joblib')
    print('Saved vectorizer to', OUT_DIR / 'vectorizer.joblib')


if __name__ == '__main__':
    main()
