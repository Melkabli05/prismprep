import type { InterviewCategory } from '../../../../core/models/interview.models';

export const restApiCategory: InterviewCategory = {
  id: 'rest-api',
  title: 'API REST',
  color: 'background: var(--color-accent); color: white',
  description: 'REST, HTTP, bonnes pratiques API',
  sections: [
    {
      id: 'api-fondamentaux',
      title: 'Fondamentaux REST',
      questions: [
        {
          id: 'api-1',
          question: 'Qu\'est-ce que REST et quels sont ses principes fondamentaux ?',
          answer: '**REST** (*Representational State Transfer*) est un style d\'architecture pour les systèmes distribués, défini par Roy Fielding. Six contraintes : **client-serveur**, **sans état** (chaque requête contient toute l\'info), **cachéeable**, **interface uniforme**, **système en couches**, **code à la demande** (optionnel).\n\nL\'**interface uniforme** repose sur : identification des ressources via `URI`, manipulation via représentations, messages auto-descriptifs, et **HATEOAS**.\n\n__REST n\'est pas un protocole mais un ensemble de contraintes architecturales.__ Une API qui respecte ces contraintes est *RESTful*.',
        
          deepDive: `# Les principes REST

## Quest-ce que c'est ?

REST (Representational State Transfer) est un style darchitecture cree par Roy Fielding en 2000 dans sa these de doctorat. Ce nest pas un protocole mais un ensemble de contraintes architecturales pour concevoir des services web Scalables, performants et maintenables.

REST defini comment les ressources sont adressees via des URI et comment etre transferees entre client et serveur en utilisant les methodes HTTP standard.

## Syntaxe et exemples

Une API REST typique expose des ressources via des URLs structustees:

\`\`\`
GET    /api/users          - Liste tous les utilisateurs
GET    /api/users/123       - Recupere un utilisateur specifique
POST   /api/users           - Cree un nouvel utilisateur
PUT    /api/users/123       - Met a jour un utilisateur entier
PATCH  /api/users/123       - Met a jour partiellement un utilisateur
DELETE /api/users/123       - Supprime un utilisateur
\`\`\`

Chaque ressource peut avoir plusieurs representations (JSON, XML, HTML).

## Bonnes pratiques

1. **Utiliser les noms plutot que les verbes** dans les URLs
   - Bon: GET /api/users
   - Mauvais: GET /api/getUsers

2. **Utiliser les codes de statut HTTP** correctement
   - 200 OK, 201 Created, 204 No Content
   - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
   - 500 Internal Server Error

3. **Stateless** - Chaque requete doit contenir toutes les informations necessaires

4. **Support du versionnage** via headers ou dans l'URL: /api/v1/users

5. **Pagination** pour les grandes collections: ?page=1&limit=20

## Pièges courants

- Melanger les verbes HTTP (utiliser GET pour des operations de modification)
- Retourner toujours 200 OK meme en cas d'erreur
- Ne pas respecter le principe stateless
- Exposer des URI trop profondes: /api/orgs/1/depts/2/teams/3/members/4

Source : [RESTful API Tutorial](https://restfulapi.net/)
`},
        {
          id: 'api-2',
          question: 'Quelles sont les méthodes HTTP et leur sémantique ?',
          answer: '**`GET`** : lecture (idempotent, sûre, cachéeable). **`POST`** : création ou traitement (non idempotent). **`PUT`** : remplacement complet d\'une ressource (idempotent). **`PATCH`** : mise à jour partielle (**non idempotent** — RFC 9110). **`DELETE`** : suppression (idempotent).\n\n**Idempotent** = réexécuter la même requête N fois produit le même résultat côté serveur. `POST` est la seule méthode *non idempotente*.\n\n__Règle : utilisez la méthode HTTP qui exprime l\'intention, pas l\'action technique.__',
          code: 'GET    /users       → liste des utilisateurs\nGET    /users/42    → utilisateur 42\nPOST   /users       → créer un utilisateur\nPUT    /users/42    → remplacer utilisateur 42\nPATCH  /users/42    → modifier partiellement utilisateur 42\nDELETE /users/42    → supprimer utilisateur 42',
          language: 'http',
        
          deepDive: `# Les methodes HTTP et leur semantique

## Quest-ce que c'est ?

HTTP defini un ensemble de methodes (aussi appelees verbes) qui indiquent l'action desiree sur une ressource. Chaque methode a une semantique precise que les clients et serveurs doivent respecter.

## Syntaxe et exemples

| Methode | Semantique | Idempotente | Sure |
|---------|------------|-------------|------|
| GET     | Lecture d'une ressource | Oui | Oui |
| POST    | Creation d'une ressource | Non | Non |
| PUT     | Remplacement complet | Oui | Non |
| PATCH   | Modification partielle | Non | Non |
| DELETE  | Suppression | Oui | Non |
| HEAD    | Idem GET sans le corps | Oui | Oui |
| OPTIONS | Decrit les options de communication | Oui | Oui |

### Exemples concrets

\`\`\`
GET /api/articles/42
Reponse: 200 OK { "id": 42, "title": "Intro REST", "content": "..." }

POST /api/articles
Body: { "title": "Nouvel article", "content": "..." }
Reponse: 201 Created { "id": 43, "title": "Nouvel article", ... }

PUT /api/articles/43
Body: { "id": 43, "title": "Titre mis a jour", "content": "Nouveau contenu" }
Reponse: 200 OK

PATCH /api/articles/43
Body: { "title": "Titre modifie" }
Reponse: 200 OK

DELETE /api/articles/43
Reponse: 204 No Content
\`\`\`

## Bonnes pratiques

1. **GET** ne doit jamais modifier de donnees
2. **POST** cree une nouvelle ressource, utilise souvent pour des actions complexes
3. **PUT** remplace entierement la ressource - si un champ est absent, il est mis a null
4. **PATCH** modifie uniquement les champs fournis
5. **DELETE** doit retourner 204 apres suppression reussie

## Pièges courants

- Utiliser GET pour des suppressions (violation de la semantique)
- Retourner 200 OK pour DELETE alors que la ressource est supprimee
- Utiliser POST la ou PUT serait plus approprie (et inversement)
- Oublier que PATCH nest pas idempotent sur tous les serveurs

Source : [MDN Web Docs - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
`},
        {
          id: 'api-3',
          question: 'Quels codes de statut HTTP connaître pour une API REST ?',
          answer: '**2xx Succès** : `200` OK, `201` Created, `204` No Content. **3xx Redirection** : `301` Moved Permanently, `304` Not Modified (cachée).\n\n**4xx Erreur client** : `400` Bad Request, `401` Unauthorized (non authentifié), `403` Forbidden (authentifié mais pas les droits), `404` Not Found, `409` Conflict, `422` Unprocessable Entity, `429` Too Many Requests.\n\n**5xx Erreur serveur** : `500` Internal Server Error, `502` Bad Gateway, `503` Service Unavailable.\n\n__Ne renvoyez jamais un `200` avec un message d\'erreur dans le body — utilisez le bon code de statut.__',
        
          deepDive: `# Les codes de statut HTTP

## Quest-ce que c'est ?

Les codes de statut HTTP sont des codes numeriques retournes par un serveur pour indiquer le resultat d'une requete cliente. Ils sont organises en classes de 5 categories principales.

## Syntaxe et exemples

### 1xx - Information
- **100 Continue** : Le serveur a recu les headers, le client peut envoyer le corps
- **101 Switching Protocols** : Le serveur accepte de changer de protocole

### 2xx - Succes
- **200 OK** : Requete reussie (GET, PUT, PATCH)
- **201 Created** : Ressource creee (POST)
- **202 Accepted** : Requete acceptee pour traitement asynchrone
- **204 No Content** : Succes sans corps de reponse (DELETE)

### 3xx - Redirection
- **301 Moved Permanently** : Ressource deplacee definitivement
- **302 Found** : Redirection temporaire
- **304 Not Modified** : Version en cache valide (utilise avec ETag)

### 4xx - Erreur client
- **400 Bad Request** : Requete malformee
- **401 Unauthorized** : Authentification requise
- **403 Forbidden** : Acces refuse (meme avec auth)
- **404 Not Found** : Ressource inexistante
- **405 Method Not Allowed** : Methode non supportee pour cette ressource
- **409 Conflict** : Conflit avec etat actuel de la ressource
- **422 Unprocessable Entity** : Syntaxe correcte mais semantique erronee
- **429 Too Many Requests** : Rate limit depassee

### 5xx - Erreur serveur
- **500 Internal Server Error** : Erreur generique
- **502 Bad Gateway** : Le serveur agit comme proxy et recoit une reponse invalide
- **503 Service Unavailable** : Serveur temporairement indisponible
- **504 Gateway Timeout** : Le proxy na pas recu de reponse a temps

## Bonnes pratiques

1. **Retourner le code le plus precis** pour chaque situation
2. **Inclure un corps de reponse** avec un message derreur explicite en 4xx/5xx
3. **Ne pas retourner 200 OK** pour des erreurs
4. **Utiliser 201** apres POST qui cree une ressource
5. **Utiliser 204** pour DELETE reussi sans corps

## Pièges courants

- Retourner 404 pour une ressource existante mais sans acces (utiliser 403)
- Mettre 200 pour toutes les reussites (confondre avec 201, 204)
- Oublier que 401 est pour authentification et 403 pour autorisation
- Ne pas documenter les codes de statut personnalises

Source : [MDN Web Docs - HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
`},
        {
          id: 'api-4',
          question: 'Qu\'est-ce que l\'idempotence en HTTP ?',
          answer: 'Une méthode est **idempotente** si l\'exécuter plusieurs fois produit le **même état côté serveur** que de l\'exécuter une seule fois. `GET`, `PUT`, `DELETE` sont idempotents — `POST` et `PATCH` ne le sont pas.\n\nExemple : `DELETE /users/42` renvoie `204` la première fois, puis `404` les fois suivantes — l\'*état serveur* est identique (l\'utilisateur n\'existe plus), donc c\'est idempotent.\n\n__L\'idempotence concerne l\'état serveur, pas la réponse HTTP.__ C\'est crucial pour les retries automatiques en cas de panne réseau.',
        
          deepDive: `# L idempotence en HTTP

## Quest-ce que c'est ?

L'idempotence est une propriete dune methode HTTP qui signifie qu'appliquer la meme requete plusieurs fois produit le meme resultat que si elle navait ete appliquee quune seule fois. Le serveur peut stocker le resultat et retourner la meme reponse.

Cette propriete est critique pour la fiabilite des systemes Distribues car elle permet de safely retry des requetes en cas de timeout ou de perdue de paquets.

## Syntaxe et exemples

### Methodes idempotentes
- **GET** : Toujours idempotente, ne fait que lire
- **PUT** : Idempotente, remplacer une ressource donne le meme etat final
- **DELETE** : Idempotente, supprimer plusieurs fois une ressource deja supprimee retourne 204
- **HEAD** : Idempotente, comme GET mais sans corps
- **OPTIONS** : Idempotente, interroge les capacites

### Methodes non-idempotentes
- **POST** : Non idempotente, chaque POST cree generalement une nouvelle ressource
- **PATCH** : Generalement non idempotente selon limplementation

### Exemples concrets

\`\`\`
PUT /api/users/123
Body: { "name": "Alice", "email": "alice@example.com" }

Premiere requete: 200 OK { "id": 123, "name": "Alice", ... }
Retry (timeout): 200 OK { "id": 123, "name": "Alice", ... }  <- meme resultat

DELETE /api/users/123
Premiere requete: 204 No Content
Retry: 204 No Content  <- toujours pas derreur (idempotent)
\`\`\`

## Bonnes pratiques

1. **Concevoir les DELETE comme idempotents** - retourner 204 memes apres suppression
2. **Utiliser PUT pour les mises a jour complete** - plus sur que PATCH
3. **Implanter une strategie de retry** uniquement pour les operations idempotentes
4. **Documenter les codes derreur** pour chaquemethode
5. **Considerer l'utilisation d'ETag** pour gerer les conflits de concurrence

## Pièges courants

- Croire que DELETE doit retourner 404 apres suppression (devrait retourner 204)
- Implementer PATCH comme non idempotent alors que le client s'y attend
- Ne pas gerer les races conditions sur les updates concurrents
- Confondre idempotence et surete (safety) - une operation suree ne modifie pas letat

Source : [RESTful API Tutorial - Idempotent](https://restfulapi.net/idempotent-rest-apis/)
`},
        {
          id: 'api-5',
          question: 'Comment versionner une API REST ?',
          answer: 'Trois approches principales : **versionnement dans l\'URL** (`/api/v1/users` — le plus courant et explicite), **via le header** (`Accept: application/vnd.myapi.v1+json` — plus *clean* mais moins visible), **via un query param** (`/api/users?version=1` — déconseillé, pollue l\'URL).\n\nL\'approche par **URL** est la plus adoptée : simple à comprendre, facile à router, compatible avec les outils de monitoring et les proxys.\n\n__Gardez au maximum 2 versions en parallèle__, dépréciez l\'ancienne avec un header `Sunset`, et communiquez clairement les timelines de suppression.',
          code: '// Approche URL (recommandée)\nGET /api/v1/users\nGET /api/v2/users\n\n// Approche Header\nAccept: application/vnd.myapi.v2+json',
          language: 'http',
        
          deepDive: `# Le versionnement d API REST

## Quest-ce que c'est ?

Le versionnement permet de faire evoluer une API sans casser les clients existants. Quand des changements incompatibles sont necessaires, une nouvelle version est publiee pendant que l'ancienne reste disponible pendant une periode de transition.

## Syntaxe et exemples

### Strategies de versionnement

**1. URL Path (la plus courante)**
\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\`
Avantage: simple, explicite
Inconvenient: pollue l'espace URL

**2. Header Custom**
\`\`\`
GET /api/users HTTP/1.1
API-Version: 2023-01-01
\`\`\`
Avantage: URL propre
Inconvenient: moins visible, cache complique

**3. Header Accept**
\`\`\`
GET /api/users HTTP/1.1
Accept: application/vnd.api.v2+json
\`\`\`
Avantage: standard HATEOAS
Inconvenient: complexe a implementer

**4. Query Parameter**
\`\`\`
GET /api/users?version=2
\`\`\`
Avantage: simple pour les clients
Inconvenient: melange URL et configuration

## Bonnes pratiques

1. **Choisir une strategie et la garder** - la coherence compte plus que la perfection
2. **Deprecier progressivement** - informer les clients et donner du temps
3. **Documenter les differences** entre versions
4. **Limiter le nombre de versions actives** - 2 maximum en general
5. **Utiliser des dates pour les versions** (ISO 8601) pour plus de clartes

## Pièges courants

- Versionner des details minimes (breaker pas toujours necessaire)
- Forcer tous les clients a migrer immediatement
- Ne pas communiquer les deprecations a lavance
- Melanger plusieurs strategies de versionnement
- Oublier dinclure la version dans la documentation OpenAPI

Source : [RESTful API Tutorial - Versioning](https://restfulapi.net/versioning/)
`},
        {
          id: 'api-6',
          question: 'Comment implémenter la pagination dans une API REST ?',
          answer: 'Trois stratégies : **offset/limit** (`?offset=20&limit=10` — simple mais lent sur de gros offset car la BDD scanne tout), **cursor-based** (`?cursor=abc123` — utilise un identifiant de référence, performant même sur de grandes collections, idéal pour le scroll infini), **page/size** (`?page=2&size=10` — intuitif mais même problème que l\'offset).\n\nIncluez les **métadonnées** dans la réponse : `totalElements`, `totalPages`, `next`, `prev`.\n\n__Pour les grandes collections ou le temps réel, privilégiez le cursor-based pagination.__',
          code: '{\n  "data": [...],\n  "pagination": {\n    "total": 1050,\n    "page": 2,\n    "size": 10,\n    "next": "/api/v1/users?page=3&size=10",\n    "prev": "/api/v1/users?page=1&size=10"\n  }\n}',
          language: 'json',
        
          deepDive: `# Pagination dans une API REST

## Qu'est-ce que c'est

La pagination divise un grand ensemble de donnees en plusieurs pages, facilitant le chargement progressif et reduisant la charge serveur. Deux approches principales: offset-based et cursor-based.

## Syntaxe et exemples

### Offset-based Pagination

Requete avec parametres de pagination:

GET /api/users?page=2&limit=20

Format de reponse:

{
  data: [],
  pagination: {
    page: 2,
    limit: 20,
    total: 100,
    totalPages: 5,
    hasNextPage: true,
    hasPrevPage: true
  }
}

### Cursor-based Pagination (Recommendation pour grandes listes)

Requete avec cursor encode:

GET /api/users?cursor=ENCODED_CURSOR&limit=20

Le cursor est un objet encode en base64 contenant { id: lastId }

Format de reponse:

{
  data: [],
  cursor: {
    nextCursor: ENCODED_STRING,
    hasMore: true
  }
}

### En-tetes HTTP pour la pagination

res.set({
  X-Total-Count: 100,
  Link: </api/users?page=2>; rel="next", </api/users?page=1>; rel="first"
});

## Bonnes pratiques

- Preferer cursor-based pour grandes listes (meilleure performance)
- Definir des limites maximales pour eviter les surcharges
- Toujours retourner des metadata de pagination
- Implementer le tri stable (par id ou timestamp)
- Utiliser les en-tetes HTTP (Link) pour discoverabilite
- Cache les resultats de maniere appropriee

## Pièges courants

- Utiliser OFFSET sur grandes tables (performance degrade)
- Ne pas verrouiller les lignes (inconsistent results)
- Oublier de gerer les donnees changees entre pages
- Pas de limite maximale (DoS vulnerability)
- Retourner trop de donnees par page

Source : [Restfulapi.net](https://restfulapi.net/pagination/)`},
      ],
    },
    {
      id: 'api-pratiques',
      title: 'Bonnes Pratiques',
      questions: [
        {
          id: 'api-7',
          question: 'Qu\'est-ce que HATEOAS et pourquoi est-il important ?',
          answer: '**HATEOAS** (*Hypermedia as the Engine of Application State*) : le client découvre les actions disponibles via des **liens hypermédia** dans la réponse, pas via une documentation externe. Le serveur indique ce qu\'il est possible de faire ensuite.\n\nC\'est la contrainte REST la **moins respectée** en pratique. Sans HATEOAS, l\'URL et les actions sont *hardcodées* côté client — le couplage reste fort.\n\n__HATEOAS permet une évolution indépendante du serveur sans casser les clients existants.__ En pratique, peu d\'APIs l\'implémentent entièrement.',
          code: '{\n  "id": 42,\n  "name": "Jean",\n  "_links": {\n    "self": { "href": "/api/v1/users/42" },\n    "orders": { "href": "/api/v1/users/42/orders" },\n    "deactivate": { "href": "/api/v1/users/42/deactivate" }\n  }\n}',
          language: 'json',
        
          deepDive: `# HATEOAS dans les APIs REST

## Qu'est-ce que c'est

HATEOAS (Hypermedia as the Engine of Application State) est un principe REST qui utilise des liens hypermedias pour permettre aux clients de naviguer dynamiquement dans lAPI. Le serveur inclut des liens dans ses responses indiquant les actions possibles.

## Syntaxe et exemples

### Response avec liens HATEOAS

{
  id: 123,
  name: John Doe,
  _links: {
    self: { href: /api/users/123, method: GET },
    update: { href: /api/users/123, method: PUT },
    delete: { href: /api/users/123, method: DELETE },
    posts: { href: /api/users/123/posts, method: GET }
  }
}

### Collection avec pagination HATEOAS

{
  data: [
    { id: 1, name: User 1, _links: { self: { href: /api/users/1 } } }
  ],
  _links: {
    self: { href: /api/users?page=1&limit=10 },
    next: { href: /api/users?page=2&limit=10 },
    prev: { href: /api/users?page=1&limit=10 }
  }
}

### Implementation Node.js

function addLinks(resource, baseUrl) {
  var id = resource.id;
  return {
    id: resource.id,
    name: resource.name,
    email: resource.email,
    _links: {
      self: { href: baseUrl + / + id, method: GET },
      update: { href: baseUrl + / + id, method: PUT },
      delete: { href: baseUrl + / + id, method: DELETE }
    }
  };
}

## Bonnes pratiques

- Toujours inclure le lien self dans chaque resource
- Utiliser des noms de liens standards (self, update, delete, next, prev)
- Inclure les liens uniquement si laction est permissible
- Utiliser le format HAL pour la standardisation
- Fournir des informations de versionnage dans les liens

## Pièges courants

- Ne pas surcharger les responses avec trop de liens
- Liens incorrects ou non a jour
- Ne pas gerer les cas ou laction nest pas disponible
- Melanger les formats de liens
- Oublier les liens dans les erreurs

Source : [Restfulapi.net - HATEOAS](https://restfulapi.net/hateoas/)`},
        {
          id: 'api-8',
          question: 'Comment implémenter le rate limiting dans une API ?',
          answer: 'Le **rate limiting** protège l\'API contre les abus et les attaques DDoS. Approches : **fixed window** (compteur par fenêtre de temps fixe — simple mais burst possible aux limites), **sliding window** (fenêtre glissante — plus précis), **token bucket** (tokens régénérés à rythme constant, permet un burst contrôlé).\n\nCommuniquez les limites via les headers : `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Quand la limite est atteinte : **`429 Too Many Requests`** avec header `Retry-After`.\n\n__Le rate limiting est indispensable en production — sans lui, un seul client peut saturer tout le service.__',
        
          deepDive: `Rate Limiting dans une API REST

Qu'est-ce que c'est

Le rate limiting controle le nombre de requetes quun client peut faire dans un laps de temps donne. Il protege les APIs contre les abus, les attaques DoS, et assure une distribution equitable des ressources.

Syntaxe et exemples

Implementation avec Express et Redis

npm install express ioredis

Une fonction rateLimiter qui utilise Redis pour compter les requetes par IP. Elle stocke chaque requete avec un timestamp dans un sorted set, puis compte combien de requetes ont eu lieu dans la fenetre de temps.

Si le nombre depasse le maximum, retourner 429 avec un message derreur.

Exemple de configuration:

app.use(rateLimiter({ windowMs: 60000, maxRequests: 100 }))

Pour 60 secondes et 100 requetes max par IP.

En-tetes standard

X-RateLimit-Limit: Nombre max de requetes autorisees dans la fenetre
X-RateLimit-Remaining: Nombre de requetes restantes dans la fenetre courante
X-RateLimit-Reset: Timestamp quand la fenetre sera reinitialisee
Retry-After: Secondes avant de pouvoir reessai (seulement pour 429)

Bonnes pratiques

- Implementer differentes limites pour differentes operations (lecture vs ecriture)
- Utiliser Redis pour les installations distribuees (plusieurs serveurs)
- Definir des limites souples avec avertissement et limites dures
- Toujours retourner les informations de rate limit dans les en-tetes
- Implementer le exponential backoff cote client (delai double entre tentatives)
- Prevoir des endpoints publics avec limites plus permissives

Pièges courants

- Ne pas implementer de rate limiting du tout (vulnerabilite DoS)
- Limites trop restrictives sans notification prealable
- Ne pas gerer les clients distribues (meme IP, plusieurs machines)
- Ne pas differencier les types de requetes (cheres vs legieres)
- Pas de plan de contingence en cas dattaque reelle

Source : Restfulapi.net - Rate Limiting`},
        {
          id: 'api-9',
          question: 'Comment gérer CORS pour une API REST ?',
          answer: '**CORS** (*Cross-Origin Resource Sharing*) est une politique de sécurité navigateur. Par défaut, le navigateur bloque les requêtes cross-origin. L\'API doit envoyer les headers `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`.\n\nLes requêtes *preflight* (`OPTIONS`) sont envoyées automatiquement par le navigateur avant les requêtes complexes (méthodes autres que `GET`/`POST` simples, headers custom).\n\n__Ne jamais utiliser `Access-Control-Allow-Origin: *` avec des credentials — c\'est bloqué par les navigateurs.__ Configurez les origines autorisées explicitement.',
          code: '// Headers de réponse CORS\nAccess-Control-Allow-Origin: https://mon-app.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization\nAccess-Control-Max-Age: 86400',
          language: 'http',
        
          deepDive: `CORS pour les APIs REST

Qu'est-ce que c'est

CORS (Cross-Origin Resource Sharing) est un mecanisme de securite HTTP qui controle lacces aux ressources dune API depuis des domaines differents du domaine qui a servi la page web. Il permet aux navigateurs dadapter les requetes cross-origin.

Syntaxe et exemples

Configuration basique avec Express

npm install cors

app.use(cors()) permet toutes les origines. Pour une configuration plus precise:

app.use(cors({
  origin: https://example.com,
  methods: [GET, POST, PUT, DELETE],
  allowedHeaders: [Content-Type, Authorization],
  credentials: true,
  maxAge: 86400
}))

Origins multiples avec fonction de validation

var origins = [https://example.com, https://admin.example.com];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(Not allowed by CORS));
    }
  }
}))

En-tetes CORS principaux

Access-Control-Allow-Origin: Indique quels domaines peuvent acceder a la ressource. Peut etre une origine precise ou * (mais pas avec credentials).
Access-Control-Allow-Methods: Les methodes HTTP autorisees pour les requetes cross-origin.
Access-Control-Allow-Headers: Les en-tetes HTTP autorises dans les requetes.
Access-Control-Allow-Credentials: Si true, les cookies sont autorises dans les requetes cross-origin.
Access-Control-Max-Age: Duree en secondes pendant laquelle le resultat du preflight est cache.

Requete Preflight

Quand une requete cross-origin utilise dautres methodes ou en-tetes, le navigateur envoie dabord une requete OPTIONS (preflight). Le serveur doit repondre avec les bons en-tetes CORS.

Exemple Preflight:

OPTIONS /api/users
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400

Bonnes pratiques

- Toujours specifier les origines exactes dans Access-Control-Allow-Origin (pas de * si possible)
- Ne jamais utiliser * avec Access-Control-Allow-Credentials: true
- Mettre en cache les resultats preflight avec maxAge pour eviter des requetes OPTIONS inutiles
- Separer les APIs publiques (sans CORS restrictif) et privees (avec validation)
- Logger les requetes CORS bloquees pour le monitoring de securite
- Ajouter dautres en-tetes de securite (CSP, X-Frame-Options) en complement

Pièges courants

- Utiliser Access-Control-Allow-Origin: * ce qui permet a nimporte quel site d acceder a lAPI
- Oublier de gerer les requetes preflight (OPTIONS) - le navigateur ne fera pas la requete reelle
- Bloquer toutes les origines alors quune liste precise suffit
- Ne pas inclure les bons en-tetes Access-Control- pour les requetes avec credentials
- Permettre toutes les methodes HTTP sans necessity
- Ne pas valider lorigine de maniere securisee (seuls les noms dhotres)

Source : MDN CORS`},
        {
          id: 'api-10',
          question: 'Comment documenter une API REST ?',
          answer: '**`OpenAPI`** (anciennement Swagger) est le standard : un fichier `YAML`/`JSON` décrit les endpoints, paramètres, réponses, modèles, authentification. Génération automatique avec `Springdoc` (Java), `Swagger` (Node), `NSwag` (.NET).\n\nBonne documentation = **spécification OpenAPI** + **exemples concrets** + **descriptions en langage naturel**. Les outils génèrent aussi une UI interactive (`Swagger UI`, `Redoc`) pour tester les endpoints.\n\n__La documentation doit être générée à partir du code, pas écrite manuellement — sinon elle sera toujours en retard.__',
          code: 'openapi: 3.0.3\ninfo:\n  title: User API\n  version: 1.0.0\npaths:\n  /users:\n    get:\n      summary: Liste des utilisateurs\n      parameters:\n        - name: page\n          in: query\n          schema:\n            type: integer\n            default: 1\n      responses:\n        "200":\n          description: Succès',
          language: 'yaml',
        
          deepDive: `# REST Best Practices

## Qu'est-ce que c'est

Les REST Best Practices sont un ensemble de conventions et recommandations pour concevoir des APIs RESTful robustes, evolutives et facile a maintenir. Elles couvrent la structure des URLs, lutilisation des methodes HTTP, la gestion des erreurs, la pagination, le versioning et la documentation.

## Syntaxe et exemples

### Structure des URLs

Utiliser des noms de ressources au pluriel et des verbes pour les actions:

\`\`\`
# Bonnes pratiques
GET    /api/users          # Lister les utilisateurs
GET    /api/users/123       # Obtenir un utilisateur
POST   /api/users           # Creer un utilisateur
PUT    /api/users/123       # Mettre a jour entierement
PATCH  /api/users/123       # Mise a jour partielle
DELETE /api/users/123       # Supprimer

# Mauvaise pratique
GET /getUsers
POST /createUser
\`\`\`

### Codes de statut HTTP

\`\`\`
200 OK           # Succes standard
201 Created      # Ressource creee
204 No Content   # Succes sans contenu (DELETE)
400 Bad Request  # Erreur client
401 Unauthorized # Non autentifie
403 Forbidden    # Pas les droits
404 Not Found    # Ressource introuvable
500 Internal Server Error # Erreur serveur
\`\`\`

### Format de reponse derreur

\`\`\`typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
    traceId?: string;
  }
}
\`\`\`

## Bonnes pratiques

- Toujours utiliser le pluriel pour les noms de ressources
- Implementer le versioning de lAPI (Accept header ou URL path)
- Utiliser HATEOAS pour la navigation (liens hypermedias)
- Mettre en place la pagination pour les listes volumineuses
- Implementer le cache avec les en-tetes ETag et Last-Modified
- Validator et sanitizer toutes les entrees utilisateur
- Utiliser HTTPS uniquement
- Logger toutes les requetes pour le monitoring

## Pièges courants

- Melanger les verbes et les noms dans les URLs
- Ignorer les codes de statut HTTP (retourner toujours 200)
- Exposer des ID internes dans les reponses
- Ne pas implanter de limite de taille pour les listes
- Oublier de securiser lAPI (pas dauthentification)
- Creer des APIs avec etat (stateful) alors que REST est sans etat

Source : [Restfulapi.net](https://restfulapi.net)`},
        {
          id: 'api-11',
          question: 'Comment authentifier une API REST ?',
          answer: 'Méthodes courantes : **`API Key`** (header ou query param — simple mais pas de droits granulaires), **`JWT`** (token signé dans le header `Authorization: Bearer <token>` — stateless, scalable), **`OAuth2`** (délégation d\'autorisation — pour les apps tierces), **`Basic Auth`** (login/mdp encodé — à éviter en production sans HTTPS).\n\nPour les APIs internes : **JWT** est le choix le plus courant. Pour les APIs publiques destinées aux partenaires : **OAuth2** avec client credentials.\n\n__Ne mettez jamais de secret dans l\'URL (query param) — les URLs sont loggées partout.__ Préférez toujours le header `Authorization`.',
        
          deepDive: `# OAuth2 pour les APIs REST

## Qu'est-ce que c'est

OAuth2 est un protocole dautorisation qui permet aux applications tierces daccder aux ressources dun utilisateur sans exposer ses credentials. Il est le standard pour lauthentification et lautorisation des APIs REST modernes.

## Syntaxe et exemples

### Flux OAuth2 Authorization Code

1. Redirection vers le provider OAuth

GET https://auth.example.com/authorize?client_id=CLIENT_ID&response_type=code&scope=read

2. Echange du code contre un access token

POST https://auth.example.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=AUTH_CODE&client_id=CLIENT_ID&client_secret=CLIENT_SECRET

### Bearer Token

Le token est envoye dans len-tete Authorization:

Authorization: Bearer access_token

### Implementation JWT

Fonction pour generer et verifier un token JWT:

npm install jsonwebtoken

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 1h });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

## Bonnes pratiques

- Toujours utiliser HTTPS pour toutes les communications OAuth
- Stocker les client secrets de maniere securisee
- Implementer le refresh token pour une meilleure securite
- Utiliser des scopes minimaux (principe du moindre privilege)
- Valider tous les tokens a chaque requete
- Logger toutes les tentatives dauthentification

## Pièges courants

- Stocker les mots de passe en clair (utiliser bcrypt)
- Exposer les tokens dans lURL (utiliser les en-tetes)
- Ne pas expirer les tokens (utiliser des access tokens courts)
- Oublier de valider les scopes demandes
- Utiliser des algorithmes JWT faibles

Source : [MDN OAuth 2.0](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)`},
        {
          id: 'api-12',
          question: 'REST vs GraphQL : quand choisir quoi ?',
          answer: '**REST** : ressources bien définies, conventions HTTP, cachée natif, écosystème mature. Adapté aux APIs publiques, aux microservices simples, quand le cachée est crucial.\n\n**`GraphQL`** : un seul endpoint, le client choisit exactement les champs voulus (pas d\'over/under-fetching), typage fort, introspection. Adapté aux apps avec des besoins de données *variés* et *imbriqués*.\n\n__REST pour la simplicité et la performance cachée, GraphQL pour la flexibilité des requêtes.__ En pratique, REST reste le défaut — GraphQL s\'ajoute quand le client a des besoins de données très dynamiques.',
        
          deepDive: `# REST vs GraphQL

## Qu'est-ce que c'est

REST et GraphQL sont deux approches differentes pour concevoir des APIs web. REST utilise une architecture resource-based avec des endpoints fixes, tandis que GraphQL offre un langage de requete flexible permettant aux clients de demander exactement les donnees necessaires.

## Syntaxe et exemples

### REST API - Multiple endpoints

Avec REST, chaque ressource necessite son propre endpoint:

GET /api/users/123
GET /api/users/123/posts
GET /api/users/123/posts/456/comments

Pour obtenir plusieurs ressources, plusieurs requetes sont necessaires.

### GraphQL - Une seule requete

Avec GraphQL, une seule requete peut obtenir toutes les donnees:

query GetUser(userId: ID!) {
  user(id: userId) {
    name
    email
    posts(limit: 3) {
      title
      comments {
        content
      }
    }
  }
}

fetch(/graphql, {
  method: POST,
  headers: { Content-Type: application/json },
  body: JSON.stringify({ query: query, variables: { userId: 123 } })
});

### Schema GraphQL

type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
}

type Query {
  user(id: ID!): User
}

## Quand choisir quoi

| Critere | REST | GraphQL |
|---------|------|---------|
| Complexite | Donnees simples | Donnees complexes, nested |
| Clients | Clients varies | Apps mobiles/web |
| Cache | HTTP caching simple | Cache complexe |
| Performance | Overfetching frequent | Requetes optimises |
| Outilleur | Large support | Limite GraphQL |

## Bonnes pratiques GraphQL

- Definir un schema clair et type
- Utiliser DataLoader pour eviter le N+1
- Implementer pagination (Relay-style)
- Securiser avec depth limiting
- Utiliser les mutations pour ecrire

## Pièges courants

- GraphQL nest pas toujours plus rapide
- Over-fetching en REST
- La complexite GraphQL (schema, resolvers)
- Ne pas ignorer le cache HTTP

Source : [GraphQL Official](https://graphql.org/learn/)`},
      ],
    },
  ],
};