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
        
          deepDive: `# Microservices

## Qu'est-ce que c'est ?

Les microservices sont une approche architecturale qui décompose une application en services indépendants, chacun représentant une fonctionnalité métier spécifique. Chaque service peut être développé, déployé et mis à l'échelle indépendamment.

## Caractéristiques principales

### Autonomie
Chaque service owning son propre code et données. Communication via APIs bien définies.

### Spécialisation
Chaque service conçu pour une capacité métier spécifique (paiement, authentification, catalogue).

### Déploiement indépendant
Pas besoin de déployer toute l'application pour mettre à jour un service.

### Technologies diverses
Chaque équipe choisit la stack adaptée à son service.

## Comparaison avec le Monolithe

| Aspect | Monolithe | Microservices |
|--------|-----------|---------------|
| Architecture | Une seule unité | Services distribués |
| Déploiement | Tout ensemble | Service par service |
| Echelle | Whole app | Par service |
| Développement | Equipe unique | Plusieurs équipes |
| Tech stack | Unique | Polyglotte |
| Communication | In-process | API calls |

## Exemple d'architecture

[API Gateway]
   |
[User] [Order] [Payment] [Notification]
   |       |          |            |
[UserDB] [OrderDB] [PaymentDB] [NotifDB]

## Bonnes pratiques

1. Conception autour des capacités métier
2. Deployer early, itérer souvent
3. Monitoring et logging centralisé
4. Traçabilité des requêtes (correlation IDs)
5. Circuit breaker pour la résilience

## Défis

1. Complexité opérationnelle
2. Transactions distribuées
3. Communication inter-services
4. Tests d'intégration
5. Gestion des données fragmentées

Source : [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)`},
        {
          id: 'ms-2',
          question: 'Avantages vs monolithe',
          answer: "**Avantages** : **scalabilité indépendante** par service, déploiement isolé sans impacter les autres, **stack hétérogène** (`Python`/ML, `Java`/métier, `Node`/API), résilience par isolation.\n\n**Inconvénients** : complexité opérationnelle (discovery, tracing, config distribuée), latence inter-services réseau, **cohérence des données** difficile (finit les transactions ACID, place à la **cohérence éventuelle** via `Saga`).\n\nBénéfices réels, mais à un __coût de complexité non négligeable__.",
        
          deepDive: `# Avantages vs Monolithe

## Pourquoi passer aux microservices ?

### Avantages

**Déploiement indépendant**
Déployer le service de paiement sans impacter le reste de l'application.

**Mise à l'échelle ciblée**
Scaling only the service under load, not the entire application.

**Equipes autonomes**
Teams can work independently, faster iteration.

**Technologie adaptée**
Choose the best tech for each use case.

**Résilience**
Failure in one service does not bring down the entire system.

**Facilité de refactoring**
Rewrite a single service without touching the rest.

### Inconvenients des microservices

**Complexité**
Distributed systems are inherently more complex.

**Communication réseau**
Latency, retries, circuit breakers needed.

**Transaction distribuée**
ACID properties do not span services automatically.

**Operational overhead**
More infrastructure to manage, monitor, secure.

**Testing d'intégration**
Harder to test interactions between services.

## Quand le monolithe est preferable

- Application simple, faible nombre de fonctionnalités
- Equipe petite (moins de 10 développeurs)
- Besoin de développement rapide
- Pas de besoins de scaling massifs

## Signes qu'il faut migrer

1. Equipes qui se marchent sur les pieds
2. Déploiement trop lent et risqué
3. Difficulté à tester une partie de l'app
4. Scaling uneven (some parts hot, others not)
5. Tech stack trop vieux à moderniser

## Stratégie de migration

1. **Strangler Fig Pattern**: Remplacer progressivement par des microservices
2. Commencer par les bords du système
3. Extraire d'abord les services stateless
4. Utiliser un API Gateway comme facade

Source : [Martin Fowler - MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html)`},
        {
          id: 'ms-3',
          question: 'Quand passer du monolithe aux microservices ?',
          answer: "Ne passez aux microservices que si le monolithe **ne suffit plus** : déploiements bloqués par une seule équipe, scalabilité d'un seul module nécessaire, équipes éloignées géographiquement.\n\nCommencez par un **monolithe bien structuré** (modules indépendants) — la migration sera naturelle quand le besoin apparaîtra. Le *premature decomposition* est un anti-pattern qui ajoute de la complexité inutilement.\n\n__Règle : monolithe d'abord, microservices si nécessaire, jamais par mode.__",
        
          deepDive: `# Quand passer aux Microservices

## Critères de décision

### Taille de l'équipe
- **Monolithe**: < 10 développeurs
- **Microservices**: > 10-15 développeurs, équipes autonomes

### Complexité métier
- **Monolithe**: Domaine métier simple, peu de boundaries claires
- **Microservices**: Domaine complexe avec bounded contexts évidents

### Exigences de performance
- **Monolithe**: Besoins uniformes
- **Microservices**: Besoins de scaling variables par fonctionnalité

### Fréquence de déploiement
- **Monolithe**: Déploiement infrequent, faible risque
- **Microservices**: Déploiement fréquent, équipes indépendantes

## Signes positifs pour les microservices

1. Domaines métier clairement séparés
2. Equipes avec boundaries de propriété clairs
3. Besoin de technologies différentes par domaine
4. Charge de travail inégale (hot services vs cold services)
5. Exigences de disponibilité très élevées

## Prérequis

Avant de migrer, pastikan:
- [ ] CI/CD matures
- [ ] Monitoring et observabilité en place
- [ ] Culture DevOps established
- [ ] Documentation API robuste
- [ ] Service discovery opérationnel
- [ ] Error budget et SLOs définis

## Anti-patterns à éviter

**N'acheter microservices juste parce que c'est trendy**
Si le monolithe fonctionne, ne pas migrer pour le plaisir.

**Microservices distribution**
Diviser en services trop petits (nano-services).

**Big bang migration**
Tout réécrire d'un coup.

## Migration progressive

Phase 1: Improve the monolith (clean code, tests)
Phase 2: Strangler fig at boundaries
Phase 3: Extract first service
Phase 4: Iterate

Source : [Sam Newman - Building Microservices](https://samnewman.io/books/building_microservices/)`},
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
        
          deepDive: `# Communication entre Services

## Qu'est-ce que c'est ?

Les services microservices doivent communiquer entre eux. Deux patterns principaux: synchrone (requête/réponse) et asynchrone (messages).

## Communication synchrone (REST, gRPC)

### REST over HTTP

Avantages: Simple, widely understood, firewall-friendly
Inconvénients: Latence, coupled pendant le timeout

# Exemple avec Express
app.get("/users/:id", async (req, res) => {
  const user = await fetch(\`http://user-service/users/\${req.params.id}\`);
  res.json(user);
});

### gRPC

Protocol Buffers for serialization, HTTP/2 for transport.

Avantages: Faster, strongly typed, bidirectional streaming
Inconvénients: More complex, not browser-friendly directly

syntax = "proto3";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
}

message GetUserRequest {
  string user_id = 1;
}

## Communication asynchrone (Messages, Events)

### Message Queue (RabbitMQ, AWS SQS)

Avantages: Decoupled, retry built-in, load leveling
Inconvénients: Extra infrastructure, eventual consistency

### Event-Driven (Kafka, SNS/SQS)

Avantages: Audit trail, fan-out, replay capability
Inconvénients: Complexity, ordering guarantees

## Patterns de communication

### Circuit Breaker (Resilience)

Implement with a library like opossum:

const circuitBreaker = new CircuitBreaker(callService, {
  timeout: 3000,
  errorThresholdPercentage: 50
});

### Retry with Backoff

Exponential backoff before retrying failed requests.

### Fallback

Provide a default response when service is unavailable.

### Bulkhead

Isoler les appels pour éviter les cascades d'erreurs.

## Service Discovery

### Client-side (Eureka)
Client queries service registry directly.

### Server-side (API Gateway)
Gateway handles discovery for clients.

## Tracing distribué

Correler les requêtes à travers les services avec:
- OpenTelemetry
- Zipkin/Jaeger
- AWS X-Ray

## Bonnes pratiques

1. Prefer async communication when possible
2. Implement circuit breakers everywhere
3. Always have timeouts
4. Log all inter-service calls
5. Use correlation IDs for tracing

Source : [Microsoft - Microservices Communication](https://docs.microsoft.com/en-us/azure/architecture/microservices/design/interservice-communication)`},
        {
          id: 'ms-5',
          question: 'API Gateway',
          answer: "**Point d'entrée unique** de l'architecture microservices : les clients n'accèdent jamais directement aux services.\n\nElle gère le routage, l'authentification/autorisation centralisées, la transformation de protocole (`REST`→`gRPC`), le rate limiting, le cachéing, le logging et le monitoring. Cela évite que chaque service réimplémente ces **préoccupations transversales**.\n\nOutils : `Kong` (extensible via plugins), `AWS API Gateway`. __Attention à ne pas en faire un bottleneck__ — elle doit être hautement disponible et scalable.",
        
          deepDive: `# API Gateway

## Qu'est-ce que c'est ?

L'API Gateway est un point d'entrée unique pour toutes les requêtes clientes. Il masque l'architecture microservices interne et fournit une interface unifiée.

## Responsibilities

### Point d'entrée unique
Les clients parlent à une seule URL, peu importe l'architecture interne.

### Routage
Diriger les requêtes vers les services appropriés.

### Authentification / Autorisation
Valider les tokens, appliquer les permissions.

### Limitation de débit (Rate Limiting)
Protéger contre les pics de traffic.

### SSL Termination
Gérer les certificats HTTPS.

### Cache
Mettre en cache les réponses fréquentes.

### Logging / Monitoring
Centraliser les métriques d'accès.

## Architecture

[Client] -> [API Gateway] -> [Service A]
                              -> [Service B]
                              -> [Service C]

## Solutions populaires

### Kong
Open source, extensible, performant.

### AWS API Gateway
Managed service AWS, интеграция avec Lambda.

### NGINX
 reverse proxy avec capacités API Gateway.

### Envoy
Service proxy de Lyft, base de Istio.

## Example Kong configuration

_format_version: "3.0"
services:
- name: user-service
  url: http://user-service:3000
  routes:
  - name: user-route
    paths:
    - /users
    methods:
    - GET
    - POST

plugins:
- name: rate-limiting
  config:
    minute: 100
    policy: redis

## Différence avec Backend-for-Frontend (BFF)

### API Gateway
Une gateway pour tous les clients (web, mobile, third-party).

### BFF (Backend for Frontend)
Une gateway par type de client:

[Web BFF] -> Services
[Mobile BFF] -> Services
[Third-party BFF] -> Services

Utile quand les besoins des clients different significativement.

## GraphQL Gateway

Une alternative moderne: GraphQL federation.

type User @key(subgraph: "users") {
  id: ID!
  name: String!
}

Les clients font une seule requête, le gateway distribue.

## Bonnes pratiques

1. Ne pas put business logic dans le gateway
2. Implementer une bonne gestion des erreurs
3. Utiliser le caching judicieusement
4. Prévoir la scalabilité horizontale
5. Définir des timeouts appropriés

## Security considerations

- Valider tous les headers
- Sanitize les entrées
- Rate limiting et throttling
- IP whitelisting si nécessaire
- CORS configuration

Source : [NGINX - API Gateway](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)`},
        {
          id: 'ms-6',
          question: 'Service Discovery',
          answer: "Les services étant dynamiques (lancés, arrêtés, scalés à tout moment), les adresses IP statiques sont inutilisables. Le **Service Discovery** permet aux services de s'enregistrer et de se trouver dynamiquement.\n\nDeux approches : **côté client** (le service interroge un registre comme `Eureka`/`Consul`) ou **côté serveur** (l'API Gateway ou load balancer gère la résolution). `Consul` offre aussi health checking et config clé-valeur.\n\nSous `Kubernetes`, le Service Discovery est **natif** via les Services K8s et le DNS interne.",
        
          deepDive: `
# Service Discovery

## Qu'est-ce que c'est

Service discovery allows services to find each other dynamically without hardcoded network locations. In containerized environments where IPs change frequently, services need to register themselves and discover others.

Two patterns:
- **Client-side discovery**: Client queries the service registry
- **Server-side discovery**: Load balancer queries the registry

## Syntaxe et exemples

### Consul Service Registration (Go)

package main

import (
    "github.com/hashicorp/consul/api"
)

func registerService() {
    config := api.DefaultConfig()
    config.Address = "consul:8500"
    client, _ := api.NewClient(config)

    // Register service
    registration := &api.AgentServiceRegistration{
        ID:   "user-service-1",
        Name: "user-service",
        Port: 8080,
        Address: "user-service-pod-1.internal",
        Check: &api.AgentServiceCheck{
            HTTP: "http://user-service-pod-1.internal:8080/health",
            Interval: "10s",
        },
    }

    client.Agent().ServiceRegister(registration)
}

### Consul Service Discovery (Go client)

func discoverUserService() (string, error) {
    config := api.DefaultConfig()
    config.Address = "consul:8500"
    client, _ := api.NewClient(config)

    services, _, err := client.Health().Service(
        "user-service",     // service name
        "",                  // tag filter
        true,                // passing only
        nil,
    )
    if err != nil {
        return "", err
    }

    // Return first healthy instance
    if len(services) > 0 {
        return services[0].Service.Address, nil
    }
    return "", errors.New("no healthy instances")
}

### Kubernetes Built-in Discovery

# Services are automatically registered with kube-dns
# Other services can access via: http://user-service.default.svc.cluster.local

apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080

# Pods access via environment variables (auto-injected)
# USER_SERVICE_SERVICE_HOST=10.0.0.100
# USER_SERVICE_SERVICE_PORT=80

### Envoy Service Mesh (Server-side discovery)

apiVersion: v1
kind: ServiceEntry
metadata:
  name: external-payment
spec:
  hosts:
  - payment-api.example.com
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  location: MESH_EXTERNAL
  resolution: DNS

# VirtualService for routing
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: payment-service
spec:
  hosts:
  - payment-api.example.com
  http:
  - route:
    - destination:
        host: payment-api.example.com
    timeout: 10s
    retries:
      attempts: 3
      perTryTimeout: 5s

## Bonnes pratiques

- Use health checks to remove unhealthy instances
- Implement retry logic for discovery failures
- Consider client-side caching to reduce registry load
- Use consistent naming across environments
- Implement circuit breakers for service calls
- Monitor service mesh telemetry

## Pièges courants

- Not implementing proper health checks
- Hardcoding service URLs instead of using discovery
- Using only in-memory service registry (single point of failure)
- Ignoring the overhead of service discovery calls
- Not planning for service version upgrades
- Forgetting about service deregistration race conditions

## Sources

https://www.consul.io/docs/discovery/overview | https://kubernetes.io/docs/concepts/services-networking/service/ | https://istio.io/latest/docs/concepts traffic-management/ | https://learn.microsoft.com/en-us/azure/spring-cloud/spring-cloud-service-discovery
`},
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
        
          deepDive: `
# Circuit Breaker

## Qu'est-ce que c'est

The Circuit Breaker pattern prevents cascading failures by stopping requests to a failing service. When a service repeatedly fails, the circuit "opens" and fast-fails subsequent requests without making the actual call. After a timeout, it allows a test request to check if the service recovered.

States:
- **Closed**: Normal operation, requests pass through
- **Open**: Service considered failed, requests fail immediately
- **Half-Open**: Testing if service recovered

## Syntaxe et exemples

### TypeScript Implementation

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private successCount = 0;

  constructor(
    private readonly threshold = 5,
    private readonly timeout = 60000, // 1 minute
    private readonly halfOpenSuccessThreshold = 3
  ) {}

  async call<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime! >= this.timeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        return fallback();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      return fallback();
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.halfOpenSuccessThreshold) {
        this.state = 'CLOSED';
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.state === 'HALF_OPEN' || this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

// Usage
const breaker = new CircuitBreaker(5, 60000, 3);
const result = await breaker.call(
  () => paymentService.charge(amount),
  () => ({ status: 'degraded', message: 'Service temporarily unavailable' })
);

### Resilience4j (Java)

<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot3</artifactId>
</dependency>

@CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
public PaymentResult processPayment(PaymentRequest request) {
    return paymentClient.charge(request);
}

public PaymentResult paymentFallback(PaymentRequest request, Exception e) {
    return PaymentResult.degraded("Service unavailable");
}

// Configuration
resilience4j.circuitbreaker:
  instances:
    paymentService:
      slidingWindowSize: 10
      failureRateThreshold: 50
      waitDurationInOpenState: 30s
      permittedNumberOfCallsInHalfOpenState: 3
      slowCallDurationThreshold: 2s
      slowCallRateThreshold: 100

### Envoy Circuit Breaker

apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: payment-service
spec:
  host: payment-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: UPGRADE
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
    circuitBreakers:
      thresholds:
      - maxConnections: 100
        maxPendingRequests: 100
        maxRequests: 100
        maxRetries: 3
        trackRemaining: true

## Bonnes pratiques

- Always provide a fallback when circuit opens
- Set appropriate failure thresholds based on service behavior
- Use circuit breakers at integration points
- Monitor circuit breaker state changes
- Implement proper health checks
- Consider using libraries instead of custom implementations

## Pièges courants

- Not having a fallback causing complete failure
- Setting thresholds too tight (false positives)
- Forgetting to reset failure counts on success
- Not monitoring circuit breaker state
- Using circuit breaker without proper timeout
- Overriding circuit breaker too aggressively

## Sources

https://resilience4j.net/ | https://martinfowler.com/bliki/CircuitBreaker.html | https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker | https://istio.io/latest/docs/tasks/traffic-management/circuit-breaking/
`},
        {
          id: 'ms-8',
          question: 'Résilience',
          answer: "Combinaison de plusieurs mécanismes complémentaires : **redondance** (multiples instances), **Circuit Breakers** (protection contre les pannes en cascade), `Retry` avec **backoff exponentiel** (pour les problèmes temporaires), **Fallbacks** (réponse alternative : cachée local, valeur par défaut), et **Timeouts** systématiques sur les appels inter-services.\n\n__La résilience ne repose pas sur un seul pattern mais sur leur combinaison__.",
        
          deepDive: `
# Resilience

## Qu'est-ce que c'est

Resilience in microservices means the ability to recover from failures and continue operating. Key patterns include retries with backoff, bulkheads (isolation), timeouts, and degradation. The goal is to prevent failures in one service from cascading to others.

## Syntaxe et exemples

### Retry with Exponential Backoff (TypeScript)

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 100;
      await sleep(delay + jitter);
    }
  }
  throw new Error('Should not reach here');
}

// Usage
const result = await retryWithBackoff(
  () => paymentService.charge(amount),
  3,
  1000
);

### Bulkhead Pattern (Isolation)

class BulkheadService {
  private readonly semaphores = new Map<string, Semaphore>();

  getSemaphore(serviceName: string, maxConcurrent: number): Semaphore {
    if (!this.semaphores.has(serviceName)) {
      this.semaphores.set(serviceName, new Semaphore(maxConcurrent));
    }
    return this.semaphores.get(serviceName)!;
  }

  async execute<T>(serviceName: string, fn: () => Promise<T>): Promise<T> {
    const semaphore = this.getSemaphore(serviceName, 10);
    return semaphore.acquire(fn);
  }
}

### Timeout Pattern

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage
const result = await withTimeout(
  paymentService.charge(amount),
  5000 // 5 second timeout
);

### Health Checks and Graceful Degradation

class PaymentService {
  async healthCheck(): Promise<HealthStatus> {
    try {
      await this.db.query('SELECT 1');
      return { status: 'healthy' };
    } catch {
      return { status: 'degraded', error: 'Database unreachable' };
    }
  }

  async charge(amount: number): Promise<PaymentResult> {
    const health = await this.healthCheck();
    if (health.status === 'degraded') {
      return { success: false, mode: 'graceful_degradation' };
    }
    return this.processPayment(amount);
  }
}

### Istio Resilience (Kubernetes)

apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: payment-service
spec:
  host: payment-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http2MaxRequests: 1000
        maxRequestsPerConnection: 100
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50

## Bonnes pratiques

- Implement timeouts on all external calls
- Use retry with exponential backoff for transient failures
- Implement circuit breakers to prevent cascade failures
- Isolate failures using bulkheads
- Always have fallback behavior
- Test resilience scenarios (chaos testing)
- Monitor and alert on degradation

## Pièges courants

- No timeouts causing requests to hang forever
- Retries without backoff overwhelming the service
- Ignoring the compounding effect of multiple retries
- Not having fallback behavior
- Overloading a single resource with too many requests
- Not monitoring resilience patterns in production

## Sources

https://resilience4j.net/ | https://martinfowler.com/articles/non-determinism.html | https://learn.microsoft.com/en-us/azure/architecture/framework/resilience/ | https://istio.io/latest/docs/tasks/traffic-management/retries-and-timeouts/
`},
        {
          id: 'ms-9',
          question: 'Cohérence des données',
          answer: "En distribué, les transactions **ACID** multi-services sont impossibles. On utilise le pattern **Saga** : enchaînement de transactions locales avec **compensation** en cas d'échec.\n\nDeux variantes : **chorégraphiée** (événements entre services) ou **orchestrée** (coordinateur central).\n\nL'**Event Sourcing** stocke tous les événements plutôt que l'état courant, permettant la reconstruction à tout moment. Le `2PC` existe mais est trop lent et couplant en distribué.\n\nEn microservices, on accepte la **cohérence éventuelle** via `Saga` ou `Event Sourcing`.",
        
          deepDive: `
# Coherence des donnees

## Qu'est-ce que c'est

Data consistency in microservices is challenging because each service owns its data and cannot use traditional ACID transactions across services. Instead, eventual consistency is used, where the system eventually converges to a consistent state through events or compensating actions.

Patterns:
- **Eventual consistency**: Accept temporary inconsistencies
- **Saga pattern**: Choreographed or orchestrated transactions
- **Event sourcing**: Store events, not state
- **Outbox pattern**: Reliable event publishing

## Syntaxe et exemples

### Event-Driven Updates (TypeScript)

// Order Service publishes events
class OrderService {
  async createOrder(order: Order): Promise<void> {
    await this.db.save(order);

    // Publish event (outbox pattern for reliability)
    await this.outbox.publish({
      type: 'ORDER_CREATED',
      payload: { orderId: order.id, customerId: order.customerId },
    });
  }
}

// Inventory Service subscribes and updates
class InventoryService {
  @Subscribe('ORDER_CREATED')
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    await this.inventory.reserve(event.payload.customerId);
  }
}

### Outbox Pattern (可靠投递)

class OutboxRepository {
  async save(outbox: OutboxMessage): Promise<void> {
    await this.db.query(
      'INSERT INTO outbox (type, payload, created_at) VALUES ($1, $2, NOW())',
      [outbox.type, JSON.stringify(outbox.payload)]
    );
  }

  async publishPending(limit = 100): Promise<void> {
    const messages = await this.db.query(
      'SELECT * FROM outbox WHERE published = false ORDER BY created_at LIMIT $1',
      [limit]
    );

    for (const msg of messages) {
      await this.messageBus.publish(msg.type, msg.payload);
      await this.db.query(
        'UPDATE outbox SET published = true WHERE id = $1',
        [msg.id]
      );
    }
  }
}

### Saga for Distributed Transactions (Go)

func (s *OrderSaga) executeCreateOrder(ctx context.Context, req *CreateOrderRequest) error {
  // Step 1: Create order (local)
  order := &Order{ID: generateID(), Status: "PENDING"}
  if err := s.orderRepo.Create(order); err != nil {
    return err
  }

  // Step 2: Reserve inventory (remote) - can fail
  if err := s.inventoryClient.Reserve(order.ID, req.Items); err != nil {
    // Compensate: cancel order
    s.orderRepo.UpdateStatus(order.ID, "CANCELLED")
    return err
  }

  // Step 3: Process payment (remote) - can fail
  if err := s.paymentClient.Charge(req.CustomerID, req.Amount); err != nil {
    // Compensate: release inventory
    s.inventoryClient.Release(order.ID)
    s.orderRepo.UpdateStatus(order.ID, "CANCELLED")
    return err
  }

  s.orderRepo.UpdateStatus(order.ID, "CONFIRMED")
  return nil
}

### Event Sourcing

type AccountEvent =
  | { type: 'Deposited'; amount: number; balance: number }
  | { type: 'Withdrawn'; amount: number; balance: number }
  | { type: 'TransferStarted'; toAccountId: string; amount: number }
  | { type: 'TransferCompleted' };

class Account {
  private events: AccountEvent[] = [];

  deposit(amount: number) {
    this.events.push({
      type: 'Deposited',
      amount,
      balance: this.balance + amount,
    });
  }

  // Rebuild current state from events
  static fromEvents(events: AccountEvent[]): Account {
    const account = new Account();
    account.events = events;
    account.balance = events.reduce((sum, e) => {
      if (e.type === 'Deposited') return sum + e.amount;
      if (e.type === 'Withdrawn') return sum - e.amount;
      return sum;
    }, 0);
    return account;
  }

  getBalance(): number {
    return this.balance;
  }
}

### CDC (Change Data Capture)

# Using Debezium to capture database changes
# PostgreSQL -> Kafka -> Microservices

connector.class: io.debezium.connector.postgresql.PostgresConnector
database.hostname: postgres
database.port: 5432
database.user: debezium
database.password: password
database.dbname: orders
database.server.name: orders-db
table.include.list: public.orders

## Bonnes pratiques

- Design for eventual consistency from the start
- Implement idempotent operations to handle duplicates
- Use the Outbox pattern for reliable event publishing
- Consider event sourcing for audit trails
- Use saga pattern for distributed transactions
- Implement compensation logic for rollbacks
- Make events contain all necessary data (no lookups)

## Pièges courants

- Assuming strong consistency across services
- Using distributed transactions (2PC) - not scalable
- Forgetting about event ordering
- Not handling duplicate events idempotently
- Creating tightly coupled services via shared databases
- Ignoring the complexity of eventual consistency for users

## Sources

https://microservices.io/patterns/data/event-sourcing.html | https://martinfowler.com/articles/patterns-of-distributed-systems/ | https://debezium.io/blog/ | https://event-driven.io/tips/implementing_outbox_pattern/
`},
        {
          id: 'ms-10',
          question: 'CQRS',
          answer: "**Command Query Responsibility Segregation** : séparer les **écritures** (`Commands`) des **lectures** (`Queries`) dans des modèles distincts.\n\nEn lecture, on veut des données **dénormalisées** et optimisées ; en écriture, un modèle **normalisé** garantissant l'intégrité. Chaque côté est optimisable indépendamment (ex : `PostgreSQL` pour les écritures, `Elasticsearch` pour les lectures).\n\nSouvent combiné avec l'**Event Sourcing**. Inconvénient : complexité de synchronisation et *cohérence éventuelle*. __À utiliser quand la lecture est un bottleneck, pas par défaut__.",
        
          deepDive: `
# CQRS

## Qu'est-ce que c'est

CQRS (Command Query Responsibility Segregation) is a pattern that separates read and write operations into different models. Commands modify state (writes), queries read state (reads). This allows independent scaling and optimization of read vs write paths.

## Syntaxe et exemples

### Basic CQRS Architecture

// Command Model (Write)
interface Command {
  type: 'CREATE_ORDER' | 'UPDATE_ORDER' | 'CANCEL_ORDER';
  payload: any;
}

class OrderCommandHandler {
  handle(command: Command): void {
    // Validate and persist to write database
    // Publish event to message bus
  }
}

// Query Model (Read)
interface OrderView {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
}

class OrderQueryHandler {
  getOrder(id: string): OrderView {
    // Read from read database / projection
  }

  getOrdersByCustomer(customerId: string): OrderView[] {
    // Optimized read query
  }
}

### Event Sourcing with CQRS (TypeScript)

type OrderEvent =
  | { type: 'OrderCreated'; data: { orderId: string; items: Item[] } }
  | { type: 'OrderShipped'; data: { orderId: string; trackingNumber: string } }
  | { type: 'OrderDelivered'; data: { orderId: string } };

class OrderAggregate {
  private events: OrderEvent[] = [];

  createOrder(orderId: string, items: Item[]) {
    this.events.push({ type: 'OrderCreated', data: { orderId, items } });
  }

  ship(trackingNumber: string) {
    this.events.push({ type: 'OrderShipped', data: { orderId: this.id, trackingNumber } });
  }

  // Rebuild state from events
  static fromEvents(orderId: string, events: OrderEvent[]): OrderAggregate {
    const order = new OrderAggregate();
    order.id = orderId;
    order.events = events;
    return order;
  }
}

// Read model projector
class OrderReadModel {
  private projections: Map<string, OrderView> = new Map();

  project(event: OrderEvent) {
    switch (event.type) {
      case 'OrderCreated':
        this.projections.set(event.data.orderId, {
          orderId: event.data.orderId,
          status: 'CREATED',
          items: event.data.items,
        });
        break;
      case 'OrderShipped':
        const order = this.projections.get(event.data.orderId);
        if (order) order.status = 'SHIPPED';
        break;
    }
  }
}

### API Separation (Node.js/Express)

// Command API - POST /api/commands/orders
app.post('/api/commands/orders', async (req, res) => {
  const command = { type: 'CREATE_ORDER', payload: req.body };
  await commandBus.dispatch(command);
  res.status(202).json({ accepted: true });
});

// Query API - GET /api/queries/orders/:id
app.get('/api/queries/orders/:id', async (req, res) => {
  const order = await queryHandler.getOrder(req.params.id);
  res.json(order);
});

## Bonnes pratiques

- Use separate databases for read/write (e.g., write to PostgreSQL, read from Elasticsearch)
- Implement eventual consistency awareness in UI
- Use events to synchronize read models
- Keep command models focused on business logic
- Design read models specifically for query patterns
- Consider using a message broker (Kafka, RabbitMQ) for event propagation

## Pièges courants

- Using same model for read and write defeats CQRS purpose
- Ignoring eventual consistency between read/write models
- Over-engineering for simple CRUD applications
- Not handling duplicate events in projections
- Forgetting that commands can fail validation
- Missing compensation logic for failed commands

## Sources

https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs | https://martinfowler.com/articles/cqrs/ | https://docs.microsoft.com/en-us/previous-versions/msp-n-p/jj591573(v=pp.10) | https://eventstore.com/blog/cqrs-and-event-sourcing/
`},
        {
          id: 'ms-11',
          question: 'Saga pattern en détail',
          answer: "Enchaînement de **transactions locales** où chaque étape publie un événement déclenchant la suivante. Si une étape échoue, les étapes précédentes sont **compensées** (rollback applicatif, pas BDD).\n\n**Chorégraphiée** : les services réagissent aux événements directement — simple pour peu d'étapes, mais flux opaque et debugging difficile.\n\n**Orchestrée** : un coordinateur (`Orchestrator`) gère le flux — plus visible et contrôlable, mais point central à rendre résilient.\n\n__Outils** : `Axon Framework`, `Camunda`, `Temporal`. Choisir orchestrée pour les flux complexes, chorégraphiée pour les simples.",
        
          deepDive: `
# Saga pattern en detail

## Qu'est-ce que c'est

The Saga pattern manages distributed transactions across multiple services without two-phase commit. Each service performs its local transaction and publishes an event that triggers the next service's transaction. If a step fails, compensating transactions undo previous steps.

Two types:
- **Choreography**: Services publish/subscribe to events
- **Orchestration**: Central orchestrator coordinates steps

## Syntaxe et exemples

### Choreography-based Saga (TypeScript)

type OrderEvent =
  | { type: 'OrderCreated'; orderId: string; customerId: string }
  | { type: 'PaymentProcessed'; orderId: string; paymentId: string }
  | { type: 'InventoryReserved'; orderId: string }
  | { type: 'OrderShipped'; orderId: string }
  | { type: 'OrderFailed'; orderId: string; reason: string };

class OrderService {
  async createOrder(order: CreateOrderDto): Promise<void> {
    await this.eventBus.publish({
      type: 'OrderCreated',
      orderId: generateId(),
      customerId: order.customerId,
    });
  }

  @Subscribe('OrderCreated')
  async handleOrderCreated(event: OrderCreated) {
    // Check inventory and publish next event
    const reserved = await this.inventoryService.reserve(event.orderId, order.items);
    if (reserved) {
      await this.eventBus.publish({ type: 'InventoryReserved', orderId: event.orderId });
    }
  }
}

### Orchestration-based Saga (Go)

type Order struct {
  ID         string
  CustomerID string
  Status     string
  Steps      []SagaStep
}

type SagaStep struct {
  Name        string
  Status      string
  Compensation func() error
}

type OrderOrchestrator struct {
  services *ServiceLocator
}

func (o *OrderOrchestrator) CreateOrder(ctx context.Context, req *CreateOrderRequest) (*Order, error) {
  order := &Order{
    ID:         generateID(),
    CustomerID: req.CustomerID,
    Status:     "PENDING",
    Steps:      []SagaStep{},
  }

  // Step 1: Create order
  order.Steps = append(order.Steps, SagaStep{
    Name: "CreateOrder",
    Compensation: func() error {
      return o.services.OrderService.Cancel(order.ID)
    },
  })

  // Step 2: Process payment
  paymentResult, err := o.services.PaymentService.Charge(req.CustomerID, req.Amount)
  if err != nil {
    // Compensate previous steps
    o.compensate(order.Steps)
    return nil, err
  }
  order.Steps = append(order.Steps, SagaStep{
    Name: "ProcessPayment",
    Compensation: func() error {
      return o.services.PaymentService.Refund(paymentResult.TransactionID)
    },
  })

  // Step 3: Reserve inventory
  if err := o.services.InventoryService.Reserve(order.ID, req.Items); err != nil {
    o.compensate(order.Steps)
    return nil, err
  }

  return order, nil
}

func (o *OrderOrchestrator) compensate(steps []SagaStep) {
  for i := len(steps) - 1; i >= 0; i-- {
    if steps[i].Status == "COMPLETED" {
      steps[i].Compensation()
    }
  }
}

### Kubernetes Saga Orchestrator

apiVersion: batch/v1
kind: Job
metadata:
  name: order-saga-orchestrator
spec:
  template:
    spec:
      containers:
      - name: orchestrator
        image: myapp/saga-orchestrator:latest
        env:
        - name: KAFKA_BROKER
          value: "kafka:9092"
        - name: ORDER_SERVICE_URL
          value: "http://order-service:8080"
        - name: PAYMENT_SERVICE_URL
          value: "http://payment-service:8080"
      restartPolicy: OnFailure

## Bonnes pratiques

- Design compensating transactions carefully - they must be idempotent
- Use events for choreography to keep services decoupled
- Use orchestration when you need central visibility and error handling
- Implement retry with exponential backoff for transient failures
- Log all saga steps for debugging and auditing
- Make each saga step small and focused

## Pièges courants

- Not making compensating transactions commutative
- Forgetting that compensation can also fail
- Using synchronous communication in distributed sagas
- Ignoring the need for idempotency in handlers
- Over-complicating with too many saga steps
- Not handling partial failure scenarios in UI

## Sources

https://microservices.io/patterns/data/saga.html | https://learn.microsoft.com/en-us/azure/architecture/patterns/saga | https://docs.particular.net/tutorials/saga/ | https://eventdriven.io/tips/implementing-saga-pattern/
`},
        {
          id: 'ms-12',
          question: 'Strangler Fig pattern',
          answer: "Pattern de **migration progressive** du monolithe vers les microservices : on remplace une fonctionnalité du monolithe par un microservice, les deux coexistent temporairement, l'API Gateway route le trafic vers le nouveau service.\n\nAvantages : **risque limité**, migration incrémentale, rollback possible à chaque étape. Les anciennes fonctionnalités du monolithe sont « étranglées » progressivement.\n\n__L'approche recommandée pour migrer sans big bang — chaque étape est une mise en production.__",
        
          deepDive: `
# Strangler Fig pattern

## Qu'est-ce que c'est

The Strangler Fig pattern incrementally migrates a monolithic system to microservices by gradually routing functionality to new services while keeping the old system running. Over time, the new system "strangles" the old one until it can be decommissioned.

Key strategy: Add a facade (API gateway) that routes requests to either old or new system based on which functionality has been migrated.

## Syntaxe et exemples

### API Gateway Routing (Node.js/Express)

class MigrationGateway {
  constructor(oldSystem, newSystem) {
    this.oldSystem = oldSystem;
    this.newSystem = newSystem;
    this.migratedPaths = new Set([
      '/api/users',
      '/api/orders',
      '/api/products',
    ]);
  }

  async handleRequest(req, res) {
    const path = req.path;

    if (this.migratedPaths.has(path)) {
      // Route to new microservice
      return this.proxy(req, res, this.newSystem);
    } else {
      // Keep routing to monolith
      return this.proxy(req, res, this.oldSystem);
    }
  }
}

// Express setup
const gateway = new MigrationGateway(
  'http://monolith:3000',
  'http://new-services:8080'
);

app.use('/api', (req, res) => gateway.handleRequest(req, res));

### Kubernetes Ingress Routing

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: migration-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      # Migrated endpoints -> new service
      - path: /api/users
        pathType: Prefix
        backend:
          service:
            name: users-service
            port:
              number: 80
      - path: /api/orders
        pathType: Prefix
        backend:
          service:
            name: orders-service
            port:
              number: 80
      # Non-migrated -> legacy service
      - path: /api/legacy
        pathType: Prefix
        backend:
          service:
            name: monolith-service
            port:
              number: 80

### Incremental Migration Strategy

Phase 1: Add facade, route new features to parallel service
Phase 2: Migrate read operations (replicas + new service)
Phase 3: Migrate write operations
Phase 4: Decommission old implementation

// Feature flag controlled migration
const migratedFeatures = {
  users: await featureFlag.isEnabled('migration.users'),
  orders: await featureFlag.isEnabled('migration.orders'),
};

if (migratedFeatures.users) {
  return callService('users-service', req);
}
return callService('monolith', req);

## Bonnes pratiques

- Start with less critical, loosely coupled features
- Use feature flags for gradual traffic shifting
- Implement comprehensive monitoring to compare old vs new behavior
- Keep old and new systems data eventually consistent
- Document which endpoints are migrated
- Plan for rollbacks during migration

## Pièges courants

- Migrating too many features at once
- Not accounting for shared databases between monolith and services
- Forgetting about backward compatibility requirements
- Missing transaction boundaries across services
- Not monitoring the migration progress
- Decommissioning old system too early

## Sources

https://martinfowler.com/bliki/StranglerFigApplication.html | https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy/decomposition-guidance.html | https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig | https://www.thoughtworks.com/radar/techniques/strangler-fig-migration
`},
        {
          id: 'ms-13',
          question: 'Database per service',
          answer: "Chaque microservice possède sa **propre base de données** — pas de partage de tables entre services. Cela garantit l'**indépendance** : schéma, type de BDD et scaling propres à chaque service.\n\nLe partage de BDD recrée le couplage du monolithe. Pour les données partagées : **API** entre services ou **réplication événementielle**.\n\nVariante souple : même instance BDD mais schémas séparés. L'essentiel est que **chaque service est le seul propriétaire de ses données**.",
        
          deepDive: `
# Database per service

## Qu'est-ce que c'est

The Database per Service pattern gives each microservice its own private database. Other services cannot access it directly - they must go through the service API. This enforces service boundaries and enables independent deployment and scaling.

Patterns for data management:
- **Private table**: Service owns specific tables
- **Schema per service**: Dedicated schema in shared database
- **Database per service**: Completely isolated database

## Syntaxe et exemples

### Schema per Service (PostgreSQL)

-- Service A schema
CREATE SCHEMA orders;
CREATE TABLE orders.order (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Service B schema (different service, different schema)
CREATE SCHEMA inventory;
CREATE TABLE inventory.stock (
  product_id UUID PRIMARY KEY,
  quantity INTEGER NOT NULL,
  reserved INTEGER DEFAULT 0
);

-- Access control
GRANT USAGE ON SCHEMA orders TO orders_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON orders.order TO orders_service;

### Database per Service (microservices)

# docker-compose.yml for local development
version: '3.8'
services:
  users-service:
    image: myapp/users-service
    environment:
      DATABASE_URL: postgresql://users_db:5432/users
    depends_on:
      users_db:
        condition: service_healthy

  orders-service:
    image: myapp/orders-service
    environment:
      DATABASE_URL: postgresql://orders_db:5432/orders

  users_db:
    image: postgres:15
    volumes:
      - users_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U users"]
      interval: 10s

  orders_db:
    image: postgres:15
    volumes:
      - orders_data:/var/lib/postgresql/data

volumes:
  users_data:
  orders_data:

### API-based Access

// Order Service - never queries Users DB directly
class OrderService {
  async getOrderWithCustomer(orderId: string): Promise<OrderWithCustomer> {
    const order = await this.orderRepo.findById(orderId);

    // Call Customer Service API instead of direct DB access
    const customer = await this.customerClient.getCustomer(order.customerId);

    return { order, customer };
  }
}

// Customer Service exposes REST/grpc API
class CustomerService {
  async getCustomer(id: string): Promise<Customer> {
    return this.db.query('SELECT * FROM customers WHERE id = $1', [id]);
  }
}

### Event-driven Data Synchronization

// When Order service needs customer name (denormalization)
class CustomerEventHandler {
  @Subscribe('CustomerCreated')
  async handleCustomerCreated(event: CustomerCreated) {
    // Cache or create local read model
    await this.customerCache.upsert(event.customerId, {
      id: event.customerId,
      name: event.name,
      email: event.email,
    });
  }
}

## Bonnes pratiques

- Each database should only be accessed by its owning service
- Use API contracts for inter-service communication
- Implement eventual consistency patterns
- Use events to keep services synchronized
- Consider read replicas for query-heavy services
- Use connection pooling appropriately

## Pièges courants

- Services sharing the same database (loses independence)
- Creating circular dependencies between services
- Using distributed transactions across service databases
- Not planning for data migration between services
- Over-fetching data across service boundaries
- Ignoring network latency in API calls

## Sources

https://microservices.io/patterns/data/database-per-service.html | https://learn.microsoft.com/en-us/azure/architecture/microservices/design/data-considerations | https://www.mongodb.com/microservices-architecture | https://dev.mysql.com/blog-archive/why-a-database-per-microservice-is-wrong-approach-and-what-to-consider-instead/
`},
      ],
    },
  ],
};