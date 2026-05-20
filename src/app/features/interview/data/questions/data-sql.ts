import type { InterviewCategory } from '../../../../core/models/interview.models';

export const sqlCategory: InterviewCategory = {
  id: 'sql',
  title: 'SQL',
  color: 'background: var(--color-info); color: white',
  description: 'Requêtes, jointures, optimisation SQL',
  sections: [
    {
      id: 'sql-base',
      title: 'Fondamentaux SQL',
      questions: [
        {
          id: 'sql-1',
          question: 'Les différents JOINs',
          answer: "**`INNER JOIN`** : lignes correspondantes dans les deux tables seulement. **`LEFT JOIN`** : toutes les lignes de la table gauche + correspondances droite (`NULL` si pas de match). **`RIGHT JOIN`** : inverse du LEFT. **`FULL JOIN`** : toutes les lignes des deux tables, `NULL` là où il n'y a pas de correspondance.\n\n**`CROSS JOIN`** : produit cartésien (chaque ligne A × chaque ligne B). **`SELF JOIN`** : une table jointe avec elle-même (hiérarchies).\n\nLe `LEFT JOIN` est le plus courant en pratique pour lister tout même sans correspondance.",
          code: 'SELECT u.nom, o.numero\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;',
          language: 'sql',
          deepDive: `# Les JOINs en PostgreSQL

PostgreSQL supporte :

\`\`\`sql
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 ON boolean_expression
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 USING ( join_column_list )
T1 NATURAL { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2
T1 CROSS JOIN T2
\`\`\`

\`INNER\` et \`OUTER\` sont optionnels.

## CROSS JOIN — Produit cartésien

\`\`\`sql
SELECT * FROM t1 CROSS JOIN t2;
-- Équivalent : FROM t1, t2 / FROM t1 INNER JOIN t2 ON TRUE
\`\`\`

## INNER / LEFT / RIGHT / FULL OUTER JOIN

\`\`\`sql
SELECT * FROM t1 INNER JOIN t2 ON t1.num = t2.num;
SELECT * FROM t1 LEFT OUTER JOIN t2 ON t1.num = t2.num;
SELECT * FROM t1 RIGHT OUTER JOIN t2 ON t1.num = t2.num;
SELECT * FROM t1 FULL OUTER JOIN t2 ON t1.num = t2.num;
\`\`\`

## USING — Colonne partagée

\`\`\`sql
SELECT * FROM t1 JOIN t2 USING (num);
-- Équivaut à : ON t1.num = t2.num (une seule colonne dans le résultat)
\`\`\`

## NATURAL JOIN — À éviter

\`\`\`sql
SELECT * FROM t1 NATURAL JOIN t2;
\`\`\`
Risque : une nouvelle colonne avec le même nom change le comportement.

## ON vs WHERE — Ordre d'exécution

\`\`\`sql
-- ON avant : garde toutes les lignes de t1
SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id AND t2.valeur > 5

-- WHERE après : convertit en inner join
SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id WHERE t2.valeur > 5
\`\`\`

Source : [PostgreSQL docs — Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)`,
        },
        {
          id: 'sql-2',
          question: 'Sous-requêtes vs JOINs',
          answer: "**Sous-requête** : requête imbriquée dans une autre — lisible pour les filtres simples (`WHERE id IN (SELECT...)`). **JOIN** : fusion de tables — plus performant en général car le SGBD optimise mieux.\n\nRègle pratique : les sous-requêtes corrélées (qui référencent la requête externe) sont souvent **lentes** — à remplacer par un `JOIN` ou `EXISTS`.\n\nLes **CTE** (`WITH ... AS`) améliorent la lisibilité des sous-requêtes complexes. __Préférez les JOIN pour la performance, les CTE pour la lisibilité.__",
          code: '-- Sous-requête\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM orders WHERE total > 100\n);\n\n-- CTE (plus lisible)\nWITH gros_clients AS (\n    SELECT user_id FROM orders WHERE total > 100\n)\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM gros_clients\n);',
          language: 'sql',
          deepDive: `# Sous-requêtes vs JOINs en PostgreSQL

## Sous-requêtes non corrélées vs corrélées

**Non corrélée** : inner query s'exécute une fois.
**Corrélée** : inner query référence outer query et s'exécute pour chaque ligne.

\`\`\`sql
-- Corrélée (coûteuse)
SELECT o1.* FROM orders o1
WHERE total = (SELECT MAX(total) FROM orders o2 WHERE o2.user_id = o1.user_id);
\`\`\`

## EXISTS vs IN

| Scénario | Recommandation |
|----------|---------------|
| Petit ensemble | \`IN\` |
| Grand ensemble, NULLs | \`EXISTS\` |
| Test d'existence | \`EXISTS\` |

\`\`\`sql
-- EXISTS : s'arrête au premier match
SELECT * FROM orders WHERE EXISTS (SELECT 1 FROM customers WHERE id = orders.customer_id);

-- IN : évalue toute la sous-requête
SELECT * FROM products WHERE category_id IN (1, 2, 3);
\`\`\`

## Quand utiliser JOIN vs sous-requête

**JOIN** : colonnes de plusieurs tables, agrégations.
**Sous-requête** : filtrage basé sur des conditions agrégées.

## LATERAL

\`LATERAL\` permet à une sous-requête de référencer des tables précédentes :

\`\`\`sql
SELECT c.name, p.name, p.price
FROM categories c,
LATERAL (
    SELECT name, price FROM products
    WHERE category_id = c.id
    ORDER BY price DESC LIMIT 3
) p;
\`\`\`

Source : [PostgreSQL docs — Queries](https://www.postgresql.org/docs/current/queries.html)`,
        },
        {
          id: 'sql-3',
          question: 'GROUP BY et HAVING',
          answer: "**`GROUP BY`** regroupe les lignes partageant les mêmes valeurs pour produire des **agrégats** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`). **`HAVING`** filtre les groupes *après* agrégation — là où `WHERE` filtre les lignes *avant*.\n\nOrdre d'exécution logique : `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.\n\n__Piège classique__ : filtrer un agrégat avec `WHERE` au lieu de `HAVING` — ça ne fonctionne pas car l'agrégat n'existe pas encore au moment du `WHERE`.",
          code: 'SELECT categorie, COUNT(*) AS nb, AVG(prix) AS prix_moyen\nFROM produits\nWHERE actif = true\nGROUP BY categorie\nHAVING COUNT(*) > 5\nORDER BY prix_moyen DESC;',
          language: 'sql',
          deepDive: `# GROUP BY et HAVING en PostgreSQL

## Ordre d'exécution

\`\`\`
FROM → WHERE → GROUP BY → HAVING → SELECT
\`\`\`

## GROUP BY

\`\`\`sql
SELECT categorie, COUNT(*) AS nb, SUM(stock)
FROM produits GROUP BY categorie;
\`\`\`

**Règle** : colonne non groupée et non agrégée → ERREUR.

## Extension PostgreSQL — Dépendance fonctionnelle

Si la clé primaire est dans \`GROUP BY\`, les colonnes fonctionnellement dépendantes n'ont pas besoin d'y être :

\`\`\`sql
-- Si product_id est la clé primaire :
GROUP BY product_id
-- name et price sont dépendants
\`\`\`

## HAVING — Filtrer après groupement

\`\`\`sql
SELECT product_id, SUM(units * price) AS revenue
FROM sales
GROUP BY product_id
HAVING SUM(units * price) > 5000;
\`\`\`

## WHERE vs HAVING

\`WHERE\` filtre avant \`GROUP BY\`, \`HAVING\` filtre après.

## GROUPING SETS, CUBE, ROLLUP

\`\`\`sql
ROLLUP (a, b, c)   -- (a,b,c), (a,b), (a), ()
CUBE (a, b, c)     -- tous les sous-ensembles
GROUPING SETS ((a), (b), ())
\`\`\`

Source : [PostgreSQL docs — Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)`,
        },
        {
          id: 'sql-4',
          question: 'EXISTS vs IN',
          answer: "**`IN`** : vérifie si une valeur est dans un ensemble de résultats. Simple mais peut être lent avec de grandes sous-requêtes car le SGBD évalue toute la sous-requête d'abord.\n\n**`EXISTS`** : vérifie si la sous-requête retourne *au moins une ligne*. Le SGBD peut s'arrêter dès qu'il trouve un match — **plus performant** pour les sous-requêtes corrélées.\n\nRègle : `IN` pour les petites listes ou sous-requêtes non corrélées, `EXISTS` pour les sous-requêtes corrélées. `NOT EXISTS` est généralement plus rapide que `NOT IN` (surtout avec les `NULL`).",
          code: '-- EXISTS (plus rapide pour sous-requêtes corrélées)\nSELECT * FROM users u\nWHERE EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n);\n\n-- IN (plus simple pour petites listes)\nSELECT * FROM users\nWHERE id IN (SELECT user_id FROM orders);',
          language: 'sql',
        },
      ],
    },
    {
      id: 'sql-avance',
      title: 'SQL Avancé',
      questions: [
        {
          id: 'sql-5',
          question: 'Window functions',
          answer: "Fonctions effectuant un calcul sur un **ensemble de lignes liées** à la ligne courante, *sans regrouper les résultats* (contrairement à `GROUP BY`). Chaque ligne conserve son identité.\n\nSyntaxe : `FONCTION() OVER (PARTITION BY ... ORDER BY ...)`.\n\nFonctions courantes : **`ROW_NUMBER()`** (numérotation), **`RANK()`** (classement avec ex aequo), **`DENSE_RANK()`** (classement sans trou), **`LEAD()`/`LAG()`** (accès aux lignes précédentes/suivantes), **`SUM() OVER`** (cumul), **`FIRST_VALUE()`/`LAST_VALUE()`**.\n\n__Indispensables pour les rapports, classements et calculs cumulatifs.__",
          code: '-- Salaire ranké par département\nSELECT nom, dept, salaire,\n    RANK() OVER (PARTITION BY dept ORDER BY salaire DESC) AS rang,\n    SUM(salaire) OVER (PARTITION BY dept) AS total_dept\nFROM employes;',
          language: 'sql',
          deepDive: `# Window Functions en PostgreSQL

Calculent sur un ensemble de lignes liées à la ligne courante, sans grouper.

## Syntaxe

\`\`\`sql
function_name() OVER (
    [PARTITION BY column(s)]
    [ORDER BY column(s)]
    [ROWS | RANGE BETWEEN frame_start AND frame_end]
)
\`\`\`

## Fonctions de classement

\`\`\`sql
ROW_NUMBER() OVER (ORDER BY col)   -- 1, 2, 3
RANK() OVER (ORDER BY col)        -- 1, 2, 2, 4
DENSE_RANK() OVER (ORDER BY col) -- 1, 2, 2, 3
PERCENT_RANK() OVER (ORDER BY col) -- 0 à 1
NTILE(n) OVER (ORDER BY col)      -- buckets égaux
\`\`\`

## Fonctions de navigation

\`\`\`sql
LAG(value, offset, default)   -- Ligne précédente
LEAD(value, offset, default) -- Ligne suivante
FIRST_VALUE(col)            -- Première valeur du frame
LAST_VALUE(col)             -- Dernière valeur du frame
NTH_VALUE(col, n)          -- N-ième valeur
\`\`\`

## Window frames

\`\`\`sql
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW   -- Total cumulé
ROWS BETWEEN 2 PRECEDING AND CURRENT ROW          -- Moyenne glissante 3 lignes
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING         -- Centré
\`\`\`

Source : [PostgreSQL docs — Window Functions](https://www.postgresql.org/docs/current/functions-window.html)`,
        },
        {
          id: 'sql-6',
          question: 'CTE (Common Table Expressions)',
          answer: "Les **CTE** créent des résultats temporaires nommés via `WITH ... AS (...)`, visibles dans toute la requête suivante.\n\nAvantages sur les sous-requêtes : **lisible** (nommage explicite), **réutilisable** (plusieurs références dans la même requête), **maintenable** (logique décomposée étape par étape).\n\nLes **CTE récursives** (`WITH RECURSIVE`) parcourent des hiérarchies (organigrammes, arbres de catégories). __Pour les requêtes complexes, les CTE sont le standard moderne — bien plus lisibles que les sous-requêtes imbriquées.__",
          code: 'WITH clients_actifs AS (\n    SELECT user_id, COUNT(*) AS nb_commandes\n    FROM orders\n    WHERE date > "2024-01-01"\n    GROUP BY user_id\n    HAVING COUNT(*) > 3\n)\nSELECT u.nom, c.nb_commandes\nFROM users u\nJOIN clients_actifs c ON u.id = c.user_id\nORDER BY c.nb_commandes DESC;',
          language: 'sql',
          deepDive: `# CTE en PostgreSQL

CTE = Common Table Expression = résultat temporaire nommé pour une requête.

## Syntaxe

\`\`\`sql
WITH cte_name AS (SELECT ...)
SELECT * FROM cte_name;
\`\`\`

## CTE récursives — WITH RECURSIVE

\`\`\`sql
WITH RECURSIVE t(n) AS (
    VALUES (1)
  UNION ALL
    SELECT n+1 FROM t WHERE n < 100
)
SELECT sum(n) FROM t;
\`\`\`

## Parcours d'arborescence

\`\`\`sql
WITH RECURSIVE search_tree(id, link, path) AS (
    SELECT id, link, ARRAY[id]
    FROM tree
  UNION ALL
    SELECT t.id, t.link, path || t.id
    FROM tree t, search_tree st WHERE t.id = st.link
)
SELECT * FROM search_tree ORDER BY path;
\`\`\`

## SEARCH — Ordre intégré

\`\`\`sql
SEARCH DEPTH FIRST BY id SET ordercol
SEARCH BREADTH FIRST BY id SET ordercol
\`\`\`

## Détection de cycles

\`\`\`sql
CYCLE id SET is_cycle USING path
\`\`\`

## Materialization

\`\`\`sql
WITH w AS MATERIALIZED (SELECT * FROM big) SELECT * FROM w;
WITH w AS NOT MATERIALIZED (SELECT * FROM big) SELECT * FROM w AS w1 JOIN w AS w2;
\`\`\`

Source : [PostgreSQL docs — WITH Queries](https://www.postgresql.org/docs/current/queries-with.html)`,
        },
        {
          id: 'sql-7',
          question: 'UNION vs UNION ALL',
          answer: "**`UNION`** : combine les résultats de deux requêtes en **supprimant les doublons** (coûteux car tri/dédoublonnage). **`UNION ALL`** : combine sans supprimer les doublons — **plus rapide**.\n\nRègle : les colonnes doivent être compatibles (même nombre, types compatibles). Les noms de colonnes viennent de la première requête.\n\n__Utilisez `UNION ALL` par défaut__, et `UNION` seulement si vous avez *vraiment* besoin d'éliminer les doublons. La suppression de doublons est une opération de tri complète.",
          code: '-- UNION ALL (rapide, garde les doublons)\nSELECT nom, email FROM clients\nUNION ALL\nSELECT nom, email FROM fournisseurs;\n\n-- UNION (supprime les doublons)\nSELECT ville FROM clients\nUNION\nSELECT ville FROM fournisseurs;',
          language: 'sql',
          deepDive: `# Opérations ensemblistes en PostgreSQL

## UNION vs UNION ALL

| Opérateur | Doublons | Performance |
|-----------|---------|-------------|
| \`UNION\` | Supprime | Plus lent (DISTINCT) |
| \`UNION ALL\` | Garde | Plus rapide |

\`\`\`sql
SELECT city FROM customers UNION ALL SELECT city FROM suppliers;
SELECT city FROM customers UNION SELECT city FROM suppliers;
\`\`\`

## INTERSECT

\`\`\`sql
SELECT name FROM products INTERSECT SELECT name FROM discontinued;
\`\`\`

## EXCEPT

\`\`\`sql
SELECT name FROM products EXCEPT SELECT name FROM discontinued;
\`\`\`

## Précedence

\`INTERSECT\` est prioritaire.

## LIMIT sans parenthèses

\`LIMIT\` s'applique à toute l'union.

Source : [PostgreSQL docs — Set Operations](https://www.postgresql.org/docs/current/queries-union.html)`,
        },
        {
          id: 'sql-8',
          question: 'Procédures stockées et triggers',
          answer: "**Procédure stockée** : code SQL cotè serveur, réutilisable et performant (pas de transfert réseau). Idéal pour les logiques métier complexes côté BDD.\n\n**Trigger** : code exécuté automatiquement sur un événement (`INSERT`, `UPDATE`, `DELETE`). Utile pour l'audit, la validation ou la synchronisation.\n\n__Attention__ : logique dans la BDD = plus difficile à tester, versionner et déboguer. Préférez garder la logique métier dans l'application et limiter procédures/triggers aux optimisations purement données.",
          deepDive: `# Procédures stockées et Triggers en PostgreSQL

## CREATE PROCEDURE

\`\`\`sql
CREATE PROCEDURE insert_data(a integer, b integer)
LANGUAGE SQL
AS $$
INSERT INTO tbl VALUES (a);
INSERT INTO tbl VALUES (b);
$$;

CALL insert_data(1, 2);
\`\`\`

## CREATE FUNCTION

\`\`\`sql
CREATE FUNCTION add_numbers(a integer, b integer)
RETURNS integer
LANGUAGE plpgsql
AS $$
BEGIN RETURN a + b; END;
$$;
\`\`\`

## CREATE TRIGGER

\`\`\`sql
CREATE TRIGGER name
{ BEFORE | AFTER | INSTEAD OF }
{ event [ OR ... ] }
ON table_name
[ FOR [ EACH ] { ROW | STATEMENT } ]
[ WHEN ( condition ) ]
EXECUTE FUNCTION function_name ( arguments )
\`\`\`

## Tables de transition

| | OLD | NEW |
|--|-----|-----|
| INSERT | — | ligne insérée |
| DELETE | ligne supprimée | — |
| UPDATE | avant | après |

## Ordre d'exécution des triggers

1. BEFORE (statement) → 2. BEFORE (row) → 3. Opérations → 4. AFTER (row) → 5. AFTER (statement)

## Audit — Exemple complet

\`\`\`sql
CREATE TABLE employee_audit (
    audit_id SERIAL PRIMARY KEY,
    employee_id INTEGER, action VARCHAR(10),
    old_salary NUMERIC, new_salary NUMERIC,
    changed_by VARCHAR(50), changed_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_salary_changes()
RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND OLD.salary IS DISTINCT FROM NEW.salary THEN
        INSERT INTO employee_audit VALUES (NEW.employee_id, TG_OP, OLD.salary, NEW.salary, current_user);
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER salary_audit_trigger
AFTER UPDATE ON employees FOR EACH ROW
EXECUTE FUNCTION log_salary_changes();
\`\`\`

Source : [PostgreSQL docs — CREATE PROCEDURE](https://www.postgresql.org/docs/current/sql-createprocedure.html)`,
        },
        {
          id: 'sql-9',
          question: 'CASE WHEN et logique conditionnelle',
          answer: "Le **`CASE WHEN`** est le `IF/ELSE` de SQL : évalue des conditions et retourne des valeurs selon le résultat.\n\nDeux formes : **simple** (`CASE colonne WHEN valeur1 THEN ...`) et **recherchée** (`CASE WHEN condition THEN ...`). Utilisable dans `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY` et même les window functions.\n\nCas d'usage : catégorisation, pivot de données, calculs conditionnels, tri personnalisé. __Le CASE est l'outil de base pour toute logique conditionnelle en SQL.__",
          code: 'SELECT nom, salaire,\n    CASE\n        WHEN salaire >= 5000 THEN "Senior"\n        WHEN salaire >= 3000 THEN "Confirmé"\n        ELSE "Junior"\n    END AS niveau\nFROM employes\nORDER BY\n    CASE niveau\n        WHEN "Senior" THEN 1\n        WHEN "Confirmé" THEN 2\n        ELSE 3\n    END;',
          language: 'sql',
        },
      ],
    },
    {
      id: 'sql-perf',
      title: 'Optimisation & Performance',
      questions: [
        {
          id: 'sql-10',
          question: 'Optimisation de requêtes',
          answer: "Étapes clés : **analyser le plan d'exécution** (`EXPLAIN`/`EXPLAIN ANALYZE`) pour identifier les scans complets, les index manquants et les jointures coûteuses.\n\nOptimisations courantes : ajouter des **index ciblés**, limiter les colonnes (`SELECT *` → colonnes nécessaires), utiliser `LIMIT`, remplacer les sous-requêtes corrélées par des `JOIN`, paginer les résultats.\n\nAvancé : **index composites** pour les requêtes multi-colonnes, **partitioning** pour les grandes tables, **vues matérialisées** pour les agrégations fréquentes. __Mesurer avant et après — l'intuition est trompeuse.__",
          code: 'EXPLAIN ANALYZE\nSELECT u.nom, COUNT(o.id)\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.date > "2024-01-01"\nGROUP BY u.nom;',
          language: 'sql',
          deepDive: `# Optimisation de requêtes en PostgreSQL

## EXPLAIN et EXPLAIN ANALYZE

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.nom, COUNT(o.id)
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.date > '2024-01-01'
GROUP BY u.nom;
\`\`\`

## Types de scans

| Type | Description |
|------|-------------|
| Seq Scan | Scan complet |
| Index Scan | Via index |
| Index Only Scan | Index seul, sans lire la table |
| Bitmap Heap Scan | Combine plusieurs index |

## Stratégies

1. **Index ciblés** sur colonnes filtrées/jointes
2. **Éviter \`SELECT *\`** — colonnes nécessaires seulement
3. **Paginer** avec \`LIMIT\`
4. **Remplacer sous-requêtes corrélées** par \`JOIN\`
5. **Mesurer avec \`EXPLAIN ANALYZE\`**

## Index composites

\`CREATE INDEX idx ON orders (statut, date_creation);\`

## Couverture d'index (INCLUDING)

\`\`\`sql
CREATE INDEX idx ON orders (user_id) INCLUDE (total, statut);
\`\`\`

## Vues matérialisées

\`\`\`sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', date) AS month, SUM(total)
FROM orders GROUP BY 1;

REFRESH MATERIALIZED VIEW monthly_sales;
\`\`\`

Source : [PostgreSQL docs — Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)`,
        },
        {
          id: 'sql-11',
          question: 'Index composites et ordre des colonnes',
          answer: "Un **index composite** couvre plusieurs colonnes : `CREATE INDEX idx ON orders (statut, date_creation)`. L'ordre est crucial : la colonne la plus **sélective** ou la plus **filtrée** en premier.\n\nRègle du **prefix le plus à gauche** : l'index `(A, B, C)` peut servir les requêtes filtrant `A`, `A+B` ou `A+B+C`, mais **pas** `B` seul ou `C` seul.\n\n**Index covering** : si toutes les colonnes de la requête sont dans l'index, le SGBD ne lit même pas la table (*index-only scan*). __Un index bien conçu peut diviser le temps de requête par 100.__",
          code: '-- Index composite\nCREATE INDEX idx_orders_statut_date\nON orders (statut, date_creation);\n\n-- Requête qui utilise l\'index\nSELECT * FROM orders\nWHERE statut = "EN_COURS"\n  AND date_creation > "2024-01-01";',
          language: 'sql',
          deepDive: `# Index composites en PostgreSQL

## Syntaxe

\`\`\`sql
CREATE INDEX idx ON table_name (col1, col2, col3);
\`\`\`

## Règle du préfixe le plus à gauche

L'index \`(A, B, C)\` sert pour :
- \`A\` seulement
- \`A\` et \`B\`
- \`A\`, \`B\` et \`C\`

Mais **pas** pour \`B\` seul ou \`C\` seul.

\`\`\`sql
CREATE INDEX idx ON orders (statut, date_creation);

-- UTILISE l'index
SELECT * FROM orders WHERE statut = 'EN_COURS';
SELECT * FROM orders WHERE statut = 'EN_COURS' AND date_creation > '2024-01-01';

-- N'UTILISE PAS l'index
SELECT * FROM orders WHERE date_creation > '2024-01-01';
\`\`\`

## Ordre des colonnes

Colonne la plus **sélective** ou la plus **filtrée** en premier.

## Index covering (INCLUDING)

\`\`\`sql
CREATE INDEX idx ON orders (user_id) INCLUDE (total, statut, date);
\`\`\`

## Index partiels

\`\`\`sql
CREATE INDEX idx ON orders (date) WHERE statut = 'EN_COURS';
\`\`\`

Source : [PostgreSQL docs — Indexes](https://www.postgresql.org/docs/current/indexes.html)`,
        },
        {
          id: 'sql-12',
          question: 'Niveaux d\'isolation des transactions',
          answer: "Quatre niveaux standard, du plus permissif au plus strict :\n\n**Read Uncommitted** : lectures sales possibles (données non commitées visibles). **Read Committed** : pas de lectures sales (défaut PostgreSQL/Oracle). **Repeatable Read** : lectures répétables, pas de lectures non répétables (défaut MySQL). **Serializable** : isolation complète, comme si les transactions s'exécutaient séquentiellement.\n\nPhénomènes évités : **dirty read** → **non-repeatable read** → **phantom read**. Plus l'isolation est élevée, plus les performances baissent (verrous, blocages). __Choisir le niveau adapté au besoin métier, pas le plus strict par défaut.__",
          deepDive: `# Niveaux d'isolation en PostgreSQL

## Les quatre niveaux

| Niveau | Dirty Read | Non-repeatable Read | Phantom Read |
|--------|-----------|---------------------|--------------|
| Read Uncommitted | Impossible (PG) | Possible | Possible |
| Read Committed | Impossible | Possible | Possible |
| Repeatable Read | Impossible | Impossible | Possible (PG: impossible) |
| Serializable | Impossible | Impossible | Impossible |

PostgreSQL ne permet pas les dirty reads même en Read Uncommitted.

## Read Committed (défaut)

Chaque commande voit un snapshot au moment de son exécution.

## Repeatable Read

Le snapshot est pris au début de la transaction. Lectures répétables.

## Serializable

Transactions comme si séquentielles. Peut provoquer \`serialization failure\`.

## SET TRANSACTION

\`\`\`sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
COMMIT;
\`\`\`

## Phénomènes évités

- **Dirty read** : données non commitées lues
- **Non-repeatable read** : même ligne lue différemment
- **Phantom read** : nouvelles lignes entre deux lectures

Source : [PostgreSQL docs — Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)`,
        },
        {
          id: 'sql-13',
          question: 'Pagination efficace',
          answer: "**`LIMIT/OFFSET`** : simple mais **coûteux** pour les pages éloignées — la BDD doit scanner et jeter toutes les lignes précédentes (offset 100000 = 100k lignes lues puis ignorées).\n\n**Pagination par curseur** (*keyset pagination*) : filtrer par la dernière valeur vue (`WHERE id > dernier_id ORDER BY id LIMIT 20`). **Performances constantes** quelle que soit la page.\n\nPour les API REST, la pagination par curseur est le standard. `LIMIT/OFFSET` convient pour les petites pages proches du début.\n\n__Pour les grandes tables, la pagination par curseur est indispensable.__",
          code: '-- Pagination OFFSET (simple mais lent)\nSELECT * FROM orders\nORDER BY id LIMIT 20 OFFSET 100000;\n\n-- Pagination par curseur (rapide, constant)\nSELECT * FROM orders\nWHERE id > :last_seen_id\nORDER BY id LIMIT 20;',
          language: 'sql',
        },
      ],
    },
  ],
};