import type { InterviewCategory } from '../../../../core/models/interview.models';

export const architectureCategory: InterviewCategory = {
  id: 'architecture',
  title: 'Architecture Logicielle',
  color: 'background: #DB2777; color: white',
  description: 'Patterns architecturaux, SOLID, DDD',
  sections: [
    {
      id: 'arch-patterns',
      title: 'Patterns Architecturaux',
      questions: [
        {
          id: 'arch-1',
          question: 'MVC',
          answer: "**Model-View-Controller** : pattern séparant l'application en trois couches. **Model** (métier + données, aucune connaissance de l'UI), **View** (présentation, aucune logique métier), **Controller** (reçoit les actions utilisateur, appelle le Model, choisit la View).\n\n**Séparation des préoccupations** : chaque couche évolue indépendamment — on peut passer d'une interface web à une API REST sans toucher au Model. Implémentation connue : `Spring MVC` (Java), `Angular` (frontend).",
        
          deepDive: `# MVC - Model View Controller

## Quest-ce que cest

MVC est un pattern architectural cree dans les annees 1970 pour Smalltalk qui separe une application en trois composants distincts :

- Model - Gere les donnees et la logique metier
- View - Responsable du rendu de l interface utilisateur
- Controller - Fait le lien entre utilisateur et systeme, traite les entrees

L objectif est de separer les responsabilites pour faciliter la maintenance, les tests et le travail en equipe.

## Syntaxe et exemples

Flux dans MVC :

Utilisateur clique sur un lien
Controller recoit la requete HTTP
Controller appelle le Model pour recuperer ou modifier des donnees
Model interagit avec la base de donnees
Controller transmet les donnees a la View
View rend la reponse HTML
Reponse envoyee au navigateur

Exemple concret (Node.js/Express) :

Model :
\`\`\`typescript
class User {
  async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}
\`\`\`

Controller :
\`\`\`typescript
class UserController {
  async show(req, res) {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  }
}
\`\`\`

View :
\`\`\`typescript
res.render('user-profile', { user: user });
\`\`\`

## Bonnes pratiques

1. Controllers fins - Deleguer la logique metier aux models ou services
2. Models rich - Encapsuler l acces aux donnees et la logique associee
3. Views dumb - Les views ne font que presenter, pas de logique metier
4. Utiliser des services - Pour la logique qui ne appartient ni a un model ni a un controller
5. Appliquer le principe SOLID - Notamment SRP et DIP

## Pieges courants

- Mettre toute la logique dans les controllers (Fat Controllers)
- Coupler les models a la base de donnees (utiliser des repositories)
- Faire des views qui interrogent directement les models
- Negliger les tests car le code est trop couple

Source : Atlassian - MVC (https://www.atlassian.com/agile/architecture)
`},
        {
          id: 'arch-2',
          question: 'Clean Architecture',
          answer: "Approche (Uncle Bob) plaçant le **code métier au centre**, les détails techniques en périphérie. **Règle de dépendance** : tout pointe vers l'intérieur.\n\nCouches du centre vers l'extérieur : **Entities** (règles business pures), **Use Cases** (logique applicative), **Interface Adapters** (contrôleurs, gateways), **Frameworks & Drivers** (BDD, framework web, UI).\n\nLe code métier ignore totalement l'infrastructure — testable unitairement sans BDD ni framework. Plus verbeux, mais *investissement rentable en maintenabilité* pour les projets durables.",
        
          deepDive: `# Clean Architecture

## Quest-ce que cest

Clean Architecture est un pattern propose par Robert C. Martin (Uncle Bob) qui organise le code en couches concentriques avec des regles de dependance strictes. L idee centrale est que le code des niveaux interieurs ne doit jamais dependre du code des niveaux exterieurs.

Les couches (de l interieur vers l exterieur) :

1. Entities - Objets metier avec la logique applicative fondamentale
2. Use Cases - Logique applicative, orchestrant le flux de donnees
3. Interface Adapters - Controllers, Gateways, Presenters
4. Frameworks and Drivers - Bases de donnees, frameworks web, UI

## Syntaxe et exemples

Structure de dossiers :

src/
  entities/
    User.ts
    Order.ts
  use_cases/
    CreateUser.ts
    GetUserOrders.ts
  interfaces/
    UserRepository.ts
    EmailService.ts
  adapters/
    controllers/
      UserController.ts
    repositories/
      PostgresUserRepo.ts
  frameworks/
    express/
      routes.ts

Exemple de Use Case :

\`\`\`typescript
export class CreateUser {
  constructor(
    private userRepo: UserRepository,
    private emailSvc: EmailService
  ) {}

  async execute(input) {
    if (!input.email.includes('@')) {
      return Result.fail('Invalid email');
    }
    const user = new User(input.name, input.email);
    await this.userRepo.save(user);
    await this.emailSvc.sendWelcome(user.email);
    return Result.ok({ userId: user.id });
  }
}
\`\`\`

## Bonnes pratiques

1. Les dependances vont vers l interieur - Les use cases ne connaissent pas les adapters
2. Definir des interfaces pour les dependances externes
3. Garder les entities pures - Pas de framework, pas de base de donnees
4. Un use case = une action - Ne pas creer des use cases fourre-tout
5. Tester d abord les use cases - Ils contiennent la logique principale

## Pieges courants

- Melanger les couches (mettre de la logique dans les controllers)
- Violer la regle de dependance (adapter dependant dun use case)
- Creer des use cases qui dependent dautres use cases
- Negliger la couche entities et mettre toute la logique dans les use cases
- Over-engineering pour des projets simples

Source : Clean Code Developer (https://cleancoder.com)
`},
        {
          id: 'arch-3',
          question: 'Architecture hexagonale',
          answer: "Aussi appelée **Ports & Adapters** : le domaine métier est au centre, les adaptations techniques en périphérie. Les **ports** (interfaces) définissent les contrats d'entrée/sortie, les **adapters** implémentent ces ports pour les technologies spécifiques.\n\nLe domaine ne dépend de rien — les adapters dépendent du domaine. On peut changer de BDD, de framework web, de broker de messages sans toucher au métier.\n\nSimilaire à Clean Architecture mais avec un focus sur la **testabilité** : les adapters de test remplacent l'infrastructure réelle. __Idéal pour les applications métier complexes.__",
        
          deepDive: `# Architecture hexagonale

## Quest-ce que c'est ?

L'architecture hexagonale (aussi appelee Ports and Adapters) a ete proposee par Alistair Cockburn en 2005. Son objectif est de decoupler completement la logique metier du monde exterieur (bases de donnees, APIs, interfaces utilisateur).

Le centre du systeme est le domaine applicatif. Tout le reste (UI, DB, APIs externes) est considere comme peripherique et communique via des ports (interfaces).

\`\`\`
         UI                          API Externe
          |                               |
    [Primary Adapter]              [Primary Adapter]
          |                               |
    ============== PORTS PRIMAIRES ==============
          |                               |
    +-----+------------------------------+-----+
    |              APPLICATION                  |
    |         (Use Cases / Services)           |
    +-----+------------------------------+-----+
          |                               |
    ============== PORTS SECONDAIRES ==========
          |                               |
    [Secondary Adapter]              [Secondary Adapter]
          |                               |
        Database                    External Service
\`\`\`

## Syntaxe et exemples

### Le Domaine (noyau)

\`\`\`typescript
// domain/Order.ts - Pas de dependances externes
export class Order {
  constructor(
    private readonly id: string,
    private items: OrderItem[],
    private status: OrderStatus
  ) {}

  get total(): Money { ... }

  addItem(product: Product, quantity: number): void { ... }

  canShip(): boolean { ... }

  ship(): void { ... }
}
\`\`\`

### Ports (interfaces)

\`\`\`typescript
// ports/OrderRepository.ts - Port primaire
export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByCustomer(customerId: string): Promise<Order[]>;
}

// ports/PaymentGateway.ts - Port secondaire
export interface PaymentGateway {
  processPayment(order: Order, payment: Payment): Promise<PaymentResult>;
}
\`\`\`

### Adapters

\`\`\`typescript
// adapters/persistence/PostgresOrderRepository.ts
export class PostgresOrderRepository implements OrderRepository {
  constructor(private db: Database) {}

  async save(order: Order): Promise<void> {
    // Conversion domain -> table
    // INSERT INTO orders ...
  }
}

// adapters/external/StripePaymentGateway.ts
export class StripePaymentGateway implements PaymentGateway {
  async processPayment(order: Order, payment: Payment): Promise<PaymentResult> {
    // Appel a l'API Stripe
  }
}
\`\`\`

## Bonnes pratiques

1. **Le domaine na aucune dependance** - Pas d'import de framework ou de bibliothèque
2. **Les ports sont definis par le domaine** - Ce nest pas les adapters qui definissent les interfaces
3. **Une seule responsabilite par adapter** - Ne pas melanger plusieurs technologies dans un meme adapter
4. **Utiliser linjection de dependance** - Pour injectable les bonnes implementations
5. **Tester le domaine en isolation** - Sans base de donnees ni API

## Pieges courants

- Melanger domaine et infrastructure dans les memes fichiers
- Definir les ports en fonction des adapters disponibles (inverser les responsabilites)
- Ajouter des frameworks dans le domaine (Entity avec annotations JPA/Hibernate)
- Creer des ports trop generiques qui tentent de couvrir tous les cas
- N'egliger les tests car le decouplage nest pas respecte

Source : [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
`},
        {
          id: 'arch-4',
          question: 'Domain-Driven Design (DDD)',
          answer: "Approche où le **domaine métier** guide la conception logicielle. Le code reflète le langage des experts métier (**Ubiquitous Language**).\n\nConcepts clés : **Bounded Context** (frontière où un modèle est valide), **Entity** (identité unique), **Value Object** (immuable, comparé par valeur), **Aggregate** (groupe d'objets traité comme une unité transactionnelle), **Repository** (abstraction de la persistance).\n\nDDD convient aux domaines **complexes** où le cœur du problème est métier, pas technique. __Ne pas appliquer DDD partout — c'est un investissement.__",
        
          deepDive: `# Domain-Driven Design (DDD)

## Quest-ce que cest

DDD est une approche de developpement proposee par Eric Evans dans son livre de 2003 qui se concentre sur la comprehension et la modelisation du domaine metier. L idee est que le code doit reflechir precisement le langage du domaine, pas les contraintes techniques.

Concepts cles :
- Ubiquitous Language - Langage commun entre experts metier et developpeurs
- Bounded Context - Frontiere logique separant differents sous-domaines
- Aggregates - Groupes coherents dobjets manipules comme une seule entite
- Domain Events - Evenements representant des changements dans le domaine

## Syntaxe et exemples

Structure de l entreprise :

+------------------------------------------+
|                                          |
|  +---------------+    +---------------+  |
|  |  E-commerce   |    |    Stock      |  |
|  |  - Produit     |    |  - Entrepot   |  |
|  |  - Commande    |    |  - Inventory  |  |
|  +---------------+    +---------------+  |
|                                          |
|  +---------------+    +---------------+  |
|  |  Livraison    |    |   Finance     |  |
|  |  - Colis       |    |  - Facture    |  |
|  +---------------+    +---------------+  |
+------------------------------------------+

Exemple Aggregate Root :

\`\`\`typescript
class Commande implements Entity {
  constructor(
    private id: CommandeId,
    private client: ClientRef,
    private lines: LineItem[],
    private status: CommandStatus
  ) {}

  addLine(product: Product, qty: number): void {
    if (this.status !== DRAFT) {
      throw new DomainError('Cannot modify confirmed order');
    }
    this.lines.push(new LineItem(product.id, product.price, qty));
  }

  confirm(): void {
    if (this.lines.length === 0) {
      throw new DomainError('Empty order cannot be confirmed');
    }
    this.status = CONFIRMED;
  }
}
\`\`\`

## Bonnes pratiques

1. Etablir un Ubiquitous Language - Sessurer que tous utilisent les memes termes
2. Iterer sur le modele - DDD est un processus iteratif de decouverte
3. Respecter les Bounded Contexts - Ne pas essayer de tout unifier
4. L aggregate comme transaction - Une seule operation par aggregate
5. Les services de domaine - Pour les operations qui nappartiennent a aucune entite

## Pieges courants

- Mapper 1:1 entre entities et tables (anemic domain model)
- Negliger les domain events et coupler les services par des references directes
- Creer des microservices DDD sans avoir dabord fait du monolithique
- Vouloir modeliser le domaine complet des le debut
- Oublier que DDD est un outil, pas un but en soi

Source : Domain-Driven Design by Eric Evans (https://www.domainlanguage.com/)
`},
      ],
    },
    {
      id: 'arch-principes',
      title: 'Principes de Conception',
      questions: [
        {
          id: 'arch-5',
          question: 'SOLID',
          answer: "Cinq principes de conception POO : **Single Responsibility** (une classe = une raison de changer), **Open/Closed** (extension sans modification, via polymorphisme et interfaces), **Liskov Substitution** (une sous-classe remplaçable par sa super-classe sans casser le programme), **Interface Segregation** (plusieurs petites interfaces spécialisées plutôt qu'une grosse), **Dependency Inversion** (dépendre des abstractions, pas des implémentations — base de l'**injection de dépendances**).",
        
          deepDive: `# SOLID - Principes de Conception OO

## Quest-ce que cest

SOLID est un acronyme pour cinq principes de conception oriente objet. Ces principes aident a creer du code plus maintenable, evolutif et flexible. Pop ularises par Robert C. Martin (Uncle Bob).

Les 5 principes

S - Single Responsibility Principle (SRP)

Une classe ne doit avoir quune seule raison de changer. Chaque classe a une responsabilite unique et concentree.

Mauvais - plusieurs responsabilites melangees:

\`\`\`typescript
class User {
  constructor(name, email) { this.name = name; this.email = email; }
  save() { /* logique de persistence */ }
  sendEmail() { /* logique denvoi email */ }
  generateReport() { /* logique de generation rapport */ }
}
\`\`\`

Bon - responsabilite unique:

\`\`\`typescript
class User { constructor(name, email) { this.name = name; this.email = email; } }
class UserRepository { save(user) { /* persistence */ } }
class EmailService { sendEmail(to, subject, body) { /* envoi */ } }
class ReportGenerator { generate(user) { /* rapport */ } }
\`\`\`

O - Open/Closed Principle (OCP)

Les classes doivent etre ouvertes a lextension mais fermees a la modification. On doit pouvoir ajouter de nouveaux comportements sans modifier le code existant.

Mauvais - modification pour chaque nouveau type:

\`\`\`typescript
function calculateArea(shape) {
  if (shape.type === 'circle') return Math.PI * shape.radius * shape.radius;
  if (shape.type === 'square') return shape.side * shape.side;
}
\`\`\`

Bon - herit et polymorphisme:

\`\`\`typescript
class Shape { getArea() { throw new Error('Not implemented'); } }
class Circle extends Shape { getArea() { return Math.PI * this.radius * this.radius; } }
class Square extends Shape { getArea() { return this.side * this.side; } }
// ajouter Triangle sans modifier Circle ni Square
\`\`\`

L - Liskov Substitution Principle (LSP)

Les objets dune classe derivee doivent pouvoir remplacer des objets de la classe de base sans que le comportement ne change. Untertype ne doit pas renforcement les preconditions ni affaiblir les postconditions.

Mauvais - violation de LSP:

\`\`\`typescript
class Bird { fly() { return 'Flying'; } }
class Penguin extends Bird { fly() { throw new Error('Cannot fly'); } }
\`\`\`

Bon - conception avec heritage approprie:

\`\`\`typescript
class Bird { }
class FlyingBird extends Bird { fly() { return 'Flying'; } }
class Penguin extends Bird { swim() { return 'Swimming'; } }
\`\`\`

I - Interface Segregation Principle (ISP)

Preferer plusieurs interfaces specialisees et targetes a une interface unique et generique.

Mauvais - interface trop large:

\`\`\`typescript
class Machine {
  print() {}
  fax() {}
  scan() {}
}
\`\`\`

Bon - interfaces separees:

\`\`\`typescript
class Printer { print() {} }
class FaxMachine { fax() {} }
class Scanner { scan() {} }
\`\`\`

D - Dependency Inversion Principle (DIP)

Les modules de haut niveau ne doivent pas dependre des modules de bas niveau. Les deux doivent dependre dabstractions.

Mauvais - dependance directe:

\`\`\`typescript
class MySQLConnection { query(sql) {} }
class UserService { constructor() { this.connection = new MySQLConnection(); } }
\`\`\`

Bon - dependance vers abstraction:

\`\`\`typescript
class DatabaseConnection { query(sql) {} }
class MySQLConnection extends DatabaseConnection {}
class PostgreSQLConnection extends DatabaseConnection {}
class UserService { constructor(connection) { this.connection = connection; } }
\`\`\`

## Bonnes pratiques

- Appliquer SOLID des le debut du projet autant que possible
- Etre pret a refactorer quand on identifie des violations
- Combiner SOLID avec dautres pratiques comme TDD et refactoring continu
- Ne pas sur-engineerer - appliquer les principes avec pragmatisme
- Utiliser linjection de dependances pour faciliter DIP

## Pieges courants

- Over-engineering - creer trop dabstractions prematur ement
- Violer les principes pour des raisons de performance percue
- Negliger le refactoring - laisser du code qui fonctionne mais nest pas propre
- Appliquer les principes de maniere dogmatique sans tenir compte du contexte
- Utiliser des interfaces quand une classe simple suffit
- Creer des hierarchies de classes trop profondes

Source : SOLID Principles (https://en.wikipedia.org/wiki/SOLID)
`},
        {
          id: 'arch-6',
          question: 'YAGNI et Law of Demeter',
          answer: "**YAGNI** (*You Aren't Gonna Need It*) : ne pas implémenter une fonctionnalité tant qu'elle n'est pas **nécessaire**. L'abstraction prématurée et le code « au cas où » sont des sources de complexité inutile.\n\n**Law of Demeter** (principe de moindre connaissance) : un objet ne devrait communiquer qu'avec ses **voisins directs**, pas avec les objets lointains (`a.getB().getC().faire()` = violation). Préféérer `a.faireAvecC()` qui délègue en interne.\n\n__YAGNI évite le sur-engineenieur, Demeter réduit le couplage.__",
        
          deepDive: `# YAGNI et Law of Demeter

## Quest-ce que cest

YAGNI (You Arent Gonna Need It) et la Law of Demeter (LoD) sont deux principes de conception logiciel qui visent a reduire le couplage entre composants et a maintenir le code simple et maintenable.

YAGNI - You Arent Gonna Need It

Ne pas ajouter de fonctionnalite tant quelle nest pas vraiment necessaire. Resister a la tentation de coder pour le futur en anticipation de besoins qui ne vont peut-etre jamais arriver.

## Syntaxe et exemples

Mauvais - code YAGNI:

\`\`\`typescript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  generateAvatar() { return 'avatar_' + this.id + '.png'; }
  permissions = [];
  subscribeToNewsletter() { /* ... */ }
}
\`\`\`

Bon - juste ce qui est necessaire maintenant:

\`\`\`typescript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
\`\`\`

Consequences negatives de violer YAGNI

- Code plus complexe et difficile a maintenir
- Temps perdu a ecrire du code inutile
- Dette technique accumulee
- API sur-chargee par des methodes qui ne servent a rien
- Tests supplementaires pour du code non necessaire

Law of Demeter (LoD)

Chaque objet ne doit parler qua ses amis immediats. On ne doit pas parler aux amis des amis. Cela reduit le couplage et ameliore la maintenabilite.

Mauvais - violation de la LoD:

\`\`\`typescript
customer.getOrder().getProduct().getCategory().getName();
var street = user.getAddress().getStreet();
\`\`\`

Bon - delegation appropriee:

\`\`\`typescript
var productName = order.getProductName();
var street = user.getStreet();
\`\`\`

Demonstration du probleme

\`\`\`typescript
class Order { getProduct() { return this.product; } }
class Product { getCategory() { return this.category; } }
class Category { getName() { return 'Electronics'; } }
\`\`\`

Alors ecrire: user.getOrder().getProduct().getCategory().getName() est une violation de la LoD.

Solution - Tell, dont ask:

\`\`\`typescript
class Order { getProductName() { return this.product.getName(); } }
class Product { getName() { return this.category.getName(); } }
\`\`\`

Regle Mnemotechnique (pour LoD)

Un objet peut appeler les methodes de:
- Lui-meme
- Ses attributs directs (ses "amis")
- Les objets quil a lui-meme crees
- Les objets passes en parametre

Mais pas les objets retournes par dautres objets (les "amis des amis").

## Bonnes pratiques

YAGNI:
- Attendre davoir besoin reel avant de coder une fonctionnalite
- Resister a la tentation du "au cas ou"
- Pratique TDD: ecrire le test avant le code, ce qui force a ne coder que le necessaire
- Refactorer regali ement pour ameliorer le code existant

LoD:
- Utiliser des methodes de delegation au lieu de chainer les appels
- Favoriser la composition sur heritage
- Reduire le nombre de dependances directes dun objet
- Eviter les chaines dappels longues (max 1-2 niveaux)
- Utiliser le pattern Facade pour simplifier les APIs complexes

## Pieges courants

- Over-engineering "pour etre pret dans le futur"
- Creer des frameworks internes complexes "au cas ou"
- Exposer les details dimplementation dans lAPI publique
- Objets qui connaissent trop detat les autres objets
- Chaines dappels longues et fragiles
- Violer YAGNI en pensant faire gagner du temps
- Negliger la LoD par facilit e (ecrire juste un get().get().get())

Source : YAGNI (https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
`},
        {
          id: 'arch-7',
          question: 'CAP Theorem',
          answer: "En distribué, on ne peut garantir simultanément que **deux** des trois propriétés : **Consistency** (tous les nœuds voient la même donnée), **Availability** (chaque requête reçoit une réponse), **Partition tolerance** (le système continue malgré les pannes réseau).\n\nEn pratique, les partitions réseau sont inévitables → on choisit entre **CP** (cohérence, ex. `MongoDB` en mode primaire) et **AP** (disponibilité, ex. `Cassandra`).\n\nLes systèmes **SQL** traditionnels privilégient la cohérence (CP). Les **NoSQL** privilégient souvent la disponibilité (AP) avec **cohérence éventuelle**.",
        
          deepDive: `# Le theoreme CAP

## Quest-ce que c'est ?

Le theoreme CAP, formule par Eric Brewer en 2000, decrit les contraintes fondamentales des systemes Distribues. Il etablit quun systeme Distribue ne peut simultanement garantir que deux sur trois proprietes :

- **Consistency (C)** - Chaque lecture recoit la donnee la plus recente ou une erreur
- **Availability (A)** - Chaque requete recoit une reponse (mais pas forcement la plus recente)
- **Partition Tolerance (P)** - Le systeme continue de fonctionner despite des problemes de reseau

## Syntaxe et exemples

Dans la pratique, les partitions reseau etant inevitables, on doit choisir entre CP et AP :

### Systemes CP (Consistency + Partition Tolerance)
- **MongoDB** (en mode majority read concern)
- **HBase**
- **Redis**
- **Zookeeper**

Exemple: Si deux noeuds sont isoles, le systeme CP refusera de repondre sur le noeud indisponible jusqua resolution de la partition.

### Systemes AP (Availability + Partition Tolerance)
- **Cassandra**
- **DynamoDB**
- **CouchDB**
- **Riak**

Exemple: En cas de partition, Cassandra continue de lire sur tous les noeuds mais les donnees peuvent etre incoherent entre noeuds jusqua reconciliation.

## Bonnes pratiques

1. **Analyser vos besoins reelles** - 99% des cas nen font pas une question de vie ou de mort
2. **Comprendre le mode de chaque base** - Beaucoup proposent de choisir le niveau de coherence
3. **Utiliser des lectures avec quorum** - Configurable selon le compromis accepte
4. **Planifier la reconciliation** - Prevoir comment fusionner les version divergentes
5. ** Tester en conditions reelles** - Les理论知识 sont importantes mais la pratique decide

## Pieges courants

- Croire quil faut toujours choisir CA (impossible en pratique avec des reseaux Distribues)
- Choisir AP par defaut sans comprendre le risque de incoherence
- Ignorer le cout des operations de reparation (hinted handoff, anti-entropy)
- Ne pas prevoir les conflits de ecritures concurrentes

Source : [Cloudflare - CAP Theorem](https://www.cloudflare.com/learning/distributed-systems/what-is-cap-theorem/)
`},
      ],
    },
  ],
};