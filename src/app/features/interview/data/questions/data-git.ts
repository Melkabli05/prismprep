import type { InterviewCategory } from '../../../../core/models/interview.models';

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
        
          deepDive: `# C'est quoi Git

## Quest-ce que cest ?

Git est un systeme de gestion de versions decentralise cree par Linus Torvalds en 2005. Il permet de:
- Suivre les modifications du code source
- Collaborer a plusieurs sur le meme projet
- Revenir a des versions anterieures
- Gérer des branches paralleles

## Concepts cles

**Repository (depot)**
Un projet complet avec tout son historique. Chaque developpeur a une copie locale complete.

**Commit**
Un snapshot des modifications a un instant donne. Chaque commit a un identifiant unique (SHA-1).

**Branche (branch)**
Une ligne de developpement parallele. La branche par defaut est generalement main ou master.

**Merge**
Combiner les modifications de deux branches.

**Clone**
Copier un depot distant en local.

## Commandes de base

-- Initialiser un depot
git init

-- Cloner un depot
git clone https://github.com/user/repo.git

-- Voir le statut
git status

-- Ajouter des fichiers
git add fichier.txt
git add .

-- Commit
git commit -m "Message descriptif"

-- Voir l'historique
git log

## Architecture decentralisee

Local:
- Working Directory (fichiers actuels)
- Staging Area (index)
- Local Repository

Distant:
- Remote Repository

## Bonnes pratiques

- Commit souvent avec des messages clairs
- Une seule fonctionnalité par commit
- Pull avant de push
- Utiliser des branches pour les nouvelles fonctionnalités

## Pieges courants

- Commit sans message ou message vague
- Oublier de stage les fichiers avant commit
- Push sur main/main (utiliser des branches)
- Confondre git reset et git revert

Source : [Git Documentation](https://git-scm.com/documentation)`},
        {
          id: 'git-2',
          question: "C'est quoi un bon commit ?",
          answer: "Un bon commit décrit le **QUOI** et le **POURQUOI** : « Fixe le bug de validation des emails » (quoi) + « Les emails avec un '+' étaient rejetés à tort » (pourquoi). Évitez les messages vagues comme « update ».\n\nUtilisez les **commits conventionnels** : `feat`, `fix`, `refactor`, etc. pour un historique lisible. __Une seule modification logique par commit.__",
          code: 'git commit -m "Fixe le bug de validation des emails"',
          language: 'bash',
        
          deepDive: `# Un bon commit

## Quest-ce que cest ?

Un bon commit est une unitelogique de modification qui:
- Representer une seule atomic change
- Etre comprehensible par tout le monde
- Permettre de revenir en arriere precisement

## Structure d'un bon message de commit

Format recommande:

[Type] Description courte (50 caracteres max)

Corps du message optionnel expliquant le "pourquoi"
sur plusieurs lignes si necessaire.

Types courants:
- feat: nouvelle fonctionnalite
- fix: correction de bug
- docs: documentation
- style: formatage, pas de changement de code
- refactor: restructuration du code
- test: ajout de tests
- chore: maintenance

## Exemples

**Bon commit:**
feat: ajouter validation email dans le formulaire

- Ajout de regex de validation
- Message d'erreur utilisateur friendly
- Integration avec les tests existants

**Mauvais commits:**
- "fixes"
- "updates"
- "WIP"
- "asdfgh"
- "changes"

## Commandes utiles

-- Voir les commits recents
git log --oneline -10

-- Modifier le dernier commit (pas encore push)
git commit --amend

-- Visualiser les changements d'un commit
git show HEAD

-- Annuler les modifications d'un fichier
git checkout -- fichier.txt

## Atomic commits

Un commit est atomique s'il:
- Represente une seule idee
- Peut etre applique ou reverti independamment
- Ne contient pas de modifications non liees

## Bonnes pratiques

- Commencer par une description courte de 50 caracteres
- Utiliser l'imperatif present ("add" pas "added")
- Separer le sujet du corps par une ligne vide
- Limiter la ligne de sujet a 50 caracteres
- Capitaliser la premiere lettre

## Pieges courants

- Messages trop longs ou sans structure
- Combiner plusieurs changements non lies
- Commit sans rapport avec le ticket associee
- Oublier de tester avant de commit

Source : [Conventional Commits](https://www.conventionalcommits.org/)`},
        {
          id: 'git-3',
          question: 'Dépôt distant',
          answer: "Un **dépôt distant** est hébergé sur un serveur (`GitHub`, `GitLab`, `Bitbucket`) et permet la collaboration d'équipe. `git remote add` connecte votre local au distant (« `origin` » par convention), `git push` envoie les commits, `git pull`/`git fetch` récupère les modifications.\n\nWorkflow classique : `pull` → travailler → `commit` → `push`. Tout tourne autour de la **synchronisation local/distant**.",
          code: 'git remote add origin https://github.com/user/repo.git\ngit push origin main',
          language: 'bash',
        
          deepDive: `# Depot distant

## Quest-ce que cest ?

Un depot distant (remote) est une version de votre projet hebergee sur un serveur (GitHub, GitLab, Bitbucket, etc.). Les remotes permettent la collaboration entre developpeurs.

## Commandes de base

-- Lister les remotes
git remote -v

-- Ajouter un remote
git remote add origin https://github.com/user/repo.git

-- Recuperer les modifications
git fetch origin

-- Télécharger et fusionner
git pull origin main

-- Envoyer vos commits
git push origin main

-- Voir les branches distantes
git branch -r

## Travailler avec les remotes

-- Cloner un depot
git clone https://github.com/user/repo.git

Le remote "origin" est automatiquement configure.

-- Modifier l'URL d'un remote
git remote set-url origin https://github.com/user/new-repo.git

-- Renommer un remote
git remote rename origin upstream

## Branches et remotes

-- Creer une branche et pusher
git checkout -b nouvelle-fonctionnalite
git push -u origin nouvelle-fonctionnalite

-u definit le upstream pour pull/push simplifies.

-- Suivre une branche distante
git checkout --track origin/feature-branch

## Fetch vs Pull

**git fetch:**
- Telecharge les donnees distantes
- Ne modifie pas votre working directory
- Vous devez faire un merge manuellement

**git pull:**
- Fetch + Merge automatique
- Plus rapide mais peut creer des conflits

## Bonnes pratiques

- Pull avant de commencer a travailler
- Push regulierement pour sauvegarder
- Utiliser des branches pour organiser le travail
- Verifier le remote avant de pusher

Source : [Git Remote Documentation](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)`},
        {
          id: 'git-4',
          question: 'git clone vs git fork',
          answer: "`git clone` crée une copie locale d'un dépôt distant, liée au dépôt original — vous pouvez push directement si vous avez les droits. `git fork` (fonctionnalité GitHub, pas Git) crée une copie indépendante sur votre compte GitHub, pour contribuer via **Pull Request**.\n\nC'est le workflow open source : forkez, modifiez, proposez via PR. **Clone** = copie locale liée, **fork** = copie indépendante pour contribuer via PR.",
        
          deepDive: `# git clone vs git fork

## Quest-ce que cest ?

Deux facons d'obtenir une copie d'un projet, avec des usages differents.

## git clone

clone cree une copie locale d'un depot distant. Vous avez maintenant tout l'historique du projet.

-- Cloner un depot public ou auquel vous avez acces
git clone https://github.com/user/repo.git

Quand cloner:
- Vous etes collaborateur du projet
- Vous voulez travailler sur le projet directement
- Vous avez deja les droits d'ecriture

## git fork

Fork cree une copie du depot sous votre propre compte GitHub/GitLab. C'est une operation web.

Quand forker:
- Vous voulez contribuer a un projet open source
- Vous n'avez pas les droits d'ecriture sur le depot original
- Vous voulez proposer des modifications via Pull Request

## Workflow typique pour contribuer a un OSS

1. Forker le projet sur GitHub
2. Cloner votre fork en local
3. Creer une branche pour votre feature
4. Faire vos modifications
5. Pusher sur votre fork
6. Creer une Pull Request vers le depot original

## Commands associees

-- Ajouter le depot original comme upstream
git remote add upstream https://github.com/original/repo.git

-- Recuperer les mises a jour du depot original
git fetch upstream

-- Merger les mises a jour
git merge upstream/main

## Comparaison

| Aspect | clone | fork |
|--------|-------|------|
| Type | Local | Web/Cloud |
| Droits | Acces necessaire | Pas besoin |
| Historique | Complet | Complet |
| Contribution | Directe | Via PR |
| Usage | Propres projets, collaborations etroites | Open source |

Source : [GitHub - Fork a Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)`},
        {
          id: 'git-5',
          question: 'git pull vs git fetch',
          answer: "`git fetch` récupère les modifications du distant **sans les fusionner** — vous pouvez vérifier l'état avant de décider. `git pull` fait les deux d'un coup : `fetch` + `merge` automatique.\n\nLe risque avec `pull` est de rencontrer des conflits inattendus si le distant a divergé. Préférez `fetch` + `merge` manuel pour plus de contrôle. **Fetch** = télécharger sans fusionner (plus sûr), **Pull** = télécharger et fusionner (*plus rapide mais risqué*).",
        
          deepDive: `# git pull vs git fetch

## Quest-ce que cest ?

Deux commandes pour synchroniser votre depot local avec le depot distant, avec des comportements differents.

## git fetch

Recupere les donnees du depot distant mais ne les fusionne PAS avec votre branche locale.

-- Recuperer toutes les branches distantes
git fetch origin

-- Recuperer une branche specifique
git fetch origin main

Apres un fetch, vous pouvez voir les modifications distantes:
git log origin/main

Vous pouvez ensuite faire un merge manuellement:
git merge origin/main

## git pull

Combine fetch et merge en une seule commande.

-- Pull avec merge automatique
git pull origin main

-- Pull avec rebase (preferable pour des branches partagees)
git pull --rebase origin main

## Difference pratique

git fetch:
- Sur. Votre branche locale reste intacte
- Vous permet de controler quand merger
- Ideal pour verifier avant de fusionner

git pull:
- immediate merge
- Plus rapide pour des mises a jour simples
- Risque de commits de merge si developpement parallele

## Workflow recommande

1. git fetch origin (voir ce qui a change)
2. git log origin/main (revoir les commits)
3. git diff main origin/main (voir les differences)
4. git merge origin/main (si tout est bon)

## Gerer les conflits

Si git pull cree un conflit:
git status  -- Voir les fichiers en conflit
-- Editer les fichiers pour resoudre
git add fichier.txt
git commit -m "Resolve merge conflict"

Ou avec rebase:
git pull --rebase origin main
git rebase --continue  -- apres resolution

## Bonnes pratiques

- Preferer git fetch + git merge pour le controle
- Utiliser git pull --rebase pour garder un historique lineaire
- Faire attention aux branches partagees (eviter les rebase)
- Commit ou stash avant de pull si vous avez des modifications locales

Source : [Git Pull Documentation](https://git-scm.com/docs/git-pull)`},
        {
          id: 'git-17',
          question: '.gitignore',
          answer: "Fichier listant les fichiers et répertoires à **exclure du suivi Git** : fichiers compilés (`*.class`), dépendances (`node_modules/`), configs locales (`.env`), fichiers IDE (`.idea/`), secrets et tokens.\n\nCréez-le **dès l'initialisation** du projet. Sur GitHub, des templates `.gitignore` existent par langage/framework. Un fichier oublié dans Git peut être retiré ultérieurement avec `git rm --cachéed` sans le supprimer localement. __Ne jamais committer de secrets ou de fichiers générés.__",
          code: '# .gitignore\nnode_modules/\n.env\ntarget/\n*.class\n.idea/',
          language: 'bash',
        
          deepDive: `# .gitignore

## Qu'est-ce que c'est

Le fichier \`.gitignore\` indique à Git quels fichiers et répertoires ignorer lors du suivi des modifications. C'est essentiel pour éviter de commiter des fichiers générés, des dépendances, des secrets, ou des artefacts de build.

## Syntaxe et exemples

\`\`\`
# Commentaires
# Fichiers generes par le systeme
.DS_Store
Thumbs.db

# Logs et fichiers temporaires
*.log
*.tmp
*.swp

# Repertoires
node_modules/
build/
dist/
target/

# Fichiers specifiques
secret.json
.env.local
credentials.txt

# Patterns generaux
*.class
*.pyc
*.o

# Negation (forcer le suivi d'un fichier ignore)
!important.js

# Repertoire mais pas ses sous-repertoires
/logs/

# Garder un repertoire vide
logs/.gitkeep

# Ignorer tout sauf un type de fichier
!*/*.txt

# Caractere generique unique
file?.txt    # matche file1.txt, file2.txt mais pas file10.txt
file[0-9].txt

# Racine uniquement (pas dans les sous-repertoires)
/*.log
\`\`\`

### .gitignore global

\`\`\`bash
# Creer un .gitignore global (s'applique a tous les depots)
git config --global core.excludesfile ~/.gitignore_global

# Contenu type du .gitignore global
.DS_Store
*.swp
*.log
\`\`\`

### Modèles pré-faits

\`\`\`bash
# Generer un .gitignore selon le langage/framework
# Via GitHub: https://github.com/github/gitignore

# Exemple pour Node.js
node_modules/
npm-debug.log
.env
dist/
build/
\`\`\`

## Bonnes pratiques

- Placez le \`.gitignore\` à la racine du depot et committez-le
- Utilisez \`.gitignore_global\` pour les fichiers machine-spécifiques (\`.DS_Store\`)
- Commencez avec un modèle pre-fait (GitHub gitignore templates)
- Utilisez \`git check-ignore -v\` pour deboguer pourquoi un fichier est ignoré
- N'ignorez jamais les fichiers de configuration du projet (\`.gitignore\` lui-même)
- Vérifiez avec \`git status --ignored\` pour voir les fichiers ignorés

## Pieges courants

- Oublier qu'un fichier est déjà suivi par Git (le .gitignore ne l'affecte pas)
- Solution: \`git rm --cached <file>\` puis commit
- Commit accidentel de secrets (\`.env\`, \`credentials.json\`) malgré le .gitignore
- Patterns trop larges qui ignorent des fichiers nécessaires (\`*.log\` dans un dossier \`logs/\`)
- Mauvais chemin relatif (utiliser \`/\` pour la racine, pas pour les sous-dossiers)

## Pour aller plus loin

\`\`\`bash
# Verifier si un fichier est ignore et pourquoi
git check-ignore -v monfichier.txt
# monfichier.txt:2:*.log    .gitignore:2

# Lister les fichiers ignores
git status --ignored

# Forcer l'ajout d'un fichier ignore
git add -f secrete.json
\`\`\`

Source: https://git-scm.com/docs/gitignore`},
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

## Qu'est-ce que c'est

Une branche Git est un pointeur mobile vers un commit dans l'historique. Elle permet de travailler sur des fonctionnalités, corrections ou expériences de manière isolée sans affecter le code principal.

Par defaut, Git crée la branche \`main\` (ou \`master\`) lors de l'initialisation d'un depot.

Le pointeur HEAD indique la branche active et le commit où vous vous trouvez.

## Syntaxe et exemples

\`\`\`bash
# Lister les branches (locale)
git branch

# Lister toutes les branches (locale + remote)
git branch -a

# Creer une branche (ne bascule pas)
git branch feature-auth

# Bascule sur une branche
git checkout feature-auth
git switch feature-auth  # syntaxe plus recente

# Creer et basculer en une commande
git checkout -b feature-auth
git switch -c feature-auth

# Renommer la branche courante
git branch -m nouveau-nom

# Supprimer une branche (fusionnee)
git branch -d feature-auth

# Forcer la suppression (non fusionnee)
git branch -D feature-auth

# Voir la branche actuelle
git branch --show-current
git rev-parse --abbrev-ref HEAD
\`\`\`

### Branchesdetachees

\`\`\`bash
# Se placer sur un commit/tag sans creer de branche
git checkout abc123
git checkout v1.0.0

# Avertissement: les commits ne seront lies a aucune branche
# Solution: creer une branche depuis ce point
git switch -c recovery-branch
\`\`\`

## Bonnes pratiques

- Gardez les branches courtes et focalisees sur une tâche
- Utilisez des noms descriptifs: \`feature/auth-login\`, \`hotfix/payment-bug\`
- Mergez frequently pour eviter les conflits massifs
- Supprimez les branches après merge (local et remote)
-Utilisez \`git fetch --prune\` pour nettoyer les branches remote supprimees
- Préférez \`git switch\` à \`git checkout\` pour éviter les confusions

## Pieges courants

- Travailler sur une longue branche sans merger = conflits difficiles
- Confondre \`git branch -d\` (supprime locale) avec suppression remote
- Oublier sur quelle branche on se trouve avant de commiter
- Supprimer une branche non fusionnee et perdre du travail
- Utiliser \`git checkout\` pour créer une branche (confusion avec fichiers)

## Pour aller plus loin

\`\`\`bash
# Tracer une branche jusqu'à sa branche parente
git log --graph --oneline --decorate

# Comparer branche actuelle avec main
git diff main..HEAD

# Tracker une branche remote
git checkout --track origin/feature-branch

git branch -u origin/feature-branch  # si déjà locale
\`\`\`

Source: https://git-scm.com/docs/git-branch`},
        {
          id: 'git-7',
          question: 'Fusionner des branches / conflits',
          answer: "`git merge` combine deux branches. Des **conflits** surviennent quand les mêmes lignes sont modifiées dans les deux branches — Git insère des marqueurs (`<<<<<<<`, `=======`, `>>>>>>>`) et demande une résolution manuelle.\n\nOuvrez le fichier, choisissez la bonne version (ou combinez-les), puis commitez. __Clé : fusionner régulièrement pour éviter que les conflits ne s'accumulent.__",
        
          deepDive: `# Fusionner des branches et conflits

## Qu'est-ce que c'est

\`git merge\` integrate l'historique d'une branche dans la branche active. Si Git ne peut pas résoudre automatiquement les differences, un conflit apparait.

Types de merge:
- **Fast-forward**: Pas de divergence, simple avance du pointeur
- **Three-way merge**: Divergence, creation d'un commit de fusion

## Syntaxe et exemples

\`\`\`bash
# Merge simple (fast-forward si possible)
git checkout main
git merge feature-auth

# Merge avec rebase (aplanir l'historique)
git merge --no-ff feature-auth

# Merge en squasant les commits (un seul commit de merge)
git merge --squash feature-auth

# Aborter un merge en cours
git merge --abort

# Merge avec strategie
git merge -s recursive -X theirs feature-branch

# Visualiser le merge avant de le faire
git merge --no-commit --no-ff feature-auth
git diff --cached
\`\`\`

### Stratégies de merge

\`\`\`bash
# recursive (defaut) — gère bien les diamond merges
git merge -s recursive

# resolve — simple, pour historiques linéaires
git merge -s resolve

# octopus — pour merger plusieurs branches (>2)
git merge -s octopus branch1 branch2 branch3

# ours — garder notre version, ignorer les theirs
git merge -s ours theirs-branch
\`\`\`

### Resoudre un conflit

\`\`\`bash
# Voir les fichiers en conflit
git status

# Ouvrir le fichier et chercher <<<<<<<
<<<<<<< HEAD
code actuel
=======
code de la branche
>>>>>>> feature-branch

# Garder la version choisie, supprimer les marqueurs
# puis
git add <file>
git commit
\`\`\`

## Bonnes pratiques

- Mergez frequemment pour eviter les conflits massifs
- Utilisez \`--no-ff\` pour garder l'historique des features visibles
- Testez après chaque merge avant de pusher
- Commettez le message de merge auto-generé ou personnalisez-le
- Préférez \`--squash\` pour les branches avec beaucoup de micro-commits

## Pieges courants

- Merger une branche contenant des tests cassés
- Oublier de faire \`git add\` après résolution de conflit
- Push sans verifier le merge — conflit en remote
- Merge de branches avec des histories tres divergentes (beaucoup de conflits)
- Utiliser \`ours\` stratégie sans comprendre les consequences (perte de code)

## Pour aller plus loin

\`\`\`bash
# Verifier si une branche contient des commits non mergés
git log --left-right HEAD...feature-branch

# Merge avec message personnalise
git merge -m "feat: integrate auth feature from #123"

# Marquer comme merge (sans conflit apparent mais verification)
git merge --verify-signatures
\`\`\`

Source: https://git-scm.com/docs/git-merge`},
        {
          id: 'git-8',
          question: 'git rebase ?',
          answer: "`git rebase` **réécrit l'historique** d'une branche en appliquant ses commits au-dessus d'une autre branche. Résultat : un historique **linéaire et propre**, sans commit de fusion inutile.\n\nMais `rebase` modifie les hashes des commits — __ne l'utilisez jamais sur une branche déjà pushée et partagée__. __Règle d'or : `rebase` uniquement sur des branches locales non partagées.__",
          code: 'git checkout feature-login\ngit rebase main',
          language: 'bash',
        
          deepDive: `# git rebase

## Qu'est-ce que c'est

\`git rebase\` réapplique les commits d'une branche sur une autre base, créant un historique linéaire plutôt que de créer un commit de merge. C'est une opération qui réécrit l'historique.

Principe: "transplanter" une série de commits d'un point A à un point B.

## Syntaxe et exemples

\`\`\`bash
# Rebaser sur main ( integration lineaire)
git checkout feature-auth
git rebase main

# Rebaser interactif (voir autre deep dive)
git rebase -i HEAD~3

# Rebaser sur un tag specifique
git rebase v1.0.0

# Continuer apres un conflit de rebase
git rebase --continue

# Annuler le rebase
git rebase --abort

# Rebaser avec strategy
git rebase -s recursive -X theirs main
\`\`\`

### Comprendre le processus

\`\`\`
Avant rebase:
main:    A--B--C
              \\nfeature:        D--E

Apres rebase:
main:    A--B--C
               \\nfeature:             D'--E' (reappliques sur C)
\`\`\`

### Rebase vs Merge

\`\`\`bash
# Merge: cree un commit de fusion, historien non-lineaire
git checkout main
git merge feature-auth
# Resultat: A--B--C--M (merge commit)

# Rebase: reapplique les commits, historique lineaire
git checkout feature-auth
git rebase main
# Resultat: A--B--C--D'--E'
\`\`\`

## Bonnes pratiques

- NE JAMAIS faire de rebase sur des branches partagees (push vers remote public)
- Utilisez le rebase pour garder un historique lineaire en local
- Preferer le rebase avant de merger une feature dans develop/main
- Resolvez les conflits rapidement (git add + git rebase --continue)
- Utilisez \`git pull --rebase\` pour sincroniser au lieu de merge

## Pieges courants

- Faire un rebase sur une branche deja poussee = réécriture de l'historique public
- Perte de commits si le rebase echoue et pas de backup (utiliser reflog)
- Conflits en cascade si la branche a beaucoup de commits
- Confondre \`git rebase -i\` (interactive) avec \`git rebase\` (standard)
- Pusher apres rebase sans avertir l'equipe (utiliser --force-with-lease)

## Pour aller plus loin

\`\`\`bash
# Rebaser les commits non pousses uniquement
git rebase -i @{u}

# Rebaser en gardant les merges
git rebase --rebase-merges

# Pull avec rebase (au lieu de merge)
git pull --rebase origin main

# Stack de branches (rebase en cascade)
git rebase main feature-base
git rebase feature-base feature-detail
\`\`\`

Source: https://git-scm.com/docs/git-rebase`},
        {
          id: 'git-9',
          question: 'merge vs rebase',
          answer: "`git merge` crée un commit de fusion avec deux parents — l'historique est **fidèle** mais peut devenir complexe. `git rebase` réécrit l'historique pour un flux **linéaire** plus lisible.\n\nEn pratique, `rebase` est souvent utilisé sur les branches de feature avant `merge` dans `main`. Mais `rebase` est *dangereux* sur les branches partagées car il modifie les hashes. **Merge** = historique fidèle, **Rebase** = historique linéaire — le choix dépend de la politique d'équipe.",
        
          deepDive: `# Merge vs Rebase

## Qu'est-ce que c'est

Merge et rebase sont deux stratégies pour intégrer les modifications d'une branche dans une autre. Chaque approche a ses avantages et convient à des situations différentes.

## Comparaison directe

| Aspect | Merge | Rebase |
|--------|-------|--------|
| Historique | Non-lineaire (merge commits) | Lineaire |
| Modification de l'historique | Non | Oui |
| Risque sur branches partagees | Aucun | Eleve |
| Complexite de resolution | Diluee dans un commit | Multiples conflits |
| Traçabilité des branches | Claire (merge commit) | Moins evidente |

## Merge (non-lineaire)

\`\`\`bash
# Situation avant merge:
main:    A--B--C
              \\nfeature:        D--E

# Apres merge (fast-forward):
main:    A--B--C--D--E

# Apres merge (three-way):
main:    A--B--C---------M
              \\n             /nfeature:        D--E----
\`\`\`

\`\`\`bash
git checkout main
git merge feature-auth
\`\`\`

**Avantages:**
- Conserve l'historique complet des branches
- Operation securisee (ne réécrit pas l'historique public)
- Montre clairement quand une branche a été integrée

**Inconvenients:**
- Historique peut devenir difficile a suivre
- Commit de merge peut etre pollue
- "Diamond problem" (commits dupliqués dans l'historique)

## Rebase (lineaire)

\`\`\`bash
# Situation avant rebase:
main:    A--B--C
              \\nfeature:        D--E

# Apres rebase:
main:    A--B--C--D'--E'
\`\`\`

\`\`\`bash
git checkout feature-auth
git rebase main
\`\`\`

**Avantages:**
- Historique lineaire et facile a suivre
- Pas de merge commits inutiles
- Clean pour code review

**Inconvenients:**
- REECRIT L'HISTORIQUE (ne jamais faire sur branche partagee)
- Conflits multiples a resoudre (un par commit)
- Perd la trace du moment ou la feature a été créée

## Quand utiliser quoi

\`\`\`bash
# Utiliser MERGE quand:
# - Branche de collaboration (partagee avec l'equipe)
# - Integration de branches long-lived (release, hotfix)
# - Pas besoin d'historique lineaire

git checkout main
git merge release/v1.0

# Utiliser REBASE quand:
# - Branche locale privee (pas poussee)
# - Integration de feature sur main/develop
# - Garder historique lineaire en local

git checkout feature-auth
git rebase main

# Utiliser PULL --REBASE quand:
# - Synchroniser avec remote sans creer merge commit

git pull --rebase origin main
\`\`\`

## Bonnes pratiques

- Jamais de rebase sur une branche publique/partagee
- Préférez \`--no-ff\` si vous voulez garder trace du merge
- Utilisez \`git pull --rebase\` pour garder un historique lineaire
- Définissez des règles d'équipe: merge pour releases, rebase pour features
- Documentez la stratégie dans le CONTRIBUTING.md

## Pieges courants

- Rebase sur une branche déjà pushée (puis push --force necessaire)
- Merge de grosses branches sans testing prealable
- Confusion sur quand rebaser après un merge
- Oublier que le rebase réécrit les commits (nouveaux hash)

## Pour aller plus loin

\`\`\`bash
# Rebase avec histogam algorithm (meilleur pour refactors)
git rebase -s recursive -X histogram main

# Merge en squasant les commits avant rebase
git merge --squash feature-auth

# Voir la difference visuelle
git log --graph --oneline main..feature
\`\`\`

Source: https://git-scm.com/docs/git-merge et https://git-scm.com/docs/git-rebase`},
        {
          id: 'git-10',
          question: 'Squash de commits ?',
          answer: "Le **squash** combine plusieurs commits en un seul pour garder un historique **propre**. Utile quand une feature génère des commits du type « fix typo », « ajout test »...\n\nUtilisez `git rebase -i HEAD~3`, puis remplacez « `pick` » par « `squash` » pour les commits à fusionner. Particulièrement utile pour les **Pull Requests** afin de garder `main` propre. **Squash** = combiner des commits en un seul via rebase interactif.",
          code: 'git rebase -i HEAD~3\n# Choisir "squash" pour fusionner',
          language: 'bash',
        
          deepDive: `# Git Rebase Interactif (git rebase -i)

## Qu'est-ce que c'est

Le rebase interactif (\`git rebase -i\` ou \`git rebase --interactive\`) permet de réécrire l'historique de commits en offrant un contrôle total sur chaque commit: renommer, fusionner, scinder, réorganiser ou même supprimer des commits.

Il ouvre un éditeur avec la liste des commits à rebaser, chacun preceded d'un mot-clé d'action.

## Syntaxe et exemples

\`\`\`bash
# Lancer le rebase interactif sur les 3 derniers commits
git rebase -i HEAD~3

# Sur une branche upstream
git rebase -i main
\`\`\`

### Mots-cles d'action

| Mot-clé | Action |
|---------|--------|
| \`pick\` | Utiliser le commit tel quel |
| \`reword\` | Modifier le message de commit |
| \`edit\` | Suspendre pour modifier le contenu |
| \`squash\` | Fusionner avec le commit précédent |
| \`fixup\` | Fusionner et discard le message |
| \`drop\` | Supprimer le commit |
| \`reorder\` | Réorganiser (déplacer les lignes) |

### Exemple de fichier interactif

\`\`\`
pick 9a8d12c Ajouter la fonctionnalité de recherche
pick 3f2e1ab Corriger les fautes de frappe
pick 7bc9de3 Améliorer la performance

# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like squash, but discard this commit message
# d, drop = remove commit
\`\`\`

### Workflow de squash de commits

\`\`\`bash
# Avant: plusieurs commits sur feature-branch
git log --oneline
# abc123 Amelioration 3
# def456 Amelioration 2
# ghi789 Amelioration 1

# Lancer rebase interactif pour fusionner en un seul commit
git rebase -i HEAD~3

# Dans l'editeur, changer:
#   pick abc123 Amelioration 3
#   squash def456 Amelioration 2
#   squash ghi789 Amelioration 1

# Resultat: un seul commit avec message fusionne
\`\`\`

## Bonnes pratiques

- NE JAMAIS faire de rebase sur des commits deja partages (pushes sur remote public)
- Utilisez le rebase interactif pour nettoyer l'historique avant un merge request
- Preferer des commits atomiques (une modification par commit) pour faciliter le code review
- Utilisez \`fixup\` pour incorporer les corrections sans polluer l'historique
- Testez apres un rebase interactif — des conflits peuvent apparaitre
- Utilisez \`--exec\` pour run des tests automatiquement pendant le rebase

## Pieges courants

- Pousser apres rebase avec \`git push --force\` sans avertir l'equipe
- Supprimer accidentellement des commits avec \`drop\` sans s'en rendre compte
- Perdre des commits si le rebase echoue et qu'on ne sait pas résoudre les conflits
- Confondre \`squash\` (garde le message) avec \`fixup\` (ignore le message)
- Utiliser le rebase interactif sur une branche de production

## Pour aller plus loin

\`\`\`bash
# Rebaser en gardant les fusions
git rebase -i --rebase-merges

# Executer des tests pendant le rebase
git rebase -i --exec "npm test"

# Garder trace des rebases dans reflog
git reflog show --date=relative
\`\`\`

Source: https://git-scm.com/docs/git-rebase`},
        {
          id: 'git-18',
          question: 'Git Flow vs Trunk-based',
          answer: "**Git Flow** : branches longues (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`) — structuré mais lourd, adapté aux releases planifiées.\n\n**Trunk-based** : tout le monde commit sur `main` (ou très peu de branches courtes) + **feature flags** pour activer/désactiver le code en cours. Favorise l'**intégration continue** et le déploiement fréquent.\n\nLes entreprises modernes privilégient le **Trunk-based** pour sa simplicité et son flux rapide. Git Flow reste utile pour les projets avec des releases versionnées. __Le meilleur workflow est celui que l'équipe maîtrise et suit.__",
        
          deepDive: `# Git Flow vs Trunk-Based Development

## Qu'est-ce que c'est

Deux stratégies de branching pour organiser le developpement logiciel:

**Git Flow**: Modelo feature-heavy avec branches long-lived (main, develop, feature/, release/, hotfix/). Ideal pour projets avec cycles de release reguliers.

**Trunk-Based Development (TBD)**: Developpement sur une branche principale (trunk/main) avec des commits petits et frequents. Les features sont masquees derriere des feature flags.

## Git Flow

\`\`\`
main (production)
  |-- hotfix/* --> merge back to main
  |
develop (integration)
  |-- release/* --> merge to main
  |
  |-- feature/* --> merge to develop
\`\`\`

\`\`\`bash
# Creer une feature
git flow feature start feature-auth

# Terminer une feature
git flow feature finish feature-auth

# Creer un hotfix
git flow hotfix start v1.2.1
git flow hotfix finish v1.2.1
\`\`\`

## Trunk-Based Development

\`\`\`
main (trunk) --short--short--short--short--
         \\         \\         \\
          feature   feature   (behind flags)
\`\`\`

\`\`\`bash
# Workflow standard TBD
git checkout main
git pull
git checkout -b feature/user-auth
# Short-lived branch, merge en quelques jours max

# Feature flags
if (featureFlags.isEnabled('new-auth')) {
  // use new auth
} else {
  // use old auth
}
\`\`\`

## Comparaison

| Critere | Git Flow | Trunk-Based |
|---------|----------|-------------|
| Complexite | Haute | Basse |
| Taille des branches | Grande | Tres petite |
| Frequence de merge | Rare (release) | Tres frequente |
| Debut de la branche | develop | main |
| Feature flags | Non | Oui |
| CI/CD | Plus complexe | Plus simple |
| adapte pour | equipes multi-plateformes | Continuous delivery |

## Bonnes pratiques

**Git Flow:**
- Utilisez git-flow ou gh flow pour automatiser le workflow
- Definissez des regles de protection des branches (main, develop)
- Mergez regulierement develop vers main pour eviter les conflits majeurs

**Trunk-Based:**
- Des commits tres petits (quelques heures max)
- Mettez en place des feature flags des le debut
- Automatisez les tests et le deploiement (CI/CD mature)
- Limitez la duree de vie des branches a quelques jours maximum

## Pieges courants

- Git Flow: branches de feature qui restent ouvertes trop longtemps
- Git Flow: integration infrequente qui cause des conflits massifs
- TBD: feature flags mal geres = code mort qui s'accumule
- TBD: mauvaise culture de tests = regression en production
- TBD: resistances des equipes qui prefèrent les "gros" merges

## Pour aller plus loin

\`\`\`bash
# Voir le graph d'une strategie Git Flow
git log --graph --oneline --all

# Convertir un depot a TBD
git checkout -b main  # si c'etait master
git merge --no-ff feature-old
\`\`\`

Source: https://git-scm.com/docs/gitworkflow`},
        {
          id: 'git-19',
          question: 'Résoudre les conflits efficacement',
          answer: "**Prévention** : fusionnez régulièrement depuis `main` dans votre branche, faites des petites PRs, communiquez avec l'équipe sur les fichiers modifiés.\n\n**Résolution** : lisez les marqueurs de conflit (`<<<<<<<`, `=======`, `>>>>>>>`), comprenez les deux versions avant de choisir. Utilisez un outil de merge (`VS Code Merge`, `Beyond Compare`) pour les conflits complexes.\n\nAprès résolution : `git add` + `git commit`. Testez toujours le code fusionné avant de push. __Un conflit bien résolu demande de la communication, pas juste du code.__",
        
          deepDive: `# Resoudre les conflits de merge

## Qu'est-ce que c'est

Un conflit de merge survient quand Git ne peut pas resolver automatiquement les differences entre deux branches. Cela se produit quand les memes lignes ont été modifiees differemment sur chaque branche.

## Syntaxe et exemples

\`\`\`bash
# Lancer un merge qui genere des conflits
git merge feature-branch
# CONFLICT (content): Merge conflict in src/app.ts

# Voir l'etat des fichiers
git status
# both modified: src/app.ts

# Voir les conflits
git diff
\`\`\`

### Structure d'un conflit

\`\`\`
<<<<<<< HEAD
const name = "Alice";
=======
const name = "Bob";
>>>>>>> feature-branch
\`\`\`

### Resoudre manuellement

\`\`\`bash
# Ouvrir le fichier et garder la version souhaitee
# puis supprimer les marqueurs

# Marquer comme resolu
git add src/app.ts

# Finaliser le merge
git commit -m "Merge feature-branch, resolve conflict in app.ts"
\`\`\`

### Utiliser des outils

\`\`\`bash
# Lancer un outil de merge
git mergetool

# Configurer un outil (VS Code, KDiff3, Beyond Compare)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait $MERGED"

# Resoudre avec "ours" ou "theirs"
git checkout --ours src/app.ts    # garder version HEAD
git checkout --theirs src/app.ts  # garder version de la branche
\`\`\`

### Stratégies avancees

\`\`\`bash
# Merge strategy pour des fichiers specifiques
git merge -X ours feature-branch  # preferer notre version
git merge -X theirs feature-branch

# Recombiner le fichier et essayer de nouveau
git checkout -m src/app.ts
\`\`\`

## Bonnes pratiques

- Resolvez les conflits des que possible — ne les laissez pas s'accumuler
- Comprenez les deux versions avant de choisir
- Testez apres chaque resolution de conflit
- Utilisez \`git diff\` pour voir les changements globaux
- Communiquez avec l'auteur de la branche si ambiguite
- Commit apres chaque fichier resolu (pas tout a la fin)

## Pieges courants

- Resoudre les conflits en gardant les deux versions (<<<<<< markers)
- Oublier de faire \`git add\` apres la resolution
- Faire \`git commit\` sans faire \`git add\` prealable
- Resoudre de maniere incorrecte et introduire des bugs subtils
- Merge des branches avec beaucoup de conflits sans coordination

## Pour aller plus loin

\`\`\`bash
# Resoudre plusieurs conflits iterative
git status
# Resoudre puis
git add .
git commit

# Abort un merge en cours
git merge --abort

# Lister les fichiers en conflit
git diff --name-only --diff-filter=U
\`\`\`

Source: https://git-scm.com/docs/git-merge`},
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

## Qu'est-ce que c'est

\`git stash\` permet de mettre de cote temporairement les modifications non commitées de votre repertoire de travail et de l'index, afin de pouvoir basculer sur une autre branche ou effectuer d'autres operations sans perdre votre travail.

C'est particulierement utile quand vous devez interrupts votre travail en cours pour:
- Merger une branche urgence
-切换 sur une autre tache
- Resoudre un bug urgent

Les stashs sont stockes dans une pile LIFO (Last In First Out).

## Syntaxe et exemples

\`\`\`bash
# Mettre de cote les modifications
git stash

# Avec un message descriptif
git stash push -m "Work in progress on feature X"

# Mettre de cote les fichiers non suivis aussi
git stash -u

# Lister tous les stashs
git stash list
# Resultat: stash@{0}: On feature-branch: WIP
#           stash@{1}: On main: index on main: 9a8d12c

# Appliquer le dernier stash et le supprimer de la pile
git stash pop

# Appliquer le dernier stash sans le supprimer
git stash apply

# Appliquer un stash spécifique (ex: stash@{2})
git stash apply stash@{2}

# Supprimer un stash sans l'appliquer
git stash drop stash@{0}

# Supprimer tous les stashs
git stash clear
\`\`\`

### Utiliser stash comme pile de travail

\`\`\`bash
# Stasher, créer branche, et aplicar le stash dessus
git stash
git checkout -b new-feature
git stash pop

# Stasher et créer une branche en une commande
git stash branch new-branch stash@{0}
\`\`\`

## Bonnes pratiques

- Ajoutez toujours un message descriptif avec \`git stash push -m\` pour Faciliter l'identification laterale
- Utilisez \`git stash pop\` preferable a \`apply + drop\` pour eviter les stashs orphelins
- Verifiez que le stash a bien été applique avant de le supprimer de la pile
- Combinez avec \`-u\` pour inclure les fichiers non suivis (\`git stash -u\`)
-定期ement nettoyez les stashs obsoletes avec \`git stash drop\` ou \`git stash clear\`
- Preferer les commits courts ou les branches temporaires pour du travail important rather than le stash prolonge

## Pieges courants

- Oublier de faire \`git stash pop\` apres un \`apply\` — le stash reste en mémoire
- Stasher des fichiers avec des secrets (credentials) puis partager le depot
- Utiliser \`git stash\` sur des fichiers non suivis — utiliser \`-u\` explicitement
- Confondre \`git stash drop\` (supprimer) avec \`git stash clear\` (tout supprimer)
- Le stash ne Saga pas les sous-modules — utiliser \`git submodule update --init\`

## Pour aller plus loin

La pile de stash est locale au depot — elle n'est pas synchronisee avec le remote.

Source: https://git-scm.com/docs/git-stash`},
        {
          id: 'git-12',
          question: 'Annuler un commit',
          answer: "`git reset` revient en arrière dans l'historique : `--hard` supprime tout, `--soft` garde les modifications en staging. Mais `reset` **réécrit l'historique** — dangereux si le commit est déjà pushé.\n\n`git revert` crée un nouveau commit qui inverse les changements, **préservant l'historique** — plus sûr en équipe. __Règle d'or : `reset` pour les commits locaux non pushés, `revert` pour les commits déjà partagés.__",
          code: 'git reset --hard HEAD~1  # Supprime tout\ngit revert <hash>          # Annule via nouveau commit',
          language: 'bash',
        
          deepDive: `# Annuler un Commit (Git Reset, Git Revert)

## Qu'est-ce que c'est

Git offre plusieurs mécanismes pour annuler des commits selon le niveau d'annulation souhaité:

- \`git revert\`: Crée un nouveau commit qui annule les modifications d'un commit précédent. S' utilise sur des branches partagées.
- \`git reset\`: Déplace le pointeur de branche en arrière, modifiant potentiellement l'historique. A utiliser localement.

## Syntaxe et exemples

\`\`\`bash
# git revert — annule un commit en créant un nouveau commit
git revert <commit-hash>

# Annuler le dernier commit (sans modifier l'historique)
git revert HEAD

# Annuler plusieurs commits
git revert abc123..def456

# git reset — trois modes selon le niveau d'annulation

# SOFT: garde les modifications dans l'index
git reset --soft HEAD~1

# MIXED (defaut): garde les modifications dans le repertoire de travail
git reset HEAD~1

# HARD: supprime définitivement les modifications
git reset --hard HEAD~1

# Reset vers un commit spécifique
git reset --hard abc123

# Preparer un nouveau commit avec les modifications
git reset --soft HEAD~1 && git commit -m "Nouveau message"
\`\`\`

### Comprendre les niveaux

\`\`\`
Commit C3 (HEAD)
  |
Commit C2
  |
Commit C1

--soft: C3 supprime, index = C2, working dir = C3 (en attente)
--mixed: C3 supprime, index = C2, working dir = C2
--hard: C3 supprime, index = C2, working dir = C2 (PERDU)
\`\`\`

## Bonnes pratiques

- Sur une branche partagée: TOUJOURS utiliser \`git revert\` (ne réécrit pas l'historique)
- En local avant push: \`git reset\` est acceptable avec \`--soft\` ou \`--mixed\`
- Après un \`reset --hard\`: utiliser \`git reflog\` pour récupérer l'état précédent
- Toujours vérifier avec \`git status\` et \`git log\` avant de faire un reset dur
- Préférer \`--mixed\` pour défaire un commit tout en gardant les modifications рабочем каталоге

## Pieges courants

- Utiliser \`reset --hard\` après avoir poussé — perdre du travail non commité
- Confondre \`revert\` (crée un nouveau commit) avec \`reset\` (supprime l'historique)
- Ne pas comprendre que \`reset\` réécrit l'historique des branches partagées
- Utiliser \`reset\` sur un commit de fusion (merge commit) sans comprendre les implications
- Oublier que \`reflog\` est la sécurité ultime pour récupérer un \`reset --hard\`

## Pour aller plus loin

\`\`\`bash
#Voir l'historique des resets
git reflog

# Recuperer un reset --hard
git reset --hard ORIG_HEAD

# Reset interactif (modifier l'historique)
git reset --soft HEAD~3 && git commit -m "Fusion de 3 commits"
\`\`\`

Source: https://git-scm.com/docs/git-revert et https://git-scm.com/docs/git-reset`},
        {
          id: 'git-13',
          question: 'Voir les différences entre commits',
          answer: "`git diff` compare des états différents du dépôt : sans argument (répertoire vs staging), avec `HEAD` (répertoire vs dernier commit), ou `HEAD~1` (avant-dernier vs dernier). Comparez deux commits avec `git diff <hash1> <hash2>`, ou deux branches avec `git diff main..feature`.\n\nOutil **indispensable** pour la revue de code et la vérification avant commit.",
          code: 'git diff HEAD~1',
          language: 'bash',
        
          deepDive: `# git diff — Voir les différences

## Qu'est-ce que c'est

\`git diff\` affiche les differences entre diverses sources: repertoire de travail et index, index et commit, deux commits, etc. C'est l'outil essentiel pour comprendre ce qui a été modifié avant de commiter.

## Syntaxe et exemples

\`\`\`bash
# Diff entre working directory et index (non stage)
git diff

# Diff entre index et dernier commit (stage)
git diff --cached

# Diff entre working directory et dernier commit
git diff HEAD

# Diff entre deux commits
git diff abc123..def456

# Diff d'un fichier spécifique
git diff -- src/app.component.ts

# Diff entre deux branches
git diff main..feature-branch

# Statistiques resumees
git diff --stat

# Montrer les différences de submodules
git diff --submodule
\`\`\`

### Algorithmes de diff

\`\`\`bash
# Myers (defaut)
git diff --diff-algorithm=myers

# Minimal (cherche le plus petit changeset)
git diff --diff-algorithm=minimal

# Patience (mejor pour fichiers重构)
git diff --diff-algorithm=patience

# Histogram (combinaison patience + myers)
git diff --diff-algorithm=histogram
\`\`\`

### Formats de sortie

\`\`\`bash
# Format compact sur une ligne par fichier
git diff --name-only

# Format word-by-word (utile pour documentation)
git diff --word-diff=plain

# Sortie JSON
git diff --json
\`\`\`

## Bonnes pratiques

- Utilisez \`--cached\` pour reviewer les changements staged avant commit
- Combinez avec \`--stat\` pour une vue d'ensemble avant de dive dans les details
- Utilisez \`--diff-algorithm=patience\` pour les refactors importants
- Configurez un outil visuel: \`git config --global diff.tool vimdiff\`
- Utilisez \`git diff HEAD~1 HEAD\` pour voir exactement ce qu'un commit a变了

## Pieges courants

- Oublier \`--cached\` pour voir les changements staged (par defaut montre unstaged)
- \`git diff\` ne montre pas les fichiers non suivis (utiliser \`git status\`)
- Sur Windows, les fins de ligne CR/LF peuvent polluer les diffs
- Confondre \`git diff\` (unstaged) avec \`git diff --cached\` (staged)

## Pour aller plus loin

\`\`\`bash
# Diff d'un commit spécifique
git diff abc123^..abc123

# Diff entre cette branche et la branche distante
git diff main..origin/main

# Montrer les fichiers qui ont change entre deux tags
git diff v1.0..v2.0

# Diff avec submodules
git diff --submodule=log
\`\`\`

Source: https://git-scm.com/docs/git-diff`},
        {
          id: 'git-14',
          question: "Voir l'historique des commits",
          answer: "`git log` affiche l'historique complet (auteur, date, hash, message). L'option `--oneline` affiche chaque commit sur une ligne, `--graph` dessine les branches et fusions, `--decorate` montre les références.\n\nCommande recommandée : `git log --oneline --graph --all`. Filtrez par auteur (`--author`), date (`--since`) ou message (`--grep`).",
          code: 'git log --oneline --graph',
          language: 'bash',
        
          deepDive: `# git log — Voir l'historique des commits

## Qu'est-ce que c'est

\`git log\` affiche l'historique des commits d'un depot. Il offre de nombreuses options pour filtrer, formater et visualiser l'évolution du projet.

## Syntaxe et exemples

\`\`\`bash
# Affichage standard
git log

# Sur une ligne (compact)
git log --oneline

# Graphique ASCII
git log --graph --oneline --all

# N derniers commits
git log -n 5

# Filrer par auteur
git log --author="Mohammed"

# Filrer par date
git log --since="2024-01-01" --until="2024-12-31"

# Filrer par message (grep)
git log --grep="fix:"

# Voir les commits d'un fichier
git log -- src/app.component.ts

# Afficher les statistiques par commit
git log --stat

# Montrer les diffs de chaque commit
git log -p

# Format personalisé
git log --format="[%h] %an: %s"

# Format court avec branches
git log --oneline --decorate
\`\`\`

### Formats courants

| Option | Description |
|--------|-------------|
| \`%H\` | Hash complet |
| \`%h\` | Hash court |
| \`%an\` | Nom de l'auteur |
| \`%ae\` | Email de l'auteur |
| \`%s\` | Sujet (message) |
| \`%b\` | Corps du message |
| \`%cr\` | Date relative |

## git shortlog

\`\`\`bash
# Resumé par auteur (ideal pour changelog)
git shortlog

# Par ordre alphabetique
git shortlog -sne

# Nombre de commits par contributeur
git shortlog --numbered --all
\`\`\`

## Bonnes pratiques

- Utilisez \`--oneline --graph --all\` pour une vue d'ensemble du depot
- Combinez avec \`--author\` et \`--since\` pour faire des rapports de activity
- \`git shortlog -sne\` est ideal pour générer des credits ou rapports d'équipe
- Utilisez \`-p\` (patch) pour code review détaillé
- Configurez un format personalisé par defaut dans \`.gitconfig\`

## Pieges courants

- \`git log\` ne montre pas les commits des autres branches — utiliser \`--all\`
- Par defaut, ne montre pas les commits inaccessibles (utiliser \`git reflog\`)
- Confondre \`--grep\` (recherche dans les messages) avec filtration de fichier
- \`git log\` sans options peut être très long sur de gros depots — utilisez \`-n\`

## Pour aller plus loin

\`\`\`bash
# Voir les commits qui ont change un fichier (line-level)
git blame src/app.component.ts

# Resumé des contributions par periode
git shortlog --since="3 months ago"

# Log formate pour integration (CI/CD)
git log --pretty=format:"%H|%an|%s" --since="2024-01-01"
\`\`\`

Source: https://git-scm.com/docs/git-log`},
        {
          id: 'git-15',
          question: 'Les tags ?',
          answer: "Un **tag** est une référence **fixe** vers un commit spécifique, contrairement aux branches qui sont des pointeurs *mobiles*. On l'utilise pour marquer les versions : `v1.0`, `v2.0`, etc.\n\nDeux types : **tags légers** (simple pointeur) et **tags annotés** (métadonnées : auteur, date, message, signature possible). Les tags sont essentiels pour les releases GitHub. **Tag** = signet permanent pour versionner le projet.",
          code: 'git tag -a v1.0 -m "Version initiale"',
          language: 'bash',
        
          deepDive: `# Git Tags

## Qu'est-ce que c'est

Un tag Git est une référence statique vers un commit spécifique. Il sert à marquer des points de sortie significatifs dans l'historique: versions, releases, hotfixes. Contrairement aux branches, les tags ne bougent pas.

Deux types de tags:
- **Lightweight**: Simple pointeur vers un commit
- **Annotated**:Objet Git complet avec message, auteur, date — recommande pour les releases

## Syntaxe et exemples

\`\`\`bash
# Creer un tag lightweight
git tag v1.0.0

# Creer un tag annotated (recommande)
git tag -a v1.0.0 -m "Version 1.0.0 - premiere release stable"

# Taguer un commit spécifique
git tag -a v0.9 abc123 -m "Version beta"

# Lister les tags
git tag

# Lister avec description
git tag -l -n3

# Voir les details d'un tag
git show v1.0.0

# Supprimer un tag (local)
git tag -d v1.0.0

# Supprimer un tag (remote)
git push origin --delete v1.0.0

# Pousser un tag spécifique
git push origin v1.0.0

# Pousser tous les tags
git push --tags

# Mettre a jour un tag (delete + recreate)
git tag -d v1.0.0 && git tag -a v1.0.0 -m "Updated"
\`\`\`

### Tags semver (Semantic Versioning)

\`\`\`bash
git tag -a v1.0.0 -m "Major release"
git tag -a v1.1.0 -m "Minor release"
git tag -a v1.1.1 -m "Patch release"
\`\`\`

## Bonnes pratiques

- Utilisez des tags annotated pour toute release destined au public
- Suivez le format Semantic Versioning (vMAJOR.MINOR.PATCH)
- Gardez les tags locaux et distants synchronises
- Utilisez \`git describe\` pour trouver le tag le plus proche: \`git describe --tags\`
- Integrer les tags dans votre pipeline CI/CD pour automatiser les releases
- Taguez toujours apres avoir验证 le build et les tests

## Pieges courants

- Pousser accidentellement un tag de developpement en production
- Oublier de pusher les tags (\`git push\` ne pousse pas les tags par defaut)
- Utiliser des tags lightweight pour des releases — perdre le contexte
- Supprimer un tag remote sans coordination avec l'équipe
- Ne pas avoir de stratégie de tag claire (quand taguer, quel format)

## Pour aller plus loin

\`\`\`bash
# Voir le tag actuel
git describe --tags

# Tags precede de "v"
git describe --tags --abbrev=0

# Verifier l'absence de tags non pushe
git fetch --tags && git log --oneline --tags --not --remotes

# Workflow release avec tags
git tag -a v2.0.0 -m "Release 2.0.0" && git push --follow-tags
\`\`\`

Source: https://git-scm.com/docs/git-tag`},
        {
          id: 'git-16',
          question: 'git cherry-pick ?',
          answer: "`git cherry-pick` copie un commit spécifique d'une branche et l'applique sur une autre, **sans fusion complète**. Utile pour appliquer un correctif de bug sur la production sans prendre tout le reste, ou récupérer un commit fait par erreur sur la mauvaise branche.\n\nAttention aux conflits si le commit dépend d'autres commits absents de la branche cible. **Cherry-pick** = copier un commit précis d'une branche à l'autre.",
          code: 'git cherry-pick <commit-hash>',
          language: 'bash',
        
          deepDive: `# git cherry-pick

## Qu'est-ce que c'est

\`git cherry-pick\` applique les modifications d'un ou plusieurs commits spécifiques sur votre branche actuelle, en créant de nouveaux commits avec des hashes différents. C'est comme un "copier-coller" de commits.

Utile pour:
- Reporter un fix d'une branche à une autre
- Récupérer un commit sans fusionner toute une branche
- Appliquer des hotfixes sur plusieurs branches

## Syntaxe et exemples

\`\`\`bash
# Appliquer un commit specifique
git cherry-pick abc123

# Appliquer plusieurs commits sequentiels
git cherry-pick abc123..def456

# Appliquer sans garder le message original
git cherry-pick -x abc123

# Appliquer et lancer un editeur pour modifier le message
git cherry-pick -e abc123

# Simuler (voir ce qui se passerait sans appliquer)
git cherry-pick --dry-run abc123

# Signer le commit cherry-pick
git cherry-pick -s abc123

# Avorter un cherry-pick en cours
git cherry-pick --abort

# Continuer apres resolution de conflits
git cherry-pick --continue
\`\`\`

### Exemple concret

\`\`\`bash
# Situation: un fix est sur hotfix/v1.2, doit être reporte sur main

# Sur main
git cherry-pick abc123

# Si conflit, resolver puis
git add .
git cherry-pick --continue
\`\`\`

## Bonnes pratiques

- Utilisez \`--no-ff\` pour forcer la création d'un commit (eviter le fast-forward)
- Ajoutez \`-x\` pour inclure la reference au commit original dans le message
- Faites un test avec \`--dry-run\` avant de cherry-picker plusieurs commits
- Isolez les cherry-picks dans des commits atomiques (un fix par commit)
- Preferer le merge ou le rebase quand les commits sont nombreux et liés

## Pieges courants

- Cherry-picker un commit qui dépend d'autres commits non appliques (conflits)
- Dupliquer des commits si le même fix est cherry-pické plusieurs fois
- Perte du contexte de branches quand on cherry-pick sans \`-x\`
- Conflits répétés si les branches ont divergé depuis le commit original
- Oublier que les hashes changent — le \`git log\` original ne correspond plus

## Pour aller plus loin

\`\`\`bash
# Voir les commits cherry-pickés récemment
git log --oneline --left-right HEAD...@{upstream}

# Appliquer un range de commits (attention a l'ordre)
git cherry-pick abc123^..def456

# Ne pas automatique commit (pour modifications manuelles)
git cherry-pick -n abc123
\`\`\`

Source: https://git-scm.com/docs/git-cherry-pick`},
        {
          id: 'git-20',
          question: 'git bisect',
          answer: "Outil de **recherche binaire** pour trouver le commit qui a introduit un bug. Git navigue automatiquement dans l'historique en divisant l'intervalle à chaque étape.\n\nVous marquez chaque commit testé comme `good` ou `bad`, et Git identifie le **premier commit défectueux** en **O(log n)** étapes au lieu de parcourir tout l'historique. Indispensable pour les bugs apparus silencieusement sur des centaines de commits.",
          code: 'git bisect start\ngit bisect bad          # commit actuel = bug\ngit bisect good <hash>  # ancien commit = OK\n# Git checkout le milieu, vous testez...\ngit bisect reset        # terminer',
          language: 'bash',
        
          deepDive: `# git bisect

## Qu'est-ce que c'est

\`git bisect\` est un outil de recherche binaire pour trouver le commit qui a introduct un bug ou une regression. Il divise recursivement l'historique en deux jusqu'a identifier le commit responsable.

Complexite: O(log n) au lieu de O(n) pour trouver le commit problematique.

## Syntaxe et exemples

\`\`\`bash
# Demarrer la recherche binaire
git bisect start

# Marquer le commit actuel comme "mauvais" (contient le bug)
git bisect bad

# Marquer un commit ancien comme "bon" (pas de bug)
git bisect good abc123

# Git bascule automatiquement sur un commit intermediaire
# Tester puis marquer

# Si le commit teste est bon (pas de bug)
git bisect good

# Si le commit teste est mauvais (contient le bug)
git bisect bad

# Git continue jusqu'a trouver le commit responsable
# Resultat: commit abc123 is first bad commit

# Terminer la recherche
git bisect reset

# Mode automatique (script de test)
git bisect start
git bisect bad HEAD
git bisect good abc123
git bisect run npm test
\`\`\`

### Exemple complet

\`\`\`bash
# Le bug existe depuis 50 commits
# On sait que le commit abc123 etait correct

git bisect start
git bisect bad                 # HEAD contient le bug
git bisect good abc123          # commit ancien sans bug

# Git teste: commit #25 - on teste et on decide
git bisect good  # pas de bug

# Git teste: commit #37 - on teste et on decide
git bisect bad   # contient le bug

# Git converge en ~6 tests au lieu de 50
\`\`\`

## Bonnes pratiques

- Identifiez un "good" commit récent et un "bad" commit (HEAD)
- Automatisez le test avec \`git bisect run <script>\`
- Verifiez que le script de test retourne 0 = bon, 1-125 = mauvais, 125 = skip
- Utilisez \`git bisect log\` pour documenter la session
- Aprenez a\`git bisect reset\` pour revenir a l'etat initial

## Pieges courants

- Oublier de faire \`git bisect reset\` — rester dans un etat bisect
- Mauvais marquage "good/bad" = resultat incorrect
- Script de test non deterministe = resultats incohérents
- Utiliser sur une branche avec des commits non compiles (build requis)
- Ne pas verifier le commit trouve avec \`git show\`

## Pour aller plus loin

\`\`\`bash
# Voir l'historique de la session bisect
git bisect log

# Recommencer depuis le log
git bisect replay

# Trouver quand une ligne a change
git blame src/app.ts | head -50

# Mode visualization
git bisect visualize
\`\`\`

Source: https://git-scm.com/docs/git-bisect`},
        {
          id: 'git-21',
          question: 'git reflog',
          answer: "Le **reflog** enregistre **toutes les actions** effectuées sur le dépôt (commits, merges, resets, checkouts…) — même celles « perdues » après un `reset --hard`.\n\nC'est votre **filet de sécurité** : si vous avez accidentellement supprimé des commits, `git reflog` vous permet de retrouver leur hash et de les restaurer avec `git reset --hard <hash>`. Les entrées sont conservées **90 jours** par défaut. __Quand tout semble perdu, le reflog est votre ami.__",
          code: 'git reflog            # voir l\'historique des actions\ngit reset --hard <hash>  # restaurer un état',
          language: 'bash',
        
          deepDive: `# git reflog

## Qu'est-ce que c'est

\`git reflog\` (Reference Log) stocke l'historique de toutes les modifications des références (branches, HEAD) sur les 90 derniers jours par defaut. C'est le "fil de securite" ultime pour recuperer un travail perdu.

Chaque operation qui modifie HEAD est enregistree: commits, rebase, reset, merge, checkout, stash, etc.

## Syntaxe et exemples

\`\`\`bash
# Voir le reflog complet de HEAD
git reflog

# Reflog d'une branche specifique
git reflog show main

# Reflog avec date relative
git reflog --date=relative

# N dernieres entrees
git reflog -n 20
\`\`\`

### Sortie type

\`\`\`
abc123 HEAD@{0}: reset: moving to HEAD~1
def456 HEAD@{1}: commit: Ajouter feature de recherche
ghi789 HEAD@{2}: checkout: moving to feature-branch
\`\`\`

### Recuperer un travail perdu

\`\`\`bash
# Situation: vous avez fait un reset --hard par erreur

git reflog
# abc123 HEAD@{0}: reset: moving to HEAD~1 (vous etes ici)
# def456 HEAD@{1}: commit: Ajouter feature (VOTRE TRAVAIL)

# Recuperer
git reset --hard def456
# Vous voila回到了 le commit avec votre travail

# Situation: stash perdu

git reflog | grep stash
# jkl012 HEAD@{5}: stash: WIP

git stash apply jkl012
\`\`\`

### Scenarios de Recuperation

\`\`\`bash
# Apres un merge incorrect
git reflog
git reset --hard HEAD@{n}

# Apres un rebase qui a mal tourne
git reflog
git reset --hard ORIG_HEAD

# Apres un checkout involontaire (perte de modifications)
git reflog
git checkout -b recovery HEAD@{n}

# Apres un squash --soft (recuperer les commits separes)
git reflog
# voir les commits originaux dans HEAD@{n}
\`\`\`

## Bonnes pratiques

- Executez regulierement \`git reflog\` pour comprendre l'historique
- Comprenez que le reflog est LOCAL et n'est pas synchronise avec le remote
- Configurez \`gc.reflogExpireUnreachable\` pour garder plus longtemps
- Le reflog est essentiel apres un \`reset --hard\` ou un \`rebase --abort\`
- Combinez avec \`git stash list\` pour troubleshouter les stash lost

## Pieges courants

- Croire que le reflog est partagé avec l'equipe (il est local)
- Reflexe de faire \`git push --force\` apres avoir vu le reflog
- Le reflog expire (par defaut 90 jours) — ne pas s'y fier eternellement
- Confondre \`git reflog\` avec \`git log\` (reflog montre les moves, pas les commits)
- Oublier de nettoyer les refs locales orphelines

## Pour aller plus loin

\`\`\`bash
# Configurer la duree de rétention du reflog (en jours)
git config --global gc.reflogExpire 90

# Nettoyer les refs expiré
git reflog expire --expire=now --all

# Reflog des branches supprimees (accessible 30 jours)
git reflog --all

# Voir le reflog d'une ref supprimee
git reflog show refs/heads/deleted-branch
\`\`\`

Source: https://git-scm.com/docs/git-reflog`},
        {
          id: 'git-22',
          question: 'Commit signing (GPG)',
          answer: "Signer ses commits avec **GPG** prouve que le code vient bien de vous, empêchant l'usurpation d'identité. GitHub affiche un badge **« Verified »** sur les commits signés.\n\nConfiguration : générez une clé GPG, ajoutez-la à GitHub, puis `git config commit.gpgsign true`. Obligatoire dans certaines entreprises pour la **chaîne de confiance** et la conformité. __La signature renforce la traçabilité et la sécurité du dépôt.__",
        
          deepDive: `# Commit Signing (GPG)

## Qu'est-ce que c'est

Le commit signing est l'authentification cryptographique de vos commits Git avec une clé GPG. Elle garantit que les commits proviennent bien de vous et nont pas été falsifiés.

Utile pour:
- Eviter l'usurpation d'identite (quelqu'un pretendant être vous)
- Augmenter la confiance dans le processus de revue
- Satisfaire les exigences de compliance (Corporate, Government)

## Syntaxe et exemples

\`\`\`bash
# Generer une cle GPG (si pas déjà fait)
gpg --full-generate-key
# Type: RSA and RSA
# Taille: 4096
#Expiration: 2y
# Name/Email: matching votre git config

# Voir les cles GPG
gpg --list-secret-keys --keyid-format LONG

# Obtenir la clé publique
gpg --armor --export <key-id>
# Copier le resultat (debut par -----BEGIN PGP PUBLIC KEY BLOCK-----)

# Configurer Git pour signer
git config --global user.signingkey <key-id>
git config --global commit.gpgsign true

# Signer un commit
git commit -S -m "Add feature X"

# Signer un tag
git tag -s v1.0.0 -m "Release 1.0.0"

# Verifier les signatures
git log --show-signature

# Pousser avec signature (si requis par remote)
git push --signed
\`\`\`

### Configuration GitHub/GitLab

\`\`\`bash
# GitHub: ajouter la clé GPG dans Settings > SSH and GPG keys
# Le clé doit correspondre a l'email de votre compte GitHub

# Verifier le statut de signature sur GitHub
# Chaque commit signed affiche "Verified" badge
\`\`\`

## Bonnes pratiques

- Utilisez une clé GPG dédiée pour le développement (pas personnelle)
- Definissez une expiration raisonable (1-2 ans) et planifiez le renouvellement
- Stockez la clé privée en lieu sur (YubiKey, KeepassXC)
- Configurez \`commit.gpgsign = true\` par defaut dans global
- Faites tourner les clés tous les 2-3 ans minimum
- Exportez une clé de revocation au cas où

## Pieges courants

- Email GPG ne correspondant pas a l'email Git (signature non validee)
- Clé expirée — commits non signes automatiquement
- Oublier de configuration \`commit.gpgsign = true\` sur une nouvelle machine
- Stocker la clé privée sur un ordinateur non securise
- Ne pas faire de backup de la clé privée et de la phrase de passe

## Pour aller plus loin

\`\`\`bash
# Voir les commits non signs récemment
git log --no-merges --author="Your Name" --pretty=format:"%h %s" | head -20

# Enforcing signature sur le remote (GitHub)
# Settings > Branches > Protect main > Require signed commits

# Cache la phrase de passe GPG (macOS)
echo "pinentry-program /usr/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf

# Signer automatiquement les tags
git config --global tag.forceSignSigned true
\`\`\`

Source: https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work`},
      ],
    },
  ],
};