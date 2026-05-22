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
        
          deepDive: `# Avantages de Spring Boot

## Qu'est-ce que c'est ?

Spring Boot est un framework construit sur top de Spring qui simplifie radicalement la création d'applications Spring en production. Il élimine la configuration XML longue et offre une convention sobre configuration.

Avantages cles :
- **Auto-configuration** : configure automatiquement les composants Spring selon les dependencies presentes
- **Starters** : regroupements de dépendances cohérents pour demarrer rapidement
- **Serveur integre** : Tomcat, Jetty ou Undertow inclus (plus besoin de déployer un WAR)
- **Production-ready** : monitoring, santé, métriques integrés via Actuator
- **Convention sobre configuration** : moins de code, plus de productivité

## Syntaxe et exemples

// Maven pom.xml - Un seul dependance au lieu de 20
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

// Application principale
package com.example.demo;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// Controller auto-configuré
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}

// application.properties (optionnel - Spring Boot fournit des valeurs par defaut)
server.port=8080
spring.application.name=demo

## Bonnes pratiques

- Utiliser les starters officielsspring-boot-starter-*
- externaliser la configuration via application.yml ou variables d'environnement
- Activer Actuator en production pour le monitoring
- Preferer la configuration par code pour les cas complexes
- Utiliser @ConfigurationProperties pour typer les propriétés

## Pièges courants

- Ignorer les warnings de auto-configuration
- Mélanger configuration XML et Java config sans raison
- Négliger la sécurité par défaut (Spring Security est aussi un starter)
- Oublier que auto-config peut être désactivée avec @EnableAutoConfiguration(exclude=...)

Source : [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)`},
        {
          id: 'sp-14',
          question: 'Spring vs Spring Boot',
          answer: "**Spring Framework** : conteneur IoC, injection de dépendances, AOP, gestion des transactions. Puissant mais nécessite beaucoup de configuration XML/Java.\n\n**Spring Boot** : couche au-dessus de Spring qui **auto-configure** tout. Plus besoin de XML, de serveur d'application externe, de configuration manuelle — les starters et l'auto-config font le travail.\n\nEn résumé : Spring = moteur, Spring Boot = voiture prête à rouler. __On n'utilise plus Spring sans Boot aujourd'hui.__",
        
          deepDive: `# Spring vs Spring Boot

## Qu'est-ce que c'est ?

Spring est un framework léger et modular pour la plateforme Java. Spring Boot est une extension de Spring qui simplifie la configuration et le démarrage.

## Comparaison

| Aspect | Spring | Spring Boot |
|--------|--------|-------------|
| Configuration | XML ou Java Config manuelle | Auto-configuration |
| Serveur | Externe (WAR à déployer) | Embedded (JAR autonome) |
| Dépendances | Manuelles, risque de conflits | Starters pré-packagés |
| Développement | Plus long, plus de code | Développement rapide |
| Production | Configuration manuelle | Metrics, santé, monitoring intégrés |

## Quand utiliser quoi ?

**Spring (sans Boot)** :
- Applications legacy déjà en production
- Contrôle total sur la configuration
- Environnements très contraints
- Équipes expérimentées connaissant Spring

**Spring Boot** :
- Nouveaux projets
- Microservices
- Développement rapide souhaité
- Équipes de toute taille
- Cloud-native applications

## Exemple de configuration equivalent

// Spring classique - 50+ lignes de configuration
<beans>
    <context:component-scan base-package="com.example"/>
    <mvc:annotation-driven/>
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>

// Spring Boot - ZERO configuration XML
// Tout est auto-configuré selon les dépendances

## Bonnes pratiques

- Commencer avec Spring Boot pour les nouveaux projets
- Utiliser start.spring.io pour générer la structure initiale
- Override la auto-config uniquement quand nécessaire
- Garder la configuration dans application.yml

Source : [Spring Boot vs Spring](https://spring.io/projects/spring-boot)`},
        {
          id: 'sp-2',
          question: 'IoC et injection de dépendances',
          answer: "**Inversion of Control** : au lieu de créer les objets avec `new`, on délègue au conteneur Spring (cycle de vie complet). L'**injection de dépendances** réalise cette inversion : Spring fournit automatiquement les beans nécessaires via `@Autowired` (constructeur recommandé, setter ou champ).\n\nAvantages : **couplage faible** (dépendance vers les interfaces), implémentations interchangeables, tests facilités par l'injection de *mocks*.",
        
          deepDive: `# IoC et injection de dépendances

## Qu'est-ce que c'est ?

**Inversion of Control (IoC)** est un principe de conception où le contrôle du flux d'execution est transféré à un framework ou conteneur. Au lieu que votre code contrôle l'appel des libraries, le framework appelle votre code.

**Dependency Injection (DI)** est une forme d'IoC où les dépendances d'un objet lui sont fournies par un conteneur (au lieu que l'objet les crée lui-même).

Avantages :
- Couplage faible entre composants
- Testabilité accrue (mock des dépendances)
- Maintenabilité améliorée
- Flexibilité dans le remplacement des implémentations

## Types d'injection

**1. Constructor Injection (recommandée)**
@Component
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

**2. Setter Injection**
@Component
public class NotificationService {
    private EmailService emailService;
    
    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}

**3. Field Injection (déconseillée)**
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;  // Non recommandée
}

## Configuration dans Spring

// Java Config
@Configuration
public class AppConfig {
    @Bean
    public UserRepository userRepository() {
        return new JdbcUserRepository(dataSource());
    }
    
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(...);
    }
}

// Annotation-based (plus courant)
@Service
public class OrderService {
    private final PaymentGateway paymentGateway;
    
    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }
}

## Bonnes pratiques

- Préférer l'injection par constructeur (immutable, testable)
- Une seule dépendance par constructeur est un signe de bonne conception
- Utiliser des interfaces pour découpler
- Les champs finals indiquent les dépendances obligatoires

## Pièges courants

- Injection par champ (difficulté de test)
- Construire les dépendances dans le constructeur (anti-pattern)
- Cyclic dependencies (A dépend de B, B dépend de A)
- Trop de dépendances dans un seul constructeur (SRP violation)

Source : [Spring Framework Documentation - IoC Container](https://docs.spring.io/spring-framework/reference/core/beans/introduction.html)`},
        {
          id: 'sp-3',
          question: "C'est quoi un bean Spring ?",
          answer: "Un **bean Spring** est un objet géré par le conteneur : instanciation, configuration, injection et cycle de vie pris en charge par Spring. Déclaré via `@Component`, `@Service`, `@Repository` ou `@Controller`, il est créé dans l'`ApplicationContext` au démarrage.\n\nLa différence avec un objet `new` : un bean est sous la responsabilité de Spring, qui peut y appliquer des *aspects* (transactions, sécurité).",
        
          deepDive: `# C'est quoi un bean Spring

## Qu'est-ce que c'est ?

Un **bean** est un objet créé, assemblé et géré par le conteneur Spring IoC. Les beans sont le cœur d'une application Spring.

Le conteneur Spring :
1. Crée les objets (beans)
2. Assemble leurs dépendances
3. Configure leur cycle de vie
4. Gère leur destruction

## Façons de définir un bean

**1. @Component et stéréotypes**
@Component
public class MonService { }

Les stéréotypes :
- **@Component** : définition générique
- **@Service** : Bean de la couche service
- **@Repository** : Bean de la couche persistence
- **@Controller** : Bean de la couche présentation (MVC)

**2. @Bean dans @Configuration**
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}

**3. @ConfigurationProperties**
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int timeout;
}

## Scope des beans

| Scope | Description |
|-------|-------------|
| singleton | Une seule instance par conteneur (défaut) |
| prototype | Nouvelle instance à chaque injection |
| request | Une instance par requête HTTP |
| session | Une instance par session HTTP |
| application | Une instance par ServletContext |

## Cycle de vie

1. instantiation
2. populate properties
3. BeanNameAware.setBeanName()
4. BeanFactoryAware.setBeanFactory()
5. ApplicationContextAware.setApplicationContext()
6. @PostConstruct
7. destroy (selon scope)

## Bonnes pratiques

- Utiliser le stéréotype approprié (@Service plutôt que @Component)
- Privilégier les beans immutable (constructeur)
- Configurer les beans via @ConfigurationProperties
- Nommer les beans de manière consistente (camelCase)

## Pièges courants

- Bean singleton dans un environnement thread-safe (attention aux mutable fields)
- Confusion entre @Bean et @Component
- Oublier le @Primary sur un bean quand plusieurs implémentations existent
- Ne pas détruire les ressources (utiliser @PreDestroy)

Source : [Spring Framework Documentation - Beans](https://docs.spring.io/spring-framework/reference/core/beans/introduction.html)`},
        {
          id: 'sp-4',
          question: '@Autowired / @Component / @Service / @Repository',
          answer: "`@Autowired` : injection automatique d'un bean (constructeur recommandé, setter ou champ). `@Component` : déclaration générique d'un bean. `@Service` : spécialisation pour la logique métier (valeur sémantique). `@Repository` : accès aux données + traduction automatique des exceptions SQL en `DataAccessException`.\n\nRègle : utiliser l'annotation __la plus spécifique possible__ pour la lisibilité.",
        
          deepDive: `# @Autowired / @Component / @Service / @Repository

## Qu'est-ce que c'est ?

Spring utilise des annotations pour registrar les beans dans le conteneur IoC. Voici leurs rôles respectifs :

## Annotations de stereotype

**@Component**
Annotation de base pourmarquer une classe comme candidate au scanning automatique des composants.

**@Service**
Stéréotype pour la couche service. Identique à @Component fonctionnellement, mais communique l'intention :
- Logique métier
- Calculations
- Appels vers les repositories

**@Repository**
Stéréotype pour la couche persistence :
- Accès à la base de données
- Requêtes
- Mapping objet-relationnel

**@Controller**
Pour les Controllers MVC (Spring MVC) :
- Handling des requêtes HTTP
- Retourne des vues ou @ResponseBody

**@RestController**
Combinaison de @Controller + @ResponseBody :
- API REST
- Retourne JSON/XML directement

## @Autowired

Annotation pour injecter les dépendances :
- Sur constructor (recommandé)
- Sur setter
- Sur champ (déconseillé)

## Exemple complet

// Couche persistence
@Repository
public class UserRepository {
    public Optional<User> findById(Long id) { ... }
}

// Couche service
@Service
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

// Couche présentation
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id).orElseThrow();
    }
}

## Bonnes pratiques

- Utiliser @Service et @Repository pour la clarté semantics
- Préférer l'injection par constructeur (obligatoire depuis Spring 5)
- Une seule implémentation par interface
- Utiliser @Qualifier pour disambiguïser si plusieurs beans du même type

## Pièges courants

- @Repository sur une classe qui n'accède pas à la DB
- @Service sur un controller (utiliser @Controller)
- Oublier @ComponentScan dans la configuration
- Injection cyclique non détectée

Source : [Spring Framework Documentation - Stereotype Annotations](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/stereotype.html)`},
        {
          id: 'sp-5',
          question: 'Scopes des beans',
          answer: "**Singleton** (défaut) : une seule instance partagée — __ne pas stocker d'état mutable dedans__. **Prototype** : nouvelle instance à chaque demande. Web : **Request** (une instance par requête HTTP), **Session** (une instance par session).\n\n__Piège__ : injecter un *prototype* dans un *singleton* ne crée qu'une seule instance prototype — utiliser un *proxy scoped* ou `ObjectFactory`.",
        
          deepDive: `# Scopes des Beans Spring

## Qu'est-ce que c'est

Un scope definit le cycle de vie et la visibilite d'un bean dans le conteneur Spring. Par defaut, Spring cree un seul bean partagable (singleton) pour toute l'application, mais chaque bean peut avoir un scope différent selon les besoins.

Spring Framework supporte plusieurs scopes predefinis, et vous pouvez egalement definir des scopes personnalises.

## Syntaxe et exemples

### Scopes predefinis

| Scope | Description |
|-------|-------------|
| singleton | Une seule instance par conteneur IoC (defaut) |
| prototype | Nouvelle instance a chaque demande |
| request | Une instance par requête HTTP (Web only) |
| session | Une instance par session HTTP (Web only) |
| application | Une instance par contexte ServletContext |
| websocket | Une instance par websocket |

### Declaration de scope

\`\`\`java
// Annotation
@Scope("prototype")
@Component
public class CommandProcessor { }

// Ou avec constante
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Service
public class PaymentService { }
\`\`\`

### Annotation sur méthode @Bean

\`\`\`java
@Configuration
public class AppConfig {
    @Bean
    @Scope("prototype")
    public TaskExecutor taskExecutor() {
        return new ThreadPoolTaskExecutor();
    }
}
\`\`\`

### Look-up method injection (prototype dans singleton)

\`\`\`java
@Component
public abstract class CommandManager {
    // Methode abstraite que Spring substituera
    public Object handle(String command) {
        Command cmd = createCommand();
        return cmd.execute();
    }
    // Abstract method declares the lookup
    protected abstract Command createCommand();
}
\`\`\`

## Bonnes pratiques

- **Utiliser singleton pour les services sans état (stateless)**: la majorite des services applicatifs sont sans état et peuvent être des singletons
- **Utiliser prototype pour les objets avec état qui dependent du contexte**: chaque utilisation doit obtenir une nouvelle instance
- **Etre conscient du cout des prototypes**: chaque injection prototype dans un singleton cree une nouvelle instance
- **Eviter les dependances circulaires avec les prototypes**

## Pièges courants

- **Confondre singleton Spring avec singleton pattern**: le singleton Spring est par conteneur, pas global
- **Oublier que les prototypes ne sont pas detruits automatiquement**: vous devez nettoyer les ressources vous-meme
- **Injection de prototypes dans des singletons sans strategy de creation**: utiliser un ObjectFactory ou Provider du javax.inject

\`\`\`java
@Autowired
private ObjectFactory<PrototypeBean> prototypeBeanFactory;

public void usePrototype() {
    PrototypeBean bean = prototypeBeanFactory.getObject();
    // chaque appel cree une nouvelle instance
}
\`\`\`

- **@Resource et field injection ignorent le scope prototype**

## Source

[Spring Core Documentation - Beans](https://docs.spring.io/spring-framework/reference/core/beans.html)`},
        {
          id: 'sp-6',
          question: 'Auto-configuration',
          answer: "Au démarrage, Spring Boot scanne le *classpath* et configure automatiquement les beans selon les dépendances détectées (**Hibernate** → `EntityManagerFactory`, **spring-web** → Tomcat + MVC).\n\nRepose sur `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty` : l'auto-config s'active si les conditions sont remplies, et reçule si vous définissez votre propre bean. Excluable via `@SpringBootApplication(exclude = ...)`.",
        
          deepDive: `# Auto-configuration Spring Boot

## Qu'est-ce que c'est

L'auto-configuration est le mecanisme central de Spring Boot qui permet de configurer automatiquement l'application en fonction des dependencies presentes dans le classpath. Elle élimine le besoin d'écrire des configurations manuelles exhaustives.

L'auto-configuration utilise le mecanisme @Conditional pour n'appliquer une configuration que si certaines conditions sont remplies (classes presentes dans le classpath, proprietaires definies, etc.).

## Syntaxe et exemples

### Activation de l'auto-configuration

\`\`\`java
@SpringBootApplication
// Equivalent a @Configuration, @EnableAutoConfiguration, @ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

### Exclure des configurations automatiques

\`\`\`java
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class Application { }
\`\`\`

### Proprietes de configuration

\`\`\`properties
# Desactiver certaines auto-configurations
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration

# Enable debug mode to see auto-config report
debug=true
\`\`\`

### Log de la configuration automatique

\`\`\`bash
java -jar myapp.jar --debug
# Ou dans application.properties
spring.main.banner-mode=log
\`\`\`

### Fichier auto-configuration

\`\`\`
META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
\`\`\`

## Comment ça marche

1. **@EnableAutoConfiguration** analyse les fichiers dans \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\`
2. Chaque auto-configuration est une classe @Configuration avec des annotations @Conditional
3. Les conditions verifient la presence de classes, beans, proprietaires

\`\`\`java
@Configuration
@ConditionalOnClass({ DataSource.class, JdbcTemplate.class })
@ConditionalOnProperty(name = "spring.datasource.enabled", havingValue = "true", matchIfMissing = true)
public class DataSourceAutoConfiguration {
    // ...
}
\`\`\`

## Bonnes pratiques

- **Utiliser les starters officiels**: ils incluent les bonnes combinaisons de-dependencies
- **Specifier les proprietaires dans application.properties**: preferer une configuration explicite à l'auto-configuration
- **Comprendre les conditions @Conditional**: essentielles pour deboguer
- **Utiliser @ConditionalOnMissingBean** quand vous voulez permettre le survol de l'auto-configuration

## Pièges courants

- **Confondre auto-configuration avec magie**: derriere il y a du code Java standard
- **Ne pas surcharger accidentellement**: une propriete definie par l'utilisateur peut être ignoree si l'ordre de configuration est incorrect
- **Problemes de classpath**: une dependencia manquante peut empecher une auto-configuration de fonctionner
- **Confondre enable et disable**: \`spring.autoconfigure.enabled=false\` desactive TOUTE l'auto-configuration

## Source

[Spring Boot Auto-configuration Documentation](https://docs.spring.io/spring-boot/reference/features/autoconfiguration.html)`},
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
        
          deepDive: `# @RestController vs @Controller

## Qu'est-ce que c'est

- @Controller: Spring MVC classique, retourne une vue (JSP, Thymeleaf). Necessite @ResponseBody pour retourner des donnees JSON.
- @RestController: Combine @Controller + @ResponseBody. Retourne directement des donnees JSON/XML sans vue.

## Syntaxe et exemples

@RestController:
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
\`\`\`

@Controller avec @ResponseBody:
\`\`\`java
@Controller
@RequestMapping("/api/users")
public class UserController {
    @ResponseBody
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
\`\`\`

## Bonnes pratiques

- Preferer @RestController pour les APIs RESTful qui retournent des donnees.
- Utiliser @Controller + ModelAndView pour les applications avec rendu côté serveur (SSR).
- Configurer correctly ObjectMapper pour la sérialisation JSON.

## Pièges courants

- Oublier @ResponseBody avec @Controller = retour de nom de vue au lieu de JSON.
- Ne pas configurer les Content-Type headers correctement.
- Melanger Controllers pour API et pour vues dans la meme classe.

Source : [Spring Docs](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html)`},
        {
          id: 'sp-16',
          question: '@PathVariable vs @RequestParam vs @RequestBody',
          answer: "**`@PathVariable`** : extrait une valeur de l'URL (`/users/{id}` → `id`). **`@RequestParam`** : extrait un paramètre de requête (`?name=dupont`). **`@RequestBody`** : désérialise le corps JSON dans un objet.\n\nRègle : `@PathVariable` pour les identifiants dans l'URL, `@RequestParam` pour les filtrès et options, `@RequestBody` pour les données de création/mise à jour. __Pour les formulaires HTML, utilisez `@ModelAttribute`.__",
          code: '@PostMapping("/users")\npublic User create(@RequestBody UserDTO dto) { ... }\n\n@GetMapping("/users")\npublic List<User> search(@RequestParam String name) { ... }',
          language: 'java',
        
          deepDive: `# @PathVariable vs @RequestParam vs @RequestBody

## Qu'est-ce que c'est

- @PathVariable: Extrait une variable de lURL (URI template).
- @RequestParam: Extrait un paramêtre de query string ou form data.
- @RequestBody: Extrait le corps de la requête et deserialize JSON vers objet Java.

## Syntaxe et exemples

\`\`\`java
@GetMapping("/users/{id}/posts/{postId}")
public Post getUserPost(
    @PathVariable("id") Long userId,
    @PathVariable Long postId,
    @RequestParam(value = "expand", defaultValue = "false") boolean expand,
    @RequestParam(required = false) String filter
) {
    // ...
}

@PostMapping("/users")
public User createUser(@RequestBody UserCreateRequest request) {
    return userService.create(request);
}
\`\`\`

## Bonnes pratiques

- Utiliser @PathVariable pour les identifiants de ressource (RESTful).
- Utiliser @RequestParam pour les filtrès et options de requête.
- Valider @RequestBody avec @Valid et des annotations JSR-380.
- Specifier les noms explicites pour éviter les erreurs de mapping.

## Pièges courants

- Confondre @RequestParam (query string) avec @PathVariable (URI path).
- Ne pas valider @RequestBody =Donnees invalides en base.
- Oublier required=false pour paramêtrès optionnels = 400 Bad Request.

Source : [Spring Docs](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-requestbody.html)`},
        {
          id: 'sp-17',
          question: 'Validation des données (@Valid)',
          answer: "**Bean Validation** (JSR 380) vià l'annotation `@Valid` sur le paramètre + les contraintes sur le DTO : `@NotNull`, `@Size(min=2)`, `@Email`, `@Pattern`, `@Min`, `@Max`.\n\nSi la validation échoue, Spring lance `MethodArgumentNotValidException` → à capturer dans le `@ControllerAdvice` pour renvoyer une **réponse 400** structurée avec les erreurs par champ.\n\n__Toujours valider côté serveur__, même si le frontend valide aussi. Ne jamais faire confiance au client.",
          code: 'public record UserDTO(\n    @NotBlank String nom,\n    @Email String email,\n    @Min(18) int age\n) {}\n\n@PostMapping\npublic User create(@Valid @RequestBody UserDTO dto) { ... }',
          language: 'java',
        
          deepDive: `# Validation des donnees (@Valid)

## Qu'est-ce que c'est

Spring Validation permet de valider les donnees entrantes avec des annotations JSR-380 (Bean Validation). Les erreurs sont collectees et retournees au client.

## Syntaxe et exemples

\`\`\`java
@PostMapping("/users")
public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest request, 
                                    BindingResult result) {
    if (result.hasErrors()) {
        return ResponseEntity.badRequest()
            .body(result.getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .toList());
    }
    return ResponseEntity.ok(userService.create(request));
}
\`\`\`

Request DTO:
\`\`\`java
public class UserRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50)
    private String name;

    @NotEmail(message = "Invalid email")
    private String email;

    @Min(18)
    @Max(120)
    private int age;

    @Valid
    private AddressRequest address;
}
\`\`\`

## Bonnes pratiques

- Toujours valider les entrees utilisateur avec @Valid.
- Utiliser des messages derreur explicites en français.
- Creer un @ControllerAdvice pour centraliser la gestion des erreurs.
- Grouper les validations avec des sequences de groupes.

## Pièges courants

- Oublier @Valid devant @RequestBody = Aucune validation.
- Ne pas gerer BindingResult = Erreurs silencieuses.
- Valider des donnees qui ne sont pas critiques (sur-validation).
- Messages derreur trop techniques pour les utilisateurs finals.

Source : [Spring Docs](https://docs.spring.io/spring-framework/reference/core/validation/bean-validation.html)`},
      ],
    },
    {
      id: 'sp-données',
      title: 'Données & Configuration',
      questions: [
        {
          id: 'sp-7',
          question: 'Configurer une BDD',
          answer: "Ajouter le starter JPA + le driver BDD, puis configurer dans `application.properties` : url, username, password, driver.\n\n`ddl-auto` : `update` (dev), `create-drop` (tests), `validate` (vérifie), `none` (production, avec **Flyway**/**Liquibase**). Pool **HikariCP** configuré via `maximum-pool-size` et `connection-timeout`. Quelques lignes suffisent pour une connexionion prête à l'emploi.",
          code: 'spring.datasource.url=jdbc:mysql://localhost:3306/mabdd\nspring.datasource.username=root\nspring.datasource.password=secret\nspring.jpa.hibernate.ddl-auto=update',
          language: 'properties',
        
          deepDive: `# Configurer une Base de Donnees dans Spring Boot

## Qu'est-ce que c'est

Spring Boot automatise la configuration d'une base de donnees via son module auto-configuration. Il suffit d'ajouter la dependance JDBC ou JPA appropriee et Spring Boot configurera automatiquement un DataSource, un EntityManagerFactory, et les beans necessaires.

Le mecanisme s'appuie sur DataSourceAutoConfiguration et HibernateJpaAutoConfiguration.

## Syntaxe et exemples

### Configuration avec H2 (développement)

\`\`\`properties
# application.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Console H2 web (dev only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
\`\`\`

\`\`\`xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

### Configuration avec PostgreSQL

\`\`\`properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=secret
spring.datasource.driver-class-name=org.postgresql.Driver

# Pool HikariCP (defaut)
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
\`\`\`

\`\`\`xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

### Configuration JPA / Hibernate

\`\`\`properties
# JPA settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Open Session in View (desactiver en prod)
spring.jpa.open-in-view=false
\`\`\`

### Configuration avec JNDI (conteneur)

\`\`\`properties
spring.datasource.jndi-name=java:comp/env/jdbc/MyDataSource
\`\`\`

### DataSource custom bean

\`\`\`java
@Configuration
public class DataSourceConfig {
    @Bean
    @ConfigurationProperties("app.datasource")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource dataSource() {
        return dataSourceProperties()
            .initializeDataSourceBuilder()
            .build();
    }
}
\`\`\`

## Bonnes pratiques

- **Utiliser un pool de connexions**: HikariCP est inclus par defaut, ajuster les paramêtrès selon la charge
- **Ne jamais commiter les mots de passe dans le code**: utiliser des variables d'environnement ou un service de secrets
- **Desactiver Open-In-View en production**: évite les LazyInitializationException inattendues
- **DDL-auto en dev, validate/migrate en prod**: utiliser Flyway ou Liquibase pour les migrations

## Pièges courants

- **Oublier le driver dans le classpath**: l'auto-configuration echoue silencieusement
- **HikariCP timeout par defaut trop long**: le timeout de connexion est de 30s, a ajuster
- **Confondre spring.datasource avec spring.jpa**: ils peuvent avoir des configurations différentes
- **Memoire insuffisante pour H2 en mémoire**: ajouter \`;DB_CLOSE_DELAY=-1\` si la connexion est fermee trop tot

## Source

[Spring Boot Data Access](https://docs.spring.io/spring-boot/reference/data.html)`},
        {
          id: 'sp-8',
          question: 'Spring Data JPA',
          answer: "Élimine le *boilerplate* CRUD : `JpaRepository` fournit `save`, `findById`, `findAll`, `delete` sans implémentation. Les **méthodes de requête dérivées** génèrent le JPQL depuis le nom (`findByEmail` → `WHERE email = ?`). `@Query` pour les requêtes complexes. Pagination et tri natifs via `Pageable`.\n\n__Attention aux requêtes inefficaces__ : relations *lazy* et problème **N+1**.",
          code: 'public interface UserRepo extends JpaRepository<User, Long> {\n    List<User> findByEmail(String email);\n}',
          language: 'java',
        
          deepDive: `# Spring Data JPA

## Qu'est-ce que c'est

Spring Data JPA est un module du projet Spring Data qui simplifie le développement de la couche d'acces aux donnees. Il permet de creer des repositories JPA sans effort en eliminant le besoin d'écrire les implementations des operations CRUD et des requêtes personnalisees.

Le mecanisme central est le mechanisme de derivation de requêtes (query derivation): Spring Data analyse le nom de vos méthodes pour construire automatiquement les requêtesJPQL correspondantes.

## Syntaxe et exemples

### Repository de base

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    // Derivation automatique par nom de méthode
    Optional<User> findByUsername(String username);
    List<User> findByEmailContaining(String emailDomain);
    List<User> findByAgeGreaterThanEqual(int minAge);
}
\`\`\`

### Derivation de requêtes par mots-cles

\`\`\`java
public interface ProductRepository extends JpaRepository<Product, Long> {
    // And/Or
    List<Product> findByNameAndCategory(String name, String category);
    // Comparateurs
    List<Product> findByPriceBetween(double min, double max);
    List<Product> findByNameContainingIgnoreCase(String fragment);
    // Tri
    List<Product> findByCategoryOrderByPriceDesc(String category);
}
\`\`\`

### Requetes JPQL personnelles avec @Query

\`\`\`java
@Query("SELECT p FROM Product p WHERE p.price > :minPrice AND p.stock > 0")
List<Product> findAffordableProducts(@Param("minPrice") double price);

@Query("SELECT p FROM Product p WHERE p.category.name = :catName")
List<Product> findByCategoryName(@Param("catName") String name);
\`\`\`

### Requetes natives

\`\`\`java
@Query(value = "SELECT * FROM products WHERE price > :price", nativeQuery = true)
List<Product> findExpensiveProducts(double price);
\`\`\`

### Modification avec @Modifying

\`\`\`java
@Modifying
@Query("UPDATE Product p SET p.price = p.price * :factor WHERE p.category = :cat")
int updatePricesByCategory(@Param("factor") double factor, @Param("cat") String category);
\`\`\`

## Bonnes pratiques

- **Utiliser Optional pour les méthodes qui retournent une seule entite**: \`Optional<User> findByUsername(String username);\`
- **Limiter l'utilisation des requêtes natives**: elles ne beneficient pas de la validation de requêtes et peuvent presenter des risques de securite (SQL injection)
- **Specifier les noms de colonnes avec @Column pour éviter les surprises**: \`@Column(name = "user_id")\`
- **Utiliser les projections et DTOs** pour ne pas charger des entites entieres: \`interface UserNameOnly { String getUsername(); }\`
- **Eviter les operations en masse dans les transactions** sans configuration appropriee

## Pièges courants

- **Confondre @Transactional en lecture et écriture**: une lecture seule utilise moins de ressources: \`@Transactional(readOnly = true)\`
- **N+1 problème**: les requêtes derivees peuvent déclencher des requêtes supplementaires pour les relations paresseuses (LAZY). Utiliser \`JOIN FETCH\` dans les requêtes @Query.
- **Pagination mal configuree**: ne pas oublier \`Pageable\` pour éviter de charger tous les enregistrements en mémoire
- **Oublier les frontieres transactionnelles**: les operations de modification necessitent un @Transactional

## Source

[Spring Data JPA Reference Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)`},
        {
          id: 'sp-9',
          question: 'Profiling',
          answer: "Configurations différentes selon l'environnement (dev, test, prod). `@Profile('dev')` sur un bean : créé uniquement si le profil est actif. Fichiers `application-dev.properties` / `application-prod.properties` pour surcharger les propriétés.\n\nActivation : `--spring.profiles.active=prod` ou `SPRING_PROFILES_ACTIVE`. Indispensable pour gérer le cycle de vie sans dupliquer le code.",
        
          deepDive: `# Profiling dans Spring Boot

## Qu'est-ce que c'est

Le profiling dans Spring Boot permet de conditionner la configuration et les beans à l'environnement d'execution (dev, test, prod). C'est un mecanisme puissant pour adapter le comportement de l'application sans modifier le code.

Les profiles sont actives vià la proprietaires \`spring.profiles.active\` ou programmatiquement.

## Syntaxe et exemples

### Declaration de profile

\`\`\`java
// Classe entiere dans un profile
@Profile("dev")
@Configuration
public class DevConfig {
    @Bean
    public DataSource devDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}

// Methode specifique
@Bean
@Profile("prod")
public DataSource prodDataSource() {
    return new DataSourceBuilder().build();
}
\`\`\`

### Annotation sur une classe

\`\`\`java
@Service
@Profile("!test")
public class EmailService { }
\`\`\`

### Fichiers de configuration par profile

\`\`\`
application-dev.properties
application-test.properties
application-prod.properties
application-local.yaml
\`\`\`

### Activation de profile

\`\`\`bash
# Ligne de commande
java -jar app.jar --spring.profiles.active=dev

# Variable d'environnement
SPRING_PROFILES_ACTIVE=prod

# Programmatique
SpringApplication app = new SpringApplication(App.class);
app.setAdditionalProfiles("dev");
\`\`\`

### Configuration dans application.properties

\`\`\`properties
spring.profiles.active=dev
spring.config.activate.on-profile=dev
\`\`\`

### Profile conditionnel avec @Conditional

\`\`\`java
@Bean
@ConditionalOnProperty(name = "feature.new-ui.enabled", havingValue = "true")
public NewUiService newUiService() {
    return new NewUiService();
}
\`\`\`

## Bonnes pratiques

- **Separer la configuration par environment**: pas de valeurs hardcodees dans le code
- **Utiliser des fichiers dedies**: \`application-{profile}.properties\` rendent la configuration plus lisible
- **Profile par defaut**: definir un profile \`default\` qui s'applique si aucun autre n'est actif
- **Combiner profiles**: \`spring.profiles.active=dev,local\`

## Pièges courants

- **Oublier d'activer le profile en production**: toute la config dev s'applique
- **Confondre @ActiveProfiles (test) avec spring.profiles.active**: ce n'est pas la meme chose
- **Profile herencia**: les profiles ne s'heritent pas automatiquement, chaque fichier doit definir ses propres valeurs
- **Ordre de chargement**: le dernier fichier propertieschargesecrase les precedents

## Source

[Spring Boot Profiles Documentation](https://docs.spring.io/spring-boot/reference/features.html#features.profiles)`},
      ],
    },
    {
      id: 'sp-avance',
      title: 'Avancé',
      questions: [
        {
          id: 'sp-10',
          question: '@Transactional',
          answer: "**`@Transactional`** enveloppe l'exécution dans une transaction : commit si succès, **rollback automatique** sur `RuntimeException`/`Error` (configurable via `rollbackFor`). Implémenté via AOP — __les appels internes (`this.méthode()`) ne sont pas interceptés__.\n\nPropagation par défaut : `REQUIRED` (rejoint la transaction existante ou en crée une nouvelle). Autrès modes : `REQUIRES_NEW`, `NESTED`, `SUPPORTS`. Indispensable pour la cohérence des opérations BDD.",
          code: '@Transactional\npublic void transferer(Long from, Long to, double montant) {\n    compteDao.debiter(from, montant);\n    compteDao.crediter(to, montant);\n}',
          language: 'java',
        
          deepDive: `# @Transactional en Spring

## Qu'est-ce que c'est

L'annotation @Transactional en Spring permet de déclarer qu'une méthode (ou une classe) doit être executee dans le cadre d'une transaction. Spring gère automatiquement le demarrage, la validation (commit) où l'annulation (rollback) de la transaction.

Par defaut, Spring utilise un proxy AOP pour encapsuler les appelsméthode, ce qui implique certaines limitations (appels internes, accesoirs).

## Syntaxe et exemples

### Utilisation de base

\`\`\`java
@Service
public class UserService {
    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
        emailService.sendWelcomeEmail(user.getEmail());
    }
}
\`\`\`

### Configuration au niveau de la classe

\`\`\`java
@Transactional
@Service
public class AccountService {
    // Toutes les méthodes sont transactionnelles
}
\`\`\`

### Rollback personnalise

\`\`\`java
@Transactional(rollbackFor = Exception.class)
public void transfer(Account from, Account to, double amount) {
    // ...
}
\`\`\`

### Propagation

\`\`\`java
@Transactional(propagation = Propagation.REQUIRED)
public void operation1() {
    // utilise la transaction existante si presente
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void operation2() {
    // nouvelle transaction, suspend l'existente
}
\`\`\`

### Lecture seule

\`\`\`java
@Transactional(readOnly = true)
public List<User> findAllUsers() {
    return userRepository.findAll();
}
\`\`\`

## Bonnes pratiques

- **Utiliser @Transactional sur les méthodes publiques uniquement**: Spring AOP ne fonctionne qu'avec les méthodes publiques
- **Specifier le service en premiere couche transactionnelle**: le controller ne devrait generalement pas être transactionnel
- **Utiliser readOnly = true pour les lectures**: permet des optimisations
- **Declarer les exceptions qui déclenchent le rollback**: rollbackFor = {IOException.class}

## Pièges courants

- **Appels internes (self-invocation)**: un appel de méthode interne ne passe pas par le proxy, donc pas de transaction

\`\`\`java
@Service
public class Service {
    public void outer() {  // pas de transaction
        this.inner();      // appel interne, proxy non utilise
    }
    @Transactional
    public void inner() { } // ne sera pas transactionnel !
}
\`\`\`

Solution: utiliser un self bean ou injecter le service lui-meme.

- **Rollback automatique uniquement pour RuntimeException**: les exceptions checkees ne déclenchent pas de rollback par defaut
- **Confondre transaction et session**: dans Hibernate, une session peut survivre au-dela de la transaction avec Open Session in View
- **Oublier que les modifications en cache doivent être flush**: entityManager.flush() peut être necessaire

## Source

[Spring Transaction Management](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)`},
        {
          id: 'sp-11',
          question: 'AOP',
          answer: "L'**AOP** gère les **préoccupations transversales** (logging, sécurité, transactions) sans polluer le code métier. Un **Aspect** contient le code commun, les **Pointcuts** définissent où l'appliquer.\n\nTypes d'*advice* : `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Around` (le plus puissant). Spring utilise des **proxys dynamiques** — __les appels internes (`this.méthode()`) ne passent pas par le proxy__. `@Transactional` et `@Async` sont implémentés via AOP.",
          code: '@Aspect\n@Component\npublic class LogAspect {\n    @Before("execution(* com.example.service.*.*(..))")\n    public void log(JoinPoint jp) {\n        System.out.println("Appel: " + jp.getSignature());\n    }\n}',
          language: 'java',
        
          deepDive: `# AOP dans Spring

## Qu'est-ce que c'est

AOP (Aspect-Oriented Programming) est un paradigme de programmation qui permet de separer les preoccupations transversales (cross-cutting concerns) du code metier principal. Spring AOP permet d'implmenter des aspects qui déclenchent des comportements avant, après, ou autour des méthodes cible.

Les concepts cles sont: Aspect (classe regroupant les conseils), Join Point (moment d'execution), Advice (action a realiser), Pointcut (expression controlant ou appliquer), Weaving (lie le code d'aspect au code cible).

## Syntaxe et exemples

### Pointcut simple

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    // Pointcut sur toutes les méthodes du package service
    @Pointcut("execution(* com.example.service..*.*(..))")
    public void serviceMethods() {}

    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        log.info("Calling: {} with args: {}",
            joinPoint.getSignature(), joinPoint.getArgs());
    }
}
\`\`\`

### Pointcut avec annotation

\`\`\`java
// Definition de l'annotation
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Retryable {
    int maxAttempts() default 3;
    long delay() default 1000;
}

// Aspect utilisant l'annotation
@Aspect
@Component
public class RetryAspect {
    @Around("@annotation(retryable)")
    public Object retry(ProceedingJoinPoint pjp, Retryable retryable) {
        int attempts = 0;
        while (attempts < retryable.maxAttempts()) {
            try {
                return pjp.proceed();
            } catch (Exception e) {
                attempts++;
                if (attempts >= retryable.maxAttempts()) throw e;
                Thread.sleep(retryable.delay());
            }
        }
        return null;
    }
}
\`\`\`

### After Returning

\`\`\`java
@AfterReturning(pointcut = "serviceMethods()", returning = "result")
public void logAfter(JoinPoint joinPoint, Object result) {
    log.info("Method {} returned: {}", joinPoint.getSignature(), result);
}
\`\`\`

### After Throwing

\`\`\`java
@AfterThrowing(pointcut = "serviceMethods()", throwing = "ex")
public void logError(JoinPoint joinPoint, Exception ex) {
    log.error("Method {} threw: {}", joinPoint.getSignature(), ex.getMessage());
}
\`\`\`

## Types de conseils

| Advice | Description |
|--------|-------------|
| @Before | Avant l'execution de la cible |
| @After | Apres l'execution (succes ou echec) |
| @AfterReturning | Apres le retour reussi |
| @AfterThrowing | Apres une exception |
| @Around | Entoure l'execution, contrôle total |

## Bonnes pratiques

- **Limiter le nombre d'aspects**: trop d'aspects rend le code difficile a suivre
- **Eviter les aspects qui changent les signatures**: cela complique le debogage
- **Utiliser des pointcuts specifiques** plutot que des jokers generaux
- **Privilegier Spring AOP sur AspectJ** pour les cas simples

## Pièges courants

- **Self-invocation**: les appels internes d'une meme classe ne passent pas par le proxy AOP
- **Ordre d'execution des aspects**: plusieurs aspects sur le meme join point peuvent entrer en conflit
- **Performance**: les aspects autour (@Around) avec des traitements lourds impactent les performances
- **Confondre Spring AOP avec AspectJ**: Spring AOP utilise des proxies, AspectJ modifie le bytecode

## Source

[Spring AOP Documentation](https://docs.spring.io/spring-framework/reference/core/aop.html)`},
        {
          id: 'sp-12',
          question: 'Spring Security',
          answer: "Framework d'**authentification** (« qui êtes-vous ? ») et d'**autorisation** (« que pouvez-vous faire ? »). Architecture : chaîne de filtrès servlet interceptant chaque requête HTTP. `SecurityFilterChain` configurable via `HttpSecurity`.\n\nMécanismes : form login, Basic, **JWT**, **OAuth2**. Par défaut : CSRF, headers de sécurité, validation de session activés. Pour les APIs REST *stateless* avec JWT : __désactiver CSRF, session `STATELESS`__. Puissant mais courbe d'apprentissage raide.",
          code: '@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain chain(HttpSecurity http) throws Exception {\n        http.authorizeHttpRequests(a -> a\n            .requestMatchers("/public/**").permitAll()\n            .anyRequest().authenticated()\n        );\n        return http.build();\n    }\n}',
          language: 'java',
        
          deepDive: `# Spring Security

## Qu'est-ce que c'est

Spring Security est le framework de reference pour l'authentification et l'autorisation dans les applications Spring. Il fournit un système complet de securisation des endpoints, incluant l'authentification (qui etes-vous?), l'autorisation (avez-vous le droit?), et la protection contre les attaques (CSRF, XSS, etc.).

L'architecture repose sur des filtrès chaines (Filter Chain) qui intercepte chaque requêteHTTP.

## Syntaxe et exemples

### Configuration de base

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
            );
        return http.build();
    }
}
\`\`\`

### Configuration de l'authentification

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("password"))
            .rôles("USER")
            .build();

        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin"))
            .rôles("ADMIN", "USER")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

### Authentification avec JPA

\`\`\`java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}
\`\`\`

### Securisation méthodes

\`\`\`java
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {
    // Permet @PreAuthorize sur les méthodes
}
\`\`\`

\`\`\`java
@Service
public class ProductService {
    @PreAuthorize("hasRole('ADMIN') or #product.owner == authentication.name")
    public void deleteProduct(Product product) {
        // ...
    }
}
\`\`\`

### JWT avec Spring Security

\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
\`\`\`

## Bonnes pratiques

- **Toujours utiliser BCrypt ou Argon2** pour encoder les mots de passe, jamais MD5 ou SHA
- **Desactiver CSRF uniquement quand necessaire**: les APIs REST avec JWT peuvent le desactiver
- **Configurer le logout correctement**: invalider la session et les tokens
- **Utiliser @PreAuthorize pour la securisation méthodes**: plus fin que lesregles URL

## Pièges courants

- **Confondre authentication et authorization**: deux concepts différents
- **Oublier le PasswordEncoder bean**: les mots de passe ne seront pas encodes
- **CSRF desactive pour les APIs sans JWT**: expose aux attaques CSRF
- **Session fixation**: configurer \`sessionManagement\` pour éviter les attaques de fixation

## Source

[Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html)`},
        {
          id: 'sp-13',
          question: 'Exceptions globales',
          answer: "`@ControllerAdvice` centralise la gestion des exceptions de tous les contrôleurs. `@ExceptionHandler` mappe chaque type d'exception à une réponse HTTP (`EntityNotFoundException` → 404, validation → 400).\n\nAvantages : réponses cohérentes, format d'erreur standardisé, plus de `try-catch` dispersés. On définit aussi un handler par défaut pour les exceptions imprévues (__500 sans détails techniques en prod__).",
          code: '@ControllerAdvice\npublic class GlobalExHandler {\n    @ExceptionHandler(UserNotFound.class)\n    public ResponseEntity<String> handle(UserNotFound e) {\n        return ResponseEntity.status(404).body(e.getMessage());\n    }\n}',
          language: 'java',
        
          deepDive: `# Exceptions globales dans Spring MVC

## Qu'est-ce que c'est

Spring MVC offre un mecanisme d'gestion des exceptions via @ExceptionHandler et @ControllerAdvice qui permet de centraliser le traitement des erreurs et de retourner des responses JSON ou HTML standardisees.

Ce mecanisme évite de repeter du code de gestion d'erreurs dans chaque contrôleur.

## Syntaxe et exemples

### @ExceptionHandler simple

\`\`\`java
@RestController
public class UserController {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(404, ex.getMessage());
        return ResponseEntity.status(404).body(error);
    }
}
\`\`\`

### @ControllerAdvice global

\`\`\`java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(404, ex.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(400, ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Unexpected error", ex);
        return ResponseEntity.status(500)
            .body(new ErrorResponse(500, "Internal server error"));
    }
}
\`\`\`

### Reponse d'erreur structuree

\`\`\`java
public record ErrorResponse(int status, String message, Instant timestamp) {
    public ErrorResponse(int status, String message) {
        this(status, message, Instant.now());
    }
}
\`\`\`

### Handling avec Body

\`\`\`java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidationErrors(
        MethodArgumentNotValidException ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", 400);
    response.put("errors", ex.getBindingResult().getFieldErrors().stream()
        .map(e -> e.getField() + ": " + e.getDefaultMessage())
        .toList());
    return ResponseEntity.badRequest().body(response);
}
\`\`\`

## Bonnes pratiques

- **Centraliser tous les traitement d'exceptions** dans un @ControllerAdvice
- **Utiliser des codes d'erreur constants** pour une API stable
- **Logger les exceptions inattendues** pour faciliter le debug
- **Retourner des informations كافية mais pas trop** pour éviter de reveler des details internes

## Pièges courants

- **Mauvais ordre des handlers**: le handler le plus general doit être en dernier
- **Oublier les exceptions du conteneur** (404, 405): elles ne passent pas par @ExceptionHandler
- **Reponse mal formee**: s'assurer que la réponse JSON est toujours valide
- **Exception null dans le handler**: verifier les cas où l'exception peut être null

## Source

[Spring MVC Exception Handling](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/advice.html)`},
        {
          id: 'sp-18',
          question: 'Actuator',
          answer: "Module de **monitoring et management** en production. Expose des endpoints : `/actuator/health` (statut app), `/actuator/info`, `/actuator/metrics` (métriques JVM, HTTP), `/actuator/env` (config), `/actuator/beans` (beans chargés).\n\n__En production, sécurisez et limitez les endpoints__ exposés via `management.endpoints.web.exposure.include`. Intégration native avec **Prometheus**, **Grafana** pour le monitoring. **Health indicators** personnalisables pour surveiller BDD, APIs externes, etc.",
        
          deepDive: `# Spring Boot Actuator

## Qu'est-ce que c'est

Actuator fournit des endpoints de monitoring et management pour Spring Boot. Il expose des informations sur la sante, les metriques, les beans, etc.

## Syntaxe et exemples

Dependance Maven:
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

Configuration (application.yml):
\`\`\`yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when_authorized
  health:
    rabbit:
      enabled: true
\`\`\`

Endpoints disponibles:
- /actuator/health - Sante de application
- /actuator/info - Informations personnalisees
- /actuator/metrics - Metriques (mémoire, CPU, etc.)
- /actuator/env - Variables denvironnement
- /actuator/beans - Tous les beans Spring
- /actuator/httptrace - Trace des requêtes HTTP

## Bonnes pratiques

- Exposer uniquement les endpoints necessaires en production.
- Protéger les endpoints sensibles avec Spring Security.
- Utiliser Prometheus + Grafana pour la visualisation.
- Configurer health checks pour Kubernetes/Load Balancers.

## Pièges courants

- Exposer /env et /beans en production = Risque de securite.
- Ne pas configurer de health check custom = Sante non fiable.
- Oublier de desactiver les endpoints non utilises.

Source : [Spring Docs](https://docs.spring.io/spring-boot/reference/actuator.html)`},
        {
          id: 'sp-19',
          question: 'Spring Boot Testing',
          answer: "**`@SpringBootTest`** : charge le contexte complet pour les tests d'intégration. **`@WebMvcTest`** : teste un contrôleur en isolation (contexte web uniquement). **`@DataJpaTest`** : teste la couche JPA avec BDD en mémoire.\n\nPour les tests unitaires : `@MockBean` (remplace un bean par un mock) et `@SpyBean` (mock partiel). __Règle : tests unitaires rapides (pas de contexte Spring) pour la logique, tests d'intégration (avec contexte) pour les couches.__",
          code: '@SpringBootTest\nclass UserServiceIT {\n    @Autowired UserService service;\n    @MockBean UserRepo repo;\n\n    @Test\n    void testFind() {\n        when(repo.findById(1L)).thenReturn(Optional.of(user));\n        assertThat(service.find(1L)).isPresent();\n    }\n}',
          language: 'java',
        
          deepDive: `# Spring Boot Testing

## Qu'est-ce que c'est

Spring Boot offre un framework complet pour tester les applications avec @SpringBootTest, @WebMvcTest, @DataJpaTest, etc. Chaque annotation cible une couche specifique.

## Syntaxe et exemples

Test dintegration:
\`\`\`java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldCreateUser() throws Exception {
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"name\\":\\"John\\",\\"email\\":\\"john@test.com\\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("John"));
    }
}
\`\`\`

Test unitaire avec MockMvc:
\`\`\`java
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUser() throws Exception {
        when(userService.findById(1L)).thenReturn(new User("John"));
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"));
    }
}
\`\`\`

Test JPA:
\`\`\`java
@DataJpaTest
class UserRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindByEmail() {
        entityManager.persist(new User("john@test.com"));
        
        Optional<User> user = userRepository.findByEmail("john@test.com");
        
        assertThat(user).isPresent();
    }
}
\`\`\`

## Bonnes pratiques

- Utiliser @DataJpaTest pour les tests de repository (plus rapide).
- Mocker les services externes avec @MockBean.
- Utiliser @TestConfiguration pour les beans de test.
- Preferer les tests dintegration pour verifier les configurations.

## Pièges courants

- Oublier @Transactional sur les tests JPA = Donnees persistees.
- Tests trop couples a limplementation = Fragilite.
- Ne pas utiliser des donnees de test isolees = Contamination.

Source : [Spring Docs](https://docs.spring.io/spring-boot/reference/testing.html)`},
        {
          id: 'sp-20',
          question: 'N+1 en JPA et solutions',
          answer: "Le problème **N+1** : une requête pour charger N entités, puis N requêtes supplémentaires pour leurs relations *lazy*. Exemple : charger 100 commandes + 100 requêtes pour leurs lignes.\n\nSolutions : **`JOIN FETCH`** dans la requête JPQL (tout en une requête), **`@EntityGraph`** (déclare les relations à charger), **`@BatchSize`** (regroupe les N requêtes en N/batchSize), ou *DTO projection* (ne charger que les champs nécessaires).\n\n__Le problème N+1 est le piège n°1 de performance en JPA — surveillez les logs SQL.__",
          code: '// Solution 1 : JOIN FETCH\n@Query("SELECT c FROM Commande c JOIN FETCH c.lignes")\nList<Commande> findAllWithLignes();\n\n// Solution 2 : EntityGraph\n@EntityGraph(attributePaths = {"lignes"})\nList<Commande> findAll();',
          language: 'java',
        
          deepDive: `# N+1 en JPA et solutions

## Qu'est-ce que c'est

Le problème N+1 survient quand JPA execute 1 requête pour charger les parents, puis N requêtes pour charger les enfants de chaque parent.

## Syntaxe et exemples

Probleme N+1:
\`\`\`java
// 1 requête pour les auteurs
List<Author> authors = authorRepository.findAll();

// N requêtes pour les livres de chaque auteur
authors.forEach(author -> 
    author.getBooks().size()  // 1 requête par auteur!
);
\`\`\`

Solutions:

1. Join Fetch:
\`\`\`java
@Query("SELECT a FROM Author a JOIN FETCH a.books WHERE a.id = :id")
Optional<Author> findByIdWithBooks(@Param("id") Long id);
\`\`\`

2. Entity Graph:
\`\`\`java
@NamedEntityGraph(
    name = "author.withBooks",
    attributeNodes = @NamedAttributeNode("books")
)
@Entity
public class Author { ... }

@EntityGraph(value = "author.withBooks", type = EntityGraph.EntityGraphType.LOAD)
Optional<Author> findById(Long id);
\`\`\`

3. Batch Fetching:
\`\`\`java
@OneToMany(mappedBy = "author")
@BatchSize(size = 25)
private List<Book> books;
\`\`\`

4. Entity Graph global:
\`\`\`yaml
spring:
  jpa:
    open-in-view: false
    entity-mapper:
      default:
        entity-graph:
          author:
            key: withBooks
            attributes:
              - books
\`\`\`

## Bonnes pratiques

- Utiliser EXPLAIN ANALYZE pour detecter les problème N+1.
- Preferez les requêtes JPQL avec JOIN FETCH.
- Configurer le batch fetching pour les relations lazy.
- Monitorer le nombre de requêtes en développement.

## Pièges courants

- Oublier @Transactional pour charger les relations lazy.
- N+1 cache dans les queries dynamiques.
- Over-fetching avec des jointures sur de grandes collections.

Source : [Spring Data JPA Docs](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods.html)`},
      ],
    },
  ],
};