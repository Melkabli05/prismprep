import type { InterviewCategory } from '../models/interview.models';

export const restApiCategory: InterviewCategory = {
  id: 'rest-api',
  title: 'API REST',
  color: 'bg-indigo-100 text-indigo-700',
  description: 'REST, HTTP, bonnes pratiques API',
  sections: [
    {
      id: 'api-fondamentaux',
      title: 'Fondamentaux REST',
      questions: [
        {
          id: 'api-1',
          question: 'Qu\'est-ce que REST et quels sont ses principes fondamentaux ?',
          answer: '**REST** (*Representational State Transfer*) est un style d\'architecture pour les systèmes distribués, défini par Roy Fielding. Six contraintes : **client-serveur**, **sans état** (chaque requête contient toute l\'info), **cacheable**, **interface uniforme**, **système en couches**, **code à la demande** (optionnel).\n\nL\'**interface uniforme** repose sur : identification des ressources via `URI`, manipulation via représentations, messages auto-descriptifs, et **HATEOAS**.\n\n__REST n\'est pas un protocole mais un ensemble de contraintes architecturales.__ Une API qui respecte ces contraintes est *RESTful*.',
        },
        {
          id: 'api-2',
          question: 'Quelles sont les méthodes HTTP et leur sémantique ?',
          answer: '**`GET`** : lecture (idempotent, sûre, cacheable). **`POST`** : création ou traitement (non idempotent). **`PUT`** : remplacement complet d\'une ressource (idempotent). **`PATCH`** : mise à jour partielle (idempotent en pratique). **`DELETE`** : suppression (idempotent).\n\n**Idempotent** = réexécuter la même requête N fois produit le même résultat côté serveur. `POST` est la seule méthode *non idempotente*.\n\n__Règle : utilisez la méthode HTTP qui exprime l\'intention, pas l\'action technique.__',
          code: 'GET    /users       → liste des utilisateurs\nGET    /users/42    → utilisateur 42\nPOST   /users       → créer un utilisateur\nPUT    /users/42    → remplacer utilisateur 42\nPATCH  /users/42    → modifier partiellement utilisateur 42\nDELETE /users/42    → supprimer utilisateur 42',
          language: 'http',
        },
        {
          id: 'api-3',
          question: 'Quels codes de statut HTTP connaître pour une API REST ?',
          answer: '**2xx Succès** : `200` OK, `201` Created, `204` No Content. **3xx Redirection** : `301` Moved Permanently, `304` Not Modified (cache).\n\n**4xx Erreur client** : `400` Bad Request, `401` Unauthorized (non authentifié), `403` Forbidden (authentifié mais pas les droits), `404` Not Found, `409` Conflict, `422` Unprocessable Entity, `429` Too Many Requests.\n\n**5xx Erreur serveur** : `500` Internal Server Error, `502` Bad Gateway, `503` Service Unavailable.\n\n__Ne renvoyez jamais un `200` avec un message d\'erreur dans le body — utilisez le bon code de statut.__',
        },
        {
          id: 'api-4',
          question: 'Qu\'est-ce que l\'idempotence en HTTP ?',
          answer: 'Une méthode est **idempotente** si l\'exécuter plusieurs fois produit le **même état côté serveur** que de l\'exécuter une seule fois. `GET`, `PUT`, `DELETE`, `PATCH` sont idempotents — `POST` ne l\'est pas.\n\nExemple : `DELETE /users/42` renvoie `204` la première fois, puis `404` les fois suivantes — l\'*état serveur* est identique (l\'utilisateur n\'existe plus), donc c\'est idempotent.\n\n__L\'idempotence concerne l\'état serveur, pas la réponse HTTP.__ C\'est crucial pour les retries automatiques en cas de panne réseau.',
        },
        {
          id: 'api-5',
          question: 'Comment versionner une API REST ?',
          answer: 'Trois approches principales : **versionnement dans l\'URL** (`/api/v1/users` — le plus courant et explicite), **via le header** (`Accept: application/vnd.myapi.v1+json` — plus *clean* mais moins visible), **via un query param** (`/api/users?version=1` — déconseillé, pollue l\'URL).\n\nL\'approche par **URL** est la plus adoptée : simple à comprendre, facile à router, compatible avec les outils de monitoring et les proxys.\n\n__Gardez au maximum 2 versions en parallèle__, dépréciez l\'ancienne avec un header `Sunset`, et communiquez clairement les timelines de suppression.',
          code: '// Approche URL (recommandée)\nGET /api/v1/users\nGET /api/v2/users\n\n// Approche Header\nAccept: application/vnd.myapi.v2+json',
          language: 'http',
        },
        {
          id: 'api-6',
          question: 'Comment implémenter la pagination dans une API REST ?',
          answer: 'Trois stratégies : **offset/limit** (`?offset=20&limit=10` — simple mais lent sur de gros offset car la BDD scanne tout), **cursor-based** (`?cursor=abc123` — utilise un identifiant de référence, performant même sur de grandes collections, idéal pour le scroll infini), **page/size** (`?page=2&size=10` — intuitif mais même problème que l\'offset).\n\nIncluez les **métadonnées** dans la réponse : `totalElements`, `totalPages`, `next`, `prev`.\n\n__Pour les grandes collections ou le temps réel, privilégiez le cursor-based pagination.__',
          code: '{\n  "data": [...],\n  "pagination": {\n    "total": 1050,\n    "page": 2,\n    "size": 10,\n    "next": "/api/v1/users?page=3&size=10",\n    "prev": "/api/v1/users?page=1&size=10"\n  }\n}',
          language: 'json',
        },
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
        },
        {
          id: 'api-8',
          question: 'Comment implémenter le rate limiting dans une API ?',
          answer: 'Le **rate limiting** protège l\'API contre les abus et les attaques DDoS. Approches : **fixed window** (compteur par fenêtre de temps fixe — simple mais burst possible aux limites), **sliding window** (fenêtre glissante — plus précis), **token bucket** (tokens régénérés à rythme constant, permet un burst contrôlé).\n\nCommuniquez les limites via les headers : `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Quand la limite est atteinte : **`429 Too Many Requests`** avec header `Retry-After`.\n\n__Le rate limiting est indispensable en production — sans lui, un seul client peut saturer tout le service.__',
        },
        {
          id: 'api-9',
          question: 'Comment gérer CORS pour une API REST ?',
          answer: '**CORS** (*Cross-Origin Resource Sharing*) est une politique de sécurité navigateur. Par défaut, le navigateur bloque les requêtes cross-origin. L\'API doit envoyer les headers `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`.\n\nLes requêtes *preflight* (`OPTIONS`) sont envoyées automatiquement par le navigateur avant les requêtes complexes (méthodes autres que `GET`/`POST` simples, headers custom).\n\n__Ne jamais utiliser `Access-Control-Allow-Origin: *` avec des credentials — c\'est bloqué par les navigateurs.__ Configurez les origines autorisées explicitement.',
          code: '// Headers de réponse CORS\nAccess-Control-Allow-Origin: https://mon-app.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization\nAccess-Control-Max-Age: 86400',
          language: 'http',
        },
        {
          id: 'api-10',
          question: 'Comment documenter une API REST ?',
          answer: '**`OpenAPI`** (anciennement Swagger) est le standard : un fichier `YAML`/`JSON` décrit les endpoints, paramètres, réponses, modèles, authentification. Génération automatique avec `Springdoc` (Java), `Swagger` (Node), `NSwag` (.NET).\n\nBonne documentation = **spécification OpenAPI** + **exemples concrets** + **descriptions en langage naturel**. Les outils génèrent aussi une UI interactive (`Swagger UI`, `Redoc`) pour tester les endpoints.\n\n__La documentation doit être générée à partir du code, pas écrite manuellement — sinon elle sera toujours en retard.__',
          code: 'openapi: 3.0.3\ninfo:\n  title: User API\n  version: 1.0.0\npaths:\n  /users:\n    get:\n      summary: Liste des utilisateurs\n      parameters:\n        - name: page\n          in: query\n          schema:\n            type: integer\n            default: 1\n      responses:\n        "200":\n          description: Succès',
          language: 'yaml',
        },
        {
          id: 'api-11',
          question: 'Comment authentifier une API REST ?',
          answer: 'Méthodes courantes : **`API Key`** (header ou query param — simple mais pas de droits granulaires), **`JWT`** (token signé dans le header `Authorization: Bearer <token>` — stateless, scalable), **`OAuth2`** (délégation d\'autorisation — pour les apps tierces), **`Basic Auth`** (login/mdp encodé — à éviter en production sans HTTPS).\n\nPour les APIs internes : **JWT** est le choix le plus courant. Pour les APIs publiques destinées aux partenaires : **OAuth2** avec client credentials.\n\n__Ne mettez jamais de secret dans l\'URL (query param) — les URLs sont loggées partout.__ Préférez toujours le header `Authorization`.',
        },
        {
          id: 'api-12',
          question: 'REST vs GraphQL : quand choisir quoi ?',
          answer: '**REST** : ressources bien définies, conventions HTTP, cache natif, écosystème mature. Adapté aux APIs publiques, aux microservices simples, quand le cache est crucial.\n\n**`GraphQL`** : un seul endpoint, le client choisit exactement les champs voulus (pas d\'over/under-fetching), typage fort, introspection. Adapté aux apps avec des besoins de données *variés* et *imbriqués*.\n\n__REST pour la simplicité et la performance cache, GraphQL pour la flexibilité des requêtes.__ En pratique, REST reste le défaut — GraphQL s\'ajoute quand le client a des besoins de données très dynamiques.',
        },
      ],
    },
  ],
};