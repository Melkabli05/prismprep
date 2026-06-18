import type { InterviewCategory } from '@core/models/interview.models';

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
          deepDive: `# Les différents JOINs en SQL

## Principe general

Les JOINs permettent de combiner des donnees provenant de plusieurs tables en une seule requête. C'est l'un des concepts les plus fondamentaux en SQL relationnel. PostgreSQL supporte tous les types de JOINs standards avec une syntaxe riche et des comportements bien definis.

Chaque type de JOIN determine quelles lignes sont conservees dans le resultat final. Le choix du JOIN depend de la question metier : voulez-vous toutes les lignes de la table A ? Seulement celles qui correspondent dans les deux tables ? Toutes les lignes des deux tables ?

## Syntaxe generale

\`\`\`sql
SELECT colonnes
FROM table1
[INNER | LEFT | RIGHT | FULL] JOIN table2
ON condition_de_jonction
[WHERE conditions]
[ORDER BY colonnes];
\`\`\`

## INNER JOIN — Lignes correspondantes uniquement

Seules les paires de lignes qui satisfont la condition ON sont retournees. C'est le JOIN le plus utilise.

\`\`\`sql
-- Employes avec leur departement (employes sans departement exclus)
SELECT e.nom, e.prenom, d.nom_departement
FROM employes e
INNER JOIN departements d ON e.departement_id = d.id;

-- Equivalent avec WHERE implicite (ancienne syntaxe)
SELECT e.nom, e.prenom, d.nom_departement
FROM employes e, departements d
WHERE e.departement_id = d.id;
\`\`\`

## LEFT JOIN — Toutes les lignes de la table gauche

Retourne toutes les lignes de la table de gauche (la premiere dans la requête). Si aucune correspondance n'existe dans la table de droite, les colonnes de droite sont NULL.

\`\`\`sql
-- Tous les clients, meme ceux sans commande
SELECT c.nom, c.email, cmd.id AS commande_id, cmd.date_commande
FROM clients c
LEFT JOIN commandes cmd ON c.id = cmd.client_id
ORDER BY c.nom;

-- Combinaison avec COUNT et COALESCE pour éviter les NULLs
SELECT c.nom, COALESCE(COUNT(cmd.id), 0) AS nb_commandes
FROM clients c
LEFT JOIN commandes cmd ON c.id = cmd.client_id
GROUP BY c.nom;
\`\`\`

## RIGHT JOIN — Symetrique du LEFT

Moins courant, car on peut toujours reécrire avec LEFT JOIN en inversant l'ordre des tables.

\`\`\`sql
-- Equivalent a LEFT JOIN en inversant les tables
SELECT e.nom, p.nom_projet
FROM employes e
RIGHT JOIN projets p ON e.id = p.responsable_id;

-- Meme chose avec LEFT JOIN
SELECT e.nom, p.nom_projet
FROM projets p
LEFT JOIN employes e ON e.id = p.responsable_id;
\`\`\`

## FULL JOIN — Toutes les lignes des deux tables

Combine LEFT et RIGHT : toutes les lignes des deux tables sont presentes, avec NULL la où il n'y a pas de correspondance.

\`\`\`sql
-- Utile pour comparer deux listes
SELECT a.nom AS auteur, l.titre AS livre
FROM auteurs a
FULL JOIN livres l ON a.id = l.auteur_id
ORDER BY a.nom;
\`\`\`

## CROSS JOIN — Produit cartesien

Chaque ligne de la table A est combinee avec chaque ligne de la table B. Utile pour generer toutes les combinaisons possibles.

\`\`\`sql
-- Toutes les combinaisons taille × couleur
SELECT t.libelle AS taille, c.libelle AS couleur
FROM tailles t
CROSS JOIN couleurs c;

-- Equivalent implicite (sans condition WHERE)
SELECT * FROM tailles, couleurs;
\`\`\`

## SELF JOIN — Table jointe a elle-meme

Utile pour les structures hierarchiques (employes et managers, categories et sous-categories).

\`\`\`sql
-- Trouver le manager de chaque employe
SELECT e.nom AS employe, m.nom AS manager
FROM employes e
LEFT JOIN employes m ON e.manager_id = m.id;
\`\`\`

## Tableau comparatif detaille

| Type de JOIN | Lignes table gauche | Lignes table droite | Lignes sans correspondance | Usage typique |
|-------------|---------------------|---------------------|--------------------------|---------------|
| INNER | Celles avec correspondance | Celles avec correspondance | Exclues | Relations obligatoires |
| LEFT | Toutes | Uniquement correspondantes | Gauche conservee, droite NULL | Optionnel (client sans commande) |
| RIGHT | Uniquement correspondantes | Toutes | Droite conservee, gauche NULL | Rare, symetrique du LEFT |
| FULL | Toutes | Toutes | Les deux cotes NULL | Reconciliation |
| CROSS | Toutes (multipliees) | Toutes (multipliees) | Produit cartesien | Generer combinaisons |

## Piege : LEFT JOIN + WHERE = INNER JOIN

Un filtre WHERE sur une colonne de la table de droite convertit implicitement le LEFT JOIN en INNER JOIN :

\`\`\`sql
-- Ceci est un INNER JOIN deguise !
SELECT c.nom, cmd.id
FROM clients c
LEFT JOIN commandes cmd ON c.id = cmd.client_id
WHERE cmd.montant > 100;  -- Filtre sur la table de droite !!!
\`\`\`

Solution : deplacer le filtre dans la condition ON :

\`\`\`sql
-- LEFT JOIN preserve
SELECT c.nom, cmd.id
FROM clients c
LEFT JOIN commandes cmd ON c.id = cmd.client_id AND cmd.montant > 100;
\`\`\`

## Bonnes pratiques

- Toujours specifier le type de JOIN explicitement (pas de virgule)
- Utiliser des alias courts mais significatifs (e, d, cmd pas t1, t2)
- Indexer les colonnes de jonction pour les performances
- Preferer LEFT JOIN a RIGHT JOIN par convention de lecture
- Tester avec et sans JOIN pour verifier le nombre de lignes attendu

Source : [PostgreSQL Docs — JOINs](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)
`},
        {
          id: 'sql-2',
          question: 'Sous-requêtes vs JOINs',
          answer: "**Sous-requête** : requête imbriquée dans une autre — lisible pour les filtrès simples (`WHERE id IN (SELECT...)`). **JOIN** : fusion de tables — plus performant en général car le SGBD optimise mieux.\n\nRègle pratique : les sous-requêtes corrélées (qui référencent la requête externe) sont souvent **lentes** — à remplacer par un `JOIN` ou `EXISTS`.\n\nLes **CTE** (`WITH ... AS`) améliorent la lisibilité des sous-requêtes complexes. __Préférez les JOIN pour la performance, les CTE pour la lisibilité.__",
          code: '-- Sous-requête\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM orders WHERE total > 100\n);\n\n-- CTE (plus lisible)\nWITH gros_clients AS (\n    SELECT user_id FROM orders WHERE total > 100\n)\nSELECT * FROM users WHERE id IN (\n    SELECT user_id FROM gros_clients\n);',
          language: 'sql',
          deepDive: `# Sous-requêtes vs JOINs en SQL

## Principe et definitions

Une **sous-requête** est une requête SELECT imbriquee à l'interieur d'une autre requête (SELECT, FROM, WHERE, HAVING, ou meme dans une expression). Un **JOIN** combine les colonnes de deux tables en une seule table resultat vià une condition de correspondance. Les deux techniques peuvent souvent produire le meme resultat, mais elles différent fondamentalement en termes de performance, lisibilite et flexibilite.

Le choix entre sous-requête et JOIN depend de plusieurs facteurs : la presence de donnees NULL, la cardinalite des tables, la possibilite d'utiliser des index, et la structure du plan d'execution.

## Sous-requêtes non correlees

Une sous-requête non correlee est executee une seule fois, independamment de la requête externe. Ses resultats sont materialises (stockes en mémoire ou sur disque temporaire) puis utilises par la requête principale :

\`\`\`sql
-- Employes des departements a gros budget
-- La sous-requête est executee une seule fois
SELECT nom, prenom
FROM employes
WHERE departement_id IN (
    SELECT id FROM departements WHERE budget > 100000
);

-- Equivalent avec JOIN (souvent plus performant)
SELECT e.nom, e.prenom
FROM employes e
INNER JOIN departements d ON e.departement_id = d.id
WHERE d.budget > 100000;
\`\`\`

## Sous-requêtes correlees — Attention performances

Une sous-requête correlee reference une colonne de la requête externe. Le problème : elle est re-executee pour chaque ligne de la requête externe, ce qui peut être extremement couteux :

\`\`\`sql
-- Cette sous-requête est executee pour CHAQUE employe (N executions)
SELECT e1.nom, e1.salaire, e1.departement_id
FROM employes e1
WHERE e1.salaire > (
    SELECT AVG(e2.salaire)
    FROM employes e2
    WHERE e2.departement_id = e1.departement_id
);
\`\`\`

Pour 1000 employes, la sous-requête est executee 1000 fois. Avec une window function, le meme resultat est obtenu en un seul parcours :

\`\`\`sql
-- Equivalent 1000 fois plus rapide avec une window function
SELECT nom, salaire, departement_id
FROM (
    SELECT nom, salaire, departement_id,
           AVG(salaire) OVER (PARTITION BY departement_id) AS moyenne_dept
    FROM employes
) sub
WHERE salaire > moyenne_dept;
\`\`\`

## CTE (Common Table Expressions) — Sous-requêtes nommees

Les CTE (WITH) ameliorent la lisibilite des requêtes complexes et peuvent être referencees plusieurs fois dans la meme requête :

\`\`\`sql
WITH ventes_recentes AS (
    SELECT client_id, SUM(montant) AS total
    FROM commandes
    WHERE date_commande >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY client_id
),
meilleurs_clients AS (
    SELECT * FROM ventes_recentes WHERE total > 500
)
SELECT c.nom, mc.total
FROM clients c
INNER JOIN meilleurs_clients mc ON c.id = mc.client_id
ORDER BY mc.total DESC;
\`\`\`

Les CTE sont aussi le seul moyen de faire des requêtes reçursives (WITH RECURSIVE) pour les structures hierarchiques :

\`\`\`sql
WITH RECURSIVE hierarchie AS (
    -- Base : le manager racine
    SELECT id, nom, manager_id, 1 AS niveau
    FROM employes WHERE manager_id IS NULL
    UNION ALL
    -- Recursion : les subordonnes
    SELECT e.id, e.nom, e.manager_id, h.niveau + 1
    FROM employes e
    JOIN hierarchie h ON e.manager_id = h.id
)
SELECT * FROM hierarchie ORDER BY niveau, nom;
\`\`\`

## LATERAL — Sous-requête avec reference

LATERAL permet à une sous-requête dans le FROM de referencer les colonnes des tables precedentes, ce qui ouvre des possibilites puissantes :

\`\`\`sql
-- Top 3 produits les plus chers par categorie
SELECT c.nom AS categorie, p.titre, p.prix
FROM categories c,
LATERAL (
    SELECT titre, prix
    FROM produits
    WHERE categorie_id = c.id
    ORDER BY prix DESC
    LIMIT 3
) p;
\`\`\`

## Tableau comparatif complet

| Critere | Sous-requête | JOIN | CTE |
|---------|-------------|------|-----|
| Lisibilite | Bonne pour WHERE IN | Claire pour multi-tables | Excellente pour requêtes complexes |
| Performance non correlee | Bonne (execution unique) | Optimale | Optimale |
| Performance correlee | Mauvaise (N executions) | Optimale | Optimale |
| Reutilisabilite | Non | Non | Oui |
| Recursivite | Non | Non | Oui (WITH RECURSIVE) |
| Sous-requête en SELECT | Oui | Non | Non |

## Resume des recommandations

- **IN** : pour les listes de valeurs fixes où les petites sous-requêtes
- **EXISTS** : pour les sous-requêtes correlees sur grands volumes
- **JOIN** : quand les colonnes des deux tables sont necessaires dans le resultat
- **CTE** : pour les requêtes complexes, reçursives ou multi-étapes
- **LATERAL** : pour le pattern "top N par groupe"
- **Window functions** : alternative performante aux sous-requêtes correlees avec agregation

Source : [PostgreSQL Docs — Queries](https://www.postgresql.org/docs/current/queries.html)
`},
      ],
    },
  ],
};
