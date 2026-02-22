import os
import json
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = []

for category in os.listdir(BASE_DIR):
    category_path = os.path.join(BASE_DIR, category)

    if os.path.isdir(category_path) and category not in ["Images", "__pycache__"]:

        for file in os.listdir(category_path):
            if file.endswith(".html"):
                filepath = os.path.join(category_path, file)

                with open(filepath, "r", encoding="utf-8") as f:
                    soup = BeautifulSoup(f, "html.parser")

                    title = soup.title.string if soup.title else "Untitled"

                    desc_tag = soup.find("meta", attrs={"name": "description"})
                    desc = desc_tag["content"] if desc_tag else ""

                    date_tag = soup.find("meta", attrs={"name": "date"})
                    date = date_tag["content"] if date_tag else ""

                data.append({
                    "title": title,
                    "file": f"blogs/{category}/{file}",
                    "category": category.replace("_", " ").title(),
                    "description": desc,
                    "date": date
                })

# Sort newest first
data.sort(key=lambda x: x["date"], reverse=True)

with open(os.path.join(BASE_DIR, "blog_index.json"), "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Blog index generated successfully.")