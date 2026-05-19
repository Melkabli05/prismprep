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
        },
        {
          id: 'beh-2',
          question: 'Comment parler d\'un échec sans se dévaloriser ?',
          answer: 'Choisissez un **vrai échec** (pas un faux comme « j\'ai trop travaillé »), mais **pas fatal** (pas de licenciement, pas de faute grave). Structure : **fait objectif** → **ce que vous avez appris** → **ce que vous avez changé depuis**.\n\nMontrez la **responsabilité** (pas de « on m\'a mal conseillé ») et la **résilience** (comment vous avez rebondi). L\'évaluateur cherche à savoir si vous êtes **capable d\'introspection** et d\'amélioration continue.\n\n__L\'échec lui-même compte moins que ce que vous en retenez.__ Un bon candidat tire des leçons ; un mauvais candidat minimise ou blame les autres.',
          example: '« J\'ai sous-estimé la complexité d\'une migration BDD, causant 4h de downtime non planifié. J\'ai appris à : 1) toujours faire un dry-run sur staging, 2) préparer un rollback plan, 3) communiquer les risques en amont. Depuis, chaque migration suit un runbook validé par l\'équipe. »',
        },
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
        },
        {
          id: 'beh-4',
          question: 'Comment travaillez-vous avec un manager difficile ?',
          answer: '**Distinguez** « manager au style différent du mien » (adaptation requise) et « manager toxique » (limites à poser). Pour un style différent : **s\'adapter** à sa communication (synthétique vs détaillé, async vs sync), comprendre ses priorités, proposer des solutions plutôt que des problèmes.\n\nPour une situation toxique (micro-management excessif, communication agressive) : **documenter** les faits, **poser des limites** calmement (« je suis plus efficace quand j\'ai de l\'autonomie sur X »), **escalader** auprès de RH si nécessaire.\n\n__L\'intervieweur veut voir que vous êtes professionnel et proactif, pas que vous subissez ou fuyez.__',
        },
        {
          id: 'beh-5',
          question: 'Donnez un exemple où vous avez mené un projet',
          answer: 'Montrez votre **leadership** même sans titre officiel : **initiative** (vous avez identifié le besoin), **planification** (découpage, estimation, délégation), **communication** (reporting aux stakeholders, alignment de l\'équipe), **livraison** (résultat concret).\n\nAccentuez la **délégation** : un bon leader ne fait pas tout lui-même, il *enable* son équipe. Mentionnez comment vous avez géré les imprévus, levé les blocages, et célébré les succès collectifs.\n\n__Ne dites pas « j\'ai tout fait » — dites « j\'ai coordonné, débloqué, et l\'équipe a livré ».__ Le leadership = faciliter le succès des autres.',
          example: '« J\'ai proposé et mené la migration vers Docker : j\'ai créé le plan, délégué le Dockerfile à un collègue motivé, géré les résistances en organisant une démo, et livré en 3 sprints. Résultat : temps d\'onboarding réduit de 2 jours à 30 minutes. »',
        },
        {
          id: 'beh-6',
          question: 'Comment gérez-vous une deadline serrée ?',
          answer: '**Étape 1** : *clarifier* le périmètre — qu\'est-ce qui est *must-have* vs *nice-to-have* ? **Étape 2** : *découper* en tâches atomiques et *prioriser* (P0/P1/P2). **Étape 3** : *communiquer* tôt les risques et les ajustements nécessaires au manager/client.\n\n**Ne sacrifiez jamais la qualité de base** : tests critiques, code review, déploiement propre. Si la deadline est irréaliste : **proposer un plan B** (scope réduit, date décalée, renforts) au lieu de dire oui et livrer de la dette technique.\n\n__Dire « on ne peut pas tout faire » avec un plan priorisé vaut mieux que dire « oui » et livrer n\'importe quoi.__',
        },
        {
          id: 'beh-7',
          question: 'Comment communiquez-vous avec des interlocuteurs non techniques ?',
          answer: '**Adapter le langage** : remplacer le jargon par des analogies concrètes. « Latence de 500ms » → « la page met une demi-seconde à charger, soit 2x plus que la norme ». **Structurer** : contexte → problème → impact business → solution proposée → effort.\n\n**Écouter** leurs contraintes (budget, délais, réglementation) pour proposer des solutions *réalistes*. **Visualiser** : schémas, graphiques, démos valent mieux que 1000 mots techniques.\n\n__Le meilleur développeur technique est inutile s\'il ne sait pas faire comprendre ses idées.__ L\'intervieweur vérifie votre capacité à influencer au-delà de l\'équipe tech.',
        },
        {
          id: 'beh-8',
          question: 'Comment vous adaptez-vous au changement ?',
          answer: 'Donnez un exemple concret : un changement de **stack technique**, de **méthodologie**, de **priorité projet**, ou de **réorganisation d\'équipe**. Montrez les 3 phases : **compréhension** (pourquoi le changement ?), **acceptation** (positiver au lieu de résister), **action** (plan d\'adaptation concret).\n\nUn bon exemple : « Notre stack est passée d\'Angular à React. J\'ai d\'abord compris la décision (standardisation groupe), puis formé l\'équipe avec des workshops, et migré notre premier composant en 2 semaines. »\n\n__L\'adaptabilité est la compétence n°1 en tech__ — les technologies changent, les priorités bougent, les réorganisations arrivent. Montrez que vous *embrassez* le changement au lieu de le subir.',
        },
        {
          id: 'beh-9',
          question: 'Comment mentorisez-vous un développeur junior ?',
          answer: '**Approche progressive** : montrer d\'abord (pair programming), puis guider (code review bienveillante avec explications), enfin déléguer (tâches de plus en plus autonomes).\n\n**Pratiques concrètes** : onboarding structuré (runbook, documentation), **1:1 hebdomadaire** (questions, blocages, progression), *code review* éducative (expliquer le *pourquoi*, pas juste le *quoi*), donner des tâches **stretch** (légèrement au-dessus de leur niveau actuel).\n\n__Le mentorat ne se résume pas à « répondre aux questions »__ — c\'est un investissement actif qui accélère la montée en compétences et renforce l\'équipe. Un bon mentor *écoute* plus qu\'il ne *parle*.',
        },
        {
          id: 'beh-10',
          question: 'Comment gérez-vous des exigences ambiguës ?',
          answer: '**Ne supposez jamais** — *demandez*. Reformulez la demande pour vérifier la compréhension : « Si je résume, vous voulez X avec Y contrainte, c\'est bien ça ? ». **Proposez des options** au lieu de questions ouvertes : « Option A : on fait simple en 1 sprint. Option B : on fait complet en 3 sprints. Vous préférez quoi ? ».\n\nPour un projet flou : commencez par un **MVP** ou un **POC** pour valider la direction, puis itérez. Documentez les hypothèses et les décisions.\n\n__L\'ambiguïté est normale — le problème est de la laisser perdurer.__ Un bon développeur *chasse* l\'ambiguïté en posant les bonnes questions au bon moment.',
        },
        {
          id: 'beh-11',
          question: 'Comment priorisez-vous des demandes concurrentes ?',
          answer: '**Cadre de priorisation** : **impact** (valeur business / nombre d\'utilisateurs touchés) × **urgence** (deadline, dépendance) × **effort** (temps nécessaire). Commencer par les **quick wins** (fort impact, faible effort) et les **urgences bloquantes**.\n\n**Communiquer les trade-offs** : « Je peux faire A ou B cette semaine, pas les deux. Lequel est prioritaire ? ». Ne jamais dire oui à tout sans montrer les conséquences.\n\n__Le vrai skill n\'est pas de tout faire, mais de savoir dire non (ou « pas maintenant ») de façon constructive.__ L\'intervieweur veut voir un esprit structuré, pas quelqu\'un qui subit les priorités des autres.',
        },
        {
          id: 'beh-12',
          question: 'Comment donnez-vous et recevez-vous du feedback ?',
          answer: '**Donner** : méthode **SBI** (*Situation-Behavior-Impact*) — « Lors du standup (S), tu as coupé la parole à Marie (B), ce qui a coupé la discussion technique (I) ». Être **spécifique**, **factuel**, **timely** (immédiat, pas 3 mois après). Feedback positif aussi — et en **public** si possible.\n\n**Recevoir** : écouter sans se justifier, remercier, poser des questions pour comprendre, décider ce qu\'on en retient. **Séparer** le feedback sur le *travail* du feedback sur la *personne*.\n\n__Un développeur qui ne sait pas recevoir de feedback stagne__ — la capacité d\'amélioration continue repose sur l\'ouverture à la critique constructive. Montrez que vous la *cherchez* activement.',
        },
      ],
    },
  ],
};