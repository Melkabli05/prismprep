import type { InterviewCategory } from '../../../../core/models/interview.models';

export const oopCategory: InterviewCategory = {
  id: 'oop',
  title: 'POO',
  color: 'background: #7C3AED; color: white',
  description: 'Programmation Orientée Objet',
  sections: [
    {
      id: 'oop-base',
      title: 'Les 4 Piliers',
      questions: [
        {
          id: 'oop-1',
          question: 'Les 4 principes de la POO',
          answer: "Les **4 piliers** : **Encapsulation** (cachéer les données internes, exposer via `getters`/`setters` pour protéger l'intégrité), **Héritage** (réutiliser le code d'une classe parente, éviter la duplication), **Polymorphisme** (une même méthode, des comportements différents selon l'objet — *flexibilité*), **Abstraction** (montrer l'essentiel, cachéer la complexité — *simplicité d'utilisation*).",
        
          deepDive: `# Les 4 piliers de la POO

## Principe

La Programmation Orientée Objet (POO) repose sur quatre piliers fondamentaux qui definissent comment structurer le code pour qu'il soit maintenable, extensible et reutilisable. Ces principes sont universels, valables quelque soit le langage (Java, C#, Python, TypeScript, etc.).

## 1. Encapsulation — Proteger les donnees

L'encapsulation consiste a cacher les details internes d'un objet et a controler l'acces a ses donnees via une interface publique (getters/setters). Cela protege l'integrite des donnees et permet de modifier l'implementation sans impacter les appelants.

### Java

\`\`\`java
public class CompteBancaire {
    private double solde;  // Donnee protegee

    public double getSolde() {
        return solde;
    }

    public void deposer(double montant) {
        if (montant > 0) {
            solde += montant;
        }
    }

    public boolean retirer(double montant) {
        if (montant > 0 && montant <= solde) {
            solde -= montant;
            return true;
        }
        return false;
    }
}
\`\`\`

### TypeScript

\`\`\`typescript
class BankAccount {
    private _balance = 0;

    get balance(): number {
        return this._balance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this._balance += amount;
        }
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            return true;
        }
        return false;
    }
}
\`\`\`

## 2. Heritage — Reutiliser le code

L'heritage permet a une classe (sous-classe) de recuperer les attributs et methodes d'une autre classe (super-classe). La relation doit representer un "est-un" (is-a).

\`\`\`java
public class Animal {
    protected String nom;

    public Animal(String nom) {
        this.nom = nom;
    }

    public void manger() {
        System.out.println(nom + " mange");
    }
}

public class Chien extends Animal {
    public Chien(String nom) {
        super(nom);
    }

    @Override
    public void manger() {
        System.out.println(nom + " mange des croquettes");
    }

    public void aboyer() {
        System.out.println(nom + " aboie");
    }
}
\`\`\`

## 3. Polymorphisme — Une interface, multiples comportements

Le polymorphisme permet a des objets de types differents de repondre a un meme message de facon appropriee. Deux formes :

**Polymorphisme dynamique (overriding)** : une sous-classe redefinit une methode heritee. Resolution a l'execution.

\`\`\`java
List<Animal> animaux = Arrays.asList(new Chien("Rex"), new Chat("Felix"));
for (Animal a : animaux) {
    a.manger();  // Chaque animal mange a sa facon
}
\`\`\`

**Polymorphisme statique (overloading)** : meme nom de methode avec des parametres differents dans la meme classe. Resolution a la compilation.

\`\`\`java
class Calculatrice {
    int addition(int a, int b) { return a + b; }
    double addition(double a, double b) { return a + b; }
    int addition(int a, int b, int c) { return a + b + c; }
}
\`\`\`

## 4. Abstraction — Cacher la complexite

L'abstraction consiste a ne montrer que l'essentiel et a cacher les details d'implementation. On utilise des classes abstraites et des interfaces.

\`\`\`java
// Interface — contrat pur
interface Drawable {
    void draw();
    double getArea();
}

abstract class Shape {
    protected String color;

    abstract double getArea();  // Sans implementation

    void setColor(String color) {  // Avec implementation
        this.color = color;
    }
}

class Circle extends Shape implements Drawable {
    private double radius;

    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}
\`\`\`

## Les 4 piliers en pratique

| Pilier | Objectif | Mecanisme |
|--------|----------|-----------|
| Encapsulation | Proteger l'integrite des donnees | private + getters/setters |
| Heritage | Reutiliser le code | extends (classe) / implements (interface) |
| Polymorphisme | Flexibilite et extensibilite | Overriding / Overloading |
| Abstraction | Simplifier la complexite | Classes abstraites / Interfaces |

## Principes SOLID en lien

Les 4 piliers sont renforces par les principes SOLID :

- **SRP** (Single Responsibility) : renforce la cohesion — un pilier par classe
- **OCP** (Open/Closed) : rendu possible par le polymorphisme
- **LSP** (Liskov Substitution) : garantit le bon usage de l'heritage
- **ISP** (Interface Segregation) : raffine l'abstraction
- **DIP** (Dependency Inversion) : rendu possible par le polymorphisme

## Bonnes pratiques

- Favoriser la composition sur l'heritage (design pattern Strategy)
- Programmer par interface, pas par implementation
- Une classe = une responsabilite (SRP)
- Heritage max 2-3 niveaux de profondeur
- Toujours utiliser @Override pour detecter les erreurs de signature

## Pièges courants

- Heritage la ou la composition suffirait
- Violation de LSP : sous-classe qui casse le contrat de la super-classe
- Exposition des donnees internes (attributs publics)
- Classes "God" qui violent tous les principes

Source : [Oracle Java Tutorial — Object-Oriented Programming Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/)
`},
        {
          id: 'oop-2',
          question: "L'encapsulation",
          answer: "L'**encapsulation** consiste à déclarer les variables comme **privées** et contrôler leur accès via des `getters`/`setters`. Cela permet de valider les données (ex. : refuser un âge négatif dans `setAge()`) et de garantir l'intégrité.\n\nL'interface publique reste stable même si l'implémentation interne change. **Données privées + méthodes publiques = contrôle et intégrité.**",
          example: "Personne avec champ privé nom → accessible uniquement via getNom() / setNom(). On peut ajouter une validation dans setNom() pour refuser les noms vides, par exemple.",
        
          deepDive: `# L'encapsulation en POO

## Principe

L'encapsulation est le pilier de la POO qui consiste a regrouper les donnees (attributs) et les methodes qui les manipulent dans une meme unite (la classe), tout en limitant l'acces direct aux details internes. C'est le mecanisme qui protege l'etat d'un objet contre les modifications non autorisees ou incoherentes.

## Les trois piliers de l'encapsulation

1. **Regroupement** : donnees et comportement dans la meme classe
2. **Protection** : attributs prives, interface publique
3. **Controle** : validation des donnees via les methodes d'acces

## Implementation en Java

### Getters et Setters avec validation

\`\`\`java
public class Personne {
    private String nom;
    private int age;
    private String email;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        if (nom == null || nom.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom ne peut pas etre vide");
        }
        this.nom = nom.trim();
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age invalide : " + age);
        }
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email != null && !email.contains("@")) {
            throw new IllegalArgumentException("Email invalide");
        }
        this.email = email;
    }
}
\`\`\`

### Sans getters/setters exposes — Methodes metier

Tous les attributs n'ont pas besoin de getters/setters. Parfois seule l'operation metier est exposee :

\`\`\`java
public class CompteBancaire {
    private double solde;
    private List<Transaction> transactions = new ArrayList<>();

    // Pas de getSolde() — on expose des methodes metier
    public void crediter(double montant, String libelle) {
        if (montant <= 0) throw new IllegalArgumentException("Montant invalide");
        solde += montant;
        transactions.add(new Transaction(montant, libelle, TypeTransaction.CREDIT));
    }

    public boolean debiter(double montant, String libelle) {
        if (montant <= 0 || montant > solde) return false;
        solde -= montant;
        transactions.add(new Transaction(montant, libelle, TypeTransaction.DEBIT));
        return true;
    }

    public List<Transaction> getHistorique() {
        return Collections.unmodifiableList(transactions); // Immutable !
    }
}
\`\`\`

## Implementation en TypeScript

\`\`\`typescript
class Employee {
    private _firstName: string;
    private _lastName: string;
    private _salary: number;

    constructor(firstName: string, lastName: string, salary: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._salary = salary;
    }

    // Getter
    get fullName(): string {
        return \\\`\\\${this._firstName} \\\${this._lastName}\\\`;
    }

    // Getter/Setter avec validation
    get salary(): number {
        return this._salary;
    }

    set salary(value: number) {
        if (value < 0) {
            throw new Error('Salary cannot be negative');
        }
        this._salary = value;
    }

    // Methode metier plutot que setter
    giveRaise(percentage: number): void {
        if (percentage <= 0 || percentage > 100) {
            throw new Error('Invalid percentage');
        }
        this._salary += this._salary * (percentage / 100);
    }
}
\`\`\`

## Comparaison des niveaux de visibilite

| Modificateur | Classe | Package | Sous-classe | Monde |
|-------------|--------|---------|-------------|-------|
| private | Oui | Non | Non | Non |
| (default/package) | Oui | Oui | Non | Non |
| protected | Oui | Oui | Oui | Non |
| public | Oui | Oui | Oui | Oui |

## Bonnes pratiques

- Toujours declarer les attributs comme \`private\`
- Exposer uniquement ce qui est necessaire (interface minimale)
- Valider les donnees dans les setters et methodes de modification
- Retourner des copies (ou collections immutables) des donnees internes
- Preferer l'immutabilite quand possible (\`final\` en Java, \`readonly\` en TypeScript)
- Ne pas creer de getters/setters systematiques — seulement si necessaire
- Utiliser des methodes metier au lieu de simples setters quand il y a une logique

## Pièges courants

- Exposer tous les attributs comme publics (pas d'encapsulation)
- Creer des getters qui retournent des references a des objets mutables (violation)
- Oublier la validation dans les setters
- Setters/getters automatiques sans reflexion (Lombok peut cacher le probleme)
- Exposer des collections internes sans defense

## Encapsulation et immutabilite

\`\`\`java
public final class ImmutablePerson {
    private final String name;
    private final List<String> hobbies;

    public ImmutablePerson(String name, List<String> hobbies) {
        this.name = name;
        this.hobbies = new ArrayList<>(hobbies);  // Copie defensive
    }

    public String getName() { return name; }

    public List<String> getHobbies() {
        return Collections.unmodifiableList(hobbies);  // Vue immuable
    }
}
\`\`\`

Source : [Oracle Java Tutorial — Encapsulation](https://docs.oracle.com/javase/tutorial/java/javaOO/encapsulation.html)
`},
        {
          id: 'oop-3',
          question: "L'héritage",
          answer: "L'**héritage** permet à une classe de récupérer attributs et méthodes d'une classe parente via `extends` (classe) ou `implements` (interface). Ex. : `Voiture extends Vehicule` hérite de `vitesse`, `couleur` et `rouler()`, et ajoute `activerClimatisation()`.\n\nL'héritage doit représenter une relation **« est-un »** (*is-a*). __Si ce n'est pas le cas, préférez la composition.__",
          code: 'public class Voiture extends Vehicule {\n    public void activerClimatisation() { ... }\n}',
          language: 'java',
        
          deepDive: `# L'heritage en POO

## Principe

L'heritage est un mecanisme qui permet a une classe (sous-classe / classe fille) de recevoir les proprietes et methodes d'une autre classe (super-classe / classe mere). Il etablit une relation "est-un" (is-a) et favorise la reutilisation du code.

## Types d'heritage

| Type | Description | Exemple | Support Java | Support TypeScript |
|------|-------------|---------|-------------|-------------------|
| Simple | Une classe herite d'une seule | A → B | Oui | Oui |
| Multiple | Une classe herite de plusieurs | A, B → C | Non (classes) | Non (classes) |
| Multiniveau | Heritage en cascade | A → B → C | Oui | Oui |
| Hierarchique | Plusieurs classes heritent d'une meme | A → B, C | Oui | Oui |

## Heritage simple en Java

\`\`\`java
// Super-classe
public class Vehicule {
    protected String marque;
    protected String modele;
    protected int vitesse;

    public Vehicule(String marque, String modele) {
        this.marque = marque;
        this.modele = modele;
        this.vitesse = 0;
    }

    public void demarrer() {
        System.out.println(marque + " " + modele + " demarre");
    }

    public void accelerer(int kmh) {
        this.vitesse += kmh;
    }

    public void freiner() {
        this.vitesse = 0;
    }
}

// Sous-classe
public class Voiture extends Vehicule {
    private int nombrePortes;

    public Voiture(String marque, String modele, int nombrePortes) {
        super(marque, modele);  // Appel du constructeur parent
        this.nombrePortes = nombrePortes;
    }

    // Redefinition (override)
    @Override
    public void demarrer() {
        System.out.println("La voiture " + marque + " " + modele + " ronronne");
    }

    // Nouvelle methode
    public void activerClimatisation() {
        System.out.println("Climatisation activee");
    }
}
\`\`\`

## Heritage en TypeScript

\`\`\`typescript
class Vehicle {
    protected brand: string;
    protected model: string;
    protected speed: number = 0;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    start(): void {
        console.log(\\\`\\\${this.brand} \\\${this.model} is starting\\\`);
    }

    accelerate(kmh: number): void {
        this.speed += kmh;
    }

    brake(): void {
        this.speed = 0;
    }
}

class Car extends Vehicle {
    constructor(brand: string, model: string, private doors: number) {
        super(brand, model);
    }

    override start(): void {
        console.log(\\\`The car \\\${this.brand} \\\${this.model} purrs\\\`);
    }

    activateAC(): void {
        console.log('AC activated');
    }
}
\`\`\`

## Le mot-cle super

\`super\` est essentiel dans l'heritage :

\`\`\`java
public class Manager extends Employee {
    private List<Employee> equipe;

    public Manager(String nom, double salaire, List<Employee> equipe) {
        super(nom, salaire);  // Doit etre la premiere ligne du constructeur
        this.equipe = equipe;
    }

    @Override
    public double getSalaire() {
        // Utilise la methode du parent puis ajoute un bonus
        return super.getSalaire() + this.calculerBonus();
    }

    private double calculerBonus() {
        return equipe.size() * 100;
    }
}
\`\`\`

## Heritage et constructeurs — Regles importantes

1. Le constructeur de la sous-classe DOIT appeler un constructeur de la super-classe
2. \`super()\` est implicite si la super-classe a un constructeur sans parametres
3. Si la super-classe a uniquement des constructeurs parametres, \`super(...)\` est obligatoire

## Le probleme du diamant

L'heritage multiple de classes est interdit en Java et TypeScript a cause du probleme du diamant :

\`\`\`
    Animal
    /    \\
 Chien  Chat
    \\    /
   ChienChat  ← Quelle methode \`manger()\` heriter ?
\`\`\`

Solution : les interfaces permettent d'heriter de plusieurs contrats sans conflit.

\`\`\`java
interface Volant {
    void voler();
}

interface Nageur {
    void nager();
}

class Canard implements Volant, Nageur {
    @Override
    public void voler() { System.out.println("Le canard vole"); }

    @Override
    public void nager() { System.out.println("Le canard nage"); }
}
\`\`\`

## Bonnes pratiques

- Relation "est-un" uniquement : ne pas heriter juste pour reutiliser du code
- Preferer la composition a l'heritage (GoF : "Favor composition over inheritance")
- Profondeur max 2-3 niveaux
- Toujours annoter avec \`@Override\` / \`override\` pour la redefinition
- Appeler \`super()\` dans le constructeur
- Utiliser \`protected\` pour les membres accessibles aux sous-classes
- Programmer par interface, pas par implementation

## Pièges courants

- Heritage profond (plus de 3 niveaux) — code difficile a maintenir
- Violation de LSP : une sous-classe qui ne se comporte pas comme sa super-classe
- Heritage pour reutiliser du code au lieu de composition
- Oublier d'appeler \`super()\` dans le constructeur
- Surcharge accidentelle (oublier \`@Override\` et creer une nouvelle methode)

Source : [Oracle Java Tutorial — Inheritance](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)
`},
        {
          id: 'oop-4',
          question: 'Le polymorphisme',
          answer: "Le **polymorphisme** permet à une même méthode de se comporter différemment selon l'objet. **Overriding** (redéfinition) : une sous-classe redéfinit une méthode héritée (`Forme.dessiner()` implémenté différemment par `Cercle` et `Rectangle`). **Overloading** (surcharge) : même nom de méthode avec des paramètres différents dans la même classe.\n\nPermet d'écrire du code *générique* fonctionnant avec n'importe quel sous-type.",
          code: 'abstract class Forme {\n    abstract void dessiner();\n}\nclass Cercle extends Forme {\n    void dessiner() { System.out.println("Cercle"); }\n}',
          language: 'java',
        
          deepDive: `# Le polymorphisme en POO

## Principe

Le polymorphisme (du grec "plusieurs formes") est la capacite d'un objet a prendre plusieurs formes. Concretement, une meme interface (methode) peut avoir des comportements differents selon le type reel de l'objet qui l'invoque. C'est le pilier qui rend le code flexible, extensible et decouple.

## Les deux formes de polymorphisme

| Type | Autre nom | Resolution | Mecanisme |
|------|-----------|------------|-----------|
| Polymorphisme statique | Overloading (surcharge) | Compilation | Meme nom, parametres differents |
| Polymorphisme dynamique | Overriding (redefinition) | Execution | Redefinition dans une sous-classe |

## Polymorphisme dynamique (overriding)

La forme la plus puissante. Le type de l'objet est determine a l'execution.

\`\`\`java
// Interface commune
interface Forme {
    double calculerSurface();
    void dessiner();
}

// Implementations concretes
class Cercle implements Forme {
    private double rayon;

    public Cercle(double rayon) {
        this.rayon = rayon;
    }

    @Override
    public double calculerSurface() {
        return Math.PI * rayon * rayon;
    }

    @Override
    public void dessiner() {
        System.out.println("Dessine un cercle de rayon " + rayon);
    }
}

class Rectangle implements Forme {
    private double largeur, hauteur;

    public Rectangle(double largeur, double hauteur) {
        this.largeur = largeur;
        this.hauteur = hauteur;
    }

    @Override
    public double calculerSurface() {
        return largeur * hauteur;
    }

    @Override
    public void dessiner() {
        System.out.println("Dessine un rectangle " + largeur + "x" + hauteur);
    }
}

// Utilisation polymorphique
public class Application {
    public static void main(String[] args) {
        List<Forme> formes = Arrays.asList(
            new Cercle(5),
            new Rectangle(4, 3)
        );

        for (Forme f : formes) {
            f.dessiner();  // Chaque forme se dessine differemment !
            System.out.println("Surface: " + f.calculerSurface());
        }
    }
}
\`\`\`

## Polymorphisme en TypeScript

\`\`\`typescript
interface PaymentProcessor {
    process(amount: number): Promise<PaymentResult>;
}

class CreditCardProcessor implements PaymentProcessor {
    async process(amount: number): Promise<PaymentResult> {
        console.log(\\\`Processing credit card payment: \\$\\\${amount}\\\`);
        return { success: true, transactionId: 'CC-' + Date.now() };
    }
}

class PayPalProcessor implements PaymentProcessor {
    async process(amount: number): Promise<PaymentResult> {
        console.log(\\\`Processing PayPal payment: \\$\\\${amount}\\\`);
        return { success: true, transactionId: 'PP-' + Date.now() };
    }
}

class CryptoProcessor implements PaymentProcessor {
    async process(amount: number): Promise<PaymentResult> {
        console.log(\\\`Processing crypto payment: \\$\\\${amount}\\\`);
        return { success: true, transactionId: 'CR-' + Date.now() };
    }
}

// Le code appelant n'a pas besoin de connaitre le type concret
class CheckoutService {
    constructor(private processor: PaymentProcessor) {}

    async checkout(amount: number): Promise<PaymentResult> {
        // Logique commune avant payment...
        const result = await this.processor.process(amount);
        // Logique commune apres payment...
        return result;
    }
}
\`\`\`

## Polymorphisme statique (overloading)

\`\`\`java
public class StringUtils {
    // Surcharge — meme nom, signatures differentes
    public String concat(String a, String b) {
        return a + b;
    }

    public String concat(String a, String b, String c) {
        return a + b + c;
    }

    public String concat(String a, String b, String separator) {
        return a + separator + b;
    }

    public String concat(List<String> strings, String separator) {
        return strings.stream().collect(Collectors.joining(separator));
    }
}
\`\`\`

## Le polymorphisme avec les generiques

\`\`\`java
// Interface generique
interface Repository<T> {
    T findById(Long id);
    List<T> findAll();
    T save(T entity);
    void delete(T entity);
}

// Implementations concretes
class UserRepository implements Repository<User> {
    @Override
    public User findById(Long id) { return em.find(User.class, id); }
    // ...
}

class ProductRepository implements Repository<Product> {
    @Override
    public Product findById(Long id) { return em.find(Product.class, id); }
    // ...
}
\`\`\`

## Le principe de substitution de Liskov (LSP)

Le polymorphisme repose sur LSP : une sous-classe doit pouvoir remplacer sa super-classe sans alterer le comportement attendu.

\`\`\`java
// MAUVAIS — viole LSP
class Rectangle {
    private int largeur, hauteur;

    public void setLargeur(int l) { this.largeur = l; }
    public void setHauteur(int h) { this.hauteur = h; }
    public int getSurface() { return largeur * hauteur; }
}

class Carre extends Rectangle {
    @Override
    public void setLargeur(int l) {
        super.setLargeur(l);
        super.setHauteur(l);  // Effet de bord surprenant !
    }
}

// BON — respecte LSP
interface Forme {
    int getSurface();
}
class Rectangle implements Forme { /* ... */ }
class Carre implements Forme { /* ... */ }
\`\`\`

## Bonnes pratiques

- Programmer par interface, pas par implementation (DIP)
- Utiliser le polymorphisme pour eviter les \`instanceof\` et \`switch\` sur les types
- Respecter LSP : les sous-classes doivent pouvoir remplacer leur super-classe
- Les methodes overridees doivent avoir un comportement coherent avec le contrat
- Utiliser \`@Override\`/\`override\` systematiquement

## Pièges courants

- Utiliser \`instanceof\` au lieu du polymorphisme
- Violer LSP avec des comportements surprenants
- Creer des interfaces trop larges (ISP)
- Surcharger au lieu de redéfinir (et vice versa)
- Oublier que la surcharge est resolue a la compilation (early binding)

Source : [Oracle Java Tutorial — Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
`},
        {
          id: 'oop-5',
          question: 'L\'abstraction: Classe abstraite vs Interface',
          answer: "**Interface** = contrat définissant des méthodes à implémenter (sauf `default methods` depuis Java 8). Une classe peut implémenter plusieurs interfaces — simule l'héritage multiple.\n\n**Classe abstraite** = peut contenir méthodes abstraites ET concrètes, constructeurs et états, mais héritage simple uniquement. **Interface** pour définir un comportement adoptable par toute classe ; **classe abstraite** quand des sous-classes partagent du code commun.",
        
          deepDive: `# CLASSE ABSTRAITE vs INTERFACE

## Qu'est-ce que c'est

**Classe abstraite**: Classe qui ne peut pas être instanciée directement. Elle peut contenir des implementations concretes en plus de methodes abstraites. Une classe ne peut heriter que d'une seule classe abstraite.

**Interface**: Contrat pur qui définit uniquement la signature des methodes (pas d'implementation). Une classe peut implementer plusieurs interfaces.

## TypeScript

\`\`\`typescript
// INTERFACE - contrat pur
interface Drawable {
  draw(): void;
  getArea(): number;
}

interface Selectable {
  select(): void;
  deselect(): void;
}

// Classe abstraite - peut avoir implementation
abstract class Shape {
  constructor(protected color: string) {}
  
  // Methode concrete
  setColor(color: string): void {
    this.color = color;
  }
  
  // Methode abstraite - subclasses doivent implementer
  abstract getArea(): number;
  
  // Methode concrete
  describe(): string {
    return \`Shape of color \${this.color}\`;
  }
}

// Une classe peut heriter d'une classe abstraite ET implementer des interfaces
class Circle extends Shape implements Drawable, Selectable {
  constructor(color: string, private radius: number) {
    super(color);
  }
  
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
  
  draw(): void {
    console.log(\`Drawing circle with radius \${this.radius}\`);
  }
  
  select(): void {
    console.log('Circle selected');
  }
  
  deselect(): void {
    console.log('Circle deselected');
  }
}
\`\`\`

## Java (comparaison)

\`\`\`java
// Interface
interface Drawable {
  void draw(); // public abstract par defaut
  default void print() { System.out.println("Printing"); } // Java 8+ default
}

// Classe abstraite
abstract class Animal {
  String name;
  
  Animal(String name) { this.name = name; }
  
  abstract void makeSound(); // sans implementation
  
  void sleep() { System.out.println(name + " sleeps"); } // avec implementation
  
  // Peut avoir constructeur
  // Peut avoir attributs d'instance
}

class Dog extends Animal implements Drawable {
  Dog(String name) { super(name); }
  
  void makeSound() { System.out.println("Woof"); }
  
  public void draw() { System.out.println("Drawing dog"); }
}
\`\`\`

## Comparaison

| Aspect | Classe Abstraite | Interface |
|--------|------------------|-----------|
| Implementations | Oui | Non (sauf default en Java 8+) |
| Heritage | Une seule | Plusieurs |
| Attributs | Oui (instance) | Non (constantes uniquement) |
| Constructeurs | Oui | Non |
| Multiple | Non | Oui |
| Quand utiliser | "est-un" avec implementation | "peut-faire" / contrat |

## Regle decisionnelle

\`\`\`
1. Est-ce qu'il y a du code partage/commun?
   -> OUI: Classe abstraite
   -> NON: Interface

2. Les subclasses ont-elles une relation "est-un" avec la classe de base?
   -> OUI: Classe abstraite

3. Une classe a-t-elle besoin de plusieurs contrats?
   -> OUI: Interface(s)

4. JavaScript/TypeScript (pas d'heritage multiple):
   -> Preferer les interfaces pour la flexibilite
   -> Classes abstraites pour le code partage entre classes qui ont une relation naturelle
\`\`\`

## Bonnes pratiques

- Pretez pour l'interface (programmation par contrat)
- Utilisez des noms explicites: \`Drawable\`, \`Persistable\`, \`Serializable\`
- Une interface par responsabilite (SRP)
- Preferer la composition a l'heritage quand la hierarchie devient profonde
- En TypeScript, \`implements\` indique clairement le contrat

## Pièges courants

- Confusion "est-un" (heritage) vs "a-un" (composition)
- Heriter de plusieurs classes abstraites en TypeScript (impossible)
- Interfaces trop generiques (\`Operable\` sans précision)
- Ajouter trop de methodes a une interface (violation SRP)
- Utiliser une classe abstraite quand une interface suffit

## Pour aller plus loin

\`\`\`typescript
// Interface comme type
function renderDrawable(item: Drawable) {
  item.draw();
}

// Multiple interfaces
type DraggableSelectable = Drawable & Selectable;

// Interface pour la programmation generique
interface Repository<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
}
\`\`\`

Source: https://www.typescriptlang.org/docs/handbook/2/classes.html`},
      ],
    },
    {
      id: 'oop-relations',
      title: 'Relations & Concepts Avancés',
      questions: [
        {
          id: 'oop-6',
          question: 'Surcharge vs Redéfinition',
          answer: "**Surcharge** (*overloading*) : mêmes noms, paramètres différents, dans la même classe — résolution à la **compilation** (liaison statique).\n\n**Redéfinition** (*overriding*) : même signature, dans une sous-classe avec `@Override` — résolution à l'**exécution** (liaison dynamique).\n\n**Surcharge** = même nom + paramètres différents + compilation. **Redéfinition** = même signature + sous-classe + exécution.",
          code: '// Surcharge\nint add(int a, int b) { return a+b; }\nint add(int a, int b, int c) { return a+b+c; }\n\n// Redéfinition\n@Override\nint add(int a, int b) { return a+b+bonus; }',
          language: 'java',
        
          deepDive: `# Surcharge vs Redefinition

## Principe

La surcharge (overloading) et la redefinition (overriding) sont deux mecanismes qui permettent d'utiliser le meme nom de methode avec des comportements differents. Ils se distinguent par leur contexte, leur moment de resolution et leur objectif.

## Tableau comparatif

| Aspect | Surcharge (Overloading) | Redefinition (Overriding) |
|--------|------------------------|--------------------------|
| Relation | Meme classe (ou classe liee) | Super-classe → Sous-classe |
| Signature | DOIT differer (parametres) | DOIT etre identique |
| Resolution | Compilation (early binding) | Execution (late binding) |
| Mot-cle | Aucun | \`@Override\` (Java) / \`override\` (TS) |
| Return type | Peut differer | Identique (ou covariant) |
| Exception | Peut differer | Meme ou sous-classe |
| Visibilite | Peut differer | Ne peut pas etre reduite |
| Static | Oui | Non (pas de override statique) |

## Surcharge (Overloading) — Meme nom, parametres differents

La surcharge definit plusieurs methodes avec le meme nom mais des signatures differentes (nombre, type, ou ordre des parametres). Resolution a la compilation.

\`\`\`java
public class Calculator {
    // Surcharge par type de parametre
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public String add(String a, String b) {
        return a + b;
    }

    // Surcharge par nombre de parametres
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
\`\`\`

### En TypeScript

TypeScript ne supporte pas la surcharge native comme Java, mais permet des signatures multiples avec une implementation unique :

\`\`\`typescript
class Calculator {
    // Signatures de surcharge
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: number, b: number, c: number): number;
    // Implementation unique
    add(a: number | string, b: number | string, c?: number): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return c !== undefined ? a + b + c : a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Type mismatch');
    }
}
\`\`\`

## Redefinition (Overriding) — Meme signature, comportement different

La redefinition permet a une sous-classe de fournir une implementation specifique d'une methode deja definie dans sa super-classe. Resolution a l'execution (late binding).

\`\`\`java
abstract class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    // Methode a redefinir
    public abstract double calculatePay();

    // Methode concrete qui peut etre redefinie
    public String getDescription() {
        return "Employee: " + name;
    }
}

class Developer extends Employee {
    private int overtimeHours;

    public Developer(String name, double baseSalary, int overtimeHours) {
        super(name, baseSalary);
        this.overtimeHours = overtimeHours;
    }

    @Override
    public double calculatePay() {
        return baseSalary + (overtimeHours * 50);
    }

    @Override
    public String getDescription() {
        return "Developer: " + name;
    }
}

class Manager extends Employee {
    private double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return baseSalary + bonus;
    }
}
\`\`\`

## Regles Java pour la redefinition

1. La methode doit avoir la meme signature (nom + parametres)
2. Le type de retour doit etre identique ou covariant (sous-type)
3. Le niveau de visibilite ne peut pas etre reduit (\`public\` ne peut pas devenir \`protected\`)
4. Seules les methodes instanciees peuvent etre redefinies (pas les static)
5. Les methodes \`final\` ne peuvent pas etre redefinies
6. Les constructeurs ne sont pas herites et ne peuvent pas etre redefinis

## Covariance du type de retour

\`\`\`java
class Parent {
    Animal getAnimal() { return new Animal(); }
}

class Child extends Parent {
    @Override
    Chien getAnimal() { return new Chien(); }  // Covariant : Chien extends Animal
}
\`\`\`

## Polymorphisme avec les methodes surchargees

\`\`\`java
class Printer {
    void print(Object o) { System.out.println("Object: " + o); }
    void print(String s) { System.out.println("String: " + s); }
    void print(Integer i) { System.out.println("Integer: " + i); }
}

// Test
Printer p = new Printer();
p.print("hello");       // String
p.print(42);            // Integer
p.print((Object) "hi"); // Object ! (resolution a la compilation)
\`\`\`

## Bonnes pratiques

- Toujours utiliser \`@Override\`/\`override\` pour la redefinition (detecte les erreurs de signature)
- Respecter le contrat de la super-classe (LSP)
- Ne pas surcharger avec le meme nombre de parametres et types differents sans raison
- Limiter la surcharge a 3-4 variantes maximum
- La redefinition doit etre coherente : ne pas changer le comportement attendu
- Ne pas redefinir une methode pour lever une exception inattendue

## Pièges courants

- Oublier \`@Override\` et creer accidentellement une nouvelle methode
- Confondre surcharge et redefinition dans les discussions techniques
- Violer LSP en redefinissant une methode avec un comportement incompatible
- Surcharger avec des types qui creent des ambiguites (ex: \`Object\` vs \`String\`)
- Croire que la redefinition s'applique aux methodes statiques (c'est du hiding)

Source : [Oracle Java Tutorial — Overriding and Hiding Methods](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)
`},
        {
          id: 'oop-7',
          question: 'Association vs Agrégation vs Composition',
          answer: "**Association** : relation faible, indépendance mutuelle (`Client` ↔ `Banque`). **Agrégation** : partie-tout où les parties existent sans le tout (`Bibliothèque` contient des `Livres`, transférables). **Composition** : partie-tout dépendant, les parties meurent avec le tout (`Maison` → `Murs`).\n\nEn code, composition = instanciation directe dans le constructeur ; agrégation = injection de dépendances. __Privilégiez la composition sur l'héritage.__",
        
          deepDive: `# ASSOCIATION vs AGGREGATION vs COMPOSITION

## Qu'est-ce que c'est

Trois types de relations entre classes, differenciees par la force du lien et la duree de vie des objets.

## Association

Relation la plus faible. Un objet utilise l'autre temporairement. Aucun ownership.

\`\`\`typescript
// L'association: Professor enseigne a Student (pas de ownership)
class Professor {
  teach(student: Student): void {
    // Le professor "utilise" l'etudiant
    console.log(\`Teaching \${student.name}\`);
  }
}

class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const professor = new Professor();
const student = new Student('Alice');
professor.teach(student);
// Les deux objets existent independamment
\`\`\`

## Aggregation

Relation "a-un" (has-a) faible. Un objet contient une reference a l'autre, mais l'autre peut exister independamment. L'ensemble ne controle pas la creation/suppression du composant.

\`\`\`typescript
// Aggregation: University "a" des Departments (les Departments existent independamment)
class Department {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class University {
  name: string;
  departments: Department[] = []; // Reference, pas ownership fort
  
  addDepartment(dept: Department) {
    this.departments.push(dept);
  }
  
  // University peut exister sans departments
  // Les departments peuvent exister sans University
}

const dept = new Department('CS');
const uni = new University();
uni.addDepartment(dept);
\`\`\`

## Composition

Relation "a-un" FORTE. L'objet控制了 la creation et la destruction du composant. Si l'objet pere est detruit, le composant est aussi detruit.

\`\`\`typescript
// Composition: Car "a" un Engine (l'engine ne peut pas exister independamment du Car)
class Engine {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

class Car {
  make: string;
  model: string;
  private engine: Engine; // Composition - ownership fort
  
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
    // Car cree et controle l'engine
    this.engine = new Engine('V8');
  }
  
  // L'engine meurt avec la voiture
}

const car = new Car('Toyota', 'Camry');
// Si car est garbage collected, engine l'est aussi
\`\`\`

## Diagramme UML

\`\`\`
Association:     A --------> B       (fleche simple)
Aggregation:      A <>-------> B     (fleche avec losange vide)
Composition:      A <●-------> B     (fleche avec losange plein)
\`\`\`

## Comparaison

| Aspect | Association | Aggregation | Composition |
|--------|-------------|-------------|-------------|
| Force | Faible | Moderee | Forte |
| Ownership | Aucun | Partiel | Complet |
| Destruction | Independante | Independante | Liee |
| Lifetime | Courte | Variable | Same as owner |
| Example | Professor/Student | University/Department | Car/Engine |

## Bonnes pratiques

- Identifiez si l'objet controle la creation et destruction de l'autre
- Preferer la composition (plus flexible) a l'heritage
- Utilisez l'aggregation pour les relations "contains but can exist alone"
- Les referencias faibles (weak references) sont un signe d'aggregation

## Pièges courants

- Confondre aggregation et composition (l'un des pieges favoris en entretien)
- Utiliser l'heritage quand une composition suffit
- Creer des references circulaires (A reference B, B reference A)
- Oublier de setter null quand l'objet contenu doit être libere

## Pour aller plus loin

\`\`\`typescript
// Aggregation: le contenant ne detruit pas les composants
class Library {
  private books: Book[];
  
  removeBook(book: Book) {
    // Le livre continue d'exister apres removal
    this.books = this.books.filter(b => b !== book);
  }
}

// Composition: le pere detruit les composants
class Document {
  private paragraphs: Paragraph[] = [];
  
  addParagraph(text: string) {
    this.paragraphs.push(new Paragraph(text)); // Cree par Document
  }
  
  destroy() {
    // Detruit tous les paragraphs
    this.paragraphs = [];
  }
}
\`\`\`

Source: https://www.uml.org.cn/Object-Oriented/upload/202109161.pdf`},
        {
          id: 'oop-8',
          question: 'Composition vs Héritage',
          answer: "L'**héritage** crée une relation *« est-un »* forte et statique (définie à la compilation). La **composition** crée une relation *« a-un »* flexible et dynamique (modifiable au runtime via injection).\n\nProblèmes de l'héritage : couplage fort (changement parent → impact enfants), hiérarchie rigide, impossible de changer à l'exécution. La composition permet de combiner des comportements librement et de les remplacer.\n\n__Règle : préférez la composition. Utilisez l'héritage seulement si la relation « est-un » est véritable et stable.__",
          example: "Un Canard qui vole → composition avec ComportementVol (modifiable) plutôt que héritage de OiseauVolant (figé).",
        
          deepDive: `# COMPOSITION vs HERITAGE

## Qu'est-ce que c'est

**Heritage**: Une classe enfant herite des attributs et methodes d'une classe parent. Relation "est-un" (is-a).

**Composition**: Une classe contient une instance d'une autre classe comme attribut. Relation "a-un" (has-a).

## Heritage (is-a)

\`\`\`typescript
// Heritage: Dog EST UN Animal
class Animal {
  name: string;
  
  eat(): void {
    console.log(\`\${this.name} eats\`);
  }
  
  sleep(): void {
    console.log(\`\${this.name} sleeps\`);
  }
}

class Dog extends Animal {
  breed: string;
  
  bark(): void {
    console.log(\`\${this.name} barks\`);
  }
  
  // Dog herite eat() et sleep() de Animal
  // Dog EST UN Animal
}

const dog = new Dog('Rex');
dog.eat();    // herite de Animal
dog.sleep();   // herite de Animal
dog.bark();    // propre a Dog
\`\`\`

## Composition (has-a)

\`\`\`typescript
// Composition: Car A UN Engine (pas "est un")
class Engine {
  cylinders: number;
  
  start(): void {
    console.log('Engine starting');
  }
}

class Car {
  make: string;
  // Composition: Car a un Engine
  private engine: Engine;
  
  constructor() {
    this.engine = new Engine(); // Composition
  }
  
  start(): void {
    this.engine.start(); // Delegation
  }
  
  // Car nest pas un Engine
  // Car a un Engine
}
\`\`\`

## Problemes avec l'heritage

\`\`\`typescript
// Probleme: Hiérarchie rigide et diamond problem
//         Animal
//        /     \\
       //      Mammal   Bird (heritage multiple si許可)
//          |      |
//         Dog    Bat (que se passe-t-il?)

// Probleme: Une classe ne peut heriter que d'une seule parent
// Et si Dog doit etre un Animal ET un Robot?

// Solution: Composition
class RobotDog {
  private animal: Animal;
  private robot: Robot;
  // Les deux comportements combines sans heritage multiple
}
\`\`\`

## Composition avancee (dependency injection)

\`\`\`typescript
// Interface pour decoupler
interface Drawable {
  draw(): void;
}

interface Saveable {
  save(): void;
}

// Classe avec composition multiple via interfaces
class Document implements Drawable, Saveable {
  private content: string;
  
  draw(): void {
    console.log('Drawing document');
  }
  
  save(): void {
    console.log('Saving document');
  }
}

// Exemple: un object peutavoir plusieurs comportements
class GameObject {
  private renderer: Drawable;
  private physics: Physics;
  
  constructor(renderer: Drawable, physics: Physics) {
    this.renderer = renderer;
    this.physics = physics;
  }
}
\`\`\`

## Comparaison

| Aspect | Heritage | Composition |
|--------|----------|-------------|
| Relation | "est-un" | "a-un" |
| Flexibilite | Faible | Haute |
| Dynamique | Non | Oui (via interfaces) |
| Couplage | Fort | Faible |
| Reutilisation | Limitee a la hierarchie | Multiple sources |
| Tresses | Unique | Plusieurs |

## Bonnes pratiques

- Pretez pour la composition quand il y a plusieurs sources de comportement
- Utilisez l'heritage pour une relation "est-un" naturelle et stable
- Limitez la profondeur de l'heritage a 2-3 niveaux maximum
- Evitez l'heritage multiple — utiliser les interfaces
- Favorisez "composition over inheritance" (Design Patterns, Gang of Four)

## Pièges courants

- Heritage pour reutiliser du code au lieu de composition
- Hierarchies profondes et rigides
- "God classes" qui heritent de tout
- Changer le comportement a runtime impossible avec heritage
- Confusion entre "should-be" et "has-a" relationships

## Pour aller plus loin

\`\`\`typescript
// Composition avec strategy pattern
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    // write to file
  }
}

class Application {
  private logger: Logger; // Composition via interface
  
  constructor(logger: Logger) {
    this.logger = logger;
  }
  
  doWork() {
    this.logger.log('Working');
  }
}
\`\`\`

Source: https://www.oreilly.com/library/view/design-patterns-elements/0201633612/`},
        {
          id: 'oop-9',
          question: "Pourquoi pas d'héritage multiple en Java ?",
          answer: "Java interdit l'**héritage multiple** de classes à cause du **problème du diamant** : si `B` et `C` héritent de `A` et redéfinissent une méthode différemment, laquelle `D` (héritant de `B` et `C`) utilise-t-elle ?\n\nC++ le permet mais au prix d'une grande complexité. Java autorise l'implémentation de **plusieurs interfaces** à la place. Depuis Java 8, les `default methods` recréent partiellement le problème, mais avec des règles de résolution claires.",
        
          deepDive: `# POURQUOI PAS D'HERITAGE MULTIPLE EN JAVA

## Qu'est-ce que c'est

Java n'autorise pas l'heritage multiple de classes (une classe ne peut etendre qu'une seule classe). Cette decision estliee au "Diamond Problem" et auxambiguités de resolution.

## Le Diamond Problem

\`\`\`
      A
     / \\n    B   C
     \\ /
      D
\`\`\`

Si B et C definissent la meme methode \`doSomething()\`, et D herite de B et C, quelle version D doit-elle utiliser?

### En Java (sans heritage multiple)

\`\`\`java
class A {
  void doSomething() {
    System.out.println('A doing');
  }
}

class B extends A {
  // herite doSomething() de A
}

class C extends A {
  // herite doSomething() de A
}

// Impossible en Java:
// class D extends B, C { } // COMPILE ERROR

// Solution: Interfaces (Java 8+)
interface Runnable {
  default void doSomething() {
    System.out.println('Runnable doing');
  }
}

class D extends A implements Runnable {
  // Pas de conflit car Runnable.doSomething() est la seule option
}
\`\`\`

## C++ (avec heritage multiple)

\`\`\`cpp
class A {
  void doSomething() { std::cout << 'A'; }
};

class B : public A {};
class C : public A {};

class D : public B, public C {
  // Diamond! B::doSomething() vs C::doSomething()
  // En C++, il faut specifier explicitement:
  void doSomething() override {
    B::doSomething(); // Appeler B
    // ou C::doSomething();
  }
};
\`\`\`

## Solutions en Java pour palier l'absence

### 1. Interfaces

\`\`\`java
interface Flyable {
  void fly();
}

interface Swimmable {
  void swim();
}

class Duck implements Flyable, Swimmable {
  public void fly() { /* ... */ }
  public void swim() { /* ... */ }
}
\`\`\`

### 2. Classes abstraites (une seule)

\`\`\`java
abstract class Animal {
  abstract void eat();
}

abstract class Bird extends Animal {
  abstract void fly();
}

// Si on veut un Duck qui peut nager et voler,
// on ne peut pas faire: class Duck extends Bird, Swimmable
// Mais on peut: class Duck extends Bird implements Swimmable
\`\`\`

### 3. Composition (preferree)

\`\`\`java
class Robot {
  private FlyBehavior flyBehavior;
  private SwimBehavior swimBehavior;
  
  void fly() { flyBehavior.fly(); }
  void swim() { swimBehavior.swim(); }
}

// Robot peut avoir plusieurs comportements sans heritage multiple
\`\`\`

## Pourquoi Java a fait ce choix

| Raison | Explication |
|--------|------------|
| Simplicite | Pas de complexe resolutions order |
| Diamond Problem | Elimine les ambiguites de methodes |
| SOLID | Favorise la composition sur l'heritage |
| Design | Interface + classe abstraite = design clair |

## TypeScript

TypeScript permet l'heritage multiple via les interfaces (pas de diamond car pas d'implementation):

\`\`\`typescript
interface A {
  doIt(): void;
}

interface B extends A {
  doIt(): void; // Redefinition autorisee
}

interface C extends A {
  doIt(): void;
}

interface D extends B, C {
  // D herite de B et C, mais pas de conflit car ce sont des contrats
}
\`\`\`

## Bonnes pratiques

- Utilisez des interfaces pour implementer plusieurs contrats
- Pretez pour la composition (has-a) sur l'heritage (is-a)
- Limitez l'heritage de classe a une seule classe parente
- Utilisez des classes abstraites pour le code partage, interfaces pour les contrats

## Pièges courants

- Vouloir faire heriter une classe de deux classes concretes
- Confusion: "Je veux que ma classe ait ces deux comportements" = interfaces, pas heritage multiple
- Utiliser l'heritage pour partager du code au lieu de la composition

## Pour aller plus loin

\`\`\`java
// Pattern decoration (composition multiple en runtime)
interface Coffee {
  String getDescription();
  double getCost();
}

class SimpleCoffee implements Coffee {
  public String getDescription() { return 'Simple coffee'; }
  public double getCost() { return 2.0; }
}

class MilkCoffee extends SimpleCoffee {
  public String getDescription() { return super.getDescription() + ', milk'; }
  public double getCost() { return super.getCost() + 0.5; }
}

//milk et sugar composes dynamiquement
extras.getDescription(); // "Simple coffee, milk, sugar"
\`\`\`

Source: https://docs.oracle.com/javase/tutorial/java/IandI/multiple.html`},
        {
          id: 'oop-10',
          question: 'Couplage faible / Cohésion forte',
          answer: "**Couplage faible** = classes peu dépendantes entre elles ; modifier une classe n'impacte pas les autres. On le réduit avec des interfaces, l'injection de dépendances et le principe de responsabilité unique.\n\n**Cohésion forte** = une classe fait une seule chose et la fait bien ; faible cohésion = classe à découpquer. __Couplage faible + cohésion forte = design robuste et maintenable.__",
        
          deepDive: `# Couplage faible et Cohesion forte

## Principe

Le couplage faible (low coupling) et la cohesion forte (high cohesion) sont deux objectifs de conception fondamentaux en genie logiciel. Ils mesurent respectivement le degre de dependance entre modules et le degre de focalisation au sein d'un meme module.

- **Couplage faible** : les modules dependent peu les uns des autres. Un changement dans un module impacte minimalement les autres.
- **Cohesion forte** : un module a une responsabilite unique et bien definie. Ses elements internes travaillent ensemble pour accomplir cette tache.

## Couplage — Du fort au faible

### Couplage FORT (a eviter)

\`\`\`typescript
// MAUVAIS : Couplage fort par heritage et dependance concrete
class MySQLDatabase {
    connect(): void { /* ... */ }
    query(sql: string): any[] { /* ... */ }
}

class UserService {
    private db = new MySQLDatabase();  // Dependance concrete

    getUsers(): any[] {
        this.db.connect();
        return this.db.query('SELECT * FROM users');
    }
}
// Si on passe de MySQL a PostgreSQL, on doit modifier UserService
\`\`\`

### Couplage FAIBLE (a viser)

\`\`\`typescript
// BON : Couplage faible via interface et injection
interface Database {
    connect(): void;
    query(sql: string): any[];
}

class MySQLDatabase implements Database {
    connect(): void { /* ... */ }
    query(sql: string): any[] { /* ... */ }
}

class PostgreSQLDatabase implements Database {
    connect(): void { /* ... */ }
    query(sql: string): any[] { /* ... */ }
}

class UserService {
    constructor(private db: Database) {}  // Injection de dependance
    // UserService ne connait que l'interface Database
    // On peut changer MySQL → PostgreSQL sans modifier UserService
}
\`\`\`

### Les differentes formes de couplage (du pire au meilleur)

| Type de couplage | Description | Niveau |
|------------------|-------------|--------|
| Content | Un module modifie les donnees internes d'un autre | Pire |
| Common | Modules partagent des donnees globales | Mauvais |
| Control | Un module controle le flux d'un autre | Mauvais |
| Stamp | Un module recoit une structure de donnees complete | Moyen |
| Data | Unmodule passe des donnees simples (primitives) | Bon |
| Message | Communication via messages/evenements | Excellent |
| None | Aucune dependance | Ideal |

## Cohesion — Du faible au fort

### Cohesion FAIBLE (a eviter)

\`\`\`typescript
// MAUVAIS : Faible cohesion — la classe fait tout
class GodClass {
    readFile(path: string): string { /* ... */ }
    sendEmail(to: string, body: string) { /* ... */ }
    generateReport(): string { /* ... */ }
    validateUser(user: any): boolean { /* ... */ }
    calculateTax(amount: number): number { /* ... */ }
    renderHTML(): string { /* ... */ }
}
\`\`\`

### Cohesion FORTE (a viser)

\`\`\`typescript
// BON : Forte cohesion — chaque classe a une responsabilite unique
class UserValidator {
    validate(user: User): ValidationResult {
        if (!user.email.includes('@')) {
            return { valid: false, error: 'Invalid email' };
        }
        if (user.age < 0 || user.age > 150) {
            return { valid: false, error: 'Invalid age' };
        }
        return { valid: true };
    }
}

class EmailService {
    constructor(private transporter: MailTransporter) {}

    async sendWelcomeEmail(user: User): Promise<void> {
        const html = await this.renderTemplate('welcome', { name: user.name });
        await this.transporter.send({
            to: user.email,
            subject: 'Bienvenue !',
            html
        });
    }

    private async renderTemplate(name: string, data: any): Promise<string> {
        // ...
    }
}

class UserRepository {
    constructor(private db: Database) {}

    async save(user: User): Promise<User> {
        return this.db.insert('users', user);
    }

    async findById(id: number): Promise<User | null> {
        return this.db.findOne('users', { id });
    }
}
\`\`\`

## Application avec les principes SOLID

\`\`\`typescript
// Application des 5 principes pour couplage faible + cohesion forte

// SRP : UserRepository ne fait que la persistence
// OCP : On peut ajouter un AuditLogRepository sans modifier UserRepository
// LSP : Toute implementation de Database peut remplacer l'autre
// ISP : Database a une interface minimale
// DIP : UserService depend d'abstraction (Database) pas de concretion (MySQL)

interface Logger {
    info(message: string): void;
    error(message: string, error: Error): void;
}

interface EventBus {
    emit(event: string, data: any): void;
    on(event: string, handler: (data: any) => void): void;
}

class OrderService {
    constructor(
        private repo: OrderRepository,
        private logger: Logger,
        private events: EventBus,
        private emailService: EmailService
    ) {}

    async createOrder(order: CreateOrderDto): Promise<Order> {
        this.logger.info('Creating order');

        const created = await this.repo.save(order);

        this.events.emit('order:created', created);
        await this.emailService.sendConfirmation(created);

        return created;
    }
}
\`\`\`

## Indices de mauvais design (code smells)

### Couplage fort
- Changer un module force des changements dans d'autres modules
- Tests difficiles (besoin de beaucoup de mocks)
- \`new\` avec des classes concretes dans les methodes
- Imports directs entre modules non lies
- Singletons globaux utilises comme dependances cachees
- Chaines de methodes longues (train wreck : \`a.getB().getC().doSomething()\`)

### Faible cohesion
- Classes nommees \`Util\`, \`Helper\`, \`Manager\`, \`Service\` tres generiques
- Methodes qui n'utilisent pas les memes attributs
- Imports varies dans une meme classe
- Test unitaire difficile a nommer / trop long
- Plus de 200 lignes dans une classe

## Mesure pragmatique

\`\`\`typescript
// Poser ces questions pour chaque classe :
// 1. "Est-ce que je peux decrire son role en une phrase ?"
//    → Non = faible cohesion
// 2. "Si cette interface change, combien de classes sont impactees ?"
//    → Beaucoup = couplage fort
// 3. "Puis-je tester cette classe en isolant ses dependances ?"
//    → Non = couplage fort
// 4. "Est-ce que cette classe a une raison de changer ?"
//    → Plus d'une = faible cohesion (SRP)
\`\`\`

## Bonnes pratiques

- Injection de dependances (constructeur) plutot que creation directe
- Interfaces pour decoupler les implementations
- SRP : une classe = une responsabilite
- Composition sur heritage
- Evenements/observers pour la communication decouplee
- Tests unitaires faciles a ecrire = bon signe
- Reviser regulierement les dependances entre modules

Source : [Wikipedia — Coupling and Cohesion](https://en.wikipedia.org/wiki/Coupling_(computer_programming))
`},
        {
          id: 'oop-11',
          question: 'Liaison dynamique',
          answer: "La **liaison dynamique** (*late binding*) détermine à l'**exécution** quelle méthode appeler selon le type réel de l'objet, pas le type de la référence. `Animal a = new Chien(); a.faireDuBruit();` → appelle `Chien.faireDuBruit()`.\n\nC'est le cœur du **polymorphisme** : une `List<Animal>` contenant `Chiens`, `Chats`, `Oiseaux` — chaque `faireDuBruit()` produit le bon son automatiquement.",
          code: 'Animal a = new Chien();\na.faireDuBruit();  // → appelle Chien.faireDuBruit()',
          language: 'java',
        
          deepDive: `# Liaison dynamique (Late Binding)

## Principe

La liaison dynamique (dynamic binding ou late binding) est le mecanisme par lequel l'appel d'une methode est resolu a l'execution plutot qu'a la compilation. Cela permet au programme de determiner quelle methode executer en fonction du **type reel** de l'objet au moment de l'appel, pas du type declare de la reference.

C'est le fondement du polymorphisme dynamique (overriding).

## Liaison statique vs Liaison dynamique

| Aspect | Liaison statique (early binding) | Liaison dynamique (late binding) |
|--------|----------------------------------|----------------------------------|
| Resolution | A la compilation | A l'execution |
| Mecanisme | Surcharge (overloading) | Redefinition (overriding) |
| Performance | Plus rapide | Cout minimal (vtable lookup) |
| Flexibilite | Faible | Elevee |
| Type utilise | Type declare de la reference | Type reel de l'objet |

## Exemple fondamental en Java

\`\`\`java
class Animal {
    public void faireDuBruit() {
        System.out.println("Un animal fait du bruit");
    }
}

class Chien extends Animal {
    @Override
    public void faireDuBruit() {
        System.out.println("Le chien aboie : Ouaf !");
    }
}

class Chat extends Animal {
    @Override
    public void faireDuBruit() {
        System.out.println("Le chat miaule : Miaou !");
    }
}

public class TestLiaison {
    public static void main(String[] args) {
        // Type declare = Animal, type reel = Chien
        Animal monAnimal = new Chien();
        monAnimal.faireDuBruit();  // "Le chien aboie : Ouaf !"

        // Meme reference, nouveau type reel
        monAnimal = new Chat();
        monAnimal.faireDuBruit();  // "Le chat miaule : Miaou !"

        // La methode appellee depend du TYPE REEL (liaison dynamique)
    }
}
\`\`\`

## Comment ca marche en interne (vtable)

Le compilateur cree une **table virtuelle** (vtable) pour chaque classe contenant des methodes overrideables :

\`\`\`java
// Representation conceptuelle de la vtable
class Animal {
    // vtable implicite :
    // [0] -> Animal.faireDuBruit()
}

class Chien extends Animal {
    // vtable (heritee et modifiee) :
    // [0] -> Chien.faireDuBruit()  // Remplace l'entree
    // [1] -> Chien.aboyer()        // Nouvelle entree
}

// A l'execution, monAnimal.faireDuBruit() est compile en :
// monAnimal.vtable[0]()  -- resolution via l'index, pas le nom
\`\`\`

## Liaison dynamique avec les interfaces

\`\`\`java
interface Payable {
    double calculerSalaire();
}

class Employe implements Payable {
    private String nom;
    private double tauxHoraire;
    private int heures;

    @Override
    public double calculerSalaire() {
        return tauxHoraire * heures;
    }
}

class Consultant implements Payable {
    private double montantForfait;

    @Override
    public double calculerSalaire() {
        return montantForfait;
    }

    public void facturer() {
        System.out.println("Facture envoyee");
    }
}

// Tout le code qui manipule Payable beneficie du polymorphisme
class PaieService {
    public void traiterPaiement(Payable employe) {
        double salaire = employe.calculerSalaire();  // Liaison dynamique !
        System.out.println("Paiement : " + salaire);
        // employe.facturer() — PAS accessible, type declare = Payable
    }
}
\`\`\`

## Liaison dynamique en TypeScript

\`\`\`typescript
abstract class NotificationSender {
    abstract send(message: string): Promise<void>;

    sendWithLogging(message: string): Promise<void> {
        console.log(\\\`Sending: \\\${message.substring(0, 50)}...\\\`);
        return this.send(message);  // Liaison dynamique !
    }
}

class EmailSender extends NotificationSender {
    async send(message: string): Promise<void> {
        // Envoi par email
        console.log('Email sent');
    }
}

class SMSSender extends NotificationSender {
    async send(message: string): Promise<void> {
        // Envoi par SMS
        console.log('SMS sent');
    }
}

async function notifyAll(senders: NotificationSender[], message: string) {
    for (const sender of senders) {
        await sender.sendWithLogging(message);
        // sender.send() est appele via liaison dynamique
    }
}
\`\`\`

## Liaison dynamique et performance

Le cout de la liaison dynamique est minimal dans les JVM modernes :

1. **Appel standard** : look-up dans la vtable (quelques instructions CPU)
2. **JIT compilation** : le JIT inline les methodes hot, eliminant la vtable lookup
3. **Monomorphic call site** : si la JVM voit toujours le meme type, elle optimise completement

\`\`\`java
// Boucle chaude — la JIT va optimiser
for (int i = 0; i < 1000000; i++) {
    animal.faireDuBruit();  // Premier appel : vtable, puis JIT inline
}
\`\`\`

## Pièges lies a la liaison dynamique

### 1. Appel de methode overrideable dans le constructeur

\`\`\`java
class Parent {
    Parent() {
        init();  // DANGER : appelle la version de l'enfant avant que l'enfant soit initialise
    }
    void init() { System.out.println("Parent init"); }
}

class Child extends Parent {
    private String value = "hello";

    Child() {
        super();  // Appelle Parent() → init() → Child.init() avant que value soit initialisee
    }

    @Override
    void init() {
        System.out.println(value.toUpperCase());  // NullPointerException !
    }
}
\`\`\`

### 2. Confusion avec les methodes statiques

Les methodes statiques utilisent la **liaison statique** (early binding) :

\`\`\`java
class Animal {
    static void type() { System.out.println("Animal"); }
}

class Chien extends Animal {
    static void type() { System.out.println("Chien"); }  // Hiding, pas overriding
}

// Test
Animal a = new Chien();
a.type();  // "Animal" — pas de liaison dynamique pour les statiques !
\`\`\`

## Bonnes pratiques

- Programmer par interface : le polymorphisme (liaison dynamique) est alors automatique
- Ne pas appeler de methodes overrideables dans les constructeurs
- Utiliser \`@Override\` / \`override\` systematiquement
- Documenter les methodes conçues pour etre overridees
- Les performances ne sont pas une raison pour eviter le polymorphisme en Java moderne

Source : [Oracle Java Tutorial — Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
`},
      ],
    },
  ],
};