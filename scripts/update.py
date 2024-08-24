"""update.py gathers a Github user's repository content then adds it to a Firebase Firestore database."""

import json
import base64
import time
import requests
from markdown import markdown
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Getting script variables from config file.
with open("config.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Gathering portfolio content from Github.
projects = []
repos_url = "https://api.github.com/users/" + data["username"] + "/repos"
headers = {"Authorization": "token " + data["token"], "Accept": "application/vnd.github+json"}
repos_response = requests.get(repos_url, headers=headers, timeout=10)
repos = repos_response.json()
for repo in repos:
    if repo["name"] in data["repos"]:
        readme_url = "https://api.github.com/repos/" + data["username"] + "/" + repo["name"] + "/readme"
        readme_response = requests.get(readme_url, headers=headers, timeout=10)
        readme = readme_response.json()
        raw_readme = base64.b64decode(readme["content"]).decode("utf-8")
        html = markdown(raw_readme, output_format="html5")
        soup = BeautifulSoup(html, "html.parser")
        first_header = soup.find("h2", string="Description")
        second_header = first_header.find_next_sibling("h2")
        image_div = second_header.find_previous_sibling()
        image_src = image_div.find("img")["src"]
        tech_paragraph = image_div.find_previous_sibling()
        tech_description = tech_paragraph.get_text()
        rank = data["repos"].index(repo["name"])
        projects.append(
            {
                "name": repo["name"],
                "description": repo["description"],
                "tech": tech_description,
                "rank": rank,
                "image": image_src,
                "github": repo["html_url"],
                "homepage": repo["homepage"],
            }
        )

# Sorting projects by rank and removing rank values.
sorted_projects = sorted(projects, key=lambda p: p["rank"])
for project in sorted_projects:
    project.pop("rank")

# Updating Firebase Firestore database.
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
db.collection("portfolio").document("data").set(
    {
        "repos": sorted_projects,
        "epochdate": int(time.time()),
    }
)
