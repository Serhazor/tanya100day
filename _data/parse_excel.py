import pandas as pd
import sys

def parse_excel(file_path):
    try:
        xls = pd.ExcelFile(file_path)
        with open("excel_summary.txt", "w", encoding="utf-8") as f:
            f.write(f"Sheet Names: {xls.sheet_names}\n")
            
            for sheet in xls.sheet_names:
                f.write(f"\n--- Sheet: {sheet} ---\n")
                df = pd.read_excel(xls, sheet_name=sheet)
                f.write(f"Columns: {df.columns.tolist()}\n")
                f.write("First 3 rows:\n")
                f.write(df.head(3).to_string() + "\n")
    except Exception as e:
        with open("excel_summary_error.txt", "w", encoding="utf-8") as f:
            f.write(str(e))
        sys.exit(1)

if __name__ == "__main__":
    parse_excel("Таня - 100 дней любви к себе.xlsx")
