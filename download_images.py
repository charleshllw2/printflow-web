import re
import urllib.request
import os

with open('src/data/shopProducts.ts', 'r') as f:
    content = f.read()

urls = re.findall(r'https://cdn\.content360\.io/[^\s"\'>]+', content)

for url in urls:
    filename = url.split('/')[-1]
    filepath = f"public/shop/{filename}"
    if not os.path.exists(filepath):
        print(f"Downloading {filename}...")
        try:
            urllib.request.urlretrieve(url, filepath)
            print(f"Saved to {filepath}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")
    
    # replace URL in content
    content = content.replace(url, f"/shop/{filename}")

with open('src/data/shopProducts.ts', 'w') as f:
    f.write(content)
print("Finished updating shopProducts.ts!")
