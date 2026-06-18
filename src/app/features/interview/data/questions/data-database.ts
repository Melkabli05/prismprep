import type { InterviewCategory } from '@core/models/interview.models';

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

## Concept detail

SQL et NoSQL representent deux paradigmes différents de gestion de donnees. Le choix entre les deux depend du cas d'usage, du modèle de donnees, des besoins de scalabilite et de coherence.

**SQL (relationnel)** : tables avec schema fixe, contraintes d'integrite, transactions ACID, langage standardise (SQL). Mature, eprouve, ecosystème riche.

**NoSQL (Not Only SQL)** : familles de bases optimisees pour des cas specifiques : documents (MongoDB), cle-valeur (Redis), colonnes larges (Cassandra), graphes (Neo4j). Schema flexible, scalabilite horizontale.

## Comparaison detaillee

| Critere | SQL | NoSQL |
|---------|-----|-------|
| **Schema** | Fixe, declare à l'avance | Flexible, peut evoluer |
| **Transactions** | ACID (forte coherence) | BASE (coherence eventuale) |
| **Jointures** | Oui (JOIN, sous-requêtes) | Non (denormalisation) |
| **Scalabilite** | Verticale (principalement) | Horizontale (nativement) |
| **Requetes** | Complexes, optimisables | Simples, rapides |
| **Integrite** | Referentielle (FK, contraintes) | Applicative |
| **Adoption** | Universelle | Variable |
| **Cas ideal** | Donnees structurees, transactions | Volumes massifs, flexibilite |

## Exemples de modèles

### SQL : Modelisation normalisee

\`\`\`sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_inscription TIMESTAMP DEFAULT NOW()
);

CREATE TABLE commandes (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id),
    total DECIMAL(10,2) NOT NULL,
    date_commande TIMESTAMP DEFAULT NOW()
);

-- Requete complexe
SELECT c.nom, COUNT(co.id) as nb_commandes,
       SUM(co.total) as total_depenses
FROM clients c
LEFT JOIN commandes co ON c.id = co.client_id
WHERE co.date_commande >= '2024-01-01'
GROUP BY c.id, c.nom
HAVING COUNT(co.id) > 5
ORDER BY total_depenses DESC;
\`\`\`

### NoSQL Document : Modele denormalise

\`\`\`javascript
// MongoDB - un seul document contient tout
db.clients.insertOne({
    nom: "Dupont",
    email: "dupont@email.com",
    commandes: [
        { date: ISODate("2024-01-15"), total: 150.00, produits: ["chaise", "table"] },
        { date: ISODate("2024-03-20"), total: 89.99, produits: ["lampe"] }
    ]
});

// Requete
db.clients.find({ "commandes.total": { $gt: 100 } })
\`\`\`

## Cas d'usage

| Cas | Recommandation | Pourquoi |
|-----|---------------|----------|
| Banque, finance | SQL | ACID obligatoire, transactions |
| Catalogue produits | NoSQL Document | Schema flexible, produits varies |
| Cache, sessions | NoSQL Key-Value | Performance, expiration |
| Reseau social | NoSQL Graph | Relations complexes |
| Logs, IoT | NoSQL Column | Ecritures massives, time-series |
| ERP, CRM | SQL | Relations complexes, reporting |

## Polyglot Persistence

L'approche moderne consiste a utiliser plusieurs types de bases dans une meme application, chacune pour son cas ideal :

\`\`\`
[Application]
     |
     ├── PostgreSQL → Donnees relationnelles, transactions
     ├── Redis      → Cache, sessions, rate limiting
     ├── MongoDB    → Catalogue produits, documents
     └── Elasticsearch → Recherche full-text
\`\`\`

## Bonnes pratiques

1. Commencez toujours par SQL (PostgreSQL) et n'ajoutez du NoSQL que si necessaire
2. Ne sacrifiez pas les transactions ACID sans comprendre les consequences
3. La denormalisation en NoSQL à un cout : complexite des mises à jour
4. Le schema-less ne signifie pas sans schema : documentez vos structures
5. PostgreSQL supporte le JSONB (meilleur des deux mondes)
6. Le scaling horizontal de SQL existe (Citus, Vitess) si vous preferez rester en relationnel

## Pièges courants

1. Choisir NoSQL "parce que c'est la mode" sans besoin reel
2. Perdre les transactions ACID et decouvrir des incoherences en production
3. Migrer de PostgreSQL vers MongoDB et regretter les JOIN
4. Ignorer la gestion des index dans MongoDB (collection scan)
5. Cle de partition mal choisie dans Cassandra = hotspot
6. Croire que le schema flexible dispense de la validation applicative

Source : [PostgreSQL vs MongoDB](https://www.postgresql.org/docs/current/datatype-json.html)`},
        {
          id: 'db-2',
          question: 'Normalisation',
          answer: "Processus d'organisation des données pour réduire la **redondance** et éviter les **anomalies de mise à jour**.\n\nFormes normales principales : **1NF** (valeurs atomiques), **2NF** (élimination des dépendances partielles), **3NF** (élimination des dépendances transitives). On vise généralement la **3NF**.\n\nTrop normaliser nuit aux performances (trop de `JOIN`s), d'où la **dénormalisation volontaire** en lecture, surtout dans les data warehouses. *Outil de conception logique à adapter aux besoins réels*.",
        
          deepDive: `# Normalisation des bases de donnees

## Concept detail

La normalisation est un processus de conception de bases de donnees relationnelles qui organise les donnees pour reduire la **redondance** et éviter les **anomalies** (insertion, mise à jour, suppression). Elle procede par étapes, les "formes normales" (NF).

## Les formes normales

### 1NF (Premiere forme normale)
**Regle** : chaque cellule contient une valeur atomique, pas de groupes repetes.

\`\`\`sql
-- NON normalise (violation 1NF)
CREATE TABLE etudiant (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    cours VARCHAR(255)  -- "Maths,Phyisque,Informatique"
);

-- Normalise (1NF)
CREATE TABLE etudiant (
    id INT PRIMARY KEY,
    nom VARCHAR(100)
);

CREATE TABLE inscription (
    etudiant_id INT REFERENCES etudiant(id),
    cours VARCHAR(100),
    PRIMARY KEY (etudiant_id, cours)
);
\`\`\`

### 2NF (Deuxieme forme normale)
**Regle** : 1NF + chaque attribut non-cle depend de la **totalite** de la cle primaire (pas de dependance partielle).

\`\`\`sql
-- Violation 2NF (dependance partielle)
CREATE TABLE commande_produit (
    commande_id INT,
    produit_id INT,
    qte INT,
    nom_produit VARCHAR(100),  -- Depend seulement de produit_id, pas de commande_id
    PRIMARY KEY (commande_id, produit_id)
);

-- Normalise (2NF)
CREATE TABLE produit (
    id INT PRIMARY KEY,
    nom VARCHAR(100)
);

CREATE TABLE ligne_commande (
    commande_id INT,
    produit_id INT,
    qte INT,
    PRIMARY KEY (commande_id, produit_id)
);
\`\`\`

### 3NF (Troisieme forme normale)
**Regle** : 2NF + pas de dependance transitive (un attribut non-cle ne depend pas d'un autre attribut non-cle).

\`\`\`sql
-- Violation 3NF (dependance transitive)
CREATE TABLE employe (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    departement_id INT,
    nom_departement VARCHAR(100),  -- Depend de departement_id, pas de id
    chef_departement VARCHAR(100)  -- Depend aussi de departement_id
);

-- Normalise (3NF)
CREATE TABLE departement (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    chef VARCHAR(100)
);

CREATE TABLE employe (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    departement_id INT REFERENCES departement(id)
);
\`\`\`

## Schema / Flux : Processus de normalisation

\`\`\`
[Donnees non normalisees]
    │
    ├── 1NF : Valeurs atomiques, pas de groupes repetes
    │
    ├── 2NF : 1NF + pas de dependance partielle (cle composite)
    │
    ├── 3NF : 2NF + pas de dependance transitive (cible generale)
    │
    ├── BCNF : 3NF + toute dependence est une supercle
    │
    ├── 4NF : BCNF + pas de dependance multi-valuee
    │
    └── 5NF : 4NF + pas de dependance de jointure
\`\`\`

En pratique, on s'arrete à la **3NF** (suffisante pour la plupart des cas).

## Avantages et inconvenients

| Avantages | Inconvenients |
|-----------|---------------|
| Pas de redondance | Plus de tables = plus de JOIN |
| Coherence des donnees | Requetes plus complexes |
| Mises à jour faciles (un seul endroit) | Performance en lecture degradee |
| Economie d'espace | Modelisation plus longue |

## Denormalisation : quand et pourquoi ?

La denormalisation (retour volontaire à une forme moins normalisee) est utilisee pour :

- **Performance en lecture** : moins de JOIN, requêtes plus rapides
- **Data warehouse** : schemas en etoile/denormalises pour l'analytique
- **Cache** : stocker des donnees pre-calculees
- **NoSQL** : la denormalisation est la norme dans les bases document

\`\`\`sql
-- Vue denormalisee (materielisee) pour les rapports
CREATE MATERIALIZED VIEW rapport_ventes AS
SELECT c.nom, c.email, p.nom produit, lc.qte, lc.prix, co.date
FROM clients c
JOIN commandes co ON c.id = co.client_id
JOIN ligne_commandes lc ON co.id = lc.commande_id
JOIN produits p ON lc.produit_id = p.id;
\`\`\`

## Bonnes pratiques

1. Visez la 3NF par defaut pour les donnees transactionnelles (OLTP)
2. Denormalisez uniquement pour des raisons de performance prouvees
3. Documentez le niveau de normalisation choisi et les raisons
4. Utilisez des vues pour simplifier les requêtes sans denormaliser
5. Les indexes reduisent le cout des JOIN (ne denormalisez pas trop tot)

## Pièges courants

1. Sur-normalisation : 15 tables pour un simple CRUD = performance degradee
2. Sous-normalisation : tout dans une seule table = anomalies de mise à jour
3. Cle primaire composite mal choisie = dependances partielles
4. Ignorer les dependances fonctionnelles = conception fragile
5. Denormalisation prematuree = maintenance complexe sans gain de perf
6. Confondre normalisation et performance optimale

Source : [PostgreSQL Documentation - Database Design](https://www.postgresql.org/docs/current/ddl-schemas.html)`},
        {
          id: 'db-3',
          question: 'Index',
          answer: "Structure de données (souvent **B-tree**) permettant de trouver rapidement les lignes sans scanner toute la table. On indexe les colonnes utilisées dans `WHERE`, `JOIN` et `ORDER BY`.\n\nInconvénients : ralentit les `INSERT`/`UPDATE`/`DELETE` (maintenance de l'index) et consomme de l'espace disque. __Être stratégique : indexer les colonnes de recherche, pas toutes__.\n\nExistent aussi les **index composites** (multi-colonnes) et **uniques** (garantie d'unicité).",
        
          deepDive: `# Index dans les bases de donnees

## Concept detail

Un index est une structure de donnees (generalement un B-tree) qui accelere la recherche de lignes dans une table. Comme l'index d'un livre, il permet de trouver rapidement une information sans parcourir toutes les pages (full table scan). En contrepartie, les indexes consument de l'espace disque et ralentissent les écritures (INSERT/UPDATE/DELETE).

## Types d'index dans PostgreSQL

### B-tree (arbre equilibre)
Par defaut, pour les operateurs de comparaison (=, <, <=, >, >=, BETWEEN, IN, IS NULL).

\`\`\`
                    [50]
                   /    
               [25]      [75]
              /         /   
           [10]  [30]  [60]  [90]
\`\`\`

- Recherche : O(log n)
- Insertion/Suppression : O(log n) (re-equilibrage)
- Supporte le tri ascendant/descendant

### Hash
Pour les egalites exactes uniquement (=). Pas de support pour les comparaisons de plage.

- Recherche : O(1) en moyenne
- Pas de tri, pas de plage

### GiST (Generalized Search Tree)
Pour les donnees geospatiales et les recherches de similarite.

- Points, polygones, distances
- Recherche plein-texte (tsvector)

### GIN (Generalized Inverted Index)
Pour les donnees avec plusieurs valeurs par ligne.

- JSONB (\`@>\`, \`?\`, \`?|\`, \`?&\`)
- Tableaux (\`@>\`, \`&&\`)
- Recherche plein-texte (lexemes)

### BRIN (Block Range Index)
Pour les donnees naturellement ordonnees (time-series). Tres compact.

- 100-500x plus petit qu'un B-tree
- Performance si les donnees sont correlees physiquement

## Syntaxe et exemples

\`\`\`sql
-- Index simple (B-tree)
CREATE INDEX idx_users_email ON users(email);

-- Index unique
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Index composite (plusieurs colonnes)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Index partiel (sur un sous-ensemble)
CREATE INDEX idx_orders_active ON orders(created_at)
WHERE status = 'active';

-- Index avec expression
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Index couvrant (INCLUDE)
CREATE INDEX idx_users_name ON users(name) INCLUDE (email, age);

-- Index sur JSONB (GIN)
CREATE INDEX idx_products_attributes ON products USING GIN (attributes jsonb_path_ops);

-- Index BRIN pour time-series
CREATE INDEX idx_logs_created ON logs USING BRIN (created_at) WITH (pages_per_range = 32);
\`\`\`

## Schema / Flux : Recherche avec et sans index

### Sans index (full table scan)

\`\`\`
[Table: 1 million lignes]
    │
    ├── Ligne 1 : email = "test@test.com" ? -> NON
    ├── Ligne 2 : email = "test@test.com" ? -> NON
    ├── ...
    └── Ligne 500000 : email = "test@test.com" ? -> OUI !
    (Parcours sequentiel ~ 500ms)
\`\`\`

### Avec index B-tree

\`\`\`
[Index B-tree]                 [Table]
    │                              │
    ├── [a...e] → [a...b] → "test@test.com"
    │                              │
    └── 3 accès index → pointer → 1 accès table
    (Temps total ~ 0.1ms)
\`\`\`

## Quand indexer ?

**Indexez les colonnes utilisees dans :**
- \`WHERE\` (filtrès frequents)
- \`JOIN\` (cles etrangeres)
- \`ORDER BY\` (pour éviter le tri)
- \`UNIQUE\` (contrainte d'unicite)
- Requetes avec un faible nombre de resultats (< 10% des lignes)

**N'indexez PAS :**
- Petites tables (< 1000 lignes)
- Colonnes rarement interrogees
- Colonnes a faible cardinalite (boolean, genre)
- Colonnes frequentement modifiees

## Analyse des performances

\`\`\`sql
-- Identifier les index inutilises
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;

-- Taille des indexes
SELECT indexname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Analyse du plan de requête
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@test.com';
\`\`\`

## Bonnes pratiques

1. Utilisez EXPLAIN ANALYZE pour verifier que vos indexes sont utilises
2. Indexez les cles etrangeres (cles des JOIN)
3. Creez des index composites pour les requêtes multi-colonnes
4. Utilisez des index partiels pour les sous-ensembles de donnees
5. Supprimez les indexes inutilises (cout d'écriture)
6. Indexez après les chargements massifs (reconstruire les indexes à la fin)
7. Surveillez la fragmentation avec \`pg_stat_user_indexes\`

## Pièges courants

1. Trop d'index = ralentissement des INSERT/UPDATE/DELETE
2. Index sur colonne a faible cardinalite = inutile (le SGBD prefere le full scan)
3. Index non utilise = espace perdu + cout d'écriture
4. Index partiel non utilise par le planificateur (statistiques obsoletes)
5. Composite index avec mauvais ordre des colonnes (colonne la plus selective en premier)
6. Oublier les statistiques (\`ANALYZE\`) après des modifications massives

Source : [PostgreSQL Indexes Documentation](https://www.postgresql.org/docs/current/indexes-intro.html)`},
        {
          id: 'db-4',
          question: 'Transaction ACID',
          answer: "Quatre propriétés garanties par une transaction relationnelle : **Atomicité** (tout ou rien, rollback complet si échec), **Cohérence** (passage d'un état valide à un autre, contraintes respectées), **Isolation** (transactions concurrentes invisibles entre elles, avec niveaux : `Read Uncommitted` → `Serializable` selon le compromis cohérence/perf), **Durabilité** (données persistées après commit même en cas de crash, via le `WAL`).\n\nEnsemble, elles garantissent la **fiabilité des systèmes critiques**.",
        
          deepDive: `# Transactions ACID

## Concept detail

Les transactions ACID sont le fondement de la fiabilite des bases de donnees relationnelles. Une transaction est une unite de travail qui garantit quatre proprietes : Atomicite, Coherence, Isolation et Durabilite. Ces proprietes assurent que les operations sur les donnees sont fiables meme en cas de panne ou d'acces concurrent.

## Les 4 proprietes ACID

### Atomicite (A) : "Tout ou rien"

Toutes les operations de la transaction sont executees comme une seule unite. Si une operation echoue, toutes les operations déjà effectuees sont annulees (ROLLBACK). Il n'y a pas de resultat partiel.

\`\`\`sql
BEGIN;

-- Ajouter un client
INSERT INTO clients (nom, email) VALUES ('Dupont', 'dupont@mail.com');

-- Creer une commande
INSERT INTO commandes (client_id, total) VALUES (currval('clients_id_seq'), 150.00);

-- Mettre à jour le stock
UPDATE produits SET stock = stock - 1 WHERE id = 123;

-- Si tout est OK : COMMIT
COMMIT;

-- Si erreur : ROLLBACK (tout est annule)
\`\`\`

### Coherence (C) : "Etats valides"

La transaction transforme la base d'un état valide à un autre état valide. Toutes les contraintes (FK, UNIQUE, CHECK) sont respectees au debut et à la fin.

\`\`\`sql
-- Les contraintes garantissent la coherence
ALTER TABLE commandes ADD CONSTRAINT fk_client
    FOREIGN KEY (client_id) REFERENCES clients(id);
ALTER TABLE produits ADD CONSTRAINT stock_positif
    CHECK (stock >= 0);
\`\`\`

### Isolation (I) : "Transactions concurrentes isolees"

Les transactions concurrentes s'executent comme si elles etaient sequentielles. Le niveau d'isolation determine quels phenomenes sont autorises.

### Durabilite (D) : "Persistant après COMMIT"

Une fois COMMIT, les modifications sont persistees et survivent aux pannes (crash, coupure electrique). PostgreSQL utilise le Write-Ahead Log (WAL) pour garantir cette propriete.

## Niveaux d'isolation SQL

\`\`\`sql
-- Definir le niveau d'isolation
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
\`\`\`

| Niveau | Dirty Read | Non-Repeatable Read | Phantom Read | Seriazabilite |
|--------|-----------|---------------------|--------------|---------------|
| READ UNCOMMITTED | Possible | Possible | Possible | Non |
| READ COMMITTED | Impossible | Possible | Possible | Non |
| REPEATABLE READ | Impossible | Impossible | Possible | Partielle |
| SERIALIZABLE | Impossible | Impossible | Impossible | Oui |

**READ COMMITTED** est le defaut dans PostgreSQL (et la plupart des SGBD). Bon compromis coherence/performance.

## Phenomenes de concurrence

### Dirty Read (lecture sale)
\`\`\`sql
-- Transaction A                    -- Transaction B
UPDATE comptes SET solde = 0;
                                  SELECT solde FROM comptes;  -- Lit 0 !
ROLLBACK;                          -- A annule, B a lu une valeur jamais confirmee
\`\`\`

### Non-Repeatable Read (lecture non-repetable)
\`\`\`sql
-- Transaction A                    -- Transaction B
SELECT solde FROM comptes;  -- 100
                                  UPDATE comptes SET solde = 200;
                                  COMMIT;
SELECT solde FROM comptes;  -- 200 (différent de la premiere lecture)
\`\`\`

### Phantom Read
\`\`\`sql
-- Transaction A                    -- Transaction B
SELECT SUM(montant) FROM commandes WHERE client_id = 1;  -- 500
                                  INSERT INTO commandes (client_id, montant) VALUES (1, 100);
                                  COMMIT;
SELECT SUM(montant) FROM commandes WHERE client_id = 1;  -- 600 (nouvelle ligne apparue)
\`\`\`

## Cas d'usage typiques

\`\`\`sql
-- Virement bancaire (ACID obligatoire)
BEGIN;
UPDATE comptes SET solde = solde - 1000 WHERE id = 1 AND solde >= 1000;
IF NOT FOUND THEN ROLLBACK; END IF;

UPDATE comptes SET solde = solde + 1000 WHERE id = 2;
COMMIT;

-- Reservation de stock (contrainte CHECK)
BEGIN;
UPDATE stocks SET quantite = quantite - 1
WHERE produit_id = 123 AND quantite > 0;
COMMIT;
\`\`\`

## Bonnes pratiques

1. Gardez les transactions les plus courtes possibles (pas de saisie utilisateur dans une transaction)
2. Accedez aux tables dans le meme ordre pour éviter les deadlocks
3. Utilisez le niveau d'isolation par defaut (READ COMMITTED) sauf besoin specifique
4. En cas d'erreur, faites toujours ROLLBACK (ne continuez pas après une erreur)
5. Utilisez \`SELECT ... FOR UPDATE\` avec parcimonie (verrouillage)
6. Configurez des timeouts : \`lock_timeout\`, \`statement_timeout\`

## Pièges courants

1. Transaction trop longue = verrous maintenus longtemps = contention
2. Deadlock ignore = transactions qui s'annulent mutuellement
3. Niveau d'isolation trop strict (SERIALIZABLE) = performances degradees
4. Pas de gestion d'erreur = transaction laissee ouverte
5. Ignorer les phenomenes de concurrence = bugs aleatoires
6. Confondre ROLLBACK et COMMIT partiel (le ROLLBACK annule tout)

Source : [PostgreSQL - Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)`},
        {
          id: 'db-5',
          question: 'ORM ?',
          answer: "**Object-Relational Mapping** : couche d'abstraction entre le monde objet et le monde relationnel. Convertit les tables SQL en objets du langage (`Hibernate` en Java avec `@Entity`, `Prisma` en Node.js).\n\n**Avantages** : productivité, moins de boilerplate, abstraction du SGBD.\n\n**Limites** : SQL sous-optimal pour les requêtes complexes, **problème N+1** (dizaines de requêtes au lieu d'une). __Excellent pour 80% des cas, mais savoir passer en SQL natif quand c'est nécessaire__.",
        
          deepDive: `# ORM (Object-Relational Mapping)

## Concept detail

Un ORM est une couche d'abstraction qui convertit les objets d'un langage de programmation en donnees relationnelles et vice versa. Il permet au développeur de manipuler la base de donnees avec le langage de l'application (Java, TypeScript, Python) sans écrire de SQL directement.

## Schema / Flux

\`\`\`
[Application]                    [ORM]                       [Base de donnees]
     |                              |                              |
     | userRepository.findById(1)   |                              |
     |----------------------------->|                              |
     |                              |  SELECT * FROM users         |
     |                              |  WHERE id = ?               |
     |                              |----------------------------->|
     |                              |                              |
     |                              |  ResultSet -> User object    |
     |  User { id:1, name:... }    |<-----------------------------|
     |<-----------------------------|                              |
\`\`\`

## Exemples par langage

| Langage | ORM | Caracteristiques |
|---------|-----|-----------------|
| Java | Hibernate / JPA | Mature, standardise, puissant |
| Java | jOOQ | Type-safe, SQL-first |
| TypeScript | Prisma | Moderne, type-safe, autocompletion |
| TypeScript | TypeORM | Proche de JPA, decorators |
| Python | SQLAlchemy | Flexible, deux modes (ORM/Core) |
| Python | Django ORM | Integre a Django, batteries included |
| C# | Entity Framework | LINQ, Code First, migrations |

## Syntaxe et exemples

### JPA / Hibernate (Java)

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    @ManyToOne
    @JoinColumn(name = "rôle_id")
    private Role rôle;
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRoleName(String rôleName);

    @Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
    Optional<User> findByIdWithOrders(@Param("id") Long id);
}
\`\`\`

### Prisma (TypeScript/Node.js)

\`\`\`prisma
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  rôle      Role     @default(USER)
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Order {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  total     Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())
}
\`\`\`

\`\`\`typescript
// Utilisation
const user = await prisma.user.findUnique({
    where: { email: "user@example.com" },
    include: { orders: true }
});
\`\`\`

## Le problème N+1

Le problème N+1 survient quand l'ORM execute 1 requête pour les parents puis N requêtes pour les enfants :

\`\`\`sql
-- 1 requête : reçuperer les utilisateurs
SELECT * FROM users;  -- 1

-- N requêtes : reçuperer les commandes de CHAQUE utilisateur
SELECT * FROM orders WHERE user_id = 1;  -- requête par utilisateur
SELECT * FROM orders WHERE user_id = 2;  -- +1
-- ... N requêtes supplementaires
\`\`\`

**Solutions :**

\`\`\`java
// JPA : JOIN FETCH
@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders")
List<User> findAllWithOrders();

// EntityGraph
@EntityGraph(attributePaths = {"orders"})
List<User> findAll();

// Hibernate : @BatchSize
@OneToMany
@BatchSize(size = 10)
private List<Order> orders;
\`\`\`

\`\`\`typescript
// Prisma : include
const users = await prisma.user.findMany({
    include: { orders: true }  // Une seule requête avec JOIN
});
\`\`\`

## Avantages et inconvenients

| Avantages | Inconvenients |
|-----------|---------------|
| Productivite elevee | SQL genere parfois sous-optimal |
| Abstraction du SGBD | Courbe d'apprentissage |
| Protection injection SQL | Probleme N+1 |
| Migrations automatisees | Debugging complexe |
| Moins de code boileplate | Performance variable |

## Quand utiliser du SQL natif ?

- Requetes complexes avec plusieurs JOIN etagère
- Operations batch (mises à jour massives)
- Requetes de reporting ou analytiques
- Optimisation de performance (EXPLAIN ANALYZE)
- Fonctions specifiques au SGBD (window functions, CTE reçursives)

## Bonnes pratiques

1. Comprenez le SQL genere par l'ORM (activez le logging des requêtes)
2. Utilisez des requêtes natives quand les performances sont critiques
3. Faites du lazy loading avec JOIN FETCH pour éviter N+1
4. Structurez les entites autour des aggregates (DDD)
5. Utilisez des migrations pour versionner le schema
6. Testez les performances avec EXPLAIN ANALYZE
7. Evitez les cascade trop larges (CascadeType.ALL sur toutes les relations)

## Pièges courants

1. Probleme N+1 non detecte (requêtes silencieuses)
2. Lazy loading hors session (LazyInitializationException)
3. Cascade trop agressive = suppression en masse inattendue
4. Fetch eager sur toutes les relations = requêtes geantes
5. Entites anemic domain model (getters/setters sans logique)
6. Transactions trop longues a cause du lazy loading

Source : [Hibernate ORM Documentation](https://hibernate.org/orm/documentation/)`},
        {
          id: 'db-6',
          question: 'Connection pooling',
          answer: "Établir une connexionion BDD est **coûteux** (authentification, handshake, allocation ressources). Le pool maintient un ensemble de connexionions **réutilisables** au lieu d'en créer une par requête.\n\nConfiguration clé : **taille max** (trop grand = BDD submergée), **timeout** (attente max pour obtenir une connexionion), **idle timeout** (fermeture des connexionions inutilisées).\n\n`HikariCP` (défaut Spring Boot) est réputé pour ses performances. __En production, le connection pooling est indispensable.__",
          code: '# HikariCP config\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.connection-timeout=30000\nspring.datasource.hikari.idle-timeout=600000',
          language: 'properties',
        
          deepDive: `# Connection Pooling

## Concept detail

Le connection pooling consiste a maintenir un ensemble de connexions à la base de donnees **reutilisables**, plutot que d'en etablir une nouvelle a chaque requête. Etablir une connexion est couteux (TCP handshake, authentification, allocation de ressources). Le pool gère un cache de connexions ouvertes et les distribue aux threads applicatifs.

## Schema / Flux

\`\`\`
[Application Threads]               [Connection Pool]                 [Base de donnees]
     |                                     |                               |
     | request1: getConnection()            |                               |
     |------------------------------------->|                               |
     |                                     |   connexion_1 (déjà ouverte)  |
     |  Connection (connexion_1)           |------------------------------->
     |<-------------------------------------|                               |
     |                                     |                               |
     | request2: getConnection()            |                               |
     |------------------------------------->|                               |
     |                                     |   connexion_2 (déjà ouverte)  |
     |  Connection (connexion_2)           |------------------------------->
     |<-------------------------------------|                               |
     |                                     |                               |
     | request3: getConnection()            |                               |
     |------------------------------------->|                               |
     |                                     |   [ATTENTE] pool epuise       |
     |                                     |   (connectionTimeout)         |
     |                                     |                               |
     | request1: closeConnection()          |                               |
     |------------------------------------->|                               |
     |                                     |   connexion_1 -> disponible   |
     |  Connection (connexion_1)           |------------------------------->
     |<-------------------------------------|                               |
\`\`\`

## Syntaxe et exemples

### HikariCP (Spring Boot - defaut)

\`\`\`properties
# application.properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.connection-test-query=SELECT 1
spring.datasource.hikari.pool-name=MonPoolHikari
spring.datasource.hikari.auto-commit=false
\`\`\`

\`\`\`java
// Configuration programmatique
@Configuration
public class DatabaseConfig {
    @Bean
    public HikariDataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
        config.setUsername(System.getenv("DB_USER"));
        config.setPassword(System.getenv("DB_PASS"));
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);  // 30s
        config.setIdleTimeout(600000);       // 10 min
        config.setMaxLifetime(1800000);      // 30 min
        config.setLeakDetectionThreshold(60000);  // 60s
        config.setPoolName("AppPool");
        config.setAutoCommit(false);
        return new HikariDataSource(config);
    }
}
\`\`\`

### Node.js (pg-pool)

\`\`\`javascript
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "mydb",
    user: "app_user",
    password: process.env.DB_PASS,
    max: 20,                // Taille max du pool
    idleTimeoutMillis: 30000,  // 30s idle avant fermeture
    connectionTimeoutMillis: 5000,  // 5s timeout connexion
    maxUses: 7500,          // Rotation des connexions
});

// Utilisation
app.get("/users", async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM users");
        res.json(result.rows);
    } finally {
        client.release();  // Retourne la connexion au pool
    }
});
\`\`\`

### Configuration recommandee HikariCP (PostgreSQL)

\`\`\`yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10           # Regle empirique : nb max de connexions
      minimum-idle: 5                 # Connexions inactives minimales
      connection-timeout: 30000       # Temps d'attente max pour une connexion
      idle-timeout: 600000            # 10 min : fermeture des connexions inutilisees
      max-lifetime: 1800000           # 30 min : duree de vie max d'une connexion
      leak-detection-threshold: 60000 # Detecte les fuites de connexion
      validation-timeout: 5000
      register-mbeans: true           # Exposition JMX pour monitoring
\`\`\`

## Quelle taille de pool ?

La regle empirique : **Taille du pool = 2 * (nombre de cœurs CPU) + 1**

Pour une application avec 8 cœurs : \`2 * 8 + 1 = 17\` connexions max.

Pourquoi pas 200 connexions ?
- Chaque connexion consomme de la mémoire (quelques Mo)
- Trop de connexions = contention sur la BDD
- PostgreSQL à un \`max_connections\` limite (souvent 100-500)

**Mesurez plutot que calculez** : la taille optimale se trouve en chargeant l'application et en mesurant.

## Comparaison des implementations

| Pool | Langage | Performance | Fonctionnalites |
|------|---------|-------------|-----------------|
| HikariCP | Java | Excellent | Fast, fiable, defaut Spring Boot |
| Tomcat JDBC | Java | Bon | Standard Tomcat |
| DBCP2 | Java | Moyen | Apache Commons |
| pg-pool | Node.js | Bon | Specifique PostgreSQL |
| SQLAlchemy pool | Python | Bon | Flexible |

## Cas d'usage typiques

- Toute application web avec acces BDD en production
- APIs REST avec plusieurs threads simultanes
- Applications batch qui alternent phases de calcul et d'acces BDD
- Microservices avec connexions BDD

## Bonnes pratiques

1. Testez la taille du pool sous charge reelle (pas de formule magique)
2. Configurez le leak detection pour detecter les connexions non fermees
3. Validez les connexions avant utilisation (\`connectionTestQuery\`)
4. Montez le pool après le demarrage de l'application (pas de requêtes pendant l'initialisation)
5. Surveillez les metriques du pool (actif, idle, en attente)
6. Fermez toujours les connexions dans un bloc finally / try-with-resources

## Pièges courants

1. Pool trop grand = surcharge de la BDD (chaque connexion = processus)
2. Fuite de connexion = pool epuise = application bloquee
3. Pas de timeout = threads bloques indefiniment
4. Connexions perimees non validees (firewall qui coupe les connexions inactives)
5. \`auto-commit=true\` = chaque requête est une transaction isolee
6. Meme pool partage entre operations courtes (API) et longues (batch)

Source : [HikariCP Documentation](https://github.com/brettwooldridge/HikariCP)`},
        {
          id: 'db-7',
          question: 'Clés primaires et étrangères',
          answer: "**Clé primaire** : identifiant **unique** de chaque ligne (`id` auto-incrémenté ou `UUID`). Garantit l'unicité et l'accès rapide vià l'index primaire.\n\n**Clé étrangère** : référence la clé primaire d'une autre table, créant une **relation** et garantissant l'**intégrité référentielle** (impossible d'insérer une commande avec un `user_id` inexistant).\n\n`ON DELETE CASCADE` (suppression en cascade), `SET NULL` (mise à null), `RESTRICT` (blocage). __Les clés étrangères sont le garde-fou de la cohérence des données relationnelles.__",
        
          deepDive: `# Cles primaires et etrangeres

## Concept detail

Les cles primaires et etrangeres sont les elements fondamentaux du modèle relationnel. La cle primaire identifie de maniere unique chaque ligne d'une table. La cle etrangère cree une relation entre deux tables en referencant la cle primaire d'une autre table, garantissant l'integrite referentielle des donnees.

## Cles primaires (Primary Key)

Une cle primaire est une colonne (ou combinaison de colonnes) qui :
- Identifie **uniquement** chaque ligne
- Ne peut pas être NULL (NOT NULL implicite)
- Est automatiquement indexee

\`\`\`sql
-- Cle primaire simple (SERIAL auto-increment)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Cle primaire UUID (recommandee pour les systèmes distribues)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Cle primaire composite (plusieurs colonnes)
CREATE TABLE abonnements (
    user_id INT NOT NULL,
    newsletter_id INT NOT NULL,
    date_debut DATE NOT NULL,
    PRIMARY KEY (user_id, newsletter_id)
);
\`\`\`

## Cles etrangeres (Foreign Key)

Une cle etrangère :
- Reference la cle primaire d'une autre table
- Garantit l'integrite referentielle (pas de reference à une ligne inexistante)
- Peut être NULL (optionnel)
- Devrait être indexee pour les performances

\`\`\`sql
-- Syntaxe de base
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),           -- FK simple (inline)
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Syntaxe complete avec nom de contrainte
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2),
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Ajout sur table existante
ALTER TABLE orders
    ADD CONSTRAINT fk_orders_users
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT;
\`\`\`

## Actions sur DELETE/UPDATE

| Action | Description | Comportement |
|--------|-------------|--------------|
| **CASCADE** | Supprime/met à jour en cascade | Supprime les enfants si le parent est supprime |
| **SET NULL** | Met NULL dans la FK | Conserve les enregistrements orphelins |
| **SET DEFAULT** | Valeur par defaut | Remplace par la valeur par defaut |
| **RESTRICT** | Bloque la suppression | Empeche la suppression du parent |
| **NO ACTION** | Differ la verification | Similaire a RESTRICT mais verifie à la fin de la transaction |

\`\`\`sql
-- Exemple concret : blog avec commentaires
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    body TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    -- Si le post est supprime, ses commentaires aussi
    author VARCHAR(100) NOT NULL,
    body TEXT NOT NULL
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    -- Si l'utilisateur est supprime, ses likes restent mais user_id = NULL
);
\`\`\`

## Index sur les cles etrangeres

Les SGBD ne creent PAS automatiquement d'index sur les FK. Il faut le faire manuellement :

\`\`\`sql
-- Toujours indexer les FK utilisees dans les JOIN
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
\`\`\`

**Sans index** : chaque jointure sur la FK déclenche un full table scan.

## Choisir entre SERIAL et UUID

| Critere | SERIAL (auto-increment) | UUID |
|---------|------------------------|------|
| Taille | 4 octets (INT) / 8 octets (BIGINT) | 16 octets |
| Performance | Meilleure (index plus petit) | Moins bonne |
| Visibilite | Predictible (1, 2, 3...) | Aleatoire |
| Securite | Exposition du volume de donnees | Pas d'information |
| Distribution | Conflit possible | Unique globalement |

## Bonnes pratiques

1. Toujours definir une PK sur chaque table (meme les tables de jointure)
2. Indexez systematiquement les colonnes FK
3. Utilisez des noms de contrainte explicites : \`fk_<table>_<cible>\`
4. Choisissez CASCADE, SET NULL ou RESTRICT en fonction du besoin metier
5. Pour les systèmes distribues, preferez UUID a SERIAL
6. Les FK doivent toujours referencer une PK ou une UNIQUE

## Pièges courants

1. Oublier l'index sur la FK = ralentissement des JOIN
2. CASCADE trop agressif = suppression de donnees non desirees
3. RESTRICT bloque la mise à jour du parent (meme temporairement)
4. Utiliser des valeurs NULL comme substitut de FK manquante
5. FK circulaires (A pointe vers B, B pointe vers A) = insertion impossible
6. Confondre RESTRICT et NO ACTION (RESTRICT echoue immediatement, NO ACTION à la fin de la transaction)

Source : [PostgreSQL - Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)`},
        {
          id: 'db-8',
          question: 'NoSQL : types et cas d\'usage',
          answer: "**Document** (`MongoDB`) : documents JSON flexibles, idéal pour les données hétérogènes, les catalogues produits, les profils utilisateurs.\n\n**Clé-valeur** (`Redis`) : ultra-rapide en mémoire, parfait pour le cachée, les sessions, les compteurs et les files d'attente.\n\n**Colonne large** (`Cassandra`) : écritures massives et distribuées, séries temporelles, logs IoT.\n\n**Graphe** (`Neo4j`) : relations complexes entre entités, réseaux sociaux, recommandations, détection de fraude.\n\n__Il n'y a pas de BDD universelle — chaque type est optimisé pour un cas d'usage spécifique.__",
        
          deepDive: `# NoSQL: Types et cas d'usage

## Qu'est-ce que c'est

NoSQL (Not Only SQL) designe les bases de donnees qui ne suivent pas le modèle relationnel tabulaire. Elles sont optimisees pour des cas d'usagespecifiques: volume massif, schema flexible, latence faible.

## Types de bases NoSQL

### 1. Key-Value (Redis, DynamoDB)

\`\`\`javascript
// Redis
SET user:123:name "Alice"
GET user:123:name
HMSET user:123 email "alice@example.com" age 30
HGETALL user:123

// Cas d'usage: sessions, cache, files d'attente
// Non adapte: requêtes complexes, jointures
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
- Gardez PostgreSQL comme premier choix, NoSQL quand il y à une raison claire

## Pièges courants

- Choisir NoSQL par mode sans besoin reel = complexite sans benefice
- Perdre l'acidite des transactions et découvrir des incoherences plus tard
- Schema-less ne signifie pas sans structure (documenter quand même)
- Requeter avec des patternstrès différents du type de donnees
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