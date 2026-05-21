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
        
          deepDive: `# Les 4 principes de la POO

## Quest-ce que cest ?

La programmation oriente objet (POO) est un paradigme base sur le concept d'objets qui contiennent des donnees (attributs) et du code (methodes). Les quatre principes fondamentaux sont :

1. **Encapsulation** - Cacher les details internes dun objet
2. **Héritage** - Créer de nouvelles classes à partir de classes existantes
3. **Polymorphisme** - Utiliser une interface commune pour différents types
4. **Abstraction** - Simplifier la complexité en ocultant les détails non essentiels

## Syntaxe et exemples

// Java
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
}

// Python
class Animal:
    def __init__(self, nom):
        self.nom = nom
    
    def manger(self):
        print(f"{self.nom} mange")

class Chien(Animal):
    def manger(self):
        print(f"{self.nom} mange des croquettes")

## Bonnes pratiques

- Favoriser la composition sur l'héritage quand possible
- Utiliser des interfaces pour définir des contrats
- Garder les classes avec une seule responsabilité (SRP)
- Utiliser des noms descriptifs pour les classes et méthodes
- Limiter la visibilité des attributs (private/protected)

## Pièges courants

- Héritage profond (diamond problem) - éviter les hiérarchies trop profondes
- Violer le principe de substitution de Liskov (LSP)
- Exposition des données internes via attributs publics
- Couplage fort entre classes via héritage excessif

Source : [Oracle Java Documentation - Classes and Objects](https://docs.oracle.com/javase/tutorial/java/concepts/)`},
        {
          id: 'oop-2',
          question: "L'encapsulation",
          answer: "L'**encapsulation** consiste à déclarer les variables comme **privées** et contrôler leur accès via des `getters`/`setters`. Cela permet de valider les données (ex. : refuser un âge négatif dans `setAge()`) et de garantir l'intégrité.\n\nL'interface publique reste stable même si l'implémentation interne change. **Données privées + méthodes publiques = contrôle et intégrité.**",
          example: "Personne avec champ privé nom → accessible uniquement via getNom() / setNom(). On peut ajouter une validation dans setNom() pour refuser les noms vides, par exemple.",
        
          deepDive: `# L'encapsulation

## Quest-ce que cest ?

L'encapsulation est le principe qui consiste à regrouper les données (attributs) et les méthodes qui manipulent ces données dans une seule unité (la classe), tout en limitant l'accès direct aux détails internes.

L'encapsulation protège :
- L'état interne d'un objet contre les modifications non autorisées
- La complexité d'implémentationcachee derriere une interface simple
- La cohérence des données en validant les modifications

## Syntaxe et exemples

// Java - Getters et Setters
public class CompteBancaire {
    private double solde;
    private String proprietaire;
    
    public double getSolde() {
        return solde;
    }
    
    public void deposer(double montant) {
        if (montant > 0) {
            solde += montant;
        }
    }
    
    public void retirer(double montant) {
        if (montant > 0 && montant <= solde) {
            solde -= montant;
        }
    }
}

// Python - Property decorators
class CompteBancaire:
    def __init__(self, proprietaire):
        self.__solde = 0  # Attribut privé
        self.__proprietaire = proprietaire
    
    @property
    def solde(self):
        return self.__solde
    
    @solde.setter
    def solde(self, valeur):
        if valeur >= 0:
            self.__solde = valeur

## Bonnes pratiques

- Toujours declarer les attributs comme privés (private)
- Fournir des getters/setters uniquement quand nécessaire
- Valider les donnees dans les methodes de modification
- Utiliser des methodes métier plutôt que des accès directs
- Préférer l'immutabilité quand possible (final en Java, readonly en C#)

## Pièges courants

- Exposer tous les attributs comme publics
- Négliger la validation dans les setters
- Créer des getters qui retournent des objets mutables
- Oublier de gérer les cas d'erreur (valeurs négatives, null, etc.)

Source : [Oracle Java Documentation - Encapsulation](https://docs.oracle.com/javase/tutorial/java/javaOO/encapsulation.html)`},
        {
          id: 'oop-3',
          question: "L'héritage",
          answer: "L'**héritage** permet à une classe de récupérer attributs et méthodes d'une classe parente via `extends` (classe) ou `implements` (interface). Ex. : `Voiture extends Vehicule` hérite de `vitesse`, `couleur` et `rouler()`, et ajoute `activerClimatisation()`.\n\nL'héritage doit représenter une relation **« est-un »** (*is-a*). __Si ce n'est pas le cas, préférez la composition.__",
          code: 'public class Voiture extends Vehicule {\n    public void activerClimatisation() { ... }\n}',
          language: 'java',
        
          deepDive: `# L'heritage

## Quest-ce que cest ?

L'heritage est un mecanisme qui permet a une classe (classe fille/sous-classe) de recevoir les proprietés et methodes d'une autre classe (classe mere/super-classe). Cela favorise la réutilisation du code et établit une relation "est-un" entre les classes.

Types d'heritage :
- **Simple** : une classe hérite d'une seule classe (Java, C#)
- **Multiple** : une classe hérite de plusieurs classes (C++, Python)
- **Multiniveau** : héritage en cascade (A -> B -> C)
- **Hiérarchique** : plusieurs classes héritent d'une même classe

## Syntaxe et exemples

// Java - Héritage simple
public class Animal {
    protected String nom;
    
    public void manger() {
        System.out.println("Animal mange");
    }
}

public class Chien extends Animal {
    private String race;
    
    public void aboyer() {
        System.out.println(nom + " aboie");
    }
    
    @Override
    public void manger() {
        System.out.println(nom + " mange des croquettes");
    }
}

// Python - Héritage multiple
class A:
    def methode_a(self):
        print("A")

class B:
    def methode_b(self):
        print("B")

class C(A, B):
    pass

## Bonnes pratiques

- Préférer la composition à l'héritage quand les relations ne sont pas strictement "est-un"
- Utiliser le mot-clé @Override pour clarifier les intentions
- Appeler super() pour initialiser la classe parente
- Créer des interfaces pour partager des comportements sans couplage fort
- Garder les hiérarchies de classes plates (max 2-3 niveaux)

## Pièges courants

- Héritage profond créant un code difficile à maintenir
- Violation du principe de substitution de Liskov
- Utiliser l'héritage juste pour réutiliser du code (préférer la composition)
- Oublier d'appeler super() dans le constructeur
- Héritage multiple sans gérer les conflits de méthodes

Source : [Oracle Java Documentation - Inheritance](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)`},
        {
          id: 'oop-4',
          question: 'Le polymorphisme',
          answer: "Le **polymorphisme** permet à une même méthode de se comporter différemment selon l'objet. **Overriding** (redéfinition) : une sous-classe redéfinit une méthode héritée (`Forme.dessiner()` implémenté différemment par `Cercle` et `Rectangle`). **Overloading** (surcharge) : même nom de méthode avec des paramètres différents dans la même classe.\n\nPermet d'écrire du code *générique* fonctionnant avec n'importe quel sous-type.",
          code: 'abstract class Forme {\n    abstract void dessiner();\n}\nclass Cercle extends Forme {\n    void dessiner() { System.out.println("Cercle"); }\n}',
          language: 'java',
        
          deepDive: `# Le polymorphisme

## Quest-ce que cest ?

Le polymorphisme (du grec "plusieurs formes") permet à des objets de différentes classes d'être traités comme des objets d'une classe commune. Il existe deux types principaux :

1. **Polymorphisme statique (compile-time)** : résolu à la compilation
   - Surcharge de méthodes (method overloading)
   - Templates / Generics

2. **Polymorphisme dynamique (runtime)** : résolu à l'exécution
   - Substitution (method overriding)
   - Utilisation d'interfaces communes

## Syntaxe et exemples

// Java - Polymorphisme via interfaces
interface Forme {
    double calculerSurface();
}

class Cercle implements Forme {
    private double rayon;
    
    public Cercle(double rayon) {
        this.rayon = rayon;
    }
    
    @Override
    public double calculerSurface() {
        return Math.PI * rayon * rayon;
    }
}

class Rectangle implements Forme {
    private double largeur, hauteur;
    
    @Override
    public double calculerSurface() {
        return largeur * hauteur;
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
            System.out.println(f.calculerSurface());
        }
    }
}

## Bonnes pratiques

- Programmer contre des interfaces, pas des implémentations
- Utiliser le polymorphisme pour réduire la duplication de code
- Favoriser les interfaces pour découpler le code
- Les методы doivent avoir un comportement cohérent dans la hiérarchie

## Pièges courants

- Ajouter des comportements spécifiques dans une interface partagemetadata
- Violer le principe de substitution de Liskov
- Utiliser instanceof pour typer les objets (préférer le polymorphisme)
- Créer des interfaces trop larges (interface segregation principle)

Source : [Oracle Java Documentation - Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)`},
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

## Pieges courants

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
        
          deepDive: `# SURCHARGE vs REDEFINITION

## Qu'est-ce que c'est

**Surcharge (Overloading)**: Definir plusieurs methodes avec le meme nom mais des signatures differentes (parametres differents). Résolution a la compilation.

**Redefinition (Overriding)**: Une subclass fournit une implementation differente d'une methode heritee du parent. Résolution a l'exécution.

## TypeScript

### Redefinition (override)

\`\`\`typescript
class Animal {
  speak(): string {
    return 'Some sound';
  }
}

class Dog extends Animal {
  // REDEFINITION - remplace l'implementation du parent
  speak(): string {
    return 'Woof!';
  }
}

class Cat extends Animal {
  // REDEFINITION
  speak(): string {
    return 'Meow!';
  }
}

const dog = new Dog();
dog.speak(); // "Woof!" -决定了 a l'exécution selon l'objet reel
\`\`\`

### Surcharge de methodes

\`\`\`typescript
// TypeScript ne supporte pas la surcharge directe comme Java
// Mais on peut simuler avec des signatures union

class Calculator {
  // Surcharge de signatures
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.concat(b);
    }
    throw new Error('Invalid types');
  }
}

const calc = new Calculator();
calc.add(1, 2);       // 3
calc.add('a', 'b'); // "ab"
\`\`\`

## Java (surcharge vraie)

\`\`\`java
public class Calculator {
  // SURCHARGE - meme nom, signatures differentes
  public int add(int a, int b) {
    return a + b;
  }
  
  public double add(double a, double b) {
    return a + b;
  }
  
  public String add(String a, String b) {
    return a + b;
  }
  
  public int add(int a, int b, int c) {
    return a + b + c;
  }
}

// REDEFINITION
class Animal {
  protected String name;
  
  public String speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  @Override
  public String speak() { // @Override optionnel mais recommandé
    return name + " says Woof!";
  }
}
\`\`\`

### Differenciation

\`\`\`
| Aspect | Surcharge | Redefinition |
|--------|-----------|-------------|
| Quand | Compilation | Execution |
| Methode | Meme nom | Meme signature |
| Classe | Une ou plusieurs | Parent + Enfant |
| Liaison | Early binding (compile-time) | Late binding (runtime) |
| Mot-cle | Aucune | @Override (Java) / override (TS) |
| Resolution | Signatures differentes | Polymorphisme |
\`\`\`

## Bonnes pratiques

- Use \`override\` keyword en TypeScript pour expliciter la redefinition
- En Java, utilisez \`@Override\` pour detecter les erreurs de signature
- Pretez pour la surcharge quand les types de donnees differentes
- Pretez pour la redefinition quand le comportement differe selon le type
- Ne surecharger pas (max 3-4 variantes)

## Pieges courants

- Confusion surcharge/redéfinition dans les discussions d'entretien
- Oublier \`override\` en TypeScript = risque de creer une nouvelle methode
- Signatures trop similaires (ambiguite)
- Surcharge avec le meme nombre de parametres mais types differents
- Redefinir une methode sans preserve le contrat (Liskov Substitution Principle)

## Pour aller plus loin

\`\`\`typescript
// Surcharge de constructeur
class Person {
  name: string;
  
  // Surcharge
  constructor(name: string);
  constructor(name: string, age: number);
  constructor(name: string, age?: number) {
    this.name = name;
  }
}

// Methodes statiques aussi
class StringUtils {
  static reverse(s: string): string;
  static reverse(s: string, encoding: BufferEncoding): Buffer;
  static reverse(s: string, encoding?: BufferEncoding) {
    // implementation
  }
}
\`\`\`

Source: https://www.typescriptlang.org/docs/handbook/2/functions.html#overload-signatures`},
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

## Pieges courants

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

## Pieges courants

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

## Pieges courants

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
        
          deepDive: `# COUPLAGE FAIBLE / COHESION FORTE

## Qu'est-ce que c'est

**Couplage faible** (Low Coupling): Les modules dependent peu les uns des autres. Un changement dans un module n'impacte pas les autres.

**Cohesion forte** (High Cohesion): Chaque module a une responsabilite unique et bien definie. Ses elements internestravaillent ensemble pour accomplish cette tache.

## Exemples en TypeScript

\`\`\`typescript
// MAUVAIS: Fort couplage, faible cohesion
class UserManager {
  private db: MySQLConnection;
  private email: SMTPService;
  private logger: FileLogger;
  
  createUser(user: User) {
    // Creer en base
    // Envoyer email
    // Ecrire dans log
    // Et aussi: valider, hasher mot de passe, generer ID
  }
}

// BONS: Faible couplage, forte cohesion
class UserService {
  private repository: UserRepository;
  
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  
  createUser(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

class EmailService {
  sendWelcomeEmail(email: string): Promise<void> {
    // ...
  }
}

class UserRepository {
  constructor(private db: Database) {}
  
  save(user: User): Promise<User> {
    // logique de persistence
  }
}
\`\`\`

### Signaux de couplage fort

\`\`\`typescript
// Dependance directe sur implementation concrete
class OrderService {
  private mysqlRepo = new MySQLOrderRepository(); // FORT
  
  // VS injection via interface (FAIBLE)
  private repo: OrderRepository; // Interface abstraite
}

// Signaux:
// - \`new\` avec une classe concrete dans une methode
// - Appeler des methodes specifiques d'une library pas une interface
// - Modifier un module quand un autre change
\`\`\`

## Principes SOLID pour le faible couplage

\`\`\`typescript
// Dependency Inversion Principle (DIP)
// Les modules de haut niveau ne doivent pas dependre des modules de bas niveau

// MAUVAIS
class OrderService {
  private db = new MySQLDatabase(); // depend de l'implementateur
}

// BONS
interface Database {
  query(sql: string): Promise<any>;
}

class OrderService {
  constructor(private db: Database) {} // depend d'abstraction
}

// Maintenant on peut injecter MySQL, PostgreSQL, ou mock
\`\`\`

## Bonnes pratiques

- Préférez l'injection de dépendances (constructor injection)
- Utilisez des interfaces pour découpler les implémentations
- Appliquez le Single Responsibility Principle (SRP) pour la cohésion
- Favorisez la composition contre l'héritage (voir composition deep dive)
- Minimisez les imports directs entre modules non liés
- Utilisez des events/callbacks pour la communication découplée

## Pieges courants

- \`new\` dans les méthodes (couplage compile-time)
- Classes "God" qui font tout (faible cohesion)
- Imports circulaires (A importe B, B importe A)
- Chaines de dépendances tres longues (deep dependency chains)
- Couplage via singletons globaux
- Ignorer les сигналы de refactorisation quand une classe change souvent

## Pour aller plus loin

\`\`\`typescript
// Decouplage avec events (Observer pattern)
class UserService {
  constructor(private eventEmitter: EventEmitter) {}
  
  async createUser(user: User) {
    const created = await this.repository.save(user);
    this.eventEmitter.emit('user:created', created);
  }
}

// Les autres modules ecoutent sans etre couples
class AnalyticsService {
  constructor(private events: EventEmitter) {
    events.on('user:created', this.trackUser.bind(this));
  }
}
\`\`\`

Source: https://www.oreilly.com/library/view/architecture-patterns-with/9781492052197/`},
        {
          id: 'oop-11',
          question: 'Liaison dynamique',
          answer: "La **liaison dynamique** (*late binding*) détermine à l'**exécution** quelle méthode appeler selon le type réel de l'objet, pas le type de la référence. `Animal a = new Chien(); a.faireDuBruit();` → appelle `Chien.faireDuBruit()`.\n\nC'est le cœur du **polymorphisme** : une `List<Animal>` contenant `Chiens`, `Chats`, `Oiseaux` — chaque `faireDuBruit()` produit le bon son automatiquement.",
          code: 'Animal a = new Chien();\na.faireDuBruit();  // → appelle Chien.faireDuBruit()',
          language: 'java',
        
          deepDive: `# Liaison dynamique

## Quest-ce que cest ?

La liaison dynamique (dynamic binding ou late binding) est le mécanisme par lequel l'appel d'une méthode est résolu à l'exécution plutôt qu'à la compilation. Cela permet au programme de déterminer quale méthode exécuter en fonction du type réel de l'objet au moment de l'appel.

La liaison dynamique est intimement liée au polymorphisme d'héritage et permet :
- D'appeler la bonne méthode selon le type réel de l'objet
- De découpler le code appelant des classes concrètes
- D'étendre le comportement sans modifier le code existant

## Syntaxe et exemples

// Java - Liaison dynamique
public class Animal {
    public void faireDuBruit() {
        System.out.println("Animal fait du bruit");
    }
}

public class Chien extends Animal {
    @Override
    public void faireDuBruit() {
        System.out.println("Le chien aboie");
    }
}

public class Chat extends Animal {
    @Override
    public void faireDuBruit() {
        System.out.println("Le chat miaule");
    }
}

// Utilisation
public class Main {
    public static void main(String[] args) {
        Animal monAnimal = new Chien();  // Type declare : Animal
        monAnimal.faireDuBruit();        // Type reel : Chien -> aboie
        
        monAnimal = new Chat();
        monAnimal.faireDuBruit();        // Type reel : Chat -> miaule
    }
}

// Python - idem avec duck typing
class Animal:
    def faire_du_bruit(self):
        pass

class Chien(Animal):
    def faire_du_bruit(self):
        print("Le chien aboie")

class Chat(Animal):
    def faire_du_bruit(self):
        print("Le chat miaule")

def faire_parler(animal):
    animal.faire_du_bruit()

## Bonnes pratiques

- Préférer les interfaces pour typer les paramètres
- Utiliser le polymorphisme au lieu de tests de type (instanceof)
- Les méthodes surchargées doivent avoir un comportement cohérent
- Documenter quand une méthode est conçue pour être overridée

## Pièges courants

- Dépendre de liaison dynamique pour des операции critiques (performance)
- Modifier l'état de lobjet dans le constructeur avant lappel de méthodes
- Oublier le mot-clé @Override et créer une nouvelle méthode au lieu d'overrider
- Confusion entre surcharge et substitution

Source : [Oracle Java Documentation - Overriding](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)`},
      ],
    },
  ],
};