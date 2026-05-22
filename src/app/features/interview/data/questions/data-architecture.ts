import type { InterviewCategory } from '../../../../core/models/interview.models';

export const architectureCategory: InterviewCategory = {
  id: 'architecture',
  title: 'Architecture Logicielle',
  color: 'background: #DB2777; color: white',
  description: 'Patterns architecturaux, SOLID, DDD',
  sections: [
    {
      id: 'arch-patterns',
      title: 'Patterns Architecturaux',
      questions: [
        {
          id: 'arch-1',
          question: 'MVC',
          answer: "**Model-View-Controller** : pattern séparant l'application en trois couches. **Model** (métier + données, aucune connaissance de l'UI), **View** (présentation, aucune logique métier), **Controller** (reçoit les actions utilisateur, appelle le Model, choisit la View).\n\n**Séparation des préoccupations** : chaque couche évolue indépendamment — on peut passer d'une interface web à une API REST sans toucher au Model. Implémentation connue : `Spring MVC` (Java), `Angular` (frontend).",
        
          deepDive: `# MVC — Modèle-Vue-Contrôleur

## Qu'est-ce que c'est ?

Le **MVC (Model-View-Controller)** est un patron d'architecture logicielle apparu dans les années 1970 avec le langage **Smalltalk-80**, conçu pour séparer une application interactive en trois responsabilités distinctes. L'objectif fondamental est d'isoler la logique métier de la présentation, permettant à chaque couche d'évoluer indépendamment.

- **Model** : données métier, règles de gestion, accès persistant. Aucune connaissance de l'interface utilisateur.
- **View** : affichage des données, rendu de l'interface. Aucune logique métier.
- **Controller** : intermédiaire qui reçoit les actions utilisateur, interroge le Model et sélectionne la View.

## Concept détaillé

MVC repose sur une **séparation stricte des préoccupations** (*Separation of Concerns*). Dans une architecture web classique :

1. Le navigateur envoie une requête HTTP au Controller.
2. Le Controller extrait les paramètres, valide l'entrée, et appelle le Model.
3. Le Model interagit avec la base de données, applique les règles métier, retourne les données.
4. Le Controller choisit la View, lui transmet les données (modèle de présentation).
5. La View génère le HTML/CSS/JSON et renvoie la réponse.

Cette séparation permet de remplacer la couche de présentation (passer d'une API JSON à une interface web) sans toucher au Model, et de tester chaque couche indépendamment.

## Schéma / Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│                 UTILISATEUR                    │
└──────────────────┬──────────────────────────┘
                   │ Action (clic, soumission)
                   ▼
┌─────────────────────────────────────────────┐
│              CONTROLLER                        │
│    Reçoit la requête, valide, orchestre       │
│    Ne contient PAS de logique métier          │
└──────┬───────────────────────────┬───────────┘
       │ interroge                 │ sélectionne
       ▼                           ▼
┌──────────────┐          ┌──────────────────┐
│    MODEL     │          │      VIEW        │
│ Données      │◄────────►│   Présentation   │
│ Règles métier│   BDD    │   Rendu HTML     │
│ Validation   │          │   Templates      │
└──────────────┘          └──────────────────┘
\`\`\`

## Comparaison avec les alternatives

| Critère | MVC | MVP | MVVM |
|---------|-----|-----|------|
| Rôle du Controller/Presenter | Routeur d'entrée | Orchestrateur complet | Abstraction de la View |
| Testabilité View | Faible (couplage template) | Élevée (interface View) | Élevée (data-binding) |
| Complexité | Faible | Moyenne | Élevée |
| Couplage View-Controller | Faible | Fort (1:1) | Faible (bindings) |
| Popularité Web | Très élevée (Spring MVC, Rails) | Modérée (GWT) | Élevée (Angular, WPF) |
| Apprentissage | Facile | Modéré | Modéré |

## Avantages et inconvénients

**Avantages :**
- Séparation claire des responsabilités, maintenance facilitée.
- Développement parallèle possible (frontend/backend).
- Testabilité : chaque couche se teste isolément.
- Réutilisabilité du Model avec différentes Views.

**Inconvénients :**
- Complexité accrue pour des applications simples (overhead).
- Controllers peuvent devenir « gras » si la logique métier y est placée.
- Navigation complexe dans le code (3 fichiers pour une fonctionnalité).
- Pas adapté aux architectures événementielle ou réactive pures.

## Cas d'usage typiques

1. **Application web Spring Boot** : \`@RestController\` (Controller), \`@Service\` (Model), templates Thymeleaf (View).
2. **Application Angular moderne** : Composants (View/Controller), Services (Model), avec une approche component-based qui étend MVC.
3. **API REST** : Controllers qui exposent des endpoints, sans View (réponse JSON directement).
4. **Framework Ruby on Rails** : Implémentation MVC conventionnelle avec génération automatique.

## Patterns et anti-patterns

**Patterns recommandés :**
- **Service Layer** : extraire la logique métier du Controller vers des Services.
- **Repository Pattern** : abstraction de l'accès aux données dans le Model.
- **DTO (Data Transfer Object)** : objets de transfert entre Controller et View.

**Anti-patterns à éviter :**
- **Fat Controller** : controller qui contient toute la logique métier, rendant le Model anémique.
- **God View** : View qui accède directement au Model ou à la base de données.
- **Controller耦合** : controller qui instancie directement des dépendances plutôt que de les recevoir.

## Bonnes pratiques

1. **Controllers légers** : maximum 15-20 lignes par méthode, délégation aux services.
2. **Models riches** : encapsuler toute la logique métier, pas seulement des getters/setters.
3. **Views passives** : pas de logique conditionnelle complexe, pas d'appels BDD.
4. **Injection de dépendances** : les Controllers reçoivent leurs dépendances, ne les créent pas.
5. **Validation en entrée** : valider les paramètres dès le Controller.
6. **Format de réponse cohérent** : utiliser un wrapper de réponse standardisé.
7. **Tests unitaires** : tester le Model sans la View ni le Controller.

## Pièges courants

1. **Logique métier dans les Controllers** : violation du SRP, code non réutilisable.
2. **View qui interroge directement le Model** : crée un couplage fort, rend la View impossible à tester.
3. **Modèle anémique** : classes Model sans comportement, juste des getters/setters (anti-pattern).
4. **Absence de couche Service** : conduit à duplication de code entre Controllers.
5. **Trop de responsabilités dans un Controller** : un Controller par ressource métier, pas un seul Controller pour tout.
6. **Ignorer la gestion d'erreurs** : exceptions non gérées qui remontent jusqu'à l'utilisateur.

Source : [Martin Fowler — MVC](https://www.martinfowler.com/eaaDev/uiArchs.html)`},
        {
          id: 'arch-2',
          question: 'Clean Architecture',
          answer: "Approche (Uncle Bob) plaçant le **code métier au centre**, les détails techniques en périphérie. **Règle de dépendance** : tout pointe vers l'intérieur.\n\nCouches du centre vers l'extérieur : **Entities** (règles business pures), **Use Cases** (logique applicative), **Interface Adapters** (contrôleurs, gateways), **Frameworks & Drivers** (BDD, framework web, UI).\n\nLe code métier ignore totalement l'infrastructure — testable unitairement sans BDD ni framework. Plus verbeux, mais *investissement rentable en maintenabilité* pour les projets durables.",
        
          deepDive: `# Clean Architecture

## Qu'est-ce que c'est ?

La **Clean Architecture** est un patron architectural proposé par **Robert C. Martin (Uncle Bob)** en 2012, qui organise le code en **couches concentriques** avec une règle de dépendance stricte : les dépendances pointent toujours **de l'extérieur vers l'intérieur**. Le code métier (au centre) ne dépend jamais des détails techniques (en périphérie).

L'objectif est de créer des systèmes **testables**, **indépendants des frameworks**, et **indépendants de l'infrastructure** (base de données, UI, services externes).

## Concept détaillé

La Clean Architecture définit quatre couches :

1. **Entities (Domaine)** : objets métier fondamentaux avec les règles business critiques. Aucune dépendance technique.
2. **Use Cases (Cas d'utilisation)** : orchestration du flux applicatif, dépend des Entities uniquement.
3. **Interface Adapters (Adaptateurs)** : convertissent les données entre les cas d'utilisation et le monde extérieur (Controllers, Presenters, Gateways).
4. **Frameworks & Drivers** : tout ce qui est technique (BDD, framework web, UI, librairies externes).

**Règle d'or** : ce qui change souvent (UI, BDD) ne doit pas impacter ce qui change rarement (logique métier).

## Schéma / Architecture

\`\`\`
                    ┌─────────────────────────┐
                    │  Frameworks & Drivers    │
                    │   (BDD, Web, UI, API)     │
                    │ ┌─────────────────────┐ │
                    │ │  Interface Adapters │ │
                    │ │ (Controllers, GW)   │ │
                    │ │ ┌─────────────────┐ │ │
                    │ │ │   Use Cases     │ │ │
                    │ │ │  (Cas d'usage) │ │ │
                    │ │ │ ┌─────────────┐ │ │ │
                    │ │ │ │  Entities   │ │ │ │
                    │ │ │ │ (Domaine)   │ │ │ │
                    │ │ │ └─────────────┘ │ │ │
                    │ │ └─────────────────┘ │ │
                    │ └─────────────────────┘ │
                    └─────────────────────────┘
        DÉPENDANCES ───────────► (vers l'intérieur)
\`\`\`

## Comparaison avec les alternatives

| Critère | Clean Architecture | Architecture Hexagonale | Architecture en Couches |
|---------|-------------------|------------------------|------------------------|
| Origine | Robert C. Martin (2012) | Alistair Cockburn (2005) | Traditionnelle (1990s) |
| Règle de dépendance | Strictement vers l'intérieur | Vers le centre (ports) | Descendante seulement |
| Isolation du domaine | Totale | Totale | Partielle |
| Testabilité | Très élevée | Très élevée | Modérée |
| Complexité | Élevée | Élevée | Faible |
| Flexibilité framework | Maximale | Maximale | Faible (couplée) |
| Effort initial | Important | Important | Faible |

## Avantages et inconvénients

**Avantages :**
- **Indépendance des frameworks** : remplacer Spring par Micronaut ? Aucun impact sur le métier.
- **Testabilité** : les Use Cases se testent sans base de données, sans serveur web.
- **Indépendance de l'UI** : changer Angular pour React ? Seule la couche adapters change.
- **Indépendance de la BDD** : passer de Postgres à MongoDB ? Seul le repository adapter change.
- **Règle de dépendance claire** : l'architecture est auto-documentée par la structure.

**Inconvénients :**
- **Verbeux** : beaucoup de classes, d'interfaces, d'indirection.
- **Sur-engineering pour les petits projets** : un CRUD simple ne justifie pas cette complexité.
- **Courbe d'apprentissage** : l'équipe doit comprendre la philosophie.
- **Coût initial élevé** : plus de code à écrire au démarrage.

## Cas d'usage typiques

1. **Application métier complexe** (assurance, banque) avec des règles métier évolutives et longévives.
2. **Microservice critiques** où la logique métier centrale doit être isolée et testée rigoureusement.
3. **Projets avec rotation d'équipe** : la structure claire facilite l'intégration des nouveaux.
4. **Applications nécessitant plusieurs interfaces** (API REST + Web + CLI) partageant le même noyau métier.

## Décisions architecturales (ADR)

1. **Pourquoi ne pas tout mettre dans les Use Cases ?** Parce que les Entities représentent les invariants métier qui survivent aux changements de cas d'usage.
2. **Qui définit les interfaces ?** C'est le domaine (les Use Cases) qui définit les ports ; les adaptateurs les implémentent, pas l'inverse.
3. **Framework first ou Clean Architecture first ?** Commencer par une architecture en couches simple, refactorer vers Clean Architecture quand la complexité métier le justifie.

## Bonnes pratiques

1. **Les Entities ne doivent rien importer** : pas d'annotation JPA, pas d'import de librairie externe.
2. **Un Use Case = une action métier** : \`CreateOrder\`, \`CancelOrder\`, pas \`OrderService\` fourre-tout.
3. **Les interfaces de repository sont définies dans la couche Use Case**.
4. **Utiliser des objets de requête/réponse** dans les Use Cases, pas des entités exposées.
5. **Injection de dépendances** : le mécanisme d'injection appartient à la couche Frameworks.
6. **Tester les Use Cases en premier** : ils contiennent la valeur métier ; si ils marchent, le cœur est sain.

## Pièges courants

1. **Mettre des annotations framework dans les entités** : \`@Entity\`, \`@Column\` couplent le domaine à JPA/Hibernate.
2. **Use Cases qui deviennent des services CRUD** : si un Use Case ne fait que passer des données à un repository, l'indirection n'apporte rien.
3. **Violation de la règle de dépendance** : un Use Case qui importe directement un adaptateur (ex : \`PostgresUserRepo\`) crée une dépendance externe.
4. **Interfaces dupliquées** : une interface dans le domaine ET une classe concrète dans l'infrastructure — c'est normal, c'est le point d'inversion.
5. **Trop de Use Cases** : chaque variante de paramètre devient un Use Case séparé → explosion de classes.
6. **Oublier le principe YAGNI** : ajouter Clean Architecture sur un projet de 3 semaines, c'est de la dette architecturale.

Source : [Clean Architecture — Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)`},
        {
          id: 'arch-3',
          question: 'Architecture hexagonale',
          answer: "Aussi appelée **Ports & Adapters** : le domaine métier est au centre, les adaptations techniques en périphérie. Les **ports** (interfaces) définissent les contrats d'entrée/sortie, les **adapters** implémentent ces ports pour les technologies spécifiques.\n\nLe domaine ne dépend de rien — les adapters dépendent du domaine. On peut changer de BDD, de framework web, de broker de messages sans toucher au métier.\n\nSimilaire à Clean Architecture mais avec un focus sur la **testabilité** : les adapters de test remplacent l'infrastructure réelle. __Idéal pour les applications métier complexes.__",
        
          deepDive: `# Architecture Hexagonale (Ports & Adapters)

## Qu'est-ce que c'est ?

L'**architecture hexagonale**, aussi appelée **Ports & Adapters**, a été proposée par **Alistair Cockburn** en 2005. Elle place le domaine métier au centre d'un système isolé du monde extérieur. Toutes les interactions avec l'extérieur (base de données, API, interface utilisateur) passent par des **ports** (interfaces) et leurs **adaptateurs** (implémentations concrètes).

Le principe fondamental : **le domaine ne dépend de rien** ; ce sont les adaptateurs qui dépendent du domaine. On peut changer de base de données, de framework web ou de broker de messages sans aucun impact sur le code métier.

## Concept détaillé

L'architecture distingue deux types de ports :

**Ports primaires (driven)** : interfaces par lesquelles le monde extérieur entre dans l'application. Exemple : \`RequeteHandler\`, \`CommandeBus\`. Les adaptateurs primaires incluent les contrôleurs REST, les consommateurs de files de messages, les interfaces CLI.

**Ports secondaires (driven)** : interfaces que l'application utilise pour atteindre le monde extérieur. Exemple : \`UserRepository\`, \`EmailSender\`, \`PdfGenerator\`. Les adaptateurs secondaires incluent les implémentations JPA/Postgres, l'envoi SMTP, l'appel à une API externe.

Le nom « hexagonal » vient de la représentation visuelle originelle — non pas parce qu'il y a 6 côtés, mais pour montrer que plusieurs adaptateurs peuvent se brancher sur chaque port.

## Schéma / Architecture

\`\`\`
          ┌──────────────────────────────────────┐
          │           MONDE EXTÉRIEUR              │
          │  ┌──────────┐         ┌──────────┐    │
          │  │ UI (Web) │         │ CLI (API) │    │
          │  └────┬─────┘         └─────┬────┘    │
          │       │                     │          │
          │  ┌────▼─────────────────────▼────┐    │
          │  │       ADAPTATEURS PRIMAIRES    │    │
          │  └────┬─────────────────────┬────┘    │
          └───────┼─────────────────────┼─────────┘
                  │                     │
          ════════╪═════ PORTS ═════════╪═══════════
                  │                     │
          ┌───────▼─────────────────────▼────────┐
          │            DOMAINE (CŒUR)              │
          │    Use Cases, Entities, Services       │
          └───────┬─────────────────────┬────────┘
                  │                     │
          ════════╪═════ PORTS ═════════╪═══════════
                  │                     │
          ┌───────▼─────────────────────▼────────┐
          │       ADAPTATEURS SECONDAIRES        │
          │  ┌──────────┐         ┌──────────┐   │
          │  │PostgreSQL│         │ Stripe   │    │
          │  │ Repository│        │ Payment  │    │
          │  └──────────┘         └──────────┘   │
          └──────────────────────────────────────┘
\`\`\`

## Comparaison avec la Clean Architecture

| Critère | Hexagonale | Clean Architecture |
|---------|-----------|-------------------|
| Origine | Alistair Cockburn (2005) | Robert C. Martin (2012) |
| Métaphore | Ports & Adapters | Couches concentriques |
| Nombre de couches | 3 (domaine, ports, adaptateurs) | 4 (entities, use cases, adapters, frameworks) |
| Règle de dépendance | Vers le centre | Vers l'intérieur |
| Focus principal | Isolation technique | Isolation des préoccupations |
| Différence clé | Accent sur la symétrie ports primaires/secondaires | Accent sur la règle de dépendance stricte |

## Avantages et inconvénients

**Avantages :**
- **Testabilité maximale** : le domaine se teste sans infrastructure ; les adaptateurs se testent avec des mocks des ports.
- **Remplacement technologique** : changer de base de données = réécrire un adaptateur, pas toute l'application.
- **Développement parallèle** : l'équipe domaine et l'équipe infrastructure peuvent travailler en même temps.
- **Indépendance du framework** : le domaine ignore totalement Spring, Quarkus, ou autre.

**Inconvénients :**
- **Indirection** : beaucoup d'interfaces et d'injection de dépendances, le code peut être difficile à suivre.
- **Verbose** : pour chaque port, il faut une interface, une implémentation, et un module d'injection.
- **Sur-engineering** : inadapté pour des CRUD simples ou des prototypes.
- **Coordination** : nécessite que toute l'équipe comprenne et respecte les frontières.

## Cas d'usage typiques

1. **Application bancaire** : le domaine (règles de calcul d'intérêts, validation de transactions) est critique et doit être isolé.
2. **Système multi-canal** : une même application exposée via API REST, files JMS, et interface web — chaque canal est un adaptateur primaire.
3. **Startup en évolution rapide** : le domaine métier est stable, mais les choix techniques (BDD, cloud) changent souvent.
4. **Migration technique** : remplacer progressivement un monolithe Spring/Hibernate par une architecture hexagonale avant de découper en microservices.

## Bonnes pratiques

1. **Définir les ports dans le domaine** : c'est le domaine qui exprime ce dont il a besoin, pas l'adaptateur qui impose son interface.
2. **Un adaptateur = une responsabilité** : ne pas mélanger persistance et envoi d'email dans la même classe.
3. **Nommer les adaptateurs par technologie** : \`PostgresUserRepository\`, \`InMemoryUserRepository\`, \`StripePaymentGateway\`.
4. **Tester le domaine en mémoire** : les tests unitaires utilisent des adaptateurs en mémoire (sans base de données).
5. **Utiliser l'injection de dépendances** pour brancher les adaptateurs au moment de l'exécution.
6. **Garder le domaine pur** : pas d'import de framework, pas d'annotation technique, pas de dépendance externe.

## Pièges courants

1. **Mélanger domaine et infrastructure** : une annotation \`@Entity\` Java dans une classe du domaine crée une dépendance vers Hibernate.
2. **Définir les ports en fonction des adaptateurs** : l'interface doit refléter les besoins du domaine, pas les capacités d'une technologie.
3. **Ports trop génériques** : un port \`save(Object)\` perd toute la force du typage et du contrat métier.
4. **Ignorer les tests d'intégration** : tester les adaptateurs séparément est aussi important que de tester le domaine.
5. **Sous-estimer le coût de l'indirection** : chaque nouvelle fonctionnalité nécessite 4-5 fichiers (interface, implémentation, injection, test).

Source : [Alistair Cockburn — Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)`},
        {
          id: 'arch-4',
          question: 'Domain-Driven Design (DDD)',
          answer: "Approche où le **domaine métier** guide la conception logicielle. Le code reflète le langage des experts métier (**Ubiquitous Language**).\n\nConcepts clés : **Bounded Context** (frontière où un modèle est valide), **Entity** (identité unique), **Value Object** (immuable, comparé par valeur), **Aggregate** (groupe d'objets traité comme une unité transactionnelle), **Repository** (abstraction de la persistance).\n\nDDD convient aux domaines **complexes** où le cœur du problème est métier, pas technique. __Ne pas appliquer DDD partout — c'est un investissement.__",
        
          deepDive: `# Domain-Driven Design (DDD)

## Qu'est-ce que c'est ?

Le **Domain-Driven Design (DDD)** est une approche de conception logicielle popularisée par **Eric Evans** dans son livre de 2003. Elle place le **domaine métier** au centre de la modélisation, avec pour objectif que le code reflète précisément le langage et les concepts des experts métier, pas les contraintes techniques.

DDD répond à un problème fondamental : le fossé entre la compréhension qu'ont les experts métier du système et la façon dont il est implémenté par les développeurs. L'**Ubiquitous Language** (langage omniprésent) est le pont qui réunit les deux mondes.

## Concept détaillé

DDD introduit des concepts clés pour modéliser un domaine complexe :

**Blocs de construction tactiques :**
- **Entity** : objet avec une identité unique qui persiste dans le temps (ex : \`Client#id\`).
- **Value Object** : objet immuable défini par ses attributs, sans identité (ex : \`Adresse\`, \`Money\`).
- **Aggregate** : groupe d'objets traités comme une unité transactionnelle, avec une racine (Aggregate Root).
- **Domain Event** : événement représentant un changement significatif dans le domaine (ex : \`CommandeLivree\`).
- **Repository** : abstraction pour récupérer et persister des Aggregates.
- **Domain Service** : logique métier qui n'appartient à aucune Entity ou Value Object.

**Stratégie — Bounded Context :**
Chaque sous-domaine métier a son propre modèle. Un « Client » dans le contexte E-commerce n'a pas les mêmes attributs que dans le contexte Support Client. Les contextes sont séparés et communiquent via des événements ou des API.

## Schéma / Architecture

\`\`\`
┌────────────────────────────────────────────────────┐
│                   ENTREPRISE                         │
│                                                      │
│  ┌─────────────────┐   ┌───────────────────────┐   │
│  │  Contexte PAIE    │   │  Contexte COMMANDE     │   │
│  │                   │   │                        │   │
│  │  Employee Entity  │   │  Order Aggregate       │   │
│  │  Salaire VO       │   │  OrderLine VO          │   │
│  │  Payroll Service  │   │  Produit Entity        │   │
│  │                   │   │  CommandeConfirmée     │   │
│  │  ────────┐        │   │  (Domain Event)        │   │
│  └───────────┼────────┘   └───────────┬───────────┘   │
│              │ Événements              │ Événements    │
│  ┌───────────▼────────────────────────▼───────────┐   │
│  │          Contexte CATALOGUE                      │   │
│  │  Product Entity, Category VO, Stock VO           │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
\`\`\`

## Comparaison avec les architectures traditionnelles

| Critère | DDD | Architecture CRUD | Architecture Service-Orientée |
|---------|-----|-------------------|-------------------------------|
| Focus | Modèle métier | Données | Opérations |
| Langage | Ubiquitous Language | Technique (tables, colonnes) | Technique (WSDL, SOAP) |
| Complexité | Gère la complexité métier | Simple mais limité | Complexité technique |
| Équipe | Nécessite collaboration métier | Développeurs seuls | Développeurs seuls |
| Évolutivité | Bonne (contextes isolés) | Limitée (couplage) | Moyenne |
| Cas typique | Domaine métier complexe | Application simple | Intégration systèmes |

## Avantages et inconvénients

**Avantages :**
- **Alignement métier-code** : le code utilise les mêmes termes que les experts, réduisant les malentendus.
- **Maintenabilité** : les changements métier se traduisent par des changements localisés dans le modèle.
- **Testabilité** : le domaine pur (sans infrastructure) est testable unitairement.
- **Scalabilité d'équipe** : chaque Bounded Context peut être développé par une équipe différente.

**Inconvénients :**
- **Investissement initial lourd** : ateliers métier, modélisation, itérations.
- **Ne convient pas aux domaines simples** : un CRUD n'a pas besoin de DDD.
- **Difficulté à trouver les bons Aggregates** : mal modélisés, ils deviennent des sources de conflits transactionnels.
- **Nécessite une équipe expérimentée** : DDD mal appliqué est pire que pas de DDD du tout.

## Cas d'usage typiques

1. **Système d'assurance** : gestion des polices, sinistres, remboursements — domaine extrêmement riche avec des règles changeantes.
2. **Plateforme de trading financier** : ordres, carnets d'ordres, exécutions, risque — chaque sous-domaine a ses propres invariants.
3. **Logiciel médical** : dossier patient, prescription, facturation — domaines interconnectés mais avec des modèles différents.
4. **Système de réservation aérienne** : vols, sièges, tarifs, passagers — synchronisation complexe entre contextes.

## Patterns et anti-patterns

**Patterns :**
- **Event Sourcing** : stocker l'état comme une séquence d'événements, parfait avec DDD et Domain Events.
- **CQRS** : séparer les lectures des écritures, souvent associé à DDD pour les modèles complexes.
- **Saga** : coordonner des transactions entre plusieurs Bounded Contexts via des événements.

**Anti-patterns :**
- **Modèle anémique** : une classe avec seulement des getters/setters, toute la logique dans des services.
- **Smart UI** : logique métier dispersée dans l'interface utilisateur (tentation quand DDD semble trop lourd).
- **Single Context Monster** : un seul Bounded Context géant qui contient tout le domaine — perdre le bénéfice de la séparation.

## Bonnes pratiques

1. **Établir l'Ubiquitous Language dès le départ** : glossaire partagé avec les experts métier, validé à chaque itération.
2. **Identifier les Bounded Contexts** : chercher les frontières naturelles où les mêmes mots ont des sens différents.
3. **L'Aggregate Root protège ses invariants** : toute modification passe par la racine, qui valide les règles métier.
4. **Préférer les Value Objects aux primitives** : \`Money(amount, currency)\` plutôt que \`BigDecimal amount\`.
5. **Les Domain Events comme contrat entre contexts** : publier des événements plutôt que d'appeler des services d'un autre contexte.
6. **Itérer sur le modèle** : DDD n'est pas un exercice one-shot, le modèle évolue avec la compréhension du domaine.

## Pièges courants

1. **Appliquer DDD sans domaine complexe** : un simple CRUD avec DDD ajoute une complexité inutile (YAGNI).
2. **Mapper 1:1 entités et tables de BDD** : le modèle relationnel n'est pas le modèle domaine — les Aggregates ne sont pas des tables.
3. **Aggregate trop gros** : un Aggregate qui contient 500 entités devient un goulot d'étranglement transactionnel.
4. **Ignorer les Domain Events** : sans événements, les contextes se couplent via des appels synchrones directs.
5. **Vouloir modéliser tout le domaine avant de coder** : DDD est itératif — on découvre le domaine en codant.
6. **Sous-estimer l'effort de collaboration** : DDD implique des ateliers réguliers avec les métiers, ce qui a un coût.

Source : [Domain-Driven Design — Eric Evans](https://www.domainlanguage.com/)`},
      ],
    },
    {
      id: 'arch-principes',
      title: 'Principes de Conception',
      questions: [
        {
          id: 'arch-5',
          question: 'SOLID',
          answer: "Cinq principes de conception POO : **Single Responsibility** (une classe = une raison de changer), **Open/Closed** (extension sans modification, via polymorphisme et interfaces), **Liskov Substitution** (une sous-classe remplaçable par sa super-classe sans casser le programme), **Interface Segregation** (plusieurs petites interfaces spécialisées plutôt qu'une grosse), **Dependency Inversion** (dépendre des abstractions, pas des implémentations — base de l'**injection de dépendances**).",
        
          deepDive: `# SOLID — Les Cinq Principes de Conception Objet

## Qu'est-ce que c'est ?

**SOLID** est un acronyme pour cinq principes de conception orientée objet, formulés par **Robert C. Martin (Uncle Bob)** dans les années 1990-2000. Ces principes guident la création de code maintenable, évolutif, et résilient face au changement. Ensemble, ils forment le socle de l'architecture logicielle moderne.

## Concept détaillé

### S — Single Responsibility Principle (SRP)
« Une classe ne devrait avoir qu'une seule raison de changer. »

Chaque classe encapsule une unique responsabilité. Si une classe gère la persistance, la validation ET l'envoi d'email, elle a trois raisons de changer — donc trois sources de fragilité.

**Exemple de violation :**
\`\`\`typescript
class Commande {
  calculerTotal() { /* ... */ }
  sauvegarder(conn: Connection) { /* SQL */ }
  envoyerConfirmation() { /* SMTP */ }
}
\`\`\`

**Correction :** \`Commande\` (métier), \`CommandeRepository\` (persistance), \`NotificationService\` (email).

### O — Open/Closed Principle (OCP)
« Les classes doivent être ouvertes à l'extension mais fermées à la modification. »

On ajoute un comportement par extension (nouvelle classe, nouvel adaptateur) sans modifier le code existant. Le polymorphisme est la technique clé.

**Violation :**
\`\`\`typescript
function calculerAire(forme: string, params: any) {
  if (forme === "cercle") return Math.PI * params.rayon ** 2;
  if (forme === "carre") return params.cote ** 2;
  // Ajouter triangle → modifier cette fonction !
}
\`\`\`

### L — Liskov Substitution Principle (LSP)
« Les objets d'une classe dérivée doivent pouvoir remplacer ceux de la classe de base sans altérer le programme. »

Une sous-classe ne doit pas renforcer les préconditions ni affaiblir les postconditions. LSP est violé quand on utilise \`instanceof\` ou des comportements conditionnels basés sur le type réel.

### I — Interface Segregation Principle (ISP)
« Préférer des interfaces spécifiques à une interface générale. »

Mieux vaut trois interfaces (\`Imprimable\`, \`Numerisable\`, \`Faxable\`) qu'une seule \`MachineToutEnUn\` qui force à implémenter des méthodes inutiles.

### D — Dependency Inversion Principle (DIP)
« Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions. »

Une classe \`CommandeService\` ne doit pas instancier \`PostgresqlRepository\` directement. Elle dépend d'une interface \`CommandeRepository\`. L'implémentation concrète est injectée au démarrage.

## Schéma / Architecture

\`\`\`
SRP :  [Validation] [Persistance] [Notification]  →  3 classes séparées
OCP :  [Shape] ← [Circle] [Square] [Triangle]    →  extension sans modification
LSP :  [Bird] → [FlyingBird] [Penguin]           →  comportement substituable
ISP :  [Printer] [Scanner] [Fax]                 →  interfaces fines
DIP :  [Service] → [Interface] ← [Implémentation]  →  dépendance inversée
\`\`\`

## Comparaison entre principes

| Principe | Problème résolu | Technique clé | Anti-pattern associé |
|----------|----------------|---------------|----------------------|
| SRP | Fragilité due aux responsabilités multiples | Décomposition | God Class |
| OCP | Modification risquée du code existant | Polymorphisme, Strategy Pattern | Switch/if géant |
| LSP | Comportement inattendu des sous-classes | Contrat d'interface | instanceof |
| ISP | Dépendances forcées inutiles | Interfaces fines | Interface géante (Fat Interface) |
| DIP | Couplage fort entre couches | Injection de dépendances | New dans le constructeur |

## Avantages et inconvénients

**Avantages :**
- **Maintenabilité** : chaque classe a une raison unique de changer, les impacts sont localisés.
- **Réutilisabilité** : les classes SRP et DIP sont naturellement réutilisables.
- **Testabilité** : les dépendances injectées se mockent facilement.
- **Évolutivité** : OCP permet d'ajouter des fonctionnalités sans toucher au code existant.

**Inconvénients :**
- **Complexité** : multiplication des classes et interfaces, indirection.
- **Sur-engineering** : appliquer SOLID à un script de 50 lignes n'a pas de sens.
- **Dogmatisme** : forcer SOLID partout peut rendre le code illisible.

## Cas d'usage typiques

1. **Refactoring d'un monolithe** : appliquer SRP pour diviser une classe God en classes focales.
2. **Système de plugins** : OCP permet d'ajouter des extensions sans recompiler le cœur.
3. **Application Spring Boot** : DIP est la base de l'injection de dépendances Spring.
4. **Framework de validation** : ISP permet d'avoir \`ValidationRule<T>\` différent pour chaque type de donnée.

## Bonnes pratiques

1. **SRP d'abord** : si une classe dépasse 200 lignes, chercher les responsabilités à extraire.
2. **OCP via Strategy/Composite** : ces patterns concrétisent naturellement OCP.
3. **LSP vérifié par des tests** : écrire des tests génériques sur l'interface de base.
4. **ISP dicté par le client** : une interface est définie par ce dont le client a besoin, pas par ce que le fournisseur peut faire.
5. **DIP via un container IoC** : laisser un framework (Spring, Guice) gérer l'injection.
6. **Appliquer avec pragmatisme** : SOLID est un guide, pas une loi. Un peu de duplication peut valoir mieux qu'une abstraction prématurée.

## Pièges courants

1. **Abstractions prématurées** : ajouter des interfaces « au cas où » avant d'avoir un second implémentation concrète.
2. **SRP interprété comme « une seule méthode »** : une classe peut avoir plusieurs méthodes cohérentes autour d'une responsabilité unique.
3. **LSP violé par l'héritage inapproprié** : \`Carré\` hérite de \`Rectangle\` — si modifier la largeur change aussi la hauteur, LSP est violé.
4. **ISP trop poussé** : une interface par méthode = explosion inutile.
5. **DIP négligé avec \`new\`** : \`new MysqlConnection()\` dans une classe service crée un couplage rigide.

Source : [SOLID Principles — Wikipedia](https://en.wikipedia.org/wiki/SOLID)`},
        {
          id: 'arch-6',
          question: 'YAGNI et Law of Demeter',
          answer: "**YAGNI** (*You Aren't Gonna Need It*) : ne pas implémenter une fonctionnalité tant qu'elle n'est pas **nécessaire**. L'abstraction prématurée et le code « au cas où » sont des sources de complexité inutile.\n\n**Law of Demeter** (principe de moindre connaissance) : un objet ne devrait communiquer qu'avec ses **voisins directs**, pas avec les objets lointains (`a.getB().getC().faire()` = violation). Préféérer `a.faireAvecC()` qui délègue en interne.\n\n__YAGNI évite le sur-engineenieur, Demeter réduit le couplage.__",
        
          deepDive: `# YAGNI et Law of Demeter

## Qu'est-ce que c'est ?

**YAGNI (You Aren't Gonna Need It)** et la **Law of Demeter (LoD)** sont deux principes de conception qui visent à réduire la complexité et le couplage dans les systèmes logiciels. YAGNI vient de l'extreme programming (XP) et nous rappelle de ne coder que ce qui est nécessaire maintenant. La Law of Demeter (principe de moindre connaissance) limite les interactions entre objets pour éviter le couplage en cascade.

## Concept détaillé

### YAGNI

YAGNI dit : « N'ajoute pas de fonctionnalité tant que tu n'en as pas besoin, même si tu es *certain* d'en avoir besoin plus tard. »

Conséquences de violer YAGNI :
- **Complexité superflue** : chaque ligne de code non utilisée doit être comprise, maintenue, et testée.
- **Code mort** : des branches entières qui ne sont jamais exécutées mais qu'on n'ose pas supprimer.
- **Symptôme du « framework interne »** : créer une couche d'abstraction générique « au cas où » on changerait de base de données — alors qu'on n'en changera probablement jamais.
- **Dette technique évitable** : du code écrit sans retour utilisateur est souvent mal adapté au besoin réel.

### Law of Demeter

La LoD limite les interactions entre objets : un objet ne peut appeler que les méthodes de :
1. Lui-même (\`this\`)
2. Ses attributs directs
3. Les objets qu'il crée
4. Les objets reçus en paramètre

**Il ne doit PAS** appeler les méthodes d'objets retournés par d'autres objets (les « amis des amis »).

## Schéma / Architecture

\`\`\`
YAGNI : Écrire ce dont on a besoin
        ┌─────────────────────┐
        │ Code nécessaire     │ ← Seulement ça
        │ aujourd'hui         │
        └─────────────────────┘
        ┌─────────────────────────────────────┐
        │ + Code « au cas où »                │ ← NON
        │ + Abstractions prématurées          │ ← NON
        │ + Fonctionnalités « un jour peut-être »│ ← NON
        └─────────────────────────────────────┘

Law of Demeter :
        Client
          │
          ├── .getOrder()       ← OK (attribut direct)
          │       └── .getProduct()   ← DÉPEND (ami d'ami)
          │               └── .getName()   ← VIOLATION
          │
          └── .getProductName() ← OK (méthode de délégation)
\`\`\`

## Comparaison YAGNI / Law of Demeter

| Aspect | YAGNI | Law of Demeter |
|--------|-------|----------------|
| Problème | Complexité inutile | Couplage excessif |
| Origine | Extreme Programming (XP) | Northeastern University (1987) |
| Devise | « Tu n'en auras pas besoin » | « Ne parle qu'à tes amis proches » |
| Cible | Fonctionnalités | Appels de méthodes |
| Anti-pattern | Gold-plating, Framework interne | Train Wreck (a.b.c.d()) |
| Effet | Code plus simple | Code plus découplé |

## Avantages et inconvénients

**YAGNI - Avantages :**
- Code base plus petite, donc moins de bugs potentiels.
- Temps focusé sur les fonctionnalités à valeur immédiate.
- Architecture plus simple, plus facile à changer.

**YAGNI - Inconvénients :**
- Refactoring plus fréquent quand de nouvelles fonctionnalités arrivent.
- Risque de décisions architecturales court-termistes.
- Peut mener à des redesigns coûteux si omis complètement.

**Law of Demeter - Avantages :**
- Couplage réduit : changer une classe n'impacte pas tout le système.
- Maintenance facilitée : les dépendances sont explicites et limitées.

**Law of Demeter - Inconvénients :**
- Multiplie les méthodes de délégation (wrapper).
- Peut cacher des dépendances réelles.
- Parfois difficile à équilibrer avec les APIs fluentes.

## Cas d'usage typiques

**YAGNI :**
1. **Système de cache** : ne pas implémenter Redis tant qu'un cache mémoire en local ne suffit pas.
2. **Internationalisation (i18n)** : ne pas structurer toute l'appli pour 10 langues si seul le français est supporté.
3. **Multi-tenancy** : ne pas architecturer la BDD pour 100 clients si le premier client n'est pas encore livré.

**Law of Demeter :**
1. **Couche service** : le service appelle \`client.getAdresse()\` plutôt que \`client.getDossier().getContact().getAdresse()\`.
2. **API publique** : une bibliothèque expose des méthodes de haut niveau qui Masquent les détails internes.
3. **ORM** : éviter les accès \`user.orders.first.product.name\` en boucle (problème N+1).

## Bonnes pratiques

1. **YAGNI : demander « ai-je besoin de ça MAINTENANT ? »** avant chaque ligne de code.
2. **YAGNI : pratiquer le TDD** — le test définit exactement ce qu'il faut coder, rien de plus.
3. **YAGNI : résister au « framework interne »** — les abstractions génériques sont rarement nécessaires.
4. **LoD : exprimer l'intention, pas le chemin** — \`getCity()\` plutôt que \`getAddress().getCity()\`.
5. **LoD : utiliser la délégation** — chaque classe expose des méthodes utiles, pas ses composants internes.
6. **LoD : loi de Déméter approximative** — 2 niveaux max de navigation (un point, pas une chaîne).

## Pièges courants

1. **YAGNI utilisé comme excuse pour du code sale** : « on n'a pas besoin de tests/maintenance/maintenant » — c'est un abus du principe.
2. **YAGNI ignoré pour des fonctionnalités « évidentes »** : « on va forcément avoir besoin des exports PDF un jour » — et ce jour n'arrive jamais.
3. **LoD violée par fainéantise** : écrire \`a.getB().getC().getValue()\` est plus rapide que de créer des méthodes de délégation.
4. **LoD prise trop littéralement** : une API fluide comme \`builder.withA().withB().build()\` semble violer LoD mais est intentionnelle.
5. **Train Wreck** : \`getX().getY().getZ().doSomething()\` — symptôme d'un couplage profond et fragile.

Source : [YAGNI — Wikipedia](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)`},
        {
          id: 'arch-7',
          question: 'CAP Theorem',
          answer: "En distribué, on ne peut garantir simultanément que **deux** des trois propriétés : **Consistency** (tous les nœuds voient la même donnée), **Availability** (chaque requête reçoit une réponse), **Partition tolerance** (le système continue malgré les pannes réseau).\n\nEn pratique, les partitions réseau sont inévitables → on choisit entre **CP** (cohérence, ex. `MongoDB` en mode primaire) et **AP** (disponibilité, ex. `Cassandra`).\n\nLes systèmes **SQL** traditionnels privilégient la cohérence (CP). Les **NoSQL** privilégient souvent la disponibilité (AP) avec **cohérence éventuelle**.",
        
          deepDive: `# Le Théorème CAP (Brewer)

## Qu'est-ce que c'est ?

Le **théorème CAP**, formulé par **Eric Brewer** en 2000 (et prouvé formellement en 2002), établit qu'un système distribué ne peut garantir simultanément que **deux** des trois propriétés suivantes :

- **C — Consistency (Cohérence)** : tous les nœuds voient les mêmes données au même moment. Une lecture retourne toujours la valeur de la dernière écriture.
- **A — Availability (Disponibilité)** : chaque requête reçoit une réponse (succès ou échec), même si certains nœuds sont défaillants.
- **P — Partition Tolerance (Tolérance aux partitions)** : le système continue de fonctionner malgré des ruptures de communication entre nœuds (partitions réseau).

La conséquence pratique : comme les partitions réseau sont **inévitables** dans tout système distribué, le choix réel est entre **CP** (sacrifier la disponibilité) et **AP** (sacrifier la cohérence immédiate).

## Concept détaillé

### Les trois combinaisons possibles

**CP (Cohérence + Tolérance aux partitions)** : en cas de partition, le système refuse les écritures sur le nœud isolé pour garantir la cohérence. Exemples : MongoDB (mode primaire), HBase, etcd, Zookeeper.

**AP (Disponibilité + Tolérance aux partitions)** : en cas de partition, tous les nœuds acceptent les lectures/écritures. Les données peuvent diverger temporairement. Exemples : Cassandra, DynamoDB, CouchDB.

**CA (Cohérence + Disponibilité)** : impossible en présence d'une partition. Un système « CA » en pratique devient soit C (refus de servir), soit A (données potentiellement incohérentes) quand une partition survient.

### Nuances importantes

CAP ne dit pas que la cohérence ou la disponibilité est binaire. On peut avoir :
- **Cohérence strong** : lecture toujours de la dernière écriture.
- **Cohérence éventuelle (eventual)** : les nœuds convergent avec le temps.
- **Cohérence read-your-writes** : garantie que l'utilisateur voit ses propres écritures.

## Schéma / Architecture

\`\`\`
                    ┌─────────────────┐
                    │    PARTITION     │
                    │   (inévitable)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │  CP        │    │  AP        │    │  CA        │
   │            │    │            │    │            │
   │ Cohérence  │    │ Dispo      │    │ Cohérence  │
   │ + Tolérance│    │ + Tolérance│    │ + Dispo    │
   │            │    │            │    │            │
   │ MongoDB    │    │ Cassandra  │    │ Théorique  │
   │ HBase      │    │ DynamoDB   │    │ (impossible│
   │ Zookeeper  │    │ CouchDB    │    │  réelle)   │
   └────────────┘    └────────────┘    └────────────┘
\`\`\`

## Comparaison des choix

| Critère | CP (Cohérence forte) | AP (Cohérence éventuelle) |
|---------|---------------------|--------------------------|
| Disponibilité en cas de partition | Réduite (nœud isolé refusé) | Totale |
| Lecture cohérente | Immédiate | Éventuelle |
| Latence en écriture | Plus élevée (quorum) | Plus faible |
| Complexité | Faible à modérée | Élevée (résolution conflits) |
| Cas typique | Transactions financières | Réseaux sociaux, logging |
| Technique de résolution | Consensus (Paxos, Raft) | CRDT, Last-write-wins |

## Avantages et inconvénients

**Systèmes CP :**
- Avantages : données toujours cohérentes, logique applicative plus simple.
- Inconvénients : indisponibilité partielle en cas de partition, latence augmentée.

**Systèmes AP :**
- Avantages : toujours disponibles, meilleure latence, scaling horizontal facile.
- Inconvénients : gestion complexe des conflits, données potentiellement périmées.

## Cas d'usage typiques

1. **Système bancaire (CP)** : un virement ne doit jamais « disparaître ». La cohérence est primordiale — on accepte une indisponibilité temporaire.
2. **Réseau social (AP)** : un « like » peut être temporairement invisible sur certains serveurs. La disponibilité immédiate prime.
3. **Catalogue de produits (CP)** : un client ne doit pas voir un produit en rupture « disponible » dans un nœud et « épuisé » dans un autre.
4. **Logging / Analytics (AP)** : les logs s'accumulent même si le système de stockage est temporairement partitionné.

## Évolutivité et performance

- Les systèmes AP scalent horizontalement plus facilement car ils évitent la coordination entre nœuds.
- Les systèmes CP nécessitent un consensus (Paxos, Raft) qui ajoute de la latence et réduit le débit en écriture.
- Les bases de données modernes (Cassandra, CockroachDB, Spanner) offrent des niveaux de cohérence configurables : on peut choisir le compromis par opération.

## Bonnes pratiques

1. **Comprendre ses besoins métier** : une application financière n'a pas les mêmes exigences qu'un réseau social.
2. **Cohérence configurable** : utiliser des bases de données qui permettent de choisir le niveau de cohérence par requête.
3. **Éviter le dogmatisme** : CAP est un cadre d'analyse, pas une prescription absolue.
4. **Planifier la résolution des conflits** : dans un système AP, comment fusionner des versions divergentes ?
5. **Combiner plusieurs stores** : BDD CP pour les transactions critiques + cache AP pour les lectures fréquentes.
6. **Tester les partitions** : simuler des coupures réseau pour valider le comportement du système (Chaos Engineering).

## Pièges courants

1. **Croire que CA est possible** : tout système distribué en environnement réseau doit tolérer les partitions — donc choisir entre C et A.
2. **Confondre ACID (base relationnelle) et CAP (système distribué)** : ACID concerne une transaction sur un nœud, CAP concerne la coordination entre nœuds.
3. **Choisir AP sans gérer les conflits** : des écritures concurrentes sur des nœuds différents créent des divergences — sans résolution, les données sont corrompues.
4. **Ignorer la cohérence éventuelle « pratique »** : dans Cassandra, une lecture peut retourner une donnée de plusieurs secondes dans le passé.
5. **Considérer CAP comme un choix binaire permanent** : on peut avoir des opérations CP et des opérations AP dans le même système.

Source : [Eric Brewer — CAP Theorem (Cloudflare)](https://www.cloudflare.com/learning/distributed-systems/what-is-cap-theorem/)`},
      ],
    },
  ],
};