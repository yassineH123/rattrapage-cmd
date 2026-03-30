# 🚀 Guide: Automatiser GitHub Backlog & Kanban

## 📋 Ce qu'on va faire

1. **Créer les Milestones** (v1.0.0, v1.1.0, etc.)
2. **Créer les Labels** (type, domain, priority, effort, status)
3. **Créer les Issues** (23 User Stories)
4. **Créer un Kanban** (GitHub Projects) pour gérer le backlog

---

## ⚙️ Pré-requis

### 1. Installer GitHub CLI

**Windows (PowerShell):**
```powershell
winget install GitHub.cli
```

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install gh

# Fedora
sudo dnf install gh
```

### 2. Authentifier avec GitHub CLI

```powershell
gh auth login
```

Réponds aux questions:
- What is your preferred protocol for Git operations? → HTTPS
- Authenticate Git with your GitHub credentials? → Y
- How would you like to authenticate GitHub CLI? → Login with a web browser

---

## 🎯 Exécution des scripts

### Étape 1: Créer les Milestones et Labels

```powershell
# Navigue vers le répertoire du projet
cd C:\Users\yassi\Desktop\freelancehub-vanillaaaa

# Ouvre le script et modifie les variables
# Remplace:
# $OWNER = "ton-username"  # Ton nom GitHub
# $REPO = "freelancehub"    # Nom du repo

# Exécute le script
.\create-github-setup.ps1
```

**Sortie attendue:**
```
🚀 Création des Milestones et Labels pour: ton-username/freelancehub
✅ GitHub CLI trouvé

📌 Création des Milestones...
  • v1.0.0 - MVP... ✅
  • v1.1.0 - Profile & Auth... ✅
  • v1.2.0 - Services Core... ✅
  ...

🏷️  Création des Labels...
  • type/feature... ✅
  • type/bug... ✅
  • domain/auth... ✅
  ...

✨ Milestones et Labels créés avec succès!
```

---

### Étape 2: Créer les User Stories

```powershell
# Même répertoire
.\create-github-issues.ps1
```

**Sortie attendue:**
```
📝 Création des User Stories como Issues GitHub...

✍️  Création de 23 User Stories...
  • [US-001] Accueil & Navigation... ✅
  • [US-002] Inscription utilisateur... ✅
  • [US-003] Connexion utilisateur... ✅
  ...

✨ 23 User Stories créées avec succès!

📊 Création du GitHub Project (Kanban)...

⚠️  Instructions pour créer le Kanban manuellement:
1. Va sur: https://github.com/ton-username/freelancehub/projects
2. Clique sur 'New project'
...
```

---

### Étape 3: Créer le Kanban (GitHub Projects)

**Option A: Manuel sur l'interface GitHub**

1. Va sur ton repo GitHub
2. Clique sur l'onglet **"Projects"**
3. Clique sur **"New project"**
4. Nom: **"FreelanceHub Backlog"**
5. Choisis le template: **"Board"** ou **"Table"** (personnes préfèrent Board pour Kanban)
6. Les colonnes seront:
   - **Backlog** → issues avec label `status/ready`
   - **In Progress** → issues avec label `status/in-progress`
   - **In Review** → issues avec label `status/in-review`
   - **Done** → issues avec label `status/done`

7. Une fois créé, ajoute tes issues:
   - Clique sur **"Add item"**
   - Ajoute tes 23 issues créées

**Option B: Avec GitHub CLI (avancé)**

```powershell
# Créer le projet (nécessite API token)
gh api user/projects \
  -f name="FreelanceHub Backlog" \
  -f body="Gestion du backlog et roadmap du projet"
```

---

## 📊 Configurer les colonnes du Kanban

Une fois le projet créé, configure les colonnes:

### Colonne 1: **Backlog**
- Description: Fonctionnalités en attente de développement
- Filtre: Label `status/ready`
- Priorité: Afficher par label Priority

### Colonne 2: **In Progress**
- Description: Actuellement en développement
- Filtre: Label `status/in-progress`
- Assigné: Qui travaille dessus

### Colonne 3: **In Review**
- Description: En cours de révision/test
- Filtre: Label `status/in-review`

### Colonne 4: **Done**
- Description: Terminé et fusionné
- Filtre: Label `status/done`

---

## 🎮 Utiliser le Kanban

### Vue Board (Kanban)
```
┌─────────────┬──────────────┬──────────┬──────┐
│  Backlog    │ In Progress  │In Review │ Done │
├─────────────┼──────────────┼──────────┼──────┤
│ [US-001]    │ [US-002]     │[US-003]  │[...] │
│ Priority: C │ Effort: M    │Effort L  │      │
│ Effort: M   │              │          │      │
│ Milestone   │              │          │      │
└─────────────┴──────────────┴──────────┴──────┘
```

### Pour changer une issue de colonne:
1. Drag & drop la carte
2. Ou clique sur l'issue et modifie le label `status/xxx`

---

## 🔍 Filtrer par Milestone

Dans le Kanban, tu peux filtrer par milestone:

```
View Options → Filter → "Milestone"
├─ v1.0.0 - MVP
├─ v1.1.0 - Profile & Auth
├─ v1.2.0 - Services Core
└─ v1.3.0 - Orders & Payments
```

---

## 📈 Afficher l'Effort (Story Points)

Le Kanban peut afficher l'effort pour estimer la capacité:

```
Par itération (2 semaines):
XS (1) + S (3) + M (5) + L (8) + XL (13)

Exemple Milestone v1.0.0:
US-001 (M=5) + US-002 (M=5) + US-003 (M=5) + US-004 (L=8) + US-005 (M=5) + US-006 (XS=1)
= 5+5+5+8+5+1 = 29 story points
```

---

## 📝 Checklist pour finir

- [ ] Installer gh CLI
- [ ] Authentifier avec `gh auth login`
- [ ] Modifier les scripts (remplacer OWNER et REPO)
- [ ] Exécuter `create-github-setup.ps1` (crée milestones + labels)
- [ ] Exécuter `create-github-issues.ps1` (crée les 23 issues)
- [ ] Créer le GitHub Project (Board)
- [ ] Ajouter les issues au project
- [ ] Configurer les statuts des colonnes
- [ ] Commencer par US-001, US-002, etc.

---

## 🆘 Dépannage

### Erreur: "GitHub CLI not found"
```powershell
# Vérifie l'installation
gh --version

# Si pas installé
winget install GitHub.cli
```

### Erreur: "Authentication failed"
```powershell
# Re-login
gh auth logout
gh auth login
```

### Issues créées mais pas visibles
```powershell
# Actualise en quittant et revenant sur GitHub
# ou utilise:
gh issue list --repo ton-username/freelancehub
```

### Labels en double?
```powershell
# GitHub CLI ignore l'erreur si label existe déjà
# Vérifie sur: https://github.com/ton-username/freelancehub/labels
```

---

## 🎨 Personnaliser les couleurs

Dans les scripts, les labels ont des couleurs HEX:

- **type/feature** → 0025FF (Bleu)
- **domain/frontend** → 7057FF (Violet)
- **domain/backend** → 8367D6 (Violet clair)
- **priority/critical** → CC317C (Rose)
- **priority/high** → FF6B6B (Rouge)
- **effort/m** → 87CEEB (Bleu ciel)

Tu peux modifier dans le script si tu veux d'autres couleurs.

---

## 📞 Besoin d'aide?

- **GitHub Docs:** https://docs.github.com/en/issues
- **GitHub CLI Docs:** https://cli.github.com/manual
- **Projects Docs:** https://docs.github.com/en/issues/planning-and-tracking-with-projects

Bonne chance! 🚀
