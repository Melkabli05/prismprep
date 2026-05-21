import type { InterviewCategory } from '../../../../core/models/interview.models';

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
          answer: '**Vertical** (*scale up*) : augmenter les ressources d\'un serveur (CPU, RAM). Simple, pas de changement d\'architecture, mais **limite physique** et point de défaillance unique.\n\n**Horizontal** (*scale out*) : ajouter des serveurs. Pas de limite théorique, résilience (un serveur tombe, les autres prennent le relais), mais **complexité** : load balancing, cohérence des données, sessions distribuées.\n\n__Le vertical a ses limites — le horizontal est la seule voie vers l\'échelle.__ En pratique : on commence vertical, puis on passe horizontal quand ça ne suffit plus. Le cloud facilite le horizontal avec l\'auto-scaling.',
        
          deepDive: `# Scaling horizontal vs vertical

## Quest-ce que cest ?

Le scaling (mise à l'échelle) détermine comment votre système grossit pour gérer plus de charge. Deux stratégies principales existent.

## Scaling Vertical (Scale Up)

Ajouter plus de ressources à une machine existante :
- Plus de CPU
- Plus de RAM
- Plus de disk
- Meilleurs hardware

**Avantages :**
- Simple à implémenter
- Pas de modification du code
- Latence plus faible (pas de réseau entre services)

**Inconvénients :**
- Limité par le hardware max
- Single point of failure
- Coût exponentiel (machine 2x plus puissante coûte bien plus que 2x)

**Quand utiliser :**
- Bases de données relationnelles (dans une certaine mesure)
- Cache local
- Applications monolithiques
- Charges prévisibles et stables

## Scaling Horizontal (Scale Out)

Ajouter plus de machines au système :
- Plus de serveurs
- Load balancer devant
- Données partitionnées

**Avantages :**
- Presque illimité
- Résilient (pas de SPOF)
- Coût linéaire
- Cloud-native par nature

**Inconvénients :**
- Plus complexe (répartition, cohérence)
- Latence réseau entre services
- Problèmes de分布式 (consensus, coordination)

**Quand utiliser :**
- Microservices
- Applications avec pics de traffic imprévisibles
- Traitement de données massives
- Applications требующие haute disponibilité

## Comparaison

| Critere | Vertical | Horizontal |
|---------|----------|------------|
| Complexité | Faible | Haute |
| Limite | Hardware | Nombre de machines |
| Coût | Exponentiel | Linéaire |
| Disponibilité | SPOF | HA possible |
| Données | Centralisées | Distribuées |

## Hybride (approche pragmatique)

Approche recommandée :
1. Commencer vertical jusqu'à un certain point
2. Ajouter horizontal quand les limites sont atteignables
3. Utiliser managed services (RDS, ElastiCache) qui font le scaling automatiquement

Source : [AWS - Scaling Horizontally vs Vertically](https://aws.amazon.com/pt/elasticcomputecloud/faqs/)`},
        {
          id: 'sd-2',
          question: 'Comment fonctionne le load balancing ?',
          answer: 'Le **load balancer** répartit le trafic entre plusieurs serveurs pour éviter la surcharge d\'un seul. Algorithmes : **Round Robin** (tour à tour), **Least Connections** (serveur le moins chargé), **IP Hash** (même client → même serveur, utile pour les sessions).\n\nTypes : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus flexible). Health checks réguliers : un serveur malade est retiré de la rotation.\n\n__Le load balancer est le point d\'entrée — il doit être hautement disponible__ (multi-AZ, DNS failover). Outils : `NGINX`, `HAProxy`, `AWS ALB`.',
        
          deepDive: `# Comment fonctionne le load balancing

## Quest-ce que cest ?

Un load balancer distribue le traffic entrant entre plusieurs serveurs pour optimiser l'utilisation des ressources, maximiser le throughput, et minimiser les temps de réponse.

## Types de load balancing

**1. Couche 4 (Transport)**
- Balance sur IP + Port
- Moins d'analyse, plus performant
- Exemple : HAProxy, AWS NLB

**2. Couche 7 (Application)**
- Balance sur contenu (URL, headers, cookies)
- Plus intelligent mais plus lent
- Exemple : NGINX, AWS ALB

## Algorithmes de distribution

| Algorithme | Description | Cas d'usage |
|------------|-------------|--------------|
| Round Robin | Tour à tour séquentiel | Serveurs identiques |
| Weighted Round Robin | Plus au serveur plus puissant | Serveurs heterogenes |
| Least Connections | Serveur avec moins de connexions actives | Sessions longues |
| IP Hash | Hash de l'IP source | Sticky sessions |
| Random | Sélection aléatoire | Répartition simple |

## Health Checks

Les load balancers vérifient la santé des serveurs :

\`\`\`nginx
# NGINX health check
server {
    location /health {
        proxy_pass http://backend;
        proxy_connect_timeout 1s;
        proxy_read_timeout 1s;
        health_check interval=5s fails=3 passes=2;
    }
}
\`\`\`

\`\`\`yaml
# Kubernetes readiness probe
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
\`\`\`

## Architecture typique

Client -> Load Balancer -> Server A
                          -> Server B
                          -> Server C

## Bonnes pratiques

- Toujours configurer des health checks
- Implémenter le circuit breaker cot serveur
- Utiliser des sessions sticky uniquement quand nécessaire
- Monitorer les métriques (latence, erreurs, connections)
- Prévoir le session de l'un des backends

## Pièges courants

- Oublier de remove un serveur en maintenance
- Health check trop permissif (ne détecte pas les vrais problèmes)
- Point unique d'échec si un seul load balancer
- Ignorer le warm-up des nouveaux serveurs

Source : [NGINX Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)`},
        {
          id: 'sd-3',
          question: 'Quelles stratégies de cache utiliser ?',
          answer: '**Cache côté client** : navigateur (headers `Cache-Control`, `ETag`), réduit les requêtes serveur. **Cache CDN** : contenu statique aux *edge locations*. **Cache applicatif** : `Redis`/`Memcached` pour les données fréquemment lues (sessions, résultats de requêtes).\n\n**Cache BDD** : query cache, buffer pool. Stratégies d\'invalidation : **TTL** (expiration automatique), **write-through** (écriture simultanée cache + BDD), **write-behind** (écriture différée), **cache-aside** (l\'app gère le cache manuellement).\n\n__Le problème n°1 du cache est l\'invalidation__ (« There are only two hard things in Computer Science: cache invalidation and naming things »). Définissez des TTL adaptés et invalidez explicitement sur les écritures.',
        
          deepDive: `# Stratégies de cache

## Quest-ce que cest ?

Le cache stocke des données fréquemment accédées en mémoire pour réduire la latence et la charge sur les systèmes sous-jacents.

## Types de cache

**1. Cache Local (In-Memory)**
- Données en mémoire sur le serveur
- Accès le plus rapide
- Non partagé entre instances

\`\`\`java
// Caffeine Cache
Cache<String, User> cache = Caffeine.newBuilder()
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .maximumSize(1000)
    .build();
\`\`\`

**2. Cache Distribué (Shared)**
- Redis, Memcached
- Partagé entre tous les serveurs
- Latence réseau (~1ms)

\`\`\`java
@Service
public class UserService {
    @Autowired
    private RedisTemplate<String, User> redis;
    
    public User getUser(Long id) {
        String key = "user:" + id;
        User user = redis.opsForValue().get(key);
        if (user == null) {
            user = db.findById(id);
            redis.opsForValue().set(key, user, 10, TimeUnit.MINUTES);
        }
        return user;
    }
}
\`\`\`

**3. CDN (Content Delivery Network)**
- Cache des assets statiques
- Proche de l'utilisateur (geographiquement)
- Headers Cache-Control

## Stratégies de invalidation

| Stratégie | Description | Risque |
|-----------|-------------|--------|
| Cache Aside | Application gère explicitement | Données obsolètes |
| Write Through | Écriture en cache et BD simultanément | Latence en écriture |
| Write Behind | Écriture en cache, synchronisation async | Perte de données |
| Refresh Ahead | Refresh automatique avant expiration | Complexity |

## Bonnes pratiques

- Cache uniquement les données immuables ou avec stratégie d'invalidation claire
- Prévoir le cold start (commentpopuler le cache)
- Monitorer le hit rate (cible > 90%)
- avoir une estrategia de fallback si le cache tombe
- Définir des TTL adaptés à la fraîcheur requise

## Pièges courants

- Cache des données trop longtemps (stale data)
- Cache sans limite de taille (OOM)
- Ne pas gérer le thundering herd (plusieurs requêtes simultanées vers la source)
- Ignorer le cache en cas de write (données incohérentes)
- Prévoir l'éviction

Source : [Caching Strategies - Redis Documentation](https://redis.io/docs/manual/patterns/)`},
        {
          id: 'sd-4',
          question: 'Qu\'est-ce que le sharding de base de données ?',
          answer: 'Le **sharding** partitionne les données horizontalement across plusieurs serveurs (shards). Chaque shard contient un sous-ensemble des données. Stratégies de clé de sharding : **hash-based** (distribution uniforme mais range queries impossibles), **range-based** (requêtes par plage efficaces mais risque de hotspots).\n\nAvantage : **scale-out** de la BDD, chaque shard est plus petit = requêtes plus rapides. Inconvénients : **cross-shard queries** complexes, jointures impossibles entre shards, **rebalancing** coûteux quand on ajoute un shard.\n\n__Le sharding est la solution de dernier recours__ — essayez d\'abord la réplication, le partitionnement vertical, le cache. Sharder trop tôt ajoute une complexité énorme.',
        
          deepDive: `# Quest-ce que le sharding de base de donnees

## Quest-ce que cest

Le sharding divise une base de donnees en plusieurs partitions (shards). Chaque shard contient un sous-ensemble des donnees, permettant de distribuer la charge sur plusieurs serveurs.

## Strategies de sharding

- Horizontal (Range): Partition par plage de valeurs (ex: par date, par ID).
- Vertical: Partition par schema (ex: users sur un serveur, orders sur un autre).
- Hash-based: Partition par hash dune cle (ex: user_id % n).

## Syntaxe et exemples

Sharding par hash avec application-level routing:
\`\`\`java
@Configuration
public class ShardConfig {
    private final int shardCount = 4;

    public int getShardId(String userId) {
        return Math.abs(userId.hashCode()) % shardCount;
    }
}

@Service
public class ShardedUserRepository {
    private final List<UserRepository> repositories;
    private final ShardConfig shardConfig;

    public Optional<User> findById(String userId) {
        int shardId = shardConfig.getShardId(userId);
        return repositories.get(shardId).findById(userId);
    }

    public void save(User user) {
        int shardId = shardConfig.getShardId(user.getId());
        repositories.get(shardId).save(user);
    }
}
\`\`\`

Configuration:
\`\`\`yaml
spring:
  datasource:
    shard-0:
      url: jdbc:postgresql://shard0:5432/mydb
    shard-1:
      url: jdbc:postgresql://shard1:5432/mydb
\`\`\`

## Bonnes pratiques

- Choisir une cle de sharding qui equilibre la distribution (user_id, tenant_id).
- Prevoir le resharding (consistent hashing pour minimiser les migrations).
- Utiliser un router de requetes pour masquer le sharding.
- Garder les jointures cross-shard au minimum.

## Pieges courants

- Hot spots sur un shard = Distribution inegale.
- Jointures cross-shard tres lentes = Performance degradee.
- Resharding sans consistent hashing = Migration massive.
- Transaction ACID perdue sur plusieurs shards = Inconsistance.

Source : [Google Spanner](https://research.google.com/archive/spanner-osdi2012.pdf)`},
        {
          id: 'sd-5',
          question: 'Quand et comment utiliser les files de messages ?',
          answer: 'Les **message queues** découplent les producteurs des consommateurs pour **asynchroniser** le traitement. Cas d\'usage : envoi d\'emails, génération de PDF, notifications, traitement par lots.\n\n**`RabbitMQ`** : routing complexe, protocole AMQP, accusés de réception, idéal pour les workflows. **`Kafka`** : flux d\'événements massifs, rétention durable, ordre par partition, idéal pour le *event sourcing* et le streaming.\n\n__Une file de messages élimine le couplage temporel__ : le producteur n\'attend pas le consommateur. C\'est aussi un **buffer** qui absorbe les pics de charge. Attention au *poison message* et aux *dead letter queues*.',
        
          deepDive: `# Files de messages

## Quest-ce que cest ?

Les message queues permettent la communication asynchrone entre services. Au lieu d'appeler un service directement (couplage synchrone), on envoie un message qui sera traité plus tard.

## Concepts clés

**Producer** : Service qui envoie les messages
**Consumer** : Service qui traite les messages
**Queue** : Buffer qui stocke les messages
**Message** : Payload de données

## Solutions courantes

| Solution | Type | Caractéristiques |
|----------|------|------------------|
| RabbitMQ | Broker classique | Flexible, many features |
| Apache Kafka | Log distribué | Haute performance, persistence |
| AWS SQS | Managed service | Serverless, simple |
| Redis Streams | In-memory | Faible latence |

## Exemple avec RabbitMQ

\`\`\`java
// Producer
@Service
public class OrderService {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void createOrder(Order order) {
        // Traitement synchrone
        orderRepo.save(order);
        
        // Envoi asynchrone pour notifications
        rabbitTemplate.convertAndSend("orders", "new", order.getId());
    }
}

// Consumer
@Component
public class NotificationConsumer {
    @RabbitListener(queues = "orders")
    public void handleOrderCreated(Long orderId) {
        emailService.sendConfirmation(orderId);
        inventoryService.updateStock(orderId);
    }
}
\`\`\`

## Patterns de messaging

**1. Point-to-Point**
- Un producer, un consumer
- La queue traite un message à la fois
- Use case : Traitement de commandes

**2. Pub/Sub (Publish-Subscribe)**
- Un producer, plusieurs consumers
- Chaque consumer reçoit une copie
- Use case : Notifications, logging

**3. Dead Letter Queue**
- Queue pour les messages qui échouent
- Permet de les retraiter ou d'investiguer

## Bonnes pratiques

- Rendre les messages idempotents (même traitement plusieurs fois = même résultat)
- Traiter les messages en ordre si nécessaire (ou utiliser des partitions)
- Implementer le retry avec backoff exponentiel
- Monitorer la profondeur des queues (backlog)
- Prévoir le cas où le consumer est plus lent que le producer

## Pièges courants

- Couplage temporel (producer attend le consumer)
- Perte de messages (pas de persistence ou acks)
- Message qui ne part jamais (dead letter non gérée)
- Transaction分布式 (coordination producer + consumer)
- Ignorer le ordering des messages quand c'est important

Source : [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)`},
        {
          id: 'sd-6',
          question: 'Comment appliquer le théorème CAP en pratique ?',
          answer: 'Le **théorème CAP** : dans un système distribué en cas de partition réseau, on doit choisir entre **C**onsistency (cohérence) et **A**vailability (disponibilité). On ne peut pas avoir les deux simultanément.\n\n**CP** : cohérence prioritaire — on refuse les écritures si on ne peut pas garantir la cohérence (`Zookeeper`, `etcd`). **AP** : disponibilité prioritaire — on accepte les écritures même déconnecté, synchronisation ultérieure (`Cassandra`, `DynamoDB`).\n\n__En pratique, la plupart des systèmes web choisissent AP avec *eventual consistency*__ — la cohérence forte est rarement nécessaire pour la plupart des use case. Le théorème CAP explique pourquoi, pas ce qu\'il faut choisir.',
        
          deepDive: `# Comment appliquer le theoreme CAP en pratique

## Quest-ce que cest

CAP theorem: Un systeme distribue ne peut garantir que 2 des 3 proprietes - Consistency, Availability, Partition Tolerance. Les partitions reseau etant inevitables, le choix reel est entre Consistency et Availability.

## Les 3 combinaisons

- CP (Consistency + Partition Tolerance): Donnees toujours a jour, mais certain noeuds peuvent etre inaccessibles. Ex: HBase, MongoDB (avec majority read).
- AP (Availability + Partition Tolerance): Tous les noeuds accessibles, mais donnees peuvent etre stale. Ex: Cassandra, DynamoDB.
- CA (Consistency + Availability): Impossible en cas de partition. Un systeme "CA" est en realite un systeme qui choisit C en cas de partition.

## Syntaxe et exemples

Choix CAP dans la configuration:
\`\`\`java
// Cassandra - AP par defaut
@Bean
public CassandraClusterFactoryBean cluster() {
    CassandraClusterFactoryBean cluster = new CassandraClusterFactoryBean();
    cluster.setContactPoints("cassandra1,cassandra2,cassandra3");
    // Eventual consistency par defaut
    return cluster;
}

// HBase - CP
@Configuration
public class HBaseConfig {
    @Bean
    public HBaseConfiguration hbaseConfig() {
        org.apache.hadoop.conf.Configuration config = 
            HBaseConfiguration.create();
        config.set("hbase.zookeeper.quorum", "zk1,zk2,zk3");
        // Strong consistency
        return config;
    }
}
\`\`\`

Gestion des conflits (eventual consistency):
\`\`\`java
@Service
public class OrderService {
    // Resolution Last-Write-Wins
    public void updateOrder(String orderId, OrderUpdate update) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow();
        
        if (update.getTimestamp().isAfter(order.getUpdatedAt())) {
            orderRepository.save(update.toOrder());
        }
    }
}
\`\`\`

## Bonnes pratiques

- Analyser les besoins reelle: financieres = CP, social media = AP.
- Utiliser des niveaux de coherence configurables (strong, bounded stale).
- Prevoir la detection et la resolution des conflits.
- Combiner avec des patterns like Quorum, Read Repair.

## Pieges courants

- Croire quon peut avoir CAP = 3 proprietes en meme temps.
- Choisir C ou A sans analyser les besoins metier.
- Ne pas planifier la reconciliation des donnees.

Source : [CAP Theorem Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)`},
        {
          id: 'sd-7',
          question: 'Qu\'est-ce que la cohérence éventuelle et comment la gérer ?',
          answer: '**Eventual consistency** : si aucune nouvelle écriture n\'est faite, toutes les répliques convergeront *finalement* vers le même état. Entre-temps, des lectures peuvent retourner des données **obsolètes**.\n\nGestion : **vector clocks** (détection de conflits), **conflict resolution** (dernière écriture gagne, merge manuel), **read repair** (correction à la lecture), **anti-entropy** (synchronisation périodique en arrière-plan).\n\n__La cohérence éventuelle est acceptable pour les likes, les compteurs de vues, les feeds__ — pas pour les transactions bancaires. Identifiez quelles données exigent la cohérence forte vs lesquelles tolèrent l\'éventuelle.',
        
          deepDive: `# Quest-ce que la coherence eventuelle et comment la gerer

## Quest-ce que cest

Eventual consistency garantit quen labsence de nouvelles mises a jour, toutes les replicas dun donnee convergerontEventually vers la meme valeur. Le systeme est temporairement inconsistent apres une ecriture.

## Modèles de coherence

- Read-after-write: Un client lit sa propre ecriture immediatement.
- Read-after-read: Deux lectures consecutives retournent le meme resultat.
- Bounded staleness: Les lectures peuvent etre stale mais limitees par un delta.
- Causal: Les operations causellement reliees sont vues dans lordre.

## Syntaxe et exemples

Configuration du niveau de coherence:
\`\`\`java
// DynamoDB - Lecture eventuale
@GetMapping("/users/{id}")
public User getUser(@PathVariable String id) {
    GetItemRequest request = GetItemRequest.builder()
        .tableName("users")
        .key(Map.of("id", AttributeValue.builder().s(id).build()))
        .build();
    
    // ConsistentRead = false pour eventual consistency
    return dynamoDb.getItem(request).item();
}

// MongoDB - Majorite de lectures
@Bean
public MongoClientSettings mongoClientSettings() {
    return MongoClientSettings.builder()
        .readConcern(ReadConcern.MAJORITY)
        .writeConcern(WriteConcern.W1)
        .build();
}
\`\`\`

Resolution de conflits:
\`\`\`java
@Service
public class ShoppingCartService {
    
    public ShoppingCart mergeCarts(String userId, 
                                   ShoppingCart localCart, 
                                   ShoppingCart serverCart) {
        // Fusionner les items - prendre le max de quantite
        Map<String, Integer> merged = new HashMap<>(serverCart.getItems());
        
        localCart.getItems().forEach((productId, qty) -> 
            merged.merge(productId, qty, Math::max)
        );
        
        return new ShoppingCart(userId, merged);
    }
}
\`\`\`

## Bonnes pratiques

- Accepter linconsistance temporaire si acceptable pour le cas usage.
- Informer lutilisateur quand les donnees sont potentiellement stale.
- Implementer des operations idempotentes pour les retries.
- Utiliser des vecteurs de versions pour detecter les conflits.

## Pieges courants

- Croire que eventual = pas de coherence = Donnees perdue.
- Ne pas gerer les conflits = Perte de donnees.
- Lecture sans verification = Stale data affichee.

Source : [AWS DynamoDB Consistency](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.DataConsistency.html)`},
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
        
          deepDive: `# Concevez un raccourcisseur dURL

## Quest-ce que cest

Un service qui transforme une URL longue en une URL courte unique. LURL courte redirige vers lURL originale. Doit gerer des millions dURLs avec une latence minimale.

## Architecture

- URL Generation: Generer des короткие идентификаторы уникальы.
- Storage: Stocker le mapping court -> long en base de donnees.
- Redirect: Redirection HTTP 301/302 vers lURL originale.
- Analytics: Tracker les clicks, referers, geographie.

## Syntaxe et exemples

Generation dURL courte:
\`\`\`java
@Service
public class UrlShortenerService {
    private final UrlRepository urlRepository;
    
    // Base62 encoding
    private static final String ALPHABET = 
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    public String generateShortUrl(String longUrl) {
        // Hash + base62 encoding
        String hash = calculateHash(longUrl);
        String shortCode = base62Encode(hash);
        
        // Verifier unicite
        while (urlRepository.existsByShortCode(shortCode)) {
            shortCode = base62Encode(hash + System.nanoTime());
        }
        
        urlRepository.save(new UrlMapping(shortCode, longUrl));
        return shortCode;
    }
    
    private String base62Encode(String input) {
        int hash = input.hashCode();
        StringBuilder sb = new StringBuilder();
        while (hash > 0) {
            sb.append(ALPHABET.charAt(hash % 62));
            hash /= 62;
        }
        return sb.reverse().toString();
    }
}
\`\`\`

Redirection:
\`\`\`java
@RestController
public class RedirectController {
    
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {
        return urlRepository.findByShortCode(shortCode)
            .map(url -> ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .location(URI.create(url.getLongUrl()))
                .<Void>build())
            .orElse(ResponseEntity.notFound().build());
    }
}
\`\`\`

Cache Redis:
\`\`\`java
@Service
public class CachedUrlRepository {
    private final RedisTemplate<String, String> redis;
    
    public Optional<String> findLongUrl(String shortCode) {
        String cached = redis.opsForValue().get("url:" + shortCode);
        if (cached != null) {
            return Optional.of(cached);
        }
        
        return urlRepository.findByShortCode(shortCode)
            .map(url -> {
                redis.opsForValue().set("url:" + shortCode, url.getLongUrl());
                return url.getLongUrl();
            });
    }
}
\`\`\`

## Bonnes pratiques

- Utiliser un cache en memoire (Redis) pour les URLs populaires.
- Generer des URLs courtes aleatoires pour eviter les collisions.
- Implementer le rate limiting pour eviter les abuse.
- Planifier la rotation des URLs courtes pour les liens sensibles.

## Pieges courants

- Hash collision sans verification = Erreur 404.
- Pas de cache = DB surchargee sur les URLs populaires.
- URL courte trop courte = Collision inevitable.

Source : [Bitly Architecture](https://bitly.com/blog/architecture)`},
        {
          id: 'sd-9',
          question: 'Concevez un système de chat en temps réel',
          answer: '**Protocole** : `WebSocket` pour la communication bidirectionnelle temps réel (pas du polling HTTP). **Architecture** : chaque serveur de chat gère les connexions WebSocket actives, les messages sont routés via un **message broker** (`Redis Pub/Sub` ou `Kafka`) entre serveurs.\n\n**Stockage** : BDD NoSQL (`Cassandra`/`DynamoDB`) pour l\'historique des messages, clé = `conversation_id`, tri par timestamp. **Présence** : heartbeat + Redis pour les statuts en ligne.\n\n**Groupes** : un message → broadcast à tous les membres du groupe via le broker. **Push notifications** pour les utilisateurs hors ligne via `Firebase`/`APNs`.\n\n__Le défi principal est le routage inter-serveurs quand les membres d\'un chat sont connectés à des serveurs différents.__',
        
          deepDive: `# Concevez un systeme de chat en temps reel

## Quest-ce que cest

Un systeme de messagerie instantanee permettant denvoyer et recevoir des messages en temps reel. Doit supporter des millions de connections concurrentes avec une latence minimale.

## Architecture

- WebSocket: Connexion bidirectionnelle persistante.
- Message Broker: Kafka/RabbitMQ pour router les messages.
- Presence Service: Tracker les utilisateurs en ligne.
- Notification Push: Alerter les utilisateurs inactifs.

## Syntaxe et exemples

WebSocket Handler:
\`\`\`java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/chat")
            .setAllowedOrigins("*");
    }
}

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final ConcurrentHashMap sessions = new ConcurrentHashMap();
    private final MessageBroker messageBroker;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = extractUserId(session);
        sessions.put(userId, session);
        presenceService.userOnline(userId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, 
                                     TextMessage message) {
        ChatMessage chatMessage = parseMessage(message.getPayload());
        messageBroker.send(chatMessage.getRecipientId(), chatMessage);
        persistMessage(chatMessage);
    }
}
\`\`\`

Kafka Producer/Consumer:
\`\`\`java
@Service
public class MessageBroker {
    private final KafkaTemplate kafkaTemplate;

    public void send(String recipientId, ChatMessage message) {
        kafkaTemplate.send("chat-messages", recipientId, message);
    }
}

@Component
public class ChatMessageConsumer {
    @KafkaListener(topics = "chat-messages")
    public void consume(ChatMessage message) {
        WebSocketSession session = sessions.get(message.getRecipientId());
        if (session != null && session.isOpen()) {
            session.sendMessage(toTextMessage(message));
        }
    }
}
\`\`\`

Presence Service:
\`\`\`java
@Service
public class PresenceService {
    private final RedisTemplate redis;
    
    public void userOnline(String userId) {
        redis.opsForValue().set("presence:" + userId, "online", 
            Duration.ofMinutes(5));
    }
    
    public boolean isUserOnline(String userId) {
        return "online".equals(redis.opsForValue().get("presence:" + userId));
    }
}
\`\`\`

## Bonnes pratiques

- Utiliser un load balancer WebSocket avec sticky sessions.
- Implementer le heartbeat pour detecter les connexions mortes.
- Stocker les messages hors ligne et les deliver au reconnect.
- Crypter les messages avec TLS/WSS.

## Pieges courants

- Pas de heartbeat = Connexion morte non detectee.
- Stockage insuffisant des messages hors ligne = Messages perdus.
- Pas de backpressure = Memoire saturee.
- Singleton WebSocket en cluster = Distribution inegale.

Source : [Slack Engineering](https://slack.engineering/caling-home/)`},
        {
          id: 'sd-10',
          question: 'Concevez un fil d\'actualité (news feed)',
          answer: '**Deux approches** : **Pull** (fan-out on read) — à chaque visite, on agrège les posts des abonnements (lourd si beaucoup d\'abonnés), **Push** (fan-out on write) — à chaque post, on pousse dans les feeds de tous les abonnés (lourd pour les comptes populaires).\n\n**Approche hybride** : push pour les utilisateurs normaux, pull pour les comptes populaires (célébrités). Les feeds sont **pré-calculés** et stockés dans un cache (`Redis`), mis à jour de manière asynchrone.\n\n**Ranking** : algorithme de scoring (récence, engagement, affinité) pour trier les posts. **Pagination** cursor-based pour le scroll infini. **CDN** pour les images/vidéos.\n\n__Le news feed est le cas d\'usage classique du pattern fan-out.__ La clé est le choix push vs pull selon la popularité.',
        
          deepDive: `# Concevez un fil dactualite (news Feed)

## Quest-ce que cest

Un news feed aggregateur le contenu de plusieurs sources (amis, pages suivies) et le trie chronologiquement ou par pertinence. Cest le c oeur de Facebook, Twitter, Instagram.

## Architecture

- Pull Model: Le client recupere les posts des utilisateurs suivie (Twitter early)
- Push Model (Fan-out on Write): Les posts sont envoyes aux followers ecriture (Facebook)
- Hybrid: Push pour petits comptes, Pull pour gros comptes (Twitter actuel)

## Syntaxe et exemples

Service de publication:
\`\`\`java
@Service
public class PostService {
    @Autowired
    private FanoutService fanoutService;

    public Post createPost(String userId, String content) {
        Post post = postRepository.save(new Post(userId, content));
        
        // Async fan-out aux followers
        fanoutService.fanoutPost(post);
        return post;
    }
}

@Service
public class FanoutService {
    public void fanoutPost(Post post) {
        List<String> followers = followerRepository.findFollowers(post.getUserId());
        
        followers.parallelStream().forEach(follower -> 
            feedCache.push(follower, post.getId())
        );
    }
}
\`\`\`

Feed reader:
\`\`\`java
@Service
public class FeedService {
    public List<Post> getFeed(String userId, int offset, int limit) {
        List<String> postIds = feedCache.getFeed(userId, offset, limit);
        
        return postIds.stream()
            .map(postRepository::findById)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .toList();
    }
}
\`\`\`

## Bonnes pratiques

- Cacheer le feed pre-calcule pour eviter les calculs temps reel.
- Utiliser Redis sorted sets avec timestamps pour le tri.
- Implementer le lazy loading pour les gros comptes.
- Prevenir le spam avec rate limiting par utilisateur.

## Pieges courants

- Fan-out trop lent = Delai de publication visible.
- Cache too big = Memoire epuisee.
- Ne pas gerer les supprimons = Contenu orphelin.

Source : [Facebook TAO](https://www.facebook.com/notes/facebook-engineering/tao-the-power-of-the-graph/10151525983993940/)`},
        {
          id: 'sd-11',
          question: 'Concevez un système de stockage de fichiers',
          answer: '**Stockage objet** : `S3`-like, chaque fichier = objet avec metadata, accès via URL signée. Avantages : scalable, durable (réplication multi-AZ), pas de limite de taille.\n\n**Upload** : petit fichier → upload direct, gros fichier → **multipart upload** (chunks parallèles, reprise sur échec). **Téléchargement** : URL signée à durée limitée ou via CDN pour les fichiers publics.\n\n**Architecture** : service d\'upload → stockage objet (`S3`) → metadata en BDD (nom, taille, owner, permissions). CDN pour la distribution. **Déduplication** via hash SHA-256 pour économiser l\'espace.\n\n__Pour les gros volumes, le multipart upload est indispensable__ — il permet la parallélisation et la reprise sur erreur.',
        
          deepDive: `# Concevez un systeme de stockage de fichiers

## Quest-ce que cest

Un systeme de stockage scalable pour uploader, stocker et servir des fichiers (images, videos, documents). Doit gerer la redundancy, le caching, et le CDN.

## Architecture

Composants:
- File Storage (S3, GCS): Stockage objets avec replication.
- Metadata Database: PostgreSQL pour les metadonnees.
- CDN: Cache geographique pour le delivery.
- Cache Layer: Redis pour les fichiers frequents.

## Syntaxe et exemples

Service de stockage:
\`\`\`java
@Service
public class FileStorageService {
    private final S3Client s3Client;
    private final FileMetadataRepository metadataRepository;
    private final CacheManager cacheManager;

    public FileMetadata uploadFile(String userId, String fileName, 
                                   InputStream data, String contentType) {
        String fileId = UUID.randomUUID().toString();
        String key = generateS3Key(userId, fileId, fileName);
        
        // Upload vers S3
        PutObjectResponse response = s3Client.putObject(
            PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build(),
            RequestBody.fromInputStream(data, -1)
        );
        
        // Sauvegarder les metadonnees
        FileMetadata metadata = new FileMetadata(
            fileId, userId, fileName, key, contentType, 
            LocalDateTime.now()
        );
        return metadataRepository.save(metadata);
    }
}
\`\`\`

Telechargement avec presigned URL:
\`\`\`java
public String generateDownloadUrl(String fileId) {
    FileMetadata file = metadataRepository.findById(fileId)
        .orElseThrow(() -> new FileNotFoundException(fileId));
    
    return s3Client.presignedGetObject(
        GetObjectRequest.builder()
            .bucket(bucketName)
            .key(file.getS3Key())
            .build(),
        Duration.ofMinutes(15)
    ).toString();
}
\`\`\`

## Bonnes pratiques

- Generer des noms de fichiers UUID pour eviter les conflits.
- Stocker les fichiers sur plusieurs regions/zones pour redundancy.
- Utiliser un CDN pour servir les fichiers publics.
- Implementer le lifecycle policy pour Archiver les vieux fichiers.

## Pieges courants

- Ne pas limiter la taille des fichiers = Couts explosion.
- Upload direct vers DB (pas S3) = Performance degradee.
- Pas de virus scanning = Risque de securite.

Source : [Amazon S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide最佳实践.html)`},
        {
          id: 'sd-12',
          question: 'Comment implémenter le rate limiting au niveau système ?',
          answer: 'Le **rate limiting** protège contre les abus à plusieurs niveaux : **infrastructure** (WAF, load balancer), **API gateway** (limite par clé API/utilisateur), **application** (limite par endpoint).\n\nAlgorithmes : **Token bucket** (rafillage continu, permet un burst — le plus courant), **Leaky bucket** (traite les requêtes à rythme constant, lisse le trafic), **Sliding window** (compteur sur fenêtre glissante, plus précis que fixed window).\n\nStockage des compteurs : **`Redis`** avec `INCR` + `EXPIRE` (atomique, partagé entre instances). Header `Retry-After` + code `429` quand la limite est atteinte.\n\n__Le rate limiting doit être au plus près de l\'entrée du système__ (API gateway ou reverse proxy) pour protéger toute la chaîne.',
          code: '# Rate limiting avec Redis\nMULTI\nINCR rate_limit:user:123\nEXPIRE rate_limit:user:123 60\nEXEC\n\n# Si count > 100 → 429 Too Many Requests',
          language: 'bash',
        
          deepDive: `# Comment implementer le rate limiting au niveau systeme

## Quest-ce que cest

Le rate limiting controle le nombre de requetes quun client peut faire dans un temps donne. Protection contre les abuse, les DDOS, et保证了 la stabilite du systeme.

## Algorithmes

- Token Bucket: Tokens ajoutes a un rythme fixe, chaque requete consume un token.
- Leaky Bucket: File dattente avec un debit de sortie fixe.
- Fixed Window: Compteur par fenetre de temps fixe.
- Sliding Window: Compteur avec fenetre glissante.

## Syntaxe et exemples

Token Bucket avec Redis:
\`\`\`java
@Service
public class RateLimiter {
    private final RedisTemplate<String, String> redis;

    public boolean isAllowed(String clientId, int maxRequests, 
                            Duration window) {
        String key = "rate:" + clientId;
        long now = Instant.now().toEpochMilli();
        long windowStart = now - window.toMillis();

        // Supprimer les anciennes entrees
        redis.opsForZSet().removeRangeByScore(key, 0, windowStart);
        
        // Compter les requetes actuelles
        Long count = redis.opsForZSet().zCard(key);
        
        if (count >= maxRequests) {
            return false;
        }
        
        // Ajouter la requete actuelle
        redis.opsForZSet().add(key, String.valueOf(now), now);
        redis.expire(key, window);
        
        return true;
    }
}

@Aspect
@Component
public class RateLimitingAspect {
    @Around("@annotation(rateLimited)")
    public Object checkRateLimit(ProceedingJoinPoint joinPoint, 
                                 RateLimited rateLimited) {
        String clientId = getClientId();
        
        if (!rateLimiter.isAllowed(clientId, 
            rateLimited.maxRequests(), 
            rateLimited.window())) {
            throw new TooManyRequestsException();
        }
        return joinPoint.proceed();
    }
}
\`\`\`

Configuration:
\`\`\`yaml
rate-limiting:
  default:
    max-requests: 100
    window: PT1M
  premium:
    max-requests: 1000
    window: PT1M
\`\`\`

## Bonnes pratiques

- Retourner les headers X-RateLimit-Remaining, X-RateLimit-Reset.
- Differencier les limites par type de client (IP, API key, user).
- Implementer le rate limiting en couche (gateway + service).
- Planifier les bursts legaux pour les gros clients.

## Pieges courants

- Rate limit trop severere = Faux positifs bloquent les vrais clients.
- Ne pas informer le client = Experience utilisateur degradee.
- Rate limit uniquement en memoire = Inefficace en cluster.

Source : [Stripe Rate Limiter](https://stripe.com/blog/rate-limiter)`},
      ],
    },
  ],
};