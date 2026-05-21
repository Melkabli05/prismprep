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

Source : [PostgreSQL docs — Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)`},
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

Source : [PostgreSQL docs — Queries](https://www.postgresql.org/docs/current/queries.html)`},
      ],
    },
  ],
};
