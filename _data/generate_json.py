import pandas as pd
import json
import math

# Use the full path so it runs predictably
EXCEL_FILE = "Таня - 100 дней любви к себе.xlsx"
OUTPUT_FILE = "workouts.json"

WORKOUT_SHEET = "Воркауты"
EXPLANATION_SHEETS = [
    "Отжимания", "Приседания", "Австралийские подтягивания", 
    "Ягодичный мостик", "Вертикальные отжимания", "Выпады"
]

def clean_val(val):
    """Clean NaN or float representations of ints"""
    if pd.isna(val):
        return None
    if isinstance(val, float):
        if val.is_integer():
            return int(val)
        if math.isnan(val):
            return None
    return val

def generate_json():
    print(f"Reading {EXCEL_FILE}")
    xls = pd.ExcelFile(EXCEL_FILE)
    
    # 1. Parse workouts
    workouts_df = pd.read_excel(xls, sheet_name=WORKOUT_SHEET)
    
    workouts = []
    
    for index, row in workouts_df.iterrows():
        day_val = row.get("Таня 💕")
        if pd.isna(day_val):
            continue # Skip empty rows
            
        day_str = str(day_val)
        warmup_url = row.get("Разминка")
        rounds = clean_val(row.get("Круги"))
        cooldown_url = row.get("Заминка")
        
        exercises = []
        for i in range(1, 7):
            ex_name_col = f"Упражнение {i}" if i == 1 else f"Упражнение {i}"
            ex_reps_col = "Повторения" if i == 1 else f"Повторения.{i-1}"
            
            ex_name = row.get(ex_name_col)
            ex_reps = row.get(ex_reps_col)
            
            if not pd.isna(ex_name):
                exercises.append({
                    "name": str(ex_name).strip(),
                    "reps": clean_val(ex_reps)
                })
                
        workouts.append({
            "day_label": day_str,
            "warmup_url": str(warmup_url) if not pd.isna(warmup_url) else None,
            "rounds": rounds,
            "cooldown_url": str(cooldown_url) if not pd.isna(cooldown_url) else None,
            "exercises": exercises
        })

    # 2. Parse explanations
    explanations = {}
    for sheet in EXPLANATION_SHEETS:
        if sheet not in xls.sheet_names:
            print(f"Warning: Sheet {sheet} not found.")
            continue
            
        df = pd.read_excel(xls, sheet_name=sheet)
        
        # Determine column logic. The "Отжимания" sheet has weird empty headers in the summary.
        # Let's check if the normal headers exist. If not, maybe use column indices if 'Упражнение' doesn't exist.
        if 'Упражнение' in df.columns:
            name_col = 'Упражнение'
            diff_col = 'Сложность (1–10)'
            desc_col = 'Подробное описание'
            
            for index, row in df.iterrows():
                ex_name = row.get(name_col)
                if pd.isna(ex_name):
                    continue
                    
                difficulty = clean_val(row.get(diff_col))
                description = row.get(desc_col)
                
                explanations[str(ex_name).strip()] = {
                    "difficulty": difficulty,
                    "description": str(description).strip() if not pd.isna(description) else None
                }
        else:
            # Fallback for "Отжимания" which might have rows where the first non-NaN column is the name
            # From earlier context, let's just do a clean read where header=0 didn't work.
            # actually we can read it differently or just iterate and find rows.
            # Let's read without headers to be safe for this one sheet
            df_no_head = pd.read_excel(xls, sheet_name=sheet, header=None)
            for index, row in df_no_head.iterrows():
                # Usually column 0 is name, 1 is difficulty, 2 is description
                # Usually column 0 is name, 1 is difficulty, 2 is description
                # In the "Отжимания" sheet, it seems column 1 is name, 2 is difficulty, 3 is description
                ex_name = row[1]
                if pd.isna(ex_name) or str(ex_name).strip() == "Упражнение":
                    continue # Skip header row or empty
                
                difficulty = clean_val(row[2]) if len(row) > 2 else None
                description = row[3] if len(row) > 3 else None
                
                # Check if it actually looks like an exercise (string)
                if isinstance(ex_name, str):
                    explanations[ex_name.strip()] = {
                        "difficulty": difficulty,
                        "description": str(description).strip() if not pd.isna(description) else None
                    }
            
    # Combine
    final_data = {
        "workouts": workouts,
        "explanations": explanations
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully generated {OUTPUT_FILE} with {len(workouts)} workouts and {len(explanations)} explanations.")

if __name__ == "__main__":
    generate_json()
