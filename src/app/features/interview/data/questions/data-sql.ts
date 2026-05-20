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

## Qu'est-ce que c'est ?

\`GROUP BY\` regroupe les lignes partageant les mêmes valeurs dans une ou plusieurs colonnes, puis calcule des **agrégats** (\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`) pour chaque groupe. \`HAVING\` filtre ensuite ces groupes — c'est le \`WHERE\` du groupement.

\`GROUP BY\` répond au besoin d'analyser des données regroupées : "combien de ventes par catégorie ?", "quel est le revenu moyen par département ?". \`HAVING\` permet de filtrer ces groupes après l'agrégation : "quelles catégories ont plus de 10 produits ?".

## Quel problème résout-il ?

Sans \`GROUP BY\`, les fonctions d'agrégation ne peuvent calculer qu'un seul résultat global. Impossible de répondre à "quelle est la moyenne par groupe" sans grouper d'abord.

La distinction critique : **\`WHERE\` filtre avant le groupement, \`HAVING\` filtre après**.

L'ordre logique d'exécution est :

\`\`\`
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
\`\`\`

Comprendre cet ordre est essentiel : au moment du \`WHERE\`, les agrégats n'existent pas encore. Donc filtrer sur un agrégat avec \`WHERE\` — par exemple \`WHERE COUNT(*) > 5\` — provoque une erreur. Il faut utiliser \`HAVING\`.

## Syntaxe et exemples

### Exemple fondamental

\`\`\`sql
SELECT
    categorie,
    COUNT(*) AS nb_produits,
    SUM(stock) AS stock_total,
    AVG(prix) AS prix_moyen,
    MIN(prix) AS prix_min,
    MAX(prix) AS prix_max
FROM produits
WHERE actif = true
GROUP BY categorie
HAVING COUNT(*) > 3
ORDER BY prix_moyen DESC;
\`\`\`

\`WHERE actif = true\` élimine les produits inactifs avant le groupement. \`HAVING COUNT(*) > 3\` conserve uniquement les catégories avec plus de 3 produits.

### GROUP BY avec plusieurs colonnes

\`\`\`sql
SELECT
    region,
    canal,
    SUM(ca) AS chiffre_affaire,
    COUNT(*) AS nb_ventes
FROM ventes
WHERE date >= '2025-01-01'
GROUP BY region, canal
ORDER BY region, chiffre_affaire DESC;
\`\`\`

Chaque combinaison unique (region, canal) forme un groupe.

### HAVING sur plusieurs agrégats

\`\`\`sql
SELECT
    commercial_id,
    SUM(montant) AS total_ventes,
    COUNT(*) AS nb_contrats
FROM contrats
GROUP BY commercial_id
HAVING SUM(montant) > 50000
   AND COUNT(*) >= 10
ORDER BY total_ventes DESC;
\`\`\`

On filtre sur deux agrégats : le total des ventes ET le nombre de contrats.

### GROUPING SETS, CUBE, ROLLUP

Pour des analyses multi-niveaux sans écrire plusieurs requêtes :

\`\`\`sql
-- ROLLUP : hiérarchie (a,b,c) → (a,b) → (a) → ()
SELECT region, canal, SUM(ca)
FROM ventes
GROUP BY ROLLUP (region, canal);
-- Résultat : ventes par région+canal, puis par région, puis total global

-- CUBE : tous les sous-ensembles
SELECT region, canal, semestre, SUM(ca)
FROM ventes
GROUP BY CUBE (region, canal, semestre);
-- Résultat : toutes les combinaisons possibles

-- GROUPING SETS : combinaisons explicites
SELECT region, canal, SUM(ca)
FROM ventes
GROUP BY GROUPING SETS ((region), (canal), ());
-- Résultat : ventes par région, par canal, et total global
\`\`\`

## Extension PostgreSQL — Dépendance fonctionnelle

PostgreSQL permet de grouper par une clé primaire uniquement, et d'inclure les colonnes fonctionnellement dépendantes (déductibles de la clé) sans les mentionner explicitement :

\`\`\`sql
-- Table products avec product_id comme clé primaire
SELECT product_id, name, price, category
FROM products
GROUP BY product_id;
\`\`\`

\`name\`, \`price\` et \`category\` sont fonctionnellement dépendants de \`product_id\` (clé primaire) — PostgreSQL l'accepte. Sans cette extension, il faudrait grouper par toutes les colonnes non agrégées, ce qui alourdirait la requête.

## Bonnes pratiques

1. **Toute colonne non agrégée dans le SELECT doit être dans le GROUP BY** (sauf extension PostgreSQL pour clé primaire)
2. **Utiliser HAVING pour les agrégats, WHERE pour les colonnes simples** — c'est la confusion la plus fréquente
3. **Filtrer au maximum avec WHERE** pour réduire le volume avant groupement — plus performant
4. **GROUP BY sur des colonnes avec faible cardinalité** donne des groupes larges et utiles. Cardinalité élevée = beaucoup de petits groupes
5. **Les expressions dans GROUP BY sont permises** : \`GROUP BY DATE_TRUNC('month', date)\`
6. **NULL dans GROUP BY** — tous les NULL sont groupés ensemble comme une valeur distincte

## Pièges courants

1. **\`WHERE\` sur un agrégat** — erreur classique. \`WHERE COUNT(*) > 5\` ne fonctionne pas, utiliser \`HAVING COUNT(*) > 5\`

\`\`\`sql
-- ERREUR : WHERE ne peut pas filtrer sur un agrégat
SELECT categorie, COUNT(*) FROM produits
WHERE COUNT(*) > 5  -- ❌ ERREUR
GROUP BY categorie;

-- CORRECT : HAVING filtre après agrégation
SELECT categorie, COUNT(*) FROM produits
GROUP BY categorie
HAVING COUNT(*) > 5;  -- ✅
\`\`\`

2. **Colonne non groupée sans agrégat** — PostgreSQL refuse. Solution : ajouter la colonne au GROUP BY ou encapsuler dans une fonction d'agrégation
3. **Confondre l'ordre d'exécution** — \`WHERE\` ne peut pas référencer un alias du \`SELECT\` car \`WHERE\` s'exécute avant
4. **GROUP BY sur des floats** — problèmes de précision. Utiliser \`ROUND(col, 2)\` dans le GROUP BY pour des regroupements cohérents

Source : [PostgreSQL docs — GROUP BY](https://www.postgresql.org/docs/current/queries-table-expressions.html)`,
        },
        {
          id: 'sql-4',
          question: 'EXISTS vs IN',
          answer: "**`IN`** : vérifie si une valeur est dans un ensemble de résultats. Simple mais peut être lent avec de grandes sous-requêtes car le SGBD évalue toute la sous-requête d'abord.\n\n**`EXISTS`** : vérifie si la sous-requête retourne *au moins une ligne*. Le SGBD peut s'arrêter dès qu'il trouve un match — **plus performant** pour les sous-requêtes corrélées.\n\nRègle : `IN` pour les petites listes ou sous-requêtes non corrélées, `EXISTS` pour les sous-requêtes corrélées. `NOT EXISTS` est généralement plus rapide que `NOT IN` (surtout avec les `NULL`).",
          code: '-- EXISTS (plus rapide pour sous-requêtes corrélées)\nSELECT * FROM users u\nWHERE EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n);\n\n-- IN (plus simple pour petites listes)\nSELECT * FROM users\nWHERE id IN (SELECT user_id FROM orders);',
          language: 'sql',
          deepDive: `# EXISTS vs IN en PostgreSQL

## Qu'est-ce que c'est ?

\`IN\` et \`EXISTS\` sont deux opérateurs qui permettent de **tester l'appartenance à un ensemble**. Ils répondent à la question : "existe-t-il des lignes qui correspondent à cette condition ?".

- \`IN\` : vérifie si une valeur est présente dans un ensemble de valeurs ou le résultat d'une sous-requête
- \`EXISTS\` : vérifie si une sous-requête retourne au moins une ligne

\`EXISTS\` répond au besoin de tester l'existence d'un enregistrement sans se préoccuper de la valeur exacte retournée — d'où l'usage de \`SELECT 1\` ou \`SELECT *\` qui sont équivalents pour \`EXISTS\`.

## Quel problème résout-il ?

Ces opérateurs permettent de :
- **Filtrer** une table principale selon des critères dans une autre table
- **Éviter les jointures** quand on n'a pas besoin des colonnes de la table secondaire
- **Exprimer des conditions complexes** que \`WHERE\` simple ne peut pas gérer

## Syntaxe et exemples

### IN — ensemble de valeurs

\`\`\`sql
-- Valeurs explicites
SELECT * FROM products WHERE category_id IN (1, 2, 3);

-- Sous-requête non corrélée
SELECT * FROM users WHERE id IN (
    SELECT user_id FROM orders WHERE total > 100
);
\`\`\`

### EXISTS — test d'existence

\`\`\`sql
-- Sous-requête corrélée
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`

\`SELECT 1\` et \`SELECT *\` sont identiques pour \`EXISTS\` — PostgreSQL n'évalue pas le contenu, juste si une ligne est retournée.

### NOT EXISTS vs NOT IN

\`\`\`sql
-- Clients qui n'ont jamais commandé
SELECT * FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`

\`NOT EXISTS\` gère correctement les \`NULL\`, contrairement à \`NOT IN\`.

\`\`\`sql
-- PROBLÈME : NOT IN avec NULL
SELECT * FROM users WHERE id NOT IN (1, 2, NULL);
-- Si la sous-requête contient un NULL, le résultat est vide !

-- SOLUTION : NOT EXISTS
SELECT * FROM users u WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`

## IN vs EXISTS — quelle différence de performance ?

### Sous-requête non corrélée

Pour une sous-requête non corrélée, \`IN\` et \`EXISTS\` sont généralement équivalents. Le SGBD optimise les deux de la même manière.

### Sous-requête corrélée

\`EXISTS\` est souvent **plus performant** car :
- Le SGBD peut s'arrêter dès la première ligne trouvée
- \`IN\` peut nécessiter d'évaluer toute la sous-requête

\`\`\`sql
-- EXISTS : s'arrête au premier match
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.total > 500
);

-- IN : peut évaluer toute la sous-requête
SELECT * FROM users
WHERE id IN (
    SELECT user_id FROM orders WHERE total > 500
);
\`\`\`

## Recommandations pratiques

| Scénario | Recommandation |
|----------|---------------|
| Liste de valeurs fixes | \`IN (1, 2, 3)\` |
| Sous-requête non corrélée simple | \`IN\` |
| Sous-requête corrélée | \`EXISTS\` |
| Test d'existence | \`EXISTS\` |
| Négation | \`NOT EXISTS\` (pas \`NOT IN\` avec NULLs) |

## Bonnes pratiques

1. **\`SELECT 1\` dans \`EXISTS\`** —techniquement identique à \`SELECT *\` mais explicite : "je vérifie l'existence, pas les valeurs"
2. **Utiliser \`IN\` pour les listes courtes** — \`IN (1, 2, 3)\` est plus lisible qu'une sous-requête
3. **Privilégier \`EXISTS\` pour les sous-requêtes corrélées** — l'optimisation early-exit fait la différence

## Pièges courants

1. **\`NOT IN\` avec des \`NULL\`** — si la sous-requête peut retourner \`NULL\`, \`NOT IN\` retourne un résultat vide ou inattendu. Toujours utiliser \`NOT EXISTS\`

\`\`\`sql
-- DANGEREUX si orders.user_id peut être NULL
SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders);

-- SÛR : NOT EXISTS
SELECT * FROM users u WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`

2. **IN avec grandes sous-requêtes** — si la sous-requête retourne des milliers de lignes, \`EXISTS\` peut être plus performant grâce à l'optimisation early-exit

Source : [PostgreSQL docs — Subquery Expressions](https://www.postgresql.org/docs/current/functions-subquery.html)`,
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

## Qu'est-ce que c'est ?

Les window functions effectuent un calcul sur un **ensemble de lignes liées à la ligne courante** — la "fenêtre" — **sans réduire le nombre de lignes** (contrairement à \`GROUP BY\` qui agglomère). Chaque ligne conserve son identité et gagne des colonnes calculées.

\`GROUP BY\` répond : "quel est le total par groupe ?" (N lignes → M groupes).
Window functions répondent : "quelle est la contribution de chaque ligne au total ?" (N lignes → N lignes).

La fenêtre est définie par \`OVER()\` et peut inclure :
- **PARTITION BY** : délimite les groupes (comme \`GROUP BY\` mais sans collapse)
- **ORDER BY** : ordonne les lignes dans la fenêtre
- **Frame** : sous-ensemble de la fenêtre (lignes précédentes, suivantes, etc.)

## Quel problème résout-il ?

Sans window functions, calculer des métriques relatives (pourcentage du total, rang dans un groupe, comparaison à la ligne précédente) nécessite des sous-requêtes ou des jointures complexes. Les window functions rendent ces calculs **déclaratifs** et **performants**.

Cas d'usage courants :
- **Classement** : "quel est le meilleur vendeur par région ?"
- **Cumul** : "quel est le total cumulé des ventes par mois ?"
- **Comparaison** : "quelle est la différence avec le mois précédent ?"
- **Ratio** : "quel pourcentage du total régional chaque vente représente-t-elle ?"

## Syntaxe complète

\`\`\`sql
function_name() OVER (
    [PARTITION BY column(s)]    -- groupes
    [ORDER BY column(s)]         -- ordre dans chaque groupe
    [ROWS | RANGE BETWEEN frame_start AND frame_end]  -- frame
)
\`\`\`

Les trois clauses sont **optionnelles**. Sans \`PARTITION BY\`, toute la table est la fenêtre. Sans \`ORDER BY\`, l'ordre est non déterministe.

## Fonctions de classement

### ROW_NUMBER, RANK, DENSE_RANK

\`\`\`sql
SELECT
    nom,
    dept,
    salaire,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salaire DESC) AS rn,
    RANK() OVER (PARTITION BY dept ORDER BY salaire DESC) AS rk,
    DENSE_RANK() OVER (PARTITION BY dept ORDER BY salaire DESC) AS dr
FROM employes
ORDER BY dept, salaire DESC;
\`\`\`

| Salaire | ROW_NUMBER | RANK | DENSE_RANK |
|---------|------------|------|-----------|
| 5000    | 1          | 1    | 1         |
| 4500    | 2          | 2    | 2         |
| 4500    | 3          | 2    | 2         |
| 4000    | 4          | 4    | 3         |

- **ROW_NUMBER** : numérotation continue (1, 2, 3, 4)
- **RANK** : ex aequo même rang, trou après (1, 2, 2, 4)
- **DENSE_RANK** : ex aequo même rang, pas de trou (1, 2, 2, 3)

### PERCENT_RANK et NTILE

\`\`\`sql
-- Percentile : 0 pour le premier, 1 pour le dernier
PERCENT_RANK() OVER (PARTITION BY dept ORDER BY salaire)

-- NTILE : diviser en N groupes de taille égale
NTILE(4) OVER (PARTITION BY dept ORDER BY salaire)
-- Quarts : 1 = premier quartile, 4 = dernier quartile
\`\`\`

## Fonctions de navigation

### LAG et LEAD

\`LAG(col)\` récupère la valeur de la ligne **précédente** dans la fenêtre. \`LEAD(col)\` récupère la suivante.

\`\`\`sql
SELECT
    mois,
    ca,
    LAG(ca, 1, 0) OVER (ORDER BY mois) AS ca_mois_precedent,
    LEAD(ca, 1) OVER (ORDER BY mois) AS ca_mois_suivant,
    ca - LAG(ca, 1) OVER (ORDER BY mois) AS evolution
FROM ventes_mensuelles
ORDER BY mois;
\`\`\`

Le deuxième argument (offset) indique combien de lignes avant/après. Le troisième argument est la valeur par défaut si NULL.

### FIRST_VALUE, LAST_VALUE, NTH_VALUE

\`\`\`sql
-- Première valeur de la fenêtre
FIRST_VALUE(ca) OVER (PARTITION BY region ORDER BY mois)

-- Dernière valeur de la fenêtre
LAST_VALUE(ca) OVER (PARTITION BY region ORDER BY mois)

-- N-ième valeur (ici 3ème)
NTH_VALUE(ca, 3) OVER (PARTITION BY region ORDER BY mois)
\`\`\`

## Window Frames

Par défaut, \`ORDER BY\` dans \`OVER()\` rend la frame égale à \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — du début au curseur courant. Cela convient pour les cumuls (\`SUM() OVER\`) mais **pas** pour \`LAST_VALUE()\` qui nécessiterait \`RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\`.

### Frames courantes

\`\`\`sql
-- Total cumulé (du début au curseur courant)
SUM(ca) OVER (ORDER BY mois ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- Moyenne glissante sur 3 mois
AVG(ca) OVER (ORDER BY mois ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)

-- Cumuls par groupe (recommence à 0 pour chaque région)
SUM(ca) OVER (PARTITION BY region ORDER BY mois
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- Accès à la dernière valeur du groupe
LAST_VALUE(ca) OVER (PARTITION BY region ORDER BY mois
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
\`\`\`

### ROWS vs RANGE

- **ROWS** : compte physiquement le nombre de lignes
- **RANGE** : compte les lignes par valeur (logique, pour les valeurs ordonnées)

\`\`\`sql
-- 2 lignes précédentes physiquement
SUM(x) OVER (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)

-- Toutes les lignes avec la même valeur que la ligne courante
SUM(x) OVER (RANGE BETWEEN 2 PRECEDING AND CURRENT ROW)
\`\`\`

## Exemples pratiques complets

### Classement et pourcentage

\`\`\`sql
SELECT
    nom,
    dept,
    salaire,
    RANK() OVER (PARTITION BY dept ORDER BY salaire DESC) AS rang,
    ROUND(
        salaire::NUMERIC / SUM(salaire) OVER (PARTITION BY dept) * 100,
        1
    ) AS pct_du_dept
FROM employes
ORDER BY dept, rang;
\`\`\`

### Running total et comparison

\`\`\`sql
SELECT
    date_cmd,
    montant,
    SUM(montant) OVER (ORDER BY date_cmd) AS cumul,
    montant - AVG(montant) OVER (ORDER BY date_cmd
        ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING) AS vs_moyenne_glissante
FROM commandes
ORDER BY date_cmd;
\`\`\`

## Bonnes pratiques

1. **Toujours spécifier \`ORDER BY\` dans \`OVER()\`** pour les calculs ordonnés — sans ordre, le résultat est imprévisible
2. **Utiliser \`PARTITION BY\` pour grouper sans agglomérer** — chaque ligne garde son identité
3. **Les window functions s'exécutent après \`WHERE\`, \`GROUP BY\`, \`HAVING\` mais avant \`ORDER BY\` et \`LIMIT\`** de la requête principale
4. **Les window functions sont puissantes dans les CTE** — pour chaîner plusieurs opérations de fenêtrage
5. **N'utilisez pas \`SELECT *\` avec des window functions** — spécifiez explicitement les colonnes

## Pièges courants

1. **Oublier \`ORDER BY\` dans \`OVER()\`** — sans ordre, \`LAG\`/\`LEAD\` retournent des valeurs non déterministes. Toujours ordonner explicitement

\`\`\`sql
-- ❌ DANGEREUX : ordre non spécifié
SELECT nom, LAG(nom) OVER () FROM employes;

-- ✅ CORRECT : ordre explicite
SELECT nom, LAG(nom) OVER (ORDER BY id) FROM employes;
\`\`\`

2. **Frame clause par défaut avec \`LAST_VALUE()\`** — \`LAST_VALUE\` par défaut ne retourne pas la dernière ligne du groupe. Utiliser \`ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\`

\`\`\`sql
-- ❌ Ne fonctionne pas comme prévu
SELECT LAST_VALUE(salaire) OVER (PARTITION BY dept ORDER BY salaire);

-- ✅ Frame explicite
SELECT LAST_VALUE(salaire) OVER (PARTITION BY dept ORDER BY salaire
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING);
\`\`\`

3. **Melanger window functions et \`GROUP BY\`** — \`GROUP BY\` s'exécute en premier, puis les window functions opèrent sur le résultat groupé
4. **Window functions dans \`WHERE\`** — impossible. Si vous avez besoin de filtrer sur un résultat de window function, utilisez une sous-requête ou CTE

\`\`\`sql
-- ❌ ERREUR : impossible
SELECT *, ROW_NUMBER() OVER () AS rn FROM employes WHERE rn = 1;

-- ✅ Solution : CTE
WITH numbered AS (
    SELECT *, ROW_NUMBER() OVER (ORDER BY salaire DESC) AS rn
    FROM employes
)
SELECT * FROM numbered WHERE rn = 1;
\`\`\`

Source : [PostgreSQL docs — Window Functions](https://www.postgresql.org/docs/current/functions-window.html)`,
        },
        {
          id: 'sql-6',
          question: 'CTE (Common Table Expressions)',
          answer: "Les **CTE** créent des résultats temporaires nommés via `WITH ... AS (...)`, visibles dans toute la requête suivante.\n\nAvantages sur les sous-requêtes : **lisible** (nommage explicite), **réutilisable** (plusieurs références dans la même requête), **maintenable** (logique décomposée étape par étape).\n\nLes **CTE récursives** (`WITH RECURSIVE`) parcourent des hiérarchies (organigrammes, arbres de catégories). __Pour les requêtes complexes, les CTE sont le standard moderne — bien plus lisibles que les sous-requêtes imbriquées.__",
          code: 'WITH clients_actifs AS (\n    SELECT user_id, COUNT(*) AS nb_commandes\n    FROM orders\n    WHERE date > "2024-01-01"\n    GROUP BY user_id\n    HAVING COUNT(*) > 3\n)\nSELECT u.nom, c.nb_commandes\nFROM users u\nJOIN clients_actifs c ON u.id = c.user_id\nORDER BY c.nb_commandes DESC;',
          language: 'sql',
          deepDive: `# CTE (Common Table Expressions) en PostgreSQL

## Qu'est-ce que c'est ?

Une **CTE** (Common Table Expression) est un résultat temporaire nommé, défini avec \`WITH ... AS (...)\` et utilisable dans toute la requête qui suit. C'est une vue éphémère qui n'existe que le temps de la requête.

L'objectif principal : **décomposer une requête complexe en étapes lisibles** plutôt que d'emboîter des sous-requêtes les unes dans les autres.

## Quel problème résout-elle ?

Les sous-requêtes imbriquées (\`WHERE x IN (SELECT ... WHERE y IN (SELECT ...))\`) deviennent vite illisibles. Les CTE permettent de :

- **Nommer chaque étape** pour que le code soit auto-documenté
- **Référencer une même sous-requête plusieurs fois** sans la dupliquer
- **Remplacer les sous-requêtes corrélées** par des jointures plus performantes
- **Parcourir des hiérarchies** avec les CTE récursives

## Cas d'usage concrets

### Décomposition d'une logique complexe

Au lieu d'une sous-requête imbriquée difficile à lire :

\`\`\`sql
-- Sous-requêtes imbriquées (illisibles)
SELECT * FROM (
    SELECT * FROM (
        SELECT user_id, SUM(total) AS revenue
        FROM orders WHERE date > '2024-01-01'
        GROUP BY user_id
    ) AS r WHERE revenue > 1000
) AS big WHERE user_id IN (
    SELECT id FROM users WHERE actif = true
);
\`\`\`

Utilisez des CTE pour un code explicite :

\`\`\`sql
WITH filtered_orders AS (
    SELECT user_id, SUM(total) AS revenue
    FROM orders WHERE date > '2024-01-01'
    GROUP BY user_id
    HAVING SUM(total) > 1000
),
active_clients AS (
    SELECT id FROM users WHERE actif = true
)
SELECT u.name, fo.revenue
FROM active_clients ac
JOIN users u ON ac.id = u.id
JOIN filtered_orders fo ON u.id = fo.user_id
ORDER BY fo.revenue DESC;
\`\`\`

### Réutilisation multiple

Une CTE n'est calculée qu'une fois même si elle est référencée plusieurs fois :

\`\`\`sql
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders GROUP BY 1
)
SELECT
    m.month,
    m.revenue,
    m.revenue - AVG(m.revenue) OVER () AS vs_avg,
    m.revenue / SUM(m.revenue) OVER () * 100 AS pct_total
FROM monthly_sales m
ORDER BY m.month;
\`\`\`

### Parcours d'une hiérarchie (CTE récursive)

Pour parcourir un organigramme ou une arborescence :

\`\`\`sql
WITH RECURSIVE org_chart AS (
    -- Point de départ : employés sans manager
    SELECT id, name, manager_id, 1 AS level, ARRAY[name] AS path
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    -- Récursion : employés sous chaque manager
    SELECT e.id, e.name, e.manager_id, oc.level + 1, oc.path || e.name
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT level, name, path FROM org_chart ORDER BY path;
\`\`\`

## Options de matérialisation

PostgreSQL propose deux options pour contrôler comment la CTE est traitée :

| Option | Comportement |
|--------|---------------|
| \`MATERIALIZED\` | Calculée une seule fois (défaut) |
| \`NOT MATERIALIZED\` | Intégrée à la requête externe (peut être plus rapide) |

\`\`\`sql
-- Force le calcul séparé
WITH big_cte AS MATERIALIZED (
    SELECT * FROM huge_table
) SELECT * FROM big_cte;

-- Intègre à la requête principale
WITH small_cte AS NOT MATERIALIZED (
    SELECT id, name FROM small_table
) SELECT * FROM small_cte s1 JOIN small_cte s2 ON s1.id = s2.parent_id;
\`\`\`

## Pièges courants

1. **Oublier que la CTE est matérialisée** peut mener à un scan complet répété si elle est utilisée plusieurs fois
2. **Les CTE ne sont pas des vues** — elles n'acceptent pas de paramètres et n'existent que pour une requête
3. **Les CTE récursives sans condition d'arrêt** bouclent à l'infini — toujours vérifier la condition de récursion

Source : [PostgreSQL docs — WITH Queries](https://www.postgresql.org/docs/current/queries-with.html)`,
        },
        {
          id: 'sql-7',
          question: 'UNION vs UNION ALL',
          answer: "**`UNION`** : combine les résultats de deux requêtes en **supprimant les doublons** (coûteux car tri/dédoublonnage). **`UNION ALL`** : combine sans supprimer les doublons — **plus rapide**.\n\nRègle : les colonnes doivent être compatibles (même nombre, types compatibles). Les noms de colonnes viennent de la première requête.\n\n__Utilisez `UNION ALL` par défaut__, et `UNION` seulement si vous avez *vraiment* besoin d'éliminer les doublons. La suppression de doublons est une opération de tri complète.",
          code: '-- UNION ALL (rapide, garde les doublons)\nSELECT nom, email FROM clients\nUNION ALL\nSELECT nom, email FROM fournisseurs;\n\n-- UNION (supprime les doublons)\nSELECT ville FROM clients\nUNION\nSELECT ville FROM fournisseurs;',
          language: 'sql',
          deepDive: `# UNION vs UNION ALL en PostgreSQL

## Qu'est-ce que c'est ?

\`UNION\` et \`UNION ALL\` sont des **opérateurs ensemblistes** qui combinent les résultats de deux requêtes ou plus en une seule table logique.

La différence fondamentale :

- **\`UNION\`** : élimine les doublons → résultat dédupliqué
- **\`UNION ALL\`** : conserve tous les résultats → résultat complet, y compris les doublons

## Quel problème résout-elle ?

Quand vous avez des données similaires dans plusieurs tables (ex: clients et fournisseurs) ou des enregistrements séparés (ex: commandes actives et archivées), vous devez souvent les **consolider** pour analyse ou rapport.

\`UNION ALL\` répond au besoin le plus courant : réunifier des données sans perdre de lignes.
\`UNION\` répond au besoin de déduplication quand les doublons n'ont pas de sens (ex: liste de villes uniques).

## Pourquoi la performance diffère-t-elle ?

\`UNION\` doit :
1. Collecter tous les résultats
2. **Trier** l'ensemble complet pour détecter les doublons
3. Supprimer les doublons

\`UNION ALL\` n'a qu'à concaténer les résultats — aucun tri nécessaire.

Pour 100 000 lignes, \`UNION ALL\` peut être **10x plus rapide** que \`UNION\`.

## Cas d'usage concrets

### Consolider des sources différentes

\`\`\`sql
-- Tous les noms de contacts (clients + fournisseurs)
SELECT name, email, 'Client' AS type FROM clients
UNION ALL
SELECT name, email, 'Fournisseur' AS type FROM suppliers;
\`\`\`

### Éviter les doublons logiques

\`\`\`sql
-- Liste des villes où nous avons soit des clients, soit des ventes
SELECT city FROM clients
UNION
SELECT city FROM orders WHERE city IS NOT NULL;
\`\`\`

### Garder les doublons significatifs

\`\`\`sql
-- Chaque transaction doit apparaître, même si deux transactions ont le même montant
SELECT transaction_id, amount FROM current_account
UNION ALL
SELECT transaction_id, amount FROM savings_account;
\`\`\`

## Pièges courants

1. **\`UNION\` quand \`UNION ALL\` suffit** — la déduction de doublons est coûteuse pour rien
2. **Les \`NULL\` sont considérés comme égaux** — deux \`NULL\` ne comptent que comme un seul résultat
3. **Les types doivent être compatibles** — PostgreSQL tentera une conversion, mais le résultat peut être inattendu
4. **L'ordre des colonnes vient de la première requête** — nommez explicitement pour la clarté

\`\`\`sql
-- Les noms de colonnes viennent de la première requête
SELECT name, email FROM clients
UNION
SELECT company_name, contact_email FROM suppliers;
-- ↑ name et email viennent de la première requête
\`\`\`

## Opérateurs apparentés

### INTERSECT — intersection

\`\`\`sql
-- Produits vendus ce mois ET le mois dernier
SELECT product_id FROM sales WHERE EXTRACT(MONTH FROM date) = 5
INTERSECT
SELECT product_id FROM sales WHERE EXTRACT(MONTH FROM date) = 4;
\`\`\`

### EXCEPT — différence

\`\`\`sql
-- Clients qui ont commandé mais pas ce mois
SELECT user_id FROM orders
EXCEPT
SELECT user_id FROM orders WHERE EXTRACT(MONTH FROM date) = 5;
\`\`\`

## Règle pratique

> Utilisez \`UNION ALL\` par défaut. Ne choisissez \`UNION\` que si vous avez **absolument besoin** d'éliminer les doublons et que vous comprenez le coût du tri.

Source : [PostgreSQL docs — Set Operations](https://www.postgresql.org/docs/current/queries-union.html)`,
        },
        {
          id: 'sql-8',
          question: 'Procédures stockées et triggers',
          answer: "**Procédure stockée** : code SQL cotè serveur, réutilisable et performant (pas de transfert réseau). Idéal pour les logiques métier complexes côté BDD.\n\n**Trigger** : code exécuté automatiquement sur un événement (`INSERT`, `UPDATE`, `DELETE`). Utile pour l'audit, la validation ou la synchronisation.\n\n__Attention__ : logique dans la BDD = plus difficile à tester, versionner et déboguer. Préférez garder la logique métier dans l'application et limiter procédures/triggers aux optimisations purement données.",
          deepDive: `# Procédures stockées et Triggers en PostgreSQL

## Qu'est-ce que c'est ?

### Procédure stockée

Une **procédure stockée** est une fonction stockée directement dans la base de données, qui peut accepter des paramètres, exécuter plusieurs opérations et retourner des résultats. Elle permet d'écrire de la logique métier qui s'exécute **côté serveur** plutôt que dans l'application.

### Trigger

Un **trigger** est une fonction qui s'exécute **automatiquement** lors d'événements spécifiques (\`INSERT\`, \`UPDATE\`, \`DELETE\`) sur une table. Il permet d'automatiser des actions en réponse à des modifications de données.

## Quel problème résout-elle ?

### Procédures stockées

- **Réduire les allers-retours réseau** — une requête au lieu de plusieurs
- **Centraliser la logique métier** — des règles qui s'appliquent quel que soit le client (web, mobile, API)
- **Garantir la cohérence** — transactions atomiques sur plusieurs tables

### Triggers

- **Automatiser l'audit** — journaliser chaque modification
- **Validation automatique** — refuser ou modifier des données non conformes
- **Synchronisation** — maintenir des tables dérivées ou des compteurs

## Cas d'usage concrets

### Procédure stockée — Logique métier complexe

\`\`\`sql
CREATE OR REPLACE FUNCTION process_order(order_id UUID, customer_id UUID)
RETURNS TABLE(final_status TEXT, discount_applied NUMERIC) AS $$
DECLARE
    discount NUMERIC := 0;
BEGIN
    -- Calcul de réduction selon l'historique
    SELECT SUM(total) * 0.05 INTO discount
    FROM orders WHERE user_id = customer_id AND total > 100;

    -- Mise à jour de la commande
    UPDATE orders
    SET status = 'CONFIRMED', discount = discount
    WHERE id = order_id;

    -- Retourner le résultat
    RETURN QUERY SELECT 'CONFIRMED'::TEXT, COALESCE(discount, 0);
END;
$$ LANGUAGE plpgsql;

SELECT * FROM process_order('abc123', 'user456');
\`\`\`

### Trigger — Audit de salary

\`\`\`sql
CREATE TABLE employee_audit (
    audit_id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    action VARCHAR(10),
    old_salary NUMERIC,
    new_salary NUMERIC,
    changed_by VARCHAR(50),
    changed_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_salary_changes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND OLD.salary IS DISTINCT FROM NEW.salary THEN
        INSERT INTO employee_audit (employee_id, action, old_salary, new_salary, changed_by)
        VALUES (
            NEW.employee_id,
            TG_OP,
            OLD.salary,
            NEW.salary,
            current_user
        );
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER salary_audit_trigger
AFTER UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION log_salary_changes();
\`\`\`

### Trigger — Contrainte métier

\`\`\`sql
CREATE OR REPLACE FUNCTION prevent_negative_stock()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.stock < 0 THEN
        RAISE EXCEPTION 'Le stock ne peut pas être négatif (%)', NEW.stock;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER stock_check
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION prevent_negative_stock();
\`\`\`

## Quand NE PAS utiliser procédures et triggers

La logique dans la base de données est :

- **Plus difficile à tester** — pas d'outil de debug classique
- **Plus difficile à versionner** — requires migrations SQL
- **Plus difficile à déboguer** — pas de stack trace

### Préférez l'application quand :

- La logique est complexe (algorithmes, appels API externes)
- Vous avez besoin de tests unitaires rigoureux
- L'équipe n'a pas d'expertise SQL avancée

### Utilisez la base quand :

- La cohérence transactionnelle est critique (ex: inventaire financier)
- La performance réseau est un goulot d'étranglement
- La règle s'applique quelque que soit le client (web, mobile, API)

## Ordre d'exécution des triggers

PostgreSQL exécute les triggers dans cet ordre :

1. \`BEFORE\` (statement)
2. \`BEFORE\` (pour chaque ligne)
3. Opération \`INSERT\`/\`UPDATE\`/\`DELETE\`
4. \`AFTER\` (pour chaque ligne)
5. \`AFTER\` (statement)

## Pièges courants

1. **Triggers récursifs** — un trigger qui modifie la même table peut se déclenche lui-même
2. **Performance** — les triggers \`AFTER\` sur de gros volumes peuvent ralentir les imports
3. **Transaction implicite** — si le trigger échoue, toute la transaction échoue
4. **Logique cachée** — un trigger qui modifie des données sans le dire peut surprendre

Source : [PostgreSQL docs — CREATE PROCEDURE](https://www.postgresql.org/docs/current/sql-createprocedure.html)
Source : [PostgreSQL docs — CREATE TRIGGER](https://www.postgresql.org/docs/current/sql-createtrigger.html)`,
        },
        {
          id: 'sql-9',
          question: 'CASE WHEN et logique conditionnelle',
          answer: "Le **`CASE WHEN`** est le `IF/ELSE` de SQL : évalue des conditions et retourne des valeurs selon le résultat.\n\nDeux formes : **simple** (`CASE colonne WHEN valeur1 THEN ...`) et **recherchée** (`CASE WHEN condition THEN ...`). Utilisable dans `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY` et même les window functions.\n\nCas d'usage : catégorisation, pivot de données, calculs conditionnels, tri personnalisé. __Le CASE est l'outil de base pour toute logique conditionnelle en SQL.__",
          code: 'SELECT nom, salaire,\n    CASE\n        WHEN salaire >= 5000 THEN "Senior"\n        WHEN salaire >= 3000 THEN "Confirmé"\n        ELSE "Junior"\n    END AS niveau\nFROM employes\nORDER BY\n    CASE niveau\n        WHEN "Senior" THEN 1\n        WHEN "Confirmé" THEN 2\n        ELSE 3\n    END;',
          language: 'sql',
          deepDive: `# CASE WHEN et logique conditionnelle en PostgreSQL

## Qu'est-ce que c'est ?

\`CASE WHEN\` est le **if/else de SQL**. Il évalue des conditions et retourne une valeur selon le résultat. C'est l'outil fondamental pour toute logique conditionnelle dans une requête.

Deux formes :

- **\`CASE colonne WHEN valeur1 THEN ...\`** — comparaison simple (comme un \`switch\`)
- **\`CASE WHEN condition1 THEN ... ELSE ... END\`** — conditions recherchées (comme un \`if/else if/else\`)

## Quel problème résout-elle ?

Sans \`CASE WHEN\`, vous devriez :

- faire plusieurs requêtes et combiner les résultats dans l'application
- utiliser des sous-requêtes complexes pour simuler la logique conditionnelle
- créer plusieurs colonnes booléennes et les combiner

\`CASE WHEN\` permet de :

- **Catégoriser** des valeurs continues en groupes
- **Calculer conditionnellement** sans sous-requêtes
- **Créer des colonnes dérivées** pour le tri ou le groupement
- **Transformer** le format des données pour l'affichage

## Cas d'usage concrets

### Catégorisation de données

\`\`\`sql
SELECT
    nom,
    salaire,
    CASE
        WHEN salaire >= 5000 THEN 'Senior'
        WHEN salaire >= 3000 THEN 'Confirmé'
        WHEN salaire >= 1500 THEN 'Junior'
        ELSE 'Stagiaire'
    END AS niveau
FROM employes;
\`\`\`

### Pivot de données (lignes → colonnes)

\`\`\`sql
SELECT
    mois,
    SUM(CASE WHEN region = 'Nord' THEN ca ELSE 0 END) AS ca_nord,
    SUM(CASE WHEN region = 'Sud' THEN ca ELSE 0 END) AS ca_sud,
    SUM(CASE WHEN region = 'Est' THEN ca ELSE 0 END) AS ca_est,
    SUM(CASE WHEN region = 'Ouest' THEN ca ELSE 0 END) AS ca_ouest
FROM ventes
GROUP BY mois
ORDER BY mois;
\`\`\`

### Calcul conditionnel

\`\`\`sql
SELECT
    o.id,
    o.total,
    CASE
        WHEN o.client_id IN (
            SELECT user_id FROM orders GROUP BY user_id HAVING COUNT(*) > 10
        ) THEN o.total * 0.9  -- 10% de réduction pour clients fidèles
        ELSE o.total
    END AS total_final
FROM orders o;
\`\`\`

### Tri personnalisé

\`\`\`sql
SELECT
    nom,
    statut,
    CASE statut
        WHEN 'EN_COURS' THEN 1
        WHEN 'EN_ATTENTE' THEN 2
        WHEN 'ANNULE' THEN 3
        ELSE 4
    END AS tri_ordre
FROM commandes
ORDER BY tri_ordre;
\`\`\`

### Valeurs par défaut

\`\`\`sql
SELECT
    name,
    CASE WHEN phone IS NULL OR phone = '' THEN 'Non renseigné' ELSE phone END AS phone
FROM contacts;
\`\`\`

## Dans les window functions

\`CASE WHEN\` peut être combiné avec des window functions pour des calculs complexes :

\`\`\`sql
SELECT
    mois,
    ca,
    SUM(ca) OVER (ORDER BY mois) AS ca_cumul,
    CASE
        WHEN ca > AVG(ca) OVER () THEN 'Au-dessus moyenne'
        ELSE 'En dessous'
    END AS vs_moyenne
FROM ventesMensuelles;
\`\`\`

## Pièges courants

1. **Oublier le \`ELSE\`** — par défaut \`ELSE NULL\`, ce qui peut causer des erreurs difficiles à diagnostiquer
2. **Ordre d'évaluation** — les conditions sont évaluées dans l'ordre, la première vraie gagne
3. **Types incohérents** — toutes les branches doivent retourner le même type ou PostgreSQL tentera une conversion
4. **\`NULL\` vs \`IS NULL\`** — \`CASE WHEN col = NULL\` ne matchera jamais ; utiliser \`CASE WHEN col IS NULL\`

\`\`\`sql
-- ERREUR : col = NULL ne fonctionne jamais
SELECT CASE WHEN phone = NULL THEN 'inconnu' ELSE phone END FROM contacts;

-- CORRECT : utiliser IS NULL
SELECT CASE WHEN phone IS NULL THEN 'inconnu' ELSE phone END FROM contacts;
\`\`\`

## Règle pratique

> Préférez \`CASE WHEN condition THEN ... ELSE ... END\` (forme recherchée) qui est plus flexible. Utilisez la forme simple \`CASE col WHEN val THEN ...\` uniquement quand la comparaison est strictement égale à une valeur.

Source : [PostgreSQL docs — Conditional Expressions](https://www.postgresql.org/docs/current/functions-conditional.html)`,
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
          deepDive: `# Optimisation de requêtes SQL

## Qu'est-ce que c'est ?

L'optimisation de requêtes SQL est l'art d'analyser et d'améliorer les performances des requêtes. L'outil principal : \`EXPLAIN\` et \`EXPLAIN ANALYZE\` qui révèlent comment PostgreSQL exécute une requête — les scans utilisés, les jointures employées, le temps passé dans chaque étape.

**Règle cardinale** : mesurer avant d'optimiser. L'intuition est souvent trompeuse — une requête qui semble simple peut cache un scan complet, et une requête complexe peut être déjà optimisée.

## Quel problème résout-il ?

Les requêtes lentes détruisent les performances en production. Un \`SELECT *\` mal indexé peut prendre plusieurs secondes sur une table de plusieurs millions de lignes. L'optimisation permet de :

- **Identifier les goulots d'étranglement** — scan complet, jointures coûteuses, tris inutiles
- **Créer les index adaptés** — ciblés, pas genériques
- **Réécrire les requêtes** — sous-requêtes corrélées → JOIN, \`SELECT *\` → colonnes spécifiques

## Syntaxe et exemples

### EXPLAIN vs EXPLAIN ANALYZE

\`\`\`sql
-- EXPLAIN : montre le plan d'exécution sans exécuter
EXPLAIN SELECT * FROM orders WHERE status = 'PENDING';

-- EXPLAIN ANALYZE : exécute et montre le temps réel
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'PENDING';
\`\`\`

\`EXPLAIN ANALYZE\` est indispensable — il montre le temps d'exécution réel et le nombre de lignes manipulées.

### Lecture du plan — les types de scans

| Type de scan | Description | Quand l'utiliser |
|-------------|-------------|-----------------|
| **Seq Scan** | Scan complet de la table | Table petite ou peu de lignes retournées |
| **Index Scan** | Parcours de l'index puis lecture table | Colonne indexée avec filtre sélectif |
| **Index Only Scan** | Lecture uniquement de l'index | Toutes les colonnes dans l'index (covering) |
| **Bitmap Heap Scan** | Combinaison de plusieurs index | Conditions multiples sur différentes colonnes |
| **Hash Join** | Jointure via table de hash | Grande table jointe à autre grande table |
| **Nested Loop** | Boucle imbriquée | Petite table jointe à grande table avec index |

### Identifier les problèmes courants

\`\`\`sql
-- Problème : Seq Scan sur une grande table (manque d'index)
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;

-- Solution : créer un index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Problème : Trie en mémoire trop coûteux
EXPLAIN ANALYZE SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- Solution : index sur la colonne de tri
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
\`\`\`

### Sous-requête corrélée → JOIN

\`\`\`sql
-- Lent : sous-requête corrélée (s'exécute pour chaque ligne)
SELECT o.id, o.total,
    (SELECT SUM(i.amount) FROM payments i WHERE i.order_id = o.id) AS payments_total
FROM orders o;

-- Rapide : JOIN
SELECT o.id, o.total, COALESCE(SUM(i.amount), 0) AS payments_total
FROM orders o
LEFT JOIN payments i ON i.order_id = o.id
GROUP BY o.id;
\`\`\`

### Couverture d'index — Index Only Scan

\`\`\`sql
-- Requête qui affiche juste email et status
SELECT email, status FROM users WHERE status = 'active';

-- Index covering : toutes les colonnes dans l'index
CREATE INDEX idx_users_status_covering ON users(status) INCLUDE (email);

-- PostgreSQL fait un Index Only Scan — ne lit jamais la table
\`\`\`

### Vues matérialisées — agrégations coûteuses

Pour les requêtes qui agrègent des millions de lignes mais n'ont pas besoin de données en temps réel :

\`\`\`sql
-- Création d'une vue matérialisée
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    customer_id,
    SUM(total) AS total_revenue,
    COUNT(*) AS order_count
FROM orders
GROUP BY 1, 2;

-- Index sur la vue matérialisée
CREATE INDEX idx_monthly_sales_month ON monthly_sales(month);

-- Rafraîchissement (peut être automation avec pg_cron)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
\`\`\`

### ANALYZE — mettre à jour les statistiques

Après un bulk load ou beaucoup de modifications, les statistiques peuvent être obsolètes :

\`\`\`sql
ANALYZE orders;
-- Ou pour une vue matérialisée :
REFRESH MATERIALIZED VIEW monthly_sales;
\`\`\`

## Bonnes pratiques

1. **Mesurer avant d'optimiser** — \`EXPLAIN ANALYZE\` avant et après
2. **Identifier le goulot d'étranglement** — souvent un Seq Scan sur une grande table
3. **Index ciblés** — sur les colonnes filtrées et jointes, pas sur toutes les colonnes
4. **Éviter \`SELECT *\`** — colonnes nécessaires seulement, permet les Index Only Scan
5. **Paginer** — \`LIMIT\` avec curseur plutôt que \`OFFSET\` volumineux
6. **Vues matérialisées** — pour les agrégations fréquentes sur des données qui n'ont pas besoin d'être temps réel
7. **Sous-requêtes corrélées** — les remplacer par des JOIN

## Pièges courants

1. **Optimisation prématurée** — sans mesure, on optimise souvent le mauvais endroit
2. **Trop d'index** — chaque index ralentit les écritures (\`INSERT\`, \`UPDATE\`, \`DELETE\`)
3. **Index sur des colonnes à faible sélectivité** — un index sur un booléen ne aide pas si 50% des lignes sont \`true\`
4. **Ignorer le plan** — une requête peut sembler simple mais cacher un Nested Loop très coûteux
5. **\`OFFSET\` volumineux** — \`OFFSET 100000\` scanne et jette 100k lignes à chaque requête

\`\`\`sql
-- Lent : OFFSET scanne et jette les 100000 premières lignes
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000;

-- Rapide : curseur (stable quelle que soit la page)
SELECT * FROM orders WHERE id > :last_id ORDER BY id LIMIT 20;
\`\`\`

Source : [PostgreSQL docs — Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)`,
        },
        {
          id: 'sql-11',
          question: 'Index composites et ordre des colonnes',
          answer: "Un **index composite** couvre plusieurs colonnes : `CREATE INDEX idx ON orders (statut, date_creation)`. L'ordre est crucial : la colonne la plus **sélective** ou la plus **filtrée** en premier.\n\nRègle du **prefix le plus à gauche** : l'index `(A, B, C)` peut servir les requêtes filtrant `A`, `A+B` ou `A+B+C`, mais **pas** `B` seul ou `C` seul.\n\n**Index covering** : si toutes les colonnes de la requête sont dans l'index, le SGBD ne lit même pas la table (*index-only scan*). __Un index bien conçu peut diviser le temps de requête par 100.__",
          code: '-- Index composite\nCREATE INDEX idx_orders_statut_date\nON orders (statut, date_creation);\n\n-- Requête qui utilise l\'index\nSELECT * FROM orders\nWHERE statut = "EN_COURS"\n  AND date_creation > "2024-01-01";',
          language: 'sql',
          deepDive: `# Index composites en SQL

## Qu'est-ce que c'est ?

Un **index composite** est un index qui couvre plusieurs colonnes. Il permet à PostgreSQL de répondre à des requêtes filtrant sur plusieurs colonnes en utilisant un seul index au lieu de plusieurs.

\`\`\`sql
CREATE INDEX idx ON orders (status, created_at);
\`\`\`

## Quel problème résout-il ?

Une requête filtrant sur plusieurs colonnes peut nécessiter plusieurs index distincts, ou pire, un scan complet si aucun index ne couvre les colonnes. Un index composite permet de :

- **Répondre à des requêtes multi-colonnes** avec un seul index
- **Accélérer les jointures** sur des colonnes composites
- **Couvrir une requête complète** (index-only scan) si toutes les colonnes sont incluses

## Syntaxe et exemples

### Index composite basique

\`\`\`sql
CREATE INDEX idx_orders_status_date ON orders(status, created_at);
\`\`\`

### Règle du préfixe le plus à gauche — L'EXEMPLE CENTRAL

L'index \`(A, B, C)\` peut être utilisé pour :

- \`WHERE A = value\` — oui
- \`WHERE A = value AND B = value\` — oui
- \`WHERE A = value AND B = value AND C = value\` — oui

Mais **pas** pour :

- \`WHERE B = value\` — non
- \`WHERE C = value\` — non
- \`WHERE B = value AND C = value\` — non (sans A)

\`\`\`sql
CREATE INDEX idx ON orders (status, created_at);

-- UTILISE l'index ✓
SELECT * FROM orders WHERE status = 'PENDING';
SELECT * FROM orders WHERE status = 'PENDING' AND created_at > '2024-01-01';

-- N'UTILISE PAS l'index ✗
SELECT * FROM orders WHERE created_at > '2024-01-01';
\`\`\`

### Visualisation de la règle du préfixe

\`\`\`
Index: (status, created_at)

Colonne la plus à gauche = status

Si votre requête filtre sur status seulement → index utilisé
Si votre requête filtre sur status ET created_at → index utilisé
Si votre requête filtre sur created_at seulement → index NON utilisé
\`\`\`

C'est comme un annuaire téléphonique trié par (nom, prénom) — vous ne pouvez找到 quelqu'un si vous avez le nom, mais pas si vous avez seulement le prénom.

### Ordre des colonnes — quelle colonne en premier ?

**Règle** : colonne la plus sélective (filtrée) en premier.

\`\`\`sql
-- Si status a 3 valeurs possibles et created_at a 365 valeurs :
-- status plus sélectif → en premier
CREATE INDEX idx1 ON orders(status, created_at);

-- vs
CREATE INDEX idx2 ON orders(created_at, status);  -- moins efficace
\`\`\`

**Exception** : les colonnes avec equality (=) avant les colonnes avec range (> <).

\`\`\`sql
-- Bon : equality avant range
CREATE INDEX idx ON logs(user_id, created_at);
WHERE user_id = 123 AND created_at > '2024-01-01'

-- Moins bon :
CREATE INDEX idx ON logs(created_at, user_id);
WHERE user_id = 123 AND created_at > '2024-01-01'  -- l'index sur created_at est inutile ici
\`\`\`

### Index partiels — index avec WHERE

\`\`\`sql
-- Index uniquement sur les commandes en cours (plus petit, plus rapide)
CREATE INDEX idx_orders_pending ON orders(created_at) WHERE status = 'PENDING';

-- Utilisé pour :
SELECT * FROM orders WHERE status = 'PENDING' AND created_at > '2024-01-01';

-- Non utilisé pour :
SELECT * FROM orders WHERE status = 'COMPLETED' AND created_at > '2024-01-01';
\`\`\`

Les index partiels sont thérapeutiquement plus petits et plus rapides que les index complets sur la même table.

### Index covering avec INCLUDE — index-only scan

\`\`\`sql
-- Toutes les colonnes de la requête sont dans l'index → pas de lecture de table
CREATE INDEX idx_orders_covering ON orders(user_id) INCLUDE (total, status, created_at);

-- Cette requête ne lit jamais la table :
SELECT total, status, created_at FROM orders WHERE user_id = 123;
\`\`\`

INCLUDE permet d'ajouter des colonnes non-indexées à la fin de l'index. Utile pour les queries qui font des index-only scans.

### Index sur expressions

\`\`\`sql
-- Index sur LOWER(email) pour recherche insensible à la casse
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- Utilisé pour :
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';
\`\`\`

\`\`\`sql
-- Index sur DATE_TRUNC pour agrégations par mois
CREATE INDEX idx_sales_month ON sales(DATE_TRUNC('month', sale_date));

-- Utilisé pour :
SELECT DATE_TRUNC('month', sale_date), SUM(total)
FROM sales GROUP BY 1;
\`\`\`

## Bonnes pratiques

1. **Règle du préfixe** — toujours garder la colonne la plus filtrée en premier
2. **Equality avant range** — les colonnes avec = avant celles avec > <
3. **Index partiels** — pour les requêtes qui filtrent toujours sur une condition (ex: status = 'PENDING')
4. **INCLUDE pour covering** — ajouter les colonnes fréquemment sélectionnées à l'index
5. **Expressions indexées** — pour les recherches sur LOWER(col) ou DATE_TRUNC
6. **Limiter le nombre de colonnes** — un index sur 5+ colonnes est rarement utile, probablement un index sur 2-3 colonnes suffit

## Pièges courants

1. **Croire que l'ordre des colonnes n'a pas d'importance** — ça a un impact énorme sur l'utilisation de l'index
2. **Trop d'index** — chaque index ralentit les écritures, un index composite mal conçu est pire que pas d'index
3. **Indexer des colonnes à faible sélectivité** — indexer un booléen ou une colonne avec 3 valeurs distinctes n'aide presque jamais
4. **Penser que les index sont gratuits** — chaque index consomme de l'espace disque et ralentit les \`INSERT\`, \`UPDATE\`, \`DELETE\`
5. **Créer un index sans vérifier** — toujours tester avec \`EXPLAIN ANALYZE\` que l'index est bien utilisé

\`\`\`sql
-- Vérifier qu'un index est utilisé
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'PENDING';

-- Si vous voyez "Index Scan" ou "Index Only Scan" → l'index est utilisé
-- Si vous voyez "Seq Scan" → l'index n'est pas utilisé, peut-être pas assez sélectif
\`\`\`

Source : [PostgreSQL docs — Indexes](https://www.postgresql.org/docs/current/indexes.html)`,
        },
        {
          id: 'sql-12',
          question: 'Niveaux d\'isolation des transactions',
          answer: "Quatre niveaux standard, du plus permissif au plus strict :\n\n**Read Uncommitted** : lectures sales possibles (données non commitées visibles). **Read Committed** : pas de lectures sales (défaut PostgreSQL/Oracle). **Repeatable Read** : lectures répétables, pas de lectures non répétables (défaut MySQL). **Serializable** : isolation complète, comme si les transactions s'exécutaient séquentiellement.\n\nPhénomènes évités : **dirty read** → **non-repeatable read** → **phantom read**. Plus l'isolation est élevée, plus les performances baissent (verrous, blocages). __Choisir le niveau adapté au besoin métier, pas le plus strict par défaut.__",
          deepDive: `# Niveaux d'isolation des transactions

## Qu'est-ce que c'est ?

Les niveaux d'isolation définissent comment une transaction voit les données modifiées par d'autres transactions concurrentes. SQL定义了四个级别 standardisés, mais PostgreSQL n'implémente pas tous exactement de la même façon que les autres bases.

Le problème fundamental : quand plusieurs transactions s'exécutent simultanément, elles peuvent se marcher sur les pieds. Les niveaux d'isolation contrôlent quels phénomènes sont évités.

## Quel problème résout-il ?

Sans isolation appropriée, vous pouvez obtenir :

- **Données incohérentes** — une transaction voit des données qui n'ont jamais été commitées
- **Lectures fantômes** — une même requête retourne des résultats différents entre deux exécutions
- **Transactions perdues** — deux transactions modifient la même ligne, l'une écrase l'autre

Les niveaux d'isolation sont le mécanisme pour prévenir ces problèmes tout en permettant le maximum de concurrence.

## Les quatre niveaux — comparaison

| Niveau | Dirty Read | Non-repeatable Read | Phantom Read |
|--------|-----------|---------------------|--------------|
| **Read Uncommitted** | Impossible (PG) | Possible | Possible |
| **Read Committed** | Impossible | Possible | Possible |
| **Repeatable Read** | Impossible | Impossible | Possible (PG: impossible) |
| **Serializable** | Impossible | Impossible | Impossible |

**Note** : PostgreSQL ne permet pas les dirty reads même en Read Uncommitted. C'est plus strict que le standard SQL sur ce point.

## Les trois phénomènes évités

### Dirty Read — lecture de données non commitées

Une transaction lit des données qu'une autre transaction a modifiées mais pas encore commitées. Si celle-ci fait un rollback, les données n'existaient pas vraiment.

\`\`\`sql
-- Transaction A
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- pas encore COMMIT

-- Transaction B (en isolation Read Uncommitted)
SELECT balance FROM accounts WHERE id = 1;
-- voit -100, données qui n'existent pas encore

-- Transaction A
ROLLBACK;  -- les -100 n'existaient pas
\`\`\`

### Non-repeatable Read — même ligne, valeur différente

Une même transaction lit la même ligne deux fois et obtient des valeurs différentes car une autre transaction l'a modifié et commité entre les deux lectures.

\`\`\`sql
-- Transaction A
BEGIN;
SELECT balance FROM accounts WHERE id = 1;  -- 1000

-- Transaction B
UPDATE accounts SET balance = 2000 WHERE id = 1;
COMMIT;

-- Transaction A
SELECT balance FROM accounts WHERE id = 1;  -- 2000 ! différentes de la première lecture
COMMIT;
\`\`\`

### Phantom Read — nouvelles lignes entre deux lectures

Une même requête retourne des lignes différentes à deux moments car une autre transaction a inséré ou supprimé des lignes qui match la condition.

\`\`\`sql
-- Transaction A
BEGIN;
SELECT COUNT(*) FROM orders WHERE date > '2024-01-01';  -- 150

-- Transaction B
INSERT INTO orders (date) VALUES ('2024-06-01');
COMMIT;

-- Transaction A
SELECT COUNT(*) FROM orders WHERE date > '2024-01-01';  -- 151 ! nouvelles lignes
COMMIT;
\`\`\`

## PostgreSQL — MVCC et Read Committed

PostgreSQL utilise **MVCC** (Multi-Version Concurrency Control). Chaque transaction voit un **snapshot** de la base à un moment donné :

- **Read Committed** (défaut) : chaque commande voit un snapshot pris au moment où cette commande commence
- **Repeatable Read** : le snapshot est pris au début de la transaction, pas au début de chaque commande

\`\`\`sql
-- Read Committed (défaut PostgreSQL)
BEGIN;
-- Cette requête voit les données commitées au moment où elle s'exécute
SELECT * FROM orders WHERE status = 'PENDING';
COMMIT;
\`\`\`

## Syntaxe et exemples

### Changer le niveau d'isolation

\`\`\`sql
-- Pour une transaction
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- ou
BEGIN ISOLATION LEVEL SERIALIZABLE;

-- Set pour toute la session
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

### Read Committed — comportement par défaut

\`\`\`sql
-- Transaction A : modification non encore commitée
BEGIN;
UPDATE orders SET status = 'SHIPPED' WHERE id = 1;

-- Transaction B : requête voit les données commitées uniquement
SELECT status FROM orders WHERE id = 1;
-- Retourne 'PENDING' (la valeur avant la modification non commitées de A)

-- Transaction A
COMMIT;

-- Transaction B : maintenant voit 'SHIPPED'
SELECT status FROM orders WHERE id = 1;
-- Retourne 'SHIPPED'
\`\`\`

### Repeatable Read — snapshot stable

\`\`\`sql
-- Transaction A
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 1;  -- 1000

-- Transaction B (différente session)
UPDATE accounts SET balance = 2000 WHERE id = 1;
COMMIT;

-- Transaction A : SAME snapshot, voit toujours 1000
SELECT balance FROM accounts WHERE id = 1;  -- 1000
COMMIT;
\`\`\`

### Serializable — isolation complète

\`\`\`sql
BEGIN ISOLATION LEVEL SERIALIZABLE;

-- Si deux transactions concurrentes modifient la même ligne :
-- PostgreSQL lance une erreur : serialization failure
-- L'application doit réessayer la transaction

-- Pour gérer les failures, il faut une logique de retry :
\`\`\`

\`\`\`python
# Exemple de gestion de retry (pseudocode)
def transfer_funds(from_id, to_id, amount):
    for attempt in range(3):
        try:
            with transaction():
                # Logique de transfert
                pass
            break  # Succès
        except SerializationFailure:
            continue  # Réessayer
\`\`\`

## Bonnes pratiques

1. **Utiliser Read Committed (défaut)** pour la plupart des opérations — équilibre performance/sécurité
2. **Serializable** uniquement pour les transactions critiques où la cohérence est plus importante que la performance
3. **Gérer les serialization failures** — si vous utilisez Serializable, votre code doit réessayer en cas d'échec
4. **Comprendre MVCC** — PostgreSQL ne bloque pas les lecteurs, les writers ne bloquent pas les lecteurs
5. **Surveiller les verrouillages** — des transactions très isolées peuvent créer des blocages

## Pièges courants

1. **Croire que Read Committed est toujours sûr** — pour des opérations qui lisent plusieurs fois la même donnée, il peut y avoir des incohérences
2. **Ne pas gérer les serialization failures** — si vous utilisez Serializable, votre application doit être prête à réessayer
3. **Niveaux trop hauts** — Serializable peut réduire drastiquement la performance en cas de concurrence élevée
4. **Confondre isolation et verrouillage** — l'isolation définit ce que vous voyez, le verrouillage définit ce que vous pouvez modifier
5. **Oublier que les locks existent** — même avec Serializable, vous pouvez avoir des deadlocks si deux transactions se bloquent mutuellement

\`\`\`sql
-- Monitorer les locks
SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.query AS blocked_query,
       blocking_activity.query AS blocking_query
FROM pg_catalog.pg_stat_activity blocked_activity
JOIN pg_catalog.pg_locks blocked_locks ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.lock = blocked_locks.lock
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
\`\`\`

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
