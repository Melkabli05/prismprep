import type { InterviewCategory } from '../../../../core/models/interview.models';

export const securityCategory: InterviewCategory = {
  id: 'security',
  title: 'Sécurité',
  color: 'background: var(--color-error); color: white',
  description: "Auth, JWT, CORS, OWASP",
  sections: [
    {
      id: 'sec-base',
      title: 'Sécurité Web',
      questions: [
        {
          id: 'sec-1',
          question: 'Authentification vs Autorisation',
          answer: "**Authentification** = « Qui êtes-vous ? » : vérification de l'identité via login/mdp, `OAuth`, `SSO` ou biométrie, délivrant un token ou une session.\n\n**Autorisation** = « Que pouvez-vous faire ? » : détermination des droits après identification, via `RBAC` (permissions par rôles) ou `ABAC` (permissions par attributs contextuels).\n\nLes deux sont **distincts** : on peut être authentifié sans être autorisé à accéder à une ressource. Analogie : entrer dans un bâtiment (auth) vs accéder à certaines pièces (autorisation).",
        },
        {
          id: 'sec-2',
          question: 'OWASP Top 10',
          answer: "Document de référence listant les **10 vulnérabilités web les plus critiques** (injection SQL, `XSS`, mauvaise authentification, exposition de données sensibles, `XXE`, désérialisation unsafe, composants vulnérables…).\n\nCe sont les failles les plus exploitées en pratique. S'utilise comme **checklist de sécurité** dans un projet : protection contre les injections ? validation des entrées ? hash des mots de passe ? gestion des sessions ?\n\n__Le minimum syndical en sécurité web que tout développeur doit connaître__.",
        },
        {
          id: 'sec-3',
          question: 'Injection SQL',
          answer: "Un attaquant insère du **SQL malveillant** via les champs de saisie. Exemple : concaténation `\"SELECT * FROM users WHERE name = '\" + name + \"'\"` avec input `' OR '1'='1` rend la condition toujours vraie.\n\nConséquences : vol/modification/suppression de données, prise de contrôle du serveur.\n\nProtection : **requêtes préparées** (première ligne de défense, les paramètres sont des données pas du code), `ORM` (requêtes paramétrées auto), validation des entrées (type, longueur, format).",
          code: "// Vulnérable ❌\n\"SELECT * FROM users WHERE name = '\" + name + \"'\"\n\n// Sécurisé ✅\nPreparedStatement ps = conn.prepareStatement(\n    \"SELECT * FROM users WHERE name = ?\"\n);\nps.setString(1, name);",
          language: 'java',
        },
        {
          id: 'sec-8',
          question: 'XSS (Cross-Site Scripting)',
          answer: "L'attaquant injecte du **JavaScript malveillant** dans une page vue par d'autres utilisateurs. Trois types : **Stored XSS** (script persisté en BDD, exécuté à chaque visite), **Reflected XSS** (script dans l'URL, exécuté au clic), **DOM-based** (manipulation côté client).\n\nConséquences : vol de session/cookies, redirection malveillante, keylogging.\n\nProtection : **échapper le HTML** (`<` → `&lt;`), **Content Security Policy** (`CSP` header), `HttpOnly` sur les cookies, frameworks modernes (Angular/React échappent par défaut). __Ne jamais insérer du HTML non échappé.__",
        },
        {
          id: 'sec-9',
          question: 'CSRF (Cross-Site Request Forgery)',
          answer: "L'attaquant fait exécuter une **requête non intentionnelle** à un utilisateur authentifié. Exemple : un lien caché qui effectue un virement bancaire en utilisant la session active du navigateur.\n\nProtection : **token CSRF** (valeur aléatoire par session, vérifiée côté serveur), **SameSite cookies** (`Strict` ou `Lax`), vérification du header `Referer`/`Origin`.\n\nPour les APIs REST *stateless* avec JWT, le CSRF est naturellement atténué (le token n'est pas envoyé automatiquement comme les cookies). __Spring Security active la protection CSRF par défaut.__",
        },
        {
          id: 'sec-4',
          question: 'CORS',
          answer: "**Cross-Origin Resource Sharing** : mécanisme de sécurité navigateur contrôlant les accès inter-domaines. La **Same-Origin Policy** bloque par défaut les requêtes vers un domaine différent.\n\nCORS permet à l'API de déclarer les domaines autorisés via le header `Access-Control-Allow-Origin`, après une requête de preflight (`OPTIONS`).\n\nConfiguration côté serveur pour autoriser les origines légitimes. __Une mauvaise config (`Access-Control-Allow-Origin: *`) ouvre des failles__. CORS se configure correctement, il ne se désactive pas.",
        },
        {
          id: 'sec-5',
          question: 'Sécuriser une API REST',
          answer: "Approche **en profondeur** à plusieurs niveaux : **authentification** (`JWT` signé dans le header `Authorization`, ou `OAuth2`), **autorisation** (vérification des droits par endpoint via rôles/permissions), **validation des entrées** (body, query params, path variables), limitation des méthodes `HTTP` autorisées par ressource, **rate limiting** (protection anti-DDoS et anti-abus), **surveillance** (logs des accès suspects, monitoring, alertes).\n\nChaque couche ajoute un niveau de protection *complémentaire*.",
        },
      ],
    },
    {
      id: 'sec-auth',
      title: 'Authentification & Tokens',
      questions: [
        {
          id: 'sec-6',
          question: 'JWT en détail',
          answer: "**JSON Web Token** : token auto-contenu en trois parties séparées par des `.` : **Header** (algorithme, type), **Payload** (claims : `sub`, `iat`, `exp`, données custom), **Signature** (vérifie l'intégrité via clé secrète ou paire de clés RSA).\n\n**Stateless** : le serveur ne stocke pas la session — toute l'info est dans le token. Le serveur vérifie uniquement la **signature** et l'**expiration**.\n\n__Bonnes pratiques__ : tokens courts (15min access), **refresh tokens** pour le renouvellement, stocker en `httpOnly` cookie (pas localStorage), ne pas mettre de données sensibles dans le payload (encodé, pas chiffré).",
          code: '// Structure JWT\nheader.payload.signature\n\n// Exemple payload\n{\n  "sub": "user123",\n  "role": "admin",\n  "exp": 1700000000\n}',
          language: 'json',
        },
        {
          id: 'sec-7',
          question: 'OAuth2',
          answer: "Protocole d'**autorisation déléguée** : l'utilisateur autorise une app à accéder à ses données sur une autre app **sans partager son mot de passe**.\n\nFlux courants : **Authorization Code** (apps serveur — le plus sécurisé), **Authorization Code + PKCE** (apps mobiles/SPA), **Client Credentials** (service-to-service, pas d'utilisateur).\n\nL'app obtient un **access token** (courte durée) et un **refresh token** (longue durée). __OAuth2 gère l'autorisation, pas l'authentification — OpenID Connect ajoute la couche d'identité.__",
        },
        {
          id: 'sec-10',
          question: 'Hash des mots de passe',
          answer: "Ne **jamais** stocker les mots de passe en clair. Utiliser un **hash** à sens unique avec un **salt** (chaîne aléatoire unique par mot de passe) pour empêcher les attaques par rainbow tables.\n\nAlgorithmes recommandés : **`bcrypt`** (adaptatif, le plus courant), **`Argon2`** (gagnant de la compétition de hashing), **`scrypt`**. À éviter : `MD5`, `SHA-1`, `SHA-256` simple (trop rapides, vulnérables au brute force).\n\n__Règle : le hash doit être lent__ (coût de calcul élevé) pour ralentir les attaques. `bcrypt` avec un cost factor de 10-12 est un bon compromis.",
        },
        {
          id: 'sec-11',
          question: 'HTTPS / TLS',
          answer: "**HTTPS** = HTTP + **TLS** (Transport Layer Security). Chiffre les communications entre client et serveur, garantissant **confidentialité**, **intégrité** et **authenticité** du serveur.\n\nLe serveur présente un **certificat** (validé par une CA), le client et le serveur négocient une clé de session symétrique via échange asymétrique. Tout le trafic est chiffré ensuite.\n\n__En 2024, HTTPS est obligatoire__ — jamais de HTTP en production. Les certificats sont gratuits via **Let's Encrypt**. HTTP/2 et HTTP/3 exigent HTTPS.",
        },
      ],
    },
  ],
};