import json

def check_missing():
    try:
        with open('src/data/workouts.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        explanations = data.get('explanations', {})
        missing = set()
        for workout in data.get('workouts', []):
            for ex in workout.get('exercises', []):
                name = ex.get('name')
                if name not in explanations:
                    missing.add(name)
        
        with open('src/data/debug_missing.txt', 'w', encoding='utf-8') as f:
            f.write(f"Missing ({len(missing)}):\n")
            for m in missing:
                f.write(f"- '{m}'\n")
    except Exception as e:
        with open('src/data/debug_missing.txt', 'w', encoding='utf-8') as f:
            f.write(str(e))

if __name__ == "__main__":
    check_missing()
