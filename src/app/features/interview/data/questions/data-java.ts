import type { InterviewCategory } from '@core/models/interview.models';

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
        
          deepDive: `# Modificateurs d'accès en Java

## Qu'est-ce que c'est ?

Les modificateurs d'accès en Java contrôlent la visibilité des classes, méthodes et attributs. Ils sont le mécanisme fondamental de l'encapsulation : ils définissent qui peut accéder à chaque membre du code. Java propose quatre niveaux d'accès, du plus restrictif au plus ouvert.

Le choix du modificateur d'accès est une décision de conception cruciale : il détermine la surface d'API de votre code et l'étendue du couplage entre les classes.

## Syntaxe et exemples

### Tableau des niveaux d'accès

| Modificateur | Classe | Package | Sous-classe | Monde |
|---|---|---|---|---|
| \`private\` | Oui | Non | Non | Non |
| *default* (aucun) | Oui | Oui | Non | Non |
| \`protected\` | Oui | Oui | Oui | Non |
| \`public\` | Oui | Oui | Oui | Oui |

### Exemple 1 : private — l'encapsulation stricte

\`\`\`java
public class CompteBancaire {
    private double solde;  // Accessible uniquement ici

    private boolean verifierFonds(double montant) {
        return this.solde >= montant;
    }

    public void deposer(double montant) {
        if (montant > 0) {
            this.solde += montant;
        }
    }

    public boolean retirer(double montant) {
        if (montant > 0 && verifierFonds(montant)) {
            this.solde -= montant;
            return true;
        }
        return false;
    }
}
\`\`\`

Le champ \`solde\` est privé : impossible de le modifier directement depuis l'extérieur. Toute modification passe par les méthodes \`deposer()\` et \`retirer()\`, qui valident les opérations.

### Exemple 2 : protected — pour l'héritage

\`\`\`java
public class Animal {
    protected String nom;

    protected void emettreSon() {
        System.out.println(nom + " fait un son");
    }
}

public class Chien extends Animal {
    public void presenter() {
        this.nom = "Rex";       // Accès via héritage
        this.emettreSon();      // Accès via héritage
    }
}

// Depuis un autre package, aucun accès à nom ou emettreSon()
public class Test {
    public static void main(String[] args) {
        Animal a = new Animal();
        // a.nom = "test";     // Erreur : protected non accessible
    }
}
\`\`\`

### Exemple 3 : default (package-private) — pour l'unité de package

\`\`\`java
// Dans le package com.example.util
class UtilitaireInterne {
    static String formater(String entree) {
        return entree.trim().toLowerCase();
    }
}

// Dans le même package
public class ServicePrincipal {
    public void traiter(String donnee) {
        String preparee = UtilitaireInterne.formater(donnee);
        // OK : même package
    }
}
\`\`\`

Le modificateur *default* est idéal pour les classes utilitaires internes qui ne doivent pas faire partie de l'API publique.

## Fonctionnement interne

La JVM vérifie les accès à deux niveaux :

1. **Compilation** : le compilateur Java vérifie que le code source respecte la visibilité déclarée. Si une classe tente d'accéder à un membre \`private\` d'une autre classe, c'est une erreur de compilation.
2. **Runtime** : la JVM peut également vérifier les accès via le *SecurityManager* (bien que déprécié depuis Java 17). La réflexion avec \`setAccessible(true)\` peut contourner ces vérifications.

\`\`\`java
// Contournement via réflexion (à éviter)
Field champPrive = objet.getClass().getDeclaredField("champPrive");
champPrive.setAccessible(true);  // Outrepasse l'encapsulation
\`\`\`

## Diagramme de flux

\`\`\`
                    private
                       |
                  default (package)
                    /         \\
            protected        (même package)
               |
          sous-classes
               |
            public
\`\`\`

## Bonnes pratiques

1. **Utilisez \`private\` par défaut** pour tous les champs. Ne les exposez que si nécessaire, via des getters/setters.
2. **Préférez \`protected\` pour les hooks** destinés aux sous-classes (\`template method pattern\`).
3. **Réservez \`public\` à l'API** publique de votre composant. Moins il y a de membres publics, plus l'API est facile à maintenir.
4. **Utilisez le modificateur default pour les classes internes** à un package qui n'ont pas besoin d'être exposées.
5. **Documentez la visibilité choisie** dans le JavaDoc, surtout pour \`protected\` (expliquez pourquoi une sous-classe devrait surcharger).
6. **Ne rendez jamais un tableau public** — retournez une copie défensive ou une vue non modifiable.
7. **Combinez avec \`final\`** pour l'immuabilité : \`private final\` est le niveau le plus fort de protection.

## Pièges courants

1. **Champ public = API figée** — une fois qu'un champ public est utilisé par d'autrès classes, le changer devient une breaking change.
2. **\`protected\` n'est pas vraiment privé** — toute sous-classe dans n'importe quel package y accède. C'est le modificateur le plus souvent mal utilisé.
3. **Default package peut piéger** — si vous déplacez une classe dans un autre package, elle perd tout accès aux membres default.
4. **Les classes internes anonymes peuvent acceder aux membres prives** de la classe englobante, ce qui peut surprendre.
5. **Confusion entre \`protected\` et default** — beaucoup de développeurs oublient que \`protected\` est *plus* permissif que default (package + sous-classes).

Source : [Oracle Java Documentation — Controlling Access](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)`},
        {
          id: 'java-2',
          question: 'static',
          answer: "**`static`** signifie que le membre appartient à la classe, pas à l'instance. Une variable `static` est partagée entre toutes les instances ; une méthode `static` s'appelle sans instancier (ex. `Math.PI`). `this` est interdit dans un contexte `static`.\n\nUtile pour constantes, utilitaires, compteurs partagés. __À utiliser avec modération__ : trop de `static` = design procédural, et les méthodes `static` sont difficiles à *mocker*.",
          example: "Math.PI — pas besoin de new Math().",
        
          deepDive: `# Le modificateur static en Java

## Qu'est-ce que c'est ?

Le mot-clé \`static\` en Java signifie qu'un membre (attribut, méthode, bloc ou classe interne) appartient à la classe elle-même, et non à une instance particulière. Il est partagé par toutes les instances de la classe et existe indépendamment de toute instanciation.

\`static\` est fondamental pour : les constantes, les méthodes utilitaires, les compteurs partagés, et les blocs d'initialisation statique. Il est aussi utilisé pour le pattern Singleton et les classes utilitaires.

## Syntaxe et exemples

### Exemple 1 : Champ static — compteur partagé

\`\`\`java
public class Compteur {
    public static int totalInstances = 0;  // Variable de classe

    public Compteur() {
        totalInstances++;
    }
}

Compteur c1 = new Compteur();
Compteur c2 = new Compteur();
Compteur c3 = new Compteur();

System.out.println(Compteur.totalInstances);  // 3 — partagé par toutes les instances
\`\`\`

### Exemple 2 : Méthode static — utilitaire

\`\`\`java
public class MathUtils {
    public static int factorielle(int n) {
        if (n <= 1) return 1;
        return n * factorielle(n - 1);
    }

    public static boolean estPair(int n) {
        return n % 2 == 0;
    }
}

// Appel sans instanciation
int resultat = MathUtils.factorielle(5);  // 120
\`\`\`

### Exemple 3 : Bloc d'initialisation static

\`\`\`java
public class Configuration {
    public static final String DB_URL;
    public static final String API_KEY;
    public static final Set<String> LANGUE_SUPPORTEES;

    static {
        // Ce bloc s'exécute UNE FOIS au chargement de la classe
        DB_URL = System.getenv("DB_URL");
        API_KEY = loadApiKey();
        LANGUE_SUPPORTEES = Set.of("fr", "en", "es");
    }

    private static String loadApiKey() {
        try {
            return Files.readString(Path.of("/etc/app/api.key")).trim();
        } catch (IOException e) {
            throw new RuntimeException("Impossible de charger la clé API", e);
        }
    }
}
\`\`\`

### Exemple 4 : Classe interne static

\`\`\`java
public class External {
    private static String sharedData = "partagé";

    public static class Internal {  // Classe interne statique
        public void display() {
            // Accès aux membres statiques de la classe englobante
            System.out.println(sharedData);
        }
    }
}

// Utilisation sans instance de External
External.Internal obj = new External.Internal();
\`\`\`

### Exemple 5 : Import static

\`\`\`java
import static java.lang.Math.PI;
import static java.lang.Math.cos;
import static java.lang.Math.sin;
import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

public class CalculCoordonnees {
    public double[] rotation(double x, double y, double angle) {
        double rad = angle * PI / 180;
        return new double[]{
            x * cos(rad) - y * sin(rad),
            x * sin(rad) + y * cos(rad)
        };
    }
}
\`\`\`

## Fonctionnement interne

### Cycle de vie d'un membre static

1. **Chargement de la classe** par le ClassLoader
2. **Initialisation des champs static** dans l'ordre de déclaration
3. **Exécution des blocs static** dans l'ordre de déclaration
4. Disponible pour toute la durée de vie de la classe (jusqu'au déchargement)

### Restrictions des méthodes static

\`\`\`java
public class Exemple {
    private int instanceVar = 10;

    public static void méthodeStatic() {
        // this.instanceVar;     // ERREUR : pas de this en contexte static
        // instanceVar;          // ERREUR : pas d'accès aux membres d'instance
    }

    public static void bonExemple(Exemple e) {
        System.out.println(e.instanceVar);  // OK via référence explicite
    }
}
\`\`\`

## Comparaison static vs instance

| Caractéristique | static | instance |
|---|---|---|
| Appartient à | La classe | L'objet |
| Création | Au chargement de la classe | À l'instanciation |
| Accès | \`Classe.membre\` | \`objet.membre\` |
| Mémoire | Une seule copie | Une copie par instance |
| Thread-safety | Non garantie (partagé) | Non garantie |
| Surcharge (override) | Impossible (méthodes statiques sont cachées, pas surchargées) | Possible |
| Accès à \`this\` | Interdit | Autorisé |

## Thread-safety et concurrence

Les champs \`static\` mutables sont partagés entre tous les threads. Sans synchronisation, les accès concurrents causent des **race conditions** :

\`\`\`java
public class CompteurPartage {
    private static int count = 0;

    // NON thread-safe
    public static void increment() {
        count++;  // Lecture + incrément + écriture = opération non atomique
    }

    // Thread-safe
    private static final AtomicInteger atomicCount = new AtomicInteger(0);

    public static void incrementSafe() {
        atomicCount.incrementAndGet();
    }
}
\`\`\`

## Bonnes pratiques

1. **Préférez les méthodes static** quand la méthode n'accède à aucune donnée d'instance — c'est plus clair et plus performant.
2. **Utilisez \`static final\` pour les constantes** : \`public static final int MAX_SIZE = 100;\`
3. **Évitez les champs static mutables** — ils introduisent un état global partagé difficile à gérer.
4. **Utilisez \`AtomicInteger\`, \`AtomicLong\`** pour les compteurs statiques dans un contexte multi-thread.
5. **N'abusez pas du static** — trop de static = style procédural déguisé en Java. Si une méthode a besoin de \`this\`, elle ne doit pas être static.
6. **Préférez l'injection de dépendances** aux singletons statiques pour la testabilité.

## Pièges courants

1. **Modifier un état partagé sans synchronisation** — \`private static int count; count++\` n'est pas thread-safe.
2. **Confondre static et instance** — une variable static change pour toutes les instances si elle est modifiée depuis une seule.
3. **Polymorphisme impossible** — les méthodes \`static\` sont résolues à la compilation (early binding), pas à l'exécution.
4. **Testabilité réduite** — un appel direct à une méthode static (sans injection) ne peut pas être mocké facilement.
5. **Problèmes de chargement** — si le bloc static lance une exception, la classe devient inutilisable (\`ExceptionInInitializerError\`).

Source : [Oracle Java Documentation — Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classmembers.html)`},
        {
          id: 'java-3',
          question: 'final vs finally vs finalize',
          answer: "**`final`** empêche la modification : variable non réassignable, méthode non redéfinissable, classe non étendue (ex. `String`). **`finally`** est un bloc qui s'exécute toujours après `try-catch`, idéal pour libérer les ressources. **`finalize`** est une méthode de `Object` appelée par le GC avant suppression — __dépréciée depuis Java 9__.\n\nOn utilise aujourd'hui `try-with-resources` ou `AutoCloseable` à la place.",
        
          deepDive: `# final, finally et finalize en Java

## Qu'est-ce que c'est ?

Ces trois mots-clés ont des rôles totalement distincts mais leurs noms similaires créent une confusion fréquente :

- **\`final\`** : modificateur qui empêche la modification (variable non réassignable, méthode non surchargeable, classe non héritable)
- **\`finally\`** : bloc de code qui s'exécute toujours après \`try\`/\`catch\`, quel que soit le résultat
- **\`finalize()\`** : méthode héritée de \`Object\`, appelée par le GC avant destruction — **dépréciée depuis Java 9, supprimée depuis Java 18**

## Syntaxe et exemples

### final — restriction définitive

**Variable finale :**
\`\`\`java
public class Constantes {
    public static final double PI = 3.14159265359;
    public static final int MAX_RETRY = 3;
    public static final LocalDate DATE_EPOCH = LocalDate.of(1970, 1, 1);

    // Un tableau final ne peut pas être réaffecté,
    // mais son contenu peut être modifié
    private final int[] donnees = new int[10];

    public void mauvaiseIdee() {
        // donnees = new int[5];  // ERREUR de compilation
        donnees[0] = 42;          // OK — le contenu est modifiable
    }
}
\`\`\`

**Méthode finale :**
\`\`\`java
public class Parent {
    public final void afficher() {
        System.out.println("Comportement fixe");
    }
}

public class Enfant extends Parent {
    // @Override
    // public void afficher() {}  // ERREUR de compilation
}
\`\`\`

**Classe finale :**
\`\`\`java
public final class String {
    // String ne peut PAS être héritée
    // Ceci garantit son immuabilité et sa sécurité
}
\`\`\`

### finally — exécution garantie

\`\`\`java
public String lireFichier(String chemin) {
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(chemin));
        return reader.readLine();
    } catch (IOException e) {
        System.err.println("Erreur: " + e.getMessage());
        throw new RuntimeException(e);
    } finally {
        // TOUJOURS exécuté, même avec return ou throw dans try/catch
        if (reader != null) {
            try { reader.close(); } catch (IOException ignored) {}
        }
    }
}
\`\`\`

### Piège du finally avec return

\`\`\`java
public int piege() {
    try {
        int x = 10 / 0;
        return 1;
    } catch (ArithmeticException e) {
        return 2;
    } finally {
        return 3;  // SURCHARGE les returns précédents !
    }
}
// Résultat : 3 (et l'exception est avalée)
\`\`\`

**Ne mettez jamais \`return\` dans un bloc \`finally\`.**

### finalize() — DÉPRÉCIÉ

\`\`\`java
@Override
protected void finalize() throws Throwable {
    try {
        System.out.println("Nettoyage...");
    } finally {
        super.finalize();
    }
}
// PROBLÈMES :
// - Pas de garantie d'appel (le GC peut ne pas s'exécuter)
// - Performance dégradée (l'objet passe par une file de finalisation)
// - Ordre d'appel non déterministe
\`\`\`

**Alternative moderne : \`try-with-resources\` (Java 7+)**

\`\`\`java
public void lireFichierPropre(String chemin) {
    try (BufferedReader reader = new BufferedReader(new FileReader(chemin))) {
        System.out.println(reader.readLine());
    } catch (IOException e) {
        System.err.println("Erreur: " + e.getMessage());
    }
    // reader.close() appelé automatiquement — fiable et lisible
}
\`\`\`

## Comparaison

| Caractéristique | \`final\` | \`finally\` | \`finalize()\` |
|---|---|---|---|
| Rôle | Empêcher la modification | Nettoyage garanti | Nettoyage avant GC |
| S'applique à | Variable, méthode, classe | Bloc try-catch | Méthode |
| Moment | Compilation | Exécution (après try/catch) | Avant GC (non déterministe) |
| Statut | Actif | Actif | **Déprécié (Java 9+), retiré (Java 18+)** |

## Bonnes pratiques

1. **Utilisez \`final\` pour les constantes** avec \`static final\`.
2. **Utilisez \`try-with-resources\`** au lieu de \`finally\` pour les ressources \`AutoCloseable\`.
3. **Évitez \`return\` dans \`finally\`** — cela avale les exceptions et les returns précédents.
4. **N'utilisez jamais \`finalize()\`** — utilisez \`try-with-resources\` ou \`Cleaner\` (Java 9+).
5. **Préférez \`catch\` spécifique** à \`catch (Exception e)\` dans un bloc générique.

## Pièges courants

1. **\`finally\` avec \`return\`** supprime l'exception en cours (pire piège).
2. **\`finalize()\` n'est pas fiable** — pas de garantie d'appel, performance dégradée.
3. **Un tableau \`final\` n'est pas immuable** — seule la référence est finale, le contenu peut changer.
4. **Classe \`final\` sans champs \`final\`** — contradiction : la classe ne peut pas être héritée mais son état interne peut changer.
5. **Oublier \`static\` pour les constantes** — chaque instance aurait sa propre copie de la constante.

Source : [Oracle Java Documentation — Execution Control](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html)`},
        {
          id: 'java-4',
          question: 'transient',
          answer: "**`transient`** exclut un champ de la sérialisation. Cas d'usage : données sensibles (mot de passe), champs calculables (recalculés à la désérialisation), références non sérialisables (évite `NotSerializableException`).\n\nÀ la désérialisation, le champ prend sa valeur par défaut (`null`, `0`…).",
        
          deepDive: `# Le modificateur transient en Java

## Qu'est-ce que c'est ?

\`transient\` indique au mécanisme de sérialisation (\`Serializable\`) d'ignorer un champ lors de la conversion en flux d'octets. Le champ ne sera pas inclus dans la forme sérialisée et, à la désérialisation, retrouvera sa valeur par défaut (\`null\` pour les objets, \`0\` pour les nombres, \`false\` pour les booléens).

Ce modificateur répond à trois besoins fondamentaux : exclure les données sensibles, ignorer les ressources non sérialisables, et éviter de sérialiser des champs calculés ou temporaires.

## Syntaxe et exemples

### Exemple 1 : Données sensibles

\`\`\`java
public class Utilisateur implements Serializable {
    private static final long serialVersionUID = 1L;

    private String nom;
    private String email;
    private transient String motDePasse;  // JAMAIS sérialisé
    private transient String tokenSession;  // Ne pas persister

    public Utilisateur(String nom, String email, String motDePasse) {
        this.nom = nom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.tokenSession = genererToken();
    }

    private String genererToken() {
        return UUID.randomUUID().toString();
    }
}

// Test
Utilisateur user = new Utilisateur("Alice", "alice@example.com", "secret123");
byte[] serialise = serialiser(user);
Utilisateur restored = deserialiser(serialise);
System.out.println(restored.motDePasse);   // null
System.out.println(restored.tokenSession);  // null
\`\`\`

### Exemple 2 : Ressources non sérialisables

\`\`\`java
public class GestionnaireFichier implements Serializable {
    private static final long serialVersionUID = 1L;

    private String cheminFichier;
    private transient FileInputStream flux;  // Ne peut pas être sérialisé

    public GestionnaireFichier(String chemin) {
        this.cheminFichier = chemin;
    }

    // Récupération après désérialisation
    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        this.flux = new FileInputStream(cheminFichier);  // Réinitialisation
    }
}
\`\`\`

### Exemple 3 : Champs calculés (cache)

\`\`\`java
public class Commande implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<LigneCommande> lignes;
    private transient BigDecimal totalCalcule;  // Recalculé après désérialisation

    public BigDecimal getTotal() {
        if (totalCalcule == null) {
            totalCalcule = lignes.stream()
                .map(LigneCommande::getSousTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        return totalCalcule;
    }
}
\`\`\`

### Exemple 4 : Sérialisation personnalisée avec writeObject/readObject

\`\`\`java
public class Session implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userId;
    private Instant derniereActivite;
    private transient String jetonSecret;

    // Personnalisation de la sérialisation
    @Serial
    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        // On pourrait chiffrer et sérialiser manuellement certaines données
    }

    @Serial
    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        // Régénération des champs transient
        this.jetonSecret = regenererJeton(userId);
    }
}
\`\`\`

## Fonctionnement interne

1. **\`ObjectOutputStream.writeObject()\`** parcourt tous les champs non-\`static\` de l'objet.
2. Si un champ est marqué \`transient\`, il est **ignoré** et non écrit dans le flux.
3. À la désérialisation, le champ prend la valeur par défaut de son type.
4. Le mécanisme \`readObject()\` personnalisé permet de réinitialiser les champs \`transient\`.

\`\`\`
Sérialisation :
[objet] → ObjectOutputStream → parcourt les champs
    - champ nom → écrit dans le flux
    - champ email → écrit dans le flux
    - champ motDePasse (transient) → IGNORÉ
    - champ tokenSession (transient) → IGNORÉ

Désérialisation :
[flux] → ObjectInputStream → crée l'objet
    - champ nom ← lu depuis le flux
    - champ email ← lu depuis le flux
    - champ motDePasse ← null (valeur par défaut)
    - champ tokenSession ← null (valeur par défaut)
\`\`\`

## Bonnes pratiques

1. **Marquez \`transient\` les données sensibles** — mots de passe, tokens, clés API.
2. **Marquez \`transient\` les ressources système** — connexions BDD, flux fichiers, sockets.
3. **Marquez \`transient\` les champs calculés** — valeurs dérivées, caches en mémoire.
4. **Implémentez \`readObject()\`** pour réinitialiser les champs \`transient\` après désérialisation.
5. **Utilisez \`Serial\` annotation** (Java 14+) sur \`writeObject\`/\`readObject\` pour la documentation.
6. **Envisagez \`Externalizable\`** pour un contrôle total du format sérialisé.
7. **Stockez serialVersionUID** — sans lui, toute modification de classe casse la désérialisation.

## Pièges courants

1. **Oublier de réinitialiser les champs \`transient\`** — ils valent \`null\` ou \`0\` après désérialisation, ce qui peut causer des \`NullPointerException\`.
2. **Sérialiser involontairement des données sensibles** — un champ mot de passe sans \`transient\` se retrouve en clair dans le flux sérialisé.
3. **\`transient\` sur un champ \`static\`** est inutile — les champs \`static\` ne sont jamais sérialisés (ils appartiennent à la classe, pas à l'instance).
4. **Oublier \`serialVersionUID\`** — si la classe évolue, la désérialisation d'anciennes versions lance \`InvalidClassException\`.
5. **Sérialiser des objets avec des références circulaires** — cause une \`StackOverflowError\` si non géré.

Source : [Oracle Java Documentation — Object Serialization](https://docs.oracle.com/javase/tutorial/essential/io/serialization.html)`},
        {
          id: 'java-5',
          question: 'Généricité',
          answer: "Paramétrer les types : `List<String>` garantit le type à la compilation, plus besoin de *caster*. Fonctionne par **type erasure** : les types génériques sont effacés au runtime (pas de `new T()` ni `instanceof T`).\n\nBornes : `<T extends Comparable<T>>` restreint le type, *wildcards* (`? extends T`, `? super T`) pour la flexibilité API. Indispensable — utilisé partout (`Collections`, `Stream`s, `Optional`).",
          example: "List<String> = que des String. Pas besoin de caster.",
        
          deepDive: `# La généricité en Java

## Qu'est-ce que c'est ?

La généricité (generics), introduite en Java 5, permet d'écrire du code qui opère sur des types non spécifiques, décidés au moment de l'utilisation. Elle offre une **sécurité de type à la compilation** : le compilateur vérifie que les types sont cohérents, éliminant le besoin de casts explicites et les \`ClassCastException\` au runtime.

Avant Java 5, les collections stockaient des \`Object\` et tout était casté manuellement — source majeure de bugs. Les generics ont résolu ce problème en rendant les types explicites dans les signatures.

## Syntaxe et exemples

### Exemple 1 : Le problème avant Java 5

\`\`\`java
// Sans generics — casts risqués partout
List liste = new ArrayList();
liste.add("texte");
liste.add(42);

String s1 = (String) liste.get(0);  // OK
String s2 = (String) liste.get(1);  // ClassCastException au runtime !
\`\`\`

### Exemple 2 : Classe générique simple

\`\`\`java
public class Boite<T> {
    private T contenu;

    public void mettre(T item) {
        this.contenu = item;
    }

    public T obtenir() {
        return contenu;
    }

    public boolean estVide() {
        return contenu == null;
    }
}

// Utilisation
Boite<String> boiteTextes = new Boite<>();
boiteTextes.mettre("Hello");
String texte = boiteTextes.obtenir();  // Pas de cast nécessaire

Boite<Integer> boiteNombres = new Boite<>();
boiteNombres.mettre(42);
Integer nombre = boiteNombres.obtenir();

// boiteTextes.mettre(42);  // ERREUR de compilation : type safe
\`\`\`

### Exemple 3 : Types bornés (bounded type parameters)

\`\`\`java
public class Calculateur<T extends Number> {
    private final T valeur;

    public Calculateur(T valeur) {
        this.valeur = valeur;
    }

    public double enDouble() {
        return valeur.doubleValue();
    }

    public int enEntier() {
        return valeur.intValue();
    }
}

Calculateur<Integer> calcInt = new Calculateur<>(42);
Calculateur<Double> calcDouble = new Calculateur<>(3.14);
// Calculateur<String> calcStr = new Calculateur<>("test");  // ERREUR
\`\`\`

### Exemple 4 : Méthodes génériques

\`\`\`java
public class Utils {
    // Méthode générique avec type déduit
    public static <T> T premierOuNull(List<T> liste) {
        if (liste == null || liste.isEmpty()) return null;
        return liste.get(0);
    }

    // Méthode avec borne multiple
    public static <T extends Comparable<T> & Serializable> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
}

String p = Utils.premierOuNull(List.of("a", "b", "c"));  // "a"
Integer n = Utils.premierOuNull(List.of(1, 2, 3));       // 1
\`\`\`

### Exemple 5 : Wildcards — covariance et contravariance

\`\`\`java
// ? extends T — covariance (lecture seule, producteur)
public double somme(List<? extends Number> nombres) {
    double total = 0;
    for (Number n : nombres) {
        total += n.doubleValue();
    }
    // nombres.add(42);  // ERREUR : pas d'écriture avec ? extends
    return total;
}

// ? super T — contravariance (écriture possible, consommateur)
public void ajouterNombres(List<? super Integer> liste) {
    liste.add(1);
    liste.add(2);
    liste.add(3);
    // Integer n = liste.get(0);  // ERREUR : type inconnu (Object)
}

// PECS : Producer Extends, Consumer Super
\`\`\`

## Fonctionnement interne : Type Erasure

Les generics Java sont implémentés via **type erasure** : le compilateur efface l'information générique au niveau bytecode. \`List<String>\` et \`List<Integer>\` deviennent \`List\` (raw type) après compilation.

\`\`\`java
// À la compilation
List<String> strings = new ArrayList<>();

// Au bytecode (après type erasure)
List strings = new ArrayList();

// Les casts sont insérés automatiquement par le compilateur
\`\`\`

**Conséquences du type erasure :**
- Impossible de faire \`new T()\` ou \`new T[10]\`
- Impossible d'utiliser \`instanceof T\`
- Impossible d'avoir \`List<int>\` (primitives non autorisées)
- Les overloads basés sur le type générique sont impossibles

\`\`\`java
public class Exemple<T> {
    // Compilation OK
    // public void méthode(List<String> a) {}
    // public void méthode(List<Integer> a) {}
    // ERREUR : même signature après erasure (List)
}
\`\`\`

## Comparaison : généricité Java vs autrès langages

| Aspect | Java (Type Erasure) | C# (Reified) | TypeScript |
|---|---|---|---|
| Runtime | Effacé | Préservé | Préservé |
| \`new T()\` | Impossible | Possible | Possible |
| Performance | Pas de overhead runtime | Boxe pour value types | Pas applicable |
| Compatibilité ascendante | Oui (avec legacy code) | Non | Oui |

## Bonnes pratiques

1. **Utilisez les wildcards** dans les signatures de méthodes selon PECS (Producer Extends, Consumer Super).
2. **Préférez \`? extends T\`** pour la lecture (c'est un producteur).
3. **Préférez \`? super T\`** pour l'écriture (c'est un consommateur).
4. **N'utilisez jamais de raw types** — \`List\` sans paramètre de type casse la sécurité de type.
5. **Utilisez \`T extends Comparable<T>\`** pour les types comparables.
6. **Utilisez \`@SuppressWarnings("unchecked")\`** de manière ciblée (pas sur toute la classe).

## Pièges courants

1. **Type erasure empêche \`new T()\`** — contournement : passer \`Class<T>\` en paramètre.
2. **\`instanceof T\` impossible** — utiliser \`clazz.isInstance(obj)\` avec \`Class<T>\`.
3. **Surcharges basées sur le type générique** impossibles après erasure.
4. **Wildcards \`? extends T\`** — pas d'écriture possible (même \`null\` est interdit).
5. **Covariance des tableaux vs invariance des generics** — \`String[]\` est sous-type de \`Object[]\`, mais \`List<String>\` n'est pas sous-type de \`List<Object>\`.

Source : [Oracle Java Documentation — Generics](https://docs.oracle.com/javase/tutorial/java/generics/)`},
        {
          id: 'java-6',
          question: 'Classe finale / méthode finale',
          answer: "`final` sur une classe empêche l'héritage (ex. : `String` est finale pour garantir son **immuabilité**). `final` sur une méthode empêche la redéfinition dans les sous-classes, utile pour les comportements critiques qui doivent rester identiques.\n\n**Classe finale** = pas d'héritage, **méthode finale** = pas de redéfinition. Objectif : **sécurité** et **prévisibilité** du comportement.",
        
          deepDive: `# Classe finale et méthode finale en Java

## Qu'est-ce que c'est ?

Le mot-cle \`final\` applique une restriction definitive selon le contexte. Sur une **classe**, il empeche l'heritage. Sur une **méthode**, il empeche la surcharge (override). Ces restrictions sont verifiees à la compilation, offrant des garanties fortes au programmeur.

## Pourquoi empecher l'heritage ?

L'heritage est un outil puissant mais il à un cout : une classe heritable engage son auteur a maintenir son contrat pour toutes les sous-classes futures. Rendre une classe \`final\` est une decision de conception qui libere de cette contrainte.

**Classes finales dans la JDK** : \`String\`, \`Integer\`, \`Double\`, \`System\` — toutes sont finales. Imaginez si quelqu'un pouvait heriter de \`String\` et modifier son comportement...

## Tableau de comparaison

| Niveau de restriction | Mot-cle | Heritage | Surcharge | Cas d'usage |
|----------------------|---------|----------|-----------|-------------|
| Aucune restriction | *(aucun)* | Possible | Possible | Classes conçues pour être etendues |
| Methode figee | \`final\` sur méthode | Possible | Interdite | Contrat preserve, classe extensible |
| Classe figee | \`final\` sur classe | Impossible | N/A | Immutabilite, securite |
| Immuable | \`final\` + \`record\` | Impossible | N/A | DTO, Value Objects |

## Exemples concrets

### Exemple 1 : Classe utilitaire finale

\`\`\`java
public final class FileUtils {
    private FileUtils() {}  // Constructeur prive : pas d'instanciation

    public static String readFile(String path) throws IOException {
        return Files.readString(Path.of(path));
    }

    public static void writeFile(String path, String content) throws IOException {
        Files.writeString(Path.of(path), content);
    }
}

// Personne ne peut heriter de FileUtils pour en modifier le comportement
// Toute tentative : "cannot inherit from final class"
\`\`\`

### Exemple 2 : Template Method avec méthode finale

\`\`\`java
public abstract class DataProcessor {
    // Template method — l'ordre des étapes est fige
    public final void process(String input) {
        String cleaned = clean(input);
        String transformed = transform(cleaned);
        save(transformed);
        notifyListeners(transformed);
    }

    // Etapes surchargeables
    protected abstract String clean(String input);
    protected abstract String transform(String input);

    // Etape privee non surchargeable
    private void save(String data) {
        System.out.println("Saving: " + data);
    }

    private void notifyListeners(String data) {
        System.out.println("Notifying: " + data);
    }
}

public class CsvProcessor extends DataProcessor {
    @Override
    protected String clean(String input) {
        return input.trim().replaceAll("\\"", "");
    }

    @Override
    protected String transform(String input) {
        return input.toUpperCase();
    }

    // Impossible de surcharger process() — l'ordre des étapes est garanti
}
\`\`\`

### Exemple 3 : Immutabilite totale

\`\`\`java
public final class Money {
    private final long amount;      // immutable
    private final Currency currency; // Currency est immutable

    public Money(long amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // Les operations retournent une nouvelle instance
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public Money multiply(int factor) {
        return new Money(this.amount * factor, this.currency);
    }

    // Getters uniquement — pas de setters
    public long getAmount() { return amount; }
    public Currency getCurrency() { return currency; }
}
\`\`\`

### Exemple 4 : Comparaison sealed vs final

\`\`\`java
// final : aucune sous-classe
public final class Config { /* ... */ }

// sealed : liste blanche de sous-classes
public sealed class Shape permits Circle, Rectangle { /* ... */ }
public final class Circle extends Shape { /* ... */ }
public final class Rectangle extends Shape { /* ... */ }

// non-sealed : heritage ouvert (mais le parent est sealed)
public sealed class Message permits TextMessage, BinaryMessage { /* ... */ }
public non-sealed class TextMessage extends Message { /* ... */ }
// TextMessage peut désormais être etendu librement
\`\`\`

## Bonnes pratiques

1. **Rendre une classe finale par defaut** — n'ouvrez l'heritage que si vous avez un besoin explicite (Effective Java, Item 19)
2. **Utiliser \`final\` sur les méthodes du Template Method pattern** — garantit l'ordre d'execution
3. **Combiner \`final\` avec constructeur prive** pour les classes utilitaires — pas d'instanciation ni d'heritage
4. **Documenter pourquoi une classe est finale** — dans un commentaire ou une annotation, expliquez la decision
5. **\`final\` sur les champs** — cree des objets immuables (thread-safe par defaut)
6. **Ne pas rendre une classe finale trop tot** — il est plus facile de passer de non-final a final que l'inverse (retrocompatibilite)
7. **Preferer sealed a final** quand vous voulez contrôler mais pas interdire completement

## Pièges courants

1. **Classe finale avec champs mutables** — l'objet n'est pas immutable meme si la classe est finale
2. **Final sur une interface** — une interface ne peut pas être declaree \`final\` (cela n'a pas de sens)
3. **Heritage casse** — si vous rendez une classe \`final\` dans une API publique, les utilisateurs ne peuvent pas l'etendre
4. **Proxies et mocking** — les frameworks de mock (Mockito) et les proxies (Hibernate) peuvent echouer avec des classes finales (sauf avec des outils comme Mockito inline)
5. **Confondre \`final\` et \`immutable\`** — \`final\` empeche la reassignation de reference, pas la modification de l'objet

Source : [Oracle Java Documentation — Writing Final Classes and Methods](https://docs.oracle.com/javase/tutorial/java/IandI/final.html)
`},
        {
          id: 'java-7',
          question: 'try-with-resources',
          answer: "Depuis Java 7, déclarez les ressources implémentant **`AutoCloseable`** directement dans le `try` — Java les ferme automatiquement, même en cas d'exception. Plus besoin de bloc `finally` manuel.\n\nPlusieurs ressources possibles dans un même `try`. L'ordre de fermeture est **inverse** de la déclaration. __La manière moderne et recommandée de gérer les ressources en Java.__",
          code: 'try (FileInputStream fis = new FileInputStream("f.txt");\n     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {\n    String line = br.readLine();\n} // fermeture automatique',
          language: 'java',
        
          deepDive: `# try-with-resources en Java (Java 7+)

## Qu'est-ce que c'est ?

Introduit en Java 7, \`try-with-resources\` est un mecanisme qui **ferme automatiquement** les ressources declarees dans l'en-tête du \`try\`, meme en cas d'exception. Il remplace la gestion manuelle fastidieuse et source d'erreurs des blocs \`try-catch-finally\`.

Toute ressource implementant \`AutoCloseable\` (ou \`Closeable\`, sa sous-interface) peut être utilisee.

## Avant vs après try-with-resources

\`\`\`java
// AVANT Java 7 — gestion manuelle (verbeuse et fragile)
FileInputStream fis = null;
BufferedReader br = null;
try {
    fis = new FileInputStream("fichier.txt");
    br = new BufferedReader(new InputStreamReader(fis));
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.err.println("Erreur: " + e.getMessage());
} finally {
    // Bloc finally obligatoire pour la fermeture
    try {
        if (br != null) br.close();
    } catch (IOException e) {
        e.printStackTrace();  // Exception dans finally = perte de l'exception originale
    }
    try {
        if (fis != null) fis.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
\`\`\`

\`\`\`java
// APRES Java 7 — propre et concis
try (FileInputStream fis = new FileInputStream("fichier.txt");
     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.err.println("Erreur: " + e.getMessage());
}
// Les deux ressources sont fermees automatiquement, dans l'ordre inverse
\`\`\`

## Ordre de fermeture

Les ressources sont fermees dans **l'ordre inverse** de leur déclaration :

\`\`\`java
try (ResourceA a = new ResourceA();
     ResourceB b = new ResourceB()) {
    // ...
}
// Fermeture : b.close() puis a.close()
\`\`\`

## Gestion des exceptions supprimees

Un piege classique : si le \`try\` leve une exception ET que \`close()\` en leve une autre, seule l'exception du \`close()\` etait propagee (avant Java 7). Avec \`try-with-resources\`, l'exception originale est **preservee** et les exceptions de \`close()\` sont **supprimees** :

\`\`\`java
public class AutoCloseableResource implements AutoCloseable {
    @Override
    public void close() throws Exception {
        throw new RuntimeException("Exception dans close()");
    }
}

try (AutoCloseableResource r = new AutoCloseableResource()) {
    throw new RuntimeException("Exception dans try");
} catch (RuntimeException e) {
    System.out.println(e.getMessage());              // "Exception dans try"
    System.out.println(e.getSuppressed().length);    // 1
    System.out.println(e.getSuppressed()[0].getMessage()); // "Exception dans close()"
}
\`\`\`

## Creer sa propre ressource AutoCloseable

\`\`\`java
public class DatabaseConnection implements AutoCloseable {
    private final String name;

    public DatabaseConnection(String name) {
        this.name = name;
        System.out.println("Connexion a " + name);
    }

    public void query(String sql) {
        System.out.println("Execution: " + sql);
    }

    @Override
    public void close() {
        System.out.println("Fermeture de " + name);
    }
}

// Utilisation
try (DatabaseConnection conn = new DatabaseConnection("mydb")) {
    conn.query("SELECT * FROM users");    // Execution: SELECT * FROM users
}                                         // Fermeture de mydb
\`\`\`

## Java 9+ : ressources effectively final

Depuis Java 9, on peut referencer une variable externe dans \`try-with-resources\`, a condition qu'elle soit **effectively final** :

\`\`\`java
// Java 9+
Path path = Paths.get("fichier.txt");
BufferedReader reader = Files.newBufferedReader(path);
// reader est effectively final
try (reader) {
    String line = reader.readLine();
    while (line != null) {
        System.out.println(line);
        line = reader.readLine();
    }
}
\`\`\`

## Tableau comparatif

| Aspect | try-catch-finally (avant Java 7) | try-with-resources (Java 7+) |
|--------|--------------------------------|------------------------------|
| Fermeture auto | Non (manuelle dans finally) | Oui |
| Risque d'oubli | Eleve | Nul |
| Suppression d'exception | Exception dans finally ecrase l'originale | Originale preservee, close() supprimee |
| Code boilerplate | Beaucoup (null checks, nested try) | Minimal |
| Plusieurs ressources | Imbrication complexe | Liste simple |
| Ressources effectively final | N/A | Possible (Java 9+) |

## Bonnes pratiques

1. **Toujours preferer try-with-resources** à la gestion manuelle — c'est plus sur et plus lisible
2. **Implementer \`AutoCloseable\`** dans vos propres classes gerant des ressources (connexions, flux, locks)
3. **Ne pas mettre de \`return\`** dans le bloc — le \`close()\` est appele automatiquement avant le \`return\`
4. **Declarer chaque ressource sur une ligne separee** pour la lisibilite
5. **Utiliser avec des classes wrapper** pour ajouter la fermeture automatique a des ressources existantes
6. **Ne pas catcher trop largement** — soyez specifique avec les exceptions
7. **Attention aux resources null** — une ressource nulle dans try-with-resources ne ferme rien (pas de NPE)

## Pièges courants

1. **\`close()\` qui jette une \`Exception\`** — pensez à la signature, utilisez plutot \`Closeable\` qui jette \`IOException\`
2. **\`finalize()\` ou \`final\`** — ne pas confondre avec \`finally\` : \`try-with-resources\` remplace \`finally\`
3. **Ressources avec constructeur qui echoue** — si le constructeur leve une exception, \`close()\` n'est pas appele
4. **Oublier le \`catch\`** — try-with-resources sans \`catch\` n'attrape pas l'exception, il faut un \`throws\`
5. **Confondre ordre de fermeture** — les ressources sont fermees en ordre inverse de déclaration

Source : [Oracle Java Documentation — The try-with-resources Statement](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html)
`},
      ],
    },
    {
      id: 'java-mémoire',
      title: 'Mémoire',
      questions: [
        {
          id: 'java-8',
          question: 'Garbage Collection',
          answer: "Le **GC** libère automatiquement les objets non référencés. L'algorithme principal est **mark-and-sweep** : marquage des objets accessibles depuis les racines, puis suppression des non-marqués.\n\nLa **JVM** est organisée en générations : **Young Generation** (objets éphémères) et **Old Generation** (objets durables). On ne contrôle pas le moment de l'exécution du GC (`System.gc()` n'est qu'une suggestion). Mettre les références à `null` quand elles ne sont plus nécessaires aide le GC.",
        
          deepDive: `# Garbage Collection en Java

## Qu'est-ce que le Garbage Collection ?

Le Garbage Collector (GC) est un mecanisme automatique de gestion mémoire integre à la JVM. Il **identifie et libere** automatiquement la mémoire occupee par les objets qui ne sont plus accessibles. Le programmeur n'a pas besoin d'appeler \`free()\` ou \`delete()\` comme en C/C++.

## Architecture de la mémoire Heap

La heap (tas) Java est divisee en **generations** pour optimiser la collecte :

\`\`\`
+----------------------------------------------------------+
|                     Java Heap                              |
|  +------------------+  +------------------+               |
|  |  Young Gen       |  |  Old Gen         |               |
|  |  +---+ +--+ +--+ |  |  (Tenured)       |               |
|  |  | E | |S0| |S1| |  |                  |               |
|  |  | d | |  | |  | |  |  Objets ayant    |               |
|  |  | e | |  | |  | |  |  survecu a       |               |
|  |  | n | |  | |  | |  |  plusieurs GC    |               |
|  |  +---+ +--+ +--+ |  |                  |               |
|  +------------------+  +------------------+               |
|  +------------------------------------------+             |
|  |  Metaspace (hors heap)                    |             |
|  |  Classes, méthodes, constantes            |             |
|  +------------------------------------------+             |
+----------------------------------------------------------+
\`\`\`

### Les generations en details

| Generation | Contenu | Taille typique | Collecte |
|-----------|---------|---------------|----------|
| **Young** | Objets nouvellement crees | ~10-40% du heap | Minor GC (frequent, rapide) |
| Eden | Ou les objets sont alloues d'abord | Majorite du Young | Netoye a chaque Minor GC |
| Survivor (S0, S1) | Objets ayant survecu à un Minor GC | Petit | Alterne S0/S1 |
| **Old** | Objets ayant survecu a plusieurs Minor GC | ~60-90% du heap | Major GC (rare, lent) |
| **Metaspace** | Metadonnees des classes | Variable (hors heap) | Full GC |

## Cycle de vie d'un objet

\`\`\`java
public class GcLifecycle {
    public static void main(String[] args) {
        // 1. Allocation dans Eden (espace contigu, très rapide)
        Object obj = new Object();

        // 2. Premier Minor GC — si obj est toujours reference
        //    il est deplace vers Survivor S0
        //    (les objets non references sont liberes)

        // 3. Minor GC suivant — obj deplace de S0 vers S1
        //    age = 2

        // 4. Apres X Minor GC (seuil de tenuring, defaut 15)
        //    obj est promu vers Old Generation
        obj = null; // Plus reference — eligible pour GC

        // 5. Le prochain GC libererà la mémoire de obj
        //    (dans Old si obj y a ete promu)
    }
}
\`\`\`

## Les différents Garbage Collectors

\`\`\`bash
# Serial GC — thread unique, stop-the-world
# Ideal pour les petites apps (mono-thread, < 100 Mo heap)
java -XX:+UseSerialGC -jar monapp.jar

# Parallel (Throughput) GC — plusieurs threads, defaut Java 8
# Maximise le debit (throughput)
java -XX:+UseParallelGC -jar monapp.jar

# G1 GC — Garbage First, defaut depuis Java 9
# Decoupe le heap en regions, collecte par priorite
# Limite le temps de pause (soft real-time)
java -XX:+UseG1GC -jar monapp.jar
java -XX:MaxGCPauseMillis=200 -jar monapp.jar  # Pause cible : 200ms

# ZGC — faible latence, jusqu'a 16 To heap
# Pauses < 10ms, quasiment independantes de la taille du heap
java -XX:+UseZGC -jar monapp.jar
java -XX:+UseZGC -Xmx32g -jar monapp.jar

# Shenandoah — pauses constantes (Java 15+)
java -XX:+UseShenandoahGC -jar monapp.jar
\`\`\`

\`\`\`java
// Tableau comparatif des GCs
String[][] gcComparison = {
    {"GC", "Throughput", "Pause cible", "Heap max", "Concurrent"},
    {"Serial", "Faible", "~1s", "< 1 Go", "Non"},
    {"Parallel", "Eleve", "~1s", "< 10 Go", "Non"},
    {"G1", "Moyen", "~200ms", "< 100 Go", "Partiel"},
    {"ZGC", "Moyen", "< 10ms", "< 16 To", "Oui"},
    {"Shenandoah", "Moyen", "< 50ms", "< 1 To", "Oui"},
};
\`\`\`

## Monitoring et tuning

\`\`\`bash
# Afficher les flags GC actifs
java -XX:+PrintCommandLineFlags -version

# Logs GC detailles (Java 9+)
java -Xlog:gc*=info:file=gc.log -jar monapp.jar
java -Xlog:gc*=debug:file=gc.log -jar monapp.jar

# Heap dump automatique sur OutOfMemoryError
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof -jar monapp.jar

# Surveillance en temps reel avec jstat
jstat -gcutil <pid> 1000  # Affiche toutes les 1 seconde
#   S0  S1  E   O   M   YGC  YGCT  FGC  FGCT
#   0   0   45  60  85  12   0.45  3    1.20

# VisualVM — interface graphique de monitoring
jvisualvm
\`\`\`

## Bonnes pratiques

1. **Dimensionner correctement le heap** — \`-Xms\` et \`-Xmx\` identiques évite les redimensionnements dynamiques
2. **Choisir le GC adapte** — throughput (Parallel) pour batch, latence (ZGC/G1) pour interactif
3. **Eviter les allocations temporaires excessives** — les objets ephemeres saturent le Young Gen
4. **Surveiller le ratio de promotion** — si beaucoup d'objets passent vite en Old, augmentez le Young Gen
5. **Utiliser les flags de logging** en production pour diagnostiquer les problèmes de mémoire
6. **Tester avec les flags \`-XX:+PrintGCDetails\`** pour comprendre le comportement
7. **Ne pas appeler \`System.gc()\`** — c'est une suggestion, pas une garantie

## Pièges courants

1. **Heap trop petit** — OutOfMemoryError frequentes, Full GC constants
2. **Objets qui fuient vers Old Gen** — fichiers, streams, caches non vides
3. **Metaspace insuffisante** — avec des apps qui chargent beaucoup de classes (frameworks)
4. **Stop-the-world trop longs** — avec Parallel GC sur gros heap (plusieurs secondes de pause)
5. **Finalizers** — lents, non deterministes, ont ete deprecies depuis Java 9

Source : [Oracle Java Documentation — Garbage Collection](https://docs.oracle.com/javase/tutorial/essential/environment/garbage.html)
`},
        {
          id: 'java-9',
          question: 'StackOverflowError vs OutOfMemoryError',
          answer: "**`StackOverflowError`** : la pile d'exécution est pleine, typiquement par récursion infinie (stack ~512Ko-1Mo). **`OutOfMemoryError`** : le tas (*heap*) est saturé, par exemple une liste qui grandit indéfiniment.\n\n`StackOverflow` se diagnostique facilement vià la trace d'appels ; `OutOfMemory` nécessite souvent un profiling (`JVisualVM`, `Eclipse MAT`). En production : `-Xmx` pour le heap, `-Xss` pour la stack.",
        
          deepDive: `# StackOverflowError vs OutOfMemoryError en Java

## Qu'est-ce que c'est ?

Ces deux erreurs indiquent un epuisement de mémoire, mais dans des **regions différentes** de la JVM :

- **\`StackOverflowError\`** : epuisement de la pile d'appel (stack), typiquement par reçursion infinie
- **\`OutOfMemoryError\`** : epuisement du tas (heap), typiquement par fuite mémoire ou charge excessive

## Les deux regions mémoire

\`\`\`
+------------------------------------------+
|  JVM Memory                               |
|                                            |
|  +-- Stack (pile) --+  +-- Heap (tas) --+ |
|  | Chaque thread    |  | Objets Java    | |
|  | a sa propre pile |  | (= instances)  | |
|  |                  |  |                | |
|  | Taille typique:  |  | Taille typique:| |
|  | 512 Ko - 1 Mo    |  | 256 Mo - 32 Go | |
|  +------------------+  +----------------+ |
+------------------------------------------+
\`\`\`

## StackOverflowError — la pile deborde

### Causes typiques

1. **Recursion infinie** — pas de condition d'arret
2. **Recursion trop profonde** — meme avec condition, le nombre d'appels depasse la taille de la pile
3. **Cycles dans les references** — \`toString()\` qui s'appelle mutuellement

### Exemples

\`\`\`java
// Cause 1 : Pas de cas de base
public class Factorial {
    public static int factorial(int n) {
        return n * factorial(n - 1);  // Aucun cas de base !
    }

    public static void main(String[] args) {
        factorial(5);  // StackOverflowError
    }
}
\`\`\`

\`\`\`java
// Cause 2 : Profondeur excessive
public class DeepRecursion {
    private static int depth = 0;

    public static void reçurse() {
        depth++;
        reçurse();  // Va finir par deborder
    }

    public static void main(String[] args) {
        try {
            reçurse();
        } catch (StackOverflowError e) {
            System.out.println("Profondeur maximale: " + depth);
            // Sur JVM typique: ~10000 a ~20000 appels
        }
    }
}
\`\`\`

\`\`\`java
// Cause 3 : Cycle dans toString()
public class Employee {
    private String name;
    private Department department;

    @Override
    public String toString() {
        return name + " travaille dans " + department;
        // Si department.toString() appelle employee.toString() -> cycle !
    }
}

public class Department {
    private String name;
    private Employee manager;

    @Override
    public String toString() {
        return name + " managed by " + manager;
    }

    public static void main(String[] args) {
        Employee e = new Employee();
        Department d = new Department();
        e.department = d;
        d.manager = e;

        System.out.println(e);  // StackOverflowError !
    }
}
\`\`\`

### Solutions

\`\`\`java
// Solution 1 : Version iterative (pas de reçursion)
public static int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Solution 2 : Augmenter la pile (dernier recours)
// java -Xss2m MonApp  (2 Mo par thread)

// Solution 3 : Tail reçursion (optimisation non garantie en Java)
public static int factorial(int n, int accumulator) {
    if (n <= 1) return accumulator;
    return factorial(n - 1, n * accumulator);  // Tail call
}
\`\`\`

## OutOfMemoryError — le heap deborde

### Types et causes

| Type d'OOM | Cause frequente | Solution |
|-----------|----------------|----------|
| \`Java heap space\` | Trop d'objets crees, fuite mémoire | Augmenter heap (\`-Xmx\`), corriger fuite |
| \`GC overhead limit exceeded\` | GC passe >98% du temps, reçupere <2% | Augmenter heap, optimiser allocations |
| \`Unable to create new native thread\` | Trop de threads (limite OS depassee) | Reduire le nombre de threads |
| \`Metaspace\` | Trop de classes chargees | Augmenter \`-XX:MaxMetaspaceSize\` |
| \`Requested array size exceeds VM limit\` | Tableau trop grand pour la JVM | Reduire la taille du tableau |

### Exemples

\`\`\`java
// Fuite mémoire : collection qui grandit sans limite
public class MemoryLeak {
    private static final List<byte[]> LEAK = new ArrayList<>();

    public static void main(String[] args) {
        while (true) {
            LEAK.add(new byte[1024 * 1024]);  // 1 Mo a chaque iteration
        }
        // Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
    }
}
\`\`\`

\`\`\`java
// GC overhead limit
public class GCOverhead {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();
        Random r = new Random();

        while (true) {
            map.put(r.nextInt(), "value");
            if (map.size() > 100_000) {
                map.clear();  // Vide mais le GC souffre déjà
            }
        }
        // Exception: java.lang.OutOfMemoryError: GC overhead limit exceeded
    }
}
\`\`\`

\`\`\`java
// Allocation d'un tableau trop grand
public class ArrayTooBig {
    public static void main(String[] args) {
        int[] huge = new int[Integer.MAX_VALUE];
        // Exception: java.lang.OutOfMemoryError: Requested array size exceeds VM limit
    }
}
\`\`\`

## Diagnostic

\`\`\`bash
# Heap dump automatique
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/dump.hprof -jar app.jar

# Analyser le heap dump
jhat /tmp/dump.hprof  # Navigateur HTTP sur port 7000

# Monitoring en direct
jstat -gcutil <pid> 1000
# Si Old Gen croit sans jamais diminuer → fuite mémoire

# Voir les threads et leur stack
jstack <pid>

# Voir la configuration mémoire
jinfo -flags <pid>
\`\`\`

## Bonnes pratiques

1. **Toujours avoir un cas de base** dans les fonctions reçursives
2. **Utiliser des structures iteratives** quand la profondeur de reçursion est imprevisible
3. **Ne pas catcher \`StackOverflowError\`** — c'est un \`Error\`, pas une \`Exception\`
4. **Dimensionner le heap** avec \`-Xms\` et \`-Xmx\` identiques
5. **Ajouter \`-XX:+HeapDumpOnOutOfMemoryError\`** en production
6. **Surveiller les logs GC** pour detecter les tendances

## Pièges courants

1. **Catcher \`OutOfMemoryError\`** et continuer — la JVM est dans un état instable
2. **Recursion sans cas de base** — erreur la plus frequente
3. **\`toString()\` cyclique** — difficile a reperer sans stack trace complete
4. **\`-Xss\` trop petit** — pour les apps avec reçursion profonde (parsing, arbres)
5. **ThreadLocal non nettoye** — fuite silencieuse dans les threads de pool

Source : [Oracle Java Documentation — Common Problems](https://docs.oracle.com/javase/tutorial/essential/environment/problems.html)
`},
        {
          id: 'java-10',
          question: 'Fuites mémoire en Java',
          answer: "Le GC nettoie les objets *inaccessibles*, mais pas les objets **oubliés dans des collections statiques**, les **listeners non désenregistrés**, les **cachées sans taille limite**, où les **références vers des objets externes** non fermés (`Connection`, `Stream`).\n\nDétection : monitoring de la mémoire (`JVisualVM`, heap dump), tests de charge avec analyse de l'évolution du heap. __Prévention : toujours fermer les ressources, limiter les cachées, utiliser `WeakReference` quand approprié.__",
        
          deepDive: `# Fuites mémoire en Java

## Qu'est-ce qu'une fuite mémoire ?

Contrairement a C/C++ ou une fuite est un objet alloue jamais libere, en Javà une fuite mémoire est un **objet toujours reference mais plus utilise**. Le GC ne peut pas le liberer car il est encore accessible, meme si le programme n'en a plus besoin.

Les fuites mémoire sont insidieuses : elles s'accumulent lentement et provoquent un \`OutOfMemoryError\` après des heures ou des jours d'execution.

## Les 5 causes principales de fuites mémoire

### 1. Collections statiques sans eviction

La cause la plus frequente : les references statiques vivent toute la duree de la JVM.

\`\`\`java
// FUITES — la collection grandit sans limite
public class UserCache {
    private static final Map<Long, User> cache = new HashMap<>();

    public static User getUser(long id) {
        return cache.computeIfAbsent(id, UserService::fetchById);
        // Jamais de nettoyage ! Le cache grandit indefiniment
    }
}
\`\`\`

\`\`\`java
// SOLUTION — utiliser une taille limite
public class UserCache {
    private static final Map<Long, User> cache =
        new LinkedHashMap<>(16, 0.75f, true) {  // access-order
            @Override
            protected boolean removeEldestEntry(Map.Entry<Long, User> eldest) {
                return size() > 1000;  // Eviction LRU automatique
            }
        };

    public static User getUser(long id) {
        return cache.computeIfAbsent(id, UserService::fetchById);
    }
}

// Alternative : Caffeine (bibliotheque recommandee)
// Cache<Long, User> cache = Caffeine.newBuilder()
//     .maximumSize(1000)
//     .expireAfterWrite(10, TimeUnit.MINUTES)
//     .build();
\`\`\`

### 2. Listeners et callbacks non desenregistres

\`\`\`java
// FUITES — listener enregistre mais jamais retire
public class EventBus {
    private final List<Listener> listeners = new ArrayList<>();

    public void register(Listener listener) {
        listeners.add(listener);
    }
    // Pas de unregister() ! Les listeners s'accumulent
}

// Utilisation
class MyController {
    private final EventBus bus;

    MyController(EventBus bus) {
        this.bus = bus;
        bus.register(event -> handleEvent(event));
        // Le controller ne peut pas être GC car le listener
        // reference this (closure)
    }
}
\`\`\`

\`\`\`java
// SOLUTION — WeakReference ou deregistration explicite
public class EventBus {
    private final List<WeakReference<Listener>> listeners = new ArrayList<>();

    public void register(Listener listener) {
        listeners.add(new WeakReference<>(listener));
        // Les listeners morts seront automatiquement ignores
    }

    public void fire(Event event) {
        listeners.removeIf(ref -> ref.get() == null);
        for (Listener l : listeners.stream().map(WeakReference::get)
                 .filter(Objects::nonNull).toList()) {
            l.onEvent(event);
        }
    }
}
\`\`\`

### 3. ThreadLocal non nettoye

\`ThreadLocal\` est dangereux dans les environnements avec **pool de threads** (application serveur) :

\`\`\`java
// FUITES — ThreadLocal jamais nettoye
public class RequestContext {
    private static final ThreadLocal<User> currentUser = new ThreadLocal<>();

    public static void setUser(User user) {
        currentUser.set(user);
    }

    public static User getUser() {
        return currentUser.get();
    }
    // Pas de remove() ! Le thread du pool conserve la reference
}

// Dans un controlleur
@GetMapping("/api/data")
public Data getData() {
    User user = authService.authenticate(request);
    RequestContext.setUser(user);  // ThreadLocal set
    return service.getData();
    // Le thread retourne au pool avec la reference toujours presente !
}
\`\`\`

\`\`\`java
// SOLUTION — nettoyer dans un finally
@GetMapping("/api/data")
public Data getData() {
    User user = authService.authenticate(request);
    RequestContext.setUser(user);
    try {
        return service.getData();
    } finally {
        RequestContext.currentUser.remove();  // Nettoie TOUJOURS
    }
}
\`\`\`

### 4. Ressources non fermees

\`\`\`java
// FUITES — ressources jamais fermees
public class FileProcessor {
    public void process(String path) throws IOException {
        FileInputStream fis = new FileInputStream(path);
        BufferedReader br = new BufferedReader(new InputStreamReader(fis));
        String line = br.readLine();
        // Si exception avant close() -> fuite de file descriptor
        br.close();
        fis.close();
    }

    // SOLUTION — try-with-resources (Java 7+)
    public void processSafe(String path) throws IOException {
        try (FileInputStream fis = new FileInputStream(path);
             BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
            String line = br.readLine();
        }
        // Fermeture automatique meme en cas d'exception
    }
}
\`\`\`

### 5. String.substring() (Java 6 et avant)

\`\`\`java
// Java 6 — substring() conservait la reference au char[] original !
String huge = loadHugeFile();  // 100 Mo
String small = huge.substring(0, 5);  // "Hello" mais conserve 100 Mo en mémoire

// Solution : new String(small) force la copie du char[]
String reallySmall = new String(small);  // ~10 octets seulement

// Depuis Java 7+, substring() cree un nouveau char[] — plus de fuite
\`\`\`

## Detection des fuites mémoire

\`\`\`java
// Programme de test pour detecter une fuite
public class LeakDetector {
    public static void main(String[] args) {
        List<byte[]> leak = new ArrayList<>();
        Runtime rt = Runtime.getRuntime();

        while (true) {
            leak.add(new byte[1024 * 100]);  // 100 Ko
            System.out.printf("Used: %.2f MB | Free: %.2f MB%n",
                (rt.totalMemory() - rt.freeMemory()) / 1e6,
                rt.freeMemory() / 1e6);
            Thread.sleep(100);
        }
    }
}
\`\`\`

\`\`\`bash
# Outils de diagnostic
# 1. Heap dump
jmap -dump:live,format=b,file=leak.hprof <pid>

# 2. Analyse avec Eclipse MAT
# eclipse -vmargs -Xmx4g
# Ouvrir leak.hprof, utiliser "Leak Suspects Report"

# 3. Profiling avec Async Profiler
# ./profiler.sh -d 60 -o flamegraph -e alloc <pid>

# 4. Monitoring continu
jstat -gcutil <pid> 5s
\`\`\`

## Tableau recapitulatif

| Cause | Symptome | Solution |
|-------|----------|----------|
| Collection statique sans eviction | Heap croit lineairement | LRU, WeakHashMap, taille max |
| Listeners non retires | Objets non GC | WeakReference, deregister explicite |
| ThreadLocal non nettoye | Fuite par thread de pool | remove() dans finally |
| Ressources non fermees | File descriptors epuises | try-with-resources |
| Inner class non statique | Reference implicite à l'externe | Classe statique ou interface |

## Bonnes pratiques

1. **Limiter la taille des caches** — toujours une borne superieure
2. **Utiliser \`WeakHashMap\` ou \`WeakReference\`** pour les mappings temporaires
3. **Nettoyer les \`ThreadLocal\`** dans un bloc \`finally\`
4. **Toujours fermer les ressources** avec \`try-with-resources\`
5. **Faire des classes internes \`static\`** quand elles n'ont pas besoin de reference à l'exterieure
6. **Profiler regulierement** avec \`jvisualvm\` ou \`async-profiler\`
7. **Ajouter \`-XX:+HeapDumpOnOutOfMemoryError\`** en production

## Pièges courants

1. **Collections statiques** — le cas le plus frequent et le plus simple a corriger
2. **Callbacks** — frameworks comme Spring, Hibernate ou Android (Activity) en sont coutumiers
3. **Pool de threads** — ThreadLocal + pool = cocktail explosif
4. **CustomClassLoader** — classes non dechargeables (PermGen/Metaspace leak)
5. **Interned strings** — \`String.intern()\` sans limite peut saturer la mémoire

Source : [Oracle Java Documentation — Understanding Memory Leaks](https://docs.oracle.com/javase/tutorial/essential/environment/understandingMemory.html)
`},
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

## Qu'est-ce qu'une exception ?

Une exception est un événement qui interrompt le flux normal d'execution. En Java, les exceptions sont des objets heritage de \`Throwable\`. Comprendre la hierarchie est fondamental pour bien les utiliser.

## Hierarchie des exceptions

\`\`\`
                        Throwable
                            |
              +-------------+-------------+
              |                           |
           Error                       Exception
              |                           |
   +----------+--------+        +----------+----------+
   |                   |        |                     |
OutOfMemoryError  StackOverflow  RuntimeException   IOException
                                  (unchecked)        (checked)
                                      |
                    +----------+------+------+----------+
                    |          |             |          |
              NullPointer  IllegalArg  IndexOutOf  Arithmetic
              Exception   Exception    BoundsEx.   Exception
\`\`\`

## Checked vs Unchecked

\`\`\`java
// CHECKED — le compilateur OBLIGE a gerer
public void readFile(String path) throws IOException {
    // IOException est checked : soit throws, soit try-catch
    Files.readString(Path.of(path));
}

// UNCHECKED — le compilateur n'oblige pas
public void validate(int value) {
    if (value < 0) {
        throw new IllegalArgumentException("Value negative");  // Runtime = unchecked
    }
}
\`\`\`

\`\`\`java
// Tableau comparatif
String[][] checkedVsUnchecked = {
    {"Critere", "Checked", "Unchecked"},
    {"Verification", "Compile-time", "Runtime"},
    {"Heritage", "Exception (sauf RuntimeException)", "RuntimeException"},
    {"Obligation", "Catcher ou déclarer", "Optionnel"},
    {"Usage", "Erreurs reçuperables", "Erreurs de programmation"},
    {"Exemples", "IOException, SQLException", "NPE, IllegalArgumentException"},
};
\`\`\`

## Les différents blocs de gestion

### try-catch-finally — le bloc classique

\`\`\`java
try {
    int result = divide(10, 0);
    System.out.println("Resultat: " + result);
} catch (ArithmeticException e) {
    System.err.println("Erreur arithmetique: " + e.getMessage());
} catch (Exception e) {
    // Generique — a placer en dernier
    System.err.println("Erreur inattendue: " + e);
} finally {
    // S'execute TOUJOURS, meme avec return dans try/catch
    System.out.println("Nettoyage effectue");
}

// finally est ideal pour les ressources
public Connection getConnection() {
    try {
        return dataSource.getConnection();
    } finally {
        loggingService.log("Connection requested");
        // Note : si finally leve une exception, l'exception du try est perdue
    }
}
\`\`\`

### Multi-catch (Java 7+)

\`\`\`java
// Avant Java 7 — duplique
try {
    readConfig();
} catch (IOException e) {
    log.error("IO Error", e);
} catch (ParseException e) {
    log.error("Parse Error", e);
}

// Java 7+ — concis
try {
    readConfig();
} catch (IOException | ParseException e) {
    // e est effectivement final — on ne peut pas la reassigner
    log.error("Configuration error", e);
}
\`\`\`

### try-with-resources — pour les ressources AutoCloseable

\`\`\`java
// Automatise la fermeture, plus propre que finally
try (Connection conn = dataSource.getConnection();
     PreparedStatement stmt = conn.prepareStatement(sql);
     ResultSet rs = stmt.executeQuery()) {

    while (rs.next()) {
        processRow(rs);
    }
} catch (SQLException e) {
    log.error("Database error", e);
}
// Les 3 ressources sont fermees automatiquement (ordre inverse)
\`\`\`

## Creation d'exceptions personnalisees

\`\`\`java
// Exception checked personnalisee
public class PaymentException extends Exception {
    public PaymentException(String message) {
        super(message);
    }

    public PaymentException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Exception unchecked personnalisee
public class ValidationException extends RuntimeException {
    private final List<String> errors;

    public ValidationException(List<String> errors) {
        super("Validation failed: " + String.join(", ", errors));
        this.errors = errors;
    }

    public List<String> getErrors() { return errors; }
}

// Utilisation
public void processPayment(Payment payment) throws PaymentException {
    List<String> errors = new ArrayList<>();
    if (payment.getAmount() <= 0) errors.add("Montant invalide");
    if (payment.getCurrency() == null) errors.add("Devise requise");

    if (!errors.isEmpty()) {
        throw new ValidationException(errors);  // unchecked
    }

    try {
        paymentGateway.charge(payment);
    } catch (GatewayTimeoutException e) {
        throw new PaymentException("Gateway timeout", e);  // checked, chainee
    }
}
\`\`\`

## Bonnes pratiques

1. **Utiliser des exceptions specifiques** — pas de \`catch (Exception e)\` generique
2. **Ne pas avaler les exceptions** — catcher sans traiter ni relancer
3. **Preserver l'exception originale** — utiliser le constructeur avec \`cause\`
4. **Checked pour erreurs reçuperables, Unchecked pour bugs**
5. **Utiliser try-with-resources** systematiquement
6. **Ne pas utiliser les exceptions pour le contrôle de flux** — c'est lent
7. **Documenter les exceptions lancees** avec \`@throws\` dans la Javadoc

## Pièges courants

1. **\`finally\` avec \`return\`** — ecrase l'exception et retourne la valeur du finally
2. **Catcher \`Exception\` trop largement** — masque les bugs silencieusement
3. **Logger ET relancer** — doublon dans les logs, le niveau superieur re-loge
4. **Oublier de fermer les ressources** — avec l'ancienne syntaxe
5. **Perdre la stack trace** — \`new Exception()\` au lieu de \`throw\` preserve la cause

Source : [Oracle Java Documentation — Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
`},
        {
          id: 'java-12',
          question: 'throw vs throws',
          answer: "**`throw`** lance explicitement une exception dans le code (ex. `throw new IllegalArgumentException()`). **`throws`** déclare dans la signature qu'une méthode peut lancer une exception — surtout pour les *checked exceptions*.\n\n`throws` sert de contrat : l'appelant doit attraper l'exception où la redéclarer. C'est un mécanisme de **transparence** qui empêche d'ignorer les erreurs potentielles.",
          code: 'void verifier(int v) throws IllegalArgumentException {\n    if (v < 0) throw new IllegalArgumentException("Négatif");\n}',
          language: 'java',
        
          deepDive: `# throw vs throws en Java

## Qu'est-ce que c'est ?

\`throw\` et \`throws\` sont deux mots-cles complementaires pour la gestion des exceptions :

- **\`throw\`** : **déclenche** une exception dans le code (action, au sein du corps de méthode)
- **\`throws\`** : **declare** qu'une méthode peut lancer des exceptions (contrat, dans la signature)

## throw — déclencher une exception

\`throw\` est un mot-cle qui interrompt immediatement le flux et propage l'exception vers l'appelant.

\`\`\`java
// Syntaxe : throw <instance de Throwable>
public void validateAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative: " + age);
    }
    if (age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    // Si on arrive ici, age est valide
}
\`\`\`

\`\`\`java
// throw peut aussi relancer une exception capturee
public void process() {
    try {
        riskyOperation();
    } catch (IOException e) {
        // Log et relance
        log.error("IO Error", e);
        throw e;  // Relance l'exception originale
    }
}

// Relancer avec enrichissement
try {
    parseFile(path);
} catch (ParseException e) {
    throw new RuntimeException("Failed to parse: " + path, e);
    // On preserve la cause originale (chainage)
}
\`\`\`

\`\`\`java
// Creation et lancement d'exception personnalisee
public class InsufficientFundsException extends RuntimeException {
    private final double balance;
    private final double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format("Insufficient funds: balance=%.2f, required=%.2f", balance, amount));
        this.balance = balance;
        this.amount = amount;
    }
}

public void withdraw(double amount) {
    if (amount > this.balance) {
        throw new InsufficientFundsException(this.balance, amount);
    }
    this.balance -= amount;
}
\`\`\`

## throws — déclarer les exceptions possibles

\`throws\` apparait dans la signature de la méthode pour informer l'appelant des exceptions checked qui peuvent être lancees.

\`\`\`java
// Signature : returntype methodName(params) throws ExceptionType1, ExceptionType2
public void readFile(String path) throws IOException {
    // IOException est checked : doit être declaree
    Files.readString(Path.of(path));
}

// Plusieurs exceptions
public void processConfig(String path) throws IOException, ParseException {
    String content = Files.readString(Path.of(path));  // IOException
    Config config = ConfigParser.parse(content);        // ParseException
}
\`\`\`

\`\`\`java
// L'appelant doit gerer (catcher ou re-déclarer)
public class CallerExample {

    // Option 1 : catcher
    public void safeRead() {
        try {
            readFile("config.txt");
        } catch (IOException e) {
            System.err.println("Cannot read config: " + e.getMessage());
        }
    }

    // Option 2 : re-déclarer
    public void unsafeRead() throws IOException {
        readFile("config.txt");  // Passe la responsabilite à l'appelant
    }
}
\`\`\`

## Difference fondamentale

| Aspect | \`throw\` | \`throws\` |
|--------|---------|----------|
| Role | Declencher une exception | Declarer les exceptions possibles |
| Emplacement | Corps de la méthode | Signature de la méthode |
| Nombre d'exceptions | Une seule à la fois | Plusieurs, separees par des virgules |
| Type d'exception | N'importe quel \`Throwable\` | Souvent checked exceptions |
| Obligation | Quand une condition d'erreur est rencontree | Quand la méthode peut lancer des checked |

## Exemple complet

\`\`\`java
public class BankAccount {
    private double balance;

    // throws : declare que cette méthode peut lancer ces exceptions
    public void transfer(double amount, BankAccount target)
            throws InsufficientFundsException, AccountClosedException {

        if (this.isClosed()) {
            throw new AccountClosedException("Source account is closed");
        }

        if (target.isClosed()) {
            throw new AccountClosedException("Target account is closed");
        }

        // throw : déclenche l'exception
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }

        this.balance -= amount;
        target.balance += amount;
    }

    // Methode sans throws — ne peut lancer que des unchecked
    public double getBalance() {
        if (this.isClosed()) {
            throw new AccountClosedException("Account is closed");
        }
        return balance;
    }
}
\`\`\`

## Bonnes pratiques

1. **\`throw\` pour les états invalides** — lancez tot, echouez tot (fail-fast)
2. **\`throws\` pour documenter le contrat** — toute checked exception fait partie de l'API
3. **Preserver la cause** — utilisez toujours \`throw new Exception("message", cause)\`
4. **Ne pas déclarer des unchecked dans \`throws\`** — inutile, encombre la signature
5. **Utiliser des exceptions specifiques** — chaque type d'erreur a sa propre exception
6. **Ne pas abuser des checked** — si l'appelant ne peut pas remedier, utilisez unchecked

## Pièges courants

1. **Confondre \`throw\` et \`throws\`** — l'un est une action, l'autre une déclaration
2. **Declarer trop d'exceptions dans \`throws\`** — rend l'API fragile (toute modification casse les appelants)
3. **Oublier \`throws\` pour une checked** — erreur de compilation
4. **Lancer une checked sans la déclarer** — impossible, le compilateur refuse
5. **\`throws\` avec \`RuntimeException\`** — completement inutile et trompeur

Source : [Oracle Java Documentation — Throwing Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/throwing.html)
`},
        {
          id: 'java-13',
          question: 'Checked vs Unchecked',
          answer: "**Checked** : vérifiées à la compilation, le compilateur oblige à les gérer (`try-catch` ou `throws`) — ex. `IOException`, `SQLException`. Impossible de les ignorer.\n\n**Unchecked** (sous-classes de `RuntimeException`) : non vérifiées, représentent des erreurs de programmation — ex. `NullPointerException`.\n\nEn pratique : **checked** pour les erreurs métier prévisibles, **unchecked** pour les bugs de programmation.",
        
          deepDive: `# Checked vs Unchecked exceptions en Java

## Qu'est-ce que c'est ?

Java divise les exceptions en deux categories : **checked** (verifiees à la compilation) et **unchecked** (non verifiees). Cette distinction est une decision de conception du langage qui force les développeurs a gerer certaines erreurs.

## La regle fondamentale

\`\`\`
Si l'appelant peut raisonnablement reçuperer l'erreur → Checked
Si l'erreur est un bug de programmation              → Unchecked (RuntimeException)
Si l'erreur est système et irreversible               → Error (ne pas catcher)
\`\`\`

## Tableau comparatif

| Critere | Checked | Unchecked |
|---------|---------|-----------|
| Heritage | \`Exception\` (sauf \`RuntimeException\`) | \`RuntimeException\` |
| Verification | Compile-time | Runtime |
| Obligation | Catcher OU déclarer (\`throws\`) | Optionnel |
| Cas typique | Fichier introuvable, connexion perdue | NullPointer, index invalide |
| Impact API | Fort — change la signature | Nul — pas dans la signature |
| Quand creer | Erreur exterieure reçuperable | Bug interne irremediable |

## Exemples detailles

\`\`\`java
// CHECKED — l'appelant DOIT gerer
public class FileService {
    // IOException est checked
    public String readFile(String path) throws IOException {
        return Files.readString(Path.of(path));
    }
}

public class Controller {
    public void handleRequest() {
        FileService service = new FileService();
        try {
            String content = service.readFile("/etc/config.txt");
            process(content);
        } catch (IOException e) {
            // L'appelant PEUT reçuperer : utiliser un fichier par defaut
            log.warn("Config not found, using defaults");
            process(DEFAULT_CONFIG);
        }
    }
}
\`\`\`

\`\`\`java
// UNCHECKED — l'appelant n'est pas force
public class Calculator {
    public int divide(int a, int b) {
        if (b == 0) {
            // ArithmeticException est unchecked — pas de throws necessaire
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}

public class Client {
    public void compute() {
        Calculator calc = new Calculator();
        calc.divide(10, 0);  // Pas besoin de try-catch (mais risque de crash)
    }
}
\`\`\`

\`\`\`java
// Le grand debat : checked vs unchecked
// Partisan des checked : "le compilateur m'oblige a gerer les erreurs"
// Partisan des unchecked : "le try-catch pollue le code, la plupart du temps
//   on ne peut rien faire, on relogue juste et on relance en RuntimeException"

// Exemple : SQLException checked — que faire ?
try {
    conn.executeQuery(sql);
} catch (SQLException e) {
    // On ne peut pas "reçuperer" une requête invalide
    // On va juste logger et echouer
    throw new RuntimeException("Database error", e);
    // La conversion checked→unchecked est un pattern courant
}
\`\`\`

\`\`\`java
// Creee une exception checked vs unchecked
public class BusinessException extends Exception {
    // CHECKED — force l'appelant a gerer
    public BusinessException(String message) {
        super(message);
    }
}

public class TechnicalException extends RuntimeException {
    // UNCHECKED — bug interne, pas de reçuperation possible
    public TechnicalException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

## Bonnes pratiques

1. **Checked pour les erreurs reçuperables** — fichier manquant, connexion refusee, solde insuffisant
2. **Unchecked pour les bugs** — argument null, index out of bounds, état illegal
3. **Convertir les checked en unchecked** à la frontiere du système (DAO → Service)
4. **Ne pas creer de checked exception pour une erreur que l'appelant ne peut pas traiter**
5. **Documenter TOUTES les exceptions** (checked et unchecked) avec \`@throws\` dans la Javadoc
6. **@Transactional et checked exceptions** — attention, Spring ne rollback pas sur checked exception par defaut
7. **Ne pas abuser des checked** — une API avec 5 checked exceptions dans \`throws\` est penible a utiliser

## Pièges courants

1. **Creer une checked pour une erreur de programmation** — NPE ou IllegalArgumentException devraient être unchecked
2. **Catcher \`Exception\` trop largement** — masque les unchecked inattendues
3. **Checked exceptions dans les interfaces fonctionnelles** — impossible avec \`Consumer<T>\` ou \`Function<T,R>\` qui ne declarent pas \`throws\`
4. **Checked exceptions et lambdas** — complique considerablement le code
5. **Spring \`@Transactional\` et checked** — le rollback n'est pas automatique, il faut specifier \`rollbackFor\`

Source : [Oracle Java Documentation — Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html)
`},
      ],
    },
    {
      id: 'java-collections',
      title: 'Collections & Strings',
      questions: [
        {
          id: 'java-14',
          question: 'Array vs ArrayList',
          answer: "**`Array`** : taille fixe, accepte les primitives, syntaxe crochets. **`ArrayList`** : taille dynamique, objets uniquement (*autoboxing* pour les primitives), méthodes `add`/`get`/`remove`.\n\n`ArrayList` est plus flexible et préférée dans la plupart des cas. `Array` reste utile pour les performances critiques où les tailles connues à l'avance.",
        
          deepDive: `# Array vs ArrayList en Java

## Qu'est-ce que c'est ?

\`Array\` et \`ArrayList\` sont deux facons de stocker une sequence d'elements en Java. L'array est une structure **primitive du langage**, tandis qu'\`ArrayList\` est une **classe de la bibliotheque standard** qui encapsule un array avec un redimensionnement automatique.

## Tableau comparatif

| Caracteristique | Array | ArrayList |
|----------------|-------|-----------|
| Taille | Fixe (definie à la creation) | Dynamique (s'agrandit automatiquement) |
| Primitives | Oui (\`int[]\`, \`boolean[]\`, etc.) | Non (autoboxing : \`Integer\`, \`Boolean\`) |
| Performance | Plus rapide (acces direct mémoire) | Legerement plus lent (méthodes, autoboxing) |
| Syntaxe | \`Type[] arr = new Type[n]\` | \`new ArrayList<>()\` |
| Longueur | \`arr.length\` (champ) | \`list.size()\` (méthode) |
| Type securite | Verifie à la compilation | Verifie à la compilation (generiques) |
| Methodes | Aucune (length, index) | \`add\`, \`remove\`, \`contains\`, \`sort\`, etc. |

\`\`\`java
// Tableau recapitulatif des operations
String[][] comparison = {
    {"Operation", "Array", "ArrayList"},
    {"Creation", "new int[10]", "new ArrayList<>()"},
    {"Taille", "arr.length", "list.size()"},
    {"Acces", "arr[i]", "list.get(i)"},
    {"Modification", "arr[i] = x", "list.set(i, x)"},
    {"Ajout", "Impossible (taille fixe)", "list.add(x)"},
    {"Suppression", "Impossible", "list.remove(i)"},
    {"Iteration", "for/for-each", "for/for-each/stream"},
};
\`\`\`

## Exemples detailles

### Array — taille fixe, performance

\`\`\`java
// Declaration et allocation
int[] numbers = new int[5];         // Tableau de 5 entiers (tous 0 par defaut)
String[] names = new String[3];      // Tableau de 3 String (tous null)

// Initialisation
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;

// Initialisation directe
int[] primes = {2, 3, 5, 7, 11, 13};

// Tableau multidimensionnel
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
System.out.println(matrix[1][2]);  // 6

// Limitation : pas d'ajout possible
int[] more = new int[10];
System.arraycopy(primes, 0, more, 0, primes.length);  // Copie manuelle pour "agrandir"
\`\`\`

### ArrayList — flexible, riche en méthodes

\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Alice");
list.add("Bob");
list.add("Charlie");

// Methodes utiles
list.add(0, "Zoe");              // Insertion au debut
list.set(1, "Alex");             // Remplacement
list.remove("Bob");              // Suppression par valeur
list.remove(0);                  // Suppression par index
boolean has = list.contains("Alice");  // Recherche : O(n)
int index = list.indexOf("Alice");     // Index de l'element

// Trier
list.sort(Comparator.naturalOrder());
list.sort(Comparator.reverseOrder());

// Parcours
list.forEach(System.out::println);

for (String s : list) { /* ... */ }

for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
\`\`\`

### Conversion entre Array et ArrayList

\`\`\`java
// Array → ArrayList
String[] arr = {"a", "b", "c"};
List<String> list = Arrays.asList(arr);        // Vue fixed-size de l'array
ArrayList<String> arrayList = new ArrayList<>(Arrays.asList(arr));  // Copie mutable

// ArrayList → Array
ArrayList<String> list = new ArrayList<>(List.of("x", "y", "z"));
String[] arr = list.toArray(new String[0]);    // new String[0] est la convention
// Ou
String[] arr2 = list.toArray(String[]::new);   // Java 11+, references de constructeur
\`\`\`

### ArrayList — capacite initiale

\`\`\`java
// Par defaut, ArrayList commence avec capacite 10
ArrayList<Integer> defaultCap = new ArrayList<>();

// Specifier la capacite si on connait la taille approximative
ArrayList<Integer> sized = new ArrayList<>(10_000);
// Evite de nombreux resize : 10 → 15 → 22 → 33 → ... (×1.5 a chaque debordement)

// Capacite exacte si connue
ArrayList<Integer> exact = new ArrayList<>(knownSize);
\`\`\`

\`\`\`java
// Impact performance : resize d'ArrayList
ArrayList<Integer> list = new ArrayList<>();  // Capacite 10
for (int i = 0; i < 1_000_000; i++) {
    list.add(i);
    // Sans capacite initiale : ~30 resize coutteux
    // Avec capacite 1_000_000 : 0 resize
}
\`\`\`

## Quand utiliser quoi ?

\`\`\`java
// Array — taille connue et fixe, primitives, performance critique
int[] fixedScores = new int[100];  // 100 scores, jamais plus
byte[] buffer = new byte[4096];    // Buffer de taille fixe
int[][] gameBoard = new int[8][8]; // Plateau d'echecs

// ArrayList — taille variable, besoin de méthodes, collections
ArrayList<Product> cart = new ArrayList<>();  // Panier d'achat (taille variable)
ArrayList<User> searchResults = new ArrayList<>();  // Resultats de recherche
\`\`\`

## Bonnes pratiques

1. **Preferer \`ArrayList\` par defaut** — plus flexible, egalement efficace
2. **Utiliser \`Array\` pour les primitives** — \`int[]\` est plus performant que \`ArrayList<Integer>\`
3. **Specifier la capacite initiale** d'\`ArrayList\` si la taille est connue
4. **Utiliser \`List.of()\` pour les listes immuables** — plus sur et plus concis
5. **Ne pas confondre \`length\` (array) et \`size()\` (ArrayList)**
6. **Initialiser avec \`Arrays.asList()\`** pour les petites collections fixes
7. **Streams et ArrayList** — la combinaison ideale pour les traitements de donnees

## Pièges courants

1. **\`Arrays.asList()\` retourne une liste de taille fixe** — \`add()\`/\`remove()\` leve \`UnsupportedOperationException\`
2. **\`list.toArray(new T[0])\` vs \`list.toArray(new T[list.size()])\`** — la premiere est plus rapide depuis Java 6 (reflection vs allocation)
3. **Confondre taille et capacite** — \`list.size()\` est le nombre d'elements, pas la capacite interne
4. **ArrayList d'\`int\` impossible** — utiliser \`ArrayList<Integer>\` (autoboxing)
5. **Modifier un array pendant la traversee** — pas de \`ConcurrentModificationException\` (contrairement a ArrayList)

Source : [Oracle Java Documentation — Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)
`},
        {
          id: 'java-15',
          question: 'ArrayList vs LinkedList',
          answer: "**`ArrayList`** (tableau dynamique) : accès par index O(1), insertion/suppression en milieu O(n), meilleure localité cachée. **`LinkedList`** (liste doublement chaînée) : insertion/suppression O(1) si on a le nœud, accès par index O(n).\n\nEn pratique, `ArrayList` est préférée dans 90% des cas grâce à l'accès rapide et la mémoire contiguë. `LinkedList` est pertinente pour les insertions/suppressions fréquentes en tête ou en milieu.",
        
          deepDive: `# ArrayList vs LinkedList en Java

## Qu'est-ce que c'est ?

\`ArrayList\` et \`LinkedList\` sont les deux implementations principales de l'interface \`List\` en Java. Meme interface, performances radicalement différentes selon l'operation.

- **ArrayList** : tableau redimensionnable contigu en mémoire
- **LinkedList** : liste doublement chainee (nœuds avec pointeurs prev/next)

## Complexites algorithmiques

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| \`get(int index)\` | **O(1)** — calcul d'adresse direct | **O(n)** — parcours depuis la tête |
| \`add(E element)\` | **O(1)** amorti (ajout en fin) | **O(1)** (ajout en fin) |
| \`add(int index, E)\` | **O(n)** — decalage des elements | **O(n)** — recherche + O(1) insertion |
| \`remove(int index)\` | **O(n)** — decalage | **O(n)** — recherche + O(1) suppression |
| \`remove(Object)\` | **O(n)** — recherche + decalage | **O(n)** — recherche + O(1) |
| \`contains(Object)\` | **O(n)** | **O(n)** |
| Iteration | **O(n)** (très rapide, cache CPU) | **O(n)** (plus lent, pointeurs disperses) |
| Memoire | Faible (objet + array) | Elevee (objet + 3 refs par nœud) |

## Comment ils fonctionnent en interne

\`\`\`java
// ArrayList interne
public class ArrayList<E> {
    private Object[] elementData;  // Tableau interne
    private int size;              // Nombre d'elements

    // Ajout en fin
    public boolean add(E e) {
        if (size == elementData.length) {
            grow();  // Redimensionne : newCapacity = oldCapacity + (oldCapacity >> 1)
        }
        elementData[size++] = e;
        return true;
    }
}

// LinkedList interne
public class LinkedList<E> {
    private Node<E> first;  // Tete de la liste
    private Node<E> last;   // Queue de la liste
    private int size;

    private static class Node<E> {
        E item;            // La donnee
        Node<E> next;      // Nœud suivant
        Node<E> prev;      // Nœud precedent
    }
}
\`\`\`

## Exemples comparatifs

\`\`\`java
// SCENARIO 1 : Acces par index
List<Integer> arrayList = new ArrayList<>();
List<Integer> linkedList = new LinkedList<>();

// Remplir avec 100 000 elements
for (int i = 0; i < 100_000; i++) {
    arrayList.add(i);
    linkedList.add(i);
}

// Acces à l'index 50 000
long start = System.nanoTime();
arrayList.get(50_000);  // ~0.02 microsecondes
long arrayTime = System.nanoTime() - start;

start = System.nanoTime();
linkedList.get(50_000);  // ~5000 microsecondes (250 000× plus lent !)
long linkedTime = System.nanoTime() - start;

// ArrayList est BEAUCOUP plus rapide pour get()
\`\`\`

\`\`\`java
// SCENARIO 2 : Insertion au debut
List<Integer> arrayList = new ArrayList<>(100_000);
List<Integer> linkedList = new LinkedList<>();

// Mesurer l'insertion en tête
long arrayTime = 0;
long linkedTime = 0;

// Pour ArrayList, add(0, x) decale TOUS les elements → O(n)
start = System.nanoTime();
for (int i = 0; i < 10_000; i++) {
    arrayList.add(0, i);  // Decale 0, 1, 2, ..., i elements
}
arrayTime = System.nanoTime() - start;

// Pour LinkedList, add(0, x) insere juste un nœud en tête → O(1)
start = System.nanoTime();
for (int i = 0; i < 10_000; i++) {
    linkedList.add(0, i);  // Insere un nouveau first node
}
linkedTime = System.nanoTime() - start;

// LinkedList est BEAUCOUP plus rapide pour add(0, ...)
\`\`\`

\`\`\`java
// SCENARIO 3 : Parcours de liste
List<Integer> arrayList = new ArrayList<>(100_000);
List<Integer> linkedList = new LinkedList<>();

// Remplir
for (int i = 0; i < 100_000; i++) {
    arrayList.add(i);
    linkedList.add(i);
}

// MAUVAIS parcours de LinkedList
long total = 0;
for (int i = 0; i < linkedList.size(); i++) {
    total += linkedList.get(i);  // O(n) a chaque iteration → O(n²) !
    // Pour n=100 000 : ~5 milliards d'operations !
}

// BON parcours de LinkedList (iterateur)
total = 0;
for (int value : linkedList) {  // O(1) par étape → O(n)
    total += value;
}

// Pour ArrayList, les deux parcours sont O(n) — la localite mémoire rend
// le parcours avec iterateur 2-3× plus rapide que get(i)
\`\`\`

\`\`\`java
// SCENARIO 4 : Structure de file d'attente
// LinkedList implemente Deque, ArrayList non

// File FIFO
LinkedList<String> queue = new LinkedList<>();
queue.addLast("Client 1");     // Enqueue
queue.addLast("Client 2");
queue.addLast("Client 3");
String served = queue.removeFirst();  // Dequeue : "Client 1"

// Pile LIFO
LinkedList<String> stack = new LinkedList<>();
stack.push("A");                // addFirst
stack.push("B");
stack.push("C");
String top = stack.pop();        // removeFirst : "C"
\`\`\`

## Impact mémoire

\`\`\`java
// ArrayList : [obj, obj, obj, obj, obj, ...]  → contigu
// LinkedList : obj ↔ obj ↔ obj ↔ obj ↔ obj   → disperse

// Pour 1 million d'entiers :
// ArrayList<Integer> : ~20 Mo (objet Integer + reference)
// LinkedList        : ~64 Mo (objet Integer + 2 references de nœud)

// LinkedList utilise ~3× plus de mémoire !
\`\`\`

## Quand utiliser quoi ?

### ArrayList — recommandee dans 90% des cas

- Acces frequent par index
- Ajout principalement en fin de liste
- Parcours intensif (meilleure localite cache)
- Pas de modification en milieu de liste
- Contrainte mémoire

### LinkedList — pour des cas specifiques

- Insertions/suppressions frequentes en tête ou en milieu (avec iterateur)
- File (FIFO) ou pile (LIFO) — mais \`ArrayDeque\` est souvent meilleure
- Quand on dispose déjà d'un iterateur à la position d'insertion

\`\`\`java
// Tableau de decision
String[][] decision = {
    {"Besoin", "Choix", "Raison"},
    {"get(i) frequent", "ArrayList", "O(1) vs O(n)"},
    {"add en fin", "ArrayList", "O(1) amorti vs O(1)"},
    {"add en tête", "LinkedList", "O(n) vs O(1)"},
    {"FIFO Queue", "LinkedList/ArrayDeque", "Deque interface"},
    {"Parcours", "ArrayList", "Localite mémoire"},
    {"Memoire limitee", "ArrayList", "3× moins de RAM"},
};
\`\`\`

## Bonnes pratiques

1. **ArrayList par defaut** — dans le doute, utilisez ArrayList
2. **Capacite initiale pour ArrayList** — si la taille est connue
3. **Iterateur pour LinkedList** — ne jamais utiliser \`get(i)\` en boucle
4. **\`ArrayDeque\` > \`LinkedList\`** pour les piles/files (moins de mémoire, meilleure performance)
5. **Profiler si necessaire** — les benchmarks varient selon la JVM et le CPU
6. **Utiliser l'interface \`List\`** dans les signatures — changez d'implementation sans casser le code

## Pièges courants

1. **\`get(i)\` en boucle sur LinkedList** — performance O(n²) catastrophique
2. **Croire que LinkedList est "toujours meilleure" pour les insertions** — l'insertion au milieu necessite d'abord la recherche O(n)
3. **Ignorer la capacite initiale d'ArrayList** — resize multiples si taille inconnue
4. **Utiliser LinkedList comme Queue** — \`ArrayDeque\` est presque toujours plus performante
5. **\`subList()\` sur ArrayList** — retourne une vue, pas une copie

Source : [Oracle Java Documentation — List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)
`},
        {
          id: 'java-16',
          question: 'String vs StringBuilder vs StringBuffer',
          answer: "**`String`** est **immuable** : chaque modification crée un nouvel objet — les concaténations en boucle sont catastrophiques en performance. **`StringBuilder`** : mutable avec buffer dynamique, idéal pour construire des chaînes en *single-thread*. **`StringBuffer`** : identique mais synchronisé (*thread-safe*), rarement nécessaire.\n\nRègle : `String` pour les constantes, `StringBuilder` pour la construction dynamique.",
        
          deepDive: `# String, StringBuilder et StringBuffer en Java

## Qu'est-ce que c'est ?

Les trois classes permettent de manipuler des chaines de caractères, mais avec des comportements différents :

- **\`String\`** : **immuable** — chaque modification cree un nouvel objet
- **\`StringBuilder\`** : **mutable**, non synchronise — rapide, usage general
- **\`StringBuffer\`** : **mutable**, synchronise — thread-safe, mais plus lent

## String — immuable

En Java, les \`String\` sont immuables : une fois creee, leur valeur ne peut pas changer. Toute operation de concaténation cree un nouvel objet.

\`\`\`java
// Qu'est-ce que "immuable" signifie ?
String s = "Hello";
s = s + " World";  // Ne modifie PAS "Hello", cree un nouveau String "Hello World"
// L'ancien "Hello" est eligible pour le GC

// Pourquoi String est immuable ?
// 1. Securite : les mots de passe, URLs, Class names ne peuvent pas être modifies
// 2. Cache : le String pool permet de partager les chaines
// 3. Thread-safety : pas de race condition
// 4. Hashcode : peut être calcule une fois et mis en cache (HashMap key)
\`\`\`

\`\`\`java
// Le String Pool
String a = "hello";
String b = "hello";
String c = new String("hello");

System.out.println(a == b);      // true (meme reference dans le pool)
System.out.println(a == c);      // false (new = nouvel objet)

// Toujours utiliser equals() pour comparer le contenu !
System.out.println(a.equals(c));  // true
\`\`\`

### Le cout cache de la concaténation

\`\`\`java
// CE QU'ON ECRIT :
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "item" + i;
}

// CE QUE LE COMPILATEUR GENERE (approximatif) :
String result = "";
for (int i = 0; i < 1000; i++) {
    StringBuilder tmp = new StringBuilder(result);
    tmp.append("item");
    tmp.append(i);
    result = tmp.toString();  // Nouveau String a chaque iteration !
}
// → 1000 objets StringBuilder + 1000 objets String = 2000 objets temporaires !
// → Complexite O(n²)
\`\`\`

## StringBuilder — la solution mutable

\`StringBuilder\` maintient un buffer interne redimensionnable. Les operations d'\`append\` modifient le buffer sans creer d'objets intermediaires.

\`\`\`java
// BON USAGE :
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("item");
    sb.append(i);
}
String result = sb.toString();  // Un seul objet String final
// → 1 seul objet StringBuilder + 1 String = 2 objets !
// → Complexite O(n)
\`\`\`

\`\`\`java
// Methodes principales
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");           // "Hello World"
sb.insert(5, ",");             // "Hello, World"
sb.replace(6, 11, "Java");     // "Hello, Java"
sb.delete(5, 6);               // "Hello Java"
sb.reverse();                  // "avaJ olleH"

sb.length();                   // 10 (nombre de caractères)
sb.capacity();                 // capacite du buffer interne (≥ length)
sb.setLength(5);               // Tronque a 5 caractères
sb.charAt(0);                  // 'a' (après reverse: 'a' est à l'index 0)
\`\`\`

## StringBuffer — thread-safe

\`StringBuffer\` à la meme API que \`StringBuilder\` mais avec des méthodes \`synchronized\`. Utilisez-le uniquement en contexte multi-thread.

\`\`\`java
// StringBuffer est identique mais synchronise
StringBuffer sbf = new StringBuffer();
sbf.append("Hello");  // Methode synchronized

// En pratique, le multi-thread sur un buffer est RARE.
// StringBuilder est presque toujours suffisant.
\`\`\`

\`\`\`java
// Test de performance
int iterations = 100_000;
long start, end;

// String (lent)
start = System.nanoTime();
String s = "";
for (int i = 0; i < iterations; i++) s += "x";
end = System.nanoTime();
System.out.println("String: " + (end - start) / 1_000_000 + " ms");
// Resultat : ~5000 ms

// StringBuilder (rapide)
start = System.nanoTime();
StringBuilder sb = new StringBuilder();
for (int i = 0; i < iterations; i++) sb.append("x");
end = System.nanoTime();
System.out.println("StringBuilder: " + (end - start) / 1_000_000 + " ms");
// Resultat : ~5 ms (1000× plus rapide !)

// StringBuffer (legerement moins rapide)
start = System.nanoTime();
StringBuffer sbf = new StringBuffer();
for (int i = 0; i < iterations; i++) sbf.append("x");
end = System.nanoTime();
System.out.println("StringBuffer: " + (end - start) / 1_000_000 + " ms");
// Resultat : ~8 ms
\`\`\`

## Tableau comparatif

| Caracteristique | String | StringBuilder | StringBuffer |
|----------------|--------|---------------|--------------|
| Mutable | Non | Oui | Oui |
| Thread-safe | Oui (immuable) | Non | Oui (synchronized) |
| Performance | Lente (copies) | Rapide | Moyenne |
| Poolable | Oui (String pool) | Non | Non |
| Usage principal | Donnees statiques | Construction dynamique | Multi-thread (rare) |
| Introduit | Java 1.0 | Java 5 | Java 1.0 |

\`\`\`java
// Resume : quand utiliser quoi ?
String name = "Alice";                  // String : constante
String message = "Hello, " + name;      // String : petite concaténation unique
StringBuilder sb = new StringBuilder(); // StringBuilder : boucle/construction complexe
sb.append("...");                       // (le compilateur utilise déjà StringBuilder
sb.append("...");                       //  pour les concaténations simples)
String result = sb.toString();
\`\`\`

## Bonnes pratiques

1. **Utiliser \`StringBuilder\` pour les boucles** — toute concaténation repetitive
2. **Utiliser \`String\` pour les constantes** — literal pool, immutable
3. **Utiliser \`StringBuffer\` uniquement en multi-thread** — très rare
4. **Specifier la capacite initiale** si la taille approximative est connue : \`new StringBuilder(1000)\`
5. **\`String.join()\` pour les listes** — \`String.join(", ", list)\` est plus lisible que la boucle
6. **\`String.format()\` pour le formatage** — plus propre que les concatenations multiples
7. **Ne pas optimiser prematurement** — pour 2-3 concatenations, \`+\` suffit

## Pièges courants

1. **Concaténation en boucle** — cree des milliers d'objets intermediaires
2. **\`toString()\` dans une boucle avec StringBuilder** — annule l'avantage du buffer
3. **StringBuffer inutile** — la synchronisation à un cout, utilisez StringBuilder
4. **Capacite par defaut (16)** — trop petite pour des constructions longues
5. **Confondre \`length()\` et \`capacity()\`** — \`length()\` = contenu, \`capacity()\` = buffer interne

Source : [Oracle Java Documentation — Strings](https://docs.oracle.com/javase/tutorial/java/data/strings.html)
`},
        {
          id: 'java-17',
          question: 'HashMap : fonctionnement interne',
          answer: "Structure **tableau de buckets** (taille par défaut 16). La clé est hashée via `hashCode()`, puis l'index du bucket est déterminé par `hash % capacity`. En cas de **collision** (même index), les entrées sont chaînées : liste chaînée ou **arbre rouge-noir** (depuis Java 8, si >8 éléments dans un bucket).\n\n**Rehashing** : quand le *load factor* (0.75 par défaut) est dépassé, le tableau double de taille et toutes les entrées sont redistribuées. __Bonnes pratiques : initialiser avec la capacité attendue, utiliser des clés immuables et de bons `hashCode()`/`equals()`.__",
          code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("clé", 42);\n// hashCode("clé") → hash → index du bucket\n// Si collision → liste chaînée ou arbre',
          language: 'java',
        
          deepDive: `# HashMap : fonctionnement interne en Java

## Qu'est-ce que c'est ?

\`HashMap\` est la structure de donnees la plus utilisee en Java. Elle stocke des paires **cle-valeur** et offre des operations **O(1)** en moyenne. Comprendre son fonctionnement interne est essentiel pour l'utiliser correctement.

## Structure interne

\`\`\`
Tableau de buckets (tête de chaine ou racine d'arbre)
+------+
|  [0] | ---> null
+------+
|  [1] | ---> Node(k1,v1) -> Node(k2,v2) -> Node(k3,v3)  (liste chainee)
+------+
|  [2] | ---> TreeNode(k4,v4) <-> TreeNode(k5,v5)         (arbre rouge-noir)
+------+
|  [3] | ---> null
+------+
|  [4] | ---> Node(k6,v6)
+------+
|  ... |
+------+
| [15] | ---> null
+------+
\`\`\`

\`\`\`java
// Structure interne simplifiee
public class HashMap<K, V> {
    // Le tableau principal (Node<K,V>[]), taille initiale 16
    Node<K,V>[] table;

    // Un nœud dans une bucket (liste chainee)
    static class Node<K,V> {
        final int hash;        // Hash calcule de la cle (stocke pour optimisation)
        final K key;           // La cle (immuable de preference)
        V value;               // La valeur
        Node<K,V> next;        // Nœud suivant (liste chainee)
    }

    // Un nœud dans un arbre rouge-noir (quand > 8 collisions)
    static final class TreeNode<K,V> {
        TreeNode<K,V> parent;
        TreeNode<K,V> left;
        TreeNode<K,V> right;
        TreeNode<K,V> prev;
        boolean red;
    }
}
\`\`\`

## Comment fonctionne put() ?

\`\`\`java
public V put(K key, V value) {
    // 1. Calcul du hash
    int hashCode = key.hashCode();              // Methode native de l'objet
    int hash = hashCode ^ (hashCode >>> 16);    // Diffusion : melange bits hauts et bas

    // 2. Index dans le tableau
    int index = (table.length - 1) & hash;      // Equivalent a hash % table.length

    // 3. Insertion
    Node<K,V> existing = table[index];
    if (existing == null) {
        table[index] = new Node<>(hash, key, value, null);  // Bucket vide → nouveau nœud
        return null;
    }

    // 4. Collision : parcourir la chaine
    for (Node<K,V> e = existing; e != null; e = e.next) {
        if (e.hash == hash && Objects.equals(e.key, key)) {
            V oldValue = e.value;
            e.value = value;  // Meme cle → remplacer la valeur
            return oldValue;
        }
    }
    // Nouvelle cle dans ce bucket → ajouter en tête
    table[index] = new Node<>(hash, key, value, existing);
    return null;
}
\`\`\`

## Gestion des collisions

\`\`\`java
// Avant Java 8 : liste chainee uniquement
// Apres Java 8 : liste chainee → arbre rouge-noir si threshold depasse

// Seuils :
// TREEIFY_THRESHOLD = 8  → liste → arbre
// UNTREEIFY_THRESHOLD = 6 → arbre → liste
// MIN_TREEIFY_CAPACITY = 64 → arbre seulement si table.length >= 64

// Pourquoi ?
// Avec un bon hashCode, les collisions sont rares.
// Mais avec un hashCode mal implemente (toujours le meme), une bucket peut
// contenir des milliers d'elements. Sans arbre, get() serait O(n).
\`\`\`

\`\`\`java
// Illustration de la degradation
public class BadHash {
    private final int id;

    public BadHash(int id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        return 42;  // TOUJOURS le meme hash !
        // Tous les objets vont dans le meme bucket
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof BadHash other)) return false;
        return this.id == other.id;
    }

    // Avec 10 000 objets : get() est O(n) = 10 000 operations
    // Avec un bon hashCode : get() est O(1) = ~1 operation
}
\`\`\`

## Load factor et rehashing

\`\`\`java
HashMap<String, String> map = new HashMap<>(16, 0.75f);
// Capacite initiale : 16
// Load factor : 0.75
// Seuil de rehashing : 16 * 0.75 = 12 elements

// Quand on ajoute le 13e element :
// 1. Nouveau tableau de 32 elements (double)
// 2. Pour chaque entree existante : recalcul de l'index (hash & (newCap - 1))
// 3. Re-insertion dans le nouveau tableau

// Le rehashing est O(n) — couteux mais rare
// En moyenne : O(1) amorti
\`\`\`

\`\`\`java
// Impact du load factor
String[][] loadFactorComparison = {
    {"Load Factor", "Avantage", "Inconvenient", "Usage"},
    {"0.5", "Tres peu de collisions", "Beaucoup de mémoire", "Tres peu d'elements"},
    {"0.75", "Bon equilibre", "Default", "Usage general (DEFAUT)"},
    {"1.0", "Economie mémoire", "Beaucoup de collisions", "Memoire limitee"},
    {"1.5", "Tres economique", "Tres lent (O(n))", "Jamais recommande"},
};
\`\`\`

## HashMap avec Java 8+ : ameliorations

\`\`\`java
// 1. Arbres rouge-noir pour les collisions excessives
// get() degrade O(log n) au lieu de O(n) pour les mauvais hashCodes

// 2. Gestion des nulls
map.put(null, "valeur");  // null key stockee dans bucket index 0
map.put("cle", null);     // null value autorisee

// 3. Nouvelles méthodes
map.getOrDefault("key", "default");
map.putIfAbsent("key", "value");
map.computeIfAbsent("key", k -> expensiveComputation());
map.computeIfPresent("key", (k, v) -> v.toUpperCase());
map.merge("key", 1, Integer::sum);  // Incrementation thread-safe (relative)
\`\`\`

## Bonnes pratiques

1. **Cle immuable** — si la cle change son hashCode après insertion, la lookup echoue
2. **Capacite initiale adequate** — \`new HashMap<>(taille * 2)\` évite les rehashing
3. **\`hashCode()\` et \`equals()\` coherents** — si \`a.equals(b)\` alors \`a.hashCode() == b.hashCode()\`
4. **Load factor 0.75 par defaut** — bon equilibre entre temps et mémoire
5. **Utiliser \`EnumMap\` pour les cles enum** — plus performant (tableau indexe par ordinal)
6. **\`ConcurrentHashMap\` en multi-thread** — jamais \`HashMap\` partage
7. **Initialiser avec la capacite** — \`new HashMap<>(expectedSize / 0.75f + 1)\` évite le rehashing

## Pièges courants

1. **Cle mutable** — si la reference change, la cle est perdue dans la map
2. **Mauvais hashCode()** — tous les objets dans le meme bucket = performance O(n)
3. **ConcurrentModificationException** — modification pendant l'iteration
4. **HashMap non ordonnee** — ne pas compter sur l'ordre des elements
5. **\`hashCode()\` qui retourne une constante** — degradation immediate en liste chainee

Source : [Oracle Java Documentation — HashMap](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)
`},
        {
          id: 'java-18',
          question: 'ConcurrentHashMap',
          answer: "Version **thread-safe** de `HashMap` sans verrouiller toute la structure. Divise la table en **segments** (Java 7) ou utilise des verrous au niveau des buckets individuels (Java 8+) : lectures sans verrou, écritures avec verrou fin.\n\nOpérations atomiques : `putIfAbsent()`, `computeIfAbsent()`, `merge()`. Performances bien supérieures à `Hashtable` ou `Collections.synchronizedMap()` en concurrence.\n\n__Choix par défaut pour les maps partagées entre threads.__",
          code: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.putIfAbsent("clé", 42);\nmap.computeIfAbsent("compteur", k -> 0);',
          language: 'java',
        
          deepDive: `# ConcurrentHashMap en Java

## Qu'est-ce que c'est ?

\`ConcurrentHashMap\` est l'implementation thread-safe de \`Map\` conçue pour les environnements multi-thread. Contrairement a \`Hashtable\` et \`Collections.synchronizedMap()\` qui verrouillent toute la structure, \`ConcurrentHashMap\` utilise un **verrouillage fin** (fine-grained locking) pour maximiser le parallelisme.

## Evolution de l'implementation

\`\`\`java
// Java 5-6 : Segmented Lock
// La table est divisee en 16 segments, chaque segment a son propre verrou
// → 16 threads peuvent écrire en parallele (segments différents)
// → Les lectures sont non-verrouillees

// Java 7 : Meme approche, ameliorations mineures

// Java 8+ : Nouvelle implementation
// Plus de segments ! Utilisation de CAS (Compare-And-Swap) + synchronisation
// uniquement sur les buckets en collision
// → Lectures quasi toujours non-verrouillees
// → Ecritures avec verrouillage par bucket individuel
// → Arbres rouge-noir pour les collisions (comme HashMap)
\`\`\`

\`\`\`java
// Architecture ConcurrentHashMap Java 8+
// +------+------+------+------+------+
// | [0]  | [1]  | [2]  | [3]  | [4]  |
// +------+------+------+------+------+
//    |      |      |      |      |
//   null   Node   null   Node   TreeNode
//          lock         lock
// Les lectures (get) ne verrouillent JAMAIS le bucket.
// Les écritures (put) verrouillent UNIQUEMENT le bucket concerne.
\`\`\`

## Comparaison des stratégies de synchronisation

\`\`\`java
// MAUVAISE APPROCHE : Hashtable
Hashtable<String, Integer> hashtable = new Hashtable<>();
// Toutes les operations sont synchronized → un seul thread à la fois
// get() bloque les autrès get() → inutile !

// APPROCHE MOYENNE : synchronizedMap
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());
// Meme comportement que Hashtable (verrou global)
// + permet de choisir l'implementation interne

// BONNE APPROCHE : ConcurrentHashMap
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
// Lectures sans verrou, écritures avec verrou par bucket
// get() n'est JAMAIS bloque par un autre get()
// put() bloque seulement les put() sur le meme bucket
\`\`\`

## Operations atomiques

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Les operations composees atomiques — la vraie puissance
map.putIfAbsent("counter", 0);     // Ajoute seulement si absent
map.computeIfAbsent("key", k -> {  // Calcul atomique si absent
    return fetchFromDatabase(k);    // Execute au maximum une fois
});
map.computeIfPresent("key", (k, v) -> v + 1);  // Modifie si present
map.merge("counter", 1, Integer::sum);          // Fusion atomique

// Comparaison avec l'approche non-atomique (hasard de concurrence)
// NON ATOMIQUE (problematique en multi-thread) :
if (!map.containsKey("counter")) {
    map.put("counter", 0);  // Race condition ! Un autre thread a pu mettre entre les deux
}

// ATOMIQUE (avec ConcurrentHashMap) :
map.putIfAbsent("counter", 0);  // Garanti atomique
\`\`\`

## Incrementation thread-safe

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// ATOMIQUE (correct)
map.merge("views", 1, Integer::sum);

// NON ATOMIQUE (incorrect — perte de mises à jour)
Integer old = map.get("views");
map.put("views", old + 1);  // Race condition !

// Avec AtomicInteger (alternative)
ConcurrentHashMap<String, AtomicInteger> atomicMap = new ConcurrentHashMap<>();
atomicMap.computeIfAbsent("views", k -> new AtomicInteger()).incrementAndGet();
\`\`\`

## Iteration concurrente

\`\`\`java
// ConcurrentHashMap supporte l'iteration concurrente sans ConcurrentModificationException
ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
map.put("a", "1");
map.put("b", "2");

// Thread 1 : itere
for (String key : map.keySet()) {
    System.out.println(key);
}

// Thread 2 : modifie
map.put("c", "3");
map.remove("a");

// PAS DE ConcurrentModificationException !
// L'iteration peut ne pas voir les modifications recentes (weakly consistent)
\`\`\`

\`\`\`java
// Nouveaux iterateurs (Java 8+)
map.forEach(1, (k, v) -> System.out.println(k + "=" + v));
// Le parallelisme level (1) indique le nombre de threads pour l'operation

map.forEachKey(1, System.out::println);
map.forEachValue(1, System.out::println);

// Recherche
String found = map.search(1, (k, v) -> v.equals("target") ? k : null);
// Retourne dès que le resultat est trouve (short-circuit)

// Reduction
long count = map.reduceValues(1, v -> v.length(), Integer::sum, 0);
\`\`\`

## Statistiques en temps reel

\`\`\`java
ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();

// Taille — approximative et efficace
int size = map.size();          // Retourne int
long count = map.mappingCount(); // Retourne long (recommande)

// Ces valeurs sont des estimations car la map peut être modifiee
// pendant le calcul. C'est un compromis performance vs exactitude.
\`\`\`

\`\`\`java
// Tableau comparatif
String[][] comparison = {
    {"Caracteristique", "HashMap", "Hashtable", "synchronizedMap", "ConcurrentHashMap"},
    {"Thread-safe", "Non", "Oui", "Oui", "Oui"},
    {"Verrouillage", "Aucun", "Global", "Global", "Par bucket"},
    {"Lecture conc.", "N/A", "Bloquee", "Bloquee", "Non-bloquee"},
    {"Ecriture conc.", "N/A", "Seriee", "Seriee", "Parallele par bucket"},
    {"null key/value", "Oui", "Non", "Oui (selon map)", "Non"},
    {"Performance", "+++", "+", "+", "++"},
    {"Iteration", "Fail-fast", "Fail-fast", "Fail-fast", "Weakly consistent"},
};
\`\`\`

## Bonnes pratiques

1. **Choix par defaut en multi-thread** — remplace Hashtable et synchronizedMap
2. **Utiliser les méthodes atomiques** — \`computeIfAbsent\`, \`merge\`, \`putIfAbsent\`
3. **Eviter les operations composees manuelles** — \`get()\` puis \`put()\` n'est pas atomique
4. **Preférer \`mappingCount()\` a \`size()\`** — plus precis pour les grandes maps
5. **Attention aux traitements couteux dans \`computeIfAbsent\`** — le verrou est maintenu
6. **\`forEach()\` avec parallelisme** — les lambdas doivent être sans état et thread-safe

## Pièges courants

1. **\`null\` interdit** — ConcurrentHashMap ne supporte ni cle ni valeur null
2. **Fausse atomique** — \`get()\` + \`put()\` sans méthode atomique = race condition
3. **Traitement long dans \`computeIfAbsent\`** — bloque les autrès operations sur ce bucket
4. **\`size()\` exact** — n'est pas garanti être exact en concurrence
5. **Overhead mémoire** — plus important que HashMap (structures de synchronisation)

Source : [Oracle Java Documentation — ConcurrentHashMap](https://docs.oracle.com/javase/tutorial/collections/implementations/concurrent.html)
`},
        {
          id: 'java-19',
          question: 'Comparable vs Comparator',
          answer: "**`Comparable`** : définit l'ordre **naturel** d'une classe via `compareTo()` dans la classe elle-même. Un seul ordre possible.\n\n**`Comparator`** : définit un ordre **externe** via `compare()`, séparé de la classe. Plusieurs comparateurs possibles pour différents critères.\n\nUtilisez `Comparable` si l'ordre est évident et unique (`String` par ordre alphabétique). Utilisez `Comparator` pour des tris variés ou quand vous ne pouvez pas modifier la classe.",
          code: '// Comparable (ordre naturel)\nclass Person implements Comparable<Person> {\n    public int compareTo(Person p) { return name.compareTo(p.name); }\n}\n\n// Comparator (ordre externe)\nComparator<Person> parAge = Comparator.comparingInt(p -> p.age);',
          language: 'java',
        
          deepDive: `# Comparable vs Comparator en Java

## Qu'est-ce que c'est ?

\`Comparable\` et \`Comparator\` sont deux interfaces qui permettent de definir l'ordre de tri des objets. Le choix entre les deux depend de qui definit l'ordre et combien d'ordres sont necessaires.

- **\`Comparable\`** : ordre **naturel** defini DANS la classe (une seule implementation)
- **\`Comparator\`** : ordre **externe** defini HORS de la classe (plusieurs implementations possibles)

## Comparable — l'ordre naturel

\`\`\`java
// Interface fonctionnelle
public interface Comparable<T> {
    int compareTo(T o);
    // Retourne :
    //   negatif  si this < o
    //   0        si this == o
    //   positif  si this > o
}
\`\`\`

\`\`\`java
// Exemple : classe avec ordre naturel
public class Student implements Comparable<Student> {
    private final String name;
    private final double grade;

    public Student(String name, double grade) {
        this.name = name;
        this.grade = grade;
    }

    @Override
    public int compareTo(Student other) {
        // Ordre naturel : par note decroissante, puis nom alphabetique
        int gradeCmp = Double.compare(other.grade, this.grade);
        if (gradeCmp != 0) return gradeCmp;
        return this.name.compareTo(other.name);
    }
}

// Utilisation
List<Student> students = new ArrayList<>();
students.add(new Student("Alice", 85));
students.add(new Student("Bob", 92));
students.add(new Student("Charlie", 85));

Collections.sort(students);  // Trie par Student.compareTo()
// Bob (92), Alice (85), Charlie (85)
\`\`\`

\`\`\`java
// Regles de contrat pour compareTo (identiques a equals pour la coherence)
// 1. Reflexif : x.compareTo(x) == 0
// 2. Antisymetrique : x.compareTo(y) == -y.compareTo(x)
// 3. Transitif : si x.compareTo(y) < 0 et y.compareTo(z) < 0 alors x.compareTo(z) < 0
// 4. Recommande : x.compareTo(y) == 0 implique x.equals(y) (TreeSet, TreeMap l'exigent)
\`\`\`

## Comparator — ordres exterieurs

\`\`\`java
// Interface fonctionnelle
@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
    // Meme contrat que compareTo
}
\`\`\`

\`\`\`java
// Exemple : multiples comparateurs pour la meme classe
public class Employee {
    private String name;
    private double salary;
    private LocalDate hireDate;
    // getters...
}

// Plusieurs stratégies de tri
Comparator<Employee> BY_SALARY = (e1, e2) -> Double.compare(e2.getSalary(), e1.getSalary());
Comparator<Employee> BY_NAME = (e1, e2) -> e1.getName().compareTo(e2.getName());
Comparator<Employee> BY_HIRE_DATE = (e1, e2) -> e1.getHireDate().compareTo(e2.getHireDate());

// Utilisation
List<Employee> employees = getEmployees();
employees.sort(BY_SALARY);                         // Tri par salaire descendant
employees.sort(BY_NAME);                           // Tri par nom
employees.sort(BY_HIRE_DATE.reversed());            // Tri par date d'embauche ascendant
\`\`\`

\`\`\`java
// Comparator.comparing — fabriques statiques (Java 8+)
// Version cle plus lisible
List<Employee> employees = getEmployees();

employees.sort(Comparator.comparingDouble(Employee::getSalary).reversed());
employees.sort(Comparator.comparing(Employee::getName));
employees.sort(Comparator.comparing(Employee::getHireDate));

// Tri multi-criteres
employees.sort(Comparator
    .comparingDouble(Employee::getSalary).reversed()
    .thenComparing(Employee::getName)
    .thenComparing(Employee::getHireDate));

// Gestion des nulls
employees.sort(Comparator.nullsFirst(Comparator.comparing(Employee::getName)));
employees.sort(Comparator.nullsLast(Comparator.naturalOrder()));
\`\`\`

## Tableau comparatif

| Aspect | Comparable | Comparator |
|--------|------------|------------|
| Package | \`java.lang\` | \`java.util\` |
| Methode | \`compareTo(T o)\` | \`compare(T o1, T o2)\` |
| Qui definit l'ordre | La classe elle-meme | Une classe externe |
| Nombre d'ordres | Un seul (naturel) | Plusieurs |
| Modification de la classe | Oui (implemente l'interface) | Non |
| Utilisation | \`Collections.sort(list)\` | \`Collections.sort(list, comparator)\` |
| Streams | \`sorted()\` | \`sorted(comparator)\` |
| Ordre par defaut | Naturel | Personnalise |
| Java 8+ fabriques | N/A | \`Comparator.comparing()\`, \`thenComparing()\` |

\`\`\`java
// Utilisation avec les Streams
List<Employee> sorted = employees.stream()
    .sorted(Comparator
        .comparing(Employee::getSalary, Comparator.reverseOrder())
        .thenComparing(Employee::getName))
    .collect(Collectors.toList());

// Minimum et maximum
Employee richest = employees.stream()
    .max(Comparator.comparingDouble(Employee::getSalary))
    .orElseThrow();
\`\`\`

\`\`\`java
// Comparator personnalise complexe
Comparator<Person> complex = (p1, p2) -> {
    // 1. Par age
    int ageCmp = Integer.compare(p1.getAge(), p2.getAge());
    if (ageCmp != 0) return ageCmp;

    // 2. Puis par nom
    int nameCmp = p1.getLastName().compareTo(p2.getLastName());
    if (nameCmp != 0) return nameCmp;

    // 3. Puis par prenom
    return p1.getFirstName().compareTo(p2.getFirstName());
};
\`\`\`

## Bonnes pratiques

1. **Implementer \`Comparable\`** seulement si l'ordre naturel est evident et unique
2. **Utiliser \`Comparator\`** pour des tris specifiques ou multiples
3. **Utiliser les fabriques statiques** \`Comparator.comparing()\` pour la lisibilite
4. **Etre coherent avec \`equals()\`** — sinon TreeSet/TreeMap auront un comportement inattendu
5. **Ne pas utiliser la soustraction** pour comparer des entiers (risque de debordement)
6. **\`Comparator.nullsFirst()\` et \`nullsLast()\`** pour gerer proprement les valeurs nulles
7. **\`Comparator.reverseOrder()\`** pour inverser l'ordre naturel

## Pièges courants

1. **\`return this.prix - p.prix\`** — peut deborder ! Utilisez \`Double.compare()\` ou \`Integer.compare()\`
2. **Violation de la transitivite** — un Comparator qui n'est pas transitif plante le tri
3. **NullPointerException** — si la liste contient des valeurs nulles sans \`nullsFirst()\`/\`nullsLast()\`
4. **\`compareTo()\` non coherent avec \`equals()\`** — TreeMap peut "perdre" des entrees
5. **Comparator qui modifie l'état** — le comparateur doit être sans effet de bord

Source : [Oracle Java Documentation — Object Ordering](https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html)
`},
        {
          id: 'java-20',
          question: 'Record (Java 14+)',
          answer: "**`record`** = classe immuable générant automatiquement constructeur, `getters`, `equals()`, `hashCode()` et `toString()`. Idéal pour les **DTOs** et objets de valeur.\n\nPlus concis qu'une classe classique : `public record Person(String nom, int age) {}` remplace des dizaines de lignes de boilerplate.\n\nLes champs sont **finaux** par définition. On peut ajouter des méthodes et valider dans le constructeur compact. __Le remplaçant moderne des DTOs écrits à la main.__",
          code: 'public record Person(String nom, int age) {\n    // Constructeur compact avec validation\n    public Person {\n        if (age < 0) throw new IllegalArgumentException();\n    }\n}',
          language: 'java',
        
          deepDive: `# Les Records en Java (Java 14+, final en Java 16)

## Qu'est-ce qu'un Record ?

Un \`record\` est un type de classe concu pour être un **porteur de donnees immuable** (value object). Le compilateur genere automatiquement tout le boilerplate : constructeur paramêtre, getters, \`equals()\`, \`hashCode()\`, \`toString()\`.

\`\`\`java
// CLASSE TRADITIONNELLE — des dizaines de lignes de boilerplate
public final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }

    @Override
    public int hashCode() {
        return 31 * x + y;
    }

    @Override
    public String toString() {
        return "Point[x=" + x + ", y=" + y + "]";
    }
}

// RECORD — une seule ligne
public record Point(int x, int y) {}
// Meme comportement : immutable, equals, hashCode, toString generes
\`\`\`

## Syntaxe et fonctionnalites

\`\`\`java
// Declaration basique
public record User(Long id, String name, String email) {}

// Utilisation
User user = new User(1L, "Alice", "alice@example.com");
user.id();         // 1L — getter (sans prefixe "get")
user.name();       // "Alice"
user.email();      // "alice@example.com"
user.toString();   // "User[id=1, name=Alice, email=alice@example.com]"
\`\`\`

### Constructeur compact — validation et normalisation

\`\`\`java
public record Product(String sku, String name, double price) {
    // Constructeur compact : pas de paramêtres, les champs sont implicitement assignes
    public Product {
        // Validation
        if (sku == null || sku.isBlank()) {
            throw new IllegalArgumentException("SKU cannot be blank");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }

        // Normalisation
        sku = sku.toUpperCase().trim();
        name = name.trim();
    }
}

// Le constructeur canonique (avec tous les paramêtres) est toujours genere
// Mais le constructeur compact s'execute AU DEBUT du constructeur canonique
\`\`\`

### Constructeurs supplementaires

\`\`\`java
public record Order(Long id, String customer, List<OrderLine> lines) {
    // Constructeur supplementaire (doit appeler this(...))
    public Order(String customer) {
        this(null, customer, new ArrayList<>());
    }

    // Constructeur supplementaire avec defauts
    public Order(Long id, String customer) {
        this(id, customer, new ArrayList<>());
    }

    // Methode d'instance — comportement ajoute
    public double total() {
        return lines.stream()
            .mapToDouble(OrderLine::subtotal)
            .sum();
    }
}
\`\`\`

### Records generiques

\`\`\`java
public record Pair<A, B>(A first, B second) {}

// Utilisation
Pair<String, Integer> pair = new Pair<>("Alice", 30);
String name = pair.first();
Integer age = pair.second();
\`\`\`

### Records et annotations

\`\`\`java
import com.fasterxml.jackson.annotation.JsonProperty;

public record ApiResponse<T>(
    @JsonProperty("status_code") int statusCode,
    @JsonProperty("data") T data,
    @JsonProperty("message") String message
) {}

// Compatible Jackson, Gson, etc. (les getters sont nommes sans "get")
\`\`\`

### Pattern matching avec records (Java 16+)

\`\`\`java
// Avant Java 16
if (obj instanceof Point) {
    Point p = (Point) obj;
    System.out.println(p.x() + ", " + p.y());
}

// Avec pattern matching + record
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + ", " + y);  // Decomposition directe
}

// Switch pattern matching (Java 21+)
String area = switch (shape) {
    case Circle(var radius) -> Math.PI * radius * radius;
    case Rectangle(var w, var h) -> w * h;
};
\`\`\`

## Limitations

\`\`\`java
// 1. Pas d'heritage : un record ne peut PAS etendre une classe
// public record MyRecord() extends ParentClass {}  // Erreur

// 2. Pas de setters : les champs sont implicitement finals
// user.setName("Bob");  // Erreur

// 3. Pas de champs d'instance supplementaires
public record Foo(int x) {
    // private int y;  // Erreur : champs d'instance interdits !
    private static final int CONSTANT = 42;  // OK : champ statique autorise
}

// 4. Pas de champs non-finaux
// Un record ne peut pas être etendu (implicitement final)
\`\`\`

## Records vs classes traditionnelles

\`\`\`java
// Record : pour les value objects
public record Address(String street, String city, String zipCode) {}

// Classe traditionnelle : quand vous avez besoin de comportement complexe
public class MutableCounter {
    private int count = 0;

    public void increment() { count++; }  // Effet de bord
    public int getCount() { return count; }
}

// Record : DTO
public record UserDTO(Long id, String name, String email) {}

// Record : pour les resultats de méthodes
public record SearchResult<T>(List<T> results, int totalCount, int page) {}
\`\`\`

\`\`\`java
// Record avec validation et méthodes — le meilleur des deux mondes
public record Temperature(double celsius) {
    private static final double ABSOLUTE_ZERO = -273.15;

    // Constructeur compact
    public Temperature {
        if (celsius < ABSOLUTE_ZERO) {
            throw new IllegalArgumentException("Below absolute zero");
        }
    }

    // Methodes derivees
    public double fahrenheit() {
        return celsius * 9.0 / 5.0 + 32.0;
    }

    public double kelvin() {
        return celsius - ABSOLUTE_ZERO;
    }

    // Methode statique
    public static Temperature fromFahrenheit(double f) {
        return new Temperature((f - 32) * 5.0 / 9.0);
    }
}
\`\`\`

## Bonnes pratiques

1. **Utiliser des records pour les DTOs** — propre, immutable, tout est genere
2. **Utiliser le constructeur compact pour la validation** — preserve les invariants
3. **Records et JPA** — attention, les entites JPA necessitent un constructeur sans argument et des setters
4. **Records et Jackson** — fonctionnent parfaitement (getters automatiques)
5. **Petits records** — un record ne devrait pas avoir trop de champs (idealement < 7)
6. **Records comme cles de Map** — equals/hashCode generes, parfait pour HashMap
7. **Records locaux** — declares dans une méthode pour des resultats intermediaires

## Pièges courants

1. **Pas d'heritage** — ne convient pas pour des hierarchies de classes
2. **Serialization** — le mecanisme par defaut peut être différent des classes classiques
3. **JPA/Hibernate** — incompatible avec les proxies et la lazy loading
4. **Trop de champs** — rend le code illisible (envisagez un Builder)
5. **Reference circulaire dans toString()** — possible si deux records se referencent mutuellement

Source : [Oracle Java Documentation — Records](https://docs.oracle.com/en/java/javase/21/language/records.html)
`},
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
        
          deepDive: `# Les expressions Lambda en Java (Java 8+)

## Qu'est-ce qu'une lambda ?

Une expression lambda est une **fonction anonyme** que l'on peut passer comme argument, stocker dans une variable ou retourner d'une méthode. Elle est au coeur de la programmation fonctionnelle en Java.

\`\`\`java
// Syntaxe generale
(parameters) -> expression
(parameters) -> { statements; }
\`\`\`

## Evolution : de la classe anonyme à la lambda

\`\`\`java
// AVANT Java 8 — classe anonyme (verbeux)
Button button = new Button();
button.setOnAction(new EventHandler<ActionEvent>() {
    @Override
    public void handle(ActionEvent event) {
        System.out.println("Button clicked");
    }
});

// AVEC Java 8 — lambda
button.setOnAction(event -> System.out.println("Button clicked"));

// AVEC method reference (encore plus concis)
button.setOnAction(System.out::println);
\`\`\`

\`\`\`java
// Toutes les formes de lambda
Runnable r1 = () -> System.out.println("No params");           // Zero paramêtre
Consumer<String> c1 = s -> System.out.println(s);              // Un paramêtre (parenth. opt.)
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;   // Deux paramêtres
Comparator<String> comp = (a, b) -> {                           // Bloc avec return
    int cmp = a.length() - b.length();
    return cmp != 0 ? cmp : a.compareTo(b);
};
\`\`\`

## Les interfaces fonctionnelles standard (java.util.function)

\`\`\`java
// Les 4 interfaces fonctionnelles de base

// 1. Function<T, R> — transforme T en R
Function<String, Integer> length = String::length;
Function<String, String> upper = String::toUpperCase;
Function<String, String> exclaim = s -> s + "!";

// Composition
Function<String, String> shout = upper.andThen(exclaim);
shout.apply("hello");  // "HELLO!"

// 2. Consumer<T> — accepte T, ne retourne rien
Consumer<String> printer = System.out::println;
Consumer<String> logger = s -> log.info("Value: {}", s);
printer.andThen(logger).accept("test");  // Affiche puis log

// 3. Supplier<T> — fournit T
Supplier<LocalDateTime> now = LocalDateTime::now;
Supplier<List<String>> listMaker = ArrayList::new;

// 4. Predicate<T> — teste T, retourne boolean
Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isLong = s -> s.length() > 10;
Predicate<String> isShortAndNotEmpty = isEmpty.negate().and(s -> s.length() < 5);
\`\`\`

\`\`\`java
// Autrès interfaces utiles
// BiFunction<T, U, R> — deux paramêtres
BiFunction<String, String, String> concat = (a, b) -> a + b;

// UnaryOperator<T> — Function<T, T>
UnaryOperator<String> identity = s -> s;

// BinaryOperator<T> — BiFunction<T, T, T>
BinaryOperator<Integer> max = Integer::max;

// BiConsumer<T, U> — Consumer a deux paramêtres
BiConsumer<String, Integer> printKV = (k, v) -> System.out.println(k + "=" + v);

// BiPredicate<T, U> — Predicate a deux paramêtres
BiPredicate<String, String> startsWith = String::startsWith;
\`\`\`

## Captures et closures

\`\`\`java
// Les lambdas peuvent capturer des variables de leur portee englobante (closure)
// Ces variables doivent être "effectively final" (non reassignees)

public class ClosureExample {
    public List<String> createPrefixAdder(String prefix) {
        // prefix est "effectively final" (non reassigne)
        return List.of("Alice", "Bob")
            .stream()
            .map(name -> prefix + " " + name)  // Capture 'prefix'
            .toList();
    }
}
\`\`\`

\`\`\`java
// Erreur classique : variable mutabile dans une lambda
int counter = 0;
List<String> names = List.of("Alice", "Bob");
names.forEach(name -> {
    // counter++;  // ERREUR : counter doit être effectively final
});

// Solution : utiliser un AtomicInteger ou un tableau
AtomicInteger counter = new AtomicInteger(0);
names.forEach(name -> counter.incrementAndGet());
\`\`\`

## Method references — shorthand pour les lambdas

\`\`\`java
// Quand la lambda appelle une méthode existante, utilisez ::

// 1. Methode statique
//   (args) -> ClassName.staticMethod(args)
//   ClassName::staticMethod
Function<String, Integer> parser = Integer::parseInt;  // Equivalent: s -> Integer.parseInt(s)

// 2. Methode d'instance d'un objet specifique
//   (args) -> obj.instanceMethod(args)
//   obj::instanceMethod
String prefix = "Mr.";
Function<String, String> greeter = prefix::concat;

// 3. Methode d'instance d'une classe (premier argument devient l'instance)
//   (obj, args) -> obj.instanceMethod(args)
//   ClassName::instanceMethod
BiPredicate<String, String> startsWith = String::startsWith;  // Equivalent: (s, p) -> s.startsWith(p)

// 4. Constructeur
//   (args) -> new ClassName(args)
//   ClassName::new
Supplier<List<String>> listMaker = ArrayList::new;
Function<String, File> fileMaker = File::new;
\`\`\`

\`\`\`java
// Usage des method references dans les Streams
List<String> names = List.of("Alice", "Bob", "Charlie");

// Lambda
names.stream().map(s -> s.toUpperCase()).forEach(s -> System.out.println(s));

// Method references (plus lisible)
names.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);
\`\`\`

## Bonnes pratiques

1. **Preferer les method references** quand une méthode existe déjà
2. **Garder les lambdas courtes** — si le corps depasse 3 lignes, extrayez dans une méthode
3. **Eviter les effets de bord** — une lambda ne devrait pas modifier l'état exterieur
4. **Utiliser les interfaces standard** — \`Function\`, \`Predicate\`, \`Consumer\` plutot que vos propres interfaces
5. **Ne pas capturer de variables mutables** — source de bugs en multi-thread
6. **Composer avec \`andThen()\` et \`compose()\`** — plutot que d'écrire des lambdas imbriquees

## Pièges courants

1. **Lambda et checked exceptions** — les interfaces fonctionnelles standard ne declarent pas de checked exceptions
2. **Capturer une variable qui change** — erreur de compilation (effectively final)
3. **\`this\` dans une lambda** — refere à la classe englobante, pas à l'interface fonctionnelle
4. **Lambdas trop longues** — difficiles a lire et a tester
5. **Effets de bord dans les lambdas** — comportement imprevisible en parallel stream

Source : [Oracle Java Documentation — Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)
`},
        {
          id: 'java-22',
          question: 'Streams',
          answer: "Abstraction fonctionnelle pour traiter les collections. **Opérations intermédiaires** (`filter`, `map`, `sorted`) : retournent un `Stream`, sont *lazy*. **Opérations terminales** (`collect`, `forEach`, `reduce`) : déclenchent le pipeline et produisent un résultat.\n\n`parallelStream()` permet la parallélisation. Idéal pour les transformations de données déclaratives ; pour les boucles simples avec effets de bord, `for` reste plus approprié.",
          code: 'names.stream()\n     .filter(n -> n.startsWith("A"))\n     .forEach(System.out::println);',
          language: 'java',
        
          deepDive: `# Les Streams en Java (Java 8+)

## Qu'est-ce qu'un Stream ?

Un \`Stream\` represente un **pipeline de traitement de donnees** qui permet de transformer, filtrer et agreger des collections de maniere **declarative** (ce que vous voulez, pas comment). Il ne stocke pas de donnees, il les transforme.

## Pipeline Stream

\`\`\`
+--------+     +----------+     +----------+     +----------+
| Source | --> | Intermed | --> | Intermed | --> | Terminal |
|        |     |   ops    |     |   ops    |     |   op     |
| List   |     | filter() |     | map()    |     | toList() |
+--------+     +----------+     +----------+     +----------+
                    |
              Lazy evaluation
              (rien ne s execute
               avant le terminal)
\`\`\`

\`\`\`java
// Anatomie d'un pipeline Stream
List<String> result = items.stream()       // 1. Source : obtention du Stream
    .filter(item -> item.startsWith("A")) // 2. Operation intermediaire (lazy)
    .map(String::toUpperCase)             // 3. Operation intermediaire (lazy)
    .sorted()                             // 4. Operation intermediaire (lazy)
    .toList();                            // 5. Operation terminale (eager — déclenche le traitement)
\`\`\`

## Sources de Stream

\`\`\`java
// Depuis une Collection
List<String> list = List.of("a", "b", "c");
Stream<String> stream = list.stream();

// Depuis un tableau
Stream<String> arrayStream = Arrays.stream(new String[]{"a", "b", "c"});

// Depuis des valeurs
Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5);

// Stream vide
Stream<String> empty = Stream.empty();

// Stream infini (limiter avec limit)
Stream<Integer> powersOfTwo = Stream.iterate(1, n -> n * 2).limit(10);
Stream<Double> random = Stream.generate(Math::random).limit(5);

// Stream sur primitives (évite l'autoboxing)
IntStream.range(0, 10);        // 0..9
IntStream.rangeClosed(1, 10);  // 1..10
LongStream.iterate(1L, n -> n + 1L).limit(100);
DoubleStream.of(1.0, 2.0, 3.0);
\`\`\`

## Operations intermediaires

\`\`\`java
// filter — garder les elements satisfaisant un predicat
List<Integer> even = numbers.stream()
    .filter(n -> n % 2 == 0)
    .toList();

// map — transformer chaque element
List<Integer> squares = numbers.stream()
    .map(n -> n * n)
    .toList();

// flatMap — aplanir les collections imbriquees
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4), List.of(5));
List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .toList();  // [1, 2, 3, 4, 5]

// flatMap avec Optional
List<String> names = List.of("Alice", "Bob", "");
List<Integer> lengths = names.stream()
    .flatMap(s -> s.isEmpty() ? Stream.empty() : Stream.of(s.length()))
    .toList();

// distinct / sorted / peek
List<Integer> unique = list.stream().distinct().toList();
List<String> sorted = list.stream().sorted().toList();
List<String> reversed = list.stream().sorted(Comparator.reverseOrder()).toList();

// limit / skip — pagination
List<Integer> page = list.stream().skip(20).limit(10).toList();

// takeWhile / dropWhile (Java 9+)
List<Integer> taken = list.stream()
    .takeWhile(n -> n < 5)  // Prend tant que condition vraie
    .toList();
List<Integer> dropped = list.stream()
    .dropWhile(n -> n < 5)  // Jette tant que condition vraie
    .toList();
\`\`\`

## Operations terminales

\`\`\`java
// toList / toSet / toMap (Java 16+ : toList() directement)
List<String> list = stream.collect(Collectors.toList());
Set<String> set = stream.collect(Collectors.toSet());
Map<Integer, String> map = stream.collect(
    Collectors.toMap(String::length, Function.identity(), (a, b) -> a));

// Collecteurs avances
Map<Integer, List<String>> grouped = stream.collect(Collectors.groupingBy(String::length));
Map<Boolean, List<String>> partitioned = stream.collect(Collectors.partitioningBy(s -> s.length() > 3));
String joined = stream.collect(Collectors.joining(", "));
IntSummaryStatistics stats = stream.collect(Collectors.summarizingInt(String::length));

// forEach — action pour chaque element
list.forEach(System.out::println);

// reduce — agregation en une valeur
int sum = IntStream.range(1, 11).reduce(0, Integer::sum);  // 55
OptionalInt product = IntStream.range(1, 6).reduce((a, b) -> a * b);  // 120

// min / max
Optional<String> longest = list.stream()
    .max(Comparator.comparingInt(String::length));

// anyMatch / allMatch / noneMatch — tests booleens
boolean hasAlice = list.stream().anyMatch("Alice"::equals);
boolean allLong = list.stream().allMatch(s -> s.length() > 2);

// findFirst / findAny
Optional<String> first = list.stream().findFirst();
Optional<String> any = list.parallelStream().findAny();  // Plus rapide en parallele
\`\`\`

## Streams paralleles

\`\`\`java
// ParallelStream utilise le ForkJoinPool commun
list.parallelStream()
    .filter(s -> heavyFilter(s))   // Execute en parallele
    .map(s -> heavyTransform(s))   // Execute en parallele
    .toList();

// Quand utiliser ?
// ✅ Grandes collections (> 10 000 elements)
// ✅ Operations CPU-bound independantes
// ❌ Petites collections (overhead du parallelisme > gain)
// ❌ Operations I/O-bound (bloquant, pool sature)
// ❌ Avec état partage (race conditions)

// Contrôler le pool (avance)
ForkJoinPool customPool = new ForkJoinPool(4);
try {
    customPool.submit(() ->
        list.parallelStream().forEach(process)
    ).get();
} finally {
    customPool.shutdown();
}
\`\`\`

## Map et operations avancees

\`\`\`java
// Map peut être source de Stream
Map<String, Integer> map = Map.of("Alice", 30, "Bob", 25);

// Parcours
map.forEach((k, v) -> System.out.println(k + "=" + v));

// Stream sur les entrees
map.entrySet().stream()
    .filter(e -> e.getValue() > 25)
    .map(Map.Entry::getKey)
    .toList();

// Nouveautes Map (Java 8+)
map.computeIfAbsent("Charlie", k -> computeAge(k));
map.merge("Alice", 1, Integer::sum);
\`\`\`

## Bonnes pratiques

1. **Filter avant map** — reduit le nombre d'elements a transformer
2. **Utiliser les primitives** (\`IntStream\`, \`LongStream\`) pour éviter l'autoboxing
3. **Ne pas reutiliser un Stream** — une fois consomme, il est ferme
4. **toList() (Java 16+) vs collect(Collectors.toList())** — le premier est plus court et cree une liste immuable
5. **Attention aux effets de bord** — dans forEach et peek, pas de mutation d'état externe
6. **Paralleliser avec parcimonie** — mesurez avant d'utiliser parallelStream()

## Pièges courants

1. **Stream consomme deux fois** — \`stream.has already been operated upon or closed\`
2. **Oublier l'operation terminale** — le pipeline ne s'execute jamais
3. **Modifier la source pendant l'iteration** — ConcurrentModificationException
4. **Parallel Stream sur des operations bloquantes** — sature le pool commun
5. **Etat partage dans les lambdas** — race conditions en parallel stream

Source : [Oracle Java Documentation — Streams](https://docs.oracle.com/javase/tutorial/collections/streams/)
`},
        {
          id: 'java-23',
          question: 'Optional',
          answer: "**`Optional`** : conteneur qui peut contenir ou non une valeur, introduit pour éviter les `NullPointerException`. Au lieu de `get()` risqué, on utilise `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n`Optional` rend explicite la possibilité d'absence de valeur. __Bonnes pratiques__ : utiliser uniquement comme type de retour, jamais comme champ ou paramètre, et __ne jamais retourner un `Optional` `null`__.",
          code: 'Optional<String> name = Optional.ofNullable(getName());\nname.ifPresent(System.out::println);',
          language: 'java',
        
          deepDive: `# Optional en Java (Java 8+)

## Qu'est-ce que c'est ?

\`Optional\` est un conteneur qui peut contenir ou non une valeur. Il a ete introduit pour representer explicitement l'absence de valeur et reduire les \`NullPointerException\`.

L'objectif est de rendre explicite dans le **type de retour** qu'une valeur peut être absente, plutot que de retourner \`null\` et esperer que l'appelant verifie.

## Creation d'Optional

\`\`\`java
// Optional.of() — valeur non-nulle garantie
Optional<String> opt = Optional.of("hello");
// Optional.of(null);  // NullPointerException !

// Optional.ofNullable() — valeur potentiellement nulle
Optional<String> opt = Optional.ofNullable(mightBeNull);  // Optional.empty() si null

// Optional.empty() — Optional vide
Optional<String> empty = Optional.empty();
\`\`\`

## Inspection (sans exception)

\`\`\`java
Optional<String> opt = Optional.of("hello");

// Verifications
opt.isPresent();           // true
opt.isEmpty();             // false (Java 11+)

// ifPresent — action seulement si present
opt.ifPresent(val -> System.out.println("Value: " + val));

// ifPresentOrElse — action selon presence (Java 9+)
opt.ifPresentOrElse(
    val -> process(val),
    () -> handleEmpty()
);

// N'utilisez PAS get() sans verification !
// opt.get() — "hello" (OK)
// Optional.empty().get();  // NoSuchElementException !!
\`\`\`

## Extraction avec valeur par defaut

\`\`\`java
Optional<String> opt = Optional.ofNullable(mightBeNull);

// orElse — valeur par defaut (toujours evaluee)
String result = opt.orElse("default");

// orElseGet — valeur par defaut (lazy, evaluee seulement si necessaire)
String result = opt.orElseGet(() -> expensiveComputation());
// Preferer orElseGet a orElse si le defaut est couteux a construire

// orElseThrow — exception si absent
String result = opt.orElseThrow(() -> new IllegalStateException("Value required"));

// orElseThrow() — sans args, jette NoSuchElementException (Java 10+)
String result = opt.orElseThrow();
\`\`\`

## Transformation

\`\`\`java
Optional<User> user = findUser(42);

// map — transforme la valeur si presente
Optional<String> name = user.map(User::getName);
// Si user est vide → Optional.empty()
// Si user est present → Optional<String> contenant le nom

// flatMap — transforme quand le resultat est déjà un Optional
Optional<String> email = user.flatMap(User::getEmail);
// Si getEmail() retourne Optional<String>, flatMap évite Optional<Optional<String>>

// filter — garde ou vide selon un predicat
Optional<User> adult = user.filter(u -> u.getAge() >= 18);
\`\`\`

\`\`\`java
// Stream d'Optionals (Java 9+)
List<Optional<String>> list = List.of(
    Optional.of("a"),
    Optional.empty(),
    Optional.of("b")
);

// flatMap + stream
List<String> result = list.stream()
    .flatMap(Optional::stream)  // Garde seulement les presents et "de-wrapper"
    .toList();  // ["a", "b"]

// Alternative (Java 8)
List<String> result = list.stream()
    .filter(Optional::isPresent)
    .map(Optional::get)
    .toList();
\`\`\`

## Optional avec les primitives

\`\`\`java
// Pour les primitives, utilisez les versions specialisees
OptionalInt max = IntStream.range(1, 10).max();
OptionalLong min = LongStream.of(1L, 2L, 3L).min();
OptionalDouble average = DoubleStream.of(1.0, 2.0).average();

// Utilisation
int value = max.orElse(0);
max.ifPresent(System.out::println);
\`\`\`

## Optional comme type de retour

\`\`\`java
// MAUVAIS — retourne null pour "pas de resultat"
public User findById(long id) {
    User user = database.get(id);
    return user;  // Pourrait être null !
}

// BON — Optional explicite
public Optional<User> findById(long id) {
    return Optional.ofNullable(database.get(id));
}

// Utilisation
User user = findById(42)
    .orElseThrow(() -> new UserNotFoundException(42));

String name = findById(42)
    .map(User::getName)
    .orElse("Unknown");
\`\`\`

\`\`\`java
// Chainer les Optional
public String getCityDisplayName(Long userId) {
    return findUser(userId)                           // Optional<User>
        .flatMap(User::getAddress)                     // Optional<Address>
        .flatMap(Address::getCity)                     // Optional<City>
        .map(City::getDisplayName)                     // Optional<String>
        .orElse("Unknown City");
    // Aucun null-check manuel ! Tout est chaine proprement
}
\`\`\`

## Quand NE PAS utiliser Optional

\`\`\`java
// Ne pas utiliser Optional pour :
// 1. Les champs de classe
public class User {
    // private Optional<String> email;  // Non — Optional n'est pas serializable
    private String email;  // Simple champ, gerez null à l'usage
}

// 2. Les paramêtrès de méthode
public void process(Optional<String> input) {  // Non — mauvaise pratique
    // Equivalent a : "le paramêtre peut être null, mais on vous le dit dans le type"
    // Preferer : surcharge de méthode ou méthode avec conditions
}

// 3. Les collections
// Optional<List<String>> — mauvaise idee !
// List.empty() represente déjà l'absence de resultats
\`\`\`

## Bonnes pratiques

1. **Utiliser Optional pour les retours de méthodes** — rend explicite l'absence de valeur
2. **Ne jamais retourner \`null\` d'une méthode qui retourne Optional** — retournez \`Optional.empty()\`
3. **Utiliser \`ifPresent()\` et \`orElse()\`** — pas de \`isPresent()\` + \`get()\` (anti-pattern)
4. **\`flatMap\` pour le chaining** — évite les Optionals imbriques
5. **\`orElseGet()\` pour les valeurs couteuses** — évite le calcul inutile
6. **\`OptionalInt\`, \`OptionalLong\`, \`OptionalDouble\`** pour les primitives
7. **Collecter les Optionals** avec \`flatMap(Optional::stream)\` (Java 9+)

## Pièges courants

1. **\`get()\` sans \`isPresent()\`** — NoSuchElementException
2. **Optional comme champ** — non serializable, mauvaise performance
3. **Optional comme paramêtre** — rend l'API moins lisible que la surcharge
4. **Retourner \`Optional.of()\` sans verifier null** — NPE immediat
5. **Optional de collection** — \`Optional<List>\` est redondant, \`List.empty()\` suffit
6. **\`orElse()\` avec valeur couteuse** — toujours evaluee, meme si Optional est present

Source : [Oracle Java Documentation — Optional](https://docs.oracle.com/javase/tutorial/essential/optional.html)
`},
        {
          id: 'java-24',
          question: 'Interface fonctionnelle',
          answer: "Interface avec **exactement une méthode abstraite** — condition nécessaire pour les expressions lambda. Annotation `@FunctionalInterface` (optionnelle mais recommandée) pour vérification compile-time.\n\nInterfaces fonctionnelles standard : `Predicate<T>` (test booléen), `Function<T,R>` (transformation), `Consumer<T>` (action sans retour), `Supplier<T>` (fabrication), `BiFunction<T,U,R>` (deux arguments).\n\nBase de toute la programmation fonctionnelle Java 8+. __Toute lambda nécessite une interface fonctionnelle.__",
          code: '@FunctionalInterface\npublic interface Calcul {\n    int operation(int a, int b);\n}\n\nCalcul add = (a, b) -> a + b;',
          language: 'java',
        
          deepDive: `# Les interfaces fonctionnelles en Java

## Qu'est-ce que c'est ?

Une interface fonctionnelle est une interface avec **une seule méthode abstraite** (SAM — Single Abstract Method). Cette propriete permet aux expressions lambda et method references de les implementer de maniere implicite.

\`\`\`java
// L'annotation @FunctionalInterface est optionnelle mais recommandee
@FunctionalInterface
public interface Transformer<T, R> {
    R transform(T input);
    // Une seule méthode abstraite → interface fonctionnelle
}
\`\`\`

## @FunctionalInterface

L'annotation \`@FunctionalInterface\` demande au compilateur de verifier que l'interface respecte les regles SAM. Si vous ajoutez une deuxieme méthode abstraite, le compilateur genere une erreur.

\`\`\`java
@FunctionalInterface
public interface Printer {
    void print(String message);

    // Methodes par defaut — autorisees (ne comptent pas)
    default void printTwice(String message) {
        print(message);
        print(message);
    }

    // Methodes statiques — autorisees
    static Printer consolePrinter() {
        return System.out::println;
    }

    // Methodes de Object — autorisees (ne comptent pas)
    String toString();
    boolean equals(Object o);
}

// Ceci compile car une seule méthode abstraite : print()
\`\`\`

\`\`\`java
// Sans @FunctionalInterface, l'interface reste fonctionnelle
// mais le compilateur ne previent pas si on ajoute une deuxieme méthode
public interface Calculator {
    int calculate(int a, int b);
    // Si quelqu'un ajoute "int reset();" → plus fonctionnelle, mais pas d'erreur !
}
\`\`\`

## Les interfaces fonctionnelles predefinies

Java 8 a introduit 43 interfaces fonctionnelles dans \`java.util.function\`. Voici les plus importantes :

\`\`\`java
// ============================================================
// 1. Consumer<T> — operation avec effet de bord, ne retourne rien
// ============================================================
Consumer<String> print = System.out::println;
Consumer<String> log = s -> logger.info(s);
Consumer<String> combined = print.andThen(log);
combined.accept("message");  // Affiche puis log

// BiConsumer<T, U> — deux paramêtres
BiConsumer<String, Integer> printEntry = (k, v) -> System.out.println(k + "=" + v);

// ============================================================
// 2. Supplier<T> — fournit une valeur (factory), pas de paramêtre
// ============================================================
Supplier<LocalDateTime> now = LocalDateTime::now;
Supplier<List<String>> listFactory = ArrayList::new;
Supplier<UUID> randomId = UUID::randomUUID;

// Lazy evaluation
public Image loadImage(Supplier<Image> imageSupplier) {
    // L'image n'est creee que si necessaire
    return cache.getOrCompute(imageSupplier);
}

// ============================================================
// 3. Function<T, R> — transforme T en R
// ============================================================
Function<String, Integer> toLength = String::length;
Function<String, String> toUpper = String::toUpperCase;

// Composition
Function<String, String> upperAndExclaim = toUpper.andThen(s -> s + "!");
Function<String, String> exclaimThenUpper = toUpper.compose(s -> s + "!");

// BiFunction<T, U, R> — deux entrees, une sortie
BiFunction<String, String, String> concat = (a, b) -> a + b;

// ============================================================
// 4. Predicate<T> — test booleen
// ============================================================
Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isLong = s -> s.length() > 10;
Predicate<String> isShort = s -> s.length() < 3;

// Combinaison
Predicate<String> isValid = isLong.and(isEmpty.negate()).or(s -> s.matches("\\\\d+"));

// BiPredicate<T, U>
BiPredicate<String, String> startsWith = String::startsWith;

// ============================================================
// 5. Specialisations
// ============================================================
// UnaryOperator<T> = Function<T, T>
UnaryOperator<String> identity = String::toLowerCase;

// BinaryOperator<T> = BiFunction<T, T, T>
BinaryOperator<Integer> max = Integer::max;
BinaryOperator<Integer> sum = Integer::sum;

// Primitives (évitent l'autoboxing)
IntFunction<String> intToString = String::valueOf;
ToIntFunction<String> stringToInt = String::length;
DoubleBinaryOperator avg = (a, b) -> (a + b) / 2;
\`\`\`

\`\`\`java
// Tableau recapitulatif
String[][] summary = {
    {"Interface", "Signature", "Exemple"},
    {"Function<T,R>", "T -> R", "String::length"},
    {"Consumer<T>", "T -> void", "System.out::println"},
    {"Supplier<T>", "() -> T", "LocalDateTime::now"},
    {"Predicate<T>", "T -> boolean", "String::isEmpty"},
    {"UnaryOperator<T>", "T -> T", "String::toUpperCase"},
    {"BinaryOperator<T>", "(T,T) -> T", "Integer::sum"},
    {"BiFunction<T,U,R>", "(T,U) -> R", "(a,b) -> a + b"},
    {"BiConsumer<T,U>", "(T,U) -> void", "(k,v) -> print(k,v)"},
    {"BiPredicate<T,U>", "(T,U) -> boolean", "String::startsWith"},
};
\`\`\`

\`\`\`java
// Creer sa propre interface fonctionnelle — justifie seulement si besoin specifique
@FunctionalInterface
public interface ThrowingFunction<T, R> {
    R apply(T t) throws Exception;  // Les interfaces standard ne gerent pas les checked exceptions
}

// Utilisation
public static <T, R> Function<T, R> wrap(ThrowingFunction<T, R> fn) {
    return t -> {
        try {
            return fn.apply(t);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    };
}

// Usage
List<String> files = List.of("a.txt", "b.txt", "c.txt");
List<String> contents = files.stream()
    .map(wrap(path -> Files.readString(Path.of(path))))  // checked → unchecked
    .toList();
\`\`\`

## Bonnes pratiques

1. **Utiliser les interfaces standard** — \`Function\`, \`Predicate\`, \`Consumer\` dans 95% des cas
2. **@FunctionalInterface** — toujours annoter vos interfaces fonctionnelles personnalisees
3. **Method references > lambdas > classes anonymes** — dans cet ordre de preference
4. **Composer plutot qu'imbriquer** — \`andThen()\` et \`compose()\` pour la lisibilite
5. **Ne pas ajouter de méthode abstraite supplementaire** — l'interface cesserait d'être fonctionnelle

## Pièges courants

1. **Ajouter une deuxieme méthode abstraite sans @FunctionalInterface** — casse le code client silencieusement
2. **Checked exceptions** — les interfaces standard n'en declarent pas
3. **Equivocite** — si deux interfaces fonctionnelles conviennent, le compilateur peut ne pas savoir laquelle choisir
4. **Surcharge ambiguë** — \`execute(Function<String, String>)\` vs \`execute(Predicate<String>)\` peut causer des erreurs

Source : [Oracle Java Documentation — Functional Interfaces](https://docs.oracle.com/javase/tutorial/java/javaOO/functional.html)
`},
        {
          id: 'java-25',
          question: 'Sealed Classes (Java 17)',
          answer: "Les **sealed classes** permettent de **restreindre les sous-classes** autorisées via `permits`. Contrairement aux `final` (aucune sous-classe) ou open (toutes), on contrôle précisément la hiérarchie.\n\nAvantage : le compilateur connaît toutes les implémentations possibles → **pattern matching exhaustif** dans les `switch`.\n\nComplémentaire des records pour modéliser des hiérarchies fermées. __Utile pour les ADT (Algebraic Data Types) et les modèles de domaine.__",
          code: 'public sealed class Forme permits Cercle, Rectangle, Triangle {}\npublic record Cercle(double rayon) extends Forme {}\npublic record Rectangle(double largeur, double hauteur) extends Forme {}',
          language: 'java',
        
          deepDive: `# Les Sealed Classes en Java (Java 17+)

## Qu'est-ce que c'est ?

Les **sealed classes** (classes scellees) permettent de contrôler **quelles classes peuvent etendre ou implementer** une classe ou interface donnee. C'est un compromis entre \`final\` (aucun heritage) et l'heritage ouvert (toute classe peut heriter).

Une classe scellee declare une **liste explicite** de sous-classes autorisees via le mot-cle \`permits\`.

\`\`\`java
// Syntaxe de base
public sealed class Shape permits Circle, Rectangle, Triangle {
    // ...
}
// Seules Circle, Rectangle et Triangle peuvent heriter de Shape
\`\`\`

## Les trois options pour les sous-classes autorisees

Chaque sous-classe listee dans \`permits\` doit choisir un des trois modificateurs :

\`\`\`java
// 1. final — plus aucune sous-classe possible
public sealed class Animal permits Dog, Cat, Bird {}

public final class Dog extends Animal {}
// Dog ne peut plus être etendu

// 2. sealed — continue la restriction
public sealed class Cat extends Animal permits Lion, Tiger {}
// Cat etend Animal mais ne peut être etendu que par Lion et Tiger

public final class Lion extends Cat {}
public final class Tiger extends Cat {}

// 3. non-sealed — heritage libre (la restriction est levee)
public non-sealed class Bird extends Animal {}
// Bird peut désormais être etendu par n'importe quelle classe

public class Eagle extends Bird {}
public class Penguin extends Bird {}
\`\`\`

## Les sous-classes doivent être accessibles

Les sous-classes autorisees doivent se trouver dans le **meme module** (où le meme package si pas de module). C'est une regle imposee par le compilateur.

\`\`\`java
// Dans le meme fichier (petite hierarchie)
public sealed class Result
    permits Success, Failure, Pending {}

final class Success extends Result { /* ... */ }
final class Failure extends Result { /* ... */ }
final class Pending extends Result { /* ... */ }

// Dans des fichiers separes mais meme package
// (Result.java)
public sealed class Result permits Success, Failure {}

// (Success.java)
public final class Success extends Result {}
\`\`\`

## Switch exhaustif — la puissance des sealed

Le vrai avantage des sealed classes est qu'elles permettent au **compilateur de verifier l'exhaustivite** d'un \`switch\` :

\`\`\`java
public sealed interface Expr permits Constant, Add, Multiply, Negate {}

record Constant(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Multiply(Expr left, Expr right) implements Expr {}
record Negate(Expr expr) implements Expr {}
\`\`\`

\`\`\`java
// Evaluation d'une expression — switch exhaustif
public int evaluate(Expr e) {
    return switch (e) {
        case Constant(var v)   -> v;
        case Add(var l, var r) -> evaluate(l) + evaluate(r);
        case Multiply(var l, var r) -> evaluate(l) * evaluate(r);
        case Negate(var expr)  -> -evaluate(expr);
        // PAS de default necessaire ! Le compilateur sait que tous les cas sont couverts
    };
}

// Si on oublie Negate : erreur de compilation !
// "The switch expression does not cover all possible input values"
\`\`\`

## Sealed + Records — la combinaison parfaite

\`\`\`java
// Algebraic Data Type (ADT) en Java
public sealed interface PaymentMethod
    permits CreditCard, PayPal, Crypto, BankTransfer {}

record CreditCard(String number, String expiry, String cvv) implements PaymentMethod {}
record PayPal(String email) implements PaymentMethod {}
record Crypto(String walletAddress, String currency) implements PaymentMethod {}
record BankTransfer(String iban, String bic) implements PaymentMethod {}
\`\`\`

\`\`\`java
// Traitement exhaustif
public void processPayment(PaymentMethod payment, double amount) {
    switch (payment) {
        case CreditCard(var num, _, _) -> processCard(num, amount);
        case PayPal(var email)         -> processPayPal(email, amount);
        case Crypto(var addr, _)       -> processCrypto(addr, amount);
        case BankTransfer(var iban, _) -> processTransfer(iban, amount);
        // Pas de default — tous les cas sont couverts
    }
}
\`\`\`

## Sealed vs Enum vs Abstract

\`\`\`java
// Enum — nombre fixe d'instances, pas de donnees différentes par instance
enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }
// Chaque instance identique (juste un label)

// Sealed — nombre fixe de SOUS-TYPES, chaque type peut avoir ses propres donnees
sealed interface Vehicle permits Car, Bicycle, Truck {}
record Car(String brand, int doors) implements Vehicle {}
record Bicycle(String type, boolean electric) implements Vehicle {}
record Truck(double capacity, int axles) implements Vehicle {}
// Chaque sous-type a sa propre structure de donnees, très différente

// Abstract — heritage libre, aucun contrôle
abstract class Database {
    abstract void connect();
}
// N'importe quelle classe peut heriter
\`\`\`

\`\`\`java
// Tableau comparatif
String[][] comparison = {
    {"", "Sealed", "Enum", "Abstract"},
    {"Instances", "Illimitees par sous-type", "Fixes", "Illimitees"},
    {"Donnees par type", "Oui (record)", "Limitees", "Oui"},
    {"Contrôle heritage", "Total (liste blanche)", "N/A (pas d'heritage)", "Aucun"},
    {"Switch exhaustif", "Oui", "Oui", "Non"},
    {"Nombre de variants", "Petit a moyen", "Petit", "Grand / illimite"},
};
\`\`\`

\`\`\`java
// Pattern matching + sealed + records (Java 21+)
public String describeShape(Shape shape) {
    return switch (shape) {
        case Circle c when c.radius() > 10 -> "Grand cercle";
        case Circle c -> "Petit cercle (rayon=" + c.radius() + ")";
        case Rectangle r when r.width() == r.height() -> "Carre";
        case Rectangle r -> "Rectangle " + r.width() + "x" + r.height();
    };
}
\`\`\`

## Bonnes pratiques

1. **Utiliser sealed pour les domaines fermes** — types de paiement, états d'une machine, resultats d'operation
2. **Combiner avec records** — donnees immuables + hierarchie contrôlee
3. **Exploiter le switch exhaustif** — pas besoin de \`default\`, le compilateur verifie tout
4. **Preferer sealed à une interface avec documentation** ("n'implemente pas cette interface")
5. **\`non-sealed\` avec parcimonie** — utiliser seulement quand l'heritage libre est necessaire
6. **Utiliser sealed pour les state machines** — états finis avec donnees par état

## Pièges courants

1. **Oublier \`permits\`** — erreur de compilation en Java 17+ (interdit par defaut)
2. **Sous-classes dans un module différent** — impossible, doivent être dans le meme module
3. **\`default\` redondant** — avec sealed exhaustif, un \`default\` masque les nouveaux cas
4. **Trop de variantes** — si > 10 sous-classes, envisagez une autre approche
5. **Sealed sans pattern matching** — perd une grande partie de l'intérêt

Source : [JEP 409 — Sealed Classes](https://openjdk.org/jeps/409)
`},
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

En Java multi-thread, chaque thread peut avoir sa **propre copie en cache** des variables. Un thread peut modifier une variable sans que les autrès threads le voient immediatement. \`synchronized\` et \`volatile\` sont deux mecanismes pour gerer cette visibilite inter-thread.

\`\`\`
Thread 1                    Thread 2
+-----------+               +-----------+
| CPU Cache |               | CPU Cache |
| count = 1 |               | count = 0 |  ← stale data !
+-----------+               +-----------+
      |                           |
+-----+------+           +-------+------+
| Main Memory |           | Main Memory  |
| count = 1   |           | count = 1    |
+-------------+           +--------------+
\`\`\`

## volatile — visibilite sans atomicite

\`volatile\` garantit que **toute lecture voit la derniere écriture** (happens-before). Le compilateur et le CPU ne reordonnent pas les operations autour d'un acces volatile.

\`\`\`java
// volatile = "lecture/écriture toujours en mémoire principale"
public class RunningFlag {
    private volatile boolean running = true;

    public void stop() {
        running = false;  // Ecriture immediate en mémoire principale
    }

    public void work() {
        while (running) {  // Lecture depuis la mémoire principale
            // Sans volatile, le thread pourrait mettre en cache "running = true"
            // et ne jamais voir la modification de stop()
        }
    }
}

// Usage typique : flag d'arret, état initialise, singleton double-check
\`\`\`

\`\`\`java
// volatile ne suffit PAS pour les operations composees
public class Counter {
    private volatile int count = 0;

    public void increment() {
        count++;  // PROBLEME : ce n'est PAS atomique !
        // 1. Lire count (depuis mémoire principale)
        // 2. Incrementer (dans le registre CPU)
        // 3. Ecrire count (vers mémoire principale)
        // Entre 1 et 3, un autre thread peut avoir modifie count !
    }
}

// Avec deux threads qui incrementent 1000 fois chacun :
// Attendu : 2000
// Possible : 1998, 1997, ... (pertes d'increments)
\`\`\`

## synchronized — atomicite + visibilite

\`synchronized\` offre les deux garanties : **atomicite** (l'operation ne peut pas être interrompue) et **visibilite** (le lock garantit la coherence du cache).

\`\`\`java
public class SafeCounter {
    private int count = 0;  // Pas besoin de volatile dans synchronized

    // Methode synchronisee
    public synchronized void increment() {
        count++;  // Atomique ET visible par tous les threads
    }

    // Equivalent avec bloc synchronized
    public void decrement() {
        synchronized (this) {
            count--;
        }
    }

    public synchronized int getCount() {
        return count;
    }
}
\`\`\`

\`\`\`java
// Comment synchronized garantit la visibilite :
// 1. Avant d'entrer dans synchronized : vide le cache CPU
// 2. Execute le code critique
// 3. En sortant de synchronized : écrit toutes les modifications en mémoire principale
// → Le thread suivant qui entre dans synchronized voit toutes les modifications

// C'est le principe "happens-before" du JLS (Java Language Specification)
\`\`\`

\`\`\`java
// Les pieges de synchronized
public class DeadlockExample {
    private final Object lockA = new Object();
    private final Object lockB = new Object();

    public void methodA() {
        synchronized (lockA) {
            // ...
            synchronized (lockB) {  // Attends lockB
                // ...
            }
        }
    }

    public void methodB() {
        synchronized (lockB) {
            // ...
            synchronized (lockA) {  // Attends lockA
                // ...
            }
        }
    }
    // Si thread1.execute(methodA) et thread2.execute(methodB) :
    // Thread1 tient lockA, attend lockB
    // Thread2 tient lockB, attend lockA
    // → DEADLOCK !
}
\`\`\`

## Alternatives modernes : java.util.concurrent.atomic

\`\`\`java
// Atomic* — operations atomiques sans synchronisation (basées CAS)
import java.util.concurrent.atomic.*;

// AtomicInteger
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();        // ++counter (retourne nouvelle valeur)
counter.getAndIncrement();        // counter++ (retourne ancienne valeur)
counter.addAndGet(5);             // counter += 5
counter.compareAndSet(10, 20);    // Si == 10, alors = 20

// AtomicReference
AtomicReference<String> ref = new AtomicReference<>("initial");
ref.compareAndSet("initial", "updated");

// LongAdder — plus performant que AtomicInteger pour les écritures frequentes
LongAdder adder = new LongAdder();
adder.increment();
adder.add(5);
long total = adder.sum();
\`\`\`

\`\`\`java
// Tableau comparatif
String[][] comparison = {
    {"Propriete", "volatile", "synchronized", "Atomic*"},
    {"Visibilite", "Oui", "Oui", "Oui"},
    {"Atomicite", "Non", "Oui", "Oui"},
    {"Blocage", "Aucun", "Lock", "CAS (non-bloquant)"},
    {"Performance", "+++", "+", "++"},
    {"Deadlock", "Jamais", "Possible", "Jamais"},
    {"Usage typique", "Flag, état", "Operations composees", "Compteurs, CAS"},
};
\`\`\`

## Bonnes pratiques

1. **volatile pour les flags simples** — \`running\`, \`initialized\`, \`shutdown\`
2. **synchronized pour les sections critiques** — quand plusieurs operations doivent être atomiques ensemble
3. **Atomic* pour les compteurs** — plus performant que synchronized pour les increments
4. **Lock prive** — \`private final Object lock = new Object()\` au lieu de \`synchronized(this)\`
5. **Minimiser les sections synchronisees** — bloque le moins de code possible
6. **ReentrantLock ou StampedLock** pour des besoins avances (tryLock, read/write locks)

## Pièges courants

1. **volatile ne rend pas \`count++\` atomique** — toujours un risque de perte d'increment
2. **Deadlock** — avec synchronized, toujours verrouiller dans le meme ordre
3. **Visibility sans synchronized** — sans volatile ni synchronized, un thread peut ne jamais voir une modification
4. **String comme lock** — les Strings internes sont partagees globalement !
5. **Performance de synchronized** — ne pas synchroniser plus que necessaire

Source : [Oracle Java Documentation — Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html)
`},
        {
          id: 'java-27',
          question: 'ExecutorService & CompletableFuture',
          answer: "Le framework **Executor** (Java 5) remplace la gestion manuelle des threads : `ExecutorService` gère un pool de threads configurable (`FixedThreadPool`, `CachedThreadPool`, `ScheduledThreadPool`). On soumet des tâches via `submit()` et `invokeAll()`.\n\n**CompletableFuture** (Java 8) apporte la programmation asynchrone déclarative : chaînage avec `thenApply()`, `thenCompose()`, `thenAccept()`, combinaison avec `allOf()`/`anyOf()`, gestion d'erreurs avec `exceptionally()`/`handle()`.\n\nAvantages : pas de création manuelle de threads, pool réutilisable, callbacks non bloquants. __Règle : ne jamais créer de threads manuellement, toujours passer par l'ExecutorService.__",
          code: 'ExecutorService pool = Executors.newFixedThreadPool(4);\n\n// ExecutorService\npool.submit(() -> traiter(données));\n\n// CompletableFuture\nCompletableFuture\n    .supplyAsync(() -> fetchUser(id), pool)\n    .thenApply(user -> enrichir(user))\n    .thenAccept(result -> logger.info(result))\n    .exceptionally(ex -> { logger.error(ex); return null; });',
          language: 'java',
        
          deepDive: `# ExecutorService et CompletableFuture en Java

## Qu'est-ce que c'est ?

Java fournit deux niveaux d'abstraction pour la programmation concurrente :

- **\`ExecutorService\`** (Java 5) : pool de threads reutilisables, gestion de cycle de vie
- **\`CompletableFuture\`** (Java 8) : programmation asynchrone declarative avec composition

Ensemble, ils remplacent la creation manuelle de threads (\`new Thread()\`) et les callbacks imbriques.

## ExecutorService — le pool de threads

Creer un \`new Thread()\` par tâche est inefficace : la creation/destruction de threads est couteuse et le nombre de threads concurrents n'est pas limite.

\`\`\`java
// Les principaux types de pools
ExecutorService cached = Executors.newCachedThreadPool();     // Threads illimites, recyclage
ExecutorService fixed = Executors.newFixedThreadPool(4);       // 4 threads max
ExecutorService single = Executors.newSingleThreadExecutor();   // 1 thread (file d'attente)
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2); // Taches planifiees
\`\`\`

\`\`\`java
// Soumission de tâches
ExecutorService pool = Executors.newFixedThreadPool(4);

// execute() — Runnable, pas de retour (fire-and-forget)
pool.execute(() -> System.out.println("Task executed"));

// submit() — Callable ou Runnable, retourne Future<T>
Future<Integer> future = pool.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

// Attente du resultat
Integer result = future.get();              // Bloque jusqu'au resultat
Integer result = future.get(5, TimeUnit.SECONDS);  // Timeout

// invokeAll() — plusieurs tâches
List<Callable<String>> tasks = List.of(
    () -> "Task 1",
    () -> "Task 2"
);
List<Future<String>> futures = pool.invokeAll(tasks);

// Cycle de vie du pool
pool.shutdown();                    // Attends la fin des tâches en cours
pool.shutdownNow();                 // Interrompt les tâches en cours
pool.awaitTermination(10, TimeUnit.SECONDS);  // Attente max
\`\`\`

\`\`\`java
// Strategie de dimensionnement
int CORES = Runtime.getRuntime().availableProcessors();

// CPU-bound : un thread par coeur
ExecutorService cpuPool = Executors.newFixedThreadPool(CORES);

// I/O-bound : plus de threads (attente I/O)
ExecutorService ioPool = Executors.newFixedThreadPool(CORES * 2);

// Mixte : dimensionnement selon le ratio d'attente
// Optimal = nbCores * (1 + waitTime / computeTime)
// Si 50% d'attente : nbCores * 2
\`\`\`

## CompletableFuture — l'asynchrone moderne

\`CompletableFuture\` est un \`Future\` enrichi qui permet de composer des operations asynchrones sans bloquer.

\`\`\`java
// Creation
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return fetchFromRemote();
}, executor);  // Sans executor : ForkJoinPool.commonPool()

CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
    heavyComputation();
});
\`\`\`

\`\`\`java
// Transformation (thenApply — synchrone)
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchUser(42))
    .thenApply(user -> user.getName())       // Synchronous transformation
    .thenApply(name -> name.toUpperCase());

// Transformation (thenCompose — asynchrone, flatMap)
CompletableFuture<Order> future = CompletableFuture
    .supplyAsync(() -> fetchUser(42))
    .thenCompose(user -> CompletableFuture.supplyAsync(() -> fetchOrders(user.getId())));
// thenCompose évite CompletableFuture<CompletableFuture<Order>>
\`\`\`

\`\`\`java
// Combinaison de plusieurs CompletableFuture
CompletableFuture<String> userFuture = CompletableFuture.supplyAsync(() -> fetchUser(42));
CompletableFuture<String> orderFuture = CompletableFuture.supplyAsync(() -> fetchOrders(42));

// thenCombine — combine deux futurs independants
CompletableFuture<String> combined = userFuture.thenCombine(orderFuture,
    (user, orders) -> "User: " + user + ", Orders: " + orders);

// allOf — attend tous les futurs (retourne CompletableFuture<Void>)
CompletableFuture<Void> all = CompletableFuture.allOf(f1, f2, f3);
CompletableFuture<List<Object>> results = all.thenApply(v ->
    Stream.of(f1, f2, f3)
        .map(CompletableFuture::join)
        .toList()
);

// anyOf — retourne le premier qui termine
CompletableFuture<Object> first = CompletableFuture.anyOf(f1, f2);
\`\`\`

\`\`\`java
// Gestion des erreurs
CompletableFuture.supplyAsync(() -> riskyOperation())
    .thenApply(result -> transform(result))
    // exceptionally — attrape les erreurs et fournit une valeur de remplacement
    .exceptionally(ex -> {
        log.error("Operation failed", ex);
        return DEFAULT_VALUE;
    })
    // handle — traite resultat OU erreur
    .handle((result, ex) -> {
        if (ex != null) return handleError(ex);
        return handleSuccess(result);
    })
    // whenComplete — callback sans modifier le resultat
    .whenComplete((result, ex) -> {
        if (ex != null) log.error("Error", ex);
        else log.info("Success: {}", result);
    });
\`\`\`

\`\`\`java
// Exemple complet : appels API paralleles avec timeout
public CompletableFuture<UserProfile> loadUserProfile(Long userId) {
    var timeout = CompletableFuture.failedFuture(new TimeoutException("Timed out"));
    timeout.orTimeout(5, TimeUnit.SECONDS);  // Java 9+

    var userInfo = CompletableFuture
        .supplyAsync(() -> userService.getUser(userId), executor)
        .applyToEither(timeout, Function.identity());

    var userOrders = CompletableFuture
        .supplyAsync(() -> orderService.getRecentOrders(userId), executor)
        .applyToEither(timeout, Function.identity())
        .exceptionally(ex -> List.of());

    var userRecommendations = CompletableFuture
        .supplyAsync(() -> recommendationService.getForUser(userId), executor)
        .applyToEither(timeout, Function.identity())
        .exceptionally(ex -> List.of());

    return userInfo.thenCombine(userOrders, (user, orders) ->
        new UserProfile(user, orders, null));
}
\`\`\`

## Tableau ExecutorService vs CompletableFuture

\`\`\`java
String[][] comparison = {
    {"Aspect", "ExecutorService + Future", "CompletableFuture"},
    {"Style", "Imperatif (submit/get)", "Fonctionnel (thenApply)"},
    {"Blocage", "future.get() bloque", "Callbacks non-bloquants"},
    {"Composition", "Manuelle (futures.add())", "thenCompose, thenCombine"},
    {"Erreurs", "ExecutionException", "exceptionally(), handle()"},
    {"Combinaison", "invokeAll complexe", "allOf, anyOf"},
    {"Timeout", "future.get(5, SECONDS)", "orTimeout(5, SECONDS)"},
};
\`\`\`

## Bonnes pratiques

1. **Toujours specifier un \`ExecutorService\`** — ne pas utiliser le pool commun pour les tâches longues
2. **\`shutdown()\` proprement** — dans un bloc \`finally\` ou avec try-with-resources (Java 19+)
3. **Dimensionner le pool selon le type de tâche** — CPU-bound vs I/O-bound
4. **\`thenCompose\` vs \`thenApply\`** — \`thenCompose\` quand la fonction retourne un CompletableFuture
5. **Timeout systematique** — \`orTimeout()\` (Java 9+) pour les appels externes
6. **Logguer les exceptions** — ne pas laisser les CompletableFuture silencieusement echouer
7. **Separer les pools** — un pool pour les I/O, un pour le CPU

## Pièges courants

1. **Oublier \`shutdown()\`** — le processus JVM ne se termine pas
2. **Bloquer le pool commun** — \`get()\` dans un callback du pool commun = deadlock
3. **Exceptions silencieuses** — CompletableFuture ne logge pas les exceptions, il les stocke
4. **\`get()\` vs \`join()\`** — \`get()\` leve des checked exceptions, \`join()\` leve des unchecked
5. **Trop de threads** — \`CachedThreadPool\` peut creer des milliers de threads

Source : [Oracle Java Documentation — ExecutorService](https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html)
`},
        {
          id: 'java-28',
          question: 'Réflexion',
          answer: "Capacité d'un programme à s'inspecter et se modifier au runtime : instancier via `Class.forName()`, invoquer des méthodes par nom, accéder aux champs `private` via `setAccessible(true)`.\n\nUtilisé par **Spring** (injection de dépendances, scan d'annotations) et **Hibernate** (mapping O/R). Inconvénients : plus lent, contourne la vérification de type et l'encapsulation, risque de sécurité. __Indispensable pour les frameworks, à éviter dans le code métier__.",
        
          deepDive: `# La reflexion en Java (Reflection API)

## Qu'est-ce que c'est ?

La reflexion permet à un programme Java d'**inspecter et manipuler** sa propre structure à l'execution : classes, méthodes, champs, constructeurs — meme les elements prives. C'est un mecanisme puissant, utilise par tous les frameworks modernes (Spring, Hibernate, Jackson, JUnit).

## Les classes fondamentales du package java.lang.reflect

\`\`\`java
import java.lang.reflect.*;

// Les classes principales :
// Class<?>     → represente une classe chargee en mémoire
// Method       → represente une méthode
// Field        → represente un champ
// Constructor<?> → represente un constructeur
// Annotation   → represente une annotation
\`\`\`

## Obtenir un objet Class

\`\`\`java
// 3 facons d'obtenir un objet Class
Class<String> c1 = String.class;                    // 1. .class literal
Class<?> c2 = "hello".getClass();                   // 2. .getClass() sur instance
Class<?> c3 = Class.forName("java.lang.String");    // 3. Class.forName (par nom complet)

// La troisieme forme est la plus utilisee dans les frameworks :
// Elle permet de charger des classes dont on ne connait le nom qu'à l'execution
\`\`\`

\`\`\`java
// Inspection de classe
Class<?> clazz = MyService.class;

String name = clazz.getName();           // "com.example.MyService"
String simpleName = clazz.getSimpleName(); // "MyService"
Package pkg = clazz.getPackage();        // Package "com.example"
int mods = clazz.getModifiers();         // Modifier.PUBLIC
boolean isFinal = Modifier.isFinal(mods);
boolean isAbstract = Modifier.isAbstract(mods);

// Superclasse et interfaces
Class<?> superclass = clazz.getSuperclass();
Class<?>[] interfaces = clazz.getInterfaces();
\`\`\`

## Instanciation dynamique

\`\`\`java
// Instanciation par constructeur sans paramêtre
Class<?> clazz = Class.forName("com.example.User");
User user = (User) clazz.getDeclaredConstructor().newInstance();

// Instanciation avec paramêtres
Constructor<?> ctor = clazz.getDeclaredConstructor(String.class, int.class);
User user = (User) ctor.newInstance("Alice", 30);
\`\`\`

## Acces aux champs

\`\`\`java
class Person {
    private String name = "Default";
    public int age;
}

Class<?> clazz = Person.class;
Person person = new Person();

// Champ public
Field ageField = clazz.getField("age");              // getField : public seulement
System.out.println(ageField.get(person));            // 0

// Champ prive (getDeclaredField : tous les champs)
Field nameField = clazz.getDeclaredField("name");    // getDeclaredField : y compris prives
nameField.setAccessible(true);                        // Ouvre l'acces au champ prive
String name = (String) nameField.get(person);        // "Default"
nameField.set(person, "Bob");                         // Modification

// Modifier une constante (final)
Field finalField = clazz.getDeclaredField("CONSTANT");
finalField.setAccessible(true);
Field modifiersField = Field.class.getDeclaredField("modifiers");
modifiersField.setAccessible(true);
modifiersField.setInt(finalField, finalField.getModifiers() & ~Modifier.FINAL);
finalField.set(null, "New Value");  // Modification de constante ! (dernier recours)
\`\`\`

## Invocation de méthodes

\`\`\`java
class Calculator {
    public int add(int a, int b) { return a + b; }
    private int multiply(int a, int b) { return a * b; }
    public static String greet(String name) { return "Hello, " + name; }
}

Class<?> clazz = Calculator.class;
Calculator calc = new Calculator();

// Methode publique
Method addMethod = clazz.getMethod("add", int.class, int.class);
int result = (int) addMethod.invoke(calc, 3, 4);    // 7

// Methode privee
Method multiplyMethod = clazz.getDeclaredMethod("multiply", int.class, int.class);
multiplyMethod.setAccessible(true);
int product = (int) multiplyMethod.invoke(calc, 3, 4);  // 12

// Methode statique
Method greetMethod = clazz.getMethod("greet", String.class);
String greeting = (String) greetMethod.invoke(null, "Alice");  // null pour static
\`\`\`

## Annotation processing

\`\`\`java
// La reflexion est le mecanisme fondamental du traitement des annotations

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogExecution {
    String level() default "INFO";
}

class MyService {
    @LogExecution(level = "DEBUG")
    public void process() { /* ... */ }
}

// Scan des annotations à l'execution
for (Method method : MyService.class.getDeclaredMethods()) {
    LogExecution annotation = method.getAnnotation(LogExecution.class);
    if (annotation != null) {
        System.out.println(method.getName() + " logged at " + annotation.level());
    }
}

// Pattern : le framework Spring utilise ce mecanisme pour @Autowired, @Transactional, etc.
\`\`\`

## Performance considerations

\`\`\`java
// Benchmark : appel direct vs reflexion
public class ReflectionBenchmark {
    public void directCall() {
        calc.add(3, 4);     // ~2 nanosecondes
    }

    public void reflectionCall() throws Exception {
        Method m = Calculator.class.getMethod("add", int.class, int.class);
        m.invoke(calc, 3, 4);  // ~500 nanosecondes (250× plus lent)
    }

    public void cachedReflection() throws Exception {
        staticMethod.invoke(calc, 3, 4);  // ~50 nanosecondes (méthode mise en cache)
    }

    private static final Method staticMethod;

    static {
        try {
            staticMethod = Calculator.class.getMethod("add", int.class, int.class);
        } catch (NoSuchMethodException e) {
            throw new ExceptionInInitializerError(e);
        }
    }
}
// Conclusion : mettez en cache les objets Method/Field/Constructor !
\`\`\`

## Cas d'usage legitimes

\`\`\`java
// 1. Frameworks DI (Spring)
@Autowired private UserService userService;
// Spring scanne les champs @Autowired et injecte les dependances via reflexion

// 2. Mapping JSON (Jackson, Gson)
ObjectMapper mapper = new ObjectMapper();
User user = mapper.readValue(json, User.class);  // Utilise la reflexion

// 3. ORM (Hibernate)
@Entity
@Table(name = "users")
public class User { /* ... */ }
// Hibernate inspecte les annotations et les champs pour le mapping

// 4. Tests (JUnit)
@Test
void myTest() { /* ... */ }
// JUnit trouve les méthodes @Test via reflexion

// 5. Proxies dynamiques (AOP)
InvocationHandler handler = (proxy, method, args) -> {
    log.info("Before: " + method.getName());
    Object result = method.invoke(target, args);
    log.info("After: " + method.getName());
    return result;
};
UserService proxy = (UserService) Proxy.newProxyInstance(
    classLoader, interfaces, handler);
\`\`\`

## Bonnes pratiques

1. **Mettre en cache les Method/Field/Constructor** — ne pas les reçuperer a chaque appel
2. **Utiliser \`setAccessible(true)\` avec parcimonie** — contourne l'encapsulation
3. **Preferer les API standard** — MethodHandle, VarHandle sont plus rapides
4. **Limiter la reflexion au code d'infrastructure** — pas dans le code metier
5. **Gerer les exceptions** — \`InvocationTargetException\` encapsule l'exception originale
6. **\`isAccessible()\`** — verifier avant de modifier (securite)

## Pièges courants

1. **Performance** — la reflexion est 10-100× plus lente que l'appel direct
2. **Pas de verification compile-time** — une faute de frappe dans le nom de méthode ne sera detectee qu'à l'execution
3. **Violation d'encapsulation** — acceder a des membres prives brise l'abstraction
4. **SecurityManager** — peut interdire la reflexion selon la configuration
5. **Proxies et final** — impossible de creer un proxy pour une classe finale

Source : [Oracle Java Documentation — Reflection](https://docs.oracle.com/javase/tutorial/reflect/)
`},
        {
          id: 'java-29',
          question: 'Covariance des types de retour',
          answer: "La **covariance** (Java 5) permet à une sous-classe de retourner un sous-type du type de retour parent. Si `Animal.reproduire()` retourne `Animal`, `Chien.reproduire()` peut retourner `Chien` — le contrat est respecté car un `Chien` est un `Animal`.\n\nÇa évite les casts inutiles : directement `Chien c = new Chien().reproduire()`. Mécanisme qui rend le code *plus propre et plus sûr*.",
          code: 'class Animal { Animal reproduire() { ... } }\nclass Chien extends Animal {\n    @Override Chien reproduire() { ... }\n}',
          language: 'java',
        
          deepDive: `# Covariance et contravariance en Java (Wildcards)

## Qu'est-ce que c'est ?

Les **generiques** en Java sont **invariants** par defaut : \`List<String>\` n'est PAS un sous-type de \`List<Object>\`. Les **wildcards** (\`? extends T\`, \`? super T\`) permettent de retrouver de la flexibilite tout en preservant la securite des types.

## Le problème de l'invariance

\`\`\`java
// Pourquoi List<String> n'est pas un sous-type de List<Object> ?
List<String> strings = new ArrayList<>();
// List<Object> objects = strings;  // ERREUR de compilation !

// Si c'etait autorise :
objects.add(42);  // On ajoute un Integer dans une List<String> !
String s = strings.get(0);  // ClassCastException !
// L'invariance protege de cette situation
\`\`\`

## Covariance avec ? extends T

\`\`\`java
// ? extends T = la collection PRODUIT des elements de type T (lecture seule)
List<Integer> integers = List.of(1, 2, 3);
List<Double> doubles = List.of(1.0, 2.0, 3.0);
List<Number> numbers = new ArrayList<>();

// Covariance : ? extends Number
List<? extends Number> producers = integers;  // OK
producers = doubles;                          // OK
producers = numbers;                          // OK

// LECTURE : OK — on sait que c'est au moins un Number
Number n = producers.get(0);  // OK
Object o = producers.get(0);  // OK
// Integer i = producers.get(0);  // ERREUR : pourrait être Double !

// ECRITURE : INTERDITE — ne sait pas quel sous-type ajouter
// producers.add(42);      // ERREUR
// producers.add(3.14);    // ERREUR
// producers.add(null);    // OK (null est de tous les types)
\`\`\`

## Contravariance avec ? super T

\`\`\`java
// ? super T = la collection CONSOMME des elements de type T (écriture possible)
List<Object> objects = new ArrayList<>();
List<Number> numbers = new ArrayList<>();
List<Integer> integers = new ArrayList<>();

// Contravariance : ? super Integer
List<? super Integer> consumers = objects;    // OK
consumers = numbers;                          // OK
// consumers = integers;                     // OK — Integer super Integer ?
// Non ! List<Integer> n'est pas List<? super Integer>
// (? super Integer) signifie "Integer ou supertype"

// ECRITURE : OK — tout Integer peut être ajoute
consumers.add(42);    // Integer -> OK

// LECTURE : restreinte a Object
Object obj = consumers.get(0);  // OK (au pire, c'est un Object)
// Number num = consumers.get(0);  // ERREUR : pourrait être Object
\`\`\`

## Le principe PECS (Producer Extends, Consumer Super)

\`\`\`java
// PECS = "Producer Extends, Consumer Super"
// Regle simple pour choisir le bon wildcard :

// Si la collection FOURNIT des donnees (lecture) → ? extends
public double sum(Collection<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) { total += n.doubleValue(); }
    return total;
}
// numbers est un "producteur" de Number

// Si la collection RECOIT des donnees (écriture) → ? super
public void addAll(Collection<? super Integer> sink) {
    for (int i = 0; i < 100; i++) {
        sink.add(i);  // Integer peut être ajoute a Integer, Number, Object
    }
}
// sink est un "consommateur" de Integer
\`\`\`

\`\`\`java
// Exemple de la JDK : Collections.copy()
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    // dest est consommateur (? super T) — on y écrit
    // src est producteur (? extends T) — on y lit
    for (int i = 0; i < src.size(); i++) {
        dest.set(i, src.get(i));
    }
}

// Utilisation
List<Integer> src = List.of(1, 2, 3);
List<Number> dest = new ArrayList<>(List.of(0.0, 0.0, 0.0));
Collections.copy(dest, src);  // dest = [1, 2, 3]
\`\`\`

## Exemple complet avec plusieurs niveaux

\`\`\`java
// Hierarchie : Fruit > Citrus > Orange
class Fruit {}
class Citrus extends Fruit {}
class Orange extends Citrus {}

// Sans wildcard : invariant
List<Citrus> citruses = new ArrayList<>();
// List<Fruit> fruits = citruses;     // ERREUR : invariant
// List<Orange> oranges = citruses;   // ERREUR : invariant

// Avec wildcard extends : covariance (lecture)
List<? extends Citrus> producers = citruses;
producers = new ArrayList<Orange>();  // OK
Citrus c = producers.get(0);         // OK : au moins Citrus
// producers.add(new Citrus());      // ERREUR

// Avec wildcard super : contravariance (écriture)
List<? super Citrus> consumers = citruses;
consumers = new ArrayList<Fruit>();   // OK
consumers.add(new Citrus());          // OK
consumers.add(new Orange());          // OK (Orange extends Citrus)
// consumers.add(new Fruit());        // ERREUR : Fruit n'est pas Citrus ou sous-type
// Citrus c = consumers.get(0);      // ERREUR : pourrait être Fruit ou Object
\`\`\`

\`\`\`java
// Wildcard avec des méthodes generiques — inference de type
public class Utils {
    // ? sans contrainte (wildcard nonborne)
    public static boolean isEmpty(List<?> list) {
        return list.isEmpty();
    }

    // Equivalent a <T> boolean isEmpty(List<T> list)
    // Le wildcard est plus court quand T n'est pas reference ailleurs
}

// Utilisation
Utils.isEmpty(List.of("a", 1, true));  // OK : ? accepte tout
\`\`\`

\`\`\`java
// Piege : wildcard <?> vs type brut
List<?> wildcard = new ArrayList<String>();
wildcard.add(null);     // OK (seulement null)
// wildcard.add("a");   // ERREUR : type inconnu

List raw = new ArrayList<String>();  // Type brut — a éviter !
raw.add("a");                        // OK, mais pas de verification
String s = (String) raw.get(0);      // Cast necessaire, pas type-safe
\`\`\`

## Tableau comparatif

\`\`\`java
String[][] varianceComparison = {
    {"Type", "Direction", "Lecture", "Ecriture", "Exemple"},
    {"T<T>", "Invariant", "T", "T", "List<Citrus>"},
    {"? extends T", "Covariant", "T", "Interdit", "List<? extends Fruit>"},
    {"? super T", "Contravariant", "Object", "T", "List<? super Orange>"},
    {"?", "Nonborne", "Object", "null", "List<?>"},
};
\`\`\`

## Bonnes pratiques

1. **PECS systematique** — Producer Extends, Consumer Super
2. **Retour de méthode : \`? extends T\`** — la méthode produit des donnees
3. **Paramêtre d'entree : \`? super T\`** — la méthode consomme des donnees
4. **\`<T>\` si T est reference a plusieurs endroits** — wildcard si utilise une seule fois
5. **Eviter les wildcards dans les types de retour** — complique l'API

## Pièges courants

1. **Wildcard dans le mauvais sens** — utiliser \`? extends\` quand on veut écrire (impossible !)
2. **\`? super\` ne permet pas de lire autre chose qu'Object** — perte d'information de type
3. **Wildcard dans un type de retour** — \`List<? extends Number>\` force l'appelant a gerer le wildcard
4. **Capturer un wildcard** — pas possible d'écrire \`T\` à partir d'un \`?\` directement
5. **Oublier que les tableaux sont covariants** — \`String[]\` est sous-type de \`Object[]\` (contrairement aux generiques)

Source : [Oracle Java Documentation — Wildcards](https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html)
`},
        {
          id: 'java-30',
          question: 'Enum avancé',
          answer: "Les `enum` Java sont des **classes spéciales** : elles peuvent avoir des champs, constructeurs, méthodes et implémenter des interfaces. Chaque constante est une **instance unique**.\n\nCas d'usage avancés : associées à des valeurs/méthodes (`StatusCode.OK.code()`), *strategy pattern* natif (chaque constante implémente différemment une méthode abstraite), et **Singleton** via enum avec un seul élément.\n\nPlus sûres que des constantes entières : *type-safe*, impossibilité d'instancier, méthodes intégrées (`values()`, `valueOf()`).",
          code: 'public enum Status {\n    SUCCESS(200, "OK"),\n    NOT_FOUND(404, "Not Found");\n\n    private final int code;\n    private final String message;\n\n    Status(int code, String message) {\n        this.code = code;\n        this.message = message;\n    }\n}',
          language: 'java',
        
          deepDive: `# Les Enum avances en Java

## Qu'est-ce que c'est ?

Les \`enum\` en Java sont bien plus que des constantes nominees. Ce sont des **classes Java a part entiere** : elles peuvent avoir des champs, des constructeurs, des méthodes, et implementer des interfaces. Chaque constante enum est une **instance unique** de la classe enum.

\`\`\`java
// Enum simple — constantes uniquement
enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }

// Enum avance — avec champs, constructeur et méthodes
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);

    private final double mass;     // Champ (final pour immutabilite)
    private final double radius;

    Planet(double mass, double radius) {  // Constructeur prive
        this.mass = mass;
        this.radius = radius;
    }

    public double surfaceGravity() {      // Methode d'instance
        return 6.67e-11 * mass / (radius * radius);
    }
}
\`\`\`

## Enum avec comportements différents par constante

\`\`\`java
// Strategy pattern nativement supporte par les enums
public enum Operation {
    PLUS("+") {
        @Override public double apply(double a, double b) { return a + b; }
    },
    MINUS("-") {
        @Override public double apply(double a, double b) { return a - b; }
    },
    TIMES("*") {
        @Override public double apply(double a, double b) { return a * b; }
    },
    DIVIDE("/") {
        @Override public double apply(double a, double b) { return a / b; }
    };

    private final String symbol;

    Operation(String symbol) { this.symbol = symbol; }

    public String getSymbol() { return symbol; }

    // Methode abstraite que chaque constante doit implementer
    public abstract double apply(double a, double b);
}

// Utilisation
double result = Operation.PLUS.apply(3, 4);      // 7.0
double result = Operation.valueOf("TIMES").apply(3, 4);  // 12.0

// Parcours de toutes les operations
for (Operation op : Operation.values()) {
    System.out.println(op.getSymbol() + " → " + op.apply(10, 5));
}
// + → 15.0
// - → 5.0
// * → 50.0
// / → 2.0
\`\`\`

## Enum comme machine a états (State Machine)

\`\`\`java
public enum OrderState {
    PENDING {
        @Override public OrderState next() { return CONFIRMED; }
    },
    CONFIRMED {
        @Override public OrderState next() { return SHIPPED; }
    },
    SHIPPED {
        @Override public OrderState next() { return DELIVERED; }
    },
    DELIVERED {
        @Override public OrderState next() { return this; }  // Etat final
    },
    CANCELLED {
        @Override public OrderState next() { return this; }  // Etat final
    };

    // Chaque constante definit sa propre transition
    public abstract OrderState next();

    // Methodes partagees
    public boolean isFinal() {
        return this == DELIVERED || this == CANCELLED;
    }

    public boolean canTransitionTo(OrderState target) {
        return this.next() == target;
    }
}

// Utilisation
OrderState state = OrderState.PENDING;
while (!state.isFinal()) {
    System.out.println("Current: " + state);
    state = state.next();
}
// PENDING → CONFIRMED → SHIPPED → DELIVERED
\`\`\`

## Enum avec interface

\`\`\`java
// Interface que les enums implementent
public interface Describable {
    String getDescription();
    String getCode();
}

// Enum implementant une interface
public enum HttpStatus implements Describable {
    OK(200, "OK"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public String getDescription() { return code + " " + message; }

    @Override
    public String getCode() { return String.valueOf(code); }

    public boolean isError() { return code >= 400; }
    public boolean isSuccess() { return code >= 200 && code < 300; }
}

// Utilisation polymorphe
Describable status = HttpStatus.NOT_FOUND;
System.out.println(status.getDescription());  // "404 Not Found"
\`\`\`

## EnumSet et EnumMap — performance optimale

\`\`\`java
// EnumSet — bit vector (extreme performance)
public enum Color { RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN }

EnumSet<Color> all = EnumSet.allOf(Color.class);       // Toutes les couleurs
EnumSet<Color> none = EnumSet.noneOf(Color.class);      // Ensemble vide
EnumSet<Color> rgb = EnumSet.of(Color.RED, Color.GREEN, Color.BLUE);
EnumSet<Color> warm = EnumSet.range(Color.RED, Color.YELLOW);

// Operations ensemblistes
EnumSet<Color> complement = EnumSet.complementOf(rgb);  // Couleurs hors RGB
rgb.add(Color.YELLOW);
rgb.remove(Color.GREEN);
rgb.containsAll(EnumSet.of(Color.RED, Color.BLUE));

// EnumMap — tableau indexe par ordinal (O(1))
public enum State { IDLE, RUNNING, PAUSED, STOPPED }

EnumMap<State, String> stateNames = new EnumMap<>(State.class);
stateNames.put(State.RUNNING, "En cours");
stateNames.put(State.STOPPED, "Arrete");
stateNames.put(State.PAUSED, "En pause");

// Parcours par ordre de déclaration
for (State state : State.values()) {
    System.out.println(state + " = " + stateNames.get(state));
}
\`\`\`

## Enum Singleton — le meilleur pattern Singleton

\`\`\`java
// Le pattern Singleton le plus sur en Java
public enum DatabaseConnection {
    INSTANCE;  // Unique instance

    private Connection connection;

    DatabaseConnection() {
        // Initialisation effectuee une seule fois par le classloader
        this.connection = DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public Connection getConnection() { return connection; }
    public void executeQuery(String sql) { /* ... */ }
}

// Utilisation
DatabaseConnection.INSTANCE.executeQuery("SELECT * FROM users");
// Avantages du Singleton par enum :
// 1. Thread-safe (garanti par le classloader JVM)
// 2. Resistant à la serialization (les enums sont serialisables par defaut)
// 3. Protege contre la reflection (les enums ne peuvent pas être instancies par reflection)
// "Effective Java" (Joshua Bloch) recommande cette approche
\`\`\`

\`\`\`java
// Enum avance : constant-specific body + abstract method
public enum ParserType {
    JSON {
        @Override public Document parse(String input) {
            return new JsonParser().parse(input);
        }
    },
    XML {
        @Override public Document parse(String input) {
            return new XmlParser().parse(input);
        }
    },
    CSV {
        @Override public Document parse(String input) {
            return new CsvParser().parse(input);
        }
    };

    // Methode abstraite — chaque constante fournit sa propre implementation
    public abstract Document parse(String input);

    // Methode statique — resolution par type
    public static ParserType fromExtension(String filename) {
        if (filename.endsWith(".json")) return JSON;
        if (filename.endsWith(".xml")) return XML;
        if (filename.endsWith(".csv")) return CSV;
        throw new IllegalArgumentException("Unknown format: " + filename);
    }
}
\`\`\`

## Bonnes pratiques

1. **Utiliser les enums pour les ensembles finis** — états, codes, types, configurations
2. **Remplacer les constantes \`int\` ou \`String\`** — type-safe, impossible de passer une valeur invalide
3. **EnumSet et EnumMap** pour les operations ensemblistes — plus performants que HashSet/HashMap
4. **Enum Singleton** pour les singletons — le plus robuste (Joshua Bloch, Effective Java)
5. **Ajouter des champs et méthodes** pour enrichir la semantique
6. **\`valueOf(String)\` pour la deserialisation** — attention aux IllegalArgumentException
7. **\`values()\` retourne une copie** — peut être mise en cache si appele frequemment

## Pièges courants

1. **Enum trop gros** — si l'enum a > 20 constantes ou des méthodes de 50 lignes, envisagez une classe polymorphe
2. **Ordre de déclaration** — \`values()\` et \`ordinal()\` dependent de l'ordre, ne pas ajouter de constantes au milieu
3. **Serialization** — les enums sont serialisables par defaut, mais les champs ajoutes doivent l'être aussi
4. **\`ordinal()\` dangereux** — ne pas utiliser \`ordinal()\` comme index de base de donnees (l'ordre peut changer)
5. **Switch sans default** — avec un enum, le compilateur ne previent pas si un nouveau cas est ajoute

Source : [Oracle Java Documentation — Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)
`},
      ],
    },
  ],
};