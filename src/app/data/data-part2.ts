export const part2Categories: InterviewCategory[] = [
  {
    id: 'java',
    title: 'Java',
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Java Core, Collections, Concurrence',
    sections: [
      {
        id: 'java-core',
        title: 'Fondamentaux',
        questions: [
          {
            id: 'java-1',
            question: "Modificateurs d'accès",
            answer: "Quatre niveaux du plus restrictif au plus ouvert : **`private`** (classe uniquement), **`default`/`package`** (même package), **`protected`** (package + sous-classes), **`public`** (accès total).\n\nLe principe est d'utiliser le niveau __le plus restrictif possible__ — un champ devrait presque toujours être `private` avec des *getters/setters*.",
          },
          {
            id: 'java-2',
            question: 'final vs finally vs finalize',
            answer: "**`final`** empêche la modification : variable non réassignable, méthode non redéfinissable, classe non étendue (ex. `String`). **`finally`** est un bloc qui s'exécute toujours après `try-catch`, idéal pour libérer les ressources. **`finalize`** est une méthode de `Object` appelée par le GC avant suppression — __dépréciée depuis Java 9__.\n\nOn utilise aujourd'hui `try-with-resources` ou `AutoCloseable` à la place.",
          },
          {
            id: 'java-3',
            question: 'Garbage Collection',
            answer: "Le **GC** libère automatiquement les objets non référencés. L'algorithme principal est **mark-and-sweep** : marquage des objets accessibles depuis les racines, puis suppression des non-marqués.\n\nLa **JVM** est organisée en générations : **Young Generation** (objets éphémères) et **Old Generation** (objets durables). On ne contrôle pas le moment de l'exécution du GC (`System.gc()` n'est qu'une suggestion). Mettre les références à `null` quand elles ne sont plus nécessaires aide le GC.",
          },
          {
            id: 'java-4',
            question: 'StackOverflowError vs OutOfMemoryError',
            answer: "**`StackOverflowError`** : la pile d'exécution est pleine, typiquement par récursion infinie (stack ~512Ko-1Mo). **`OutOfMemoryError`** : le tas (*heap*) est saturé, par exemple une liste qui grandit indéfiniment.\n\n`StackOverflow` se diagnostique facilement via la trace d'appels ; `OutOfMemory` nécessite souvent un profiling (`JVisualVM`, `Eclipse MAT`). En production : `-Xmx` pour le heap, `-Xss` pour la stack.",
          },
          {
            id: 'java-5',
            question: 'transient',
            answer: "**`transient`** exclut un champ de la sérialisation. Cas d'usage : données sensibles (mot de passe), champs calculables (recalculés à la désérialisation), références non sérialisables (évite `NotSerializableException`).\n\n\nÀ la désérialisation, le champ prend sa valeur par défaut (`null`, `0`…).",
          },
          {
            id: 'java-6',
            question: 'static',
            answer: "**`static`** signifie que le membre appartient à la classe, pas à l'instance. Une variable `static` est partagée entre toutes les instances ; une méthode `static` s'appelle sans instancier (ex. `Math.PI`). `this` est interdit dans un contexte `static`.\n\nUtile pour constantes, utilitaires, compteurs partagés. __À utiliser avec modération__ : trop de `static` = design procédural, et les méthodes `static` sont difficiles à *mocker*.",
            example: "Math.PI — pas besoin de new Math().",
          },
        ],
      },
      {
        id: 'java-exc',
        title: 'Exceptions & Concurrence',
        questions: [
          {
            id: 'java-7',
            question: 'Gestion des exceptions',
            answer: "**`try-catch-finally`** : le code risqué dans `try`, les erreurs dans `catch`, `finally` s'exécute toujours — idéal pour fermer les ressources.\n\nDepuis Java 7, **`try-with-resources`** est préférable : on déclare les ressources dans le `try` et Java les ferme automatiquement, même en cas d'exception. Plus propre et plus concis que les blocs `finally` manuels.",
            code: 'try {\n    Connection c = DriverManager.getConnection(url);\n} catch (SQLException e) {\n    System.err.println("Erreur: " + e.getMessage());\n} finally {\n    // fermer la connexion\n}',
            language: 'java',
          },
          {
            id: 'java-8',
            question: 'throw vs throws',
            answer: "**`throw`** lance explicitement une exception dans le code (ex. `throw new IllegalArgumentException()`). **`throws`** déclare dans la signature qu'une méthode peut lancer une exception — surtout pour les *checked exceptions*.\n\n`throws` sert de contrat : l'appelant doit attraper l'exception ou la redéclarer. C'est un mécanisme de **transparence** qui empêche d'ignorer les erreurs potentielles.",
            code: 'void verifier(int v) throws IllegalArgumentException {\n    if (v < 0) throw new IllegalArgumentException("Négatif");\n}',
            language: 'java',
          },
          {
            id: 'java-9',
            question: 'Checked vs Unchecked',
            answer: "**Checked** : vérifiées à la compilation, le compilateur oblige à les gérer (`try-catch` ou `throws`) — ex. `IOException`, `SQLException`. Impossible de les ignorer.\n\n**Unchecked** (sous-classes de `RuntimeException`) : non vérifiées, représentent des erreurs de programmation — ex. `NullPointerException`.\n\n\nEn pratique : **checked** pour les erreurs métier prévisibles, **unchecked** pour les bugs de programmation.",
          },
          {
            id: 'java-10',
            question: 'synchronized vs volatile',
            answer: "**`synchronized`** : verrouille un bloc/méthode pour un seul thread à la fois — offre *atomicité + visibilité* mais peut causer des **deadlocks**. **`volatile`** : force la lecture/écriture directe en mémoire principale — offre uniquement la *visibilité*, sans verrou.\n\n__Attention__ : `i++` n'est pas atomique même si `i` est `volatile`. En pratique : `volatile` pour les flags simples, `synchronized` pour les opérations composées nécessitant une cohérence forte.",
          },
        ],
      },
      {
        id: 'java-col',
        title: 'Collections & String',
        questions: [
          {
            id: 'java-11',
            question: 'ArrayList vs LinkedList',
            answer: "**`ArrayList`** (tableau dynamique) : accès par index O(1), insertion/suppression en milieu O(n), meilleure locality cache. **`LinkedList`** (liste doublement chaînée) : insertion/suppression O(1) si on a le nœud, accès par index O(n).\n\nEn pratique, `ArrayList` est préférée dans 90% des cas grâce à l'accès rapide et la mémoire contiguë. `LinkedList` est pertinente pour les insertions/suppressions fréquentes en tête ou en milieu.",
          },
          {
            id: 'java-12',
            question: 'Array vs ArrayList',
            answer: "**`Array`** : taille fixe, accepte les primitives, syntaxe crochets. **`ArrayList`** : taille dynamique, objets uniquement (*autoboxing* pour les primitives), méthodes `add`/`get`/`remove`.\n\n`ArrayList` est plus flexible et préférée dans la plupart des cas. `Array` reste utile pour les performances critiques ou les tailles connues à l'avance.",
          },
          {
            id: 'java-13',
            question: 'String vs StringBuilder vs StringBuffer',
            answer: "**`String`** est **immuable** : chaque modification crée un nouvel objet — les concaténations en boucle sont catastrophiques en performance. **`StringBuilder`** : mutable avec buffer dynamique, idéal pour construire des chaînes en *single-thread*. **`StringBuffer`** : identique mais synchronisé (*thread-safe*), rarement nécessaire.\n\n\nRègle : `String` pour les constantes, `StringBuilder` pour la construction dynamique.",
          },
        ],
      },
      {
        id: 'java-8',
        title: 'Java 8+',
        questions: [
          {
            id: 'java-14',
            question: 'Lambda expressions',
            answer: "Une **lambda** représente une **interface fonctionnelle** (une seule méthode abstraite) de manière concise : `(a, b) -> a.compareTo(b)` au lieu d'une classe anonyme.\n\n\nLiées aux `Stream`s, `Optional` et références de méthodes (`System.out::println`). Les variables capturées doivent être *effectivement final*. Les lambdas rendent le code plus **déclaratif** et *expressif*.",
            code: 'Calcul add = (a, b) -> a + b;\nadd.operation(5, 3);  // 8',
            language: 'java',
          },
          {
            id: 'java-15',
            question: 'Streams',
            answer: "Abstraction fonctionnelle pour traiter les collections. **Opérations intermédiaires** (`filter`, `map`, `sorted`) : retournent un `Stream`, sont *lazy*. **Opérations terminales** (`collect`, `forEach`, `reduce`) : déclenchent le pipeline et produisent un résultat.\n\n`parallelStream()` permet la parallélisation. Idéal pour les transformations de données déclaratives ; pour les boucles simples avec effets de bord, `for` reste plus approprié.",
            code: 'names.stream()\n     .filter(n -> n.startsWith("A"))\n     .forEach(System.out::println);',
            language: 'java',
          },
          {
            id: 'java-16',
            question: 'Optional',
            answer: "**`Optional`** : conteneur qui peut contenir ou non une valeur, introduit pour éviter les `NullPointerException`. Au lieu de `get()` risqué, on utilise `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n\n`Optional` rend explicite la possibilité d'absence de valeur. __Bonnes pratiques__ : utiliser uniquement comme type de retour, jamais comme champ ou paramètre, et __ne jamais retourner un `Optional` `null`__.",
            code: 'Optional<String> name = Optional.ofNullable(getName());\nname.ifPresent(System.out::println);',
            language: 'java',
          },
          {
            id: 'java-17',
            question: 'Singleton',
            answer: "Pattern garantissant une **seule instance** avec accès global. L'implémentation basique (*lazy* + constructeur privé) n'est **pas thread-safe**.\n\n\nTrois approches *thread-safe* : **synchronisation** (coûteuse), **holder statique** (*lazy* + *thread-safe* via chargement de classe), **`enum`** avec un seul élément (recommandé par Joshua Bloch — *thread-safe* + résiste à la sérialisation).",
            code: 'public class DbConn {\n    private static DbConn instance;\n    private DbConn() {}\n    public static DbConn get() {\n        if (instance == null) instance = new DbConn();\n        return instance;\n    }\n}',
            language: 'java',
          },
          {
            id: 'java-18',
            question: 'Généricité',
            answer: "Paramétrer les types : `List<String>` garantit le type à la compilation, plus besoin de *caster*. Fonctionne par **type erasure** : les types génériques sont effacés au runtime (pas de `new T()` ni `instanceof T`).\n\nBornes : `<T extends Comparable<T>>` restreint le type, *wildcards* (`? extends T`, `? super T`) pour la flexibilité API. Indispensable — utilisé partout (`Collections`, `Stream`s, `Optional`).",
            example: "List<String> = que des String. Pas besoin de caster.",
          },
          {
            id: 'java-19',
            question: 'Réflexion',
            answer: "Capacité d'un programme à s'inspecter et se modifier au runtime : instancier via `Class.forName()`, invoquer des méthodes par nom, accéder aux champs `private` via `setAccessible(true)`.\n\nUtilisé par **Spring** (injection de dépendances, scan d'annotations) et **Hibernate** (mapping O/R). Inconvénients : plus lent, contourne la vérification de type et l'encapsulation, risque de sécurité. __Indispensable pour les frameworks, à éviter dans le code métier__.",
          },
        ],
      },
    ],
  },
  {
    id: 'spring',
    title: 'Spring Boot',
    color: 'bg-green-100 text-green-700',
    description: 'Spring Boot, JPA, Sécurité',
    sections: [
      {
        id: 'sp-core',
        title: 'Fondamentaux',
        questions: [
          {
            id: 'sp-1',
            question: 'Avantages de Spring Boot',
            answer: "Cinq avantages clés : **auto-configuration** (détection des dépendances et configuration automatique des beans), **starters** (dépendances packagées par fonctionnalité), **serveur embarqué** (`java -jar` sans déploiement externe), **Actuator** (monitoring production), **convention over configuration** (valeurs par défaut sensées, tout surchargeable).\n\n\nSpring Boot passe de zéro à une app fonctionnelle en minutes.",
          },
          {
            id: 'sp-2',
            question: 'IoC et injection de dépendances',
            answer: "**Inversion of Control** : au lieu de créer les objets avec `new`, on délègue au conteneur Spring (cycle de vie complet). L'**injection de dépendances** réalise cette inversion : Spring fournit automatiquement les beans nécessaires via `@Autowired` (constructeur recommandé, setter ou champ).\n\n\nAvantages : **couplage faible** (dépendance vers les interfaces), implémentations interchangeables, tests facilités par l'injection de *mocks*.",
          },
          {
            id: 'sp-3',
            question: "C'est quoi un bean Spring ?",
            answer: "Un **bean Spring** est un objet géré par le conteneur : instanciation, configuration, injection et cycle de vie pris en charge par Spring. Déclaré via `@Component`, `@Service`, `@Repository` ou `@Controller`, il est créé dans l'`ApplicationContext` au démarrage.\n\n\nLa différence avec un objet `new` : un bean est sous la responsabilité de Spring, qui peut y appliquer des *aspects* (transactions, sécurité).",
          },
          {
            id: 'sp-4',
            question: 'Scopes des beans',
            answer: "**Singleton** (défaut) : une seule instance partagée — __ne pas stocker d'état mutable dedans__. **Prototype** : nouvelle instance à chaque demande. Web : **Request** (une instance par requête HTTP), **Session** (une instance par session).\n\n\n__Piège__ : injecter un *prototype* dans un *singleton* ne crée qu'une seule instance prototype — utiliser un *proxy scoped* ou `ObjectFactory`.",
          },
        ],
      },
      {
        id: 'sp-data',
        title: 'Données & Configuration',
        questions: [
          {
            id: 'sp-5',
            question: 'Spring Data JPA',
            answer: "Élimine le *boilerplate* CRUD : `JpaRepository` fournit `save`, `findById`, `findAll`, `delete` sans implémentation. Les **méthodes de requête dérivées** génèrent le JPQL depuis le nom (`findByEmail` → `WHERE email = ?`). `@Query` pour les requêtes complexes. Pagination et tri natifs via `Pageable`.\n\n__Attention aux requêtes inefficaces__ : relations *lazy* et problème **N+1**.",
            code: 'public interface UserRepo extends JpaRepository<User, Long> {\n    List<User> findByEmail(String email);\n}',
            language: 'java',
          },
          {
            id: 'sp-6',
            question: 'Configurer une BDD',
            answer: "Ajouter le starter JPA + le driver BDD, puis configurer dans `application.properties` : url, username, password, driver.\n\n\n`ddl-auto` : `update` (dev), `create-drop` (tests), `validate` (vérifie), `none` (production, avec **Flyway**/**Liquibase**). Pool **HikariCP** configuré via `maximum-pool-size` et `connection-timeout`. Quelques lignes suffisent pour une connexion prête à l'emploi.",
            code: 'spring.datasource.url=jdbc:mysql://localhost:3306/mabdd\nspring.datasource.username=root\nspring.datasource.password=secret\nspring.jpa.hibernate.ddl-auto=update',
            language: 'properties',
          },
          {
            id: 'sp-7',
            question: 'Auto-configuration',
            answer: "Au démarrage, Spring Boot scanne le *classpath* et configure automatiquement les beans selon les dépendances détectées (**Hibernate** → `EntityManagerFactory`, **spring-web** → Tomcat + MVC).\n\nRepose sur `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty` : l'auto-config s'active si les conditions sont remplies, et recule si vous définissez votre propre bean. Excluable via `@SpringBootApplication(exclude = ...)`.",
          },
          {
            id: 'sp-8',
            question: 'AOP',
            answer: "L'**AOP** gère les **préoccupations transversales** (logging, sécurité, transactions) sans polluer le code métier. Un **Aspect** contient le code commun, les **Pointcuts** définissent où l'appliquer.\n\n\nTypes d'*advice* : `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Around` (le plus puissant). Spring utilise des **proxys dynamiques** — __les appels internes (`this.methode()`) ne passent pas par le proxy__. `@Transactional` et `@Async` sont implémentés via AOP.",
            code: '@Aspect\n@Component\npublic class LogAspect {\n    @Before("execution(* com.example.service.*.*(..))")\n    public void log(JoinPoint jp) {\n        System.out.println("Appel: " + jp.getSignature());\n    }\n}',
            language: 'java',
          },
        ],
      },
      {
        id: 'sp-adv',
        title: 'Avancé',
        questions: [
          {
            id: 'sp-9',
            question: 'Spring Security',
            answer: "Framework d'**authentification** (« qui êtes-vous ? ») et d'**autorisation** (« que pouvez-vous faire ? »). Architecture : chaîne de filtres servlet interceptant chaque requête HTTP. `SecurityFilterChain` configurable via `HttpSecurity`.\n\nMécanismes : form login, Basic, **JWT**, **OAuth2**. Par défaut : CSRF, headers de sécurité, validation de session activés. Pour les APIs REST *stateless* avec JWT : __désactiver CSRF, session `STATELESS`__. Puissant mais courbe d'apprentissage raide.",
            code: '@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain chain(HttpSecurity http) throws Exception {\n        http.authorizeHttpRequests(a -> a\n            .requestMatchers("/public/**").permitAll()\n            .anyRequest().authenticated()\n        );\n        return http.build();\n    }\n}',
            language: 'java',
          },
          {
            id: 'sp-10',
            question: '@Transactional',
            answer: "**`@Transactional`** enveloppe l'exécution dans une transaction : commit si succès, **rollback automatique** sur `RuntimeException`/`Error` (configurable via `rollbackFor`). Implémenté via AOP — __les appels internes (`this.methode()`) ne sont pas interceptés__.\n\n\nPropagation par défaut : `REQUIRED` (rejoint la transaction existante ou en crée une nouvelle). Autres modes : `REQUIRES_NEW`, `NESTED`, `SUPPORTS`. Indispensable pour la cohérence des opérations BDD.",
            code: '@Transactional\npublic void transferer(Long from, Long to, double montant) {\n    compteDao.debiter(from, montant);\n    compteDao.crediter(to, montant);\n}',
            language: 'java',
          },
          {
            id: 'sp-11',
            question: '@Autowired / @Component / @Service / @Repository',
            answer: "`@Autowired` : injection automatique d'un bean (constructeur recommandé, setter ou champ). `@Component` : déclaration générique d'un bean. `@Service` : spécialisation pour la logique métier (valeur sémantique). `@Repository` : accès aux données + traduction automatique des exceptions SQL en `DataAccessException`.\n\n\nRègle : utiliser l'annotation __la plus spécifique possible__ pour la lisibilité.",
          },
          {
            id: 'sp-12',
            question: 'Profiling',
            answer: "Configurations différentes selon l'environnement (dev, test, prod). `@Profile('dev')` sur un bean : créé uniquement si le profil est actif. Fichiers `application-dev.properties` / `application-prod.properties` pour surcharger les propriétés.\n\nActivation : `--spring.profiles.active=prod` ou `SPRING_PROFILES_ACTIVE`. Indispensable pour gérer le cycle de vie sans dupliquer le code.",
          },
          {
            id: 'sp-13',
            question: 'Exceptions globales',
            answer: "`@ControllerAdvice` centralise la gestion des exceptions de tous les contrôleurs. `@ExceptionHandler` mappe chaque type d'exception à une réponse HTTP (`EntityNotFoundException` → 404, validation → 400).\n\nAvantages : réponses cohérentes, format d'erreur standardisé, plus de `try-catch` dispersés. On définit aussi un handler par défaut pour les exceptions imprévues (__500 sans détails techniques en prod__).",
            code: '@ControllerAdvice\npublic class GlobalExHandler {\n    @ExceptionHandler(UserNotFound.class)\n    public ResponseEntity<String> handle(UserNotFound e) {\n        return ResponseEntity.status(404).body(e.getMessage());\n    }\n}',
            language: 'java',
          },
        ],
      },
    ],
  },
  {
    id: 'angular',
    title: 'Angular',
    color: 'bg-red-100 text-red-700',
    description: 'Composants, services, routing',
    sections: [
      {
        id: 'ng-base',
        title: 'Concepts de Base',
        questions: [
          {
            id: 'ng-1',
            question: "C'est quoi Angular ?",
            answer: "Framework **Google** pour construire des **SPA** en **TypeScript**. Typage statique, autocomplétion IDE, détection d'erreurs à la compilation. Architecture imposée : composants, services, modules, routing intégré.\n\n**CLI** puissant pour la génération et le build. Inclut nativement HTTP client, formulaires, routing, i18n et framework de test. Choix solide pour les applications d'entreprise, malgré une courbe d'apprentissage plus raide que Vue ou React.",
          },
          {
            id: 'ng-2',
            question: 'Data Binding',
            answer: "Quatre formes de synchronisation modèle↔vue : **interpolation** `{{ expr }}` (modèle→vue), **property binding** `[prop]='val'` (modèle→vue dynamique), **event binding** `(event)='methode()'` (vue→modèle), **two-way binding** `[(ngModel)]='val'` (bidirectionnel, idéal pour les formulaires).\n\nPrivilégier le **one-way binding** : plus prévisible et plus facile à déboguer.",
            code: '<p>{{ nom }}</p>\n<img [src]="url">\n<button (click)="go()">OK</button>\n<input [(ngModel)]="user.nom">',
            language: 'html',
          },
          {
            id: 'ng-3',
            question: 'Services Angular',
            answer: "Classe `@Injectable` contenant la logique non liée à la vue : appels HTTP, état partagé, logique métier. Avec `providedIn: 'root'`, le service est un **singleton** partagé dans toute l'application.\n\nInjectable dans les composants via **DI**, facilement *mockable* pour les tests. Centraliser la logique dans les services évite la duplication entre composants.",
            code: '@Injectable({ providedIn: "root" })\nexport class UserService {\n    constructor(private http: HttpClient) {}\n    getUsers(): Observable<User[]> {\n        return this.http.get<User[]>("api/users");\n    }\n}',
            language: 'typescript',
          },
          {
            id: 'ng-4',
            question: 'Guards',
            answer: "Services contrôlant l'accès aux routes. **`CanActivate`** : autorise/bloque l'accès. **`CanDeactivate`** : confirmation avant de quitter (ex. formulaire modifié). **`CanLoad`** : empêche le chargement du module *lazy* (plus performant que `CanActivate`). **`Resolve`** : pré-charge les données avant affichage.\n\nRetournent `boolean`, `Promise` ou `Observable`. __Côté client uniquement — le backend doit toujours vérifier les autorisations__.",
          },
          {
            id: 'ng-5',
            question: 'Interceptors',
            answer: "Interceptent toutes les requêtes/réponses HTTP globalement. Cas d'usage : ajout automatique du **JWT** dans le header `Authorization`, gestion globale des 401 (redirect login), retry sur erreurs réseau, logging.\n\nImplémente `HttpInterceptor` avec `intercept(req, next)`. Les intercepteurs forment une **chaîne**. Indispensable pour centraliser la logique transversale des communications HTTP.",
            code: '@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n    intercept(req, next) {\n        const authReq = req.clone({\n            setHeaders: { Authorization: `Bearer ${token}` }\n        });\n        return next.handle(authReq);\n    }\n}',
            language: 'typescript',
          },
          {
            id: 'ng-6',
            question: 'Observables vs Promises',
            answer: "**Promise** : valeur future unique, *eager* (s'exécute dès la création), non annulable. **Observable** : flux de données *lazy* (s'exécute à l'abonnement), émet 0 à N valeurs, annulable via `unsubscribe()`.\n\nOffre des opérateurs puissants (`map`, `filter`, `debounceTime`, `switchMap`, `combineLatest`). Angular utilise les **Observables** partout : `HttpClient`, formulaires réactifs, routing. C'est le modèle de données central du framework.",
          },
          {
            id: 'ng-7',
            question: 'Lazy Loading',
            answer: "Charger les modules uniquement quand l'utilisateur navigue vers la route correspondante. Sans *lazy loading*, tout le bundle est chargé au premier accès. Avec, on utilise `loadComponent`/`loadChildren` avec import dynamique → *chunks* séparés.\n\nImpact : premier chargement plus rapide, meilleur **Time to Interactive** et score **Lighthouse**. On *lazy-load* tout ce qui n'est pas nécessaire à l'écran d'accueil. Indispensable pour les applications moyennes à grandes.",
          },
        ],
      },
    ],
  },
];