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

## Quest-ce que cest ?

Le pattern Singleton garantit qu une classe n a qu une seule instance et fournit un point d acces global a cette instance. Utilise pour les ressources partagees comme les connexions a une base de donnees ou les configurations.

## Implementation TypeScript

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  private constructor() {
    // Connexion à la base de données
  }
  
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}

// Utilisation
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true

## Diagramme UML

Classe Singleton
- - instance: Singleton
- - Singleton()
+ + getInstance(): Singleton

## Quand utiliser

- Connexions a des bases de donnees
- Objets de configuration globaux
- Logging centralise
- Cache d application

## Anti-patterns a eviter

1. **Global state** : Le singleton cree un etat global invisible
2. **Couplage fort** : Difficile a tester et a substituer
3. **Responsabilite unique violee** : Gere souvent plusieurs responsabilites

## Bonnes pratiques

1. Utiliser l injection de dependances a la place si possible
2. Implementer une interface pour permettre le mock en test
3. Prevoir la destruction de l instance si necessaire
4. Eviter les singletons pour les objets modifiables

## Exemple avec double-checked locking

public static getInstance(): Singleton {
  if (instance === null) {
    synchronized (Singleton.class) {
      if (instance === null) {
        instance = new Singleton();
      }
    }
  }
  return instance;
}

Source : [Martin Fowler - Singleton](https://martinfowler.com/articles/injection.html)`},
        {
          id: 'dp-2',
          question: 'Factory Method',
          answer: "Pattern délégant l'**instanciation** à une classe dédiée, au lieu d'utiliser `new` directement. Le code appelant ne connaît que l'**interface**, pas la classe concrète.\n\nVariantes : **Simple Factory** (méthode statique qui choisit l'implémentation), **Factory Method** (sous-classes choisissant l'implémentation), **Abstract Factory** (famille de produits liés).\n\nAvantage : **couplage faible** — changer l'implémentation ne modifie pas le code appelant. Utilisé partout : `LoggerFactory`, `DataSourceFactory`. __Quand vous voyez `new MaClasseConcrète()` partout → pensez Factory.__",
          code: 'public interface Notification { void envoyer(); }\n\npublic class NotificationFactory {\n    public static Notification create(String type) {\n        return switch(type) {\n            case "email" -> new EmailNotif();\n            case "sms" -> new SmsNotif();\n            default -> throw new IllegalArgumentException();\n        };\n    }\n}',
          language: 'java',
        
          deepDive: `# Factory Method

## Quest-ce que cest ?

Le pattern Factory Method definit une interface pour creer un objet maisdelegate la creation aux sous-classes. Il permet de deferer l instantiation aux classes filles.

## Structure

- **Product** : Interface des objets crees
- **ConcreteProduct** : Implementation du produit
- **Creator** : Declare la methode factory
- **ConcreteCreator** : Implemente la methode factory

## Implementation TypeScript

interface Button {
  render(): void;
}

class WindowsButton implements Button {
  render(): void {
    console.log("Rendering Windows button");
  }
}

class MacButton implements Button {
  render(): void {
    console.log("Rendering Mac button");
  }
}

abstract class Dialog {
  public abstract createButton(): Button;
  
  public render(): void {
    const button = this.createButton();
    button.render();
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

## Diagramme UML

Creator (abstract)
+ factoryMethod(): Product
+ operation()

ConcreteCreator
+ factoryMethod(): Product

## Quand utiliser

- Quand une classe ne peut pas anticiper la classe des objets a creer
- Quand une classe desire que ses sous-classes specifient les objets crees
- Pour creer differentes variantes d un meme produit

## Exemple avec configuration

class ApplicationConfig {
  static getFactory(): Dialog {
    const OS = process.env.OS || "windows";
    if (OS === "mac") {
      return new MacDialog();
    }
    return new WindowsDialog();
  }
}

Source : [Gang of Four - Factory Method](https://designpatternsphp.readthedocs.io/en/latest/Creational/FactoryMethod/README.html)`},
        {
          id: 'dp-3',
          question: 'Builder',
          answer: "Pattern séparant la **construction** d'un objet complexe de sa **représentation**. Au lieu d'un constructeur avec 10 paramètres, on chaîne les appels de méthode de façon lisible.\n\nAvantages : **lisible** (on sait ce qu'on construit), **flexible** (paramètres optionnels sans surcharge), **immuable** (l'objet est construit d'un coup).\n\nUtilisé par `StringBuilder`, `Stream.Builder` en Java, et les `Request` dans les APIs HTTP. __Quand un constructeur a plus de 4 paramètres → pensez Builder.__",
          code: 'User user = new User.Builder()\n    .nom("Dupont")\n    .email("dupont@mail.com")\n    .age(30)\n    .role(Role.ADMIN)\n    .build();',
          language: 'java',
        
          deepDive: `# Builder

## Quest-ce que cest ?

Le pattern Builder separ la construction d un objet complexe de sa representation. Il permet de créer differentes representations avec le meme processus de construction.

## Probleme qu il resout

Construire un objet avec beaucoup de parametres可选, dont certains sont obligatoires et d autres optionnels.

class User {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public address?: string,
    public phone?: string,
    public avatar?: string
  ) {}
}

## Solution Builder

class UserBuilder {
  private user: User;
  
  constructor(name: string, email: string) {
    this.user = new User(name, email);
  }
  
  setAge(age: number): this {
    this.user.age = age;
    return this;
  }
  
  setAddress(address: string): this {
    this.user.address = address;
    return this;
  }
  
  build(): User {
    return this.user;
  }
}

const user = new UserBuilder("John", "john@example.com")
  .setAge(30)
  .setAddress("123 Main St")
  .build();

## Implementation Classique

interface Builder {
  reset(): void;
  buildPartA(): void;
  buildPartB(): void;
  getResult(): Product;
}

class Director {
  constructor(private builder: Builder) {}
  
  construct(): void {
    this.builder.reset();
    this.builder.buildPartA();
    this.builder.buildPartB();
  }
}

## Quand utiliser

- Creation d objets complexes avec de nombreux parametres
- Constructs with many constructor parameters is called telescoping constructor
- Creer differentes representations d un meme objet
- Isolation du code de construction complexe

## Bonnes pratiques

1. Methode chainable (return this)
2. Methode build() qui retourne l objet final
3. Validations dans build() avant de retourner
4. Considerer les objets immuables

Source : [Martin Fowler - Builder](https://martinfowler.com/articles/collection-constructors.html)`},
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

## Quest-ce que cest ?

Le pattern Adapter permet a des interfaces incompatibles de travailler ensemble. Il convertit l interface d une classe en une autre attendue par le client.

## Probleme

Votre application attend une interface avec une methode request().
Mais vous avez une classe existante avec une methode specificRequest().

## Solution Adapter

// Interface attendue par le client
interface Target {
  request(): string;
}

// Classe existante incompatible
class Adaptee {
  specificRequest(): string {
    return "Specific behavior";
  }
}

// Adaptateur
class Adapter implements Target {
  private adaptee: Adaptee;
  
  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }
  
  request(): string {
    const result = this.adaptee.specificRequest();
    return \`Adapter: (TRANSLATED) \${result}\`;
  }
}

// Utilisation
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
console.log(adapter.request());

## Diagramme UML

Client ---> Target
                |
            [Adapter] ----> Adaptee

## Types d adaptateur

### Object Adapter
Utilise la composition (contient l objet a adapter).

### Class Adapter
Utilise l heritage multiple (herite de Target et Adaptee).

## Exemple reel

// API externe avec interface differente
class ExternalPaymentGateway {
  processPayment(amount: number, card: string): boolean {
    // Traitement externe
    return true;
  }
}

// Interface interne attendue
interface PaymentProcessor {
  pay(amount: number): void;
}

class PaymentAdapter implements PaymentProcessor {
  constructor(private gateway: ExternalPaymentGateway) {}
  
  pay(amount: number): void {
    const cardNumber = "**** **** **** 1234";
    this.gateway.processPayment(amount, cardNumber);
  }
}

## Quand utiliser

- Integration avec du code legacy
- Utilisation de bibliotheques tierces
- Migration progressive vers une nouvelle API

Source : [Gang of Four - Adapter](https://designpatternsphp.readthedocs.io/en/latest/Structural/Adapter/README.html)`},
        {
          id: 'dp-5',
          question: 'Decorator',
          answer: "Pattern ajoutant dynamiquement des **responsabilités** à un objet sans modifier sa classe. Enveloppe l'objet dans un « décorateur » implémentant la même interface.\n\nAlternative à l'héritage pour étendre un comportement : chaque décorateur ajoute une couche, et on peut les combiner librement.\n\nEn Java : `InputStream` décoré par `BufferedInputStream` décoré par `DataInputStream`. Dans les `InputStream` Java, chaque couche ajoute une fonctionnalité. __Quand vous voulez ajouter des comportements sans sous-classer → Decorator.__",
          code: 'interface Coffee { double cost(); }\nclass SimpleCoffee implements Coffee { double cost() { return 1; } }\nclass MilkDecorator implements Coffee {\n    private Coffee coffee;\n    double cost() { return coffee.cost() + 0.5; }\n}',
          language: 'java',
        
          deepDive: `# Decorator

## Quest-ce que cest ?

Le pattern Decorator attache dynamiquement de nouveaux comportements a un objet. Il得失 pas modifier la classe de l objet original. Alternative flexible a l heritage pour extender les responsabilites.

## Probleme

Vous voulez ajouter des responsabilites a des classes sans modifier leur code.
L heritage creates une explosion de classes.

## Solution

Decorator
- Component (interface commune)
- ConcreteComponent (classe de base)
- Decorator (contient une reference au composant)
- ConcreteDecorator (ajoute le comportement)

## Implementation TypeScript

interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number { return 10; }
  getDescription(): string { return "Simple coffee"; }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  
  abstract getCost(): number;
  abstract getDescription(): string;
}

class MilkDecorator extends CoffeeDecorator {
  getCost(): number { return this.coffee.getCost() + 2; }
  getDescription(): string { 
    return this.coffee.getDescription() + ", milk"; 
  }
}

class SugarDecorator extends CoffeeDecorator {
  getCost(): number { return this.coffee.getCost() + 1; }
  getDescription(): string { 
    return this.coffee.getDescription() + ", sugar"; 
  }
}

// Utilisation
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.getCost()); // 13
console.log(coffee.getDescription()); // "Simple coffee, milk, sugar"

## Diagramme UML

Component
+ operation()

ConcreteComponent
+ operation()

Decorator
- wrapped: Component
+ operation()

Decorator <|-- ConcreteDecoratorA
Decorator <|-- ConcreteDecoratorB

## Decorator vs Inheritance

| Aspect | Decorator | Inheritance |
|--------|-----------|-------------|
| Comportement | A execution | A la compilation |
| Combinaison | Illimitee | Limitee |
| Modification | Sans modifier original | Modifie la classe |
| Test | Unitaire facile | Plus complexe |

## Quand utiliser

- Ajouter des responsabilites dynamiquement
- Extension via sous-classes impraticable
- Separation des responsabilites par couches

## Exemple en JavaScript/TypeScript moderne

function logged(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(\`Calling \${name}\`);
    return original.apply(this, args);
  };
  return descriptor;
}

Source : [Gang of Four - Decorator](https://designpatternsphp.readthedocs.io/en/latest/Structural/Decorator/README.html)`},
        {
          id: 'dp-6',
          question: 'Proxy',
          answer: "Pattern fournissant un **substitut** contrôlant l'accès à un objet. Le proxy implémente la même interface et intercepte les appels.\n\nTypes : **virtual proxy** (création paresseuse — l'objet n'est instancié qu'au besoin), **protection proxy** (contrôle d'accès), **remote proxy** (accès à un objet distant), **cachée proxy** (mise en cachée des résultats).\n\nEn Spring, les **proxys dynamiques** sont au cœur de l'AOP : `@Transactional`, `@Async`, `@Security` fonctionnent via proxys. __Comprendre le proxy, c'est comprendre comment Spring intercepte vos appels.__",
          code: 'interface Service { void operation(); }\nclass RealService implements Service { void operation() { ... } }\nclass ServiceProxy implements Service {\n    private RealService real;\n    void operation() {\n        // log, contrôle, cachée...\n        real.operation();\n    }\n}',
          language: 'java',
        
          deepDive: `# Proxy Pattern

## Quest-ce que cest

The Proxy Pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. Instead of directly interacting with the real object, clients interact with the proxy, which acts as an intermediary. This allows you to add functionality like lazy initialization, logging, access control, or caching without modifying the original object's code.

## Syntaxe et exemples

### TypeScript Implementation

\`\`\`typescript
// Subject interface - defines the common interface for RealSubject and Proxy
interface Image {
  display(): void;
  getDimensions(): { width: number; height: number };
}

// RealSubject - the expensive object we want to lazy-load
class RealImage implements Image {
  private fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
    console.log(\`RealImage: Loading \${fileName} from disk...\`);
  }

  display(): void {
    console.log(\`RealImage: Displaying \${this.fileName}\`);
  }

  getDimensions(): { width: number; height: number } {
    return { width: 1920, height: 1080 };
  }
}

// Proxy - adds lazy loading and access control
class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  private fileName: string;
  private accessCount: number = 0;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  private loadRealImage(): RealImage {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName);
    }
    return this.realImage;
  }

  display(): void {
    this.accessCount++;
    console.log(\`ProxyImage: Access #\${this.accessCount} to \${this.fileName}\`);
    this.loadRealImage().display();
  }

  getDimensions(): { width: number; height: number } {
    return this.loadRealImage().getDimensions();
  }
}

// Usage
const image = new ProxyImage("photo.jpg");
image.display();
image.display();
\`\`\`

## Bonnes pratiques

- **Single Responsibility**: The proxy should focus on one aspect of access control (lazy loading, logging, caching, or security).
- **Interface Consistency**: Ensure the proxy implements the same interface as the real subject.
- **Lazy Initialization**: For resource-intensive objects, defer creation until absolutely necessary.
- **Composition over Inheritance**: Prefer composing the real subject within the proxy.

## Pieges courants

- **Creating Proxy Chains**: Avoid nesting multiple proxies as each layer adds complexity.
- **Leaking Real Object Reference**: Ensure the proxy never exposes a direct reference to the real object.
- **Synchronization Issues**: In concurrent environments, ensure proper thread-safety for lazy initialization.

---
Sources:
- https://refactoring.guru/design-patterns/proxy
- https://www.oodesign.com/proxy-pattern.html`},
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
        
          deepDive: `# Strategy Pattern

## Quest-ce que cest

The Strategy Pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. The pattern allows the algorithm to vary independently from clients that use it. This follows the Open/Closed Principle - open for extension but closed for modification.

## Syntaxe et exemples

### TypeScript Implementation

\`\`\`typescript
// Strategy interface - common contract for all algorithms
interface PaymentStrategy {
  pay(amount: number): Promise<{ success: boolean; transactionId: string }>;
  validate(): boolean;
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {}

  async pay(amount: number): Promise<{ success: boolean; transactionId: string }> {
    console.log(\`Processing credit card payment: $\${amount}\`);
    return { success: true, transactionId: \`CC-\${Date.now()}\` };
  }

  validate(): boolean {
    return this.cardNumber.length === 16 && this.cvv.length === 3;
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  async pay(amount: number): Promise<{ success: boolean; transactionId: string }> {
    console.log(\`Processing PayPal payment: $\${amount}\`);
    return { success: true, transactionId: \`PP-\${Date.now()}\` };
  }

  validate(): boolean {
    return this.email.includes('@');
  }
}

// Context - uses a strategy without knowing its concrete type
class ShoppingCart {
  private items: { name: string; price: number }[] = [];
  private paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  async checkout(): Promise<{ success: boolean; transactionId: string }> {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    if (!this.paymentStrategy.validate()) {
      throw new Error('Invalid payment method');
    }
    return this.paymentStrategy.pay(total);
  }
}

// Usage
const cart = new ShoppingCart(new CreditCardPayment('4111111111111111', '123'));
cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
\`\`\`

## Bonnes pratiques

- **Avoid State in Strategies**: Strategies should be stateless or immutable.
- **Single Responsibility**: Each strategy class should represent a single algorithm.
- **Common Interface**: All strategies must adhere to the same interface.
- **Functional Alternatives**: For simple algorithms, consider using lambda functions.

## Pieges courants

- **Strategy Explosion**: Too many small strategy classes can lead to class explosion.
- **Context-Strap**: Tightly coupling context to specific strategies defeats the pattern.

---
Sources:
- https://refactoring.guru/design-patterns/strategy
- https://www.oodesign.com/strategy-pattern.html`},
        {
          id: 'dp-8',
          question: 'Observer',
          answer: "Pattern où un **sujet** maintient une liste d'**observateurs** et les notifie automatiquement de tout changement d'état. C'est le principe des **événements**.\n\nLe sujet ne connaît pas les observateurs concrets — juste leur interface `Observer`. Ajout/retrait d'observateurs sans modifier le sujet (**OCP** respecté).\n\nUtilisé partout : listeners d'événements UI, `PropertyChangeListener` en Java, `EventBus`, reactive programming (`RxJS`, `Spring Events`). __Quand un objet doit réagir aux changements d'un autre sans couplage fort → Observer.__",
          code: 'interface Subject {\n    void attach(Observer o);\n    void detach(Observer o);\n    void notifyObservers();\n}\ninterface Observer {\n    void update(String message);\n}',
          language: 'java',
        
          deepDive: `# Observer Pattern

## Quest-ce que cest

The Observer Pattern is a behavioral design pattern that establishes a one-to-many dependency between objects. When the subject changes its state, all dependent observers are automatically notified. This pattern is essential for event-driven architectures and reactive programming.

## Syntaxe et exemples

### TypeScript Implementation

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
  }

  detach(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this.state));
  }

  protected updateState(newState: T): void {
    this.state = newState;
    this.notify();
  }
}

// Concrete Subject
class StoreInventory extends Observable<{ product: string; quantity: number }> {
  setQuantity(quantity: number): void {
    this.updateState({ ...this.state, quantity });
  }
}

// Concrete Observers
class EmailNotifier implements Observer<{ product: string; quantity: number }> {
  update(state: { product: string; quantity: number }): void {
    if (state.quantity < 10) {
      console.log(\`Email: Low stock alert for \${state.product}!\`);
    }
  }
}

// Usage
const inventory = new StoreInventory('Wireless Headphones');
inventory.attach(new EmailNotifier());
inventory.setQuantity(5);
\`\`\`

## Bonnes pratiques

- **Subscription Management**: Always provide a way to unsubscribe to prevent memory leaks.
- **Change Detection**: Notify observers only when state actually changes.
- **Unsubscribe on Cleanup**: In Angular, use takeUntil or async pipe for automatic cleanup.

## Pieges courants

- **Memory Leaks**: Forgetting to unsubscribe leads to memory leaks.
- **Over-Notification**: Too many notifications can cause performance issues.
- **Notification Order**: Do not assume observers are notified in any particular order.

---
Sources:
- https://refactoring.guru/design-patterns/observer
- https://rxjs.dev/guide/subscriber`},
        {
          id: 'dp-9',
          question: 'Repository',
          answer: "Pattern abstrayant la couche d'accès aux données : le **Repository** expose des méthodes métier (`trouverParNom()`, `sauvegarder()`) et cachée les détails SQL/ORM.\n\nLe code métier appelle le repository sans connaître la BDD sous-jacente. Facilite les tests (remplacement par un mock) et le changement de SGBD.\n\nEn Spring Data JPA, les interfaces `JpaRepository` implémentent ce pattern automatiquement. __Sépare la logique de persistance de la logique métier.__",
          code: 'public interface UserRepository {\n    User findById(Long id);\n    List<User> findByName(String name);\n    void save(User user);\n}',
          language: 'java',
        
          deepDive: `# Repository Pattern

## Quest-ce que cest

The Repository Pattern abstracts the data access layer, providing a collection-like interface for accessing domain objects. It bridges the gap between the domain model and the data source (database, API, file system), keeping the domain layer independent of the underlying persistence technology.

## Syntaxe et exemples

### TypeScript Implementation

\`\`\`typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filter?: { name?: string; limit?: number }): Promise<User[]>;
  save(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  delete(id: string): Promise<void>;
}

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find((u) => u.email === email) || null;
  }

  async findAll(filter?: { name?: string; limit?: number }): Promise<User[]> {
    let results = Array.from(this.users.values());
    if (filter?.name) {
      results = results.filter((u) => u.name.includes(filter.name!));
    }
    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }
    return results;
  }

  async save(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    };
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}
\`\`\`

## Bonnes pratiques

- **Interface First**: Define repository interfaces in the domain layer, implement in infrastructure.
- **Single Responsibility**: Each repository should manage a single aggregate root.
- **Async/Await**: Always return Promises from repository methods.

## Pieges courants

- **Leaking Domain Logic**: Do not put business rules in repositories.
- **Anemic Repository**: Avoid repositories that are just thin CRUD wrappers.
- **N+1 Queries**: Be mindful of lazy loading relationships.

---
Sources:
- https://martinfowler.com/eaaCatalog/repository.html
- https://designpatternsphp.readthedocs.io/en/latest/More/Repository/`},
      ],
    },
  ],
};