#!/usr/bin/env python3
"""
Re-encode garbled Hebrew CSV (UTF-8 bytes misread as Latin-1) back to UTF-8.
Usage: python3 scripts/decode_csv.py <source_file> <output_file>
"""
import sys

def decode_garbled_hebrew(input_path: str, output_path: str) -> None:
    with open(input_path, "rb") as f:
        raw_bytes = f.read()

    # Strip UTF-8 BOM if present
    if raw_bytes.startswith(b"\xef\xbb\xbf"):
        raw_bytes = raw_bytes[3:]

    # If the file was re-saved as Latin-1 (i.e. each byte maps 1:1 to Unicode),
    # encode back to raw bytes using latin-1 then decode as utf-8.
    try:
        text_latin1 = raw_bytes.decode("latin-1")
        recovered = text_latin1.encode("latin-1").decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError):
        # File is already valid UTF-8
        recovered = raw_bytes.decode("utf-8-sig")

    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        f.write(recovered)

    print(f"✓ Written to {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 decode_csv.py <source> <dest>")
        sys.exit(1)
    decode_garbled_hebrew(sys.argv[1], sys.argv[2])
