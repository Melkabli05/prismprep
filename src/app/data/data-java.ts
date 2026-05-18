import type { InterviewCategory } from '../models/interview.models';

export const javaCategory: InterviewCategory = {
  id: 'java',
  title: 'Java',
  color: 'bg-emerald-100 text-emerald-700',
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
        },
        {
          id: 'java-2',
          question: 'static',
          answer: "**`static`** signifie que le membre appartient à la classe, pas à l'instance. Une variable `static` est partagée entre toutes les instances ; une méthode `static` s'appelle sans instancier (ex. `Math.PI`). `this` est interdit dans un contexte `static`.\n\nUtile pour constantes, utilitaires, compteurs partagés. __À utiliser avec modération__ : trop de `static` = design procédural, et les méthodes `static` sont difficiles à *mocker*.",
          example: "Math.PI — pas besoin de new Math().",
        },
        {
          id: 'java-3',
          question: 'final vs finally vs finalize',
          answer: "**`final`** empêche la modification : variable non réassignable, méthode non redéfinissable, classe non étendue (ex. `String`). **`finally`** est un bloc qui s'exécute toujours après `try-catch`, idéal pour libérer les ressources. **`finalize`** est une méthode de `Object` appelée par le GC avant suppression — __dépréciée depuis Java 9__.\n\nOn utilise aujourd'hui `try-with-resources` ou `AutoCloseable` à la place.",
        },
        {
          id: 'java-4',
          question: 'transient',
          answer: "**`transient`** exclut un champ de la sérialisation. Cas d'usage : données sensibles (mot de passe), champs calculables (recalculés à la désérialisation), références non sérialisables (évite `NotSerializableException`).\n\nÀ la désérialisation, le champ prend sa valeur par défaut (`null`, `0`…).",
        },
        {
          id: 'java-5',
          question: 'Généricité',
          answer: "Paramétrer les types : `List<String>` garantit le type à la compilation, plus besoin de *caster*. Fonctionne par **type erasure** : les types génériques sont effacés au runtime (pas de `new T()` ni `instanceof T`).\n\nBornes : `<T extends Comparable<T>>` restreint le type, *wildcards* (`? extends T`, `? super T`) pour la flexibilité API. Indispensable — utilisé partout (`Collections`, `Stream`s, `Optional`).",
          example: "List<String> = que des String. Pas besoin de caster.",
        },
        {
          id: 'java-6',
          question: 'Classe finale / méthode finale',
          answer: "`final` sur une classe empêche l'héritage (ex. : `String` est finale pour garantir son **immuabilité**). `final` sur une méthode empêche la redéfinition dans les sous-classes, utile pour les comportements critiques qui doivent rester identiques.\n\n**Classe finale** = pas d'héritage, **méthode finale** = pas de redéfinition. Objectif : **sécurité** et **prévisibilité** du comportement.",
        },
        {
          id: 'java-7',
          question: 'try-with-resources',
          answer: "Depuis Java 7, déclarez les ressources implémentant **`AutoCloseable`** directement dans le `try` — Java les ferme automatiquement, même en cas d'exception. Plus besoin de bloc `finally` manuel.\n\nPlusieurs ressources possibles dans un même `try`. L'ordre de fermeture est **inverse** de la déclaration. __La manière moderne et recommandée de gérer les ressources en Java.__",
          code: 'try (FileInputStream fis = new FileInputStream("f.txt");\n     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {\n    String line = br.readLine();\n} // fermeture automatique',
          language: 'java',
        },
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
        },
        {
          id: 'java-9',
          question: 'StackOverflowError vs OutOfMemoryError',
          answer: "**`StackOverflowError`** : la pile d'exécution est pleine, typiquement par récursion infinie (stack ~512Ko-1Mo). **`OutOfMemoryError`** : le tas (*heap*) est saturé, par exemple une liste qui grandit indéfiniment.\n\n`StackOverflow` se diagnostique facilement via la trace d'appels ; `OutOfMemory` nécessite souvent un profiling (`JVisualVM`, `Eclipse MAT`). En production : `-Xmx` pour le heap, `-Xss` pour la stack.",
        },
        {
          id: 'java-10',
          question: 'Fuites mémoire en Java',
          answer: "Le GC nettoie les objets *inaccessibles*, mais pas les objets **oubliés dans des collections statiques**, les **listeners non désenregistrés**, les **caches sans taille limite**, ou les **références vers des objets externes** non fermés (`Connection`, `Stream`).\n\nDétection : monitoring de la mémoire (`JVisualVM`, heap dump), tests de charge avec analyse de l'évolution du heap. __Prévention : toujours fermer les ressources, limiter les caches, utiliser `WeakReference` quand approprié.__",
        },
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
          code: 'try {\n    Connection c = DriverManager.getConnection(url);\n} catch (SQLException e) {\n    System.err.println("Erreur: " + e.getMessage());\n} finally {\n    // fermer la connexion\n}',
          language: 'java',
        },
        {
          id: 'java-12',
          question: 'throw vs throws',
          answer: "**`throw`** lance explicitement une exception dans le code (ex. `throw new IllegalArgumentException()`). **`throws`** déclare dans la signature qu'une méthode peut lancer une exception — surtout pour les *checked exceptions*.\n\n`throws` sert de contrat : l'appelant doit attraper l'exception ou la redéclarer. C'est un mécanisme de **transparence** qui empêche d'ignorer les erreurs potentielles.",
          code: 'void verifier(int v) throws IllegalArgumentException {\n    if (v < 0) throw new IllegalArgumentException("Négatif");\n}',
          language: 'java',
        },
        {
          id: 'java-13',
          question: 'Checked vs Unchecked',
          answer: "**Checked** : vérifiées à la compilation, le compilateur oblige à les gérer (`try-catch` ou `throws`) — ex. `IOException`, `SQLException`. Impossible de les ignorer.\n\n**Unchecked** (sous-classes de `RuntimeException`) : non vérifiées, représentent des erreurs de programmation — ex. `NullPointerException`.\n\nEn pratique : **checked** pour les erreurs métier prévisibles, **unchecked** pour les bugs de programmation.",
        },
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
        },
        {
          id: 'java-15',
          question: 'ArrayList vs LinkedList',
          answer: "**`ArrayList`** (tableau dynamique) : accès par index O(1), insertion/suppression en milieu O(n), meilleure localité cache. **`LinkedList`** (liste doublement chaînée) : insertion/suppression O(1) si on a le nœud, accès par index O(n).\n\nEn pratique, `ArrayList` est préférée dans 90% des cas grâce à l'accès rapide et la mémoire contiguë. `LinkedList` est pertinente pour les insertions/suppressions fréquentes en tête ou en milieu.",
        },
        {
          id: 'java-16',
          question: 'String vs StringBuilder vs StringBuffer',
          answer: "**`String`** est **immuable** : chaque modification crée un nouvel objet — les concaténations en boucle sont catastrophiques en performance. **`StringBuilder`** : mutable avec buffer dynamique, idéal pour construire des chaînes en *single-thread*. **`StringBuffer`** : identique mais synchronisé (*thread-safe*), rarement nécessaire.\n\nRègle : `String` pour les constantes, `StringBuilder` pour la construction dynamique.",
        },
        {
          id: 'java-17',
          question: 'HashMap : fonctionnement interne',
          answer: "Structure **tableau de buckets** (taille par défaut 16). La clé est hashée via `hashCode()`, puis l'index du bucket est déterminé par `hash % capacity`. En cas de **collision** (même index), les entrées sont chaînées : liste chaînée ou **arbre rouge-noir** (depuis Java 8, si >8 éléments dans un bucket).\n\n**Rehashing** : quand le *load factor* (0.75 par défaut) est dépassé, le tableau double de taille et toutes les entrées sont redistribuées. __Bonnes pratiques : initialiser avec la capacité attendue, utiliser des clés immuables et de bons `hashCode()`/`equals()`.__",
          code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("clé", 42);\n// hashCode("clé") → hash → index du bucket\n// Si collision → liste chaînée ou arbre',
          language: 'java',
        },
        {
          id: 'java-18',
          question: 'ConcurrentHashMap',
          answer: "Version **thread-safe** de `HashMap` sans verrouiller toute la structure. Divise la table en **segments** (Java 7) ou utilise des verrous au niveau des buckets individuels (Java 8+) : lectures sans verrou, écritures avec verrou fin.\n\nOpérations atomiques : `putIfAbsent()`, `computeIfAbsent()`, `merge()`. Performances bien supérieures à `Hashtable` ou `Collections.synchronizedMap()` en concurrence.\n\n__Choix par défaut pour les maps partagées entre threads.__",
          code: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.putIfAbsent("clé", 42);\nmap.computeIfAbsent("compteur", k -> 0);',
          language: 'java',
        },
        {
          id: 'java-19',
          question: 'Comparable vs Comparator',
          answer: "**`Comparable`** : définit l'ordre **naturel** d'une classe via `compareTo()` dans la classe elle-même. Un seul ordre possible.\n\n**`Comparator`** : définit un ordre **externe** via `compare()`, séparé de la classe. Plusieurs comparateurs possibles pour différents critères.\n\nUtilisez `Comparable` si l'ordre est évident et unique (`String` par ordre alphabétique). Utilisez `Comparator` pour des tris variés ou quand vous ne pouvez pas modifier la classe.",
          code: '// Comparable (ordre naturel)\nclass Person implements Comparable<Person> {\n    public int compareTo(Person p) { return name.compareTo(p.name); }\n}\n\n// Comparator (ordre externe)\nComparator<Person> parAge = Comparator.comparingInt(p -> p.age);',
          language: 'java',
        },
        {
          id: 'java-20',
          question: 'Record (Java 14+)',
          answer: "**`record`** = classe immuable générant automatiquement constructeur, `getters`, `equals()`, `hashCode()` et `toString()`. Idéal pour les **DTOs** et objets de valeur.\n\nPlus concis qu'une classe classique : `public record Person(String nom, int age) {}` remplace des dizaines de lignes de boilerplate.\n\nLes champs sont **finaux** par définition. On peut ajouter des méthodes et valider dans le constructeur compact. __Le remplaçant moderne des DTOs écrits à la main.__",
          code: 'public record Person(String nom, int age) {\n    // Constructeur compact avec validation\n    public Person {\n        if (age < 0) throw new IllegalArgumentException();\n    }\n}',
          language: 'java',
        },
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
        },
        {
          id: 'java-22',
          question: 'Streams',
          answer: "Abstraction fonctionnelle pour traiter les collections. **Opérations intermédiaires** (`filter`, `map`, `sorted`) : retournent un `Stream`, sont *lazy*. **Opérations terminales** (`collect`, `forEach`, `reduce`) : déclenchent le pipeline et produisent un résultat.\n\n`parallelStream()` permet la parallélisation. Idéal pour les transformations de données déclaratives ; pour les boucles simples avec effets de bord, `for` reste plus approprié.",
          code: 'names.stream()\n     .filter(n -> n.startsWith("A"))\n     .forEach(System.out::println);',
          language: 'java',
        },
        {
          id: 'java-23',
          question: 'Optional',
          answer: "**`Optional`** : conteneur qui peut contenir ou non une valeur, introduit pour éviter les `NullPointerException`. Au lieu de `get()` risqué, on utilise `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n`Optional` rend explicite la possibilité d'absence de valeur. __Bonnes pratiques__ : utiliser uniquement comme type de retour, jamais comme champ ou paramètre, et __ne jamais retourner un `Optional` `null`__.",
          code: 'Optional<String> name = Optional.ofNullable(getName());\nname.ifPresent(System.out::println);',
          language: 'java',
        },
        {
          id: 'java-24',
          question: 'Interface fonctionnelle',
          answer: "Interface avec **exactement une méthode abstraite** — condition nécessaire pour les expressions lambda. Annotation `@FunctionalInterface` (optionnelle mais recommandée) pour vérification compile-time.\n\nInterfaces fonctionnelles standard : `Predicate<T>` (test booléen), `Function<T,R>` (transformation), `Consumer<T>` (action sans retour), `Supplier<T>` (fabrication), `BiFunction<T,U,R>` (deux arguments).\n\nBase de toute la programmation fonctionnelle Java 8+. __Toute lambda nécessite une interface fonctionnelle.__",
          code: '@FunctionalInterface\npublic interface Calcul {\n    int operation(int a, int b);\n}\n\nCalcul add = (a, b) -> a + b;',
          language: 'java',
        },
        {
          id: 'java-25',
          question: 'Sealed Classes (Java 17)',
          answer: "Les **sealed classes** permettent de **restreindre les sous-classes** autorisées via `permits`. Contrairement aux `final` (aucune sous-classe) ou open (toutes), on contrôle précisément la hiérarchie.\n\nAvantage : le compilateur connaît toutes les implémentations possibles → **pattern matching exhaustif** dans les `switch`.\n\nComplémentaire des records pour modéliser des hiérarchies fermées. __Utile pour les ADT (Algebraic Data Types) et les modèles de domaine.__",
          code: 'public sealed class Forme permits Cercle, Rectangle, Triangle {}\npublic record Cercle(double rayon) extends Forme {}\npublic record Rectangle(double largeur, double hauteur) extends Forme {}',
          language: 'java',
        },
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
        },
        {
          id: 'java-27',
          question: 'ExecutorService & CompletableFuture',
          answer: "Le framework **Executor** (Java 5) remplace la gestion manuelle des threads : `ExecutorService` gère un pool de threads configurable (`FixedThreadPool`, `CachedThreadPool`, `ScheduledThreadPool`). On soumet des tâches via `submit()` et `invokeAll()`.\n\n**CompletableFuture** (Java 8) apporte la programmation asynchrone déclarative : chaînage avec `thenApply()`, `thenCompose()`, `thenAccept()`, combinaison avec `allOf()`/`anyOf()`, gestion d'erreurs avec `exceptionally()`/`handle()`.\n\nAvantages : pas de création manuelle de threads, pool réutilisable, callbacks non bloquants. __Règle : ne jamais créer de threads manuellement, toujours passer par l'ExecutorService.__",
          code: 'ExecutorService pool = Executors.newFixedThreadPool(4);\n\n// ExecutorService\npool.submit(() -> traiter(donnees));\n\n// CompletableFuture\nCompletableFuture\n    .supplyAsync(() -> fetchUser(id), pool)\n    .thenApply(user -> enrichir(user))\n    .thenAccept(result -> logger.info(result))\n    .exceptionally(ex -> { logger.error(ex); return null; });',
          language: 'java',
        },
        {
          id: 'java-28',
          question: 'Réflexion',
          answer: "Capacité d'un programme à s'inspecter et se modifier au runtime : instancier via `Class.forName()`, invoquer des méthodes par nom, accéder aux champs `private` via `setAccessible(true)`.\n\nUtilisé par **Spring** (injection de dépendances, scan d'annotations) et **Hibernate** (mapping O/R). Inconvénients : plus lent, contourne la vérification de type et l'encapsulation, risque de sécurité. __Indispensable pour les frameworks, à éviter dans le code métier__.",
        },
        {
          id: 'java-29',
          question: 'Covariance des types de retour',
          answer: "La **covariance** (Java 5) permet à une sous-classe de retourner un sous-type du type de retour parent. Si `Animal.reproduire()` retourne `Animal`, `Chien.reproduire()` peut retourner `Chien` — le contrat est respecté car un `Chien` est un `Animal`.\n\nÇa évite les casts inutiles : directement `Chien c = new Chien().reproduire()`. Mécanisme qui rend le code *plus propre et plus sûr*.",
          code: 'class Animal { Animal reproduire() { ... } }\nclass Chien extends Animal {\n    @Override Chien reproduire() { ... }\n}',
          language: 'java',
        },
        {
          id: 'java-30',
          question: 'Enum avancé',
          answer: "Les `enum` Java sont des **classes spéciales** : elles peuvent avoir des champs, constructeurs, méthodes et implémenter des interfaces. Chaque constante est une **instance unique**.\n\nCas d'usage avancés : associées à des valeurs/méthodes (`StatusCode.OK.code()`), *strategy pattern* natif (chaque constante implémente différemment une méthode abstraite), et **Singleton** via enum avec un seul élément.\n\nPlus sûres que des constantes entières : *type-safe*, impossibilité d'instancier, méthodes intégrées (`values()`, `valueOf()`).",
          code: 'public enum Status {\n    SUCCESS(200, "OK"),\n    NOT_FOUND(404, "Not Found");\n\n    private final int code;\n    private final String message;\n\n    Status(int code, String message) {\n        this.code = code;\n        this.message = message;\n    }\n}',
          language: 'java',
        },
      ],
    },
  ],
};