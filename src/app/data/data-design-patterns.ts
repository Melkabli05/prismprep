import type { InterviewCategory } from '../models/interview.models';

export const designPatternsCategory: InterviewCategory = {
  id: 'patterns',
  title: 'Design Patterns',
  color: 'bg-lime-100 text-lime-700',
  description: 'Patterns de création, structure, comportement',
  sections: [
    {
      id: 'dp-creation',
      title: 'Patterns de Création',
      questions: [
        {
          id: 'dp-1',
          question: 'Singleton',
          answer: "Pattern garantissant une **seule instance** d'une classe avec un point d'accès global. Constructeur privé + méthode statique créant l'instance au premier appel.\n\nCas d'usage : connexion BDD, logger, config globale.\n\nCritiques : état global *difficile à tester* (hard to mock), viole la responsabilité unique, concurrence à gérer en multi-thread. En Java, l'**enum** avec un seul élément est l'implémentation la plus robuste (thread-safe + résiste à la sérialisation). Autres approches thread-safe : **holder statique** (lazy + thread-safe via chargement de classe) ou **synchronisation** (coûteuse).\n\n__Préférer l'injection de dépendances quand c'est possible.__",
          code: 'public class Config {\n    private static Config instance;\n    private Config() {}\n    public static Config get() {\n        if (instance == null) instance = new Config();\n        return instance;\n    }\n}',
          language: 'java',
        },
        {
          id: 'dp-2',
          question: 'Factory Method',
          answer: "Pattern délégant l'**instanciation** à une classe dédiée, au lieu d'utiliser `new` directement. Le code appelant ne connaît que l'**interface**, pas la classe concrète.\n\nVariantes : **Simple Factory** (méthode statique qui choisit l'implémentation), **Factory Method** (sous-classes choisissant l'implémentation), **Abstract Factory** (famille de produits liés).\n\nAvantage : **couplage faible** — changer l'implémentation ne modifie pas le code appelant. Utilisé partout : `LoggerFactory`, `DataSourceFactory`. __Quand vous voyez `new MaClasseConcrète()` partout → pensez Factory.__",
          code: 'public interface Notification { void envoyer(); }\n\npublic class NotificationFactory {\n    public static Notification create(String type) {\n        return switch(type) {\n            case "email" -> new EmailNotif();\n            case "sms" -> new SmsNotif();\n            default -> throw new IllegalArgumentException();\n        };\n    }\n}',
          language: 'java',
        },
        {
          id: 'dp-3',
          question: 'Builder',
          answer: "Pattern séparant la **construction** d'un objet complexe de sa **représentation**. Au lieu d'un constructeur avec 10 paramètres, on chaîne les appels de méthode de façon lisible.\n\nAvantages : **lisible** (on sait ce qu'on construit), **flexible** (paramètres optionnels sans surcharge), **immuable** (l'objet est construit d'un coup).\n\nUtilisé par `StringBuilder`, `Stream.Builder` en Java, et les `Request` dans les APIs HTTP. __Quand un constructeur a plus de 4 paramètres → pensez Builder.__",
          code: 'User user = new User.Builder()\n    .nom("Dupont")\n    .email("dupont@mail.com")\n    .age(30)\n    .role(Role.ADMIN)\n    .build();',
          language: 'java',
        },
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
        },
        {
          id: 'dp-5',
          question: 'Decorator',
          answer: "Pattern ajoutant dynamiquement des **responsabilités** à un objet sans modifier sa classe. Enveloppe l'objet dans un « décorateur » implémentant la même interface.\n\nAlternative à l'héritage pour étendre un comportement : chaque décorateur ajoute une couche, et on peut les combiner librement.\n\nEn Java : `InputStream` décoré par `BufferedInputStream` décoré par `DataInputStream`. Dans les `InputStream` Java, chaque couche ajoute une fonctionnalité. __Quand vous voulez ajouter des comportements sans sous-classer → Decorator.__",
          code: 'interface Coffee { double cost(); }\nclass SimpleCoffee implements Coffee { double cost() { return 1; } }\nclass MilkDecorator implements Coffee {\n    private Coffee coffee;\n    double cost() { return coffee.cost() + 0.5; }\n}',
          language: 'java',
        },
        {
          id: 'dp-6',
          question: 'Proxy',
          answer: "Pattern fournissant un **substitut** contrôlant l'accès à un objet. Le proxy implémente la même interface et intercepte les appels.\n\nTypes : **virtual proxy** (création paresseuse — l'objet n'est instancié qu'au besoin), **protection proxy** (contrôle d'accès), **remote proxy** (accès à un objet distant), **cache proxy** (mise en cache des résultats).\n\nEn Spring, les **proxys dynamiques** sont au cœur de l'AOP : `@Transactional`, `@Async`, `@Security` fonctionnent via proxys. __Comprendre le proxy, c'est comprendre comment Spring intercepte vos appels.__",
          code: 'interface Service { void operation(); }\nclass RealService implements Service { void operation() { ... } }\nclass ServiceProxy implements Service {\n    private RealService real;\n    void operation() {\n        // log, contrôle, cache...\n        real.operation();\n    }\n}',
          language: 'java',
        },
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
        },
        {
          id: 'dp-8',
          question: 'Observer',
          answer: "Pattern où un **sujet** maintient une liste d'**observateurs** et les notifie automatiquement de tout changement d'état. C'est le principe des **événements**.\n\nLe sujet ne connaît pas les observateurs concrets — juste leur interface `Observer`. Ajout/retrait d'observateurs sans modifier le sujet (**OCP** respecté).\n\nUtilisé partout : listeners d'événements UI, `PropertyChangeListener` en Java, `EventBus`, reactive programming (`RxJS`, `Spring Events`). __Quand un objet doit réagir aux changements d'un autre sans couplage fort → Observer.__",
          code: 'interface Subject {\n    void attach(Observer o);\n    void detach(Observer o);\n    void notifyObservers();\n}\ninterface Observer {\n    void update(String message);\n}',
          language: 'java',
        },
        {
          id: 'dp-9',
          question: 'Repository',
          answer: "Pattern abstrayant la couche d'accès aux données : le **Repository** expose des méthodes métier (`trouverParNom()`, `sauvegarder()`) et cache les détails SQL/ORM.\n\nLe code métier appelle le repository sans connaître la BDD sous-jacente. Facilite les tests (remplacement par un mock) et le changement de SGBD.\n\nEn Spring Data JPA, les interfaces `JpaRepository` implémentent ce pattern automatiquement. __Sépare la logique de persistance de la logique métier.__",
          code: 'public interface UserRepository {\n    User findById(Long id);\n    List<User> findByName(String name);\n    void save(User user);\n}',
          language: 'java',
        },
      ],
    },
  ],
};