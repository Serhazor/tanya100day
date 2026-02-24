import json

def compare_strings():
    try:
        with open('src/data/workouts.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        ex_name = data['workouts'][0]['exercises'][0]['name']
        expl_keys = list(data['explanations'].keys())
        
        target_key = None
        for k in expl_keys:
            if 'Отжимания от стены' in k:
                target_key = k
                break
                
        with open('src/data/debug_compare.txt', 'w', encoding='utf-8') as f:
            f.write(f"Workout Name: {repr(ex_name)}\n")
            f.write(f"Explanation Key: {repr(target_key)}\n")
            f.write(f"Are they equal? {ex_name == target_key}\n")
    except Exception as e:
        with open('src/data/debug_compare.txt', 'w', encoding='utf-8') as f:
            f.write(str(e))

if __name__ == "__main__":
    compare_strings()
