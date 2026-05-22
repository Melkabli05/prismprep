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
        
          deepDive: `# Performance d'une Application Java

## Qu'est-ce que c'est ?

L'optimisation des performances d'une application Java repose sur la compréhension de trois piliers : **l'algorithmique** (la plus impactante), **la gestion mémoire/Garbage Collection**, et **l'exécution JVM (JIT)**. Contrairement à une idée reçue, la JVM moderne est extrêmement performante — le goulot d'étranglement est presque toujours le code applicatif ou la base de données.

Le mantra : **mesurer avant d'optimiser**. L'intuition humaine est très mauvaise pour identifier les vrais goulots d'étranglement.

## Concept détaillé

### 1. Algorithmique (le plus important)

Un algorithme O(n²) ne sera jamais compensé par une JVM plus rapide ou plus de RAM. Changer un algorithme de O(n²) à O(n log n) est le levier le plus puissant.

**Exemples concrets :**
- Recherche dans une \`List\` linéaire → remplacer par \`HashSet\` (O(1)).
- Boucles imbriquées → remplacer par une \`Map\` de lookup.
- Parsing CSV avec String.split() → utiliser un parser optimisé (OpenCSV).

### 2. Gestion mémoire et Garbage Collection

La JVM divise le heap en générations :
- **Young Generation** : objets récemment alloués. GC mineur (rapide).
- **Old Generation** : objets qui ont survécu à plusieurs GC. GC majeur (plus lent).
- **Metaspace** : métadonnées de classe (remplace PermGen depuis Java 8).

**Algorithmes de GC :**
- **G1GC (Java 9+ par défaut)** : équilibre latence/throughput. Partitionne le heap en régions.
- **ZGC (Java 15+)** : temps de pause < 10ms, pour très grands heaps (To Go+).
- **Shenandoah** : pauses faibles, concurrent evacuation.
- **Parallel GC** : throughput maximal, pour les batchs où la latence n'est pas critique.

### 3. JIT Compilation

La JVM compile les méthodes « chaudes » (hot spots) en code natif pendant l'exécution. Les performances s'améliorent avec le temps d'exécution — c'est le **warm-up**.

- **Interprétation** : au début, le bytecode est interprété (lent).
- **C1 (Client)** : compilation rapide, optimisations légères.
- **C2 (Server)** : compilation lourde, optimisations maximales (après ~10 000 invocations).
- **Tiered compilation** : combine C1 et C2 pour équilibrer démarrage et performances à long terme.

## Bonnes pratiques

1. **Algorithmique d'abord** : avant d'optimiser le GC ou la JVM, vérifier la complexité des algorithmes.
2. **Éviter les allocations inutiles** : String + dans les boucles → StringBuilder. Boxing int → Integer dans les collections.
3. **Fermer les ressources** : try-with-resources pour les flux, connexions, fichiers.
4. **Connection pooling** : HikariCP pour les connexions BDD. Ne pas créer de connexion par requête.
5. **Batch processing** : réduire les appels BDD avec des batchs (saveAll, JDBC batch).
6. **Indexation BDD** : analyser les requêtes lentes avec EXPLAIN ANALYZE, créer les index manquants.
7. **Cache** : Caffeine pour les données fréquemment lues (mise en cache locale).

## Pièges courants

1. **Optimiser sans mesurer** : passer 2 heures à optimiser une méthode qui ne représente que 0.1% du temps CPU.
2. **Négliger le warm-up** : mesurer les performances dès les premières secondes = mesurer du code interprété, pas compilé.
3. **Gros heap** : plus de RAM = GC plus long. Préférer de petits heaps bien dimensionnés.
4. **String intern** : \`String.intern()\` peut créer des fuites de mémoire dans la metaspace.
5. **Stream parallèles** : \`parallelStream()\` peut être plus lent qu'un stream séquentiel sur de petites collections.

Source : [Baeldung — JVM Performance Tuning](https://www.baeldung.com/jvm-performance-tuning)`},
        {
          id: 'perf-2',
          question: 'Traitement asynchrone',
          answer: "Les opérations longues (envoi d'emails, génération de rapports, appels API externes) ne doivent pas bloquer la requête HTTP.\n\nSolutions : **file de messages** (`RabbitMQ`, `Kafka`) — le producteur poste un message, le consommateur traite en arrière-plan. **`@Async`** Spring — exécution dans un thread pool séparé. **CompletableFuture** — programmation asynchrone Java.\n\nL'utilisateur reçoit une réponse immédiate (« Traitement en cours ») et est notifié quand c'est terminé. __Règle : tout ce qui prend plus de 200ms devrait être asynchrone.__",
          code: '@Async\npublic CompletableFuture<Report> generateReport(Long id) {\n    // Traitement long en arrière-plan\n    return CompletableFuture.completedFuture(report);\n}',
          language: 'java',
        
          deepDive: `# Traitement Asynchrone

## Qu'est-ce que c'est ?

Le **traitement asynchrone** permet d'exécuter des opérations sans bloquer le thread appelant. Dans une application web, l'objectif est de ne pas laisser l'utilisateur attendre pendant qu'un traitement long (envoi d'email, génération PDF, appel API externe) s'exécute. L'utilisateur reçoit une réponse immédiate (« Traitement en cours ») et est notifié quand c'est terminé.

Règle empirique : **tout ce qui prend plus de 200ms devrait être asynchrone**.

## Concept détaillé

### Mécanismes en Java

**1. Thread et ExecutorService**
- Création de threads manuelle (déconseillée — coûteuse).
- Utilisation d'un pool de threads (ExecutorService) pour limiter le nombre de threads concurrents.
- \`Executors.newFixedThreadPool(10)\` = 10 threads partagés.

**2. CompletableFuture (Java 8+)**
API fonctionnelle pour composer des opérations asynchrones :
\`\`\`java
CompletableFuture
  .supplyAsync(() -> service.callAPI())
  .thenApply(this::processResult)
  .exceptionally(this::handleError)
  .thenAccept(this::displayResult);
\`\`\`
- \`supplyAsync\` : exécute dans le pool commun (ForkJoinPool).
- \`thenApply\` : transforme le résultat (non bloquant).
- \`thenAccept\` : consomme le résultat final.
- \`exceptionally\` : gestion d'erreur.

**3. Reactive Streams (Project Reactor, RxJava)**
Chaînage non-bloquant avec backpressure :
\`\`\`java
Flux.from(api.getEvents())
  .filter(e -> e.isValid())
  .flatMap(this::processEvent)
  .subscribe(this::reply);
\`\`\`

### Patterns d'asynchronisme

| Pattern | Threads | Communication | Backpressure | Apprentissage |
|---------|---------|--------------|-------------|---------------|
| Callback | Un seul | Fonctions | Non | Facile (callback hell) |
| Future/Promise | Pool | Valeur future | Non | Modéré |
| Reactive Streams | Pool | Flux events | Oui | Difficile |
| Virtual Threads (Java 21+) | Milliers | Thread bloqué | Non | Très facile |

### Virtual Threads (Java 21+)

Les **virtual threads** (Project Loom) sont des threads légers gérés par la JVM (pas par l'OS). On peut en créer des millions. Le code s'écrit de manière synchrone (simple), mais la JVM suspend automatiquement un virtual thread quand il fait une opération bloquante (I/O, sleep, lock) et en exécute un autre.

\`\`\`java
// Java 21 — pas de pool, pas de CompletableFuture
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> service.callAPI());
    // Chaque appel = un nouveau virtual thread, quasi gratuit
}
\`\`\`

## Bonnes pratiques

1. **Définir des timeouts** : sans timeout, un appel asynchrone peut bloquer indéfiniment.
2. **Pool sizing** : \`N_threads = N_CPU * (1 + W/C)\` où W = wait time, C = compute time.
3. **Propager le contexte** : trace ID, utilisateur courant → passer via MDC ou Context.
4. **Gérer les erreurs** : \`exceptionally\` ou \`onErrorResume\` pour les flux réactifs.
5. **Backpressure** : le producteur ne doit pas submerger le consommateur.
6. **Monitorer** : taille de la file d'attente, rejets, temps d'exécution.

## Pièges courants

1. **Callback hell** : imbrication de callbacks → code illisible. Utiliser CompletableFuture ou virtual threads.
2. **Pool non dimensionné** : trop de threads = contention CPU + mémoire. Trop peu = goulot.
3. **Ignorer le context classloader** : perte du classloader dans les callbacks → ClassNotFoundException.
4. **Exceptions silencieuses** : une exception dans un CompletableFuture sans \`exceptionally\` est perdue.
5. **Virtual threads et synchronized** : bloquer un virtual thread sur \`synchronized\` = bloquer le thread porteur (pinning).

Source : [Baeldung — Asynchronous Programming in Java](https://www.baeldung.com/java-async)`},
        {
          id: 'perf-3',
          question: 'Profiling et métriques',
          answer: "**APM** (Application Performance Monitoring) : `New Relic`, `Datadog`, `AppDynamics` — vue d'ensemble du temps de réponse, throughput, taux d'erreur.\n\n**JVM profiling** : `Java Flight Recorder` (production-safe), `JVisualVM` (dev), `YourKit` — CPU hotspots, allocation mémoire, deadlocks.\n\n**Métriques clés** : **P50/P95/P99** de latence (pas juste la moyenne !), throughput (req/s), taux d'erreur, utilisation CPU/mémoire, temps GC.\n\n__Ce qui n'est pas mesuré n'est pas optimisé__. Les percentiles révèlent les problèmes que la moyenne cachée.",
        
          deepDive: `# Profiling et Métriques

## Qu'est-ce que c'est ?

Le **profiling** est l'analyse dynamique d'un programme pour identifier les goulots d'étranglement (bottlenecks). Les **métriques** sont les indicateurs quantitatifs qui permettent de surveiller la santé et les performances en continu.

Objectif : répondre à la question « où va le temps ? » — puis concentrer les efforts d'optimisation là où ils auront le plus d'impact.

## Concept détaillé

### Types de profiling

**CPU Profiling** : identifie les méthodes qui consomment le plus de temps CPU. Deux approches :
- **Sampling** : la JVM est interrogée périodiquement (toutes les X µs) pour savoir quelle méthode est exécutée. Faible overhead (< 2%), bon pour trouver les hot spots.
- **Instrumentation** : du code de mesure est injecté dans chaque méthode. Précis mais overhead élevé (10-50%). Réservé aux diagnostics ciblés.

**Memory Profiling** : analyse de l'allocation mémoire, détection des fuites.
- **Heap dump** : capture de tout le heap à un instant T → analyse avec Eclipse MAT ou VisualVM.
- **Allocation recording** : trace les allocations d'objets (qui alloue quoi, où).

**Thread Profiling** : détection des deadlocks, des threads bloqués, de la contention sur les locks.

### Outils Java

| Outil | Type | Overhead | Usage |
|-------|------|---------|-------|
| **JVisualVM** | CPU/Heap/Thread | Faible | Dev (sur demande) |
| **Java Flight Recorder (JFR)** | CPU/Heap/IO/Thread | < 2% | Production (continu) |
| **async-profiler** | CPU/Allocation | < 1% | Linux dev/prod |
| **Eclipse MAT** | Heap dump analysis | N/A | Post-mortem |
| **jcmd** | Diagnostic intégré | Faible | CLI |
| **YourKit** | CPU/Memory/Thread | 1-3% | Dev/Stage |

### Métriques clés

**RED Method (pour les services) :**
- **Rate** : requêtes par seconde (débit).
- **Errors** : taux d'erreur (5xx, timeouts, exceptions).
- **Duration** : latence (P50, P95, P99).

**USE Method (pour les ressources) :**
- **Utilization** : taux d'occupation (CPU, mémoire, disque, réseau).
- **Saturation** : degré de surcharge (file d'attente, swapping).
- **Errors** : erreurs (I/O errors, packet drops).

## Outillage cloud

- **Datadog / New Relic / AppDynamics** : APM tout-en-un (traces, métriques, logs). Auto-instrumentation.
- **Prometheus + Grafana** : stack open-source. Métriques collectées, dashboards, alertes.
- **OpenTelemetry** : standard pour la collecte de traces et métriques (vendor-neutral).

## Bonnes pratiques

1. **Mesurer en conditions réelles** : les tests en dev ne reflètent pas la production (données, charge, réseau).
2. **Warm-up JVM** : laisser la JVM chauffer 5-10 minutes avant de mesurer (JIT compilation).
3. **Percentiles, pas moyennes** : la moyenne latence de 100ms cache que 5% des requêtes prennent 5s.
4. **Profiler en production** : JFR est conçu pour ça (overhead < 2%). Les vrais problèmes n'apparaissent qu'en prod.
5. **Échantillonnage** : profiler 1% du trafic en production donne des données représentatives sans impact.
6. **Corréler les métriques** : une CPU haute peut être causée par du GC, pas par le code applicatif.

## Pièges courants

1. **Micro-optimiser sans profiling** : optimiser une méthode qui ne représente que 0.1% du temps CPU.
2. **JFR non activé** : sans JFR, un problème en production nécessite de reproduire hors production (difficile).
3. **Moyennes trompeuses** : une latence moyenne de 200ms peut cacher 10% de requêtes à 5 secondes.
4. **Effet Hawthorne** : le profiler lui-même modifie les performances (surtout l'instrumentation).
5. **Ignorer le warm-up** : mesurer sur une JVM qui démarre → résultats faussés par l'interprétation.

Source : [Netflix Technology Blog — Profiling](https://netflixtechblog.com/)`},
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
        
          deepDive: `# Cache Distribué

## Qu'est-ce que c'est ?

Un **cache distribué** est une couche de stockage en mémoire répartie sur plusieurs serveurs (cluster), permettant à toutes les instances d'une application de partager les mêmes données en cache. Contrairement au cache local (chaque instance a sa propre copie), le cache distribué garantit la **cohérence** entre instances et évite la duplication.

Un cache distribué est indispensable dès qu'une application a **plusieurs instances** et que des données fréquemment lues doivent être accessibles avec une latence < 1ms.

## Concept détaillé

### Cache local vs distribué

| Critère | Cache Local (Caffeine) | Cache Distribué (Redis) |
|---------|----------------------|------------------------|
| Latence | Nanosecondes | Microsecondes (réseau) |
| Cohérence | N/A (une seule JVM) | Garantie (cluster) |
| Taille maximale | RAM de la JVM | RAM du cluster |
| Partage entre instances | Non | Oui |
| Persistance | Non | Oui (optionnel) |
| Complexité | Aucune | Faible à modérée |

**Bon compromis :** cache en deux niveaux (L1 = local, L2 = Redis). La lecture vérifie d'abord le cache local ; en cas de miss, elle interroge Redis. Réduit la latence et la charge réseau.

### Topologies de cache distribué

- **Client-Server (Redis)** : un serveur central qui stocke toutes les données. Les clients se connectent et font des opérations clé-valeur. Simple et performant.
- **Peer-to-Peer (Hazelcast, Apache Ignite)** : chaque nœud de l'application participe au cache (données partitionnées entre les nœuds). Pas de point central, mais plus complexe.
- **Replicated** : chaque nœud a une copie complète des données. Rapide en lecture mais coûteux en écriture (propagation à tous les nœuds).

### Stratégies d'éviction

- **LRU (Least Recently Used)** : supprime les données les moins récemment accédées.
- **LFU (Least Frequently Used)** : supprime les données les moins fréquemment accédées.
- **TTL (Time To Live)** : expiration automatique après un délai fixe (la plus courante).
- **Size-based** : éviction quand la taille totale dépasse un seuil.

### Problème du Cache Stampede (Thundering Herd)

Quand une clé populaire expire et que 1000 requêtes simultanées tentent de la re-générer → 1000 appels BDD en parallèle. Solutions :
- **Lock** : un seul thread régénère la clé, les autres attendent.
- **Probabilistic Early Expiration** : rafraîchir la clé avant son expiration avec une probabilité.
- **Mise en cache de la valeur périmée** : servir l'ancienne valeur pendant la régénération (stale-while-revalidate).

## Bonnes pratiques

1. **Éviter la duplication** : ne pas mettre en cache distribué ce qui est déjà dans le cache local (sauf si nécessaire).
2. **TTL adapté** : pas de TTL = données potentiellement infinies en mémoire. Toujours un TTL, même long.
3. **Pré-chauffage** : au démarrage de l'application, charger les données fréquentes dans le cache.
4. **Monitoring du hit rate** : un hit rate < 85% indique un problème (mauvaise stratégie de cache).
5. **Fallback** : si Redis est indisponible, dégrader (lire la BDD) plutôt que planter.
6. **Sérialisation efficace** : Protobuf, Kryo ou Java serialization optimisée plutot que JSON.

## Pièges courants

1. **Stampede non géré** : une clé populaire expire → 500 requêtes frappent la BDD → BDD saturée.
2. **Trop de données en cache** : dépassement de la mémoire Redis → éviction massive → perte de données utiles.
3. **Clés sans TTL** : une clé qui n'est jamais lue reste en mémoire éternellement → fuite mémoire.
4. **Sérialisation Java par défaut** : très lente et verbeuse. Préférer Kryo ou Protobuf.
5. **Ignorer la fragmentation réseau** : Redis en cluster peut perdre des données si un nœud tombe (sans persistance).

Source : [Baeldung — Caching in Java](https://www.baeldung.com/java-caching)`},
        {
          id: 'perf-5',
          question: 'Load balancing',
          answer: "Répartir le trafic entre **plusieurs instances** d'une application pour augmenter la capacité et la disponibilité.\n\nAlgorithmes : **Round Robin** (rotation équitable), **Least Connections** (vers l'instance la moins chargée), **IP Hash** (même client → même instance, utile pour les sessions).\n\nLayers : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus intelligent).\n\nOutils : `Nginx`, `HAProxy`, cloud load balancers (`ALB` AWS). __Load balancer + health checks = haute disponibilité.__",
        
          deepDive: `# Load Balancing

## Qu'est-ce que c'est ?

Le **load balancing** (répartition de charge) distribue les requêtes entrantes entre plusieurs serveurs backend pour optimiser l'utilisation des ressources, maximiser le débit, minimiser le temps de réponse, et assurer la disponibilité. C'est un composant essentiel de toute architecture scalable.

Un load balancer agit comme **point d'entrée unique** : le client ne voit qu'une seule IP, mais le load balancer répartit le trafic entre N serveurs.

## Concept détaillé

### L4 vs L7

**Couche 4 (TCP/UDP)** : le load balancer regarde l'IP et le port de destination, et forwarde le paquet sans l'inspecter. Très rapide (pas de parsing applicatif). Utilisé pour TCP pur (gRPC, WebSocket, BDD).

**Couche 7 (HTTP/HTTPS)** : le load balancer inspecte la requête HTTP (URL, headers, cookies). Permet le routage intelligent, la terminaison SSL, la réécriture d'URL.

### Algorithmes

- **Round Robin** : rotation simple, adapté à des serveurs homogènes.
- **Least Connections** : vers le serveur ayant le moins de connexions actives. Bon pour des temps de traitement variables.
- **Weighted Round Robin** : poids pour les serveurs hétérogènes (plus gros serveur = plus de trafic).
- **IP Hash** : même client = même serveur (sticky sessions).
- **Least Response Time** : vers le serveur répondant le plus vite.

### Health Checks

Le load balancer vérifie périodiquement la santé des serveurs :
- \`health_check { interval: 10s, timeout: 3s, unhealthy_threshold: 3 }\`
- Si un serveur échoue au health check, il est retiré de la rotation.
- Quand il redevient sain (2 succès consécutifs), il est réintégré.

## Bonnes pratiques

1. **Toujours configurer des health checks** : port TCP + URL HTTP spécifique (\`/health\`).
2. **Multi-AZ** : déployer le load balancer et les serveurs sur plusieurs zones de disponibilité.
3. **Graceful shutdown** : drainer les connexions existantes avant d'arrêter un serveur.
4. **Sticky sessions avec parcimonie** : préférer un store de sessions partagé (Redis) plutôt que des sessions locales.
5. **Monitoring** : métriques clés — nombre de requêtes, latence, erreurs par serveur backend.

## Pièges courants

1. **Point de défaillance unique** : un seul load balancer sans redondance. Mettre deux instances en actif-passif.
2. **Health check trop permissif** : vérifier \`/health.txt\` qui retourne toujours 200 ne détecte pas une BDD morte.
3. **Warm-up ignoré** : un nouveau serveur mis en rotation immédiatement peut être lent (JVM à chauffer, caches à remplir).
4. **SSL termination partout** : attention au coût CPU du handshake TLS sur chaque connexion.

Source : [NGINX — Load Balancing](https://www.nginx.com/solutions/load-balancing/)`},
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
        
          deepDive: `# Temps de Chargement Web

## Qu'est-ce que c'est ?

Le **temps de chargement** est la durée entre le moment où un utilisateur clique sur un lien et celui où la page est entièrement interactive. Au-delà de 3 secondes, plus de 50% des utilisateurs abandonnent. Google utilise les Core Web Vitals comme facteur de classement SEO.

L'optimisation du temps de chargement combine des améliorations **frontend** (images, CSS/JS, rendu) et **backend** (serveur, CDN, cache).

## Concept détaillé

### Métriques clés (Core Web Vitals +)

- **TTFB (Time to First Byte)** : temps entre la requête et la réception du premier octet. Cible : < 200ms. Impacté par la latence réseau, le serveur, les APIs.
- **FCP (First Contentful Paint)** : premier affichage de contenu (texte, image). Cible : < 1.8s. Impacté par le CSS critique et le rendu serveur.
- **LCP (Largest Contentful Paint)** : affichage du contenu principal. Cible : < 2.5s. Impacté par les images et le rendu bloqueur.
- **INP (Interaction to Next Paint)** : réactivité aux interactions utilisateur. Cible : < 200ms. Impacté par le JavaScript long.
- **CLS (Cumulative Layout Shift)** : stabilité visuelle (pas de sauts de mise en page). Cible : < 0.1.

### Stratégies d'optimisation

**Réseau :**
- CDN pour les assets statiques (CloudFront, Cloudflare).
- HTTP/2 ou HTTP/3 (multiplexage, server push).
- Compression Brotli (meilleure que gzip).
- Preconnect / Prefetch / Preload des ressources critiques.

**Rendu :**
- **Critical CSS** : le CSS nécessaire au premier écran est inline dans le HTML. Le reste est chargé de manière asynchrone.
- **Lazy loading** : images et composants hors écran chargés au scroll.
- **Code splitting** : le JavaScript est divisé en chunks chargés à la demande.
- **Server-Side Rendering (SSR)** : générer le HTML initial côté serveur pour un FCP plus rapide.

**Actifs :**
- Images WebP/AVIF avec compression adaptative.
- Responsive images (\`srcset\` avec différentes tailles).
- Polices optimisées (WOFF2, \`font-display: swap\` pour éviter le FOIT).

## Comparaison des techniques

| Technique | Impact principal | Effort | Complexité |
|-----------|----------------|--------|------------|
| CDN | TTFB, FCP | Faible | Faible |
| Compression Brotli | TTFB, Taille page | Faible | Faible |
| Images WebP | LCP, Taille page | Moyen | Faible |
| Lazy loading | LCP, Taille initiale | Faible | Faible |
| Code splitting | FCP, TTI | Moyen | Moyenne |
| SSR/SSG | FCP, LCP | Élevé | Élevée |
| Service Worker (PWA) | Re-visites, offline | Moyen | Moyenne |

## Bonnes pratiques

1. **Mesurer avant d'optimiser** : Lighthouse, WebPageTest, Chrome DevTools pour identifier les vrais goulots.
2. **Mobile first** : tester sur une connexion 3G lente (simulée dans DevTools).
3. **Budgets de performance** : définir des seuils (ex : TTFB < 200ms, LCP < 2.5s, bundle JS < 200KB).
4. **Preload les ressources critiques** : \`rel="preload"\` pour les polices, le hero image, le CSS critique.
5. **Minimiser le JavaScript bloqueur** : \`async\` ou \`defer\` sur les scripts non critiques.
6. **Service Worker pour le cache** : les PWA peuvent servir une coquille d'app (app shell) instantanément.

## Pièges courants

1. **Images non optimisées** : servir une image de 5000px pour une vignette de 200px. Utiliser des responsive images.
2. **Trop de requêtes HTTP** : chaque requête a un overhead (DNS, TCP, TLS). Limiter à 20-30 requêtes.
3. **CSS/JS non minifiés** : des fichiers de 1Mo+ ralentissent le parsing.
4. **Pas de cache navigateur** : sans Cache-Control, le navigateur re-télécharge tout à chaque visite.
5. **Police bloquante** : une police qui ne se charge pas bloque l'affichage du texte (FOIT). Utiliser \`font-display: swap\`.

Source : [web.dev — Performance](https://web.dev/learn-core-web-vitals/)`},
        {
          id: 'perf-7',
          question: 'Lazy loading',
          answer: "Ne charger les ressources que lorsqu'elles sont nécessaires.\n\n**Images** : chargement au scroll via `loading='lazy'` ou `Intersection Observer API`. **Frontend** : lazy loading de routes (modules chargés à la navigation). **Backend/Hibernate** : associations chargées à l'accès, pas en bloc.\n\nGain : bande passante économisée côté client, charge serveur et mémoire réduites. Contrepartie : gérer les données non chargées (ex : `LazyInitializationException` hors session en `Hibernate`).",
        
          deepDive: `# Lazy Loading

## Qu'est-ce que c'est ?

Le **lazy loading** (chargement paresseux) est un pattern qui retarde le chargement d'une ressource jusqu'au moment où elle est réellement nécessaire. Au lieu de tout charger au démarrage, on ne charge que ce qui est visible/utilisé immédiatement, et on charge le reste à la demande.

C'est un des leviers les plus efficaces pour améliorer le temps de chargement initial : on réduit la quantité de données à transférer, parser et exécuter avant l'affichage.

## Concept détaillé

### Applications en web

**Lazy loading de routes/modules (Angular) :**
Le routeur Angular charge le JavaScript d'un module seulement quand l'utilisateur navigue vers cette route. La bundle initiale est plus petite, le chargement initial plus rapide.
\`\`\`typescript
const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent) }
];
\`\`\`

**Lazy loading d'images :**
Les images hors écran ne sont téléchargées que lorsque l'utilisateur s'approche. Utilise \`loading="lazy"\` (natif HTML) ou l'Intersection Observer API.
\`\`\`html
<img src="photo.jpg" loading="lazy" alt="...">
\`\`\`

**Lazy loading de composants (Angular Defer) :**
Angular 17+ propose \`@defer\` pour charger un composant dans le template seulement quand une condition est remplie (viewport, interaction, idle).
\`\`\`html
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <div>Chargement...</div>
}
\`\`\`

### Applications en backend

**Hibernate/JPA lazy loading :**
Les associations entre entités ne sont chargées que lorsqu'on y accède. Ex : \`@OneToMany(fetch = FetchType.LAZY)\`. Attention à la \`LazyInitializationException\` hors session.

**Streams vs Collections :**
\`\`\`java
// Eager : toute la liste en mémoire
List<Order> orders = orderRepo.findAll();

// Lazy : les données arrivent au fur et à mesure (stream BDD)
orders.stream()
    .filter(o -> o.isActive())
    .map(Order::getTotal)
    .forEach(this::process);
\`\`\`

## Comparaison Eager vs Lazy

| Aspect | Eager Loading | Lazy Loading |
|--------|-------------|--------------|
| Temps de chargement initial | Plus long | Plus court |
| Ressources chargées | Tout, même l'inutile | Seulement le nécessaire |
| Expérience utilisateur | Attente initiale longue | Rapide, chargements progressifs |
| Complexité | Faible | Modérée (états de chargement) |
| Contrepartie | Gaspillage de bande passante | Layout shift possible |

## Bonnes pratiques

1. **Lazy loading des routes en priorité** : c'est l'impact le plus important sur la bundle initiale.
2. **Images : lazy loading natif** : \`loading="lazy"\` sur les images hors écran. Réservation d'espace avec \`aspect-ratio\` pour éviter le CLS.
3. **Angular @defer pour les composants lourds** : tableaux complexes, graphiques, éditeurs de texte.
4. **Squelettes de chargement (skeletons)** : afficher une structure vide pendant le lazy loading pour rassurer l'utilisateur.
5. **Preload stratégique** : pré-charger les bundles les plus probables après le chargement initial (Angular PreloadAllModules).

## Pièges courants

1. **Lazy loading du contenu au-dessus de la ligne de flottaison** : ne pas lazy loader l'image principale (hero image) — elle doit être chargée immédiatement.
2. **Layout shift** : sans réservation d'espace, le lazy loading fait sauter la mise en page (CLS élevé).
3. **Trop de petits chunks** : diviser le code en 500 micro-chunks crée plus de requêtes HTTP, ce qui peut être contre-productif.
4. **LazyInitializationException (Hibernate)** : accéder à une association LAZY hors session → exception. Solution : \`JOIN FETCH\` ou \`@EntityGraph\`.
5. **Délai de chargement sans feedback** : l'utilisateur clique sur un bouton et rien ne se passe → frustration. Toujours montrer un état de chargement.

Source : [Angular — Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)`},
      ],
    },
  ],
};