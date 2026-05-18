import type { InterviewCategory } from '../models/interview.models';

export const methodologyCategory: InterviewCategory = {
  id: 'methodology',
  title: 'Méthodologies',
  color: 'bg-purple-100 text-purple-700',
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
        },
        {
          id: 'meth-2',
          question: 'Kanban vs Scrum',
          answer: "**Scrum** : sprints fixes, rôles définis (PO, SM, Dev), cérémonies (planning, stand-up, retro), engagements par sprint. Plus structuré.\n\n**Kanban** : flux continu, pas de sprints ni rôles imposés. Tableau visuel avec limites de **WIP** (Work In Progress) — on ne commence pas une nouvelle tâche tant que le flux est saturé.\n\nScrum pour les projets avec des releases planifiées, Kanban pour le support/maintenance et les flux continus. __Les deux peuvent coexister : « Scrumban ».__",
        },
        {
          id: 'meth-3',
          question: 'User stories',
          answer: "Description d'une fonctionnalité du point de vue utilisateur : « En tant que **[rôle]**, je veux **[action]** afin de **[bénéfice]**. »\n\nChaque story inclut des **critères d'acceptation** (conditions testables de succès). Estimée en **story points** (complexité relative, pas en heures).\n\nDécoupées en tâches techniques lors du sprint planning. Bonnes stories : **INVEST** (Independent, Negotiable, Valuable, Estimable, Small, Testable). __Une story trop grande = epic, à découper avant le sprint.__",
        },
        {
          id: 'meth-4',
          question: 'Definition of Done (DoD)',
          answer: "Checklist **commune à l'équipe** définissant quand un increment est vraiment « terminé ». Exemples de critères : code écrit, tests unitaires passent, revue de code effectuée, documentation mise à jour, déployé en staging, critères d'acceptation validés.\n\nSans DoD, « c'est fini » signifie des choses différentes pour chacun → dette technique accumulée.\n\n__La DoD est non-négociable pour chaque item du sprint__. Elle peut évoluer lors des rétrospectives, mais jamais être contournée pour un item spécifique.",
        },
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
        },
        {
          id: 'meth-6',
          question: 'Revues de code',
          answer: "Un ou plusieurs développeurs relisent le code avant merge.\n\n**Bénéfices** : détection d'erreurs (des yeux frais voient ce que l'auteur n'a pas vu), apprentissage mutuel (découverte de patterns et bibliothèques), homogénéisation du style, amélioration de la lisibilité (on écrit mieux quand on sait qu'on sera lu).\n\nPour être efficaces : PRs petites et ciblées, ton constructif, review en moins de 24h. Investissement qui paie en **qualité, formation et cohésion d'équipe**.",
        },
        {
          id: 'meth-7',
          question: 'Pair programming / Mob programming',
          answer: "**Pair programming** : deux développeurs sur un même poste — un **driver** (tape le code) et un **navigator** (réfléchit à la stratégie, identifie les problèmes). Rotation régulière des rôles.\n\n**Mob programming** : toute l'équipe sur un écran — un driver, les autres naviguent. Excellent pour les problèmes complexes et le partage de connaissances.\n\nBénéfices : **qualité supérieure** (deux paires d'yeux), transfert de compétences instantané, design mieux pensé. Coût : 2 personnes sur 1 tâche, mais moins de bugs et de rework. __Investissement rentable sur le code critique.__",
        },
        {
          id: 'meth-8',
          question: 'Principes DRY et KISS',
          answer: "**DRY** (*Don't Repeat Yourself*) : chaque connaissance doit avoir une **représentation unique** et non ambiguë. Dupliquer = risquer des incohérences. Extrayez dans des méthodes, classes ou services partagés.\n\n**KISS** (*Keep It Simple, Stupid*) : la solution la plus simple est souvent la meilleure. Ne pas sur-ingenieurer : pas de design pattern inutile, pas d'abstraction prématurée.\n\n__DRY évite la duplication, KISS évite la complexité inutile. Les deux visent la maintenabilité.__",
        },
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
        },
        {
          id: 'meth-10',
          question: 'Dette technique',
          answer: "Raccourcis de conception/codage pris pour livrer rapidement, qu'il faudra **rembourser** plus tard avec des intérêts (maintenance coûteuse, bugs, ralentissement).\n\nPas toujours mauvaise : la dette **délibérée** (consciente, planifiée) est un outil de delivery. La dette **involontaire** (mauvais code par méconnaissance) est dangereuse.\n\nGestion : la **visualiser** (backlog technique), la **quantifier** (coût de maintenance vs refactoring), allouer **20% du sprint** à la réduction. __Ignorer la dette technique, c'est comme ignorer une fuite d'eau — ça ne s'arrange pas seul.__",
        },
        {
          id: 'meth-11',
          question: 'Documentation',
          answer: "Pour les APIs : `Swagger`/`OpenAPI` documente automatiquement endpoints, paramètres, réponses et génère une interface de test.\n\nPour le code : commentaires sur le **pourquoi** (pas le quoi), `Javadoc` sur les méthodes publiques, conventions de nommage cohérentes.\n\n__Règle clé : une documentation obsolète est pire que pas de documentation__ (elle est trompeuse). Privilégier la documentation proche du code (annotations, `Javadoc`) — plus de chances d'être maintenue à jour. Documenter ce qui n'est pas évident, automatiser ce qui peut l'être.",
        },
      ],
    },
  ],
};