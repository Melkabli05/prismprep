import type { InterviewCategory } from '../models/interview.models';

export const gitCategory: InterviewCategory = {
  id: 'git',
  title: 'Git',
  color: 'bg-orange-100 text-orange-700',
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
        },
        {
          id: 'git-2',
          question: "C'est quoi un bon commit ?",
          answer: "Un bon commit décrit le **QUOI** et le **POURQUOI** : « Fixe le bug de validation des emails » (quoi) + « Les emails avec un '+' étaient rejetés à tort » (pourquoi). Évitez les messages vagues comme « update ».\n\nUtilisez les **commits conventionnels** : `feat`, `fix`, `refactor`, etc. pour un historique lisible. __Une seule modification logique par commit.__",
          code: 'git commit -m "Fixe le bug de validation des emails"',
          language: 'bash',
        },
        {
          id: 'git-3',
          question: 'Dépôt distant',
          answer: "Un **dépôt distant** est hébergé sur un serveur (`GitHub`, `GitLab`, `Bitbucket`) et permet la collaboration d'équipe. `git remote add` connecte votre local au distant (« `origin` » par convention), `git push` envoie les commits, `git pull`/`git fetch` récupère les modifications.\n\nWorkflow classique : `pull` → travailler → `commit` → `push`. Tout tourne autour de la **synchronisation local/distant**.",
          code: 'git remote add origin https://github.com/user/repo.git\ngit push origin main',
          language: 'bash',
        },
        {
          id: 'git-4',
          question: 'git clone vs git fork',
          answer: "`git clone` crée une copie locale d'un dépôt distant, liée au dépôt original — vous pouvez push directement si vous avez les droits. `git fork` (fonctionnalité GitHub, pas Git) crée une copie indépendante sur votre compte GitHub, pour contribuer via **Pull Request**.\n\nC'est le workflow open source : forkez, modifiez, proposez via PR. **Clone** = copie locale liée, **fork** = copie indépendante pour contribuer via PR.",
        },
        {
          id: 'git-5',
          question: 'git pull vs git fetch',
          answer: "`git fetch` récupère les modifications du distant **sans les fusionner** — vous pouvez vérifier l'état avant de décider. `git pull` fait les deux d'un coup : `fetch` + `merge` automatique.\n\nLe risque avec `pull` est de rencontrer des conflits inattendus si le distant a divergé. Préférez `fetch` + `merge` manuel pour plus de contrôle. **Fetch** = télécharger sans fusionner (plus sûr), **Pull** = télécharger et fusionner (*plus rapide mais risqué*).",
        },
        {
          id: 'git-17',
          question: '.gitignore',
          answer: "Fichier listant les fichiers et répertoires à **exclure du suivi Git** : fichiers compilés (`*.class`), dépendances (`node_modules/`), configs locales (`.env`), fichiers IDE (`.idea/`), secrets et tokens.\n\nCréez-le **dès l'initialisation** du projet. Sur GitHub, des templates `.gitignore` existent par langage/framework. Un fichier oublié dans Git peut être retiré ultérieurement avec `git rm --cached` sans le supprimer localement. __Ne jamais committer de secrets ou de fichiers générés.__",
          code: '# .gitignore\nnode_modules/\n.env\ntarget/\n*.class\n.idea/',
          language: 'bash',
        },
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
        },
        {
          id: 'git-7',
          question: 'Fusionner des branches / conflits',
          answer: "`git merge` combine deux branches. Des **conflits** surviennent quand les mêmes lignes sont modifiées dans les deux branches — Git insère des marqueurs (`<<<<<<<`, `=======`, `>>>>>>>`) et demande une résolution manuelle.\n\nOuvrez le fichier, choisissez la bonne version (ou combinez-les), puis commitez. __Clé : fusionner régulièrement pour éviter que les conflits ne s'accumulent.__",
        },
        {
          id: 'git-8',
          question: 'git rebase ?',
          answer: "`git rebase` **réécrit l'historique** d'une branche en appliquant ses commits au-dessus d'une autre branche. Résultat : un historique **linéaire et propre**, sans commit de fusion inutile.\n\nMais `rebase` modifie les hashes des commits — __ne l'utilisez jamais sur une branche déjà pushée et partagée__. __Règle d'or : `rebase` uniquement sur des branches locales non partagées.__",
          code: 'git checkout feature-login\ngit rebase main',
          language: 'bash',
        },
        {
          id: 'git-9',
          question: 'merge vs rebase',
          answer: "`git merge` crée un commit de fusion avec deux parents — l'historique est **fidèle** mais peut devenir complexe. `git rebase` réécrit l'historique pour un flux **linéaire** plus lisible.\n\nEn pratique, `rebase` est souvent utilisé sur les branches de feature avant `merge` dans `main`. Mais `rebase` est *dangereux* sur les branches partagées car il modifie les hashes. **Merge** = historique fidèle, **Rebase** = historique linéaire — le choix dépend de la politique d'équipe.",
        },
        {
          id: 'git-10',
          question: 'Squash de commits ?',
          answer: "Le **squash** combine plusieurs commits en un seul pour garder un historique **propre**. Utile quand une feature génère des commits du type « fix typo », « ajout test »...\n\nUtilisez `git rebase -i HEAD~3`, puis remplacez « `pick` » par « `squash` » pour les commits à fusionner. Particulièrement utile pour les **Pull Requests** afin de garder `main` propre. **Squash** = combiner des commits en un seul via rebase interactif.",
          code: 'git rebase -i HEAD~3\n# Choisir "squash" pour fusionner',
          language: 'bash',
        },
        {
          id: 'git-18',
          question: 'Git Flow vs Trunk-based',
          answer: "**Git Flow** : branches longues (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`) — structuré mais lourd, adapté aux releases planifiées.\n\n**Trunk-based** : tout le monde commit sur `main` (ou très peu de branches courtes) + **feature flags** pour activer/désactiver le code en cours. Favorise l'**intégration continue** et le déploiement fréquent.\n\nLes entreprises modernes privilégient le **Trunk-based** pour sa simplicité et son flux rapide. Git Flow reste utile pour les projets avec des releases versionnées. __Le meilleur workflow est celui que l'équipe maîtrise et suit.__",
        },
        {
          id: 'git-19',
          question: 'Résoudre les conflits efficacement',
          answer: "**Prévention** : fusionnez régulièrement depuis `main` dans votre branche, faites des petites PRs, communiquez avec l'équipe sur les fichiers modifiés.\n\n**Résolution** : lisez les marqueurs de conflit (`<<<<<<<`, `=======`, `>>>>>>>`), comprenez les deux versions avant de choisir. Utilisez un outil de merge (`VS Code Merge`, `Beyond Compare`) pour les conflits complexes.\n\nAprès résolution : `git add` + `git commit`. Testez toujours le code fusionné avant de push. __Un conflit bien résolu demande de la communication, pas juste du code.__",
        },
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
        },
        {
          id: 'git-12',
          question: 'Annuler un commit',
          answer: "`git reset` revient en arrière dans l'historique : `--hard` supprime tout, `--soft` garde les modifications en staging. Mais `reset` **réécrit l'historique** — dangereux si le commit est déjà pushé.\n\n`git revert` crée un nouveau commit qui inverse les changements, **préservant l'historique** — plus sûr en équipe. __Règle d'or : `reset` pour les commits locaux non pushés, `revert` pour les commits déjà partagés.__",
          code: 'git reset --hard HEAD~1  # Supprime tout\ngit revert <hash>          # Annule via nouveau commit',
          language: 'bash',
        },
        {
          id: 'git-13',
          question: 'Voir les différences entre commits',
          answer: "`git diff` compare des états différents du dépôt : sans argument (répertoire vs staging), avec `HEAD` (répertoire vs dernier commit), ou `HEAD~1` (avant-dernier vs dernier). Comparez deux commits avec `git diff <hash1> <hash2>`, ou deux branches avec `git diff main..feature`.\n\nOutil **indispensable** pour la revue de code et la vérification avant commit.",
          code: 'git diff HEAD~1',
          language: 'bash',
        },
        {
          id: 'git-14',
          question: "Voir l'historique des commits",
          answer: "`git log` affiche l'historique complet (auteur, date, hash, message). L'option `--oneline` affiche chaque commit sur une ligne, `--graph` dessine les branches et fusions, `--decorate` montre les références.\n\nCommande recommandée : `git log --oneline --graph --all`. Filtrez par auteur (`--author`), date (`--since`) ou message (`--grep`).",
          code: 'git log --oneline --graph',
          language: 'bash',
        },
        {
          id: 'git-15',
          question: 'Les tags ?',
          answer: "Un **tag** est une référence **fixe** vers un commit spécifique, contrairement aux branches qui sont des pointeurs *mobiles*. On l'utilise pour marquer les versions : `v1.0`, `v2.0`, etc.\n\nDeux types : **tags légers** (simple pointeur) et **tags annotés** (métadonnées : auteur, date, message, signature possible). Les tags sont essentiels pour les releases GitHub. **Tag** = signet permanent pour versionner le projet.",
          code: 'git tag -a v1.0 -m "Version initiale"',
          language: 'bash',
        },
        {
          id: 'git-16',
          question: 'git cherry-pick ?',
          answer: "`git cherry-pick` copie un commit spécifique d'une branche et l'applique sur une autre, **sans fusion complète**. Utile pour appliquer un correctif de bug sur la production sans prendre tout le reste, ou récupérer un commit fait par erreur sur la mauvaise branche.\n\nAttention aux conflits si le commit dépend d'autres commits absents de la branche cible. **Cherry-pick** = copier un commit précis d'une branche à l'autre.",
          code: 'git cherry-pick <commit-hash>',
          language: 'bash',
        },
        {
          id: 'git-20',
          question: 'git bisect',
          answer: "Outil de **recherche binaire** pour trouver le commit qui a introduit un bug. Git navigue automatiquement dans l'historique en divisant l'intervalle à chaque étape.\n\nVous marquez chaque commit testé comme `good` ou `bad`, et Git identifie le **premier commit défectueux** en **O(log n)** étapes au lieu de parcourir tout l'historique. Indispensable pour les bugs apparus silencieusement sur des centaines de commits.",
          code: 'git bisect start\ngit bisect bad          # commit actuel = bug\ngit bisect good <hash>  # ancien commit = OK\n# Git checkout le milieu, vous testez...\ngit bisect reset        # terminer',
          language: 'bash',
        },
        {
          id: 'git-21',
          question: 'git reflog',
          answer: "Le **reflog** enregistre **toutes les actions** effectuées sur le dépôt (commits, merges, resets, checkouts…) — même celles « perdues » après un `reset --hard`.\n\nC'est votre **filet de sécurité** : si vous avez accidentellement supprimé des commits, `git reflog` vous permet de retrouver leur hash et de les restaurer avec `git reset --hard <hash>`. Les entrées sont conservées **90 jours** par défaut. __Quand tout semble perdu, le reflog est votre ami.__",
          code: 'git reflog            # voir l\'historique des actions\ngit reset --hard <hash>  # restaurer un état',
          language: 'bash',
        },
        {
          id: 'git-22',
          question: 'Commit signing (GPG)',
          answer: "Signer ses commits avec **GPG** prouve que le code vient bien de vous, empêchant l'usurpation d'identité. GitHub affiche un badge **« Verified »** sur les commits signés.\n\nConfiguration : générez une clé GPG, ajoutez-la à GitHub, puis `git config commit.gpgsign true`. Obligatoire dans certaines entreprises pour la **chaîne de confiance** et la conformité. __La signature renforce la traçabilité et la sécurité du dépôt.__",
        },
      ],
    },
  ],
};