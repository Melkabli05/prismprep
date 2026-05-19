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
        },
        {
          id: 'arch-2',
          question: 'Clean Architecture',
          answer: "Approche (Uncle Bob) plaçant le **code métier au centre**, les détails techniques en périphérie. **Règle de dépendance** : tout pointe vers l'intérieur.\n\nCouches du centre vers l'extérieur : **Entities** (règles business pures), **Use Cases** (logique applicative), **Interface Adapters** (contrôleurs, gateways), **Frameworks & Drivers** (BDD, framework web, UI).\n\nLe code métier ignore totalement l'infrastructure — testable unitairement sans BDD ni framework. Plus verbeux, mais *investissement rentable en maintenabilité* pour les projets durables.",
        },
        {
          id: 'arch-3',
          question: 'Architecture hexagonale',
          answer: "Aussi appelée **Ports & Adapters** : le domaine métier est au centre, les adaptations techniques en périphérie. Les **ports** (interfaces) définissent les contrats d'entrée/sortie, les **adapters** implémentent ces ports pour les technologies spécifiques.\n\nLe domaine ne dépend de rien — les adapters dépendent du domaine. On peut changer de BDD, de framework web, de broker de messages sans toucher au métier.\n\nSimilaire à Clean Architecture mais avec un focus sur la **testabilité** : les adapters de test remplacent l'infrastructure réelle. __Idéal pour les applications métier complexes.__",
        },
        {
          id: 'arch-4',
          question: 'Domain-Driven Design (DDD)',
          answer: "Approche où le **domaine métier** guide la conception logicielle. Le code reflète le langage des experts métier (**Ubiquitous Language**).\n\nConcepts clés : **Bounded Context** (frontière où un modèle est valide), **Entity** (identité unique), **Value Object** (immuable, comparé par valeur), **Aggregate** (groupe d'objets traité comme une unité transactionnelle), **Repository** (abstraction de la persistance).\n\nDDD convient aux domaines **complexes** où le cœur du problème est métier, pas technique. __Ne pas appliquer DDD partout — c'est un investissement.__",
        },
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
        },
        {
          id: 'arch-6',
          question: 'YAGNI et Law of Demeter',
          answer: "**YAGNI** (*You Aren't Gonna Need It*) : ne pas implémenter une fonctionnalité tant qu'elle n'est pas **nécessaire**. L'abstraction prématurée et le code « au cas où » sont des sources de complexité inutile.\n\n**Law of Demeter** (principe de moindre connaissance) : un objet ne devrait communiquer qu'avec ses **voisins directs**, pas avec les objets lointains (`a.getB().getC().faire()` = violation). Préféérer `a.faireAvecC()` qui délègue en interne.\n\n__YAGNI évite le sur-engineenieur, Demeter réduit le couplage.__",
        },
        {
          id: 'arch-7',
          question: 'CAP Theorem',
          answer: "En distribué, on ne peut garantir simultanément que **deux** des trois propriétés : **Consistency** (tous les nœuds voient la même donnée), **Availability** (chaque requête reçoit une réponse), **Partition tolerance** (le système continue malgré les pannes réseau).\n\nEn pratique, les partitions réseau sont inévitables → on choisit entre **CP** (cohérence, ex. `MongoDB` en mode primaire) et **AP** (disponibilité, ex. `Cassandra`).\n\nLes systèmes **SQL** traditionnels privilégient la cohérence (CP). Les **NoSQL** privilégient souvent la disponibilité (AP) avec **cohérence éventuelle**.",
        },
      ],
    },
  ],
};