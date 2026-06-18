import type { InterviewCategory } from '@core/models/interview.models';

export const gitCategory: InterviewCategory = {
  id: 'git',
  title: 'Git',
  color: 'background: var(--color-warning); color: white',
  description: 'Concepts essentiels de Git',
  sections: [
    {
      id: 'git-base',
      title: 'Fondamentaux',
      questions: [
        {
          id: 'git-1',
          question: "C'est quoi Git ?",
          answer: "**Git** est un **système de contrôle de version distribué**, créé par Linus Torvalds en 2005. Chaque développeur possède une copie complète de l'historique du dépôt localement — pas besoin d'être connecté au serveur pour travailler.\n\nIl gère les versions du code, permet de revenir en arrière et facilite la collaboration via les branches et les fusions. C'est le **standard de l'industrie** pour travailler en équipe sur un même code.",
        
          deepDive: `# C'est quoi Git ?

## Principe fondamental

Git est un **système de contrôle de version distribué** (DVCS) créé par **Linus Torvalds** en 2005 pour le développement du noyau Linux. Contrairement aux systèmes centralisés (SVN, CVS), chaque développeur possède une **copie complète** de l'historique du dépôt localement. Pas besoin d'être connecté au serveur pour travailler, commiter, ou consulter l'historique.

Git gère les versions du code, permet de revenir en arrière, et facilite la collaboration via les branches et les fusions. C'est le **standard de l'industrie** pour le développement logiciel en équipe.

## Architecture en trois arbres

Git organise votre travail en trois zones distinctes :

\`\`\`
+---------------+      +---------------+      +---------------+
|  Working Tree | ---> |  Index (Stage)| ---> |   Local Repo  |
|  (fichiers)   | add  |  (préparés)   | commit| (historique)  |
+---------------+      +---------------+      +---------------+
                                                       |
                                                       | push/pull
                                                       v
                                               +---------------+
                                               | Remote Repo   |
                                               | (GitHub, etc.)|
                                               +---------------+
\`\`\`

## Commandes fondamentales

\`\`\`bash
# Initialiser un dépôt
git init

# Cloner un dépôt distant
git clone https://github.com/user/projet.git

# Voir l'état du working tree
git status

# Ajouter des fichiers à l'index (staging)
git add fichier.txt
git add .              # tous les fichiers modifiés
git add -p             # ajout interactif (hunk par hunk)

# Commiter
git commit -m "feat: ajouter validation email"

# Voir l'historique
git log --oneline --graph --all

# Envoyer au distant
git push origin main

# Récupérer les modifications distantes
git pull origin main
\`\`\`

## Pourquoi Git est distribué ?

| Aspect | Centralisé (SVN) | Distribué (Git) |
|--------|------------------|-----------------|
| Historique local | Non | Oui |
| Travail hors ligne | Impossible | Total |
| Backup | Un seul point de défaillance | Chaque clone est un backup |
| Vitesse des opérations | Dépend du réseau | Locale (instantanée) |
| Expérimentation | Risquée | Branches locales isolées |

Chaque clone Git est un **backup complet** du projet. Si le serveur central tombe, n'importe quel développeur peut le restaurer.

## SHA-1 et intégrité

Tout dans Git est identifié par un **hash SHA-1** (40 caractères hexadécimaux) :

\`\`\`bash
# Exemple de hash
git log --oneline -1
# a1b2c3d4 Ajouter validation email
\`\`\`

Ce hash est calculé à partir du **contenu** du fichier et de son **emplacement** dans l'historique. Modifier un commit passé change tous les hashes suivants — garantie d'intégrité.

## Bonnes pratiques

- **Commits atomiques** : une modification logique par commit
- **Messages clairs** : décrire le QUOI et le POURQUOI
- **Branches** : utiliser des branches pour chaque fonctionnalité
- **Pull avant push** : synchroniser avant d'envoyer
- **Ignorer** : configurer \`.gitignore\` dès le début
- **Ne pas commit** les secrets, fichiers générés, dépendances

## Pièges courants

- Commiter sur \`main\` directement (toujours utiliser des branches)
- Messages de commit vagues ("fix", "update", "WIP")
- Oublier de \`git add\` avant \`git commit\` (commit vide)
- Confondre \`git reset\` (réécrit l'historique) et \`git revert\` (sûr)
- \`git push --force\` sans prévenir l'équipe (utiliser \`--force-with-lease\`)

## Pour aller plus loin

\`\`\`bash
# Voir la configuration Git
git config --list

# Aide intégrée
git help <commande>
git <commande> --help

# Vérifier l'intégrité du dépôt
git fsck
\`\`\`

Source : [Documentation officielle Git](https://git-scm.com/doc) et [Pro Git Book](https://git-scm.com/book/fr/v2)

## Git et le travail en équipe

Git brille particulièrement en environnement collaboratif :

- **Pull Requests / Merge Requests** : proposer des modifications, review, discussion
- **Code review** : chaque modification est revue avant d'être intégrée
- **CI/CD** : tests automatisés déclenchés à chaque push
- **Releases** : taguer les versions, générer des changelogs
- **Gestion de bugs** : branche de fix, PR, merge, déploiement

Le workflow Git typique en équipe :
\`\`\`bash
git checkout -b feature/mon-ticket
# ... développer ...
git add -p && git commit -m "feat: description"
git push -u origin feature/mon-ticket
# Créer une Pull Request → review → merge
\`\`\`

Source additionnelle : [Pro Git Book (FR)](https://git-scm.com/book/fr/v2)
`},
        {
          id: 'git-2',
          question: "C'est quoi un bon commit ?",
          answer: "Un bon commit décrit le **QUOI** et le **POURQUOI** : « Fixe le bug de validation des emails » (quoi) + « Les emails avec un '+' étaient rejetés à tort » (pourquoi). Évitez les messages vagues comme « update ».\n\nUtilisez les **commits conventionnels** : `feat`, `fix`, `refactor`, etc. pour un historique lisible. __Une seule modification logique par commit.__",
          code: 'git commit -m "Fixe le bug de validation des emails"',
          language: 'bash',
        
          deepDive: `# Un bon commit

## Principe fondamental

Un bon commit est une **unité logique de modification** qui doit pouvoir être comprise, appliquée ou annulée indépendamment des autrès commits. Chaque commit raconte une partie de l'histoire du projet.

Un commit de qualité répond à trois questions :
- **QUOI** a été modifié ? (le titre)
- **POURQUOI** cette modification ? (le corps)
- **QUI** a modifié ? (auteur, date — automatique)

## Conventional Commits — la norme

Le format **Conventional Commits** est devenu le standard de l'industrie :

\`\`\`
<type>[portée optionnelle]: <description>

[corps optionnel]

[pied optionnel]
\`\`\`

### Types principaux

| Type | Usage | Exemple |
|------|-------|---------|
| \`feat\` | Nouvelle fonctionnalité | \`feat: ajouter connexion OAuth2\` |
| \`fix\` | Correction de bug | \`fix: erreur 500 sur login invalide\` |
| \`docs\` | Documentation | \`docs: mise à jour README\` |
| \`refactor\` | Restructuration | \`refactor: extraire service de validation\` |
| \`test\` | Tests | \`test: ajouter tests unitaires auth\` |
| \`chore\` | Maintenance | \`chore: mettre à jour dépendances\` |
| \`style\` | Formatage | \`style: reformater avec Prettier\` |
| \`perf\` | Performance | \`perf: optimiser requête SQL N+1\` |

### Exemples concrets

\`\`\`bash
# Bon commit — titre clair + corps explicatif
git commit -m "$(cat <<'EOF'
feat: ajouter validation email dans le formulaire d'inscription

- Ajout d'une regex RFC 5322 pour la validation
- Message d'erreur personnalisé en français
- Tests unitaires pour les cas valides/invalides
- Intégration avec le service d'envoi d'emails

Closes #123
EOF
)"

# Mauvais commits (à proscrire)
git commit -m "fix"           # trop vague
git commit -m "updates"       # ne dit rien
git commit -m "WIP"           # work in progress permanent
git commit -m "asdf"          # inutile
git commit -m "changes"       # quoi ? pourquoi ?
\`\`\`

## Atomic commits — la règle d'or

Un commit **atomique** respecte ces critères :

1. **Une seule responsabilité** : une feature, un fix, un refactoring — pas tout à la fois
2. **Testable** : le projet compile et les tests passent après ce commit
3. **Réversible** : on peut annuler ce commit sans conséquences sur les autrès fonctionnalités

\`\`\`bash
# MAUVAIS : tout dans un seul commit
git commit -m "feat: ajouter dashboard + fix bug login + mise à jour README"

# BON : trois commits séparés
git commit -m "feat: ajouter dashboard avec KPI utilisateurs"
git commit -m "fix: correction erreur 401 sur route /api/login"
git commit -m "docs: mettre à jour README avec instructions déploiement"
\`\`\`

## Commandes utiles pour travailler les commits

\`\`\`bash
# Voir les derniers commits (compact)
git log --oneline -10

# Modifier le dernier commit (message ou contenu)
git add fichier-oublie.js
git commit --amend --no-edit

# Modifier seulement le message du dernier commit
git commit --amend -m "feat: nouveau message plus clair"

# Split un commit en plusieurs (rebase interactif)
git rebase -i HEAD~3
# Changer "pick" en "edit" pour le commit à scinder
git reset HEAD~1        # défaire le commit, garder les modifs
git add -p              # ajouter progressivement
git commit -m "partie 1"
git commit -m "partie 2"
git rebase --continue
\`\`\`

## Bonnes pratiques

- **Titre ≤ 50 caractères**, corps optionnel à 72 caractères max par ligne
- **Impératif présent** : "Ajouter" pas "Ajouté" ni "Ajoute"
- **Majuscule** au début du titre
- **Pas de point** à la fin du titre
- **Un commit = un changement logique** (SRP)
- **Relire son diff** avant de commiter (\`git diff --cached\`)

## Pièges courants

- Commits énormes et impossibles à reviewer
- Messages trop longs dans le titre, pas de corps quand nécessaire
- Oublier d'inclure les fichiers liés (ex: oublier le fichier de test)
- Commiter sans vérifier que ça compile
- \`--amend\` sur un commit déjà pushé (réécriture d'historique)

## Pour aller plus loin

\`\`\`bash
# Voir les statistiques par auteur
git shortlog -sne

# Générer un changelog automatique
git log --oneline --grep="^feat\\|^fix" --since="v1.0.0"

# Vérifier les commits non pushés
git log origin/main..HEAD --oneline
\`\`\`

Source : [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/) et [Git SCM — Commit Guidelines](https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-flots-de-travail)`},
        {
          id: 'git-3',
          question: 'Dépôt distant',
          answer: "Un **dépôt distant** est hébergé sur un serveur (`GitHub`, `GitLab`, `Bitbucket`) et permet la collaboration d'équipe. `git remote add` connecte votre local au distant (« `origin` » par convention), `git push` envoie les commits, `git pull`/`git fetch` récupère les modifications.\n\nWorkflow classique : `pull` → travailler → `commit` → `push`. Tout tourne autour de la **synchronisation local/distant**.",
          code: 'git remote add origin https://github.com/user/repo.git\ngit push origin main',
          language: 'bash',
        
          deepDive: `# Depot distant (Remote)

## Principe

Un depot distant (remote) est une version de votre projet hebergee sur un serveur (GitHub, GitLab, Bitbucket, etc.). Les remotes permettent la collaboration entre développeurs en servant de reference commune pour synchroniser le travail.

## Commandes de base

\`\`\`bash
# Lister les remotes configures
git remote -v
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

# Ajouter un remote
git remote add origin https://github.com/user/repo.git

# Modifier l'URL d'un remote
git remote set-url origin https://github.com/user/nouveau-repo.git

# Renommer un remote
git remote rename origin upstream

# Supprimer un remote
git remote remove origin
\`\`\`

## Travailler avec les remotes

### Clone — Copie complete

\`\`\`bash
# Clone un depot distant, configure origin automatiquement
git clone https://github.com/user/repo.git

# Clone dans un dossier specifique
git clone https://github.com/user/repo.git mon-projet

# Clone avec une branche specifique
git clone --branch develop https://github.com/user/repo.git
\`\`\`

### Push — Envoyer les commits

\`\`\`bash
# Pousser une branche vers le remote
git push origin main

# Pousser et definir le upstream (suivi)
git push -u origin feature-auth
# Prochain push : juste "git push"

# Pousser toutes les branches
git push --all origin

# Pousser les tags
git push --tags

# Pousser avec force (ATTENTION)
git push --force-with-lease origin main
# --force-with-lease est plus sur que --force
\`\`\`

### Fetch — Telecharger sans fusionner

\`\`\`bash
# Recuperer les modifications distantes
git fetch origin

# Recuperer une branche specifique
git fetch origin main

# Recuperer et nettoyer les references supprimees
git fetch --prune origin

# Apres fetch, les branches distantes sont disponibles
git log origin/main
git diff main origin/main
git merge origin/main
\`\`\`

### Pull — Fetch + Merge

\`\`\`bash
# Pull standard (fetch + merge)
git pull origin main

# Pull avec rebase (historique lineaire)
git pull --rebase origin main

# Equivalent a :
git fetch origin main
git rebase origin/main
\`\`\`

## Branches distantes

\`\`\`bash
# Voir les branches distantes
git branch -r
# origin/main
# origin/develop
# origin/feature-auth

# Voir toutes les branches (locales + distantes)
git branch -a

# Creer une branche locale qui suit une branche distante
git checkout --track origin/feature-auth

# Ou avec un nom différent
git checkout -b ma-feature origin/feature-auth

# Supprimer une branche distante
git push origin --delete feature-auth
\`\`\`

## Fetch vs Pull — Comparaison detaillee

| Aspect | git fetch | git pull |
|--------|-----------|----------|
| Operation | Telecharge seulement | Fetch + Merge |
| Working directory | Non modifie | Modifie (merge) |
| Securite | Plus sur (vous decidez quand merger) | Risque de conflits inattendus |
| Contrôle | Total | Moindre |
| Cas d'usage | Verifier avant d'integrer | Mise à jour rapide |

### Workflow recommande

\`\`\`bash
# 1. Verifier ce qui a change
git fetch origin
git log --oneline main..origin/main

# 2. Voir les differences
git diff main origin/main --stat

# 3. Integrer si tout va bien
git merge origin/main

# Equivalent rapide (si confiance)
git pull --rebase origin main
\`\`\`

## Gerer plusieurs remotes

\`\`\`bash
# Workflow open source typique
git remote add origin https://github.com/mon-compte/repo.git
git remote add upstream https://github.com/original/repo.git

# Recuperer les mises à jour du projet original
git fetch upstream
git merge upstream/main

# Pusher sur mon fork
git push origin main
\`\`\`

## Bonnes pratiques

- Verifier le remote avant de pusher (\`git remote -v\`)
- Pull avant de commencer a travailler
- Communiquer avant de forcer un push
- Utiliser \`--force-with-lease\` (pas \`--force\`)
- Nettoyer les branches distantes supprimees (\`fetch --prune\`)

## Sources

- [Git Remote Documentation](https://git-scm.com/docs/git-remote)
- [Pro Git — Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
`},
        {
          id: 'git-4',
          question: 'git clone vs git fork',
          answer: "`git clone` crée une copie locale d'un dépôt distant, liée au dépôt original — vous pouvez push directement si vous avez les droits. `git fork` (fonctionnalité GitHub, pas Git) crée une copie indépendante sur votre compte GitHub, pour contribuer via **Pull Request**.\n\nC'est le workflow open source : forkez, modifiez, proposez via PR. **Clone** = copie locale liée, **fork** = copie indépendante pour contribuer via PR.",
        
          deepDive: `# git clone vs git fork

## Principe fondamental

\`git clone\` et \`git fork\` sont deux façons d'obtenir une copie d'un projet, mais pour des usages très différents :

- **\`git clone\`** : commande Git qui crée une **copie locale** d'un dépôt distant, avec un lien vers l'original (remote "origin"). Vous pouvez push directement si vous avez les droits d'écriture.
- **\`git fork\`** : action GitHub/GitLab/Bitbucket qui crée une **copie indépendante** du dépôt sur votre compte cloud. Pas de lien de push vers l'original — vous contribuez via **Pull Request**.

## git clone en détail

\`\`\`bash
# Cloner un dépôt public
git clone https://github.com/user/projet.git

# Le remote "origin" est automatiquement configuré
cd projet
git remote -v
# origin  https://github.com/user/projet.git (fetch)
# origin  https://github.com/user/projet.git (push)

# Cloner dans un dossier spécifique
git clone https://github.com/user/projet.git mon-dossier

# Cloner une branche spécifique
git clone --branch develop https://github.com/user/projet.git

# Clone superficiel (pas tout l'historique) — utile pour CI
git clone --depth 1 https://github.com/user/projet.git
\`\`\`

Quand utiliser \`clone\` :
- Vous êtes **contributeur** ou **collaborateur** du projet
- Vous avez les droits d'écriture sur le dépôt
- Vous travaillez en équipe sur un projet privé

## git fork en détail

\`\`\`bash
# Le fork se fait SUR LE SITE WEB (GitHub, GitLab, Bitbucket)
# 1. Cliquer "Fork" sur la page du dépôt
# 2. Choisir votre compte comme destination
# 3. Le fork est créé sous votre nom d'utilisateur
#
# Puis en local :
git clone https://github.com/VOTRE-COMPTE/projet.git

# Ajouter le dépôt original comme "upstream"
git remote add upstream https://github.com/ORIGINAL/projet.git

# Voir les remotes
git remote -v
# origin    https://github.com/votre-compte/projet.git (push)
# upstream  https://github.com/original/projet.git (fetch)
\`\`\`

## Workflow complet de contribution open source

\`\`\`bash
# 1. Forker le projet original sur GitHub

# 2. Cloner votre fork
git clone https://github.com/votre-compte/projet.git
cd projet

# 3. Ajouter l'upstream (dépôt original)
git remote add upstream https://github.com/original/projet.git

# 4. Créer une branche pour votre feature
git checkout -b feature/ma-contribution

# 5. Faire vos modifications...

# 6. Synchroniser avec l'upstream régulièrement
git fetch upstream
git rebase upstream/main

# 7. Pusher sur votre fork
git push origin feature/ma-contribution

# 8. Créer une Pull Request sur GitHub
\`\`\`

## Comparaison détaillée

| Aspect | git clone | git fork |
|--------|-----------|----------|
| Type d'opération | Commande Git locale | Action web (GitHub/GitLab) |
| Copie locale | Oui | Non (nécessite clone ensuite) |
| Lien vers l'original | Remote "origin" en lecture/écriture | Pas de push direct vers l'original |
| Droits nécessaires | Accès en lecture | Aucun (même sur dépôt privé si invité) |
| Contribution | Push direct | Pull Request uniquement |
| Isolation | Lié à l'original | Complètement indépendant |
| Usage typique | Travail en équipe | Open source, contributions externes |

## Synchroniser son fork avec l'original

\`\`\`bash
# Récupérer les dernières modifications de l'original
git fetch upstream

# Se mettre sur main et fusionner
git checkout main
git merge upstream/main

# Ou mieux : rebaser pour un historique linéaire
git checkout main
git rebase upstream/main

# Pusher sur votre fork
git push origin main
\`\`\`

## Bonnes pratiques

- Toujours **forker** depuis l'organisation, pas depuis un fork (perte du lien)
- Configurer **upstream** immédiatement après le clone du fork
- Faire des **rebase** (pas des merge) pour garder un historique propre
- Ne pas travailler sur \`main\` du fork — utiliser des **branches de feature**
- Synchroniser régulièrement pour éviter les conflits massifs

## Pièges courants

- Travailler directement sur \`main\` du fork (complique la synchro)
- Pusher sur l'original au lieu du fork (vérifier \`git remote -v\`)
- Faire une PR depuis \`main\` du fork (préférer une branche dédiée)
- Oublier de synchroniser avant de créer la PR (conflits évitables)
- Pusher des secrets ou fichiers sensibles (le fork est public)

Source : [GitHub — Fork a Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) et [Git SCM — Remote](https://git-scm.com/docs/git-remote)`},
        {
          id: 'git-5',
          question: 'git pull vs git fetch',
          answer: "`git fetch` récupère les modifications du distant **sans les fusionner** — vous pouvez vérifier l'état avant de décider. `git pull` fait les deux d'un coup : `fetch` + `merge` automatique.\n\nLe risque avec `pull` est de rencontrer des conflits inattendus si le distant a divergé. Préférez `fetch` + `merge` manuel pour plus de contrôle. **Fetch** = télécharger sans fusionner (plus sûr), **Pull** = télécharger et fusionner (*plus rapide mais risqué*).",
        
          deepDive: `# git pull vs git fetch

## Principe fondamental

\`git fetch\` et \`git pull\` sont deux commandes pour synchroniser votre dépôt local avec le dépôt distant. Leur différence est cruciale :

- **\`git fetch\`** : télécharge les données du distant **sans les fusionner**. Votre working tree reste intact.
- **\`git pull\`** : fait un \`fetch\` puis un **\`merge\` automatique** dans votre branche actuelle.

Le choix entre les deux dépend de votre besoin de **contrôle** : \`fetch\` vous laisse inspecter avant de fusionner, \`pull\` fait tout d'un coup.

## git fetch — télécharger sans fusionner

\`\`\`bash
# Récupérer toutes les branches distantes
git fetch origin

# Récupérer une branche spécifique
git fetch origin main

# Récupérer et supprimer les refs distantes supprimées
git fetch --prune origin

# Voir ce qui a été récupéré
git log origin/main --oneline -5

# Comparer votre branche avec la distante
git diff main origin/main

# Voir les commits distants non encore fusionnés
git log HEAD..origin/main --oneline
\`\`\`

**Avantages de fetch :**
- **Sûr** : ne touche pas à votre working tree
- **Contrôle** : vous décidez quand et comment fusionner
- **Inspection** : vous pouvez voir les différences avant de merger
- **Pas de conflit surprise** : les conflits sont gérés manuellement

## git pull — télécharger et fusionner

\`\`\`bash
# Pull standard (fetch + merge)
git pull origin main

# Pull avec rebase (fetch + rebase) — préféré pour historique linéaire
git pull --rebase origin main

# Configurer pull.rebase par défaut
git config --global pull.rebase true

# Pull d'une branche qui n'a pas d'upstream configuré
git pull origin feature-branch
\`\`\`

**Inconvénients de pull :**
- **Conflits inattendus** : le merge peut créer des conflits que vous n'avez pas anticipés
- **Commit de merge automatique** : crée un commit de fusion qui pollue l'historique
- **Moins de contrôle** : vous ne voyez pas ce qui arrive avant que ce soit fusionné

## Workflow recommandé : fetch puis merge manuel

\`\`\`bash
# Étape 1 : récupérer les modifications distantes
git fetch origin

# Étape 2 : inspecter ce qui a changé
git log main..origin/main --oneline --graph
git diff main origin/main --stat

# Étape 3 : décider comment fusionner
# Si tout va bien, merge simple
git merge origin/main

# Si vous voulez un historique linéaire
git rebase origin/main

# Si vous avez des modifs locales non commitées
git stash
git merge origin/main
git stash pop
\`\`\`

## Comparaison détaillée

| Aspect | git fetch | git pull |
|--------|-----------|----------|
| Télécharge les données | Oui | Oui |
| Modifie le working tree | Non | Oui (merge) |
| Crée un commit de merge | Non | Oui (sauf fast-forward) |
| Risque de conflit | Aucun | Possible |
| Contrôle sur la fusion | Manuel total | Automatique |
| Idéal pour | Inspection, branches partagées | Mise à jour rapide |

## Gérer les conflits après un pull

\`\`\`bash
# Si git pull génère des conflits
git status
# both modified: src/app.ts

# Résoudre manuellement dans le fichier, puis
git add src/app.ts
git commit -m "Merge branch main of origin"

# Alternative : abandonner le merge
git merge --abort

# Avec rebase : résoudre puis continuer
git pull --rebase origin main
# ... résoudre les conflits ...
git add src/app.ts
git rebase --continue
\`\`\`

## Cas particuliers

\`\`\`bash
# Pull sur une branche sans upstream
git branch --set-upstream-to=origin/main main

# Forcer un pull qui écrase les modifs locales (dangereux)
git fetch origin
git reset --hard origin/main

# Pull uniquement les tags
git fetch --tags
\`\`\`

## Bonnes pratiques

- Préférer \`git fetch\` + \`git merge\` pour les branches partagées
- Utiliser \`git pull --rebase\` pour garder un historique linéaire
- **Stasher ou commiter** avant de pull si vous avez des modifications locales
- Vérifier avec \`git status\` avant tout pull
- Configurer \`pull.rebase true\` en global pour éviter les merge commits

## Pièges courants

- \`git pull\` avec des modifications locales non commitées (conflit ou écrasement)
- Commit de merge involontaire qui pollue l'historique
- Oublier qu'un \`git pull\` peut échouer à cause de conflits
- Utiliser \`git pull\` sur une branche avec un historique très divergent

Source : [Git Pull Documentation](https://git-scm.com/docs/git-pull) et [Git Fetch Documentation](https://git-scm.com/docs/git-fetch)`},
        {
          id: 'git-17',
          question: '.gitignore',
          answer: "Fichier listant les fichiers et répertoires à **exclure du suivi Git** : fichiers compilés (`*.class`), dépendances (`node_modules/`), configs locales (`.env`), fichiers IDE (`.idea/`), secrets et tokens.\n\nCréez-le **dès l'initialisation** du projet. Sur GitHub, des templates `.gitignore` existent par langage/framework. Un fichier oublié dans Git peut être retiré ultérieurement avec `git rm --cachéed` sans le supprimer localement. __Ne jamais committer de secrets ou de fichiers générés.__",
          code: '# .gitignore\nnode_modules/\n.env\ntarget/\n*.class\n.idea/',
          language: 'bash',
        
          deepDive: `# .gitignore

## Principe fondamental

Le fichier \`.gitignore\` indique à Git quels fichiers et répertoires **ignorer** lors du suivi des modifications. C'est essentiel pour éviter de commiter :

- Des fichiers **générés** (compilation, build, dépendances)
- Des **secrets** et informations sensibles (\`.env\`, clés API)
- Des fichiers **spécifiques à l'environnement** (IDE, OS)
- Des **caches** et fichiers temporaires

**Règle d'or** : committer le \`.gitignore\` dès le premier commit. Ne jamais committer de fichiers sensibles ou générés.

## Syntaxe du .gitignore

\`\`\`gitignore
# Commentaires (commencent par #)

# Ignorer un fichier spécifique
secrets.json

# Ignorer un répertoire (et tout son contenu)
node_modules/
build/
dist/
target/

# Pattern générique (tous les fichiers .log)
*.log

# Ignorer à la racine uniquement (pas dans les sous-dossiers)
/*.env

# Négation (suivre malgré le pattern)
*.log
!important.log        # important.log sera suivi

# Caractères génériques
*.tmp                 # finit par .tmp
doc/*.txt             # fichier .txt dans doc/
file?.txt             # file1.txt, fileA.txt (mais pas file10.txt)
file[0-9].txt         # file1.txt...file9.txt
**/build/             # tout dossier build/ à n'importe quelle profondeur
\`\`\`

## Exemples par langage

\`\`\`gitignore
# Node.js / JavaScript
node_modules/
npm-debug.log*
.env
dist/
build/
.cache/

# Java
target/
*.class
*.jar
*.war
.settings/
.project
.classpath
.idea/
*.iml

# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
env/

# Angular / TypeScript
node_modules/
dist/
*.js.map
*.d.ts
.angular/

# Go
vendor/

# Rust
target/
Cargo.lock

# Docker
.dockerignore  # (mais .dockerignore pour Docker)
\`\`\`

## .gitignore global

\`\`\`bash
# Créer un .gitignore global (s'applique à tous les dépôts)
git config --global core.excludesfile ~/.gitignore_global

# Contenu typique du .gitignore global (fichiers IDE/OS)
.DS_Store
Thumbs.db
*.swp
*.swo
*~
.idea/
.vscode/
\`\`\`

## Outils de débogage

\`\`\`bash
# Vérifier pourquoi un fichier est ignoré
git check-ignore -v monfichier.txt
# .gitignore:2:*.log   monfichier.txt   ← ligne 2 du .gitignore

# Lister tous les fichiers ignorés
git status --ignored

# Voir les patterns de .gitignore qui s'appliquent
git check-ignore -v *

# Forcer l'ajout d'un fichier ignoré
git add -f monfichier.log
\`\`\`

## Après avoir commité par erreur un fichier ignoré

\`\`\`bash
# Si un fichier est déjà suivi par Git, .gitignore ne l'affecte pas
# Solution : retirer du suivi (sans supprimer localement)
git rm --cached fichier.env
echo "fichier.env" >> .gitignore
git add .gitignore
git commit -m "chore: arrêter le suivi de fichier.env"

# Si vous avez commité un secret
# 1. git rm --cached
# 2. Ajouter au .gitignore
# 3. Commiter
# 4. Changer le secret (le commit existe toujours dans l'historique !)
# 5. Contacter l'admin GitHub pour purger l'historique si nécessaire
\`\`\`

## Bonnes pratiques

- **Committer le \`.gitignore\`** dès le premier commit du projet
- Utiliser un **template** par langage (GitHub propose des templates : https://github.com/github/gitignore)
- Séparer les **patterns globaux** (IDE, OS) dans un \`.gitignore_global\`
- **Tester** avec \`git check-ignore -v\` si un fichier n'est pas ignoré comme prévu
- Ignorer les fichiers de **configuration personnelle** (\`.env.local\`, \`config.dev.json\`)
- **Documenter** les patterns non évidents avec des commentaires

## Pièges courants

- **Un fichier déjà suivi n'est pas affecté par \`.gitignore\`** : utiliser \`git rm --cached\`
- Pattern trop large qui ignore des fichiers nécessaires (\`*.log\` dans \`logs/\` utile)
- Commit accidentel de **secrets** malgré le \`.gitignore\` (vérifier avec \`git diff --cached\`)
- Oublier que \`.gitignore\` lui-même doit être commité
- Utiliser \`/\` en début de pattern pour la racine, pas pour les chemins relatifs

## Pour aller plus loin

\`\`\`bash
# Forcer l'ajout d'un fichier ignoré
git add -f config.prod.json

# Voir les fichiers ignorés non suivis
git ls-files --others --ignored --exclude-standard

# Ignorer temporairement des fichiers locaux sans modifier le .gitignore
git update-index --skip-worktree config.local.json

# Templates de .gitignore
curl -L https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore
\`\`\`

Source : [Git Ignore Documentation](https://git-scm.com/docs/gitignore)`},
      ],
    },
    {
      id: 'git-branches',
      title: 'Branches & Fusion',
      questions: [
        {
          id: 'git-6',
          question: "C'est quoi une branche ?",
          answer: "Une **branche** est un pointeur mobile vers une série de commits, créant un **espace de travail isolé**. Vous développez une fonctionnalité ou corrigez un bug sans toucher au code principal (`main`/`master`).\n\nUne fois terminé, vous fusionnez la branche dans le code principal. Cela permet à plusieurs développeurs de travailler **en parallèle** sans se gêner.",
          code: 'git branch feature-login\ngit checkout feature-login',
          language: 'bash',
        
          deepDive: `# Qu'est-ce qu'une branche Git

## Principe fondamental

Une branche Git est un **pointeur mobile** vers un commit dans l'historique. Elle permet de travailler sur des fonctionnalités, corrections ou expériences de manière **isolée** sans affecter le code principal.

Contrairement à d'autrès VCS où copier une branche signifie dupliquer tous les fichiers, Git crée simplement un **pointeur de 41 octets** (40 pour le SHA-1 + 1 pour le newline). Les branches sont donc extrêmement légères et rapides à créer.

\`\`\`
HEAD → main → abc123 (Commit C3)
                |
           def456 (Commit C2)
                |
           ghi789 (Commit C1)
\`\`\`

## Le pointeur HEAD

HEAD est un pointeur spécial qui indique où vous vous trouvez actuellement :

\`\`\`bash
# HEAD pointe vers la branche active
git log --oneline -1
# abc123 (HEAD -> main) Commit C3

# En detâched HEAD : HEAD pointe directement sur un commit
git checkout abc123
# Vous êtes en 'detâched HEAD' state
\`\`\`

## Commandes de gestion des branches

\`\`\`bash
# Lister les branches locales
git branch

# Lister toutes les branches (locales + distantes)
git branch -a

# Voir la branche actuelle
git branch --show-current

# Créer une branche (sans basculer)
git branch feature-auth

# Créer et basculer (recommandé)
git switch -c feature-auth

# Ancienne syntaxe (encore fonctionnelle)
git checkout -b feature-auth

# Basculer sur une branche existante
git switch feature-auth
git checkout feature-auth  # syntaxe plus ancienne

# Renommer la branche courante
git branch -m feature-auth feature-login

# Supprimer une branche fusionnée
git branch -d feature-auth

# Forcer la suppression (non fusionnée)
git branch -D feature-auth
\`\`\`

## Branches distantes (remote tracking)

\`\`\`bash
# Voir les branches distantes
git branch -r
# origin/main
# origin/develop
# origin/feature-auth

# Créer une branche locale qui suit une distante
git switch -c feature-auth origin/feature-auth

# Syntaxe équivalente
git checkout --track origin/feature-auth

# Pusher une branche avec upstream
git push -u origin feature-auth

# Voir la relation de tracking
git branch -vv

# Supprimer une branche distante
git push origin --delete feature-auth
\`\`\`

## Détâched HEAD — comprendre et récupérer

\`\`\`bash
# Se placer sur un commit spécifique (pas une branche)
git checkout abc123
# Warning: detâched HEAD state

# Faire des commits en detâched HEAD
git commit -m "experiment"
# Les commits ne sont rattachés à aucune branche !

# Solution : créer une branche pour les récupérer
git switch -c recovery-branch

# Ou revenir à la branche sans perdre les commits
git branch recovery-branch  # depuis le detâched HEAD
git switch main
\`\`\`

## Naming conventions

\`\`\`
feature/ma-fonctionnalite    # nouvelles fonctionnalités
bugfix/correction-ticket     # corrections de bugs
hotfix/urgent-production     # correctifs urgents (depuis main)
release/v1.2.0              # préparation de release
chore/mise-a-jour-deps      # maintenance
\`\`\`

## Bonnes pratiques

- **Branches courtes** : quelques jours max, merge fréquent
- **Focus** : une branche = une fonctionnalité
- **Noms descriptifs** : \`feature/auth-oauth2\` plutôt que \`branche1\`
- **Supprimer après merge** : fait le ménage (\`git branch -d\`)
- **Protéger main** : pas de push direct, PR + review obligatoire
- **\`git switch\`** plutôt que \`git checkout\` pour éviter les confusions

## Pièges courants

- Travailler longtemps sur une branche sans merger (conflits massifs)
- Confondre \`git branch -d\` (suppression locale) avec suppression distante
- Oublier sur quelle branche on se trouve avant de commiter
- Supprimer une branche non fusionnée et perdre du travail
- Pusher une branche avec des secrets ou des credentials

## Pour aller plus loin

\`\`\`bash
# Voir l'historique graphique des branches
git log --graph --oneline --all --decorate

# Comparer deux branches
git diff main..feature-auth
git log main..feature-auth --oneline

# Voir les commits non fusionnés dans main
git log origin/main..HEAD --oneline

# Rebaser une branche sur main
git switch feature-auth
git rebase main
\`\`\`

Source : [Git Branch Documentation](https://git-scm.com/docs/git-branch) et [Pro Git — Branches](https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Les-branches-en-bref)`},
        {
          id: 'git-7',
          question: 'Fusionner des branches / conflits',
          answer: "`git merge` combine deux branches. Des **conflits** surviennent quand les mêmes lignes sont modifiées dans les deux branches — Git insère des marqueurs (`<<<<<<<`, `=======`, `>>>>>>>`) et demande une résolution manuelle.\n\nOuvrez le fichier, choisissez la bonne version (ou combinez-les), puis commitez. __Clé : fusionner régulièrement pour éviter que les conflits ne s'accumulent.__",
        
          deepDive: `# Fusionner des branches et résoudre les conflits

## Principe fondamental

\`git merge\` intègre l'historique d'une branche dans la branche active. Git combine automatiquement les modifications, mais quand les **mêmes lignes** ont été modifiées différemment dans les deux branches, un **conflit** apparaît et nécessite une résolution manuelle.

Types de merge :

- **Fast-forward** : pas de divergence, simple avance du pointeur (historique linéaire)
- **Three-way merge** : divergence, création d'un commit de fusion avec deux parents

\`\`\`
Fast-forward (pas de divergence) :
main:    A---B---C
                    \\
feature:             D---E
Apres merge: A---B---C---D---E (pointeur avance)

Three-way merge (divergence) :
main:    A---B---C---------M
                    \\       /
feature:             D---E
Apres merge: A---B---C---M (commit de fusion)
                          / \\
                         D   E
\`\`\`

## Syntaxe des merges

\`\`\`bash
# Merge simple (fast-forward si possible)
git checkout main
git merge feature-auth

# Forcer un commit de fusion (garder trace de la branche)
git merge --no-ff feature-auth

# Squash : fusionner en un seul commit (perd l'historique de la branche)
git merge --squash feature-auth

# Abandonner un merge en cours
git merge --abort

# Merge avec stratégie spécifique
git merge -s reçursive -X theirs feature-branch

# Simuler un merge sans l'appliquer
git merge --no-commit --no-ff feature-auth
git diff --cached
\`\`\`

## Stratégies de merge

| Stratégie | Usage |
|-----------|-------|
| \`reçursive\` (défaut) | Gère les merges avec deux parents, idéal pour la plupart des cas |
| \`resolve\` | Plus simple, pour historiques linéaires |
| \`octopus\` | Pour merger plus de 2 branches simultanément |
| \`ours\` | Garde la version de la branche courante, ignore l'autre |
| \`subtree\` | Pour merger un projet dans un sous-répertoire |

\`\`\`bash
# Stratégies avancées
git merge -s reçursive -X patience feature-branch
git merge -s octopus branch1 branch2 branch3
git merge -s ours feature-branch  # garder NOTRE version
\`\`\`

## Résolution de conflits

Quand un conflit survient, Git insère des **marqueurs de conflit** dans les fichiers :

\`\`\`bash
# Voir les fichiers en conflit
git status
# both modified: src/app.ts

# Voir les conflits
git diff
\`\`\`

### Structure d'un conflit

\`\`\`diff
<<<<<<< HEAD
const name = "Alice";
const age = 30;
=======
const name = "Bob";
const age = 25;
>>>>>>> feature-branch
\`\`\`

### Résolution manuelle

\`\`\`bash
# 1. Ouvrir le fichier, choisir/combiner les versions
# 2. Supprimer les marqueurs <<<<<<< ======= >>>>>>>
# 3. Marquer comme résolu
git add src/app.ts

# 4. Finaliser le merge
git commit -m "Merge feature-branch, resolve conflict in app.ts"
\`\`\`

### Résolution avec outils

\`\`\`bash
# Lancer l'outil de merge configuré
git mergetool

# Configurer l'outil (VS Code)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait $MERGED"

# Utiliser "ours" ou "theirs" pour trancher rapidement
git checkout --ours src/app.ts      # garder version HEAD
git checkout --theirs src/app.ts    # garder version de l'autre branche
\`\`\`

## Bonnes pratiques

- **Fusionner fréquemment** depuis \`main\` dans votre branche pour éviter les conflits massifs
- **Tester après chaque merge** avant de pusher
- **Commits atomiques** : plus faciles à merger et à résoudre
- **Communiquer** avec l'équipe si vous modifiez des fichiers partagés
- **Utiliser \`--no-ff\`** pour garder la trace des branches de feature
- **Préférer \`--squash\`** pour des branches avec beaucoup de micro-commits

## Pièges courants

- Merger une branche avec des tests cassés
- Oublier de faire \`git add\` après résolution de conflit
- Résoudre les conflits en gardant accidentellement les marqueurs \`<<<<<<<\`
- Merge de branches avec des historiques très divergents (conflits en cascade)
- Utiliser la stratégie \`ours\` sans comprendre qu'on perd le code de l'autre branche

## Pour aller plus loin

\`\`\`bash
# Voir les commits non fusionnés
git log --left-right HEAD...feature-branch

# Lister les fichiers en conflit uniquement
git diff --name-only --diff-filter=U

# Réessayer le merge après modification manuelle
git checkout -m src/app.ts

# Merge avec message personnalisé
git merge -m "feat: intégrer authentification OAuth2 (#42)"
\`\`\`

Source : [Git Merge Documentation](https://git-scm.com/docs/git-merge) et [Pro Git — Branching and Merging](https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-fusions)`},
        {
          id: 'git-8',
          question: 'git rebase ?',
          answer: "`git rebase` **réécrit l'historique** d'une branche en appliquant ses commits au-dessus d'une autre branche. Résultat : un historique **linéaire et propre**, sans commit de fusion inutile.\n\nMais `rebase` modifie les hashes des commits — __ne l'utilisez jamais sur une branche déjà pushée et partagée__. __Règle d'or : `rebase` uniquement sur des branches locales non partagées.__",
          code: 'git checkout feature-login\ngit rebase main',
          language: 'bash',
        
          deepDive: `# git rebase

## Principe fondamental

\`git rebase\` **réapplique les commits** d'une branche sur une autre base, créant un historique **linéaire** plutôt qu'un commit de fusion. L'idée est de "transplanter" une série de commits d'un point A vers un point B.

\`\`\`
Avant rebase :
main:      A---B---C
                    \\
feature:             D---E

Apres rebase :
main:      A---B---C---D'---E'
                    ^
                    Les commits D et E sont réappliqués sur C
                    (nouveaux hashes : D' et E')
\`\`\`

**Règle d'or : ne jamais rebaser une branche déjà pushée et partagée.** Le rebase réécrit l'historique, ce qui désynchronise tous les autrès développeurs.

## Syntaxe de base

\`\`\`bash
# Rebaser votre branche feature sur main
git switch feature-auth
git rebase main

# Rebaser interactif sur les 3 derniers commits
git rebase -i HEAD~3

# Rebaser sur un tag
git rebase v1.0.0

# Continuer après résolution de conflit
git rebase --continue

# Sauter un commit problématique pendant le rebase
git rebase --skip

# Annuler complètement le rebase
git rebase --abort
\`\`\`

## Le processus en détail

\`\`\`bash
# Étape 1 : se placer sur la branche à rebaser
git switch feature-auth

# Étape 2 : lancer le rebase
git rebase main

# Étape 3 : si conflit, Git s'arrête sur le commit problématique
# Résoudre puis :
git add fichier-resolu.ts
git rebase --continue

# Répéter pour chaque commit problématique...

# Étape 4 : une fois terminé, pusher (--force-with-lease !)
git push --force-with-lease origin feature-auth
\`\`\`

## Rebase interactif (git rebase -i)

Le rebase interactif ouvre un éditeur avec la liste des commits :

\`\`\`bash
git rebase -i HEAD~5
\`\`\`

Actions disponibles :

| Mot-clé | Action |
|---------|--------|
| \`pick\` | Garder le commit tel quel |
| \`reword\` | Modifier le message du commit |
| \`edit\` | Suspendre pour modifier le contenu du commit |
| \`squash\` | Fusionner avec le commit précédent |
| \`fixup\` | Fusionner et ignorer le message |
| \`drop\` | Supprimer le commit |
| \`exec\` | Exécuter une commande (tests) |

## Rebase vs Merge — cas pratique

\`\`\`bash
# Avec merge :
git switch main
git merge feature-auth
# Résultat : A--B--C--M
#                  /  \\
#                 D    E

# Avec rebase + merge fast-forward :
git switch feature-auth
git rebase main
git switch main
git merge feature-auth
# Résultat : A--B--C--D'--E' (linéaire et propre)
\`\`\`

## Cas avancés

\`\`\`bash
# Rebase depuis l'upstream (pour synchroniser)
git rebase origin/main

# Rebase en gardant les commits de merge
git rebase --rebase-merges main

# Rebase avec stratégie de merge
git rebase -s reçursive -X theirs main

# Rebaser uniquement les commits non pushés
git rebase -i @{u}

# Rebase en cascade (stack de branches)
git rebase main feature-base
git rebase feature-base feature-detail

# Rebase automatique via pull
git pull --rebase origin main
\`\`\`

## Bonnes pratiques

- **NE JAMAIS** rebaser une branche publique/partagée
- Rebaser **avant** de merger une feature dans main (historique linéaire)
- Utiliser \`git pull --rebase\` pour synchroniser sans merge commit
- Toujours utiliser \`--force-with-lease\` plutôt que \`--force\` après rebase
- **Tester** après le rebase — les conflits peuvent introduire des bugs subtils
- Faire un backup (branche temporaire) avant un rebase complexe

## Pièges courants

- Pusher (\`--force\`) après rebase sans avertir l'équipe
- Perte de commits si le rebase échoue et qu'on ne sait pas récupérer (utiliser \`reflog\`)
- Conflits en cascade si la branche a beaucoup de commits et a beaucoup divergé
- Rebaser une branche qui a déjà été mergée ailleurs (doublons de commits)
- \`git push --force\` écrase l'historique distant — utiliser \`--force-with-lease\`

## Pour aller plus loin

\`\`\`bash
# Voir l'état avant/après rebase
git reflog

# Rebaser sur le parent du merge (utile après un merge)
git rebase --onto main HEAD~3

# Configurer pull.rebase par défaut
git config --global pull.rebase true

# Vérifier les commits non pushés
git log origin/main..HEAD --oneline
\`\`\`

Source : [Git Rebase Documentation](https://git-scm.com/docs/git-rebase) et [Pro Git — Rebasing](https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Rebaser)`},
        {
          id: 'git-9',
          question: 'merge vs rebase',
          answer: "`git merge` crée un commit de fusion avec deux parents — l'historique est **fidèle** mais peut devenir complexe. `git rebase` réécrit l'historique pour un flux **linéaire** plus lisible.\n\nEn pratique, `rebase` est souvent utilisé sur les branches de feature avant `merge` dans `main`. Mais `rebase` est *dangereux* sur les branches partagées car il modifie les hashes. **Merge** = historique fidèle, **Rebase** = historique linéaire — le choix dépend de la politique d'équipe.",
        
          deepDive: `# Merge vs Rebase

## Principe fondamental

\`git merge\` et \`git rebase\` sont deux stratégies pour intégrer les modifications d'une branche dans une autre. Chacune a ses avantages et ses inconvénients, et le choix dépend de votre workflow d'équipe.

- **Merge** : crée un commit de fusion qui préserve l'historique exact des branches
- **Rebase** : réapplique les commits sur une nouvelle base, créant un historique linéaire

## Comparaison visuelle

\`\`\`
Merge (historique non linéaire) :
main:    A---B---C---------M
                    \\       /
feature:             D---E

Rebase (historique linéaire) :
main:    A---B---C---D'---E'
\`\`\`

## Comparaison détaillée

| Critère | Merge | Rebase |
|---------|-------|--------|
| Historique | Non linéaire (commits de fusion) | Linéaire |
| Réécriture des commits | Non (nouveaux hashes seulement pour le merge) | Oui (nouveaux hashes pour TOUS les commits) |
| Sécurité | Parfait pour les branches partagées | Dangereux sur branches partagées |
| Conflits | Résolus une fois (dans le commit de merge) | Résolus pour chaque commit |
| Traçabilité | Claire (le merge commit montre l'intégration) | Moins évidente (historique "réécrit") |
| Complexité visuelle | Élevée (graphe dense) | Faible (ligne droite) |
| Code review | Plus facile (historique fidèle) | Plus propre (historique épuré) |

## Quand utiliser merge

\`\`\`bash
# Merge : pour les branches partagées et les releases
git checkout main
git merge --no-ff release/v2.0

# Merge : quand la traçabilité est importante
git merge --no-ff feature-auth
# Le commit de fusion garde la trace : "feature-auth a été mergée le X"

# Merge : pour les hotfixes (visibilité immédiate)
git checkout main
git merge --no-ff hotfix/urgent-patch

# Merge : workflow Git Flow classique
git checkout develop
git merge --no-ff feature/new-feature
\`\`\`

**Avantages du merge :**
- Historique fidèle et non destructif
- Sécurisé : ne modifie pas les commits existants
- Montre clairement quand une branche a été intégrée
- Idéal pour les branches longues (release, hotfix)

**Inconvénients du merge :**
- Graphe complexe, difficile à suivre
- Commits de merge inutiles si fast-forward possible
- "Diamond problems" dans l'historique visuel

## Quand utiliser rebase

\`\`\`bash
# Rebase : pour les branches locales non partagées
git switch feature-auth
git rebase main

# Rebase : avant d'ouvrir une PR (nettoyer l'historique)
git rebase -i main
# Squasher les commits de debug, réordonner, etc.

# Rebase : pull avec historique linéaire
git pull --rebase origin main

# Rebase : synchroniser une branche locale avec main
git switch feature-auth
git rebase main  # plutôt que merge main
\`\`\`

**Avantages du rebase :**
- Historique linéaire et propre
- Pas de commits de fusion inutiles
- Facilite la navigation dans l'historique
- Idéal pour les PR et code review

**Inconvénients du rebase :**
- Réécrit l'historique (nouveaux hashes) — dangereux si partagé
- Conflits répétés (un par commit) au lieu d'une résolution unique
- Perte de la trace temporelle de la création de la branche

## Workflow hybride recommandé

De nombreuses équipes utilisent un **workflow hybride** qui combine les deux :

\`\`\`bash
# 1. Sur votre branche de feature locale :
git switch feature-auth

# 2. Synchroniser avec main (rebase pour rester à jour)
git rebase main

# 3. Nettoyer les commits (squash, réordonner)
git rebase -i main

# 4. Pusher (première fois ou --force-with-lease si déja pushé)
git push --force-with-lease origin feature-auth

# 5. Créer une PR — le reviewer voit un historique propre

# 6. Intégrer dans main (merge --no-ff pour garder trace)
git checkout main
git merge --no-ff feature-auth
\`\`\`

## Bonnes pratiques

- **Jamais de rebase** sur une branche publique/partagée
- **Merge** pour les branches de release, hotfix, et branches partagées
- **Rebase** pour les branches locales avant PR
- **Documenter** la stratégie dans le fichier CONTRIBUTING.md
- **Définir des règles d'équipe** : chaque équipe choisit son workflow
- \`--no-ff\` pour les merges importants (garder la trace des branches)

## Pièges courants

- Rebaser une branche déjà pushée et utilisée par d'autres
- Merge de grosses branches sans testing préalable
- \`git push --force\` sans \`--force-with-lease\` (écrase le travail des autres)
- Confusion : "j'ai rebasé mais mon collègue a ses anciens commits"
- Oublier que git bisect est plus facile avec un historique linéaire

## Pour aller plus loin

\`\`\`bash
# Configurer pull.rebase
git config --global pull.rebase true

# Rebase avec l'algorithme histogram (meilleur pour refactors)
git rebase -s reçursive -X histogram main

# Voir la différence visuelle entre merge et rebase
git log --graph --oneline --all

# Rebase sur l'upstream
git rebase origin/main
\`\`\`

Source : [Git Merge Documentation](https://git-scm.com/docs/git-merge) et [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)`},
        {
          id: 'git-10',
          question: 'Squash de commits ?',
          answer: "Le **squash** combine plusieurs commits en un seul pour garder un historique **propre**. Utile quand une feature génère des commits du type « fix typo », « ajout test »...\n\nUtilisez `git rebase -i HEAD~3`, puis remplacez « `pick` » par « `squash` » pour les commits à fusionner. Particulièrement utile pour les **Pull Requests** afin de garder `main` propre. **Squash** = combiner des commits en un seul via rebase interactif.",
          code: 'git rebase -i HEAD~3\n# Choisir "squash" pour fusionner',
          language: 'bash',
        
          deepDive: `# Git Rebase Interactif (squash de commits)

## Principe fondamental

Le **squash** combine plusieurs commits en un seul. Il est utilisé pour **nettoyer l'historique** avant de partager votre travail : fusionner les "fix typo", "WIP", "petite correction" en commits propres et significatifs.

Le squash se fait via \`git rebase -i\` (rebase interactif), qui ouvre un éditeur pour spécifier l'action sur chaque commit.

## Workflow de squash

\`\`\`bash
# Situation : vous avez 5 commits pour une feature
git log --oneline
# abc123 Ajouter validation email
# def456 Corriger typo
# ghi789 Ajouter message d'erreur
# jkl012 Petit ajustement UI
# mno345 Nettoyage code

# Lancer le rebase interactif
git rebase -i HEAD~5
\`\`\`

### Éditeur interactif

\`\`\`
pick abc123 Ajouter validation email
pick def456 Corriger typo          -> squash def456 (fusionner)
pick ghi789 Ajouter message d'erreur -> squash ghi789
pick jkl012 Petit ajustement UI     -> squash jkl012
pick mno345 Nettoyage code          -> squash mno345

# Résultat après squash :
pick abc123 Ajouter validation email
squash def456 Corriger typo
squash ghi789 Ajouter message d'erreur
squash jkl012 Petit ajustement UI
squash mno345 Nettoyage code
\`\`\`

Après avoir sauvegardé, Git ouvre un second éditeur pour fusionner les messages :

\`\`\`
# This is a combination of 5 commits.
# Entrez le message pour le commit fusionné :
feat: Ajouter validation email

- Validation RFC 5322
- Messages d'erreur personnalisés
- Tests unitaires
\`\`\`

## Toutes les actions du rebase interactif

\`\`\`bash
# Lancer le rebase interactif
git rebase -i HEAD~3

# Sur toute une branche depuis sa divergence
git rebase -i main
\`\`\`

| Mot-clé | Raccourci | Action |
|---------|-----------|--------|
| \`pick\` | \`p\` | Garder le commit tel quel |
| \`reword\` | \`r\` | Modifier uniquement le message |
| \`edit\` | \`e\` | Modifier le contenu du commit (s'arrêter pour amend) |
| \`squash\` | \`s\` | Fusionner avec le commit précédent, garder les messages |
| \`fixup\` | \`f\` | Fusionner et ignorer le message |
| \`drop\` | \`d\` | Supprimer le commit |
| \`exec\` | \`x\` | Exécuter une commande shell |

## Exemples pratiques

\`\`\`bash
# Squasher les 3 derniers commits en 1
git rebase -i HEAD~3
# Changer pick -> squash pour les 2 derniers

# Utiliser fixup pour ignorer les messages de correction
git rebase -i HEAD~3
# pick abc123 Implement feature
# fixup def456 Fix typo       # message ignoré
# fixup ghi789 Lint fix       # message ignoré

# Modifier le message d'un commit (reword)
git rebase -i HEAD~5
# pick abc123 Ajouter validation
# reword def456 Mauvais message  # éditeur s'ouvre pour ce commit

# Scinder un commit en plusieurs
git rebase -i HEAD~3
# edit abc123 Mon commit
git reset HEAD~1           # défaire le commit, garder les modifs
git add -p                 # ajouter progressivement
git commit -m "Partie 1"
git commit -m "Partie 2"
git rebase --continue
\`\`\`

## Squash avant PR — le cas d'usage typique

\`\`\`bash
# Avant d'ouvrir une Pull Request :
git rebase -i main

# Dans l'éditeur :
# Garder le premier commit en "pick"
# Mettre tous les autrès en "squash" ou "fixup"

# Résultat : un seul commit propre qui représente toute la feature
git log --oneline main..HEAD
# abc123 feat: Ajouter authentification OAuth2
\`\`\`

## Bonnes pratiques

- **Squasher avant de pusher** ou d'ouvrir une PR (historique propre)
- **Jamais de rebase/squash** sur des commits déjà partagés
- **Un commit par fonctionnalité** logique (cohérent, testable)
- Utiliser **\`fixup\`** pour les corrections mineures (moins de saisie)
- **Tester après le squash** : le code résultant doit compiler et passer les tests
- Utiliser \`--exec\` pour exécuter des tests automatiquement

## Pièges courants

- Squasher des commits qui étaient déjà pushés (réécriture d'historique)
- Perdre des commits si le rebase échoue (utiliser \`git rebase --abort\`)
- Squasher des commits qui devraient rester séparés (perte de granularité)
- Confondre \`squash\` (garde le message) et \`fixup\` (ignore le message)
- Oublier que les conflits peuvent survenir pendant le rebase

## Pour aller plus loin

\`\`\`bash
# Exécuter des tests à chaque étape du rebase
git rebase -i --exec "npm test" main

# Rebase en gardant les merges
git rebase -i --rebase-merges

# Rebase automatique sans éditeur
git rebase -i --autosquash HEAD~5

# Marquer un commit pour autosquash
git commit --fixup abc123  # crée un "fixup!" commit
git rebase -i --autosquash HEAD~5
\`\`\`

Source : [Git Rebase Documentation](https://git-scm.com/docs/git-rebase) et [Git Tools — Rewriting History](https://git-scm.com/book/fr/v2/Les-outils-de-Git-Réécrire-lhistorique)`},
        {
          id: 'git-18',
          question: 'Git Flow vs Trunk-based',
          answer: "**Git Flow** : branches longues (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`) — structuré mais lourd, adapté aux releases planifiées.\n\n**Trunk-based** : tout le monde commit sur `main` (ou très peu de branches courtes) + **feature flags** pour activer/désactiver le code en cours. Favorise l'**intégration continue** et le déploiement fréquent.\n\nLes entreprises modernes privilégient le **Trunk-based** pour sa simplicité et son flux rapide. Git Flow reste utile pour les projets avec des releases versionnées. __Le meilleur workflow est celui que l'équipe maîtrise et suit.__",
        
          deepDive: `# Git Flow vs Trunk-Based Development

## Principe fondamental

Deux stratégies de branching pour organiser le développement logiciel, avec des philosophies très différentes :

- **Git Flow** : modèle structuré avec branches **long-lived** (main, develop, feature/, release/, hotfix/). Idéal pour les cycles de release planifiés et les produits versionnés.
- **Trunk-Based Development (TBD)** : développement sur une **branche principale unique** (trunk/main) avec des commits petits et fréquents. Les fonctionnalités incomplètes sont cachées derrière des **feature flags**.

Le choix dépend de votre contexte : rythme de release, taille d'équipe, culture DevOps.

## Git Flow — le modèle classique

\`\`\`
main ────────M────────────────────M── (production)
              \\                  /
develop ──────D────────────────D──── (intégration)
              | \\              / |
              |  R──R──R──R──R  |  (release branches)
              |                  |
              F──F──F──F         F──F  (feature branches)
\`\`\`

### Structure des branches

| Branche | Usage | Base | Durée de vie |
|---------|-------|------|--------------|
| \`main\` | Code en production | — | Permanente |
| \`develop\` | Intégration des features | \`main\` | Permanente |
| \`feature/*\` | Développement d'une fonctionnalité | \`develop\` | Quelques jours/semaines |
| \`release/*\` | Préparation d'une release | \`develop\` | Quelques jours |
| \`hotfix/*\` | Correction urgente de production | \`main\` | Quelques heures |

### Commandes Git Flow

\`\`\`bash
# Initialiser git-flow sur un dépôt
git flow init

# Créer une feature
git flow feature start auth-oauth2
# Crée : feature/auth-oauth2 depuis develop

# Terminer une feature
git flow feature finish auth-oauth2
# Merge dans develop, supprime la branche

# Créer une release
git flow release start v1.2.0
# Crée : release/v1.2.0 depuis develop

# Terminer une release
git flow release finish v1.2.0
# Merge dans main + develop, crée un tag v1.2.0

# Créer un hotfix
git flow hotfix start v1.2.1
git flow hotfix finish v1.2.1
\`\`\`

## Trunk-Based Development — le modèle moderne

\`\`\`
main ────s──s──s──s──s──s──s──s──s── (trunk)
           \\    \\
            f1   f2  (branches courtes, < 2 jours)
\`\`\`

### Principes du TBD

\`\`\`bash
# Workflow TBD typique
git checkout main
git pull
git checkout -b feature/user-auth

# Commits petits et fréquents
git commit -m "Ajouter page de login"
git commit -m "Ajouter validation email"
git commit -m "Ajouter tests"

# Merge rapide (max 2 jours) dans main
git checkout main
git pull --rebase
git merge --no-ff feature/user-auth
git push origin main
git branch -d feature/user-auth

# Feature flags pour désactiver le code inachevé
if (featureFlags.isEnabled('new-auth')) {
  // Nouvelle authentification (encore en développement)
} else {
  // Ancienne authentification
}
\`\`\`

### Feature flags — le cœur du TBD

\`\`\`typescript
// Exemple de feature flags
const features = {
  'new-auth': process.env.FEATURE_NEW_AUTH === 'true',
  'v3-api': process.env.FEATURE_V3_API === 'true',
  'dark-mode': process.env.FEATURE_DARK_MODE === 'true',
};

// Utilisation dans le code
if (features['new-auth']) {
  router.use('/api/auth', authV2Router);
}
\`\`\`

## Comparaison détaillée

| Critère | Git Flow | Trunk-Based |
|---------|----------|-------------|
| Complexité | Élevée | Faible |
| Nombre de branches | Beaucoup (long-lived) | Très peu (short-lived) |
| Durée des branches | Jours à semaines | Heures à 2 jours max |
| Merge frequency | Rare (release) | Très fréquente (quotidien) |
| Feature flags | Pas nécessaires | Essentiels |
| CI/CD | Plus complexe | Simplifié |
| Rebase | Possible sur feature | Recommandé |
| Rollback | Complexe (plusieurs merges) | Simple (git revert) |
| Tests nécessaires | Avant release | En continu |
| Idéal pour | Releases planifiées, versions desktop | SaaS, web apps, CI/CD mature |

## Quand utiliser chaque workflow

\`\`\`bash
# Git Flow pour :
# - Logiciels avec versions (desktop, mobile)
# - Cycles de release longs (mensuels/trimestriels)
# - Équipes multi-plateformes
# - Produits avec certification/testing longs

# Trunk-Based pour :
# - Applications web (SaaS)
# - Déploiement continu (CI/CD mature)
# - Petites équipes (moins de 10 développeurs)
# - Startups, itérations rapides
# - Feature flags bien implémentés
\`\`\`

## Bonnes pratiques

**Git Flow :**
- Protéger \`main\` et \`develop\` avec des rules (pas de push direct)
- Utiliser \`git flow\` ou des outils automatisés (sourcery)
- Nettoyer les branches de feature après merge
- Garder les releases courtes (pas de \`develop\` qui divergente trop)

**Trunk-Based :**
- Commits **très petits** (quelques heures de travail max)
- Feature flags dès le début du développement
- Tests automatisés obligatoires (régression immédiate)
- Code review légère (ne pas bloquer le merge)
- Culture de **réversibilité** (revert > fix forward)

## Pièges courants

- Git Flow : branches de feature trop longues (conflits massifs)
- Git Flow : intégration infréquente (divergence develop/main)
- TBD : feature flags mal gérés = code mort qui s'accumule
- TBD : mauvaise culture de tests = régressions fréquentes
- TBD : résistance des équipes habituées aux "gros merges"
- Les deux : pas de politique de merge clairement documentée

## Pour aller plus loin

\`\`\`bash
# Voir l'historique des branches dans chaque workflow
git log --graph --oneline --all

# Installer git-flow
# macOS: brew install git-flow
# Ubuntu: apt-get install git-flow

# Ressources
# Git Flow original: https://nvie.com/posts/a-successful-git-branching-model/
# Trunk-Based: https://trunkbaseddevelopment.com/
\`\`\`

Source : [Git Flow (nvie)](https://nvie.com/posts/a-successful-git-branching-model/) et [Trunk-Based Development](https://trunkbaseddevelopment.com/)`},
        {
          id: 'git-19',
          question: 'Résoudre les conflits efficacement',
          answer: "**Prévention** : fusionnez régulièrement depuis `main` dans votre branche, faites des petites PRs, communiquez avec l'équipe sur les fichiers modifiés.\n\n**Résolution** : lisez les marqueurs de conflit (`<<<<<<<`, `=======`, `>>>>>>>`), comprenez les deux versions avant de choisir. Utilisez un outil de merge (`VS Code Merge`, `Beyond Compare`) pour les conflits complexes.\n\nAprès résolution : `git add` + `git commit`. Testez toujours le code fusionné avant de push. __Un conflit bien résolu demande de la communication, pas juste du code.__",
        
          deepDive: `# Résoudre les conflits efficacement

## Principe fondamental

Un conflit de merge survient quand Git ne peut pas résoudre automatiquement les différences entre deux branches. Cela arrive quand les **mêmes lignes** d'un fichier ont été modifiées différemment.

**Approche préventive** : la meilleure résolution de conflit est celle qu'on n'a pas à faire. Fusionnez régulièrement depuis \`main\` dans votre branche, faites des PR courtes, communiquez avec l'équipe.

**La résolution** : comprendre les deux versions, choisir la bonne (où les combiner), supprimer les marqueurs Git.

## Les marqueurs de conflit

Quand un conflit survient, Git insère des marqueurs dans les fichiers concernés :

\`\`\`diff
<<<<<<< HEAD
const name = "Alice";
const age = 30;
const rôle = "admin";
=======
const name = "Bob";
const age = 25;
const rôle = "user";
>>>>>>> feature-branch
\`\`\`

| Marqueur | Signification |
|----------|---------------|
| \`<<<<<<< HEAD\` | Début de VOTRE version (branche actuelle) |
| \`=======\` | Séparation entre les deux versions |
| \`>>>>>>> feature-branch\` | Fin de LEUR version (branche à merger) |

## Étapes de résolution

\`\`\`bash
# 1. Identifier les fichiers en conflit
git status
# both modified: src/app.ts
# both modified: src/config.ts

# 2. Ouvrir chaque fichier et résoudre les conflits
# 3. Supprimer les marqueurs <<<<< ===== >>>>>
# 4. Marquer comme résolu
git add src/app.ts
git add src/config.ts

# 5. Finaliser le merge
git commit -m "Merge feature-branch, resolve conflict in app.ts"
\`\`\`

## Résolution avec \`git checkout\` (ours/theirs)

\`\`\`bash
# Garder notre version (HEAD) pour TOUS les conflits du fichier
git checkout --ours src/app.ts

# Garder leur version (feature-branch)
git checkout --theirs src/app.ts

# Puis marquer comme résolu
git add src/app.ts

# Attention : cette approche jette l'autre version complètement
# Utiliser seulement si vous êtes sûr de vouloir écraser
\`\`\`

## Stratégies de résolution

\`\`\`bash
# Stratégie "ours" — garder notre version en cas de conflit
git merge -s reçursive -X ours feature-branch

# Stratégie "theirs" — garder leur version
git merge -s reçursive -X theirs feature-branch

# Abandonner complètement le merge
git merge --abort

# Revenir à l'état avant merge
git reset --hard ORIG_HEAD
\`\`\`

## Outils de merge visuels

\`\`\`bash
# Configurer un mergetool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait $MERGED"

# Lancer l'outil
git mergetool

# Après résolution, nettoyer les fichiers .orig
git clean -f *.orig

# Configurer pour ne pas créer de .orig
git config --global mergetool.keepBackup false

# Outils populaires
# - VS Code (intégré)
# - Beyond Compare (payant, puissant)
# - KDiff3 (gratuit, open source)
# - Meld (gratuit, Linux)
# - Kaleidoscope (macOS)
\`\`\`

## Résoudre les conflits pendant un rebase

\`\`\`bash
# Pendant un rebase, les conflits surviennent commit par commit
git rebase main

# CONFLIT dans src/app.ts
# Résoudre puis :
git add src/app.ts

# Continuer le rebase
git rebase --continue

# Sauter ce commit (si la modification n'est plus nécessaire)
git rebase --skip

# Annuler tout le rebase
git rebase --abort
\`\`\`

## Prévention des conflits

\`\`\`bash
# 1. Fusionner main dans votre branche RÉGULIÈREMENT
git switch feature-auth
git merge main
# ou
git rebase main

# 2. PR courtes (moins de 200 lignes)
# 3. Communiquer sur les fichiers modifiés (standup, ticket)
# 4. Architecture modulaire (limiter les dépendances entre fichiers)
# 5. Éviter de reformater tout le fichier (blâme inutile + conflits)

# Voir les conflits potentiels avant de merger
git merge --no-commit --no-ff feature-branch
# Si pas de conflit, annuler
git merge --abort
\`\`\`

## Bonnes pratiques

- **Comprendre les deux versions** avant de choisir (ne pas juste garder la sienne)
- **Tester après résolution** : le code compile et les tests passent
- **Commits atomiques** : moins de modifications par commit = moins de conflits
- **Communiquer** avec l'auteur de l'autre branche si le conflit est complexe
- **Résoudre dans l'IDE** plutôt qu'en ligne de commande pour les conflits complexes
- **Ne pas laisser traîner** les conflits — résoudre immédiatement

## Pièges courants

- Résoudre en gardant **accidentellement** les marqueurs \`<<<<<<<\` dans le code
- Oublier de faire \`git add\` après la résolution (le conflit persiste)
- \`git commit\` sans \`git add\` préalable (commit vide ou incomplet)
- Utiliser \`--ours\` ou \`--theirs\` sans comprendre ce qu'on perd
- Merge de branches sans tester après résolution (bugs subtils)
- Conflits qui impliquent des fichiers de dépendances (\`package-lock.json\`, \`yarn.lock\`)

## Pour aller plus loin

\`\`\`bash
# Lister les fichiers en conflit uniquement
git diff --name-only --diff-filter=U

# Voir le diff complet des conflits
git diff HEAD...MERGE_HEAD

# Réessayer un merge avec une autre stratégie
git merge --abort
git merge -s reçursive -X patience feature-branch

# Voir l'historique des résolutions
git log --oneline --grep="Merge\\|conflict"
\`\`\`

Source : [Git Merge Documentation](https://git-scm.com/docs/git-merge) et [Pro Git — Conflicts](https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-fusions)`},
      ],
    },
    {
      id: 'git-operations',
      title: 'Opérations Courantes',
      questions: [
        {
          id: 'git-11',
          question: 'git stash ?',
          answer: "`git stash` sauvegarde temporairement vos modifications non commitées dans une **pile** et restaure votre répertoire à l'état du dernier commit. Pratique quand vous devez changer de branche en urgence sans perdre votre travail.\n\nRécupérez vos modifications avec `git stash apply` ou `git stash pop`. Vous pouvez empiler plusieurs stash et les récupérer sélectivement.",
          code: 'git stash        # Sauvegarder\ngit stash apply   # Récupérer',
          language: 'bash',
        
          deepDive: `# Git Stash

## Principe fondamental

\`git stash\` permet de **mettre de côté temporairement** les modifications non commitées de votre répertoire de travail, afin de pouvoir basculer sur une autre branche ou effectuer d'autrès opérations sans perdre votre travail.

Les stashs sont stockés dans une **pile LIFO** (Last In, First Out). Vous pouvez empiler plusieurs stashs et les récupérer sélectivement.

\`\`\`
Working Tree (modifié)       Pile de stash
       |                          |
       |  git stash               v
       |                    stash@{0}: WIP
       |                    stash@{1}: Fix urgent
       |                    stash@{2}: Expérience
       v
Working Tree (propre)
\`\`\`

## Cas d'usage typiques

\`\`\`bash
# 1. Vous travaillez sur une feature, un bug urgent arrive
git stash push -m "WIP feature auth"
git checkout main
git checkout -b hotfix/urgent
# ... corriger le bug, commit, PR ...
git switch feature-auth
git stash pop

# 2. Vous voulez tester une approche sans commit
git stash push -m "Expérience avec WebSocket"
# ... tester autre chose ...
git stash drop stash@{0}  # abandonner l'expérience

# 3. Pull sans perdre vos modifications locales
git stash push -m "Modifs en cours"
git pull --rebase origin main
git stash pop
\`\`\`

## Syntaxe complète

\`\`\`bash
# Stasher avec un message descriptif (recommandé)
git stash push -m "WIP: validation formulaire"

# Stasher uniquement les fichiers suivis (pas les nouveaux fichiers)
git stash

# Stasher aussi les fichiers non suivis
git stash -u
git stash --include-untracked

# Stasher aussi les fichiers ignorés (.env, node_modules...)
git stash -a
git stash --all

# Stasher uniquement certains fichiers
git stash push -m "partial stash" -- src/app.ts

# Lister les stashs
git stash list
# stash@{0}: On feature-auth: WIP validation formulaire
# stash@{1}: On main: Fix urgent login bug
# stash@{2}: On feature-auth: Expérience WebSocket

# Voir le contenu d'un stash sans l'appliquer
git stash show stash@{1}
git stash show -p stash@{1}  # voir le diff complet
\`\`\`

## Récupérer un stash

\`\`\`bash
# Appliquer le dernier stash et le supprimer de la pile
git stash pop

# Appliquer sans supprimer (utile pour partager entre branches)
git stash apply

# Appliquer un stash spécifique
git stash apply stash@{2}

# Créer une branche depuis un stash
git stash branch new-feature-branch stash@{0}

# Supprimer un stash sans l'appliquer
git stash drop stash@{0}

# Supprimer tous les stashs
git stash clear
\`\`\`

## Stash et branches

\`\`\`bash
# Important : le stash est lié à la branche où il a été créé
# Mais vous pouvez l'appliquer sur n'importe quelle branche
# (attention aux conflits si le code est trop différent)

# Workflow typique avec changement de branche
git stash push -m "Travail en cours"
git checkout main
# ... faire quelque chose ...
git checkout feature-auth
git stash pop

# Si conflit après stash pop :
# Résoudre les conflits manuellement
# git stash drop si le pop a partiellement réussi
\`\`\`

## Bonnes pratiques

- Toujours ajouter un **message descriptif** avec \`git stash push -m\`
- Utiliser \`git stash pop\` plutôt que \`apply + drop\` (évite les stashs orphelins)
- Vérifier que le stash a bien été appliqué avant de le supprimer
- Utiliser \`-u\` pour les fichiers non suivis (\`git stash -u\`)
- Nettoyer régulièrement les stashs obsolètes avec \`git stash drop\` ou \`git stash clear\`
- **Préférer les commits temporaires** à un stash prolongé (plus visibles, pushables)

## Pièges courants

- Oublier de faire \`git stash pop\` après un \`apply\` — le stash reste dans la pile
- Stasher des fichiers avec des secrets (credentials) — le stash est en clair
- Utiliser \`git stash\` sans \`-u\` — les nouveaux fichiers ne sont pas stashés
- Confondre \`git stash drop\` (supprimer un) et \`git stash clear\` (tout supprimer)
- Le stash ne capture pas les sous-modules — utiliser \`git submodule update --init\`

## Pour aller plus loin

\`\`\`bash
# Voir le diff complet du stash
git stash show -p stash@{0}

# Stash partiel (interactif, hunk par hunk)
git stash push -p

# Garder l'index (staged files) intact
git stash push --keep-index

# Configurer un alias pour stasher vite
git config --global alias.stashit '!git stash push -m'
\`\`\`

Le stash est **local** à votre dépôt — il n'est pas synchronisé avec le remote. Si vous changez de machine, vos stashs ne vous suivent pas.

Source : [Git Stash Documentation](https://git-scm.com/docs/git-stash) et [Pro Git — Stashing](https://git-scm.com/book/fr/v2/Les-outils-de-Git-Le-stash)`},
        {
          id: 'git-12',
          question: 'Annuler un commit',
          answer: "`git reset` revient en arrière dans l'historique : `--hard` supprime tout, `--soft` garde les modifications en staging. Mais `reset` **réécrit l'historique** — dangereux si le commit est déjà pushé.\n\n`git revert` crée un nouveau commit qui inverse les changements, **préservant l'historique** — plus sûr en équipe. __Règle d'or : `reset` pour les commits locaux non pushés, `revert` pour les commits déjà partagés.__",
          code: 'git reset --hard HEAD~1  # Supprime tout\ngit revert <hash>          # Annule via nouveau commit',
          language: 'bash',
        
          deepDive: `# Annuler un commit (Git Reset, Git Revert)

## Principe fondamental

Git offre deux mécanismes distincts pour annuler des commits, selon que l'historique est local ou partagé :

- **\`git revert\`** : crée un **nouveau commit** qui annule les modifications d'un commit précédent. Sûr pour les branches partagées car il ne réécrit pas l'historique.
- **\`git reset\`** : déplace le pointeur de branche en arrière, **supprimant les commits** de l'historique. À utiliser uniquement en local.

\`\`\`
Règle d'or :
- reset  → commits locaux non pushés
- revert → commits déjà partagés
\`\`\`

## git revert — annuler sans danger

\`\`\`bash
# Annuler le dernier commit (HEAD)
git revert HEAD
# Crée un nouveau commit : "Revert 'Mon message'"

# Annuler un commit spécifique
git revert abc123

# Annuler une série de commits
git revert abc123..def456

# Annuler sans créer de commit (pour inspection)
git revert --no-commit abc123
git diff --cached  # voir ce qui sera annulé
git revert --continue

# Revert d'un merge commit
git revert -m 1 abc123  # -m pour choisir le parent
\`\`\`

**Avantages de revert :**
- Historique préservé (tous les commits restent visibles)
- Collaboratif : pas de désynchronisation
- Peut être annulé (on peut revert un revert)
- Idéal pour les branches partagées et la production

## git reset — trois niveaux d'annulation

\`\`\`bash
# --soft : supprime le commit, garde les modifs dans l'index (staged)
git reset --soft HEAD~1
# Les modifications restent dans le staging area
# Utile pour : recommiter avec un message différent

# --mixed (défaut) : supprime le commit, garde les modifs dans le working tree
git reset HEAD~1
# Équivalent à défaire le git add et le git commit
# Utile pour : modifier le contenu avant de recommiter

# --hard : supprime TOUT (commit + index + working tree)
git reset --hard HEAD~1
# Les modifications sont PERDUES (sauf reflog)
# Dangereux ! À utiliser avec précaution
\`\`\`

\`\`\`
État avant reset (HEAD → C3) :
C1 ← C2 ← C3  (HEAD, main)

Après reset --soft HEAD~1 :
C1 ← C2 (HEAD, main)
        └── C3 (modifs dans l'index)

Après reset --mixed HEAD~1 :
C1 ← C2 (HEAD, main)
        └── C3 (modifs dans working tree)

Après reset --hard HEAD~1 :
C1 ← C2 (HEAD, main)
        (C3 totalement supprimé)
\`\`\`

## git reset vers un commit spécifique

\`\`\`bash
# Revenir à un commit précis
git reset --hard abc123

# Revenir à l'état du remote (annuler commits locaux)
git reset --hard origin/main

# Reset d'un merge commit
git reset --hard ORIG_HEAD  # avant le merge

# Reset partiel (un seul fichier)
git reset HEAD~1 -- src/app.ts  # remettre le fichier à l'état avant
\`\`\`

## Comparaison détaillée

| Aspect | git revert | git reset --soft | git reset --mixed | git reset --hard |
|--------|------------|------------------|-------------------|------------------|
| Nouveau commit | Oui | Non | Non | Non |
| Perte de code | Non | Non | Non | Oui |
| Historique modifié | Non | Oui | Oui | Oui |
| Sécurité remote | Parfait | Dangereux | Dangereux | Très dangereux |
| Modifs conservées | Dans le revert commit | Index (staged) | Working tree | Aucune |
| Cas d'usage | Annuler en production | Reformuler un commit | Défaire un commit local | Jeter des changements |

## Bonnes pratiques

- Utiliser **\`git revert\`** pour toute annulation sur des branches partagées
- Utiliser **\`git reset --mixed\`** (le défaut) pour défaire un commit local
- **Éviter \`git reset --hard\`** sauf si vous êtes sûr (et même dans ce cas, \`reflog\` peut sauver)
- **Vérifier** avec \`git status\` et \`git log\` avant tout reset dur
- Utiliser \`ORIG_HEAD\` pour annuler un reset : \`git reset --hard ORIG_HEAD\`
- Après un \`reset --hard\`, utiliser \`git reflog\` pour retrouver les commits supprimés

## Pièges courants

- \`reset --hard\` après avoir pushé : vos collègues ne peuvent plus pull
- Confondre \`revert\` (sûr) avec \`reset\` (destructif)
- Perdre des modifications non commitées avec \`git reset --hard\`
- \`reset --hard\` sur un merge commit sans comprendre les implications
- Oublier \`--soft\` ou \`--mixed\` et utiliser \`--hard\` par défaut

## Pour aller plus loin

\`\`\`bash
# Récupérer après un reset --hard
git reflog
git reset --hard HEAD@{n}

# Annuler le dernier commit sans perdre les modifs (mix de reset et stash)
git reset --soft HEAD~1
git stash
git checkout -b recovery-branch
git stash pop

# Revert d'un range de commits
git revert --no-edit HEAD~3..HEAD
\`\`\`

Source : [Git Reset Documentation](https://git-scm.com/docs/git-reset) et [Git Revert Documentation](https://git-scm.com/docs/git-revert)`},
        {
          id: 'git-13',
          question: 'Voir les différences entre commits',
          answer: "`git diff` compare des états différents du dépôt : sans argument (répertoire vs staging), avec `HEAD` (répertoire vs dernier commit), ou `HEAD~1` (avant-dernier vs dernier). Comparez deux commits avec `git diff <hash1> <hash2>`, ou deux branches avec `git diff main..feature`.\n\nOutil **indispensable** pour la revue de code et la vérification avant commit.",
          code: 'git diff HEAD~1',
          language: 'bash',
        
          deepDive: `# git diff — Voir les différences entre commits

## Principe fondamental

\`git diff\` est l'outil essentiel pour comparer différentes versions de votre code. Il affiche les **lignes ajoutées** (précédées de \`+\`, en vert) et **supprimées** (précédées de \`-\`, en rouge) entre deux états du dépôt.

Git gère quatre "états" que vous pouvez comparer :
- **Working directory** : vos fichiers actuels (modifiés mais pas stagés)
- **Index (staging area)** : les fichiers ajoutés avec \`git add\`
- **HEAD (dernier commit)** : le dernier commit sur la branche actuelle
- **Commits** : n'importe quel point dans l'historique

## Syntaxe de base

\`\`\`bash
# Diff entre working directory et index (modifications non stagées)
git diff

# Diff entre index et HEAD (modifications stagées, en attente de commit)
git diff --cached
git diff --staged  # alias

# Diff entre working directory et HEAD (toutes les modifications)
git diff HEAD

# Diff entre deux commits spécifiques
git diff abc123..def456

# Diff d'un fichier spécifique
git diff -- src/app.component.ts

# Diff entre deux branches
git diff main..feature-branch

# Statistiques résumées (fichiers changés, lignes +/)
git diff --stat
\`\`\`

## Comparaison des différents contextes

\`\`\`bash
# État initial : HEAD (commit) ≠ index ≠ working tree

# Modifications non stagées (working tree ≠ index)
git diff
# Utile avant git add pour vérifier ce qu'on va stage

# Modifications stagées (index ≠ HEAD)
git diff --cached
# Utile avant git commit pour vérifier ce qu'on va commiter

# Toutes les modifications (working tree ≠ HEAD)
git diff HEAD
# Vue d'ensemble de tout ce qui a changé depuis le dernier commit

# Avant/après un commit spécifique
git diff abc123^..abc123   # ce que abc123 a introduit
git diff abc123~1..abc123  # équivalent (le parent)
\`\`\`

## Algorithmes de diff

Git propose plusieurs algorithmes qui changent la façon dont les différences sont calculées :

\`\`\`bash
# Myers (défaut) — rapide, bon pour la plupart des cas
git diff --diff-algorithm=myers

# Minimal — cherche le plus petit changeset possible (plus lent)
git diff --diff-algorithm=minimal

# Patience — meilleur pour les refactors, code réorganisé
git diff --diff-algorithm=patience

# Histogram — combine patience + myers, recommandé
git diff --diff-algorithm=histogram

# Configurer par défaut
git config --global diff.algorithm histogram
\`\`\`

| Algorithme | Vitesse | Qualité | Usage typique |
|------------|--------|---------|---------------|
| Myers | Rapide | Bonne | Usage général |
| Minimal | Lent | Excellente | Petits fichiers critiques |
| Patience | Moyen | Très bonne | Réorganisation de code |
| Histogram | Moyen | Excellente | Recommandé en général |

## Formats de sortie

\`\`\`bash
# Noms de fichiers uniquement (compact)
git diff --name-only

# Noms et statut (M=modified, A=added, D=deleted)
git diff --name-status

# Compact, une ligne par modification
git diff --compact-summary

# Word diff (utile pour documentation, texte)
git diff --word-diff=plain
git diff --word-diff=color

# Ignorer les espaces
git diff --ignore-space-change
git diff --ignore-all-space

# Contexte personnalisé (3 lignes par défaut)
git diff -U5  # 5 lignes de contexte

# Sortie sans couleur (pour scripts/CI)
git diff --no-color
\`\`\`

## Exemples avancés

\`\`\`bash
# Diff entre cette branche et la distante
git diff main..origin/main

# Diff entre deux tags (changelog)
git diff v1.0.0..v2.0.0 --stat

# Diff d'un commit spécifique (son contenu exact)
git show abc123

# Diff d'un fichier entre deux branches
git diff main..feature -- src/app.ts

# Lister les fichiers qui ont changé depuis une date
git diff --name-only HEAD@{7.days.ago}

# Diff avec sous-modules
git diff --submodule=log
\`\`\`

## Bonnes pratiques

- **Toujours faire \`git diff --cached\`** avant de commiter (vérifier ce qu'on envoie)
- **\`git diff --stat\`** pour une vue d'ensemble rapide
- Configurer un **outil visuel** de diff : \`git config --global diff.tool vimdiff\`
- Utiliser l'algorithme **histogram** pour les refactors importants
- **\`git diff --name-only\`** avant \`git add -A\` (éviter d'ajouter des fichiers par erreur)

## Pièges courants

- \`git diff\` sans arguments ne montre que les **modifications non stagées** (pas ce qui est stagé)
- \`git diff\` ne montre **pas** les fichiers non suivis (utiliser \`git status\`)
- Les fins de ligne (CRLF/LF) peuvent polluer les diffs sur Windows
- Confondre \`git diff\` (unstaged) avec \`git diff --cached\` (staged)
- Oublier que \`git diff\` compare par défaut avec l'index, pas avec HEAD

## Pour aller plus loin

\`\`\`bash
# Voir les différences binaires
git diff --binary

# Diff avec external diff tool
git difftool

# Créer un patch depuis un diff
git diff > mon-patch.patch
git apply mon-patch.patch  # appliquer le patch

# Voir qui a modifié chaque ligne
git blame src/app.ts
\`\`\`

Source : [Git Diff Documentation](https://git-scm.com/docs/git-diff)`},
        {
          id: 'git-14',
          question: "Voir l'historique des commits",
          answer: "`git log` affiche l'historique complet (auteur, date, hash, message). L'option `--oneline` affiche chaque commit sur une ligne, `--graph` dessine les branches et fusions, `--decorate` montre les références.\n\nCommande recommandée : `git log --oneline --graph --all`. Filtrez par auteur (`--author`), date (`--since`) ou message (`--grep`).",
          code: 'git log --oneline --graph',
          language: 'bash',
        
          deepDive: `# git log — Voir l'historique des commits

## Principe fondamental

\`git log\` affiche l'historique des commits d'un dépôt. C'est votre **outil principal** pour naviguer dans le passé du projet : comprendre qui a fait quoi, quand, et pourquoi.

Avec ses nombreuses options, \`git log\` peut être aussi simple qu'une liste de commits ou aussi riche qu'un tableau de bord complet avec graphes, statistiques, et filtres.

## Formats d'affichage essentiels

\`\`\`bash
# Affichage standard (complet)
git log

# Compact — un commit par ligne (recommandé pour l'usage quotidien)
git log --oneline

# Graphique ASCII + décorations (indispensable)
git log --oneline --graph --all --decorate

# Les N derniers commits
git log -n 5
git log -5  # raccourci équivalent

# Avec statistiques (fichiers modifiés, lignes +/-)
git log --stat

# Avec le diff complet de chaque commit
git log -p

# Format personnalisé
git log --format="%h %an: %s (%cr)"
\`\`\`

## Filtrès puissants

\`\`\`bash
# Par auteur
git log --author="Mohammed"
git log --author="Marie\\|Pierre"  # expression régulière (ou)

# Par date
git log --since="2024-01-01"
git log --until="2024-12-31"
git log --after="2 weeks ago"
git log --before="yesterday"

# Par message (grep)
git log --grep="feat:"
git log --grep="fix:" --grep="urgent" --all-match  # ET logique

# Par fichier
git log -- src/app.component.ts

# Par branche
git log main..feature-branch  # commits dans feature pas dans main
git log --all  # toutes les branches

# Par tag
git log v1.0.0..v2.0.0

# Exclure les merge commits
git log --no-merges

# Par contenu (recherche dans le code, pas dans les messages)
git log -S "functionName"  # commits qui modifient "functionName"
git log -G "regex"          # plus flexible que -S
\`\`\`

## Formats de sortie personnalisés

\`\`\`bash
# Format libre avec %codes
git log --format="%h | %an | %s | %ar"

# Format tableau
git log --format="| %h | %an | %s | %ad |"

# Format pour générer un changelog
git log --format="* %s (%h)" --grep="^feat\\|^fix"
\`\`\`

### Codes de format courants

| Code | Description |
|------|-------------|
| \`%H\` | Hash complet (SHA-1) |
| \`%h\` | Hash court (7 premiers caractères) |
| \`%an\` | Nom de l'auteur |
| \`%ae\` | Email de l'auteur |
| \`%ad\` | Date (format --date=) |
| \`%ar\` | Date relative ("il y a 2 jours") |
| \`%s\` | Sujet du commit |
| \`%b\` | Corps du message |
| \`%d\` | Références (branches, tags) |
| \`%cr\` | Date relative du commiteur |

## git shortlog — résumé par auteur

\`\`\`bash
# Compter les commits par auteur (idéal pour le changelog)
git shortlog

# Avec nombre de commits et emails
git shortlog -sne

# Par ordre alphabétique
git shortlog -sn

# Pour une période spécifique
git shortlog --since="2024-01-01" --until="2024-06-30"
\`\`\`

## Combinaisons pratiques

\`\`\`bash
# Vue d'ensemble du dépôt (alias recommandé)
git log --oneline --graph --all --decorate

# Recherche de bug par mots-clés
git log --all --oneline --grep="NPE\\|NullPointer\\|crash" --since="2024-01"

# Commits d'un développeur cette semaine
git log --author="Pierre" --since="monday" --format="%h %s"

# Changelog rapide
git log --format="* %s" v1.0.0..HEAD

# Commits modifiant un fichier (avec ligne de contenu)
git log -p -- src/app.ts | grep -E "^[+-]" | sort | uniq -c
\`\`\`

## Bonnes pratiques

- Créer un **alias** pour votre vue favorite : \`git config --global alias.tree "log --oneline --graph --all --decorate"\`
- Utiliser \`--oneline --graph --all\` comme vue par défaut du dépôt
- Combiner \`--author\` et \`--since\` pour des rapports d'activité
- \`git shortlog -sne\` pour créditer les contributeurs
- Ajouter \`--no-merges\` pour filtrer le bruit des commits de fusion
- Utiliser \`-S\` pour les recherches de contenu (très puissant)

## Pièges courants

- \`git log\` ne montre que la branche courante (utiliser \`--all\`)
- Par défaut, ne montre pas les commits orphelins (accessibles via \`reflog\`)
- \`git log\` sans pagination sur des gros dépôts (utiliser \`-n 20\`)
- Confondre \`--grep\` (message) avec \`-S\` ou \`-G\` (contenu du code)
- \`git log\` dans un terminal sans couleurs (utiliser \`--format\`)

## Pour aller plus loin

\`\`\`bash
# Voir les commits d'un merge
git log --first-parent main  # suivre uniquement le parent principal

# Formater pour CI
git log --pretty=format:"%H|%an|%s" --since="2024-01-01"

# Blâme d'un fichier (qui a modifié chaque ligne)
git blame src/app.ts

# Voir le nombre de commits par mois
git log --since="1 year ago" --format="%ad" --date=short | cut -d- -f1,2 | sort | uniq -c
\`\`\`

Source : [Git Log Documentation](https://git-scm.com/docs/git-log)`},
        {
          id: 'git-15',
          question: 'Les tags ?',
          answer: "Un **tag** est une référence **fixe** vers un commit spécifique, contrairement aux branches qui sont des pointeurs *mobiles*. On l'utilise pour marquer les versions : `v1.0`, `v2.0`, etc.\n\nDeux types : **tags légers** (simple pointeur) et **tags annotés** (métadonnées : auteur, date, message, signature possible). Les tags sont essentiels pour les releases GitHub. **Tag** = signet permanent pour versionner le projet.",
          code: 'git tag -a v1.0 -m "Version initiale"',
          language: 'bash',
        
          deepDive: `# Git Tags

## Principe fondamental

Un tag Git est une **référence statique** vers un commit spécifique. Contrairement aux branches (qui bougent avec chaque nouveau commit), les tags sont **immobiles** et servent à marquer des points importants : versions, releases, jalons du projet.

Deux types de tags :

- **Lightweight** : simple pointeur vers un commit (comme une branche qui ne bouge pas)
- **Annotated** : objet Git complet avec métadonnées (auteur, date, message, signature GPG possible)

\`\`\`
tags :  v1.0.0    v1.1.0    v1.2.0
          ↓          ↓          ↓
commits : A ---> B ---> C ---> D ---> E (main)
\`\`\`

## Syntaxe des tags

\`\`\`bash
# Tag lightweight (simple pointeur)
git tag v1.0.0

# Tag annotated (recommandé pour les releases)
git tag -a v1.0.0 -m "Version 1.0.0 — première release stable"

# Tag sur un commit passé
git tag -a v0.9.0 abc123 -m "Version bêta"

# Tag avec signature GPG
git tag -s v1.0.0 -m "Version 1.0.0 signée"

# Lister les tags
git tag
git tag -l "v1.*"  # filtre par motif

# Voir les détails d'un tag (message, signature, commit lié)
git show v1.0.0

# Comparer deux tags
git log v1.0.0..v2.0.0 --oneline
git diff v1.0.0 v2.0.0 --stat
\`\`\`

## Pusher les tags

\`\`\`bash
# Pusher UN tag spécifique
git push origin v1.0.0

# Pusher TOUS les tags
git push --tags

# Pusher avec follow-tags (pusher les tags des commits pushés)
git push --follow-tags origin main

# Supprimer un tag (local)
git tag -d v1.0.0

# Supprimer un tag (distant)
git push origin --delete v1.0.0

# Récupérer les tags distants
git fetch --tags

# Trier les tags par date
git tag --sort=-creatordate
\`\`\`

## Semantic Versioning (SemVer)

Le standard pour nommer les tags est le **Semantic Versioning** :

\`\`\`bash
# Format : vMAJEUR.MINEUR.PATCH
git tag -a v1.0.0 -m "Breaking change : nouvelle API"
git tag -a v1.1.0 -m "Nouvelle fonctionnalité (rétrocompatible)"
git tag -a v1.1.1 -m "Correction de bug (rétrocompatible)"

# Pré-release
git tag -a v2.0.0-alpha.1 -m "Alpha"
git tag -a v2.0.0-beta.1 -m "Beta"
git tag -a v2.0.0-rc.1 -m "Release Candidate"
\`\`\`

| Incrément | Quand | Exemple |
|-----------|-------|---------|
| MAJEUR | Changement incompatible | v1.0.0 → v2.0.0 |
| MINEUR | Nouvelle fonctionnalité compatible | v1.0.0 → v1.1.0 |
| PATCH | Correction de bug compatible | v1.0.0 → v1.1.1 |

## git describe — trouver le tag le plus proche

\`\`\`bash
# Trouver le tag le plus proche de HEAD
git describe --tags
# v1.0.0-5-gabc123  (5 commits après v1.0.0, hash abc123)

# Tag le plus proche sans le hash
git describe --tags --abbrev=0
# v1.0.0

# Mode annoté uniquement
git describe --abbrev=0

# Utile pour versionner automatiquement un build
VERSION=$(git describe --tags)
echo "Building version $VERSION"
\`\`\`

## Workflow de release avec tags

\`\`\`bash
# 1. Finaliser le développement sur develop
# 2. Créer une branche de release
git checkout -b release/v1.2.0 develop

# 3. Tests, derniers correctifs...

# 4. Fusionner dans main
git checkout main
git merge --no-ff release/v1.2.0

# 5. Tagger la release
git tag -a v1.2.0 -m "Release 1.2.0 : nouveau dashboard"

# 6. Pusher tags et code
git push origin main --follow-tags

# 7. Fusionner dans develop
git checkout develop
git merge --no-ff release/v1.2.0

# 8. Supprimer la branche de release
git branch -d release/v1.2.0
\`\`\`

## Bonnes pratiques

- **Toujours utiliser des tags annotés** pour les releases (métadonnées complètes)
- Suivre le format **Semantic Versioning** (vMAJOR.MINOR.PATCH)
- Pusher les tags avec \`--follow-tags\` (évite les oublis)
- **Tagger après validation** du build et des tests
- Utiliser \`git describe --tags\` dans les scripts CI pour le versioning automatique
- Synchroniser régulièrement les tags avec \`git fetch --tags\`

## Pièges courants

- Pusher accidentellement un tag de développement en production
- Oublier de pusher les tags (\`git push\` ne pousse pas les tags par défaut)
- Utiliser des tags lightweight pour des releases (perte du contexte)
- Supprimer un tag distant sans coordination avec l'équipe
- Déplacer un tag (le supprimer et le recréer) — casse les builds qui l'utilisent

## Pour aller plus loin

\`\`\`bash
# Voir la différence entre deux releases
git log v1.0.0..v2.0.0 --oneline --no-merges

# Vérifier les tags locaux non pushés
git log --oneline --tags --not --remotes

# Créer un tag depuis un commit de merge
git tag -a v2.0.0 -m "Release 2.0.0" main

# Exporter les changements entre tags pour release notes
git log v1.0.0..v2.0.0 --format="* %s (%an)" > release-notes.md
\`\`\`

Source : [Git Tag Documentation](https://git-scm.com/docs/git-tag) et [Semantic Versioning](https://semver.org/)`},
        {
          id: 'git-16',
          question: 'git cherry-pick ?',
          answer: "`git cherry-pick` copie un commit spécifique d'une branche et l'applique sur une autre, **sans fusion complète**. Utile pour appliquer un correctif de bug sur la production sans prendre tout le reste, ou récupérer un commit fait par erreur sur la mauvaise branche.\n\nAttention aux conflits si le commit dépend d'autrès commits absents de la branche cible. **Cherry-pick** = copier un commit précis d'une branche à l'autre.",
          code: 'git cherry-pick <commit-hash>',
          language: 'bash',
        
          deepDive: `# git cherry-pick

## Principe fondamental

\`git cherry-pick\` applique les modifications d'un ou plusieurs commits **spécifiques** sur votre branche actuelle, en créant de **nouveaux commits** avec des hashes différents. C'est l'équivalent d'un "copier-coller" de commits d'une branche à l'autre.

Utile pour :
- Reporter un fix d'une branche de hotfix vers main **sans fusionner toute la branche**
- Récupérer un commit fait par erreur sur la mauvaise branche
- Appliquer sélectivement des modifications sans merge complet

\`\`\`
Branche source (feature) :  A---B---C---D---E
                                    |
Cherry-pick sur main :              v
                              C' (nouveau commit, nouveau hash)
main :  X---Y---C'---Z
\`\`\`

## Syntaxe de base

\`\`\`bash
# Appliquer un commit spécifique
git cherry-pick abc123

# Appliquer plusieurs commits (dans l'ordre)
git cherry-pick abc123 def456 ghi789

# Appliquer un intervalle de commits (exclut abc123)
git cherry-pick abc123..def456

# Appliquer un intervalle INCLUSIF
git cherry-pick abc123^..def456

# Appliquer sans créer de commit (modifications seulement)
git cherry-pick -n abc123
git cherry-pick --no-commit abc123
\`\`\`

## Options utiles

\`\`\`bash
# Ajouter une référence au commit original dans le message
git cherry-pick -x abc123
# Message : "fix: correction bug login"
#           "(cherry picked from commit abc123)" (ajouté automatiquement)

# Éditer le message du commit cherry-pické
git cherry-pick -e abc123

# Signer le commit
git cherry-pick -s abc123

# Dry-run (simulation, pas d'application)
git cherry-pick --dry-run abc123
\`\`\`

## Gérer les conflits

\`\`\`bash
# Si un conflit survient pendant le cherry-pick :
git status
# both modified: src/app.ts

# Résoudre manuellement, puis :
git add src/app.ts
git cherry-pick --continue

# Alternative : abandonner
git cherry-pick --abort

# Utiliser "ours" ou "theirs" pour trancher
git cherry-pick --strategy-option=theirs abc123

# Sauter un commit problématique
git cherry-pick --skip
\`\`\`

## Exemple concret : reporter un hotfix

\`\`\`bash
# Situation : un fix critique est fait sur hotfix/v1.2
# mais main n'est pas prêt pour un merge complet

# 1. Identifier le commit de fix
git log hotfix/v1.2 --oneline
# abc123 Fix: correction faille XSS dans le formulaire

# 2. Se placer sur main
git switch main

# 3. Cherry-picker le fix
git cherry-pick -x abc123

# 4. Si conflit, résoudre
git add .
git cherry-pick --continue

# 5. Pusher
git push origin main
\`\`\`

## Cherry-pick vs Rebase vs Merge

| Opération | Effet | Quand l'utiliser |
|-----------|-------|------------------|
| **Cherry-pick** | Copie des commits sélectionnés | Reporter un fix spécifique |
| **Rebase** | Déplace toute une série de commits | Synchroniser une branche entière |
| **Merge** | Fusionne deux branches entières | Intégration complète d'une feature |

\`\`\`bash
# Cherry-pick : un ou plusieurs commits spécifiques
git cherry-pick abc123
# Résultat : C' copié sur votre branche (nouveau hash)

# Merge : toute une branche
git merge feature-branch
# Résultat : intégration complète avec commit de fusion

# Rebase : toute une série de commits déplacés
git rebase main
# Résultat : D'--E' réappliqués sur main
\`\`\`

## Bonnes pratiques

- **Toujours utiliser \`-x\`** pour garder la trace du commit source
- **Un cherry-pick par fonctionnalité** : évitez de cherry-picker 15 commits d'un coup
- **Tester après cherry-pick** : le code dépend peut-être d'autrès commits non copiés
- **Documenter le cherry-pick** dans le message (référence au ticket, à la PR)
- **Vérifier avec \`--dry-run\`** avant de cherry-picker plusieurs commits
- **Préférer le merge où le rebase** quand les commits sont nombreux et liés

## Pièges courants

- Cherry-picker un commit qui dépend d'autrès commits non appliqués (conflits en cascade)
- Dupliquer des commits si le même fix est cherry-pické plusieurs fois
- Perdre le contexte de branches si on oublie \`-x\`
- Conflits répétés si les branches ont fortement divergé
- Oublier que les hashes changent — le nouveau commit n'est plus lié à l'original

## Pour aller plus loin

\`\`\`bash
# Cherry-pick d'un range de commits (attention à l'ordre)
git cherry-pick abc123^..def456

# Appliquer depuis une branche distante
git cherry-pick origin/hotfix/urgent

# Cherry-pick sans auto-commit (pour modifier le contenu avant commit)
git cherry-pick -n abc123
# ... modifier le code ...
git add .
git commit -m "fix: correction XSS adaptée à la branche main"

# Voir les derniers cherry-picks
git log --oneline --grep="cherry picked from"
\`\`\`

Source : [Git Cherry-Pick Documentation](https://git-scm.com/docs/git-cherry-pick)`},
        {
          id: 'git-20',
          question: 'git bisect',
          answer: "Outil de **recherche binaire** pour trouver le commit qui a introduit un bug. Git navigue automatiquement dans l'historique en divisant l'intervalle à chaque étape.\n\nVous marquez chaque commit testé comme `good` ou `bad`, et Git identifie le **premier commit défectueux** en **O(log n)** étapes au lieu de parcourir tout l'historique. Indispensable pour les bugs apparus silencieusement sur des centaines de commits.",
          code: 'git bisect start\ngit bisect bad          # commit actuel = bug\ngit bisect good <hash>  # ancien commit = OK\n# Git checkout le milieu, vous testez...\ngit bisect reset        # terminer',
          language: 'bash',
        
          deepDive: `# git bisect — Recherche binaire de bugs

## Principe fondamental

\`git bisect\` est un outil de **recherche binaire** pour identifier le commit qui a introduit un bug ou une régression. Au lieu de parcourir tout l'historique (O(n)), Git divise l'intervalle en deux à chaque étape, trouvant le commit responsable en **O(log n)** étapes.

Pour 1000 commits : seulement ~10 tests au lieu de 1000 (2^10 = 1024).

\`\`\`
Étapes de bisect sur 16 commits (trouvé en 4 tests au lieu de 16) :

[G] [G] [G] [G] [G] [?] [B] [B] [B] [B] [B] [B] [B] [B] [B] [B]
                 ^ milieu : NOUVEAU TEST
                 → si good, le bug est après
                 → si bad, le bug est avant
                 → 2ème test : intervalle réduit de moitié
\`\`\`

## Syntaxe de base

\`\`\`bash
# Démarrer la session
git bisect start

# Marquer le commit actuel comme "mauvais" (contient le bug)
git bisect bad

# Marquer un commit ancien comme "bon" (pas de bug)
git bisect good abc123

# Git bascule automatiquement sur le commit du milieu
# Vous testez et marquez :

# Si le commit testé est bon (pas de bug)
git bisect good

# Si le commit testé est mauvais (contient le bug)
git bisect bad

# ... répéter jusqu'à trouver le commit responsable ...

# Résultat attendu :
# abc123 is the first bad commit

# Terminer la session (IMPORTANT)
git bisect reset
\`\`\`

## Exemple complet

\`\`\`bash
# Situation : 50 commits, le bug existe sur HEAD
# On sait que le commit abc123 (il y a 40 commits) était correct

# 1. Démarrer
git bisect start

# 2. Marquer
git bisect bad        # HEAD = bug
git bisect good abc123  # abc123 = pas de bug

# 3. Git checkout le commit #25 (milieu entre 0 et 40)
# On teste :
npm test

# 4. Le test échoue ? => bisect bad
# Git checkout le commit #12 (milieu entre 0 et 25)
npm test

# 5. Le test passe ? => bisect good
# Git checkout le commit #18
npm test
# ... 6 tests au lieu de 40 ...

# 6. Résultat
# abc789 is the first bad commit
# commit abc789
# Author: ...
# Date: ...
#     feat: ajouter nouvelle validation

# 7. Terminer
git bisect reset
\`\`\`

## Mode automatique (git bisect run)

Le plus puissant : \`git bisect run\` exécute une commande automatiquement à chaque étape :

\`\`\`bash
# Démarrer
git bisect start
git bisect bad HEAD
git bisect good abc123

# Laisser Git tester automatiquement
git bisect run npm test
# ou
git bisect run make test
# ou
git bisect run python -m pytest

# Résultat : trouvé en automatique !

# Script personnalisé
git bisect run ./test-bug.sh
\`\`\`

Votre script doit retourner :
- **0** = commit bon (good)
- **1 à 124** = commit mauvais (bad)
- **125** = commit à ignorer (skip)

\`\`\`bash
#!/bin/bash
# test-bug.sh
npm run build 2>/dev/null && npm test
exit $?
\`\`\`

## Ignorer des commits

\`\`\`bash
# Si un commit ne peut pas être testé (build cassé, pas lié)
git bisect skip

# Ignorer tous les commits d'une série
git bisect skip abc123..def456

# Visualiser l'avancement
git bisect visualize

# Voir le log de la session
git bisect log

# Rejouer une session depuis le log (utile pour scripts)
git bisect replay bisect-log.txt
\`\`\`

## Bonnes pratiques

- **Identifier un "good" commit** le plus proche possible du bug (intervalle réduit)
- **Automatiser le test** avec \`git bisect run <script>\` — gagne un temps considérable
- **Script déterministe** : le script doit retourner le même résultat pour le même commit
- **Commit "good" doit être ANTÉRIEUR** au bug (sinon résultat inversé)
- **Toujours faire \`git bisect reset\`** à la fin (ne pas rester en mode bisect)
- **Vérifier le commit trouvé** avec \`git show abc123\` pour confirmer

## Pièges courants

- Oublier \`git bisect reset\` : reste en mode bisect, HEAD détaché
- Inverser good/bad : Git trouve le mauvais commit
- Script non déterministe : résultats variables, recherche faussée
- Commit "good" qui contient aussi le bug (élargir la recherche)
- Commits qui ne compilent pas (utiliser \`git bisect skip\`)
- Utiliser sur une branche avec des merges complexes (préférer \`--first-parent\`)

## Pour aller plus loin

\`\`\`bash
# Bisect avec first-parent (pour historique avec merges)
git bisect start --first-parent

# Utiliser un terme spécifique (pas juste good/bad)
git bisect start --term-old=fast --term-new=slow

# Exemple : trouver quand les performances ont changé
git bisect start
git bisect old abc123  # avant : rapide
git bisect new HEAD    # maintenant : lent
git bisect run ./benchmark.sh

# Voir les commits dans l'intervalle de bisect
git bisect log | head -20
\`\`\`

Source : [Git Bisect Documentation](https://git-scm.com/docs/git-bisect) et [Pro Git — Debugging](https://git-scm.com/book/fr/v2/Les-outils-de-Git-Déboguer-avec-Git)`},
        {
          id: 'git-21',
          question: 'git reflog',
          answer: "Le **reflog** enregistre **toutes les actions** effectuées sur le dépôt (commits, merges, resets, checkouts…) — même celles « perdues » après un `reset --hard`.\n\nC'est votre **filet de sécurité** : si vous avez accidentellement supprimé des commits, `git reflog` vous permet de retrouver leur hash et de les restaurer avec `git reset --hard <hash>`. Les entrées sont conservées **90 jours** par défaut. __Quand tout semble perdu, le reflog est votre ami.__",
          code: 'git reflog            # voir l\'historique des actions\ngit reset --hard <hash>  # restaurer un état',
          language: 'bash',
        
          deepDive: `# git reflog — Le filet de sécurité ultime

## Principe fondamental

Le **reflog** (Reference Log) enregistre **toutes les actions** qui modifient la position de HEAD et des branches : commits, resets, rebases, merges, checkouts, stashes, etc. C'est votre **filet de sécurité** en cas de perte de données.

**Caractéristiques clés :**
- Conservé **90 jours** par défaut (configurable)
- **Local** à votre dépôt (pas synchronisé avec le remote)
- Contient **toutes les actions**, y compris les "accidents"
- Permet de **restaurer** n'importe quel état antérieur

\`\`\`
Entrées du reflog (chronologique inverse) :
HEAD@{0}: commit: Ajouter validation email
HEAD@{1}: reset: moving to HEAD~1
HEAD@{2}: commit: WIP formulaire contact
HEAD@{3}: checkout: moving from main to feature-auth
HEAD@{4}: pull origin main: Fast-forward
HEAD@{5}: commit: Fix bug login
\`\`\`

## Syntaxe de base

\`\`\`bash
# Voir le reflog complet (HEAD)
git reflog

# Voir le reflog d'une branche spécifique
git reflog show main

# Voir le reflog avec dates relatives
git reflog --date=relative

# Voir le reflog avec dates absolues
git reflog --date=iso

# N dernières entrées
git reflog -n 20

# Voir le reflog de TOUTES les références (y compris les branches supprimées)
git reflog --all
\`\`\`

## Restaurer un état perdu

### Scénario 1 : reset --hard accidentel

\`\`\`bash
# Vous avez fait un reset --hard HEAD~2 par erreur
git reset --hard HEAD~2

# Oh non ! Vous avez perdu les 2 derniers commits !

# 1. Voir le reflog
git reflog
# abc123 HEAD@{0}: reset: moving to HEAD~2   ← vous êtes ici
# def456 HEAD@{1}: commit: Ajouter feature X  ← à récupérer
# ghi789 HEAD@{2}: commit: Fix bug login

# 2. Restaurer
git reset --hard def456
# Ou
git checkout -b recovery-branch def456
\`\`\`

### Scénario 2 : rebase qui a mal tourné

\`\`\`bash
# Un rebase a réécrit l'historique et perdu des commits
git rebase --abort  # déjà trop tard, les commits sont "perdus"

# 1. Voir le reflog
git reflog
# ... HEAD@{5}: rebase finished: returning to refs/heads/feature
# ... HEAD@{6}: checkout: moving from main to feature

# 2. Revenir avant le rebase
git reset --hard HEAD@{6}
\`\`\`

### Scénario 3 : branche supprimée

\`\`\`bash
# Supprimer une branche avec ses commits non fusionnés
git branch -D feature-auth

# Rattraper via reflog
git reflog --all | grep feature-auth
# abc123 refs/heads/feature-auth@{0}: commit: Finaliser auth

# Recréer la branche
git branch feature-auth abc123
\`\`\`

## Syntaxe HEAD@{n} et référence relative

\`\`\`bash
# HEAD@{n} signifie : "la position de HEAD il y a n actions"
# Utile pour revenir en arrière

git reflog
# abc123 HEAD@{0}: commit: Ajouter feature
# def456 HEAD@{1}: reset: moving to HEAD~1
# ghi789 HEAD@{2}: commit: WIP formulaire
# jkl012 HEAD@{3}: commit: Ajouter validation

# Revenir à l'état d'il y a 2 actions
git reset --hard HEAD@{2}

# Revenir à l'état d'il y a 1 heure
git reset --hard HEAD@{1.hour.ago}

# Revenir à hier
git reset --hard HEAD@{1.day.ago}
\`\`\`

## Scénarios de récupération avancés

\`\`\`bash
# Après un merge incorrect
git reflog
git reset --hard HEAD@{1}  # avant le merge

# Après un checkout involontaire (perte de modifications)
git reflog
git checkout -b recovery-branch HEAD@{1}

# Après un stash perdu
git reflog | grep stash
# jkl012 HEAD@{5}: stash: WIP feature X
git stash apply jkl012

# Après un squash --soft (récupérer les commits séparés)
git reflog
# voir les commits originaux dans HEAD@{n}
git reset --soft HEAD@{n}

# Après un reset --hard de ORIG_HEAD
git reflog show ORIG_HEAD
\`\`\`

## Configuration du reflog

\`\`\`bash
# Voir la durée de rétention actuelle
git config --get gc.reflogExpire
# défaut : 90 days

# Configurer la durée (en jours)
git config --global gc.reflogExpire 180

# Configurer pour les commits inaccessibles (plus court)
git config --global gc.reflogExpireUnreachable 30

# Nettoyer manuellement les entrées expirées
git reflog expire --expire=now --all

# Désactiver le garbage collection sur le reflog
git config --global gc.reflogExpire never
# Attention : peut faire grossir le dépôt
\`\`\`

## Bonnes pratiques

- **Premier réflexe après une erreur** : \`git reflog\` (avant \`git fsck\` ou autres)
- **Comprendre** que le reflog est LOCAL et temporaire (90 jours)
- **Faire une branche de backup** avant les opérations risquées (rebase, reset --hard)
- **Combiner avec \`git stash list\`** pour retrouver les stashs perdus
- **Documenter** dans l'équipe : "reflog est votre ami en cas de catastrophe"
- **Utiliser \`--all\`** pour voir les branches supprimées

## Pièges courants

- **Le reflog est local** : pas accessible aux autres, pas sauvegardé sur le remote
- **Expiration** : 90 jours par défaut (ou après \`git gc\`)
- Confondre \`git reflog\` (actions/positions) avec \`git log\` (historique des commits)
- Oublier que le reflog ne couvre pas les commits non rattachés (dangling commits)
- \`git gc\` peut nettoyer le reflog et rendre la récupération impossible
- Faire un \`git push --force\` après avoir récupéré du reflog (vérifier avant)

## Pour aller plus loin

\`\`\`bash
# Voir le reflog formaté
git reflog --format="%gd %gs"

# Comparer l'état actuel avec un point du reflog
git diff HEAD HEAD@{1.day.ago}

# Nettoyer le reflog des entrées inutiles
git reflog expire --expire-unreachable=now --all

# Voir le reflog d'une référence supprimée
git reflog show refs/heads/deleted-branch
\`\`\`

Source : [Git Reflog Documentation](https://git-scm.com/docs/git-reflog)`},
        {
          id: 'git-22',
          question: 'Commit signing (GPG)',
          answer: "Signer ses commits avec **GPG** prouve que le code vient bien de vous, empêchant l'usurpation d'identité. GitHub affiche un badge **« Verified »** sur les commits signés.\n\nConfiguration : générez une clé GPG, ajoutez-la à GitHub, puis `git config commit.gpgsign true`. Obligatoire dans certaines entreprises pour la **chaîne de confiance** et la conformité. __La signature renforce la traçabilité et la sécurité du dépôt.__",
        
          deepDive: `# Commit Signing (GPG)

## Principe fondamental

La signature GPG (GNU Privacy Guard) permet de **signer cryptographiquement** vos commits et tags Git. Cela garantit :

- **Authenticité** : le commit vient bien de vous (pas d'usurpation d'identité)
- **Intégrité** : le contenu du commit n'a pas été modifié après signature
- **Non-répudiation** : vous ne pouvez pas nier avoir fait ce commit

Sur GitHub/GitLab, les commits signés affichent un badge **"Verified"** ou **"Signed"**. Certaines entreprises exigent la signature pour la conformité et la chaîne de confiance.

## Configuration GPG

\`\`\`bash
# 1. Vérifier si vous avez déjà une clé
gpg --list-secret-keys --keyid-format LONG

# 2. Générer une nouvelle clé
gpg --full-generate-key
# Type : RSA and RSA (ou Ed25519 si supporté)
# Taille : 4096 bits
# Expiration : 2 ans (recommandé)
# Email : DOIT correspondre à l'email de votre Git config

# 3. Lister les clés pour obtenir l'ID
gpg --list-secret-keys --keyid-format LONG
# sec   rsa4096/ABC123DEF456 2024-01-01 [SC]
#                              ^-- ID de la clé

# 4. Exporter la clé publique
gpg --armor --export ABC123DEF456
# Copier le résultat (de ---BEGIN PGP PUBLIC KEY BLOCK--- à ---END---)
\`\`\`

## Configuration Git

\`\`\`bash
# Associer la clé GPG à Git
git config --global user.signingkey ABC123DEF456

# Activer la signature par défaut pour tous les commits
git config --global commit.gpgsign true

# Activer la signature pour les tags
git config --global tag.gpgSign true

# Vérifier la configuration
git config --global --list | grep gpg
# user.signingkey=ABC123DEF456
# commit.gpgsign=true
# tag.gpgsign=true
\`\`\`

## Ajouter la clé à GitHub/GitLab

\`\`\`bash
# 1. Exporter la clé publique
gpg --armor --export ABC123DEF456

# 2. GitHub : Settings > SSH and GPG keys > New GPG key
#    Copier la clé publique (---BEGIN PGP PUBLIC KEY BLOCK---)
#
# 3. GitLab : Settings > GPG Keys > Add key
#
# Important : l'email de la clé GPG doit correspondre à l'email
# de votre compte GitHub/GitLab ET à votre git config local
\`\`\`

## Signer des commits

\`\`\`bash
# Signer un commit
git commit -S -m "feat: ajouter authentification OAuth2"
# -S = signer (majuscule)

# Signer avec une clé spécifique (si plusieurs clés)
git commit -SABC123DEF456 -m "feat: ajouter auth"

# Signer un tag
git tag -s v1.0.0 -m "Release 1.0.0"

# Vérifier les signatures dans l'historique
git log --show-signature

# Vérifier un commit spécifique
git verify-commit HEAD

# Vérifier un tag
git verify-tag v1.0.0
\`\`\`

## Configuration avancée

\`\`\`bash
# Cacher la phrase de passe GPG (macOS)
brew install pinentry-mac
echo "pinentry-program /usr/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf
gpgconf --kill gpg-agent

# Cacher la phrase de passe GPG (Linux)
sudo apt-get install pinentry-tty
echo "pinentry-program /usr/bin/pinentry-tty" >> ~/.gnupg/gpg-agent.conf
gpgconf --kill gpg-agent

# Utiliser l'agent GPG avec SSH (forwarding)
echo "enable-ssh-support" >> ~/.gnupg/gpg-agent.conf

# Configurer Git pour utiliser une clé différente par dépôt
cd mon-projet
git config user.signingkey AUTRECLE123

# Exiger la signature pour le push (remote)
git push --signed origin main
# Le remote doit supporter signed pushes
\`\`\`

## Gérer plusieurs clés

\`\`\`bash
# Créer une clé dédiée au travail (recommandé)
gpg --full-generate-key
# Email: prenom.nom@entreprise.com

# Créer une clé personnelle
gpg --full-generate-key
# Email: prenom.nom@gmail.com

# Configurer par dépôt
cd ~/work/projet-entreprise
git config user.signingkey CLE_PRO

cd ~/perso/projet-personnel
git config user.signingkey CLE_PERSO
\`\`\`

## Bonnes pratiques

- Utiliser une **clé GPG dédiée au travail** (pas la clé personnelle)
- Configurer une **expiration** (1-2 ans) et planifier le renouvellement
- **Stocker la clé privée** dans un endroit sûr (YubiKey, KeepassXC, gestionnaire de mots de passe)
- **Exporter une clé de révocation** au moment de la création de la clé
- **Tourner les clés** tous les 2-3 ans minimum
- Activer \`commit.gpgsign true\` en global (ne pas oublier de signer)
- Configurer le **cache de phrase de passe** (pinentry) pour éviter de la saisir à chaque commit

## Pièges courants

- **Email GPG != email Git** : la signature ne sera pas vérifiée par GitHub/GitLab
- **Clé expirée** : les commits ne seront plus signés (badge "Unverified")
- Oublier de configurer \`commit.gpgsign = true\` sur une nouvelle machine
- Stocker la clé privée sur une machine non sécurisée
- Perdre la phrase de passe (clé inutilisable)
- **Ne pas exporter la clé de révocation** : si la clé est compromise, impossible de la révoquer
- Utiliser une clé trop courte (RSA 2048 minimum, 4096 recommandé)

## Pour aller plus loin

\`\`\`bash
# Signer des pushes (GitHub)
# Settings > Branches > Require signed commits

# Voir les commits non signés récemment
git log --no-merges --author="Votre Nom" --pretty=format:"%h %s"

# Exporter la clé de révocation
gpg --gen-revoke ABC123DEF456 > revocation.asc
# Stocker ce fichier dans un endroit sûr !

# Importer une clé sur une nouvelle machine
gpg --import cle-privee.asc

# Révoguer une clé compromise
gpg --import revocation.asc
gpg --keyserver keyserver.ubuntu.com --send-keys ABC123DEF456

# Voir l'état des signatures
git log --show-signature --oneline -10
\`\`\`

Source : [Git Tools — Signing Your Work](https://git-scm.com/book/fr/v2/Les-outils-de-Git-Signer-votre-travail) et [GitHub — Managing commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification)`},
      ],
    },
  ],
};