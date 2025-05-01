import csv

# Input file paths
FIRST_NAMES_FILE = 'btn_givennames.txt'
SURNAMES_FILE = 'btn_surnames.txt'
OUTPUT_CSV = 'names.csv'

def parse_first_names(filepath):
    entries = []
    with open(filepath, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if not line:
                continue
            try:
                name, gender = line.rsplit(maxsplit=1)
            except ValueError:
                print(f"Skipping malformed line: {line}")
                continue
            is_male = 'm' in gender
            is_female = 'f' in gender
            entries.append({
                'name': name,
                'is_male': is_male,
                'is_female': is_female,
                'is_surname': False
            })
    return entries

def parse_surnames(filepath):
    entries = []
    with open(filepath, 'r', encoding='utf-8') as file:
        for line in file:
            name = line.strip()
            if not name:
                continue
            entries.append({
                'name': name,
                'is_male': False,
                'is_female': False,
                'is_surname': True
            })
    return entries

def write_csv(data, filepath):
    with open(filepath, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['name', 'is_male', 'is_female', 'is_surname']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for entry in data:
            writer.writerow(entry)

def main():
    print("Parsing first names...")
    first_names = parse_first_names(FIRST_NAMES_FILE)
    print(f"Loaded {len(first_names)} first names.")

    print("Parsing surnames...")
    surnames = parse_surnames(SURNAMES_FILE)
    print(f"Loaded {len(surnames)} surnames.")

    all_names = first_names + surnames
    print(f"Writing {len(all_names)} total names to CSV...")
    write_csv(all_names, OUTPUT_CSV)
    print("Done! CSV saved as:", OUTPUT_CSV)

if __name__ == '__main__':
    main()
