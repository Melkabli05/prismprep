import type { InterviewCategory } from '../../../../core/models/interview.models';

export const part3Categories = [
  {
    id: 'microservices',
    title: 'Microservices',
    color: 'background: var(--color-info); color: white',
    description: 'Architecture, patterns, résilience',
    sections: [
      {
        id: 'ms-base',
        title: 'Fondamentaux',
        questions: [
          {
            id: 'ms-1',
            question: "C'est quoi les microservices ?",
            answer: "Architecture où l'application est découpée en **services indépendants**, chacun responsable d'une **fonctionnalité métier** avec sa propre BDD et son cycle de déploiement.\n\nIls communiquent via APIs : **`REST`/`gRPC`** en **synchrone**, **`Kafka`/`RabbitMQ`** en **asynchrone**. __Si un service tombe, les autres continuent__ — *résilience par isolation*.",
            example: "E-commerce : ServiceCommande, ServicePaiement, ServiceInventaire — déployables séparément.",
          },
          {
            id: 'ms-2',
            question: 'Avantages vs monolithe',
            answer: "**Avantages** : **scalabilité indépendante** par service, déploiement isolé sans impacter les autres, **stack hétérogène** (`Python`/ML, `Java`/métier, `Node`/API), résilience par isolation.\n\n**Inconvénients** : complexité opérationnelle (discovery, tracing, config distribuée), latence inter-services réseau, **cohérence des données** difficile (finit les transactions ACID, place à la **cohérence éventuelle** via `Saga`).\n\nBénéfices réels, mais à un __coût de complexité non négligeable__.",
          },
          {
            id: 'ms-3',
            question: 'Communication entre services',
            answer: "Deux approches principales.\n\n**Synchrone** : `HTTP`/`REST` (simple) ou `gRPC` (performant avec Protocol Buffers) — inconvenientient : couplage temporel, l'appelant est bloqué si le service distant est down.\n\n**Asynchrone** : `RabbitMQ` (messaging par queues) ou `Kafka` (streaming d'événements) — découplage total, le producteur ne dépend pas du consommateur.\n\nL'**API Gateway** centralise les préoccupations transversales : routage, auth, transformation de protocole, rate limiting, monitoring.",
          },
        ],
      },
      {
        id: 'ms-pat',
        title: 'Patterns',
        questions: [
          {
            id: 'ms-4',
            question: 'Circuit Breaker',
            answer: "**Pattern** inspiré des disjoncteurs électriques : quand un service distant échoue de manière répétée, on « ouvre le circuit » et arrête d'envoyer des requêtes pour éviter la **surcharge en cascade**.\n\nTrois états : **fermé** (normal), **ouvert** (blocage + fallback), **half-open** (test de reprise).\n\n\n__Sans ça, un seul service en panne peut faire tomber toute la chaîne d'appels__. Implémentation : `Resilience4j`, `Hystrix`.",
            example: "ServicePaiement en panne → circuit ouvert → l'app continue sans surcharger le service mort.",
          },
          {
            id: 'ms-5',
            question: 'Cohérence des données',
            answer: "En distribué, les transactions **ACID** multi-services sont impossibles. On utilise le pattern **Saga** : enchaînement de transactions locales avec **compensation** en cas d'échec.\n\n\nDeux variantes : **chorégraphiée** (événements entre services) ou **orchestrée** (coordinateur central).\n\nL'**Event Sourcing** stocke tous les événements plutôt que l'état courant, permettant la reconstruction à tout moment. Le `2PC` existe mais est trop lent et couplant en distribué.\n\nEn microservices, on accepte la **cohérence éventuelle** via `Saga` ou `Event Sourcing`.",
          },
          {
            id: 'ms-6',
            question: 'Service Discovery',
            answer: "Les services étant dynamiques (lancés, arrêtés, scalés à tout moment), les adresses IP statiques sont inutilisables. Le **Service Discovery** permet aux services de s'enregistrer et de se trouver dynamiquement.\n\n\nDeux approches : **côté client** (le service interroge un registre comme `Eureka`/`Consul`) ou **côté serveur** (l'API Gateway ou load balancer gère la résolution). `Consul` offre aussi health checking et config clé-valeur.\n\n\nSous `Kubernetes`, le Service Discovery est **natif** via les Services K8s et le DNS interne.",
          },
          {
            id: 'ms-7',
            question: 'API Gateway',
            answer: "**Point d'entrée unique** de l'architecture microservices : les clients n'accèdent jamais directement aux services.\n\n\nElle gère le routage, l'authentification/autorisation centralisées, la transformation de protocole (`REST`→`gRPC`), le rate limiting, le caching, le logging et le monitoring. Cela évite que chaque service réimplémente ces **préoccupations transversales**.\n\n\nOutils : `Kong` (extensible via plugins), `AWS API Gateway`. __Attention à ne pas en faire un bottleneck__ — elle doit être hautement disponible et scalable.",
          },
          {
            id: 'ms-8',
            question: 'Résilience',
            answer: "Combinaison de plusieurs mécanismes complémentaires : **redondance** (multiples instances), **Circuit Breakers** (protection contre les pannes en cascade), `Retry` avec **backoff exponentiel** (pour les problèmes temporaires), **Fallbacks** (réponse alternative : cache local, valeur par défaut), et **Timeouts** systématiques sur les appels inter-services.\n\n\n__La résilience ne repose pas sur un seul pattern mais sur leur combinaison__.",
          },
          {
            id: 'ms-9',
            question: 'CQRS',
            answer: "**Command Query Responsibility Segregation** : séparer les **écritures** (`Commands`) des **lectures** (`Queries`) dans des modèles distincts.\n\n\nEn lecture, on veut des données **dénormalisées** et optimisées ; en écriture, un modèle **normalisé** garantissant l'intégrité. Chaque côté est optimisable indépendamment (ex : `PostgreSQL` pour les écritures, `Elasticsearch` pour les lectures).\n\n\nSouvent combiné avec l'**Event Sourcing**. Inconvénient : complexité de synchronisation et *cohérence éventuelle*. __À utiliser quand la lecture est un bottleneck, pas par défaut__.",
          },
        ],
      },
    ],
  },
  {
    id: 'database',
    title: 'Bases de données',
    color: 'background: var(--color-warning); color: white',
    description: 'SQL, NoSQL, ACID',
    sections: [
      {
        id: 'db-base',
        title: 'Fondamentaux',
        questions: [
          {
            id: 'db-1',
            question: 'SQL vs NoSQL',
            answer: "**SQL** : monde relationnel avec tables, schéma fixe, clés étrangères et **intégrité référentielle** — idéal pour données structurées (banque, ERP). SGBD : `MySQL`, `PostgreSQL`, `Oracle`.\n\n**NoSQL** : flexible, sans schéma rigide — documents JSON (`MongoDB`), clé-valeur (`Redis`), colonnes larges (`Cassandra`), graphes (`Neo4j`) — idéal pour données hétérogènes et **scalabilité horizontale**.\n\n\nChoix : structure fixe + requêtes complexes → **SQL** ; flexibilité + scale massif → **NoSQL**. De plus en plus, les deux cohabitent dans une même application.",
          },
          {
            id: 'db-2',
            question: 'Normalisation',
            answer: "Processus d'organisation des données pour réduire la **redondance** et éviter les **anomalies de mise à jour**.\n\nFormes normales principales : **1NF** (valeurs atomiques), **2NF** (élimination des dépendances partielles), **3NF** (élimination des dépendances transitives). On vise généralement la **3NF**.\n\nTrop normaliser nuit aux performances (trop de `JOIN`s), d'où la **dénormalisation volontaire** en lecture, surtout dans les data warehouses. *Outil de conception logique à adapter aux besoins réels*.",
          },
          {
            id: 'db-3',
            question: 'Index',
            answer: "Structure de données (souvent **B-tree**) permettant de trouver rapidement les lignes sans scanner toute la table. On indexe les colonnes utilisées dans `WHERE`, `JOIN` et `ORDER BY`.\n\nInconvénients : ralentit les `INSERT`/`UPDATE`/`DELETE` (maintenance de l'index) et consomme de l'espace disque. __Être stratégique : indexer les colonnes de recherche, pas toutes__.\n\nExistent aussi les **index composites** (multi-colonnes) et **uniques** (garantie d'unicité).",
          },
          {
            id: 'db-4',
            question: 'Transaction ACID',
            answer: "Quatre propriétés garanties par une transaction relationnelle : **Atomicité** (tout ou rien, rollback complet si échec), **Cohérence** (passage d'un état valide à un autre, contraintes respectées), **Isolation** (transactions concurrentes invisibles entre elles, avec niveaux : `Read Uncommitted` → `Serializable` selon le compromis cohérence/perf), **Durabilité** (données persistées après commit même en cas de crash, via le `WAL`).\n\nEnsemble, elles garantissent la **fiabilité des systèmes critiques**.",
          },
          {
            id: 'db-5',
            question: 'ORM ?',
            answer: "**Object-Relational Mapping** : couche d'abstraction entre le monde objet et le monde relationnel. Convertit les tables SQL en objets du langage (`Hibernate` en Java avec `@Entity`, `Prisma` en Node.js).\n\n**Avantages** : productivité, moins de boilerplate, abstraction du SGBD.\n\n**Limites** : SQL sous-optimal pour les requêtes complexes, **problème N+1** (dizaines de requêtes au lieu d'une). __Excellent pour 80% des cas, mais savoir passer en SQL natif quand c'est nécessaire__.",
          },
        ],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    color: 'background: var(--color-text-muted); color: white',
    description: 'Docker, CI/CD, Kubernetes',
    sections: [
      {
        id: 'dv-base',
        title: 'Outils',
        questions: [
          {
            id: 'dv-1',
            question: 'Docker',
            answer: "Outil de **conteneurisation** : package l'application avec toutes ses dépendances dans un **conteneur** léger et portable. Contrairement à une VM, le conteneur partage le noyau hôte — démarrage rapide, empreinte minimale.\n\nLe même conteneur tourne de façon identique du laptop du dev à la production. Le `Dockerfile` décrit la construction de l'image, distribuée via un registre (`Docker Hub`).\n\n\n**Standard de fait** pour le déploiement, brique de base de `Kubernetes`.",
            code: 'FROM openjdk:17-jdk-slim\nCOPY target/app.jar /app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "/app.jar"]',
            language: 'dockerfile',
          },
          {
            id: 'dv-2',
            question: 'CI/CD',
            answer: "**CI** (`Continuous Integration`) : intégration régulière du code avec **pipeline automatique** (compilation, tests, analyse) à chaque push pour détecter les problèmes tôt.\n\n\n**CD** : `Continuous Delivery` (déploiement semi-auto avec validation) ou `Continuous Deployment` (full auto, chaque commit testé arrive en prod).\n\n\nBénéfices : moins d'erreurs humaines, livraisons fréquentes et fiables, *feedback loop court*. Outils : `Jenkins`, `GitLab CI`, `GitHub Actions`, `CircleCI`.",
          },
          {
            id: 'dv-3',
            question: 'Kubernetes',
            answer: "**Orchestrateur de conteneurs** pour gérer des dizaines/centaines de conteneurs : déploiement sur cluster, **scaling automatique** (`HPA`), load balancing, résilience (health checks, redémarrages auto), rolling updates et rollbacks, gestion des secrets et config.\n\n\nArchitecture **déclarative** (`YAML` décrivant l'état souhaité). Courbe d'apprentissage raide (`Pods`, `Deployments`, `Services`, `Ingress`, `ConfigMaps`…).\n\n\nBeaucoup d'équipes utilisent des solutions managées (`EKS`, `GKE`) pour éviter de gérer le control plane.",
          },
          {
            id: 'dv-4',
            question: 'TDD',
            answer: "**Test-Driven Development** : écrire les tests avant le code. Cycle **Red-Green-Refactor** : test qui échoue (`Red`), code minimum pour le passer (`Green`), puis refactoring (tout vert).\n\nÉcrire le test en premier force à réfléchir à l'interface et au comportement souhaité, conduisant à des classes plus petites et un **couplage plus faible**.\n\nDemande de la discipline, mais les praticiens réguliers constatent moins de bugs et un code plus *maintenable*. Pas dogmatique : tout ne s'y prête pas (POCs, explorations), mais __excellent pour le code métier critique__.",
          },
        ],
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    color: 'background: #DB2777; color: white',
    description: 'MVC, SOLID, Design Patterns',
    sections: [
      {
        id: 'arch-base',
        title: 'Patterns',
        questions: [
          {
            id: 'arch-1',
            question: 'MVC',
            answer: "**Model-View-Controller** : pattern séparant l'application en trois couches. **Model** (métier + données, aucune connaissance de l'UI), **View** (présentation, aucune logique métier), **Controller** (reçoit les actions utilisateur, appelle le Model, choisit la View).\n\n\n**Séparation des préoccupations** : chaque couche évolue indépendamment — on peut passer d'une interface web à une API REST sans toucher au Model. Implémentation connue : `Spring MVC` (Java), `Angular` (frontend).",
          },
          {
            id: 'arch-2',
            question: 'SOLID',
            answer: "Cinq principes de conception POO : **Single Responsibility** (une classe = une raison de changer), **Open/Closed** (extension sans modification, via polymorphisme et interfaces), **Liskov Substitution** (une sous-classe remplaçable par sa super-classe sans casser le programme), **Interface Segregation** (plusieurs petites interfaces spécialisées plutôt qu'une grosse), **Dependency Inversion** (dépendre des abstractions, pas des implémentations — base de l'**injection de dépendances**).",
          },
          {
            id: 'arch-3',
            question: 'Singleton',
            answer: "**Pattern de création** garantissant une **seule instance** d'une classe avec un point d'accès global. Constructeur privé + méthode statique créant l'instance au premier appel.\n\nCas d'usage : connexion BDD, logger, config globale.\n\n\nCritiques : état global *difficile à tester* (hard to mock), viole la responsabilité unique, concurrence à gérer en multi-thread (double-checked locking). En Java, l'**enum** avec un seul élément est l'implémentation la plus robuste. __Préferer l'injection de dépendances quand c'est possible__.",
          },
          {
            id: 'arch-4',
            question: 'Clean Architecture',
            answer: "Approche (Uncle Bob) plaçant le **code métier au centre**, les détails techniques en périphérie. **Règle de dépendance** : tout pointe vers l'intérieur.\n\n\nCouches du centre vers l'extérieur : **Entities** (règles business pures), **Use Cases** (logique applicative), **Interface Adapters** (contrôleurs, gateways), **Frameworks & Drivers** (BDD, framework web, UI).\n\nLe code métier ignore totalement l'infrastructure — testable unitairement sans BDD ni framework. Plus verbeux, mais *investissement rentable en maintenabilité* pour les projets durables.",
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Sécurité',
    color: 'background: var(--color-error); color: white',
    description: "Auth, injection SQL, CORS",
    sections: [
      {
        id: 'sec-base',
        title: 'Sécurité Web',
        questions: [
          {
            id: 'sec-1',
            question: 'Authentification vs Autorisation',
            answer: "**Authentification** = « Qui êtes-vous ? » : vérification de l'identité via login/mdp, `OAuth`, `SSO` ou biométrie, délivrant un token ou une session.\n\n**Autorisation** = « Que pouvez-vous faire ? » : détermination des droits après identification, via `RBAC` (permissions par rôles) ou `ABAC` (permissions par attributs contextuels).\n\nLes deux sont **distincts** : on peut être authentifié sans être autorisé à accéder à une ressource. Analogie : entrer dans un bâtiment (auth) vs accéder à certaines pièces (autorisation).",
          },
          {
            id: 'sec-2',
            question: 'Injection SQL',
            answer: "Un attaquant insère du **SQL malveillant** via les champs de saisie. Exemple : concaténation `\"SELECT * FROM users WHERE name = '\" + name + \"'\"` avec input `' OR '1'='1` rend la condition toujours vraie.\n\n\nConséquences : vol/modification/suppression de données, prise de contrôle du serveur.\n\nProtection : **requêtes préparées** (première ligne de défense, les paramètres sont des données pas du code), `ORM` (requêtes paramétrées auto), validation des entrées (type, longueur, format).",
            code: "// Vulnérable ❌\n\"SELECT * FROM users WHERE name = '\" + name + \"'\"\n\n// Sécurisé ✅\nPreparedStatement ps = conn.prepareStatement(\n    \"SELECT * FROM users WHERE name = ?\"\n);\nps.setString(1, name);",
            language: 'java',
          },
          {
            id: 'sec-3',
            question: 'CORS',
            answer: "**Cross-Origin Resource Sharing** : mécanisme de sécurité navigateur contrôlant les accès inter-domaines. La **Same-Origin Policy** bloque par défaut les requêtes vers un domaine différent.\n\nCORS permet à l'API de déclarer les domaines autorisés via le header `Access-Control-Allow-Origin`, après une requête de preflight (`OPTIONS`).\n\nConfiguration côté serveur pour autoriser les origines légitimes. __Une mauvaise config (`Access-Control-Allow-Origin: *`) ouvre des failles__. CORS se configure correctement, il ne se désactive pas.",
          },
          {
            id: 'sec-4',
            question: 'OWASP Top 10',
            answer: "Document de référence listant les **10 vulnérabilités web les plus critiques** (injection SQL, `XSS`, mauvaise authentification, exposition de données sensibles, `XXE`, désérialisation unsafe, composants vulnérables…).\n\nCe sont les failles les plus exploitées en pratique. S'utilise comme **checklist de sécurité** dans un projet : protection contre les injections ? validation des entrées ? hash des mots de passe ? gestion des sessions ?\n\n\n__Le minimum syndical en sécurité web que tout développeur doit connaître__.",
          },
          {
            id: 'sec-5',
            question: 'Sécuriser une API REST',
            answer: "Approche **en profondeur** à plusieurs niveaux : **authentification** (`JWT` signé dans le header `Authorization`, ou `OAuth2`), **autorisation** (vérification des droits par endpoint via rôles/permissions), **validation des entrées** (body, query params, path variables), limitation des méthodes `HTTP` autorisées par ressource, **rate limiting** (protection anti-DDoS et anti-abus), **surveillance** (logs des accès suspects, monitoring, alertes).\n\n\nChaque couche ajoute un niveau de protection *complémentaire*.",
          },
        ],
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    color: 'background: var(--color-info); color: white',
    description: 'Optimisation, cache, lazy loading',
    sections: [
      {
        id: 'perf-base',
        title: 'Optimisation',
        questions: [
          {
            id: 'perf-1',
            question: "Perfs d'une app Java",
            answer: "Trois leviers principaux.\n\n**Algorithmique** : le plus impactant — un bon algorithme (`O(n log n)` vs `O(n²)`) ne se compense par aucune config JVM.\n\n\n**Gestion mémoire** : privilégier les objets immuables, éviter les fuites (collections statiques infinies, listeners non désenregistrés), utiliser les primitives, fermer les ressources avec `try-with-resources`.\n\n**Profiling obligatoire** : `JVisualVM`, `YourKit`, `Java Flight Recorder` identifient les méthodes gourmandes en CPU et les objets lourds en mémoire. __Mesurer avant d'optimiser — l'intuition est trompeuse__.",
          },
          {
            id: 'perf-2',
            question: 'Temps de chargement web',
            answer: "Au-delà de 3s, plus de la moitié des utilisateurs abandonnent.\n\nLeviers : optimiser les images (`WebP`, compression, `srcset`), minifier/bundler CSS et JS (moins de requêtes `HTTP`), mise en cache navigateur (`Cache-Control`, `ETag`), chargement asynchrone des scripts (`async`/`defer`), `CDN` pour les assets statiques (latence réduite), **server-side rendering** (meilleur First Contentful Paint).\n\nC'est la **combinaison de petites optimisations** qui fait la différence.",
          },
          {
            id: 'perf-3',
            question: 'Cache distribué',
            answer: "Stockage en mémoire réparti sur plusieurs serveurs pour éviter les accès BDD répétés.\n\n`Redis` : structures complexes (listes, sets, hash maps), persistance, réplication, pub/sub. `Memcached` : plus simple, caching pur clé-valeur.\n\nProblème central : la **cohérence des données**. Stratégies d'invalidation : **cache-aside** (l'app gère lecture/écriture), **write-through** (écriture passe par le cache), **write-behind** (écritures différées).\n\nLe `TTL` est crucial pour éviter les données périmées. __Un cache bien configuré réduit le temps de réponse de centaines de ms à quelques ms__.",
          },
          {
            id: 'perf-4',
            question: 'Lazy loading',
            answer: "Ne charger les ressources que lorsqu'elles sont nécessaires.\n\n**Images** : chargement au scroll via `loading='lazy'` ou `Intersection Observer API`. **Frontend** : lazy loading de routes (modules chargés à la navigation). **Backend/Hibernate** : associations chargées à l'accès, pas en bloc.\n\n\nGain : bande passante économisée côté client, charge serveur et mémoire réduites. Contrepartie : gérer les données non chargées (ex : `LazyInitializationException` hors session en `Hibernate`).",
          },
        ],
      },
    ],
  },
  {
    id: 'methodology',
    title: 'Méthodologies',
    color: 'background: #7C3AED; color: white',
    description: 'Agile, Scrum, documentation',
    sections: [
      {
        id: 'meth-base',
        title: 'Méthodes',
        questions: [
          {
            id: 'meth-1',
            question: 'Agile / Scrum',
            answer: "**Agile** : philosophie privilégiant l'**itération rapide**, la collaboration client et l'adaptation au changement (Manifeste Agile : individus > processus, logiciel fonctionnel > documentation, collaboration > contrat, adaptation > plan).\n\n**Scrum** : framework Agile le plus utilisé — sprints de 1-4 semaines, stand-ups quotidiens, sprint planning, rétrospectives. Scrum ne résout pas les problèmes techniques mais les rend *visibles*.\n\n\nAvantage principal : **feedback loop court** avec un incrément fonctionnel à chaque sprint.",
          },
          {
            id: 'meth-2',
            question: 'Documentation',
            answer: "Pour les APIs : `Swagger`/`OpenAPI` documente automatiquement endpoints, paramètres, réponses et génère une interface de test.\n\n\nPour le code : commentaires sur le **pourquoi** (pas le quoi), `Javadoc` sur les méthodes publiques, conventions de nommage cohérentes.\n\n__Règle clé : une documentation obsolète est pire que pas de documentation__ (elle est trompeuse). Privilégier la documentation proche du code (annotations, `Javadoc`) — plus de chances d'être maintenue à jour. Documenter ce qui n'est pas évident, automatiser ce qui peut l'être.",
          },
          {
            id: 'meth-3',
            question: 'Revues de code',
            answer: "Un ou plusieurs développeurs relisent le code avant merge.\n\n\n**Bénéfices** : détection d'erreurs (des yeux frais voient ce que l'auteur n'a pas vu), apprentissage mutuel (découverte de patterns et bibliothèques), homogénéisation du style, amélioration de la lisibilité (on écrit mieux quand on sait qu'on sera lu).\n\n\nPour être efficaces : PRs petites et ciblées, ton constructif, review en moins de 24h. Investissement qui paie en **qualité, formation et cohésion d'équipe**.",
          },
          {
            id: 'meth-4',
            question: 'Prioriser les tâches',
            answer: "**Matrice d'Eisenhower** : quatre quadrants selon urgence/importance (faire, planifier, déléguer, éliminer). Backlog priorisé par **valeur métier** et impact utilisateur.\n\n**Méthode MoSCoW** : **M**ust have, **S**hould have, **C**ould have, **W**on't have.\n\nL'essentiel : prioriser, c'est aussi décider ce qu'on ne va **PAS** faire — *savoir dire non aux demandes hors objectifs*. En pratique, combiner le backlog du PO avec l'évaluation technique des dépendances et risques.",
          },
        ],
      },
    ],
  },
];