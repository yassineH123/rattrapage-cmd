# FreelanceHub - User Stories pour GitHub

## MILESTONES

### Milestone 1: v1.0.0 - MVP (Foundation)
### Milestone 2: v1.1.0 - Authentication & Profile
### Milestone 3: v1.2.0 - Services Core
### Milestone 4: v1.3.0 - Orders & Payments
### Milestone 5: v1.4.0 - Communication
### Milestone 6: v1.5.0 - Reviews & Ratings
### Milestone 7: v2.0.0 - Admin & Analytics

---

## LABELS À CRÉER

### Par Type
- `type/feature` - Nouvelle fonctionnalité
- `type/bug` - Bug/correction
- `type/enhancement` - Amélioration
- `type/documentation` - Documentation

### Par Domaine
- `domain/auth` - Authentication & Authorization
- `domain/frontend` - Interface utilisateur
- `domain/backend` - API & Logique serveur
- `domain/database` - Modèle de données
- `domain/payment` - Paiements & Transactions
- `domain/messaging` - Messagerie & Communication
- `domain/admin` - Panel d'administration

### Par Priorité
- `priority/critical` - Bloquant pour MVP
- `priority/high` - Important pour release
- `priority/medium` - Souhaitable
- `priority/low` - Nice to have

### Par Effort
- `effort/xs` - < 2 heures
- `effort/s` - 2-4 heures
- `effort/m` - 4-8 heures
- `effort/l` - 8-16 heures
- `effort/xl` - > 16 heures

### Statut
- `status/ready` - Prête pour développement
- `status/in-progress` - En cours
- `status/in-review` - En révision
- `status/done` - Terminée

---

## USER STORIES

### MILESTONE 1: v1.0.0 - MVP (Foundation)

#### US-001: Accueil & Navigation
**Description:** En tant que visiteur, je veux voir une page d'accueil attrayante pour découvrir la plateforme

Labels: `type/feature` `domain/frontend` `priority/critical` `effort/m`
Acceptance Criteria:
- [ ] Hero section avec call-to-action
- [ ] Statistiques en temps réel (utilisateurs, services, commandes)
- [ ] Services populaires affichés
- [ ] Appels à l'action (inscription, connexion)
- [ ] Design responsive mobile/desktop

---

#### US-002: Inscription utilisateur
**Description:** En tant que nouvel utilisateur, je veux créer un compte pour accéder à la plateforme

Labels: `type/feature` `domain/auth` `domain/frontend` `priority/critical` `effort/m`
Acceptance Criteria:
- [ ] Formulaire d'inscription avec nom, email, password
- [ ] Sélection du rôle (client/freelancer)
- [ ] Validation des données côté client et serveur
- [ ] Hachage sécurisé du mot de passe avec bcryptjs
- [ ] Création utilisateur en base de données
- [ ] Message de succès et redirection vers login

---

#### US-003: Connexion utilisateur
**Description:** En tant qu'utilisateur enregistré, je veux me connecter pour accéder à mon compte

Labels: `type/feature` `domain/auth` `domain/frontend` `priority/critical` `effort/m`
Acceptance Criteria:
- [ ] Formulaire email/password
- [ ] Validation des identifiants
- [ ] Génération JWT token
- [ ] Stockage token en localStorage
- [ ] Redirection vers dashboard après login
- [ ] Gestion des erreurs (email non trouvé, password incorrect)

---

#### US-004: Récupération de mot de passe
**Description:** En tant que utilisateur oublieux, je veux récupérer mon mot de passe

Labels: `type/feature` `domain/auth` `domain/backend` `priority/high` `effort/l`
Acceptance Criteria:
- [ ] Page "Mot de passe oublié"
- [ ] Entrée email et envoi lien reset
- [ ] Génération token reset unique (6h validité)
- [ ] Email avec lien reset envoyé via Nodemailer
- [ ] Page de reset avec nouveau password
- [ ] Validation et mise à jour en BD
- [ ] Confirmation de succès

---

#### US-005: Vérification email
**Description:** En tant qu'utilisateur, je veux vérifier mon email pour valider mon compte

Labels: `type/feature` `domain/auth` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Email de vérification envoyé à l'inscription
- [ ] Lien de vérification avec token
- [ ] Page de vérification (ou auto-vérification)
- [ ] Marquage du compte comme vérifié
- [ ] Expiration du token après 24h
- [ ] Option renvoyer l'email

---

#### US-006: Authentification persistante
**Description:** En tant qu'utilisateur, je veux rester connecté entre les sessions

Labels: `type/feature` `domain/auth` `domain/frontend` `priority/high` `effort/xs`
Acceptance Criteria:
- [ ] Récupération du token depuis localStorage
- [ ] Vérification validité token au chargement app
- [ ] Redirection si token invalide
- [ ] Refresh automatique si nécessaire

---

### MILESTONE 2: v1.1.0 - Authentication & Profile

#### US-007: Profil utilisateur
**Description:** En tant qu'utilisateur, je veux voir et éditer mon profil

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Page de profil avec informations utilisateur
- [ ] Avatar/photo de profil
- [ ] Formulaire d'édition (nom, bio, téléphone)
- [ ] Affichage des statistiques (avis, services, commandes)
- [ ] Bouton pour changer le password
- [ ] Bouton logout
- [ ] Sauvegarde des modifications

---

#### US-008: Profil public freelancer
**Description:** En tant que client, je veux voir le profil public d'un freelancer

Labels: `type/feature` `domain/frontend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Page profil public avec informations
- [ ] Nombre d'avis et note moyenne
- [ ] Portefeuille de services
- [ ] Historique pour voir les projets
- [ ] Bouton "Envoyer un message"
- [ ] Bouton "Voir les services"

---

#### US-009: Gestion des rôles (Admin/Freelancer/Client)
**Description:** En tant que système, je veux distinguer les rôles utilisateurs

Labels: `type/feature` `domain/auth` `domain/backend` `priority/critical` `effort/m`
Acceptance Criteria:
- [ ] Trois rôles: admin, freelancer, client
- [ ] Différent store/API selon le rôle
- [ ] Middleware de vérification rôle
- [ ] Accès restreint aux pages selon rôle
- [ ] ProtectedRoute pour routes privées

---

#### US-010: Upload avatar
**Description:** En tant qu'utilisateur, je veux uploader un avatar/photo

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Input file pour image
- [ ] Validation du type (jpg, png, webp)
- [ ] Compression/optimisation image
- [ ] Upload via Multer au backend
- [ ] Stockage en /uploads avec UUID
- [ ] Affichage du nouvel avatar
- [ ] Gestion des erreurs

---

### MILESTONE 3: v1.2.0 - Services Core

#### US-011: Créer un service (freelancer)
**Description:** En tant que freelancer, je veux créer et publier un service

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/critical` `effort/l`
Acceptance Criteria:
- [ ] Formulaire avec: titre, description, catégorie, prix, délai
- [ ] Upload image du service
- [ ] Validation des champs
- [ ] Création en BD avec freelancer_id
- [ ] Status par défaut "actif"
- [ ] Redirection vers dashboard après création
- [ ] Message de succès

---

#### US-012: Voir les services
**Description:** En tant que client, je veux voir tous les services disponibles

Labels: `type/feature` `domain/frontend` `priority/critical` `effort/m`
Acceptance Criteria:
- [ ] Liste paginée des services
- [ ] Affichage: image, titre, prix, note
- [ ] Info freelancer (avatar, nom)
- [ ] Responsive grid layout
- [ ] Skeleton loader pendant chargement
- [ ] Pas de services si liste vide

---

#### US-013: Filtrer et rechercher services
**Description:** En tant que client, je veux filtrer les services par catégorie et recherche

Labels: `type/feature` `domain/frontend` `priority/high` `effort/l`
Acceptance Criteria:
- [ ] Barre de recherche par texte
- [ ] Filtres par catégorie
- [ ] Filtres par prix (min/max slider)
- [ ] Filtres par note/avis
- [ ] URL avec paramètres de recherche
- [ ] Tri par: populaire, nouveau, prix
- [ ] Résultats en temps réel

---

#### US-014: Détail d'un service
**Description:** En tant que client, je veux voir les détails complets d'un service

Labels: `type/feature` `domain/frontend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Image du service grande
- [ ] Titre, description, prix
- [ ] Informations freelancer avec lien profil
- [ ] Note et avis clients
- [ ] Détails du délai/livraison
- [ ] Bouton "Commander"
- [ ] Partage (copier lien, réseaux sociaux optionnel)

---

#### US-015: Modifier son service (freelancer)
**Description:** En tant que freelancer, je veux éditer mes services

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Accès depuis dashboard "Mes services"
- [ ] Formulaire pré-rempli avec données
- [ ] Modification: titre, description, prix, délai, image
- [ ] Validation des champs
- [ ] Sauvegarde en BD
- [ ] Message de succès

---

#### US-016: Supprimer son service (freelancer)
**Description:** En tant que freelancer, je veux supprimer un service inactif

Labels: `type/feature` `domain/frontend` `priority/low` `effort/xs`
Acceptance Criteria:
- [ ] Bouton supprimer dans dashboard
- [ ] Confirmation avant suppression
- [ ] Suppression logique ou physique selon règles
- [ ] Mise à jour liste des services
- [ ] Message de confirmation

---

#### US-017: Catégories de services
**Description:** En tant que système, je veux organiser les services par catégories

Labels: `type/feature` `domain/backend` `priority/high` `effort/s`
Acceptance Criteria:
- [ ] Catégories pré-définies: Design, Dev, Marketing, Rédaction, Vidéo
- [ ] Affichage dans sélecteur création service
- [ ] Filtrage par catégorie fonctionnel
- [ ] Possibilité ajouter catégories (admin)

---

### MILESTONE 4: v1.3.0 - Orders & Payments

#### US-018: Commander un service
**Description:** En tant que client, je veux créer une commande pour un service

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/critical` `effort/l`
Acceptance Criteria:
- [ ] Bouton "Commander" sur détail service
- [ ] Sélection quantité (basique ou personnalisée)
- [ ] Affichage du prix total
- [ ] Confirmation avant passer commande
- [ ] Création ordre en BD (status: pending)
- [ ] Notification au freelancer
- [ ] Redirection vers dashboard/commandes

---

#### US-019: Voir mes commandes (client)
**Description:** En tant que client, je veux voir l'état de mes commandes

Labels: `type/feature` `domain/frontend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Dashboard avec liste des commandes
- [ ] Colonnes: service, freelancer, montant, statut, date
- [ ] Filtres par statut (en attente, acceptée, livrée, annulée)
- [ ] Lien vers détail commande
- [ ] Historique des commandes
- [ ] Pas de commandes si liste vide

---

#### US-020: Voir les commandes reçues (freelancer)
**Description:** En tant que freelancer, je veux voir les ordres reçus

Labels: `type/feature` `domain/frontend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Dashboard montrant les orders
- [ ] Informations: client, montant, date, statut
- [ ] Boutons accepter/rejeter
- [ ] Affichage visio par statut
- [ ] Tri et filtres par statut

---

#### US-021: Accepter/Rejeter une commande
**Description:** En tant que freelancer, je veux accepter ou rejeter une commande

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Boutons accepter/rejeter sur commande
- [ ] Confirmation avant action
- [ ] Mise à jour statut order (accepted/rejected)
- [ ] Notification au client
- [ ] Message d'explication optionnel
- [ ] Mise à jour du dashboard

---

#### US-022: Marquer livraison
**Description:** En tant que freelancer, je veux marquer une commande comme livrée

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Bouton "Marquer livré" pour commandes acceptées
- [ ] Optionnel: fichiers à joindre ou notes
- [ ] Mise à jour statut à "delivered"
- [ ] Notification au client
- [ ] Avis du client deviennent disponibles

---

#### US-023: Paiement simulé/Intégration Stripe
**Description:** En tant que système, je veux traiter les paiements

Labels: `type/feature` `domain/backend` `priority/high` `effort/xl`
Acceptance Criteria:
- [ ] Intégration Stripe/Paypal ou simulation de paiement
- [ ] Sécurisation des transactions
- [ ] Confirmation de paiement
- [ ] Mise à jour statut commande
- [ ] Wallet freelancer crédité
- [ ] Historique des transactions

---

#### US-024: Wallet freelancer
**Description:** En tant que freelancer, je veux voir mes gains

Labels: `type/feature` `domain/frontend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Section wallet dans profil
- [ ] Solde total des gains
- [ ] Historique des transactions
- [ ] Bouton retirer (Si implémenté paiement réel)
- [ ] Statistiques earnings par période

---

### MILESTONE 5: v1.4.0 - Communication

#### US-025: Messagerie entre utilisateurs
**Description:** En tant qu'utilisateur, je veux communiquer en direct avec un autre utilisateur

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/l`
Acceptance Criteria:
- [ ] Page Messages avec liste de conversations
- [ ] Chat interface pour chaque conversation
- [ ] Affichage des messages chronologiques
- [ ] Envoi de messages en temps réel (Socket.io)
- [ ] Indication "en ligne/hors ligne"
- [ ] Notification nouveau message
- [ ] Marquer comme lu
- [ ] Responsive design

---

#### US-026: Démarrer une conversation
**Description:** En tant qu'utilisateur, je veux initier une conversation

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Bouton "Envoyer un message" sur profil
- [ ] Bouton "Contacter" sur service
- [ ] Modal ou form pour premier message
- [ ] Création conversation en BD
- [ ] Redirection vers chat

---

#### US-027: Notifications en temps réel
**Description:** En tant qu'utilisateur, je veux être notifié des nouveaux messages

Labels: `type/feature` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Socket.io emit/listen pour messages
- [ ] Notification sonore (optionnel)
- [ ] Badge compteur messages non lus
- [ ] Mise à jour instant du chat
- [ ] Notification même si conversation fermée

---

#### US-028: Archiver une conversation
**Description:** En tant qu'utilisateur, je veux archiver les vieilles conversations

Labels: `type/feature` `domain/frontend` `priority/low` `effort/s`
Acceptance Criteria:
- [ ] Bouton archiver sur conversation
- [ ] Onglet "Archivées"
- [ ] Restaurer depuis archive si besoin
- [ ] Messages conservés

---

### MILESTONE 6: v1.5.0 - Reviews & Ratings

#### US-029: Deixar avis/review
**Description:** En tant que client, je veux laisser un avis sur un service reçu

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Bouton "Laisser un avis" sur commande livrée
- [ ] Form avec: note étoile (1-5), commentaire
- [ ] Validation: note obligatoire, commentaire optionnel
- [ ] Création review en BD
- [ ] Affichage immédiat du nouvel avis
- [ ] Moyen d'éditer son avis

---

#### US-030: Affichage des avis
**Description:** En tant que client, je veux voir les avis des autres utilisateurs

Labels: `type/feature` `domain/frontend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Section "Avis" sur détail service
- [ ] Moyenne des notes affichée
- [ ] Nombre d'avis total
- [ ] Liste des avis avec auteur, note, date, texte
- [ ] Tri: récent, note haute, note basse
- [ ] Avatar du revieweur

---

#### US-031: Calcul de note moyenne freelancer
**Description:** En tant que système, je veux calculer la note moyenne d'un freelancer

Labels: `type/feature` `domain/backend` `priority/high` `effort/s`
Acceptance Criteria:
- [ ] Calcul automatique de la moyenne lors d'un nouvel avis
- [ ] Stockage note_moyenne sur service/freelancer
- [ ] Mise à jour en temps réel
- [ ] Affichage cohérent partout

---

#### US-032: Répondre à un avis
**Description:** En tant que freelancer, je veux répondre aux avis des clients

Labels: `type/feature` `domain/frontend` `priority/low` `effort/m`
Acceptance Criteria:
- [ ] Bouton répondre sur chaque avis
- [ ] Form pour réponse courte
- [ ] Affichage de la réponse sous l'avis
- [ ] Notification au client de la réponse

---

### MILESTONE 7: v2.0.0 - Admin & Analytics

#### US-033: Dashboard Admin
**Description:** En tant qu'admin, je veux voir un dashboard avec statistiques

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Statistiques: total utilisateurs, services, commandes, revenu
- [ ] Graphiques: croissance utilisateurs, commandes par jour
- [ ] Transactions récentes
- [ ] Top services/freelancers
- [ ] Responsive dashboard

---

#### US-034: Gestion des utilisateurs (Admin)
**Description:** En tant qu'admin, je veux gérer les utilisateurs

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Tableau tous les utilisateurs
- [ ] Colonnes: nom, email, rôle, date inscription, actions
- [ ] Boutons: voir, éditer, supprimer, bloquer
- [ ] Filtres par rôle, statut vérification
- [ ] Pagination

---

#### US-035: Gestion des services (Admin)
**Description:** En tant qu'admin, je veux modérer les services

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/high` `effort/m`
Acceptance Criteria:
- [ ] Tableau de tous les services
- [ ] Colonnes: titre, auteur, catégorie, prix, avis, actions
- [ ] Boutons: voir, éditer, supprimer, approuver
- [ ] Filtres par catégorie, statut
- [ ] Recherche par titre

---

#### US-036: Gestion des commandes (Admin)
**Description:** En tant qu'admin, je veux voir toutes les commandes

Labels: `type/feature` `domain/frontend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Vue de toutes les commandes du système
- [ ] Statut des transactions
- [ ] Gestion des litiges (résoudre)
- [ ] Historique d'une commande

---

#### US-037: Rapports et export
**Description:** En tant qu'admin, je veux exporter des données pour rapports

Labels: `type/feature` `domain/backend` `priority/low` `effort/l`
Acceptance Criteria:
- [ ] Export PDF/CSV des statistiques
- [ ] Rapports par période
- [ ] Données utilisateurs
- [ ] Transactions
- [ ] Services populaires

---

#### US-038: Blocage/Déblocage utilisateur
**Description:** En tant qu'admin, je veux bloquer un utilisateur inapproprié

Labels: `type/feature` `domain/frontend` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Bouton bloquer sur utilisateur
- [ ] Compte bloqué ne peut pas se connecter
- [ ] Option débloquer
- [ ] Raison du blocage optionnelle
- [ ] Log des actions admin

---

### ADDITIONAL FEATURES

#### US-039: SEO et Meta données
**Description:** En tant que propriétaire, je veux que le site soit optimisé pour SEO

Labels: `type/enhancement` `domain/frontend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Meta tags sur toutes les pages
- [ ] Structured data (schema.org)
- [ ] Sitemaps
- [ ] Optimisation URL
- [ ] Open Graph pour partage social

---

#### US-040: Notification email
**Description:** En tant qu'utilisateur, je veux recevoir des emails de notification

Labels: `type/feature` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Email inscription bienvenue
- [ ] Email nouvelle commande
- [ ] Email acceptation commande
- [ ] Email livraison
- [ ] Email nouvel avis
- [ ] Preferences d'email configurables

---

#### US-041: Responsive design
**Description:** En tant qu'utilisateur mobile, l'app fonctionne bien sur mon téléphone

Labels: `type/feature` `domain/frontend` `priority/critical` `effort/l`
Acceptance Criteria:
- [ ] Mobile-first design
- [ ] Breakpoints: 480px, 768px, 1024px, 1360px
- [ ] Navigation mobile (hamburger menu)
- [ ] Touch-friendly buttons/inputs
- [ ] Pas de scroll horizontal
- [ ] Performance optimisée

---

#### US-042: Performance & Optimisation
**Description:** En tant qu'utilisateur, je veux une app rapide

Labels: `type/enhancement` `domain/frontend` `domain/backend` `priority/high` `effort/l`
Acceptance Criteria:
- [ ] Lazy loading images
- [ ] Code splitting React
- [ ] Caching des données
- [ ] Compression images
- [ ] Minification CSS/JS
- [ ] Lighthouse score > 85

---

#### US-043: Tests unitaires
**Description:** En tant que développeur, je veux avoir des tests

Labels: `type/feature` `domain/backend` `domain/frontend` `priority/medium` `effort/l`
Acceptance Criteria:
- [ ] Tests auth (login, logout, token)
- [ ] Tests API endpoints
- [ ] Tests composants critiques
- [ ] Coverage > 70%
- [ ] CI/CD (GitHub Actions)

---

#### US-044: Documentation API
**Description:** En tant que développeur, je veux une doc complète

Labels: `type/documentation` `domain/backend` `priority/medium` `effort/m`
Acceptance Criteria:
- [ ] Swagger/OpenAPI docs
- [ ] Exemples d'utilisation
- [ ] Auth headers
- [ ] Response codes
- [ ] Endpoints groupés

---

---

## RÉSUMÉ PAR MILESTONE

| Milestone | User Stories | Effort Estimé |
|-----------|-------------|---------------|
| v1.0.0 MVP | US-001 à US-006 | ~4-5 semaines |
| v1.1.0 Profile | US-007 à US-010 | ~2 semaines |
| v1.2.0 Services | US-011 à US-017 | ~3 semaines |
| v1.3.0 Orders | US-018 à US-024 | ~3-4 semaines |
| v1.4.0 Messaging | US-025 à US-028 | ~2 semaines |
| v1.5.0 Reviews | US-029 à US-032 | ~2 semaines |
| v2.0.0 Admin | US-033 à US-038 | ~2-3 semaines |
| Features Additionnels | US-039 à US-044 | ~2 semaines |

---

## TEMPLATE POUR CRÉER LES ISSUES

Copie ce template pour chaque User Story sur GitHub:

```markdown
## Description
[Description de la user story]

## Acceptance Criteria
- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3

## Tasks
- [ ] Task 1
- [ ] Task 2

## Labels
type/feature, domain/frontend, priority/high, effort/m

## Milestone
v1.0.0 MVP

## Related Issues
Liens vers autres issues si applicable
```
