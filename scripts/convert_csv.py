#!/usr/bin/env python3
"""
Convert the garbled (UTF-8 misread as Latin-1) CSV back to proper UTF-8 Hebrew.
The raw file was created by saving UTF-8 Hebrew bytes as if they were Latin-1 characters.
To recover: encode each char back to its Latin-1 byte, then decode the bytes as UTF-8.
"""
import sys
import os

def convert(input_path: str, output_path: str) -> None:
    with open(input_path, "r", encoding="latin-1") as f:
        content = f.read()

    # Strip the visible BOM artifact (ï»¿ = UTF-8 BOM misread as latin-1)
    if content.startswith("ï»¿"):
        content = content[3:]

    # Re-encode as latin-1 bytes, then decode as UTF-8
    try:
        recovered = content.encode("latin-1").decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError) as e:
        print(f"Error during conversion: {e}")
        print("The file may already be valid UTF-8. Trying direct copy...")
        recovered = content

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        f.write(recovered)

    # Count rows
    lines = [l for l in recovered.splitlines() if l.strip()]
    print(f"✓ Converted {len(lines) - 1} questions to {output_path}")
    # Print first 2 rows to verify
    for line in lines[:2]:
        print("  ", line[:120])

if __name__ == "__main__":
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src = os.path.join(base, "scripts", "raw_questions.csv")
    dst = os.path.join(base, "public", "data", "questions.csv")
    convert(src, dst)
