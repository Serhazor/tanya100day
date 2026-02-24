import json

def check_keys():
    try:
        with open('src/data/workouts.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        keys = list(data.get('explanations', {}).keys())
        pushup_keys = [k for k in keys if 'Отжимания' in k]
        
        with open('src/data/debug_keys.txt', 'w', encoding='utf-8') as f:
            f.write("All Pushup Keys:\n")
            for k in pushup_keys:
                f.write(f"- '{k}'\n")
    except Exception as e:
        with open('src/data/debug_keys.txt', 'w', encoding='utf-8') as f:
            f.write(str(e))

if __name__ == "__main__":
    check_keys()
