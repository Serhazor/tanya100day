import pandas as pd
import sys

def debug_sheet():
    file_path = "src/data/Таня - 100 дней любви к себе.xlsx"
    try:
        xls = pd.ExcelFile(file_path)
        df_no_head = pd.read_excel(xls, sheet_name='Отжимания', header=None)
        
        with open("src/data/debug_pushups.txt", "w", encoding="utf-8") as f:
            for index, row in df_no_head.iterrows():
                # Write each row separated by a pipe
                f.write(" | ".join([str(x).replace('\n', ' ') for x in row.tolist()]) + "\n")
                
    except Exception as e:
        with open("src/data/debug_pushups.txt", "w", encoding="utf-8") as f:
            f.write(str(e))
        sys.exit(1)

if __name__ == "__main__":
    debug_sheet()
