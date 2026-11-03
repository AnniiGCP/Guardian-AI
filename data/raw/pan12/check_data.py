import pandas as pd

df = pd.read_csv('processed/pan12_train.csv')

print('Shape:', df.shape)
print()

print('Nulls:')
print(df.isnull().sum())
print()

print('Label distribution:')
print(df['conv_has_predator'].value_counts())
print()

print('Sample predator message:')
print(df[df['is_predator_author']==1]['text'].iloc[0])
print()

print('Sample normal message:')
print(df[df['is_predator_author']==0]['text'].iloc[0])