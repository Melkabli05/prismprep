import type { InterviewCategory } from '../../../../core/models/interview.models';

export const part1Categories: InterviewCategory[] = [
  {
    id: 'rh',
    title: 'Entretien RH',
    color: 'background: var(--color-error); color: white',
    description: 'Réussir votre entretien avec les ressources humaines',
    sections: [
      {
        id: 'rh-tips',
        title: '5 Éléments Clés',
        questions: [
          {
            id: 'rh-tip-1',
            question: 'Justifiez vos compétences avec des exemples',
            answer: "Chaque compétence doit être appuyée par un **exemple concret et chiffré**. Dire « j'ai géré une équipe » est vague ; préférez « j'ai géré **5 développeurs** sur un projet de **6 mois**, budget **200k€** ». C'est la méthode **STAR** : *Situation, Tâche, Action, Résultat*. __Plus vous êtes précis, plus vous êtes crédible.__",
          },
          {
            id: 'rh-tip-2',
            question: 'Gérez les questions surprises',
            answer: "Prenez **2 à 3 secondes** pour respirer et structurer votre réponse avant de parler. Un silence court vaut mieux qu'une réponse précipitée. Reformuler la question à voix haute vous donne du temps et prouve votre compréhension. __Mieux vaut répondre juste que répondre vite.__",
          },
          {
            id: 'rh-tip-3',
            question: 'Présentez-vous efficacement',
            answer: "Présentez-vous en **2 à 3 minutes maximum**, structuré en trois temps : **parcours**, **compétences clés**, **pourquoi vous êtes ici**. Exemple : « BTS puis licence en informatique, **2 ans** chez X sur des `APIs REST`, et votre projet microservices correspond à mon objectif. » Gardez les détails pour les questions suivantes — l'objectif est de *donner envie d'en savoir plus*.",
          },
          {
            id: 'rh-tip-4',
            question: 'Temps de réponse',
            answer: "Réfléchir avant de répondre est une **preuve de maturité**, pas de faiblesse. Une réponse posée vaut toujours mieux qu'une réponse précipitée qui part dans tous les sens. Prenez le temps de digérer la question et de structurer votre pensée. __Mieux vaut répondre juste que répondre vite.__",
          },
          {
            id: 'rh-tip-5',
            question: 'Gérer le stress',
            answer: "Le stress en entretien est normal — la différence, c'est la **préparation**. Plus vous êtes préparé (réponses, entreprise, exemples), moins vous êtes stressé. Le stress vient de *l'inconnu* : balayez ces incertitudes en préparant sérieusement. Faites des simulations avec des proches pour dédramatiser.",
          },
        ],
      },
      {
        id: 'rh-conseils',
        title: 'Conseils de Réussite',
        questions: [
          {
            id: 'rh-c1',
            question: 'Votre comportement et votre sourire',
            answer: "Le **langage corporel** parle avant vous — les **7 premières secondes** sont déterminantes. Un sourire sincère, une poignée de main ferme et une posture ouverte envoient un signal positif immédiat. Soyez *naturel*, pas forcé : montrez que vous êtes content d'être là avec enthousiasme. __Un bon premier contact met le recruteur en confiance.__",
          },
          {
            id: 'rh-c2',
            question: 'Créer une relation avec le recruteur',
            answer: "Un entretien est un **échange**, pas un interrogatoire. Posez des questions sur le poste, l'équipe et les projets en cours pour montrer votre intérêt actif. Mieux encore : prouvez que vous avez fait vos recherches sur l'entreprise (« J'ai vu que vous venez de lancer tel produit »). __Transformez l'entretien en véritable dialogue.__",
          },
          {
            id: 'rh-c3',
            question: 'Présentez bien votre personnalité',
            answer: "Soyez **authentique** — les recruteurs détectent vite les rôles joués. Présentez la meilleure version de vous-même en restant vous-même : montrez vos passions et ce qui vous anime. Si vous êtes curieux, illustrez-le avec un exemple concret. __Les recruteurs cherchent des personnes avec qui travailler, pas des robots.__",
          },
          {
            id: 'rh-c4',
            question: 'Expliquez clairement vos idées',
            answer: "La **clarté** de votre discours est aussi importante que son contenu. Allez droit au but avec des termes simples et accessibles — un recruteur RH qui ne comprend pas perd intérêt vite. Pour un concept complexe, utilisez une *analogie* ou un exemple concret. __Savoir simplifier prouve que vous maîtrisez votre sujet.__",
          },
          {
            id: 'rh-c5',
            question: 'Restez calme et sûr de vous',
            answer: "La **confiance** vient de la **préparation** : si vous connaissez vos réponses, l'entreprise et vos exemples, vous êtes naturellement serein. Être confiant ne signifie pas être arrogant — assumez vos compétences sans vous vanter, reconnaissez vos axes d'amélioration sans vous dévaloriser. __Si vous êtes prêt, vous êtes confiant.__",
          },
        ],
      },
      {
        id: 'rh-questions',
        title: 'Questions RH Courantes',
        questions: [
          {
            id: 'rh-q1',
            question: 'Présentez-vous',
            answer: "Structurez votre réponse en **trois temps** : **parcours scolaire**, **expériences professionnelles**, **compétences clés**. L'approche moderne commence par remercier et exprimer votre enthousiasme avant d'enchaîner synthétiquement. Ne dépassez pas **2 à 3 minutes** — l'objectif est de *donner envie d'en savoir plus*. __Préparez et répêtez cette réponse en l'adaptant au poste visé.__",
          },
          {
            id: 'rh-q2',
            question: 'Questions sur vos expériences',
            answer: "Couvrez **trois angles** : le **personnel** (valeurs, éthique de travail, motivations), le **professionnel** (exemples concrets et chiffrés : `Scrum`, collaboration, résolution de problèmes), et le **bilan** (ce que vous avez appris, comment vous avez évolué). Les recruteurs veulent comprendre *comment vous avez grandi*, pas juste ce que vous avez fait. Structure gagnante : **personnel → pro → bilan**.",
          },
          {
            id: 'rh-q3',
            question: 'Pourquoi ce rôle ?',
            answer: "Activez **deux leviers** : les **valeurs de l'entreprise** (si elles résonnent avec vous, expliquez pourquoi) et les **contacts avec ses employés** (salon, `LinkedIn`, alumni). Cela prouve une démarche proactive et un intérêt concret. __Le recruteur veut vérifier que votre choix est réfléchi, pas une candidature envoyée à 50 entreprises.__",
          },
          {
            id: 'rh-q4',
            question: 'Où vous voyez-vous dans 5 ans ?',
            answer: "Montrez une **vision d'évolution** cohérente avec le poste visé. Exemple : « Dans 5 ans, je me vois **leader technique** avec des responsabilités architecturales et d'encadrement, tout en continuant à coder. Je veux approfondir le cloud computing, notamment `AWS`. » Soyez *ambitieux mais réaliste*, avec un plan compatible avec les perspectives de l'entreprise.",
          },
          {
            id: 'rh-q5',
            question: 'Projet marquant ?',
            answer: "Le système de communication inter-systèmes **Preum** intégré pour le programme **Brésil** : il permet aux forces de l'ordre de rechercher des personnes dans les bases de données d'un pays voisin quand la recherche locale échoue. J'ai intégré ce système pour le Brésil afin qu'il communique avec le Mexique, en m'appuyant sur l'implémentation existante en Roumanie. Ce projet m'a appris **l'intégration de systèmes complexes** et la **gestion des contraintes de sécurité** sur des données sensibles.",
          },
          {
            id: 'rh-q6',
            question: 'Qualités et défauts ?',
            answer: "**Qualités** : organisé et méthodique, bonne capacité d'analyse, travail en équipe efficace même à distance.\n\n**Défauts** : tendance à vouloir tout faire en même temps — je corrige avec la **matrice d'Eisenhower** pour gérer les priorités. Autre point : je fonce parfois trop vite sans prendre assez de recul.\n\n__L'important est de montrer une conscience de soi et une démarche d'amélioration continue.__",
          },
          {
            id: 'rh-q7',
            question: 'Pourquoi vous et pas les autres ?',
            answer: "Combinez **trois éléments** : votre **expérience technique** appliquée au poste (« Votre équipe travaille sur les microservices, j'ai déjà migré un monolithe vers cette architecture »), vos **soft skills** (communication, travail en équipe, gestion de la pression), et votre **motivation spécifique** pour cette entreprise — pas de réponse générique. __Personnalisez pour rendre votre réponse unique et mémorable.__",
          },
          {
            id: 'rh-q8',
            question: 'Passer à une autre langue',
            answer: "Préparez à l'avance une anecdote simple et structurée dans la langue demandée. Le recruteur évalue votre **aisance** et **capacité à communiquer**, pas votre niveau académique. Si vous hésitez sur un mot, reformulez ou utilisez des synonymes — *la fluidité et la confiance priment*. __Montrez que la langue n'est pas un obstacle.__",
          },
        ],
      },
      {
        id: 'rh-qp',
        title: 'Questions à Poser au Recruteur',
        questions: [
          {
            id: 'rh-qp1',
            question: 'Vous proposez des formations ?',
            answer: "Poser cette question montre votre **vision à long terme** et votre **volonté de progresser**. Les entreprises qui investissent dans la formation retiennent mieux leurs talents. C'est aussi une façon d'évaluer si l'entreprise accompagnera votre développement professionnel. __Une question qui montre motivation et ambition tout en vous informant sur la culture d'entreprise.__",
          },
          {
            id: 'rh-qp2',
            question: "Quelle est l'étape suivante ?",
            answer: "__Posez toujours cette question en fin d'entretien__ : elle montre votre implication et votre côté proactif. Concrètement, elle vous informe sur la suite du processus (autre tour, test technique, délai de retour). C'est important pour ne pas rester dans l'incertitude et prouver que vous prenez votre candidature au sérieux.",
          },
          {
            id: 'rh-qp3',
            question: 'Stage de 6 ou 8 mois ?',
            answer: "Poser cette question preuve que vous **planifiez déjà votre intégration** et que vous êtes *flexible*. La durée du stage impacte le type de missions : **8 mois** permettent d'aller plus loin dans un projet que **6 mois**. C'est une question pratique qui montre votre sens de l'organisation et votre implication.",
          },
          {
            id: 'rh-qp4',
            question: 'Votre impression de cet entretien ?',
            answer: "Demander un **feedback** montre votre **ouverture à la critique constructive** et votre volonté de vous améliorer. Posez la question avec un ton *positif et non défensif*. Même un retour négatif est une info précieuse pour vos prochains entretiens. __C'est une question qui reflète votre maturité professionnelle.__",
          },
        ],
      },
    ],
  },
  {
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
          },
          {
            id: 'git-2',
            question: 'git clone vs git fork',
            answer: "`git clone` crée une copie locale d'un dépôt distant, liée au dépôt original — vous pouvez push directement si vous avez les droits. `git fork` (fonctionnalité GitHub, pas Git) crée une copie indépendante sur votre compte GitHub, pour contribuer via **Pull Request**.\n\nC'est le workflow open source : forkez, modifiez, proposez via PR. **Clone** = copie locale liée, **fork** = copie indépendante pour contribuer via PR.",
          },
          {
            id: 'git-3',
            question: "C'est quoi un bon commit ?",
            answer: "Un bon commit décrit le **QUOI** et le **POURQUOI** : « Fixe le bug de validation des emails » (quoi) + « Les emails avec un '+' étaient rejetés à tort » (pourquoi). Évitez les messages vagues comme « update ».\n\nUtilisez les **commits conventionnels** : `feat`, `fix`, `refactor`, etc. pour un historique lisible. __Une seule modification logique par commit.__",
            code: 'git commit -m "Fixe le bug de validation des emails"',
            language: 'bash',
          },
          {
            id: 'git-4',
            question: 'git pull vs git fetch',
            answer: "`git fetch` récupère les modifications du distant **sans les fusionner** — vous pouvez vérifier l'état avant de décider. `git pull` fait les deux d'un coup : `fetch` + `merge` automatique.\n\nLe risque avec `pull` est de rencontrer des conflits inattendus si le distant a divergé. Préférez `fetch` + `merge` manuel pour plus de contrôle. **Fetch** = télécharger sans fusionner (plus sûr), **Pull** = télécharger et fusionner (*plus rapide mais risqué*).",
          },
        ],
      },
      {
        id: 'git-adv',
        title: 'Opérations Avancées',
        questions: [
          {
            id: 'git-5',
            question: 'Annuler un commit',
            answer: "`git reset` revient en arrière dans l'historique : `--hard` supprime tout, `--soft` garde les modifications en staging. Mais `reset` **réécrit l'historique** — dangereux si le commit est déjà pushé.\n\n`git revert` crée un nouveau commit qui inverse les changements, **préservant l'historique** — plus sûr en équipe. __Règle d'or : `reset` pour les commits locaux non pushés, `revert` pour les commits déjà partagés.__",
            code: 'git reset --hard HEAD~1  # Supprime tout\ngit revert <hash>          # Annule via nouveau commit',
            language: 'bash',
          },
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
            question: 'git stash ?',
            answer: "`git stash` sauvegarde temporairement vos modifications non commitées dans une **pile** et restaure votre répertoire à l'état du dernier commit. Pratique quand vous devez changer de branche en urgence sans perdre votre travail.\n\nRécupérez vos modifications avec `git stash apply` ou `git stash pop`. Vous pouvez empiler plusieurs stash et les récupérer sélectivement.",
            code: 'git stash        # Sauvegarder\ngit stash apply   # Récupérer',
            language: 'bash',
          },
          {
            id: 'git-9',
            question: "Voir l'historique des commits",
            answer: "`git log` affiche l'historique complet (auteur, date, hash, message). L'option `--oneline` affiche chaque commit sur une ligne, `--graph` dessine les branches et fusions, `--decorate` montre les références.\n\nCommande recommandée : `git log --oneline --graph --all`. Filtrez par auteur (`--author`), date (`--since`) ou message (`--grep`).",
            code: 'git log --oneline --graph',
            language: 'bash',
          },
        ],
      },
      {
        id: 'git-exp',
        title: 'Expert',
        questions: [
          {
            id: 'git-10',
            question: 'git rebase ?',
            answer: "`git rebase` **réécrit l'historique** d'une branche en appliquant ses commits au-dessus d'une autre branche. Résultat : un historique **linéaire et propre**, sans commit de fusion inutile.\n\nMais `rebase` modifie les hashes des commits — __ne l'utilisez jamais sur une branche déjà pushée et partagée__. __Règle d'or : `rebase` uniquement sur des branches locales non partagées.__",
            code: 'git checkout feature-login\ngit rebase main',
            language: 'bash',
          },
          {
            id: 'git-11',
            question: 'merge vs rebase',
            answer: "`git merge` crée un commit de fusion avec deux parents — l'historique est **fidèle** mais peut devenir complexe. `git rebase` réécrit l'historique pour un flux **linéaire** plus lisible.\n\nEn pratique, `rebase` est souvent utilisé sur les branches de feature avant `merge` dans `main`. Mais `rebase` est *dangereux* sur les branches partagées car il modifie les hashes. **Merge** = historique fidèle, **Rebase** = historique linéaire — le choix dépend de la politique d'équipe.",
          },
          {
            id: 'git-12',
            question: 'Les tags ?',
            answer: "Un **tag** est une référence **fixe** vers un commit spécifique, contrairement aux branches qui sont des pointeurs *mobiles*. On l'utilise pour marquer les versions : `v1.0`, `v2.0`, etc.\n\nDeux types : **tags légers** (simple pointeur) et **tags annotés** (métadonnées : auteur, date, message, signature possible). Les tags sont essentiels pour les releases GitHub. **Tag** = signet permanent pour versionner le projet.",
            code: 'git tag -a v1.0 -m "Version initiale"',
            language: 'bash',
          },
          {
            id: 'git-13',
            question: 'Dépôt distant',
            answer: "Un **dépôt distant** est hébergé sur un serveur (`GitHub`, `GitLab`, `Bitbucket`) et permet la collaboration d'équipe. `git remote add` connecte votre local au distant (« `origin` » par convention), `git push` envoie les commits, `git pull`/`git fetch` récupère les modifications.\n\nWorkflow classique : `pull` → travailler → `commit` → `push`. Tout tourne autour de la **synchronisation local/distant**.",
            code: 'git remote add origin https://github.com/user/repo.git\ngit push origin main',
            language: 'bash',
          },
          {
            id: 'git-14',
            question: 'git cherry-pick ?',
            answer: "`git cherry-pick` copie un commit spécifique d'une branche et l'applique sur une autre, **sans fusion complète**. Utile pour appliquer un correctif de bug sur la production sans prendre tout le reste, ou récupérer un commit fait par erreur sur la mauvaise branche.\n\nAttention aux conflits si le commit dépend d'autres commits absents de la branche cible. **Cherry-pick** = copier un commit précis d'une branche à l'autre.",
            code: 'git cherry-pick <commit-hash>',
            language: 'bash',
          },
          {
            id: 'git-15',
            question: 'Voir les différences entre commits',
            answer: "`git diff` compare des états différents du dépôt : sans argument (répertoire vs staging), avec `HEAD` (répertoire vs dernier commit), ou `HEAD~1` (avant-dernier vs dernier). Comparez deux commits avec `git diff <hash1> <hash2>`, ou deux branches avec `git diff main..feature`.\n\nOutil **indispensable** pour la revue de code et la vérification avant commit.",
            code: 'git diff HEAD~1',
            language: 'bash',
          },
          {
            id: 'git-16',
            question: 'Squash de commits ?',
            answer: "Le **squash** combine plusieurs commits en un seul pour garder un historique **propre**. Utile quand une feature génère des commits du type « fix typo », « ajout test »...\n\nUtilisez `git rebase -i HEAD~3`, puis remplacez « `pick` » par « `squash` » pour les commits à fusionner. Particulièrement utile pour les **Pull Requests** afin de garder `main` propre. **Squash** = combiner des commits en un seul via rebase interactif.",
            code: 'git rebase -i HEAD~3\n# Choisir "squash" pour fusionner',
            language: 'bash',
          },
        ],
      },
    ],
  },
  {
    id: 'oop',
    title: 'POO',
    color: 'background: #7C3AED; color: white',
    description: 'Programmation Orientée Objet',
    sections: [
      {
        id: 'oop-base',
        title: 'Concepts Fondamentaux',
        questions: [
          {
            id: 'oop-1',
            question: 'Les 4 principes de la POO',
            answer: "Les **4 piliers** : **Encapsulation** (cacher les données internes, exposer via `getters`/`setters` pour protéger l'intégrité), **Héritage** (réutiliser le code d'une classe parente, éviter la duplication), **Polymorphisme** (une même méthode, des comportements différents selon l'objet — *flexibilité*), **Abstraction** (montrer l'essentiel, cacher la complexité — *simplicité d'utilisation*).",
          },
          {
            id: 'oop-2',
            question: "L'encapsulation",
            answer: "L'**encapsulation** consiste à déclarer les variables comme **privées** et contrôler leur accès via des `getters`/`setters`. Cela permet de valider les données (ex. : refuser un âge négatif dans `setAge()`) et de garantir l'intégrité.\n\nL'interface publique reste stable même si l'implémentation interne change. **Données privées + méthodes publiques = contrôle et intégrité.**",
            example: "Personne avec champ privé nom → accessible uniquement via getNom() / setNom(). On peut ajouter une validation dans setNom() pour refuser les noms vides, par exemple.",
          },
          {
            id: 'oop-3',
            question: "L'héritage en Java",
            answer: "L'**héritage** permet à une classe de récupérer attributs et méthodes d'une classe parente via `extends` (classe) ou `implements` (interface). Ex. : `Voiture extends Vehicule` hérite de `vitesse`, `couleur` et `rouler()`, et ajoute `activerClimatisation()`.\n\nL'héritage doit représenter une relation **« est-un »** (*is-a*). __Si ce n'est pas le cas, préférez la composition.__",
            code: 'public class Voiture extends Vehicule {\n    public void activerClimatisation() { ... }\n}',
            language: 'java',
          },
          {
            id: 'oop-4',
            question: 'Classe abstraite vs Interface',
            answer: "**Interface** = contrat définissant des méthodes à implémenter (sauf `default methods` depuis Java 8). Une classe peut implémenter plusieurs interfaces — simule l'héritage multiple.\n\n**Classe abstraite** = peut contenir méthodes abstraites ET concrètes, constructeurs et états, mais héritage simple uniquement. **Interface** pour définir un comportement adoptable par toute classe ; **classe abstraite** quand des sous-classes partagent du code commun.",
          },
          {
            id: 'oop-5',
            question: 'Le polymorphisme',
            answer: "Le **polymorphisme** permet à une même méthode de se comporter différemment selon l'objet. **Overriding** (redéfinition) : une sous-classe redéfinit une méthode héritée (`Forme.dessiner()` implémenté différemment par `Cercle` et `Rectangle`). **Overloading** (surcharge) : même nom de méthode avec des paramètres différents dans la même classe.\n\nPermet d'écrire du code *générique* fonctionnant avec n'importe quel sous-type.",
            code: 'abstract class Forme {\n    abstract void dessiner();\n}\nclass Cercle extends Forme {\n    void dessiner() { System.out.println("Cercle"); }\n}',
            language: 'java',
          },
          {
            id: 'oop-6',
            question: 'Surcharge vs Redéfinition',
            answer: "**Surcharge** (*overloading*) : mêmes noms, paramètres différents, dans la même classe — résolution à la **compilation** (liaison statique).\n\n**Redéfinition** (*overriding*) : même signature, dans une sous-classe avec `@Override` — résolution à l'**exécution** (liaison dynamique).\n\n**Surcharge** = même nom + paramètres différents + compilation. **Redéfinition** = même signature + sous-classe + exécution.",
            code: '// Surcharge\nint add(int a, int b) { return a+b; }\nint add(int a, int b, int c) { return a+b+c; }\n\n// Redéfinition\n@Override\nint add(int a, int b) { return a+b+bonus; }',
            language: 'java',
          },
          {
            id: 'oop-7',
            question: 'Association vs Agrégation vs Composition',
            answer: "**Association** : relation faible, indépendance mutuelle (`Client` ↔ `Banque`). **Agrégation** : partie-tout où les parties existent sans le tout (`Bibliothèque` contient des `Livres`, transférables). **Composition** : partie-tout dépendant, les parties meurent avec le tout (`Maison` → `Murs`).\n\nEn code, composition = instanciation directe dans le constructeur ; agrégation = injection de dépendances. __Privilégiez la composition sur l'héritage.__",
          },
          {
            id: 'oop-8',
            question: "Pourquoi pas d'héritage multiple en Java ?",
            answer: "Java interdit l'**héritage multiple** de classes à cause du **problème du diamant** : si `B` et `C` héritent de `A` et redéfinissent une méthode différemment, laquelle `D` (héritant de `B` et `C`) utilise-t-elle ?\n\nC++ le permet mais au prix d'une grande complexité. Java autorise l'implémentation de **plusieurs interfaces** à la place. Depuis Java 8, les `default methods` recréent partiellement le problème, mais avec des règles de résolution claires.",
          },
          {
            id: 'oop-9',
            question: 'Covariance des types de retour',
            answer: "La **covariance** (Java 5) permet à une sous-classe de retourner un sous-type du type de retour parent. Si `Animal.reproduire()` retourne `Animal`, `Chien.reproduire()` peut retourner `Chien` — le contrat est respecté car un `Chien` est un `Animal`.\n\nÇa évite les casts inutiles : directement `Chien c = new Chien().reproduire()`. Mécanisme qui rend le code *plus propre et plus sûr*.",
            code: 'class Animal { Animal reproduire() { ... } }\nclass Chien extends Animal {\n    @Override Chien reproduire() { ... }\n}',
            language: 'java',
          },
          {
            id: 'oop-10',
            question: 'Classe finale / méthode finale',
            answer: "`final` sur une classe empêche l'héritage (ex. : `String` est finale pour garantir son **immuabilité**). `final` sur une méthode empêche la redéfinition dans les sous-classes, utile pour les comportements critiques qui doivent rester identiques.\n\n**Classe finale** = pas d'héritage, **méthode finale** = pas de redéfinition. Objectif : **sécurité** et **prévisibilité** du comportement.",
          },
          {
            id: 'oop-11',
            question: 'Liaison dynamique',
            answer: "La **liaison dynamique** (*late binding*) détermine à l'**exécution** quelle méthode appeler selon le type réel de l'objet, pas le type de la référence. `Animal a = new Chien(); a.faireDuBruit();` → appelle `Chien.faireDuBruit()`.\n\nC'est le cœur du **polymorphisme** : une `List<Animal>` contenant `Chiens`, `Chats`, `Oiseaux` — chaque `faireDuBruit()` produit le bon son automatiquement.",
            code: 'Animal a = new Chien();\na.faireDuBruit();  // → appelle Chien.faireDuBruit()',
            language: 'java',
          },
          {
            id: 'oop-12',
            question: 'Couplage faible / Cohésion forte',
            answer: "**Couplage faible** = classes peu dépendantes entre elles ; modifier une classe n'impacte pas les autres. On le réduit avec des interfaces, l'injection de dépendances et le principe de responsabilité unique.\n\n**Cohésion forte** = une classe fait une seule chose et la fait bien ; faible cohésion = classe à découpquer. __Couplage faible + cohésion forte = design robuste et maintenable.__",
          },
        ],
      },
    ],
  },
];