import type { InterviewCategory } from '../../../../core/models/interview.models';

export const microservicesCategory: InterviewCategory = {
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
          question: 'Quand passer du monolithe aux microservices ?',
          answer: "Ne passez aux microservices que si le monolithe **ne suffit plus** : déploiements bloqués par une seule équipe, scalabilité d'un seul module nécessaire, équipes éloignées géographiquement.\n\nCommencez par un **monolithe bien structuré** (modules indépendants) — la migration sera naturelle quand le besoin apparaîtra. Le *premature decomposition* est un anti-pattern qui ajoute de la complexité inutilement.\n\n__Règle : monolithe d'abord, microservices si nécessaire, jamais par mode.__",
        },
      ],
    },
    {
      id: 'ms-comm',
      title: 'Communication',
      questions: [
        {
          id: 'ms-4',
          question: 'Communication entre services',
          answer: "Deux approches principales.\n\n**Synchrone** : `HTTP`/`REST` (simple) ou `gRPC` (performant avec Protocol Buffers) — inconvenient : couplage temporel, l'appelant est bloqué si le service distant est down.\n\n**Asynchrone** : `RabbitMQ` (messaging par queues) ou `Kafka` (streaming d'événements) — découplage total, le producteur ne dépend pas du consommateur.\n\nL'**API Gateway** centralise les préoccupations transversales : routage, auth, transformation de protocole, rate limiting, monitoring.",
        },
        {
          id: 'ms-5',
          question: 'API Gateway',
          answer: "**Point d'entrée unique** de l'architecture microservices : les clients n'accèdent jamais directement aux services.\n\nElle gère le routage, l'authentification/autorisation centralisées, la transformation de protocole (`REST`→`gRPC`), le rate limiting, le caching, le logging et le monitoring. Cela évite que chaque service réimplémente ces **préoccupations transversales**.\n\nOutils : `Kong` (extensible via plugins), `AWS API Gateway`. __Attention à ne pas en faire un bottleneck__ — elle doit être hautement disponible et scalable.",
        },
        {
          id: 'ms-6',
          question: 'Service Discovery',
          answer: "Les services étant dynamiques (lancés, arrêtés, scalés à tout moment), les adresses IP statiques sont inutilisables. Le **Service Discovery** permet aux services de s'enregistrer et de se trouver dynamiquement.\n\nDeux approches : **côté client** (le service interroge un registre comme `Eureka`/`Consul`) ou **côté serveur** (l'API Gateway ou load balancer gère la résolution). `Consul` offre aussi health checking et config clé-valeur.\n\nSous `Kubernetes`, le Service Discovery est **natif** via les Services K8s et le DNS interne.",
        },
      ],
    },
    {
      id: 'ms-res',
      title: 'Résilience & Cohérence',
      questions: [
        {
          id: 'ms-7',
          question: 'Circuit Breaker',
          answer: "**Pattern** inspiré des disjoncteurs électriques : quand un service distant échoue de manière répétée, on « ouvre le circuit » et arrête d'envoyer des requêtes pour éviter la **surcharge en cascade**.\n\nTrois états : **fermé** (normal), **ouvert** (blocage + fallback), **half-open** (test de reprise).\n\n__Sans ça, un seul service en panne peut faire tomber toute la chaîne d'appels__. Implémentation : `Resilience4j`, `Hystrix`.",
          example: "ServicePaiement en panne → circuit ouvert → l'app continue sans surcharger le service mort.",
        },
        {
          id: 'ms-8',
          question: 'Résilience',
          answer: "Combinaison de plusieurs mécanismes complémentaires : **redondance** (multiples instances), **Circuit Breakers** (protection contre les pannes en cascade), `Retry` avec **backoff exponentiel** (pour les problèmes temporaires), **Fallbacks** (réponse alternative : cache local, valeur par défaut), et **Timeouts** systématiques sur les appels inter-services.\n\n__La résilience ne repose pas sur un seul pattern mais sur leur combinaison__.",
        },
        {
          id: 'ms-9',
          question: 'Cohérence des données',
          answer: "En distribué, les transactions **ACID** multi-services sont impossibles. On utilise le pattern **Saga** : enchaînement de transactions locales avec **compensation** en cas d'échec.\n\nDeux variantes : **chorégraphiée** (événements entre services) ou **orchestrée** (coordinateur central).\n\nL'**Event Sourcing** stocke tous les événements plutôt que l'état courant, permettant la reconstruction à tout moment. Le `2PC` existe mais est trop lent et couplant en distribué.\n\nEn microservices, on accepte la **cohérence éventuelle** via `Saga` ou `Event Sourcing`.",
        },
        {
          id: 'ms-10',
          question: 'CQRS',
          answer: "**Command Query Responsibility Segregation** : séparer les **écritures** (`Commands`) des **lectures** (`Queries`) dans des modèles distincts.\n\nEn lecture, on veut des données **dénormalisées** et optimisées ; en écriture, un modèle **normalisé** garantissant l'intégrité. Chaque côté est optimisable indépendamment (ex : `PostgreSQL` pour les écritures, `Elasticsearch` pour les lectures).\n\nSouvent combiné avec l'**Event Sourcing**. Inconvénient : complexité de synchronisation et *cohérence éventuelle*. __À utiliser quand la lecture est un bottleneck, pas par défaut__.",
        },
        {
          id: 'ms-11',
          question: 'Saga pattern en détail',
          answer: "Enchaînement de **transactions locales** où chaque étape publie un événement déclenchant la suivante. Si une étape échoue, les étapes précédentes sont **compensées** (rollback applicatif, pas BDD).\n\n**Chorégraphiée** : les services réagissent aux événements directement — simple pour peu d'étapes, mais flux opaque et debugging difficile.\n\n**Orchestrée** : un coordinateur (`Orchestrator`) gère le flux — plus visible et contrôlable, mais point central à rendre résilient.\n\n__Outils** : `Axon Framework`, `Camunda`, `Temporal`. Choisir orchestrée pour les flux complexes, chorégraphiée pour les simples.",
        },
        {
          id: 'ms-12',
          question: 'Strangler Fig pattern',
          answer: "Pattern de **migration progressive** du monolithe vers les microservices : on remplace une fonctionnalité du monolithe par un microservice, les deux coexistent temporairement, l'API Gateway route le trafic vers le nouveau service.\n\nAvantages : **risque limité**, migration incrémentale, rollback possible à chaque étape. Les anciennes fonctionnalités du monolithe sont « étranglées » progressivement.\n\n__L'approche recommandée pour migrer sans big bang — chaque étape est une mise en production.__",
        },
        {
          id: 'ms-13',
          question: 'Database per service',
          answer: "Chaque microservice possède sa **propre base de données** — pas de partage de tables entre services. Cela garantit l'**indépendance** : schéma, type de BDD et scaling propres à chaque service.\n\nLe partage de BDD recrée le couplage du monolithe. Pour les données partagées : **API** entre services ou **réplication événementielle**.\n\nVariante souple : même instance BDD mais schémas séparés. L'essentiel est que **chaque service est le seul propriétaire de ses données**.",
        },
      ],
    },
  ],
};