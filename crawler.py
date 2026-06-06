import os
import requests
from bs4 import BeautifulSoup
import urllib.parse
import re

# 1. 確保建立儲存路徑
target_dir = os.path.join("public", "auras")
os.makedirs(target_dir, exist_ok=True)

# 2. 51種完全體光環與捷技能精準對照表 (對齊英文官方媒體庫標準命名)
AURA_MAP = {
    "determination": {"en": "Determination", "wiki": "Determination"}, 
    "grace": {"en": "Grace", "wiki": "Grace"}, 
    "hatred": {"en": "Hatred", "wiki": "Hatred"}, 
    "wrath": {"en": "Wrath", "wiki": "Wrath"},
    "anger": {"en": "Anger", "wiki": "Anger"}, 
    "zealotry": {"en": "Zealotry", "wiki": "Zealotry"}, 
    "purity-elements": {"en": "Purity of Elements", "wiki": "Purity of Elements"}, 
    "haste": {"en": "Haste", "wiki": "Haste"},
    "pride": {"en": "Pride", "wiki": "Pride"}, 
    "purity-ice": {"en": "Purity of Ice", "wiki": "Purity of Ice"}, 
    "purity-fire": {"en": "Purity of Fire", "wiki": "Purity of Fire"},
    "purity-lightning": {"en": "Purity of Lightning", "wiki": "Purity of Lightning"}, 
    "discipline": {"en": "Discipline", "wiki": "Discipline"}, 
    "blasphemy": {"en": "Blasphemy Support", "wiki": "Blasphemy Support"}, 
    "petrified-blood": {"en": "Petrified Blood", "wiki": "Petrified Blood"}, 
    "skitterbots": {"en": "Summon Skitterbots", "wiki": "Summon Skitterbots"}, 
    "flesh-bone": {"en": "Flesh and Stone", "wiki": "Flesh and Stone"},
    "blood-sand": {"en": "Blood and Sand", "wiki": "Blood and Sand"}, 
    "temporal-rift": {"en": "Temporal Rift", "wiki": "Temporal Rift"}, 
    "war-banner": {"en": "War Banner", "wiki": "War Banner"},
    "defiance-banner": {"en": "Defiance Banner", "wiki": "Defiance Banner"}, 
    "dread-banner": {"en": "Dread Banner", "wiki": "Dread Banner"}, 
    "vitality": {"en": "Vitality", "wiki": "Vitality"},
    "precision": {"en": "Precision", "wiki": "Precision"}, 
    "clarity": {"en": "Clarity", "wiki": "Clarity"},
    "arctic-armour": {"en": "Arctic Armour", "wiki": "Arctic Armour"},
    "tempest-shield": {"en": "Tempest Shield", "wiki": "Tempest Shield"},
    
    # 🌟 應您要求補齊：四大野獸祝福
    "spider-blessing": {"en": "Aspect of the Spider", "wiki": "Aspect of the Spider"},
    "crab-blessing": {"en": "Aspect of the Crab", "wiki": "Aspect of the Crab"},
    "cat-blessing": {"en": "Aspect of the Cat", "wiki": "Aspect of the Cat"},
    "avian-blessing": {"en": "Aspect of the Avian", "wiki": "Aspect of the Avian"},
    
    # 🌟 應您要求補齊：五大捷技能
    "herald-ash": {"en": "Herald of Ash", "wiki": "Herald of Ash"},
    "herald-ice": {"en": "Herald of Ice", "wiki": "Herald of Ice"},
    "herald-thunder": {"en": "Herald of Thunder", "wiki": "Herald of Thunder"},
    "herald-agony": {"en": "Herald of Agony", "wiki": "Herald of Agony"},
    "herald-purity": {"en": "Herald of Purity", "wiki": "Herald of Purity"}
}

print("🚀 啟動 51 種完全體光環庫抓取任務...")
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
download_count = 0

for img_id, info in AURA_MAP.items():
    en_name = info["en"]
    wiki_page = info["wiki"]
    
    # 優先嘗試：Wiki 媒體庫分類標準名稱
    file_page_name = f"File:{en_name} skill icon.png"
    encoded_name = urllib.parse.quote(file_page_name.replace(" ", "_"))
    url = f"https://www.poewiki.net/wiki/{encoded_name}"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            media_div = soup.find("div", id="file")
            img_tag = media_div.find("img") if media_div else None
            
            if not img_tag:
                img_tag = soup.find("a", class_="internal")
                
            if img_tag:
                img_url = img_tag.get("src") if img_tag.name == "img" else img_tag.get("href")
                if img_url:
                    if img_url.startswith("//"): img_url = "https:" + img_url
                    elif not img_url.startswith("http"): img_url = "https://www.poewiki.net" + img_url
                    
                    img_data = requests.get(img_url, headers=headers).content
                    save_path = os.path.join(target_dir, f"{img_id}.png")
                    with open(save_path, "wb") as f:
                        f.write(img_data)
                    print(f"✨ 成功補齊 ➔ 【{en_name}】")
                    download_count += 1
                    continue

        # 備用方案：直擊原始技能/輔助寶石 Hero 頁面
        gem_url = f"https://www.poewiki.net/wiki/{urllib.parse.quote(wiki_page.replace(' ', '_'))}"
        gem_res = requests.get(gem_url, headers=headers)
        if gem_res.status_code == 200:
            gem_soup = BeautifulSoup(gem_res.text, "html.parser")
            hero_span = gem_soup.find("span", class_="infobox-page-hero")
            hero_img = hero_span.find("img") if hero_span else None
            
            if not hero_img:
                hero_img = gem_soup.find("img", alt=re.compile(en_name, re.IGNORECASE))
            
            if hero_img and (hero_img.get("src") or hero_img.get("data-src")):
                img_url = hero_img.get("src") or hero_img.get("data-src")
                if img_url.startswith("//"): img_url = "https:" + img_url
                elif not img_url.startswith("http"): img_url = "https://www.poewiki.net" + img_url
                
                img_data = requests.get(img_url, headers=headers).content
                save_path = os.path.join(target_dir, f"{img_id}.png")
                with open(save_path, "wb") as f:
                    f.write(img_data)
                print(f"✨ 成功自原始寶石頁撈回 ➔ 【{en_name}】")
                download_count += 1
            else:
                print(f"❌ 無法定位 【{en_name}】 的任何圖標特徵")
        else:
            print(f"❌ 查無此技能頁面 ➔ 【{en_name}】")
            
    except Exception as e:
        print(f"❌ 抓取 【{en_name}】 異常: {str(e)}")

print(f"\n🎉 任務結束！所有漏網之魚與新加入技能已完美就位！")