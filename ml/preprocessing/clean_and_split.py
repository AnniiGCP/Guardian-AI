"""Clean raw dataset and create stratified non-overlapping splits.

Writes outputs to `data/processed/clean_train.csv`, `clean_val.csv`, `clean_test.csv`.
No external dependencies required.
"""
from pathlib import Path
import csv
import re
import random
from collections import defaultdict


ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / 'data' / 'raw' / 'grooming_dataset.csv'
OUT_DIR = ROOT / 'data' / 'processed'
OUT_DIR.mkdir(parents=True, exist_ok=True)


def normalize_text(s: str) -> str:
    if s is None:
        return ''
    s = s.strip().lower()
    # collapse whitespace
    s = re.sub(r'\s+', ' ', s)
    return s


def read_raw(path: Path):
    rows = []
    with path.open(newline='', encoding='utf-8') as f:
        r = csv.DictReader(f)
        for row in r:
            text = row.get('text') or row.get('message') or ''
            label = row.get('label') or row.get('y') or ''
            norm = normalize_text(text)
            rows.append({'text': text, 'norm': norm, 'label': label})
    return rows


def dedupe(rows):
    seen = {}
    dup_count = 0
    for r in rows:
        key = (r['norm'], r['label'])
        if key in seen:
            dup_count += 1
            continue
        seen[key] = r
    return list(seen.values()), dup_count


def stratified_split(rows, ratios=(0.8, 0.1, 0.1), seed=42):
    groups = defaultdict(list)
    for r in rows:
        groups[r['label']].append(r)

    train, val, test = [], [], []
    random.seed(seed)
    for label, items in groups.items():
        random.shuffle(items)
        n = len(items)
        n_train = int(n * ratios[0])
        n_val = int(n * ratios[1])
        train.extend(items[:n_train])
        val.extend(items[n_train:n_train + n_val])
        test.extend(items[n_train + n_val:])

    return train, val, test


def write_csv(path: Path, rows):
    with path.open('w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['text', 'label'])
        for r in rows:
            writer.writerow([r['text'], r['label']])


def main():
    print('Reading raw dataset:', RAW)
    rows = read_raw(RAW)
    print('Raw rows:', len(rows))

    deduped, dup_count = dedupe(rows)
    print('After dedupe (exact norm+label):', len(deduped), 'duplicates removed:', dup_count)

    # Remove any empty-text rows
    deduped = [r for r in deduped if r['norm'].strip()]
    print('After removing empty texts:', len(deduped))

    # Create stratified splits
    train, val, test = stratified_split(deduped, ratios=(0.8, 0.1, 0.1), seed=12345)

    # Ensure no overlap by norm between splits
    def norms(rs):
        return set(r['norm'] for r in rs)

    overlap_tv = len(norms(train) & norms(val))
    overlap_tt = len(norms(train) & norms(test))
    overlap_vt = len(norms(val) & norms(test))

    print('overlap train/val', overlap_tv)
    print('overlap train/test', overlap_tt)
    print('overlap val/test', overlap_vt)

    # Write outputs
    out_train = OUT_DIR / 'clean_train.csv'
    out_val = OUT_DIR / 'clean_val.csv'
    out_test = OUT_DIR / 'clean_test.csv'
    write_csv(out_train, train)
    write_csv(out_val, val)
    write_csv(out_test, test)

    print(f'Wrote: {out_train} ({len(train)})')
    print(f'Wrote: {out_val} ({len(val)})')
    print(f'Wrote: {out_test} ({len(test)})')


if __name__ == '__main__':
    main()
