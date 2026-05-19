import type { InterviewCategory } from '../../../../core/models/interview.models';

export const databaseCategory: InterviewCategory = {
  id: 'database',
  title: 'Bases de données',
  color: 'background: var(--color-warning); color: white',
  description: 'Modélisation, ACID, NoSQL, ORM',
  sections: [
    {
      id: 'db-base',
      title: 'Fondamentaux',
      questions: [
        {
          id: 'db-1',
          question: 'SQL vs NoSQL',
          answer: "**SQL** : monde relationnel avec tables, schéma fixe, clés étrangères et **intégrité référentielle** — idéal pour données structurées (banque, ERP). SGBD : `MySQL`, `PostgreSQL`, `Oracle`.\n\n**NoSQL** : flexible, sans schéma rigide — documents JSON (`MongoDB`), clé-valeur (`Redis`), colonnes larges (`Cassandra`), graphes (`Neo4j`) — idéal pour données hétérogènes et **scalabilité horizontale**.\n\nChoix : structure fixe + requêtes complexes → **SQL** ; flexibilité + scale massif → **NoSQL**. De plus en plus, les deux cohabitent dans une même application.",
        },
        {
          id: 'db-2',
          question: 'Normalisation',
          answer: "Processus d'organisation des données pour réduire la **redondance** et éviter les **anomalies de mise à jour**.\n\nFormes normales principales : **1NF** (valeurs atomiques), **2NF** (élimination des dépendances partielles), **3NF** (élimination des dépendances transitives). On vise généralement la **3NF**.\n\nTrop normaliser nuit aux performances (trop de `JOIN`s), d'où la **dénormalisation volontaire** en lecture, surtout dans les data warehouses. *Outil de conception logique à adapter aux besoins réels*.",
        },
        {
          id: 'db-3',
          question: 'Index',
          answer: "Structure de données (souvent **B-tree**) permettant de trouver rapidement les lignes sans scanner toute la table. On indexe les colonnes utilisées dans `WHERE`, `JOIN` et `ORDER BY`.\n\nInconvénients : ralentit les `INSERT`/`UPDATE`/`DELETE` (maintenance de l'index) et consomme de l'espace disque. __Être stratégique : indexer les colonnes de recherche, pas toutes__.\n\nExistent aussi les **index composites** (multi-colonnes) et **uniques** (garantie d'unicité).",
        },
        {
          id: 'db-4',
          question: 'Transaction ACID',
          answer: "Quatre propriétés garanties par une transaction relationnelle : **Atomicité** (tout ou rien, rollback complet si échec), **Cohérence** (passage d'un état valide à un autre, contraintes respectées), **Isolation** (transactions concurrentes invisibles entre elles, avec niveaux : `Read Uncommitted` → `Serializable` selon le compromis cohérence/perf), **Durabilité** (données persistées après commit même en cas de crash, via le `WAL`).\n\nEnsemble, elles garantissent la **fiabilité des systèmes critiques**.",
        },
        {
          id: 'db-5',
          question: 'ORM ?',
          answer: "**Object-Relational Mapping** : couche d'abstraction entre le monde objet et le monde relationnel. Convertit les tables SQL en objets du langage (`Hibernate` en Java avec `@Entity`, `Prisma` en Node.js).\n\n**Avantages** : productivité, moins de boilerplate, abstraction du SGBD.\n\n**Limites** : SQL sous-optimal pour les requêtes complexes, **problème N+1** (dizaines de requêtes au lieu d'une). __Excellent pour 80% des cas, mais savoir passer en SQL natif quand c'est nécessaire__.",
        },
        {
          id: 'db-6',
          question: 'Connection pooling',
          answer: "Établir une connexion BDD est **coûteux** (authentification, handshake, allocation ressources). Le pool maintient un ensemble de connexions **réutilisables** au lieu d'en créer une par requête.\n\nConfiguration clé : **taille max** (trop grand = BDD submergée), **timeout** (attente max pour obtenir une connexion), **idle timeout** (fermeture des connexions inutilisées).\n\n`HikariCP` (défaut Spring Boot) est réputé pour ses performances. __En production, le connection pooling est indispensable.__",
          code: '# HikariCP config\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.connection-timeout=30000\nspring.datasource.hikari.idle-timeout=600000',
          language: 'properties',
        },
        {
          id: 'db-7',
          question: 'Clés primaires et étrangères',
          answer: "**Clé primaire** : identifiant **unique** de chaque ligne (`id` auto-incrémenté ou `UUID`). Garantit l'unicité et l'accès rapide via l'index primaire.\n\n**Clé étrangère** : référence la clé primaire d'une autre table, créant une **relation** et garantissant l'**intégrité référentielle** (impossible d'insérer une commande avec un `user_id` inexistant).\n\n`ON DELETE CASCADE` (suppression en cascade), `SET NULL` (mise à null), `RESTRICT` (blocage). __Les clés étrangères sont le garde-fou de la cohérence des données relationnelles.__",
        },
        {
          id: 'db-8',
          question: 'NoSQL : types et cas d\'usage',
          answer: "**Document** (`MongoDB`) : documents JSON flexibles, idéal pour les données hétérogènes, les catalogues produits, les profils utilisateurs.\n\n**Clé-valeur** (`Redis`) : ultra-rapide en mémoire, parfait pour le cache, les sessions, les compteurs et les files d'attente.\n\n**Colonne large** (`Cassandra`) : écritures massives et distribuées, séries temporelles, logs IoT.\n\n**Graphe** (`Neo4j`) : relations complexes entre entités, réseaux sociaux, recommandations, détection de fraude.\n\n__Il n'y a pas de BDD universelle — chaque type est optimisé pour un cas d'usage spécifique.__",
        },
      ],
    },
  ],
};