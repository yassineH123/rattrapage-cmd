# Script PowerShell pour créer les User Stories comme Issues GitHub
# et les organiser dans un Kanban (GitHub Project)

# ========================================
# CONFIGURATION
# ========================================
$OWNER = "ton-username"  # À remplacer
$REPO = "freelancehub"
$FULL_REPO = "$OWNER/$REPO"

Write-Host "📝 Création des User Stories como Issues GitHub..." -ForegroundColor Cyan
Write-Host ""

# Vérifier que gh CLI est installé
if (-not (Test-Path -Path (Get-Command gh -ErrorAction SilentlyContinue).Source)) {
    Write-Host "❌ GitHub CLI (gh) n'est pas installé." -ForegroundColor Red
    Exit 1
}

# ========================================
# DÉFINIR LES USER STORIES
# ========================================
$stories = @(
    # MILESTONE 1: v1.0.0 MVP
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-001"
        title = "Accueil & Navigation"
        body = @"
**Description:** En tant que visiteur, je veux voir une page d'accueil attrayante pour découvrir la plateforme

**Acceptance Criteria:**
- [ ] Hero section avec call-to-action
- [ ] Statistiques en temps réel (utilisateurs, services, commandes)
- [ ] Services populaires affichés
- [ ] Appels à l'action (inscription, connexion)
- [ ] Design responsive mobile/desktop

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "priority/critical", "effort/m")
    },
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-002"
        title = "Inscription utilisateur"
        body = @"
**Description:** En tant que nouvel utilisateur, je veux créer un compte pour accéder à la plateforme

**Acceptance Criteria:**
- [ ] Formulaire d'inscription avec nom, email, password
- [ ] Sélection du rôle (client/freelancer)
- [ ] Validation des données côté client et serveur
- [ ] Hachage sécurisé du mot de passe avec bcryptjs
- [ ] Création utilisateur en base de données
- [ ] Message de succès et redirection vers login

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/auth", "domain/frontend", "priority/critical", "effort/m")
    },
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-003"
        title = "Connexion utilisateur"
        body = @"
**Description:** En tant qu'utilisateur enregistré, je veux me connecter pour accéder à mon compte

**Acceptance Criteria:**
- [ ] Formulaire email/password
- [ ] Validation des identifiants
- [ ] Génération JWT token
- [ ] Stockage token en localStorage
- [ ] Redirection vers dashboard après login
- [ ] Gestion des erreurs (email non trouvé, password incorrect)

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/auth", "domain/frontend", "priority/critical", "effort/m")
    },
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-004"
        title = "Récupération de mot de passe"
        body = @"
**Description:** En tant que utilisateur oublieux, je veux récupérer mon mot de passe

**Acceptance Criteria:**
- [ ] Page "Mot de passe oublié"
- [ ] Entrée email et envoi lien reset
- [ ] Génération token reset unique (6h validité)
- [ ] Email avec lien reset envoyé via Nodemailer
- [ ] Page de reset avec nouveau password
- [ ] Validation et mise à jour en BD
- [ ] Confirmation de succès

**Type:** Feature
**Effort:** L
"@
        labels = @("type/feature", "domain/auth", "domain/backend", "priority/high", "effort/l")
    },
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-005"
        title = "Vérification email"
        body = @"
**Description:** En tant qu'utilisateur, je veux vérifier mon email pour valider mon compte

**Acceptance Criteria:**
- [ ] Email de vérification envoyé à l'inscription
- [ ] Lien de vérification avec token
- [ ] Page de vérification (ou auto-vérification)
- [ ] Marquage du compte comme vérifié
- [ ] Expiration du token après 24h
- [ ] Option renvoyer l'email

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/auth", "domain/backend", "priority/high", "effort/m")
    },
    @{
        milestone = "v1.0.0 - MVP"
        number = "US-006"
        title = "Authentification persistante"
        body = @"
**Description:** En tant qu'utilisateur, je veux rester connecté entre les sessions

**Acceptance Criteria:**
- [ ] Récupération du token depuis localStorage
- [ ] Vérification validité token au chargement app
- [ ] Redirection si token invalide
- [ ] Refresh automatique si nécessaire

**Type:** Feature
**Effort:** XS
"@
        labels = @("type/feature", "domain/auth", "domain/frontend", "priority/high", "effort/xs")
    },

    # MILESTONE 2: v1.1.0 Profile & Auth
    @{
        milestone = "v1.1.0 - Profile & Auth"
        number = "US-007"
        title = "Profil utilisateur"
        body = @"
**Description:** En tant qu'utilisateur, je veux voir et éditer mon profil

**Acceptance Criteria:**
- [ ] Page de profil avec informations utilisateur
- [ ] Avatar/photo de profil
- [ ] Formulaire d'édition (nom, bio, téléphone)
- [ ] Affichage des statistiques (avis, services, commandes)
- [ ] Bouton pour changer le password
- [ ] Bouton logout
- [ ] Sauvegarde des modifications

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/high", "effort/m")
    },
    @{
        milestone = "v1.1.0 - Profile & Auth"
        number = "US-008"
        title = "Gestion des rôles"
        body = @"
**Description:** En tant que système, je veux distinguer les rôles utilisateurs

**Acceptance Criteria:**
- [ ] Trois rôles: admin, freelancer, client
- [ ] Différent store/API selon le rôle
- [ ] Middleware de vérification rôle
- [ ] Accès restreint aux pages selon rôle
- [ ] ProtectedRoute pour routes privées

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/auth", "domain/backend", "priority/critical", "effort/m")
    },
    @{
        milestone = "v1.1.0 - Profile & Auth"
        number = "US-009"
        title = "Upload avatar"
        body = @"
**Description:** En tant qu'utilisateur, je veux uploader un avatar/photo

**Acceptance Criteria:**
- [ ] Input file pour image
- [ ] Validation du type (jpg, png, webp)
- [ ] Compression/optimisation image
- [ ] Upload via Multer au backend
- [ ] Stockage en /uploads avec UUID
- [ ] Affichage du nouvel avatar
- [ ] Gestion des erreurs

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/medium", "effort/m")
    },

    # MILESTONE 3: v1.2.0 Services
    @{
        milestone = "v1.2.0 - Services Core"
        number = "US-010"
        title = "Créer un service (freelancer)"
        body = @"
**Description:** En tant que freelancer, je veux créer et publier un service

**Acceptance Criteria:**
- [ ] Formulaire avec: titre, description, catégorie, prix, délai
- [ ] Upload image du service
- [ ] Validation des champs
- [ ] Création en BD avec freelancer_id
- [ ] Status par défaut "actif"
- [ ] Redirection vers dashboard après création
- [ ] Message de succès

**Type:** Feature
**Effort:** L
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/critical", "effort/l")
    },
    @{
        milestone = "v1.2.0 - Services Core"
        number = "US-011"
        title = "Voir les services"
        body = @"
**Description:** En tant que client, je veux voir tous les services disponibles

**Acceptance Criteria:**
- [ ] Liste paginée des services
- [ ] Affichage: image, titre, prix, note
- [ ] Info freelancer (avatar, nom)
- [ ] Responsive grid layout
- [ ] Skeleton loader pendant chargement
- [ ] Pas de services si liste vide

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "priority/critical", "effort/m")
    },
    @{
        milestone = "v1.2.0 - Services Core"
        number = "US-012"
        title = "Filtrer et rechercher services"
        body = @"
**Description:** En tant que client, je veux filtrer les services par catégorie et recherche

**Acceptance Criteria:**
- [ ] Barre de recherche par texte
- [ ] Filtres par catégorie
- [ ] Filtres par prix (min/max slider)
- [ ] Filtres par note/avis
- [ ] URL avec paramètres de recherche
- [ ] Tri par: populaire, nouveau, prix
- [ ] Résultats en temps réel

**Type:** Feature
**Effort:** L
"@
        labels = @("type/feature", "domain/frontend", "priority/high", "effort/l")
    },
    @{
        milestone = "v1.2.0 - Services Core"
        number = "US-013"
        title = "Détail d'un service"
        body = @"
**Description:** En tant que client, je veux voir les détails complets d'un service

**Acceptance Criteria:**
- [ ] Image du service grande
- [ ] Titre, description, prix
- [ ] Informations freelancer avec lien profil
- [ ] Note et avis clients
- [ ] Détails du délai/livraison
- [ ] Bouton "Commander"
- [ ] Partage (copier lien, réseaux sociaux optionnel)

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "priority/high", "effort/m")
    },

    # MILESTONE 4: v1.3.0 Orders
    @{
        milestone = "v1.3.0 - Orders & Payments"
        number = "US-014"
        title = "Commander un service"
        body = @"
**Description:** En tant que client, je veux créer une commande pour un service

**Acceptance Criteria:**
- [ ] Bouton "Commander" sur détail service
- [ ] Sélection quantité (basique ou personnalisée)
- [ ] Affichage du prix total
- [ ] Confirmation avant passer commande
- [ ] Création ordre en BD (status: pending)
- [ ] Notification au freelancer
- [ ] Redirection vers dashboard/commandes

**Type:** Feature
**Effort:** L
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/critical", "effort/l")
    },
    @{
        milestone = "v1.3.0 - Orders & Payments"
        number = "US-015"
        title = "Voir mes commandes (client)"
        body = @"
**Description:** En tant que client, je veux voir l'état de mes commandes

**Acceptance Criteria:**
- [ ] Dashboard avec liste des commandes
- [ ] Colonnes: service, freelancer, montant, statut, date
- [ ] Filtres par statut (en attente, acceptée, livrée, annulée)
- [ ] Lien vers détail commande
- [ ] Historique des commandes
- [ ] Pas de commandes si liste vide

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "priority/high", "effort/m")
    },
    @{
        milestone = "v1.3.0 - Orders & Payments"
        number = "US-016"
        title = "Accepter/Rejeter une commande"
        body = @"
**Description:** En tant que freelancer, je veux accepter ou rejeter une commande

**Acceptance Criteria:**
- [ ] Boutons accepter/rejeter sur commande
- [ ] Confirmation avant action
- [ ] Mise à jour statut order (accepted/rejected)
- [ ] Notification au client
- [ ] Message d'explication optionnel
- [ ] Mise à jour du dashboard

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/high", "effort/m")
    },

    # MILESTONE 5: v1.4.0 Messaging
    @{
        milestone = "v1.4.0 - Communication"
        number = "US-017"
        title = "Messagerie entre utilisateurs"
        body = @"
**Description:** En tant qu'utilisateur, je veux communiquer en direct avec un autre utilisateur

**Acceptance Criteria:**
- [ ] Page Messages avec liste de conversations
- [ ] Chat interface pour chaque conversation
- [ ] Affichage des messages chronologiques
- [ ] Envoi de messages en temps réel (Socket.io)
- [ ] Indication "en ligne/hors ligne"
- [ ] Notification nouveau message
- [ ] Marquer comme lu
- [ ] Responsive design

**Type:** Feature
**Effort:** L
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "domain/messaging", "priority/high", "effort/l")
    },
    @{
        milestone = "v1.4.0 - Communication"
        number = "US-018"
        title = "Démarrer une conversation"
        body = @"
**Description:** En tant qu'utilisateur, je veux initier une conversation

**Acceptance Criteria:**
- [ ] Bouton "Envoyer un message" sur profil
- [ ] Bouton "Contacter" sur service
- [ ] Modal ou form pour premier message
- [ ] Création conversation en BD
- [ ] Redirection vers chat

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/high", "effort/m")
    },

    # MILESTONE 6: v1.5.0 Reviews
    @{
        milestone = "v1.5.0 - Reviews & Ratings"
        number = "US-019"
        title = "Laisser un avis/review"
        body = @"
**Description:** En tant que client, je veux laisser un avis sur un service reçu

**Acceptance Criteria:**
- [ ] Bouton "Laisser un avis" sur commande livrée
- [ ] Form avec: note étoile (1-5), commentaire
- [ ] Validation: note obligatoire, commentaire optionnel
- [ ] Création review en BD
- [ ] Affichage immédiat du nouvel avis
- [ ] Moyen d'éditer son avis

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/backend", "priority/high", "effort/m")
    },
    @{
        milestone = "v1.5.0 - Reviews & Ratings"
        number = "US-020"
        title = "Affichage des avis"
        body = @"
**Description:** En tant que client, je veux voir les avis des autres utilisateurs

**Acceptance Criteria:**
- [ ] Section "Avis" sur détail service
- [ ] Moyenne des notes affichée
- [ ] Nombre d'avis total
- [ ] Liste des avis avec auteur, note, date, texte
- [ ] Tri: récent, note haute, note basse
- [ ] Avatar du revieweur

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "priority/high", "effort/m")
    },

    # MILESTONE 7: v2.0.0 Admin
    @{
        milestone = "v2.0.0 - Admin & Analytics"
        number = "US-021"
        title = "Dashboard Admin"
        body = @"
**Description:** En tant qu'admin, je veux voir un dashboard avec statistiques

**Acceptance Criteria:**
- [ ] Statistiques: total utilisateurs, services, commandes, revenu
- [ ] Graphiques: croissance utilisateurs, commandes par jour
- [ ] Transactions récentes
- [ ] Top services/freelancers
- [ ] Responsive dashboard

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/admin", "priority/high", "effort/m")
    },
    @{
        milestone = "v2.0.0 - Admin & Analytics"
        number = "US-022"
        title = "Gestion des utilisateurs (Admin)"
        body = @"
**Description:** En tant qu'admin, je veux gérer les utilisateurs

**Acceptance Criteria:**
- [ ] Tableau tous les utilisateurs
- [ ] Colonnes: nom, email, rôle, date inscription, actions
- [ ] Boutons: voir, éditer, supprimer, bloquer
- [ ] Filtres par rôle, statut vérification
- [ ] Pagination

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/admin", "priority/high", "effort/m")
    },
    @{
        milestone = "v2.0.0 - Admin & Analytics"
        number = "US-023"
        title = "Gestion des services (Admin)"
        body = @"
**Description:** En tant qu'admin, je veux modérer les services

**Acceptance Criteria:**
- [ ] Tableau de tous les services
- [ ] Colonnes: titre, auteur, catégorie, prix, avis, actions
- [ ] Boutons: voir, éditer, supprimer, approuver
- [ ] Filtres par catégorie, statut
- [ ] Recherche par titre

**Type:** Feature
**Effort:** M
"@
        labels = @("type/feature", "domain/frontend", "domain/admin", "priority/high", "effort/m")
    }
)

# ========================================
# CRÉER LES ISSUES
# ========================================
Write-Host "✍️  Création de $(($stories).Count) User Stories..." -ForegroundColor Cyan
Write-Host ""

$createdIssues = @()

foreach ($story in $stories) {
    Write-Host "  • [$($story.number)] $($story.title)..." -NoNewline
    
    try {
        # Créer l'issue
        $labelsJson = ($story.labels | ConvertTo-Json -Compress).Replace('"', '\"')
        
        $issue = gh issue create `
            --repo $FULL_REPO `
            --title "$($story.number) - $($story.title)" `
            --body $story.body `
            --milestone $story.milestone `
            --label $story.labels `
            --format=json 2>$null | ConvertFrom-Json
        
        if ($issue) {
            $createdIssues += @{
                number = $issue.number
                title = $story.title
                milestone = $story.milestone
            }
            Write-Host " ✅" -ForegroundColor Green
        }
    } catch {
        Write-Host " ❌ Erreur" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✨ $($createdIssues.Count) User Stories créées avec succès!" -ForegroundColor Green
Write-Host ""

# ========================================
# CRÉER LE GITHUB PROJECT (KANBAN)
# ========================================
Write-Host "📊 Création du GitHub Project (Kanban)..." -ForegroundColor Cyan
Write-Host ""

try {
    # Créer le projet
    $projectName = "FreelanceHub Backlog"
    
    # Note: La création de projet via CLI est limitée
    # On affiche les instructions manuelles
    Write-Host "⚠️  La création automatique de projet n'est pas encore disponible via gh CLI" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Instructions pour créer le Kanban manuellement:" -ForegroundColor Cyan
    Write-Host "1. Va sur: https://github.com/$FULL_REPO/projects"
    Write-Host "2. Clique sur 'New project'"
    Write-Host "3. Nom: 'FreelanceHub Backlog'"
    Write-Host "4. Template: 'Table' ou 'Board'"
    Write-Host "5. Ajoute les colonnes:"
    Write-Host "   - Backlog (status/ready)"
    Write-Host "   - In Progress (status/in-progress)"
    Write-Host "   - In Review (status/in-review)"
    Write-Host "   - Done (status/done)"
    Write-Host "6. Ajoute tes 23 issues au project"
    Write-Host ""
    
} catch {
    Write-Host "Note: Le Kanban doit être créé manuellement sur GitHub" -ForegroundColor Yellow
}

Write-Host "🎉 Prochaine étape:" -ForegroundColor Green
Write-Host "   Organize tes issues dans le Kanban sur GitHub Projects"
Write-Host "   Utilise les labels et milestones pour filtrer"
Write-Host ""
