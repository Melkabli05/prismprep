import type { InterviewCategory } from '../../../../core/models/interview.models';

export const behavioralCategory: InterviewCategory = {
  id: 'behavioral',
  title: 'Questions Comportementales',
  color: 'background: var(--color-warning); color: white',
  description: 'STAR, situations, leadership, communication',
  sections: [
    {
      id: 'beh-star',
      title: 'Méthode STAR',
      questions: [
        {
          id: 'beh-1',
          question: 'Qu\'est-ce que la méthode STAR et comment l\'utiliser ?',
          answer: '**STAR** est un cadre pour structurer vos réponses aux questions comportementales : **S**ituation (contexte), **T**âche (votre mission), **A**ction (ce que *vous* avez fait concrètement), **R**ésultat (impact mesurable).\n\nLa clé : passer **70% du temps sur l\'Action** — c\'est ce que l\'intervieweur évalue. Le résultat doit être **quantifié** (« réduction de 40% du temps de réponse », « 3 bugs critiques résolus en 2 jours »).\n\n__Préparez 5-6 histoires polyvalentes__ (leadership, conflit, échec, défi technique, collaboration inter-équipe) que vous pouvez adapter selon la question. Chaque histoire doit durer 1-2 minutes.',
          example: 'S : « Dans mon projet e-commerce, les déploiements prenaient 2h et causaient 30min de downtime. »\nT : « Je devais automatiser le processus pour éliminer le downtime. »\nA : « J\'ai mis en place un pipeline CI/CD avec blue-green deployment et automatisé les tests. »\nR : « Déploiements en 15min, zero downtime, 3 déploiements par semaine au lieu d\'1. »',
        
          deepDive: `# La méthode STAR en entretien

## Qu'est-ce que c'est ?

La méthode STAR (Situation, Tache, Action, Resultat) est le cadre de réponse le plus utilise et reconnu pour les questions comportementales en entretien. Elle permet de structurer vos réponses de maniere claire, concise et impactante, en transformant une experience professionnelle en une demonstration concrete de vos competences.

## Pourquoi le recruteur utilise ce cadre

Les recruteurs sont formes à la méthode STAR et l'utilisent pour :
- Evaluer vos competences de maniere objective et standardisee
- Distinguer votre contribution personnelle du travail d'équipe
- Verifier la profondeur de votre expertise
- Predire votre performance future à partir de vos actions passes
- Comparer les candidats sur des criteres communs

## Strategie de réponse

**La regle du 70/20/10 :**

- **70% sur l'Action** : C'est la partie la plus importante. Detaillez ce que VOUS avez fait, vos decisions, votre raisonnement, les obstacles que vous avez surmontes.
- **20% sur le Resultat** : Quantifiez l'impact de vos actions. Chiffres, pourcentages, delais, economies, retours clients.
- **10% sur la Situation et la Tache** : Donnez juste assez de contexte pour comprendre l'enjeu.

**Preparez 5-7 histoires couvrant :**
- Un defi technique resolu
- Un leadership ou initiative
- Un conflit ou desaccord
- Un echec et son apprentissage
- Une collaboration inter-équipe
- Une gestion de crise ou deadline serree
- Une innovation ou amelioration

## Exemple complet

**Question :** « Parlez-moi d'une fois où vous avez du gerer un conflit au sein de votre équipe. »

**Situation :** « Dans mon équipe de 5 développeurs, deux seniors etaient en profond desaccord sur l'architecture technique a adopter pour notre nouveau module de paiement. L'un voulait du microservices, l'autre preferait rester en monolithe modulaire. Le blocage durait depuis 2 semaines. »

**Tache :** « En tant que tech lead, je devais trouver une solution qui permettrait au projet d'avancer tout en preservant la cohesion de l'équipe. »

**Action :** « J'ai organise une reunion dediee ou chaque partie a pu exposer ses arguments techniques avec des schemas. J'ai cree un tableau comparatif des deux approches (cout, complexite, delai, maintenabilite). J'ai propose un Proof of Concept de 2 semaines sur un module non critique pour trancher avec des donnees concretes. J'ai egalement mis en place des sessions de code review croise pour que chacun puisse contribuer aux deux approches. »

**Resultat :** « L'équipe a adopte une approche hybride : microservices pour le coeur du paiement, monolithe pour l'administration. Le projet a ete livre dans les delais avec 20% de bugs en moins que le projet precedent. Les deux développeurs ont depuis collabore sur trois autrès projets et leur relation s'est renforcee. »

## Les erreurs de structure courantes

- **STAR inverse** : Commencer par le resultat sans contexte (confus)
- **STAR incomplete** : Oublier une des 4 parties (souvent le Resultat)
- **STAR collectif** : Utiliser « nous » au lieu de « je » tout le temps
- **STAR trop long** : Depasser 3 minutes (perte d'attention)
- **STAR trop court** : Moins de 1 minute (manque de details)

## Questions de suivi possibles

- « Quel etait exactement votre rôle dans cette decision ? »
- « Que feriez-vous differemment aujourd'hui ? »
- « Comment avez-vous reag quand le PoC n'a pas donne les resultats attendus ? »

## Bonnes pratiques

- Passez 70% du temps sur l'Action (c'est ce qui est evalue)
- Utilisez « j'ai » systematiquement pour vos contributions
- Quantifiez les resultats (chiffres, durées, pourcentages)
- Adaptez le niveau de detail a votre interlocuteur
- Preparez 5-7 histoires à l'avance
- Entrainez-vous a voix haute (max 2 minutes par histoire)
- Variez les contextes (startup, grand groupe, ESN)

## Pièges courants

- Raconter sans structure (histoire confuse)
- Parler au nom de l'équipe sans clarifier votre rôle
- Negliger le Resultat (l'histoire semble incomplete)
- Choisir un exemple sans lien avec la question
- Reutiliser la meme histoire a chaque question
- Etre trop technique pour un public non technique
- Minimiser les difficultes (rend l'histoire moins credible)

## Erreurs a éviter absolument

N'inventez pas une histoire – les recruteurs posent des questions de suivi. Ne donnez pas un exemple trop ancien (plus de 3 ans). Ne racontez pas un projet sans fin heureuse (montrez ce que vous avez appris).

Source : [Apec – La méthode STAR](https://www.apec.fr/candidat/entretien-embauche/preparer-entretien/la-méthode-star.html)`},
        {
          id: 'beh-2',
          question: 'Comment parler d\'un échec sans se dévaloriser ?',
          answer: 'Choisissez un **vrai échec** (pas un faux comme « j\'ai trop travaillé »), mais **pas fatal** (pas de licenciement, pas de faute grave). Structure : **fait objectif** → **ce que vous avez appris** → **ce que vous avez changé depuis**.\n\nMontrez la **responsabilité** (pas de « on m\'a mal conseillé ») et la **résilience** (comment vous avez rebondi). L\'évaluateur cherche à savoir si vous êtes **capable d\'introspection** et d\'amélioration continue.\n\n__L\'échec lui-même compte moins que ce que vous en retenez.__ Un bon candidat tire des leçons ; un mauvais candidat minimise ou blame les autres.',
          example: '« J\'ai sous-estimé la complexité d\'une migration BDD, causant 4h de downtime non planifié. J\'ai appris à : 1) toujours faire un dry-run sur staging, 2) préparer un rollback plan, 3) communiquer les risques en amont. Depuis, chaque migration suit un runbook validé par l\'équipe. »',
        
          deepDive: `# Parler d'un echec sans se devaloriser

## Qu'est-ce que c'est ?

La question sur l'echec est l'une des plus redoutees mais aussi l'une des plus revelatrices en entretien. Elle mesure votre capacite d'introspection, votre honnetête intellectuelle et votre resilience. Un bon candidat transforme l'echec en leçon ; un mauvais candidat le minimise ou blame les autres.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a reconnaitre vos erreurs (signe de maturite)
- Votre capacite d'analyse et d'apprentissage
- Votre resilience et votre capacite de rebond
- Votre honnetête intellectuelle
- Votre niveau de conscience de vous-meme

## Strategie de réponse

**La méthode ARR (Apprentissage-Responsabilite-Rebond) :**

1. **Choisir le bon echec :** Un echec reel mais pas catastrophique. Pas de licenciement, faute professionnelle ou erreur mettant en danger des personnes.
2. **Assumer la responsabilite :** Ne blamez jamais les autres, le client, le contexte. Montrez ce que vous auriez pu faire differemment.
3. **Expliquer l'apprentissage :** Quelle leçon en avez-vous tire ? Qu'avez-vous change depuis ?
4. **Demontrer le changement :** Comment appliquez-vous cet apprentissage aujourd'hui ?

**L'echec ideal :**
- Impact modere (pas de catastrophe)
- Recent (moins de 3 ans)
- Professionnel (pas personnel)
- Dont vous avez tire une veritable leçon
- Qui ne revele pas une incompétence fondamentale pour le poste

## Exemple concret

**Mauvais exemple :**
« Le chef de projet m'a donne des instructions floues, le client changeait tout le temps d'avis, et l'équipe n'etait pas competente. Donc le projet a echoue, mais ce n'etait pas ma faute. »

**Bon exemple :**
« Sur mon precedent projet, j'ai sous-estime la complexite de la migration de donnees. J'ai promis un delai de 3 mois à la direction sans avoir fait d'audit approfondi de la base existante.

Quand j'ai realise mon erreur, j'ai immediatement communique le risque a mon manager (au lieu d'attendre qu'il le decouvre). J'ai propose un plan de repli : livrer l'API en deux phases avec une migration progressive. J'ai mis en place des points d'étape hebdomadaires. J'ai documente les leçons apprises.

Le projet a ete livre avec 2 semaines de retard mais avec zero impact client. Depuis, j'applique une regle stricte : jamais d'estimation sans POC ou audit prealable. Cette experience m'a appris que la transparence sur les risques est plus valorisee que des promesses optimistes. »

## Questions de suivi possibles

- « Qu'avez-vous appris exactement de cet echec ? »
- « Avez-vous refait la meme erreur depuis ? »
- « Quel feedback avez-vous reçu de votre manager a ce moment-la ? »

## Bonnes pratiques

- Choisissez un echec reel (pas un demi-succes deguise)
- Assumez pleinement votre responsabilite
- Montrez ce que vous avez appris et comment vous avez change
- Restez positif et constructif
- Choisissez un echec dont l'impact est modere
- Terminez sur les actions correctives mises en place
- Montrez que l'echec vous a rendu plus fort

## Pièges courants

- Inventer un echec (les recruteurs detectent les histoires fabriquees)
- Blamer les autrès où les circonstances
- Choisir un echec trop grave (licenciement, faute professionnelle)
- Choisir un « faux echec » : « J'ai trop travaille, j'etais trop perfectionniste »
- Ne pas montrer d'apprentissage
- Minimiser l'impact de l'echec
- Paraître indifférent (« ce n'etait pas grave »)

## Erreurs a éviter absolument

Ne dites jamais « Je n'ai jamais echoue » – personne ne vous croira. Ne dites pas « Je n'ai pas d'echec professionnel » – cela manque de credibilite. Ne racontez pas un echec qui revele une incompétence fondamentale pour le poste.

Source : [Cadremploi – Parler d'un echec en entretien](https://www.cadremploi.fr/guides-carriere/entretien-embauche/parler-d-un-echec-en-entretien)`},
      ],
    },
    {
      id: 'beh-situations',
      title: 'Situations Courantes',
      questions: [
        {
          id: 'beh-3',
          question: 'Comment gérez-vous un conflit avec un teammate ?',
          answer: '**Étape 1** : discussion *en privé* et *en face-à-face* (jamais par message ni en réunion publique). **Étape 2** : écouter d\'abord, comprendre le point de vue de l\'autre sans interrompre. **Étape 3** : chercher le **terrain d\'entente** et formuler une solution *gagnant-gagnant*.\n\nSéparez la **personne** du **problème** : « notre désaccord porte sur l\'architecture, pas sur ta compétence ». Si aucun accord : faire appel à un **tiers** (tech lead, manager) comme médiateur.\n\n__Un conflit bien géré renforce la relation__ — un conflit mal géré (ignoré, ou escaladé publiquement) la détruit. L\'intervieweur évalue votre maturité, pas votre capacité à « gagner » le conflit.',
        
          deepDive: `# Gerer un conflit avec un teammate

## Qu'est-ce que c'est ?

Les conflits au sein d'une équipe sont inevitables, meme dans les meilleures équipes. La difference entre une équipe performante et une équipe dysfonctionnelle n'est pas l'absence de conflits mais la capacite a les resoudre de maniere constructive. Les recruteurs veulent savoir comment vous gerez les desaccords professionnels.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre intelligence emotionnelle et votre empathie
- Votre capacite a communiquer de maniere non-violente
- Votre approche de resolution de problèmes
- Votre capacite a separer la personne du problème
- Votre maturite professionnelle face à l'adversite

## Strategie de réponse

**Le processus en 5 étapes :**

1. **Identifier la nature du conflit :** Conflit de tâches (méthodes, priorites) ou conflit relationnel (valeurs, communication) ? La resolution n'est pas la meme.
2. **Aborder la situation directement :** Ne pas attendre que ca passe. Ne pas aller voir le manager avant d'avoir essaye directement avec la personne.
3. **Ecouter activement :** Comprendre le point de vue de l'autre. Valider ses preoccupations sans necessairement être d'accord. Poser des questions ouvertes.
4. **Trouver un terrain d'entente :** Identifier les objectifs partages. Chercher des solutions gagnant-gagnant. Separer les personnes du problème.
5. **Aboutir à un accord clair :** Definir les prochaines étapes. S'accorder sur les responsabilites. Prevoir un suivi.

## Exemple concret

**Situation :** Mon collegue et moi devions livrer ensemble une fonctionnalite critique pour un client. Je preferais une approche avec une nouvelle technologie prometteuse (GraphQL), lui voulait rester sur REST, notre stack actuelle. Le blocage durait depuis une semaine.

**Tache :** En tant que membres de la meme équipe, nous devions trouver un consensus pour avancer sans compromettre la qualite ni la relation.

**Action :** J'ai propose une session de 2 heures dediee a ce desaccord. J'ai commence par reformuler son argument pour montrer que je comprenais son point de vue : « Si je comprends bien, ta principale inquietude est la stabilite en production, c'est bien ca ? » J'ai presente mes arguments avec des donnees de performance et des retours d'experience d'autrès équipes. J'ai propose un compromis : un Proof of Concept avec GraphQL sur un module non critique pendant 2 semaines, avec des criteres de validation objectifs decides ensemble.

**Resultat :** Le PoC a ete concluant : performance 40% superieure, code plus simple. L'équipe a adopte GraphQL progressivement. Mon collegue et moi avons continue a collaborer sur plusieurs projets et notre relation est sortie renforcee de ce conflit bien gere.

## Questions de suivi possibles

- « Que faites-vous si la discussion directe ne suffit pas ? »
- « Avez-vous déjà du escalader un conflit a votre manager ? »
- « Comment geriez-vous un conflit avec un stakeholder metier ? »

## Bonnes pratiques

- Abordez le conflit tot, pas après des semaines de frustration
- Ecoutez avant de parler (comprendre avant d'être compris)
- Separez la personne du problème (critiquez l'idee, pas la personne)
- Cherchez des solutions gagnant-gagnant
- Documentez les decisions prises
- Impliquez un tiers seulement en dernier recours
- Apprenez de chaque conflit pour éviter les suivants

## Pièges courants

- Eviter le conflit (il ne disparait pas, il s'aggrave)
- Aller directement chez le manager sans avoir essaye de resoudre
- Laisser les emotions prendre le dessus (reaction a chaud)
- Gagner aux depens de l'autre (win-lose = conflit futur)
- Faire preuve de passive-aggressivite
- Prendre parti publiquement contre un collegue
- Escalader trop vite sans dialogue prealable

## Erreurs a éviter absolument

Ne dites jamais « Je n'ai jamais eu de conflit avec personne » (c'est impossible dans une équipe). Ne dites pas que vous etes toujours d'accord avec tout le monde (manque de personnalite). Ne racontez pas un conflit où vous avez perdu votre sang-froid.

Source : [Harvard Business Review – Gerer les conflits](https://www.hbr.fr/conflits-équipe-resolution)`},
        {
          id: 'beh-4',
          question: 'Comment travaillez-vous avec un manager difficile ?',
          answer: '**Distinguez** « manager au style différent du mien » (adaptation requise) et « manager toxique » (limites à poser). Pour un style différent : **s\'adapter** à sa communication (synthétique vs détaillé, async vs sync), comprendre ses priorités, proposer des solutions plutôt que des problèmes.\n\nPour une situation toxique (micro-management excessif, communication agressive) : **documenter** les faits, **poser des limites** calmement (« je suis plus efficace quand j\'ai de l\'autonomie sur X »), **escalader** auprès de RH si nécessaire.\n\n__L\'intervieweur veut voir que vous êtes professionnel et proactif, pas que vous subissez ou fuyez.__',
        
          deepDive: `# Travailler avec un manager difficile

## Qu'est-ce que c'est ?

Tout le monde a eu, a ou aurà un manager avec un style de management difficile. Cette question explore votre capacite a vous adapter a différents profils manageriaux tout en restant professionnel et productif. Le recruteur veut savoir si vous etes quelqu'un de facile a manager.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite d'adaptation a différents styles de management
- Votre intelligence emotionnelle face à l'autorite
- Votre professionnalisme (ne pas critiquer ouvertement)
- Votre capacite a communiquer vers le haut (managing up)
- Votre maturite face a des situations hierarchiques complexes

## Strategie de réponse

**Distinguer manager difficile VS manager toxique :**

- **Manager difficile** (style différent) : A besoin d'adaptation mais pas dangereux. Solution : communiquer, comprendre ses contraintes, s'adapter.
- **Manager toxique** (comportement inapproprié) : Micro-management excessif, cris, attribution de credit. Solution : documenter, poser des limites, escalader si necessaire.

**La méthode ASC (Adapter-Solutionner-Communiquer) :**

1. **Adapter votre communication :** Certains managers preferent les emails detailles, d'autrès les messages courts. Certains veulent des updates quotidiens, d'autrès hebdomadaires. Adaptez-vous.
2. **Solutionner proactivement :** Apportez des solutions, pas des problèmes. Anticipez les questions avant qu'il ne les pose.
3. **Communiquer clairement :** Exprimez calmement ce dont vous avez besoin pour être performant.

## Exemple concret

**Question :** « Comment avez-vous gère un manager qui changeait regulierement d'avis ? »

**Situation :** Mon manager me donnait des retours contradictoires : une semaine il demandait des rapports detailles, la semaine suivante il les trouvait inutiles. Il changeait les priorites sans prevenir, ce qui creait du travail gaspille.

**Tache :** Je devais m'adapter a son style sans perdre en efficacite, et sans passer pour quelqu'un de difficile.

**Action :** J'ai commence a demander explicitement ses priorites au debut de chaque semaine lors de notre point 1:1. J'ai propose un format de reporting concis (5 lignes bullet points) plutot que des longs emails, et j'ai valide avec lui que ce format lui convenait. J'ai systematiquement envoye un email recapitulatif après chaque decision pour éviter les ambiguites. J'ai egalement anticipe les changements en preparant des alternatives.

**Resultat :** La qualite de notre collaboration s'est amelioree. Mon manager a apprecie mon professionnalisme et ma proactivite. Au bout de 3 mois, il m'a confie la gestion d'un projet transverse, signe de confiance.

## Questions de suivi possibles

- « Quelle est la chose la plus importante que vous ayez apprise en travaillant avec lui ? »
- « Avez-vous déjà du escalader une situation auprès des RH ? »
- « Comment feriez-vous si un nouveau manager avait un style completement différent ? »

## Bonnes pratiques

- Ne JAMAIS critiquer negativement un manager en entretien
- Montrez que vous pouvez vous adapter a différents styles
- Demontrez du professionnalisme meme en situation difficile
- Parlez de solutions que vous avez proposees
- Montrez que vous avez appris de l'experience
- Restez factuel et évitez le melo
- Distinguez le style personnel du comportement inapproprié

## Pièges courants

- Critiquer ou blamer le manager publiquement
- Etre passif et subir sans rien dire
- Faire du melodrame ou de la victimisation
- Escalader trop vite sans dialogue prealable
- Porter des jugements sur la personnalite du manager
- Generaliser : « Tous les managers sont incompetents »
- Refuser de s'adapter (montrer de la rigidite)

## Erreurs a éviter absolument

Ne dites jamais « Mon manager etait un con » ou « Je ne m'entendais pas avec lui, c'est tout ». Ne donnez pas l'impression d'être difficile a manager. Ne racontez pas d'histoire où vous avez eu tort professionnellement.

Source : [LinkedIn – Travailler avec un manager difficile](https://www.linkedin.com/pulse/fr/articles/travailler-avec-manager-difficile-conseils)`},
        {
          id: 'beh-5',
          question: 'Donnez un exemple où vous avez mené un projet',
          answer: 'Montrez votre **leadership** même sans titre officiel : **initiative** (vous avez identifié le besoin), **planification** (découpage, estimation, délégation), **communication** (reporting aux stakeholders, alignment de l\'équipe), **livraison** (résultat concret).\n\nAccentuez la **délégation** : un bon leader ne fait pas tout lui-même, il *enable* son équipe. Mentionnez comment vous avez géré les imprévus, levé les blocages, et célébré les succès collectifs.\n\n__Ne dites pas « j\'ai tout fait » — dites « j\'ai coordonné, débloqué, et l\'équipe a livré ».__ Le leadership = faciliter le succès des autres.',
          example: '« J\'ai proposé et mené la migration vers Docker : j\'ai créé le plan, délégué le Dockerfile à un collègue motivé, géré les résistances en organisant une démo, et livré en 3 sprints. Résultat : temps d\'onboarding réduit de 2 jours à 30 minutes. »',
        
          deepDive: `# Mener un projet avec succes

## Qu'est-ce que c'est ?

Cette question explore votre experience en gestion de projet et en leadership. Le recruteur veut comprendre comment vous abordez la planification, l'execution et la livraison d'un projet complexe, ainsi que votre capacite a mobiliser une équipe autour d'un objectif commun.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite de planification et d'organisation
- Votre leadership et votre capacite a influencer sans autorite
- Votre gestion des risques et des imprevus
- Votre orientation resultats (delivery focus)
- Votre capacite a communiquer avec les parties prenantes

## Strategie de réponse

**Le cadre PILOTE :**

1. **Planification :** Comment avez-vous structure le projet ? Quelles méthodes avez-vous utilisees ?
2. **Initiation :** Comment avez-vous obtenu l'adhesion de l'équipe et des parties prenantes ?
3. **Leadership :** Comment avez-vous coordonne et motive l'équipe ?
4. **Organisation :** Comment avez-vous gère les ressources, le temps et les priorites ?
5. **Traitement des risques :** Comment avez-vous anticipe et gère les imprevus ?
6. **Evaluation :** Quels ont ete les resultats et les leçons apprises ?

## Exemple concret

**Situation :** L'équipe de 4 développeurs devait migrer notre monolithe legacy vers une architecture microservices en 6 mois, sans interruption de service pour nos 50 000 utilisateurs actifs.

**Tache :** En tant que tech lead, je devais coordonner l'équipe, gerer les dependances avec les équipes ops et produit, et livrer dans le delai impose.

**Action :** J'ai commence par cartographier les modules du monolithe et leurs interdependances. J'ai identifie 3 modules independants a extraire en priorite pour demontrer rapidement la valeur. J'ai mis en place des demos hebdomadaires pour avoir des retours reguliers des parties prenantes. J'ai negocie avec le product owner 2 semaines de feature freeze pendant les migrations les plus risquées. J'ai mis en place un tableau de bord visible par tous avec les KPIs du projet (vélocité, risques, blocages).

**Resultat :** Migration terminee en 5 mois et demi avec zero downtime. Temps de deploiement reduit de 45 a 8 minutes. L'équipe a acquis des competences sur Docker et Kubernetes. Le projet a ete presente comme cas d'ecole lors de la conference tech interne.

## Questions de suivi possibles

- « Quel a ete le plus grand obstacle et comment l'avez-vous surmonte ? »
- « Comment avez-vous gère un membre de l'équipe qui n'etait pas performant ? »
- « Que feriez-vous differemment sur un projet similaire aujourd'hui ? »

## Bonnes pratiques

- Montrez votre leadership sans egositer le credit de l'équipe
- Incluez les defis et comment vous les avez surmontes
- Quantifiez l'impact du projet (temps, argent, performance)
- Montrez comment vous avez communique avec les parties prenantes
- Parlez des méthodes de gestion utilisees (Scrum, Kanban)
- Valorisez la contribution de l'équipe
- Mentionnez les leçons apprises

## Pièges courants

- Minimiser le rôle de l'équipe (tout le credit pour vous)
- Gonfler ses contributions ou prendre le credit du travail d'autrui
- Manquer de details techniques (montre une comprehension superficielle)
- Oublier de mentionner les obstacles et leur resolution
- Raconter un projet trop simple (pas de defi = pas d'apprentissage)
- Ne pas mentionner la communication avec les parties prenantes
- Oublier les aspects budgetaires ou temporels

## Erreurs a éviter absolument

Ne dites pas « J'ai tout fait tout seul » – les projets reels sont collectifs. Ne racontez pas un projet sans difficultes. Ne minimisez pas les risques et les imprevus.

Source : [PMI France – Conduite de projet](https://www.pmi-france.org/management-de-projet)`},
        {
          id: 'beh-6',
          question: 'Comment gérez-vous une deadline serrée ?',
          answer: '**Étape 1** : *clarifier* le périmètre — qu\'est-ce qui est *must-have* vs *nice-to-have* ? **Étape 2** : *découper* en tâches atomiques et *prioriser* (P0/P1/P2). **Étape 3** : *communiquer* tôt les risques et les ajustements nécessaires au manager/client.\n\n**Ne sacrifiez jamais la qualité de base** : tests critiques, code review, déploiement propre. Si la deadline est irréaliste : **proposer un plan B** (scope réduit, date décalée, renforts) au lieu de dire oui et livrer de la dette technique.\n\n__Dire « on ne peut pas tout faire » avec un plan priorisé vaut mieux que dire « oui » et livrer n\'importe quoi.__',
        
          deepDive: `# Gerer une deadline serree

## Qu'est-ce que c'est ?

Les deadlines serrees sont frequentes dans le développement logiciel. Cette question explore votre capacite a travailler sous pression, a prioriser efficacement et a communiquer de maniere transparente sur les contraintes. Le recruteur veut savoir si vous etes quelqu'un qui subit la pression ou qui l'organise.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a prioriser sous pression
- Votre sang-froid face à l'urgence
- Votre capacite a communiquer les risques
- Votre aptitude a negocier le scope
- Votre orientation resultats sans sacrifier la qualite

## Strategie de réponse

**La méthode des 4P :**

1. **Prioriser :** Identifiez ce qui est must-have vs nice-to-have. Utilisez la matrice Impact/Effort. N'essayez pas de tout faire.
2. **Planifier :** Decoupez en tâches atomiques. Estimez chaque tâche. Identifiez les dependances critiques.
3. **Parler :** Communiquez tot sur les risques. Proposez des plans B. Ne dites pas oui a tout.
4. **Proteger :** Ne sacrifiez pas la qualite de base (tests critiques, code review). La dette technique excessive se paie cher.

## Exemple concret

**Situation :** Le CTO m'a annonce qu'un proof-of-concept pour un investisseur devait être livre en 5 jours au lieu des 3 semaines initialement prevues.

**Tache :** Livrer un POC fonctionnel avec les features critiques pour convaincre l'investisseur, sans sacrifier la qualite au point de rendre le code inutilisable ensuite.

**Action :** J'ai immediatement decompose le scope en must-have vs nice-to-have avec l'équipe. J'ai identifie les 3 features a forte valeur ajoutee pour la demonstration. J'ai propose un scope reduit mais fonctionnel et je l'ai fait valider par le CTO avant de commencer. J'ai élimine toute distraction : pas de reunions non essentielles, pas d'emails, pas de tâches annexes. J'ai travaille en cycles de 24H avec des points d'étape chaque matin. J'ai communique quotidiennement l'avancement au CTO.

**Resultat :** Le POC a ete livre 2 heures avant la deadline. L'investisseur a ete convaincu et a decide d'investir. Le scope etait minimal mais fonctionnel et bien code, ce qui a permis de le reprendre facilement pour la version production.

## Questions de suivi possibles

- « Que faites-vous si la deadline est vraiment impossible a tenir ? »
- « Comment decidez-vous ce qui est prioritaire ? »
- « Avez-vous déjà du travailler la nuit où le week-end pour une deadline ? »

## Bonnes pratiques

- Clarifiez le perimêtre avant de commencer
- Decoupez en tâches atomiques
- Communiquez les risques tot et clairement
- Negociez le scope plutot que la qualite
- Eliminez les distractions et le travail non essentiel
- Faites des points d'étape reguliers
- Protégez le sommeil et la sante (la productivité a long terme en depend)

## Pièges courants

- Dire oui a tout sans evaluer la faisabilite
- Travailler sans priorites claires (urgent vs important)
- Ne pas communiquer les blocages en temps reel
- Sacrifier les tests et la qualite (dette technique excessive)
- Micro-manager l'équipe sous la pression
- Travailler 24h/24 sans pause (erreurs garanties)
- Promettre l'impossible pour faire plaisir

## Erreurs a éviter absolument

Ne dites pas « Je travaille mieux sous pression » comme justification pour une mauvaise planification. Ne dites pas que vous ne dormez pas et que vous sacrifiez tout pour le travail. Ne blâmez pas les autrès pour le retard.

Source : [Atlassian – Gerer les deadlines serrees](https://www.atlassian.com/fr/work-management/project-management/deadlines)`},
        {
          id: 'beh-7',
          question: 'Comment communiquez-vous avec des interlocuteurs non techniques ?',
          answer: '**Adapter le langage** : remplacer le jargon par des analogies concrètes. « Latence de 500ms » → « la page met une demi-seconde à charger, soit 2x plus que la norme ». **Structurer** : contexte → problème → impact business → solution proposée → effort.\n\n**Écouter** leurs contraintes (budget, délais, réglementation) pour proposer des solutions *réalistes*. **Visualiser** : schémas, graphiques, démos valent mieux que 1000 mots techniques.\n\n__Le meilleur développeur technique est inutile s\'il ne sait pas faire comprendre ses idées.__ L\'intervieweur vérifie votre capacité à influencer au-delà de l\'équipe tech.',
        
          deepDive: `# Communiquer avec des interlocuteurs non techniques

## Qu'est-ce que c'est ?

La communication avec des interlocuteurs non techniques est une competence essentielle pour tout professionnel tech, surtout a mesure qu'on gagne en seniorite. Savoir vulgariser des concepts complexes sans les deformer est un signe de maitrise et d'intelligence relationnelle.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a collaborer avec les équipes metier (marketing, finance, produit)
- Votre aptitude a presenter à la direction
- Votre pedagogie et votre capacite d'écoute
- Votre capacite a influencer sans jargon
- Votre maturite professionnelle (les seniors communiquent mieux)

## Strategie de réponse

**La méthode PAVER (Probleme-Analogie-Visualisation-Explication-Resultat) :**

1. **Probleme concre t:** Commencez par le problème metier, pas technique.
2. **Analogie simple :** Utilisez une image de la vie quotidienne.
3. **Visualisation :** Montrez un schema, un graphique, une maquette.
4. **Explication courte :** 3 phrases max.
5. **Resultat attendu :** Traduisez en termes business.

**Analogies classiques pour concepts techniques :**
- API = « un serveur de restaurant qui prend la commande et vous apporte le plat »
- Cache = « votre garde-manger à côté de la cuisine pour éviter d'aller au supermarché »
- Microservices = « des food trucks specialises vs un restaurant qui fait tout »
- Cloud = « l'electricité : vous payez ce que vous consommez, pas l'infrastructure »

## Exemple concret

**Situation :** Le directeur marketing me demandait pourquoi un redesign du site « tout simple » prendrait 3 mois alors qu'un prestataire externe lui avait dit pouvoir le faire en 2 semaines.

**Tache :** Je devais expliquer la complexite technique sans paraître arrogant et sans sous-estimer le travail du prestataire, tout en preservant la relation de confiance.

**Action :** J'ai utilise une analogie : « Faire un site vitrine en 2 semaines, c'est comme construire une cabane de jardin. Mais notre site actuel, c'est un immeuble de 10 etages avec des fondations, de la plomberie et de l'electricité. Le redesign que vous demandez implique de changer la structure portante sans fermer l'immeuble. » J'ai prepare un schema simple montrant l'architecture actuelle vs la cible. J'ai quantifié le risque en termes business (combien de revenus perdus si le site plante). J'ai invite le directeur à un sprint review pour voir la progression.

**Resultat :** Le directeur a compris les contraintes et a meme sugère des simplifications. La relation avec le marketing s'est nettement amelioree. Le projet a ete livre dans les temps.

## Questions de suivi possibles

- « Comment adaptez-vous votre communication a différents publics ? »
- « Avez-vous déjà du presenter un projet complexe au comite de direction ? »
- « Comment gérez-vous quand quelqu'un ne comprend pas votre explication ? »

## Bonnes pratiques

- Evitez tout jargon technique non explique
- Utilisez des analogies du quotidien
- Adaptez votre niveau de detail à l'interlocuteur (un CFO veut des chiffres, pas des specs)
- Montrez (schema, demo, prototype) plutot que d'expliquer
- Commencez par le « pourquoi », pas le « comment »
- Verifiez la comprehension sans paraître condescendant
- Concluez par l'impact metier

## Pièges courants

- Utiliser du jargon technique (impression de superiorite)
- Etre sur la defensive quand on vous remet en question
- Négliger les preoccupations business
- Promettre des resultats techniques impossibles
- Parler trop longtemps et perdre l'audience
- Simplifier à l'exces (deformer la realite)
- Ignorer les questions de clarification

## Erreurs a éviter absolument

Ne dites pas « C'est complique, vous ne comprendrez pas ». Ne sous-estimez pas l'intelligence de votre interlocuteur. Ne dites pas « Je vous ferai un schema » sans le faire. Ne mentez pas sur la complexite.

Source : [Atlassian – Communiquer avec les parties prenantes](https://www.atlassian.com/fr/work-management/skills-for-working-with-stakeholders)`},
        {
          id: 'beh-8',
          question: 'Comment vous adaptez-vous au changement ?',
          answer: 'Donnez un exemple concret : un changement de **stack technique**, de **méthodologie**, de **priorité projet**, ou de **réorganisation d\'équipe**. Montrez les 3 phases : **compréhension** (pourquoi le changement ?), **acceptation** (positiver au lieu de résister), **action** (plan d\'adaptation concret).\n\nUn bon exemple : « Notre stack est passée d\'Angular à React. J\'ai d\'abord compris la décision (standardisation groupe), puis formé l\'équipe avec des workshops, et migré notre premier composant en 2 semaines. »\n\n__L\'adaptabilité est la compétence n°1 en tech__ — les technologies changent, les priorités bougent, les réorganisations arrivent. Montrez que vous *embrassez* le changement au lieu de le subir.',
        
          deepDive: `# S'adapter au changement

## Qu'est-ce que c'est ?

Dans le domaine tech, le changement est la seule constante : nouvelles technologies, méthodes agiles, reorganisation d'équipe, pivot strategique. Votre capacite a vous adapter determine votre valeur a long terme pour une entreprise. Les recruteurs savent que les competences techniques d'aujourd'hui peuvent être obsoletes demain.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre agilite d'apprentissage (learning agility)
- Votre resistance au changement
- Votre capacite a sortir de votre zone de confort
- Votre attitude face à l'incertitude
- Votre capacite a embrasser le changement (plutot que le subir)

## Strategie de réponse

**La méthode ACC (Accepter-Comprendre-Changer) :**

1. **Accepter** : Reconnaissez le changement sans resistance emotionnelle. Meme si vous preferez l'ancienne méthode, montrez que vous l'acceptez professionnellement.
2. **Comprendre** : Analysez les raisons du changement et les opportunites qu'il apporte.
3. **Changer** : Decrivez les actions concretes que vous avez prises pour vous adapter.

**Les types de changement a illustrer :**
- Changement de stack technique (Angular vers React, monolithe vers microservices)
- Changement de méthode de travail (Waterfall vers Agile, presentiel vers remote)
- Changement d'équipe ou de perimêtre
- Changement de priorite strategique

## Exemple concret

**Situation :** L'entreprise a decide de migrer du monolithe AngularJS vers une architecture microservices en Go. J'etais développeur Angular senior depuis 4 ans et j'avais une expertise approfondie de cette stack.

**Tache :** M'adapter a cette transition technologique majeure pour rester pertinent et continuer a apporter de la valeur.

**Action :** J'ai d'abord accepte que mon expertise AngularJS allait devenir moins centrale et j'ai vu cette transition comme une opportunite d'apprentissage. J'ai pris l'initiative de suivre une formation Go en ligne pendant mes soirees sur 2 mois. J'ai propose de porter une fonctionnalite simple sur le nouveau microservice pour apprendre en conditions reelles. J'ai demande un mentorat à un développeur Go experimenté dans l'équipe. J'ai egalement documente les patterns de migration AngularJS vers React pour aider l'équipe.

**Resultat :** Apres 8 mois, j'etais tech lead sur 2 microservices Go. Ma capacite d'adaptation a ete reconnue lors de ma revue annuelle. J'ai reçu le prix interne de l'adaptabilite.

## Questions de suivi possibles

- « Quelle a ete la transition la plus difficile de votre carriere ? »
- « Comment aidez-vous les autrès membres de l'équipe a s'adapter ? »
- « Avez-vous déjà resiste à un changement que vous regrettiez ensuite ? »

## Bonnes pratiques

- Montrez un état d'esprit de croissance (growth mindset)
- Soyez proactif dans l'apprentissage
- Voyez le changement comme une opportunite, pas une menace
- Aidez les autrès a s'adapter (leadership)
- Communiquez vos craintes mais aussi votre motivation
- Utilisez des exemples concrets de transition reussie
- Montrez que vous apprenez vite de nouvelles competences

## Pièges courants

- Resister par peur du changement ou de l'inconnu
- Négliger la formation continue (rester sur ses acquis)
- Se plaindre du changement sans essayer de s'adapter
- Critiquer les decisions de l'entreprise
- Etre passif et attendre qu'on vous forme
- Sous-estimer le temps d'adaptation necessaire
- Comparer constamment avec l'ancienne méthode

## Erreurs a éviter absolument

Ne dites pas « Je prefere l'ancienne méthode, elle etait meilleure » sans arguments objectifs. Ne dites pas « Le changement, ce n'est pas mon truc ». Ne montrez pas de resistance ouverte au changement.

Source : [Atlassian – S'adapter au changement](https://www.atlassian.com/fr/blog/adaptability)`},
        {
          id: 'beh-9',
          question: 'Comment mentorisez-vous un développeur junior ?',
          answer: '**Approche progressive** : montrer d\'abord (pair programming), puis guider (code review bienveillante avec explications), enfin déléguer (tâches de plus en plus autonomes).\n\n**Pratiques concrètes** : onboarding structuré (runbook, documentation), **1:1 hebdomadaire** (questions, blocages, progression), *code review* éducative (expliquer le *pourquoi*, pas juste le *quoi*), donner des tâches **stretch** (légèrement au-dessus de leur niveau actuel).\n\n__Le mentorat ne se résume pas à « répondre aux questions »__ — c\'est un investissement actif qui accélère la montée en compétences et renforce l\'équipe. Un bon mentor *écoute* plus qu\'il ne *parle*.',
        
          deepDive: `# Mentorer un développeur junior

## Qu'est-ce que c'est ?

Le mentorat est une competence cle pour les profils seniors. Les entreprises valorisent les candidats capables de faire grandir les autres, car cela multiplie l'impact de l'équipe. Un bon mentor ne se contente pas de repondre aux questions – il structure la progression du mentore.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a transmettre vos connaissances
- Votre patience et votre empathie
- Votre leadership et votre impact sur l'équipe
- Votre capacite a faire grandir les autres
- Votre volonte d'investir du temps dans l'équipe

## Strategie de réponse

**La méthode progressive IWW (I do - We do - You do) :**

1. **I do (Je montre) :** Pair programming, explication du code, demonstration des processus.
2. **We do (Nous faisons ensemble) :** Tache realisee en binôme avec guidage progressif.
3. **You do (Tu fais seul) :** Tache deleguee avec code review bienveillante.

**Les piliers du bon mentorat :**
- Disponibilite : creneaux dedies, pas de « viens me voir quand tu veux »
- Bienveillance : erreur = opportunite d'apprentissage, pas de sanction
- Autonomie progressive : ne pas faire à la place du junior
- Feedback regulier : points 1:1 hebdomadaires

## Exemple concret

**Situation :** Un développeur junior a ete embauche dans mon équipe. Apres 2 mois, il etait frustré car il se sentait incapable de livrer des tickets par lui-même et passait ses journees a attendre de l'aide.

**Tache :** L'aider a gagner en autonomie et en confiance sans le faire travailler sous une surveillance excessive.

**Action :** J'ai mis en place un rituel de check-in quotidien de 15 minutes pour comprendre ses blocages et planifier ses tâches ensemble. J'ai utilise la méthode IWW : d'abord je montrais comment resoudre un problème similaire (I do), puis on le faisait ensemble (We do), enfin je lui donnais des tâches similaires en autonomie avec code review (You do). J'ai donne des tâches avec juste assez de challenge (zone proximale de développement). J'ai valorise chaque progression en reunion d'équipe.

**Resultat :** En 4 mois, le junior livrait des fonctionnalites complexes en autonomie. Il a ete promu junior+ après 8 mois (vs 12 mois habituels). Il a ensuite mentore a son tour un nouveau stagiaire, perpetuant la culture de partage.

## Questions de suivi possibles

- « Comment adaptez-vous votre style de mentorat a différentes personnalites ? »
- « Avez-vous déjà eu un mentore qui n'evoluait pas ? Comment avez-vous gère ? »
- « Combien de temps consacrez-vous au mentorat chaque semaine ? »

## Bonnes pratiques

- Etre patient et empathique (tout le monde a ete debutant)
- Donner de l'autonomie progressivement
- Adapter le niveau d'aide au besoin de la personne
- Celebrer les succes (petits et grands)
- Donner du feedback regulier et constructif
- Partager vos propres erreurs pour normaliser l'apprentissage
- Investir du temps de maniere structuree (pas seulement au fil de l'eau)

## Pièges courants

- Faire le travail à la place du junior (solution facile mais pas formatrice)
- Etre impatient ou condescendant (le junior n'ose plus poser de questions)
- Négliger les aspects de carriere au profit du technique
- Mettre trop de pression (courbe d'apprentissage trop rapide)
- Donner des feedbacks trop vagues (« c'est bien, continue »)
- Ne pas celebrer les progres (demotivation)
- Etre trop disponible (creer une dependance)

## Erreurs a éviter absolument

Ne dites pas « Je n'ai pas le temps pour le mentorat » (signe d'un mauvais senior). Ne dites pas « Les juniors, c'est une perte de temps ». Ne montrez pas d'impatience ou d'agacement face a des questions « simples ».

Source : [Atlassian – Mentoring en équipe tech](https://www.atlassian.com/fr/blog/leadership/mentoring)`},
        {
          id: 'beh-10',
          question: 'Comment gérez-vous des exigences ambiguës ?',
          answer: '**Ne supposez jamais** — *demandez*. Reformulez la demande pour vérifier la compréhension : « Si je résume, vous voulez X avec Y contrainte, c\'est bien ça ? ». **Proposez des options** au lieu de questions ouvertes : « Option A : on fait simple en 1 sprint. Option B : on fait complet en 3 sprints. Vous préférez quoi ? ».\n\nPour un projet flou : commencez par un **MVP** ou un **POC** pour valider la direction, puis itérez. Documentez les hypothèses et les décisions.\n\n__L\'ambiguïté est normale — le problème est de la laisser perdurer.__ Un bon développeur *chasse* l\'ambiguïté en posant les bonnes questions au bon moment.',
        
          deepDive: `# Gerer des exigences ambigues

## Qu'est-ce que c'est ?

L'ambiguite est omnipresente dans les projets tech : specifications incompletes, besoins mal exprimes, objectifs flous. Les seniors se distinguent par leur capacite a naviguer dans l'incertitude et a clarifier progressivement le perimêtre. Un junior attend qu'on lui dise exactement quoi faire ; un senior structure l'ambiguite.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a travailler sans filet de securite
- Votre esprit d'initiative et de clarification
- Votre capacite a poser les bonnes questions
- Votre méthode pour reduire l'incertitude
- Votre confort face à l'inconnu

## Strategie de réponse

**La méthode ECLAIR (Explorer-Clarifier-Limiter-Agit-Iterer-Reevaluer) :**

1. **Explorer :** Identifiez ce qui est connu et ce qui est inconnu.
2. **Clarifier :** Posez des questions ouvertes pour comprendre le besoin reel.
3. **Limiter :** Proposez un perimêtre restreint (MVP, POC) pour valider les hypotheses.
4. **Agir :** Commencez rapidement avec des iterations courtes.
5. **Iterer :** Ajustez en fonction des retours.
6. **Reevaluer :** Validez regulierement la direction avec les parties prenantes.

## Exemple concret

**Situation :** Le product owner m'a donne une specification d'une page : « Faire une page de profil utilisateur ». Pas de maquette, pas de criteres d'acceptation, pas de priorites.

**Tache :** Je devais livrer quelque chose de concret sans passe 2 semaines a faire des allers-retours de clarification.

**Action :** J'ai organise une session de 30 minutes avec le PO pour clarifier : « Pour vous, une page de profil, c'est quoi l'essentiel ? Les infos personnelles, les paramêtres, l'historique ? » J'ai propose 3 niveaux de complexite (MVP, standard, complet). Il a choisi le MVP : nom, email, photo en lecture/écriture. J'ai cree un prototype low-fi (papier) en 10 minutes pour valider la disposition. J'ai developpe le MVP en 2 jours et l'ai montre au PO. Il a valide et ajoute des retours pour la V2.

**Resultat :** Le MVP a ete livre en 2 jours au lieu de 2 semaines d'incertitude. Le PO etait ravi de la méthode et a utilise cette approche pour les specifications suivantes.

## Questions de suivi possibles

- « Que faites-vous si les parties prenantes ne savent pas ce qu'elles veulent ? »
- « Comment documentez-vous les decisions prises pendant la clarification ? »
- « Avez-vous déjà du dire non à une demande par manque de clarte ? »

## Bonnes pratiques

- Ne supposez jamais – demandez toujours
- Proposez des options concretes (A, B, C) plutot que des questions ouvertes
- Commencez par un MVP pour valider la direction
- Documentez les hypotheses et les decisions dans un ADR
- Faites des iterations courtes avec feedback frequent
- Impliquez les parties prenantes dans le processus de clarification
- Utilisez des prototypes visuels pour valider plus vite

## Pièges courants

- Assumer la comprehension au lieu de demander
- Attendre la perfection avant de commencer
- Eviter les conversations difficiles avec les parties prenantes
- Négliger les cas limites dans la clarification
- Sur-ingenierer une solution pour un besoin flou
- Ne pas documenter les decisions prises
- Partir dans une direction non validee

## Erreurs a éviter absolument

Ne dites pas « Les specs etaient nulles, donc j'ai fait comme j'ai voulu ». Ne commencez pas a coder sans avoir clarifie le minimum. Ne dites pas au PO qu'il ne sait pas faire son travail.

Source : [Atlassian – Gerer l'ambiguite en projet](https://www.atlassian.com/fr/project-management/project-terminology)`},
        {
          id: 'beh-11',
          question: 'Comment priorisez-vous des demandes concurrentes ?',
          answer: '**Cadre de priorisation** : **impact** (valeur business / nombre d\'utilisateurs touchés) × **urgence** (deadline, dépendance) × **effort** (temps nécessaire). Commencer par les **quick wins** (fort impact, faible effort) et les **urgences bloquantes**.\n\n**Communiquer les trade-offs** : « Je peux faire A ou B cette semaine, pas les deux. Lequel est prioritaire ? ». Ne jamais dire oui à tout sans montrer les conséquences.\n\n__Le vrai skill n\'est pas de tout faire, mais de savoir dire non (ou « pas maintenant ») de façon constructive.__ L\'intervieweur veut voir un esprit structuré, pas quelqu\'un qui subit les priorités des autres.',
        
          deepDive: `# Prioriser des demandes concurrentes

## Qu'est-ce que c'est ?

La priorisation est une competence cle pour les profils seniors et les tech leads. Face a des demandes qui arrivent de toutes parts (PO, équipe, ops, direction), savoir dire non (ou « pas maintenant ») de maniere constructive est essentiel pour livrer de la valeur.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a prendre des decisions sous contraintes
- Votre méthode de priorisation (pas juste de l'intuition)
- Votre capacite a communiquer les trade-offs
- Votre capacite a gerer les attentes des parties prenantes
- Votre maturite dans la gestion des contraintes

## Strategie de réponse

**Le framework RICE simplifie :**

- **R**each (Portee) : Combien d'utilisateurs sont impactes ?
- **I**mpact : Quel est l'effet sur la metrique (0,25 / 0,5 / 1 / 2 / 3) ?
- **C**onfidence : Quelle est notre certitude sur l'impact ?
- **E**ffort : Combien de temps/jours/hommes ?

Score = (R * I * C) / E

**La matrice Eisenhower :**
- Urgent + Important = Faire immediatement
- Important + Non Urgent = Planifier
- Urgent + Non Important = Deleguer
- Non Urgent + Non Important = Eliminer

## Exemple concret

**Situation :** Tech lead sur une plateforme e-commerce, j'avais 4 demandes simultanees en debut de sprint : refonte du module paiement (client VIP), optimisation des performances (incident P0 en cours), nouvelle fonctionnalite marketing (deadline fixe dans 2 semaines), et bug bloquant sur le checkout identifie la veille.

**Tache :** Je devais prioriser ces demandes avec mon équipe de 5 développeurs, en tenant compte des contraintes business et techniques.

**Action :** J'ai utilise la matrice Impact/Urgence avec l'équipe. Le bug checkout etait critique (impact immediate, 20% des commandes bloquées) – priorite absolue. L'optimisation etait urgente (incident P0) mais nous avons stabilise avec un hotfix temporaire. La refonte paiement etait importante mais pas urgente – planifiee au sprint suivant. La feature marketing avait une deadline fixe mais j'ai negocie avec le marketing pour reduire le scope au minimum viable.

**Resultat :** Le bug checkout a ete corrige en 4h. Les performances stabilisees avec un hotfix. La refonte paiement correctement planifiee. La feature marketing livree avec le scope reduit. Le client VIP a ete tenu informe et a apprecie la transparence.

## Questions de suivi possibles

- « Comment communiquez-vous à une partie prenante que sa demande n'est pas prioritaire ? »
- « Utilisez-vous des outils specifiques de priorisation ? »
- « Avez-vous déjà du desprioriser une demande importante ? Comment avez-vous gère ? »

## Bonnes pratiques

- Utilisez des frameworks de priorisation (pas de l'intuition)
- Calculez le cout du retard (Cost of Delay)
- Communiquez transparentement les trade-offs
- Impliquez l'équipe dans les decisions de priorite
- Revoyez les priorites regulierement
- Documentez les decisions et leur justification
- Apprenez a dire non de maniere constructive

## Pièges courants

- Prioriser selon le bruit (celui qui crie le plus fort)
- Ignorer les dependances entre tâches
- Négliger la capacite de l'équipe
- Decider seul sans concerter l'équipe où les parties prenantes
- Changer les priorites tous les jours (instabilite)
- Ne pas communiquer les changements
- Sacrifier systematiquement la dette technique

## Erreurs a éviter absolument

Ne dites pas « Je fais tout en meme temps » (c'est impossible). Ne dites pas « Je priorise selon ce que me demande mon manager » (manque d'initiative). Ne laissez pas les parties prenantes decider a votre place.

Source : [Atlassian – Priorisation des tâches](https://www.atlassian.com/fr/project-management/project-terminology)`},
        {
          id: 'beh-12',
          question: 'Comment donnez-vous et recevez-vous du feedback ?',
          answer: '**Donner** : méthode **SBI** (*Situation-Behavior-Impact*) — « Lors du standup (S), tu as coupé la parôle à Marie (B), ce qui a coupé la discussion technique (I) ». Être **spécifique**, **factuel**, **timely** (immédiat, pas 3 mois après). Feedback positif aussi — et en **public** si possible.\n\n**Recevoir** : écouter sans se justifier, remercier, poser des questions pour comprendre, décider ce qu\'on en retient. **Séparer** le feedback sur le *travail* du feedback sur la *personne*.\n\n__Un développeur qui ne sait pas recevoir de feedback stagne__ — la capacité d\'amélioration continue repose sur l\'ouverture à la critique constructive. Montrez que vous la *cherchez* activement.',
        
          deepDive: `# Donner et recevoir du feedback

## Qu'est-ce que c'est ?

La capacite a donner et recevoir du feedback est fondamentale pour la croissance individuelle et collective. Les équipes qui cultivent une culture du feedback sont plus performantes, plus innovantes et plus resilientes. Les recruteurs considerent cette competence comme un marqueur de maturite professionnelle.

## Pourquoi le recruteur pose cette question

Le recruteur cherche a evaluer :
- Votre capacite a communiquer de maniere constructive
- Votre ouverture à la critique et votre capacite d'amelioration
- Votre intelligence emotionnelle et votre empathie
- Votre capacite a contribuer à une culture d'amelioration continue
- Votre maturite professionnelle

## Strategie de réponse

**La méthode SBI (Situation-Comportement-Impact) pour donner du feedback :**

1. **Situation :** Decrivez le contexte specifique. « Lors de la revue de sprint... »
2. **Comportement :** Decrivez le comportement observable, pas la personne. « Tu as interrompu Marie a plusieurs reprises... »
3. **Impact :** Expliquez les consequences. « ...ce qui a coupe la dynamique de la discussion et a empeche d'entendre son point de vue. »

**Framework pour recevoir du feedback :**
1. **Ecouter :** Ne vous justifiez pas. Ecoutez jusqu'au bout.
2. **Accuser reception :** « Merci pour ce feedback, je vais y reflechir. »
3. **Clarifier :** « Pour être sur de bien comprendre... »
4. **Agir :** Decidez ce que vous en faites et suivez.

## Exemple concret

**Donner du feedback constructif :**

**Situation :** Un développeur junior de mon équipe livrait regulierement du code avec des problèmes reçurrents : nommage incoherent, tests unitaires manquants, pull requests trop grandes.

**Action :** J'ai attendu la fin du sprint pour éviter la surcharge cognitive. J'ai utilise le modèle SBI : « Sur les 3 dernieres PRs que tu as soumises (Situation), j'ai remarque que les tests unitaires etaient absents et le nommage des variables n'etait pas coherent avec notre convention (Comportement). Ca rallonge le temps de review et ca introduit des risques de regression (Impact). » J'ai commence par les points positifs : « J'ai note que la logique metier est bien implementee et que tu as respecte les criteres d'acceptation. » J'ai propose des actions concretes : « On pourrait faire du pair programming sur la prochaine PR pour que je te montre comment je structure. »

**Resultat :** Le junior a apprecie la clarte et la bienveillance du feedback. En 6 semaines, la qualite de ses PRs s'est nettement amelioree et il a commence a faire du code review pour les nouveaux arrivants.

## Questions de suivi possibles

- « Comment reagissez-vous quand quelqu'un vous donne un feedback negatif ? »
- « Avez-vous déjà reçu un feedback qui vous a surpris ? »
- « Comment donnez-vous du feedback à un pair senior ? »

## Bonnes pratiques

- Donnez du feedback regulierement, pas seulement en annuel
- Soyez specifique et factuel (pas de generalites)
- Utilisez le ratio 3:1 (feedback positif vs constructif)
- Focalisez sur le comportement, pas la personne
- Donnez le feedback en prive si constructif, en public si positif
- Pour recevoir : écoutez sans vous justifier, remerciez, agissez
- Proposez des solutions, pas seulement des problèmes

## Pièges courants

- Attendre les revues annuelles pour donner du feedback
- Etre trop vague : « Il faut ameliorer la qualite du code »
- Donner du feedback constructif en public (humiliation)
- Prendre le feedback personnellement (attitude defensive)
- Donner du feedback sans exemple concret (perte de credit)
- Oublier le feedback positif (demotivation)
- Donner du feedback quand on est en colere (contre-productif)

## Erreurs a éviter absolument

Ne dites pas « Tu es nul en X » (attaque personnelle). Ne donnez pas de feedback devant toute l'équipe pour un problème individuel. Ne recevez pas le feedback en disant « Oui mais... » systematiquement. N'ignorez pas le feedback reçu.

Source : [Atlassian – Culture du feedback](https://www.atlassian.com/fr/work-management/project-management-advice)`},
      ],
    },
  ],
};