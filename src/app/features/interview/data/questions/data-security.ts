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
        
          deepDive: `# Authentification vs Autorisation

## Quest-ce que cest ?

L'authentification et l'autorisation sont deux concepts fondamentaux en securite informatique, souvent confondus mais bien distincts.

- **Authentification** : Verification de l'identite d'un utilisateur (qui etes-vous ?). Exemple : saisir un mot de passe, scanner une empreinte digitale.
- **Autorisation** : Verification des permissions d'un utilisateur authentifie (avez-vous le droit d'acceder a cette ressource ?). Exemple : un utilisateur connecte peut voir son profil mais pas celui des autres.

## Differences cles

| Aspect | Authentification | Autorisation |
|--------|------------------|--------------|
| Question | Qui etes-vous ? | Que pouvez-vous faire ? |
| Protocoles | OAuth 2.0, SAML, LDAP | RBAC, ABAC, Permissions |
| Ordre | Premier | Deuxieme |

## Protocoles courants

### OAuth 2.0
Protocole de delegation d'autorisation permettant a une application d'acceder a des ressources sur behalf d'un utilisateur.

### JWT (JSON Web Token)
Token siege containing claims utilises pour l'authentification.

## Bonnes pratiques

1. Utilisez MFA (Multi-Factor Authentication) des que possible
2. Implementer le principe du moindre privilege (least privilege)
3. Separer clairement authentification et autorisation
4. Utiliser des tokens avec expiration courte
5. Stocker les mots de passe avec des algorithmes robustes (bcrypt, Argon2)

## Pieges courants

1. Confondre les deux concepts dans la documentation
2. Ne pas verifier les permissions cote serveur (se fier uniquement au client)
3. Utiliser des tokens sans expiration
4. Stocker les mots de passe en texte clair

Source : [OWASP Authentication](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/)`},
        {
          id: 'sec-2',
          question: 'OWASP Top 10',
          answer: "Document de référence listant les **10 vulnérabilités web les plus critiques** (injection SQL, `XSS`, mauvaise authentification, exposition de données sensibles, `XXE`, désérialisation unsafe, composants vulnérables…).\n\nCe sont les failles les plus exploitées en pratique. S'utilise comme **checklist de sécurité** dans un projet : protection contre les injections ? validation des entrées ? hash des mots de passe ? gestion des sessions ?\n\n__Le minimum syndical en sécurité web que tout développeur doit connaître__.",
        
          deepDive: `# OWASP Top 10

## Quest-ce que cest ?

L'OWASP Top 10 est un document de sensibilisation qui classe les 10 risques de securite les plus critiques pour les applications web. Il est mis a jour periodiquement par l'Open Web Application Security Project.

## Les 10 risques (2021)

### A01: Broken Access Control
Echec de la restriction de l'acces aux ressources. Exemple : un utilisateur peut acceder aux donnees d'un autre utilisateur via l'URL.

### A02: Cryptographic Failures
Echecs lies a la cryptographie conduisant a l'exposition de donnees sensibles (mots de passe, cartes de credit).

### A03: Injection
Les instructions SQL, NoSQL, OS ou LDAP incluent des donnees non dignes de confiance.

### A04: Insecure Design
Conception securisee insuffisante. Mod menaces early dans le cycle de developpement.

### A05: Security Misconfiguration
Configuration incorrecte de securite : ports ouverts, erreurs HTTP, stack traces exposees.

### A06: Vulnerable and Outdated Components
Utilisation de composants avec des vulnerabilites connues.

### A07: Identification and Authentication Failures
Echecs dans les fonctions d'authentification : sessions non invalidees, mots de passe faibles.

### A08: Software and Data Integrity Failures
Mise a jour automatique sans verification d'integrite, deserialisation non securisee.

### A09: Security Logging and Monitoring Failures
Absence de journalisation et surveillance.

### A10: Server-Side Request Forgery (SSRF)
Le serveur effectue des requetes vers des destinations non autorisees.

## Bonnes pratiques

1. Effectuer des revues de securite regulieres
2. Utiliser des outils SAST et DAST
3. Mettre a jour regulierement les dependances
4. Implementer une politique de securite claire
5. Former les developpeurs aux pratiques securitaires

Source : [OWASP Top 10](https://owasp.org/Top10/)`},
        {
          id: 'sec-3',
          question: 'Injection SQL',
          answer: "Un attaquant insère du **SQL malveillant** via les champs de saisie. Exemple : concaténation `\"SELECT * FROM users WHERE name = '\" + name + \"'\"` avec input `' OR '1'='1` rend la condition toujours vraie.\n\nConséquences : vol/modification/suppression de données, prise de contrôle du serveur.\n\nProtection : **requêtes préparées** (première ligne de défense, les paramètres sont des données pas du code), `ORM` (requêtes paramétrées auto), validation des entrées (type, longueur, format).",
          code: "// Vulnérable ❌\n\"SELECT * FROM users WHERE name = '\" + name + \"'\"\n\n// Sécurisé ✅\nPreparedStatement ps = conn.prepareStatement(\n    \"SELECT * FROM users WHERE name = ?\"\n);\nps.setString(1, name);",
          language: 'java',
        
          deepDive: `# Injection SQL

## Quest-ce que cest ?

L injection SQL est une technique d attaque consistant a inserer du code SQL malveillant dans une requete destined a etre executee par la base de donnees. Elle permet de contourner l authentification, lire des donnees sensibles, ou detruire la base.

## Types d injection

### In-Band SQLi
L attaquant utilise le meme canal pour lancer l attaque et recuperer les resultats.

### Inferential SQLi (Blind)
L attaquant ne recoit pas de donnees mais peut inferer l information via des comportements (true/false queries).

### Out-of-Band SQLi
L attaquant utilise des canaux differents pour lancer l attaque et recuperer les resultats.

## Exemple d attaque

Une requete vulnerable:
SELECT * FROM users WHERE username = ' + username + ' AND password = ' + password + '

Un attaquant peut entrer: OR 1=1
Resultat: SELECT * FROM users WHERE username = ' OR 1=1

## Comment se premunir

### Requetes parametrees (Prepared Statements)
Utilisation de requetes parametrees avec des variables liees.

### ORM (Hibernate, Entity Framework)
Les ORM protegent generalement contre les injections SQL.

### Validation des entrees
Filtrer et valider toutes les entrees utilisateur.

## Bonnes pratiques

1. Toujours utiliser des requetes parametrees
2. Limiter les privileges de la base de donnees
3. Echapper les caracteres speciaux
4. Mettre en place un WAF (Web Application Firewall)
5. Effectuer des tests de penetration reguliers

Source : [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection/)`},
        {
          id: 'sec-8',
          question: 'XSS (Cross-Site Scripting)',
          answer: "L'attaquant injecte du **JavaScript malveillant** dans une page vue par d'autres utilisateurs. Trois types : **Stored XSS** (script persisté en BDD, exécuté à chaque visite), **Reflected XSS** (script dans l'URL, exécuté au clic), **DOM-based** (manipulation côté client).\n\nConséquences : vol de session/cookies, redirection malveillante, keylogging.\n\nProtection : **échapper le HTML** (`<` → `&lt;`), **Content Security Policy** (`CSP` header), `HttpOnly` sur les cookies, frameworks modernes (Angular/React échappent par défaut). __Ne jamais insérer du HTML non échappé.__",
        
          deepDive: `# XSS (Cross-Site Scripting)

## Quest-ce que cest ?

XSS est une vulnerabilite permettant d injecter du code JavaScript malveillant dans des pages web views par dautres utilisateurs. Elle permet de voler des cookies, des sessions, ou de rediriger vers des sites malveillants.

## Types de XSS

### Stored XSS (Persistante)
Le script malveillant est stocke sur le serveur (base de donnees, forum) et servi a tous les utilisateurs.

### Reflected XSS (Non-persistante)
Le script malveillant est dans l URL et execute lors du clic de la victime.

### DOM-based XSS
Le script s execute cote client via manipulation du DOM.

## Exemple

Un champ de commentaire non echappe:
Le texte utilisateur est insere directement dans le HTML sans echappement.

Un attaquant peut entrer: script tag pour voler des cookies.

## Prevention

### Content Security Policy (CSP)
<meta http-equiv="Content-Security-Policy" content="default-src self">

### Echappement des entrees
Utiliser des fonctions d echappement :
- textContent au lieu de innerHTML
- libraries comme DOMPurify

## Bonnes pratiques

1. Toujours echapper les entrees utilisateur
2. Utiliser les headers de securite (CSP, X-XSS-Protection)
3. Preferer les APIs securitaires (textContent)
4. Ne jamais faire confiance aux entrees utilisateur
5. Utiliser des frameworks avec echappement automatique

## Pieges courants

1. Utiliser innerHTML avec des donnees utilisateur
2. Faire confiance aux donnees provenant du client
3. Oublier d echapper dans les attributs HTML

Source : [OWASP XSS](https://owasp.org/www-community/attacks/xss/)`},
        {
          id: 'sec-9',
          question: 'CSRF (Cross-Site Request Forgery)',
          answer: "L'attaquant fait exécuter une **requête non intentionnelle** à un utilisateur authentifié. Exemple : un lien cachéé qui effectue un virement bancaire en utilisant la session active du navigateur.\n\nProtection : **token CSRF** (valeur aléatoire par session, vérifiée côté serveur), **SameSite cookies** (`Strict` ou `Lax`), vérification du header `Referer`/`Origin`.\n\nPour les APIs REST *stateless* avec JWT, le CSRF est naturellement atténué (le token n'est pas envoyé automatiquement comme les cookies). __Spring Security active la protection CSRF par défaut.__",
        
          deepDive: `# CSRF (Cross-Site Request Forgery)

## Quest-ce que cest ?

CSRF est une attaque forcant un utilisateur authentifie a executer des actions non desirees sur une application web. L'attaque exploite la confiance du site dans le navigateur de la victime.

## Comment ca marche

1. L'utilisateur se connecte a sa banque en ligne
2. Il visite un site malveillant contenant:
<img src="https://bank.com/transfer?to=attacker&amount=10000">
3. Le navigateur envoie automatiquement les cookies d'authentification
4. La transaction est executee sans le consentement de l'utilisateur

## Tokens CSRF

La defense la plus efficace est le token CSRF:

### Implementation
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="abc123xyz">
  ...
</form>

### Validation cote serveur
Verifier que le token dans la requete correspond au token stocke dans la session.

## SameSite Cookies

Les cookies SameSite limitent l'envoi des cookies cross-origin:

Set-Cookie: session=xyz; SameSite=Strict

- **Strict** : Le cookie nest jamais envoye cross-origin
- **Lax** : Le cookie nest envoye que pour navigation de premier niveau
- **None** : Le cookie est toujours envoye (requiert HTTPS)

## Bonnes pratiques

1. Utiliser des tokens CSRF sur toutes les actions sensibles
2. Implementer SameSite cookies
3. Verifier le referer header
4. Re-authentification pour les actions critiques
5. Eviter les actions sensibles via GET

Source : [OWASP CSRF](https://owasp.org/www-community/attacks/csrf/)`},
        {
          id: 'sec-4',
          question: 'CORS',
          answer: "**Cross-Origin Resource Sharing** : mécanisme de sécurité navigateur contrôlant les accès inter-domaines. La **Same-Origin Policy** bloque par défaut les requêtes vers un domaine différent.\n\nCORS permet à l'API de déclarer les domaines autorisés via le header `Access-Control-Allow-Origin`, après une requête de preflight (`OPTIONS`).\n\nConfiguration côté serveur pour autoriser les origines légitimes. __Une mauvaise config (`Access-Control-Allow-Origin: *`) ouvre des failles__. CORS se configure correctement, il ne se désactive pas.",
        
          deepDive: `# CORS

## Quest-ce que cest

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether web pages from one origin (domain, protocol, and port) can request resources from a different origin. Without CORS, browsers block such cross-origin requests by default due to the Same-Origin Policy (SOP).

CORS is not a security vulnerability - it is a deliberate relaxation of SOP to allow legitimate cross-origin resource sharing in controlled ways.

## Syntaxe et exemples

### Server-Side CORS Headers (Express.js)

\`\`\`typescript
import express from 'express';

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ['https://app.example.com', 'https://admin.example.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});
\`\`\`

### Preflight Request Flow

\`\`\`
1. Browser sends OPTIONS preflight request
2. Server responds with allowed origins/methods
3. If origin not allowed, browser blocks the actual request
\`\`\`

## Bonnes pratiques

- **Restrict Allowed Origins**: Never use Access-Control-Allow-Origin: * in production with credentials.
- **Specify Allowed Methods**: Only allow HTTP methods your API actually needs.
- **Use Preflight Caching**: Set Access-Control-Max-Age to reduce preflight overhead.
- **Validate Origin Server-Side**: Check Origin against a whitelist.
- **Do not Rely on CORS for Security**: Non-browser clients can bypass CORS entirely.

## Pieges courants

- **Wildcard with Credentials**: Access-Control-Allow-Origin: * with Allow-Credentials: true is invalid.
- **Trusting Origin Header Without Validation**: Always validate against a whitelist.
- **Exposing Sensitive Data via CORS**: Overly permissive origins can leak data.
- **Not Handling OPTIONS for Preflight**: Causes preflight failures.
- **Allowing All Methods**: Only allow necessary methods.

---
Sources:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html`},
        {
          id: 'sec-5',
          question: 'Sécuriser une API REST',
          answer: "Approche **en profondeur** à plusieurs niveaux : **authentification** (`JWT` signé dans le header `Authorization`, ou `OAuth2`), **autorisation** (vérification des droits par endpoint via rôles/permissions), **validation des entrées** (body, query params, path variables), limitation des méthodes `HTTP` autorisées par ressource, **rate limiting** (protection anti-DDoS et anti-abus), **surveillance** (logs des accès suspects, monitoring, alertes).\n\nChaque couche ajoute un niveau de protection *complémentaire*.",
        
          deepDive: `# Securing REST APIs

## Quest-ce que cest

Securing a REST API involves implementing multiple layers of protection: authentication (who are you?), authorization (what can you do?), transport security (can anyone see your data?), input validation (is the data safe?), and rate limiting (can you be overwhelmed?).

REST APIs are stateless, so authentication must be performed on each request via tokens, API keys, or OAuth2 bearer tokens.

## Syntaxe et exemples

### Authentication Middleware (Express.js)

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { userId: string; roles: string[] };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; roles: string[] };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
\`\`\`

### Authorization (RBAC)

\`\`\`typescript
export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.some(role => req.user!.roles.includes(role))) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}
\`\`\`

## Bonnes pratiques

- **Use HTTPS**: Always use TLS 1.2+.
- **Authenticate Every Request**: REST is stateless.
- **Validate and Sanitize All Input**: Use schema validation (Zod, Joi).
- **Implement Rate Limiting**: Protect against brute-force attacks.
- **Use Minimal Error Messages**: Do not expose internal details.

\`\`\`json
// Bad
{ "error": "Database connection failed: mysql error 1045" }
// Good
{ "error": "Invalid credentials" }
\`\`\`

## Pieges courants

- **Not Validating Input**: Leads to SQL injection, XSS, command injection.
- **Returning Too Much Information in Errors**: Helps attackers.
- **Using GET for Sensitive Operations**: GET is logged.
- **Not Implementing Rate Limiting**: Vulnerable to DoS attacks.
- **Trusting Client-Side Controls Alone**: Always validate server-side.

---
Sources:
- https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
- https://www.rfc-editor.org/rfc/rfc9110`},
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
        
          deepDive: `# JWT in Detail

## Quest-ce que cest

JWT (JSON Web Token) is an open standard (RFC 7519) for transmitting claims between parties as JSON objects. JWTs are compact, URL-safe, and can be signed using a secret (HMAC) or public/private key pair (RSA/ECDSA). A JWT consists of three parts: Header, Payload, and Signature.

JWTs are stateless - the server validates the signature without needing to store session state. However, compromised tokens remain valid until expiration.

## Syntaxe et exemples

### JWT Structure

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.    <- Header (Base64URL)
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.    <- Payload
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c    <- Signature
\`\`\`

### Creating and Verifying JWTs

\`\`\`typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function createAccessToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
    issuer: 'my-api',
    audience: 'my-app',
  });
}

function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'my-api',
      audience: 'my-app',
    });
  } catch {
    return null;
  }
}
\`\`\`

### Angular Service

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getSecureData(): Observable<any> {
    return this.http.get('/api/protected', {
      headers: { Authorization: \`Bearer \${this.getToken()}\` }
    });
  }
}
\`\`\`

## Bonnes pratiques

- **Sign with Strong Algorithms**: Use RS256 or ES256, not weak HS256 secrets.
- **Include Expiration**: Always set exp claim.
- **Implement Token Revocation**: Have a blacklist or use short expiration.
- **Do not Store Sensitive Data in JWT**: Payload is Base64-encoded, not encrypted.
- **Validate All Claims**: Always check iss, aud, exp.
- **Use Refresh Token Rotation**: Detect token theft.

## Pieges courants

- **Storing JWTs in localStorage**: Vulnerable to XSS. Use httpOnly cookies.

\`\`\`typescript
// Bad - vulnerable to XSS
localStorage.setItem('token', jwt);

// Good - httpOnly cookie
res.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'strict' });
\`\`\`

- **Long-Lived Tokens**: Large exp windows mean compromised tokens remain valid longer.
- **Using HS256 with Weak Secrets**: If secret is compromised, all tokens are compromised.
- **Not Validating Issuer/Audience**: Forged tokens with correct signature.

---
Sources:
- https://auth0.com/docs/security/tokens/json-web-tokens
- https://www.rfc-editor.org/rfc/rfc7519
- https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html`},
        {
          id: 'sec-7',
          question: 'OAuth2',
          answer: "Protocole d'**autorisation déléguée** : l'utilisateur autorise une app à accéder à ses données sur une autre app **sans partager son mot de passe**.\n\nFlux courants : **Authorization Code** (apps serveur — le plus sécurisé), **Authorization Code + PKCE** (apps mobiles/SPA), **Client Credentials** (service-to-service, pas d'utilisateur).\n\nL'app obtient un **access token** (courte durée) et un **refresh token** (longue durée). __OAuth2 gère l'autorisation, pas l'authentification — OpenID Connect ajoute la couche d'identité.__",
        
          deepDive: `# OAuth2

## Quest-ce que cest

OAuth 2.0 is an authorization framework (RFC 6749) that enables applications to obtain limited access to user accounts on third-party services. It delegates user authentication to the service that hosts the user account.

OAuth 2.0 is NOT an authentication protocol by itself - it is an authorization framework. When used for authentication (as with OIDC), it is combined with additional layers.

## Syntaxe et exemples

### Authorization Code Flow

\`\`\`typescript
// 1. Redirect user to authorization endpoint
function redirectToAuthorization(): void {
  const state = generateRandomState();
  const authUrl = \`https://auth.example.com/oauth/authorize?response_type=code&client_id=\${CLIENT_ID}&redirect_uri=\${encodeURIComponent(REDIRECT_URI)}&scope=read:user&state=\${state}\`;
  window.location.href = authUrl;
}

// 2. Exchange code for tokens
async function handleCallback(code: string, state: string): Promise<TokenResponse> {
  const storedState = sessionStorage.getItem('oauth_state');
  if (state !== storedState) {
    throw new Error('State mismatch - potential CSRF');
  }

  const response = await fetch('https://auth.example.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  return response.json();
}
\`\`\`

### Angular OAuth2 Service

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class OAuth2Service {
  login(): void {
    const state = this.generateState();
    sessionStorage.setItem('oauth_state', state);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.CLIENT_ID,
      redirect_uri: \`\${window.location.origin}/callback\`,
      scope: 'read:user email:user',
      state,
    });
    window.location.href = \`https://auth.example.com/oauth/authorize?\${params}\`;
  }
}
\`\`\`

## Bonnes pratiques

- **Use Authorization Code Flow with PKCE**: For SPAs and mobile apps, always use PKCE.
- **Store Tokens Securely**: Use httpOnly cookies, never localStorage.
- **Use Short-Lived Access Tokens**: With refresh token rotation.
- **Validate State Parameter**: Use cryptographically random state for CSRF protection.
- **Scope Minimization**: Request only the scopes you actually need.
- **Implement Token Rotation**: Rotate refresh tokens to detect theft.

## Pieges courants

- **Using Implicit Flow**: Returns tokens in URL - expose in browser history. Use Authorization Code + PKCE.
- **Storing Tokens in localStorage**: Vulnerable to XSS.
- **Not Validating State**: Vulnerable to CSRF attacks.
- **Leaking Tokens in URLs**: Tokens in URLs can be leaked via referrer headers.
- **Not Implementing PKCE for Public Clients**: Must use PKCE to protect authorization codes.
- **Trusting Tokens Without Validation**: Always validate signature, expiration, issuer, audience.

---
Sources:
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow
- https://www.rfc-editor.org/rfc/rfc6749
- https://oauth.net/2/`},
        {
          id: 'sec-10',
          question: 'Hash des mots de passe',
          answer: "Ne **jamais** stocker les mots de passe en clair. Utiliser un **hash** à sens unique avec un **salt** (chaîne aléatoire unique par mot de passe) pour empêcher les attaques par rainbow tables.\n\nAlgorithmes recommandés : **`bcrypt`** (adaptatif, le plus courant), **`Argon2`** (gagnant de la compétition de hashing), **`scrypt`**. À éviter : `MD5`, `SHA-1`, `SHA-256` simple (trop rapides, vulnérables au brute force).\n\n__Règle : le hash doit être lent__ (coût de calcul élevé) pour ralentir les attaques. `bcrypt` avec un cost factor de 10-12 est un bon compromis.",
        
          deepDive: `# Password Hashing

## Quest-ce que cest

Password hashing is the process of converting plaintext passwords into fixed-length cryptographic hashes using one-way functions. Unlike encryption, hashing cannot be reversed - there is no way to obtain the original password from its hash. This provides a critical security layer: even if an attacker gains access to the database, they cannot read the actual passwords.

Modern password hashing algorithms are deliberately slow and memory-intensive (via work factors or cost factors) to make brute-force attacks impractical even with specialized hardware.

## Syntaxe et exemples

### BCrypt Implementation

\`\`\`typescript
import bcrypt from 'bcrypt';

// Hashing a password
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verifying a password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Usage
const hashedPassword = await hashPassword('SecureP@ssw0rd!');
const isValid = await verifyPassword('SecureP@ssw0rd!', hashedPassword);
\`\`\`

### Argon2 Implementation

\`\`\`typescript
import argon2 from 'argon2';

async function hashPasswordArgon2(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
}

async function verifyPasswordArgon2(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
\`\`\`

## Bonnes pratiques

- **Use Adaptive Hashing Algorithms**: Use bcrypt, scrypt, or argon2 - NOT MD5, SHA-1, or SHA-256 alone.
- **Set Adequate Work Factor**: For bcrypt, use cost factor of at least 10. Target at least 100ms hashing time.
- **Never Log Plaintext Passwords**: Ensure passwords never appear in logs or error messages.
- **Enforce Password Strength**: Reject passwords that are too short or common.
- **Consider Passkeys**: For new systems, consider supporting FIDO2/WebAuthn passkeys.

## Pieges courants

- **Using Fast Hash Algorithms**: MD5, SHA-1, SHA-256 are too fast for password hashing. Use bcrypt or argon2.

- **Insufficient Work Factor**: Too low cost factor exposes passwords to faster brute-force attacks.

- **Timing Attacks**: Use constant-time comparison functions for hash comparison.

\`\`\`typescript
// BAD - vulnerable to timing attacks
if (hash1 === hash2) { ... }

// GOOD - constant time comparison
import timingSafeEqual from 'crypto';
\`\`\`

- **Storing Passwords in Plaintext**: Never store passwords without hashing.

---
Sources:
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- https://www.rfc-editor.org/rfc/rfc9106#name-argon2-algorithm`},
        {
          id: 'sec-11',
          question: 'HTTPS / TLS',
          answer: "**HTTPS** = HTTP + **TLS** (Transport Layer Security). Chiffre les communications entre client et serveur, garantissant **confidentialité**, **intégrité** et **authenticité** du serveur.\n\nLe serveur présente un **certificat** (validé par une CA), le client et le serveur négocient une clé de session symétrique via échange asymétrique. Tout le trafic est chiffré ensuite.\n\n__En 2024, HTTPS est obligatoire__ — jamais de HTTP en production. Les certificats sont gratuits via **Let's Encrypt**. HTTP/2 et HTTP/3 exigent HTTPS.",
        
          deepDive: `# HTTPS / TLS

## Quest-ce que cest

HTTPS (Hypertext Transfer Protocol Secure) is HTTP encrypted with TLS (Transport Layer Security). TLS provides three critical security properties: confidentiality (no one can read the data in transit), integrity (no one can modify the data in transit), and authentication (the client can verify the server identity).

TLS replaced SSL after numerous vulnerabilities were discovered. The current standard is TLS 1.2 and TLS 1.3, with 1.3 offering improved performance through simplified handshakes and zero-round-trip time (0-RTT) resumption.

## Syntaxe et exemples

### TLS Configuration (Node.js)

\`\`\`typescript
import https from 'https';
import fs from 'fs';

const options: https.ServerOptions = {
  key: fs.readFileSync('/path/to/private-key.pem'),
  cert: fs.readFileSync('/path/to/certificate.pem'),
  minVersion: 'TLSv1.3',
  ecdhCurve: 'X25519',
  allowHalfOpen: false,
  honorCipherOrder: true,
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Secure response');
});
\`\`\`

### HSTS Header

\`\`\`http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`

## Bonnes pratiques

- **Use TLS 1.3**: Offers significant security and performance improvements.
- **Enable HSTS**: Force browsers to only connect via HTTPS.
- **Use Strong Cipher Suites**: Configure for Perfect Forward Secrecy (PFS).
- **Regular Certificate Renewal**: Set up automated renewal with Let's Encrypt.
- **OCSP Stapling**: Reduce client connection time.

## Pieges courants

- **Accepting Self-Signed Certificates in Production**: Provides encryption but NOT authentication.
- **Weak Cipher Suites**: RC4, 3DES, TLS 1.0/1.1 have known vulnerabilities.
- **Not Enforcing HTTPS**: Without HSTS, attackers can intercept via HTTP redirects.
- **Ignoring Certificate Expiration**: Expired certificates break trust.
- **Mixing HTTP and HTTPS Content**: Mixed content creates security vulnerabilities.

---
Sources:
- https://www.cloudflare.com/learning/ssl/what-is-https/
- https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html`},
      ],
    },
  ],
};