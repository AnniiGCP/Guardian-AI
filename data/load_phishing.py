import json
from pathlib import Path

import pandas as pd
from huggingface_hub import hf_hub_download


BASE_DIR = Path(__file__).resolve().parent
PROCESSED_DIR = BASE_DIR / "processed"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


dataset_path = hf_hub_download(
	repo_id="ealvaradob/phishing-dataset",
	filename="combined_reduced.json",
	repo_type="dataset",
)

with open(dataset_path, "r", encoding="utf-8") as handle:
	records = json.load(handle)

df = pd.DataFrame(records)
df = df[["text", "label"]].copy()
df["label"] = df["label"].astype(int)
df["text"] = df["text"].astype(str)

print(df.shape)
print(df.head())

output_path = PROCESSED_DIR / "phishing_urls.csv"
df.to_csv(output_path, index=False)
print(f"Saved to {output_path}")