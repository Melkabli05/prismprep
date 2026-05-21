import type { InterviewCategory } from '../../../../core/models/interview.models';

export const performanceCategory: InterviewCategory = {
  id: 'performance',
  title: 'Performance',
  color: 'background: var(--color-info); color: white',
  description: 'Optimisation, cachée, scalabilité',
  sections: [
    {
      id: 'perf-backend',
      title: 'Backend',
      questions: [
        {
          id: 'perf-1',
          question: "Perfs d'une app Java",
          answer: "Trois leviers principaux.\n\n**Algorithmique** : le plus impactant — un bon algorithme (`O(n log n)` vs `O(n²)`) ne se compense par aucune config JVM.\n\n**Gestion mémoire** : privilégier les objets immuables, éviter les fuites (collections statiques infinies, listeners non désenregistrés), utiliser les primitives, fermer les ressources avec `try-with-resources`.\n\n**Profiling obligatoire** : `JVisualVM`, `YourKit`, `Java Flight Recorder` identifient les méthodes gourmandes en CPU et les objets lourds en mémoire. __Mesurer avant d'optimiser — l'intuition est trompeuse__.",
        
          deepDive: `Performance dune application Java

Quest-ce que cest

Les performances Java dependent de plusieurs facteurs : gestion memoire (Garbage Collection), JIT compilation, threading, et optimisation du code. Une bonne performance require une comprenhension du fonctionnement de la JVM.

## JVM et HotSpot

La JVM utilise un compilateur JIT (Just-In-Time) qui traduit le bytecode en code machine natif pour les methodes tres utilisees (hot spots). Les performances s'ameliorent avec le temps dexecution.

## Zones memoire

- **Heap** - Stocke les objets (Young Gen, Old Gen, Metaspace)
- **Stack** - Stocke les frames methodes et variables locales
- **Direct Memory** - Pour NIO (ByteBuffer)

## Garbage Collection

Le GC a un impact majeur sur les performances. Algorithms courants :

- **Serial GC** - Un seul thread, appropriate pour petit datasets
- **Parallel GC** - Multi-threads, throughput maximise
- **CMS** - Concurrent Mark Sweep, pauses courtes
- **G1** - Garbage First, equilibre latency/throughput
- **ZGC** - Ultra-basses latences, pour tres grands heaps

## Outils de diagnostic

- **VisualVM** - Monitoring visuel
- **JProfiler** - Profiler commercial
- **async-profiler** - Agent pour Flame Graphs
- **GC logs** - Analyse des pauses GC
- **jstat** - Stats JIT et GC en ligne de commande

## Optimisations frecuentes

1. **Eviter les allocations inutiles** - String concatenation dans des boucles
2. **Utiliser les types primitifs** - Eviter les Boxing/Unboxing
3. **Pooling d'objets** - Pour les objets couteux a creer
4. **Lazy initialization** - Ne charger que quand necessaire
5. **Batch processing** - Reduire les appels DB

## Benchmarks

Utiliser JMH (Java Microbenchmark Harness) pour des mesures precises. Les microbenchmarks manuels sont souvent inexacts a cause du warmup JIT.

## Bonnes pratiques

1. Mesurer avant d'optimiser (profiling first)
2. Identifier le goulot d'etranglement reel (souvent pas ou lon pense)
3. Tester avec des donnees realistess
4. Monitorer en production (pas seulement en test)
5. Documenter les choix de performance

## Pieges courants

- Optimiser sans mesure prealable
- Negliger le impact du GC
- Micro-optimiser sans contexte (JIT fait souvent mieux)
- Ignorer le cold start (serverless, containers)
- Sous-estimer l'impact reseau

Source : [Baeldung - JVM Performance](https://www.baeldung.com/jvm-performance-tuning)
`},
        {
          id: 'perf-2',
          question: 'Traitement asynchrone',
          answer: "Les opérations longues (envoi d'emails, génération de rapports, appels API externes) ne doivent pas bloquer la requête HTTP.\n\nSolutions : **file de messages** (`RabbitMQ`, `Kafka`) — le producteur poste un message, le consommateur traite en arrière-plan. **`@Async`** Spring — exécution dans un thread pool séparé. **CompletableFuture** — programmation asynchrone Java.\n\nL'utilisateur reçoit une réponse immédiate (« Traitement en cours ») et est notifié quand c'est terminé. __Règle : tout ce qui prend plus de 200ms devrait être asynchrone.__",
          code: '@Async\npublic CompletableFuture<Report> generateReport(Long id) {\n    // Traitement long en arrière-plan\n    return CompletableFuture.completedFuture(report);\n}',
          language: 'java',
        
          deepDive: `Traitement asynchrone

Quest-ce que cest

Le traitement asynchrone permet dexecuter des operations sans bloque le thread appelant. Cela ameliore le throughput et la reactivite. En Java, plusieurs mecanismes existent : Threads, Executors, CompletableFuture, et reactivity.

## Threads Java

\`\`\`java
Thread t = new Thread(() -> {
    // Travail asynchrone
});
t.start();
\`\`\`

Probleme : creer beaucoup de threads est coteux. Utiliser un pool de threads.

## ExecutorService

\`\`\`java
ExecutorService pool = Executors.newFixedThreadPool(10);
Future<String> future = pool.submit(() -> {
    return callAPI();
});
String result = future.get(); // Blocking
pool.shutdown();
\`\`\`

## CompletableFuture

\`\`\`java
CompletableFuture.supplyAsync(this::callAPI)
    .thenApply(this::processResult)
    .exceptionally(this::handleError)
    .thenAccept(this::displayResult);
\`\`\`

Permet du chaining non-bloquant avec gestion des erreurs.

## Patterns asynchrones

### Callback
\`\`\`java
api.call(params, (error, result) -> {
    if (error != null) handle(error);
    else display(result);
});
\`\`\`

### Promise/Future
\`\`\`java
api.callAsync(params)
    .thenAccept(display)
    .exceptionally(handleError);
\`\`\`

### Reactive Streams
\`\`\`java
api.getFlux()
    .filter(item -> item.isValid())
    .map(this::transform)
    .subscribe(this::display);
\`\`\`

## Event Loop (Node.js style)

Un seul thread principal traite les evenements dans une file. Les operations I/O sont deleguees a des workers. Ideal pour les applications I/O-bound.

## Cas d'usage

| Pattern | Quand utiliser |
|---------|----------------|
| Sync | Operations tres courtes, CPU-bound simples |
| Thread per request | Taches bloquees longues, peu de requetes |
| Thread pool | Requetes frequentes, taches courtes |
| Event loop | I/O-bound, haute concurrence |
| Reactive | Streams de donnees, backpressure |

## Bonnes pratiques

1. Ne pas blooqer l'event loop (Node.js)
2. Definir des timeouts pour eviter les blocages infinis
3. Gerer les erreurs (un seul catch pour tout le chain)
4. Eviter les partages d'etat entre threads
5. Monitorer la taille des queues de工作任务

## Pieges courants

- Callback hell (pyramide de callbacks)
- Oublier de fermer les ressources
- Partager letat mutable sans synchronisation
- N'egliger le backpressure (producer plus vite que consumer)
- Confusion entre parallelisme et concurrence

Source : [Baeldung - Async Java](https://www.baeldung.com/java-async)
`},
        {
          id: 'perf-3',
          question: 'Profiling et métriques',
          answer: "**APM** (Application Performance Monitoring) : `New Relic`, `Datadog`, `AppDynamics` — vue d'ensemble du temps de réponse, throughput, taux d'erreur.\n\n**JVM profiling** : `Java Flight Recorder` (production-safe), `JVisualVM` (dev), `YourKit` — CPU hotspots, allocation mémoire, deadlocks.\n\n**Métriques clés** : **P50/P95/P99** de latence (pas juste la moyenne !), throughput (req/s), taux d'erreur, utilisation CPU/mémoire, temps GC.\n\n__Ce qui n'est pas mesuré n'est pas optimisé__. Les percentiles révèlent les problèmes que la moyenne cachée.",
        
          deepDive: `Profiling et metriques

Quest-ce que cest

Le profiling consiste a analyser lexecution dun programme pour identifier les goulets d'etranglement (bottlenecks). Les metriques permettent de monitorer la sante et les performances en production.

## Types de profiling

### CPU Profiling
Identifie les methodes qui consomment le plus de temps CPU. Utilise des sampling (interruption periodique) ou instrumentation (injection de code).

### Memory Profiling
Analyse l'utilisation memoire, detecte les memory leaks et les allocations excessives. Heap dumps, allocation tracking.

### I/O Profiling
Identifie les operations disque et reseau lentes.

### Lock Contention
Detecte les threads qui attendent des verrous trop longtemps.

## Outils Java

| Outil | Usage |
|-------|-------|
| VisualVM | Profiling visuel, heap dumps |
| async-profiler | Flame graphs Linux/Mac |
| JFR (Java Flight Recorder) | Profiling faible impact en prod |
| MAT (Eclipse Memory Analyzer) | Analyse de heap dumps |
| jcmd | Outils JVM integres |

## Outils generiques

- **perf** (Linux) - Sampling CPU avec FlameGraph
- **strace** - Appels systeme
- **tcpdump** - Analyse reseau
- **iostat** - I/O disque
- **pmap** - Carte memoire dun processus

## Metriques cles (RED method)

- **Rate** - Requetes par seconde
- **Errors** - Taux derreur
- **Duration** - Latence (p50, p95, p99)

## Metriques USE (pour ressources)

- **Utilization** - Taux d'utilisation
- **Saturation** - Queue en attente
- **Errors** - Erreurs

## Stackdriver / OpenTelemetry

\`\`\`java
// OpenTelemetry
Span span = tracer.startSpan("operation");
try {
    // travail
} finally {
    span.end();
}
\`\`\`

## Echantillonnage (Sampling)

Ne pas profiler 100% des requetes. Echantilloner 1% ou 5% en production pour avoir des donnees representatives sans impact.

## Bonnes pratiques

1. Mesurer en conditions realistess (donnees, charge)
2. profiler en production (pas que dev)
3. Echantilloner regulierement plutot qu'en continu
4. Coreler les metriques applicatives et systeme
5. Automatiser la collection (dashboards, alerts)

## Pieges courants

- Profilers qui perturbent les mesures elles-memes
- N'egliger le warmed-up (JIT compile apres quelques minutes)
- Mesurer sur des donnees trop simples
- Ignorer la variance (une mesure nest pas une tendance)
- Ne pas coreler les symptomes (CPU haute) avec les causes (GC)

Source : [Netflix Technology Blog - Profiling](https://netflixtechblog.com/)
`},
      ],
    },
    {
      id: 'perf-infra',
      title: 'Infrastructure & Cache',
      questions: [
        {
          id: 'perf-4',
          question: 'Cache distribué',
          answer: "Stockage en mémoire réparti sur plusieurs serveurs pour éviter les accès BDD répétés.\n\n`Redis` : structures complexes (listes, sets, hash maps), persistance, réplication, pub/sub. `Memcachéed` : plus simple, cachéing pur clé-valeur.\n\nProblème central : la **cohérence des données**. Stratégies d'invalidation : **cachée-aside** (l'app gère lecture/écriture), **write-through** (écriture passe par le cachée), **write-behind** (écritures différées).\n\nLe `TTL` est crucial pour éviter les données périmées. __Un cachée bien configuré réduit le temps de réponse de centaines de ms à quelques ms__.",
        
          deepDive: `Cache distribue

Quest-ce que cest

Un cache distribue permet de stocker des donnees en memoire sur plusieurs serveurs pour accelerer les lectures. Il complete le cache local (L1/L2) en permettant le partage entre instances.

## Types de cache

### In-process (local)
- **Caffeine** - Librairie Java haute performance
- **Guava Cache** - Simple mais moins performant
- Thread-safe, une seule JVM

### Distribue (cross-process)
- **Redis** - Store clé-valeur le plus populaire
- **Memcached** - Simple, pas de replication
- **Hazelcast** - In-memory data grid
- **Apache Ignite** - Grid computing

## Modeles de coherence

### Cache-aside (recommande)
\`\`\`java
String data = cache.get(key);
if (data == null) {
    data = database.query(key);
    cache.put(key, data);
}
\`\`\`

### Write-through
Les ecritures vont en cache et en base simultanement. Lecture depuis le cache.

### Write-behind
Les ecritures vont dabord en cache, puis asynchronously en base.

## Strategies d'eviction

- **LRU** (Least Recently Used) - Eviction du moins recently utilise
- **LFU** (Least Frequently Used) - Eviction du moins frequente
- **TTL** (Time To Live) - Expiration apres un delai
- **Size-based** - Eviction quand le cache depasse une taille

## Cache distributed topologies

- **Singleton** - Un seul node (point de defaillance)
- **Replicated** - Chaque node a une copie complete
- **Partitioned (sharded)** - Donnees distribuees sur plusieurs nodes
- **Client-server** - Clients conectent a des serveurs de cache dedies

## Problèmes habituels

### Cache stampede (thundering herd)
Quand le cache expire, plusieurs requetes hit la base en meme temps.

Solution : probabilistique early expiration, lock de refresh.

\`\`\`java
if (cache.isNearExpiracy(key) && probabilisticShouldRefresh()) {
    asyncRefresh(key); // ne pas bloquer
}
\`\`\`

### Incoherence de donnees
Le cache peut contenir des donnees perimees.

Solutions : TTL courts, invalidation explicite, evenement de changement.

## Bonnes pratiques

1. Cache only what is expensive to compute/retrieve
2. Use appropriate TTL based on data freshness needs
3. Monitor cache hit ratio (target > 90% for hot data)
4. Plan for cache failure (fallback to database)
5. Keep cached data small (serialize efficiently)

## Pieges courants

- Cacher trop de donnees (OOM)
- TTL trop long (donnees perimees)
- Cache stampede sur popular keys
- N'egliger la sérialization (codec overhead)
- No monitoring of hit ratio

Source : [Baeldung - Caching](https://www.baeldung.com/java-caching)
`},
        {
          id: 'perf-5',
          question: 'Load balancing',
          answer: "Répartir le trafic entre **plusieurs instances** d'une application pour augmenter la capacité et la disponibilité.\n\nAlgorithmes : **Round Robin** (rotation équitable), **Least Connections** (vers l'instance la moins chargée), **IP Hash** (même client → même instance, utile pour les sessions).\n\nLayers : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus intelligent).\n\nOutils : `Nginx`, `HAProxy`, cloud load balancers (`ALB` AWS). __Load balancer + health checks = haute disponibilité.__",
        
          deepDive: `Load balancing

Quest-ce que cest

Le load balancing distribute les requetes entrantes sur plusieurs serveurs pour maximiser le throughput, minimiser la latence, et assurer la disponibilite. C'est un composant critique des architectures Distribuees.

## Algorithmes de distribution

### Round Robin
Distribute sequentiellement. Simple mais ne considera pas la charge actuelle.

### Least Connections
Envoie vers le serveur avec le moins de connexions actives. Bon pour requetes de duree variable.

### IP Hash
Hash de l'IP cliente pour toujours envoyer au meme serveur. Utile pour les sessions sticky.

### Weighted
Attribue un poids a chaque serveur selon sa capacite. Plus de trafic vers les serveurs plus puissants.

### Resource-based
Utilise des metrics (CPU, RAM) pour decide. Plus intelligent mais plus complexe.

## L4 vs L7 Load Balancing

### Layer 4 (Transport)
- Balance sur IP + Port
- Plus performant (ne parse pas HTTP)
- TCP/UDP forwarding
- Pas de visibilite sur le contenu

### Layer 7 (Application)
- Parse HTTP headers
- Peut router selon URL, cookies, headers
- Plus intelligent mais plus coteux
- SSL termination
- Rate limiting, authentication

## Health Checks

\`\`\`yaml
health_check:
  path: /health
  interval: 10s
  timeout: 5s
  unhealthy_threshold: 3
  healthy_threshold: 2
\`\`\`

Types :
- **TCP connect** - Verify port open
- **HTTP GET** - Verify 200 response
- **HTTPS** - Verify certificate
- **Custom** - Application-specific logic

## Failover et redondance

- **Active-Active** - Plusieurs load balancers, tous actifs
- **Active-Passive** - Un principal, un de secours (failover)
- **Anycast** - Un IP pour plusieurs serveurs geo-distribues

## Session Sticky

Garder la meme session sur le meme serveur :

- **Cookie** - Load balancer set cookie
- **Source IP** - Hash de l'IP cliente
- **Header** - specific header comme X-User-Id

## Implementation

### Logiciel
- **Nginx** - L7 reverse proxy
- **HAProxy** - L4/L7, haute performance
- **Traefik** - Pour containers/K8s

### Cloud
- **AWS ALB/NLB**
- **Azure Load Balancer**
- **GCP Cloud Load Balancing**

### Matériel
- **F5 BIG-IP**
- **Citrix ADC**
- Haute performance pour gros volumes

## Bonnes pratiques

1. ** health checks reguliers** - Remove failed servers quickly
2. **Graceful shutdown** - Allow in-flight requests to complete
3. **SSL/TLS termination** - Centralize certificates
4. **Connection pooling** - Reduce backend load
5. **Monitor metrics** - Request rate, latency, error rate per backend

## Pieges courants

- No health check (routing to dead servers)
- Single point of failure (no redundancy)
- Sticky sessions without failover plan
- Overloading single backend (poor distribution algorithm)
- Not accounting for server weight

Source : [NGINX Load Balancing](https://www.nginx.com/solutions/load-balancing/)
`},
      ],
    },
    {
      id: 'perf-frontend',
      title: 'Frontend',
      questions: [
        {
          id: 'perf-6',
          question: 'Temps de chargement web',
          answer: "Au-delà de 3s, plus de la moitié des utilisateurs abandonnent.\n\nLeviers : optimiser les images (`WebP`, compression, `srcset`), minifier/bundler CSS et JS (moins de requêtes `HTTP`), mise en cachée navigateur (`Cache-Control`, `ETag`), chargement asynchrone des scripts (`async`/`defer`), `CDN` pour les assets statiques (latence réduite), **server-side rendering** (meilleur First Contentful Paint).\n\nC'est la **combinaison de petites optimisations** qui fait la différence.",
        
          deepDive: `# Web Loading Time Performance

## Quest-ce que cest

Web loading time performance measures how quickly a web application delivers content to users. Key metrics include Time to First Byte (TTFB), First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI), and Cumulative Layout Shift (CLS).

Improving loading time directly impacts user experience, conversion rates, and SEO rankings.

## Syntaxe et exemples

### Resource Loading Strategies

\`\`\`html
<!-- Preconnect - establish early connections -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch - proactively load resources -->
<link rel="prefetch" href="/assets/bundle.js">
\`\`\`

### Angular Lazy Loading

\`\`\`typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes')
      .then(m => m.adminRoutes),
  }
];
\`\`\`

### Service Worker Caching

\`\`\`json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "resources": {
        "files": ["/assets/**", "/images/**"]
      }
    }
  ]
}
\`\`\`

## Bonnes pratiques

- **Minimize TTFB**: Use CDN caching and edge computing to reduce below 200ms.
- **Optimize Critical Rendering Path**: Inline critical CSS, defer non-critical CSS.
- **Image Optimization**: Use WebP/AVIF formats and NgOptimizedImage.
- **Code Splitting**: Break JavaScript into smaller chunks.
- **Compression**: Enable gzip or Brotli on the server.

## Pieges courants

- **Render-Blocking Resources**: Loading CSS/JS synchronously blocks rendering.
- **Unoptimized Images**: Serving images without compression.
- **Too Many Requests**: Each HTTP request adds overhead.
- **Not Using CDN**: Single server location increases latency.

---
Sources:
- https://web.dev/articles/optimizing-content-efficiency
- https://developer.chrome.com/docs/lighthouse`},
        {
          id: 'perf-7',
          question: 'Lazy loading',
          answer: "Ne charger les ressources que lorsqu'elles sont nécessaires.\n\n**Images** : chargement au scroll via `loading='lazy'` ou `Intersection Observer API`. **Frontend** : lazy loading de routes (modules chargés à la navigation). **Backend/Hibernate** : associations chargées à l'accès, pas en bloc.\n\nGain : bande passante économisée côté client, charge serveur et mémoire réduites. Contrepartie : gérer les données non chargées (ex : `LazyInitializationException` hors session en `Hibernate`).",
        
          deepDive: `# Lazy Loading

## Quest-ce que cest

Lazy loading delays the initialization or loading of an object, resource, or content until it is actually needed. In web development, this means deferring the loading of non-critical resources until required, reducing initial load time and bandwidth consumption.

## Syntaxe et exemples

### Angular Route-Based Lazy Loading

\`\`\`typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'questions',
    loadComponent: () => import('./questions/questions.component')
      .then(m => m.QuestionsComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes')
      .then(m => m.adminRoutes)
  }
];
\`\`\`

### Intersection Observer for Content

\`\`\`typescript
import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appLazyShow]',
  standalone: true
})
export class LazyShowDirective implements OnInit, OnDestroy {
  @Output() visible = new EventEmitter<void>();
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.visible.emit();
        this.observer?.disconnect();
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
\`\`\`

### Image Lazy Loading

\`\`\`typescript
@Directive({
  selector: '[appLazyLoadImage]',
  standalone: true
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const src = this.el.nativeElement.getAttribute('data-src');
        if (src) {
          this.el.nativeElement.src = src;
        }
        this.observer?.disconnect();
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
\`\`\`

## Bonnes pratiques

- **Route-Based as Primary Strategy**: Use Angular router lazy loading for automatic code splitting.
- **Feature Modules**: Group related components into lazy-loaded feature modules.
- **Preloading Strategies**: Use Angular PreloadAllModules for preload during idle time.
- **Skeleton Loaders**: Show skeleton loaders while lazy content loads.

## Pieges courants

- **Too Many Small Chunks**: Excessive code splitting creates many small bundles with overhead.
- **Layout Shift**: Reserve space to prevent Cumulative Layout Shift when lazy content loads.
- **Lazy Loading Above-the-Fold Content**: Never lazy load critical content visible on initial render.

---
Sources:
- https://angular.io/guide/lazy-loading-ngmodules
- https://web.dev/articles/browser-level-image-lazy-loading`},
      ],
    },
  ],
};