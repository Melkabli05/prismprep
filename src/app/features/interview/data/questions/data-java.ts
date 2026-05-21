import type { InterviewCategory } from '../../../../core/models/interview.models';

export const javaCategory: InterviewCategory = {
  id: 'java',
  title: 'Java',
  color: 'background: var(--color-success); color: white',
  description: 'Java Core, Collections, Concurrence',
  sections: [
    {
      id: 'java-fondamentaux',
      title: 'Fondamentaux',
      questions: [
        {
          id: 'java-1',
          question: "Modificateurs d'accès",
          answer: "Quatre niveaux du plus restrictif au plus ouvert : **`private`** (classe uniquement), **`default`/`package`** (même package), **`protected`** (package + sous-classes), **`public`** (accès total).\n\nLe principe est d'utiliser le niveau __le plus restrictif possible__ — un champ devrait presque toujours être `private` avec des *getters/setters*.",
        
          deepDive: `# Les modificateurs d'accès en Java

## Qu'est-ce que c'est ?

Les modificateurs d'accès en Java contrôlent la visibilité des classes, méthodes et attributs. Ils définissent qui peut accéder à quoi dans votre code Java.

## Syntaxe et exemples

\`\`\`java
public class MaClasse {
    public String attributPublic;      // Accessible partout
    protected String attributProtege; // Accessible dans le package + sous-classes
    String attributPackage;          // Accessible dans le package uniquement
    private String attributPrive;    // Accessible dans cette classe uniquement
}
\`\`\`

| Modificateur | Classe | Package | Sous-classe | Monde |
|-------------|--------|---------|-------------|-------|
| \`private\` | ✓ | ✗ | ✗ | ✗ |
| default (aucun) | ✓ | ✓ | ✗ | ✗ |
| \`protected\` | ✓ | ✓ | ✓ | ✗ |
| \`public\` | ✓ | ✓ | ✓ | ✓ |

### Exemple avec private

\`\`\`java
public class Utilisateur {
    private String motDePasse;

    private boolean validerMotDePasse(String mdp) {
        return this.motDePasse.equals(mdp);
    }

    public void changerMotDePasse(String ancien, String nouveau) {
        if (validerMotDePasse(ancien)) {
            this.motDePasse = nouveau;
        }
    }
}
\`\`\`

### Exemple avec protected

\`\`\`java
public class Animal {
    protected String nom;
    protected void decrire() {
        System.out.println("Animal: " + nom);
    }
}

public class Chien extends Animal {
    public void presenter() {
        this.nom = "Rex";      // ✓ Via héritage
        this.decrire();        // ✓ Via héritage
    }
}
\`\`\`

## Bonnes pratiques

1. **Utilisez \`private\` par défaut** — encapsulez les champs internes
2. **\`protected\` pour les hooks** — méthodes conçues pour être surchargées
3. **\`public\` pour l'API** — méthodes meant to be used by other classes
4. **Évitez le modificateur default** — sa signification implicite est source de confusion

## Pièges courants

1. **Ne rendez jamais un champ \`public\`** — utilisez des getters/setters
2. **Attention aux classes inner static vs non-static** — les-inner non-static ont accès aux champs de l'instance
3. **\`private\` ne signifie pas immutable** — utilisez \`final\` pour cela

Source : [Oracle Java Documentation — Controlling Access](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)`},
        {
          id: 'java-2',
          question: 'static',
          answer: "**`static`** signifie que le membre appartient à la classe, pas à l'instance. Une variable `static` est partagée entre toutes les instances ; une méthode `static` s'appelle sans instancier (ex. `Math.PI`). `this` est interdit dans un contexte `static`.\n\nUtile pour constantes, utilitaires, compteurs partagés. __À utiliser avec modération__ : trop de `static` = design procédural, et les méthodes `static` sont difficiles à *mocker*.",
          example: "Math.PI — pas besoin de new Math().",
        
          deepDive: `# Le modificateur static en Java

## Qu'est-ce que c'est ?

Le mot-clé \`static\` en Java signifie qu'un membre (attribut ou méthode) appartient à la classe elle-même, et non à une instance particulière. Il est partagé par toutes les instances de la classe.

## Syntaxe et exemples

### static appliqué aux champs

\`\`\`java
public class Compteur {
    public static int instanceCount = 0;

    public Compteur() {
        instanceCount++;
    }
}

Compteur c1 = new Compteur();
Compteur c2 = new Compteur();

System.out.println(Compteur.instanceCount);  // 2
\`\`\`

Les champs \`static\` sont parfaits pour :
- **Compteurs** partagés par toutes les instances
- **Constantes** liées à la classe (avec \`final\`)
- **Configuration** commune à toutes les instances

### static appliqué aux méthodes

\`\`\`java
public class MathHelper {
    public static int doubler(int x) {
        return x * 2;
    }
}

int result = MathHelper.doubler(5);  // 10
\`\`\`

### Restrictions des méthodes static

Une méthode \`static\` ne peut PAS :
- Accéder à \`this\` ou \`super\`
- Appeler directement une méthode non-static

\`\`\`java
public class Exemple {
    private int instanceVar = 10;

    public static void bonExemple(Exemple e) {
        System.out.println(e.instanceVar);  // OK via instance
    }
}
\`\`\`

### Bloc d'initialisation static

\`\`\`java
public class Config {
    public static final String DB_URL;

    static {
        DB_URL = System.getenv("DB_URL");
    }
}
\`\`\`

### Inner classes static

\`\`\`java
public class Externe {
    public static class Interne { }
}

Externe.Interne obj = new Externe.Interne();
\`\`\`

### Import static

\`\`\`java
import static java.lang.Math.PI;

public class Calcul {
    public double circonference(double rayon) {
        return 2 * PI * rayon;
    }
}
\`\`\`

## Bonnes pratiques

1. **Préférez les méthodes static** quand la méthode n'accède à aucune donnée d'instance
2. **Utilisez \`static final\` pour les constantes**
3. **Évitez les champs static mutables**
4. **Ne pas abuser du static** — si une méthode a besoin de \`this\`, elle ne doit pas être static

## Pièges courants

### 1. Modifier un état partagé sans synchronisation

\`\`\`java
private static int count = 0;

public static void increment() {
    count++;  // Non thread-safe
}

// Utiliser AtomicInteger pour les environnements multithreads
\`\`\`

### 2. Confusion static vs instance

\`\`\`java
public class Utilisateur {
    private String nom;           // Une valeur par instance
    private static int total = 0; // Une seule valeur partagée
}
\`\`\`

### 3. Polymorphisme et static

On ne peut PAS surcharger une méthode \`static\` — le polymorphisme ne s'applique qu'aux méthodes d'instance.

Source : [Oracle Java Documentation - Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classmembers.html)`},
        {
          id: 'java-3',
          question: 'final vs finally vs finalize',
          answer: "**`final`** empêche la modification : variable non réassignable, méthode non redéfinissable, classe non étendue (ex. `String`). **`finally`** est un bloc qui s'exécute toujours après `try-catch`, idéal pour libérer les ressources. **`finalize`** est une méthode de `Object` appelée par le GC avant suppression — __dépréciée depuis Java 9__.\n\nOn utilise aujourd'hui `try-with-resources` ou `AutoCloseable` à la place.",
        
          deepDive: `# final, finally et finalize en Java

## Qu'est-ce que c'est ?

Ces trois mots-clés en Java ont des rôles distincts mais complémentaires dans la gestion du comportement et du nettoyage du code.

## Syntaxe et exemples

### final — restriction définitive

\`\`\`java
// Variable finale — valeur immuable
public class MathConstants {
    public static final double PI = 3.14159265359;
    public static final int MAX_RETRY = 3;
}

// MAX_RETRY = 5;  // Erreur de compilation
\`\`\`

\`\`\`java
// Méthode finale — non surchargable
public class Parent {
    public final void afficher() {
        System.out.println("Méthode finale");
    }
}

public class Enfant extends Parent {
    // @Override
    // public void afficher() {}  // Erreur - impossible de surcharger
}
\`\`\`

\`\`\`java
// Classe finale — non héritable
public final class String {
    // String ne peut PAS être héritée
}
\`\`\`

### finally — nettoyage garanti

\`\`\`java
public void lireFichier(String chemin) {
    FileInputStream fis = null;
    try {
        fis = new FileInputStream(chemin);
    } catch (IOException e) {
        System.err.println("Erreur: " + e.getMessage());
    } finally {
        if (fis != null) {
            fis.close();  // Toujours exécuté
        }
    }
}
\`\`\`

### try-with-resources (préférable depuis Java 7)

\`\`\`java
public void lireFichier(String chemin) {
    try (FileInputStream fis = new FileInputStream(chemin)) {
        // ... - fis.close() appelé automatiquement
    } catch (IOException e) {
        System.err.println("Erreur: " + e.getMessage());
    }
}
\`\`\`

### finally et return — piège

\`\`\`java
public int mauvaisExemple() {
    try {
        int x = 10 / 0;
        return 1;
    } catch (ArithmeticException e) {
        return 2;
    } finally {
        return 3;  // Surcharge - retourne 3
    }
}
\`\`\`

**Évitez de mettre \`return\` dans un bloc \`finally\`**.

### finalize — DÉPRÉCIÉ

\`\`\`java
@Override
protected void finalize() throws Throwable {
    // Ne pas utiliser - utiliser try-with-resources
}
\`\`\`

Deprecated depuis Java 9, retirée depuis Java 18.

## Bonnes pratiques

1. **Utilisez \`final\` pour les constantes** — jamais de modification possible
2. **Méthodes finales pour les contrats** — garantit un comportement non modifiable
3. **Classes finales pour les utilitaires** — empêche l'héritage non prévu

## Pièges courants

1. **\`finally\` avec return** — supprime l'exception en cours
2. **\`finalize\` n'est pas fiable** — pas de garantie d'appel, performance dégradée
3. **Classe finale sans champs finals** — contradiction si les champs sont mutables

Source : [Oracle Java Documentation - Execution Control](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html)`},
        {
          id: 'java-4',
          question: 'transient',
          answer: "**`transient`** exclut un champ de la sérialisation. Cas d'usage : données sensibles (mot de passe), champs calculables (recalculés à la désérialisation), références non sérialisables (évite `NotSerializableException`).\n\nÀ la désérialisation, le champ prend sa valeur par défaut (`null`, `0`…).",
        
          deepDive: `# Le modificateur transient en Java

## Qu'est-ce que c'est ?

\`transient\` indique au mécanisme de sérialisation (Serializable) d'ignorer un champ lors de la conversion en bytes. Le champ ne sera pas inclus dans le flux sérialisé.

## Syntaxe et exemples

### Problème résolu

Certains champs ne peuvent pas être sérialisés :
- **Références à des objets non sérialisables** (FileInputStream, DatabaseConnection)
- **Données temporaires** (cache, état intermédiaire)
- **Données sensibles** (mots de passe, tokens)

### Exemple fondamental

\`\`\`java
public class Utilisateur implements Serializable {
    private static final long serialVersionUID = 1L;

    private String nom;
    private transient String motDePasse;  // Ignoré lors de la sérialisation
    private transient Instant dateConnexion;

    public Utilisateur(String nom, String motDePasse) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.dateConnexion = Instant.now();
    }
}

// Sérialisation
byte[] data = serialize(new Utilisateur("Alice", "secret123"));

// Désérialisation
Utilisateur restored = deserialize(data);
System.out.println(restored.motDePasse);     // null
System.out.println(restored.dateConnexion); // null
\`\`\`

### Champs transient et valeur par défaut

Après désérialisation, les champs \`transient\` valent :
- \`null\` pour les objets
- \`0\` pour les nombres primitifs
- \`false\` pour les booléens

### Usage typique

\`\`\`java
// Données sensibles
public class Session implements Serializable {
    private String userId;
    private transient String token;  // Ne pas serialiser
}

// Ressources système
public class CacheDonnees implements Serializable {
    private String donneeId;
    private transient FileInputStream fluxFichier;  // Non serialisable
}

// Champs calculables
public class Commande implements Serializable {
    private List<Ligne> lignes;
    private transient BigDecimal totalCalcule;  // Recomputer après
}
\`\`\`

### static et transient

Les champs \`static\` ne sont jamais sérialisés (ils appartiennent à la classe). Ajouter \`transient\` sur un champ static est redondant.

## Bonnes pratiques

1. **たくない fields doivent être transient** — ressources non sérialisables, données sensibles
2. **Initialisez les champs transient** avec des valeurs par défaut cohérentes
3. **Considérez Externalizable** pour un contrôle plus fin
4. **Ne vous basez pas sur la valeur par défaut** — recréez ou recalculez explicitement

## Pièges courants

1. **Oublier de réinitialiser** — les champs transient valent null/0 après désérialisation
2. **Sérialiser involontairement des données sensibles** — mot de passe en clair
3. **transient sur un champ static** — inutile, les champs static ne sont jamais sérialisés

Source : [Oracle Java Documentation - Object Serialization](https://docs.oracle.com/javase/tutorial/essential/io/serialization.html)`},
        {
          id: 'java-5',
          question: 'Généricité',
          answer: "Paramétrer les types : `List<String>` garantit le type à la compilation, plus besoin de *caster*. Fonctionne par **type erasure** : les types génériques sont effacés au runtime (pas de `new T()` ni `instanceof T`).\n\nBornes : `<T extends Comparable<T>>` restreint le type, *wildcards* (`? extends T`, `? super T`) pour la flexibilité API. Indispensable — utilisé partout (`Collections`, `Stream`s, `Optional`).",
          example: "List<String> = que des String. Pas besoin de caster.",
        
          deepDive: `# La généricité en Java

## Qu'est-ce que c'est ?

La généricité (generics) permet d'écrire du code qui opère sur des types non-spécifiques, décidé à l'utilisation. Elle offre une sécurité de type à la compilation.

## Syntaxe et exemples

### Problème avant Java 5 — casts risqués

\`\`\`java
// Sans generics - nécessaire un cast
List liste = new ArrayList();
liste.add("texte");
String s = (String) liste.get(0);  // OK

liste.add(42);
String s2 = (String) liste.get(1);  // ClassCastException !
\`\`\`

### Solution avec generics

\`\`\`java
List<String> liste = new ArrayList<>();
liste.add("texte");
String s = liste.get(0);  // Pas de cast - type assuré

// liste.add(42);  // Erreur de compilation - 42 n'est pas un String
\`\`\`

### Classes paramétrées

\`\`\`java
public class Boite<T> {
    private T contenu;

    public void mettre(T item) {
        this.contenu = item;
    }

    public T obtenir() {
        return contenu;
    }
}

Boite<String> boiteTextes = new Boite<>();
boiteTextes.mettre("Hello");
String texte = boiteTextes.obtenir();
\`\`\`

### Types bornés (Bounded types)

\`\`\`java
public class Sommeur<T extends Number> {
    private T valeur;

    public double asDouble() {
        return valeur.doubleValue();
    }
}

Sommeur<Integer> s1 = new Sommeur<>();  // OK
Sommeur<Double> s2 = new Sommeur<>();   // OK
// Sommeur<String> s3 = new Sommeur<>();  // Erreur
\`\`\`

### Méthodes génériques

\`\`\`java
public static <T> T premier(List<T> liste) {
    if (liste == null || liste.isEmpty()) return null;
    return liste.get(0);
}

String p = premier(List.of("a", "b", "c"));  // String inféré
Integer n = premier(List.of(1, 2, 3));       // Integer inféré
\`\`\`

### Wildcards

\`\`\`java
// ? extends T — covariance (lecture seule)
public void afficher(List<? extends Number> liste) {
    for (Number n : liste) {
        System.out.println(n.doubleValue());  // Lecture OK
    }
    // liste.add(42);  // Erreur - pas d'écriture
}

// ? super T — contravariance (écriture possible)
public void ajouter(List<? super Integer> liste) {
    liste.add(42);  // OK - écriture
    // Integer n = liste.get(0);  // Erreur - type inconnu
}
\`\`\`

## Bonnes pratiques

1. **Utilisez les wildcards** pour les signatures de méthodes qui ne produisent pas de T
2. **Préférez ? extends T** pour la lecture, ? super T pour l'écriture
3. **N'utilisez pas de raw types** — toujours spécifier le type paramètre
4. **Utilisez \`T extends Comparable<T>\`** pour les types comparables

## Pièges courants

1. **Type erasure** — les generics sont effacés à la compilation, pas de \`new T()\`
2. **\`instanceof T\`** impossible — utiliser \`instanceof\` avec le type brut
3. **Surcharges basées sur le type générique** impossibles
4. **Wildcards avec ? extends** — pas d'écriture possible

Source : [Oracle Java Documentation - Generics](https://docs.oracle.com/javase/tutorial/java/generics/)`},
        {
          id: 'java-6',
          question: 'Classe finale / méthode finale',
          answer: "`final` sur une classe empêche l'héritage (ex. : `String` est finale pour garantir son **immuabilité**). `final` sur une méthode empêche la redéfinition dans les sous-classes, utile pour les comportements critiques qui doivent rester identiques.\n\n**Classe finale** = pas d'héritage, **méthode finale** = pas de redéfinition. Objectif : **sécurité** et **prévisibilité** du comportement.",
        
          deepDive: `# Classe finale et méthode finale en Java

## Qu'est-ce que c'est ?

\`final\` sur une classe signifie qu'elle ne peut pas être héritée. \`final\` sur une méthode signifie qu'elle ne peut pas être surchargée.

## Syntaxe et exemples

### Classe finale — non héritable

\`\`\`java
public final class String {
    // String ne peut PAS être héritée
}

// public class MaString extends String {}  // Erreur de compilation
\`\`\`

\`\`\`java
// Classe utility avec constructeur privé
public final class ConfigService {
    public static final String DEFAULT_API = "https://api.example.com";

    private ConfigService() {}  // Pas de constructeur public

    public static String getApiUrl() {
        return DEFAULT_API;
    }
}
\`\`\`

### Méthode finale — non surchargable

\`\`\`java
public class Parent {
    public final void afficher() {
        System.out.println("Parent.afficher()");
    }

    public void pouvoirEtreSurcharge() {
        System.out.println("Parent.pouvoirEtreSurcharge()");
    }
}

public class Enfant extends Parent {
    // @Override
    // public void afficher() {}  // Erreur de compilation

    @Override
    public void pouvoirEtreSurcharge() {
        System.out.println("Enfant.pouvoirEtreSurcharge()");
    }
}
\`\`\`

### Classe finale + méthode finale = contrat figé

\`\`\`java
public final class Temperature {
    public static final Temperature ABSOLU_ZERO = new Temperature(-273.15);

    private final double celsius;

    private Temperature(double celsius) {
        this.celsius = celsius;
    }

    public final double asCelsius() {
        return celsius;
    }

    public final double asFahrenheit() {
        return celsius * 9/5 + 32;
    }
}
\`\`\`

### Combinaison avec static

\`\`\`java
public final class Constants {
    private Constants() {}  // Constructeur privé - classe non instanciable

    public static final String APP_NAME = "PrismPrep";
    public static final int MAX_RETRY = 3;
}
\`\`\`

## Bonnes pratiques

1. **Utilisez une classe finale** pour les classes utility qui ne doivent pas être modifiées
2. **Utilisez une méthode finale** pour les méthodes qui font partie d'un contrat
3. **Rendez une classe finale si vous voulez l'immutabilité** — combinez avec des champs finals
4. **\`final\` sur une classe + constructeur privé = pattern singleton**

## Pièges courants

1. **Classe finale avec champs non finals** — contradiction, les champs peuvent changer
2. **Héritage retiré après coup** — il est plus facile de rendre quelque chose non-final que de retirer l'héritage
3. **Méthode finale dans une classe non finale** — permet l'héritage mais pas la surcharge de cette méthode

Source : [Oracle Java Documentation - Classes](https://docs.oracle.com/javase/tutorial/java/IandI/final.html)`},
        {
          id: 'java-7',
          question: 'try-with-resources',
          answer: "Depuis Java 7, déclarez les ressources implémentant **`AutoCloseable`** directement dans le `try` — Java les ferme automatiquement, même en cas d'exception. Plus besoin de bloc `finally` manuel.\n\nPlusieurs ressources possibles dans un même `try`. L'ordre de fermeture est **inverse** de la déclaration. __La manière moderne et recommandée de gérer les ressources en Java.__",
          code: 'try (FileInputStream fis = new FileInputStream("f.txt");\n     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {\n    String line = br.readLine();\n} // fermeture automatique',
          language: 'java',
        
          deepDive: `# try-with-resources en Java

## Qu'est-ce que c'est ?

\`try-with-resources\` est un mécanisme introduit dans Java 7 qui permet de déclarer une ou plusieurs ressources qui seront fermées automatiquement à la fin du bloc, même si une exception est jetée.

## Syntaxe et exemples

\`\`\`java
try (Type1 res1 = new Type1(); Type2 res2 = new Type2()) {
    // utilisation des ressources
} catch (Exception e) {
    // gestion d'exception
}
\`\`\`

La ressource doit implémenter l'interface \`AutoCloseable\`.

### Exemple fondamental

\`\`\`java
// Avant Java 7 — gestion manuelle fastidieuse
FileInputStream fis = null;
try {
    fis = new FileInputStream("monfichier.txt");
    int data = fis.read();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fis != null) {
        try {
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// Avec try-with-resources
try (FileInputStream fis = new FileInputStream("monfichier.txt")) {
    int data = fis.read();
} catch (IOException e) {
    e.printStackTrace();
}
// fis.close() appelé automatiquement
\`\`\`

### Multiples ressources

\`\`\`java
try (
    FileInputStream fis = new FileInputStream("fichier.txt");
    BufferedReader reader = new BufferedReader(new InputStreamReader(fis))
) {
    String ligne;
    while ((ligne = reader.readLine()) != null) {
        System.out.println(ligne);
    }
}
// Les deux sont fermées dans l'ordre inverse
\`\`\`

### Interface AutoCloseable

\`\`\`java
public interface AutoCloseable {
    void close() throws Exception;
}
\`\`\`

\`\`\`java
public class Connexion implements AutoCloseable {
    @Override
    public void close() {
        System.out.println("Connexion fermée");
    }
}

try (Connexion c = new Connexion()) {
    System.out.println("Utilisation de la connexion");
}
// "Connexion fermée" affiché automatiquement
\`\`\`

### Suppression des exceptions

\`\`\`java
try (Resource r = new Resource()) {
    throw new RuntimeException("exception dans try");
}
// RuntimeException propagée, exception du close() surpressée

// Pour récupérer les exceptions surpressées
try {
    // ...
} catch (Exception e) {
    for (Throwable t : e.getSuppressed()) {
        System.err.println("Surpressée: " + t);
    }
}
\`\`\`

### Capture de ressource avec variables finales (Java 9+)

\`\`\`java
Path path = Paths.get("fichier.txt");

try (path) {  // path doit être effectively final
    Files.lines(path).forEach(System.out::println);
}
\`\`\`

## Bonnes pratiques

1. **Toujours utiliser try-with-resources** pour les ressources qui implémentent AutoCloseable
2. **Ne retournez jamais dans un try-with-resources** — le close automatique serait perturbé
3. **Évitez les ressources qui peuvent être null** — vérifiez avant
4. **Utilisez des classes wrapper** si vous avez besoin de personnaliser le comportement de close

## Pièges courants

1. **Oublier d'implémenter AutoCloseable** — la ressource ne sera pas fermée automatiquement
2. **\`close()\` qui jette une exception** — l'exception originale peut être surpressée
3. **Ressources qui dépendent les unes des autres** — fermez dans l'ordre inverse

Source : [Oracle Java Documentation - Try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html)`},
      ],
    },
    {
      id: 'java-memoire',
      title: 'Mémoire',
      questions: [
        {
          id: 'java-8',
          question: 'Garbage Collection',
          answer: "Le **GC** libère automatiquement les objets non référencés. L'algorithme principal est **mark-and-sweep** : marquage des objets accessibles depuis les racines, puis suppression des non-marqués.\n\nLa **JVM** est organisée en générations : **Young Generation** (objets éphémères) et **Old Generation** (objets durables). On ne contrôle pas le moment de l'exécution du GC (`System.gc()` n'est qu'une suggestion). Mettre les références à `null` quand elles ne sont plus nécessaires aide le GC.",
        
          deepDive: `# Garbage Collection en Java

## Qu'est-ce que c'est ?

Le Garbage Collector (GC) est un mécanisme automatique de Java qui libère la mémoire prise par des objets qui ne sont plus référencés. Plus besoin de faire \`delete\` comme en C++.

## Syntaxe et exemples

### Le problème de la mémoire manuelle

\`\`\`cpp
// C++ - gestion manuelle
MyObject* obj = new MyObject();
// ... utiliser obj
delete obj;  // Oublier = fuite mémoire
// Utiliser après delete = corruption mémoire
\`\`\`

\`\`\`java
// Java - gestion automatique
MyObject obj = new MyObject();
// ... utiliser obj
obj = null;  // L'objet devient éligible pour le GC
// Pas de delete - le GC s'en occupe
\`\`\`

### Comment le GC détecte-t-il les objets inutiles ?

\`\`\`java
public class Exemple {
    void methode() {
        Object obj = new Object();  // référence vers l'objet
        obj = null;  // Plus aucune référence - éligible pour GC
    }
}
\`\`\`

## Génération de mémoire (Hotspot)

| Generation | Description | Utilisation |
|-----------|-------------|-------------|
| **Young Generation** | Objets nouveaux | Eden + 2 Survivor spaces (S0, S1) |
| **Old Generation** | Objets longue durée | Tenured space |
| **Metaspace** | Méta-informations des classes | Depuis Java 8 (remplace PermGen) |

### Cycle de vie d'un objet

\`\`\`
[new Object()] → Eden → Survivor S0 → Survivor S1 → Old Generation → GC
\`\`\`

Quand Eden est plein, un **Minor GC** se produit. Quand Old Generation est plein, un **Full GC** se produit.

## Types de Garbage Collectors

\`\`\`bash
# Serial GC - un seul thread, stop-the-world
java -XX:+UseSerialGC -jar monapp.jar

# Parallel GC - plusieurs threads, par défaut sur serveur
java -XX:+UseParallelGC -jar monapp.jar

# G1 GC - Garbage First, par défaut depuis Java 9
java -XX:+UseG1GC -jar monapp.jar

# ZGC - très faible latence
java -XX:+UseZGC -jar monapp.jar

# Shenandoah (Java 12+) - pauses indépendantes de la taille du heap
java -XX:+UseShenandoahGC -jar monapp.jar
\`\`\`

## Monitoring du GC

\`\`\`bash
# Voir les options GC
java -XX:+PrintCommandLineFlags -version

# Activer les logs GC
java -Xlog:gc*=info:file=gc.log -jar monapp.jar

# Analyser avec jstat
jstat -gcutil <pid> 1000  # toutes les secondes
\`\`\`

## Bonnes pratiques

1. **Dimensionnez le heap correctement** — \`-Xms\` et \`-Xmx\` égaux pour éviter les resizing
2. **Surveillez la ratio de promotion** — si beaucoup d'objets passent rapidement à Old, augmentez le heap young
3. **Choisissez le GC selon votre cas** — throughput vs latency
4. **Évitez les allocations courtes superflues** — objets temporaires qui saturent le young

## Pièges courants

1. **Ne pas dimensionner le heap** — OutOfMemoryError fréquente
2. **Trop d'objets dans la Old Generation** — Full GC fréquents et bloquants
3. **Références strong dans les collections** — fuir la mémoire involontairement
4. **Finalizers** — performance dégradée, comportement non déterministe

Source : [Oracle Java Documentation - Garbage Collection](https://docs.oracle.com/javase/tutorial/essential/environment/garbage.html)`},
        {
          id: 'java-9',
          question: 'StackOverflowError vs OutOfMemoryError',
          answer: "**`StackOverflowError`** : la pile d'exécution est pleine, typiquement par récursion infinie (stack ~512Ko-1Mo). **`OutOfMemoryError`** : le tas (*heap*) est saturé, par exemple une liste qui grandit indéfiniment.\n\n`StackOverflow` se diagnostique facilement via la trace d'appels ; `OutOfMemory` nécessite souvent un profiling (`JVisualVM`, `Eclipse MAT`). En production : `-Xmx` pour le heap, `-Xss` pour la stack.",
        
          deepDive: `# StackOverflowError vs OutOfMemoryError

## Qu'est-ce que c'est ?

Ces deux erreurs indiquent des problèmes de mémoire mais dans des régions différentes de la JVM.

## StackOverflowError

Se produit quand la **pile d'exécution** (call stack) dépasse sa taille maximale. Généralement causé par une récursion infinie.

### Syntaxe et exemples

\`\`\`java
// Récursion infinie - cause typique
public class RecursionInfinie {
    public int factorielle(int n) {
        return n * factorielle(n - 1);  // Pas de cas de base
    }
}

new RecursionInfinie().factorielle(1);  // StackOverflowError
\`\`\`

\`\`\`java
// Solution — cas de base
public int factorielle(int n) {
    if (n <= 1) return 1;  // Cas de base
    return n * factorielle(n - 1);
}

// Ou version itérative (pas de stack overflow)
public int factorielleIteratif(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\`

## OutOfMemoryError

Se produit quand la **heap** ne peut plus allouer d'objets. Signifie généralement une fuite mémoire ou un dimensionnement insuffisant.

\`\`\`java
// Fuite mémoire - cause typique
List<Object> liste = new ArrayList<>();

while (true) {
    liste.add(new Object());  // Ne jamais libérer
}
\`\`\`

\`\`\`java
// Allocation excessive
byte[] toutLeFichier = Files.readAllBytes(Paths.get("grosfichier.txt"));  // OOM si fichier > heap
\`\`\`

### Types de OutOfMemoryError

| Type | Cause | Solution |
|------|-------|----------|
| \`Java heap space\` | Trop d'objets créés | Augmenter heap, corriger fuites |
| \`GC overhead limit exceeded\` | GC passe trop de temps | Augmenter heap, optimiser allocations |
| \`Unable to allocate\` | Mémoire native saturée | Réduire heap, fermer ressources |
| \`Metaspace\` | Trop de classes chargées | Augmenter Metaspace |

## Comment déboguer

\`\`\`bash
# Voir l'état de la mémoire
jstat -gc <pid>

# Heap dump sur OOM
java -XX:+HeapDumpOnOutOfMemory -XX:HeapDumpPath=/tmp/dump.hprof -jar monapp.jar

# Analyser avec VisualVM
jvisualvm --heapdump=/tmp/dump.hprof
\`\`\`

\`\`\`bash
# Dimensionner correctement
java -Xms256m -Xmx2g -jar monapp.jar
\`\`\`

## Bonnes pratiques

1. **Ajoutez toujours un cas de base** dans les fonctions récursives
2. **Surveillez les allocations** — ne chargez pas de gros fichiers d'un coup
3. **Profilez régulièrement** avec jstat ou Java Mission Control
4. **Vérifiez les références** dans les collections

## Pièges courants

1. **Récursion sans cas de base** — erreur classique
2. **Collections qui grandissent indéfiniment** — pas d'éviction
3. **ThreadLocal non nettoyé** — fuite par thread réutilisé
4. **Images ou fichiers volumineux chargés en mémoire** — streaming instead

Source : [Oracle Java Documentation - Common Problems](https://docs.oracle.com/javase/tutorial/essential/environment/problems.html)`},
        {
          id: 'java-10',
          question: 'Fuites mémoire en Java',
          answer: "Le GC nettoie les objets *inaccessibles*, mais pas les objets **oubliés dans des collections statiques**, les **listeners non désenregistrés**, les **cachées sans taille limite**, ou les **références vers des objets externes** non fermés (`Connection`, `Stream`).\n\nDétection : monitoring de la mémoire (`JVisualVM`, heap dump), tests de charge avec analyse de l'évolution du heap. __Prévention : toujours fermer les ressources, limiter les cachées, utiliser `WeakReference` quand approprié.__",
        
          deepDive: `# Fuites mémoire en Java

## Qu'est-ce que c'est ?

Une fuite mémoire (memory leak) se produit quand des objets ne sont plus utilisés mais ne sont pas libérés par le Garbage Collector, accumulant de la mémoire au fil du temps.

## Syntaxe et exemples

### 1. Références statiques

\`\`\`java
public class Cache {
    private static List<Object> cache = new ArrayList<>();

    public static void ajouter(Object o) {
        cache.add(o);  // Grandit indéfiniment
    }
}
\`\`\`

Les champs \`static\` vivent toute la durée du programme.

### 2. Collections mal gérées

\`\`\`java
Map<Key, Value> cache = new HashMap<>();

public void put(Key k, Value v) {
    cache.put(k, v);  // Grandit sans limite
}
\`\`\`

Solution : utiliser \`WeakHashMap\` ou un mécanisme d'éviction LRU.

### 3. Listeners non retirés

\`\`\`java
public class EventManager {
    private static List<Listener> listeners = new ArrayList<>();

    public void addListener(Listener l) {
        listeners.add(l);
    }
}
\`\`\`

Oubli de \`removeListener()\` — fuite si des objets ne sont jamais désenregistrés.

### 4. ThreadLocal non nettoyé

\`\`\`java
public class MonThread implements Runnable {
    private static ThreadLocal<Connection> threadConnection = new ThreadLocal<>();

    public void run() {
        threadConnection.set(creerConnection());
        // Si le thread est recyclé sans remove(), fuite
    }
}
\`\`\`

Solution : toujours appeler \`threadConnection.remove()\` dans un finally block.

### 5. Ressources non closes

\`\`\`java
// Mauvais - fuite si exception avant close()
public void lireFichier(String path) {
    FileInputStream fis = new FileInputStream(path);
    // ...
    fis.close();
}

// Bon - try-with-resources
public void lireFichier(String path) {
    try (FileInputStream fis = new FileInputStream(path)) {
        // ...
    }
}
\`\`\`

## Comment détecter

\`\`\`bash
# Heap dump
jmap -dump:format=b,file=heap.hprof <pid>

# Ou au démarrage
java -XX:+HeapDumpOnOutOfMemory -XX:HeapDumpPath=/tmp/dump.hprof -jar monapp.jar

# Monitoring avec jstat
jstat -gc <pid> 1000
# Si Old generation grandit sans jamais redescendre — fuite probable
\`\`\`

## Bonnes pratiques

1. **Évitez les champs static mutables**
2. **Utilisez des WeakReference** pour les caches
3. **Fermez toujours les ressources** (try-with-resources)
4. **Désenregistrez les listeners** quand ils ne sont plus utilisés
5. **Nettoyez les ThreadLocal** dans un finally block

## Pièges courants

1. **Static collections qui grandissent** — sans mécanisme d'éviction
2. **Listeners oubliés** — jamais retirés
3. **ThreadLocal non nettoyé** — thread recyclé
4. **Ressources non fermées** — exception avant close()
5. **Objets closables dans des collections** — référence maintenue

Source : [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/environment/understandingMemory.html)`},
      ],
    },
    {
      id: 'java-exceptions',
      title: 'Exceptions',
      questions: [
        {
          id: 'java-11',
          question: 'Gestion des exceptions',
          answer: "**`try-catch-finally`** : le code risqué dans `try`, les erreurs dans `catch`, `finally` s'exécute toujours — idéal pour fermer les ressources.\n\nDepuis Java 7, **`try-with-resources`** est préférable : on déclare les ressources dans le `try` et Java les ferme automatiquement, même en cas d'exception. Plus propre et plus concis que les blocs `finally` manuels.",
          code: 'try {\n    Connection c = DriverManager.getConnection(url);\n} catch (SQLException e) {\n    System.err.println("Erreur: " + e.getMessage());\n} finally {\n    // fermer la connexionion\n}',
          language: 'java',
        
          deepDive: `# Gestion des exceptions en Java

## Qu'est-ce que c'est ?

Une exception est un événement qui se produit pendant l'exécution d'un programme et qui interrompt le flux normal des instructions. En Java, les exceptions sont des objets qui héritent de la classe \`Throwable\`.

### Hiérarchie des exceptions

\`\`\`
Throwable
├── Error (erreurs système - ne pas catcher)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── IndexOutOfBoundsException
    └── IOException (checked)
        ├── FileNotFoundException
        └── SQLException
\`\`\`

## Syntaxe et exemples

### Checked vs Unchecked

Les exceptions **checked** doivent être catchées ou déclarées avec \`throws\`. Le compilateur les force.

\`\`\`java
public void lireFichier(String path) throws IOException {
    FileReader reader = new FileReader(path);
    reader.read();
    reader.close();
}
\`\`\`

Les **RuntimeException** (unchecked) n'ont pas besoin d'être déclarées. Elles indiquent généralement une erreur de programmation.

\`\`\`java
public int diviser(int a, int b) {
    return a / b;  // ArithmeticException si b == 0 — unchecked
}
\`\`\`

### Try-catch-finally

\`\`\`java
try {
    int resultat = diviser(10, 0);
} catch (ArithmeticException e) {
    System.err.println("Division par zéro: " + e.getMessage());
} catch (Exception e) {
    System.err.println("Autre erreur: " + e.getMessage());
} finally {
    System.out.println("Toujours exécuté");
}
\`\`\`

### Multi-catch

\`\`\`java
try {
    // opération qui peut échouer
} catch (IOException | ParseException e) {
    System.err.println("Erreur: " + e.getMessage());
}
\`\`\`

### Try-with-resources (préférable)

\`\`\`java
try (FileReader reader = new FileReader("fichier.txt")) {
    int c;
    while ((c = reader.read()) != -1) {
        System.out.print((char) c);
    }
} catch (IOException e) {
    System.err.println("Erreur de lecture: " + e.getMessage());
}
\`\`\`

### Relancer une exception

\`\`\`java
public void méthode1() {
    try {
        // opération risquée
    } catch (IOException e) {
        throw new MonExceptionPersonnalisée("détails", e);
    }
}
\`\`\`

## Bonnes pratiques

1. **Ne catchez pas trop largement** — \`catch (Exception e)\` masque les bugs
2. **Préférez try-with-resources** pour les ressources AutoCloseable
3. **Relancez avec contexte** — \`throw new SpecificException("message", cause)\`
4. **Ne loggez pas et ne relancez pas** — choisissez un seul
5. **Évitez les exceptions pour le flux normal** — utilisez des codes de retour

## Pièges courants

1. **Catcher \`Exception\` trop largement** — masque les bugs et rend le débogage difficile
2. **Oublier de fermer les ressources** — utilisez toujours try-with-resources
3. **Avaler les exceptions** — ne pas traiter ni relancer une exception catchée
4. **Utiliser des exceptions pour le flux normal** — utilise des codes de retour quand c'est possible

Source : [Oracle Java Documentation - Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/)`},
        {
          id: 'java-12',
          question: 'throw vs throws',
          answer: "**`throw`** lance explicitement une exception dans le code (ex. `throw new IllegalArgumentException()`). **`throws`** déclare dans la signature qu'une méthode peut lancer une exception — surtout pour les *checked exceptions*.\n\n`throws` sert de contrat : l'appelant doit attraper l'exception ou la redéclarer. C'est un mécanisme de **transparence** qui empêche d'ignorer les erreurs potentielles.",
          code: 'void verifier(int v) throws IllegalArgumentException {\n    if (v < 0) throw new IllegalArgumentException("Négatif");\n}',
          language: 'java',
        
          deepDive: `# throw vs throws en Java

## Qu'est-ce que c'est ?

\`throw\` et \`throws\` sont deux mots-clés liés aux exceptions mais avec des rôles différents.


## Syntaxe et exemples

### throw — déclencher une exception

\`throw\` est utilisé pour **déclencher** (jeter) une exception explicitement.


\`\`\`java
public void vérifierÂge(int âge) {
    if (âge < 0) {
        throw new IllegalArgumentException("L'âge ne peut pas être négatif: " + âge);
    }
    if (âge > 150) {
        throw new IllegalArgumentException("Âge invalide: " + âge);
    }
}
\`\`\`

### Créer sa propre exception


\`\`\`java
public class MontantInvalideException extends RuntimeException {
    public MontantInvalideException(String message) {
        super(message);
    }
}

public void traiterPaiement(double montant) {
    if (montant < 0) {
        throw new MontantInvalideException("Le montant ne peut pas être négatif");
    }
}
\`\`\`


### throws — déclarer une exception

\`throws\` déclare qu'une méthode **peut** lever des exceptions (dans la signature de la méthode).

\`\`\`java
public void lireFichier(String path) throws IOException {
    FileReader reader = new FileReader(path);
    reader.read();
    reader.close();
}
\`\`\`

### Déclaration de plusieurs exceptions

\`\`\`java
public void maMéthode() throws IOException, ParseException {
    // ...
}
\`\`\`


## Différence fondamentale

| Mot-clé | Rôle | Où |
|---------|------|-----|
| \`throw\` | Déclenche une exception | Dans le corps de la méthode |
| \`throws\` | Déclare les exceptions possibles | Dans la signature de la méthode |


## Exemple combiné

\`\`\`java
public int lireEntier(String chemin) throws FileNotFoundException, IOException {
    FileReader reader = new FileReader(chemin);
    BufferedReader br = new BufferedReader(reader);
    String ligne = br.readLine();
    br.close();
    return Integer.parseInt(ligne.trim());
}
\`\`\`

## Bonnes pratiques

1. **Utilisez \`throw\` pour les conditions invalides** — quand quelque chose ne devrait jamais arriver
2. **Déclarez les checked exceptions avec \`throws\`** — dans la signature de la méthode
3. **Créez des exceptions personnalisées** — pour un domaine métier spécifique
4. **Enveloppez les exceptions** — \`throw new SpecificException("message", cause)\` pour chaîner

## Pièges courants


### Confusion entre throw et throws

\`\`\`java
// Erreur
public void démo() {
    throw new Exception("message");  // Une méthode ne peut pas "throw" une checked directement
}

// Correct
public void démo() throws Exception {
    throw new Exception("message");  // Déclaration + déclenchement
}
\`\`\`

### Oublier throws sur la méthode appelante

\`\`\`java
public void méthodeAppelante() {
    try {
        lireFichier("test.txt");  // Erreur de compilation — declare IOException
    } catch (IOException e) {
        // OK
    }
}
\`\`\`

### RuntimeException et throws

Les RuntimeException (unchecked) n'ont pas besoin d'être déclarées avec \`throws\` :

\`\`\`java
public int diviser(int a, int b) throws RuntimeException {  // Inutile
    if (b == 0) {
        throw new ArithmeticException("Division par zéro");
    }
    return a / b;
}
\`\`\`

Source : [Oracle Java Documentation - Exception Handling](https://docs.oracle.com/javase/tutorial/essential/exceptions/throwing.html)`},
        {
          id: 'java-13',
          question: 'Checked vs Unchecked',
          answer: "**Checked** : vérifiées à la compilation, le compilateur oblige à les gérer (`try-catch` ou `throws`) — ex. `IOException`, `SQLException`. Impossible de les ignorer.\n\n**Unchecked** (sous-classes de `RuntimeException`) : non vérifiées, représentent des erreurs de programmation — ex. `NullPointerException`.\n\nEn pratique : **checked** pour les erreurs métier prévisibles, **unchecked** pour les bugs de programmation.",
        
          deepDive: `# Checked vs Unchecked en Java

## Qu'est-ce que c'est ?

En Java, les exceptions sont divisées en deux catégories principales : les exceptions **checked** (vérifiées) et **unchecked** (non vérifiées). Cette distinction détermine si le compilateur exige ou non de les gérer.

## Différence fondamentale

| Type | Obligation | Héritage | Exemples |
|------|------------|----------|----------|
| **Checked** | Catcher ou déclarer | \`Exception\` (pas \`RuntimeException\`) | \`IOException\`, \`SQLException\` |
| **Unchecked** | Optionnel | \`RuntimeException\` | \`NullPointerException\`, \`IllegalArgumentException\` |

## Syntaxe et exemples

### Checked — le compilateur force

Les checked exceptions doivent être catchées ou déclarées avec \`throws\`.

\`\`\`java
// Erreur de compilation - IOException non gérée
public void lire() {
    FileReader reader = new FileReader("fichier.txt");
}

// Correct - déclarée
public void lire() throws IOException {
    FileReader reader = new FileReader("fichier.txt");
}

// Correct - catchée
public void lire() {
    try {
        FileReader reader = new FileReader("fichier.txt");
    } catch (IOException e) {
        System.err.println("Fichier non trouvé: " + e.getMessage());
    }
}
\`\`\`

### Unchecked — le compilateur ignore

Les \`RuntimeException\` et leurs sous-classes sont unchecked. Pas besoin de les déclarer.

\`\`\`java
public int diviser(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Division par zéro");
    }
    return a / b;
}
\`\`\`

## Bonnes pratiques

### Checked — erreurs récupérables

Pour des conditions prévisibles que l'appelant peut remédier :

- Fichier non trouvé
- Connexion BD perdue
- Données invalides

### Unchecked — erreurs de programmation

Pour des bugs dans le code :

- Argument null
- Valeur hors limites
- Violation de contrat

1. **Ne créez pas de checked exceptions pour des erreurs de programmation**
2. **Convertissez les checked en unchecked** quand l'appelant ne peut pas remédier
3. **Évitez les exceptions pour le flux normal**

## Pièges courants

1. **Créer une checked exception pour une erreur de programmation** — utilisez \`RuntimeException\`
2. ** catcher \`Exception\` trop largement** — masque les bugs
3. **Oublier de déclarer les checked exceptions** — erreur de compilation
4. **Utiliser des exceptions pour le flux normal** — préférez des codes de retour

Source : [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html)`},
      ],
    },
    {
      id: 'java-collections',
      title: 'Collections & Strings',
      questions: [
        {
          id: 'java-14',
          question: 'Array vs ArrayList',
          answer: "**`Array`** : taille fixe, accepte les primitives, syntaxe crochets. **`ArrayList`** : taille dynamique, objets uniquement (*autoboxing* pour les primitives), méthodes `add`/`get`/`remove`.\n\n`ArrayList` est plus flexible et préférée dans la plupart des cas. `Array` reste utile pour les performances critiques ou les tailles connues à l'avance.",
        
          deepDive: `# Array vs ArrayList en Java

## Qu'est-ce que c'est ?

Un **Array** est une structure de données primitive qui stocke des éléments de même type dans un bloc de mémoire contigu. Une **ArrayList** est une collection dynamique qui implémente l'interface \`List\` et peut grandir automatiquement.

## Différence fondamentale


| Caractéristique | Array | ArrayList |
|----------------|-------|----------|
| Taille | Fixe après création | Variable dynamiquement |
| Type | Primitif et Objet | Objet uniquement |
| Performance | Plus rapide | Légèrement plus lent (autoboxing) |
| Syntaxe | \`Type[] arr = new Type[n]\` | \`ArrayList<Type> list = new ArrayList<>()\` |

## Syntaxe et exemples

### Array — taille fixe

\`\`\`java
// Déclaration et allocation
String[] noms = new String[3];
noms[0] = "Alice";
noms[1] = "Bob";
noms[2] = "Charlie";

// Taille fixe - pas de add() possible
// noms[3] = "Diana";  // ArrayIndexOutOfBoundsException

// Initialisation avec valeurs
int[] nombres = {1, 2, 3, 4, 5};
\`\`\`

### ArrayList — taille variable

\`\`\`java
import java.util.ArrayList;

ArrayList<String> noms = new ArrayList<>();
noms.add("Alice");   // Grandit automatiquement
noms.add("Bob");
noms.add("Charlie");
noms.add("Diana");   // Pas de problème - taille dynamique

// Accès par index
String premier = noms.get(0);

// Taille
int taille = noms.size();  // 4

// Suppression
noms.remove("Bob");  // Retire Bob
\`\`\`

### Conversion entre Array et ArrayList

\`\`\`java
// Array vers ArrayList
String[] tableau = {"a", "b", "c"};
ArrayList<String> liste = new ArrayList<>(Arrays.asList(tableau));

// ArrayList vers Array
ArrayList<String> liste2 = new ArrayList<>();
liste2.add("x");
liste2.add("y");
String[] tableau2 = liste2.toArray(new String[0]);
\`\`\`

## Bonnes pratiques

### Array — quand vous savez la taille

- Taille connue à l'avance et ne changera pas
- Performance critique (pas de surcoût dynamique)
- Travail avec primitifs (\`int[]\`, \`double[]\`, etc.)

\`\`\`java
// Matrice de 3x3 - taille fixee
int[][] matrice = new int[3][3];

// Buffer de taille connue
byte[] buffer = new byte[1024];
\`\`\`

### ArrayList — quand la taille varie

- Nombre d'éléments imprévisible
- Ajouts et suppressions fréquents
- Manipulation facile (\`add\`, \`remove\`, \`contains\`)

\`\`\`java
ArrayList<String> utilisateurs = new ArrayList<>();
utilisateurs.add("Alice");  // taille = 1
utilisateurs.add("Bob");     // taille = 2
utilisateurs.add("Charlie"); // taille = 3
\`\`\`

## Pièges courants

1. **Array de primitifs vs ArrayList** — ArrayList ne peut pas stocker \`int\` directement, il stocke \`Integer\` (autoboxing)


\`\`\`java
// Mauvais - ArrayList ne peut pas stocker int
ArrayList<int> integers = new ArrayList<>();  // Erreur

// Correct
ArrayList<Integer> integers = new ArrayList<>();
\`\`\`

2. **Taille fixe des arrays** — essayer d'utiliser un index hors limites lance une \`ArrayIndexOutOfBoundsException\`
3. **Oublier la capacité initiale** — pour les ArrayList avec beaucoup d'éléments, spécifiez \`new ArrayList<>(capacité)\`

Source : [Oracle Java Documentation - Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)`},
        {
          id: 'java-15',
          question: 'ArrayList vs LinkedList',
          answer: "**`ArrayList`** (tableau dynamique) : accès par index O(1), insertion/suppression en milieu O(n), meilleure localité cachée. **`LinkedList`** (liste doublement chaînée) : insertion/suppression O(1) si on a le nœud, accès par index O(n).\n\nEn pratique, `ArrayList` est préférée dans 90% des cas grâce à l'accès rapide et la mémoire contiguë. `LinkedList` est pertinente pour les insertions/suppressions fréquentes en tête ou en milieu.",
        
          deepDive: `# ArrayList vs LinkedList en Java

## Qu'est-ce que c'est ?

\`ArrayList\` et \`LinkedList\` sont deux implémentations de l'interface \`List\` en Java. Elles ont des performances différentes selon les opérations effectuées.

## Différence fondamentale

| Opération | ArrayList | LinkedList |
|-----------|-----------|------------|
| Accès par index | O(1) - Accès direct | O(n) - Parcours depuis début |
| Ajout en fin | O(1) amorti | O(1) |
| Insertion au milieu | O(n) - Décalage | O(1) si position connue |
| Suppression | O(n) - Décalage | O(1) si position connue |
| Mémoire | Contiguë - moins de RAM | Nœuds chainés - plus de RAM |

## Syntaxe et exemples

### ArrayList — accès rapide, modification lente au milieu

\`\`\`java
import java.util.ArrayList;

ArrayList<String> liste = new ArrayList<>();
liste.add("Alice");
liste.add("Bob");
liste.add("Charlie");

// Accès par index - O(1)
String deuxième = liste.get(1);  // "Bob" - très rapide

// Ajout en fin - O(1) amorti
liste.add("Diana");  // Rapide

// Insertion au milieu - O(n)
liste.add(1, "Ben");  // Décale tous les éléments après l'index 1
\`\`\`

### LinkedList — modification rapide, accès lent

\`\`\`java
import java.util.LinkedList;

LinkedList<String> liste = new LinkedList<>();
liste.add("Alice");
liste.add("Bob");
liste.add("Charlie");

// Accès par index - O(n)
String deuxième = liste.get(1);  // "Bob" - doit parcourir depuis le début

// Insertion au milieu - O(1) si on a un itérateur
ListIterator<String> it = liste.listIterator(1);
it.add("Ben");  // Insertion directe sans décalage

// Ajout en fin - O(1)
liste.add("Diana");  // Rapide
\`\`\`

### Accès par index — démonstration

\`\`\`java
ArrayList<String> al = new ArrayList<>();
LinkedList<String> ll = new LinkedList<>();

// Les deux ont 10 000 éléments
for (int i = 0; i < 10000; i++) {
    al.add("item" + i);
    ll.add("item" + i);
}

// Accès à l'élément 5000
al.get(5000);  // Instantané - adresse mémoire directe
ll.get(5000);  // Doit parcourir 5000 nœuds
\`\`\`

### Insertion — démonstration

\`\`\`java
ArrayList<String> al = new ArrayList<>();
LinkedList<String> ll = new LinkedList<>();

// Ajout de 10 000 éléments au début
for (int i = 0; i < 10000; i++) {
    al.add(0, "item" + i);  // Décalage de tous les éléments
    ll.add(0, "item" + i);  // Insertion directe
}
\`\`\`

## Bonnes pratiques

### ArrayList - dans la plupart des cas

- Accès fréquent par index
- Ajouts en fin de liste
- Modification au milieu rare

\`\`\`java
ArrayList<String> noms = new ArrayList<>();
noms.add("Alice");
noms.add("Bob");
String troisième = noms.get(2);  // Accès rapide
\`\`\`

### LinkedList - cas spéciaux

- Insertions et suppressions fréquentes au milieu ou au début
- Mise en œuvre de piles (Stack) ou files (Queue)

\`\`\`java
LinkedList<String> pile = new LinkedList<>();
pile.push("A");
pile.push("B");
pile.pop();  // Retire "B" - O(1)
\`\`\`

## Pièges courants

1. **Utiliser LinkedList pour l'accès par index** — O(n) rend les opérations lentes
2. **Confondre les opérations** — \`add(index, element)\` est O(n) pour ArrayList mais O(1) pour LinkedList avec itérateur
3. **Utiliser \`get(n)\` dans une boucle** — très lent avec LinkedList, privilégiez l'itérateur

Source : [Oracle Java Documentation - Collections](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)`},
        {
          id: 'java-16',
          question: 'String vs StringBuilder vs StringBuffer',
          answer: "**`String`** est **immuable** : chaque modification crée un nouvel objet — les concaténations en boucle sont catastrophiques en performance. **`StringBuilder`** : mutable avec buffer dynamique, idéal pour construire des chaînes en *single-thread*. **`StringBuffer`** : identique mais synchronisé (*thread-safe*), rarement nécessaire.\n\nRègle : `String` pour les constantes, `StringBuilder` pour la construction dynamique.",
        
          deepDive: `# String, StringBuilder et StringBuffer en Java

## Qu'est-ce que c'est ?

En Java, les chaînes de caractères sont **immuables** — une fois créées, elles ne peuvent pas être modifiées. Toute opération de concaténation crée un nouvel objet. Pour pallier ce problème, Java propose \`StringBuilder\` et \`StringBuffer\`.

## Syntaxe et exemples

### Le problème avec String

\`\`\`java
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "élément" + i;  // Crée 1000 objets String temporaires !
}
\`\`\`

Chaque \`+=\` crée :
1. Un nouveau buffer String
2. La copie de l'ancien contenu
3. L'ajout du nouveau texte
4. Le garbage collector doit recycler les anciens objets

**Performance : O(n²) en temps, O(n) en objets créés**

### StringBuilder — la solution performante

\`\`\`java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("élément");
    sb.append(i);
}
String result = sb.toString();
\`\`\`

StringBuilder maintient un **buffer redimensionnable** :
- \`append\` = ajout direct au buffer
- Pas de création d'objets intermédiaires
- **Performance : O(n) en temps, O(n) en espace**

### Constructeurs utiles

\`\`\`java
StringBuilder sb1 = new StringBuilder();           // Capacité par défaut : 16
StringBuilder sb2 = new StringBuilder(50);         // Capacité explicite
StringBuilder sb3 = new StringBuilder("Bonjour");   // Init avec contenu
\`\`\`

### Méthodes principales

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");        // "Hello World"
sb.insert(5, ",");          // "Hello, World"
sb.delete(5, 6);            // "HelloWorld"
sb.replace(0, 5, "Hi");     // "HiWorld"
sb.reverse();               // "dlroW iH"
sb.length();                 // 7
sb.capacity();               // 23 (ou plus)
sb.ensureCapacity(100);      // Garantit min 100 de capacité
\`\`\`


### StringBuffer — thread-safe mais plus lent

\`\`\`java
StringBuffer sbf = new StringBuffer("Hello");
// Toutes les méthodes sont synchronisées
sbf.append(" World");  // Thread-safe mais plus lent
\`\`\`

## Différence fondamentale

| Caractéristique | String | StringBuilder | StringBuffer |
|-----------------|--------|---------------|---------------|
| Mutabilité | Immuable | Mutable | Mutable |
| Performance | Très lente | Rapide | Plus lente (sync) |
| Thread-safe | Oui (immuable) | Non | Oui |
| Utilisation | Données statiques | Usage général | Accès multi-thread |

## Bonnes pratiques

- **StringBuilder** : toute concaténation en boucle
- **String** : chaînes statiques ou courtes concaténations uniques
- **StringBuffer** : contextes multi-thread (rare — préférez \`ConcurrentHashMap\` ou d'autres approches)

1. **Utilisez StringBuilder** pour toute concaténation en boucle
2. **Utilisez String** pour les chaînes courtes
3. **Spéculez la capacité** si vous connaissez la taille : \`new StringBuilder(tailleEstimée)\`

## Pièges courants

### Confusion avec toString()


\`\`\`java
StringBuilder sb = new StringBuilder("test");
System.out.println(sb);  // "test" - pas besoin de sb.toString()
// Pour les APIs qui attendent String :
String result = sb.toString();
\`\`\`

### Modifier une String dans une boucle

\`\`\`java
// MAUVAIS
String s = "";
for (String part : parts) {
    s = s + part;  // Crée un nouvel objet à chaque itération
}

// BON
StringBuilder sb = new StringBuilder();
for (String part : parts) {
    sb.append(part);
}
String s = sb.toString();
\`\`\`

### Oublier la capacité initiale

Sans taille estimée, StringBuilder commence avec 16 caractères et redimensionne dynamiquement.

Source : [Oracle Java Documentation - Strings](https://docs.oracle.com/javase/tutorial/java/data/strings.html)`},
        {
          id: 'java-17',
          question: 'HashMap : fonctionnement interne',
          answer: "Structure **tableau de buckets** (taille par défaut 16). La clé est hashée via `hashCode()`, puis l'index du bucket est déterminé par `hash % capacity`. En cas de **collision** (même index), les entrées sont chaînées : liste chaînée ou **arbre rouge-noir** (depuis Java 8, si >8 éléments dans un bucket).\n\n**Rehashing** : quand le *load factor* (0.75 par défaut) est dépassé, le tableau double de taille et toutes les entrées sont redistribuées. __Bonnes pratiques : initialiser avec la capacité attendue, utiliser des clés immuables et de bons `hashCode()`/`equals()`.__",
          code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("clé", 42);\n// hashCode("clé") → hash → index du bucket\n// Si collision → liste chaînée ou arbre',
          language: 'java',
        
          deepDive: `# HashMap en Java

## Qu'est-ce que c'est ?

HashMap est une structure de données qui stocke des paires **clé-valeur**. Elle utilise une fonction de hachage pour indexer les entrées, permettant des opérations **O(1)** en moyenne.

## Syntaxe et exemples

### Création et utilisation basique

\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();

scores.put("Alice", 95);
scores.put("Bob", 87);
scores.put("Charlie", 92);

int aliceScore = scores.get("Alice");        // 95
int unknown = scores.get("Eve");             // null
int withDefault = scores.getOrDefault("Eve", 0);  // 0

scores.put("Alice", 98);  // Remplace la valeur
scores.merge("Alice", 3, Integer::sum);  // Ajoute 3 -> 101

scores.remove("Bob");           // Supprime la paire
scores.remove("Alice", 95);    // Supprime seulement si valeur correspond
\`\`\`

### Fonctionnement interne — buckets et hachage

\`\`\`java
int hash = key.hashCode();  // Fonction de hachage native
int index = hash % capacity;  // Détermine le bucket
\`\`\`

### Gestion des collisions — chaining

Quand deux clés ont le même hash, HashMap utilise des **linked lists** (ou arbres depuis Java 8) pour stocker les collisions.

### Performance et load factor

| Opération | Moyenne | Pire cas |
|-----------|---------|----------|
| get/put | O(1) | O(n) |
| containsKey | O(1) | O(n) |
| itération | O(n) | O(n) |

Le **load factor** (défaut 0.75) détermine quand redimensionner. Un load factor plus bas = moins de collisions mais plus de mémoire.

\`\`\`java
HashMap<String, String> map = new HashMap<>(16, 0.5f);  // Redimensionne à 50%
\`\`\`

### Nullité et clonage

\`\`\`java
HashMap<String, Integer> map = new HashMap<>();
map.put(null, 1);     // Une clé null autorisée
map.put("key", null); // Une valeur null autorisée

HashMap<String, Integer> copy = new HashMap<>(original);
\`\`\`

### Exemple de parcours

\`\`\`java
HashMap<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);
ages.put("Charlie", 35);

for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}

ages.forEach((key, value) ->
    System.out.println(key + " = " + value)
);
\`\`\`

## Bonnes pratiques

1. **Spéculez la capacité** si vous connaissez le nombre d'éléments : \`new HashMap<>(tailleAttendée * 2)\`
2. **Utilisez des clés immuables** — si la clé change son hashCode, la lookup échouera
3. **Évitez les objets complexes comme clés** — préférez \`Integer\`, \`String\`, \`Enum\`
4. **Utilisez \`computeIfAbsent\`** pour le lazy loading

## Pièges courants

### HashMap vs Hashtable

| Caractéristique | HashMap | Hashtable |
|----------------|---------|-----------|
| Thread-safe | Non | Oui (sync) |
| Autorise null clé | Oui (1) | Non |
| Autorise null valeur | Oui | Non |
| Performance | Plus rapide | Plus lente (sync) |
| Introduit | Java 1.2 | Java 1.0 |

**Recommandation** : utilisez \`ConcurrentHashMap\` pour les environnements multi-thread.

### Clé qui change son hashCode

\`\`\`java
// MAUVAIS
class CleMutable {
    private String value;
    public int hashCode() { return value.hashCode(); }
}

// Une fois la clé utilisée dans HashMap, ne modifiez pas ses valeurs utilisées pour hashCode()
\`\`\`

### Utiliser un objet mutable comme clé

Si l'objet clé est modifié après insertion, le hashCode change et la clé devient introuvable.

Source : [Oracle Java Documentation - HashMap](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)`},
        {
          id: 'java-18',
          question: 'ConcurrentHashMap',
          answer: "Version **thread-safe** de `HashMap` sans verrouiller toute la structure. Divise la table en **segments** (Java 7) ou utilise des verrous au niveau des buckets individuels (Java 8+) : lectures sans verrou, écritures avec verrou fin.\n\nOpérations atomiques : `putIfAbsent()`, `computeIfAbsent()`, `merge()`. Performances bien supérieures à `Hashtable` ou `Collections.synchronizedMap()` en concurrence.\n\n__Choix par défaut pour les maps partagées entre threads.__",
          code: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.putIfAbsent("clé", 42);\nmap.computeIfAbsent("compteur", k -> 0);',
          language: 'java',
        
          deepDive: `# ConcurrentHashMap en Java

## Qu'est-ce que c'est ?

\`ConcurrentHashMap\` est une implémentation thread-safe de \`Map\` conçue pour les environnements multi-thread. Contrairement à \`Hashtable\` qui bloque tout le tableau pour chaque opération, \`ConcurrentHashMap\` utilise une synchronisation **fine** au niveau du bucket.

## Syntaxe et exemples

### Approche synchronisée vs ConcurrentHashMap

\`\`\`java
// Hashtable - un seul lock pour tout
Hashtable<String, Integer> ht = new Hashtable<>();
synchronized(ht) {
    ht.put(key, value);  // Tout le monde bloque
}

// ConcurrentHashMap - lock par bucket
ConcurrentHashMap<String, Integer> chm = new ConcurrentHashMap<>();
chm.put(key, value);  // Seul le bucket concerné est bloqué
\`\`\`

### Opérations atomiques

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.putIfAbsent("key", 1);  // Ajoute seulement si absent
map.computeIfAbsent("key", k -> expensiveOperation());
map.merge("counter", 1, Integer::sum);  // Incrémentation thread-safe
map.replace("key", 1, 2);  // Remplace seulement si valeur actuelle = 1
\`\`\`

### Accès et modifications concurrentes

\`\`\`java
ConcurrentHashMap<String, Integer> scores = new ConcurrentHashMap<>();

int score = scores.get("Alice");        // O(1), thread-safe
boolean exists = scores.containsKey("Bob");

scores.put("Charlie", 95);              // O(1) average
scores.remove("Alice");                 // O(1) average

scores.getOrDefault("Eve", 0);

// Itération stable pendant les modifications concurrentes
map.forEach((k, v) -> { /* ... */ });
\`\`\`

### Segmentation interne

Depuis Java 8, ConcurrentHashMap n'utilise plus un tableau de segments fixes. Elle utilise un array de **buckets** avec des **locks par node** (plus fin que par bucket).


### Méthodes spécifiques

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.get("key");  // Lecture non-bloquante
map.putIfAbsent("key", 1);  // Ajoute si absent
map.remove("key", 1);       // Supprime si valeur = 1
map.replace("key", 1, 2);   // Remplace si valeur = 1
map.size();          // Approximatif en concurrent (rapide)
map.mappingCount();  // Retourne long (préféré)
\`\`\`

## Bonnes pratiques

1. **Évitez les opérations composées non atomiques** — utilisez \`remove(key, expectedValue)\` au lieu de check-then-remove
2. **Utilisez les méthodes atomiques** — \`computeIfAbsent\`, \`merge\`, \`replace\`
3. **N'utilisez pas \`size()\` dans une boucle** — approximatif en concurrent, utilisez \`mappingCount()\`
4. **Itération** — utilisez \`forEach\` au lieu de \`entrySet()\` pour éviter les \`ConcurrentModificationException\`

## Pièges courants

### Performance comparée


| Opération | HashMap | Hashtable | ConcurrentHashMap |
|-----------|---------|-----------|-------------------|
| get (single thread) | O(1) | O(1) | O(1) |
| get (multi thread) | Unsafe | O(1)* | O(1) |
| put (multi thread) | Unsafe | O(n)* | O(1) |

* sérialisé par synchronized

### Pattern: compteur partagé

\`\`\`java
ConcurrentHashMap<String, AtomicInteger> counters = new ConcurrentHashMap<>();

counters.computeIfAbsent("page", k -> new AtomicInteger())
        .incrementAndGet();

int total = counters.values().stream()
    .mapToInt(AtomicInteger::get)
    .sum();
\`\`\`

### Itération concurrente

L'itération sur ConcurrentHashMap pendant des modifications concurrentes ne lève pas \`ConcurrentModificationException\`, mais les résultats peuvent ne pas refléter toutes les modifications.

Source : [Oracle Java Documentation - ConcurrentHashMap](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)`},
        {
          id: 'java-19',
          question: 'Comparable vs Comparator',
          answer: "**`Comparable`** : définit l'ordre **naturel** d'une classe via `compareTo()` dans la classe elle-même. Un seul ordre possible.\n\n**`Comparator`** : définit un ordre **externe** via `compare()`, séparé de la classe. Plusieurs comparateurs possibles pour différents critères.\n\nUtilisez `Comparable` si l'ordre est évident et unique (`String` par ordre alphabétique). Utilisez `Comparator` pour des tris variés ou quand vous ne pouvez pas modifier la classe.",
          code: '// Comparable (ordre naturel)\nclass Person implements Comparable<Person> {\n    public int compareTo(Person p) { return name.compareTo(p.name); }\n}\n\n// Comparator (ordre externe)\nComparator<Person> parAge = Comparator.comparingInt(p -> p.age);',
          language: 'java',
        
          deepDive: `# Comparable vs Comparator en Java

## Qu'est-ce que c'est ?

- **Comparable** : définit comment un objet se compare à un **autre objet du même type** (ordre naturel)
- **Comparator** : définit comment comparer deux objets **externement** (ordre personnalisé)

## Syntaxe et exemples

### Comparable — ordre naturel


\`\`\`java
public class Étudiant implements Comparable<Étudiant> {
    private String nom;
    private int moyenne;

    public Étudiant(String nom, int moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

    @Override
    public int compareTo(Étudiant autre) {
        return Integer.compare(autre.moyenne, this.moyenne);  // Tri décroissant
    }
}

List<Étudiant> étudiants = new ArrayList<>();
Collections.sort(étudiants);  // Utilise compareTo()
\`\`\`

### Comparator — ordre personnalisé

\`\`\`java
public class Étudiant {
    private String nom;
    private int moyenne;
}

Comparator<Étudiant> parMoyenne = (e1, e2) -> Integer.compare(e1.getMoyenne(), e2.getMoyenne());
Comparator<Étudiant> parNom = (e1, e2) -> e1.getNom().compareTo(e2.getNom());

étudiants.sort(parMoyenne);
étudiants.sort(parNom);

Collections.sort(étudiants, parNom);
\`\`\`

### Tri multi-critères avec Comparator

\`\`\`java
Comparator<Étudiant> multiTri =
    Comparator.comparingInt(Étudiant::getMoyenne)
              .thenComparing(Étudiant::getNom);

étudiants.sort(multiTri);
\`\`\`

### Comparator.comparing factories (Java 8+)

\`\`\`java
List<Étudiant> tris = étudiants.stream()
    .sorted(Comparator.comparing(Étudiant::getMoyenne))
    .toList();

List<Étudiant> décroissant = étudiants.stream()
    .sorted(Comparator.comparing(Étudiant::getMoyenne).reversed())
    .toList();

Comparator<Étudiant> nullSafe = Comparator.nullsFirst(
    Comparator.comparing(Étudiant::getNom)
);
\`\`\`

## Différence fondamentale

| Critère | Comparable | Comparator |
|---------|------------|------------|
| Qui définit l'ordre | La classe elle-même | Classe externe |
| Nombre d'ordres possibles | Un seul (naturel) | Plusieurs (multiples comparators) |
| Modifie la classe | Oui | Non |
| Collections.sort | Oui (pas de deuxième arg) | Oui (avec comparator) |

## Bonnes pratiques

1. **Implémentez Comparable** quand il y a un ordre naturel évident
2. **Utilisez Comparator** pour plusieurs ordres de tri
3. **Utilisez \`Comparator.comparing\`** pour du code plus lisible
4. **Gérez les nulls** avec \`nullsFirst\` ou \`nullsLast\`

## Pièges courants

### 1. Violer la relation transitive

\`\`\`java
// MAUVAIS
public int compareTo(Étudiant autre) {
    if (this.moyenne != autre.moyenne)
        return this.moyenne - autre.moyenne;
    // Oubli dans certains cas...
}

// BON - inclure TOUS les critères
public int compareTo(Étudiant autre) {
    int cmp = Integer.compare(this.moyenne, autre.moyenne);
    if (cmp != 0) return cmp;
    return this.nom.compareTo(autre.nom);
}
\`\`\`

### 2. Utiliser la soustraction pour les entiers

\`\`\`java
// DANGEREUX - peut déborder
return this.prix - p.prix;

// BON - utiliser Integer.compare
return Integer.compare(this.prix, p.prix);
\`\`\`

Source : [Oracle Java Documentation - Object Ordering](https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html)`},
        {
          id: 'java-20',
          question: 'Record (Java 14+)',
          answer: "**`record`** = classe immuable générant automatiquement constructeur, `getters`, `equals()`, `hashCode()` et `toString()`. Idéal pour les **DTOs** et objets de valeur.\n\nPlus concis qu'une classe classique : `public record Person(String nom, int age) {}` remplace des dizaines de lignes de boilerplate.\n\nLes champs sont **finaux** par définition. On peut ajouter des méthodes et valider dans le constructeur compact. __Le remplaçant moderne des DTOs écrits à la main.__",
          code: 'public record Person(String nom, int age) {\n    // Constructeur compact avec validation\n    public Person {\n        if (age < 0) throw new IllegalArgumentException();\n    }\n}',
          language: 'java',
        
          deepDive: `# Les Records en Java (Java 14+)

## Qu'est-ce que c'est ?

Un **Record** est un nouveau type de classe en Java (preview en Java 14, final en Java 16) qui permet de creer des classes de donnees immuables avec un minimum de code. Le compilateur genere automatiquement :
- Constructeur avec tous les champs
- Getters (appeles par le nom du champ, sans "get")
- equals(), hashCode() et toString()

Syntaxe de base :
\`\`\`java
public record User(int id, String name, String email) {}
\`\`\`

Les champs sont automatiquement prives et finals.

## Syntaxe et exemples

### Declaration simple
\`\`\`java
public record Point(int x, int y) {}
\`\`\`

### Utilisation
\`\`\`java
Point p = new Point(10, 20);
System.out.println(p.x()); // 10
System.out.println(p.y()); // 20
System.out.println(p); // Point[x=10, y=20]
\`\`\`

### Constructeur compact (validation)
\`\`\`java
public record User(int id, String name) {
    public User {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Name cannot be null");
        name = name.strip();
    }
}
\`\`\`

### Methodes static
\`\`\`java
public record Color(int r, int g, int b) {
    public static Color RED = new Color(255, 0, 0);
}
\`\`\`

### Records generiques
\`\`\`java
public record Pair<T, U>(T first, U second) {}
\`\`\`

### Pattern matching (Java 16+)
\`\`\`java
if (obj instanceof Point(int x, int y)) {
    System.out.println("X: " + x);
}
\`\`\`

## Bonnes pratiques

- **Immuabilite** : ne pas ajouter de setters, les champs restent finals
- **Constructeur compact** : valider ou normaliser les champs a la creation
- **Interfaces** : un record peut implementer une interface (mais pas heriter d'une classe)
- **Records locaux** : declaration dans une methode pour regrouper des donnees temporaires
- **Sealed records** : combiner avec sealed pour controler les sous-types

## Pieges courants

- **Null** : les champs peuvent etre null, verifier avant utilisation
- **Pas d'heritage de classe** : un record ne peut pas etendre une classe
- **Pas de modification** : une fois cree, l'etat est immutable
- **Serialization** : ne pas utiliser pour RMI ou corba sans precautions

Source : [Oracle Java Documentation - Records](https://docs.oracle.com/en/java/javase/21/docs/api/java.se/java/lang/Record.html)`},
      ],
    },
    {
      id: 'java-8plus',
      title: 'Java 8+',
      questions: [
        {
          id: 'java-21',
          question: 'Lambda expressions',
          answer: "Une **lambda** représente une **interface fonctionnelle** (une seule méthode abstraite) de manière concise : `(a, b) -> a.compareTo(b)` au lieu d'une classe anonyme.\n\nLiées aux `Stream`s, `Optional` et références de méthodes (`System.out::println`). Les variables capturées doivent être *effectivement final*. Les lambdas rendent le code plus **déclaratif** et *expressif*.",
          code: 'Calcul add = (a, b) -> a + b;\nadd.operation(5, 3);  // 8',
          language: 'java',
        
          deepDive: `# Les expressions Lambda en Java

## Qu'est-ce que c'est ?

Une expression lambda est une **fonction anonyme** — un bloc de code que vous pouvez passer comme argument à une méthode. Elles permettent un style de programmation **fonctionnel** plus concis.

## Syntaxe et exemples

\`\`\`java
// Syntaxe complète
Comparator<String> comp = (String a, String b) -> {
    return a.length() - b.length();
};

// Syntaxe simplifiée - inférence de type
Comparator<String> comp2 = (a, b) -> a.length() - b.length();

// Sans paramètres
Runnable r = () -> System.out.println("Hello");

// Un seul paramètre - parenthèses optionnelles
ActionListener listener = e -> System.out.println("Clicked");
\`\`\`

### Method references

Les method references sont un shorthand pour les lambdas qui appellent une méthode existante :

\`\`\`java
// Syntaxe: Classe::méthodeInstance ou Classe::méthodeStatic

// Méthode d'instance
String::toUpperCase    // x -> x.toUpperCase()
System.out::println    // x -> System.out.println(x)

// Méthode statique
Math::max              // (a, b) -> Math.max(a, b)

// Constructeur
ArrayList::new          // () -> new ArrayList()
\`\`\`

### Interfaces fonctionnelles

Une lambda doit implémenter une **interface fonctionnelle** (une seule méthode abstraite) :

\`\`\`java
// java.util.function contient les plus courantes :

// Function<T, R> - transforme T en R
Function<String, Integer> toLength = String::length;

// Consumer<T> - consume T, ne retourne rien
Consumer<String> printer = System.out::println;

// Supplier<T> - fournit T
Supplier<LocalDateTime> now = LocalDateTime::now;

// Predicate<T> - test booléen sur T
Predicate<String> isLong = s -> s.length() > 10;
\`\`\`

### Closures et variables externes

Les lambdas peuvent **capturer** des variables de leur portée (closure). Les variables capturées doivent être **effectively final** :

\`\`\`java
int facteur = 10;
List<Integer> résultats = nums.stream()
    .map(n -> n * facteur)  // Accède à facteur
    .toList();

// facteur = 20;  // ERREUR - facteur est effectively final
\`\`\`

### Composition de fonctions

\`\`\`java
Function<Integer, Integer> double = x -> x * 2;
Function<Integer, Integer> addTen = x -> x + 10;

Function<Integer, Integer> doubleThenAdd = double.andThen(addTen);
doubleThenAdd.apply(5);  // (5 * 2) + 10 = 20

Function<Integer, Integer> addThenDouble = double.compose(addTen);
addThenDouble.apply(5);  // (5 + 10) * 2 = 30
\`\`\`

### Predicates combinés

\`\`\`java
Predicate<String> isLong = s -> s.length() > 5;
Predicate<String> hasA = s -> s.contains("a");

Predicate<String> longAndHasA = isLong.and(hasA);
Predicate<String> longOrHasA = isLong.or(hasA);
Predicate<String> notLong = isLong.negate();
\`\`\`

## Bonnes pratiques

- **Préférer les method references** quand la lambda appelle une méthode existante
  - \`list.stream().map(String::toUpperCase)\` au lieu de \`s -> s.toUpperCase()\`
- **Éviter les lambdas trop longues** — extraire dans une méthode
- **Éviter les effets de bord dans les lambdas**

## Pièges courants

- Utiliser une lambda dans un contexte non-fonctionnel (plusieurs méthodes abstraites)
- Capturer des variables non-finales ou mutables
- Créer des lambdas avec des effets de bord (modification d'état externe)

Source : [Oracle Java Documentation - Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)`},
        {
          id: 'java-22',
          question: 'Streams',
          answer: "Abstraction fonctionnelle pour traiter les collections. **Opérations intermédiaires** (`filter`, `map`, `sorted`) : retournent un `Stream`, sont *lazy*. **Opérations terminales** (`collect`, `forEach`, `reduce`) : déclenchent le pipeline et produisent un résultat.\n\n`parallelStream()` permet la parallélisation. Idéal pour les transformations de données déclaratives ; pour les boucles simples avec effets de bord, `for` reste plus approprié.",
          code: 'names.stream()\n     .filter(n -> n.startsWith("A"))\n     .forEach(System.out::println);',
          language: 'java',
        
          deepDive: `# Les Streams en Java

## Qu'est-ce que c'est ?

Les Streams représentent un **pipeline de données** pour traiter des collections de manière fonctionnelle et déclarative. Ils ne stockent pas de données — ils parcourent une source et appliquent des opérations.

## Syntaxe et exemples

### Structure d'un pipeline Stream

\`\`\`
Source (Collection) -> Intermediate ops (filter/map) -> Terminal op (collect/forEach)
                                          |
                                     Lazy evaluation
\`\`\`

\`\`\`java
List<String> names = List.of("Alice", "Bob", "Charlie");

List<String> result = names.stream()           // 1. Source
    .filter(s -> s.length() > 3)              // 2. Intermediate (lazy)
    .map(String::toUpperCase)                 // 3. Intermediate (lazy)
    .sorted()                                 // 4. Intermediate (lazy)
    .toList();                                // 5. Terminal (eager)
\`\`\`

### Création de Streams

\`\`\`java
List<String> list = List.of("a", "b", "c");
Stream<String> stream = list.stream();

Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5);
Stream<Integer> empty = Stream.empty();

Stream<Integer> powers = Stream.iterate(1, n -> n * 2).limit(10);
Stream<Double> randoms = Stream.generate(Math::random).limit(5);

IntStream.range(1, 5);      // 1, 2, 3, 4
IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5
\`\`\`

### Opérations intermédiaires

#### filter — garder les éléments qui satisfont un prédicat

\`\`\`java
List<Integer> pairs = nums.stream()
    .filter(n -> n % 2 == 0)
    .toList();
\`\`\`

#### map — transformer chaque élément

\`\`\`java
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .toList();

List<Integer> lengths = names.stream()
    .map(String::length)
    .toList();
\`\`\`

#### flatMap — aplanir les collections imbriquées

\`\`\`java
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4), List.of(5));

List<Integer> flat = nested.stream()
    .flatMap(list -> list.stream())
    .toList();
\`\`\`

#### distinct, sorted, limit, skip

\`\`\`java
List<Integer> uniques = avecDoublons.stream().distinct().toList();
List<String> trié = names.stream().sorted().toList();
List<Integer> page2 = nums.stream().skip(20).limit(20).toList();
\`\`\`

### Opérations terminales

#### collect — réunir les résultats

\`\`\`java
List<String> list = stream.collect(Collectors.toList());
Set<String> set = stream.collect(Collectors.toSet());
Map<String, Integer> map = stream.collect(Collectors.toMap(String::toUpperCase, String::length));
Map<Integer, List<String>> byLength = stream.collect(Collectors.groupingBy(String::length));
String joined = stream.collect(Collectors.joining(", "));
\`\`\`

#### reduce — accumuler en une seule valeur

\`\`\`java
int sum = IntStream.of(1, 2, 3, 4, 5).reduce(0, (a, b) -> a + b);  // 15

String longest = Stream.of("apple", "banana", "cherry")
    .reduce("", (a, b) -> a.length() > b.length() ? a : b);  // "banana"
\`\`\`

#### forEach

\`\`\`java
names.forEach(System.out::println);
names.forEach(name -> System.out.println("Hello " + name));
\`\`\`

### Parallélisme

\`\`\`java
list.parallelStream()
    .filter(...)
    .toList();
\`\`\`

**Quand utiliser le parallélisme** : grandes collections, opérations coûteuses (CPU-bound). Pour de petites collections, le parallélisme est souvent plus lent.

## Bonnes pratiques

- **Éviter les opérations avec effets de bord** (forEach avec mutation)
- **Ne pas réutiliser un Stream** — un stream ne peut être consumé qu'une fois
- **Préférer les opérations courtes** (filter avant map)
- **Utiliser le parallélisme judicieusement**

## Pièges courants

- Consummer un Stream plusieurs fois ( AlreadyHasBeenProcessedException )
- Oublier le terminal operation (le pipeline ne s'exécute pas)
- Utiliser des opérations mutables dans des contextes concurrents

Source : [Oracle Java Documentation - Streams](https://docs.oracle.com/javase/tutorial/streams/)`},
        {
          id: 'java-23',
          question: 'Optional',
          answer: "**`Optional`** : conteneur qui peut contenir ou non une valeur, introduit pour éviter les `NullPointerException`. Au lieu de `get()` risqué, on utilise `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n`Optional` rend explicite la possibilité d'absence de valeur. __Bonnes pratiques__ : utiliser uniquement comme type de retour, jamais comme champ ou paramètre, et __ne jamais retourner un `Optional` `null`__.",
          code: 'Optional<String> name = Optional.ofNullable(getName());\nname.ifPresent(System.out::println);',
          language: 'java',
        
          deepDive: `# Optional en Java

## Qu'est-ce que c'est ?

Optional est une approche fonctionnelle pour représenter l'absence de valeur, résolvant le problème des références null qui causent des NullPointerException.

## Syntaxe et exemples

### Création d'Optional

\`\`\`java
Optional<String> opt1 = Optional.of("value");        // NullPointerException si null
Optional<String> opt2 = Optional.ofNullable(null);   // Retourne empty Optional
Optional<String> empty = Optional.empty();
\`\`\`

### Inspection (sans exception)

\`\`\`java
Optional<String> opt = Optional.of("hello");

opt.isPresent();   // true
opt.isEmpty();      // false (Java 11+)

opt.ifPresent(value -> System.out.println("Value: " + value));

// get() - à éviter (jette NoSuchElementException si empty)
opt.get();  // "hello" - OK
Optional.empty().get();  // NoSuchElementException !
\`\`\`

### Extraction avec orElse

\`\`\`java
Optional<String> opt = Optional.ofNullable(possiblyNull);

String result = opt.orElse("default");  // "default" si empty
String result = opt.orElseGet(() -> computeDefault());  // Appelé seulement si empty
String result = opt.orElseThrow(() -> new IllegalStateException("Value required"));
\`\`\`

### Transformation (sans condition)

\`\`\`java
Optional<User> user = findById(1);

Optional<String> name = user.map(User::getName);  // Optional<String>
Optional<String> email = user.flatMap(u -> u.getEmail());  // Optional<String>
Optional<User> adult = user.filter(u -> u.getAge() >= 18);
\`\`\`

### Chaining avec Optional

\`\`\`java
String city = employee.stream()
    .filter(e -> e.isTeamLead())
    .findFirst()
    .flatMap(TeamLead::getMother)
    .flatMap(Person::getAddress)
    .map(Address::getCity)
    .orElse("Unknown");
\`\`\`

### Optional dans les retours de méthodes

\`\`\`java
// Ancien style - null pour "pas de résultat"
User findById(int id) { return null; }  // NPE risque

// Nouveau style - Optional explicite
Optional<User> findById(int id) {
    return database.contains(id)
        ? Optional.of(database.get(id))
        : Optional.empty();
}
\`\`\`

## Bonnes pratiques

- **Utilisez Optional pour les retours de méthodes** qui peuvent ne pas avoir de résultat — jamais null
- **Utilisez orElseGet** quand le default est coûteux à calculer (lazy)
- **Préférez map/flatMap/filter** pour transformer les valeurs

## Pièges courants

- **Ne pas utiliser Optional comme champ** (problème de sérialisation)
- **Ne pas utiliser Optional pour les paramètres** — préférer des surcharges
- **Ne jamais appeler get() sans isPresent()** — risque de NoSuchElementException
- **Ne pas utiliser Optional pour wrapper un primitive** — utilisez OptionalInt, OptionalLong, OptionalDouble

Source : [Oracle Java Documentation - Optional](https://docs.oracle.com/javase/tutorial/essential/env/misc.html)`},
        {
          id: 'java-24',
          question: 'Interface fonctionnelle',
          answer: "Interface avec **exactement une méthode abstraite** — condition nécessaire pour les expressions lambda. Annotation `@FunctionalInterface` (optionnelle mais recommandée) pour vérification compile-time.\n\nInterfaces fonctionnelles standard : `Predicate<T>` (test booléen), `Function<T,R>` (transformation), `Consumer<T>` (action sans retour), `Supplier<T>` (fabrication), `BiFunction<T,U,R>` (deux arguments).\n\nBase de toute la programmation fonctionnelle Java 8+. __Toute lambda nécessite une interface fonctionnelle.__",
          code: '@FunctionalInterface\npublic interface Calcul {\n    int operation(int a, int b);\n}\n\nCalcul add = (a, b) -> a + b;',
          language: 'java',
        
          deepDive: `# Les interfaces fonctionnelles en Java

## Qu'est-ce que c'est ?

Une interface fonctionnelle est une interface avec **une seule méthode abstraite**. Elle peut avoir des méthodes par défaut ou statiques, mais une seule méthode abstraite (SAM).

## Syntaxe et exemples

\`\`\`java
@FunctionalInterface
public interface Converter<T, R> {
    R convert(T input);

    default void log(String message) {
        System.out.println("Converter: " + message);
    }
}
\`\`\`

### L'annotation @FunctionalInterface

\`\`\`java
@FunctionalInterface
public interface Printable {
    void print(String content);
}

// Le compilateur vérifie que l'interface a exactement une méthode abstraite
\`\`\`

### Interfaces fonctionnelles prédéfinies (java.util.function)

#### Function<T, R> — transforme T en R

\`\`\`java
Function<String, Integer> strToInt = Integer::parseInt;
Function<String, String> f = s -> s.toUpperCase();
Function<String, String> g = s -> s + "!";
Function<String, String> composed = f.andThen(g);  // s -> f(s) puis g(résultat)
composed.apply("hello");  // "HELLO!"
\`\`\`

#### Consumer<T> — consume T, ne retourne rien

\`\`\`java
Consumer<String> printer = System.out::println;
Consumer<String> combined = printer.andThen(logger);
combined.accept("Test");  // Affiche "Test" puis "LOG: Test"
\`\`\`

#### Supplier<T> — fournit T

\`\`\`java
Supplier<LocalDateTime> now = LocalDateTime::now;
Supplier<List<String>> listFactory = ArrayList::new;

LocalDateTime dt = now.get();
List<String> list = listFactory.get();
\`\`\`

#### Predicate<T> — test booléen sur T

\`\`\`java
Predicate<String> isLong = s -> s.length() > 5;
Predicate<String> hasA = s -> s.contains("a");

Predicate<String> combined = isLong.and(hasA);
Predicate<String> orCombined = isLong.or(hasA);
Predicate<String> negated = isLong.negate();
\`\`\`

#### UnaryOperator<T> et BinaryOperator<T>

\`\`\`java
UnaryOperator<Integer> double = n -> n * 2;
double.apply(5);  // 10

BinaryOperator<Integer> add = (a, b) -> a + b;
add.apply(3, 4);  // 7

BinaryOperator<Integer> max = Integer::max;
BinaryOperator<Integer> min = Integer::min;
\`\`\`

### Synthèse : quand utiliser quoi

| Besoin | Interface | Exemple |
|--------|-----------|---------|
| Transformer T -> R | Function<T,R> | s -> s.length() |
| Consommer T (void) | Consumer<T> | s -> System.out.println(s) |
| Créer T | Supplier<T> | () -> new ArrayList<>() |
| Tester T (bool) | Predicate<T> | s -> s.isEmpty() |
| Deux T -> T | BinaryOperator<T> | Integer::sum |
| T -> T | UnaryOperator<T> | n -> n * 2 |

## Bonnes pratiques

- **Marquez vos interfaces fonctionnelles avec @FunctionalInterface** pour la vérification à la compilation
- **Préférez les interfaces prédéfinies** de java.util.function
- **Utilisez les method references** pour plus de lisibilité

## Pièges courants

- Déclarer une interface fonctionnelle sans vérifier qu'elle n'a qu'une seule méthode abstraite
- Ajouter par erreur une deuxième méthode abstraite (plus tard, lors de maintenance)
- Utiliser des interfaces non-fonctionnelles avec des lambdas

Source : [Oracle Java Documentation - Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)`},
        {
          id: 'java-25',
          question: 'Sealed Classes (Java 17)',
          answer: "Les **sealed classes** permettent de **restreindre les sous-classes** autorisées via `permits`. Contrairement aux `final` (aucune sous-classe) ou open (toutes), on contrôle précisément la hiérarchie.\n\nAvantage : le compilateur connaît toutes les implémentations possibles → **pattern matching exhaustif** dans les `switch`.\n\nComplémentaire des records pour modéliser des hiérarchies fermées. __Utile pour les ADT (Algebraic Data Types) et les modèles de domaine.__",
          code: 'public sealed class Forme permits Cercle, Rectangle, Triangle {}\npublic record Cercle(double rayon) extends Forme {}\npublic record Rectangle(double largeur, double hauteur) extends Forme {}',
          language: 'java',
        
          deepDive: `# Les Sealed Classes en Java (Java 17+)

## Qu'est-ce que c'est ?

Les sealed classes limitent quels classes peuvent hériter d'une classe ou implémenter une interface. En listant explicitement les sous-classes autorisées, le compilateur peut garantir l'exhaustivité dans les expressions switch et améliorer la sécurité des types.

## Syntaxe et exemples

### Déclaration de base

\`\`\`java
public sealed class Shape permits Circle, Rectangle, Triangle {
    // Classe abstraite par nature
}

// Les sous-classes doivent être :
// - final (ne peut plus être héritée)
// - sealed (héritée mais restriction)
// - non-sealed (héritage libre)
\`\`\`

### Les trois modificateurs pour les sous-classes

\`\`\`java
public sealed class Animal permits Dog, Cat, Bird {}

final class Dog extends Animal {}  // Choix terminé

sealed class Cat extends Animal permits PersianCat, SiameseCat {}
final class PersianCat extends Cat {}
final class SiameseCat extends Cat {}

non-sealed class Bird extends Animal {}  // Héritage libre
class Eagle extends Bird {}
class Penguin extends Bird {}
\`\`\`

### Switch exhaustif avec sealed

\`\`\`java
public sealed class Shape permits Circle, Rectangle, Square {
    double area() {
        return switch (this) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Rectangle r -> r.width() * r.height();
            case Square s -> s.side() * s.side();
        };
    }
}
\`\`\`

Sans sealed, le compilateur ne peut pas vérifier si tous les cas sont couverts.

### Exemple : State Machine pattern

\`\`\`java
public sealed class State permits Idle, Running, Paused, Stopped {}

final class Idle extends State {}
final class Running extends State {}
final class Paused extends State {}
final class Stopped extends State {}

State next(State current) {
    return switch (current) {
        case Idle i -> new Running();
        case Running r -> new Paused();
        case Paused p -> new Running();
        case Stopped s -> new Idle();
    };
}
\`\`\`

### Sealed vs Enum vs Abstract

| Caractéristique | Sealed | Enum | Abstract |
|----------------|--------|------|----------|
| Instances finies | Oui | Oui | Non |
| Données par instance | Oui | Limité | Oui |
| Héritage contrôlé | Oui | Non (immuable) | Non |
| Instances multiples illimitées | Non | Non | Oui |

\`\`\`java
// Enum - cas fixes et sans données
enum Direction { NORTH, SOUTH, EAST, WEST }

// Sealed - cas avec états
sealed interface Expr permits Literal, Binary, Unary {}

// Abstract - héritage libre
abstract class Shape { abstract double area(); }
\`\`\`

## Bonnes pratiques

- **Utilisez sealed pour les types fermés** — choix finis de variantes
- **Combinez avec record** pour des données immuables : \`sealed interface Expr permits Literal, Binary { record Literal(Value v) implements Expr {} }\`
- **Exploitez le switch exhaustif** pour éviter les cas non gérés

## Pièges courants

- Oublier de déclarer \`permits\` (erreur de compilation en Java 17+)
- Toutes les sous-classes ne doivent pas être dans le même module (module visibility)
- Utiliser sealed quand un héritage ouvert est nécessaire

Source : [Oracle Java Documentation - Sealed Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classdecl.html)`},
      ],
    },
    {
      id: 'java-avance',
      title: 'Concurrence & Avancé',
      questions: [
        {
          id: 'java-26',
          question: 'synchronized vs volatile',
          answer: "**`synchronized`** : verrouille un bloc/méthode pour un seul thread à la fois — offre *atomicité + visibilité* mais peut causer des **deadlocks**. **`volatile`** : force la lecture/écriture directe en mémoire principale — offre uniquement la *visibilité*, sans verrou.\n\n__Attention__ : `i++` n'est pas atomique même si `i` est `volatile`. En pratique : `volatile` pour les flags simples, `synchronized` pour les opérations composées nécessitant une cohérence forte.",
        
          deepDive: `# synchronized vs volatile en Java

## Qu'est-ce que c'est ?

En Java multi-thread, chaque thread a sa propre **vision du cache CPU**. Une modification faite par un thread peut ne pas être visible immédiatement par les autres. Les mots-clés \`synchronized\` et \`volatile\` résolvent ce problème de manière différente.

## Syntaxe et exemples

### volatile — visibilité garantie

volatile garantit que **tout thread lisant le champ verra la dernière écriture** faite par n'importe quel autre thread.

\`\`\`java
public class SharedData {
    volatile boolean ready = false;
    volatile int count = 0;
}

// Thread 1                       // Thread 2
shared.ready = true;              while (!shared.ready) { }  // Sortira de la boucle
shared.count = 42;               System.out.println(shared.count);  // Affichera 42
\`\`\`

#### Ce que volatile garantit

1. **Visibilité immédiate** — toute écriture est visible par les lectures suivantes
2. **Pas de reordering** — le compilateur/CPU ne réorganisera pas les opérations volatile

#### Ce que volatile ne garantit PAS

\`\`\`java
volatile int counter = 0;

// Thread 1                       // Thread 2
counter++;                        // Non thread-safe! counter++ est :
//   1. Lire counter (ex: 0)
//   2. Incrémenter (0 -> 1)
//   3. Écrire counter (1)
//   Si les deux threads font ++ en même temps: 1 au lieu de 2
\`\`\`

### synchronized — exclusion mutuelle

synchronized garantit **atomicité** (opération non-interrompable) et **visibilité** :

\`\`\`java
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;  // Opération atomique - pas de race condition
    }

    public synchronized int getCount() {
        return count;
    }
}
\`\`\`

#### Comment ça marche

Chaque objet Java a un **intrinsic lock**. Quand un thread entre dans un bloc synchronized, il acquiert le lock. Les autres threads sont bloqués jusqu'à ce que le premier thread libère le lock.

\`\`\`java
synchronized (this) { /* Accès aux champs partagés */ }
synchronized (Counter.class) { /* Accès aux champs static */ }

public synchronized void increment() { }  // Équivalent à synchronized(this)
\`\`\`

### Comparaison volatile vs synchronized

| Caractéristique | volatile | synchronized |
|----------------|----------|--------------|
| Visibilité inter-thread | Oui | Oui |
| Atomicité | Non | Oui |
| Blocage | Non | Oui (acquire lock) |
| Performance | Très rapide | Plus lent |
| Deadlock | Aucun | Possible |

### Cas d'utilisation

#### volatile — quand la lecture est souvent plus fréquente que l'écriture

\`\`\`java
private volatile boolean running = true;

public void stop() { running = false; }
public void run() {
    while (running) { /* Travail */ }
}
\`\`\`

#### synchronized — opérations composites sur des données partagées

\`\`\`java
private int counter = 0;

public void increment() {
    synchronized (this) {
        counter++;  // Lecture + incrément + écriture
    }
}
\`\`\`

### Alternatives modernes

\`\`\`java
// java.util.concurrent.atomic - opérations atomiques sur primitives
private final AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();       // Thread-safe, non-blocking
counter.getAndIncrement();      // Lecture + incrément
counter.compareAndSet(5, 10);   // Atomique: si == 5, alors = 10

AtomicLong counter2 = new AtomicLong(0);
counter2.incrementAndGet();
\`\`\`

## Bonnes pratiques

- **volatile pour les flags** (stop, ready, initialized)
- **synchronized pour les opérations composites** (compteur++, check-then-act)
- **Atomic* pour les compteurs** dans des environnements concurrentiels
- **Éviter de synchroniser sur this** — utiliser un lock privé

## Pièges courants

- Croire que volatile suffit pour les compteurs (counter++ n'est pas atomique)
- Créer des deadlocks avec synchronized (blocage circulaire)
- Oublier de déclarer une variable comme volatile dans un contexte multi-thread
- Utiliser des primitives primitives au lieu de Atomic* pour les compteurs

Source : [Oracle Java Documentation - Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html)`},
        {
          id: 'java-27',
          question: 'ExecutorService & CompletableFuture',
          answer: "Le framework **Executor** (Java 5) remplace la gestion manuelle des threads : `ExecutorService` gère un pool de threads configurable (`FixedThreadPool`, `CachedThreadPool`, `ScheduledThreadPool`). On soumet des tâches via `submit()` et `invokeAll()`.\n\n**CompletableFuture** (Java 8) apporte la programmation asynchrone déclarative : chaînage avec `thenApply()`, `thenCompose()`, `thenAccept()`, combinaison avec `allOf()`/`anyOf()`, gestion d'erreurs avec `exceptionally()`/`handle()`.\n\nAvantages : pas de création manuelle de threads, pool réutilisable, callbacks non bloquants. __Règle : ne jamais créer de threads manuellement, toujours passer par l'ExecutorService.__",
          code: 'ExecutorService pool = Executors.newFixedThreadPool(4);\n\n// ExecutorService\npool.submit(() -> traiter(données));\n\n// CompletableFuture\nCompletableFuture\n    .supplyAsync(() -> fetchUser(id), pool)\n    .thenApply(user -> enrichir(user))\n    .thenAccept(result -> logger.info(result))\n    .exceptionally(ex -> { logger.error(ex); return null; });',
          language: 'java',
        
          deepDive: `# ExecutorService et CompletableFuture en Java

## Qu'est-ce que c'est ?

Créer un thread par tâche est inefficace. ExecutorService fournit un **pool de threads** réutilisables, et CompletableFuture permet une **programmation asynchrone** avec composition.

## Syntaxe et exemples

### ExecutorService — pool de threads

\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(4);   // 4 threads
ExecutorService executor = Executors.newCachedThreadPool();   // Threads dynamiques
ExecutorService executor = Executors.newSingleThreadExecutor(); // 1 thread

executor.submit(() -> System.out.println("Task 1"));

executor.shutdown();
executor.shutdownNow();
executor.awaitTermination(10, TimeUnit.SECONDS);
\`\`\`

### ExecutorService avec return et exceptions

\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(2);

// Callable - retourne un résultat
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

try {
    Integer result = future.get();  // Bloque
    Integer result = future.get(5, TimeUnit.SECONDS);  // Timeout
} catch (ExecutionException e) {
    System.out.println("Erreur: " + e.getCause());
}
\`\`\`

### CompletableFuture — programmation asynchrone

CompletableFuture est un Future enrichi pour la composition et le chaining :

\`\`\`java
CompletableFuture<String> async = CompletableFuture.supplyAsync(() -> {
    return "Done";
});
\`\`\`

#### Opérations de transformation

\`\`\`java
CompletableFuture<String> cf = CompletableFuture
    .supplyAsync(() -> "hello");

CompletableFuture<Integer> length = cf.thenApply(String::length);
CompletableFuture<Void> displayed = cf.thenAccept(s -> System.out.println(s));
CompletableFuture<Integer> result = cf
    .thenApply(Integer::parseInt)
    .exceptionally(ex -> 0);
\`\`\`

#### Combinaison de plusieurs CompletableFutures

\`\`\`java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = f1.thenCombine(f2, (a, b) -> a + " " + b);
CompletableFuture<Void> both = CompletableFuture.allOf(f1, f2);
CompletableFuture<Object> first = CompletableFuture.anyOf(f1, f2);
\`\`\`

### Exemple complet

\`\`\`java
public CompletableFuture<String> fetchUserData(Long userId) {
    return CompletableFuture
        .supplyAsync(() -> userService.findById(userId))
        .thenCompose(user -> CompletableFuture.supplyAsync(() -> orderService.findByUser(user.getId())))
        .thenApply(orders -> analyzeOrders(orders))
        .exceptionally(ex -> {
            log.error("Erreur: " + ex.getMessage());
            return "Error";
        });
}
\`\`\`

### Thread pool strategies

\`\`\`java
// I/O bound - tâches courtes et nombreuses
ExecutorService ioPool = Executors.newCachedThreadPool();

// CPU bound - tâches longues
ExecutorService cpuPool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
\`\`\`

## Bonnes pratiques

- **Spécifiez toujours un ExecutorService** pour les opérations async
- **Shutdown quand l'application finit** — sinon les threads restent actifs
- **Utilisez thenCompose** au lieu de thenApply quand le résultat est un autre CompletableFuture
- **Utilisez exceptionally** pour gérer centralement les erreurs

## Pièges courants

- Oublier le shutdown (threads orphelins, application ne se termine pas)
- Utiliser un FixedThreadPool avec trop de threads (OOM)
- Bloquer sur future.get() dans un thread du pool (deadlock)
- Ne pas gérer les exceptions dans les CompletableFuture

Source : [Oracle Java Documentation - Executors](https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html)`},
        {
          id: 'java-28',
          question: 'Réflexion',
          answer: "Capacité d'un programme à s'inspecter et se modifier au runtime : instancier via `Class.forName()`, invoquer des méthodes par nom, accéder aux champs `private` via `setAccessible(true)`.\n\nUtilisé par **Spring** (injection de dépendances, scan d'annotations) et **Hibernate** (mapping O/R). Inconvénients : plus lent, contourne la vérification de type et l'encapsulation, risque de sécurité. __Indispensable pour les frameworks, à éviter dans le code métier__.",
        
          deepDive: `# La réflexion en Java (Reflection API)

## Qu'est-ce que c'est ?

La réflexion permet à un programme d'**inspecter et manipuler** ses propres classes, méthodes et champs à l'exécution — même ceux qui sont privés. C'est une forme d'introspection dynamique.

## Syntaxe et exemples

### Classes fondamentales

\`\`\`java
import java.lang.reflect.*;

Class<?> clazz = String.class;              // Via .class
Class<?> clazz = "hello".getClass();        // Via instance
Class<?> clazz = Class.forName("java.lang.String");  // Par nom
\`\`\`

### Inspection de classe

\`\`\`java
Class<?> clazz = MyClass.class;

String name = clazz.getName();
String simpleName = clazz.getSimpleName();
int modifiers = clazz.getModifiers();

Package pkg = clazz.getPackage();
Class<?> superClazz = clazz.getSuperclass();
Class<?>[] interfaces = clazz.getInterfaces();

Constructor<?>[] constructors = clazz.getDeclaredConstructors();
Method[] methods = clazz.getDeclaredMethods();
Field[] fields = clazz.getDeclaredFields();
\`\`\`

### Instanciation dynamique

\`\`\`java
Class<?> clazz = Class.forName("com.example.MyClass");

Constructor<?> ctor = clazz.getDeclaredConstructor(String.class, int.class);
Object obj = ctor.newInstance("Hello", 42);
\`\`\`

### Accès aux champs

\`\`\`java
class Person {
    private String name;
    public int age;
}

Class<?> clazz = Person.class;
Person p = new Person();

Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true);

String name = (String) nameField.get(p);
nameField.set(p, "Alice");

int age = (int) ageField.get(p);
ageField.set(p, 30);
\`\`\`

### Accès aux méthodes

\`\`\`java
class Calculator {
    public int add(int a, int b) { return a + b; }
    private int multiply(int a, int b) { return a * b; }
}

Method addMethod = clazz.getMethod("add", int.class, int.class);
int result = (int) addMethod.invoke(calc, 3, 4);  // 7

Method multiplyMethod = clazz.getDeclaredMethod("multiply", int.class, int.class);
multiplyMethod.setAccessible(true);
int product = (int) multiplyMethod.invoke(calc, 3, 4);  // 12
\`\`\`

### Usage légitime

#### 1. Framework (Spring, Hibernate, JUnit)

\`\`\`java
// Spring utilise la réflexion pour injecter les dépendances
@Autowired
private UserService userService;
\`\`\`

#### 2. Jackson/Gson JSON mapping

\`\`\`java
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(myObject);
\`\`\`

#### 3. JUnit test runners

\`\`\`java
@Test
public void myTest() { }  // JUnit trouve cette méthode via réflexion
\`\`\`

### Risques et limitations

#### 1. Performance dégradée

\`\`\`java
// L'invocation par réflexion est plus lente que l'appel direct
Method method = clazz.getMethod("doSomething", String.class);
method.invoke(obj, "test");  // Plus lent que obj.doSomething("test")
\`\`\`

#### 2. Violation de l'encapsulation

\`\`\`java
field.setAccessible(true);  // Accéder au champ privé
field.set(obj, value);      // Modifier même les finals
\`\`\`

#### 3. Pas de compile-time checking

\`\`\`java
Method m = clazz.getMethod("doSomethng");  // typo - no error until runtime!
\`\`\`

## Bonnes pratiques

- **Cachez les objets Method/Constructor** — ils coûtent cher à acquérir
- **Utilisez setAccessible judicieusement** — seulement quand nécessaire
- **Limitez l'usage** — la réflexion est un outil, pas un pattern de design
- **Préférez les alternatives** quand possible (MethodHandle, Function, conteneur DI)

## Pièges courants

- Utiliser la réflexion pour accéder aux champs privés sans nécessité
- Ne pas gérer les exceptions (InvocationTargetException)
- Créer une dépendance forte sur la structure interne des classes
- Oublier que la réflexion est plus lente que l'appel direct

Source : [Oracle Java Documentation - Reflection](https://docs.oracle.com/javase/tutorial/reflect/)`},
        {
          id: 'java-29',
          question: 'Covariance des types de retour',
          answer: "La **covariance** (Java 5) permet à une sous-classe de retourner un sous-type du type de retour parent. Si `Animal.reproduire()` retourne `Animal`, `Chien.reproduire()` peut retourner `Chien` — le contrat est respecté car un `Chien` est un `Animal`.\n\nÇa évite les casts inutiles : directement `Chien c = new Chien().reproduire()`. Mécanisme qui rend le code *plus propre et plus sûr*.",
          code: 'class Animal { Animal reproduire() { ... } }\nclass Chien extends Animal {\n    @Override Chien reproduire() { ... }\n}',
          language: 'java',
        
          deepDive: `# Covariance et Contravariance en Java (Wildcards)

## Qu'est-ce que c'est ?

Les génériques en Java sont **invariants** par défaut — List<String> n'est pas un sous-type de List<Object>. Les wildcards (? extends T, ? super T) permettent de retrouver une forme de variance.

## Syntaxe et exemples

### Le problème : pourquoi String n'est pas un sous-type de Object dans les génériques

\`\`\`java
List<String> strings = new ArrayList<>();
// List<Object> objects = strings;  // ERREUR de compilation!
\`\`\`

C'est intentionnel — les génériques sont invariants. Si List<String> était un sous-type de List<Object>, cela causerait des problèmes :

\`\`\`java
List<String> strings = new ArrayList<>();
List<Object> objects = strings;  // Si c'était autorisé
objects.add(42);  // Ajouter un Integer dans une List<String> !
String s = strings.get(0);  // ClassCastException!
\`\`\`

### ? extends T — covariance (lecture seule)

\`\`\`java
List<String> strings = List.of("a", "b");
List<? extends Object> objects = strings;  // OK

for (Object obj : objects) {
    System.out.println(obj);  // Tous les éléments sont des Object
}

// Écriture - INTERDITE
objects.add("hello");  // ERREUR
\`\`\`

### ? super T — contravariance (écriture seule)

\`\`\`java
List<Object> objects = new ArrayList<>();
List<? super String> strings = objects;  // OK

strings.add("hello");  // OK - on peut ajouter des String
strings.add("world");  // OK

Object obj = strings.get(0);  // OK mais retourne Object
\`\`\`

### Tableau récapitulatif

| Wildcard | Direction | Lecture | Écriture | Exemple |
|----------|------------|---------|----------|---------|
| ? extends T | Producteur | OK (type T) | Interdit | List<? extends Number> |
| ? super T | Consommateur | OK (type Object) | OK (type T) | List<? super Integer> |
| none | Both | OK | OK | List<Number> |

### Le principe PECS (Producer Extends, Consumer Super)

\`\`\`java
// Si la collection PRODUIT des données (lecture) -> ? extends T
public double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}

// Si la collection CONSOMME des données (écriture) -> ? super T
public void addAll(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
\`\`\`

### Capture des wildcards

Le compilateur "capture" le type exact d'un wildcard :

\`\`\`java
List<Integer> ints = new ArrayList<>();
ints.add(1);

List<? extends Number> numbers = ints;  // Capture le type exact (Integer)
Number n = numbers.get(0);  // Retourne Integer (capturé)
\`\`\`

## Bonnes pratiques

- **Utilisez ? extends T** pour les retours de méthodes (producer)
- **Utilisez ? super T** pour les paramètres d'entrée (consumer)
- **N'utilisez pas de wildcard** quand vous avez besoin des deux
- **Préférez les bounds explicites** : ? extends Number vs ?

## Pièges courants

- Utiliser ? sans distinction (oubli de PECS)
- Croire que ? extends T permet l'écriture (interdit !)
- Utiliser un wildcard quand un type concret est nécessaire
- Oublier que les wildcards fonctionnent avec les méthodes, pas les classes

Source : [Oracle Java Documentation - Generics](https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html)`},
        {
          id: 'java-30',
          question: 'Enum avancé',
          answer: "Les `enum` Java sont des **classes spéciales** : elles peuvent avoir des champs, constructeurs, méthodes et implémenter des interfaces. Chaque constante est une **instance unique**.\n\nCas d'usage avancés : associées à des valeurs/méthodes (`StatusCode.OK.code()`), *strategy pattern* natif (chaque constante implémente différemment une méthode abstraite), et **Singleton** via enum avec un seul élément.\n\nPlus sûres que des constantes entières : *type-safe*, impossibilité d'instancier, méthodes intégrées (`values()`, `valueOf()`).",
          code: 'public enum Status {\n    SUCCESS(200, "OK"),\n    NOT_FOUND(404, "Not Found");\n\n    private final int code;\n    private final String message;\n\n    Status(int code, String message) {\n        this.code = code;\n        this.message = message;\n    }\n}',
          language: 'java',
        
          deepDive: `# Les Enum avancés en Java

## Qu'est-ce que c'est ?

Les enums en Java sont bien plus qu'une simple liste de constantes. Ils peuvent avoir des champs, des méthodes, des constructeur, et implémenter des interfaces pour créer des types complexes et type-safe.

## Syntaxe et exemples

### Enum basique vs Enum avancé

\`\`\`java
// Enum simple
enum Direction { NORTH, SOUTH, EAST, WEST }

// Enum avancé - avec champs, méthodes, constructeur
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6),
    JUPITER(1.9e+27, 7.1492e7),
    SATURN(5.688e+26, 6.0268e7),
    URANUS(8.686e+25, 2.5559e7),
    NEPTUNE(1.024e+26, 2.4746e7);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double surfaceGravity() {
        return 6.67e-11 * mass / (radius * radius);
    }

    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}
\`\`\`

### Enum comme singleton

\`\`\`java
public enum DatabaseConnection {
    INSTANCE;

    private String url;
    private Connection conn;

    public void connect() { /* ... */ }
}

DatabaseConnection.INSTANCE.connect();
\`\`\`

### Enum avec interface

\`\`\`java
interface Operation {
    double apply(double a, double b);
}

enum BasicOperation implements Operation {
    PLUS("+") { public double apply(double a, double b) { return a + b; } },
    MINUS("-") { public double apply(double a, double b) { return a - b; } },
    MULTIPLY("*") { public double apply(double a, double b) { return a * b; } },
    DIVIDE("/") { public double apply(double a, double b) { return a / b; } };

    private final String symbol;
    BasicOperation(String symbol) { this.symbol = symbol; }
    public String symbol() { return symbol; }
}
\`\`\`

### Enum avec état et comportement

\`\`\`java
enum State {
    IDLE {
        @Override State onStart() { return RUNNING; }
    },
    RUNNING {
        @Override State onStop() { return STOPPED; }
        @Override State onPause() { return PAUSED; }
    },
    PAUSED {
        @Override State onResume() { return RUNNING; }
        @Override State onStop() { return STOPPED; }
    },
    STOPPED {
        @Override State onStart() { return RUNNING; }
    };

    State onStart() { return this; }
    State onStop() { return this; }
    State onPause() { return this; }
    State onResume() { return this; }
}
\`\`\`

### EnumSet et EnumMap

\`\`\`java
import java.util.EnumSet;
import java.util.EnumMap;

EnumSet<Color> set = EnumSet.allOf(Color.class);
EnumSet<Color> set2 = EnumSet.of(Color.RED, Color.GREEN);
EnumSet<Color> set3 = EnumSet.range(Color.RED, Color.BLUE);

EnumMap<State, String> stateNames = new EnumMap<>(State.class);
stateNames.put(State.RUNNING, "En cours");
stateNames.put(State.STOPPED, "Arrêté");
\`\`\`

## Bonnes pratiques

- **Utilisez des enums pour les valeurs finies** — états, directions, codes
- **Ajoutez des fields et methods** pour enrichir la sémantique
- **Utilisez enum au lieu de int constants** — type-safe, switchable
- **Implémentez des interfaces** pour créer des hiérarchies de types spécialisées

## Pièges courants

- **Évitez les enums avec des états complexes** — considérer une classe séparée
- Ne pas utiliser le pattern Singleton via enum (non thread-safe par défaut)
- Oublier que les enums sont déjà des singletons dans le système de types
- Ajouter trop de logique dans un enum (violation du SRP)

Source : [Oracle Java Documentation - Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)`},
      ],
    },
  ],
};