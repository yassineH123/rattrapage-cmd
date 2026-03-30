# 📝 20 User Stories - Format GitHub Issues

Copie-colle chaque bloc directement dans GitHub pour créer une nouvelle issue.

---

## ✨ ISSUE 1️⃣

**Titre:**
```
US-001: Accueil & Navigation - Hero section avec statistiques
```

**Description:**
```
## Description
En tant que visiteur, je veux voir une page d'accueil attrayante avec statistiques pour découvrir la plateforme

## Acceptance Criteria
- [ ] Hero section avec titre accrocheur et CTA (Call To Action)
- [ ] Affichage des statistiques en temps réel (utilisateurs, services, commandes)
- [ ] Affichage des services populaires/vedettes
- [ ] Boutons "S'inscrire" et "Se connecter" visibles
- [ ] Design responsive (mobile, tablet, desktop)
- [ ] Performance: < 3s de chargement

## Labels
type/feature, domain/frontend, priority/critical, effort/m

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 2️⃣

**Titre:**
```
US-002: Inscription utilisateur - Formulaire complet
```

**Description:**
```
## Description
En tant que nouvel utilisateur, je veux créer un compte avec email et mot de passe pour accéder à la plateforme

## Acceptance Criteria
- [ ] Formulaire avec champs: Nom, Email, Mot de passe, Confirmation password
- [ ] Sélection du rôle: Client ou Freelancer (radio buttons)
- [ ] Validation côté client (format email, password fort, etc.)
- [ ] Validation côté serveur (duplicate email check)
- [ ] Hachage sécurisé du mot de passe (bcryptjs)
- [ ] Création utilisateur en base de données
- [ ] Email de bienvenue envoyé
- [ ] Redirection automatique vers page vérification email
- [ ] Messages d'erreur clairs

## Labels
type/feature, domain/auth, domain/frontend, priority/critical, effort/m

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 3️⃣

**Titre:**
```
US-003: Connexion utilisateur - Authentification avec JWT
```

**Description:**
```
## Description
En tant qu'utilisateur enregistré, je veux me connecter avec email/password pour accéder à mon compte

## Acceptance Criteria
- [ ] Formulaire Email et Password
- [ ] Validation des identifiants contre la BD
- [ ] Génération JWT token (expire 7 jours)
- [ ] Stockage token en localStorage
- [ ] Redirection vers /dashboard après login réussi
- [ ] Gestion d'erreurs: email non trouvé, password incorrect
- [ ] Lien "Mot de passe oublié"
- [ ] Lien "Pas de compte? S'inscrire"
- [ ] Remember me (optionnel)

## Labels
type/feature, domain/auth, domain/frontend, priority/critical, effort/m

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 4️⃣

**Titre:**
```
US-004: Récupération mot de passe - Reset sécurisé
```

**Description:**
```
## Description
En tant qu'utilisateur ayant oublié son mot de passe, je veux pouvoir le réinitialiser sécurément

## Acceptance Criteria
- [ ] Page dédiée "Mot de passe oublié"
- [ ] Formulaire avec champ email
- [ ] Vérification que l'email existe
- [ ] Génération token reset unique (exp: 1 heure)
- [ ] Envoi email avec lien de reset via Nodemailer
- [ ] Page reset avec nouveau password + confirm
- [ ] Validation du token et mise à jour BD
- [ ] Message de succès et redirection login
- [ ] Token invalidé après utilisation

## Labels
type/feature, domain/auth, domain/backend, priority/high, effort/l

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 5️⃣

**Titre:**
```
US-005: Vérification email - Activation de compte
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux vérifier mon email pour confirmer mon identité

## Acceptance Criteria
- [ ] Email de vérification envoyé automatiquement à l'inscription
- [ ] Lien avec token de vérification dans email
- [ ] Page de vérification avec input pour code ou lien cliquable
- [ ] Marquage du compte comme vérifié après confirmation
- [ ] Token expires après 24 heures
- [ ] Option "Renvoyer l'email"
- [ ] Message de succès
- [ ] Dashboard non accessible si email non vérifié (optionnel)

## Labels
type/feature, domain/auth, domain/backend, priority/high, effort/m

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 6️⃣

**Titre:**
```
US-006: Authentification persistante - Session utilisateur
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux rester connecté entre les sessions navigateur

## Acceptance Criteria
- [ ] Token stocké en localStorage
- [ ] Vérification du token au chargement de l'app
- [ ] Récupération des infos utilisateur depuis token
- [ ] Redirection vers login si token expiré
- [ ] Rafraîchissement automatique du token (optionnel)
- [ ] Suppression du token au logout

## Labels
type/feature, domain/auth, domain/frontend, priority/high, effort/xs

## Milestone
v1.0.0 - MVP
```

---

## ✨ ISSUE 7️⃣

**Titre:**
```
US-007: Profil utilisateur - Affichage et édition
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux voir et éditer mon profil personnel

## Acceptance Criteria
- [ ] Page profil avec infos: nom, email, téléphone, avatar, bio
- [ ] Affichage des statistiques: nombre avis, services, commandes
- [ ] Formulaire d'édition (nom, téléphone, bio)
- [ ] Upload nouvel avatar
- [ ] Bouton changer password
- [ ] Bouton logout
- [ ] Sauvegarde des modifications
- [ ] Messages de succès/erreur

## Labels
type/feature, domain/frontend, domain/backend, priority/high, effort/m

## Milestone
v1.1.0 - Profile & Auth
```

---

## ✨ ISSUE 8️⃣

**Titre:**
```
US-008: Gestion des rôles - Admin/Freelancer/Client
```

**Description:**
```
## Description
En tant que système, je veux différencier les rôles pour restreindre l'accès

## Acceptance Criteria
- [ ] Trois rôles définis: admin, freelancer, client
- [ ] Colonne 'role' en BD avec contrainte
- [ ] Middleware authMiddleware et roleMiddleware sur backend
- [ ] ProtectedRoute côté frontend selon rôle
- [ ] Accès restreint: /create-service → freelancer uniquement
- [ ] Accès restreint: /admin → admin uniquement
- [ ] Redirection si accès non autorisé

## Labels
type/feature, domain/auth, domain/backend, priority/critical, effort/m

## Milestone
v1.1.0 - Profile & Auth
```

---

## ✨ ISSUE 9️⃣

**Titre:**
```
US-009: Upload avatar - Gestion fichiers utilisateur
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux uploader un avatar/photo de profil

## Acceptance Criteria
- [ ] Input file pour image (jpg, png, webp)
- [ ] Validation du type de fichier
- [ ] Validation de la taille (max 5MB)
- [ ] Compression/optimisation de l'image
- [ ] Upload Multer vers /uploads
- [ ] Stockage avec UUID pour nom unique
- [ ] Mise à jour BD avec chemin image
- [ ] Affichage immédiat du nouvel avatar
- [ ] Gestion des erreurs

## Labels
type/feature, domain/frontend, domain/backend, priority/medium, effort/m

## Milestone
v1.1.0 - Profile & Auth
```

---

## ✨ ISSUE 🔟

**Titre:**
```
US-010: Créer un service - Freelancer publie ses offres
```

**Description:**
```
## Description
En tant que freelancer, je veux créer et publier un service

## Acceptance Criteria
- [ ] Page "Créer un service" accessible uniquement freelancer
- [ ] Formulaire avec: Titre, Description, Catégorie, Prix, Délai
- [ ] Upload image du service
- [ ] Sélection catégorie (Design, Dev, Marketing, Rédaction, Vidéo)
- [ ] Validation tous les champs
- [ ] Création en BD avec user_id du freelancer
- [ ] Status par défaut "publie"
- [ ] Redirection dashboard après succès
- [ ] Message confirmation

## Labels
type/feature, domain/frontend, domain/backend, priority/critical, effort/l

## Milestone
v1.2.0 - Services Core
```

---

## ✨ ISSUE 1️⃣1️⃣

**Titre:**
```
US-011: Voir les services - Liste paginée
```

**Description:**
```
## Description
En tant que client, je veux voir tous les services disponibles en liste

## Acceptance Criteria
- [ ] Page /services avec liste paginée (12 par page)
- [ ] Affichage: image, titre, prix, note moyenne, freelancer
- [ ] Info freelancer: avatar petit, nom
- [ ] Grid responsive (3 colonnes desktop, 1 mobile)
- [ ] Skeleton loader pendant chargement
- [ ] Pas de services → message vide
- [ ] Cliquable pour aller vers détail service

## Labels
type/feature, domain/frontend, priority/critical, effort/m

## Milestone
v1.2.0 - Services Core
```

---

## ✨ ISSUE 1️⃣2️⃣

**Titre:**
```
US-012: Filtrer et rechercher services
```

**Description:**
```
## Description
En tant que client, je veux chercher et filtrer les services

## Acceptance Criteria
- [ ] Barre recherche par texte (titre)
- [ ] Filtres par catégorie (checkboxes)
- [ ] Filtres par prix (slider min/max)
- [ ] Filtres par note (étoiles 3+, 4+, 5)
- [ ] URL avec paramètres (?q=logo&cat=Design&price=100-500)
- [ ] Tri: Populaire, Nouveau, Prix ↓, Prix ↑
- [ ] Recherche en temps réel (debounce)

## Labels
type/feature, domain/frontend, priority/high, effort/l

## Milestone
v1.2.0 - Services Core
```

---

## ✨ ISSUE 1️⃣3️⃣

**Titre:**
```
US-013: Détail service - Page complète
```

**Description:**
```
## Description
En tant que client, je veux voir tous les détails d'un service

## Acceptance Criteria
- [ ] Image du service grande (400px)
- [ ] Titre, description complète, prix
- [ ] Informations freelancer: avatar, nom, profil link, note
- [ ] Affichage et nombre d'avis
- [ ] Délai de livraison affiché
- [ ] Bouton "Commander" prominent
- [ ] Bouton autre: "Contacter freelancer"
- [ ] Partage: copier lien, réseaux sociaux

## Labels
type/feature, domain/frontend, priority/high, effort/m

## Milestone
v1.2.0 - Services Core
```

---

## ✨ ISSUE 1️⃣4️⃣

**Titre:**
```
US-014: Commander un service - Créer une commande
```

**Description:**
```
## Description
En tant que client, je veux acheter un service

## Acceptance Criteria
- [ ] Bouton "Commander" sur détail service
- [ ] Modal/formulaire de confirmation
- [ ] Sélection quantité (1, 2, 3... ou personnalisé)
- [ ] Affichage prix unitaire et total
- [ ] Bouton confirmer commande
- [ ] Création ordre en BD (status: pending)
- [ ] Notification EMAIL au freelancer
- [ ] Redirection dashboard/mes-commandes
- [ ] Message de succès

## Labels
type/feature, domain/frontend, domain/backend, priority/critical, effort/l

## Milestone
v1.3.0 - Orders & Payments
```

---

## ✨ ISSUE 1️⃣5️⃣

**Titre:**
```
US-015: Voir mes commandes - Client dashboard
```

**Description:**
```
## Description
En tant que client, je veux voir l'état de mes commandes

## Acceptance Criteria
- [ ] Dashboard "Mes commandes" avec liste
- [ ] Colonnes: Service, Freelancer, Montant, Statut, Date
- [ ] Filtres par statut: En attente, Acceptée, Livrée, Annulée
- [ ] Lien vers détail commande
- [ ] Historique (anciennes commandes)
- [ ] Pas de commandes → message vide
- [ ] Dates formatées lisibles

## Labels
type/feature, domain/frontend, priority/high, effort/m

## Milestone
v1.3.0 - Orders & Payments
```

---

## ✨ ISSUE 1️⃣6️⃣

**Titre:**
```
US-016: Accepter/Rejeter commande - Freelancer action
```

**Description:**
```
## Description
En tant que freelancer, je veux accepter ou rejeter les commandes

## Acceptance Criteria
- [ ] Dashboard "Mes commandes" pour freelancer
- [ ] Boutons: Accepter, Rejeter
- [ ] Modal confirmation avant action
- [ ] Champ commentaire optionnel pour rejet
- [ ] Mise à jour statut order en BD
- [ ] Notification EMAIL client
- [ ] Mise à jour visuelle dashboard
- [ ] Historique des actions

## Labels
type/feature, domain/frontend, domain/backend, priority/high, effort/m

## Milestone
v1.3.0 - Orders & Payments
```

---

## ✨ ISSUE 1️⃣7️⃣

**Titre:**
```
US-017: Messagerie temps réel - Chat Socket.io
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux communiquer en direct avec une autre personne

## Acceptance Criteria
- [ ] Page /messages avec liste conversations
- [ ] Affichage conversations: avatar, nom, dernier message, date
- [ ] Chat interface: messages list + input
- [ ] Envoi messages instantané (Socket.io)
- [ ] Indication "en ligne/hors ligne"
- [ ] Notification nouveau message
- [ ] Marquer comme lu
- [ ] Design responsive mobile/desktop
- [ ] Emoji picker (optionnel)

## Labels
type/feature, domain/frontend, domain/backend, domain/messaging, priority/high, effort/l

## Milestone
v1.4.0 - Communication
```

---

## ✨ ISSUE 1️⃣8️⃣

**Titre:**
```
US-018: Démarrer conversation - Contact direct
```

**Description:**
```
## Description
En tant qu'utilisateur, je veux initier une conversation

## Acceptance Criteria
- [ ] Bouton "Envoyer un message" sur profil freelancer
- [ ] Bouton "Contacter freelancer" sur service
- [ ] Modal/form premier message
- [ ] Création conversation en BD
- [ ] Redirection vers chat après envoi
- [ ] Preloader lors de création

## Labels
type/feature, domain/frontend, domain/backend, priority/high, effort/m

## Milestone
v1.4.0 - Communication
```

---

## ✨ ISSUE 1️⃣9️⃣

**Titre:**
```
US-019: Laisser un avis - Review & Rating
```

**Description:**
```
## Description
En tant que client, je veux laisser un avis sur un service reçu

## Acceptance Criteria
- [ ] Bouton "Laisser un avis" visible après livraison
- [ ] Form avec: Note étoile (1-5), Commentaire texte
- [ ] Validation: Note obligatoire, Commentaire 10+ lettres
- [ ] Création review en BD avec date
- [ ] Affichage immédiat du nouvel avis
- [ ] Peut éditer/supprimer son avis
- [ ] Message de succès

## Labels
type/feature, domain/frontend, domain/backend, priority/high, effort/m

## Milestone
v1.5.0 - Reviews & Ratings
```

---

## ✨ ISSUE 2️⃣0️⃣

**Titre:**
```
US-020: Dashboard Admin - Statistiques et gestion
```

**Description:**
```
## Description
En tant qu'admin, je veux voir un dashboard avec toutes les statistiques

## Acceptance Criteria
- [ ] Page /admin accessible qu'aux admins
- [ ] Statistiques cards: Total users, Total services, Total orders, Revenue
- [ ] Graphiques: Croissance utilisateurs, Commandes par jour, Revenu
- [ ] Tableau récentes transactions
- [ ] Top 5 services/freelancers populaires
- [ ] Lien vers gestion utilisateurs
- [ ] Lien vers gestion services
- [ ] Design responsive

## Labels
type/feature, domain/frontend, domain/admin, priority/high, effort/m

## Milestone
v2.0.0 - Admin & Analytics
```

---

## 📋 RÉSUMÉ

| # | Titre | Effort | Priorité | Milestone |
|---|-------|--------|----------|-----------|
| 1 | Accueil & Navigation | M | Critical | v1.0.0 |
| 2 | Inscription | M | Critical | v1.0.0 |
| 3 | Connexion | M | Critical | v1.0.0 |
| 4 | Mot de passe oublié | L | High | v1.0.0 |
| 5 | Vérification email | M | High | v1.0.0 |
| 6 | Session persistante | XS | High | v1.0.0 |
| 7 | Profil utilisateur | M | High | v1.1.0 |
| 8 | Gestion des rôles | M | Critical | v1.1.0 |
| 9 | Upload avatar | M | Medium | v1.1.0 |
| 10 | Créer un service | L | Critical | v1.2.0 |
| 11 | Voir les services | M | Critical | v1.2.0 |
| 12 | Filtrer services | L | High | v1.2.0 |
| 13 | Détail service | M | High | v1.2.0 |
| 14 | Commander | L | Critical | v1.3.0 |
| 15 | Mes commandes | M | High | v1.3.0 |
| 16 | Accepter/Rejeter | M | High | v1.3.0 |
| 17 | Messagerie | L | High | v1.4.0 |
| 18 | Démarrer chat | M | High | v1.4.0 |
| 19 | Laisser un avis | M | High | v1.5.0 |
| 20 | Dashboard Admin | M | High | v2.0.0 |

**Total:** 20 User Stories | **87 Story Points** (effort estimé)

---

## 🚀 Comment utiliser

### Option 1: Copie-colle manuel
1. Ouvre GitHub → New Issue
2. Copie le titre
3. Copie la description
4. Ajoute les labels et milestone
5. Create issue

### Option 2: Script automatisé
```powershell
.\create-github-issues.ps1
```

Bon courage! 🎉
