"""Utilities for loading PAN 2012 chat data into a compact message schema.

The loader prefers the cleaned train/test CSVs generated under
`data/raw/pan12/processed`, then falls back to the raw CSV exports if the
cleaned files are missing.
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

import pandas as pd


REPO_ROOT = Path(__file__).resolve().parents[1]
PAN12_PROCESSED_DIR = REPO_ROOT / "data" / "raw" / "pan12" / "processed"


def _candidate_csv_paths() -> list[Path]:
    preferred = [
        PAN12_PROCESSED_DIR / "pan12_train_clean.csv",
        PAN12_PROCESSED_DIR / "pan12_test_clean.csv",
    ]
    fallback = [
        PAN12_PROCESSED_DIR / "pan12_train.csv",
        PAN12_PROCESSED_DIR / "pan12_test.csv",
    ]

    if all(path.exists() for path in preferred):
        return preferred
    if all(path.exists() for path in fallback):
        return fallback

    missing = preferred if not all(path.exists() for path in preferred) else fallback
    missing_list = ", ".join(str(path) for path in missing)
    raise FileNotFoundError(
        "PAN12 processed CSVs were not found. Expected one of these sets: "
        f"{missing_list}"
    )


def _load_csv(path: Path) -> pd.DataFrame:
    frame = pd.read_csv(path)
    required_columns = {"author", "text", "timestamp", "conv_has_predator"}
    missing_columns = required_columns.difference(frame.columns)
    if missing_columns:
        missing_text = ", ".join(sorted(missing_columns))
        raise ValueError(f"{path} is missing required columns: {missing_text}")
    return frame


def load_pan12_messages() -> list[dict[str, object]]:
    """Load the PAN 2012 train/test messages into a flat list of dicts.

    Each record contains:
    - sender
    - text
    - timestamp
    - label (1 for grooming conversations, 0 otherwise)
    """

    records: list[dict[str, object]] = []

    for csv_path in _candidate_csv_paths():
        frame = _load_csv(csv_path)
        for row in frame.itertuples(index=False):
            text = str(getattr(row, "text", "")).strip()
            if not text:
                continue

            records.append(
                {
                    "sender": getattr(row, "author", ""),
                    "text": text,
                    "timestamp": getattr(row, "timestamp", ""),
                    "label": int(getattr(row, "conv_has_predator", 0)),
                }
            )

    return records


def count_pan12_labels(samples: Iterable[dict[str, object]] | None = None) -> dict[int, int]:
    """Count grooming vs normal samples for a loaded PAN 2012 dataset."""

    if samples is None:
        samples = load_pan12_messages()

    counts = {0: 0, 1: 0}
    for sample in samples:
        label = int(sample["label"])
        counts[label] = counts.get(label, 0) + 1
    return counts


if __name__ == "__main__":
    samples = load_pan12_messages()
    counts = count_pan12_labels(samples)
    print(f"Loaded {len(samples):,} PAN12 messages")
    print(f"Normal samples: {counts.get(0, 0):,}")
    print(f"Grooming samples: {counts.get(1, 0):,}")