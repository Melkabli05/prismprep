import type { InterviewCategory } from '@core/models/interview.models';

export const systemDesignCategory: InterviewCategory = {
  id: 'system-design',
  title: 'System Design',
  color: 'background: #DB2777; color: white',
  description: 'Conception de systèmes, scalabilité, cas pratiques',
  sections: [
    {
      id: 'sd-principes',
      title: 'Principes de Conception',
      questions: [
        {
          id: 'sd-1',
          question: 'Scaling horizontal vs vertical : différences et compromis ?',
          answer: '**Vertical** (*scale up*) : augmenter les ressources d\'un serveur (CPU, RAM). Simple, pas de changement d\'architecture, mais **limite physique** et point de défaillance unique.\n\n**Horizontal** (*scale out*) : ajouter des serveurs. Pas de limite théorique, résilience (un serveur tombe, les autrès prennent le relais), mais **complexité** : load balancing, cohérence des données, sessions distribuées.\n\n__Le vertical a ses limites — le horizontal est la seule voie vers l\'échelle.__ En pratique : on commence vertical, puis on passe horizontal quand ça ne suffit plus. Le cloud facilite le horizontal avec l\'auto-scaling.',
        
          deepDive: `# Scaling Horizontal vs Vertical

## Qu'est-ce que c'est ?

Le **scaling** (passage à l'échelle) est la capacité d'un système à gérer une charge croissante. Deux stratégies fondamentales existent : le scaling vertical (plus de puissance sur une machine) et le scaling horizontal (plus de machines).

Le choix entre les deux détermine la **disponibilité**, le **coût**, la **complexité** et les **limites physiques** de votre architecture.

## Concept détaillé

**Scaling Vertical (Scale Up)** : augmenter les ressources d'un serveur existant.
- CPU : passer de 4 à 16 cœurs.
- RAM : passer de 8Go à 64Go.
- Disque : passer de SSD à NVMe.
- Réseau : passer de 1GbE à 10GbE.

Avantages : simplicité (pas de changement d'architecture), pas de latence réseau entre services.
Limite : il y a toujours un plafond physique (la machine la plus grosse disponible).

**Scaling Horizontal (Scale Out)** : ajouter des serveurs supplémentaires.
- Plus d'instances derrière un load balancer.
- Données partitionnées sur plusieurs nœuds (sharding).
- Traitement parallélisé.

Avantages : pas de limite théorique, résilience intégrée, coût linéaire.
Contrainte : complexité réseau, cohérence des données, coordination.

## Schéma / Architecture

\`\`\`
Scaling Vertical :
     ┌──────────────┐
     │  1 serveur    │
     │  CPU: 4 cœurs │ → Remplacer par → │ CPU: 64 cœurs │
     │  RAM: 8 Go    │                   │ RAM: 256 Go   │
     └──────────────┘                   └───────────────┘
     ↑ Limité par le hardware max          ↑ Point de défaillance unique

Scaling Horizontal :
          ┌──────────────┐
          │ Load Balancer │
          └──────┬───────┘
            ┌────┼────┐
            ▼    ▼    ▼
        ┌────┐┌────┐┌────┐
        │Srv1││Srv2││Srv3│
        └────┘└────┘└────┘
        ↑ Scaling infini      ↑ Résilient (panne d'un serveur)
\`\`\`

## Comparaison

| Critère | Vertical | Horizontal |
|---------|----------|------------|
| Complexité | Faible | Élevée |
| Limite maximale | Hardware max (ex: 24To RAM) | Théoriquement infinie |
| Coût | Exponentiel (tarification non linéaire) | Linéaire |
| Résilience | SPOF (un serveur = tout perdu) | Haute disponibilité |
| Latence inter-service | Nulle (local) | Réseau (~1-5ms) |
| Gestion des données | Centralisée, ACID facile | Distribuée, CAP à choisir |
| Maintenance | Fenêtre d'indisponibilité | Roulante (rolling update) |
| État (stateful) | Simple | Complexe (sessions distribuées) |

## Avantages et inconvénients

**Vertical - Avantages :** simplicité de mise en oeuvre, pas de changement architecturel, pas de latence réseau.
**Vertical - Inconvénients :** plafond physique, coût exponentiel, indisponibilité lors du redimensionnement, SPOF.

**Horizontal - Avantages :** extensibilité quasi illimitée, résilience native, coût prévisible, mises à jour sans interruption.
**Horizontal - Inconvénients :** complexité architecturale (répartition, cohérence, coordination), gestion d'état difficile, debugging distribué.

## Cas d'usage typiques

1. **Base de données PostgreSQL** : commence vertical (réplication primaire-read replica), passe à l'horizontal avec sharding ou Citus quand la verticale ne suffit plus.
2. **Application web en startup** : démarre en vertical (1 serveur), passe à l'horizontal quand le trafic le justifie.
3. **Cache Redis** : scaling vertical (plus de RAM sur un nœud). Le clustering horizontal Redis est complexe.
4. **Kubernetes** : scaling horizontal natif (HPA), scaling vertical via VPA pour les charges prévisibles.

## Bonnes pratiques

1. **Commencer vertical, penser horizontal** : évitez le sur-engineering au début, mais gardez une architecture qui peut évoluer.
2. **Stateless pour l'horizontal** : déporter l'état vers un store externe (Redis, BDD) rend le scaling horizontal trivial.
3. **Load balancer dès 2 serveurs** : anticipez la distribution de charge.
4. **Auto-scaling** : sur le cloud, configurez des groupes d'auto-scaling avec des métriques pertinentes.
5. **Sharding de BDD en dernier recours** : épuisez d'abord la réplication, le cache, l'indexation.
6. **Monitoring des goulots** : CPU, mémoire, E/S disque, réseau — chaque ressource peut saturer différemment.

## Pièges courants

1. **Scaling vertical sans limite** : continuer d'augmenter la RAM au lieu de penser à l'horizontal — on finit par payer très cher pour des machines hors norme.
2. **Session locale** : stocker les sessions HTTP en mémoire locale empêche le failover vers un autre serveur.
3. **Sous-estimer le coût de la distribution** : le réseautage, la sérialisation, la coordination Paxos/Raft ont un coût en performance.
4. **Ignorer le warm-up** : une nouvelle instance a besoin de temps pour chauffer ses caches avant d'être performante.
5. **Scaling précipité** : un problème de performance est souvent une requête SQL ou un algorithme inefficace, pas un besoin de scaling.

Source : [AWS — Scaling Horizontally vs Vertically](https://aws.amazon.com/compare/the-difference-between-horizontal-and-vertical-scaling/)`},
        {
          id: 'sd-2',
          question: 'Comment fonctionne le load balancing ?',
          answer: 'Le **load balancer** répartit le trafic entre plusieurs serveurs pour éviter la surcharge d\'un seul. Algorithmes : **Round Robin** (tour à tour), **Least Connections** (serveur le moins chargé), **IP Hash** (même client → même serveur, utile pour les sessions).\n\nTypes : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus flexible). Health checks réguliers : un serveur malade est retiré de la rotation.\n\n__Le load balancer est le point d\'entrée — il doit être hautement disponible__ (multi-AZ, DNS failover). Outils : `NGINX`, `HAProxy`, `AWS ALB`.',
        
          deepDive: `# Comment fonctionne le Load Balancing ?

## Qu'est-ce que c'est ?

Un **load balancer** (répartiteur de charge) distribue le trafic entrant entre plusieurs serveurs backend. Il agit comme un **répartiteur unique** qui masque la complexité du parc de serveurs derrière une seule adresse IP. Objectifs : maximiser le débit, minimiser la latence, assurer la disponibilité.

Sans load balancer, un serveur surchargé ralentit ou tombe, tandis qu'un autre serveur reste sous-utilisé. Le load balancer **uniformise la charge**.

## Concept détaillé

### Couche 4 (Transport — L4)
Fonctionne au niveau TCP/UDP. Il regarde l'IP source, l'IP destination, et le port. Il forwarde les paquets sans les inspecter. Très rapide (pas de parsing applicatif), mais ne peut pas router selon le contenu HTTP.

- Performant (quelques microsecondes de latence)
- Convient au trafic TCP pur (gRPC, WebSocket, bases de données)
- Exemples : AWS NLB, HAProxy en mode TCP

### Couche 7 (Application — L7)
Fonctionne au niveau HTTP/HTTPS. Il analyse les en-têtes, les URLs, les cookies. Plus lent mais beaucoup plus flexible.

- Routage par URL (\`/api/*\` vers le serveur API, \`/static/*\` vers le serveur de fichiers)
- Routage par en-tête (versioning d'API)
- Termination SSL, réécriture d'URL
- Exemples : AWS ALB, NGINX, Traefik

### Algorithmes de distribution

- **Round Robin** : tour à tour. Simple mais ignore la charge réelle.
- **Least Connections** : vers le serveur le moins occupé. Bon pour des durées de requêtes variables.
- **Weighted Round Robin** : poids différents selon la capacité du serveur.
- **IP Hash** : le même client va toujours au même serveur (sticky session).
- **Random** : simple, répartition statistiquement uniforme.

### Health Checks

Le load balancer interroge périodiquement chaque backend :
- **TCP** : vérifie qu'un port est ouvert.
- **HTTP** : vérifie qu'une URL retourne 200 OK.
- **Custom** : script qui teste la logique applicative.

Un serveur qui échoue N fois consécutives est retiré de la rotation (et réintégré après M succès).

## Schéma / Architecture

\`\`\`
                            ┌──────────────┐
                            │   Internet    │
                            └──────┬───────┘
                                   │
                            ┌──────▼───────┐
                            │ Load Balancer│ ← Point d'entrée unique
                            │  (L4 ou L7)  │
                            └──────┬───────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
               ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
               │ Server A│  │ Server B│  │ Server C│
               │ Instance│  │ Instance│  │ Instance│
               │   AZ 1  │  │   AZ 2  │  │   AZ 3  │
               └─────────┘  └─────────┘  └─────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                            ┌──────▼───────┐
                            │  Base de     │
                            │  données      │
                            │  (partagée)   │
                            └──────────────┘
\`\`\`

## Comparaison L4 vs L7

| Critère | L4 (Transport) | L7 (Application) |
|---------|---------------|-------------------|
| Niveau OSI | 4 (TCP/UDP) | 7 (HTTP/HTTPS) |
| Performance | Très élevée | Élevée (parsing) |
| Routage par URL | Impossible | Possible |
| Termination SSL | Non (TCP pass-through) | Oui |
| Sticky sessions | Par IP source | Cookie, header |
| Cas d'usage | gRPC, WebSocket, TCP pur | API REST, sites web |

## Avantages et inconvénients

**Avantages :**
- Disponibilité : si un serveur tombe, les autrès prennent le relais.
- Scalabilité : ajouter des serveurs sans changer l'URL publique.
- Sécurité : cache les serveurs internes, peut faire office de WAF.
- Flexibilité : mises à jour sans interruption (drain de connexions).

**Inconvénients :**
- Point de défaillance potentiel : le load balancer lui-même doit être hautement disponible (multi-AZ, actif-passif).
- Complexité : configuration, monitoring, certificats SSL.
- Latence : même minime, chaque saut réseau ajoute ~1-5ms.

## Cas d'usage typiques

1. **Architecture web scalable** : load balancer L7 (ALB) devant un groupe auto-scaling d'instances EC2.
2. **Microservices** : API Gateway (L7) route /users → service utilisateur, /orders → service commande.
3. **WebSockets** : load balancer L4 (NLB) pour des connexions WebSocket persistantes.
4. **Base de données** : load balancer TCP (HAProxy) devant des réplicas PostgreSQL en lecture.

## Bonnes pratiques

1. **Health checks précis** : vérifier un endpoint applicatif (pas juste le port TCP) pour détecter les serveurs en « congelé ».
2. **Drain de connexions** : avant d'arrêter un serveur, attendre que les requêtes en cours se terminent.
3. **Sticky sessions avec parcimonie** : les sessions collantes limitent l'équilibrage ; préférer un store de sessions centralisé (Redis).
4. **Multi-AZ** : déployer le load balancer sur plusieurs zones de disponibilité.
5. **Monitoring** : métriques clés — latence moyenne/P99, erreurs 5xx par backend, connexions actives.
6. **Circuit breaker** : au niveau applicatif, protéger le load balancer des défaillances en cascade.

## Pièges courants

1. **Single point of failure** : un seul load balancer sans redondance = point de défaillance unique.
2. **Health check trop permissif** : vérifier /health.txt ne détecte pas une base de données défaillante.
3. **Sticky sessions sans plan de failover** : si le serveur tombe, les sessions stockées localement sont perdues.
4. **SSL termination partout** : attention à la latence du handshake TLS sur chaque connexion.
5. **Warm-up ignoré** : un nouveau serveur mis en rotation immédiatement peut être lent (JVM à chauffer, caches à remplir).

Source : [NGINX — HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)`},
        {
          id: 'sd-3',
          question: 'Quelles stratégies de cache utiliser ?',
          answer: '**Cache côté client** : navigateur (headers `Cache-Control`, `ETag`), réduit les requêtes serveur. **Cache CDN** : contenu statique aux *edge locations*. **Cache applicatif** : `Redis`/`Memcached` pour les données fréquemment lues (sessions, résultats de requêtes).\n\n**Cache BDD** : query cache, buffer pool. Stratégies d\'invalidation : **TTL** (expiration automatique), **write-through** (écriture simultanée cache + BDD), **write-behind** (écriture différée), **cache-aside** (l\'app gère le cache manuellement).\n\n__Le problème n°1 du cache est l\'invalidation__ (« There are only two hard things in Computer Science: cache invalidation and naming things »). Définissez des TTL adaptés et invalidez explicitement sur les écritures.',
        
          deepDive: `# Stratégies de Cache

## Qu'est-ce que c'est ?

Le **cache** est une couche de stockage temporaire à haute vélocité (généralement en mémoire) qui conserve des données fréquemment accédées. L'objectif est de réduire la latence et la charge sur les systèmes sous-jacents (base de données, API externe). Un cache bien configuré peut réduire le temps de réponse de **centaines de millisecondes à quelques microsecondes**.

Le vrai défi n'est pas de mettre en cache, mais de **gérer l'invalidation** — « There are only two hard things in Computer Science: cache invalidation and naming things » (Phil Karlton).

## Concept détaillé

### Types de cache

**1. Cache local (In-Process)** : stocké dans la mémoire de l'application (ex : Caffeine, Guava Cache, Map). Ultra-rapide (nanosecondes) mais non partagé entre instances. Chaque serveur a sa propre copie.

**2. Cache distribué (Partagé)** : stocké dans un service externe (Redis, Memcached). Partagé entre tous les serveurs, mais ajoute ~1ms de latence réseau. Indispensable dès qu'il y a plus d'un serveur.

**3. CDN (Content Delivery Network)** : cache géographiquement distribué pour les assets statiques (images, CSS, JS). Proche de l'utilisateur final. Exemples : CloudFront, Cloudflare, Fastly.

### Stratégies d'invalidation

- **Cache-Aside** : l'application vérifie le cache avant la BDD. Elle met à jour le cache après une lecture, et invalide (supprime) après une écriture. La plus courante.
- **Write-Through** : l'écriture va simultanément au cache et à la BDD. Lecture toujours depuis le cache. Garantit la cohérence mais chaque écriture est plus lente.
- **Write-Behind** : l'écriture va d'abord au cache, puis est synchronisée asynchrone avec la BDD. Très performant mais risqué (perte de données si le cache tombe).
- **Refresh-Ahead** : le cache rafraîchit automatiquement une donnée avant qu'elle n'expire. Évite le cache miss mais plus complexe.

## Schéma / Architecture

\`\`\`
Cache-Aside :
    1. Lire(clé)               4. Mettre en cache
    ┌──────┐ ─────────────────► ┌──────┐ ◄───────────────────
    │ App  │                    │ Cache │                    │
    └──────┘ ◄───────────────── └──────┘                    │
        │ 2. Cache MISS              │                       │
        │                            │                       │
        ▼                            │                       │
    3. Lire BDD                      │                       │
    ┌──────┐                         │                       │
    │  DB  │◄────────────────────────┘                       │
    └──────┘                                                │
        │ 5. Écrire(clé, valeur)                            │
        └───────────────────────────────────────────────────┘

Write-Through :
    Écrire(clé) ──► Cache ──► BDD     (synchrone)
    Lire(clé)   ──► Cache              (toujours depuis le cache)

Write-Behind :
    Écrire(clé) ──► Cache ──[async]──► BDD   (écriture asynchrone)
\`\`\`

## Comparaison des stratégies

| Stratégie | Latence lecture | Latence écriture | Risque de perte | Complexité |
|-----------|----------------|-----------------|-----------------|------------|
| Cache-Aside | Faible (si hit) | Normale | Aucun (BDD source de vérité) | Faible |
| Write-Through | Très faible | Augmentée | Aucun | Faible |
| Write-Behind | Très faible | Très faible | Élevé (si panne cache) | Élevée |
| Refresh-Ahead | Très faible | Normale | Aucun | Élevée |

## Avantages et inconvénients

**Avantages :**
- Réduction drastique de la latence (cache hit : ~1-5ms vs BDD : ~10-100ms).
- Réduction de la charge sur la BDD où les API externes.
- Élasticité : absorbe les pics de trafic sans dimensionner la BDD pour le peak.
- Économies : moins d'instances BDD nécessaires.

**Inconvénients :**
- Complexité d'invalidation : données périmées si mal gérées.
- Coût mémoire : la RAM (surtout Redis) coûte cher.
- Stale data : inévitable avec un TTL, acceptable ou pas selon le contexte.
- Cache stampede : quand une clé populaire expire, toutes les requêtes frappent la source simultanément.

## Cas d'usage typiques

1. **Sessions utilisateur** : stocker les sessions HTTP dans Redis plutôt qu'en mémoire locale permet le failover entre serveurs.
2. **Catalogue produits** : les détails d'un produit (nom, prix, description) changent rarement — cache avec TTL de 5-15 minutes.
3. **Rate limiting** : compteurs Redis avec INCR+EXPIRE pour limiter le nombre de requêtes par utilisateur.
4. **Pages HTML pré-rendues** : cache serveur (Varnish) pour les pages publiques sans personnalisation.

## Bonnes pratiques

1. **Mesurer le hit rate** : un hit rate < 80% indique un problème (mauvaise clé, TTL trop court, données rarement accédées).
2. **TTL adapté à la fraîcheur requise** : données météo = 5 min, nom d'utilisateur = 1 heure, configuration = 24 heures.
3. **Éviter le cache stampede** : utiliser \`lock\` autour de la population du cache, ou TTL probabiliste.
4. **Clés avec préfixe** : éviter les collisions (\`user:123:profile\` plutôt que \`123\`).
5. **Sérialisation efficace** : Protobuf ou MessagePack plutôt que JSON pour de gros volumes.
6. **Prévoir le fallback** : si Redis est down, lire directement la BDD (dégradation, pas indisponibilité).

## Pièges courants

1. **TTL trop long** : données périmées affichées pendant des heures.
2. **Cache illimité** : sans politique d'éviction (LRU, LFU), la mémoire finit par saturer (OOM).
3. **Cache stampede non géré** : une clé populaire expire, 1000 requêtes simultanées vont en BDD et la font tomber.
4. **Sérialisation coûteuse** : passer d'un objet Java à JSON à chaque lecture/écriture ajoute une latence significative.
5. **Cacher des données volatiles** : un compteur de vues en temps réel ne doit pas avoir un TTL de 1 heure.
6. **Clés sans expiration** : une clé écrite mais jamais lue reste en mémoire indéfiniment.

Source : [Redis — Caching Strategies](https://redis.io/docs/manual/patterns/)`},
        {
          id: 'sd-4',
          question: 'Qu\'est-ce que le sharding de base de données ?',
          answer: 'Le **sharding** partitionne les données horizontalement across plusieurs serveurs (shards). Chaque shard contient un sous-ensemble des données. Stratégies de clé de sharding : **hash-based** (distribution uniforme mais range queries impossibles), **range-based** (requêtes par plage efficaces mais risque de hotspots).\n\nAvantage : **scale-out** de la BDD, chaque shard est plus petit = requêtes plus rapides. Inconvénients : **cross-shard queries** complexes, jointures impossibles entre shards, **rebalancing** coûteux quand on ajoute un shard.\n\n__Le sharding est la solution de dernier recours__ — essayez d\'abord la réplication, le partitionnement vertical, le cache. Sharder trop tôt ajoute une complexité énorme.',
        
          deepDive: `# Qu'est-ce que le Sharding de Base de Données ?

## Qu'est-ce que c'est ?

Le **sharding** (ou partitionnement horizontal) consiste à diviser une base de données en plusieurs partitions indépendantes appelées **shards**, chacune contenant un sous-ensemble des données. Chaque shard est un serveur (ou cluster) distinct avec son propre CPU, RAM, disque. L'objectif est de distribuer la charge au-delà de ce qu'un seul serveur peut supporter.

Le sharding est la **solution ultime de scaling de base de données** — on n'y recourt qu'après avoir épuisé toutes les autrès options : indexation, optimisation des requêtes, cache, réplication, partitionnement vertical.

## Concept détaillé

### Stratégies de sharding

**1. Range-based (par plage)** : les données sont partitionnées par une plage de valeurs (ex : users 1-100000 sur shard 0, 100001-200000 sur shard 1). Simple à implémenter, efficace pour les requêtes par plage. Risque : hot spots si la distribution est inégale.

**2. Hash-based (par hachage)** : une fonction de hachage détermine le shard (ex : \`shard_id = hash(user_id) % N\`). Distribution uniforme garantie. Inconvénient : impossible de faire des requêtes par plage ; le resharding (changer N) nécessite de déplacer presque toutes les données.

**3. Directory-based (par annuaire)** : une table de correspondance maintient la mapping clé → shard. Flexible (on peut déplacer des données entre shards) mais ajoute une couche d'indirection et un point de défaillance potentiel.

**4. Consistent Hashing** : chaque shard est positionné sur un anneau de hash. L'avantage : ajouter/supprimer un shard ne déplace qu'une fraction des données (K/N). Utilisé par Cassandra, DynamoDB.

## Schéma / Architecture

\`\`\`
Range Sharding :            Hash Sharding :

    users 1-1000               hash(user_id) % 3
    ┌──────────────┐           ┌──────────────┐
    │   Shard 0    │           │   Shard 0    │
    │  Alice, Bob  │           │  Alice, Eve  │
    └──────────────┘           └──────────────┘
    users 1001-2000            ┌──────────────┐
    ┌──────────────┐           │   Shard 1    │
    │   Shard 1    │           │  Bob, Frank  │
    └──────────────┘           └──────────────┘
    users 2001-3000            ┌──────────────┐
    ┌──────────────┐           │   Shard 2    │
    │   Shard 2    │           │  Charlie     │
    └──────────────┘           └──────────────┘

Problème : si users inégaux            Distribution uniforme
(0-100, 100-100000)
\`\`\`

## Comparaison des stratégies

| Critère | Range-based | Hash-based | Directory-based |
|---------|------------|------------|-----------------|
| Distribution | Peut être inégale | Uniforme (bon hash) | Flexible |
| Requêtes par plage | Efficaces | Inefficaces | Modérées |
| Resharding | Complexe (déplacement de plages) | Très complexe (rehash global) | Simple (mettre à jour l'annuaire) |
| Requêtes cross-shard | Possibles | Difficiles | Possibles |
| Hot spots | Risque élevé | Faible | Modéré |

## Avantages et inconvénients

**Avantages :**
- Scaling horizontal : chaque shard peut être sur un serveur distinct.
- Isolation : une panne sur un shard n'affecte que les données de ce shard.
- Performance : chaque shard est plus petit, les requêtes sont plus rapides.
- Parallélisation : les requêtes peuvent s'exécuter en parallèle sur plusieurs shards.

**Inconvénients :**
- Complexité opérationnelle : sauvegarde, monitoring, et maintenance de N serveurs.
- Requêtes cross-shard : les jointures, agrégats, et transactions ACID entre shards sont très coûteuses.
- Resharding : ajouter un shard nécessite de redistribuer les données — opération longue et risquée.
- Contrainte sur les clés : la clé de sharding doit être soigneusement choisie (elle détermine tout).

## Cas d'usage typiques

1. **Plateforme SaaS multi-tenant** : chaque client (tenant) a son shard. Isolation totale des données.
2. **Application de messagerie** : sharding par user_id. Les messages d'un utilisateur sont toujours sur le même shard.
3. **Jeu mobile mondial** : sharding par région géographique. Les joueurs européens sur le shard EU, asiatiques sur le shard ASIA.
4. **IoT / capteurs** : sharding par plage temporelle. Les données du mois dernier sur un shard, du mois précédent sur un autre.

## Bonnes pratiques

1. **Bien choisir la clé de sharding** : elle doit distribuer uniformément les données ET correspondre au pattern d'accès principal.
2. **Éviter les requêtes cross-shard** : si 80% des requêtes touchent un seul shard, le sharding n'apporte aucun bénéfice.
3. **Planifier le resharding dès le départ** : utiliser le consistent hashing si le nombre de shards est amené à changer.
4. **Utiliser un middleware de sharding** : ProxySQL (MySQL), Citus (PostgreSQL) ou un driver applicatif.
5. **Surveiller la distribution** : un shard qui grossit trop vite signale un mauvais choix de clé.
6. **Commencer par la réplication** : avant le sharding, déployer des réplicas en lecture.

## Pièges courants

1. **Sharding prématuré** : un site à 1000 utilisateurs n'a pas besoin de sharding. Épuisez d'abord le cache, l'indexation, la réplication.
2. **Mauvaise clé de sharding** : sharder par date de création → le shard du mois en cours reçoit 90% des écritures (hot spot).
3. **Transactions cross-shard** : une opération qui touche plusieurs shards nécessite une coordination complexe (2PC) et tue la performance.
4. **Jointures impossibles** : une jointure entre users et orders échoue si les deux tables sont sur des shards différents.
5. **Resharding coûteux** : sans consistent hashing, passer de 4 à 5 shards nécessite de déplacer 80% des données.
6. **Auto-increment global** : générer un ID unique global est difficile en environnement shardé (UUID, Snowflake).

Source : [Google Spanner — Sharding](https://research.google.com/archive/spanner-osdi2012.pdf)`},
        {
          id: 'sd-5',
          question: 'Quand et comment utiliser les files de messages ?',
          answer: 'Les **message queues** découplent les producteurs des consommateurs pour **asynchroniser** le traitement. Cas d\'usage : envoi d\'emails, génération de PDF, notifications, traitement par lots.\n\n**`RabbitMQ`** : routing complexe, protocole AMQP, accusés de réception, idéal pour les workflows. **`Kafka`** : flux d\'événements massifs, rétention durable, ordre par partition, idéal pour le *event sourcing* et le streaming.\n\n__Une file de messages élimine le couplage temporel__ : le producteur n\'attend pas le consommateur. C\'est aussi un **buffer** qui absorbe les pics de charge. Attention au *poison message* et aux *dead letter queues*.',
        
          deepDive: `# Files de Messages (Message Queues)

## Qu'est-ce que c'est ?

Les **files de messages** (message queues) permettent une **communication asynchrone** entre des services ou composants d'un système. Au lieu qu'un service A appelle directement le service B (couplage synchrone), A envoie un message dans une file, et B le traite quand il est prêt. Cela **découple** les producteurs des consommateurs dans le temps et l'espace.

Ce pattern est fondamental pour construire des systèmes résilients, scalables et faiblement couplés.

## Concept détaillé

### Composants clés

- **Producer** : service qui crée et envoie les messages.
- **Consumer** : service qui reçoit et traite les messages.
- **Queue** : buffer persistant qui stocke les messages entre la production et la consommation.
- **Message** : payload de données échangé (JSON, Avro, Protobuf).
- **Broker** : serveur central qui gère les files (RabbitMQ, Kafka).

### Patterns de messagerie

**Point-to-Point (Queue)** : un message est consommé par UN SEUL consumer. Après consommation, il est retiré de la file. Utilisé pour le traitement de tâches (ex : envoyer un email).

**Publish-Subscribe (Topic)** : un message est diffusé à TOUS les consumers abonnés. Chaque abonné reçoit une copie. Utilisé pour les notifications d'événements.

**Dead Letter Queue (DLQ)** : file spéciale pour les messages qui n'ont pas pu être traités après plusieurs tentatives. Permet de les analyser sans bloquer le flux principal.

### Garanties de délivrance

- **At most once** : le message est livré 0 ou 1 fois. Performant mais perte possible.
- **At least once** : le message est livré 1 ou plusieurs fois. Nécessite de l'idempotence chez le consumer.
- **Exactly once** : le message est livré exactement 1 fois. Le plus coûteux (coordination).

## Schéma / Architecture

\`\`\`
┌──────────┐    Message     ┌──────────┐
│ Producer │ ──────────────►│  Queue   │
│(Commande)│                │(Orders)  │
└──────────┘                └────┬─────┘
                                 │
                    ┌────────────┼────────────┐
                    │ Livré à un │            │
                    ▼ seul       ▼            ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │Consumer 1│ │Consumer 2│ │Consumer 3│
              │(Email)   │ │(Stock)   │ │(Facture) │
              └──────────┘ └──────────┘ └──────────┘

        Point-to-Point : un seul consumer traite le message

┌──────────┐  Message    ┌──────────┐
│ Producer │ ──────────►│  Topic   │──► Consumer A
│(Event)   │            │(Events)  │──► Consumer B
└──────────┘            └──────────┘──► Consumer C

        Pub/Sub : tous les consumers reçoivent une copie
\`\`\`

## Comparaison RabbitMQ vs Kafka

| Critère | RabbitMQ | Apache Kafka |
|---------|---------|--------------|
| Type | Broker de messages | Log distribué |
| Modèle | Queue + Exchange | Topic + Partition |
| Stockage | Mémoire/disque (configurable) | Disque (persistant, répliqué) |
| Ordre des messages | Par file | Par partition (pas global) |
| Rétention | Jusqu'à confirmation | Configurable (temps/taille) |
| Débit | ~10-50K msg/s | ~1M msg/s |
| Routing | Complexe (headers, topics, direct) | Simple (par clé de partition) |
| Cas d'usage | Workflows, tâches, RPC | Event sourcing, streaming, logs |

## Avantages et inconvénients

**Avantages :**
- Découplage temporel : le producteur n'attend pas le consommateur.
- Buffer de pic : la file absorbe les surcharges sans perdre de messages.
- Résilience : si un consumer tombe, les messages s'accumulent et sont traités au redémarrage.
- Scalabilité : ajouter des consumers pour paralléliser le traitement.

**Inconvénients :**
- Complexité : un broker supplémentaire à déployer et surveiller.
- Latence : un message n'est pas traité immédiatement (asynchrone).
- Garanties : exactly once est difficile à implémenter en pratique.
- Debugging : tracer un flux asynchrone à travers plusieurs services est plus difficile que synchrone.

## Cas d'usage typiques

1. **Envoi d'emails** : la commande est confirmée immédiatement, l'email de confirmation est envoyé de manière asynchrone.
2. **Traitement de paiement** : notification de paiement → mise à jour du stock + génération de facture + notification client.
3. **Event sourcing** : chaque changement d'état est un événement publié dans Kafka, permettant de reconstruire l'état à tout moment.
4. **Logging centralisé** : tous les services envoient leurs logs dans Kafka, un consumer les indexe dans Elasticsearch.

## Bonnes pratiques

1. **Idempotence des consommateurs** : traiter le même message deux fois ne doit pas causer de duplicats.
2. **Retry avec backoff exponentiel** : en cas d'échec, réessayer avec un délai croissant plutôt qu'immédiatement.
3. **Dead letter queue** : configurer une DLQ pour les messages qui échouent définitivement.
4. **Monitoring de la profondeur de file** : une file qui grossit indique que les consommateurs sont trop lents.
5. **Messages versionnés** : le format du message doit inclure un numéro de version pour les évolutions.
6. **Transactions idempotentes** : le producer et le consumer doivent pouvoir gérer les doublons sans effet de bord.

## Pièges courants

1. **Message trop gros** : un message de 100 Mo sature la mémoire du broker. Limiter la taille et passer par un lien (S3) pour les gros payloads.
2. **Consommateur trop lent** : si le consommateur est plus lent que le producteur, la file grossit sans limite.
3. **Poison message** : un message invalide qui fait échouer le consommateur en boucle. Nécessite une DLQ pour le retirer du flux.
4. **Ordre non préservé** : dans Kafka, l'ordre n'est garanti que par partition. Plusieurs consommateurs dans un groupe peuvent traiter les messages dans le désordre.
5. **Perte de messages** : si la persistence n'est pas configurée, un crash du broker perd les messages en mémoire.
6. **Couplage schéma** : producteur et consommateur partagent un contrat de message — un changement de schéma peut casser les consommateurs.

Source : [RabbitMQ — Documentation](https://www.rabbitmq.com/documentation.html)`},
        {
          id: 'sd-6',
          question: 'Comment appliquer le théorème CAP en pratique ?',
          answer: 'Le **théorème CAP** : dans un système distribué en cas de partition réseau, on doit choisir entre **C**onsistency (cohérence) et **A**vailability (disponibilité). On ne peut pas avoir les deux simultanément.\n\n**CP** : cohérence prioritaire — on refuse les écritures si on ne peut pas garantir la cohérence (`Zookeeper`, `etcd`). **AP** : disponibilité prioritaire — on accepte les écritures même déconnecté, synchronisation ultérieure (`Cassandra`, `DynamoDB`).\n\n__En pratique, la plupart des systèmes web choisissent AP avec *eventual consistency*__ — la cohérence forte est rarement nécessaire pour la plupart des use case. Le théorème CAP explique pourquoi, pas ce qu\'il faut choisir.',
        
          deepDive: `# Appliquer le Théorème CAP en Pratique

## Qu'est-ce que c'est ?

Le **théorème CAP** n'est pas un exercice académique — c'est un guide de décision pour architectes. En production, face à une partition réseau inévitable, vous devez choisir : préférez-vous que le système refuse de répondre (cohérence forte) ou qu'il réponde avec des données possiblement périmées (disponibilité) ?

Ce choix n'est PAS binaire : différentes opérations dans la même application peuvent avoir des exigences CAP différentes.

## Concept détaillé

### Les vrais choix en production

**CP (Cohérence forte) :**
- Acceptez que certains nœuds soient indisponibles pendant une partition.
- Utilisez un consensus (Paxos, Raft) pour coordonner les écritures.
- Exemples concrets : etcd, Zookeeper, MongoDB (avec write concern majority).

**AP (Disponibilité) :**
- Acceptez des divergences temporaires entre nœuds.
- Implémentez des mécanismes de résolution de conflits (CRDT, LWW).
- Exemples concrets : Cassandra, DynamoDB, CouchDB.

### Cohérence configurable

Les bases modernes permettent de choisir la cohérence par opération :

- **Cassandra** : \`CONSISTENCY ONE\` (AP rapide) vs \`CONSISTENCY QUORUM\` (CP).
- **MongoDB** : \`readConcern: local\` (AP) vs \`readConcern: majority\` (CP).
- **DynamoDB** : \`ConsistentRead: false\` (AP) vs \`ConsistentRead: true\` (CP).

### Résolution de conflits (systèmes AP)

- **Last-Write-Wins (LWW)** : le timestamp le plus récent gagne. Simple mais peut perdre des données.
- **CRDT (Conflict-Free Replicated Data Types)** : structures mathématiques qui convergent automatiquement.
- **Merge manuel** : le système détecte les conflits et les expose à l'application pour résolution.

## Schéma / Architecture

\`\`\`
Choix CAP par opération :

    ┌────────────────────────────────────────────────────────────┐
    │                    APPLICATION                               │
    │                                                              │
    │  Opération : Créditer un compte (300€)                       │
    │    → Exigence : Cohérence forte (CP)                        │
    │    → Vérifier solde, écrire, lire → toujours correct        │
    │                                                              │
    │  Opération : Ajouter une story au fil d'actualité (like)    │
    │    → Exigence : Disponibilité (AP)                          │
    │    → Écrire localement, propager asynchrone                 │
    │                                                              │
    │  Opération : Mettre à jour le statut utilisateur             │
    │    → Exigence : Cohérence éventuelle (AP)                   │
    │    → Propagation en arrière-plan, convergence en secondes   │
    └────────────────────────────────────────────────────────────┘
\`\`\`

## Comparaison des choix en production

| Critère | Opération CP | Opération AP |
|---------|-------------|-------------|
| Disponibilité en partition | Réduite | Maximale |
| Latence moyenne | Plus élevée | Plus faible |
| Complexité applicative | Faible | Élevée (résolution conflits) |
| Exemple métier | Paiement, solde | Like, commentaire, log |
| Base de données | PostgreSQL (synchronous replica) | Cassandra, DynamoDB |

## Avantages et inconvénients des approches

**CP en pratique :**
- Avantages : logique applicative simple, pas de conflits à gérer.
- Inconvénients : indisponibilité partielle, latence augmentée par le consensus.

**AP en pratique :**
- Avantages : toujours disponible, meilleure performance.
- Inconvénients : complexité (conflits), données périmées temporairement, debugging difficile.

**Approche hybride :**
- Utiliser une base CP (PostgreSQL) pour les transactions critiques et une base AP (Cassandra) pour les logs et analytics.
- Configurer la cohérence par requête sur une même base (MongoDB, Cassandra).

## Cas d'usage typiques

1. **Paiement en ligne (CP)** : le solde du compte doit être exact. En cas de partition, le système refuse l'opération.
2. **Fil d'actualité (AP)** : un like peut ne pas apparaître immédiatement chez tous les amis. Acceptable.
3. **Catalogue e-commerce (CP)** : ne pas vendre un article qui n'est plus en stock.
4. **Recommandations (AP)** : des suggestions basées sur des données légèrement obsolètes restent pertinentes.

## Bonnes pratiques

1. **Analyser les exigences métier par opération** : quelles données ont besoin de cohérence forte ? Lesquelles tolèrent un délai ?
2. **Configurer la cohérence au niveau de la requête** : les bons drivers modernes le permettent (Cassandra QUORUM vs ONE).
3. **Implémenter la résolution de conflits dès le départ** : même si vous pensez être CP, les conflits arrivent.
4. **Utiliser des transactions optimistes** : lire, modifier, écrire avec vérification de version.
5. **Tester avec Chaos Engineering** : injecter des latences et des partitions réseau pour valider le comportement.
6. **Surveiller la divergence** : dans un système AP, mesurer l'âge moyen des données non synchronisées.

## Pièges courants

1. **Penser que le choix est binaire et permanent** : on peut (et doit) mixer CP et AP dans la même application.
2. **Ignorer les partitions réseau** : « notre réseau est fiable » — les partitions arrivent toujours (switch défectueux, mise à jour, panne DNS).
3. **Choisir AP sans résolution de conflits** : des écritures concurrentes produisent des données incohérentes sans mécanisme de fusion.
4. **Choisir CP partout** : impact sur la disponibilité — un système constamment indisponible est inutilisable.
5. **Sous-estimer la latence du consensus** : Raft/Paxos ajoutent 2-3 allers-retours réseau avant chaque écriture.

Source : [CAP Theorem — Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)`},
        {
          id: 'sd-7',
          question: 'Qu\'est-ce que la cohérence éventuelle et comment la gérer ?',
          answer: '**Eventual consistency** : si aucune nouvelle écriture n\'est faite, toutes les répliques convergeront *finalement* vers le même état. Entre-temps, des lectures peuvent retourner des données **obsolètes**.\n\nGestion : **vector clocks** (détection de conflits), **conflict resolution** (dernière écriture gagne, merge manuel), **read repair** (correction à la lecture), **anti-entropy** (synchronisation périodique en arrière-plan).\n\n__La cohérence éventuelle est acceptable pour les likes, les compteurs de vues, les feeds__ — pas pour les transactions bancaires. Identifiez quelles données exigent la cohérence forte vs lesquelles tolèrent l\'éventuelle.',
        
          deepDive: `# Cohérence Éventuelle (Eventual Consistency)

## Qu'est-ce que c'est ?

La **cohérence éventuelle** est un modèle de cohérence faible où, en l'absence de nouvelles écritures, toutes les répliques d'une donnée convergeront **finalement** vers la même valeur. Entre-temps, des lectures peuvent retourner des données obsolètes.

Ce modèle est au cœur des systèmes **AP** du théorème CAP et est le compromis accepté pour garantir une disponibilité et une performance élevées dans les systèmes distribués.

## Concept détaillé

### Niveaux de cohérence

| Niveau | Garantie | Latence | Exemple |
|--------|----------|---------|---------|
| Cohérence forte | Lecture = toujours la dernière écriture | Élevée | PostgreSQL synchrone |
| Cohérence éventuelle | Convergence dans le futur | Faible | Cassandra (par défaut) |
| Read-your-writes | L'utilisateur voit ses propres écritures | Moyenne | DynamoDB (session consistency) |
| Bounded staleness | Staleness < X secondes | Moyenne | MongoDB (configurable) |
| Causal | Les opérations causalement liées sont vues en ordre | Moyenne | CockroachDB |

### Détection et résolution des conflits

Dans un système à cohérence éventuelle, des écritures concurrentes sur différents nœuds peuvent produire des **conflits**. Plusieurs stratégies de résolution :

- **Last-Write-Wins (LWW)** : l'écriture avec le timestamp le plus récent l'emporte. Simple, mais peut perdre des données.
- **Vector Clocks** : chaque réplica maintient un vecteur de version. Permet de détecter les écritures concurrentes.
- **CRDT** : types de données qui convergent mathématiquement (ex : compteur qui additionne, set qui fusionne).
- **Merge manuel** : l'application décide comment fusionner (ex : panier d'achat : prendre l'union des deux versions).

### Read Repair

Une technique où, lors d'une lecture, si le système détecte que certaines répliques ont des données périmées, il les met à jour silencieusement. Cela améliore la convergence sans coût d'écriture supplémentaire.

## Schéma / Architecture

\`\`\`
Écriture sur nœud A (via partition temporaire) :

    ┌──────────┐          ┌──────────┐
    │ Nœud A   │          │ Nœud B   │
    │ Solde: 110│ ← partition → │ Solde: 100│
    │ (à jour)  │          │ (obsolète)│
    └──────────┘          └──────────┘

         │                     │
         │   Partition réparée │
         └─────────────────────┘
                   │
               Réplication asynchrone
                   │
    ┌──────────┐          ┌──────────┐
    │ Nœud A   │          │ Nœud B   │
    │ Solde: 110│ ─────────►│ Solde: 110│
    │ (à jour)  │   Anti-   │ (à jour)  │
    └──────────┘   entropy  └──────────┘

    Pendant la partition : lecture sur B retourne 100 (obsolète)
    Après convergence : lecture sur B retourne 110
\`\`\`

## Comparaison des modèles

| Modèle | Cohérence immédiate | Disponibilité | Performance en écriture | Complexité |
|--------|-------------------|---------------|----------------------|------------|
| Forte | Oui | Réduite | Limitée | Faible |
| Éventuelle | Non | Maximale | Très élevée | Élevée |
| Read-your-writes | Partielle | Élevée | Élevée | Modérée |
| Causal | Partielle | Élevée | Élevée | Élevée |

## Avantages et inconvénients

**Avantages :**
- Haute disponibilité : toutes les répliques répondent toujours.
- Performance : écritures rapides (pas d'attente de confirmation).
- Scalabilité : pas de coordination entre nœuds pour les écritures.
- Résilience : une partition n'arrête pas le système.

**Inconvénients :**
- Données périmées : l'utilisateur peut voir des informations obsolètes.
- Conflits : nécessite une stratégie de résolution qui peut perdre des données.
- Complexité applicative : le développeur doit gérer l'incohérence temporaire.
- Debugging difficile : reproduire un bug lié à la convergence est complexe.

## Cas d'usage typiques

1. **Réseau social** : un like peut apparaître avec quelques secondes de retard sur certains serveurs. Acceptable.
2. **DNS** : les changements de DNS prennent du temps à se propager (TTL). Cohérence éventuelle explicite.
3. **Catalogue e-commerce** : la disponibilité d'un produit peut être légèrement en retard → risque de survente limité.
4. **Logs et métriques** : les données de monitoring peuvent arriver dans le désordre. La convergence finale suffit.

## Bonnes pratiques

1. **Identifier les données qui tolèrent l'éventuelle** : tout n'a pas besoin de cohérence forte. Séparer les workloads.
2. **Informer l'utilisateur** : si une donnée est potentiellement obsolète, l'indiquer (ex : « résultats mis à jour il y a 30s »).
3. **Utiliser read-your-writes pour les sessions utilisateur** : l'utilisateur voit toujours ses propres modifications.
4. **Implémenter la résolution de conflits au niveau métier** : la fusion peut nécessiter des règles spécifiques (ex : panier d'achat).
5. **Surveiller la divergence** : mesurer l'écart entre les répliques pour détecter des problèmes de réplication.
6. **Utiliser des quorums adaptés** : QUORUM pour les lectures importantes, ONE pour les lectures tolérantes.

## Pièges courants

1. **Croire que « éventuelle » signifie « rapide »** : la convergence peut prendre de quelques ms à plusieurs minutes selon la configuration.
2. **Ignorer les conflits** : écrire sur deux nœuds simultanément sans résolution = corruption de données.
3. **Cas du panier d'achat** : deux onglets ouverts → commande passée sur le premier, modification du panier sur le second → l'état peut être incohérent.
4. **Considérer que la cohérence éventuelle est un défaut** : c'est un compromis délibéré pour la disponibilité.
5. **Ne pas tester les scénarios de partition** : les bugs de convergence n'apparaissent que sous charge et en conditions réseau dégradées.

Source : [AWS DynamoDB — Eventual Consistency](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.DataConsistency.html)`},
      ],
    },
    {
      id: 'sd-pratiques',
      title: 'Cas Pratiques',
      questions: [
        {
          id: 'sd-8',
          question: 'Concevez un raccourcisseur d\'URL',
          answer: '**Workflow** : l\'utilisateur soumet une URL longue → le serveur génère un **ID court** unique → stocke le mapping `ID → URL longue` → renvoie l\'URL courte. À la visite : lookup en BDD → **redirect 301/302**.\n\n**Génération de l\'ID** : encodage base62 de l\'ID auto-incrémenté (a-zA-Z0-9 = 62 chars, 7 chars = 62⁷ ≈ 3.5 trillions). Pas de hash (collision possible), pas de random (longueur variable).\n\n**Architecture** : BDD clé-valeur (`DynamoDB`, `Redis`) pour le lookup O(1), cache pour les URLs populaires, redirection via `301` (SEO, cache navigateur) ou `302` (tracking). Analytics : stream vers `Kafka` pour ne pas bloquer la redirection.\n\n__C\'est le cas classique d\'entretien — maîtrisez l\'encodage base62 et le choix 301 vs 302.__',
          code: '// Génération d\'ID court\nfunction encodeId(id: number): string {\n  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";\n  let short = "";\n  while (id > 0) {\n    short += chars[id % 62];\n    id = Math.floor(id / 62);\n  }\n  return short;\n}',
          language: 'typescript',
        
          deepDive: `# Concevoir un Raccourcisseur d'URL

## Qu'est-ce que c'est ?

Un **raccourcisseur d'URL** (URL shortener) transforme une URL longue en une chaîne courte unique (ex : \`https://bit.ly/3uXeF7k\`). Quand un utilisateur visite l'URL courte, le serveur la redirige vers l'URL originale vià une réponse HTTP 301 (permanent) ou 302 (temporaire).

Le défi : des millions d'URLs à stocker, des billions de redirections avec une latence < 10ms, et une génération d'identifiants courts garantie sans collision.

## Concept détaillé

### Génération des identifiants courts

**Approche 1 — Base62 encoding d'un ID auto-incrémenté :**
- Utiliser un compteur global (base de données ou Snowflake) pour générer un ID numérique unique.
- Encoder l'ID en base62 (a-zA-Z0-9 = 62 caractères).
- 7 caractères en base62 = 62^7 ≈ 3,5 billions de combinaisons.
- Avantage : pas de collision, URLs courtes de longueur fixe.

**Approche 2 — Hachage + encodage :**
- Calculer un hash MD5/SHA-256 de l'URL longue.
- Prendre les N premiers bits, encoder en base62.
- Risque de collision → vérifier dans la base et ajouter un sel si collision.

### Stockage

Le mapping \`short_code → long_url\` doit être lu à chaque redirection :

- **Cache Redis** : pour les URLs populaires. Hit rate attendu > 95%.
- **Base de données clé-valeur** : DynamoDB ou Cassandra pour le lookup O(1).
- **Base relationnelle** : PostgreSQL avec index sur \`short_code\`.

### Redirection HTTP

- **301 Moved Permanently** : le navigateur/cache met en cache la redirection. Les requêtes suivantes évitent le serveur court. Idéal pour SEO.
- **302 Found (Temporaire)** : chaque requête va au serveur court (qui enregistre un clic). Idéal pour le tracking.

## Schéma / Architecture

\`\`\`
                     ┌───────────────┐
                     │   Client      │
                     └──────┬────────┘
                            │ GET /abc1234
                            ▼
                    ┌───────────────┐
                    │  Load Balancer│
                    └──────┬────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌────▼────┐ ┌─────▼─────┐
        │ API Server │ │  Cache  │ │ API Server │
        │ (write)    │ │  Redis  │ │ (read)     │
        └─────┬──────┘ └────┬────┘ └─────┬──────┘
              │             │            │
              └──────┬──────┘            │
                     │ lookup             │
              ┌──────▼──────┐            │
              │    Base     │◄───────────┘
              │ DynamoDB/   │
              │  Postgres   │
              └─────────────┘

    Génération URL : POST /shorten { url: "..." }
    Redirection :    GET /{short_code} → 301/302 vers l'URL originale
\`\`\`

## Comparaison des approches de génération

| Critère | Base62 ID auto-incrémenté | Hash + encodage | UUID |
|---------|--------------------------|-----------------|------|
| Longueur | 7 caractères (fixe) | 7-8 caractères | 22 caractères (base64) |
| Collision | Impossible | Possible (vérification) | Extrêmement improbable |
| Prédictible | Oui (IDs séquentiels) | Non | Non |
| Performance | Excellente | Excellente | Bonne |
| Distribution | Nécessite coordination | Sans état | Sans état |

## Avantages et inconvénients

**Avantages :**
- Solution élégante au problème de partage d'URLs longues.
- Tracking des clics intégré (analytics sur la redirection).
- Cache très efficace (hit rate > 95% pour les URLs populaires).

**Inconvénients :**
- Point de défaillance potentiel (si le service tombe, toutes les URLs courtes sont mortes).
- Le cache est essentiel pour la performance à l'échelle.
- Les URLs courtes peuvent être utilisées pour du phishing (obscurcissement).

## Cas d'usage typiques

1. **Marketing et tracking** : les URLs courtes dans les campagnes email permettent de compter les clics.
2. **Réseaux sociaux** : Twitter (maintenant X) utilise t.co pour toutes les URLs dans les tweets.
3. **Partage simplifié** : une URL lisible et courte pour un lien complexe.
4. **QR codes** : un QR code contient une URL courte (moins de données = QR plus petit).

## Bonnes pratiques

1. **Utiliser un cache (Redis) devant la BDD** : la redirection doit prendre < 10ms.
2. **Choisir 301 pour les liens permanents** : le navigateur met en cache la redirection → pas de charge sur le serveur.
3. **Choisir 302 pour les liens temporaires/analytics** : besoin de compter chaque clic.
4. **Taux de compression** : viser 7-8 caractères (62^8 ≈ 218 billions).
5. **Rate limiting sur la création** : éviter qu'un bot génère des millions d'URLs.
6. **Validation de l'URL** : vérifier que l'URL est valide et accessible avant de la raccourcir.

## Pièges courants

1. **Ne pas prévoir l'épuisement des IDs** : avec un compteur 32 bits, seulement 4 milliards d'URLs possibles. Passer à 64 bits.
2. **Générer des URLs prédictibles** : des IDs séquentiels permettent de deviner d'autrès URLs. Solution : ajouter un sel ou utiliser un ID non séquentiel.
3. **Pas de cache** : si chaque redirection va en BDD, le système s'effondre sous charge.
4. **URL malveillantes** : les raccourcisseurs sont utilisés pour cacher des liens de phishing. Implémenter un système de vérification.
5. **Oublier le cleanup** : les URLs obsolètes doivent être purgées périodiquement (TTL et archivage).

Source : [Bitly — Architecture](https://bitly.com/blog/architecture/)`},
        {
          id: 'sd-9',
          question: 'Concevez un système de chat en temps réel',
          answer: '**Protocole** : `WebSocket` pour la communication bidirectionnelle temps réel (pas du polling HTTP). **Architecture** : chaque serveur de chat gère les connexions WebSocket actives, les messages sont routés vià un **message broker** (`Redis Pub/Sub` ou `Kafka`) entre serveurs.\n\n**Stockage** : BDD NoSQL (`Cassandra`/`DynamoDB`) pour l\'historique des messages, clé = `conversation_id`, tri par timestamp. **Présence** : heartbeat + Redis pour les statuts en ligne.\n\n**Groupes** : un message → broadcast à tous les membres du groupe via le broker. **Push notifications** pour les utilisateurs hors ligne via `Firebase`/`APNs`.\n\n__Le défi principal est le routage inter-serveurs quand les membres d\'un chat sont connectés à des serveurs différents.__',
        
          deepDive: `# Concevoir un Système de Chat en Temps Réel

## Qu'est-ce que c'est ?

Un **système de chat en temps réel** permet à des utilisateurs d'échanger des messages instantanément. Le défi technique principal est de maintenir des connexions persistantes avec des milliers (voire millions) d'utilisateurs simultanés, tout en garantissant la livraison des messages avec une latence < 100ms.

Contrairement à un système HTTP classique (requête-réponse), un chat utilise des connexions **bidirectionnelles persistantes** via WebSocket.

## Concept détaillé

### Protocole de communication

**WebSocket** : connexion TCP persistante bidirectionnelle. Le serveur peut envoyer des données au client sans que celui-ci ne fasse de requête. C'est le protocole standard pour le temps réel.

**Alternatives :**
- **Polling HTTP** : le client interroge le serveur toutes les X secondes. Simple mais inefficace.
- **Server-Sent Events (SSE)** : unidirectionnel (serveur → client). Plus simple que WebSocket si le client n'a pas besoin d'envoyer des données.
- **Long Polling** : le serveur garde la connexion ouverte jusqu'à avoir un message. Wi-Fi, mais gourmand en ressources.

### Architecture de distribution

Quand des utilisateurs sont connectés à différents serveurs, les messages doivent être **routés** entre serveurs :

1. **Redis Pub/Sub** : léger, idéal pour les clusters de taille modeste. Chaque serveur s'abonne aux channels des conversations concernées.
2. **Kafka** : plus lourd mais persisté. Permet la relecture des messages et le tracking.

### Stockage des messages

- **To read** : BDD NoSQL (Cassandra, DynamoDB) avec \`conversation_id\` comme clé de partition et \`timestamp\` comme clé de tri. Permet la pagination par curseur.
- **To write** : le message est d'abord écrit en cache (Redis) pour latence minimale, puis persisté de manière asynchrone.

## Schéma / Architecture

\`\`\`
                    ┌──────────────┐
                    │   Client A   │◄──── WebSocket ────┐
                    └──────────────┘                    │
                                                        │
┌───────────────────┬────────────────────┬──────────────┼──┐
│   LOAD BALANCER   │                    │              │  │
│   (Sticky Sess.)  │                    │              │  │
└─────────┬─────────┘                    │              │  │
          │                              │              │  │
    ┌─────▼─────┐                 ┌──────▼─────┐       │  │
    │ WebSocket  │                 │ WebSocket   │       │  │
    │ Server 1   │                 │ Server 2    │       │  │
    │ Client A   │                 │ Client B    │       │  │
    │ Client C   │                 │             │       │  │
    └─────┬──────┘                 └──────┬──────┘       │  │
          │                               │              │  │
          │       Redis Pub/Sub ou Kafka   │              │  │
          └───────────────┬───────────────┘              │  │
                          │                              │  │
                    ┌─────▼──────┐                       │  │
                    │  Message   │                       │  │
                    │  Broker    │                       │  │
                    └────────────┘                       │  │
                          │                              │  │
                    ┌─────▼──────┐                       │  │
                    │    BDD     │                       │  │
                    │ (Storage)  │◄──────────────────────┘  │
                    └────────────┘                          │
└──────────────────────────────────────────────────────────┘

    Message de A → Server 1 → Broker → Server 2 → B
    Message de B → Server 2 → Broker → Server 1 → A
\`\`\`

## Comparaison WebSocket vs alternatives

| Critère | WebSocket | Long Polling | SSE | Polling HTTP |
|---------|-----------|-------------|-----|-------------|
| Bidirectionnel | Oui | Oui (asymétrique) | Non (S→C) | Oui |
| Latence | Très faible | Moyenne | Faible | Élevée |
| Overhead connexion | Faible (1 TCP) | Élevé (reconnexion) | Faible | Élevé |
| Compatibilité navigateur | Excellente | Universelle | Bonne | Universelle |
| Scaling | Complexe (stateful) | Simple (stateless) | Simple | Simple |

## Avantages et inconvénients

**Avantages :**
- Latence ultra-faible (messages livrés en < 50ms).
- Expérience utilisateur fluide et naturelle.
- Notifications push intégrées.

**Inconvénients :**
- Complexité de scaling (connexions persistantes = stateful).
- Gestion de la présence et des reconnexions.
- Coût des connexions WebSocket maintenues.

## Cas d'usage typiques

1. **Messagerie instantanée grand public** (WhatsApp, Messenger) : milliards de messages par jour.
2. **Chat d'équipe** (Slack, Teams) : canaux, threads, réactions, fichiers joints.
3. **Support client en direct** (Intercom, Zendesk Chat) : sessions temporaires, routage vers l'agent disponible.
4. **Collaboration temps réel** (Google Docs, Figma) : cursors, édition simultanée.

## Bonnes pratiques

1. **Heartbeat** : envoyer un ping périodique (30s) pour détecter les connexions mortes.
2. **Reconnexion avec backoff** : en cas de perte de connexion, réessayer avec un délai exponentiel.
3. **Sticky sessions sur le load balancer** : le même client va toujours au même serveur WebSocket.
4. **Messages hors ligne** : stocker les messages pour les livrer à la reconnexion.
5. **Backpressure** : si le client est trop lent, ne pas accumuler les messages en mémoire. Implémenter du flow control.
6. **Chiffrement WSS** : toujours utiliser WebSocket over TLS pour sécuriser les messages.

## Pièges courants

1. **Pas de heartbeat** : une connexion WebSocket peut sembler ouverte alors que le client a disparu (timeout réseau).
2. **État local dans le serveur WebSocket** : stocker les messages en mémoire locale → perdus si le serveur redémarre.
3. **Broadcast non optimisé** : envoyer un message à 10 000 utilisateurs connectés → 10 000 writes Redis. Utiliser un fan-out optimisé.
4. **Pas de gestion de présence** : l'utilisateur voit ses amis « en ligne » indéfiniment si le heartbeat est mal configuré.
5. **Non-respect de l'ordre des messages** : en cas de reconnexion, les messages peuvent arriver dans le désordre.

Source : [Slack Engineering — Building a Real-Time Messaging System](https://slack.engineering/caling-home/)`},
        {
          id: 'sd-10',
          question: 'Concevez un fil d\'actualité (news feed)',
          answer: '**Deux approches** : **Pull** (fan-out on read) — à chaque visite, on agrège les posts des abonnements (lourd si beaucoup d\'abonnés), **Push** (fan-out on write) — à chaque post, on pousse dans les feeds de tous les abonnés (lourd pour les comptes populaires).\n\n**Approche hybride** : push pour les utilisateurs normaux, pull pour les comptes populaires (célébrités). Les feeds sont **pré-calculés** et stockés dans un cache (`Redis`), mis à jour de manière asynchrone.\n\n**Ranking** : algorithme de scoring (récence, engagement, affinité) pour trier les posts. **Pagination** cursor-based pour le scroll infini. **CDN** pour les images/vidéos.\n\n__Le news feed est le cas d\'usage classique du pattern fan-out.__ La clé est le choix push vs pull selon la popularité.',
        
          deepDive: `# Concevoir un Fil d'Actualité (News Feed)

## Qu'est-ce que c'est ?

Un **fil d'actualité** (news feed) agrège le contenu de plusieurs sources (amis, pages suivies, abonnements) et l'affiche dans un flux chronologique ou algorithmique. C'est le cœur de produits comme Facebook, Twitter/X, LinkedIn, Instagram.

Le défi technique : générer un fil personnalisé pour des centaines de millions d'utilisateurs, chacun suivant des centaines de sources, avec une latence de chargement < 500ms.

## Concept détaillé

### Les deux approches fondamentales

**1. Fan-out on write (Push)** : quand un utilisateur publie, le post est immédiatement copié dans le fil de tous ses abonnés.
- Avantage : la lecture est instantanée (le fil est pré-calculé).
- Inconvénient : coût d'écriture très élevé pour les comptes populaires (des millions d'écritures par post).

**2. Fan-out on read (Pull)** : quand un utilisateur charge son fil, on va chercher les posts récents de toutes ses sources.
- Avantage : pas de coût d'écriture pour les posts.
- Inconvénient : la lecture est coûteuse (charger et fusionner des centaines de listes).

**3. Approche hybride (recommandée)** : push pour les utilisateurs avec peu d'abonnés (< 10 000), pull pour les célébrités et comptes populaires.

### Stockage du fil

Le fil pré-calculé est stocké dans un **cache** :
- **Redis sorted sets** : chaque fil est un sorted set, où le score est le timestamp du post.
- **Pagination cursor-based** : pas de \`OFFSET\`, mais \`SELECT … WHERE timestamp < cursor\`.

### Ranking

- **Chronologique** : simple, prévisible, mais peut être submergé par des posts de faible qualité.
- **Algorithmique** : score basé sur la récence, les interactions (likes, commentaires), la proximité avec l'auteur, le type de contenu.

## Schéma / Architecture

\`\`\`
Publication d'un post (utilisateur normal, < 10K abonnés) :

    User A écrit un post
         │
         ▼
    ┌─────────────┐
    │ Post Service │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │ Fan-out     │─── Pour chaque follower, ajouter post_id
    │ Service     │    au sorted set Redis du follower
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  Kafka      │  (async pour les gros comptes)
    │  Worker     │
    └─────────────┘

Lecture du fil (utilisateur B) :

    User B ouvre l'app
         │
         ▼
    ┌─────────────┐
    │ Feed Service │ ──► Lire sorted set Redis de B
    └──────┬──────┘     (post_ids ordonnés par timestamp)
           │
    ┌──────▼──────┐
    │ Post Cache   │ ──► Récupérer les détails des posts (contenu, auteur)
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │ Ranking     │ ──► Appliquer scoring (si algorithmique)
    │ Service     │
    └─────────────┘
\`\`\`

## Comparaison Push vs Pull

| Critère | Push (fan-out on write) | Pull (fan-out on read) | Hybride |
|---------|------------------------|----------------------|---------|
| Latence de lecture | Immédiate | Lente (agrégation) | Rapide |
| Coût écriture | Très élevé | Faible | Modéré |
| Coût lecture | Faible | Très élevé | Faible |
| Célébrités | Impensable (millions d'écritures) | Naturel | Pull pour les gros comptes |
| Fraîcheur | Immédiate | Dépend de la fréquence | Immédiate |
| Stockage | O(N_abonnés) par post | Un seul post stocké | Mixte |

## Avantages et inconvénients

**Avantages :**
- Expérience utilisateur fluide (fil pré-calculé, chargement instantané).
- Personnalisation algorithmique possible.
- Découplage entre écriture et lecture.

**Inconvénients :**
- Coût de stockage élevé (le fil de chaque utilisateur est pré-calculé).
- La mise à jour des fils après une suppression/édition est complexe.
- L'approche algorithmique peut créer des bulles de filtres.

## Cas d'usage typiques

1. **Réseau social grand public** (Facebook, Instagram) : billions de posts, algorithmes de ranking sophistiqués.
2. **Fil professionnel** (LinkedIn) : tri par pertinence et relations professionnelles.
3. **Actualités** (Reddit, Twitter/X) : mélange de chronologique et tendances.
4. **Plateforme de contenu** (Medium, Substack) : recommandations basées sur les centrès d'intérêt.

## Bonnes pratiques

1. **Fan-out asynchrone** : le créateur du post ne doit pas attendre que le fan-out se termine.
2. **Limiter le fan-out par batch** : écrire 100 fils à la fois plutôt que 10 000 d'un coup.
3. **Utiliser des sorted sets Redis** : le timestamp comme score permet la pagination, le tri et le filtrage.
4. **Paginer avec des curseurs** : éviter \`OFFSET\` (lent sur les gros datasets). Utiliser \`timestamp < cursor\`.
5. **Cacher les détails des posts** : le fil stocke les IDs, les détails (contenu, image) sont dans un cache séparé.
6. **Gérer les déduplications** : un même post ne doit pas apparaître 2 fois (surtout avec l'approche hybride).

## Pièges courants

1. **Fan-out synchrone** : le créateur attend 3 secondès que les 10 000 écritures Redis se terminent.
2. **Fil trop gros en mémoire** : un utilisateur très actif peut avoir des milliers de posts dans son fil. Limiter à 1000.
3. **Incohérence post-suppression** : un post supprimé reste dans les fils. Nécessite un mécanisme de nettoyage (TTL ou event de suppression).
4. **Célébrité non gérée** : une célébrité avec 50M d'abonnés → fan-out impossible. L'approche pull est obligatoire.
5. **Absence de warm-up** : un utilisateur qui n'a pas ouvert l'app depuis 24h → son fil est périmé. Re-générer avant l'affichage.

Source : [Facebook — The Future of News Feed](https://www.facebook.com/notes/facebook-engineering/tao-the-power-of-the-graph/10151525983993940/)`},
        {
          id: 'sd-11',
          question: 'Concevez un système de stockage de fichiers',
          answer: '**Stockage objet** : `S3`-like, chaque fichier = objet avec metadata, accès via URL signée. Avantages : scalable, durable (réplication multi-AZ), pas de limite de taille.\n\n**Upload** : petit fichier → upload direct, gros fichier → **multipart upload** (chunks parallèles, reprise sur échec). **Téléchargement** : URL signée à durée limitée ou via CDN pour les fichiers publics.\n\n**Architecture** : service d\'upload → stockage objet (`S3`) → metadata en BDD (nom, taille, owner, permissions). CDN pour la distribution. **Déduplication** via hash SHA-256 pour économiser l\'espace.\n\n__Pour les gros volumes, le multipart upload est indispensable__ — il permet la parallélisation et la reprise sur erreur.',
        
          deepDive: `# Concevoir un Système de Stockage de Fichiers

## Qu'est-ce que c'est ?

Un **système de stockage de fichiers** permet aux utilisateurs d'uploader, stocker, organiser et télécharger des fichiers (images, vidéos, documents). L'objectif est de fournir un stockage scalable, durable et performant pour des pétaoctets de données servies à des millions d'utilisateurs.

Les systèmes modernes (Google Drive, Dropbox, S3) utilisent le **stockage objet** : chaque fichier est un objet avec un identifiant unique, des métadonnées, et peut être répliqué sur plusieurs data centers.

## Concept détaillé

### Architecture de stockage

**Stockage objet (S3, GCS)** : le fichier est stocké comme un objet dans un bucket. Pas de hiérarchie de dossiers (les « dossiers » sont un préfixe dans le nom). Scalabilité quasi illimitée, réplication multi-AZ.

**Metadata store** : une base de données (PostgreSQL, DynamoDB) stocke les métadonnées de chaque fichier :
- ID unique, nom original, taille, type MIME
- Propriétaire, permissions, dates
- Emplacement dans le stockage objet (clé/bucket)
- Tags, catégories

### Upload

**Petits fichiers (< 100 Mo)** : upload direct en une requête. Simple, rapide.

**Gros fichiers (> 100 Mo)** : **Multipart Upload** — le fichier est divisé en chunks (5-10 Mo chacun) uploadés en parallèle. Avantages :
- Parallélisation : upload plus rapide sur des connexions à latence élevée.
- Reprise : si un chunk échoue, on ne ré-uploade que celui-ci.
- Pause/reprise : l'utilisateur peut mettre en pause et reprendre.

### Téléchargement

- **Fichiers publics** : servis directement via CDN (CloudFront, Cloudflare) avec cache long.
- **Fichiers privés** : **Pre-signed URLs** — URL temporaire (5-60 min) qui donne accès à un fichier spécifique sans exposer les credentials. Le serveur génère l'URL signée, le client télécharge directement depuis le storage.
- **Range requests** : pour la lecture partielle (streaming vidéo, aperçu PDF).

## Schéma / Architecture

\`\`\`
Upload :
    ┌──────┐   PUT /files          ┌───────────┐
    │Client│ ───────────────────►  │ API Server │
    └──────┘                       └─────┬─────┘
         ▲                                │
         │   1. Générer file_id           │
         │   2. Initier multipart upload  │
         └───────────────────────────────┘
                                         │
                        ┌────────────────┼────────────────┐
                        │  Chunk 1       │  Chunk 2       │  …
                   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
                   │  S3 /   │     │  S3 /   │     │  S3 /   │
                   │  GCS    │     │  GCS    │     │  GCS    │
                   └─────────┘     └─────────┘     └─────────┘
                        │
                   ┌────▼────┐
                   │Complete │
                   │Multipart│
                   └─────────┘

Téléchargement :
    ┌──────┐   GET /files/{id}   ┌───────────┐
    │Client│ ──────────────────► │ API Server │
    └──────┘                     └─────┬─────┘
         ▲                              │  Générer URL signée (15 min)
         │                              ▼
         │                     ┌────────────────┐
         │                     │ Pre-signed URL │
         │                     │ (S3 presigned) │
         │                     └────────────────┘
         │                              │
         └──────────────────────────────┘
              GET /presigned-url
\`\`\`

## Comparaison des solutions

| Critère | Stockage Objet (S3) | Serveur de fichiers (NFS) | Base de données (BLOB) |
|---------|-------------------|------------------------|----------------------|
| Scalabilité | Illimitée | Limitée (serveur) | Limitée (BDD) |
| Débit | Très élevé | Moyen | Faible |
| Coût | Faible (pay-per-use) | Moyen (serveur dédié) | Élevé (stockage BDD cher) |
| Durabilité | 99.999999999% (11 9s) | Dépend du RAID | Dépend de la réplication |
| Disponibilité | Très élevée (multi-AZ) | SPOF potentiel | Dépend de la BDD |
| Cas d'usage | Fichiers utilisateur, médias | Partage fichiers interne | Petits fichiers (avatars) |

## Avantages et inconvénients

**Avantages :**
- Scalabilité quasi illimitée (S3 stocke des exaoctets).
- Durabilité extrême (99.999999999% de durabilité).
- Séparation des préoccupations : le stockage est indépendant de l'application.
- Coût optimisé : on ne paie que pour ce qu'on utilise.

**Inconvénients :**
- Latence supplémentaire (appel réseau au storage).
- Complexité de la gestion des permissions.
- Dépendance au fournisseur cloud (vendor lock-in).
- Coût de sortie de données (egress).

## Cas d'usage typiques

1. **Google Drive / Dropbox** : stockage de fichiers utilisateur avec versioning.
2. **Réseau social** : photos et vidéos uploadées par les utilisateurs, servies via CDN.
3. **Plateforme SaaS** : documents, PDFs, exports générés par l'application.
4. **Backup et archive** : stockage durable pour les sauvegardes (S3 Glacier pour l'archivage).

## Bonnes pratiques

1. **UUID comme nom de fichier** : éviter les collisions et les conflits de noms.
2. **Dossier par utilisateur dans le bucket** : \`uploads/{user_id}/{file_id}.ext\` pour la séparation logique.
3. **Multipart upload pour les fichiers > 100 Mo** : avec parallélisation et reprise.
4. **Pre-signed URLs pour le téléchargement** : le serveur ne doit pas servir les fichiers directement.
5. **Virus scanning** : analyser les fichiers uploadés avant de les rendre disponibles.
6. **Lifecycle policies** : déplacer les fichiers anciens vers un stockage froid (S3 IA → Glacier).
7. **Déduplication via hash** : si deux utilisateurs uploadent le même fichier, ne le stocker qu'une fois.

## Pièges courants

1. **Upload direct vers S3 depuis le frontend** : exposer les clés AWS (risque sécurité). Toujours passer par un serveur.
2. **Pas de limite de taille** : un utilisateur upload un fichier de 5 Go → coût et timeout. Configurer des limites.
3. **Nom de fichier sans sanitization** : \`../../../etc/passwd\` comme nom de fichier → risque de path traversal.
4. **URL longue durée** : une pre-signed URL de 30 jours = fuite de données possible. Durée minimale nécessaire.
5. **Pas de versioning** : un fichier écrasé est perdu. Activer le versioning sur le bucket.
6. **Stockage BDD pour les fichiers** : stocker des fichiers binaires dans la base de données = performance dégradée et coût élevé.

Source : [Amazon S3 — Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/best-practices.html)`},
        {
          id: 'sd-12',
          question: 'Comment implémenter le rate limiting au niveau système ?',
          answer: 'Le **rate limiting** protège contre les abus à plusieurs niveaux : **infrastructure** (WAF, load balancer), **API gateway** (limite par clé API/utilisateur), **application** (limite par endpoint).\n\nAlgorithmes : **Token bucket** (rafillage continu, permet un burst — le plus courant), **Leaky bucket** (traite les requêtes à rythme constant, lisse le trafic), **Sliding window** (compteur sur fenêtre glissante, plus précis que fixed window).\n\nStockage des compteurs : **`Redis`** avec `INCR` + `EXPIRE` (atomique, partagé entre instances). Header `Retry-After` + code `429` quand la limite est atteinte.\n\n__Le rate limiting doit être au plus près de l\'entrée du système__ (API gateway ou reverse proxy) pour protéger toute la chaîne.',
          code: '# Rate limiting avec Redis\nMULTI\nINCR rate_limit:user:123\nEXPIRE rate_limit:user:123 60\nEXEC\n\n# Si count > 100 → 429 Too Many Requests',
          language: 'bash',
        
          deepDive: `# Implémenter le Rate Limiting au Niveau Système

## Qu'est-ce que c'est ?

Le **rate limiting** (limitation de débit) contrôle le nombre de requêtes qu'un client peut effectuer dans une fenêtre de temps donnée. C'est un mécanisme de protection essentiel pour prévenir les abus (bruteforce, déni de service), garantir une répartition équitable des ressources, et maintenir la stabilité du système sous charge.

Un bon rate limiter doit être : **précis** (respecter les limites), **performant** (ne pas ajouter de latence significative), **distribué** (fonctionner en cluster), et **informative** (dire au client pourquoi il est bloqué et quand il peut réessayer).

## Concept détaillé

### Algorithmes de rate limiting

**1. Token Bucket** : un seau contient des tokens qui se régénèrent à un rythme fixe. Chaque requête consomme un token. Si le seau est vide, la requête est rejetée. Permet des bursts (rafales) : si le seau est plein, on peut envoyer jusqu'à N requêtes d'un coup.

**2. Leaky Bucket** : les requêtes entrent dans un buffer de taille fixe et sont traitées à un rythme constant. Lisse le trafic mais peut rejeter des requêtes si le buffer est plein.

**3. Fixed Window** : compteur réinitialisé à chaque fenêtre de temps (ex : 100 requêtes par minute). Simple mais vulnérable aux bursts en fin de fenêtre + début de la suivante.

**4. Sliding Window Log** : enregistre chaque requête avec son timestamp dans une sorted set Redis. Pour compter, on supprime les entrées hors fenêtre et on compte le reste. Précis mais plus coûteux en mémoire.

**5. Sliding Window Counter** : compromis entre Fixed Window et Sliding Log. Combine le compteur de la fenêtre actuelle et un ratio de la fenêtre précédente.

### Implémentation avec Redis

Redis est idéal pour le rate limiting : opérations atomiques (INCR + EXPIRE), faible latence (< 1ms), partagé entre instances.

\`\`\`
Clé Redis :  rate_limit:{client_id}:{window_start}
Valeur :     compteur de requêtes
TTL :        durée de la fenêtre

Opération atomique :
  MULTI
    INCR rate_limit:user:123:1700000000
    EXPIRE rate_limit:user:123:1700000000 60
  EXEC
  → Si compteur > limite → 429 Too Many Requests
\`\`\`

## Schéma / Architecture

\`\`\`
    ┌──────┐           ┌──────────┐           ┌──────────┐
    │Client│ ──Requête─►│  API     │──►(pass)──►│ Backend  │
    └──────┘           │  Gateway │           └──────────┘
                       │          │
                       │  Rate    │──►(block)──► 429 Too Many
                       │  Limiter │              Requests
                       └────┬─────┘
                            │
                     ┌──────▼──────┐
                     │    Redis     │
                     │  (compteurs) │
                     └─────────────┘

    Niveaux de rate limiting :
    ┌─────────────────────────────────────┐
    │ 1. Infrastructure (WAF/Cloudflare)  │ ← Protection brute
    │ 2. API Gateway (Kong, AWS API GW)   │ ← Par plan utilisateur
    │ 3. Application (Middleware)          │ ← Par endpoint
    │ 4. Base de données (max_connections) │ ← Protection fine
    └─────────────────────────────────────┘
\`\`\`

## Comparaison des algorithmes

| Algorithme | Précision | Mémoire | Burst supporté | Complexité |
|------------|-----------|---------|----------------|------------|
| Token Bucket | Bonne | Faible | Oui (taille du seau) | Faible |
| Leaky Bucket | Bonne | Faible | Non (lisse tout) | Faible |
| Fixed Window | Faible (effet de bord) | Très faible | Oui (en fin de fenêtre) | Très faible |
| Sliding Window Log | Parfaite | Élevée | Oui | Élevée |
| Sliding Window Counter | Très bonne | Faible | Limité | Modérée |

## Avantages et inconvénients

**Avantages :**
- Protection contre le scraping, le bruteforce, le DDoS.
- Équité entre clients (pas de monopolisation des ressources).
- Maîtrise des coûts (limiter les appels API coûteux).
- Informative (headers X-RateLimit-*).

**Inconvénients :**
- Faux positifs : des clients légitimes peuvent être bloqués (seuils trop bas).
- Complexité distribuée : maintenir l'état du compteur en cluster.
- Latence additionnelle : chaque requête vérifie le compteur Redis.
- Configuration : trouver les bons seuils nécessite de l'expérimentation.

## Cas d'usage typiques

1. **API REST publique** : limiter à 100 requêtes/min pour un compte gratuit, 1000/min pour un compte premium.
2. **Endpoint de login** : 5 tentatives par minute pour prévenir le bruteforce de mots de passe.
3. **Upload de fichiers** : 10 uploads par heure par utilisateur pour limiter l'utilisation du stockage.
4. **Web scraping d'API** : protéger les données contre l'extraction massive par des bots.

## Bonnes pratiques

1. **Retourner des headers informatifs** : \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, \`X-RateLimit-Reset\`.
2. **Retourner le code 429 Too Many Requests** avec un header \`Retry-After\` contenant le temps d'attente en secondes.
3. **Implémenter plusieurs couches** : WAF (IP), API Gateway (clé API), Application (utilisateur).
4. **Seuils adaptés au plan** : les clients payants ont des limites plus élevées.
5. **Burst allowance** : pour les clients qui ont des pics d'activité légitimes.
6. **Monitoring des blocages** : un taux de 429 élevé peut indiquer un faux positif ou une attaque.
7. **Rate limiter côté client** : implémenter des retry avec backoff exponentiel dans le client.

## Pièges courants

1. **Seuil trop bas** : des clients légitimes sont bloqués et l'expérience utilisateur est dégradée. Analyser les métriques avant de fixer les seuils.
2. **Seuil trop haut** : le rate limiting ne sert à rien. Une attaque passe à travers.
3. **Rate limiting en mémoire locale uniquement** : en cluster, chaque nœud a ses propres compteurs → un client peut faire N requêtes × nombre de nœuds.
4. **Effet de bord du Fixed Window** : 100 requêtes autorisées par minute → 100 à 59s + 100 à 00s = 200 requêtes en 2 secondes.
5. **Oublier les limites par IP vs authentifiées** : des utilisateurs légitimes sur le même réseau (entreprise, école) partagent la même IP → un seul utilisateur malicieux bloque tous les autres.
6. **Pas de backoff exponentiel côté client** : le client continue d'appeler au maximum après un 429 → aggrave la charge.

Source : [Stripe — Rate Limiter](https://stripe.com/blog/rate-limiter)`},
      ],
    },
  ],
};