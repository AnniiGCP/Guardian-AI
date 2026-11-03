import xml.etree.ElementTree as ET
import pandas as pd
import os

def parse_pan12(xml_path, predator_ids_path, output_path, label):
    with open(predator_ids_path, 'r') as f:
        predator_ids = set(line.strip() for line in f.readlines())

    print(f"Loaded {len(predator_ids)} predator IDs")
    print(f"Parsing XML... this will take 2-3 minutes")

    tree = ET.parse(xml_path)
    root = tree.getroot()

    rows = []
    skipped = 0

    for conv in root.findall('conversation'):
        conv_id = conv.get('id')
        messages = conv.findall('message')

        if len(messages) < 6:
            skipped += 1
            continue

        conv_has_predator = any(
            msg.find('author').text in predator_ids
            for msg in messages if msg.find('author') is not None
        )

        for msg in messages:
            author_el = msg.find('author')
            text_el = msg.find('text')
            time_el = msg.find('time')

            author = author_el.text if author_el is not None else ''
            text = text_el.text if text_el is not None and text_el.text else ''
            timestamp = time_el.text if time_el is not None else ''

            if not text.strip():
                continue

            rows.append({
                'conversation_id': conv_id,
                'author': author,
                'text': text.strip(),
                'timestamp': timestamp,
                'is_predator_author': 1 if author in predator_ids else 0,
                'conv_has_predator': 1 if conv_has_predator else 0,
                'split': label
            })

    df = pd.DataFrame(rows)
    os.makedirs('processed', exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Done! {len(df)} messages saved → {output_path}")
    print(f"Predator messages: {df['is_predator_author'].sum()}")
    print(f"Conversations with predator: {df[df['conv_has_predator']==1]['conversation_id'].nunique()}\n")

# ── EDIT THESE PATHS TO MATCH YOUR FOLDERS ──
parse_pan12(
    xml_path=r'pan12-sexual-predator-identification-training\pan12-sexual-predator-identification-training-corpus-2012-05-01.xml',
    predator_ids_path=r'pan12-sexual-predator-identification-training\pan12-sexual-predator-identification-training-corpus-predators-2012-05-01.txt',
    output_path=r'processed\pan12_train.csv',
    label='train'
)

parse_pan12(
    xml_path=r'pan12-sexual-predator-identification-test\pan12-sexual-predator-identification-test-corpus-2012-05-17.xml',
    predator_ids_path=r'pan12-sexual-predator-identification-test\pan12-sexual-predator-identification-groundtruth-problem1.txt',
    output_path=r'processed\pan12_test.csv',
    label='test'
)