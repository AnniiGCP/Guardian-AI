"""Augment minority class in final_train.csv with Hinglish-style paraphrases.

Produces `data/processed/augmented_train.csv` with added samples for label '1'.
"""
from pathlib import Path
import csv
import random

ROOT = Path(__file__).resolve().parents[2]
IN = ROOT / 'data' / 'processed' / 'final_train.csv'
OUT = ROOT / 'data' / 'processed' / 'augmented_train.csv'


HINGLISH_REPLACEMENTS = [
    ("you are", "tu hai"),
    ("dont tell your parents", "kisi ko mat batana"),
    ("i will", "main kar dunga"),
    ("i'll", "main kar dunga"),
    ("buy you", "free coins"),
    ("snapchat", "snap"),
    ("robux", "coins"),
]


def augment_text(text: str) -> str:
    s = text
    # a few simple swaps and insertions to create code-mix variants
    for a, b in HINGLISH_REPLACEMENTS:
        if a in s.lower():
            s = s.replace(a, b)

    # random insertion of Hinglish filler
    fillers = ["yaar", "bhai", "tu", "ya" ]
    if random.random() < 0.3:
        s = s + " " + random.choice(fillers)
    return s


def main(multiplier: int = 2):
    rows=[]
    with IN.open(encoding='utf-8') as f:
        r=csv.DictReader(f)
        for row in r:
            rows.append(row)

    # separate classes
    pos=[r for r in rows if r.get('label') == '1']
    neg=[r for r in rows if r.get('label') != '1']

    augmented = list(rows)
    for r in pos:
        for i in range(multiplier-1):
            new_text = augment_text(r['text'])
            augmented.append({'text': new_text, 'label': '1'})

    # shuffle
    random.shuffle(augmented)

    with OUT.open('w', encoding='utf-8', newline='') as f:
        w=csv.writer(f)
        w.writerow(['text','label'])
        for r in augmented:
            w.writerow([r.get('text',''), r.get('label','')])

    print('orig positives', len(pos), 'augmented total', sum(1 for r in augmented if r['label']=='1'))
    print('wrote', OUT, 'total rows', len(augmented))


if __name__ == '__main__':
    main(multiplier=3)
