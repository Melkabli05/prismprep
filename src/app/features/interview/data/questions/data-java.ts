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
        
          deepDive: `# Les modificateurs d'accès en Java\\n\\n## Les quatre niveaux de visibilité\\n\\nJava propose quatre modificateurs d'accès, du plus restrictif au plus permissif :\\n\\n| Modificateur | Classe | Package | Sous-classe | Monde |\\n|-------------|--------|---------|-------------|-------|  \\n| \`private\` | ✓ | ✗ | ✗ | ✗ |\\n| default (aucun) | ✓ | ✓ | ✗ | ✗ |\\n| \`protected\` | ✓ | ✓ | ✓ | ✗ |\\n| \`public\` | ✓ | ✓ | ✓ | ✓ |\\n\\n## private — le plus restrictif\\n\\n\`private\` restreint l'accès au **sein de la classe uniquement**. Une méthode ou un champ privé n'est accessible que depuis la classe où il est déclaré.\\n\\n\`\`\`java\\npublic class Utilisateur {\\n    private String motDePasse;  // Accessible uniquement dans Utilisateur\\n    \\n    private boolean validerMotDePasse(String mdp) {\\n        return this.motDePasse.equals(mdp);\\n    }\\n    \\n    public void changerMotDePasse(String ancien, String nouveau) {\\n        if (validerMotDePasse(ancien)) {  // ✓ Accessible ici\\n            this.motDePasse = nouveau;\\n        }\\n    }\\n}\\n\`\`\`\\n\\n**Usage typique** : encapsulation des champs internes, méthodes utilitaires privées, helpers algorithmiques.\\n\\n## default (package-private)\\n\\nQuand aucun modificateur n'est précisé, le membre a une visibilité **limited au package**. Toute classe du même package peut y accéder, mais pas les sous-classes ou classes externes.\\n\\n\`\`\`java\\n// Fichier: com.app.service.AuthService\\package com.app.service;\\n\\nclass Interne {  // default — package-private\\n    void methode() {}  // Accessible par toute classe du package com.app.service\\n}\\n\\npublic class AuthService {\\n    void helper() {  // default — accessible dans tout le package\\n        new Interne().methode();  // ✓\\n    }\\n}\\n\`\`\`\\n\\n**Usage typique** : membres \\"package-private\\" pour organiser le code interne d'un package sans les exposers à l'extérieur.\\n\\n## protected — pour l'héritage\\n\\n\`protected\` permet l'accès depuis :\\n- La classe elle-même\\n- Toutes les classes du même package\\n- **Les sous-classes (même si elles sont dans un autre package)**\\n\\n\`\`\`java\\n// Classe mère\\npublic class Animal {\\n    protected String nom;  // Accessible par Animal et ses sous-classes\\n    \\n    protected void decrire() {\\n        System.out.println("Animal: " + nom);\\n    }\\n}\\n\\n// Sous-classe dans un autre package\\npublic class Chien extends Animal {\\n    public void presenter() {\\n        this.nom = "Rex";  // ✓ Accessible via héritage\\n        this.decrire();    // ✓ Accessible via héritage\\n    }\\n}\\n\\n// Classe non liée dans un autre package\\npublic class Test {\\n    public void demo() {\\n        Chien c = new Chien();\\n        c.nom = "Max";  // ✗ Erreur de compilation — protected\\n    }\\n}\\n\`\`\`\\n\\n**Usage typique** : méthodes conçues pour être surchargées par des sous-classes, hooks internes d'extension.\\n\\n## public — visibilité totale\\n\\n\`public\` rend le membre accessible depuis **n'importe quel endroit** du code, dans tout projet.\\n\\n\`\`\`java\\npublic class Config {\\n    public static final String API_URL = "https://api.example.com";  // Accessible partout\\n    \\n    public void initialiser() {  // Accessible partout\\n        // ...\\n    }\\n}\\n\`\`\`\\n\\n## Règle générale : principe du moindre privilège\\n\\n> Préférez \`private\` par défaut. N'exposez que ce qui doit l'être.\\n\\nChaque niveau de visibilité supplémentaires constitue une **public API** qu'il faudra maintenir indéfiniment. Une méthode \`public\` dans une bibliothèque signifie qu'elle ne peut jamais être supprimée sans casser le code des utilisateurs.\\n\\n## Bonnes pratiques\\n\\n1. **Champs toujours \`private\`** — jamais \`public\` pour un champ. Utilisez des getters/setters si besoin.\\n2. **\`protected\` pour les hooks** — méthodes conçues pour être overridées par des sous-classes.\\n3. **\`public\` pour l'API** — méthodes meant to be used by other classes.\\n4. **Evitez le default** — sa signification implicite est souvent source de confusion.\\n\\n## Membres statiques (static)\\n\\nLes champs et méthodes \`static\` ne sont pas affectés par les modificateurs d'accès de la même façon :\\n\\n\`\`\`java\\npublic class Compteur {\\n    private static int total = 0;  // Accessible via la classe, pas par instance\\n    public static int getTotal() { return total; }  // Point d'accès contrôlé\\n}\\n\`\`\`\\n\\n\`static\` ne modifie pas la visibilité — c'est un concept orthogonale. Un champ \`private static\` est accessible depuis n'importe où via \`Classe.membre\` si le membre lui-même est \`public\`.\\n\\n## Classes et interfaces\\n\\n| Élément | Modificateurs possibles |\\n|---------|------------------------|\\n| Classe/Interface top-level | \`public\` ou default (package-private) |\\n| Classe/Interface interne (nested) | \`public\`, \`protected\`, \`private\`, default |\\n\\nUne classe top-level ne peut PAS être \`private\` — cela n'aurait aucun sens (elle serait inaccessible).\\n\\n## Résumé rapide\\n\\n\`\`\`java\\npublic class Exemple {\\n    public    String a = "accessible partout";\\n    protected String b = "accessible dans le package + sous-classes";\\n              String c = "accessible dans le package uniquement";\\n    private   String d = "accessible dans cette classe uniquement";\\n}\\n\`\`\`\\n\\nSource : [Oracle Java Documentation — Controlling Access](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)`},
        {
          id: 'java-2',
          question: 'static',
          answer: "**`static`** signifie que le membre appartient à la classe, pas à l'instance. Une variable `static` est partagée entre toutes les instances ; une méthode `static` s'appelle sans instancier (ex. `Math.PI`). `this` est interdit dans un contexte `static`.\n\nUtile pour constantes, utilitaires, compteurs partagés. __À utiliser avec modération__ : trop de `static` = design procédural, et les méthodes `static` sont difficiles à *mocker*.",
          example: "Math.PI — pas besoin de new Math().",
        
          deepDive: `# Le modificateur static en Java\\n\\n## Qu'est-ce que c'est ?\\n\\nLe mot-cle \`static\` en Java signifie qu'un membre (attribut ou methode) appartient a la classe elle-meme, et non a une instance particuliere. Il est partage par toutes les instances de la classe.\\n\\n## static applique aux champs (variables de classe)\\n\\n\`\`\`java\\npublic class Compteur {\\n    public static int instanceCount = 0;\\n\\n    public Compteur() {\\n        instanceCount++;\\n    }\\n}\\n\\nCompteur c1 = new Compteur();\\nCompteur c2 = new Compteur();\\n\\nSystem.out.println(Compteur.instanceCount);  // 2\\n\`\`\`\\n\\nLes champs \`static\` sont parfaits pour :\\n- **Compteurs** partages par toutes les instances\\n- **Constantes** liees a la classe (avec \`final\`)\\n- **Configuration** commune a toutes les instances\\n\\n## static applique aux methodes\\n\\n\`\`\`java\\npublic class MathHelper {\\n    public static int doubler(int x) {\\n        return x * 2;\\n    }\\n}\\n\\nint result = MathHelper.doubler(5);  // 10\\n\`\`\`\\n\\n### Restrictions des methodes static\\n\\nUne methode \`static\` ne peut PAS :\\n- Acceder a \`this\` ou \`super\`\\n- Appeler directement une methode non-static\\n\\n\`\`\`java\\npublic class Exemple {\\n    private int instanceVar = 10;\\n\\n    public static void bonExemple(Exemple e) {\\n        System.out.println(e.instanceVar);  // OK via instance\\n    }\\n}\\n\`\`\`\\n\\n## static et le bloc d'initialisation\\n\\n\`\`\`java\\npublic class Config {\\n    public static final String DB_URL;\\n\\n    static {\\n        DB_URL = System.getenv("DB_URL");\\n    }\\n}\\n\`\`\`\\n\\nLe bloc \`static { }\` s'execute une seule fois au chargement de la classe.\\n\\n## Inner classes static\\n\\n\`\`\`java\\npublic class Externe {\\n    public static class Interne { }\\n}\\n\\nExterne.Interne obj = new Externe.Interne();\\n\`\`\`\\n\\nUne classe interne \`static\` n'a pas besoin d'une instance de sa classe mere.\\n\\n## Import static\\n\\n\`\`\`java\\nimport static java.lang.Math.PI;\\n\\npublic class Calcul {\\n    public double circonference(double rayon) {\\n        return 2 * PI * rayon;\\n    }\\n}\\n\`\`\`\\n\\n## Constantes static final\\n\\n\`\`\`java\\npublic class Constants {\\n    public static final double TAUX_TVA = 20.0;\\n    public static final String APP_NAME = "PrismPrep";\\n}\\n\\ndouble prix = 100 * (1 + Constants.TAUX_TVA / 100);\\n\`\`\`\\n\\nPar convention, les constantes s'ecrivent en MAJUSCULES_AVEC_UNDERSCORES.\\n\\n## Pieges courants\\n\\n### 1. Modifier un etat partage sans synchronisation\\n\\n\`\`\`java\\nprivate static int count = 0;\\n\\npublic static void increment() {\\n    count++;  // Non thread-safe\\n}\\n\\n// Utiliser AtomicInteger pour les environnements multithreads\\n\`\`\`\\n\\n### 2. Confusion static vs instance\\n\\n\`\`\`java\\npublic class Utilisateur {\\n    private String nom;           // Une valeur par instance\\n    private static int total = 0; // Une seule valeur partagee\\n}\\n\`\`\`\\n\\n### 3. Polymorphisme et static\\n\\nOn ne peut PAS surcharger une methode \`static\` — le polymorphisme ne s'applique qu'aux methodes d'instance.\\n\\n## Bonnes pratiques\\n\\n1. **Preferez les methodes static** quand la methode n'accede a aucune donnee d'instance\\n2. **Utilisez \`static final\` pour les constantes**\\n3. **Evitez les champs static mutables**\\n4. **Ne pas abuser du static** — si une methode a besoin de \`this\`, elle ne doit pas etre static\\n\\nSource : [Oracle Java Documentation - Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classmembers.html)`},
        {
          id: 'java-3',
          question: 'final vs finally vs finalize',
          answer: "**`final`** empêche la modification : variable non réassignable, méthode non redéfinissable, classe non étendue (ex. `String`). **`finally`** est un bloc qui s'exécute toujours après `try-catch`, idéal pour libérer les ressources. **`finalize`** est une méthode de `Object` appelée par le GC avant suppression — __dépréciée depuis Java 9__.\n\nOn utilise aujourd'hui `try-with-resources` ou `AutoCloseable` à la place.",
        
          deepDive: `# final, finally et finalize en Java\\n\\n## final — restriction definitive\\n\\n\`final\` signifie "je ne peux pas etre change" selon le contexte :\\n\\n### Variable finale — valeur immuable\\n\\n\`\`\`java\\npublic class MathConstants {\\n    public static final double PI = 3.14159265359;\\n    public static final int MAX_RETRY = 3;\\n}\\n\\n// MAX_RETRY = 5;  // Erreur de compilation\\n\`\`\`\\n\\nUne variable \`final\` doit etre initialisee a sa declaration, dans le constructeur, ou dans un initialiseur static.\\n\\n### Methode finale — non surchargable\\n\\n\`\`\`java\\npublic class Parent {\\n    public final void afficher() {\\n        System.out.println("Methode finale");\\n    }\\n}\\n\\npublic class Enfant extends Parent {\\n    // @Override\\n    // public void afficher() {}  // Erreur - impossible de surcharger\\n}\\n\`\`\`\\n\\n### Classe finale — non heritable\\n\\n\`\`\`java\\npublic final class String {\\n    // String ne peut PAS etre heritee\\n}\\n\`\`\`\\n\\n## finally — nettoyage garantie\\n\\n\`finally\` s'execue **toujours**, que l'exception soit jetee ou non :\\n\\n\`\`\`java\\npublic void lireFichier(String chemin) {\\n    FileInputStream fis = null;\\n    try {\\n        fis = new FileInputStream(chemin);\\n    } catch (IOException e) {\\n        System.err.println("Erreur: " + e.getMessage());\\n    } finally {\\n        if (fis != null) {\\n            fis.close();  // Toujours execute\\n        }\\n    }\\n}\\n\`\`\`\\n\\n### try-with-resources (preferable depuis Java 7)\\n\\n\`\`\`java\\npublic void lireFichier(String chemin) {\\n    try (FileInputStream fis = new FileInputStream(chemin)) {\\n        // ... - fis.close() appele automatiquement\\n    } catch (IOException e) {\\n        System.err.println("Erreur: " + e.getMessage());\\n    }\\n}\\n\`\`\`\\n\\n### finally et return — piege\\n\\nSi \`finally\` contient un \`return\`, il **supprime** l'exception en cours :\\n\\n\`\`\`java\\npublic int mauvaisExemple() {\\n    try {\\n        int x = 10 / 0;\\n        return 1;\\n    } catch (ArithmeticException e) {\\n        return 2;\\n    } finally {\\n        return 3;  // Surcharge - retourne 3\\n    }\\n}\\n\`\`\`\\n\\n**Evitez de mettre \`return\` dans un bloc \`finally\`**.\\n\\n## finalize — DEPRECATED\\n\\n\`finalize()\` etait appelee par le Garbage Collector avant de recuperer un objet. Deprecated depuis Java 9, retiree depuis Java 18.\\n\\n\`\`\`java\\n@Override\\nprotected void finalize() throws Throwable {\\n    // Ne pas utiliser - utiliser try-with-resources\\n}\\n\`\`\`\\n\\n### Pourquoi ne pas l'utiliser ?\\n\\n1. **Pas de garantie d'appel**\\n2. **Performance degradee**\\n3. **Execution non deterministe**\\n\\n### Alternative : Cleaner (Java 9+)\\n\\n\`\`\`java\\npublic class Fichier implements AutoCloseable {\\n    private final Cleaner cleaner = Cleaner.create();\\n    private final FileHandle handle;\\n\\n    @Override\\n    public void close() {\\n        cleaner.register(this, () -> closeFile(handle));\\n    }\\n}\\n\`\`\`\\n\\n## Resume\\n\\n| Mot-cle | Role | Quand utiliser |\\n|---------|------|----------------|\\n| \`final\` | Valeur/methode/classe non modifiable | Constantes, methodes critiques, classes non herisables |\\n| \`finally\` | Bloc de nettoyage | Fermer les ressources non AutoCloseable |\\n| \`finalize\` | Deprecated | Ne pas utiliser\\n\\nSource : [Oracle Java Documentation - Execution Control](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html)`},
        {
          id: 'java-4',
          question: 'transient',
          answer: "**`transient`** exclut un champ de la sérialisation. Cas d'usage : données sensibles (mot de passe), champs calculables (recalculés à la désérialisation), références non sérialisables (évite `NotSerializableException`).\n\nÀ la désérialisation, le champ prend sa valeur par défaut (`null`, `0`…).",
        
          deepDive: `# Le modificateur transient en Java\\n\\n## Qu'est-ce que c'est ?\\n\\n\`transient\` indique au mecanisme de serialisation (Serializable) d'ignorer un champ lors de la conversion en bytes. Le champ ne sera pas inclus dans le flux serialise.\\n\\n## Probleme resolu\\n\\nCertains champs ne peuvent pas etre serialises :\\n- **References a des objets non serialisables** (FileInputStream, DatabaseConnection)\\n- **Donnees temporaires** (cache, etat intermediate)\\n- **Donnees sensibles** (passwords, tokens)\\n\\n## Exemple fondamental\\n\\n\`\`\`java\\npublic class Utilisateur implements Serializable {\\n    private static final long serialVersionUID = 1L;\\n\\n    private String nom;\\n    private transient String motDePasse;  // Ignore lors de la serialisation\\n    private transient Instant dateConnexion;\\n\\n    public Utilisateur(String nom, String motDePasse) {\\n        this.nom = nom;\\n        this.motDePasse = motDePasse;\\n        this.dateConnexion = Instant.now();\\n    }\\n}\\n\\n// Serialisation\\nbyte[] data = serialize(new Utilisateur("Alice", "secret123"));\\n\\n// Deserialisation\\nUtilisateur restored = deserialize(data);\\nSystem.out.println(restored.motDePasse);  // null\\nSystem.out.println(restored.dateConnexion);  // null\\n\`\`\`\\n\\n## Champs transient et valeur par defaut\\n\\nApres deserialisation, les champs \`transient\` valent :\\n- \`null\` pour les objets\\n- \`0\` pour les nombres primitifs\\n- \`false\` pour les booleens\\n\\n## Usage typique\\n\\n### 1. Donnees sensibles\\n\\n\`\`\`java\\npublic class Session implements Serializable {\\n    private String userId;\\n    private transient String token;  // Ne pas serialiser\\n}\\n\`\`\`\\n\\n### 2. Ressources systeme\\n\\n\`\`\`java\\npublic class CacheDonnees implements Serializable {\\n    private String donneeId;\\n    private transient FileInputStream fluxFichier;  // Non serialisable\\n}\\n\`\`\`\\n\\n### 3. Champs calculables\\n\\n\`\`\`java\\npublic class Commande implements Serializable {\\n    private List<Ligne> lignes;\\n    private transient BigDecimal totalCalcule;  // Recompute apres\\n}\\n\`\`\`\\n\\n## static et transient\\n\\nLes champs \`static\` ne sont jamais serialises (ils appartiennent a la classe). Ajouter \`transient\` sur un champ static est redondant.\\n\\n## Bonnes pratiques\\n\\n1. **たくない fields doivent etre transient** — ressources non serialisables, donnees sensibles\\n2. **Initialisez les champs transient** avec des valeurs par defaut coherentes\\n3. **Considerer Externalizable** pour un controle plus fin\\n4. **Ne vous basez pas sur la valeur par defaut** — recreer ou recalculer explicitement\\n\\nSource : [Oracle Java Documentation - Object Serialization](https://docs.oracle.com/javase/tutorial/essential/io/serialization.html)`},
        {
          id: 'java-5',
          question: 'Généricité',
          answer: "Paramétrer les types : `List<String>` garantit le type à la compilation, plus besoin de *caster*. Fonctionne par **type erasure** : les types génériques sont effacés au runtime (pas de `new T()` ni `instanceof T`).\n\nBornes : `<T extends Comparable<T>>` restreint le type, *wildcards* (`? extends T`, `? super T`) pour la flexibilité API. Indispensable — utilisé partout (`Collections`, `Stream`s, `Optional`).",
          example: "List<String> = que des String. Pas besoin de caster.",
        
          deepDive: `# La genericite en Java\\n\\n## Qu'est-ce que c'est ?\\n\\nLa genericite (generics) permet d'ecrire du code qui opere sur des types non-specifiques, decides a l'utilisation.\\n\\n## Probleme avant Java 5 — casts risqués\\n\\n\`\`\`java\\n// Sans generics - necessite un cast\\nList liste = new ArrayList();\\nliste.add("texte");\\nString s = (String) liste.get(0);  // OK\\n\\nliste.add(42);\\nString s2 = (String) liste.get(1);  // ClassCastException !\\n\`\`\`\\n\\n## Solution avec generics\\n\\n\`\`\`java\\nList<String> liste = new ArrayList<>();\\nliste.add("texte");\\nString s = liste.get(0);  // Pas de cast - type assure\\n\\n// liste.add(42);  // Erreur de compilation - 42 n'est pas un String\\n\`\`\`\\n\\n## Classes parametrees\\n\\n\`\`\`java\\npublic class Boite<T> {\\n    private T contenu;\\n\\n    public void mettre(T item) {\\n        this.contenu = item;\\n    }\\n\\n    public T obtenir() {\\n        return contenu;\\n    }\\n}\\n\\nBoite<String> boiteTextes = new Boite<>();\\nboiteTextes.mettre("Hello");\\nString texte = boiteTextes.obtenir();\\n\`\`\`\\n\\n## Types borne (Bounded types)\\n\\nLimiter les types avec \`extends\` :\\n\\n\`\`\`java\\npublic class Sommeur<T extends Number> {\\n    private T valeur;\\n\\n    public double asDouble() {\\n        return valeur.doubleValue();  // Toutes les sous-classes de Number ont cette methode\\n    }\\n}\\n\\nSommeur<Integer> s1 = new Sommeur<>();  // OK\\nSommeur<Double> s2 = new Sommeur<>();   // OK\\n// Sommeur<String> s3 = new Sommeur<>();  // Erreur\\n\`\`\`\\n\\n## Methodes generiques\\n\\n\`\`\`java\\npublic static <T> T premier(List<T> liste) {\\n    if (liste == null || liste.isEmpty()) return null;\\n    return liste.get(0);\\n}\\n\\nString p = premier(List.of("a", "b", "c"));  // String infere\\nInteger n = premier(List.of(1, 2, 3));    // Integer infere\\n\`\`\`\\n\\n## Wildcards\\n\\n### ? extends T — covariance (lecture seule)\\n\\n\`\`\`java\\npublic void afficher(List<? extends Number> liste) {\\n    for (Number n : liste) {\\n        System.out.println(n.doubleValue());  // Lecture OK\\n    }\\n    // liste.add(42);  // Erreur - pas d'ecriture\\n}\\n\`\`\`\\n\\n### ? super T — contravariance (ecriture possible)\\n\\n\`\`\`java\\npublic void ajouter(List<? super Integer> liste) {\\n    liste.add(42);  // OK - ecriture\\n    // Integer n = liste.get(0);  // Erreur - type inconnu\\n}\\n\`\`\`\\n\\n## Conventions de nommage\\n\\n| Lettre | Usage |\\n|--------|-------|\\n| \`T\` | Type (generique) |\\n| \`E\` | Element (collections) |\\n| \`K\` / \`V\` | Cle / Valeur (Map) |\\n| \`R\` | Resultat |\\n\\n## Type erasure\\n\\nLes generiques Java sont **effaces a la compilation** (type erasure). Le bytecode ne contient pas les types generiques :\\n\\n\`\`\`java\\nList<String> strings = new ArrayList<>();\\nList<Integer> nombres = new ArrayList<>();\\n\\nstrings.getClass() == nombres.getClass();  // true - les deux sont juste List\\n\`\`\`\\n\\nImplications :\\n- Pas de \`new T()\` — utiliser \`Class<T>\`\\n- Pas de \`instanceof T\`\\n- Les surcharges basees sur le type generique ne sont pas possibles\\n\\n## Bonnes pratiques\\n\\n1. **Utilisez les wildcards** pour les signatures de methodes qui ne produisent pas de T\\n2. **Prefererez ? extends T** pour la lecture, ? super T pour l'ecriture\\n3. **N'utilisez pas de raw types** — toujours specifier le type parametre\\n\\nSource : [Oracle Java Documentation - Generics](https://docs.oracle.com/javase/tutorial/java/generics/)`},
        {
          id: 'java-6',
          question: 'Classe finale / méthode finale',
          answer: "`final` sur une classe empêche l'héritage (ex. : `String` est finale pour garantir son **immuabilité**). `final` sur une méthode empêche la redéfinition dans les sous-classes, utile pour les comportements critiques qui doivent rester identiques.\n\n**Classe finale** = pas d'héritage, **méthode finale** = pas de redéfinition. Objectif : **sécurité** et **prévisibilité** du comportement.",
        
          deepDive: `# Classe finale et methode finale en Java\\n\\n## Classe finale — non heritable\\n\\nUne classe \`final\` ne peut pas avoir de sous-classes. Utilisez-la quand le comportement de sous-classement serait dangereux ou absurde.\\n\\n\`\`\`java\\npublic final class String {\\n    // String ne peut PAS etre heritee\\n    // Aucune classe ne peut etendre String\\n}\\n\\n// public class MaString extends String {}  // Erreur de compilation\\n\`\`\`\\n\\n### Quand utiliser une classe finale\\n\\n1. **Classes utility** qui ne doivent pas etre modifiees\\n2. **Immutabilite** desiree — une classe finale avec des champs finals est vraiment immutable\\n3. **Classes avec des invariants critiques** qui dependent d'un comportement specifique\\n\\n\`\`\`java\\npublic final class ConfigService {\\n    public static final String DEFAULT_API = "https://api.example.com";\\n\\n    private ConfigService() {}  // Pas de constructeur public - classe non instanciable\\n\\n    public static String getApiUrl() {\\n        return DEFAULT_API;\\n    }\\n}\\n\`\`\`\\n\\n## Methode finale — non surchargable\\n\\nUne methode \`final\` ne peut pas etre surchargee par une sous-classe. Elle garantit que le comportement de la methode ne changera jamais.\\n\\n\`\`\`java\\npublic class Parent {\\n    public final void afficher() {\\n        System.out.println("Parent.afficher()");\\n    }\\n\\n    public void pouvoirEtreSurcharge() {\\n        System.out.println("Parent.pouvoirEtreSurcharge()");\\n    }\\n}\\n\\npublic class Enfant extends Parent {\\n    // @Override\\n    // public void afficher() {}  // Erreur de compilation\\n\\n    @Override\\n    public void pouvoirEtreSurcharge() {\\n        System.out.println("Enfant.pouvoirEtreSurcharge()");\\n    }\\n}\\n\`\`\`\\n\\n### Quand utiliser une methode finale\\n\\n1. **Methodes qui font partie d'un contrat** — par exemple \`Object.equals()\`\\n2. **Methodes utilitaires** dont le comportement ne doit pas changer\\n3. **Methodes dans une classe non finale** ou vous voulez permettre l'heritage mais pas la surcharge\\n\\n\`\`\`java\\npublic class Document {\\n    private List<String> contenu = new ArrayList<>();\\n\\n    // methode finale car elle fait partie d'un contrat invariant\\n    public final Date getDateCreation() {\\n        return this.dateCreation;\\n    }\\n\\n    public void ajouterLigne(String ligne) {\\n        this.contenu.add(ligne);\\n    }\\n}\\n\`\`\`\\n\\n## Classe finale + methode finale = contrat figé\\n\\nQuand une classe est \`final\` et toutes ses methodes sont \`final\`, vous avez un **contrat immutable** :\\n\\n\`\`\`java\\npublic final class Temperature {\\n    public static final Temperature ABSOLU_ZERO = new Temperature(-273.15);\\n\\n    private final double celsius;\\n\\n    private Temperature(double celsius) {\\n        this.celsius = celsius;\\n    }\\n\\n    // Methode finale - comportement non modifiable\\n    public final double asCelsius() {\\n        return celsius;\\n    }\\n\\n    public final double asFahrenheit() {\\n        return celsius * 9/5 + 32;\\n    }\\n}\\n\\n// Aucun sous-classe possible, aucune methode ne peut etre surchargee\\n\`\`\`\\n\\n## Anti-patterns a eviter\\n\\n### 1. Classe finale avec des champs non finals\\n\\n\`\`\`java\\npublic final class MauvaisExemple {\\n    private int valeur;  // Peut changer - contradiction avec "final"\\n}\\n\`\`\`\\n\\nPour une vraie immutabilite, tous les champs doivent etre \`final\`.\\n\\n### 2. Heritage quand il n'est pas prevu\\n\\nSi vous pensez qu'une classe pourrait etre heritee un jour, **ne la rendez pas finale** des le debut. Il est plus facile de rendre quelque chose non-final que de retirer l'heritage apres.\\n\\n## Combinaison avec static\\n\\n\`\`\`java\\npublic final class Constants {\\n    private Constants() {}  // Constructeur prive - classe non instanciable\\n\\n    public static final String APP_NAME = "PrismPrep";\\n    public static final int MAX_RETRY = 3;\\n}\\n\`\`\`\\n\\n\`final\` sur une classe + constructeur prive = pattern singleton.\\n\\n## Resume\\n\\n| Modificateur | Effet | Usage |\\n|-------------|-------|-------|\\n| \`final class C\` | C ne peut pas etre heritee | Classes utility, immutabilite |\\n| \`final method()\` | Methode ne peut pas etre surcharge | Contrats invariants |\\n| \`final field\` | Valeur ne peut pas etre modifiee apres initialisation | Constantes, champs immuables |\\n\\nSource : [Oracle Java Documentation - Classes](https://docs.oracle.com/javase/tutorial/java/IandI/final.html)`},
        {
          id: 'java-7',
          question: 'try-with-resources',
          answer: "Depuis Java 7, déclarez les ressources implémentant **`AutoCloseable`** directement dans le `try` — Java les ferme automatiquement, même en cas d'exception. Plus besoin de bloc `finally` manuel.\n\nPlusieurs ressources possibles dans un même `try`. L'ordre de fermeture est **inverse** de la déclaration. __La manière moderne et recommandée de gérer les ressources en Java.__",
          code: 'try (FileInputStream fis = new FileInputStream("f.txt");\n     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {\n    String line = br.readLine();\n} // fermeture automatique',
          language: 'java',
        
          deepDive: `# try-with-resources en Java\\n\\n## Qu'est-ce que c'est ?\\n\\n\`try-with-resources\` est un mecanisme introduit dans Java 7 qui permet de declarer une ou plusieurs ressources qui seront fermees automatiquement a la fin du bloc, meme si une exception est jetee.\\n\\n## Syntaxe\\n\\n\`\`\`java\\ntry (Type1 res1 = new Type1(); Type2 res2 = new Type2()) {\\n    // utilisation des ressources\\n} catch (Exception e) {\\n    // gestion d'exception\\n}\\n\`\`\`\\n\\nLa ressource doit implementer l'interface \`AutoCloseable\`.\\n\\n## Exemple fondamental\\n\\n\`\`\`java\\n// Avant Java 7 — gestion manuelle fastidieuse\\nFileInputStream fis = null;\\ntry {\\n    fis = new FileInputStream("monfichier.txt");\\n    int data = fis.read();\\n} catch (IOException e) {\\n    e.printStackTrace();\\n} finally {\\n    if (fis != null) {\\n        try {\\n            fis.close();\\n        } catch (IOException e) {\\n            e.printStackTrace();\\n        }\\n    }\\n}\\n\\n// Avec try-with-resources\\ntry (FileInputStream fis = new FileInputStream("monfichier.txt")) {\\n    int data = fis.read();\\n} catch (IOException e) {\\n    e.printStackTrace();\\n}\\n// fis.close() appele automatiquement\\n\`\`\`\\n\\n## Multiples ressources\\n\\n\`\`\`java\\ntry (\\n    FileInputStream fis = new FileInputStream("fichier.txt");\\n    BufferedReader reader = new BufferedReader(new InputStreamReader(fis))\\n) {\\n    String ligne;\\n    while ((ligne = reader.readLine()) != null) {\\n        System.out.println(ligne);\\n    }\\n}  // Les deux sont fermees dans l'ordre inverse\\n\`\`\`\\n\\nLes ressources sont fermees dans l'ordre **inverse** de leur declaration.\\n\\n## Interface AutoCloseable\\n\\n\`\`\`java\\npublic interface AutoCloseable {\\n    void close() throws Exception;\\n}\\n\`\`\`\\n\\nToute classe qui implemente \`AutoCloseable\` peut etre utilisee dans un try-with-resources.\\n\\n\`\`\`java\\npublic class Connexion implements AutoCloseable {\\n    @Override\\n    public void close() {\\n        System.out.println("Connexion fermee");\\n    }\\n}\\n\\ntry (Connexion c = new Connexion()) {\\n    System.out.println("Utilisation de la connexion");\\n}\\n// "Connexion fermee" affiche automatiquement\\n\`\`\`\\n\\n## Suppression des exceptions\\n\\nQuand une exception est jetee dans le try et une autre dans le close(), la deuxieme est **supprimee** (surpressed). L'exception du try est propagate.\\n\\n\`\`\`java\\ntry (Resource r = new Resource()) {\\n    throw new RuntimeException("exception dans try");\\n}  // RuntimeException propagate, exception du close() surpressed\\n\\n// Pour recuperer les exceptions surpressees\\ntry {\\n    // ...\\n} catch (Exception e) {\\n    for (Throwable t : e.getSuppressed()) {\\n        System.err.println("Surpressed: " + t);\\n    }\\n}\\n\`\`\`\\n\\n## Capture de ressource avec variables finales\\n\\nDepuis Java 9, vous pouvez utiliser une variable pre-declaree :\\n\\n\`\`\`java\\nPath path = Paths.get("fichier.txt");\\n\\ntry (path) {  // path doit etre effective final\\n    Files.lines(path).forEach(System.out::println);\\n}\\n\`\`\`\\n\\n## Ressources et exceptions<br>\\n\\nLa methode \`close()\` est appelee meme si une exception est jetee. Si \`close()\` jette aussi une exception, elle est surpressede.\\n\\n## Bonnes pratiques\\n\\n1. **Toujours utiliser try-with-resources** pour les ressources qui implementent AutoCloseable\\n2. **Ne retournez jamais dans un try-with-resources** — le close automatique serait perturbe\\n3. **Evitez les ressources qui peuvent etre null** — verifiez avant\\n4. **Utilisez des classes wrapper** si vous avez besoin de personnaliser le comportement de close\\n\\n## Exemples de classes AutoCloseable\\n\\n- \`InputStream\`, \`OutputStream\`\\n- \`Reader\`, \`Writer\`\\n- \`Connection\` (JDBC)\\n- \`ResultSet\`, \`Statement\`\\n- \`Scanner\`\\n- \`Channel\`, \`ByteChannel\`\\n\\nSource : [Oracle Java Documentation - Try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html)`},
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
        
          deepDive: `# Garbage Collection en Java\\n\\n## Qu'est-ce que c'est ?\\n\\nLe Garbage Collector (GC) est un mecanisme automatique de Java qui libere la memoire prise par des objets qui ne sont plus references. Plus besoin de faire \`delete\` comme en C++.\\n\\n## Le probleme de la memoire manuelle\\n\\n\`\`\`cpp\\n// C++ - gestion manuelle\\nMyObject* obj = new MyObject();\\n// ... utiliser obj\\ndelete obj;  // Oublier = fuite memoire\\n// Utiliser apres delete = corruption memoire\\n\`\`\`\\n\\n\`\`\`java\\n// Java - gestion automatique\\nMyObject obj = new MyObject();\\n// ... utiliser obj\\nobj = null;  // L'objet devient eligible pour le GC\\n// Pas de delete - le GC s'en occupe\\n\`\`\`\\n\\n## Comment le GC detecte-t-il les objets inutiles ?\\n\\nUn objet est eligible pour le GC quand **plus aucune reference active** ne pointe vers lui.\\n\\n\`\`\`java\\npublic class Exemple {\\n    void methode() {\\n        Object obj = new Object();  // reference vers l'objet\\n        obj = null;  // Plus aucune reference - eligible pour GC\\n    }\\n}\\n\`\`\`\\n\\n## Generation de memoire (Hotspot)\\n\\nLa JVM utilise un система generatif qui divise la memoire selon la duree de vie des objets :\\n\\n| Generation | Description | Utilisation |\\n|-----------|-------------|-------------|\\n| **Young Generation** | Objets nouveaux | Eden + 2 Survivor spaces (S0, S1) |\\n| **Old Generation** | Objets longue duree | Tenured space |\\n| **Metaspace** | Meta-informations des classes | Depuis Java 8 (remplace PermGen) |\\n\\n### Cycle de vie d'un objet\\n\\n\`\`\`\\n[new Object()] → Eden → Survivor S0 → Survivor S1 → Old Generation → GC\\n\`\`\`\\n\\nQuand Eden est plein, un **Minor GC** se produit. Les objets vivnats sont deplaces vers Survivor spaces.\\n\\nQuand Old Generation est plein, un **Full GC** (Major GC) se produit - plus lent et blocant.\\n\\n## Types de Garbage Collectors\\n\\n### Serial GC (-XX:+UseSerialGC)\\n- Un seul thread\\n- Stop-the-world (STW) pendant le GC\\n- Pour machines mono-core ou petit footprint\\n\\n### Parallel GC (-XX:+UseParallelGC)\\n- Plusieurs threads (parallel)\\n- Par defaut sur serveur\\n- STW mais plus rapide\\n\\n### CMS GC (-XX:+UseConcMarkSweepGC)\\n- Concurrent Mark Sweep\\n- Threads en parallele avec l'application\\n- Deprecated depuis Java 9\\n\\n### G1 GC (-XX:+UseG1GC)\\n- Garbage First\\n- Par defaut depuis Java 9\\n- Divise la memoire en regions\\n- Meilleure latence\\n\\n### ZGC (-XX:+UseZGC)\\n- Very low latency\\n- Concurrent compacting\\n- Pour tres grandes memoires\\n\\n### Shenandoah (depuis Java 12)\\n- Concurrent compacting\\n- Pauses STW independantes de la taille du heap\\n\\n## Comment choisir le GC\\n\\n\`\`\`bash\\n# Utiliser G1 (par defaut moderne)\\njava -XX:+UseG1GC -jar monapp.jar\\n\\n# Pour faible latence\\njava -XX:+UseZGC -jar monapp.jar\\n\\n# Pour tres gros heap (>100GB)\\njava -XX:+UseZGC -Xmx128G -jar monapp.jar\\n\`\`\`\\n\\n## Monitoring du GC\\n\\n\`\`\`bash\\n# Voir les options GC\\njava -XX:+PrintCommandLineFlags -version\\n\\n# Activer les logs GC\\njava -Xlog:gc*=info:file=gc.log -jar monapp.jar\\n\\n# Analyser avec jstat\\njstat -gcutil <pid> 1000  # toutes les secondes\\n\`\`\`\\n\\n## Recommandations\\n\\n1. **Dimensionnez le heap correctement** — \`-Xms\` et \`-Xmx\` egaux pour eviter les resizing\\n2. **Surveillez la ratio de promotion** — si beaucoup d'objets passent rapidement a Old, augmentez le heap young\\n3. **Choisissez le GC selon votre cas** — throughput vs latency\\n4. **Evitez les allocations courtes superflues** — objets temporaires qui saturent le young\\n\\nSource : [Oracle Java Documentation - Garbage Collection](https://docs.oracle.com/javase/tutorial/essential/environment/garbage.html)`},
        {
          id: 'java-9',
          question: 'StackOverflowError vs OutOfMemoryError',
          answer: "**`StackOverflowError`** : la pile d'exécution est pleine, typiquement par récursion infinie (stack ~512Ko-1Mo). **`OutOfMemoryError`** : le tas (*heap*) est saturé, par exemple une liste qui grandit indéfiniment.\n\n`StackOverflow` se diagnostique facilement via la trace d'appels ; `OutOfMemory` nécessite souvent un profiling (`JVisualVM`, `Eclipse MAT`). En production : `-Xmx` pour le heap, `-Xss` pour la stack.",
        
          deepDive: `# StackOverflowError vs OutOfMemoryError\\n\\n## StackOverflowError\\n\\nSe produit quand la **pile d'execution** (call stack) depasse sa taille maximale. Generalement cause par une recursion infinie.\\n\\n### Cause typique — recursion infinie\\n\\n\`\`\`java\\npublic class RecursionInfinie {\\n    public int factorielle(int n) {\\n        return n * factorielle(n - 1);  // Pas de cas de base\\n    }\\n}\\n\\nnew RecursionInfinie().factorielle(1);  // StackOverflowError\\n\`\`\`\\n\\n### Solution — cas de base ou iteration\\n\\n\`\`\`java\\npublic int factorielle(int n) {\\n    if (n <= 1) return 1;  // Cas de base\\n    return n * factorielle(n - 1);\\n}\\n\\n// Ou version iterative (pas de stack overflow)\\npublic int factorielleIteratif(int n) {\\n    int result = 1;\\n    for (int i = 2; i <= n; i++) {\\n        result *= i;\\n    }\\n    return result;\\n}\\n\`\`\`\\n\\n### Autres causes\\n\\n- Recursion mutuelle (A appelle B, B appelle A)\\n- Methodes avec trop de variables locales\\n- Deep nested method calls (mauvais design)\\n\\n## OutOfMemoryError\\n\\nSe produit quand la **heap** ne peut plus allouer d'objets. Signifiegeneralement une fuite memoire ou un dimensionnement insuffisant.\\n\\n### Cause typique — fuite memoire\\n\\n\`\`\`java\\nList<Object> liste = new ArrayList<>();\\n\\nwhile (true) {\\n    liste.add(new Object());  // Ne jamais liberer\\n}\\n\`\`\`\\n\\n### Cause typique — allocation excessive\\n\\n\`\`\`java\\n// Charger un gros fichier en memoire\\nbyte[] toutLeFichier = Files.readAllBytes(Paths.get("grosfichier.txt"));  // OOM si fichier > heap\\n\`\`\`\\n\\n### Solution — dimensionner correctement\\n\\n\`\`\`bash\\n# Lancer avec assez de heap\\njava -Xms256m -Xmx2g -jar monapp.jar\\n\\n# Pour diagnostiquer\\njava -XX:+HeapDumpOnOutOfMemory -XX:HeapDumpPath=/tmp/dump.hprof -jar monapp.jar\\n\`\`\`\\n\\n### Types de OutOfMemoryError\\n\\n| Type | Cause | Solution |\\n|------|-------|----------|\\n| \`Java heap space\` | Trop d'objets crees | Augmenter heap, corriger fuites |\\n| \`GC overhead limit exceeded\` | GC passe trop de temps | Augmenter heap, optimier allocations |\\n| \`Unable to allocate\` | Memoire native saturee | Reduire heap, fermer ressources |\\n| \`Metaspace\` | Trop de classes chargees | Augmenter Metaspace |\\n\\n## Comment debugger\\n\\n\`\`\`bash\\n# Voir l'etat de la memoire\\njstat -gc <pid>\\n\\n# Heap dump sur OOM\\njava -XX:+HeapDumpOnOutOfMemory -XX:HeapDumpPath=/tmp/dump.hprof -jar monapp.jar\\n\\n# Analyser avec JProfiler ou VisualVM\\njvisualvm --heapdump=/tmp/dump.hprof\\n\`\`\`\\n\\n## Prevention\\n\\n1. **Evitez la recursion** non contraintee — toujours un cas de base\\n2. **Surveillez les allocations** — ne chargez pas de gros fichiers en une fois\\n3. **Utilisez des WeakReference** pour les caches\\n4. **Profilez regulierement** avec jstat ou Java Mission Control\\n\\nSource : [Oracle Java Documentation - Common Problems](https://docs.oracle.com/javase/tutorial/essential/environment/problems.html)`},
        {
          id: 'java-10',
          question: 'Fuites mémoire en Java',
          answer: "Le GC nettoie les objets *inaccessibles*, mais pas les objets **oubliés dans des collections statiques**, les **listeners non désenregistrés**, les **cachées sans taille limite**, ou les **références vers des objets externes** non fermés (`Connection`, `Stream`).\n\nDétection : monitoring de la mémoire (`JVisualVM`, heap dump), tests de charge avec analyse de l'évolution du heap. __Prévention : toujours fermer les ressources, limiter les cachées, utiliser `WeakReference` quand approprié.__",
        
          deepDive: `# Fuites memoire en Java\\n\\n## Qu'est-ce que c'est ?\\n\\nUne fuite memoire (memory leak) se produit quand des objets ne sont plus utilises mais ne sont pas liberes par le Garbage Collector, accumulant de la memoire au fil du temps.\\n\\n## Causes frequentes\\n\\n### 1. References statiques\\n\\n\`\`\`java\\npublic class Cache {\\n    private static List<Object> cache = new ArrayList<>();\\n\\n    public static void ajouter(Object o) {\\n        cache.add(o);  // Grandit indefiniment\\n    }\\n}\\n\`\`\`\\n\\nLes champs \`static\` vivent toute la duree du programme.\\n\\n### 2. Collections mal gerees\\n\\n\`\`\`java\\nMap<Key, Value> cache = new HashMap<>();\\n\\npublic void put(Key k, Value v) {\\n    cache.put(k, v);  // Grandit sans limite\\n}\\n\`\`\`\\n\\nSolution : utiliser \`WeakHashMap\` ou un mecanisme d'eviction LRU.\\n\\n### 3. Listeners non retires\\n\\n\`\`\`java\\npublic class EventManager {\\n    private static List<Listener> listeners = new ArrayList<>();\\n\\n    public void addListener(Listener l) {\\n        listeners.add(l);\\n    }\\n}\\n\`\`\`\\n\\nOubli de \`removeListener()\` — fuite si des objets ne sont jamais desenregistres.\\n\\n### 4. ThreadLocal non nettoyage\\n\\n\`\`\`java\\npublic class MonThread implements Runnable {\\n    private static ThreadLocal<Connection> threadConnection = new ThreadLocal<>();\\n\\n    public void run() {\\n        threadConnection.set(creerConnection());\\n        // Si le thread est recycle sans remove(), fuite\\n    }\\n}\\n\`\`\`\\n\\nSolution : toujours appeler \`threadConnection.remove()\` dans un finally block.\\n\\n### 5. Ressources non fermees\\n\\n\`\`\`java\\npublic void lireFichier(String path) {\\n    FileInputStream fis = new FileInputStream(path);\\n    // Si exception avant close(), fuite\\n}\\n\\n// Solution : try-with-resources\\npublic void lireFichier(String path) {\\n    try (FileInputStream fis = new FileInputStream(path)) {\\n        // ...\\n    }\\n}\\n\`\`\`\\n\\n## Comment detecter\\n\\n### Heap dumps\\n\\n\`\`\`bash\\njmap -dump:format=b,file=heap.hprof <pid>\\n\\n# Ou au demarrage\\njava -XX:+HeapDumpOnOutOfMemory -XX:HeapDumpPath=/tmp/dump.hprof -jar monapp.jar\\n\`\`\`\\n\\n### Monitoring avec jstat\\n\\n\`\`\`bash\\njstat -gc <pid> 1000\\n\\n# Si Old generation grandit sans jamais redescendre — fuite probable\\n\`\`\`\\n\\n## Prevention\\n\\n1. **Evitez les champs static mutables**\\n2. **Utilisez des WeakReference** pour les caches\\n3. **Fermez toujours les ressources** (try-with-resources)\\n4. **Desenregistrez les listeners** quand ils ne sont plus utilises\\n5. **Nettoyez les ThreadLocal** dans un finally block\\n\\n## Exemple avec WeakHashMap\\n\\n\`\`\`java\\nimport java.util.WeakHashMap;\\n\\npublic class CacheFaible {\\n    private WeakHashMap<Key, Value> cache = new WeakHashMap<>();\\n\\n    public Value get(Key k) {\\n        return cache.get(k);\\n    }\\n\\n    public void put(Key k, Value v) {\\n        cache.put(k, v);\\n    }\\n}\\n\`\`\`\\n\\nLes entrees sont collectees quand la cle n'a plus d'autre reference.\\n\\nSource : [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/environment/understandingMemory.html)`},
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
        
          deepDive: `# Gestion des exceptions en Java\\n\\n## Hiérarchie des exceptions\\n\\n\`\`\`\\nThrowable\\n├── Error (erreurs systeme - ne pas catcher)\\n│   ├── OutOfMemoryError\\n│   └── StackOverflowError\\n└── Exception\\n    ├── RuntimeException (unchecked)\\n    │   ├── NullPointerException\\n    │   ├── IllegalArgumentException\\n    │   └── IndexOutOfBoundsException\\n    └── IOException (checked)\\n        ├── FileNotFoundException\\n        └── SQLException\\n\`\`\`\\n\\n## Checked vs Unchecked\\n\\n### Checked — obligatoir a catcher ou declarer\\n\\nLes exceptions checked doivent etre catcher ou declarées avec \`throws\`. Le compilateur les force.\\n\\n\`\`\`java\\npublic void lireFichier(String path) throws IOException {\\n    FileReader reader = new FileReader(path);\\n    reader.read();\\n    reader.close();\\n}\\n\`\`\`\\n\\n### Unchecked — optionnel\\n\\nLes RuntimeException n'ont pas besoin d'etre declarees. Elles indiquent generalement une erreur de programmation.\\n\\n\`\`\`java\\npublic int diviser(int a, int b) {\\n    return a / b;  // ArithmeticException si b == 0 — unchecked\\n}\\n\`\`\`\\n\\n## Try-catch-finally\\n\\n\`\`\`java\\ntry {\\n    int resultat = diviser(10, 0);\\n} catch (ArithmeticException e) {\\n    System.err.println("Division par zero: " + e.getMessage());\\n} catch (Exception e) {\\n    System.err.println("Autre erreur: " + e.getMessage());\\n} finally {\\n    System.out.println("Toujours execute");\\n}\\n\`\`\`\\n\\n## Multi-catch\\n\\n\`\`\`java\\ntry {\\n    // operation qui peut echouer\\n} catch (IOException | ParseException e) {\\n    // Traite les deux memes de facon\\n    System.err.println("Erreur: " + e.getMessage());\\n}\\n\`\`\`\\n\\n## try-with-resources (preferable)\\n\\n\`\`\`java\\ntry (FileReader reader = new FileReader("fichier.txt")) {\\n    int c;\\n    while ((c = reader.read()) != -1) {\\n        System.out.print((char) c);\\n    }\\n} catch (IOException e) {\\n    System.err.println("Erreur de lecture: " + e.getMessage());\\n}\\n\`\`\`\\n\\n## Relancer une exception\\n\\n\`\`\`java\\npublic void methode1() {\\n    try {\\n        // operation risky\\n    } catch (IOException e) {\\n        // Log ou traitement\\n        throw new MonExceptionPersonnalise("details", e);  // Envelopper\\n    }\\n}\\n\`\`\`\\n\\n## Bonnes pratiques\\n\\n1. **Ne catcher pas trop largement** — \`catch (Exception e)\` masque les bugs\\n2. **Preferez try-with-resources** pour les ressources AutoCloseable\\n3. **Relancez avec contexte** — \`throw new SpecificException("message", cause)\`\\n4. **Ne loggez pas et relancez pas** — choisit un seul\\n5. **Evitez les exceptions pour le flux normal** — utilisez des codes de retour\\n\\nSource : [Oracle Java Documentation - Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/)`},
        {
          id: 'java-12',
          question: 'throw vs throws',
          answer: "**`throw`** lance explicitement une exception dans le code (ex. `throw new IllegalArgumentException()`). **`throws`** déclare dans la signature qu'une méthode peut lancer une exception — surtout pour les *checked exceptions*.\n\n`throws` sert de contrat : l'appelant doit attraper l'exception ou la redéclarer. C'est un mécanisme de **transparence** qui empêche d'ignorer les erreurs potentielles.",
          code: 'void verifier(int v) throws IllegalArgumentException {\n    if (v < 0) throw new IllegalArgumentException("Négatif");\n}',
          language: 'java',
        
          deepDive: `# throw vs throws en Java\\n\\n## throw — declencher une exception\\n\\n\`throw\` est utilise pour **declencher** (jeter) une exception explicitement.\\n\\n\`\`\`java\\npublic void verifierAge(int age) {\\n    if (age < 0) {\\n        throw new IllegalArgumentException("L'age ne peut pas etre negatif: " + age);\\n    }\\n    if (age > 150) {\\n        throw new IllegalArgumentException("Age invalide: " + age);\\n    }\\n}\\n\`\`\`\\n\\n### Creer sa propre exception\\n\\n\`\`\`java\\npublic class MontantInvalideException extends RuntimeException {\\n    public MontantInvalideException(String message) {\\n        super(message);\\n    }\\n}\\n\\npublic void traiterPaiement(double montant) {\\n    if (montant < 0) {\\n        throw new MontantInvalideException("Le montant ne peut pas etre negatif");\\n    }\\n}\\n\`\`\`\\n\\n## throws — declarer une exception\\n\\n\`throws\` declare qu'une methode **peut** lever des exceptions (signature de la methode).\\n\\n\`\`\`java\\npublic void lireFichier(String path) throws IOException {\\n    FileReader reader = new FileReader(path);  // Declare qu'elle peut lever IOException\\n    reader.read();\\n    reader.close();\\n}\\n\`\`\`\\n\\n### Declaration de plusieurs exceptions\\n\\n\`\`\`java\\npublic void maMethode() throws IOException, ParseException {\\n    // ...\\n}\\n\`\`\`\\n\\n## Difference fondamentale\\n\\n| Mot-cle | Role | Ou |\\n|---------|------|-----|\\n| \`throw\` | Declenche une exception | Dans le corps de la methode |\\n| \`throws\` | Declare les exceptions possibles | Dans la signature de la methode |\\n\\n## Exemple combine\\n\\n\`\`\`java\\npublic int lireEntier(String chemin) throws FileNotFoundException, IOException {\\n    FileReader reader = new FileReader(chemin);  // FileNotFoundException\\n    BufferedReader br = new BufferedReader(reader);\\n    String ligne = br.readLine();  // IOException\\n    br.close();\\n    return Integer.parseInt(ligne.trim());  // NumberFormatException — unchecked\\n}\\n\`\`\`\\n\\n## Erreurs courantes\\n\\n### 1. Confondre throw et throws\\n\\n\`\`\`java\\n// Erreur\\npublic void demo() {\\n    throw new Exception("message");  // Une methode ne peut pas "throw" une checked directement\\n}\\n\\n// Correct\\npublic void demo() throws Exception {\\n    throw new Exception("message");  // Declaration + declenchement\\n}\\n\`\`\`\\n\\n### 2. Oublier throws sur la methode appellante\\n\\n\`\`\`java\\npublic voidappelante() {\\n    try {\\n        lireFichier("test.txt");  // Erreur de compilation — declare IOException\\n    } catch (IOException e) {\\n        // OK\\n    }\\n}\\n\`\`\`\\n\\n## RuntimeException et throws\\n\\nLes RuntimeException (unchecked) n'ont pas besoin d'etre declarees avec \`throws\` :\\n\\n\`\`\`java\\npublic int diviser(int a, int b) throws RuntimeException {  // Inutile\\n    if (b == 0) {\\n        throw new ArithmeticException("Division par zero");\\n    }\\n    return a / b;\\n}\\n\\n// Mieux\\npublic int diviser(int a, int b) {  // Pas de throws necessaire\\n    if (b == 0) {\\n        throw new ArithmeticException("Division par zero");\\n    }\\n    return a / b;\\n}\\n\`\`\`\\n\\n## Resume\\n\\n- **\`throw\`** = je jette maintenant cette exception\\n- **\`throws\`** = cette methode peut lever cette exception (je la propage)\\n\\nSource : [Oracle Java Documentation - Exception Handling](https://docs.oracle.com/javase/tutorial/essential/exceptions/throwing.html)`},
        {
          id: 'java-13',
          question: 'Checked vs Unchecked',
          answer: "**Checked** : vérifiées à la compilation, le compilateur oblige à les gérer (`try-catch` ou `throws`) — ex. `IOException`, `SQLException`. Impossible de les ignorer.\n\n**Unchecked** (sous-classes de `RuntimeException`) : non vérifiées, représentent des erreurs de programmation — ex. `NullPointerException`.\n\nEn pratique : **checked** pour les erreurs métier prévisibles, **unchecked** pour les bugs de programmation.",
        
          deepDive: `# Checked vs Unchecked en Java\\n\\n## Difference fondamentale\\n\\n| Type | Obligation | Heritage | Exemples |\\n|------|------------|-----------|----------|\\n| **Checked** | catcher ou declarer | Exception (pas RuntimeException) | IOException, SQLException |\\n| **Unchecked** | optionnel | RuntimeException | NullPointerException, IllegalArgumentException |\\n\\n## Checked — le compilateur force\\n\\nLes checked exceptions doivent etre catcher ou declarees avec throws.\\n\\n\`\`\`java\\n// Erreur de compilation - IOException non geree\\npublic void lire() {\\n    FileReader reader = new FileReader("fichier.txt");\\n}\\n\\n// Correct - declaree\\npublic void lire() throws IOException {\\n    FileReader reader = new FileReader("fichier.txt");\\n}\\n\\n// Correct - catchee\\npublic void lire() {\\n    try {\\n        FileReader reader = new FileReader("fichier.txt");\\n    } catch (IOException e) {\\n        System.err.println("Fichier non trouve: " + e.getMessage());\\n    }\\n}\\n\`\`\`\\n\\n## Unchecked — le compilateur ignore\\n\\nLes RuntimeException et leurs sous-classes sont unchecked. Pas besoin de les declarer.\\n\\n\`\`\`java\\npublic int diviser(int a, int b) {\\n    if (b == 0) {\\n        throw new ArithmeticException("Division par zero");\\n    }\\n    return a / b;\\n}\\n\`\`\`\\n\\n## Quand utiliser quoi\\n\\n### Checked — erreurs recuperables\\n\\nPour des conditions previsibles que lappelant peut remedier :\\n\\n- Fichier non trouve\\n- Connexion BD perdue\\n- Donnees invalides\\n\\n### Unchecked — erreurs de programmation\\n\\nPour des bugs dans le code :\\n\\n- Argument null\\n- Valeur hors limites\\n- Violation de contrat\\n\\n## Bonnes pratiques\\n\\n1. Ne creez pas de checked exceptions pour des erreurs de programmation\\n2. Converissez les checked en unchecked quand lappelant ne peut pas remedier\\n3. Evitez les exceptions pour le flux normal\\n\\nSource : [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html)`},
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
        
          deepDive: `# Array vs ArrayList en Java\\n\\n## Difference fondamentale\\n\\n| Caracteristique | Array | ArrayList |\\n|----------------|-------|----------|\\n| Taille | Fixe aprs creation | Variable dynamiquement |\\n| Type | Primitif et Objet | Objet uniquement |\\n| Performance | Plus rapide | Legerement plus lent (autoboxing) |\\n| Syntaxe | \`Type[] arr = new Type[n]\` | \`ArrayList<Type> list = new ArrayList<>()\` |\\n\\n## Array — taille fixe\\n\\n\`\`\`java\\n// Declaration et allocation\\nString[] noms = new String[3];\\nnoms[0] = "Alice";\\nnoms[1] = "Bob";\\nnoms[2] = "Charlie";\\n\\n// Taille fixe - pas de add() possible\\n// noms[3] = "Diana";  // ArrayIndexOutOfBoundsException\\n\\n// Initialisation avec valeurs\\nint[] nombres = {1, 2, 3, 4, 5};\\n\`\`\`\\n\\n## ArrayList — taille variable\\n\\n\`\`\`java\\nimport java.util.ArrayList;\\n\\nArrayList<String> noms = new ArrayList<>();\\nnoms.add("Alice");   // Grandit automatiquement\\nnoms.add("Bob");\\nnoms.add("Charlie");\\nnoms.add("Diana");   // Pas de probleme - taille dynamique\\n\\n// Acces par index\\nString premier = noms.get(0);\\n\\n// Taille\\nint taille = noms.size();  // 4\\n\\n// Suppression\\nnoms.remove("Bob");  // Retire Bob\\n\`\`\`\\n\\n## Conversion entre Array et ArrayList\\n\\n\`\`\`java\\n// Array vers ArrayList\\nString[] tableau = {"a", "b", "c"};\\nArrayList<String> liste = new ArrayList<>(Arrays.asList(tableau));\\n\\n// ArrayList vers Array\\nArrayList<String> liste2 = new ArrayList<>();\\nliste2.add("x");\\nliste2.add("y");\\nString[] tableau2 = liste2.toArray(new String[0]);\\n\`\`\`\\n\\n## Quand utiliser quoi\\n\\n### Array - quand vous savez la taille\\n\\n- Taille connue a lavance et ne changera pas\\n- Performance critique (pas de surcout dynamique)\\n- Travail avec primitifs (int[], double[], etc.)\\n\\n\`\`\`java\\n// Matrice de 3x3 - taille fixee\\nint[][] matrice = new int[3][3];\\n\\n// Buffer de taille connue\\nbyte[] buffer = new byte[1024];\\n\`\`\`\\n\\n### ArrayList - quand la taille varie\\n\\n- Nombre delements imprévisible\\n- Ajouts et suppressions frequents\\n- Manipulation facile (add, remove, contains)\\n\\n\`\`\`java\\nArrayList<String> utilisateurs = new ArrayList<>();\\nutilisateurs.add("Alice");  // taille = 1\\nutilisateurs.add("Bob");     // taille = 2\\nutilisateurs.add("Charlie"); // taille = 3\\n\`\`\`\\n\\n## Pieges courants\\n\\n1. **Array de primitifs vs ArrayList** - ArrayList ne peut pas stocker \`int\` directement, il stocke \`Integer\` (autoboxing)\\n\\n\`\`\`java\\n// Mauvais - ArrayList ne peut pas stocker int\\nArrayList<int> integers = new ArrayList<>();  // Erreur\\n\\n// Correct\\nArrayList<Integer> integers = new ArrayList<>();\\n\`\`\`\\n\\n2. **Taille fixe des arrays** - essayer dutiliser un index hors limites lance une exception\\n\\nSource : [Oracle Java Documentation - Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)`},
        {
          id: 'java-15',
          question: 'ArrayList vs LinkedList',
          answer: "**`ArrayList`** (tableau dynamique) : accès par index O(1), insertion/suppression en milieu O(n), meilleure localité cachée. **`LinkedList`** (liste doublement chaînée) : insertion/suppression O(1) si on a le nœud, accès par index O(n).\n\nEn pratique, `ArrayList` est préférée dans 90% des cas grâce à l'accès rapide et la mémoire contiguë. `LinkedList` est pertinente pour les insertions/suppressions fréquentes en tête ou en milieu.",
        
          deepDive: `# ArrayList vs LinkedList en Java\\n\\n## Difference fondamentale\\n\\n| Operation | ArrayList | LinkedList |\\n|------------|-----------|------------|\\n| Acces par index | O(1) - Acces direct | O(n) - Parcours depuis debut |\\n| Ajout en fin | O(1) amorti | O(1) |\\n| Insertion au milieu | O(n) - Decalage | O(1) si position connue |\\n| Suppression | O(n) - Decalage | O(1) si position connue |\\n| Memoire | Contigu - moins de RAM | Noeuds chainés - plus de RAM |\\n\\n## ArrayList — acces rapide, modification lente au milieu\\n\\n\`\`\`java\\nimport java.util.ArrayList;\\n\\nArrayList<String> liste = new ArrayList<>();\\nliste.add("Alice");\\nliste.add("Bob");\\nliste.add("Charlie");\\n\\n// Acces par index - O(1)\\nString deuxieme = liste.get(1);  // "Bob" - tres rapide\\n\\n// Ajout en fin - O(1) amorti\\nliste.add("Diana");  // Rapide\\n\\n// Insertion au milieu - O(n)\\nliste.add(1, "Ben");  // Decale tous les elements apres l'index 1\\n\`\`\`\\n\\n## LinkedList — modification rapide, acces lent\\n\\n\`\`\`java\\nimport java.util.LinkedList;\\n\\nLinkedList<String> liste = new LinkedList<>();\\nliste.add("Alice");\\nliste.add("Bob");\\nliste.add("Charlie");\\n\\n// Acces par index - O(n)\\nString deuxieme = liste.get(1);  // "Bob" - doitle parcourir depuis le debut\\n\\n// Insertion au milieu - O(1) si on a un iterateur\\nListIterator<String> it = liste.listIterator(1);\\nit.add("Ben");  // Insertion directe sans decalage\\n\\n// Ajout en fin - O(1)\\nliste.add("Diana");  // Rapide\\n\`\`\`\\n\\n## Acces par index — demonstration\\n\\n\`\`\`java\\nArrayList<String> al = new ArrayList<>();\\nLinkedList<String> ll = new LinkedList<>();\\n\\n// Les deux ont 10 000 elements\\nfor (int i = 0; i < 10000; i++) {\\n    al.add("item" + i);\\n    ll.add("item" + i);\\n}\\n\\n// Acces a l'element 5000\\nal.get(5000);  // Instant - adresse memoire directe\\nll.get(5000);  // Doit parcourir 5000 noeuds\\n\`\`\`\\n\\n## Insertion — demonstration\\n\\n\`\`\`java\\nArrayList<String> al = new ArrayList<>();\\nLinkedList<String> ll = new LinkedList<>();\\n\\n// Ajout de 10 000 elements\\nfor (int i = 0; i < 10000; i++) {\\n    al.add(i, "item" + i);  // Decale tous les elements\\n    ll.add(i, "item" + i);  // Insertion directe\\n}\\n\`\`\`\\n\\n## Quand utiliser quoi\\n\\n### ArrayList - dans la plupart des cas\\n\\n- Acces frequel par index\\n- Ajouts en fin de liste\\n- Modification au milieu rare\\n\\n\`\`\`java\\nArrayList<String> noms = new ArrayList<>();\\nnoms.add("Alice");\\nnoms.add("Bob");\\nString troisieme = noms.get(2);  // Acces rapide\\n\`\`\`\\n\\n### LinkedList - cas speciaux\\n\\n- Insertions et suppressions frequentes au milieu ou au debut\\n- Mise en oeuvre de piles (Stack) ou files (Queue)\\n\\n\`\`\`java\\nLinkedList<String> pile = new LinkedList<>();\\npile.push("A");\\npile.push("B");\\npile.pop();  // Retire "B" - O(1)\\n\`\`\`\\n\\n## Performance comparaison\\n\\n\`\`\`java\\nimport java.util.*;\\n\\npublic class Comparaison {\\n    public static void main(String[] args) {\\n        int n = 100000;\\n\\n        // ArrayList - ajout en fin\\n        ArrayList<Long> al = new ArrayList<>();\\n        long debut = System.nanoTime();\\n        for (int i = 0; i < n; i++) al.add(i);\\n        System.out.println("ArrayList ajout fin: " + (System.nanoTime() - debut) / 1e6 + "ms");\\n\\n        // LinkedList - ajout en fin\\n        LinkedList<Long> ll = new LinkedList<>();\\n        debut = System.nanoTime();\\n        for (int i = 0; i < n; i++) ll.add(i);\\n        System.out.println("LinkedList ajout fin: " + (System.nanoTime() - debut) / 1e6 + "ms");\\n    }\\n}\\n\`\`\`\\n\\nSource : [Oracle Java Documentation - Collections](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)`},
        {
          id: 'java-16',
          question: 'String vs StringBuilder vs StringBuffer',
          answer: "**`String`** est **immuable** : chaque modification crée un nouvel objet — les concaténations en boucle sont catastrophiques en performance. **`StringBuilder`** : mutable avec buffer dynamique, idéal pour construire des chaînes en *single-thread*. **`StringBuffer`** : identique mais synchronisé (*thread-safe*), rarement nécessaire.\n\nRègle : `String` pour les constantes, `StringBuilder` pour la construction dynamique.",
        
          deepDive: `# String, StringBuilder et StringBuffer en Java

## Rappel fondamental

En Java, les chaines de caracteres sont **immuables** — une fois creees, elles ne peuvent pas etre modifiees. Toute operation de concatenation cree un nouvel objet.

## Le probleme avec String

\`\`\`java
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "element" + i;  // Creer 1000 objets String temporaires !
}
\`\`\`

Chaque += cree :
1. Un nouveau buffer String
2. La copie de lancien contenu
3. Lajout du nouveau texte
4. Le garbage collector doit recycler les anciens objets

**Performance : O(n2) en temps, O(n) en objets crees**

## StringBuilder — la solution performante

\`\`\`java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("element");
    sb.append(i);
}
String result = sb.toString();
\`\`\`

StringBuilder maintient un **buffer redimensionnable** :
- Append = ajout direct au buffer
- Pas de creation dobjets intermediaires
- **Performance : O(n) en temps, O(n) en espace**

## Constructeurs utiles

\`\`\`java
StringBuilder sb1 = new StringBuilder();           // Capacite par defaut : 16
StringBuilder sb2 = new StringBuilder(50);         // Capacite explicite
StringBuilder sb3 = new StringBuilder("Bonjour");   // Init avec contenu
\`\`\`

## Methodes principales

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");        // "Hello World"
sb.insert(5, ",");          // "Hello, World"
sb.delete(5, 6);            // "HelloWorld"
sb.replace(0, 5, "Hi");     // "HiWorld"
sb.reverse();               // "dlroW iH"
sb.length();                 // 7
sb.capacity();               // 23 (ou plus)
sb.ensureCapacity(100);      // Garantit min 100 de capacite
\`\`\`

## StringBuffer — thread-safe mais plus lent

\`\`\`java
StringBuffer sbf = new StringBuffer("Hello");
// Toutes les methodes sont synchronisees
sbf.append(" World");  // Thread-safe mais plus lent
\`\`\`

| Characteristique | String | StringBuilder | StringBuffer |
|-----------------|--------|---------------|--------------|
| Mutabilite | Immuable | Mutable | Mutable |
| Performance | Tres lente | Rapide | Plus lente (sync) |
| Thread-safe | Oui (immuable) | Non | Oui |
| Utilisation | Donnees statiques | Usage general | Acces multi-thread |

## Quand utiliser quoi

- **StringBuilder** : toute concatenation en boucle
- **String** : chaines statiques ou courtes concatenations uniques
- **StringBuffer** : contextes multi-thread (rare — preferez ConcurrentHashMap ou dautres approches)

## Pieges courants

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
    s = s + part;  // Creer un nouvel objet a chaque iteration
}

// BON
StringBuilder sb = new StringBuilder();
for (String part : parts) {
    sb.append(part);
}
String s = sb.toString();
\`\`\`

## Bonnes pratiques

1. **Utilisez StringBuilder** pour toute concatenation en boucle
2. **Utilisez String** pour les chaines courtes
3. **Speculez la capacite** si vous connaissez la taille : \`new StringBuilder(estimatedSize)\`

Source : [Oracle Java Documentation - Strings](https://docs.oracle.com/javase/tutorial/java/data/strings.html)`},
        {
          id: 'java-17',
          question: 'HashMap : fonctionnement interne',
          answer: "Structure **tableau de buckets** (taille par défaut 16). La clé est hashée via `hashCode()`, puis l'index du bucket est déterminé par `hash % capacity`. En cas de **collision** (même index), les entrées sont chaînées : liste chaînée ou **arbre rouge-noir** (depuis Java 8, si >8 éléments dans un bucket).\n\n**Rehashing** : quand le *load factor* (0.75 par défaut) est dépassé, le tableau double de taille et toutes les entrées sont redistribuées. __Bonnes pratiques : initialiser avec la capacité attendue, utiliser des clés immuables et de bons `hashCode()`/`equals()`.__",
          code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("clé", 42);\n// hashCode("clé") → hash → index du bucket\n// Si collision → liste chaînée ou arbre',
          language: 'java',
        
          deepDive: `# HashMap en Java

## Quest-ce que cest ?

HashMap est une structure de donnees qui stocke des paires **cle-valeur**. Elle utilise une fonction de hachage pour indexer les entrees, permettant des operations **O(1)** en moyenne.

## Creation et utilisation basique

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

## Fonctionnement interne — buckets et hashing

### Hashing de la cle

\`\`\`java
int hash = key.hashCode();  // Fonction de hachage native
int index = hash % capacity;  // Determine le bucket
\`\`\`

### Collision handling — chaining

Quand deux cles ont le meme hash, HashMap utilise des **linked lists** (ou arbres depuis Java 8) pour stocker les collisions.

### Performance et load factor

| Operation | Average | Worst case |
|-----------|---------|-------------|
| get/put | O(1) | O(n) |
| containsKey | O(1) | O(n) |
| iteration | O(n) | O(n) |

Le **load factor** (defaut 0.75) determine quand redimensionner. Un load factor plus bas = moins de collisions mais plus de memoire.

\`\`\`java
HashMap<String, String> map = new HashMap<>(16, 0.5f);  // Redimensionne a 50%
\`\`\`

## Nullite et clonage

\`\`\`java
HashMap<String, Integer> map = new HashMap<>();
map.put(null, 1);     // Une cle null autorisee
map.put("key", null); // Une valeur null autorisee

HashMap<String, Integer> copy = new HashMap<>(original);
\`\`\`

## Exemple de parcours

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

## HashMap vs Hashtable

| Caracteristique | HashMap | Hashtable |
|----------------|---------|-----------|
| Thread-safe | Non | Oui (sync) |
| Autorise null cle | Oui (1) | Non |
| Autorise null valeur | Oui | Non |
| Performance | Plus rapide | Plus lente (sync) |
| Introduit | Java 1.2 | Java 1.0 |

**Recommendation** : utilisez ConcurrentHashMap pour les environnements multi-thread.

## Bonnes pratiques

1. **Speculez la capacite** si vous connaissez le nombre delements : \`new HashMap<>(expectedSize * 2)\`
2. **Utilisez des cles immuables** — si la cle change son hashCode, la lookup echouera
3. **Evitez les objets complexes comme cles** — preerez Integer, String, Enum
4. **Utilisez computeIfAbsent** pour le lazy loading

Source : [Oracle Java Documentation - HashMap](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)`},
        {
          id: 'java-18',
          question: 'ConcurrentHashMap',
          answer: "Version **thread-safe** de `HashMap` sans verrouiller toute la structure. Divise la table en **segments** (Java 7) ou utilise des verrous au niveau des buckets individuels (Java 8+) : lectures sans verrou, écritures avec verrou fin.\n\nOpérations atomiques : `putIfAbsent()`, `computeIfAbsent()`, `merge()`. Performances bien supérieures à `Hashtable` ou `Collections.synchronizedMap()` en concurrence.\n\n__Choix par défaut pour les maps partagées entre threads.__",
          code: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.putIfAbsent("clé", 42);\nmap.computeIfAbsent("compteur", k -> 0);',
          language: 'java',
        
          deepDive: `# ConcurrentHashMap en Java

## Pourquoi ConcurrentHashMap ?

HashMap nest pas thread-safe. Hashtable est synchronise mais **bloque tout le tableau** pour chaque operation — catastrophique pour la performance. ConcurrentHashMap offre une synchronisation **fine** : chaque bucket est synchro independamment.

## Approche synchronisee vs ConcurrentHashMap

\`\`\`java
// Hashtable - un seul lock pour tout
Hashtable<String, Integer> ht = new Hashtable<>();
synchronized(ht) {
    ht.put(key, value);  // Tout le monde bloque
}

// ConcurrentHashMap - lock par bucket
ConcurrentHashMap<String, Integer> chm = new ConcurrentHashMap<>();
chm.put(key, value);  // Only buckets[index] bloque
\`\`\`

## Operations atomiques

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.putIfAbsent("key", 1);  // Ajoute seulement si absent
map.computeIfAbsent("key", k -> expensiveOperation());
map.merge("counter", 1, Integer::sum);  // Incrementation thread-safe
map.replace("key", 1, 2);  // Remplace seulement si valeur actuelle = 1
\`\`\`

## Acces et modifications concurrentes

\`\`\`java
ConcurrentHashMap<String, Integer> scores = new ConcurrentHashMap<>();

int score = scores.get("Alice");        // O(1), thread-safe
boolean exists = scores.containsKey("Bob");

scores.put("Charlie", 95);              // O(1) average
scores.remove("Alice");                 // O(1) average

scores.getOrDefault("Eve", 0);

// Iteration stable pendant modifications concurrentes
map.forEach((k, v) -> { /* ... */ });
\`\`\`

## Segmentation interne

Depuis Java 8, ConcurrentHashMap nutilise plus un tableau de segments fixes. Elle utilise un array de **buckets** avec des **locks par node** (plus fin que par bucket).

## Methodes specifiques

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.get("key");  // Lecture non-bloquante
map.putIfAbsent("key", 1);  // Ajoute si absent
map.remove("key", 1);       // Supprime si valeur = 1
map.replace("key", 1, 2);   // Remplace si valeur = 1
map.size();          // Approximatif en concurrent (rapide)
map.mappingCount();  // Retourne long (prefere)
\`\`\`

## Performance comparee

| Operation | HashMap | Hashtable | ConcurrentHashMap |
|-----------|---------|-----------|-------------------|
| get (single thread) | O(1) | O(1) | O(1) |
| get (multi thread) | Unsafe | O(1)* | O(1) |
| put (multi thread) | Unsafe | O(n)* | O(1) |

* serialise par synchronized

## Pattern: compteur partage

\`\`\`java
ConcurrentHashMap<String, AtomicInteger> counters = new ConcurrentHashMap<>();

counters.computeIfAbsent("page", k -> new AtomicInteger())
        .incrementAndGet();

int total = counters.values().stream()
    .mapToInt(AtomicInteger::get)
    .sum();
\`\`\`

## Bonnes pratiques

1. **Evitez les operations composees non atomiques** — utilisez \`remove(key, expectedValue)\` au lieu de check-then-remove
2. **Utilisez les methodes atomiques** — \`computeIfAbsent\`, \`merge\`, \`replace\`
3. **Nutilisez pas size() dans une boucle** — approximatif en concurrent, utilisez \`mappingCount()\`
4. **Iteration** — utilisez \`forEach\` au lieu de \`entrySet()\` pour eviter les ConcurrentModificationException

Source : [Oracle Java Documentation - ConcurrentHashMap](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)`},
        {
          id: 'java-19',
          question: 'Comparable vs Comparator',
          answer: "**`Comparable`** : définit l'ordre **naturel** d'une classe via `compareTo()` dans la classe elle-même. Un seul ordre possible.\n\n**`Comparator`** : définit un ordre **externe** via `compare()`, séparé de la classe. Plusieurs comparateurs possibles pour différents critères.\n\nUtilisez `Comparable` si l'ordre est évident et unique (`String` par ordre alphabétique). Utilisez `Comparator` pour des tris variés ou quand vous ne pouvez pas modifier la classe.",
          code: '// Comparable (ordre naturel)\nclass Person implements Comparable<Person> {\n    public int compareTo(Person p) { return name.compareTo(p.name); }\n}\n\n// Comparator (ordre externe)\nComparator<Person> parAge = Comparator.comparingInt(p -> p.age);',
          language: 'java',
        
          deepDive: `# Comparable vs Comparator en Java

## Concepts fondamentaux

- **Comparable** : defini comment un objet se compare a un **autre objet du meme type** (ordre naturel)
- **Comparator** : defini comment comparer deux objets **externement** (ordre personnalise)

## Comparable — ordre naturel

\`\`\`java
public class Etudiant implements Comparable<Etudiant> {
    private String nom;
    private int moyenne;

    public Etudiant(String nom, int moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

    @Override
    public int compareTo(Etudiant autre) {
        return Integer.compare(autre.moyenne, this.moyenne);  // Tri decroissant
    }
}

List<Etudiant> etudiants = new ArrayList<>();
Collections.sort(etudiants);  // Utilise compareTo()
\`\`\`

## Comparator — ordre personnalise

\`\`\`java
public class Etudiant {
    private String nom;
    private int moyenne;
}

Comparator<Etudiant> parMoyenne = (e1, e2) -> Integer.compare(e1.getMoyenne(), e2.getMoyenne());
Comparator<Etudiant> parNom = (e1, e2) -> e1.getNom().compareTo(e2.getNom());

etudiants.sort(parMoyenne);
etudiants.sort(parNom);

Collections.sort(etudiants, parNom);
\`\`\`

## Tri multi-criteres avec Comparator

\`\`\`java
Comparator<Etudiant> multiTri =
    Comparator.comparingInt(Etudiant::getMoyenne)
              .thenComparing(Etudiant::getNom);

etudiants.sort(multiTri);
\`\`\`

## Comparator.comparing factories (Java 8+)

\`\`\`java
List<Etudiant> tris = etudiants.stream()
    .sorted(Comparator.comparing(Etudiant::getMoyenne))
    .toList();

List<Etudiant> decroissant = etudiants.stream()
    .sorted(Comparator.comparing(Etudiant::getMoyenne).reversed())
    .toList();

Comparator<Etudiant> nullSafe = Comparator.nullsFirst(
    Comparator.comparing(Etudiant::getNom)
);
\`\`\`

## Comparaison: quand utiliser quoi

| Critere | Comparable | Comparator |
|---------|------------|------------|
| Qui definit lordre | La classe elle-meme | Classe externe |
| Nombre dordres possibles | Un seul (naturel) | Plusieurs (multiples comparators) |
| Modifie la classe | Oui | Non |
| Collections.sort | Oui (pas de deuxieme arg) | Oui (avec comparator) |

## Pieges courants

### 1. Violer la relation transitive

\`\`\`java
// MAUVAIS
public int compareTo(Etudiant autre) {
    if (this.moyenne != autre.moyenne)
        return this.moyenne - autre.moyenne;
    // Oubli dans certains cas...
}

// BON - inclure TOUS les criteres
public int compareTo(Etudiant autre) {
    int cmp = Integer.compare(this.moyenne, autre.moyenne);
    if (cmp != 0) return cmp;
    return this.nom.compareTo(autre.nom);
}
\`\`\`

### 2. Utiliser subtraction pour les entiers

\`\`\`java
// DANGEREUX - peut deborder
return this.prix - p.prix;

// SUR - utiliser Integer.compare
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

## Quest-ce que cest ?

Les **records** sont une nouvelle forme de classes avec une syntaxe compacte pour creer des classes de donnees **immuables**. Le compilateur genere automatiquement equals(), hashCode(), toString() et le constructeur.

## Declaration

\`\`\`java
// Avant Java 14 - classe traditionnelle
public class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }
    public int y() { return y; }
    @Override public String toString() { return "Point(x=" + x + ", y=" + y + ")"; }
    // equals, hashCode...
}

// Avec record - declaration en une ligne
public record Point(int x, int y) {}
\`\`\`

Le compilateur genere automatiquement :
- private final int x; et private final int y;
- Constructeur Point(int x, int y)
- Getters x() et y() (sans "get")
- toString() : Point[x=1, y=2]
- equals() et hashCode()

## Utilisation

\`\`\`java
Point p = new Point(10, 20);
int x = p.x();  // Pas de getX(), juste x()
int y = p.y();

Point p1 = new Point(1, 2);
Point p2 = new Point(1, 2);
p1.equals(p2);  // true - contenu identique

Map<Point, String> map = new HashMap<>();
map.put(new Point(1, 2), "centre");
\`\`\`

## Records avec validation

\`\`\`java
public record Temperature(double celsius) {
    public Temperature {
        if (celsius < -273.15) {
            throw new IllegalArgumentException("Temperature absolue negative!");
        }
    }
}

Temperature t = new Temperature(25.0);  // OK
Temperature invalid = new Temperature(-300);  // IllegalArgumentException
\`\`\`

## Records avec methodes

\`\`\`java
public record Temperature(double celsius) {
    public double toFahrenheit() {
        return celsius * 9/5 + 32;
    }

    public static Temperature fromFahrenheit(double f) {
        return new Temperature((f - 32) * 5/9);
    }

    public static Temperature ZERO_ABSOLU = new Temperature(-273.15);
}
\`\`\`

## Records vs Classes traditionnels

| Characteristique | Record | Class traditionnelle |
|----------------|--------|---------------------|
| Immutabilite | Native (final fields) | Manuelle |
| Constructeur | Auto-genere ou custom | Manual |
| Getters | Auto-genere (x() pas getX()) | Manual |
| equals/hashCode | Auto-genere | Manual |
| heritage | Ne peut pas heriter | Peut heriter |
| Peut etre subclass | Non (final par defaut) | Oui |

## Cas dutilisation recommands

\`\`\`java
// 1. DTO / Data Transfer Object
public record UtilisateurDTO(String nom, String email, int age) {}

// 2. Resultat de methodes multiples
public record OperationResult(boolean success, String message, Object data) {}

// 3. Cl Composite pour HashMap/HashSet
public record Coordonnees(int x, int y) {}

// 4. Configuration avec validation
public record AppConfig(String dbUrl, String dbUser, int maxConnections) {
    public AppConfig {
        if (maxConnections < 1) throw new IllegalArgumentException();
    }
}
\`\`\`

## Limites des records

\`\`\`java
// Un record ne peut pas :
// 1. Heriter dune classe
public record MonPoint(int x, int y) extends Shape { }  // ERREUR
// 2. Avoir des champs mutables - x et y sont implicitement final
// 3. Ajouter des attributs apres la declaration
public record Point(int x, int y) {
    private int z;  // ERREUR
}
\`\`\`

Source : [Oracle Java Documentation - Records](https://docs.oracle.com/javase/tutorial/record/)`},
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

## Quest-ce que cest ?

Une expression lambda est une **fonction anonyme** — un bloc de code que vous pouvez passer comme argument a une methode. Elles permettent un style de programmation **fonctionnel** plus concis.

## Syntaxe de base

\`\`\`java
// Syntaxe complete
Comparator<String> comp = (String a, String b) -> {
    return a.length() - b.length();
};

// Syntaxe simplifiee - infErence de type
Comparator<String> comp2 = (a, b) -> a.length() - b.length();

// Sans parametres
Runnable r = () -> System.out.println("Hello");

// Un seul parametre - parentheses optionnelles
ActionListener listener = e -> System.out.println("Clicked");
\`\`\`

## Method references

Les method references sont un shorthand pour les lambdas qui appellent une methode existante :

\`\`\`java
// Syntaxe: Classe::methodeInstance ou Classe::methodeStatic

// Methode dinstance
String::toUpperCase    // x -> x.toUpperCase()
System.out::println    // x -> System.out.println(x)

// Methode statique
Math::max              // (a, b) -> Math.max(a, b)

// Constructeur
ArrayList::new          // () -> new ArrayList()
\`\`\`

## Functional interfaces

Une lambda doit implementer une **interface fonctionnelle** (une seule methode abstraite) :

\`\`\`java
//java.util.function contient les plus courantes:

// Function<T, R> - transforme T en R
Function<String, Integer> toLength = String::length;

// Consumer<T> - consume T, ne retourne rien
Consumer<String> printer = System.out::println;

// Supplier<T> - fournit T
Supplier<LocalDateTime> now = LocalDateTime::now;

// Predicate<T> - test boolean sur T
Predicate<String> isLong = s -> s.length() > 10;
\`\`\`

## Closures et variables externs

Les lambdas peuvent **capturer** des variables de leur portee (closure). Les variables capturees doivent etre **effectively final** :

\`\`\`java
int facteur = 10;
List<Integer> resultats = nums.stream()
    .map(n -> n * facteur)  // Accede a facteur
    .toList();

// facteur = 20;  // ERREUR - facteur est effectively final
\`\`\`

## Composition de fonctions

\`\`\`java
Function<Integer, Integer> double = x -> x * 2;
Function<Integer, Integer> addTen = x -> x + 10;

Function<Integer, Integer> doubleThenAdd = double.andThen(addTen);
doubleThenAdd.apply(5);  // (5 * 2) + 10 = 20

Function<Integer, Integer> addThenDouble = double.compose(addTen);
addThenDouble.apply(5);  // (5 + 10) * 2 = 30
\`\`\`

## Predicates combines

\`\`\`java
Predicate<String> isLong = s -> s.length() > 5;
Predicate<String> hasA = s -> s.contains("a");

Predicate<String> longAndHasA = isLong.and(hasA);
Predicate<String> longOrHasA = isLong.or(hasA);
Predicate<String> notLong = isLong.negate();
\`\`\`

## Bonnes pratiques

1. **Preferer les method references** quand la lambda appelle une methode existante
   - list.stream().map(String::toUpperCase) au lieu de s -> s.toUpperCase()
2. **Eviter les lambdas trop longues** — extraire dans une methode
3. **Eviter les effets de bord dans les lambdas**

Source : [Oracle Java Documentation - Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)`},
        {
          id: 'java-22',
          question: 'Streams',
          answer: "Abstraction fonctionnelle pour traiter les collections. **Opérations intermédiaires** (`filter`, `map`, `sorted`) : retournent un `Stream`, sont *lazy*. **Opérations terminales** (`collect`, `forEach`, `reduce`) : déclenchent le pipeline et produisent un résultat.\n\n`parallelStream()` permet la parallélisation. Idéal pour les transformations de données déclaratives ; pour les boucles simples avec effets de bord, `for` reste plus approprié.",
          code: 'names.stream()\n     .filter(n -> n.startsWith("A"))\n     .forEach(System.out::println);',
          language: 'java',
        
          deepDive: `# Les Streams en Java

## Quest-ce que cest ?

Les Streams representent un **pipeline de donnees** pour traiter des collections de maniere fonctionnelle et declarative. Ils ne stockent pas de donnees — ils parcourent une source et appliquent des operations.

## Structure dun pipeline Stream

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

## Creation de Streams

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

## Operations intermediaires

### filter — garder les elements qui satisfont un predicat

\`\`\`java
List<Integer> pairs = nums.stream()
    .filter(n -> n % 2 == 0)
    .toList();
\`\`\`

### map — transformer chaque element

\`\`\`java
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .toList();

List<Integer> lengths = names.stream()
    .map(String::length)
    .toList();
\`\`\`

### flatMap — aplanir les collections imbriquees

\`\`\`java
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4), List.of(5));

List<Integer> flat = nested.stream()
    .flatMap(list -> list.stream())
    .toList();
\`\`\`

### distinct, sorted, limit, skip

\`\`\`java
List<Integer> uniques = avecDoublons.stream().distinct().toList();
List<String> trie = names.stream().sorted().toList();
List<Integer> page2 = nums.stream().skip(20).limit(20).toList();
\`\`\`

## Operations terminales

### collect — reunir les resultats

\`\`\`java
List<String> list = stream.collect(Collectors.toList());
Set<String> set = stream.collect(Collectors.toSet());
Map<String, Integer> map = stream.collect(Collectors.toMap(String::toUpperCase, String::length));
Map<Integer, List<String>> byLength = stream.collect(Collectors.groupingBy(String::length));
String joined = stream.collect(Collectors.joining(", "));
\`\`\`

### reduce — accumuler en une seule valeur

\`\`\`java
int sum = IntStream.of(1, 2, 3, 4, 5).reduce(0, (a, b) -> a + b);  // 15

String longest = Stream.of("apple", "banana", "cherry")
    .reduce("", (a, b) -> a.length() > b.length() ? a : b);  // "banana"
\`\`\`

### forEach

\`\`\`java
names.forEach(System.out::println);
names.forEach(name -> System.out.println("Hello " + name));
\`\`\`

## Paralleisme

\`\`\`java
list.parallelStream()
    .filter(...)
    .toList();
\`\`\`

**Quand utiliser le parallele** : grandes collections, operations coouteuses (CPU-bound). Pour de petites collections, le parallele est souvent plus lent.

## Bonnes pratiques

1. **Eviter les operations avec effets de bord** (forEach avec attribution)
2. **Ne pas reutiliser un Stream** — un stream ne peut etre consume quune fois
3. **Preferez les operations courtes** (filter avant map)
4. **Utilisez le parallele judicieusement**

Source : [Oracle Java Documentation - Streams](https://docs.oracle.com/javase/tutorial/streams/)`},
        {
          id: 'java-23',
          question: 'Optional',
          answer: "**`Optional`** : conteneur qui peut contenir ou non une valeur, introduit pour éviter les `NullPointerException`. Au lieu de `get()` risqué, on utilise `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n`Optional` rend explicite la possibilité d'absence de valeur. __Bonnes pratiques__ : utiliser uniquement comme type de retour, jamais comme champ ou paramètre, et __ne jamais retourner un `Optional` `null`__.",
          code: 'Optional<String> name = Optional.ofNullable(getName());\nname.ifPresent(System.out::println);',
          language: 'java',
        
          deepDive: `# Optional en Java

## Le probleme des null

Les references null causent des NullPointerException — lune des erreurs les plus courantes en Java. Optional est une approche fonctionnelle pour representer labsence de valeur.

\`\`\`java
// Probleme classique
String name = getName();
int length = name.length();  // NullPointerException si name est null

// Solution avec Optional
Optional<String> name = getNameOptional();
int length = name.orElse("").length();  // Pas de NPE
\`\`\`

## Creation dOptional

\`\`\`java
Optional<String> opt1 = Optional.of("value");        // NullPointerException si null
Optional<String> opt2 = Optional.ofNullable(null);   // Retourne empty Optional
Optional<String> empty = Optional.empty();
\`\`\`

## Inspection (sans exception)

\`\`\`java
Optional<String> opt = Optional.of("hello");

opt.isPresent();   // true
opt.isEmpty();      // false (Java 11+)

opt.ifPresent(value -> System.out.println("Value: " + value));

// get() - a eviter (jette NoSuchElementException si empty)
opt.get();  // "hello" - OK
Optional.empty().get();  // NoSuchElementException !
\`\`\`

## Extraction avec orElse

\`\`\`java
Optional<String> opt = Optional.ofNullable(possiblyNull);

String result = opt.orElse("default");  // "default" si empty
String result = opt.orElseGet(() -> computeDefault());  // Appele seulement si empty
String result = opt.orElseThrow(() -> new IllegalStateException("Value required"));
\`\`\`

## Transformation (sans condition)

\`\`\`java
Optional<User> user = findById(1);

Optional<String> name = user.map(User::getName);  // Optional<String>
Optional<String> email = user.flatMap(u -> u.getEmail());  // Optional<String>
Optional<User> adult = user.filter(u -> u.getAge() >= 18);
\`\`\`

## Chaining avec Optional

\`\`\`java
String city = employee.stream()
    .filter(e -> e.isTeamLead())
    .findFirst()
    .flatMap(TeamLead::getMother)
    .flatMap(Person::getAddress)
    .map(Address::getCity)
    .orElse("Unknown");
\`\`\`

## Optional dans les retourner de methodes

\`\`\`java
// Ancien style - null pour "pas de resultat"
User findById(int id) { return null; }  // NPE risque

// Nouveau style - Optional explicite
Optional<User> findById(int id) {
    return database.contains(id)
        ? Optional.of(database.get(id))
        : Optional.empty();
}
\`\`\`

## Bonnes pratiques

1. **Utilisez Optional pour les retours de methodes** qui peuvent ne pas avoir de resultat — jamais null
2. **Nutilisez pas Optional comme champ** (probleme de serialization)
3. **Nutilisez pas Optional pour les parametres** — preferez des surcharges
4. **PrEFerez orElseGet** quand le default est coUteux a calculer (lazy)

Source : [Oracle Java Documentation - Optional](https://docs.oracle.com/javase/tutorial/essential/env/misc.html)`},
        {
          id: 'java-24',
          question: 'Interface fonctionnelle',
          answer: "Interface avec **exactement une méthode abstraite** — condition nécessaire pour les expressions lambda. Annotation `@FunctionalInterface` (optionnelle mais recommandée) pour vérification compile-time.\n\nInterfaces fonctionnelles standard : `Predicate<T>` (test booléen), `Function<T,R>` (transformation), `Consumer<T>` (action sans retour), `Supplier<T>` (fabrication), `BiFunction<T,U,R>` (deux arguments).\n\nBase de toute la programmation fonctionnelle Java 8+. __Toute lambda nécessite une interface fonctionnelle.__",
          code: '@FunctionalInterface\npublic interface Calcul {\n    int operation(int a, int b);\n}\n\nCalcul add = (a, b) -> a + b;',
          language: 'java',
        
          deepDive: `# Les interfaces fonctionnelles en Java

## Quest-ce que cest ?

Une interface fonctionnelle est une interface avec **une seule methode abstraite**. Elle peut avoir des methodes par defaut ou statiques, mais une seule methode abstraite (SAM).

\`\`\`java
@FunctionalInterface
public interface Converter<T, R> {
    R convert(T input);

    default void log(String message) {
        System.out.println("Converter: " + message);
    }
}
\`\`\`

## Lannotation @FunctionalInterface

\`\`\`java
@FunctionalInterface
public interface Printable {
    void print(String content);
};

// Le compilateur verifie que linterface a exactement une methode abstraite
\`\`\`

## Interfaces fonctionnelles predefinies (java.util.function)

### Function<T, R> — transforme T en R

\`\`\`java
Function<String, Integer> strToInt = Integer::parseInt;
Function<String, String> f = s -> s.toUpperCase();
Function<String, String> g = s -> s + "!";
Function<String, String> composed = f.andThen(g);  // s -> f(s) puis g(result)
composed.apply("hello");  // "HELLO!"
\`\`\`

### Consumer<T> — consume T, ne retourne rien

\`\`\`java
Consumer<String> printer = System.out::println;
Consumer<String> combined = printer.andThen(logger);
combined.accept("Test");  // Affiche "Test" puis "LOG: Test"
\`\`\`

### Supplier<T> — fournit T

\`\`\`java
Supplier<LocalDateTime> now = LocalDateTime::now;
Supplier<List<String>> listFactory = ArrayList::new;

LocalDateTime dt = now.get();
List<String> list = listFactory.get();
\`\`\`

### Predicate<T> — test booleen sur T

\`\`\`java
Predicate<String> isLong = s -> s.length() > 5;
Predicate<String> hasA = s -> s.contains("a");

Predicate<String> combined = isLong.and(hasA);
Predicate<String> orCombined = isLong.or(hasA);
Predicate<String> negated = isLong.negate();
\`\`\`

### UnaryOperator<T> et BinaryOperator<T>

\`\`\`java
UnaryOperator<Integer> double = n -> n * 2;
double.apply(5);  // 10

BinaryOperator<Integer> add = (a, b) -> a + b;
add.apply(3, 4);  // 7

BinaryOperator<Integer> max = Integer::max;
BinaryOperator<Integer> min = Integer::min;
\`\`\`

## Synthese: quand utiliser quoi

| Besoin | Interface | Example |
|--------|-----------|---------|
| Transformer T -> R | Function<T,R> | s -> s.length() |
| Consummer T (void) | Consumer<T> | s -> System.out.println(s) |
| Creer T | Supplier<T> | () -> new ArrayList<>() |
| Tester T (bool) | Predicate<T> | s -> s.isEmpty() |
| Deux T -> T | BinaryOperator<T> | Integer::sum |
| T -> T | UnaryOperator<T> | n -> n * 2 |

Source : [Oracle Java Documentation - Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)`},
        {
          id: 'java-25',
          question: 'Sealed Classes (Java 17)',
          answer: "Les **sealed classes** permettent de **restreindre les sous-classes** autorisées via `permits`. Contrairement aux `final` (aucune sous-classe) ou open (toutes), on contrôle précisément la hiérarchie.\n\nAvantage : le compilateur connaît toutes les implémentations possibles → **pattern matching exhaustif** dans les `switch`.\n\nComplémentaire des records pour modéliser des hiérarchies fermées. __Utile pour les ADT (Algebraic Data Types) et les modèles de domaine.__",
          code: 'public sealed class Forme permits Cercle, Rectangle, Triangle {}\npublic record Cercle(double rayon) extends Forme {}\npublic record Rectangle(double largeur, double hauteur) extends Forme {}',
          language: 'java',
        
          deepDive: `# Les Sealed Classes en Java (Java 17+)

## Motivation

Les sealed classes限制哪些类可以继承一个类或实现一个接口。通过明确列出允许的子类，编译器可以：

1. **Garantir lexhaustivite** dans les expressions switch
2. **Ameliorer la securite** des types en empechant les implementations non autorisees
3. **Modeliser des choix fermees** (algebraic data types)

## Declaration

\`\`\`java
public sealed class Shape permits Circle, Rectangle, Triangle {
    // Classe abstraite par nature
}

// Les sous-classes doivent etre :
// - final (ne peut plus etre heritee)
// - sealed (heritee mais restriction)
// - non-sealed (heritage libre)
\`\`\`

### Les trois modificateurs pour les sous-classes

\`\`\`java
public sealed class Animal permits Dog, Cat, Bird {}

final class Dog extends Animal {}  // Choix termine

sealed class Cat extends Animal permits PersianCat, SiameseCat {}
final class PersianCat extends Cat {}
final class SiameseCat extends Cat {}

non-sealed class Bird extends Animal {}  // Heritage libre
class Eagle extends Bird {}
class Penguin extends Bird {}
\`\`\`

## Switch exhaustif avec sealed

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

Sans sealed, le compilateur ne peut pas verifier si tous les cas sont coveres.

## Exemple: State Machine pattern

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

## Sealed vs Enum vs Abstract

| Characteristique | Sealed | Enum | Abstract |
|----------------|--------|------|----------|
| Instances finies | Oui | Oui | Non |
| Donnees par instance | Oui | Limite | Oui |
| heritage controle | Oui | Non (immuable) | Non |
| instances multiples illimitees | Non | Non | Oui |

\`\`\`java
// Enum - cas fixes et sans donnees
enum Direction { NORTH, SOUTH, EAST, WEST }

// Sealed - cas avec etats
sealed interface Expr permits Literal, Binary, Unary {}

// Abstract - heritage libre
abstract class Shape { abstract double area(); }
\`\`\`

## Cas dutilisation typiques

1. **Algebraic Data Types** — modeliser des etats avec un nombre fini de variantes
2. **State Machines** — transitions detat avec verification compile-time
3. **Strategy Pattern ferme** — algorithmes fixes mais interchangeables

Source : [Oracle Java Documentation - Sealed Classes](https://docs.oracle.com/javase/tutorial/essential/concurrency/signals.html)`},
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

## Le probleme de la visibilite memoire

En Java multi-thread, chaque thread a sa propre **vision du cache CPU**. Une modification faite par un thread peut ne pas etre visible immediatement par les autres.

## volatile — visibilite garantie

volatile guarantees that **any thread reading the field will see the most recent write** made by any other thread.

\`\`\`java
public class SharedData {
    volatile boolean ready = false;
    volatile int count = 0;
}

// Thread 1                       // Thread 2
shared.ready = true;              while (!shared.ready) { }  // Sortira de la boucle
shared.count = 42;                System.out.println(shared.count);  // Affichera 42
\`\`\`

### Ce que volatile garantit

1. **Visibilite immediate** — toute ecriture est visible par les lectures suivantes
2. **Pas de reordering** — le compilateur/CPU ne reorganisera pas les operations volatile

### Ce que volatile ne garantit PAS

\`\`\`java
volatile int counter = 0;

// Thread 1                       // Thread 2
counter++;                        // Non thread-safe! counter++ est:
//   1. Lire counter (ex: 0)
//   2. Incrementer (0 -> 1)
//   3. Ecrire counter (1)
//   Si les deux threads font ++ en meme temps: 1 au lieu de 2
\`\`\`

## synchronized — exclusion mutuelle

synchronized garantit **atomicite** (operation non-interrompable) et **visibilite** :

\`\`\`java
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;  // Operation atomique - pas de race condition
    }

    public synchronized int getCount() {
        return count;
    }
}
\`\`\`

### Comment ca marche

Chaque objet Java a un **intrinsic lock**. Quand un thread entre dans un bloc synchronized, il acquiert le lock. Les autres threads sont bloques jusqua ce que le premier thread libere le lock.

\`\`\`java
synchronized (this) { /* Acces aux champs partages */ }
synchronized (Counter.class) { /* Acces aux champs static */ }

public synchronized void increment() { }  // Equivalent a synchronized(this)
\`\`\`

## Comparaison volatile vs synchronized

| Caracteristique | volatile | synchronized |
|----------------|----------|--------------|
| Visibilite inter-thread | Oui | Oui |
| Atomicite | Non | Oui |
| Bloquage | Non | Oui (acquire lock) |
| Performance | Tres rapide | Plus lent |
| Deadlock | Aucun | Possible |

## Cas dutilisation

### volatile — quand la lecture est souvent plus frequente que lecriture

\`\`\`java
private volatile boolean running = true;

public void stop() { running = false; }
public void run() {
    while (running) { /* Travail */ }
}
\`\`\`

### synchronized — operations composites sur des donnees partagees

\`\`\`java
private int counter = 0;

public void increment() {
    synchronized (this) {
        counter++;  // Lecture + increment + ecriture
    }
}
\`\`\`

## Alternatives modernes

\`\`\`java
// java.util.concurrent.atomic - operations atomiques sur primitives
private final AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();       // Thread-safe, non-blocking
counter.getAndIncrement();      // Lecture + increment
counter.compareAndSet(5, 10);   // Atomique: si == 5, alors = 10

AtomicLong counter2 = new AtomicLong(0);
counter2.incrementAndGet();
\`\`\`

## Bonnes pratiques

1. **volatile pour les flags** (stop, ready, initialized)
2. **synchronized pour les operations composites** (compteur++, check-then-act)
3. **Atomic* pour les compteurs** dans des environnements concurrentiels
4. **Eviter de synchroniser sur this** — utiliser un lock prive

Source : [Oracle Java Documentation - Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html)`},
        {
          id: 'java-27',
          question: 'ExecutorService & CompletableFuture',
          answer: "Le framework **Executor** (Java 5) remplace la gestion manuelle des threads : `ExecutorService` gère un pool de threads configurable (`FixedThreadPool`, `CachedThreadPool`, `ScheduledThreadPool`). On soumet des tâches via `submit()` et `invokeAll()`.\n\n**CompletableFuture** (Java 8) apporte la programmation asynchrone déclarative : chaînage avec `thenApply()`, `thenCompose()`, `thenAccept()`, combinaison avec `allOf()`/`anyOf()`, gestion d'erreurs avec `exceptionally()`/`handle()`.\n\nAvantages : pas de création manuelle de threads, pool réutilisable, callbacks non bloquants. __Règle : ne jamais créer de threads manuellement, toujours passer par l'ExecutorService.__",
          code: 'ExecutorService pool = Executors.newFixedThreadPool(4);\n\n// ExecutorService\npool.submit(() -> traiter(données));\n\n// CompletableFuture\nCompletableFuture\n    .supplyAsync(() -> fetchUser(id), pool)\n    .thenApply(user -> enrichir(user))\n    .thenAccept(result -> logger.info(result))\n    .exceptionally(ex -> { logger.error(ex); return null; });',
          language: 'java',
        
          deepDive: `# ExecutorService et CompletableFuture en Java

## Le probleme des Threads

Creer un thread par tache est inefficace. Les problemes : creation onereuse, pas de gestion centralisee, difficile a coordonner.

\`\`\`java
// MAUVAIS - un thread par tache
new Thread(() -> downloadFile(url)).start();
\`\`\`

## ExecutorService — pool de threads

\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(4);   // 4 threads
ExecutorService executor = Executors.newCachedThreadPool();   // Threads dynamiques
ExecutorService executor = Executors.newSingleThreadExecutor(); // 1 thread

executor.submit(() -> System.out.println("Task 1"));

executor.shutdown();
executor.shutdownNow();
executor.awaitTermination(10, TimeUnit.SECONDS);
\`\`\`

## ExecutorService avec return et exceptions

\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(2);

// Callable - retourne un resultat
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

## CompletableFuture — programmation asynchrone

CompletableFuture est un Future enrichi pour la composition et le chaining :

\`\`\`java
CompletableFuture<String> async = CompletableFuture.supplyAsync(() -> {
    return "Done";
});
\`\`\`

### Operations de transformation

\`\`\`java
CompletableFuture<String> cf = CompletableFuture
    .supplyAsync(() -> "hello");

CompletableFuture<Integer> length = cf.thenApply(String::length);
CompletableFuture<Void> displayed = cf.thenAccept(s -> System.out.println(s));
CompletableFuture<Integer> result = cf
    .thenApply(Integer::parseInt)
    .exceptionally(ex -> 0);
\`\`\`

### Combinaison de plusieurs CompletableFutures

\`\`\`java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = f1.thenCombine(f2, (a, b) -> a + " " + b);
CompletableFuture<Void> both = CompletableFuture.allOf(f1, f2);
CompletableFuture<Object> first = CompletableFuture.anyOf(f1, f2);
\`\`\`

## Exemple complet

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

## Thread pool strategies

\`\`\`java
// I/O bound - taches courtes et nombreuses
ExecutorService ioPool = Executors.newCachedThreadPool();

// CPU bound - taches longues
ExecutorService cpuPool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
\`\`\`

## Bonnes pratiques

1. **Specifiez toujours un ExecutorService** pour les operations async
2. **Shutdown quand lapplication finit** — sinon les threads restent actifs
3. **Utilisez thenCompose** au lieu de thenApply quand le resultat est un autre CompletableFuture
4. **Utilisez exceptionally** pour gerer centrally les erreurs

Source : [Oracle Java Documentation - Executors](https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html)`},
        {
          id: 'java-28',
          question: 'Réflexion',
          answer: "Capacité d'un programme à s'inspecter et se modifier au runtime : instancier via `Class.forName()`, invoquer des méthodes par nom, accéder aux champs `private` via `setAccessible(true)`.\n\nUtilisé par **Spring** (injection de dépendances, scan d'annotations) et **Hibernate** (mapping O/R). Inconvénients : plus lent, contourne la vérification de type et l'encapsulation, risque de sécurité. __Indispensable pour les frameworks, à éviter dans le code métier__.",
        
          deepDive: `# La reflexion en Java (Reflection API)

## Quest-ce que cest ?

La reflexion permet a un programme d**inspecter et manipuler** ses propres classes, methodes et champs a lexecution — meme ceux qui sont prives. Cest une forme dintrospection dynamique.

## Classes fondamentales

\`\`\`java
import java.lang.reflect.*;

Class<?> clazz = String.class;              // Via .class
Class<?> clazz = "hello".getClass();        // Via instance
Class<?> clazz = Class.forName("java.lang.String");  // Par nom
\`\`\`

## Inspection de classe

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

## Instantiation dynamique

\`\`\`java
Class<?> clazz = Class.forName("com.example.MyClass");

Constructor<?> ctor = clazz.getDeclaredConstructor(String.class, int.class);
Object obj = ctor.newInstance("Hello", 42);
\`\`\`

## Acces aux champs

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

## Acces aux methodes

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

## Usage legitime

### 1. Framework (Spring, Hibernate, JUnit)

\`\`\`java
// Spring utilise la reflexion pour injecter les dependances
@Autowired
private UserService userService;
\`\`\`

### 2. Jackson/Gson JSON mapping

\`\`\`java
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(myObject);
\`\`\`

### 3. JUnit test runners

\`\`\`java
@Test
public void myTest() { }  // JUnit trouve cette methode via reflexion
\`\`\`

## Risques et limitations

### 1. Performance degradee

\`\`\`java
// Linvocation par reflexion est plus lente que lappel direct
Method method = clazz.getMethod("doSomething", String.class);
method.invoke(obj, "test");  // Plus lent que obj.doSomething("test")
\`\`\`

### 2. Violation de lencapsulation

\`\`\`java
field.setAccessible(true);  // Acceder auchamp prive
field.set(obj, value);      // Modifier meme les finals
\`\`\`

### 3. Pas de compile-time checking

\`\`\`java
Method m = clazz.getMethod("doSomethng");  // typo - no error until runtime!
\`\`\`

## Bonnes pratiques

1. **Cachez les objets Method/Constructor** — ils coCutent cher a acquerir
2. **Utilisez setAccessible judicieusement** — seulement quand necessaire
3. **Limitez lusage** — la reflexion est un outil, pas un pattern de design
4. **Preferez les alternatives** quand possible (MethodHandle, Function, conteneur DI)

Source : [Oracle Java Documentation - Reflection](https://docs.oracle.com/javase/tutorial/reflect/)`},
        {
          id: 'java-29',
          question: 'Covariance des types de retour',
          answer: "La **covariance** (Java 5) permet à une sous-classe de retourner un sous-type du type de retour parent. Si `Animal.reproduire()` retourne `Animal`, `Chien.reproduire()` peut retourner `Chien` — le contrat est respecté car un `Chien` est un `Animal`.\n\nÇa évite les casts inutiles : directement `Chien c = new Chien().reproduire()`. Mécanisme qui rend le code *plus propre et plus sûr*.",
          code: 'class Animal { Animal reproduire() { ... } }\nclass Chien extends Animal {\n    @Override Chien reproduire() { ... }\n}',
          language: 'java',
        
          deepDive: `# Covariance et Contravariance en Java (Wildcards)

## Le probleme: pourquoi String nest pas un sous-type de Object dans les generiques

\`\`\`java
List<String> strings = new ArrayList<>();
// List<Object> objects = strings;  // ERREUR de compilation!
\`\`\`

Cest intentional — les generiques sont **invariants**. List<String> nest pas un sous-type de List<Object> car cela causerait des problemes :

\`\`\`java
List<String> strings = new ArrayList<>();
List<Object> objects = strings;  // Si c-etait autorise
objects.add(42);  // Ajouter un Integer dans une List<String> !
String s = strings.get(0);  // ClassCastException!
\`\`\`

## Les wildcards retablissent la variance

### ? extends T — covariance (lecture seule)

\`\`\`java
List<String> strings = List.of("a", "b");
List<? extends Object> objects = strings;  // OK

for (Object obj : objects) {
    System.out.println(obj);  // Tous les elements sont des Object
}

// Ecriture - INTERDITE
objects.add("hello");  // ERREUR
\`\`\`

### ? super T — contravariance (ecriture seule)

\`\`\`java
List<Object> objects = new ArrayList<>();
List<? super String> strings = objects;  // OK

strings.add("hello");  // OK - on peut ajouter des String
strings.add("world");  // OK

Object obj = strings.get(0);  // OK mais retourne Object
\`\`\`

## Tableau recapitulatif

| Wildcard | Direction | Lecture | Ecriture | Example |
|----------|------------|---------|----------|---------|
| ? extends T | Producer | OK (type T) | Interdit | List<? extends Number> |
| ? super T | Consumer | OK (type Object) | OK (type T) | List<? super Integer> |
| none | Both | OK | OK | List<Number> |

## Le principe PECS (Producer Extends, Consumer Super)

\`\`\`java
// Si la collection PRODUIT des donnees ( lecture ) -> ? extends T
public double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}

// Si la collection CONSOMME des donnees ( ecriture ) -> ? super T
public void addAll(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
\`\`\`

## En pratique: tri et comparateur

\`\`\`java
List<String> names = List.of("Alice", "Bob", "Charlie");
names.sort(Comparator.naturalOrder());

// Comparator<String> est un sous-type de Comparator<? super String>
// donc String peut etre compare avec un comparateur de super-types
\`\`\`

## Capture des wildcards

Le compilateur "capture" le type exact dun wildcard :

\`\`\`java
List<Integer> ints = new ArrayList<>();
ints.add(1);

List<? extends Number> numbers = ints;  // Capture le type exact (Integer)
Number n = numbers.get(0);  // Retourne Integer (captured)
\`\`\`

## Bonnes pratiques

1. **Utilisez ? extends T** pour les retours de methodes (producer)
2. **Utilisez ? super T** pour les parametres dentree (consumer)
3. **Nutilisez pas de wildcard** quand vous avez besoin des deux
4. **PrEFerez les bound explicites** : ? extends Number vs ?

Source : [Oracle Java Documentation - Generics](https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html)`},
        {
          id: 'java-30',
          question: 'Enum avancé',
          answer: "Les `enum` Java sont des **classes spéciales** : elles peuvent avoir des champs, constructeurs, méthodes et implémenter des interfaces. Chaque constante est une **instance unique**.\n\nCas d'usage avancés : associées à des valeurs/méthodes (`StatusCode.OK.code()`), *strategy pattern* natif (chaque constante implémente différemment une méthode abstraite), et **Singleton** via enum avec un seul élément.\n\nPlus sûres que des constantes entières : *type-safe*, impossibilité d'instancier, méthodes intégrées (`values()`, `valueOf()`).",
          code: 'public enum Status {\n    SUCCESS(200, "OK"),\n    NOT_FOUND(404, "Not Found");\n\n    private final int code;\n    private final String message;\n\n    Status(int code, String message) {\n        this.code = code;\n        this.message = message;\n    }\n}',
          language: 'java',
        
          deepDive: `# Les Enum avances en Java

## Enum basique vs Enum avance

\`\`\`java
// Enum simple
enum Direction { NORTH, SOUTH, EAST, WEST }

// Enum avance - avec champs, methodes, constructeur
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

## Enum comme singleton

\`\`\`java
public enum DatabaseConnection {
    INSTANCE;

    private String url;
    private Connection conn;

    public void connect() { /* ... */ }
}

DatabaseConnection.INSTANCE.connect();
\`\`\`

## Enum avec interface

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

## Enum avec etat et comportement

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

## EnumSet et EnumMap

\`\`\`java
import java.util.EnumSet;
import java.util.EnumMap;

EnumSet<Color> set = EnumSet.allOf(Color.class);
EnumSet<Color> set2 = EnumSet.of(Color.RED, Color.GREEN);
EnumSet<Color> set3 = EnumSet.range(Color.RED, Color.BLUE);

EnumMap<State, String> stateNames = new EnumMap<>(State.class);
stateNames.put(State.RUNNING, "En cours");
stateNames.put(State.STOPPED, "Arrete");
\`\`\`

## Bonnes pratiques

1. **Utilisez des enums pour les valeurs finies** — etats, directions, codes
2. **Ajoutez des fields et methods** pour enrichir la semantique
3. **Utilisez enum au lieu de int constants** — type-safe, switchable
4. **Evitez les enums avec des etats complexes** — considerer une classe separee

\`\`\`java
// Bien - enum
public enum Status { ACTIVE, INACTIVE }

// Bien - champs finals (immuable)
enum GoodPlanet {
    MERCURY(3.303e23);
    private final double mass;
    GoodPlanet(double mass) { this.mass = mass; }
}
\`\`\`

Source : [Oracle Java Documentation - Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)`},
      ],
    },
  ],
};