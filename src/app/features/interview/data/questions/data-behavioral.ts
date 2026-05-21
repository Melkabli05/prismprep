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
        
          deepDive: `# La methode STAR

## Quest-ce que cest ?

La méthode STAR est un cadre structuré pour répondre aux questions comportementales en entretien. Elle permet de organizer ses réponses de manière claire et impactante en décrivant une Situation, une Tache, une Action et un Résultat.

Cette méthode est utilisée pour evaluar :
- Les compétences interpersonnelles
- La capacité à résoudre des problèmes
- L'expérience avec des situations réelles
- Les comportements observables

## Les 4 étapes

**Situation (S)**
Décrivez le contexte : où étiez-vous, quand, avec qui ? Donnez assez de détails pour que l'intervieweur comprenne la situation.

**Tâche (T)**
Expliquez quel était votre rôle spécifique. Quelle était votre responsabilité dans cette situation ? Quel problème fallait-il résoudre ?

**Action (A)**
Décrivez les étapes concrètes que VOUS avez prises. Utilisez le pronom "je" pour强调 votre contribution personnelle. Détaillez votre raisonnement.

**Résultat (R)**
Mesurables si possible :Qu'est-ce qui a changé ? Quels étaient les indicateurs de succès ? Qu'avez-vous appris ?

## Exemple complet

**Question :** Parlez d'une fois où vous avez dû gérer un conflit au sein de votre équipe.

**S :** Lors du lancement de notre projet majeur au sein de mon équipe de 5 personnes, deux développeurs seniors avaient un désaccord profond sur l'architecture technique à adopter.

**T :** En tant que lead technique, je devais trouver une solution qui permettrait au projet d'avancer tout en préservant la cohésion de l'équipe.

**A :** J'ai organisé une réunion où chaque partie a pu exposer ses arguments techniques. J'ai créé un tableau comparatif des deux approches. J'ai proposé un Proof of Concept pour départager les options. J'ai également organisé des sessions de code review croisé.

**R :** L'équipe a adopté une approche hybride. Le projet a été livré dans les délais avec 20% de réduction des bugs en production par rapport au projet précédent. Les deux développeurs ont depuis collaboré sur trois autres projets.

## Bonnes pratiques

- Préparer 3-5 histoires diverses à l'avance
- Choisir des exemples récents (moins de 2 ans)
- Se concentrer sur ses Contributions personnelles
- Utiliser des données chiffrées quand possible
- Rester authentique et honnête

## Pièges courants

- Etre trop vague ou manque de détails
- Parler au nom de l'équipe sans clarifier son rôle personnel
- Négliger la partie "Résultat" de la méthode
- Choisir des exemples trop banals ou sans impact
- Répéter toujours la même histoire

Source : [Harvard Business Review - The STAR Method](https://hbr.org/2022/01/a-better-way-to-answer-behavioral-interview-questions)`},
        {
          id: 'beh-2',
          question: 'Comment parler d\'un échec sans se dévaloriser ?',
          answer: 'Choisissez un **vrai échec** (pas un faux comme « j\'ai trop travaillé »), mais **pas fatal** (pas de licenciement, pas de faute grave). Structure : **fait objectif** → **ce que vous avez appris** → **ce que vous avez changé depuis**.\n\nMontrez la **responsabilité** (pas de « on m\'a mal conseillé ») et la **résilience** (comment vous avez rebondi). L\'évaluateur cherche à savoir si vous êtes **capable d\'introspection** et d\'amélioration continue.\n\n__L\'échec lui-même compte moins que ce que vous en retenez.__ Un bon candidat tire des leçons ; un mauvais candidat minimise ou blame les autres.',
          example: '« J\'ai sous-estimé la complexité d\'une migration BDD, causant 4h de downtime non planifié. J\'ai appris à : 1) toujours faire un dry-run sur staging, 2) préparer un rollback plan, 3) communiquer les risques en amont. Depuis, chaque migration suit un runbook validé par l\'équipe. »',
        
          deepDive: `# Parler d'un echec sans se devaloriser

## Quest-ce que cest ?

Les entretiens incluent souvent une question sur les échecs ou les erreurs. L'objectif n'est pas de vous piéger mais d'evaluer :
- Votre capacité d'introspection
- Votre maturité professionnelle
- Votre capacité d'apprentissage
- Votre honnêteté et humility

La clé est de trouver l'équilibre entre être honnête sur ses faiblesses sans se dévaloriser.

## Structure recommandée

**1. Identifier un échec réel (pas une fausse modestie)**
- Choisir une situation ou vous avez réellement échoué
- Éviter les "échecs" qui sont en fait des succes déguisés
- Préférez les échecs professionnels aux échecs personnels

**2. Decrire la situation avec objectivité**
- Pas de blâme externe (éviter "l'équipe n'était pas compétente")
- Pas de victimisation (éviter "personne ne m'a aider")

**3. Analyser les causes (votre part de responsabilité)**
- Qu'est-ce qui était sous votre contrôle ?
- Qu'est-ce que vous auriez pu faire différemment ?

**4. Expliquer les apprentissages**
- Qu'avez-vous compris sur vous-même ?
- Qu'avez-vous changé depuis ?

**5. Demontrer le changement**
- Comment avez-vous appliqué ce apprentissage depuis ?

## Exemple

**Mauvais exemple :**
"J'ai echoué à ce projet parce que le client était impossible et mon manager ne me soutenait pas. J'étais vraiment compétent mais..."

**Bon exemple :**
"Lors du lancement de notre application mobile, j'ai sous-estimé le temps nécessaire pour les tests utilisateur. J'ai pressé l'équipe pour respecter le deadline que j'avais promis au client.

Ce que j'ai mal géré : je n'ai pas suffisamment pushé pour communiquer les risques tôt.

Ce que j'ai appris : l'importance de la gestion des attentes et d'être transparent sur les risques.

Ce que j'ai changé : depuis, j'inclue systématiquement une marge de sécurité dans mes estimations et j'organise des points de sync hebdomadaire avec les parties prenantes pour identifier les blocker tôt."

## Bonnes pratiques

- Choisir un échec avec un impact modéré (pas une catastrophe)
- Montrer que vous avez grandi grâce à cette expérience
- Utiliser des exemples avec un dénouement positif malgré l'échec initial
- Rester factuel et éviter le mélodrame

## Pièges courants

- Mentir ou exagérer un échec mineur
- Blâmer les autres (même avec raison)
- Se dévaloriser ("Je suis nul en...", "Je n'y arrive jamais")
- Choisir un échec qui révèle une incompétence fondamentale
- Oublier de mentionner ce que vous avez changé

Source : [The Muse - How to Talk About Your Greatest Failure](https://www.themuse.com/advice/how-to-talk-about-your-biggest-failure-in-a-job-interview)`},
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

## Quest-ce que cest ?

Les conflits au sein d'équipes sont inevitables et peuvent même être productifs s'ils sont bien gérés. Les interviewers posent cette question pour évaluer :
- Votre intelligence émotionnelle
- Vos compétences en communication
- Votre capacité à désamorcer les tensions
- Votre approche collaborative de résolution de problèmes

## Etapes pour gérer un conflit

**1. Identifier la nature du conflit**
- Conflit de工作任务 (priorités, méthodes)
- Conflit relationnel (communication, valeurs)
- Conflit d'intérêts (ressources, reconnaissance)

**2. Aborder la situation directement (mais respectueusement)**
- Ne pas attendre que ça passe
- Ne pas aller voir le manager avant d'avoir essayé directement
- Choisir un moment opportun pour discuter

**3. Ecouter activement**
- Comprendre le point de vue de l'autre
- Valider les émotions sans necessarily agreeer
- Poser des questions ouvertes

**4. Trouver un terrain commun**
- Identifier les objectifs partagés
- Séparer les personnes du problème
-Explorer des solutions alternatives

**5. Aboutir à un accord clair**
- Définir les prochaines étapes
- S'accorder sur les responsabilités
- Prévoir un suivi

## Exemple STAR

**S :** Mon collègue Mohammed et moi devions livrer ensemble une fonctionnalité critique. Mohammed préférait une approche technique conservatrice tandis que je voulais utiliser une nouvelle technologie prometteuse.

**T :** En tant que lead, je devais trouve une solution qui permettrait la livraison dans les délais tout en maintenant la qualité technique.

**A :** J'ai propose de programmer une session de 2 heures pour que chacun présente ses arguments. J'ai écouté activement ses préoccupations liées à la stabilité en production. J'ai présenté des données sur les tests de performance de la nouvelle technologie. Ensemble, nous avons decide de faire un Proof of Concept avec la nouvelle techno sur un module non critique pendant une semaine.

**R :** Le PoC a fonctionne, l'équipe a adopte la nouvelle technologie. Le projet a été livré avec 3 jours d'avance. Mohammed et moi avons depuis collaboré sur 4 autres projets avec une bonne entente.

## Bonnes pratiques

- Ne jamais prendre parti publiquement contre un collègue
- Documenter les décisions prisees pour eviter les malentendus
- Maintenir une attitude professionnelle même si le conflit persiste
- Escalader uniquement si la discussion directe échoue

## Pièges courants

- Éviter le conflit au lieu de l'affronter
- Aller directement chez le manager sans essayer de résoudre
- Laisser les émotions prendre le dessus
- Gagner aux dépens de l'autre (win-lose)
- Faire preuve de passive aggression

Source : [Harvard Law School - Managing Workplace Conflict](https://www.pon.harvard.edu/daily/managing-workplace-conflict/)`},
        {
          id: 'beh-4',
          question: 'Comment travaillez-vous avec un manager difficile ?',
          answer: '**Distinguez** « manager au style différent du mien » (adaptation requise) et « manager toxique » (limites à poser). Pour un style différent : **s\'adapter** à sa communication (synthétique vs détaillé, async vs sync), comprendre ses priorités, proposer des solutions plutôt que des problèmes.\n\nPour une situation toxique (micro-management excessif, communication agressive) : **documenter** les faits, **poser des limites** calmement (« je suis plus efficace quand j\'ai de l\'autonomie sur X »), **escalader** auprès de RH si nécessaire.\n\n__L\'intervieweur veut voir que vous êtes professionnel et proactif, pas que vous subissez ou fuyez.__',
        
          deepDive: `# Travailler avec un manager difficile

## Quest-ce que cest ?

Cette question évalue votre capacité à travailler avec différents profils management, votre intelligence émotionnelle et votre professionnalisme. Un "manager difficile" peut être :
- Trop directif ou micro-managing
- Changeant ou incohérent dans ses demandes
- Peu disponible ou inaccessible
- Difficile émotionnellement (colérique, negatif)

## Stratégies à adopter

**1. Comprendre son point de vue**
- Quel sont ses pressures et contraintes ?
- Pourquoi agit-il ainsi ?
- Quels sont ses indicateurs de succès ?

**2. Ajuster sa communication**
- Adapter le format (certain managers prefèrent les emails, d'autres les appels)
- Adapter la fréquence des updates
- Soigner le timing (ne pas déranger pendant les pics de stress)

**3. Etre proactif**
- Anticiper ses besoins d'information
- Proposer des solutions plutôt que des problèmes
- Documenter les décisions et accords

**4. Fixer des limites saines**
- Si le comportement est toxic, documenter les incidents
-Exprimer calmement quand quelque chose ne convient pas
- Escalader uniquement en dernier recours

**5. Chercher du soutien**
- Allies au sein de l'équipe
- Mentor ou coach externe
- Ressources humaines si nécessaire

## Exemple STAR

**Question :** Comment avez-vous géré un manager changeant dans ses demandes ?

**S :** Quand j'ai rejoint mon équipe, mon manager donnait souvent des retours contradictoires. Une semaine il demandait des rapports détaillés, la semaine suivante il les trouvait inutiles.

**T :** Je devais m'adapter à son style tout en deliverant mon travail eficacement sans passer pour quelqu'un qui ne sait pas ce qu'il fait.

**A :** J'ai commencé par demander explicitement ses priorites au debut de chaque semaine lors de notre 1:1. J'ai proposé de résumer mes avancé en 5 minutes max plutôt qu'un rapport formel. J'ai pris des notes pendant nos conversations et les ai envoyées par email pour confirmer les décisions.

**R :** Mon manager a apprécié cette approche proactive. Au bout de 3 mois, il m'a confier la gestion de deux nouveaux projet en me disant que je savais bien communiquer. Notre relation s'est améliorée significativement.

## Bonnes pratiques

- Ne jamais parler négativement d'un ancien manager en entretien
- Montrer que vous pouvez vous adapter à différents styles
- Rester professionnel même face à un comportement inapproprié
- Documenter pour vous protéger si nécessaire

## Pièges courants

- Critiquer ou blâmer le manager publiquement
- Etre passif et subir sans rien dire
- Toucher au mélodrame ou à la victimisation
- Escalader trop vite sans dialogue préalable
- Porter des jugements sur sa personnalité

Source : [Forbes - Working With Difficult Bosses](https://www.forbes.com/sites/ashiraprossmal/2023/01/working-with-a-difficult-boss-heres-how-to-handle-it/)`},
        {
          id: 'beh-5',
          question: 'Donnez un exemple où vous avez mené un projet',
          answer: 'Montrez votre **leadership** même sans titre officiel : **initiative** (vous avez identifié le besoin), **planification** (découpage, estimation, délégation), **communication** (reporting aux stakeholders, alignment de l\'équipe), **livraison** (résultat concret).\n\nAccentuez la **délégation** : un bon leader ne fait pas tout lui-même, il *enable* son équipe. Mentionnez comment vous avez géré les imprévus, levé les blocages, et célébré les succès collectifs.\n\n__Ne dites pas « j\'ai tout fait » — dites « j\'ai coordonné, débloqué, et l\'équipe a livré ».__ Le leadership = faciliter le succès des autres.',
          example: '« J\'ai proposé et mené la migration vers Docker : j\'ai créé le plan, délégué le Dockerfile à un collègue motivé, géré les résistances en organisant une démo, et livré en 3 sprints. Résultat : temps d\'onboarding réduit de 2 jours à 30 minutes. »',
        
          deepDive: `# Mener un projet

## Quest-ce que cest ?

Cette question explore votre expérience en gestion de projet et de personnes. Elle permet d'evaluer :
- Votre capacité de planification
- Votre leadership et votre influence
- Votre gestion des imprévus
- Votre delivery orientation résultats

## Eléments clés d'un bon pilotage de projet

**1. Clarifier les objectifs**
- Qu'est-ce qui doit être livré ?
- Dans quel délai ?
- Avec quelles contraintes (budget, resources) ?

**2. Planifier rigoureusement**
- Décomposer en lots et tâches
- Identifier les dépendances critiques
- Allouer les ressources adequates
- Prévoir des buffers pour les risques identifiés

**3. Communiquer efficacement**
- Updates réguliers aux parties prenantes
- Transparence sur les risques et bloquers
- Anticipation des besoins de décision

**4. Adapter et réagir**
- Réévaluer régulièrement les priorités
- Savoir dire non ou négocier les délais
- Gestion du changement

## Exemple STAR

**S :** L'équipe de 4 développeurs devait migrer notre legacy monolith vers une architecture microservices en 6 mois, sans interruption de service pour nos 50 000 utilisateurs.

**T :** J'étais lead technique sur ce projet. Je devais coordonner l'équipe, gérer les dépendances avec les équipes ops et produit, tout en respectant le délai serré.

**A :** J'ai commence par cartographier les modules du monolith et leur interdépendance. J'ai identifié 3 modules independants à extraire en priorité pour démontrer la valeur. J'ai mis en place des每周 demos pour avoir des retours réguliers. J'ai négocié avec le product owner pour avoir 2 semaines de feature freeze pendant les migrations les plus risques.

**R :** Migration terminée en 5 mois et demi avec zéro downtime. Temps de déploiement passe de 45 minutes à 8 minutes. L'équipe a acquis des compétences transferables sur Docker et Kubernetes. Le projet a été présenté comme modèle lors de la conference tech interne.

## Bonnes pratiques

- Montrer votre leadership technique, pas juste management
- Inclure les challenges et comment vous les avez surmontés
- Mentionner l'impact mesurable du projet
- Valoriser la contribution de l'équipe, pas juste la vôtre

## Pièges courants

- Minimiser le role de l'équipe
- Gonfler ses contributions ou prendre le crédit du travail d'autrui
- Manquer de détails techniques (montre que vous comprenez le domaine)
- Oublier de mentionner les obstacles et comment vous les avez gérés

Source : [PMI - Project Management Institute](https://www.pmi.org/)`},
        {
          id: 'beh-6',
          question: 'Comment gérez-vous une deadline serrée ?',
          answer: '**Étape 1** : *clarifier* le périmètre — qu\'est-ce qui est *must-have* vs *nice-to-have* ? **Étape 2** : *découper* en tâches atomiques et *prioriser* (P0/P1/P2). **Étape 3** : *communiquer* tôt les risques et les ajustements nécessaires au manager/client.\n\n**Ne sacrifiez jamais la qualité de base** : tests critiques, code review, déploiement propre. Si la deadline est irréaliste : **proposer un plan B** (scope réduit, date décalée, renforts) au lieu de dire oui et livrer de la dette technique.\n\n__Dire « on ne peut pas tout faire » avec un plan priorisé vaut mieux que dire « oui » et livrer n\'importe quoi.__',
        
          deepDive: `# Gestion des deadlines serrees\\n\\n## Quest-ce que cest\\nUne deadline serree (tight deadline) est une contrainte temporelle qui necessite une planification soignee, des priorites claires, et eventuellement des compromis strategiques.\\n\\n## STAR Framework\\n\\n**Situation:** Le CTO m'a annonce que le proof-of-concept pour un investisseur devait etre livre en 5 jours au lieu des 3 semaines prevues.\\n\\n**Tache:** Livrer un POC fonctionnel avec les features critique pour impresser l'investisseur.\\n\\n**Action:**\\n- J'ai decompose le scope en must-have vs nice-to-have\\n- J'ai identifie les 3 features a forte valeur investissement\\n- J'ai propose un scope realiste et l'ai fait valider\\n- J'ai elimine toute distraction (reunions, emails) pendant ces 5 jours\\n- J'ai travailé en iterator sprints de 24h avec demo quotidienne\\n\\n**Resultat:** Le POC etait livre 2h avant la deadline. L'investisseur a decide d'investir. Le scope final etait minimal mais fonctionnel.\\n\\n## Bonnes pratiques\\n- Decomposer en smallest deliverable increments\\n- Negotiate scope avant d'accepter la deadline\\n- Eliminater le waste (reunions non essentielles)\\n- Communiquer les risquestransparentement\\n- Celebrer les petites victoires\\n\\n## Pieges courants\\n- Tenter de tout faire\\n- Travailler sans priorites claires\\n- Négliger la dette technique a court terme\\n- Ne pas communiquer les blocages\\n- Sacrifier le sommeil au-dela du raisonnable\\n\\n## Sources\\nhttps://www.atlassian.com/project-management/project-terminology`},
        {
          id: 'beh-7',
          question: 'Comment communiquez-vous avec des interlocuteurs non techniques ?',
          answer: '**Adapter le langage** : remplacer le jargon par des analogies concrètes. « Latence de 500ms » → « la page met une demi-seconde à charger, soit 2x plus que la norme ». **Structurer** : contexte → problème → impact business → solution proposée → effort.\n\n**Écouter** leurs contraintes (budget, délais, réglementation) pour proposer des solutions *réalistes*. **Visualiser** : schémas, graphiques, démos valent mieux que 1000 mots techniques.\n\n__Le meilleur développeur technique est inutile s\'il ne sait pas faire comprendre ses idées.__ L\'intervieweur vérifie votre capacité à influencer au-delà de l\'équipe tech.',
        
          deepDive: `# Communication avec interlocuteurs non techniques\\n\\n## Quest-ce que cest\\nCommunicer avec des interlocuteurs non techniques (clients, managers, marketing) necessite adapter son langage, utiliser des analogies, et se concentrer sur la valeur Business.\\n\\n## STAR Framework\\n\\n**Situation:** Le directeur marketing me demandait pourquoi le projet de refonte etait prevu pour 3 mois alors que "un developpeur externe avait livre un site similaire en 2 semaines".\\n\\n**Tache:** Expliquer la complexite technique sans paraitre arrogant ni sous-estimer le travail.\\n\\n**Action:**\\n- J'ai utilise une analogie: "construire une maison vs dessiner une maison sur papier"\\n- J'ai montre un diagramme simple de l'architecture actuelle\\n- J'ai quantifie le risque en termes business (perte de revenue si crash)\\n- J'ai propose une demo du scope pour rendre le projet plus tangible\\n- J'ai invite le directeur a un sprint review pour voir la progression\\n\\n**Resultat:** Le directeur a compris les contraintes et a meme suggere des simplifications. La relation avec le marketing s'est amelioree.\\n\\n## Bonnes pratiques\\n- Eviter le jargon technique\\n- Utiliser des analogies du quotidien\\n- Focaliser sur le "pourquoi" et le "valeur"\\n- Montrer des prototypes ou demos\\n- Poser des questions pour valider la comprehension\\n\\n## Pieges courants\\n- Utiliser de l'argon sans expliquer\\n- Defensive quand remis en question\\n- Négliger les preocupations business\\n- Faire des promesses techniques impossibles\\n\\n## Sources\\nhttps://www.atlassian.com/work-management/skills-for-working-with-stakeholders`},
        {
          id: 'beh-8',
          question: 'Comment vous adaptez-vous au changement ?',
          answer: 'Donnez un exemple concret : un changement de **stack technique**, de **méthodologie**, de **priorité projet**, ou de **réorganisation d\'équipe**. Montrez les 3 phases : **compréhension** (pourquoi le changement ?), **acceptation** (positiver au lieu de résister), **action** (plan d\'adaptation concret).\n\nUn bon exemple : « Notre stack est passée d\'Angular à React. J\'ai d\'abord compris la décision (standardisation groupe), puis formé l\'équipe avec des workshops, et migré notre premier composant en 2 semaines. »\n\n__L\'adaptabilité est la compétence n°1 en tech__ — les technologies changent, les priorités bougent, les réorganisations arrivent. Montrez que vous *embrassez* le changement au lieu de le subir.',
        
          deepDive: `# Adaptation au changement\\n\\n## Quest-ce que cest\\nL'adaptation au changement est la capacite a ajuster son approche, ses competences, ou ses priorities face a de nouvelles circonstances, technologies ou directives.\\n\\n## STAR Framework\\n\\n**Situation:** L'entreprise a decide de migrer du monolith AngularJS vers une architecture microservices en Go, alors que jeetaissenior dev Angular depuis 4 ans.\\n\\n**Tache:** M'adapter a cette transition technologique majeure et rester pertinent.\\n\\n**Action:**\\n- J'ai accepte le changement comme opportunite plutot que menace\\n- J'ai pris des initiative pour apprendre Go (dojo linguale weekly)\\n- J'ai propose de kier des features pilotes sur les nouveaux services\\n- J'ai communique transparemment sur mes lacunes tout en montrant ma motivation\\n- J'ai demande un mentorat d'un dev Go experimenter\\n\\n**Resultat:** Apres 8 mois, j'etais tech lead sur 2 microservices Go. Ma capacite d'adaptation a ete remarquée lors de evaluations.\\n\\n## Bonnes pratiques\\n- Adopter un mindset de croissance (growth mindset)\\n- Etre proactif dans l'apprentissage\\n- Communiquer ses fears mais aussi ses motivations\\n- Chercher des opportunites de transition\\n- Celebrer les petites avancees\\n\\n## Pieges courants\\n- Resister par peur du changement\\n- Négliger la formation continue\\n- Isoler lors des transitions\\n- comparer avec le passe\\n\\n## Sources\\nhttps://www.atlassian.com/blog/adaptability`},
        {
          id: 'beh-9',
          question: 'Comment mentorisez-vous un développeur junior ?',
          answer: '**Approche progressive** : montrer d\'abord (pair programming), puis guider (code review bienveillante avec explications), enfin déléguer (tâches de plus en plus autonomes).\n\n**Pratiques concrètes** : onboarding structuré (runbook, documentation), **1:1 hebdomadaire** (questions, blocages, progression), *code review* éducative (expliquer le *pourquoi*, pas juste le *quoi*), donner des tâches **stretch** (légèrement au-dessus de leur niveau actuel).\n\n__Le mentorat ne se résume pas à « répondre aux questions »__ — c\'est un investissement actif qui accélère la montée en compétences et renforce l\'équipe. Un bon mentor *écoute* plus qu\'il ne *parle*.',
        
          deepDive: `# Mentorat de developpeurs juniors\\n\\n## Quest-ce que cest\\nLe mentorat est une relation professionnelle ou un developper experimenter guide et soutient un pair moins experimenter dans sa croissance technique et personnelle.\\n\\n## STAR Framework\\n\\n**Situation:** Un dev junior a ete embauche sur mon projet. Apres 2 mois, il etait frustré car il se sentait incapable de deliverer des tickets самостоятельно.\\n\\n**Tache:** L'aider a gagner en autonomie et confiance sans le faire lavor overprotectrice.\\n\\n**Action:**\\n- J'ai organise un check-in quotidien de 15 min pour comprendre ses blocages\\n- J'ai utilise la methode "I do, we do, you do" pour introduire de nouveaux concepts\\n- J'ai donne des tickets avec juste assez de challenge (zone proximale de developpement)\\n- J'ai valorise chaque petite advancement publiquement\\n- J'ai encourage a poser des questions sans jugement\\n\\n**Resultat:** En 4 mois, le junior deliverait des features complexes en autonomie. Il a ete promu junior+ apres 8 mois. Il continue de me remercier pour la patience.\\n\\n## Bonnes pratiques\\n- Etre patient et empathique\\n- Donner de l'autonomie progressivement\\n- Adapter le niveau d'aide au besoin\\n- Celebrer les successes\\n- Don\\ner du feedback regulier\\n- Partager ses propres erreurs pour normalize the learning\\n\\n## Pieges courants\\n- Faire le travail a la place du junior\\n- Etre impatient ou condescendant\\n- Négliger les aspects career au profit du technique\\n- Mettre trop de pression\\n\\n## Sources\\nhttps://www.atlassian.com/blog/leadership/mentoring`},
        {
          id: 'beh-10',
          question: 'Comment gérez-vous des exigences ambiguës ?',
          answer: '**Ne supposez jamais** — *demandez*. Reformulez la demande pour vérifier la compréhension : « Si je résume, vous voulez X avec Y contrainte, c\'est bien ça ? ». **Proposez des options** au lieu de questions ouvertes : « Option A : on fait simple en 1 sprint. Option B : on fait complet en 3 sprints. Vous préférez quoi ? ».\n\nPour un projet flou : commencez par un **MVP** ou un **POC** pour valider la direction, puis itérez. Documentez les hypothèses et les décisions.\n\n__L\'ambiguïté est normale — le problème est de la laisser perdurer.__ Un bon développeur *chasse* l\'ambiguïté en posant les bonnes questions au bon moment.',
        
          deepDive: `# Gestion des exigences ambiguës\\n\\n## Quest-ce que cest\\nLes exigences ambiguës sont des specifications不清清楚楚 ou incompletes qui peuvent mener a des malentendus, des reworks et des delais. Gerer l'ambiguite est une competence cle pour tout professionnel tech, surtout en contexte Agile.\\n\\n## STAR Framework\\n\\n**Situation:** Pendant un projet de refonte API, le client a fourni des specifitations generales sans details sur les cas limites.\\n\\n**Tache:** En tant que Tech Lead, je devais clarifier les attentes pour eviter des mois de travail gaspille.\\n\\n**Action:**\\n- J'ai organise une session de clarification avec le client (30 minutes)\\n- J'ai cree un prototype interactif pour valider les hypotheses\\n- J'ai documente chaque decision dans un ADR (Architecture Decision Record)\\n- J'ai mis en place des points de synchronisation hebdomadaires\\n\\n**Resultat:** Le projet a ete livre dans les delais avec seulement 2 allers-retours contre 15 prevus initialement. Le client etait impressionne par la clarification proactive.\\n\\n## Bonnes pratiques\\n- Poser des questions ouvertes des le depart\\n- Utiliser des prototypes pour valider les hypotheses\\n- Documenter les decisions et leurs justifications\\n- Definir des critieres d'acceptation mesurables\\n- Favoriser les iterations courtes avec feedback frequent\\n\\n## Pieges courants\\n- Assumer rather than asker\\n- Attendre la perfection avant de commencer\\n- Eviter les conversations difficiles avec les parties prenantes\\n- Négliger les cas limites\\n\\n## Sources\\nhttps://www.atlassian.com/project-management/project-terminology`},
        {
          id: 'beh-11',
          question: 'Comment priorisez-vous des demandes concurrentes ?',
          answer: '**Cadre de priorisation** : **impact** (valeur business / nombre d\'utilisateurs touchés) × **urgence** (deadline, dépendance) × **effort** (temps nécessaire). Commencer par les **quick wins** (fort impact, faible effort) et les **urgences bloquantes**.\n\n**Communiquer les trade-offs** : « Je peux faire A ou B cette semaine, pas les deux. Lequel est prioritaire ? ». Ne jamais dire oui à tout sans montrer les conséquences.\n\n__Le vrai skill n\'est pas de tout faire, mais de savoir dire non (ou « pas maintenant ») de façon constructive.__ L\'intervieweur veut voir un esprit structuré, pas quelqu\'un qui subit les priorités des autres.',
        
          deepDive: `# Priorisation des demandes concurrentes\\n\\n## Quest-ce que cest\\nLa priorisation consiste a ordonnancer les taches selon leur impact, urgence et dependances. C'est une competence essentielle pour les devs seniors et tech leads.\\n\\n## STAR Framework\\n\\n**Situation:** En tant que tech lead sur une plateforme e-commerce, j'avais 4 demandes simultanees: refonte paiement (client VIP), optim性能 (P0), nouvelle feature marketing (deadline fixe), et bug critiques sur le checkout.\\n\\n**Tache:** Je devais orchestrer l'equipe de 5 devs pour addresser ces priorities dans un sprint de 2 semaines.\\n\\n**Action:**\\n- J'ai utilise la matrice Eisenhower: urgent/important pour evaluer Quickly\\n- J'ai calcule le cout de delai pour chaque demande (COUD)\\n- J'ai negocie avec les parties prenantes pour decaler la feature marketing\\n- J'ai decompose la refonte paiement en jalons deliverable\\n- J'ai priorise le bug checkout immediatement avec un dev dedie\\n\\n**Resultat:** Le bug checkout a ete corrige en 4h. La refonte paiement a progresse de 60%. Les perfs ont ete optimisees de 40%. La feature marketing livree avec 3 jours de retard acceptable.\\n\\n## Bonnes pratiques\\n- Utiliser des frameworks de priorisation (RICE, MoSCoW, Eisenhower)\\n- Calculer le cout de delai (Cost of Delay)\\n- Communiquer transparentement sur les trade-offs\\n- Revoir les priorities regulierement\\n- Impliquer l'equipe dans les decisions\\n\\n## Pieges courants\\n- Prioriser selon le bruit rather than la valeur\\n- Ignorer les dependances entre taches\\n- Négliger la capacite de l'equipe\\n- Resoudre les conflits de priorite seul\\n\\n## Sources\\nhttps://www.atlassian.com/project-management/project-terminology`},
        {
          id: 'beh-12',
          question: 'Comment donnez-vous et recevez-vous du feedback ?',
          answer: '**Donner** : méthode **SBI** (*Situation-Behavior-Impact*) — « Lors du standup (S), tu as coupé la parole à Marie (B), ce qui a coupé la discussion technique (I) ». Être **spécifique**, **factuel**, **timely** (immédiat, pas 3 mois après). Feedback positif aussi — et en **public** si possible.\n\n**Recevoir** : écouter sans se justifier, remercier, poser des questions pour comprendre, décider ce qu\'on en retient. **Séparer** le feedback sur le *travail* du feedback sur la *personne*.\n\n__Un développeur qui ne sait pas recevoir de feedback stagne__ — la capacité d\'amélioration continue repose sur l\'ouverture à la critique constructive. Montrez que vous la *cherchez* activement.',
        
          deepDive: `# Donner et recevoir du feedback\\n\\n## Quest-ce que cest\\nLe feedback est un echange structur pour improve performance et relations professionnelles. Il peut etre positif (reinforcement) ou constructif (amelioration). Maitriser le feedback est essential pour la croissance equipe.\\n\\n## STAR Framework\\n\\n**Situation:** Un dev junior de mon equipe deliverait du code avec des problemes recurrence: nommage incohérent, tests manquants, et reviews incomplete.\\n\\n**Tache:** Je devais addresser ces problemes sans demotiver le dev ni compromettre la qualite du projet.\\n\\n**Action:**\\n- J'ai attendu la fin du sprint pour eviter la surcharge cognitive\\n- J'ai utilise le modele SBI (Situation-Comportement-Impact)\\n- J'ai commence par ce qui fonctionnait bien (progression notable)\\n- J'ai formule des suggestions concretes avec exemples\\n- J'ai propose un pairing hebdomadaire pour renforcer les bonnes pratiques\\n\\n**Resultat:** En 6 semaines, le dev a significativement ameliore son code. Les remarques sont devenues moins frequentes. Le dev m'a dit apprecier la clarte du feedback.\\n\\n## Pour recevoir du feedback:\\n- Ecouter sans defenser immediate\\n- Remercier pour l'input meme si difficile\\n- Poser des questions clarificatrices\\n- Definir un plan d'amélioration concrete\\n- Follow-up lors du prochain 1:1\\n\\n## Bonnes pratiques\\n- Donner du feedback regulier, pas seulement annuel\\n- Etre specifique et factuel\\n- Focaliser sur le comportement, pas la personne\\n- Equilibrer positif et constructif (ratio 3:1 ideal)\\n\\n## Pieges courants\\n- Attendre les annuels reviews\\n- Etre vague ("il faut ameliorer la qualite")\\n- Donner du feedback en public\\n- Prendre le feedback defensivement\\n\\n## Sources\\nhttps://www.atlassian.com/work-management/project-management-advice`},
      ],
    },
  ],
};