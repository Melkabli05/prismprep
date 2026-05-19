import type { InterviewCategory } from '../../../../core/models/interview.models';

export const springCategory: InterviewCategory = {
  id: 'spring',
  title: 'Spring Boot',
  color: 'background: var(--color-success); color: white',
  description: 'Spring Boot, JPA, Sécurité',
  sections: [
    {
      id: 'sp-fondamentaux',
      title: 'Fondamentaux',
      questions: [
        {
          id: 'sp-1',
          question: 'Avantages de Spring Boot',
          answer: "Cinq avantages clés : **auto-configuration** (détection des dépendances et configuration automatique des beans), **starters** (dépendances packagées par fonctionnalité), **serveur embarqué** (`java -jar` sans déploiement externe), **Actuator** (monitoring production), **convention over configuration** (valeurs par défaut sensées, tout surchargeable).\n\nSpring Boot passe de zéro à une app fonctionnelle en minutes.",
        },
        {
          id: 'sp-14',
          question: 'Spring vs Spring Boot',
          answer: "**Spring Framework** : conteneur IoC, injection de dépendances, AOP, gestion des transactions. Puissant mais nécessite beaucoup de configuration XML/Java.\n\n**Spring Boot** : couche au-dessus de Spring qui **auto-configure** tout. Plus besoin de XML, de serveur d'application externe, de configuration manuelle — les starters et l'auto-config font le travail.\n\nEn résumé : Spring = moteur, Spring Boot = voiture prête à rouler. __On n'utilise plus Spring sans Boot aujourd'hui.__",
        },
        {
          id: 'sp-2',
          question: 'IoC et injection de dépendances',
          answer: "**Inversion of Control** : au lieu de créer les objets avec `new`, on délègue au conteneur Spring (cycle de vie complet). L'**injection de dépendances** réalise cette inversion : Spring fournit automatiquement les beans nécessaires via `@Autowired` (constructeur recommandé, setter ou champ).\n\nAvantages : **couplage faible** (dépendance vers les interfaces), implémentations interchangeables, tests facilités par l'injection de *mocks*.",
        },
        {
          id: 'sp-3',
          question: "C'est quoi un bean Spring ?",
          answer: "Un **bean Spring** est un objet géré par le conteneur : instanciation, configuration, injection et cycle de vie pris en charge par Spring. Déclaré via `@Component`, `@Service`, `@Repository` ou `@Controller`, il est créé dans l'`ApplicationContext` au démarrage.\n\nLa différence avec un objet `new` : un bean est sous la responsabilité de Spring, qui peut y appliquer des *aspects* (transactions, sécurité).",
        },
        {
          id: 'sp-4',
          question: '@Autowired / @Component / @Service / @Repository',
          answer: "`@Autowired` : injection automatique d'un bean (constructeur recommandé, setter ou champ). `@Component` : déclaration générique d'un bean. `@Service` : spécialisation pour la logique métier (valeur sémantique). `@Repository` : accès aux données + traduction automatique des exceptions SQL en `DataAccessException`.\n\nRègle : utiliser l'annotation __la plus spécifique possible__ pour la lisibilité.",
        },
        {
          id: 'sp-5',
          question: 'Scopes des beans',
          answer: "**Singleton** (défaut) : une seule instance partagée — __ne pas stocker d'état mutable dedans__. **Prototype** : nouvelle instance à chaque demande. Web : **Request** (une instance par requête HTTP), **Session** (une instance par session).\n\n__Piège__ : injecter un *prototype* dans un *singleton* ne crée qu'une seule instance prototype — utiliser un *proxy scoped* ou `ObjectFactory`.",
        },
        {
          id: 'sp-6',
          question: 'Auto-configuration',
          answer: "Au démarrage, Spring Boot scanne le *classpath* et configure automatiquement les beans selon les dépendances détectées (**Hibernate** → `EntityManagerFactory`, **spring-web** → Tomcat + MVC).\n\nRepose sur `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty` : l'auto-config s'active si les conditions sont remplies, et recule si vous définissez votre propre bean. Excluable via `@SpringBootApplication(exclude = ...)`.",
        },
      ],
    },
    {
      id: 'sp-web',
      title: 'Web & API',
      questions: [
        {
          id: 'sp-15',
          question: '@RestController vs @Controller',
          answer: "**`@Controller`** : retourne une vue (template Thymeleaf, JSP). **`@RestController`** = `@Controller` + `@ResponseBody` sur toutes les méthodes — retourne directement du JSON/XML, pas de vue.\n\nPour les APIs REST, utilisez toujours `@RestController`. La sérialisation JSON est gérée par **Jackson** automatiquement (configurable via `@JsonProperty`, `@JsonIgnore`).",
          code: '@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) { ... }\n}',
          language: 'java',
        },
        {
          id: 'sp-16',
          question: '@PathVariable vs @RequestParam vs @RequestBody',
          answer: "**`@PathVariable`** : extrait une valeur de l'URL (`/users/{id}` → `id`). **`@RequestParam`** : extrait un paramètre de requête (`?name=dupont`). **`@RequestBody`** : désérialise le corps JSON dans un objet.\n\nRègle : `@PathVariable` pour les identifiants dans l'URL, `@RequestParam` pour les filtres et options, `@RequestBody` pour les données de création/mise à jour. __Pour les formulaires HTML, utilisez `@ModelAttribute`.__",
          code: '@PostMapping("/users")\npublic User create(@RequestBody UserDTO dto) { ... }\n\n@GetMapping("/users")\npublic List<User> search(@RequestParam String name) { ... }',
          language: 'java',
        },
        {
          id: 'sp-17',
          question: 'Validation des données (@Valid)',
          answer: "**Bean Validation** (JSR 380) via l'annotation `@Valid` sur le paramètre + les contraintes sur le DTO : `@NotNull`, `@Size(min=2)`, `@Email`, `@Pattern`, `@Min`, `@Max`.\n\nSi la validation échoue, Spring lance `MethodArgumentNotValidException` → à capturer dans le `@ControllerAdvice` pour renvoyer une **réponse 400** structurée avec les erreurs par champ.\n\n__Toujours valider côté serveur__, même si le frontend valide aussi. Ne jamais faire confiance au client.",
          code: 'public record UserDTO(\n    @NotBlank String nom,\n    @Email String email,\n    @Min(18) int age\n) {}\n\n@PostMapping\npublic User create(@Valid @RequestBody UserDTO dto) { ... }',
          language: 'java',
        },
      ],
    },
    {
      id: 'sp-donnees',
      title: 'Données & Configuration',
      questions: [
        {
          id: 'sp-7',
          question: 'Configurer une BDD',
          answer: "Ajouter le starter JPA + le driver BDD, puis configurer dans `application.properties` : url, username, password, driver.\n\n`ddl-auto` : `update` (dev), `create-drop` (tests), `validate` (vérifie), `none` (production, avec **Flyway**/**Liquibase**). Pool **HikariCP** configuré via `maximum-pool-size` et `connection-timeout`. Quelques lignes suffisent pour une connexion prête à l'emploi.",
          code: 'spring.datasource.url=jdbc:mysql://localhost:3306/mabdd\nspring.datasource.username=root\nspring.datasource.password=secret\nspring.jpa.hibernate.ddl-auto=update',
          language: 'properties',
        },
        {
          id: 'sp-8',
          question: 'Spring Data JPA',
          answer: "Élimine le *boilerplate* CRUD : `JpaRepository` fournit `save`, `findById`, `findAll`, `delete` sans implémentation. Les **méthodes de requête dérivées** génèrent le JPQL depuis le nom (`findByEmail` → `WHERE email = ?`). `@Query` pour les requêtes complexes. Pagination et tri natifs via `Pageable`.\n\n__Attention aux requêtes inefficaces__ : relations *lazy* et problème **N+1**.",
          code: 'public interface UserRepo extends JpaRepository<User, Long> {\n    List<User> findByEmail(String email);\n}',
          language: 'java',
        },
        {
          id: 'sp-9',
          question: 'Profiling',
          answer: "Configurations différentes selon l'environnement (dev, test, prod). `@Profile('dev')` sur un bean : créé uniquement si le profil est actif. Fichiers `application-dev.properties` / `application-prod.properties` pour surcharger les propriétés.\n\nActivation : `--spring.profiles.active=prod` ou `SPRING_PROFILES_ACTIVE`. Indispensable pour gérer le cycle de vie sans dupliquer le code.",
        },
      ],
    },
    {
      id: 'sp-avance',
      title: 'Avancé',
      questions: [
        {
          id: 'sp-10',
          question: '@Transactional',
          answer: "**`@Transactional`** enveloppe l'exécution dans une transaction : commit si succès, **rollback automatique** sur `RuntimeException`/`Error` (configurable via `rollbackFor`). Implémenté via AOP — __les appels internes (`this.methode()`) ne sont pas interceptés__.\n\nPropagation par défaut : `REQUIRED` (rejoint la transaction existante ou en crée une nouvelle). Autres modes : `REQUIRES_NEW`, `NESTED`, `SUPPORTS`. Indispensable pour la cohérence des opérations BDD.",
          code: '@Transactional\npublic void transferer(Long from, Long to, double montant) {\n    compteDao.debiter(from, montant);\n    compteDao.crediter(to, montant);\n}',
          language: 'java',
        },
        {
          id: 'sp-11',
          question: 'AOP',
          answer: "L'**AOP** gère les **préoccupations transversales** (logging, sécurité, transactions) sans polluer le code métier. Un **Aspect** contient le code commun, les **Pointcuts** définissent où l'appliquer.\n\nTypes d'*advice* : `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Around` (le plus puissant). Spring utilise des **proxys dynamiques** — __les appels internes (`this.methode()`) ne passent pas par le proxy__. `@Transactional` et `@Async` sont implémentés via AOP.",
          code: '@Aspect\n@Component\npublic class LogAspect {\n    @Before("execution(* com.example.service.*.*(..))")\n    public void log(JoinPoint jp) {\n        System.out.println("Appel: " + jp.getSignature());\n    }\n}',
          language: 'java',
        },
        {
          id: 'sp-12',
          question: 'Spring Security',
          answer: "Framework d'**authentification** (« qui êtes-vous ? ») et d'**autorisation** (« que pouvez-vous faire ? »). Architecture : chaîne de filtres servlet interceptant chaque requête HTTP. `SecurityFilterChain` configurable via `HttpSecurity`.\n\nMécanismes : form login, Basic, **JWT**, **OAuth2**. Par défaut : CSRF, headers de sécurité, validation de session activés. Pour les APIs REST *stateless* avec JWT : __désactiver CSRF, session `STATELESS`__. Puissant mais courbe d'apprentissage raide.",
          code: '@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain chain(HttpSecurity http) throws Exception {\n        http.authorizeHttpRequests(a -> a\n            .requestMatchers("/public/**").permitAll()\n            .anyRequest().authenticated()\n        );\n        return http.build();\n    }\n}',
          language: 'java',
        },
        {
          id: 'sp-13',
          question: 'Exceptions globales',
          answer: "`@ControllerAdvice` centralise la gestion des exceptions de tous les contrôleurs. `@ExceptionHandler` mappe chaque type d'exception à une réponse HTTP (`EntityNotFoundException` → 404, validation → 400).\n\nAvantages : réponses cohérentes, format d'erreur standardisé, plus de `try-catch` dispersés. On définit aussi un handler par défaut pour les exceptions imprévues (__500 sans détails techniques en prod__).",
          code: '@ControllerAdvice\npublic class GlobalExHandler {\n    @ExceptionHandler(UserNotFound.class)\n    public ResponseEntity<String> handle(UserNotFound e) {\n        return ResponseEntity.status(404).body(e.getMessage());\n    }\n}',
          language: 'java',
        },
        {
          id: 'sp-18',
          question: 'Actuator',
          answer: "Module de **monitoring et management** en production. Expose des endpoints : `/actuator/health` (statut app), `/actuator/info`, `/actuator/metrics` (métriques JVM, HTTP), `/actuator/env` (config), `/actuator/beans` (beans chargés).\n\n__En production, sécurisez et limitez les endpoints__ exposés via `management.endpoints.web.exposure.include`. Intégration native avec **Prometheus**, **Grafana** pour le monitoring. **Health indicators** personnalisables pour surveiller BDD, APIs externes, etc.",
        },
        {
          id: 'sp-19',
          question: 'Spring Boot Testing',
          answer: "**`@SpringBootTest`** : charge le contexte complet pour les tests d'intégration. **`@WebMvcTest`** : teste un contrôleur en isolation (contexte web uniquement). **`@DataJpaTest`** : teste la couche JPA avec BDD en mémoire.\n\nPour les tests unitaires : `@MockBean` (remplace un bean par un mock) et `@SpyBean` (mock partiel). __Règle : tests unitaires rapides (pas de contexte Spring) pour la logique, tests d'intégration (avec contexte) pour les couches.__",
          code: '@SpringBootTest\nclass UserServiceIT {\n    @Autowired UserService service;\n    @MockBean UserRepo repo;\n\n    @Test\n    void testFind() {\n        when(repo.findById(1L)).thenReturn(Optional.of(user));\n        assertThat(service.find(1L)).isPresent();\n    }\n}',
          language: 'java',
        },
        {
          id: 'sp-20',
          question: 'N+1 en JPA et solutions',
          answer: "Le problème **N+1** : une requête pour charger N entités, puis N requêtes supplémentaires pour leurs relations *lazy*. Exemple : charger 100 commandes + 100 requêtes pour leurs lignes.\n\nSolutions : **`JOIN FETCH`** dans la requête JPQL (tout en une requête), **`@EntityGraph`** (déclare les relations à charger), **`@BatchSize`** (regroupe les N requêtes en N/batchSize), ou *DTO projection* (ne charger que les champs nécessaires).\n\n__Le problème N+1 est le piège n°1 de performance en JPA — surveillez les logs SQL.__",
          code: '// Solution 1 : JOIN FETCH\n@Query("SELECT c FROM Commande c JOIN FETCH c.lignes")\nList<Commande> findAllWithLignes();\n\n// Solution 2 : EntityGraph\n@EntityGraph(attributePaths = {"lignes"})\nList<Commande> findAll();',
          language: 'java',
        },
      ],
    },
  ],
};