import type { InterviewCategory } from '../models/interview.models';

export const oopCategory: InterviewCategory = {
  id: 'oop',
  title: 'POO',
  color: 'bg-violet-100 text-violet-700',
  description: 'Programmation Orientée Objet',
  sections: [
    {
      id: 'oop-base',
      title: 'Les 4 Piliers',
      questions: [
        {
          id: 'oop-1',
          question: 'Les 4 principes de la POO',
          answer: "Les **4 piliers** : **Encapsulation** (cacher les données internes, exposer via `getters`/`setters` pour protéger l'intégrité), **Héritage** (réutiliser le code d'une classe parente, éviter la duplication), **Polymorphisme** (une même méthode, des comportements différents selon l'objet — *flexibilité*), **Abstraction** (montrer l'essentiel, cacher la complexité — *simplicité d'utilisation*).",
        },
        {
          id: 'oop-2',
          question: "L'encapsulation",
          answer: "L'**encapsulation** consiste à déclarer les variables comme **privées** et contrôler leur accès via des `getters`/`setters`. Cela permet de valider les données (ex. : refuser un âge négatif dans `setAge()`) et de garantir l'intégrité.\n\nL'interface publique reste stable même si l'implémentation interne change. **Données privées + méthodes publiques = contrôle et intégrité.**",
          example: "Personne avec champ privé nom → accessible uniquement via getNom() / setNom(). On peut ajouter une validation dans setNom() pour refuser les noms vides, par exemple.",
        },
        {
          id: 'oop-3',
          question: "L'héritage",
          answer: "L'**héritage** permet à une classe de récupérer attributs et méthodes d'une classe parente via `extends` (classe) ou `implements` (interface). Ex. : `Voiture extends Vehicule` hérite de `vitesse`, `couleur` et `rouler()`, et ajoute `activerClimatisation()`.\n\nL'héritage doit représenter une relation **« est-un »** (*is-a*). __Si ce n'est pas le cas, préférez la composition.__",
          code: 'public class Voiture extends Vehicule {\n    public void activerClimatisation() { ... }\n}',
          language: 'java',
        },
        {
          id: 'oop-4',
          question: 'Le polymorphisme',
          answer: "Le **polymorphisme** permet à une même méthode de se comporter différemment selon l'objet. **Overriding** (redéfinition) : une sous-classe redéfinit une méthode héritée (`Forme.dessiner()` implémenté différemment par `Cercle` et `Rectangle`). **Overloading** (surcharge) : même nom de méthode avec des paramètres différents dans la même classe.\n\nPermet d'écrire du code *générique* fonctionnant avec n'importe quel sous-type.",
          code: 'abstract class Forme {\n    abstract void dessiner();\n}\nclass Cercle extends Forme {\n    void dessiner() { System.out.println("Cercle"); }\n}',
          language: 'java',
        },
        {
          id: 'oop-5',
          question: 'L\'abstraction: Classe abstraite vs Interface',
          answer: "**Interface** = contrat définissant des méthodes à implémenter (sauf `default methods` depuis Java 8). Une classe peut implémenter plusieurs interfaces — simule l'héritage multiple.\n\n**Classe abstraite** = peut contenir méthodes abstraites ET concrètes, constructeurs et états, mais héritage simple uniquement. **Interface** pour définir un comportement adoptable par toute classe ; **classe abstraite** quand des sous-classes partagent du code commun.",
        },
      ],
    },
    {
      id: 'oop-relations',
      title: 'Relations & Concepts Avancés',
      questions: [
        {
          id: 'oop-6',
          question: 'Surcharge vs Redéfinition',
          answer: "**Surcharge** (*overloading*) : mêmes noms, paramètres différents, dans la même classe — résolution à la **compilation** (liaison statique).\n\n**Redéfinition** (*overriding*) : même signature, dans une sous-classe avec `@Override` — résolution à l'**exécution** (liaison dynamique).\n\n**Surcharge** = même nom + paramètres différents + compilation. **Redéfinition** = même signature + sous-classe + exécution.",
          code: '// Surcharge\nint add(int a, int b) { return a+b; }\nint add(int a, int b, int c) { return a+b+c; }\n\n// Redéfinition\n@Override\nint add(int a, int b) { return a+b+bonus; }',
          language: 'java',
        },
        {
          id: 'oop-7',
          question: 'Association vs Agrégation vs Composition',
          answer: "**Association** : relation faible, indépendance mutuelle (`Client` ↔ `Banque`). **Agrégation** : partie-tout où les parties existent sans le tout (`Bibliothèque` contient des `Livres`, transférables). **Composition** : partie-tout dépendant, les parties meurent avec le tout (`Maison` → `Murs`).\n\nEn code, composition = instanciation directe dans le constructeur ; agrégation = injection de dépendances. __Privilégiez la composition sur l'héritage.__",
        },
        {
          id: 'oop-8',
          question: 'Composition vs Héritage',
          answer: "L'**héritage** crée une relation *« est-un »* forte et statique (définie à la compilation). La **composition** crée une relation *« a-un »* flexible et dynamique (modifiable au runtime via injection).\n\nProblèmes de l'héritage : couplage fort (changement parent → impact enfants), hiérarchie rigide, impossible de changer à l'exécution. La composition permet de combiner des comportements librement et de les remplacer.\n\n__Règle : préférez la composition. Utilisez l'héritage seulement si la relation « est-un » est véritable et stable.__",
          example: "Un Canard qui vole → composition avec ComportementVol (modifiable) plutôt que héritage de OiseauVolant (figé).",
        },
        {
          id: 'oop-9',
          question: "Pourquoi pas d'héritage multiple en Java ?",
          answer: "Java interdit l'**héritage multiple** de classes à cause du **problème du diamant** : si `B` et `C` héritent de `A` et redéfinissent une méthode différemment, laquelle `D` (héritant de `B` et `C`) utilise-t-elle ?\n\nC++ le permet mais au prix d'une grande complexité. Java autorise l'implémentation de **plusieurs interfaces** à la place. Depuis Java 8, les `default methods` recréent partiellement le problème, mais avec des règles de résolution claires.",
        },
        {
          id: 'oop-10',
          question: 'Couplage faible / Cohésion forte',
          answer: "**Couplage faible** = classes peu dépendantes entre elles ; modifier une classe n'impacte pas les autres. On le réduit avec des interfaces, l'injection de dépendances et le principe de responsabilité unique.\n\n**Cohésion forte** = une classe fait une seule chose et la fait bien ; faible cohésion = classe à découpquer. __Couplage faible + cohésion forte = design robuste et maintenable.__",
        },
        {
          id: 'oop-11',
          question: 'Liaison dynamique',
          answer: "La **liaison dynamique** (*late binding*) détermine à l'**exécution** quelle méthode appeler selon le type réel de l'objet, pas le type de la référence. `Animal a = new Chien(); a.faireDuBruit();` → appelle `Chien.faireDuBruit()`.\n\nC'est le cœur du **polymorphisme** : une `List<Animal>` contenant `Chiens`, `Chats`, `Oiseaux` — chaque `faireDuBruit()` produit le bon son automatiquement.",
          code: 'Animal a = new Chien();\na.faireDuBruit();  // → appelle Chien.faireDuBruit()',
          language: 'java',
        },
      ],
    },
  ],
};