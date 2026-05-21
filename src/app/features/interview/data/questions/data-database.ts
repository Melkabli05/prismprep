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
        
          deepDive: `# SQL vs NoSQL

## Quest-ce que cest ?

Les bases de donnees se divisent en deux grandes categories selon leur modele de donnees et leur approche du stockage.

## SQL (Relationnel)

**Modele:** Tables avec lignes et colonnes, relations entre tables

**Exemples:** PostgreSQL, MySQL, Oracle, SQL Server

**Caracteristiques:**
- Schema rigide et defini a lavance
- Transactions ACID
- Jointures complexes possibles
- Langage standardise (SQL)
- Maturite et stabilite

## NoSQL (Non-relationnel)

Categories:
- **Document** (MongoDB, CouchDB) - JSON documents
- **Cle-Valeur** (Redis, DynamoDB) - paires cle/valeur simples
- **Colonne** (Cassandra, HBase) - familles de colonnes
- **Graphe** (Neo4j) - noeuds et relations

**Caracteristiques:**
- Schema flexible ou absent
- Horizontale scalable
- Haute performance en lecture/ecriture
- APIs varies selon le type

## Comparaison

| Critere | SQL | NoSQL |
|---------|-----|-------|
| Schema | Rigide | Flexible |
| Transactions | ACID | Eventuel (selon DB) |
| Jointures | Oui | Limitees ou impossibles |
| Scaling | Vertical (principalement) | Horizontal |
| Complexity | Moyenne | Faible a tres haute |
| Use case | Donnees structurees, relations complexes | Documents, events, cache, graphes |

## Quand utiliser SQL ?

- Donnees structurees avec schema stable
- Transactions financieres (ACID obligatoire)
- Jointures frequentes entre tables
- Volume de donnees modere
- Requetes complexes et previsibles

## Quand utiliser NoSQL ?

- Donnees semi-structurees ou non structurees
- Besoins de schema flexible
- Tres gros volumes de donnees
- Performance critique en lecture/ecriture
- Donnees temporelles, logs, IoT

## Exemples concrets

-- SQL: E-commerce
SELECT o.id, c.nom, SUM(p.prix * li.quantite) as total
FROM commandes o
JOIN clients c ON o.client_id = c.id
JOIN ligne_commandes li ON o.id = li.commande_id
JOIN produits p ON li.produit_id = p.id
GROUP BY o.id, c.nom;

// MongoDB: Logs applicatifs
{ "_id": "abc123", "timestamp": ISODate(), "level": "ERROR", "message": "Connection failed", "service": "auth" }

## Polyglot Persistence

Approche moderne: utiliser la bonne base de donnees pour chaque cas d'usage.
- PostgreSQL: donnees relationnelles, transactions
- Redis: cache, sessions, files
- MongoDB: catalogue produits, donnees flexibles
- Elasticsearch: recherche full-text

Source : [MongoDB - SQL to NoSQL](https://www.mongodb.com/compare/mongodb-vs-sql-databases)`},
        {
          id: 'db-2',
          question: 'Normalisation',
          answer: "Processus d'organisation des données pour réduire la **redondance** et éviter les **anomalies de mise à jour**.\n\nFormes normales principales : **1NF** (valeurs atomiques), **2NF** (élimination des dépendances partielles), **3NF** (élimination des dépendances transitives). On vise généralement la **3NF**.\n\nTrop normaliser nuit aux performances (trop de `JOIN`s), d'où la **dénormalisation volontaire** en lecture, surtout dans les data warehouses. *Outil de conception logique à adapter aux besoins réels*.",
        
          deepDive: `# Normalisation

## Quest-ce que cest ?

La normalisation est le processus d'organisation des donnees dans une base de donnees relationnelle. Elle vise a eliminer la redondance et les anomalies d'insertion, de mise a jour et de suppression.

## Formes normales (NF)

**1NF - Premiere forme normale**
- Chaque cellule contient une valeur atomique
- Pas de colonnes repetees
- Une seule valeur par intersection ligne/colonne

\`\`\`sql
-- Non normalise (violation 1NF)
CREATE TABLE etudiants (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    cours VARCHAR(255)  -- Plusieurs cours separes par virgule
);

-- Normalise (1NF)
CREATE TABLE etudiants (
    id INT PRIMARY KEY,
    nom VARCHAR(100)
);

CREATE TABLE cours_etudiants (
    etudiant_id INT,
    cours VARCHAR(100),
    PRIMARY KEY (etudiant_id, cours)
);
\`\`\`

**2NF - Deuxieme forme normale**
- 1NF + Pas de dependance partielle (tout attribut non-PK depend de la totality de la cle primaire)

\`\`\`sql
-- Violation 2NF (dependance partielle)
CREATE TABLE commandes (
    produit_id INT,
    client_id INT,
    nom_produit VARCHAR(100),  -- Depend uniquement de produit_id
    PRIMARY KEY (produit_id, client_id)
);

-- Normalise (2NF)
CREATE TABLE produits (
    id INT PRIMARY KEY,
    nom VARCHAR(100)
);

CREATE TABLE commandes (
    produit_id INT,
    client_id INT,
    PRIMARY KEY (produit_id, client_id)
);
\`\`\`

**3NF - Troisieme forme normale**
- 2NF + Pas de dependance transitive (un attribut non-PK ne depend pas d'un autre attribut non-PK)

\`\`\`sql
-- Violation 3NF (dependance transitive)
-- ville depend de client_id indirectement via code_postal
CREATE TABLE clients (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    code_postal VARCHAR(10),
    ville VARCHAR(100)  -- Depend de code_postal, pas de id directement
);

-- Normalise (3NF)
CREATE TABLE codes_postaux (
    code_postal VARCHAR(10) PRIMARY KEY,
    ville VARCHAR(100)
);

CREATE TABLE clients (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    code_postal VARCHAR(10),
    FOREIGN KEY (code_postal) REFERENCES codes_postaux(code_postal)
);
\`\`\`

## Avantages de la normalisation

- Elimination de la redondance
- Prevention des anomalies de donnees
- Meilleure integrite referentielle
- Maintenance simplifiee

## Inconvenients (denormalisation sometimes better)

- Requetes plus complexes (jointures multiples)
- Performance decline pour les lectures frequentes
- Plus de tables a gerer

## Quand denormaliser ?

- Lecture intensive avec performance critique
- Agregats frequents (compteur de vues)
- Cache read-heavy

Source : [Database Normalization - Oracle Documentation](https://docs.oracle.com/cd/B10500_01/server.920/a96525/cd_c26d3.htm)`},
        {
          id: 'db-3',
          question: 'Index',
          answer: "Structure de données (souvent **B-tree**) permettant de trouver rapidement les lignes sans scanner toute la table. On indexe les colonnes utilisées dans `WHERE`, `JOIN` et `ORDER BY`.\n\nInconvénients : ralentit les `INSERT`/`UPDATE`/`DELETE` (maintenance de l'index) et consomme de l'espace disque. __Être stratégique : indexer les colonnes de recherche, pas toutes__.\n\nExistent aussi les **index composites** (multi-colonnes) et **uniques** (garantie d'unicité).",
        
          deepDive: `# Index

## Quest-ce que cest ?

Un index est une structure de donnees qui ameliore la vitesse de recherche dans une table. Il fonctionne comme l'index d'un livre: au lieu de parcourir toutes les pages, on trouve rapidement l'information.

## Types d'index

**B-Tree (par defaut dans la plupart des SGBD)**
- Equilibre pour les recherches par egalite et range
- Utilise pour: operateurs de comparaison

**Hash Index**
- Recherche en O(1) pour les egalites exactes
- Ne supporte pas les ranges
- Utilise pour: operateurs d'egalite

**GiST (Generalized Search Tree)**
- Donnees geospatiales
- Utilise pour: points, polygones, recherches de proximity

**GIN (Generalized Inverted Index)**
- Valeurs multiples par entree
- Utilise pour: donnees JSON, full-text search, arrays

## Creation d'index

-- Index simple
CREATE INDEX idx_clients_nom ON clients(nom);

-- Index composite (sur plusieurs colonnes)
CREATE INDEX idx_commandes_client_date ON commandes(client_id, date DESC);

-- Index unique
CREATE UNIQUE INDEX idx_utilisateurs_email ON utilisateurs(email);

-- Index partiel (sur sous-ensemble de lignes)
CREATE INDEX idx_commandes_en_cours ON commandes(date)
WHERE statut = 'en_cours';

-- Index avec expression
CREATE INDEX idx_commandes_annee ON commandes(EXTRACT(YEAR FROM date));

## Arbre B dans PostgreSQL

Structure equilibree en forme d'arbre:
- Recherche O(log n)
- Insertion et suppression equilibrees
- Cache-friendly (localite des donnees)

## Bonnes pratiques

- Indexer les colonnes utilisees dans WHERE, JOIN, ORDER BY
- Indexer les cles etrangeres
- Utiliser des index composites pour les requetes frequentes sur plusieurs colonnes
- Indexer apres insertion massive de donnees (plus rapide)
- Surveiller l'utilisation avec pg_stat_user_indexes

## Pieges courants

- Trop d'index (ralentit les ecritures)
- Index sur colonnes a faible cardinalite (boolean, genre)
- Index sur petites tables (cout superieur au benefice)
- Index non utilises (requetes mal ecrites)

-- Analyser les index inutilises
SELECT indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND schemaname = 'public';

Source : [PostgreSQL Indexes Documentation](https://www.postgresql.org/docs/current/indexes-intro.html)`},
        {
          id: 'db-4',
          question: 'Transaction ACID',
          answer: "Quatre propriétés garanties par une transaction relationnelle : **Atomicité** (tout ou rien, rollback complet si échec), **Cohérence** (passage d'un état valide à un autre, contraintes respectées), **Isolation** (transactions concurrentes invisibles entre elles, avec niveaux : `Read Uncommitted` → `Serializable` selon le compromis cohérence/perf), **Durabilité** (données persistées après commit même en cas de crash, via le `WAL`).\n\nEnsemble, elles garantissent la **fiabilité des systèmes critiques**.",
        
          deepDive: `# Transaction ACID

## Quest-ce que cest ?

Les transactions ACID garantissent que les operations sur une base de donnees sont fiables et securisees. ACID est un acronyme pour quatre proprietes:

**Atomicite (A)**
Toutes les operations de la transaction sont traitees comme une seule unite. Soit elles reussissent toutes, soit elles echouent toutes.

**Coherence (C)**
La transaction passe la base de donnees d'un etat valide a un autre etat valide. Les contraintes d'integrite sont respectees.

**Isolation (I)**
Les transactions concurrentes s'executent comme si elles etaient sequentielles. Le niveau d'isolation determine les phenomenes possibles.

**Durabilite (D)**
Une fois commitee, les donnees persistent meme en cas de crash systeme.

## Exemple de transaction

BEGIN TRANSACTION;

-- Debiter le compte expediteur
UPDATE comptes SET solde = solde - 1000
WHERE id = 1 AND solde >= 1000;

-- Crediter le compte destinataire
UPDATE comptes SET solde = solde + 1000
WHERE id = 2;

-- Si toutes les operations reussissent
COMMIT;

-- Si une operation echoue
-- ROLLBACK;

## Niveaux d'isolation

| Niveau | Dirty Read | Non-Repeatable Read | Phantom Read |
|--------|------------|---------------------|--------------|
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | Non | Possible | Possible |
| Repeatable Read | Non | Non | Possible |
| Serializable | Non | Non | Non |

## Problemes de concurrence

**Lost Update**
Transaction A et B lisent et modifient la meme donnee. La derniere ecriture gagne.

**Dirty Read**
Lecture de donnees non commitées par une autre transaction.

**Non-Repeatable Read**
Lecture deux fois de la meme donnee dans une transaction retourne des valeurs differentes.

**Phantom Read**
Nouvelles lignes correspondent au predicat de recherche entre deux lectures.

## Bonnes pratiques

- Garder les transactions les plus courtes possible
- Acceder aux lignes dans le meme ordre dans toutes les transactions (eviter les deadlocks)
- Utiliser le niveau d'isolation approprie (Serializable a un cout eleve)
- Eviter les transactions interactives (plusieurs allers-retours)

Source : [ACID Properties - Oracle Documentation](https://docs.oracle.com/cd/A87660_02/articles/oconcept/H/overview_of_transact.htm)`},
        {
          id: 'db-5',
          question: 'ORM ?',
          answer: "**Object-Relational Mapping** : couche d'abstraction entre le monde objet et le monde relationnel. Convertit les tables SQL en objets du langage (`Hibernate` en Java avec `@Entity`, `Prisma` en Node.js).\n\n**Avantages** : productivité, moins de boilerplate, abstraction du SGBD.\n\n**Limites** : SQL sous-optimal pour les requêtes complexes, **problème N+1** (dizaines de requêtes au lieu d'une). __Excellent pour 80% des cas, mais savoir passer en SQL natif quand c'est nécessaire__.",
        
          deepDive: `# ORM

## Quest-ce que cest ?

Un ORM (Object-Relational Mapping) fait le pont entre le monde oriente objet et les bases de donnees relationnelles. Il convertit les objets code en tables BD et vice versa.

## Exemples d'ORM

| Langage | ORM populaire |
|---------|---------------|
| Java | Hibernate, JPA |
| Python | SQLAlchemy, Django ORM |
| JavaScript | TypeORM, Sequelize, Prisma |
| C# | Entity Framework |
| PHP | Eloquent, Doctrine |

## Comparaison: JDBC vs ORM

// JDBC (sans ORM)
Connection conn = DriverManager.getConnection(url, user, pass);
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM users WHERE email = ?"
);
stmt.setString(1, email);
ResultSet rs = stmt.executeQuery();
User user = null;
if (rs.next()) {
    user = new User();
    user.setId(rs.getLong("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
}

// Avec JPA/Hibernate (ORM)
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(unique = true)
    private String email;
}
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

// Utilisation
Optional<User> user = userRepository.findByEmail(email);
\`\`\`

## Avantages de l'ORM

-.Productivite: moins de code SQL a ecrire
- Portabilite: changer de SGBD sans modifier le code
- Securite: protection contre les injections SQL
- Maintenabilite: code plus lisible et oriente objet
- Outils: migrations, versioning du schema

## Inconvenients

- Performance: le SQL genere peut etre sous-optimal
- Complexity: courbe d'apprentissage, configuration
- Requetes complexes: SQL manuel parfois necessaire
- N+1 problem: multiple requetes pour charger les relations

## Le probleme N+1

\`\`\`sql
-- Une requête pour les utilisateurs
SELECT * FROM users;  -- 1 requête

-- Plus une requête pour les commandes de chaque utilisateur
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders WHERE user_id = 2;
-- ... N requêtes supplémentaires!
\`\`\`

Solutions:
\`\`\`java
// JPA - Eager loading
@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
private List<Order> orders;

// Ou query spécifique
@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders")
List<User> findAllWithOrders();
\`\`\`

## Bonnes pratiques

- Comprendre le SQL genere (ne pas l'ignorer)
- Utiliser les requetes natives quand necessaire
- Faire du tuning des requetes (explain plan)
- Preferer les transactions courtes
- Mapper les entités avec precision (pas de anemic domain model)

Source : [Hibernate ORM Documentation](https://hibernate.org/orm/documentation/)`},
        {
          id: 'db-6',
          question: 'Connection pooling',
          answer: "Établir une connexionion BDD est **coûteux** (authentification, handshake, allocation ressources). Le pool maintient un ensemble de connexionions **réutilisables** au lieu d'en créer une par requête.\n\nConfiguration clé : **taille max** (trop grand = BDD submergée), **timeout** (attente max pour obtenir une connexionion), **idle timeout** (fermeture des connexionions inutilisées).\n\n`HikariCP` (défaut Spring Boot) est réputé pour ses performances. __En production, le connection pooling est indispensable.__",
          code: '# HikariCP config\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.connection-timeout=30000\nspring.datasource.hikari.idle-timeout=600000',
          language: 'properties',
        
          deepDive: `# Database Partitioning

## Qu'est-ce que c'est

Le partitioning (ou partitionnement) divise une table en plusieurs segments plus petits (partitions) selon un critere defini. Chaque partition est stockee physiquement separement mais interrogable comme une seule table.

Types:
- **Horizontal (sharding)**: Les lignes sont distribuees sur plusieurs partitions
- **Vertical**: Les colonnes sont distribuees sur plusieurs partitions

## Syntaxe et exemples

### PostgreSQL Range Partitioning

\`\`\`sql
-- Creation d'une table partitionnee par date
CREATE TABLE orders (
  id SERIAL,
  order_date DATE NOT NULL,
  customer_id INT,
  total DECIMAL(10,2)
) PARTITION BY RANGE (order_date);

-- Creer des partitions par annee
CREATE TABLE orders_2024 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');

CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2025-12-31');

-- Insertion automatique dans la partition correcte
INSERT INTO orders (order_date, customer_id, total)
  VALUES ('2024-03-15', 123, 99.99);
\`\`\`

### PostgreSQL List Partitioning

\`\`\`sql
-- Partition par region
CREATE TABLE customers (
  id SERIAL,
  name TEXT,
  region VARCHAR(2)
) PARTITION BY LIST (region);

CREATE TABLE customers_eu PARTITION OF customers
  FOR VALUES IN ('FR', 'DE', 'ES', 'IT');

CREATE TABLE customers_us PARTITION OF customers
  FOR VALUES IN ('NY', 'CA', 'TX');
\`\`\`

### Hash Partitioning

\`\`\`sql
-- Partition par hash de l'ID
CREATE TABLE events (
  id BIGINT,
  event_type TEXT,
  created_at TIMESTAMP
) PARTITION BY HASH (id);

CREATE TABLE events_p0 PARTITION OF events
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE events_p1 PARTITION OF events
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);
-- etc.
\`\`\`

## Bonnes pratiques

- Choisissez une cle de partition qui correspond aux requetes frequentes
- Evitez les partitions trop petites (overhead) ou trop grandes (peu de benefice)
- Planifiez la strategie des BEFORE inserts pour rediriger automatiquement
- Surveillez la taille des partitions et rééquilibrez si necessaire
- Utilisez des index par partition pour optimiser les requetes

## Pieges courants

- Partitionner sur une colonne a faible cardinalite (peu de valeurs distinctes)
- Ignorer les partitions qui GROW plus vite que d'autres (hot partitions)
- Requetes qui scannent toutes les partitions (partition pruning inefficient)
- Ne pas mettre a jour les stats apres modification des partitions
- Oublier que les contraintes de cle etrangere ne traversent pas les partitions

## Pour aller plus loin

\`\`\`sql
-- Voir les partitions d'une table
SELECT 
  child.relname AS partition_name,
  pg_size_pretty(pg_relation_size(child.oid)) AS size
FROM pg_inherits
JOIN pg_class parent ON inhparent = parent.oid
JOIN pg_class child ON inhrelid = child.oid
WHERE parent.relname = 'orders';

-- Query pour trouver le nombre de lignes par partition
SELECT 
  partitions.relname,
  COUNT(*) as row_count
FROM orders
GROUP BY 1;
\`\`\`

Source: https://www.postgresql.org/docs/current/ddl-partitioning.html`},
        {
          id: 'db-7',
          question: 'Clés primaires et étrangères',
          answer: "**Clé primaire** : identifiant **unique** de chaque ligne (`id` auto-incrémenté ou `UUID`). Garantit l'unicité et l'accès rapide via l'index primaire.\n\n**Clé étrangère** : référence la clé primaire d'une autre table, créant une **relation** et garantissant l'**intégrité référentielle** (impossible d'insérer une commande avec un `user_id` inexistant).\n\n`ON DELETE CASCADE` (suppression en cascade), `SET NULL` (mise à null), `RESTRICT` (blocage). __Les clés étrangères sont le garde-fou de la cohérence des données relationnelles.__",
        
          deepDive: `# CLES PRIMAIRES ET ETRANGERES

## Qu'est-ce que c'est

**Cle primaire (Primary Key)**: Colonne ou ensemble de colonnes qui identifie uniquement chaque ligne d'une table. Elle garantit l'unicite et ne peut pas contenir de valeurs NULL.

**Cle etrangere (Foreign Key)**: Colonne qui pointe vers la cle primaire d'une autre table, établissant une relation entre les deux tables.

## Syntaxe et exemples

\`\`\`sql
-- Creation de table avec cle primaire
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cle primaire composee
CREATE TABLE orders (
  user_id INT NOT NULL,
  order_number INT NOT NULL,
  total DECIMAL(10,2),
  PRIMARY KEY (user_id, order_number)
);

-- Ajout de cle etrangere
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  -- ou avec contrainte nomsee
  user_id INT,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE SET NULL
);

-- Constraints referentielles
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  body TEXT,
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Index automatique sur FK
CREATE INDEX idx_orders_user ON orders(user_id);
\`\`\`

### Operations courantes

\`\`\`sql
-- Voir les cles d'une table
SELECT 
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'orders';

-- Desactiver temporairement une FK (pour chargement massif)
ALTER TABLE orders DISABLE TRIGGER ALL;
-- operations...
ALTER TABLE orders ENABLE TRIGGER ALL;
\`\`\`

## Bonnes pratiques

- Utilisez des IDs auto-incrementees (SERIAL, BIGSERIAL) ou UUIDs
- Une FK doit toujours referencer une cle primaire, pas une colonne non-unique
- Definissez des actions ON DELETE / ON UPDATE (CASCADE, SET NULL, RESTRICT)
- Indexez systematiquement les colonnes FK pour eviter les ralentissements
- Evitez les FK circulaires (A pointe vers B, B pointe vers A)
- Utilisez des noms de contraintes explicites (fk_table1_table2)

## Pieges courants

- Oublier les index sur les FK = ralentissement des jointures
- CASCADE qui supprime accidentellement des donnees essentielles
- Confusion entre RESTRICT et NO ACTION (RESTRICT echoue immediatement, NO ACTION differe)
- Utiliser des valeurs NULL comme substitut d'absence de relation
- Violation de contrainte lors de mise a jour de la FK (orphelins non autorises)
- Supprimer un parent sans avoir verifie les enfants (violation de FK)

## Pour aller plus loin

\`\`\`sql
-- Ajouter FK sur table existante
ALTER TABLE orders
  ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id) REFERENCES users(id);

-- Renforcer une FK existante (supprimer puis recreer)
ALTER TABLE orders DROP CONSTRAINT fk_user;
ALTER TABLE orders ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id) REFERENCES users(id);

-- Verifier l'integrite referentielle
SELECT 
  o.user_id
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
\`\`\`

Source: https://www.postgresql.org/docs/current/ddl-constraints.html`},
        {
          id: 'db-8',
          question: 'NoSQL : types et cas d\'usage',
          answer: "**Document** (`MongoDB`) : documents JSON flexibles, idéal pour les données hétérogènes, les catalogues produits, les profils utilisateurs.\n\n**Clé-valeur** (`Redis`) : ultra-rapide en mémoire, parfait pour le cachée, les sessions, les compteurs et les files d'attente.\n\n**Colonne large** (`Cassandra`) : écritures massives et distribuées, séries temporelles, logs IoT.\n\n**Graphe** (`Neo4j`) : relations complexes entre entités, réseaux sociaux, recommandations, détection de fraude.\n\n__Il n'y a pas de BDD universelle — chaque type est optimisé pour un cas d'usage spécifique.__",
        
          deepDive: `# NoSQL: Types et cas d'usage

## Qu'est-ce que c'est

NoSQL (Not Only SQL) designe les bases de donnees qui ne suivent pas le modele relationnel tabulaire. Elles sont optimisees pour des cas d'usagespecifiques: volume massif, schema flexible, latence faible.

## Types de bases NoSQL

### 1. Key-Value (Redis, DynamoDB)

\`\`\`javascript
// Redis
SET user:123:name "Alice"
GET user:123:name
HMSET user:123 email "alice@example.com" age 30
HGETALL user:123

// Cas d'usage: sessions, cache, files d'attente
// Non adapte: requetes complexes, jointures
\`\`\`

### 2. Document (MongoDB, CouchDB)

\`\`\`javascript
// MongoDB
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  address: {
    city: "Paris",
    zip: "75001"
  },
  orders: [
    { id: 1, total: 99.99 },
    { id: 2, total: 149.99 }
  ]
});

// Requete
db.users.find({ "address.city": "Paris" })

// Cas d'usage: catalogues produits, profils utilisateurs, contenu CMS
\`\`\`

### 3. Wide-Column (Cassandra, HBase)

\`\`\`sql
-- Cassandra CQL
CREATE TABLE products (
  category text,
  product_id uuid,
  name text,
  price decimal,
  PRIMARY KEY (category, product_id)
);

INSERT INTO products (category, product_id, name, price)
VALUES ('electronics', uuid(), 'Laptop', 999.99);

SELECT * FROM products WHERE category = 'electronics';

// Cas d'usage: time-series, IoT, analytics, haute disponibilite
\`\`\`

### 4. Graph (Neo4j, Amazon Neptune)

\`\`\`cypher
// Neo4j Cypher
CREATE (alice:User {name: "Alice"})
CREATE (bob:User {name: "Bob"})
CREATE (alice)-[:FOLLOWS]->(bob)
CREATE (bob)-[:LIKES]->(post:Post {title: "Hello"})

MATCH (u:User {name: "Alice"})-[:FOLLOWS]->(f)
RETURN f

// Cas d'usage: reseaux sociaux, recommandations, fraude, knowledge graphs
\`\`\`

## Comparaison

| Type | Schema | Requetes | Scalabilite | Cas ideal |
|------|--------|----------|-------------|----------|
| Key-Value | None | Simples | Tres haute | Cache, sessions |
| Document | Flexible | Riches | Haute | CMS, catalogues |
| Wide-Column | Flexible | Bonnes | Extreme | Time-series, IoT |
| Graph | Variable | Excellent | Moyenne | Relations complexes |

## Bonnes pratiques

- Choisissez le type selon le cas d'usage, pas le contraire
- Les donnees fortement relationnees = base relationnelle (PostgreSQL)
- Les donnees hierarchiques ou varies = document (MongoDB)
- Les donnees temporelles ou grande volume = wide-column (Cassandra)
- Les donnees avec relations complexes = graph (Neo4j)
- Gardez PostgreSQL comme premier choix, NoSQL quand il y a une raison claire

## Pieges courants

- Choisir NoSQL par mode sans besoin reel = complexite sans benefice
- Perdre l'acidite des transactions et découvrir des incoherences plus tard
- Schema-less ne signifie pas sans structure (documenter quand même)
- Requeter avec des patternstres differents du type de donnees
- Migrer de PostgreSQL vers NoSQL et perdre des functionalities (jointures, transactions)
- Ne pas prevoir la cle de partition (sharding key) = bottleneck

## Pour aller plus loin

\`\`\`javascript
// PostgreSQL comme polyglot (JSONB pour documents)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  data JSONB
);

-- Indexer les champs dans JSONB
CREATE INDEX idx_product_data ON products USING GIN (data);

SELECT * FROM products
WHERE data->>'category' = 'electronics';
\`\`\`

Source: https://en.wikipedia.org/wiki/NoSQL`},
      ],
    },
  ],
};