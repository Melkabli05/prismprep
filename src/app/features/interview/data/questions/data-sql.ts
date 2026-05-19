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
        },
        {
          id: 'sql-2',
          question: 'Sous-requêtes vs JOINs',
          answer: "**Sous-requête** : requête imbriquée dans une autre — lisible pour les filtres simples (`WHERE id IN (SELECT...)`). **JOIN** : fusion de tables — plus performant en général car le SGBD optimise mieux.\n\nRègle pratique : les sous-requêtes corrélées (qui référencent la requête externe) sont souvent **lentes** — à remplacer par un `JOIN` ou `EXISTS`.\n\nLes **CTE** (`WITH ... AS`) améliorent la lisibilité des sous-requêtes complexes. __Préférez les JOIN pour la performance, les CTE pour la lisibilité.__",
          code: '-- Sous-requête\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM orders WHERE total > 100\n);\n\n-- CTE (plus lisible)\nWITH gros_clients AS (\n    SELECT user_id FROM orders WHERE total > 100\n)\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM gros_clients\n);',
          language: 'sql',
        },
        {
          id: 'sql-3',
          question: 'GROUP BY et HAVING',
          answer: "**`GROUP BY`** regroupe les lignes partageant les mêmes valeurs pour produire des **agrégats** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`). **`HAVING`** filtre les groupes *après* agrégation — là où `WHERE` filtre les lignes *avant*.\n\nOrdre d'exécution logique : `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.\n\n__Piège classique__ : filtrer un agrégat avec `WHERE` au lieu de `HAVING` — ça ne fonctionne pas car l'agrégat n'existe pas encore au moment du `WHERE`.",
          code: 'SELECT categorie, COUNT(*) AS nb, AVG(prix) AS prix_moyen\nFROM produits\nWHERE actif = true\nGROUP BY categorie\nHAVING COUNT(*) > 5\nORDER BY prix_moyen DESC;',
          language: 'sql',
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
        },
        {
          id: 'sql-6',
          question: 'CTE (Common Table Expressions)',
          answer: "Les **CTE** créent des résultats temporaires nommés via `WITH ... AS (...)`, visibles dans toute la requête suivante.\n\nAvantages sur les sous-requêtes : **lisible** (nommage explicite), **réutilisable** (plusieurs références dans la même requête), **maintenable** (logique décomposée étape par étape).\n\nLes **CTE récursives** (`WITH RECURSIVE`) parcourent des hiérarchies (organigrammes, arbres de catégories). __Pour les requêtes complexes, les CTE sont le standard moderne — bien plus lisibles que les sous-requêtes imbriquées.__",
          code: 'WITH clients_actifs AS (\n    SELECT user_id, COUNT(*) AS nb_commandes\n    FROM orders\n    WHERE date > "2024-01-01"\n    GROUP BY user_id\n    HAVING COUNT(*) > 3\n)\nSELECT u.nom, c.nb_commandes\nFROM users u\nJOIN clients_actifs c ON u.id = c.user_id\nORDER BY c.nb_commandes DESC;',
          language: 'sql',
        },
        {
          id: 'sql-7',
          question: 'UNION vs UNION ALL',
          answer: "**`UNION`** : combine les résultats de deux requêtes en **supprimant les doublons** (coûteux car tri/dédoublonnage). **`UNION ALL`** : combine sans supprimer les doublons — **plus rapide**.\n\nRègle : les colonnes doivent être compatibles (même nombre, types compatibles). Les noms de colonnes viennent de la première requête.\n\n__Utilisez `UNION ALL` par défaut__, et `UNION` seulement si vous avez *vraiment* besoin d'éliminer les doublons. La suppression de doublons est une opération de tri complète.",
          code: '-- UNION ALL (rapide, garde les doublons)\nSELECT nom, email FROM clients\nUNION ALL\nSELECT nom, email FROM fournisseurs;\n\n-- UNION (supprime les doublons)\nSELECT ville FROM clients\nUNION\nSELECT ville FROM fournisseurs;',
          language: 'sql',
        },
        {
          id: 'sql-8',
          question: 'Procédures stockées et triggers',
          answer: "**Procédure stockée** : code SQL cotè serveur, réutilisable et performant (pas de transfert réseau). Idéal pour les logiques métier complexes côté BDD.\n\n**Trigger** : code exécuté automatiquement sur un événement (`INSERT`, `UPDATE`, `DELETE`). Utile pour l'audit, la validation ou la synchronisation.\n\n__Attention__ : logique dans la BDD = plus difficile à tester, versionner et déboguer. Préférez garder la logique métier dans l'application et limiter procédures/triggers aux optimisations purement données.",
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
        },
        {
          id: 'sql-11',
          question: 'Index composites et ordre des colonnes',
          answer: "Un **index composite** couvre plusieurs colonnes : `CREATE INDEX idx ON orders (statut, date_creation)`. L'ordre est crucial : la colonne la plus **sélective** ou la plus **filtrée** en premier.\n\nRègle du **prefix le plus à gauche** : l'index `(A, B, C)` peut servir les requêtes filtrant `A`, `A+B` ou `A+B+C`, mais **pas** `B` seul ou `C` seul.\n\n**Index covering** : si toutes les colonnes de la requête sont dans l'index, le SGBD ne lit même pas la table (*index-only scan*). __Un index bien conçu peut diviser le temps de requête par 100.__",
          code: '-- Index composite\nCREATE INDEX idx_orders_statut_date\nON orders (statut, date_creation);\n\n-- Requête qui utilise l\'index\nSELECT * FROM orders\nWHERE statut = "EN_COURS"\n  AND date_creation > "2024-01-01";',
          language: 'sql',
        },
        {
          id: 'sql-12',
          question: 'Niveaux d\'isolation des transactions',
          answer: "Quatre niveaux standard, du plus permissif au plus strict :\n\n**Read Uncommitted** : lectures sales possibles (données non commitées visibles). **Read Committed** : pas de lectures sales (défaut PostgreSQL/Oracle). **Repeatable Read** : lectures répétables, pas de lectures non répétables (défaut MySQL). **Serializable** : isolation complète, comme si les transactions s'exécutaient séquentiellement.\n\nPhénomènes évités : **dirty read** → **non-repeatable read** → **phantom read**. Plus l'isolation est élevée, plus les performances baissent (verrous, blocages). __Choisir le niveau adapté au besoin métier, pas le plus strict par défaut.__",
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