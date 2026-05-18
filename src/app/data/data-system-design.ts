import type { InterviewCategory } from '../models/interview.models';

export const systemDesignCategory: InterviewCategory = {
  id: 'system-design',
  title: 'System Design',
  color: 'bg-pink-100 text-pink-700',
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
        },
        {
          id: 'sd-2',
          question: 'Comment fonctionne le load balancing ?',
          answer: 'Le **load balancer** répartit le trafic entre plusieurs serveurs pour éviter la surcharge d\'un seul. Algorithmes : **Round Robin** (tour à tour), **Least Connections** (serveur le moins chargé), **IP Hash** (même client → même serveur, utile pour les sessions).\n\nTypes : **L4** (transport — basé sur IP/port, rapide), **L7** (application — basé sur URL/headers, plus flexible). Health checks réguliers : un serveur malade est retiré de la rotation.\n\n__Le load balancer est le point d\'entrée — il doit être hautement disponible__ (multi-AZ, DNS failover). Outils : `NGINX`, `HAProxy`, `AWS ALB`.',
        },
        {
          id: 'sd-3',
          question: 'Quelles stratégies de cache utiliser ?',
          answer: '**Cache côté client** : navigateur (headers `Cache-Control`, `ETag`), réduit les requêtes serveur. **Cache CDN** : contenu statique aux *edge locations*. **Cache applicatif** : `Redis`/`Memcached` pour les données fréquemment lues (sessions, résultats de requêtes).\n\n**Cache BDD** : query cache, buffer pool. Stratégies d\'invalidation : **TTL** (expiration automatique), **write-through** (écriture simultanée cache + BDD), **write-behind** (écriture différée), **cache-aside** (l\'app gère le cache manuellement).\n\n__Le problème n°1 du cache est l\'invalidation__ (« There are only two hard things in Computer Science: cache invalidation and naming things »). Définissez des TTL adaptés et invalidez explicitement sur les écritures.',
        },
        {
          id: 'sd-4',
          question: 'Qu\'est-ce que le sharding de base de données ?',
          answer: 'Le **sharding** partitionne les données horizontalement across plusieurs serveurs (shards). Chaque shard contient un sous-ensemble des données. Stratégies de clé de sharding : **hash-based** (distribution uniforme mais range queries impossibles), **range-based** (requêtes par plage efficaces mais risque de hotspots).\n\nAvantage : **scale-out** de la BDD, chaque shard est plus petit = requêtes plus rapides. Inconvénients : **cross-shard queries** complexes, jointures impossibles entre shards, **rebalancing** coûteux quand on ajoute un shard.\n\n__Le sharding est la solution de dernier recours__ — essayez d\'abord la réplication, le partitionnement vertical, le cache. Sharder trop tôt ajoute une complexité énorme.',
        },
        {
          id: 'sd-5',
          question: 'Quand et comment utiliser les files de messages ?',
          answer: 'Les **message queues** découplent les producteurs des consommateurs pour **asynchroniser** le traitement. Cas d\'usage : envoi d\'emails, génération de PDF, notifications, traitement par lots.\n\n**`RabbitMQ`** : routing complexe, protocole AMQP, accusés de réception, idéal pour les workflows. **`Kafka`** : flux d\'événements massifs, rétention durable, ordre par partition, idéal pour le *event sourcing* et le streaming.\n\n__Une file de messages élimine le couplage temporel__ : le producteur n\'attend pas le consommateur. C\'est aussi un **buffer** qui absorbe les pics de charge. Attention au *poison message* et aux *dead letter queues*.',
        },
        {
          id: 'sd-6',
          question: 'Comment appliquer le théorème CAP en pratique ?',
          answer: 'Le **théorème CAP** : dans un système distribué en cas de partition réseau, on doit choisir entre **C**onsistency (cohérence) et **A**vailability (disponibilité). On ne peut pas avoir les deux simultanément.\n\n**CP** : cohérence prioritaire — on refuse les écritures si on ne peut pas garantir la cohérence (`Zookeeper`, `etcd`). **AP** : disponibilité prioritaire — on accepte les écritures même déconnecté, synchronisation ultérieure (`Cassandra`, `DynamoDB`).\n\n__En pratique, la plupart des systèmes web choisissent AP avec *eventual consistency*__ — la cohérence forte est rarement nécessaire pour la plupart des use case. Le théorème CAP explique pourquoi, pas ce qu\'il faut choisir.',
        },
        {
          id: 'sd-7',
          question: 'Qu\'est-ce que la cohérence éventuelle et comment la gérer ?',
          answer: '**Eventual consistency** : si aucune nouvelle écriture n\'est faite, toutes les répliques convergeront *finalement* vers le même état. Entre-temps, des lectures peuvent retourner des données **obsolètes**.\n\nGestion : **vector clocks** (détection de conflits), **conflict resolution** (dernière écriture gagne, merge manuel), **read repair** (correction à la lecture), **anti-entropy** (synchronisation périodique en arrière-plan).\n\n__La cohérence éventuelle est acceptable pour les likes, les compteurs de vues, les feeds__ — pas pour les transactions bancaires. Identifiez quelles données exigent la cohérence forte vs lesquelles tolèrent l\'éventuelle.',
        },
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
        },
        {
          id: 'sd-9',
          question: 'Concevez un système de chat en temps réel',
          answer: '**Protocole** : `WebSocket` pour la communication bidirectionnelle temps réel (pas du polling HTTP). **Architecture** : chaque serveur de chat gère les connexions WebSocket actives, les messages sont routés via un **message broker** (`Redis Pub/Sub` ou `Kafka`) entre serveurs.\n\n**Stockage** : BDD NoSQL (`Cassandra`/`DynamoDB`) pour l\'historique des messages, clé = `conversation_id`, tri par timestamp. **Présence** : heartbeat + Redis pour les statuts en ligne.\n\n**Groupes** : un message → broadcast à tous les membres du groupe via le broker. **Push notifications** pour les utilisateurs hors ligne via `Firebase`/`APNs`.\n\n__Le défi principal est le routage inter-serveurs quand les membres d\'un chat sont connectés à des serveurs différents.__',
        },
        {
          id: 'sd-10',
          question: 'Concevez un fil d\'actualité (news feed)',
          answer: '**Deux approches** : **Pull** (fan-out on read) — à chaque visite, on agrège les posts des abonnements (lourd si beaucoup d\'abonnés), **Push** (fan-out on write) — à chaque post, on pousse dans les feeds de tous les abonnés (lourd pour les comptes populaires).\n\n**Approche hybride** : push pour les utilisateurs normaux, pull pour les comptes populaires (célébrités). Les feeds sont **pré-calculés** et stockés dans un cache (`Redis`), mis à jour de manière asynchrone.\n\n**Ranking** : algorithme de scoring (récence, engagement, affinité) pour trier les posts. **Pagination** cursor-based pour le scroll infini. **CDN** pour les images/vidéos.\n\n__Le news feed est le cas d\'usage classique du pattern fan-out.__ La clé est le choix push vs pull selon la popularité.',
        },
        {
          id: 'sd-11',
          question: 'Concevez un système de stockage de fichiers',
          answer: '**Stockage objet** : `S3`-like, chaque fichier = objet avec metadata, accès via URL signée. Avantages : scalable, durable (réplication multi-AZ), pas de limite de taille.\n\n**Upload** : petit fichier → upload direct, gros fichier → **multipart upload** (chunks parallèles, reprise sur échec). **Téléchargement** : URL signée à durée limitée ou via CDN pour les fichiers publics.\n\n**Architecture** : service d\'upload → stockage objet (`S3`) → metadata en BDD (nom, taille, owner, permissions). CDN pour la distribution. **Déduplication** via hash SHA-256 pour économiser l\'espace.\n\n__Pour les gros volumes, le multipart upload est indispensable__ — il permet la parallélisation et la reprise sur erreur.',
        },
        {
          id: 'sd-12',
          question: 'Comment implémenter le rate limiting au niveau système ?',
          answer: 'Le **rate limiting** protège contre les abus à plusieurs niveaux : **infrastructure** (WAF, load balancer), **API gateway** (limite par clé API/utilisateur), **application** (limite par endpoint).\n\nAlgorithmes : **Token bucket** (rafillage continu, permet un burst — le plus courant), **Leaky bucket** (traite les requêtes à rythme constant, lisse le trafic), **Sliding window** (compteur sur fenêtre glissante, plus précis que fixed window).\n\nStockage des compteurs : **`Redis`** avec `INCR` + `EXPIRE` (atomique, partagé entre instances). Header `Retry-After` + code `429` quand la limite est atteinte.\n\n__Le rate limiting doit être au plus près de l\'entrée du système__ (API gateway ou reverse proxy) pour protéger toute la chaîne.',
          code: '# Rate limiting avec Redis\nMULTI\nINCR rate_limit:user:123\nEXPIRE rate_limit:user:123 60\nEXEC\n\n# Si count > 100 → 429 Too Many Requests',
          language: 'bash',
        },
      ],
    },
  ],
};