import type { InterviewCategory } from '../../../../core/models/interview.models';

export const methodologyCategory: InterviewCategory = {
  id: 'methodology',
  title: 'Méthodologies',
  color: 'background: #7C3AED; color: white',
  description: 'Agile, Scrum, pratiques de développement',
  sections: [
    {
      id: 'meth-agile',
      title: 'Agile & Scrum',
      questions: [
        {
          id: 'meth-1',
          question: 'Agile / Scrum',
          answer: "**Agile** : philosophie privilégiant l'**itération rapide**, la collaboration client et l'adaptation au changement (Manifeste Agile : individus > processus, logiciel fonctionnel > documentation, collaboration > contrat, adaptation > plan).\n\n**Scrum** : framework Agile le plus utilisé — sprints de 1-4 semaines, stand-ups quotidiens, sprint planning, rétrospectives. Scrum ne résout pas les problèmes techniques mais les rend *visibles*.\n\nAvantage principal : **feedback loop court** avec un incrément fonctionnel à chaque sprint.",
        
          deepDive: `Agile et Scrum

Quest-ce que cest

Agile est une philosophie de developpement logiciel qui privilegie la collaboration, la flexibilite et la livraison incrementale. Scrum est un framework operationnel qui implémente Agile avec des roles, ceremonies et artefacts definis.

## Roles Scrum

- **Product Owner** - Maximise la valeur du produit, gere le backlog
- **Scrum Master** - Facilite, supprime les obstacles, coach
- **Development Team** - Auto-organisee, cross-functionnelle, 3-9 personnes

## Artefacts

- **Product Backlog** - Liste priorisee de tout ce qui pourrait etre besoin
- **Sprint Backlog** - Items selectionnes pour le sprint en cours + plan de realisation
- **Increment** - Somme de tous les items terminess du product backlog

## Ceremonies

- **Sprint Planning** - Definit quoi faire et comment (max 8h pour 2 semaines)
- **Daily Scrum** - 15 min quotidien pour synchroniser (3 questions)
- **Sprint Review** - Demontrer l increment aux parties prenantes
- **Sprint Retrospective** - Reflechir sur le sprint et sameliorer

## Sprint

Duree fixe (1-4 semaines, generalement 2). Une fois commence, la duree ne change pas. Le contenu peut etre reestime mais pas la duree.

## Bonnes pratiques

1. Le Product Owner doit etre disponible et avere
2. Les estimations doivent etre collaboratives (Planning Poker)
3. Les daily standups doivent etre courts etaxes sur le travail
4. Ne pas ajouter de nouveaux items pendant le sprint
5. La retrospectives doit conduire a des actions concretes

## Pieges courants

- Transformer Scrum en cycle en cascade (plan tout au debut)
- Pas de preparation du backlog entre les sprints
- Sprint qui depasse la duree (scope creep)
- ceremonies trop longues et non productives
- Confondre Scrum Master et chef de projet

Source : Atlassian (https://www.atlassian.com/agile/scrum)
`},
        {
          id: 'meth-2',
          question: 'Kanban vs Scrum',
          answer: "**Scrum** : sprints fixes, rôles définis (PO, SM, Dev), cérémonies (planning, stand-up, retro), engagements par sprint. Plus structuré.\n\n**Kanban** : flux continu, pas de sprints ni rôles imposés. Tableau visuel avec limites de **WIP** (Work In Progress) — on ne commence pas une nouvelle tâche tant que le flux est saturé.\n\nScrum pour les projets avec des releases planifiées, Kanban pour le support/maintenance et les flux continus. __Les deux peuvent coexister : « Scrumban ».__",
        
          deepDive: `Kanban vs Scrum

Quest-ce que cest

Kanban et Scrum sont deux frameworks Agile. Scrum utilise des sprints temporels fixes tandis que Kanban gere le flux de maniere continue. Les deux peuvent etre adaptes selon le contexte.

## Scrum en resume

- Sprints de duree fixe (1-4 semaines)
- Roles definis (PO, SM, Team)
- ceremonies planifiees
- Commitment sur le contenu du sprint
- Changement de scope uniquement entre sprints

## Kanban en resume

- Pas de sprints, flux continu
- Pas de roles imposes
- Tableau Kanban avec colonnes (To Do, In Progress, Done)
- Limites WIP (Work In Progress) par colonne
- Changements priorite a tout moment

## Tableau Kanban - Exemple

| To Do | In Progress (max 3) | Review | Done |
|-------|---------------------|--------|------|
| Item  | Item A              | Item C | Item |
| Item  | Item B              |        | Item |

Les limites WIP empechent de surcharger les etapes. Si In Progress est a 3, pas de nouveaux items tant quun nest pas termine.

## Quand utiliser Scrum

- Equipe stable avec objectifs a court terme definis
- Necessite de livraison predicible (sprint = engagement)
- Environnement reglemente (compliance)
- Besoin de ceremonies pour maintenir la synchronisation

## Quand utiliser Kanban

- Travail en continu sans sprints naturelle (maintenance, support)
- Priorites qui changent frequemment
- Equipes operationnelles (ops, devops)
- Debut de transformation Agile (moins de friction)

## Hybride (Scrumban)

Combine les deux : sprints fixes avec Kanban visuel. Utile pour les equipes qui font la transition.

## Bonnes pratiques

1. Commencer par comprendre le besoin client et le flux
2. Mesurer et ameliorer le temps de cycle (lead time)
3. Imposer des limites WIP realistas et les respecter
4. Ne pas simplement ajouter des colonnes pour faire beau
5. Regularite dans les revues de processus

Source : Atlassian (https://www.atlassian.com/agile/kanban)
`},
        {
          id: 'meth-3',
          question: 'User stories',
          answer: "Description d'une fonctionnalité du point de vue utilisateur : « En tant que **[rôle]**, je veux **[action]** afin de **[bénéfice]**. »\n\nChaque story inclut des **critères d'acceptation** (conditions testables de succès). Estimée en **story points** (complexité relative, pas en heures).\n\nDécoupées en tâches techniques lors du sprint planning. Bonnes stories : **INVEST** (Independent, Negotiable, Valuable, Estimable, Small, Testable). __Une story trop grande = epic, à découper avant le sprint.__",
        
          deepDive: `User Stories

Quest-ce que cest

Une user story est une description courte dun besoin utilisateur ecrit dans un langage naturel. Elle remplace les specifications techniques traditionnelles par une focalisation sur la valeur apportee a lutilisateur.

## Format standard

En tant que [type d'utilisateur], je veux [fonctionnalite] afin de [benefice].

Exemple :
En tant que visiteur, je veux pouvoir m'inscrire par email afin de creer un compte personnel.

## Critères SMART pour les stories

- **S**pecific - Une seule fonctionnalité par story
- **M**easurable - On peut verifier quand cest termine
- **A**ttainable - Realiste avec les ressources disponibles
- **R**elevant - Alignee avec les objectifs metier
- **T**ime-bound - Peut etre realisee dans un sprint

## Critères d'acceptance

Chaque story doit avoir des criteres d'acceptance explicites :

Story : Connexion utilisateur
Criteria :
- L'utilisateur peut saisir email et mot de passe
- Un message d'erreur saffiche si identifiants incorrects
- L'utilisateur est redirige vers le dashboard apres connexion reussie
- La session persiste pendant 7 jours

## Points de story et estimation

Les points ne mesurent pas le temps mais la complexite relative :
- 1 point : trivial, quelques heures
- 2 points : simple, demi-journee
- 3 points : moyen, 1-2 jours
- 5 points : complexe, plusieurs jours
- 8 points : tres complexe, a decomposer

## Décomposition

Une story trop grande doit etre decomposee :

Mauvais : En tant qu'admin, je veux gere tous les utilisateurs
Bon :
- En tant qu'admin, je veux ajouter un nouvel utilisateur
- En tant qu'admin, je veux modifier un utilisateur existant
- En tant qu'admin, je veux desactiver un utilisateur
- En tant qu'admin, je veux voir la liste des utilisateurs

## Bonnes pratiques

1. Ecrire du point de vue de l'utilisateur, pas de la technique
2. Toujours inclure le "pourquoi" (benefice)
3. Garder les stories peties (1-3 jours max)
4. Ne pas preciser la solution dans la story
5. Collaborer avec le PO pour les criteria d'acceptance

## Pieges courants

- Ecrire des stories techniques (Changer la table user pour ajouter un champ)
- Stories trop vagues sans criteria mesurables
- Depasser 2 semaines de travail (trop gros)
- Oublier le benefice (le "pourquoi")
- Non-inclusion des cas limites dans les criteria

Source : Atlassian (https://www.atlassian.com/agile/user-stories)
`},
        {
          id: 'meth-4',
          question: 'Definition of Done (DoD)',
          answer: "Checklist **commune à l'équipe** définissant quand un increment est vraiment « terminé ». Exemples de critères : code écrit, tests unitaires passent, revue de code effectuée, documentation mise à jour, déployé en staging, critères d'acceptation validés.\n\nSans DoD, « c'est fini » signifie des choses différentes pour chacun → dette technique accumulée.\n\n__La DoD est non-négociable pour chaque item du sprint__. Elle peut évoluer lors des rétrospectives, mais jamais être contournée pour un item spécifique.",
        
          deepDive: `Definition of Done (DoD)

Quest-ce que cest

La Definition of Done est un accord de lequipe sur les criteres quune story doit satisfaire pour etre consideree comme terminee. Elle va au-dela du "ca fonctionne" et inclut tous les aspects qualite.

## DoD vs Acceptance Criteria

- **Acceptance Criteria** - Ce que le Product Owner attend du point de vue metier
- **Definition of Done** - Les criteres de qualite partages par toute lequipe

Une story peut satisfaire ses acceptance criteria mais ne pas etre "done" selon le DoD.

## Exemple de DoD

1. Code ecrit et review par un pair
2. Tests unitaires passes (couverture > 80%)
3. Tests d'integration passes
4. Deploiement en staging effectue
5. Pas de regression sur les autres tests
6. Documentation mise a jour
7. Pas de warnings ni erreurs dans le build
8. Validation sur les criteria d'acceptance

## Niveaux de DoD

DoD produit :
- Developpement termine
- Tests termines
- Documentation mise a jour

DoD sprint :
- Toutes les stories sont done
- Release note prete
- Demonstration faite

DoD release :
- Toutes les conditions du DoD produit
- Tests de performance reussis
- Approbation du Product Owner
- Deploiement en production effectue

## Pourquoi le DoD est important

- **Visibilite** - Tout le monde sait ce que signifie "termine"
- **Qualite** - Enforce des standards minimaux
- **Transparence** - Pas de surprises en sprint review
- **Confiance** - Increment toujours livrable

## Bonnes pratiques

1. Debuter simple et ajouter des criteres au fil du temps
2. Tous les membres de lequipe doivent accepter le DoD
3. Le DoD doit etre visible (affiche dans le bureau)
4. Si une story nest pas done, elle revient au sprint suivant
5. Revoir regulierement le DoD lors des retrospectives

## Pieges courants

- Un DoD trop leger (risque de qualite)
- Un DoD trop lourd (decourage lequipe)
- Ne pas respecter le DoD en fin de sprint
- DoD defini par le chef sans concertation
- Ne pas adapter le DoD quand le contexte change

Source : Atlassian (https://www.atlassian.com/agile/scrum/definition-of-done)
`},
      ],
    },
    {
      id: 'meth-pratiques',
      title: 'Pratiques de Développement',
      questions: [
        {
          id: 'meth-5',
          question: 'TDD',
          answer: "**Test-Driven Development** : écrire les tests avant le code. Cycle **Red-Green-Refactor** : test qui échoue (`Red`), code minimum pour le passer (`Green`), puis refactoring (tout vert).\n\nÉcrire le test en premier force à réfléchir à l'interface et au comportement souhaité, conduisant à des classes plus petites et un **couplage plus faible**.\n\nDemande de la discipline, mais les praticiens réguliers constatent moins de bugs et un code plus *maintenable*. Pas dogmatique : tout ne s'y prête pas (POCs, explorations), mais __excellent pour le code métier critique__.",
        
          deepDive: `TDD - Test-Driven Development

Quest-ce que cest

TDD est une approche de developpement ou les tests sont ecrits avant le code. Le cycle est : Rouge (test qui echoue) -> Vert (code minimal pour passer) -> Refactor (ameliorer). Cela s'appelle aussi "Red-Green-Refactor".

## Le cycle TDD

1. **Red** - Ecrire un test qui decrit ce quon veut sans encore implementer. Le test echoue.
2. **Green** - Ecrire le minimum de code pour que le test passe. Pas d'optimisation.
3. **Refactor** - Ameliorer le code tout en gardant les tests verts. Supprimer les duplications.

## Exemple concret

-- Etape 1 : Ecrire le test (Red) --
test("should return true for palindrome", () => {
  expect(isPalindrome("radar")).toBe(true);
});

-- Resultat : FAIL (isPalindrome nexiste pas)

-- Etape 2 : Implementer minimal (Green) --
function isPalindrome(str) {
  return str === "radar";
}

-- Resultat : PASS (mais seulement pour radar)

-- Etape 3 : Refactor + etendre --
function isPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}

-- Resultat : PASS pour tous les palindromes

## Types de tests en TDD

- **Unit tests** - Tests isoles des fonctions/classes
- **Integration tests** - Tests des interactions entre composants
- **Contract tests** - Tests des APIs entre services

## Ratio de tests recommande

- 70% unit tests (tests rapides, nombreux)
- 20% integration tests (plus lents)
- 10% e2e tests (lents, peu nombreux)

## Avantages du TDD

- Code testable des le depart
- Specification a jour (les tests documentent)
- Refactoring confiant
- Moins de bugs en production
- Design plus modulaire (sinon difficile a tester)

## Inconvenients et myths

- "Ca ralentit le developpement" - Vrai au debut, gagne du temps ensuite
- "On ecrit 100% de tests" - Non, focus sur la criticite
- "Ca garantit labsence de bugs" - Non, mais reduit significativement
- "Impossible sur du legacy" - On peut commencer par les nouvelles features

## Bonnes pratiques

1. Les tests doivent etre petits et rapides
2. Un test = une assertion (ou quelques liees)
3. AAA pattern (Arrange, Act, Assert)
4. Ne pas tester des details d'implementation
5. Les tests doivent etre independants (pas d'ordre)

## Pieges courants

- Ecrire des tests sans refactoriser (code duplique)
- Tests trop couples a l'implementation
- Negliger les cas limites (test only happy path)
- Utiliser des tests pour "tester le test"
- Oublier que les tests sont de la documentation

Source : Atlassian (https://www.atlassian.com/agile/test-driven-development)
`},
        {
          id: 'meth-6',
          question: 'Revues de code',
          answer: "Un ou plusieurs développeurs relisent le code avant merge.\n\n**Bénéfices** : détection d'erreurs (des yeux frais voient ce que l'auteur n'a pas vu), apprentissage mutuel (découverte de patterns et bibliothèques), homogénéisation du style, amélioration de la lisibilité (on écrit mieux quand on sait qu'on sera lu).\n\nPour être efficaces : PRs petites et ciblées, ton constructif, review en moins de 24h. Investissement qui paie en **qualité, formation et cohésion d'équipe**.",
        
          deepDive: `# Revues de code\\n\\n## Quest-ce que cest\\nLa revue de code est une pratique ou un ou plusieurs developpeurs examinent le code ecrit par un pair avant son integration. Elle permet de detecter les bugs, ameliorer la qualite et partager les connaissances.\\n\\n## Quest-ce que cest\\nLes revues de code sont systematiquement organisees avec des checklists, des criteria d'acceptation, et un workflow defini. Les PR doivent etre petites (moins de 400 lignes) pour faciliter la revue.\\n\\n## Bonnes pratiques\\n- Revoir dans les 24h pour eviter de bloque le dev\\n- Separer les concerns: style, logic, performance, tests\\n- Utiliser des outils automatises pour le style et les tests\\n- Donner du feedback constructif avec propositions de correction\\n- Celebrer les bonnes pratiques看到他\\n\\n## Pieges courants\\n- Revues de 2h sur des PR geantes (inefficace)\\n- Etre trop directif ("tu dois faire ci")\\n- Négliger les tests (toujours verifier la coverage)\\n- Prendre le feedback personnel\\n- Hacer des revues opportunistes (pas de processus)\\n\\n## Sources\\nhttps://www.atlassian.com/blog/developer/developer-education/code-review-best-practices`},
        {
          id: 'meth-7',
          question: 'Pair programming / Mob programming',
          answer: "**Pair programming** : deux développeurs sur un même poste — un **driver** (tape le code) et un **navigator** (réfléchit à la stratégie, identifie les problèmes). Rotation régulière des rôles.\n\n**Mob programming** : toute l'équipe sur un écran — un driver, les autres naviguent. Excellent pour les problèmes complexes et le partage de connaissances.\n\nBénéfices : **qualité supérieure** (deux paires d'yeux), transfert de compétences instantané, design mieux pensé. Coût : 2 personnes sur 1 tâche, mais moins de bugs et de rework. __Investissement rentable sur le code critique.__",
        
          deepDive: `# Pair programming et Mob programming\\n\\n## Quest-ce que cest\\nLe pair programming est une technique ou deux developpeurs travaillent ensemble sur le meme code, l'un ecrivant (driver) et l'autre guidant (navigator). Le mob programming etend ce principe a toute l'equipe.\\n\\n## Syntaxe et exemples\\n\\n### Pair Programming classique\\n- Driver: ecrit le code, se concentre sur la tache immediate\\n- Navigator: relit, pense a la strategie, aux tests, aux cas limites\\n- Roles changes toutes les 30-45 minutes\\n\\n### Mob Programming\\n- Toute l'equipe sur un seul poste\\n- Driver change toutes les 10-15 minutes (rotations)\\n- Les autres contribuent via discussion\\n- Ideal pour problemes complexes ou apprentissage\\n\\n## Bonnes pratiques\\n- Alterner regulierement les roles\\n- Commencer par des sessions courtes (1h)\\n- Choisir des pairing elastique (navigation active)\\n- Reduire les distractions (notifications off)\\n- Utiliser un IDE avec partages d'ecran en remote\\n\\n## Pieges courants\\n- Le driver fait tout sans interaction (pseudo-pairing)\\n- Sessions trop longues (fatigue cognitive)\\n- Imposer le pairing sur toutes les taches\\n- Négliger le debrief post-session\\n\\n## Sources\\nhttps://www.atlassian.com/blog/developer/developer-education/pair-programming`},
        {
          id: 'meth-8',
          question: 'Principes DRY et KISS',
          answer: "**DRY** (*Don't Repeat Yourself*) : chaque connaissance doit avoir une **représentation unique** et non ambiguë. Dupliquer = risquer des incohérences. Extrayez dans des méthodes, classes ou services partagés.\n\n**KISS** (*Keep It Simple, Stupid*) : la solution la plus simple est souvent la meilleure. Ne pas sur-ingenieurer : pas de design pattern inutile, pas d'abstraction prématurée.\n\n__DRY évite la duplication, KISS évite la complexité inutile. Les deux visent la maintenabilité.__",
        
          deepDive: `# Principes DRY et KISS\\n\\n## Quest-ce que cest\\n- DRY (Don't Repeat Yourself): Chaque connaissance doit avoir une representation unique et non dupliquee dans le systeme\\n- KISS (Keep It Simple, Stupid): Privilégier la simplicite dans la conception et l'implementation\\n\\n## Quest-ce que cest\\nDRY et KISS sont des principes de conception qui s'appliquent a tous les niveaux: code, architecture, documentation. Ils reduisent la maintenance et ameliorent la lisibilite.\\n\\n## Bonnes pratiques DRY\\n- Extraire le code duplique en fonctions/modules partages\\n- Utiliser des constantes pour les valeurs magiques\\n- Centraliser la configuration et les messages d'erreur\\n- Refactorer progressivement avec tests\\n\\n## Bonnes pratiques KISS\\n- Preferer le code simple au code "intelligent"\\n- Decouper les fonctions longues en fonctions plus petites\\n- Eviter l'over-engineering\\n- Valider regulierement que la solution n'est pas plus complexe que necessaire\\n\\n## Tension entre DRY et KISS\\nParfois, extraire le code pour eviter la duplication ajoute de la complexity. Dans ce cas:\\n- Si le code est unlikely to change: garder duplique c'est acceptable\\n- Si le code est volatile: investir dans l'extraction en vaut la peine\\n\\n## Pieges courants\\n- DRY pris trop loin (over-abstraction)\\n- KISS ignore pour des optimisations prematurées\\n- Refactorer sans tests\\n- Appliquer ces principes dogmatiquement\\n\\n## Sources\\nhttps://www.atlassian.com/blog/quality/why-code-quality-matters/dry-duplicate-code`},
      ],
    },
    {
      id: 'meth-gestion',
      title: 'Gestion de Projet',
      questions: [
        {
          id: 'meth-9',
          question: 'Prioriser les tâches',
          answer: "**Matrice d'Eisenhower** : quatre quadrants selon urgence/importance (faire, planifier, déléguer, éliminer). Backlog priorisé par **valeur métier** et impact utilisateur.\n\n**Méthode MoSCoW** : **M**ust have, **S**hould have, **C**ould have, **W**on't have.\n\nL'essentiel : prioriser, c'est aussi décider ce qu'on ne va **PAS** faire — *savoir dire non aux demandes hors objectifs*. En pratique, combiner le backlog du PO avec l'évaluation technique des dépendances et risques.",
        
          deepDive: `# Priorisation des tâches\\n\\n## Quest-ce que cest\\nLa priorisation des taches est le processus d'ordonnancement du travail selon des critares objectifs: impact, urgence, dependances, cout, et valeur business.\\n\\n## Syntaxe et exemples\\n\\n### Matrice Eisenhower\\n| | Urgent | Non Urgent |\\n|---|---|---|\\n| **Important** | Doit faire (crises) | Planifier (investissement) |\\n| **Non Important** | Deleguer | Eliminer |\\n\\n### Methodes de priorisation\\n\\n**RICE:**\\n- Reach (portee):Combien de users sont affectés?\\n- Impact (impact): Effet sur la metrique (0.25, 0.5, 1, 2, 3)\\n- Confidence (confiance): certitude des estimations\\n- Effort (effort): mois/homme necessaires\\n- Score = (R x I x C) / E\\n\\n**MoSCoW:**\\n- Must have (critique)\\n- Should have (important)\\n- Could have (souhaitable)\\n- Won't have (exclu pour cette iteration)\\n\\n## Bonnes pratiques\\n- Revoir les priorites regulierement (sprint planning, daily)\\n- Impliquer les parties prenantes dans les decisions de priorite\\n- Documenter les critares de priorisation\\n- Communicuer transparentement sur les trade-offs\\n- Prioriser la reduction de la dette technique\\n\\n## Pieges courants\\n- Prioriser selon celui qui crie le plus fort\\n- Ignorer la capacite de l'equipe\\n- Négliger les dependances entre taches\\n- Ne pas revoir les priorites quand les circonstances changent\\n\\n## Sources\\nhttps://www.atlassian.com/project-management/project-terminology`},
        {
          id: 'meth-10',
          question: 'Dette technique',
          answer: "Raccourcis de conception/codage pris pour livrer rapidement, qu'il faudra **rembourser** plus tard avec des intérêts (maintenance coûteuse, bugs, ralentissement).\n\nPas toujours mauvaise : la dette **délibérée** (consciente, planifiée) est un outil de delivery. La dette **involontaire** (mauvais code par méconnaissance) est dangereuse.\n\nGestion : la **visualiser** (backlog technique), la **quantifier** (coût de maintenance vs refactoring), allouer **20% du sprint** à la réduction. __Ignorer la dette technique, c'est comme ignorer une fuite d'eau — ça ne s'arrange pas seul.__",
        
          deepDive: `# Dette technique\\n\\n## Quest-ce que cest\\nLa dette technique est le cout implicite du travail supplémentaire causé par un choix technique rapide ou suboptimal. Elle peut etre volontaire (pour accelerer un delivery) ou involontaire (mauvaise conception initiale).\\n\\n## Types de dette technique\\n- **Deliberate:** Decision consciencee de prendre un raccourci\\n- **Accidental:** Resultat d'incompetence ou manque de connaissance\\n- **Bit rot:** Degradation du code avec le temps\\n- **Environmental:** Depreciated libraries, infrastructure obsolete\\n\\n## Bonnes pratiques\\n- Tracker la dette technique dans le backlog (tag \\"tech-debt\\")\\n- Allouer 15-20% du sprint a la reduction de dette\\n- Utiliser la matrice: impact vs effort pour prioriser\\n- Documenter chaque dette avec le \\"interest\\" associé\\n- presenter la dette en termes business (cout de maintenance)\\n\\n## Pieges courants\\n- Ignorer la dette (elle ne disparait pas)\\n- Ne pas la quantifier en temps/argent\\n- Faire trop de dette deliberee sans la solder\\n- Négliger la communication aux parties prenantes\\n- Refuser toute dette (parfois necessary evil)\\n\\n## Sources\\nhttps://www.atlassian.com/blog/technology/manage-technical-debt`},
        {
          id: 'meth-11',
          question: 'Documentation',
          answer: "Pour les APIs : `Swagger`/`OpenAPI` documente automatiquement endpoints, paramètres, réponses et génère une interface de test.\n\nPour le code : commentaires sur le **pourquoi** (pas le quoi), `Javadoc` sur les méthodes publiques, conventions de nommage cohérentes.\n\n__Règle clé : une documentation obsolète est pire que pas de documentation__ (elle est trompeuse). Privilégier la documentation proche du code (annotations, `Javadoc`) — plus de chances d'être maintenue à jour. Documenter ce qui n'est pas évident, automatiser ce qui peut l'être.",
        
          deepDive: `# Documentation\\n\\n## Quest-ce que cest\\nLa documentation technique englobe tous les documents qui expliquent le fonctionnement d'un systeme: readmes, API docs, architecture diagrams, runbooks, et guides utilisateur.\\n\\n## Types de documentation\\n- **Architecture:** ADR, diagrams C4, decisions de design\\n- **API:** Swagger/OpenAPI, guides d'utilisation\\n- **Code:** JSDoc, comments in-line (only when necessary)\\n- **Operations:** Runbooks, troubleshooting guides\\n- **Onboarding:** Guides de setup, tutoriels\\n\\n## Bonnes pratiques\\n- Documenter le "pourquoi" pas le "quoi" (le code montre le quoi)\\n- Utiliser des outils de documentation (Swagger, Storybook)\\n- Garder la documentation proche du code (docs as code)\\n- Revoir et mettre a jour lors des changes\\n- Automatiser la generation de documentation ou possible\\n\\n## Pieges courants\\n- Documenter pour le plaisir de documenter (no value)\\n- La documentation desaccord avec le code\\n- Comments triviaux (i = i + 1 // increment i)\\n- Documentation outdated car pas de process de mise a jour\\n- Over-documenting simple code\\n\\n## Sources\\nhttps://www.atlassian.com/blog/technology/technical-documentation-best-practices`},
      ],
    },
  ],
};