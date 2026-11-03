"""Augment PAN12 dataset with synthetic sampling and demo conversations.

Creates a balanced, augmented CSV at `data/processed/pan12_augmented.csv`.

Techniques used:
- Oversampling minority class by sampling with replacement
- Light synonym-replacement augmentation using NLTK WordNet
- Append per-message rows from demo JSON files in `data/demo/`
"""

from pathlib import Path
import random
import json
import re
from typing import List

import pandas as pd

try:
    import nltk
    from nltk.corpus import wordnet
except Exception:
    nltk = None


BASE = Path(__file__).resolve().parent
PROC = BASE / "processed"
PAN_PATHS = [
    PROC / "pan12_train_clean.csv",
    PROC / "pan12_test_clean.csv",
]
OUT_PATH = PROC / "pan12_augmented.csv"


def ensure_nltk():
    global nltk
    if nltk is None:
        import nltk as _n
        nltk = _n
    try:
        wordnet.synsets('dog')
    except Exception:
        nltk.download('wordnet')
        nltk.download('omw-1.4')


def simple_synonym_replacement(text: str, n_replacements: int = 1) -> str:
    """Replace up to n_replacements words with synonyms where available."""
    if not text or len(text.split()) < 2:
        return text

    ensure_nltk()

    words = re.findall(r"\w+|'\w+|\S", text)
    candidates = [i for i, w in enumerate(words) if re.match(r"^[A-Za-z]{3,}$", w)]
    random.shuffle(candidates)
    replaced = 0

    for idx in candidates:
        w = words[idx]
        syns = set()
        for syn in wordnet.synsets(w.lower()):
            for l in syn.lemmas():
                cand = l.name().replace('_', ' ')
                if cand.lower() != w.lower():
                    syns.add(cand)
        if syns:
            words[idx] = random.choice(list(syns))
            replaced += 1
        if replaced >= n_replacements:
            break

    return ''.join([w if re.match(r"\w+|'\w+", w) else w for w in words])


def load_pan12_from_clean_files() -> pd.DataFrame:
    rows = []
    for p in PAN_PATHS:
        if not p.exists():
            continue
        df = pd.read_csv(p)
        rows.append(df[['text', 'label']])
    if not rows:
        return pd.DataFrame(columns=['text', 'label'])
    return pd.concat(rows, ignore_index=True)


def generate_synthetic_convos(n_each: int = 20) -> pd.DataFrame:
    """Generate synthetic grooming conversations in English and Hinglish.

    Returns a dataframe of per-message rows with fields `text` and `label` (1=grooming).
    """
    eng_trust = [
        "you're so mature for your age",
        "i totally get you",
        "i really like talking to you",
        "you seem really smart",
    ]
    eng_isolation = [
        "don't tell your parents about this",
        "this is just between us",
        "they won't understand our friendship",
    ]
    eng_gift = [
        "i'll buy you Robux",
        "i can send you money for a new skin",
        "do you want a gift card?",
    ]
    eng_secrecy = [
        "delete these messages after reading",
        "move to Snapchat so nobody sees",
        "we should keep this private",
    ]

    hing_trust = [
        "tu bahut samajhdar hai",
        "main tujhe samajhta hu",
        "tu alag hai, mujhe pasand hai",
    ]
    hing_isolation = [
        "yaar kisi ko mat batana",
        "apni mummy ko mat bata",
        "sirf hamare beech mein rahe",
    ]
    hing_gift = [
        "free coins dunga bhai",
        "main tujhe robux bhej dunga",
        "ek gift card bhej dun kya?",
    ]
    hing_secrecy = [
        "in messages ko delete kar de",
        "Snapchat pe chalein, wahan messages delete ho jate hain",
        "bas hum dono ke beech mein rahega",
    ]

    rows = []
    for _ in range(n_each):
        # English grooming convo ~25 messages
        messages = []
        messages += [random.choice(eng_trust) for _ in range(5)]
        messages += [random.choice(eng_isolation) for _ in range(7)]
        messages += [random.choice(eng_gift) for _ in range(5)]
        messages += [random.choice(eng_secrecy) for _ in range(8)]
        for m in messages:
            rows.append({"text": m, "label": 1})

    for _ in range(n_each):
        # Hinglish grooming convo ~25 messages
        messages = []
        messages += [random.choice(hing_trust) for _ in range(5)]
        messages += [random.choice(hing_isolation) for _ in range(7)]
        messages += [random.choice(hing_gift) for _ in range(5)]
        messages += [random.choice(hing_secrecy) for _ in range(8)]
        for m in messages:
            rows.append({"text": m, "label": 1})

    return pd.DataFrame(rows)


def generate_synthetic_normal_convos(n_each: int = 20) -> pd.DataFrame:
    """Generate synthetic normal (non-grooming) conversations in English and Hinglish.

    Returns a dataframe of per-message rows with fields `text` and `label` (0=normal).
    """
    eng_topic = [
        "did you try the new ranked mode yet",
        "the map rotation is way better now",
        "i finally pushed my score above 1800",
        "try playing safer until the last circle",
        "who is your favourite character right now",
        "the new patch made the sniper a bit stronger",
        "we should queue another match after this",
        "that emote was hilarious",
    ]

    hing_topic = [
        "bhai aaj match dekha?",
        "Minecraft mein mera naya base dekh",
        "school mein test tha, kitna tough tha",
        "kal physics ka test hai, padhega kab?",
        "mujhe naya game bahut pasand aaya",
        "tu kaunsa character use karta hai?",
        "server crash ho gaya kal, backup nahi tha",
    ]

    rows = []
    for _ in range(n_each):
        # English normal convo ~25 messages
        messages = [random.choice(eng_topic) for _ in range(25)]
        for m in messages:
            rows.append({"text": m, "label": 0})

    for _ in range(n_each):
        # Hinglish normal convo ~25 messages
        messages = [random.choice(hing_topic) for _ in range(25)]
        for m in messages:
            rows.append({"text": m, "label": 0})

    return pd.DataFrame(rows)


def augment_dataset(target_balance: str = 'equal', synonym_per_sample: int = 1):
    # Load train and test separately
    train_path = PROC / 'pan12_train_clean.csv'
    test_path = PROC / 'pan12_test_clean.csv'
    train_df = pd.read_csv(train_path) if train_path.exists() else pd.DataFrame(columns=['text', 'label'])
    test_df = pd.read_csv(test_path) if test_path.exists() else pd.DataFrame(columns=['text', 'label'])

    # Append synthetic normal convos for variety (small amount)
    synth_normals = generate_synthetic_normal_convos(n_each=50)
    if not synth_normals.empty:
        train_df = pd.concat([train_df, synth_normals], ignore_index=True)

    # Compute capped synthetic grooming to approximately double minority, cap at 25% of training set
    M = int((train_df['label'] == 1).sum())
    T = len(train_df)
    max_synth = int(0.25 * T)
    desired = M  # add M examples to double minority
    synth_count = min(desired, max_synth)

    print(f"Train size: {T}, grooming: {M}, max_synth_cap: {max_synth}, synth_to_create: {synth_count}")

    synthetic_rows = []
    if synth_count > 0:
        # each synthetic convo produces ~25 messages; compute convos needed
        per_convo = 25
        convos_needed = (synth_count + per_convo - 1) // per_convo
        gen = generate_synthetic_convos(n_each=convos_needed)
        # gen has English convos first then Hinglish; shuffle so selection includes both languages
        gen = gen[['text', 'label']].copy()
        gen = gen.sample(frac=1, random_state=42).reset_index(drop=True)
        if len(gen) < synth_count:
            synth_df = gen
        else:
            synth_df = gen.iloc[:synth_count].reset_index(drop=True)

        synth_df.to_csv(PROC / 'pan12_synthetic_grooming.csv', index=False)
        print('Synthetic grooming messages saved to', PROC / 'pan12_synthetic_grooming.csv')

        synthetic_rows.append(synth_df)
        # Also generate matching synthetic normal messages so synthetic-only dataset
        # contains both labels (0 = non-predator, 1 = predator).
        gen_normals = generate_synthetic_normal_convos(n_each=convos_needed)
        gen_normals = gen_normals[['text', 'label']].copy()
        gen_normals = gen_normals.sample(frac=1, random_state=43).reset_index(drop=True)
        if len(gen_normals) < len(synth_df):
            normals_df = gen_normals
        else:
            normals_df = gen_normals.iloc[: len(synth_df)].reset_index(drop=True)

        # Combine grooming + normals into a mixed synthetic-only dataset
        mixed = pd.concat([synth_df, normals_df], ignore_index=True)
        mixed = mixed.sample(frac=1, random_state=44).reset_index(drop=True)
        mixed.to_csv(PROC / 'pan12_synthetic_mixed.csv', index=False)
        print('Synthetic mixed (0/1) messages saved to', PROC / 'pan12_synthetic_mixed.csv')

    # Build augmented train set: train + synthetic grooming (if any)
    if synthetic_rows:
        synth_all = pd.concat(synthetic_rows, ignore_index=True)
        train_aug = pd.concat([train_df, synth_all], ignore_index=True)
    else:
        train_aug = train_df.copy()

    train_aug.to_csv(PROC / 'pan12_train_augmented.csv', index=False)
    print('Augmented training file saved to', PROC / 'pan12_train_augmented.csv')

    # Optionally, create a combined augmented file (train_aug + test)
    combined = pd.concat([train_aug, test_df], ignore_index=True)
    combined.to_csv(OUT_PATH, index=False)
    print('Full augmented dataset (train+test) saved to', OUT_PATH)
    print('Final counts (combined):')
    print(combined['label'].value_counts().to_dict())


if __name__ == '__main__':
    random.seed(0)
    augment_dataset(target_balance='equal', synonym_per_sample=1)
