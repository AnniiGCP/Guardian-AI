import pandas as pd
import json
import os

os.makedirs('processed', exist_ok=True)
os.makedirs('demo', exist_ok=True)

# ── SYNTHETIC CONVERSATIONS ──────────────────────────────────────────────────
# Each conversation is a list of (author, text) tuples
# author: "predator" or "child"
# label: 1 = grooming, 0 = normal

conversations = [

  # ── HINGLISH GROOMING ────────────────────────────────────────────────────

  {
    "id": "hinglish_g_001",
    "label": 1,
    "lang": "hinglish",
    "messages": [
      ("predator", "hey, kaise ho? akele ho kya abhi?"),
      ("child",    "haan thoda bored hu"),
      ("predator", "main bhi yaar. tumse baat karke accha lagta hai, seriously"),
      ("child",    "haha thanks"),
      ("predator", "tumhari umar kya hai? tum itne mature lagte ho"),
      ("child",    "15"),
      ("predator", "wah, 15 mein itni samajhdari. mujhe bohot accha lagta hai tum"),
      ("child",    "ok"),
      ("predator", "ek kaam karo, Instagram pe add karo mujhe. yahan pe log dekhte hain"),
      ("child",    "kyun?"),
      ("predator", "wahan zyada freely baat kar sakte hain. parents ko pata nahi chalega"),
    ]
  },

  {
    "id": "hinglish_g_002",
    "label": 1,
    "lang": "hinglish",
    "messages": [
      ("predator", "arre yaar, aaj school kaisa tha?"),
      ("child",    "boring tha as usual"),
      ("predator", "haha tumhare dost nahi samjhte na tumhe? main samjhta hu"),
      ("child",    "haan thoda aisa hi hai"),
      ("predator", "tumhare parents bhi nahi samjhte hoge. sab aisa hi hota hai"),
      ("child",    "haan mummy toh bohot strict hain"),
      ("predator", "isliye toh keh raha hu, hamare beech jo baat hoti hai woh secret rakhna"),
      ("child",    "kya matlab?"),
      ("predator", "matlab unhe batane ki zaroorat nahi. ye hamara apna connection hai"),
      ("child",    "ok"),
      ("predator", "tumhe gift card chahiye? Roblox wala? main bhej sakta hu"),
    ]
  },

  {
    "id": "hinglish_g_003",
    "label": 1,
    "lang": "hinglish",
    "messages": [
      ("predator", "hi! Roblox mein dekha tumhe. bohot accha khelte ho"),
      ("child",    "thanks!"),
      ("predator", "kitne saal ke ho?"),
      ("child",    "14"),
      ("predator", "wow, 14 mein itna skilled. main 28 ka hu lekin tumse bohot kuch seekhna hai"),
      ("child",    "haha ok"),
      ("predator", "yaar ek photo bhejo na, bass dekhna tha kaisa dikhte ho"),
      ("child",    "pata nahi"),
      ("predator", "arre koi nahi dekhega. sirf main dekhuga. promise"),
      ("child",    "..."),
      ("predator", "please yaar. main bhi bhejta hu phir. fair hai na?"),
    ]
  },

  {
    "id": "hinglish_g_004",
    "label": 1,
    "lang": "hinglish",
    "messages": [
      ("predator", "hello! Discord pe ho kya? wahan voice chat karte hain"),
      ("child",    "haan hu toh"),
      ("predator", "add karo mujhe. ID bhejta hu. yahan lag lag ke message aata hai"),
      ("child",    "theek hai"),
      ("predator", "tumhare ghar mein kaun kaun hai abhi?"),
      ("child",    "mummy papa office mein hain"),
      ("predator", "oh accha, toh akele ho. voice call karte hain phir?"),
      ("child",    "abhi nahi"),
      ("predator", "arre darr mat. main tumhara dost hu. koi nahi sunega"),
      ("child",    "ok thodi der mein"),
      ("predator", "aur parents ko mat batana. woh samjhenge nahi humari friendship"),
    ]
  },

  {
    "id": "hinglish_g_005",
    "label": 1,
    "lang": "hinglish",
    "messages": [
      ("predator", "yaar tum toh mera best online friend ban gaye ho"),
      ("child",    "haha accha lagta hai"),
      ("predator", "sach mein. tumhari real life mein koi nahi samjhta na?"),
      ("child",    "haan thoda aisa hi hai school mein"),
      ("predator", "isliye toh main hu. main hamesha tumhare liye hu"),
      ("child",    "thanks yaar"),
      ("predator", "tumhara address kya hai? surprise gift bhejnu tumhe"),
      ("child",    "kyun?"),
      ("predator", "surprise hai! bas ghar ka address do. parents ko mat batana pehle"),
      ("child",    "pata nahi dunga"),
      ("predator", "arre yaar trust karo na. itne dino se dost hain hum"),
    ]
  },

  # ── ENGLISH GROOMING ─────────────────────────────────────────────────────

  {
    "id": "english_g_001",
    "label": 1,
    "lang": "english",
    "messages": [
      ("predator", "hey! saw you in that Roblox server, you're really good"),
      ("child",    "thanks lol"),
      ("predator", "how old are you? you seem really mature"),
      ("child",    "13"),
      ("predator", "wow only 13? most kids your age are so immature. you're different"),
      ("child",    "haha i guess"),
      ("predator", "i really like talking to you. do you have snapchat?"),
      ("child",    "yeah why"),
      ("predator", "easier to talk there. plus disappearing messages so no one sees"),
      ("child",    "ok i guess"),
      ("predator", "don't tell your parents btw. they won't understand our friendship"),
    ]
  },

  {
    "id": "english_g_002",
    "label": 1,
    "lang": "english",
    "messages": [
      ("predator", "you seem sad today. everything ok?"),
      ("child",    "just parents fighting again"),
      ("predator", "aw i'm sorry. i always understand you though, right?"),
      ("child",    "yeah you do"),
      ("predator", "i feel like we have such a special connection. like no one else gets it"),
      ("child",    "same"),
      ("predator", "can i send you something? a gift card to cheer you up"),
      ("child",    "really?"),
      ("predator", "yeah just need your email. keep it between us though ok?"),
      ("child",    "why secret?"),
      ("predator", "your parents might not understand. they'd probably make it weird"),
    ]
  },

  {
    "id": "english_g_003",
    "label": 1,
    "lang": "english",
    "messages": [
      ("predator", "you're honestly the most interesting person i've talked to in ages"),
      ("child",    "lol really"),
      ("predator", "seriously. how are you so smart at your age"),
      ("child",    "idk"),
      ("predator", "can i ask something personal? like what do you look like"),
      ("child",    "why"),
      ("predator", "just curious! i showed you my pic remember. just being fair"),
      ("child",    "i guess i'm normal looking"),
      ("predator", "i'm sure you're cute. send a pic? just for me, i won't share"),
      ("child",    "idk"),
      ("predator", "come on we're friends. friends share pics. totally normal"),
    ]
  },

  {
    "id": "english_g_004",
    "label": 1,
    "lang": "english",
    "messages": [
      ("predator", "hey are you home alone right now?"),
      ("child",    "yeah parents are at work"),
      ("predator", "nice. we can video call then! no one will bother us"),
      ("child",    "i dunno"),
      ("predator", "it'll be fun! i've been wanting to see you for ages"),
      ("child",    "maybe later"),
      ("predator", "please? i got you those robux remember. just a quick call"),
      ("child",    "ok fine"),
      ("predator", "don't tell anyone we're calling ok? people wouldn't understand"),
      ("child",    "why not"),
      ("predator", "because they'd be jealous of what we have. our friendship is special"),
    ]
  },

  {
    "id": "english_g_005",
    "label": 1,
    "lang": "english",
    "messages": [
      ("predator", "i feel like i can tell you anything"),
      ("child",    "same i guess"),
      ("predator", "your parents don't really get you do they"),
      ("child",    "not really"),
      ("predator", "that's why you need someone like me. i actually listen"),
      ("child",    "yeah"),
      ("predator", "what's your address? i want to send you something physical, a real gift"),
      ("child",    "i'm not supposed to give that out"),
      ("predator", "it's fine, i'm not a stranger. we've been talking for weeks"),
      ("child",    "still idk"),
      ("predator", "you don't trust me? after everything? that hurts"),
    ]
  },

  # ── HINGLISH NORMAL ──────────────────────────────────────────────────────

  {
    "id": "hinglish_n_001",
    "label": 0,
    "lang": "hinglish",
    "messages": [
      ("user_a", "bhai aaj match dekha?"),
      ("user_b", "haan yaar kya game tha! last over mein dil aatak gaya tha"),
      ("user_a", "Rohit ki century toh outstanding thi"),
      ("user_b", "haan par fielding weak thi"),
      ("user_a", "next match kab hai?"),
      ("user_b", "Sunday ko lagta hai. mom ke saath jaana hai usse pehle market"),
      ("user_a", "haha tough schedule hai bhai"),
      ("user_b", "school bhi hai upar se. physics ka test hai Monday"),
      ("user_a", "oof. padhega kab?"),
      ("user_b", "Saturday raat ko all nighter marunga as usual"),
    ]
  },

  {
    "id": "hinglish_n_002",
    "label": 0,
    "lang": "hinglish",
    "messages": [
      ("user_a", "yaar Minecraft mein mera naya base dekh"),
      ("user_b", "bhai ye toh bohot bada hai"),
      ("user_a", "2 din lage bhai. survival mode mein"),
      ("user_b", "diamond sword bana liya?"),
      ("user_a", "haan aur enchant bhi kiya. sharpness 4"),
      ("user_b", "nice. mera toh server crash ho gaya kal"),
      ("user_a", "seriously? kya hua?"),
      ("user_b", "pata nahi. bhai ne update kiya kuch aur sab gone"),
      ("user_a", "backup nahi tha?"),
      ("user_b", "nahi yaar. ab fresh start"),
    ]
  },

  # ── ENGLISH NORMAL ───────────────────────────────────────────────────────

  {
    "id": "english_n_001",
    "label": 0,
    "lang": "english",
    "messages": [
      ("user_a", "dude did you finish the history assignment"),
      ("user_b", "lol no i completely forgot"),
      ("user_a", "it's due tomorrow!!"),
      ("user_b", "i know i know. doing it now"),
      ("user_a", "what topic did you pick"),
      ("user_b", "world war 2. you?"),
      ("user_a", "industrial revolution. boring but easy"),
      ("user_b", "smart move honestly"),
      ("user_a", "wanna compare after we're done"),
      ("user_b", "yeah text me tonight"),
    ]
  },

  {
    "id": "english_n_002",
    "label": 0,
    "lang": "english",
    "messages": [
      ("user_a", "did you see the new minecraft update"),
      ("user_b", "yes omg the new biome is insane"),
      ("user_a", "we should do a new survival world this weekend"),
      ("user_b", "yes! my brother wants to join too is that ok"),
      ("user_a", "yeah the more the better"),
      ("user_b", "cool i'll ask my mom if i can stay up late saturday"),
      ("user_a", "same. my parents usually say yes on weekends"),
      ("user_b", "nice. i'll set up the server"),
      ("user_a", "what version though"),
      ("user_b", "latest one. 1.21"),
    ]
  },

  {
    "id": "english_n_003",
    "label": 0,
    "lang": "english",
    "messages": [
      ("user_a", "hey what did you get on the math test"),
      ("user_b", "78. you?"),
      ("user_a", "82! finally passed properly"),
      ("user_b", "nice dude. i messed up the last section"),
      ("user_a", "same the probability stuff was hard"),
      ("user_b", "are you going to ask sir to re-explain it"),
      ("user_a", "yeah during lunch tomorrow"),
      ("user_b", "ok tell me what he says"),
      ("user_a", "will do. study group saturday?"),
      ("user_b", "yeah at the library, tell the others too"),
    ]
  },

]

# ── BUILD CSV ────────────────────────────────────────────────────────────────
rows = []
for conv in conversations:
    for i, (author, text) in enumerate(conv["messages"]):
        rows.append({
            "conversation_id": conv["id"],
            "message_index": i + 1,
            "author": author,
            "text": text,
            "lang": conv["lang"],
            "conv_label": conv["label"],          # 1=grooming, 0=normal
            "is_predator_author": 1 if author == "predator" else 0,
            "split": "synthetic"
        })

df = pd.DataFrame(rows)
df.to_csv("processed/synthetic_convos.csv", index=False)
print(f"Synthetic CSV saved: {len(df)} messages, {df['conversation_id'].nunique()} conversations")
print(f"  Grooming convos : {df[df['conv_label']==1]['conversation_id'].nunique()}")
print(f"  Normal convos   : {df[df['conv_label']==0]['conversation_id'].nunique()}")

# ── BUILD DEMO JSON FILES ────────────────────────────────────────────────────
# Pick 3 grooming + 2 normal for live demo
demo_ids = ["hinglish_g_001", "english_g_002", "hinglish_g_004", "english_n_001", "hinglish_n_001"]

for conv in conversations:
    if conv["id"] not in demo_ids:
        continue

    demo_obj = {
        "conversation_id": conv["id"],
        "lang": conv["lang"],
        "ground_truth_label": conv["label"],
        "messages": [
            {
                "message_index": i + 1,
                "author": author,
                "text": text,
                "timestamp": f"2024-01-01T22:{30+i:02d}:00"
            }
            for i, (author, text) in enumerate(conv["messages"])
        ]
    }

    out_path = f"demo/{conv['id']}.json"
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(demo_obj, f, ensure_ascii=False, indent=2)
    print(f"Demo JSON saved: {out_path}")

print("\nAll done!")
print("Files created:")
print("  processed/synthetic_convos.csv  ← give this to Jaggu with PAN12 CSVs")
print("  demo/*.json                     ← use these for live demo run")
