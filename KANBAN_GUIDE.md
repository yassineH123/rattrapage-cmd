# 📊 Guide Pratique: Utiliser le Kanban FreelanceHub

## 🎯 Qu'est-ce qu'un Kanban?

Un kanban est un tableau avec des colonnes qui représentent l'état du travail:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   BACKLOG    │  IN PROGRESS │   IN REVIEW  │     DONE     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│              │              │              │              │
│ [US-001]     │ [US-002]     │ [US-010]     │ [US-008]     │
│ 📝 Accueil   │ 👤 Signup    │ 🛒 Créer     │ ✅ Auth      │
│ Priority: C  │ Effort: M    │ Effort: L    │              │
│              │              │              │              │
│ [US-004]     │              │              │              │
│ 🔄 Forgot    │              │              │              │
│ Effort: L    │              │              │              │
│              │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Les 4 colonnes:

| Colonne | Signification | Exemple |
|---------|--------------|---------|
| **Backlog** | À faire (prêt) | US-001, US-004 |
| **In Progress** | En cours maintenant | US-002, US-015 |
| **In Review** | Terminé, en test/révision | US-010, US-012 |
| **Done** | Fini et fusionné | US-008 |

---

## 🔄 Flux du travail quotidien

### Matin (Planifier la journée)

1. **Ouvre ton Kanban**
   - Va sur: https://github.com/ton-username/freelancehub/projects

2. **Vérifie ce qui est en cours**
   - Colonne "In Progress"
   - Vois qui travaille sur quoi

3. **Sélectionne ta tâche**
   - Prends une issue du Backlog
   - Celle avec la **priorité la plus haute** (critical > high > medium)
   - Ou celle avec le moins d'effort (XS < S < M)

4. **Déplace-la à "In Progress"**
   - Drag & drop la carte depuis Backlog vers In Progress
   - Ou clique sur l'issue et change le status

### Pendant le travail

5. **Tu travailles dessus**
   - Crée une branche: `git checkout -b US-002-signup`
   - Fais ton code
   - Commite avec le numéro: `git commit -m "US-002: Ajouter formulaire signup"`

6. **Ajoute des commentaires**
   - Sur l'issue GitHub
   - Décris ta progression
   - Poste des questions si bloquée

### Fin du travail (Terminer la tâche)

7. **Fais une Pull Request**
   - `git push` et crée PR sur GitHub
   - Relie l'issue: `Closes #123` ou mention `#123`

8. **Déplace à "In Review"**
   - Glisse l'issue vers "In Review"
   - Quelqu'un d'autre testers/valide

9. **Merge et close**
   - PR approuvée → Merge
   - L'issue se déplace automatiquement à "Done"

---

## 📋 Exemple concret: US-002 (Signup)

### Jour 1: Matin
```
BACKLOG                IN PROGRESS
├─ US-001             ├─ US-002
├─ US-002  ──────→   │ 👤 Signup (Toi)
├─ US-003
└─ US-004
```
*Tu prends US-002 et commences à coder*

### Jour 2: Après-midi
```
IN PROGRESS          IN REVIEW
├─ US-002  ──────→  ├─ US-002 (Pull Request)
└─ ...               │ En attente d'approbation
```
*La PR est créée, quelqu'un relit le code*

### Jour 3: Matin
```
IN REVIEW            DONE
├─ US-002  ──────→  ├─ US-002 ✅
└─ ...               │ Merged et fermée
```
*C'est approuvé et fusionné!*

---

## 🏷️ Comment lire les labels

Chaque carte affiche des infos:

```
┌─────────────────────────────────────┐
│ [US-002] Inscription utilisateur    │
├─────────────────────────────────────┤
│ Description: En tant que nouvel     │
│ utilisateur, je veux créer un       │
│ compte pour accéder...              │
│                                      │
│ Labels:                              │
│ • type/feature (bleu)                │
│ • domain/auth (rose)                 │
│ • priority/critical (rouge)          │
│ • effort/m (bleu ciel)               │
│                                      │
│ Milestone: v1.0.0 - MVP              │
│ Assigné à: (personne)                │
│                                      │
│ 📝 3 commentaires                    │
└─────────────────────────────────────┘
```

### Lire les labels:

| Label | Signification |
|-------|--------------|
| `type/feature` | C'est une nouvelle fonctionnalité |
| `domain/auth` | C'est lié à l'authentification |
| `priority/critical` | C'est urgent et bloquant |
| `effort/m` | Ça prendra ~4-8 heures |
| `status/ready` | On peut commencer |

---

## 💡 Bonnes pratiques

### ✅ À faire

1. **Priorise par ordre**
   - Critical → High → Medium → Low
   - Effort court avant effort long

2. **Assigne-toi une tâche à la fois**
   ```
   In Progress devrait avoir ~2-3 issues max
   ```

3. **Mets à jour le kanban chaque jour**
   - Déplace tes cartes manuellement
   - Ajoute des commentaires sur ta progression

4. **Ferme l'issue quand elle est vraiment finie**
   - Merge la PR d'abord
   - Puis déplace à "Done"

5. **Lie les PR aux issues**
   ```
   Dans la PR description:
   Closes #123
   Closes #124
   ```

### ❌ À ÉVITER

1. ❌ Laisser des cartes traîner en "In Progress" sans rien faire
2. ❌ Prendre 5 tâches en même temps
3. ❌ Oublier de déplacer les cartes
4. ❌ Fermer l'issue sans la tester
5. ❌ Mélanger plusieurs issues dans une seule PR

---

## 🎮 Commandes utiles

### Voir toutes les issues
```powershell
gh issue list --repo ton-username/freelancehub
```

### Voir les issues en cours
```powershell
gh issue list --repo ton-username/freelancehub --label "status/in-progress"
```

### Voir par milestone
```powershell
gh issue list --repo ton-username/freelancehub --milestone "v1.0.0 - MVP"
```

### Voir par priorité
```powershell
gh issue list --repo ton-username/freelancehub --label "priority/critical"
```

### Créer une branche depuis une issue
```powershell
# Après que la PR automatiquement relie l'issue
git checkout -b US-002-signup

# Codes ta feature
git add .
git commit -m "US-002: Ajouter formulaire signup"
git push origin US-002-signup

# Sur GitHub: crée PR et met dans la description:
# Closes #123  (le numéro de l'issue)
```

---

## 📊 Organiser ton équipe

### Assigner des tâches
- Clique sur l'issue
- Section "Assignees"
- Assigne-toi ou quelqu'un d'autre

### Par milestone (Sprint planning)
```
📅 Semaine 1: v1.0.0 - MVP
├─ US-001 (Toi)
├─ US-002 (Toi)
├─ US-003 (Mamadu)
└─ US-004 (Mamadu)

📅 Semaine 2: v1.1.0 - Auth
├─ US-005 (Toi)
└─ ...
```

### Points de bilan
- **Lundi matin:** Planifie la semaine par milestone
- **Chaque jour:** Update le kanban
- **Vendredi soir:** Revois ce qu'on a fini

---

## 🔍 Filtrer et chercher

Dans le kanban GitHub, tu peux:

### Filtrer par colonne
```
Backlog: status/ready
In Progress: status/in-progress
In Review: status/in-review
Done: status/done
```

### Filtrer par label
```
Clique sur un label pour voir toutes les issues associées
```

### Filtrer par milestone
```
Sélectionne un milestone pour voir que ce sprint
```

### Chercher par texte
```
Utilise la barre de recherche
Exemple: "signup" ou "US-002"
```

---

## 📈 Métriques (Burn down)

Pour tracker ta progression:

### Compter les issues
```
Backlog:       15 issues (105 story points)
In Progress:    2 issues (13 story points)
In Review:      1 issue  (5 story points)
Done:           5 issues (29 story points)

Total: 23 issues | Complété: 22% (5/23)
```

### Par milestone
```
v1.0.0 - MVP:
├─ 6 total
├─ 1 in progress
├─ 0 in review
└─ 0 done → 0% complété, reste 6 issues
```

---

## 🚀 Exemple d'une semaine

### Lundi matin (Planification)

```
Milestone: v1.0.0 - MVP
Objectif: Finir US-001, US-002, US-003

Actions:
1. Move US-001 → In Progress (Toi)
2. Move US-002 → In Progress (Mamadu)
3. Assign US-003 → Toi (pour mardi)
```

### Marche-mardi (Travail)

```
Matin:
- Continue US-001
- Teste US-002 de Mamadu

Après-midi:
- Crée PR pour US-001
- Move vers In Review
```

### Mercredi (Révision)

```
Matin:
- Revise PR de US-001
- Approuve et merge
- Move vers Done

- Revise PR de US-002
- Demande des changements
- Reste en In Review

Après-midi:
- Mamadu fixe US-002
- Move back vers In Progress
```

### Jeudi-Vendredi (Finitions)

```
Jeudi:
- Mamadu recrée PR pour US-002
- Approuve et merge
- Move vers Done

- Commence US-003
- Move vers In Progress

Vendredi:
- Termine US-003
- Crée PR
- Move vers In Review

Bilan:
✅ 3/3 issues complétées! 🎉
Prêt pour v1.0.0 MVP release
```

---

## 🆘 Questions courantes

### Q: Je suis bloquée, que faire?
**A:** 
1. Mets un commentaire sur l'issue
2. Tag quelqu'un @mamadu
3. Laisse-la en "In Progress" avec le label `blocked`
4. Prends une autre tâche pendant ce temps

### Q: J'ai finito mais la PR est pas approuvée?
**A:**
1. Laisse en "In Review"
2. Ajoute un commentaire `@reviewer pourriez vous checker?`
3. Prends une autre tâche pendant ce temps

### Q: Combien de temps par issue?
**A:**
```
effort/xs  → ~ 30 min
effort/s   → ~ 2-4 heures
effort/m   → ~ 4-8 heures
effort/l   → ~ 8-16 heures
effort/xl  → > 16 heures (à diviser)
```

### Q: Plusieurs personnes peuvent travailler ensemble?
**A:**
```
Oui! Mais:
1. Une issue = une branche principale
2. Plusieurs personnes = plusieurs PR sur la même branche
3. Ou diviser en sous-tâches (US-002a, US-002b)

Meilleur: Assigner une personne par issue
```

---

## 📝 Résumé des actions

Chaque jour:

- [ ] Ouvre ton kanban
- [ ] Prend une issue du Backlog
- [ ] Change le statut à "In Progress"
- [ ] Crée une branche: `git checkout -b US-XXX-nom`
- [ ] Code et commite: `git commit -m "US-XXX: description"`
- [ ] Fais une PR et mets `Closes #NNN`
- [ ] Change le statut à "In Review"
- [ ] Quelqu'un approuve et merge
- [ ] Change le statut à "Done"
- [ ] Répète! 🔄

---

## 🎯 Ton premier sprint (cette semaine)

Objectif: **Compléter v1.0.0 - MVP**

```
📌 Issues prioritaires:
1. US-001: Accueil (Priority: Critical, Effort: M)
2. US-002: Signup (Priority: Critical, Effort: M)
3. US-003: Login (Priority: Critical, Effort: M)
4. US-006: Auth persistante (Priority: High, Effort: XS)

Reste du temps:
5. US-004: Forgot password (Priority: High, Effort: L)
5. US-005: Verify email (Priority: High, Effort: M)
```

**Capacité:** ~29 story points cette semaine
**Estimé:** Complété par **Vendredi soir** ✅

---

Bon courage! 🚀
