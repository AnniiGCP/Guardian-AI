import pandas as pd

# clean train
train = pd.read_csv('processed/pan12_train.csv')
before = len(train)

train = train.dropna(subset=['text'])
train = train[train['text'].str.strip() != '']

train.to_csv('processed/pan12_train_clean.csv', index=False)

print(f'Train: {before} -> {len(train)} rows (removed {before-len(train)})')

# clean test
test = pd.read_csv('processed/pan12_test.csv')
before = len(test)

test = test.dropna(subset=['text'])
test = test[test['text'].str.strip() != '']

test.to_csv('processed/pan12_test_clean.csv', index=False)

print(f'Test: {before} -> {len(test)} rows (removed {before-len(test)})')

print('Done. Clean CSVs saved.')