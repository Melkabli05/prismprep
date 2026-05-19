import type { InterviewCategory } from '../../../../core/models/interview.models';

export const performanceCategory: InterviewCategory = {
  id: 'performance',
  title: 'Performance',
  color: 'background: var(--color-info); color: white',
  description: 'Optimisation, cache, scalabilité',
  sections: [
    {
      id: 'perf-backend',
      title: 'Backend',
      questions: [
        {
          id: 'perf-1',
          question: "Perfs d'une app Java",
          answer: "Trois leviers principaux.\n\n**Algorithmique** : le plus impactant — un bon algorithme (`O(n log n)` vs `O(n²)`) ne se compense par aucune config JVM.\n\n**Gestion mémoire** : privilégier les objets immuables, éviter les fuites (collections statiques infinies, listeners non désenregistrés), utiliser les primitives, fermer les ressources avec `try-with-resources`.\n\n**Profiling obligatoire** : `JVisualVM`, `YourKit`, `Java Flight Recorder` identifient les méthodes gourmandes en CPU et les objets lourds en mémoire. __Mesurer avant d'optimiser — l'intuition est trompeuse__.",
        },
        {
          id: 'perf-2',
          question: 'Traitement asynchrone',
          answer: "Les opérations longues (envoi d'emails, génération de rapports, appels API externes) ne doivent pas bloquer la requête HTTP.\n\nSolutions : **file de messages** (`RabbitMQ`, `Kafka`) — le producteur poste un message, le consommateur traite en arrière-plan. **`@Async`** Spring — exécution dans un thread pool séparé. **CompletableFuture** — programmation asynchrone Java.\n\nL'utilisateur reçoit une réponse immédiate (« Traitement en cours ») et est notifié quand c'est terminé. __Règle : tout ce qui prend plus de 200ms devrait être asynchrone.__",
          code: '@Async\npublic CompletableFuture<Report> generateReport(Long id) {\n    // Traitement long en arrière-plan\n    return CompletableFuture.completedFuture(report);\n}',
          language: 'java',
        },
        {
          id: 'perf-3',
          question: 'Profiling et métriques',
          answer: "**APM** (Application Performance Monitoring) : `New Relic`, `Datadog`, `AppDynamics` — vue d'ensemble du temps de réponse, throughput, taux d'erreur.\n\n**JVM profiling** : `Java Flight Recorder` (production-safe), `JVisualVM` (dev), `YourKit` — CPU hotspots, allocation mémoire, deadlocks.\n\n**Métriques clés** : **P50/P95/P99** de latence (pas juste la moyenne !), throughput (req/s), taux d'erreur, utilisation CPU/mémoire, temps GC.\n\n__Ce qui n'est pas mesuré n'est pas optimisé__. Les percentiles révèlent les problèmes que la moyenne cache.",
        },
      ],
    },
    {
      id: 'perf-infra',
      title: 'Infrastructure & Cache',
      questions: [
        {
          id: 'perf-4',
          question: 'Cache distribué',
          answer: "Stockage en mémoire réparti sur plusieurs serveurs pour éviter les accès BDD répétés.\n\n`Redis` : structures complexes (listes, sets, hash maps), persistance, réplication, pub/sub. `Memcached` : plus simple, caching pur clé-valeur.\n\nProblème central : la **cohérence des données**. Stratégies d'invalidation : **cache-aside** (l'app gère lecture/écriture), **write-through** (écriture passe par le cache), **write-behind** (écritures différées).\n\nLe `TTL` est crucial pour éviter les données périmées. __Un cache bien configuré réduit le temps de réponse de centaines de ms à quelques ms__.",
        },
        {
          id: 'perf-5',
          question: 'Load balancing',
          answer: "Répartir le trafic entre **plusieurs instances** d'une application pour augmenter la capacité et la disponibilité.\n\nAlgorithmes : **Round Robin** (rotation équitable), **Least Connections** (vers l'instance la moins chargée), **IP Hash** (même client → même instance, utile pour les sessions).\n\nLayers : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus intelligent).\n\nOutils : `Nginx`, `HAProxy`, cloud load balancers (`ALB` AWS). __Load balancer + health checks = haute disponibilité.__",
        },
      ],
    },
    {
      id: 'perf-frontend',
      title: 'Frontend',
      questions: [
        {
          id: 'perf-6',
          question: 'Temps de chargement web',
          answer: "Au-delà de 3s, plus de la moitié des utilisateurs abandonnent.\n\nLeviers : optimiser les images (`WebP`, compression, `srcset`), minifier/bundler CSS et JS (moins de requêtes `HTTP`), mise en cache navigateur (`Cache-Control`, `ETag`), chargement asynchrone des scripts (`async`/`defer`), `CDN` pour les assets statiques (latence réduite), **server-side rendering** (meilleur First Contentful Paint).\n\nC'est la **combinaison de petites optimisations** qui fait la différence.",
        },
        {
          id: 'perf-7',
          question: 'Lazy loading',
          answer: "Ne charger les ressources que lorsqu'elles sont nécessaires.\n\n**Images** : chargement au scroll via `loading='lazy'` ou `Intersection Observer API`. **Frontend** : lazy loading de routes (modules chargés à la navigation). **Backend/Hibernate** : associations chargées à l'accès, pas en bloc.\n\nGain : bande passante économisée côté client, charge serveur et mémoire réduites. Contrepartie : gérer les données non chargées (ex : `LazyInitializationException` hors session en `Hibernate`).",
        },
      ],
    },
  ],
};