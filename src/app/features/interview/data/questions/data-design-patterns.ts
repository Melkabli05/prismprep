import type { InterviewCategory } from '../../../../core/models/interview.models';

export const designPatternsCategory: InterviewCategory = {
  id: 'patterns',
  title: 'Design Patterns',
  color: 'background: var(--color-success); color: white',
  description: 'Patterns de création, structure, comportement',
  sections: [
    {
      id: 'dp-creation',
      title: 'Patterns de Création',
      questions: [
        {
          id: 'dp-1',
          question: 'Singleton',
          answer: "Pattern garantissant une **seule instance** d'une classe avec un point d'accès global. Constructeur privé + méthode statique créant l'instance au premier appel.\n\nCas d'usage : connexionion BDD, logger, config globale.\n\nCritiques : état global *difficile à tester* (hard to mock), viole la responsabilité unique, concurrence à gérer en multi-thread. En Java, l'**enum** avec un seul élément est l'implémentation la plus robuste (thread-safe + résiste à la sérialisation). Autres approches thread-safe : **holder statique** (lazy + thread-safe via chargement de classe) ou **synchronisation** (coûteuse).\n\n__Préférer l'injection de dépendances quand c'est possible.__",
          code: 'public class Config {\n    private static Config instance;\n    private Config() {}\n    public static Config get() {\n        if (instance == null) instance = new Config();\n        return instance;\n    }\n}',
          language: 'java',
        
          deepDive: `# Singleton

## Qu'est-ce que c'est ?

Le pattern Singleton garantit qu'une classe n'a qu'une **seule instance** et fournit un point d'acces global a cette instance. C'est l'un des patterns les plus connus mais aussi l'un des plus controversees, car il introduit un etat global dans l'application.

## Probleme resolu

Certaines ressources doivent etre partagees par toute l'application : connexion a une base de donnees, logger, configuration globale, cache. Creer plusieurs instances de ces ressources est inutile (gaspillage memoire) et peut etre dangereux (conflits d'acces).

\`\`\`typescript
// Avant Singleton : instances multiples possibles
class DatabaseConnection {
    constructor(private url: string) {
        // Etablit une nouvelle connexion a chaque fois
    }
}
// Rien n'empeche new DatabaseConnection() plusieurs fois
\`\`\`

## Implementation

### Version simple (non thread-safe)

\`\`\`typescript
class Singleton {
    private static instance: Singleton;
    private constructor() {} // Constructeur prive

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// Utilisation
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true
\`\`\`

### Version thread-safe (Java)

\`\`\`java
public class DatabasePool {
    private static volatile DatabasePool instance;
    private final DataSource dataSource;

    private DatabasePool() {
        this.dataSource = new HikariDataSource();
    }

    public static DatabasePool getInstance() {
        if (instance == null) {
            synchronized (DatabasePool.class) {
                if (instance == null) {
                    instance = new DatabasePool();
                }
            }
        }
        return instance;
    }
}
\`\`\`

### Version enum (Java) -- la plus robuste

\`\`\`java
public enum ConfigSingleton {
    INSTANCE;

    private final Properties config = new Properties();

    public String get(String key) {
        return config.getProperty(key);
    }
}
\`\`\`

## Structure UML

\`\`\`
+-------------------+
|    Singleton      |
+-------------------+
| - instance        |
| - Singleton()     |
+-------------------+
| + getInstance()   |
| + operation()     |
+-------------------+
\`\`\`

## Cas d'utilisation concrets

1. **Pool de connexions** : une seule instance gere toutes les connexions BDD
2. **Logger** : ecriture centralisee dans un seul fichier
3. **Cache applicatif** : cache partage entre tous les composants
4. **Gestionnaire de configuration** : proprietes chargees une seule fois
5. **Service de logging** : thread-safe pour les logs

## Critiques et alternatives

| Probleme | Explication | Alternative |
|----------|-------------|-------------|
| Etat global | Cache des dependances, difficile a raisonner | Injection de dependances |
| Testabilite | Impossible de mocker l'instance | Interface + DI |
| Couplage fort | Appel statique partout | Fournir via le constructeur |
| Concurrence | A gerer en multi-thread | Holder pattern ou enum |
| SRP viole | Gere sa creation + sa logique | Separation des concerns |

**Alternative recommandee** : injection de dependances (Angular \`providedIn: 'root'\`, Spring \`@Service\`). Le framework gere la portee unique sans les inconvenients du Singleton.

\`\`\`typescript
// Angular : meilleur que Singleton
@Injectable({ providedIn: 'root' })
export class LoggerService {
    log(message: string): void { /* ... */ }
}
\`\`\`

## Bonnes pratiques
1. Preferer l'injection de dependances quand c'est possible
2. Implementer une interface pour faciliter les tests
3. Thread-safe avec double-checked locking ou holder pattern
4. Eviter les singletons mutables

## Pieges courants
1. Singletons mutables : l'etat global change de maniere imprevisible
2. Singletons dans les tests unitaires : impossible a isoler
3. Singletons et threads : mauvaise gestion de la concurrence
4. Singletons et serialisation : peut creer une deuxieme instance

Sources : https://refactoring.guru/design-patterns/singleton | https://martinfowler.com/articles/injection.html`},
        {
          id: 'dp-2',
          question: 'Factory Method',
          answer: "Pattern délégant l'**instanciation** à une classe dédiée, au lieu d'utiliser `new` directement. Le code appelant ne connaît que l'**interface**, pas la classe concrète.\n\nVariantes : **Simple Factory** (méthode statique qui choisit l'implémentation), **Factory Method** (sous-classes choisissant l'implémentation), **Abstract Factory** (famille de produits liés).\n\nAvantage : **couplage faible** — changer l'implémentation ne modifie pas le code appelant. Utilisé partout : `LoggerFactory`, `DataSourceFactory`. __Quand vous voyez `new MaClasseConcrète()` partout → pensez Factory.__",
          code: 'public interface Notification { void envoyer(); }\n\npublic class NotificationFactory {\n    public static Notification create(String type) {\n        return switch(type) {\n            case "email" -> new EmailNotif();\n            case "sms" -> new SmsNotif();\n            default -> throw new IllegalArgumentException();\n        };\n    }\n}',
          language: 'java',
        
          deepDive: `# Factory Method

## Qu'est-ce que c'est ?

Le pattern Factory Method definit une interface pour creer un objet, mais laisse les sous-classes decider quelle classe instancier. Il permet de deferer la creation d'objets aux classes filles, suivant le principe **Open/Closed** : ouvert a l'extension, ferme a la modification.

## Probleme resolu

Vous devez creer des objets dont le type exact n'est pas connu a l'avance. Le code client ne doit pas dependre des implementations concretes.

\`\`\`typescript
// MAUVAIS : couplage fort, modification a chaque ajout
function createNotif(type: string) {
    if (type === "email") return new EmailNotif();
    if (type === "sms") return new SmsNotif();
    if (type === "push") return new PushNotif();
    throw new Error("Type inconnu");
}
// A chaque nouveau type, on modifie cette fonction
\`\`\`

## Structure

\`\`\`
+------------+          +-------------------+
|  Creator   |--------->|    Product        |
|------------|          +-------------------+
| factory()  |          | + operation()     |
+------------+          +-------------------+
       |                       A
+------------------+    +------------------+
| ConcreteCreator  |    | ConcreteProduct  |
+------------------+    +------------------+
| factory()        |    | operation()      |
+------------------+    +------------------+
\`\`\`

## Implementation

### Version TypeScript

\`\`\`typescript
interface Button {
    render(): void;
    onClick(f: () => void): void;
}

class WindowsButton implements Button {
    render(): void {
        console.log("Rendering Windows-style button");
    }
    onClick(f: () => void): void {
        window.addEventListener("click", f);
    }
}

class MacButton implements Button {
    render(): void {
        console.log("Rendering Mac-style button");
    }
    onClick(f: () => void): void {
        // Mac-specific event handling
    }
}

abstract class Dialog {
    abstract createButton(): Button;

    render(): void {
        const okButton = this.createButton();
        okButton.onClick(() => this.close());
        okButton.render();
    }
}

class WindowsDialog extends Dialog {
    createButton(): Button {
        return new WindowsButton();
    }
}

class MacDialog extends Dialog {
    createButton(): Button {
        return new MacButton();
    }
}
\`\`\`

### Version Java (Spring)

\`\`\`java
public interface PaymentGateway {
    PaymentResult charge(PaymentRequest request);
}

@Component
public class StripeGateway implements PaymentGateway {
    public PaymentResult charge(PaymentRequest request) {
        // Stripe API
    }
}

@Component
public class PayPalGateway implements PaymentGateway {
    public PaymentResult charge(PaymentRequest request) {
        // PayPal API
    }
}

@Configuration
public class PaymentConfig {
    @Bean
    public PaymentGateway paymentGateway(@Value("\${payment.provider}") String provider) {
        return switch (provider) {
            case "stripe" -> new StripeGateway();
            case "paypal" -> new PayPalGateway();
            default -> throw new IllegalArgumentException();
        };
    }
}
\`\`\`

## Factory Method vs Simple Factory vs Abstract Factory

| Pattern | Description | Usage |
|---------|-------------|-------|
| Simple Factory | Une classe centralise la creation | Switch/if centralise |
| Factory Method | Sous-classes decident le type | Framework, bibliotheque |
| Abstract Factory | Famille de produits lies | UI toolkit, theming |

## Cas d'utilisation

1. **Frameworks UI** : creation de composants selon l'OS
2. **Parsers** : creer le bon parser selon le format (JSON, XML, CSV)
3. **Gateways de paiement** : Stripe, PayPal, carte bleue
4. **Logger** : FileLogger, DatabaseLogger, CloudLogger
5. **Connection BDD** : MySQL, PostgreSQL, Oracle

## Bonnes pratiques
1. Interface product claire et stable
2. Creator abstrait avec hook method
3. Utiliser avec l'injection de dependances

## Pieges courants
1. Trop de factories : complexite inutile
2. Factory statique : difficile a etendre et tester
3. Logique metier dans la factory

Sources : https://refactoring.guru/design-patterns/factory-method`},
        {
          id: 'dp-3',
          question: 'Builder',
          answer: "Pattern séparant la **construction** d'un objet complexe de sa **représentation**. Au lieu d'un constructeur avec 10 paramètres, on chaîne les appels de méthode de façon lisible.\n\nAvantages : **lisible** (on sait ce qu'on construit), **flexible** (paramètres optionnels sans surcharge), **immuable** (l'objet est construit d'un coup).\n\nUtilisé par `StringBuilder`, `Stream.Builder` en Java, et les `Request` dans les APIs HTTP. __Quand un constructeur a plus de 4 paramètres → pensez Builder.__",
          code: 'User user = new User.Builder()\n    .nom("Dupont")\n    .email("dupont@mail.com")\n    .age(30)\n    .role(Role.ADMIN)\n    .build();',
          language: 'java',
        
          deepDive: `# Builder

## Qu'est-ce que c'est ?

Le pattern Builder permet de construire des objets complexes **etape par etape**. Il separe la construction de la representation finale, permettant de creer differentes representations avec le meme processus de construction.

## Probleme resolu

Les constructeurs avec beaucoup de parametres sont illisibles, source d'erreurs et difficiles a maintenir. C'est le probleme du **telescoping constructor** (constructeur a longue vue).

\`\`\`typescript
// MAUVAIS : constructeur avec 8 parametres
class User {
    constructor(
        public name: string,          // obligatoire
        public email: string,         // obligatoire
        public age?: number,          // optionnel
        public address?: string,      // optionnel
        public phone?: string,        // optionnel
        public avatar?: string,       // optionnel
        public newsletter?: boolean,  // optionnel
        public role?: string          // optionnel
    ) {}
}
// new User("John", "john@mail.com", undefined, undefined, undefined, undefined, true, "admin")
\`\`\`

## Implementation

### Version TypeScript

\`\`\`typescript
class User {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly age?: number,
        public readonly address?: string,
        public readonly phone?: string,
        public readonly newsletter?: boolean
    ) {}
}

class UserBuilder {
    private name!: string;
    private email!: string;
    private age?: number;
    private address?: string;
    private phone?: string;
    private newsletter: boolean = false;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setEmail(email: string): this {
        this.email = email;
        return this;
    }

    setAge(age: number): this {
        this.age = age;
        return this;
    }

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    build(): User {
        if (!this.name || !this.email) {
            throw new Error("Name and email are required");
        }
        return new User(
            this.name, this.email,
            this.age, this.address,
            this.phone, this.newsletter
        );
    }
}

// Utilisation
const user = new UserBuilder()
    .setName("John Doe")
    .setEmail("john@example.com")
    .setAge(30)
    .setAddress("123 Main St")
    .build();
\`\`\`

### Version Java (Lombok)

\`\`\`java
@Data
@Builder
public class OrderRequest {
    private String customerId;
    private List<OrderItem> items;
    private String couponCode;
    private String shippingAddress;
    private boolean giftWrap;
    private String giftMessage;

    public static void main(String[] args) {
        OrderRequest request = OrderRequest.builder()
            .customerId("cust-123")
            .item(List.of(new OrderItem("SKU-001", 2)))
            .giftWrap(true)
            .giftMessage("Happy Birthday!")
            .build();
    }
}
\`\`\`

## Variantes

### Builder avec Director

\`\`\`typescript
class ReportDirector {
    constructor(private builder: ReportBuilder) {}

    constructMinimal(): void {
        this.builder.setTitle();
        this.builder.setDate();
    }

    constructFull(): void {
        this.builder.setTitle();
        this.builder.setDate();
        this.builder.setAuthor();
        this.builder.setSummary();
        this.builder.setCharts();
        this.builder.setAppendix();
    }
}
\`\`\`

### Builder fluide en Java

\`\`\`java
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Authorization", "Bearer " + token)
    .timeout(Duration.ofSeconds(10))
    .GET()
    .build();
\`\`\`

## Builder vs Constructeur nomme

| Aspect | Builder | Constructeur |
|--------|---------|-------------|
| Lisibilite | Elevee (noms des methodes) | Faible (ordre des params) |
| Immutabilite | Possible (objet construit) | Possible |
| Complexite | Plus de code | Moins de code |
| Validation | Dans build() | Dans le constructeur |
| Param requis | Non enforce a la compilation | Enforce |

## Cas d'utilisation
1. **Objets avec >4 parametres optionnels** : requetes HTTP, configs, DTOs
2. **Construction multi-etapes** : documents, rapports
3. **Validation complexe** : build() valide l'objet final
4. **Immutabilite** : l'objet construit est immutable

## Bonnes pratiques
1. Methode build() avec validation
2. Retourner \`this\` pour le chainage
3. Builder comme classe interne statique
4. Rendre l'objet construit immutable

## Pieges courants
1. Builder mutable apres construction (l'objet peut etre modifie)
2. Pas de validation dans build()
3. Builder non reutilisable (etat residuel entre builds)

Sources : https://refactoring.guru/design-patterns/builder`},
      ],
    },
    {
      id: 'dp-structure',
      title: 'Patterns Structurels',
      questions: [
        {
          id: 'dp-4',
          question: 'Adapter',
          answer: "Pattern convertissant l'**interface** d'une classe en une autre interface attendue par le client. Permet à des classes incompatibles de travailler ensemble.\n\nAnalogie : un adaptateur de prise électrique qui rend une prise US compatible avec une prise EU.\n\nCas d'usage : intégrer une librairie tierce avec une API différente, migrer progressivement vers une nouvelle interface tout en gardant l'ancienne. En Spring, les **adapters** de l'architecture hexagonale suivent ce pattern. __Quand deux interfaces ne correspondent pas → Adapter.__",
          code: '// Interface attendue\ninterface Target { void request(); }\n\n// Classe existante incompatible\nclass Adaptee { void specificRequest() { ... } }\n\n// Adapter\nclass Adapter implements Target {\n    private Adaptee adaptee;\n    void request() { adaptee.specificRequest(); }\n}',
          language: 'java',
        
          deepDive: `# Adapter

## Qu'est-ce que c'est ?

Le pattern Adapter convertit l'interface d'une classe en une autre interface attendue par le client. Il permet a des classes d'interfaces incompatibles de collaborer. L'analogie classique est l'adaptateur de prise electrique qui rend une prise US compatible avec une prise europeenne.

## Probleme resolu

Vous avez une classe existante avec une interface specifique, mais votre application attend une interface differente. Modifier la classe existante n'est pas possible (code legacy, bibliotheque tierce).

\`\`\`typescript
// Interface attendue par le client
interface MediaPlayer {
    play(audioType: string, fileName: string): void;
}

// Classe existante incompatible
class VlcPlayer {
    playVlc(fileName: string): void {
        console.log("Playing vlc file: " + fileName);
    }
}
// VlcPlayer n'implemente pas MediaPlayer !
\`\`\`

## Structure

\`\`\`
+----------+          +--------------+
|  Client  |--------->|   Target    |
+----------+          |--------------|
                      | + request() |
                      +--------------+
                             A
                      +--------------+
                      |   Adapter   |------>| Adaptee |
                      |--------------|       |----------|
                      | + request()  |       | + specific|
                      +--------------+       +----------+
\`\`\`

## Implementation

### Object Adapter (par composition)

\`\`\`typescript
// Target interface
interface NotificationService {
    send(to: string, message: string): Promise<boolean>;
}

// Adaptee - service existant incompatible
class LegacyEmailService {
    dispatchEmail(recipient: string, content: string, priority: string): boolean {
        console.log(\`Sending email to \${recipient}: \${content} (\${priority})\`);
        return true;
    }
}

// Adapter
class EmailAdapter implements NotificationService {
    constructor(private legacy: LegacyEmailService) {}

    async send(to: string, message: string): Promise<boolean> {
        // Adaptation de l'interface
        return this.legacy.dispatchEmail(to, message, "NORMAL");
    }
}

// Utilisation
const legacy = new LegacyEmailService();
const notifier: NotificationService = new EmailAdapter(legacy);
notifier.send("user@example.com", "Hello!");
\`\`\`

### Class Adapter (par heritage)

\`\`\`java
// Target interface attendue
interface PaymentProcessor {
    boolean pay(double amount);
}

// Adaptee - API existante
class StripeAPI {
    public boolean charge(double amount, String currency) {
        System.out.println("Charging " + currency + " " + amount);
        return true;
    }
}

// Class Adapter
class StripeAdapter extends StripeAPI implements PaymentProcessor {
    @Override
    public boolean pay(double amount) {
        return charge(amount, "EUR");
    }
}
\`\`\`

### Exemple reel : migration d'API

\`\`\`typescript
// Ancienne API (a migrer)
interface OldUserApi {
    getUserById(id: number): OldUserDto;
}

// Nouvelle API (cible)
interface NewUserApi {
    findUser(id: string): Promise<UserDto>;
}

// Adapter pour la transition
class UserApiAdapter implements OldUserApi {
    constructor(private newApi: NewUserApi) {}

    getUserById(id: number): OldUserDto {
        // Appel asynchrone transforme en synchrone
        const promise = this.newApi.findUser(id.toString());
        // Adaptation du DTO
        return {
            id: id,
            fullName: "", // sera hydrate plus tard
            // ...
        };
    }
}
\`\`\`

## Adapter vs Facade vs Proxy

| Aspect | Adapter | Facade | Proxy |
|--------|---------|--------|-------|
| Objectif | Changer d'interface | Simplifier une interface | Controler l'acces |
| Interface | Differente | Simplifiee | Identique |
| Utilisation | Integration | Simplification | Controle |

## Utilisation dans les frameworks

Spring utilise les adapters partout :
- \`HandlerAdapter\` dans Spring MVC : adapte les controleurs
- \`MessageConverter\` : adapte les formats de message
- \`TaskExecutorAdapter\` : adapte les executors

## Bonnes pratiques
1. Composition de preference (plus flexible que l'heritage)
2. Interface target simple et stable
3. Adapter mince : ne pas ajouter de logique metier

## Pieges courants
1. Adapter trop complexe (qui fait autre chose que l'adaptation)
2. Adaptation de multiples interfaces dans un seul adapter
3. Performance : un adapter mal concu peut ajouter de la latence

Sources : https://refactoring.guru/design-patterns/adapter | https://www.oodesign.com/adapter-pattern.html`},
        {
          id: 'dp-5',
          question: 'Decorator',
          answer: "Pattern ajoutant dynamiquement des **responsabilités** à un objet sans modifier sa classe. Enveloppe l'objet dans un « décorateur » implémentant la même interface.\n\nAlternative à l'héritage pour étendre un comportement : chaque décorateur ajoute une couche, et on peut les combiner librement.\n\nEn Java : `InputStream` décoré par `BufferedInputStream` décoré par `DataInputStream`. Dans les `InputStream` Java, chaque couche ajoute une fonctionnalité. __Quand vous voulez ajouter des comportements sans sous-classer → Decorator.__",
          code: 'interface Coffee { double cost(); }\nclass SimpleCoffee implements Coffee { double cost() { return 1; } }\nclass MilkDecorator implements Coffee {\n    private Coffee coffee;\n    double cost() { return coffee.cost() + 0.5; }\n}',
          language: 'java',
        
          deepDive: `# Decorator

## Qu'est-ce que c'est ?

Le pattern Decorator attache dynamiquement de nouvelles responsabilites a un objet. Il fournit une alternative flexible a l'heritage pour etendre les fonctionnalites. Chaque decorateur "enveloppe" l'objet original et peut ajouter son comportement avant ou apres l'appel a l'objet encapsule.

## Probleme resolu

L'heritage statique ne permet pas d'ajouter des comportements de maniere flexible. Avec l'heritage, le nombre de classes explose : si vous avez 3 fonctionnalites optionnelles, vous avez besoin de 2^3 = 8 classes !

\`\`\`typescript
// Explosion de classes avec l'heritage
class Coffee {}
class CoffeeWithMilk extends Coffee {}
class CoffeeWithSugar extends Coffee {}
class CoffeeWithMilkAndSugar extends Coffee {}
class CoffeeWithWhippedCream extends Coffee {}
class CoffeeWithMilkAndWhippedCream extends Coffee {}
// ... impossible a maintenir
\`\`\`

## Structure

\`\`\`
+-----------+          +------------------+
| Component |<---------|   Decorator      |
|-----------|          |------------------|
| + cost()  |          | - component      |
+-----------+          | + cost()         |
     A                 +------------------+
     |                        A
+---------------+    +------------------+
| ConcreteComp  |    | ConcreteDecorator|
+---------------+    +------------------+
| + cost()      |    | + cost()         |
+---------------+    +------------------+
\`\`\`

## Implementation

### Exemple classique : cafe

\`\`\`typescript
interface Coffee {
    cost(): number;
    description(): string;
}

class SimpleCoffee implements Coffee {
    cost(): number { return 5; }
    description(): string { return "Simple coffee"; }
}

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}

    abstract cost(): number;
    abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
    cost(): number { return this.coffee.cost() + 2; }
    description(): string {
        return this.coffee.description() + ", milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost(): number { return this.coffee.cost() + 1; }
    description(): string {
        return this.coffee.description() + ", sugar";
    }
}

class WhippedCreamDecorator extends CoffeeDecorator {
    cost(): number { return this.coffee.cost() + 3; }
    description(): string {
        return this.coffee.description() + ", whipped cream";
    }
}

// Utilisation
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhippedCreamDecorator(coffee);

console.log(coffee.description()); // "Simple coffee, milk, sugar, whipped cream"
console.log(coffee.cost());        // 11
\`\`\`

### Exemple Java : InputStream

\`\`\`java
// Le Decorator est partout dans l'API Java IO
InputStream inputStream = new FileInputStream("data.txt");
InputStream buffered = new BufferedInputStream(inputStream);
InputStream data = new DataInputStream(buffered);
// Chaque couche ajoute une fonctionnalite :
// - FileInputStream : lecture fichier
// - BufferedInputStream : bufferisation
// - DataInputStream : lecture de types primitifs
\`\`\`

### Exemple TypeScript : validation middleware

\`\`\`typescript
interface RequestHandler {
    handle(req: Request): Promise<Response>;
}

class BaseHandler implements RequestHandler {
    async handle(req: Request): Promise<Response> {
        return { status: 200, body: "OK" };
    }
}

class AuthDecorator implements RequestHandler {
    constructor(private handler: RequestHandler) {}

    async handle(req: Request): Promise<Response> {
        if (!req.headers.authorization) {
            return { status: 401, body: "Unauthorized" };
        }
        return this.handler.handle(req);
    }
}

class LoggingDecorator implements RequestHandler {
    constructor(private handler: RequestHandler) {}

    async handle(req: Request): Promise<Response> {
        console.log("Logging request");
        const start = Date.now();
        const response = await this.handler.handle(req);
        console.log("Request completed in " + (Date.now() - start) + "ms");
        return response;
    }
}

// Composition flexible
let handler: RequestHandler = new BaseHandler();
handler = new LoggingDecorator(handler);
handler = new AuthDecorator(handler);
\`\`\`

## Decorator vs Heritage

| Aspect | Decorator | Heritage |
|--------|-----------|----------|
| Comportement ajoute | A l'execution | A la compilation |
| Combinaison | Illimitee | Limitee (arbre fixe) |
| Modification | Sans modifier l'original | Cree une nouvelle classe |
| Test | Unitaire par decorateur | Test de chaque sous-classe |
| Explosion classes | Non | Oui (2^n combinaisons) |

## Cas d'utilisation concrets
1. **Middleware HTTP** : auth, logging, CORS, rate limiting
2. **Streams Java** : Buffered, Data, GZip, Cipher
3. **Notifications** : email + SMS + push combinees
4. **Validation** : chaque decorateur valide un champ
5. **Pricing** : remises, taxes, frais cumulables

## Bonnes pratiques
1. Interface du composant simple et stable
2. Decorateur sans etat (ajoute juste un comportement)
3. Un decorateur = une responsabilite
4. Ordre des decorateurs important

## Pieges courants
1. Decorateur qui modifie le comportement du composant
2. Trop de decorateurs (performance et complexite)
3. Identite de l'objet perdue (equals/hashCode)

Sources : https://refactoring.guru/design-patterns/decorator | https://www.oodesign.com/decorator-pattern.html`},
        {
          id: 'dp-6',
          question: 'Proxy',
          answer: "Pattern fournissant un **substitut** contrôlant l'accès à un objet. Le proxy implémente la même interface et intercepte les appels.\n\nTypes : **virtual proxy** (création paresseuse — l'objet n'est instancié qu'au besoin), **protection proxy** (contrôle d'accès), **remote proxy** (accès à un objet distant), **cachée proxy** (mise en cachée des résultats).\n\nEn Spring, les **proxys dynamiques** sont au cœur de l'AOP : `@Transactional`, `@Async`, `@Security` fonctionnent via proxys. __Comprendre le proxy, c'est comprendre comment Spring intercepte vos appels.__",
          code: 'interface Service { void operation(); }\nclass RealService implements Service { void operation() { ... } }\nclass ServiceProxy implements Service {\n    private RealService real;\n    void operation() {\n        // log, contrôle, cachée...\n        real.operation();\n    }\n}',
          language: 'java',
        
          deepDive: `# Proxy

## Qu'est-ce que c'est ?

Le pattern Proxy fournit un **substitut** ou **placeholder** pour un autre objet afin de controler l'acces a celui-ci. Le proxy implemente la meme interface que l'objet reel et intercepte les appels pour ajouter des fonctionnalites : chargement paresseux, controle d'acces, logging, mise en cache.

## Probleme resolu

Vous devez controler l'acces a un objet sans modifier son code. L'objet peut etre couteux a creer, sensible (securite), ou distant (reseau).

\`\`\`typescript
// Objet couteux : image haute resolution
class RealImage {
    constructor(private fileName: string) {
        this.loadFromDisk(); // Operation lente
    }

    private loadFromDisk(): void {
        console.log("Loading " + this.fileName);
    }

    display(): void {
        console.log("Displaying " + this.fileName);
    }
}

// Sans proxy, chaque image est chargee immediatement
const images = ["photo1.jpg", "photo2.jpg", "photo3.jpg"];
const realImages = images.map(f => new RealImage(f));
// Toutes les images sont chargees, meme si on n'en affiche aucune !
\`\`\`

## Structure

\`\`\`
+----------+          +--------------+
|  Client  |--------->|   Subject    |
+----------+          |--------------|
                      | + request() |
                      +--------------+
                             A
              +--------------+--------------+
              |                             |
    +------------------+          +------------------+
    |   RealSubject    |          |      Proxy       |
    +------------------+          +------------------+
    | + request()      |          | - realSubject    |
    +------------------+          | + request()      |
                                  +------------------+
\`\`\`

## Implementation

### Virtual Proxy (chargement paresseux)

\`\`\`typescript
interface Image {
    display(): void;
    getDimensions(): { width: number; height: number };
}

class RealImage implements Image {
    constructor(private fileName: string) {
        this.loadFromDisk();
    }

    private loadFromDisk(): void {
        console.log("Loading high-res image: " + this.fileName);
    }

    display(): void {
        console.log("Displaying: " + this.fileName);
    }

    getDimensions(): { width: number; height: number } {
        return { width: 1920, height: 1080 };
    }
}

class VirtualProxy implements Image {
    private realImage: RealImage | null = null;
    private accessCount = 0;

    constructor(private fileName: string) {}

    private getRealImage(): RealImage {
        if (!this.realImage) {
            this.realImage = new RealImage(this.fileName);
        }
        return this.realImage;
    }

    display(): void {
        this.accessCount++;
        console.log("Access #" + this.accessCount);
        this.getRealImage().display();
    }

    getDimensions(): { width: number; height: number } {
        return this.getRealImage().getDimensions();
    }
}

// Utilisation : le chargement n'a lieu qu'au premier affichage
const img = new VirtualProxy("sunset.jpg");
console.log("Image created, not loaded yet");
img.display(); // Chargement + affichage
img.display(); // Affichage seulement (deja charge)
\`\`\`

### Protection Proxy (controle d'acces)

\`\`\`typescript
interface Document {
    view(): string;
    edit(content: string): void;
}

class RealDocument implements Document {
    constructor(private content: string) {}

    view(): string {
        return this.content;
    }

    edit(content: string): void {
        this.content = content;
    }
}

class DocumentProxy implements Document {
    constructor(
        private realDoc: RealDocument,
        private userRole: string
    ) {}

    view(): string {
        return this.realDoc.view();
    }

    edit(content: string): void {
        if (this.userRole !== "ADMIN" && this.userRole !== "EDITOR") {
            throw new Error("Access denied: you cannot edit documents");
        }
        console.log("Audit: user " + this.userRole + " edited document");
        this.realDoc.edit(content);
    }
}
\`\`\`

### Remote Proxy (appel distant)

\`\`\`typescript
interface WeatherService {
    getTemperature(city: string): Promise<number>;
}

class RealWeatherService implements WeatherService {
    async getTemperature(city: string): Promise<number> {
        const response = await fetch("https://api.weather.com/v1/" + city);
        const data = await response.json();
        return data.temperature;
    }
}

class CachedWeatherProxy implements WeatherService {
    private cache = new Map<string, { temp: number; timestamp: number }>();
    constructor(private realService: RealWeatherService) {}

    async getTemperature(city: string): Promise<number> {
        const cached = this.cache.get(city);
        if (cached && Date.now() - cached.timestamp < 300000) { // 5 min
            console.log("Cache hit for " + city);
            return cached.temp;
        }
        const temp = await this.realService.getTemperature(city);
        this.cache.set(city, { temp, timestamp: Date.now() });
        return temp;
    }
}
\`\`\`

## Types de Proxy

| Type | Objectif | Exemple |
|------|----------|---------|
| Virtual | Chargement paresseux | Images, documents volumineux |
| Protection | Controle d'acces | Droits utilisateur, RBAC |
| Remote | Acces a distance | RMI, gRPC, Web services |
| Cache | Mise en cache | API responses, DB queries |
| Logging | Audit et logging | Traces, metriques |

## Proxy dans Spring

Spring AOP utilise le proxy pour toutes ses annotations :

\`\`\`java
@Service
public class UserService {
    @Transactional        // -> Proxy transactionnel
    @Cacheable("users")   // -> Proxy de cache
    @Secured("ROLE_ADMIN") // -> Proxy de securite
    public User createUser(UserDto dto) {
        return userRepository.save(dto);
    }
}
\`\`\`

## Proxy vs Decorator

| Aspect | Proxy | Decorator |
|--------|-------|-----------|
| Objectif | Controler l'acces | Ajouter des comportements |
| Interface | Identique | Identique |
| Creation | Cree le sujet | Enveloppe un objet existant |
| Relation | Protege/gere le sujet | Enrichit le sujet |

## Bonnes pratiques
1. Mettre en cache les resultats des proxies distants
2. Auditer les acces via protection proxy
3. Thread-safe pour les proxies en environnement concurrent

## Pieges courants
1. Proxy qui modifie le comportement attendu
2. Fuite de reference vers l'objet reel
3. Performance : trop de proxies chaines

Sources : https://refactoring.guru/design-patterns/proxy | https://www.oodesign.com/proxy-pattern.html`},
      ],
    },
    {
      id: 'dp-comportement',
      title: 'Patterns Comportementaux',
      questions: [
        {
          id: 'dp-7',
          question: 'Strategy',
          answer: "Pattern encapsulant chaque algorithme dans une classe séparée, rendant les algorithmes **interchangeables** au runtime.\n\nLe contexte détient une référence vers l'interface `Strategy` et délègue l'exécution. Changer de stratégie = changer l'implémentation injectée.\n\nÉlimine les `if/else` ou `switch` sur le type d'algorithme. Exemples : stratégie de tri, de paiement, de compression. __Quand vous avez un `switch` sur le comportement → pensez Strategy.__",
          code: 'interface StrategiePaiement {\n    void payer(double montant);\n}\nclass PaiementCarte implements StrategiePaiement { ... }\nclass PaiementPaypal implements StrategiePaiement { ... }',
          language: 'java',
        
          deepDive: `# Strategy

## Qu'est-ce que c'est ?

Le pattern Strategy definit une famille d'algorithmes, les encapsule chacun dans une classe separee, et les rend **interchangeables** a l'execution. Le client peut choisir dynamiquement quel algorithme utiliser, sans modifier le code qui les utilise.

## Probleme resolu

Un switch ou if/else geant qui choisit un comportement different selon un type est difficile a maintenir, tester et etendre.

\`\`\`typescript
// MAUVAIS : modification a chaque nouvel algorithme
function calculateShipping(carrier: string, weight: number): number {
    switch (carrier) {
        case "colissimo":
            return weight < 1 ? 3.50 : 5.00;
        case "chronopost":
            return weight * 2.50 + 5;
        case "ups":
            return weight * 3.00 + 2;
        default:
            throw new Error("Carrier unknown");
    }
}
// A chaque nouveau transporteur, on modifie cette fonction
\`\`\`

## Structure

\`\`\`
+-----------+          +------------------+
|  Context  |--------->|    Strategy      |
|-----------|          |------------------|
| - strategy|          | + execute(data)  |
| + setStrat |         +------------------+
| + execute()|                 A
+-----------+       +----------+----------+
                    |          |          |
            +-----------+ +-------+ +---------+
            | StrategyA | | Str B | | Str C  |
            +-----------+ +-------+ +---------+
\`\`\`

## Implementation

### Exemple : validation de donnees

\`\`\`typescript
// Strategy interface
interface ValidationStrategy {
    validate(data: unknown): { valid: boolean; errors: string[] };
}

// Concrete strategies
class EmailValidation implements ValidationStrategy {
    validate(data: unknown): { valid: boolean; errors: string[] } {
        const email = String(data);
        const errors: string[] = [];
        if (!email.includes("@")) errors.push("Email must contain @");
        if (!email.includes(".")) errors.push("Email must contain a domain");
        return { valid: errors.length === 0, errors };
    }
}

class PasswordValidation implements ValidationStrategy {
    validate(data: unknown): { valid: boolean; errors: string[] } {
        const pwd = String(data);
        const errors: string[] = [];
        if (pwd.length < 8) errors.push("Password too short (min 8 chars)");
        if (!/[A-Z]/.test(pwd)) errors.push("Need uppercase letter");
        if (!/[0-9]/.test(pwd)) errors.push("Need digit");
        return { valid: errors.length === 0, errors };
    }
}

class RequiredValidation implements ValidationStrategy {
    validate(data: unknown): { valid: boolean; errors: string[] } {
        if (data === null || data === undefined || String(data).trim() === "") {
            return { valid: false, errors: ["Field is required"] };
        }
        return { valid: true, errors: [] };
    }
}

// Context
class FormField {
    private strategies: ValidationStrategy[] = [];
    private value: unknown;

    constructor(private name: string) {}

    addStrategy(strategy: ValidationStrategy): this {
        this.strategies.push(strategy);
        return this;
    }

    setValue(value: unknown): void {
        this.value = value;
    }

    validate(): { valid: boolean; errors: string[] } {
        const allErrors: string[] = [];
        for (const strategy of this.strategies) {
            const result = strategy.validate(this.value);
            allErrors.push(...result.errors);
        }
        return { valid: allErrors.length === 0, errors: allErrors };
    }
}

// Utilisation
const emailField = new FormField("email");
emailField
    .addStrategy(new RequiredValidation())
    .addStrategy(new EmailValidation());
emailField.setValue("invalid-email");
console.log(emailField.validate());
\`\`\`

### Exemple : systeme de paiement

\`\`\`java
// Strategy interface
public interface PaymentStrategy {
    PaymentResult pay(double amount);
    boolean validate();
}

// Concrete strategies
public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    @Override
    public PaymentResult pay(double amount) {
        // Appel API bancaire
        return new PaymentResult(true, "TX-" + UUID.randomUUID());
    }

    @Override
    public boolean validate() {
        return cardNumber.length() == 16;
    }
}

public class PayPalPayment implements PaymentStrategy {
    private String email;

    @Override
    public PaymentResult pay(double amount) {
        // Appel API PayPal
        return new PaymentResult(true, "PP-" + UUID.randomUUID());
    }

    @Override
    public boolean validate() {
        return email.contains("@");
    }
}

// Context
public class CheckoutService {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public PaymentResult processOrder(Order order) {
        if (!paymentStrategy.validate()) {
            throw new PaymentException("Invalid payment details");
        }
        return paymentStrategy.pay(order.getTotal());
    }
}
\`\`\`

### Version fonctionnelle (lambda)

\`\`\`typescript
type ShippingStrategy = (weight: number) => number;

const colissimoStrategy: ShippingStrategy = (weight) =>
    weight < 1 ? 3.50 : 5.00;

const chronopostStrategy: ShippingStrategy = (weight) =>
    weight * 2.50 + 5;

class ShippingCalculator {
    constructor(private strategy: ShippingStrategy) {}

    calculate(weight: number): number {
        return this.strategy(weight);
    }

    setStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }
}
\`\`\`

## Strategy vs Etat (State)

| Aspect | Strategy | State |
|--------|----------|-------|
| Objectif | Changer d'algorithme | Changer de comportement selon l'etat |
| qui change la strategie/etat ? | Le client | Le contexte ou l'etat lui-meme |
| Nombre de strategies/etats | Souvent connu | Peut evoluer |
| Transitions | Choisies par le client | Automatiques |

## Cas d'utilisation concrets
1. **Validation** : differentes strategies selon le type de champ
2. **Paiement** : carte, PayPal, virement, Apple Pay
3. **Tri** : tri par nom, date, priorite, statut
4. **Compression** : ZIP, GZip, RAR, 7z
5. **Authentification** : OAuth, JWT, Basic, SAML

## Bonnes pratiques
1. Strategies sans etat (stateless) de preference
2. Interface strategy simple et stable
3. Strategies interchangeables sans effet de bord
4. Parallelisme : une strategie ne doit pas partager d'etat

## Pieges courants
1. Trop de strategies (classe explosion)
2. Strategies avec etat (side effects inattendus)
3. Interface trop complexe (trop de methodes dans Strategy)

Sources : https://refactoring.guru/design-patterns/strategy | https://www.oodesign.com/strategy-pattern.html`},
        {
          id: 'dp-8',
          question: 'Observer',
          answer: "Pattern où un **sujet** maintient une liste d'**observateurs** et les notifie automatiquement de tout changement d'état. C'est le principe des **événements**.\n\nLe sujet ne connaît pas les observateurs concrets — juste leur interface `Observer`. Ajout/retrait d'observateurs sans modifier le sujet (**OCP** respecté).\n\nUtilisé partout : listeners d'événements UI, `PropertyChangeListener` en Java, `EventBus`, reactive programming (`RxJS`, `Spring Events`). __Quand un objet doit réagir aux changements d'un autre sans couplage fort → Observer.__",
          code: 'interface Subject {\n    void attach(Observer o);\n    void detach(Observer o);\n    void notifyObservers();\n}\ninterface Observer {\n    void update(String message);\n}',
          language: 'java',
        
          deepDive: `# Observer

## Qu'est-ce que c'est ?

Le pattern Observer definit une dependance **un-vers-plusieurs** entre des objets. Quand le sujet change d'etat, tous ses observateurs sont notifies automatiquement. C'est le fondement de la **programmation reactive** et des **systemes d'evenements**.

## Probleme resolu

Un objet doit notifier d'autres objets de ses changements d'etat, sans connaitre leurs types concrets (couplage faible).

\`\`\`typescript
// MAUVAIS : couplage fort, difficile a etendre
class Store {
    private emailService = new EmailService();
    private analyticsService = new AnalyticsService();
    private logger = new LoggerService();

    setQuantity(product: string, qty: number): void {
        this.quantity = qty;
        // Notification directe -> couplage fort
        this.emailService.sendLowStockAlert(product, qty);
        this.analyticsService.trackEvent("stock_update");
        this.logger.log("Stock updated: " + product);
    }
}
// Pour ajouter un nouveau notifie, on modifie Store !
\`\`\`

## Structure

\`\`\`
+-----------+          +------------------+
|  Subject  |--------->|   Observer       |
|-----------|          |------------------|
| + attach()|          | + update(state)  |
| + detach()|          +------------------+
| + notify()|                   A
+-----------+          +---------+--------+
                       |         |        |
              +-----------+ +------+ +--------+
              | ObsA     | | ObsB | | ObsC   |
              +-----------+ +------+ +--------+
\`\`\`

## Implementation

### Version TypeScript

\`\`\`typescript
interface Observer<T> {
    update(state: T): void;
}

interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(): void;
}

class Observable<T> implements Subject<T> {
    private observers = new Set<Observer<T>>();
    protected state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    attach(observer: Observer<T>): void {
        this.observers.add(observer);
        console.log("Observer attached. Total: " + this.observers.size);
    }

    detach(observer: Observer<T>): void {
        this.observers.delete(observer);
        console.log("Observer detached. Total: " + this.observers.size);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.state);
        }
    }

    protected updateState(newState: T): void {
        if (newState !== this.state) {
            this.state = newState;
            this.notify();
        }
    }
}

// Observable concret
class Inventory extends Observable<{ product: string; quantity: number }> {
    setQuantity(product: string, quantity: number): void {
        this.updateState({ product, quantity });
    }
}

// Observateurs concrets
class EmailAlertObserver implements Observer<{ product: string; quantity: number }> {
    update(state: { product: string; quantity: number }): void {
        if (state.quantity < 10) {
            console.log("EMAIL: Low stock alert for " + state.product);
        }
    }
}

class AnalyticsObserver implements Observer<{ product: string; quantity: number }> {
    update(state: { product: string; quantity: number }): void {
        console.log("ANALYTICS: Tracking stock update for " + state.product);
    }
}

class DashboardObserver implements Observer<{ product: string; quantity: number }> {
    private history: Array<{ product: string; quantity: number }> = [];

    update(state: { product: string; quantity: number }): void {
        this.history.push(state);
        this.render();
    }

    private render(): void {
        console.log("DASHBOARD: Updated with " + this.history.length + " events");
    }
}

// Utilisation
const inventory = new Inventory({ product: "Laptop", quantity: 50 });

const emailAlert = new EmailAlertObserver();
const analytics = new AnalyticsObserver();
const dashboard = new DashboardObserver();

inventory.attach(emailAlert);
inventory.attach(analytics);
inventory.attach(dashboard);

inventory.setQuantity("Laptop", 5);  // Tous les observateurs sont notifies
\`\`\`

### Exemple Java avec PropertyChangeListener

\`\`\`java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class TemperatureSensor {
    private double temperature;
    private final PropertyChangeSupport support = new PropertyChangeSupport(this);

    public void addListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }

    public void setTemperature(double newTemp) {
        double oldTemp = this.temperature;
        this.temperature = newTemp;
        support.firePropertyChange("temperature", oldTemp, newTemp);
    }
}

public class HeaterController implements PropertyChangeListener {
    @Override
    public void propertyChange(PropertyChangeEvent evt) {
        double temp = (double) evt.getNewValue();
        if (temp < 18) {
            System.out.println("Heating ON");
        } else if (temp > 25) {
            System.out.println("Heating OFF");
        }
    }
}
\`\`\`

### Observer en RxJS

\`\`\`typescript
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

// Subject RxJS = implementation moderne du pattern Observer
const eventBus = new Subject<{ type: string; data: unknown }>();

// Observateurs "reactive"
eventBus.pipe(filter(e => e.type === "ORDER_CREATED"))
    .subscribe(e => console.log("New order:", e.data));

eventBus.pipe(filter(e => e.type === "PAYMENT_RECEIVED"))
    .subscribe(e => console.log("Payment:", e.data));

// Emission d'evenements
eventBus.next({ type: "ORDER_CREATED", data: { id: "123" } });
eventBus.next({ type: "PAYMENT_RECEIVED", data: { amount: 100 } });
\`\`\`

## Observer vs Event Emitter vs Pub-Sub

| Aspect | Observer | Event Emitter | Pub-Sub |
|--------|----------|---------------|---------|
| Couplage | Faible | Faible | Tres faible |
| Communication | Directe objet-objet | Par evenements nommes | Via un bus |
| Filtrage | Non | Par type d'evenement | Par sujet/topic |
| Scale | Un processus | Un processus | Distribue |

## Cas d'utilisation concrets
1. **UI Events** : clics, changements, entree utilisateur
2. **Trading** : mise a jour des prix en temps reel
3. **IoT** : capteurs qui notifient les controleurs
4. **Reactive Programming** : RxJS, ReactiveX
5. **Messaging** : files d'attente, event sourcing

## Bonnes pratiques
1. Fournir un moyen de se desabonner (prevention des fuites memoires)
2. Notifier seulement si l'etat a change
3. Observer sans etat si possible
4. Gestion des erreurs dans la notification

## Pieges courants
1. **Fuite memoire** : observateur jamais detache = reference persistante
2. **Sur-notification** : trop d'evenements = performance degradee
3. **Ordre de notification** : ne pas supposer un ordre specifique
4. **Notification synchrone** : peut bloquer le sujet longtemps

Sources : https://refactoring.guru/design-patterns/observer | https://rxjs.dev/guide/observable`},
        {
          id: 'dp-9',
          question: 'Repository',
          answer: "Pattern abstrayant la couche d'accès aux données : le **Repository** expose des méthodes métier (`trouverParNom()`, `sauvegarder()`) et cachée les détails SQL/ORM.\n\nLe code métier appelle le repository sans connaître la BDD sous-jacente. Facilite les tests (remplacement par un mock) et le changement de SGBD.\n\nEn Spring Data JPA, les interfaces `JpaRepository` implémentent ce pattern automatiquement. __Sépare la logique de persistance de la logique métier.__",
          code: 'public interface UserRepository {\n    User findById(Long id);\n    List<User> findByName(String name);\n    void save(User user);\n}',
          language: 'java',
        
          deepDive: `# Repository

## Qu'est-ce que c'est ?

Le pattern Repository fait office de **mediateur** entre le domaine metier et la couche de persistance. Il offre une interface de type collection pour acceder aux objets du domaine, masquant les details de stockage (base de donnees, API, fichier).

## Probleme resolu

Le code metier ne doit pas connaitre les details de persistance (SQL, ORM, API REST). Sans Repository, la logique metier est melangee avec la logique d'acces aux donnees.

\`\`\`typescript
// MAUVAIS : logique metier melangee avec du SQL
class OrderService {
    async getTotalRevenue(): Promise<number> {
        // Le code metier connait directement la base de donnees
        const result = await this.db.query(
            "SELECT SUM(total) FROM orders WHERE status = 'COMPLETED'"
        );
        return result.rows[0].sum;
    }
}
// Impossible de tester sans base de donnees reelle !
\`\`\`

## Structure

\`\`\`
+------------------+
|   Domain Layer   |
+------------------+
| UserRepository   | <--- interface (abstraction)
+------------------+
        A
        | implemente
+------------------+
| Infrastructure   |
+------------------+
| PostgresRepo     | <--- implementation concrete
| InMemoryRepo     | <--- pour les tests
| CacheRepo        | <--- avec cache
+------------------+
\`\`\`

## Implementation

### Interface Repository

\`\`\`typescript
interface User {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}

// Le repository dans le domaine (abstraction)
interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(filter?: { name?: string; role?: string; limit?: number }): Promise<User[]>;
    save(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    count(role?: string): Promise<number>;
}
\`\`\`

### Implementation PostgreSQL

\`\`\`typescript
class PostgresUserRepository implements UserRepository {
    constructor(private db: Database) {}

    async findById(id: string): Promise<User | null> {
        const result = await this.db.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        return result.rows[0] || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return result.rows[0] || null;
    }

    async findAll(filter?: { name?: string; role?: string; limit?: number }): Promise<User[]> {
        let query = "SELECT * FROM users WHERE 1=1";
        const params: unknown[] = [];
        let paramIndex = 1;

        if (filter?.name) {
            query += " AND name ILIKE $" + paramIndex++;
            params.push("%" + filter.name + "%");
        }
        if (filter?.role) {
            query += " AND role = $" + paramIndex++;
            params.push(filter.role);
        }
        query += " ORDER BY created_at DESC";
        if (filter?.limit) {
            query += " LIMIT $" + paramIndex++;
            params.push(filter.limit);
        }
        const result = await this.db.query(query, params);
        return result.rows;
    }

    async save(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
        const result = await this.db.query(
            \`INSERT INTO users (email, name, role)
             VALUES ($1, $2, $3)
             RETURNING *\`,
            [user.email, user.name, user.role]
        );
        return result.rows[0];
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const fields = Object.keys(data);
        const setClause = fields
            .map((f, i) => f + " = $" + (i + 2))
            .join(", ");
        const result = await this.db.query(
            \`UPDATE users SET \${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *\`,
            [id, ...fields.map(f => (data as any)[f])]
        );
        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.query("DELETE FROM users WHERE id = $1", [id]);
    }

    async count(role?: string): Promise<number> {
        if (role) {
            const result = await this.db.query(
                "SELECT COUNT(*) FROM users WHERE role = $1",
                [role]
            );
            return parseInt(result.rows[0].count);
        }
        const result = await this.db.query("SELECT COUNT(*) FROM users");
        return parseInt(result.rows[0].count);
    }
}
\`\`\`

### Implementation In-Memory (pour les tests)

\`\`\`typescript
class InMemoryUserRepository implements UserRepository {
    private users = new Map<string, User>();

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        for (const user of this.users.values()) {
            if (user.email === email) return user;
        }
        return null;
    }

    async findAll(filter?: { name?: string; role?: string; limit?: number }): Promise<User[]> {
        let results = Array.from(this.users.values());
        if (filter?.name) {
            results = results.filter(u => u.name.includes(filter.name!));
        }
        if (filter?.role) {
            results = results.filter(u => u.role === filter.role);
        }
        if (filter?.limit) {
            results = results.slice(0, filter.limit);
        }
        return results;
    }

    async save(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
        const user: User = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...data,
        };
        this.users.set(user.id, user);
        return user;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const existing = this.users.get(id);
        if (!existing) throw new Error("User not found");
        const updated = { ...existing, ...data, updatedAt: new Date() };
        this.users.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<void> {
        this.users.delete(id);
    }

    async count(role?: string): Promise<number> {
        if (role) {
            return Array.from(this.users.values()).filter(u => u.role === role).length;
        }
        return this.users.size;
    }
}

// Test unitaire sans base de donnees !
async function testUserService() {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    const user = await service.createUser({
        email: "test@test.com",
        name: "Test User",
        role: "USER"
    });
    console.assert(user.id !== undefined, "User should have an id");

    const found = await service.getUser(user.id);
    console.assert(found !== null, "User should be found");
}
\`\`\`

## Repository en Spring Data JPA

\`\`\`java
// Spring Data genere l'implementation automatiquement
public interface UserRepository extends JpaRepository<User, Long> {
    // Derivation du nom de methode
    Optional<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);
    long countByRole(String role);

    // JPQL personnalise
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmailCustom(@Param("email") String email);

    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.lastLogin < :date")
    int deactivateInactiveUsers(@Param("date") LocalDate date);
}
\`\`\`

## Repository vs DAO

| Aspect | Repository | DAO (Data Access Object) |
|--------|------------|--------------------------|
| Abstraction | Collection-like | Data access |
| Terminologie | Domaine metier | SQL/ORM |
| Cache | Inclut souvent le cache | Acces direct |
| Combinaison | Peut utiliser des DAOs | Couche bas niveau |
| Propriete du domaine | Oui (domaine layer) | Non (infrastructure) |

## Bonnes pratiques
1. **Interface dans le domaine, implementation dans l'infrastructure**
2. **Un repository par aggregate root** (pas par table)
3. **Methode retournant des Promises** (asynchrone)
4. **Idempotence** : le meme appel peut etre repete
5. **Pagination** pour les listes potentiellement grandes
6. **Tests avec implementation InMemory**

## Pieges courants
1. **Leaking domain logic** : des regles metier dans le repository
2. **Anemic repository** : simple CRUD sans valeur ajoutee
3. **N+1 queries** : chargement paresseux mal gere
4. **Repository trop generique** : \`findAll()\` sans filtre
5. **Transactions dans le repository** : la transaction est orchestree au niveau service

Sources : https://martinfowler.com/eaaCatalog/repository.html | https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design`},
      ],
    },
  ],
};