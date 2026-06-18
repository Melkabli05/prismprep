import type { InterviewCategory } from '@core/models/interview.models';

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
        
          deepDive: `# Agile et Scrum

## Qu'est-ce que c'est ?

Agile est une philosophie de développement logiciel nee du Manifeste Agile (2001), qui privilegie la collaboration, la flexibilite et la livraison incrementale de valeur. Scrum est le framework Agile le plus repandu, qui structure le travail en sprints (iterations de 1 a 4 semaines) avec des rôles, des événements et des artefacts definis.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre comprehension des fondamentaux Agile
- Votre experience pratique avec Scrum
- Votre capacite a travailler dans un cadre iteratif
- Votre comprehension des rôles et responsabilites
- Votre capacite a vous adapter aux ceremonies Agile

## Les rôles Scrum

- **Product Owner :** Maximise la valeur du produit, gère le Product Backlog, priorise les items, represente les parties prenantes.
- **Scrum Master :** Facilite le processus Scrum, supprime les obstacles, coach l'équipe, protege l'équipe des distractions externes.
- **Development Team :** Auto-organisee, cross-fonctionnelle, typiquement 3 a 9 personnes. Responsable de livrer l'increment.

## Les ceremonies Scrum

- **Sprint Planning (max 8h pour 2 semaines) :** Definit l'objectif du sprint et selectionne les items du backlog.
- **Daily Scrum (15 min) :** Synchronisation quotidienne. Que s'est-il passe hier ? Que vais-je faire aujourd'hui ? Quels bloqueurs ?
- **Sprint Review :** Demonstration de l'increment aux parties prenantes. Collecte de feedback.
- **Sprint Retrospective :** Reflechir sur le sprint. Qu'est-ce qui a bien fonctionne ? Qu'est-ce qui peut être ameliore ?

## Exemple concret

**Situation :** Mon équipe etions censee être Agile mais pratiquait en realite du « Waterfall desguise » : le PO definissait tout en amont, les sprints de 4 semaines etaient trop longs, et la retrospective ne debouchait sur aucune action concrete.

**Action :** J'ai propose de reduire les sprints a 2 semaines pour accelerer le feedback. J'ai introduit les « retrospectives animees » avec des actions SMART dont on mesurait l'impact au sprint suivant. J'ai forme l'équipe à l'estimation collaborative (Planning Poker). J'ai aide le PO a decomposer les stories en plus petites unites livrables.

**Resultat :** La velocity a augmente de 30% en 3 mois. La satisfaction de l'équipe s'est amelioree. Le PO a apprecie d'avoir des retours utilisateurs plus frequents. L'équipe a ete citee en exemple lors d'une communaute de pratique Agile interne.

## Bonnes pratiques

- Les sprints sont de duree fixe (ne jamais prolonger un sprint)
- Le Product Owner doit être disponible et impliqué
- Les estimations doivent être collaboratives (Planning Poker)
- Les daily standups doivent être courts et focalises sur le travail
- Ne pas ajouter de nouveaux items en cours de sprint (scope creep)
- La retrospective doit conduire a des actions concretes et mesurees

## Pièges courants

- Transformer Scrum en cascade (tout planifier au debut)
- Sprint backlog non prepare entre les sprints
- Sprint qui depasse la duree (scope creep)
- Ceremonies trop longues et non productives
- Confondre Scrum Master et chef de projet
- Daily standup qui devient un reporting au manager
- Retrospective sans actions concretes (perte de sens)

Source : [Atlassian – Guide Scrum](https://www.atlassian.com/fr/agile/scrum)`},
        {
          id: 'meth-2',
          question: 'Kanban vs Scrum',
          answer: "**Scrum** : sprints fixes, rôles définis (PO, SM, Dev), cérémonies (planning, stand-up, retro), engagements par sprint. Plus structuré.\n\n**Kanban** : flux continu, pas de sprints ni rôles imposés. Tableau visuel avec limites de **WIP** (Work In Progress) — on ne commence pas une nouvelle tâche tant que le flux est saturé.\n\nScrum pour les projets avec des releases planifiées, Kanban pour le support/maintenance et les flux continus. __Les deux peuvent coexister : « Scrumban ».__",
        
          deepDive: `# Kanban vs Scrum

## Qu'est-ce que c'est ?

Kanban et Scrum sont deux frameworks Agile populaires avec des approches différentes. Scrum utilise des iterations temporelles (sprints) tandis que Kanban gère le flux de travail en continu. Le choix entre les deux depend du contexte de l'équipe et du type de travail.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre connaissance des différents frameworks Agile
- Votre capacite a choisir la bonne méthode selon le contexte
- Votre experience pratique avec l'un où l'autre
- Votre flexibilite methodologique

## Comparaison detaillee

| Criteres | Scrum | Kanban |
|----------|-------|--------|
| Rythme | Sprints fixes (1-4 sem) | Flux continu |
| Roles | PO, SM, Dev Team | Non imposés |
| Ceremonies | Planning, Daily, Review, Retro | Optionnelles |
| Engagement | Contenu du sprint | Pas d'engagement |
| Changement | Entre les sprints | A tout moment |
| Mesure cle | Velocity | Lead time / Cycle time |

## Les limites WIP (Work In Progress)

Le principe fondamental de Kanban : limiter le nombre de tâches en cours a chaque étape. Par exemple, une colonne « In Progress » avec une limite WIP de 3 signifie qu'on ne peut pas commencer une 4e tâche avant qu'une des 3 ne soit terminee. Cela :
- Reduit le multitasking (gaspillage cognitif)
- Revele les goulots d'etranglement
- Ameliore le temps de cycle
- Augmente la predictibilite

## Exemple concret d'hybride (Scrumban)

**Situation :** Notre équipe de support technique utilisait un kanban très simple mais les priorites etaient instables. Parallelement, nous avions des projets de 2 semaines qui auraient beneficie d'une structure Scrum.

**Action :** J'ai propose un modèle hybride : sprints de 2 semaines pour les projets (Scrum) avec un tableau Kanban visible pour les tickets de support. Les limites WIP etaient imposees pour chaque colonne. Le daily standup durait 15 minutes et couvrait les deux flux.

**Resultat :** Le temps de traitement des tickets support a baisse de 40% grace aux limites WIP. Les projets avancaient avec des sprints structures. L'équipe etait plus sereine avec une visibilite claire.

## Bonnes pratiques

- Commencez par comprendre le besoin client et le flux actuel
- Mesurez et ameliorez le temps de cycle (lead time)
- Imposez des limites WIP realistes et respectez-les
- Adaptez la méthode au contexte (pas de dogmatisme)
- Revoyez regulierement le processus en équipe
- Utilisez des metriques pour guider les decisions

## Pièges courants

- Melanger les deux sans comprendre les principes fondamentaux
- Choisir Scrum quand le travail est imprevisible (support)
- Choisir Kanban quand l'équipe a besoin de structure (projets)
- Limites WIP trop elevees (aucun effet)
- Kanban sans mesures (on ne voit pas l'amelioration)
- Scrum sans retrospective (on n'apprend pas)
- Ceremonies Scrum videes de leur sens

Source : [Atlassian – Kanban vs Scrum](https://www.atlassian.com/fr/agile/kanban/kanban-vs-scrum)`},
        {
          id: 'meth-3',
          question: 'User stories',
          answer: "Description d'une fonctionnalité du point de vue utilisateur : « En tant que **[rôle]**, je veux **[action]** afin de **[bénéfice]**. »\n\nChaque story inclut des **critères d'acceptation** (conditions testables de succès). Estimée en **story points** (complexité relative, pas en heures).\n\nDécoupées en tâches techniques lors du sprint planning. Bonnes stories : **INVEST** (Independent, Negotiable, Valuable, Estimable, Small, Testable). __Une story trop grande = epic, à découper avant le sprint.__",
        
          deepDive: `# User Stories

## Qu'est-ce que c'est ?

Une user story est une description d'une fonctionnalite du point de vue de l'utilisateur final. Elle suit le format : « En tant que [type d'utilisateur], je veux [action] afin de [benefice] ». Les user stories remplacent les specifications techniques traditionnelles en focalisant sur la valeur apportee à l'utilisateur.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a vous mettre à la place de l'utilisateur
- Votre comprehension des méthodes Agile
- Votre capacite a decomposer des fonctionnalites complexes
- Votre maitrise des criteres d'acceptation
- Votre approche de la definition du besoin

## Les criteres INVEST

Une bonne user story doit être :
- **I**ndependent (Independante) : Peut être developpee et livree separement
- **N**egotiable (Negociable) : Pas une specification figee, sujette a discussion
- **V**aluable (Valorisable) : Apporte de la valeur à l'utilisateur ou au metier
- **E**stimable (Estimable) : Assez claire pour être estimee
- **S**mall (Petite) : Realisable dans un sprint (1-3 jours)
- **T**estable (Testable) : Des criteres d'acceptation clairs

## Exemple concret

**Mauvaise user story (trop vague) :**
« En tant qu'admin, je veux gerer les utilisateurs. »
-> Pas de perimêtre, pas de criteres d'acceptation, trop grosse.

**Bonnes user stories :**
1. « En tant qu'admin, je veux ajouter un nouvel utilisateur avec email et mot de passe afin de lui donner acces à la plateforme. »
2. « En tant qu'admin, je veux modifier les informations d'un utilisateur existant afin de mettre à jour son profil. »
3. « En tant qu'admin, je veux desactiver un utilisateur afin de bloquer son acces en cas de depart. »

**Criteres d'acceptation pour la story 1 :**
- L'admin peut saisir nom, email, mot de passe
- L'email est valide (format xxx@yyy.zz)
- Le mot de passe fait au moins 8 caractères
- Un email de confirmation est envoye à l'utilisateur
- Un message d'erreur s'affiche si l'email existe déjà
- L'utilisateur est cree et visible dans la liste immediatement

## Questions de suivi possibles

- « Comment decoupez-vous une epic en user stories ? »
- « Quelle est la difference entre une user story et une tâche technique ? »
- « Comment estimez-vous une user story ? »

## Bonnes pratiques

- Ecrivez du point de vue de l'utilisateur, pas de la technique
- Incluez toujours le « pourquoi » (le benefice)
- Gardez les stories petites (1-3 jours max)
- Ne specifiez pas la solution dans la story (laissez de la place à l'équipe)
- Collaborez avec le PO pour les criteres d'acceptation
- Utilisez le format « Given-When-Then » pour les criteres
- Revoyez les stories collectivement avant le sprint planning

## Pièges courants

- Ecrire des stories techniques : « Changer la table user pour ajouter un champ »
- Stories trop vagues sans criteres mesurables
- Depasser 2 semaines de travail (c'est une epic)
- Oublier le benefice (le « pourquoi »)
- Ne pas inclure les cas limites dans les criteres
- Stories trop detaillees (pas de place à la discussion)
- Stories qui dependent les unes des autres

Source : [Atlassian – User Stories](https://www.atlassian.com/fr/agile/user-stories)`},
        {
          id: 'meth-4',
          question: 'Definition of Done (DoD)',
          answer: "Checklist **commune à l'équipe** définissant quand un increment est vraiment « terminé ». Exemples de critères : code écrit, tests unitaires passent, revue de code effectuée, documentation mise à jour, déployé en staging, critères d'acceptation validés.\n\nSans DoD, « c'est fini » signifie des choses différentes pour chacun → dette technique accumulée.\n\n__La DoD est non-négociable pour chaque item du sprint__. Elle peut évoluer lors des rétrospectives, mais jamais être contournée pour un item spécifique.",
        
          deepDive: `# Definition of Done (DoD)

## Qu'est-ce que c'est ?

La Definition of Done (DoD) est un accord d'équipe sur les criteres qu'une story doit satisfaire pour être consideree comme terminee. Elle va au-dela du « ca compile et ça marche » et garantit un niveau de qualite minimum pour chaque increment livrable.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre comprehension des standards de qualite en équipe
- Votre approche de la qualite logicielle
- Votre capacite a travailler en équipe sur des criteres communs
- Votre maturite sur les pratiques de développement

## DoD vs Acceptance Criteria

- **Acceptance Criteria :** Ce que le Product Owner attend specifiquement pour cette story (vue metier).
- **Definition of Done :** Les criteres de qualite transverses que TOUTES les stories doivent respecter (vue technique).

Une story peut satisfaire tous ses criteres d'acceptation mais ne pas être « done » si elle ne respecte pas la DoD (ex : tests manquants, documentation absente).

## Exemple de DoD pour une équipe

**Niveau Story :**
1. Code écrit et compile sans erreur
2. Tests unitaires passes avec couverture > 80%
3. Revue de code effectuee par un pair
4. Tests d'integration passes
5. Deploie en environnement de staging
6. Documentation mise à jour (si necessaire)
7. Pas de regression detectee
8. Criteres d'acceptation validates par le PO

**Niveau Sprint :**
1. Toutes les stories du sprint sont done
2. Les bugs critiques sont corriges
3. La demo est preparee pour la sprint review
4. La retrospective a ete realisee

## Exemple concret d'evolution du DoD

**Situation :** Mon équipe n'avait pas de Definition of Done formelle. Chaque développeur avait sa propre definition de « terminer », ce qui creait des problèmes de qualite reçurrents.

**Action :** J'ai propose d'organiser un atelier d'équipe pour definir collectivement notre DoD. Nous avons commence par 5 criteres essentiels et convenu d'en ajouter au fil des retrospectives. J'ai cree un poster visible dans le bureau et integre la DoD dans le template des pull requests.

**Resultat :** La qualite globale s'est amelioree. Le nombre de bugs en production a baisse de 40% en 2 mois. L'équipe etait plus alignee sur ce que signifie « fini ».

## Bonnes pratiques

- Commencez simple (5-7 criteres) et ajoutez-en avec le temps
- Impliquez TOUTE l'équipe dans la definition
- La DoD doit être visible par tous (poster, wiki, template de PR)
- Une story sans DoD respectee n'est pas terminee
- Re voyez la DoD regulierement en retrospective
- La DoD s'applique a TOUTES les stories (pas negociable par item)

## Pièges courants

- DoD trop legère (risque qualite eleve)
- DoD trop lourde (decourage l'équipe)
- Contourner la DoD en fin de sprint pour « livrer a tout prix »
- DoD definie par le chef sans concertation
- DoD jamais revue (devient obselete)
- DoD pas respectee (perd sa valeur)
- Confondre DoD et criteres d'acceptation

Source : [Atlassian – Definition of Done](https://www.atlassian.com/fr/agile/scrum/definition-of-done)`},
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
        
          deepDive: `# TDD (Test-Driven Development)

## Qu'est-ce que c'est ?

Le TDD (Test-Driven Development) est une pratique de développement où les tests sont écrits AVANT le code de production. Le cycle est : Rouge (test qui echoue) -> Vert (code minimal pour passer le test) -> Refactor (amelioration du code).

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre approche de la qualite logicielle
- Votre discipline de développement
- Votre comprehension des tests et de leur valeur
- Votre capacite a produire du code testable et maintenable
- Votre experience pratique avec les tests

## Le cycle Red-Green-Refactor

1. **Red :** Ecrivez un test qui décrit le comportement souhaite. Le test echoue car la fonctionnalite n'existe pas encore.
2. **Green :** Ecrivez le minimum de code pour faire passer le test. Pas d'optimisation, pas de refactoring.
3. **Refactor :** Ameliorez le code tout en gardant les tests verts. Supprimez les duplications, ameliorez le nommage.

## Exemple concret

**Fonctionnalite :** Calculer le montant total d'un panier avec reduction.

**Etape 1 (Red) :**
\`\`\`javascript
test('calcule le total avec reduction de 10%', () => {
  const panier = new Panier();
  panier.ajoute(100);
  panier.ajoute(50);
  expect(panier.totalAvecReduction(10)).toBe(135);
});
\`\`\`
-> FAIL : La méthode totalAvecReduction n'existe pas.

**Etape 2 (Green) :**
\`\`\`javascript
class Panier {
  constructor() { this.items = []; }
  ajoute(prix) { this.items.push(prix); }
  totalAvecReduction(pourcentage) {
    const total = this.items.reduce((a, b) => a + b, 0);
    return total * (1 - pourcentage / 100);
  }
}
\`\`\`
-> PASS

**Etape 3 (Refactor) :**
Ajouter de la validation, gerer les cas limites (panier vide, reduction > 100%).

## Les types de tests

- **Tests unitaires (70%) :** Testent une fonction/classe isolee. Rapides (ms), nombreux.
- **Tests d'integration (20%) :** Testent les interactions entre composants. Plus lents (secondes).
- **Tests E2E (10%) :** Testent l'application de bout en bout. Lents (minutes), peu nombreux.

## Bonnes pratiques

- Un test = une seule assertion (ou un groupe logique)
- Utilisez le pattern AAA : Arrange, Act, Assert
- Les tests doivent être independants (pas d'ordre)
- Ne testez pas les details d'implementation (testez le contrat)
- Les tests sont de la documentation vivante
- Refactorez les tests comme le code de production
- Couverture > 80% sur le code critique metier

## Pièges courants

- Ecrire les tests après le code (ce n'est plus du TDD)
- Tests trop couples à l'implementation (cassent au moindre changement)
- Négliger les cas limites (happy path uniquement)
- Tests qui dependent les uns des autrès (ordre)
- Couverture elevee mais tests de mauvaise qualite
- Ne pas refactoriser les tests (code duplique)
- TDD dogmatique (tout ne se prete pas au TDD : POCs, exploration)

Source : [Atlassian – Test-Driven Development](https://www.atlassian.com/fr/agile/test-driven-development)`},
        {
          id: 'meth-6',
          question: 'Revues de code',
          answer: "Un ou plusieurs développeurs relisent le code avant merge.\n\n**Bénéfices** : détection d'erreurs (des yeux frais voient ce que l'auteur n'a pas vu), apprentissage mutuel (découverte de patterns et bibliothèques), homogénéisation du style, amélioration de la lisibilité (on écrit mieux quand on sait qu'on sera lu).\n\nPour être efficaces : PRs petites et ciblées, ton constructif, review en moins de 24h. Investissement qui paie en **qualité, formation et cohésion d'équipe**.",
        
          deepDive: `# Revues de code

## Qu'est-ce que c'est ?

La revue de code est une pratique ou un ou plusieurs développeurs examinent le code écrit par un pair avant son integration. C'est l'un des leviers les plus efficaces pour la qualite logicielle, le partage de connaissances et la cohesion d'équipe.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre approche de la qualite et de la collaboration
- Votre capacite a donner et recevoir du feedback technique
- Votre discipline de développement
- Votre capacite a apprendre des autrès et a partager
- Votre maturite technique

## Les benefices

- **Detection d'erreurs :** Des yeux frais voient ce que l'auteur n'a pas vu (bugs, regressions, failles de securite).
- **Apprentissage mutuel :** Decouverte de patterns, d'APIs, de bibliotheques.
- **Homogeneisation :** Le code suit les conventions de l'équipe (style, architecture).
- **Amelioration de la qualite :** On code mieux quand on sait qu'on sera relu.
- **Resilience :** Plusieurs personnes connaissent chaque partie du code.

## Exemple concret d'organisation

**Situation :** Notre équipe n'avait pas de processus de code review. Les bugs arrivaient regulierement en production et la connaissance etait très isolee.

**Action :** J'ai propose de mettre en place un processus simple mais efficace :
1. PR de moins de 400 lignes (si plus gros, decomposer)
2. Au moins 1 reviewer obligatoire
3. Review dans les 24h (ne pas bloquer l'auteur)
4. Checklist automatisee (linter, tests, build)
5. Ton constructif : « Qu'en penses-tu si on essayait... ? »
6. Celebration des bonnes pratiques dans la PR

**Resultat :** Les bugs en production ont baisse de 60%. La connaissance du code s'est repartie dans l'équipe. Les juniors ont progresse beaucoup plus vite en voyant le code des seniors.

## Conseils pour une bonne review

- Revoyez dans les 24h pour ne pas bloquer l'équipe
- PRs petites et ciblees (< 400 lignes)
- Commencez par une vue d'ensemble, puis les details
- Distinguez les problèmes bloquants des suggestions
- Utilisez un ton constructif : question plutot qu'affirmation
- Expliquez le POURQUOI d'une suggestion, pas seulement le QUOI
- Celebrez les bonnes pratiques quand vous en voyez

## Pièges courants

- Revues de 2 heures sur des PRs geantes (inefficace et epuisant)
- Etre trop directif : « Tu dois faire comme ceci »
- Négliger les tests (toujours verifier la couverture)
- Prendre le feedback personnellement (ego)
- Reviews sans processus (opportunistes, pas systematiques)
- Trop de reviewers (dilution de la responsabilite)
- Reviewer trop vite (approuver sans verifier)

## Erreurs a éviter absolument

Ne dites jamais « C'est nul, refais tout ». Ne faites pas de review sans avoir lu le code. N'approuvez pas une PR sans la comprendre. Ne laissez pas le code non-reviewed plus de 48h.

Source : [Atlassian – Code Review Best Practices](https://www.atlassian.com/fr/blog/developer/code-review-best-practices)`},
        {
          id: 'meth-7',
          question: 'Pair programming / Mob programming',
          answer: "**Pair programming** : deux développeurs sur un même poste — un **driver** (tape le code) et un **navigator** (réfléchit à la stratégie, identifie les problèmes). Rotation régulière des rôles.\n\n**Mob programming** : toute l'équipe sur un écran — un driver, les autrès naviguent. Excellent pour les problèmes complexes et le partage de connaissances.\n\nBénéfices : **qualité supérieure** (deux paires d'yeux), transfert de compétences instantané, design mieux pensé. Coût : 2 personnes sur 1 tâche, mais moins de bugs et de rework. __Investissement rentable sur le code critique.__",
        
          deepDive: `# Pair programming et Mob programming

## Qu'est-ce que c'est ?

Le pair programming est une pratique ou deux développeurs travaillent ensemble sur le meme code : l'un écrit (le driver), l'autre guide et relit (le navigateur). Le mob programming etend ce principe a toute l'équipe : un seul driver, les autrès naviguent. Ces pratiques sont excellentes pour la qualite, le partage de connaissances et la resolution de problèmes complexes.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre ouverture à la collaboration en temps reel
- Votre capacite a travailler en binome
- Votre approche du partage de connaissances
- Votre experience avec différentes pratiques de développement

## Les rôles en pair programming

- **Driver :** Ecrit le code, suit les instructions du navigateur, se concentre sur l'implementation immediate.
- **Navigator :** Relit chaque ligne, pense à la stratégie generale, aux tests, aux cas limites, aux alternatives. Anticipe les problèmes.

**Frequence de rotation :** Toutes les 30-45 minutes pour les rôles. Plus court (10-15 min) en mob programming. La rotation reguliere est essentielle pour que les deux restent engages.

## Exemple concret

**Situation :** Un problème de performance complexe sur le moteur de recherche nous bloquait depuis 3 jours. Chaque développeur avait essaye seul sans succes.

**Action :** J'ai propose une session de mob programming avec toute l'équipe (5 personnes) sur un ecran partage. Chaque personne tournait au clavier pendant 10 minutes. Nous avons collectivement analyse les requêtes SQL, identifie un problème d'indexation et propose une solution.

**Resultat :** Le problème a ete resolu en 2 heures (3 jours de frustration). L'équipe entiere comprenait désormais le fonctionnement du moteur de recherche, et le code etait bien meilleur que ce qu'un seul développeur aurait produit.

## Quand utiliser le pair programming

- Code complexe ou critique (algorithme, securite)
- Onboarding d'un nouveau membre
- Resolution de bug difficile
- Design d'architecture
- Debut d'une nouvelle feature complexe

## Bonnes pratiques

- Alternez les rôles regulierement (toutes les 30 min)
- Commencez par des sessions courtes (1h) pour apprendre
- Choisissez le pair programming pour le code critique, pas pour tout
- Mettez les telephones en silencieux, fermez les notifications
- Utilisez des IDE partages (VS Code Live Share, Tuple) pour le remote
- Debriefez après la session : qu'est-ce qui a bien fonctionne ?

## Pièges courants

- Le driver fait tout sans interagir (pseudo-pairing)
- Sessions trop longues (fatigue cognitive, 4h max)
- Imposer le pairing sur toutes les tâches (pas necessaire)
- Navigateur qui fait autre chose (distraction)
- Personnalites trop fortes (un des deux domine)
- Négliger le debrief post-session
- Utiliser le pairing pour « surveiller » un junior

## Erreurs a éviter absolument

Ne faites pas du pair programming si vous n'etes pas concentres. Ne laissez pas un des deux faire tout le travail. N'imposez pas le pairing a quelqu'un qui n'est pas à l'aise.

Source : [Atlassian – Pair Programming](https://www.atlassian.com/fr/blog/developer/pair-programming)`},
        {
          id: 'meth-8',
          question: 'Principes DRY et KISS',
          answer: "**DRY** (*Don't Repeat Yourself*) : chaque connaissance doit avoir une **représentation unique** et non ambiguë. Dupliquer = risquer des incohérences. Extrayez dans des méthodes, classes ou services partagés.\n\n**KISS** (*Keep It Simple, Stupid*) : la solution la plus simple est souvent la meilleure. Ne pas sur-ingenieurer : pas de design pattern inutile, pas d'abstraction prématurée.\n\n__DRY évite la duplication, KISS évite la complexité inutile. Les deux visent la maintenabilité.__",
        
          deepDive: `# Principes DRY et KISS

## Qu'est-ce que c'est ?

DRY (Don't Repeat Yourself) et KISS (Keep It Simple, Stupid) sont deux principes fondamentaux de conception logicielle. DRY vise a reduire la duplication de code, tandis que KISS vise a éviter la complexite inutile. Ensemble, ils forment la base d'un code maintenable et de qualite.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre maitrise des principes fondamentaux de conception
- Votre capacite a produire du code maintenable
- Votre jugement technique (quand appliquer quel principe)
- Votre experience pratique avec la refactorisation

## DRY (Don't Repeat Yourself)

Le principe : chaque connaissance doit avoir une representation unique et non ambigue dans le système. La duplication est source d'incoherence et de bugs de maintenance.

**Application :**
- Extraire le code duplique en fonctions, classes ou modules
- Factoriser les constantes (pas de valeurs magiques)
- Centraliser la configuration
- Creer des composants reutilisables

**Tension avec KISS :** Parfois, extraire le code pour éviter la duplication introduit de la complexite. Si le code duplique est simple et unlikely to change, la duplication est parfois acceptable.

## KISS (Keep It Simple, Stupid)

Le principe : la solution la plus simple est souvent la meilleure. Evitez la sur-ingenierie, les design patterns inutiles, les abstractions prematures.

**Application :**
- Commencez simple, complexifiez si necessaire
- Une fonction = une responsabilite (principe SRP)
- Preferez le code simple au code « intelligent »
- N'utilisez pas un pattern complexe quand une boucle suffit
- Validez qu'une abstraction apporte de la valeur

## Exemple concret

**Situation :** Un développeur avait cree un système complexe de factory patterns et d'interfaces pour gerer... 3 types de notifications (email, SMS, push).

**Action :** J'ai montre que l'abstraction etait prematuree : 3 types de notifications ne justifiaient pas 5 classes et 3 interfaces. Nous avons remplace toute la structure par une simple fonction avec un switch. Le code est passe de 200 lignes a 30 lignes.

**Resultat :** Le code etait 7 fois plus court, 3 fois plus rapide a charger, et beaucoup plus facile a comprendre. Quand nous avons ajoute un 4e type (notification in-app), l'ajout a pris 10 minutes au lieu de 2 heures de ceremonie.

## Conseils d'application

- Commencez par la solution la plus simple
- Appliquez DRY uniquement si le code est vraiment duplique (pas juste similaire)
- N'abstrayez pas avant d'avoir 3 occurrences au moins (regle du 3)
- Validez qu'une abstraction paye son cout de maintenance
- Refactorez avec des tests pour valider que vous ne cassez rien

## Pièges courants

- DRY pris trop loin (over-abstraction, code illisible)
- KISS utilise comme excuse pour ne pas refactorer
- Appliquer des design patterns sans raison
- Refactorer sans tests (risque de regression)
- Trop d'abstraction prematurée (on ne connait pas encore le besoin)
- Code « intelligent » que personne d'autre ne comprend
- Premier code qui marche comme unique critere

Source : [Atlassian – Principes DRY et KISS](https://www.atlassian.com/fr/blog/quality/code-quality-matters)`},
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
        
          deepDive: `# Prioriser les tâches

## Qu'est-ce que c'est ?

La priorisation des tâches est le processus d'ordonnancement du travail selon des criteres objectifs : impact, urgence, dependances, cout, valeur business. C'est une competence cle pour les développeurs seniors et les tech leads, qui doivent constamment arbitrer entre des demandes concurrentes.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a prendre des decisions structurees
- Votre maitrise des outils de priorisation
- Votre capacite a communiquer les trade-offs
- Votre maturite dans la gestion des contraintes

## Les méthodes de priorisation

**Matrice Eisenhower :**
| | Urgent | Non Urgent |
|---|---|---|
| **Important** | Faire immediatement (crises) | Planifier (investissement) |
| **Non Important** | Deleguer (tâches administratives) | Eliminer (distractions) |

**MoSCoW :**
- **M**ust have : Indispensable pour la livraison (50-60% de l'effort)
- **S**hould have : Important mais peut attendre (20-30%)
- **C**ould have : Souhaitable si le temps le permet (10-15%)
- **W**on't have : Exclu pour cette iteration (0%)

**RICE :**
- Reach (Portee) : Combien d'utilisateurs impactes ?
- Impact : Effet sur la metrique (0.25, 0.5, 1, 2, 3)
- Confidence : Certitude des estimations (20% a 100%)
- Effort : Mois/homme necessaires
- Score = (Reach * Impact * Confidence) / Effort

## Exemple concret

**Situation :** Tech lead sur une plateforme SaaS, j'avais plusieurs demandes urgentes : un bug critique (paiement bloqué), une feature promise à un client majeur pour la semaine suivante, et un sprint a preparer.

**Action :** J'ai utilise la matrice Eisenhower :
1. Le bug paiement etait urgent ET important -> fait immédiatement par un dev dedie
2. La feature client etait importante mais pas urgente (deadline dans 1 semaine) -> planifiee avec un planning
3. Le sprint suivant etait important mais pas urgent -> preparation en parallele par les autrès membres

J'ai communique clairement les choix a toutes les parties prenantes avec les justifications.

**Resultat :** Le bug a ete corrige en 2h. La feature client livree dans les temps. Le sprint suivant etait bien prepare. Collaboration renforcee avec le client.

## Bonnes pratiques

- Utilisez des frameworks de priorisation (pas de l'intuition)
- Impliquez les parties prenantes dans les decisions
- Documentez les criteres de priorisation
- Communiquez transparentement sur les trade-offs
- Priorisez aussi la reduction de la dette technique
- Revoyez les priorites regulierement (au moins chaque sprint)
- Distinguez l'urgent de l'important

## Pièges courants

- Prioriser selon le bruit (celui qui crie le plus fort)
- Ignorer la capacite de l'équipe
- Négliger les dependances entre tâches
- Ne pas revoir les priorites quand le contexte change
- Accepter tout le travail sans evaluer la charge
- Confondre urgence et importance
- Prioriser uniquement les nouvelles features (pas de dette technique)

Source : [Atlassian – Priorisation des tâches](https://www.atlassian.com/fr/project-management/project-terminology)`},
        {
          id: 'meth-10',
          question: 'Dette technique',
          answer: "Raccourcis de conception/codage pris pour livrer rapidement, qu'il faudra **rembourser** plus tard avec des intérêts (maintenance coûteuse, bugs, ralentissement).\n\nPas toujours mauvaise : la dette **délibérée** (consciente, planifiée) est un outil de delivery. La dette **involontaire** (mauvais code par méconnaissance) est dangereuse.\n\nGestion : la **visualiser** (backlog technique), la **quantifier** (coût de maintenance vs refactoring), allouer **20% du sprint** à la réduction. __Ignorer la dette technique, c'est comme ignorer une fuite d'eau — ça ne s'arrange pas seul.__",
        
          deepDive: `# Dette technique

## Qu'est-ce que c'est ?

La dette technique est le cout implicite du travail supplementaire cause par un choix technique rapide ou suboptimal. Comme une dette financiere, elle peut être volontaire (decision consciente pour accelerer) ou involontaire (mauvaise conception initiale). Si elle n'est pas remboursee, les intérêts s'accumulent.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre maturite technique et votre pragmatisme
- Votre capacite a arbitrer entre vitesse et qualite
- Votre approche de la maintenance logicielle
- Votre capacite a expliquer des concepts techniques

## Les 4 types de dette technique

1. **Dette deliberee :** Decision consciente de prendre un raccourci pour livrer plus vite, avec un plan de remboursement.
2. **Dette accidentelle :** Resultat d'incompetence, de manque de connaissance ou de negligence.
3. **Bit rot :** Degradation naturelle du code avec le temps (dependances obsoletes, accumulation de detours).
4. **Dette d'environnement :** Outils, processus ou infrastructure obsoletes.

## La metaphore financiere

- **Principal :** Le travail supplementaire necessaire pour « bien faire » la fonctionnalite
- **Interets :** Le surcout de maintenance chaque fois qu'on touche au code (bugs, temps de développement, frustration)
- **Remboursement :** Le refactoring, la reécriture, la mise à jour

Un code avec dette technique peut fonctionner, mais chaque modification devient plus longue et plus risquee.

## Exemple concret

**Situation :** Nous devions livrer une fonctionnalite critique sous 2 semaines pour un salon professionnel. L'approche propre (refactoring prealable, tests, architecture) aurait pris 4 semaines.

**Action :** J'ai propose un compromis : implementer la fonctionnalite de maniere pragmatique avec des commentaires TODO et une dette technique documentee, avec un plan de remboursement sur les 2 sprints suivants. J'ai cree des tickets techniques dans le backlog avec le cout estime de remboursement.

**Resultat :** La fonctionnalite a ete livree dans les temps. Le salon a ete un succes. Sur les 2 sprints suivants, nous avons rembourse 80% de la dette avec des sessions dediees. L'équipe etait satisfaite car la dette etait visible et planifiee, pas cachee.

## Bonnes pratiques

- Trackez la dette technique dans le backlog avec un tag « tech-debt »
- Allouez 15-20% du sprint à la reduction de dette
- Utilisez la matrice Impact vs Effort pour prioriser le remboursement
- Documentez chaque dette avec les « intérêts » associes
- Presentez la dette en termes business (cout de maintenance, cout d'opportunite)
- Dette volontaire = OK si documentee et planifiee
- Dette involontaire = danger, a reduire en priorite

## Pièges courants

- Ignorer la dette technique (elle ne disparait pas)
- Ne pas la quantifier (en temps, en bugs, en frustration)
- Faire trop de dette deliberee sans jamais la solder
- Négliger de communiquer aux parties prenantes
- Refuser TOUTE dette (parfois necessaire pour survivre)
- Utiliser la dette comme excuse pour du mauvais code
- Sous-estimer les intérêts de la dette (cout cache)

Source : [Atlassian – Dette technique](https://www.atlassian.com/fr/blog/technology/manage-technical-debt)`},
        {
          id: 'meth-11',
          question: 'Documentation',
          answer: "Pour les APIs : `Swagger`/`OpenAPI` documente automatiquement endpoints, paramètres, réponses et génère une interface de test.\n\nPour le code : commentaires sur le **pourquoi** (pas le quoi), `Javadoc` sur les méthodes publiques, conventions de nommage cohérentes.\n\n__Règle clé : une documentation obsolète est pire que pas de documentation__ (elle est trompeuse). Privilégier la documentation proche du code (annotations, `Javadoc`) — plus de chances d'être maintenue à jour. Documenter ce qui n'est pas évident, automatiser ce qui peut l'être.",
        
          deepDive: `# Documentation

## Qu'est-ce que c'est ?

La documentation technique englobe tout ce qui explique le fonctionnement d'un système : README, documentation d'API, diagrammes d'architecture, guides d'utilisation, runbooks. La documentation de qualite est un investissement qui reduit les couts d'onboarding, de maintenance et de support.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre approche de la documentation et du partage de connaissances
- Votre sensibilite à la maintenance a long terme
- Votre capacite a communiquer par écrit
- Votre pragmatisme (documenter utile sans surdocumenter)

## Les types de documentation

**Documentation d'architecture :**
- ADR (Architecture Decision Record) : Pour chaque decision architecturale, documentez le contexte, les options envisagees, la decision et ses consequences.
- Diagrammes C4 : Contexte, Conteneur, Composant, Code. Plusieurs niveaux de detail selon l'audience.

**Documentation de code :**
- JSDoc / Javadoc : Documentez les fonctions et méthodes publiques (ce qu'elles font, leurs paramêtres, leur valeur de retour).
- Commentaires in-line : UNIQUEMENT pour le « pourquoi », jamais pour le « quoi » (le code montre le quoi).

**Documentation d'API :**
- Swagger / OpenAPI : Documentation auto-generée à partir du code. Interface interactive pour tester les endpoints.

**Documentation operationnelle :**
- Runbooks : Procedures pour les tâches reçurrentes (deploiement, incident, restauration).
- README : Comment installer, configurer, lancer, tester le projet.

## Exemple concret

**Situation :** Notre équipe passait beaucoup de temps a repondre aux memes questions sur le fonctionnement du système. Chaque nouvel arrivant mettait 3 mois a devenir productif.

**Action :** J'ai initie un effort de documentation progressif :
1. README du projet : comment installer, configurer, lancer les tests (1h)
2. ADR pour les decisions architecturales (30 min après chaque decision)
3. Runbook de deploiement (1h, mis à jour a chaque deploiement)
4. Documentation OpenAPI de notre API REST (automatisée avec Swagger)
5. Session de « documentation sprint » : 30 min a chaque sprint pour mettre à jour

**Resultat :** Le temps d'onboarding des nouveaux est passe de 3 mois a 1 mois. Les questions reçurrentes ont diminue de 70%. L'équipe etait plus autonome.

## Bonnes pratiques

- Documentez dans le code (proche de l'implementation), pas dans un wiki separe
- Automatisez la generation de documentation (Swagger, Storybook, Compodoc)
- Revoyez et mettez à jour lors de chaque changement significatif
- Documentez le « pourquoi » pas le « quoi » (le code montre le quoi)
- Une documentation obsolete est PIRE que pas de documentation
- Utilisez le principe DRY aussi pour la documentation
- Favorisez la documentation interactive (exemple : Swagger UI)

## Pièges courants

- Documenter pour le plaisir de documenter (aucune valeur ajoutee)
- Documentation en desaccord avec le code (trompeuse)
- Commentaires triviaux : \`i = i + 1; // incrementer i\`
- Documentation jamais mise à jour (devient obsolete rapidement)
- Surdocumenter du code simple ou evident
- Documentation dans un wiki detaché du code
- Négliger la documentation operationnelle (runbooks)

## Erreurs a éviter absolument

Ne laissez pas la documentation devenir obsolete (c'est pire que pas de documentation). Ne commentez pas l'evidence. Ne documentez pas dans un endroit que personne ne lit. Ne passez pas plus de temps a documenter qu'a coder.

Source : [Atlassian – Documentation technique](https://www.atlassian.com/fr/blog/technology/technical-documentation-best-practices)`},
      ],
    },
  ],
};