"""Remove norm collisions across splits to enforce strict no-overlap.

Reads `data/processed/clean_{train,val,test}.csv` and writes
`data/processed/final_train.csv`, etc., removing any rows whose
normalized text appears in another split.
"""
from pathlib import Path
import csv
import re


ROOT = Path(__file__).resolve().parents[2]
IN_DIR = ROOT / 'data' / 'processed'
OUT_DIR = IN_DIR


def norm(s: str) -> str:
    if s is None:
        return ''
    s = s.strip().lower()
    s = re.sub(r'\s+', ' ', s)
    return s


def read_csv(path: Path):
    rows=[]
    with path.open(encoding='utf-8') as f:
        r=csv.DictReader(f)
        for row in r:
            row['norm']=norm(row.get('text',''))
            rows.append(row)
    return rows


def main():
    train=read_csv(IN_DIR / 'clean_train.csv')
    val=read_csv(IN_DIR / 'clean_val.csv')
    test=read_csv(IN_DIR / 'clean_test.csv')

    t_norms=set(r['norm'] for r in train)
    v_norms=set(r['norm'] for r in val)
    te_norms=set(r['norm'] for r in test)

    # remove any rows from val/test that collide with train; also remove mutual collisions
    def filter_rows(rows, forbidden):
        out=[]
        removed=0
        for r in rows:
            if r['norm'] in forbidden:
                removed+=1
                continue
            out.append(r)
        return out, removed

    # forbids are norms present in any other split
    val_forbidden = t_norms | te_norms
    test_forbidden = t_norms | v_norms
    train_forbidden = v_norms | te_norms

    train_f, rem_t = filter_rows(train, train_forbidden)
    val_f, rem_v = filter_rows(val, val_forbidden)
    test_f, rem_te = filter_rows(test, test_forbidden)

    def write(path, rows):
        with path.open('w', encoding='utf-8', newline='') as f:
            w=csv.writer(f)
            w.writerow(['text','label'])
            for r in rows:
                w.writerow([r.get('text',''), r.get('label','')])

    write(OUT_DIR / 'final_train.csv', train_f)
    write(OUT_DIR / 'final_val.csv', val_f)
    write(OUT_DIR / 'final_test.csv', test_f)

    print('removed: train', rem_t, 'val', rem_v, 'test', rem_te)
    print('final counts:', len(train_f), len(val_f), len(test_f))


if __name__ == '__main__':
    main()
