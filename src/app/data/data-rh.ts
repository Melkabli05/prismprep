import type { InterviewCategory } from '../models/interview.models';

export const rhCategory: InterviewCategory = {
  id: 'rh',
  title: 'Entretien RH',
  color: 'bg-rose-100 text-rose-700',
  description: 'Réussir votre entretien avec les ressources humaines',
  sections: [
    {
      id: 'rh-avant',
      title: "Avant l'Entretien",
      questions: [
        {
          id: 'rh-1',
          question: 'Gérer le stress',
          answer: "Le stress en entretien est normal — la différence, c'est la **préparation**. Plus vous êtes préparé (réponses, entreprise, exemples), moins vous êtes stressé. Le stress vient de *l'inconnu* : balayez ces incertitudes en préparant sérieux. Faites des simulations avec des proches pour dédramatiser.",
        },
        {
          id: 'rh-2',
          question: 'Justifiez vos compétences avec des exemples',
          answer: "Chaque compétence doit être appuyée par un **exemple concret et chiffré**. Dire « j'ai géré une équipe » est vague ; préférez « j'ai géré **5 développeurs** sur un projet de **6 mois**, budget **200k€** ». C'est la méthode **STAR** : *Situation, Tâche, Action, Résultat*. __Plus vous êtes précis, plus vous êtes crédible.__",
        },
        {
          id: 'rh-3',
          question: 'Présentez-vous efficacement',
          answer: "Présentez-vous en **2 à 3 minutes maximum**, structuré en trois temps : **parcours**, **compétences clés**, **pourquoi vous êtes ici**. Exemple : « BTS puis licence en informatique, **2 ans** chez X sur des `APIs REST`, et votre projet microservices correspond à mon objectif. » Gardez les détails pour les questions suivantes — l'objectif est de *donner envie d'en savoir plus*.",
        },
        {
          id: 'rh-23',
          question: 'Se renseigner sur l\'entreprise',
          answer: "Avant l'entretien, étudiez le **site web**, les **réseaux sociaux**, les **actualités récentes** et la **culture d'entreprise**. Connaître leurs produits, leurs concurrents et leurs défis actuels vous permet de personnaliser vos réponses et de poser des questions pertinentes.\n\nCiter une actualité ou un projet spécifique de l'entreprise prouve votre **intérêt authentique**. __Un candidat informé se démarque immédiatement.__",
        },
        {
          id: 'rh-24',
          question: 'Préparer ses questions à l\'avance',
          answer: "Arrivez avec **3 à 5 questions préparées** sur le poste, l'équipe, les technologies, la culture et les perspectives d'évolution. Des questions maladroites ou l'absence de questions donnent l'impression d'un désintérêt.\n\nAdaptez vos questions au recruteur : techniques avec le lead dev, organisationnelles avec le manager, culturelles avec les RH. __Poser de bonnes questions est aussi important que donner de bonnes réponses.__",
        },
      ],
    },
    {
      id: 'rh-pendant',
      title: "Pendant l'Entretien",
      questions: [
        {
          id: 'rh-4',
          question: 'Votre comportement et votre sourire',
          answer: "Le **langage corporel** parle avant vous — les **7 premières secondes** sont déterminantes. Un sourire sincère, une poignée de main ferme et une posture ouverte envoient un signal positif immédiat. Soyez *naturel*, pas forcé : montrez que vous êtes content d'être là avec enthousiasme. __Un bon premier contact met le recruteur en confiance.__",
        },
        {
          id: 'rh-5',
          question: 'Gérez les questions surprises',
          answer: "Prenez **2 à 3 secondes** pour respirer et structurer votre réponse avant de parler. Un silence court vaut mieux qu'une réponse précipitée. Reformuler la question à voix haute vous donne du temps et prouve votre compréhension. __Mieux vaut répondre juste que répondre vite.__",
        },
        {
          id: 'rh-6',
          question: 'Temps de réponse',
          answer: "Réfléchir avant de répondre est une **preuve de maturité**, pas de faiblesse. Une réponse posée vaut toujours mieux qu'une réponse précipitée qui part dans tous les sens. Prenez le temps de digérer la question et de structurer votre pensée. __Mieux vaut répondre juste que répondre vite.__",
        },
        {
          id: 'rh-7',
          question: 'Créer une relation avec le recruteur',
          answer: "Un entretien est un **échange**, pas un interrogatoire. Posez des questions sur le poste, l'équipe et les projets en cours pour montrer votre intérêt actif. Mieux encore : prouvez que vous avez fait vos recherches sur l'entreprise (« J'ai vu que vous venez de lancer tel produit »). __Transformez l'entretien en véritable dialogue.__",
        },
        {
          id: 'rh-8',
          question: 'Présentez bien votre personnalité',
          answer: "Soyez **authentique** — les recruteurs détectent vite les rôles joués. Présentez la meilleure version de vous-même en restant vous-même : montrez vos passions et ce qui vous anime. Si vous êtes curieux, illustrez-le avec un exemple concret. __Les recruteurs cherchent des personnes avec qui travailler, pas des robots.__",
        },
        {
          id: 'rh-9',
          question: 'Expliquez clairement vos idées',
          answer: "La **clarté** de votre discours est aussi importante que son contenu. Allez droit au but avec des termes simples et accessibles — un recruteur RH qui ne comprend pas perd intérêt vite. Pour un concept complexe, utilisez une *analogie* ou un exemple concret. __Savoir simplifier preuve que vous maîtrisez votre sujet.__",
        },
        {
          id: 'rh-10',
          question: 'Restez calme et sûr de vous',
          answer: "La **confiance** vient de la **préparation** : si vous connaissez vos réponses, l'entreprise et vos exemples, vous êtes naturellement serein. Être confiant ne signifie pas être arrogant — assumez vos compétences sans vous vanter, reconnaissez vos axes d'amélioration sans vous dévaloriser. __Si vous êtes prêt, vous êtes confiant.__",
        },
        {
          id: 'rh-25',
          question: 'Parler d\'un échec ou d\'une erreur',
          answer: "Le recruteur évalue votre **capacité à rebondir**, pas l'échec lui-même. Structurez votre réponse : **contexte** → **ce qui s'est mal passé** → **ce que vous avez appris** → **ce que vous feriez différemment**.\n\nL'important est de montrer une **démarche d'amélioration** : « J'ai raté une deadline car j'avais sous-estimé la complexité. Depuis, je décompose les tâches et ajoute une marge de sécurité. » __Un échec bien vaut mieux qu'un succès banal.__",
        },
        {
          id: 'rh-26',
          question: 'Posture en visioconférence',
          answer: "En visio, le **cadre** compte autant qu'en présentiel : caméra à hauteur des yeux, fond neutre et éclairage de face. Regardez la **caméra** (pas l'écran) quand vous parlez — cela simule le contact visuel.\n\nÉvitez les distractions visibles (téléphone, onglets ouverts). Testez votre matériel avant : son, image, connexion. __La visio n'excuse pas un manque de professionnalisme.__",
        },
      ],
    },
    {
      id: 'rh-questions',
      title: 'Questions Courantes',
      questions: [
        {
          id: 'rh-11',
          question: 'Présentez-vous',
          answer: "Structurez votre réponse en **trois temps** : **parcours scolaire**, **expériences professionnelles**, **compétences clés**. L'approche moderne commence par remercier et exprimer votre enthousiasme avant d'enchaîner synthétiquement. Ne dépassez pas **2 à 3 minutes** — l'objectif est de *donner envie d'en savoir plus*. __Préparez et répêtez cette réponse en l'adaptant au poste visé.__",
        },
        {
          id: 'rh-12',
          question: 'Questions sur vos expériences',
          answer: "Couvrez **trois angles** : le **personnel** (valeurs, éthique de travail, motivations), le **professionnel** (exemples concrets et chiffrés : `Scrum`, collaboration, résolution de problèmes), et le **bilan** (ce que vous avez appris, comment vous avez évolué). Les recruteurs veulent comprendre *comment vous avez grandi*, pas juste ce que vous avez fait. Structure gagnante : **personnel → pro → bilan**.",
        },
        {
          id: 'rh-13',
          question: 'Pourquoi ce rôle ?',
          answer: "Activez **deux leviers** : les **valeurs de l'entreprise** (si elles résonnent avec vous, expliquez pourquoi) et les **contacts avec ses employés** (salon, `LinkedIn`, alumni). Cela prouve une démarche proactive et un intérêt concret. __Le recruteur veut vérifier que votre choix est réfléchi, pas une candidature envoyée à 50 entreprises.__",
        },
        {
          id: 'rh-14',
          question: 'Où vous voyez-vous dans 5 ans ?',
          answer: "Montrez une **vision d'évolution** cohérente avec le poste visé. Exemple : « Dans 5 ans, je me vois **leader technique** avec des responsabilités architecturales et d'encadrement, tout en continuant à coder. Je veux approfondir le cloud computing, notamment `AWS`. » Soyez *ambitieux mais réaliste*, avec un plan compatible avec les perspectives de l'entreprise.",
        },
        {
          id: 'rh-15',
          question: 'Projet marquant ?',
          answer: "Le système de communication inter-systèmes **Preum** intégré pour le programme **Brésil** : il permet aux forces de l'ordre de rechercher des personnes dans les bases de données d'un pays voisin quand la recherche locale échoue. J'ai intégré ce système pour le Brésil afin qu'il communique avec le Mexique, en m'appuyant sur l'implémentation existante en Roumanie. Ce projet m'a appris **l'intégration de systèmes complexes** et la **gestion des contraintes de sécurité** sur des données sensibles.",
        },
        {
          id: 'rh-16',
          question: 'Qualités et défauts ?',
          answer: "**Qualités** : organisé et méthodique, bonne capacité d'analyse, travail en équipe efficace même à distance.\n\n**Défauts** : tendance à vouloir tout faire en même temps — je corrige avec la **matrice d'Eisenhower** pour gérer les priorités. Autre point : je fonce parfois trop vite sans prendre assez de recul.\n\n__L'important est de montrer une conscience de soi et une démarche d'amélioration continue.__",
        },
        {
          id: 'rh-17',
          question: 'Pourquoi vous et pas les autres ?',
          answer: "Combinez **trois éléments** : votre **expérience technique** appliquée au poste (« Votre équipe travaille sur les microservices, j'ai déjà migré un monolithe vers cette architecture »), vos **soft skills** (communication, travail en équipe, gestion de la pression), et votre **motivation spécifique** pour cette entreprise — pas de réponse générique. __Personnalisez pour rendre votre réponse unique et mémorable.__",
        },
        {
          id: 'rh-18',
          question: 'Passer à une autre langue',
          answer: "Préparez à l'avance une anecdote simple et structurée dans la langue demandée. Le recruteur évalue votre **aisance** et **capacité à communiquer**, pas votre niveau académique. Si vous hésitez sur un mot, reformulez ou utilisez des synonymes — *la fluidité et la confiance priment*. __Montrez que la langue n'est pas un obstacle.__",
        },
        {
          id: 'rh-27',
          question: 'Négocier son salaire',
          answer: "Renseignez-vous sur les **fourchettes du marché** avant l'entretien (`Glassdoor`, `LinkedIn Salary`, cabinets de recrutement). Ne donnez jamais un chiffre en premier si possible — retournez la question : « Quel est le budget prévu pour ce poste ? »\n\nSi vous devez avancer un chiffre, donnez une **fourchette haute** (« Entre X et Y ») où X est votre minimum acceptable. Justifiez par la **valeur apportée**, pas par vos besoins personnels. __La négociation est un échange, pas un affrontement.__",
        },
        {
          id: 'rh-28',
          question: 'Pourquoi quitter votre poste actuel ?',
          answer: "Restez **positif** — ne critiquez jamais votre employeur actuel. Formulez en termes d'**aspiration** plutôt que de fuite : « Je cherche de nouveaux défis techniques » plutôt que « Je m'ennuie ».\n\nFocus sur ce qui vous attire dans le **nouveau poste**, pas ce qui vous déplaît dans l'ancien. Si on insiste : « L'entreprise se recentre sur X, alors que je veux approfondir Y. » __Tournez toujours la page vers l'avenir.__",
        },
        {
          id: 'rh-29',
          question: 'Disponibilité et télétravail',
          answer: "Soyez **clair et honnête** sur vos contraintes. Pour le télétravail, montrez que vous avez déjà prouvé votre **autonomie** à distance avec des résultats concrets.\n\nPréférez le dialogue : « Je suis à l'aise en présentiel et en remote, quel est l'organisation de l'équipe ? » plutôt qu'une exigence ferme. Le télétravail est un sujet de **négociation** — abordez-le avec ouverture. __La flexibilité est un atout, la rigidité un frein.__",
        },
      ],
    },
    {
      id: 'rh-qp',
      title: 'Questions à Poser au Recruteur',
      questions: [
        {
          id: 'rh-19',
          question: 'Vous proposez des formations ?',
          answer: "Poser cette question montre votre **vision à long terme** et votre **volonté de progresser**. Les entreprises qui investissent dans la formation retiennent mieux leurs talents. C'est aussi une façon d'évaluer si l'entreprise accompagnera votre développement professionnel. __Une question qui montre motivation et ambition tout en vous informant sur la culture d'entreprise.__",
        },
        {
          id: 'rh-20',
          question: 'Stage de 6 ou 8 mois ?',
          answer: "Poser cette question preuve que vous **planifiez déjà votre intégration** et que vous êtes *flexible*. La durée du stage impacte le type de missions : **8 mois** permettent d'aller plus loin dans un projet que **6 mois**. C'est une question pratique qui montre votre sens de l'organisation et votre implication.",
        },
        {
          id: 'rh-21',
          question: "Quelle est l'étape suivante ?",
          answer: "__Posez toujours cette question en fin d'entretien__ : elle montre votre implication et votre côté proactif. Concrètement, elle vous informe sur la suite du processus (autre tour, test technique, délai de retour). C'est important pour ne pas rester dans l'incertitude et prouver que vous prenez votre candidature au sérieux.",
        },
        {
          id: 'rh-22',
          question: 'Votre impression de cet entretien ?',
          answer: "Demander un **feedback** montre votre **ouverture à la critique constructive** et votre volonté de vous améliorer. Posez la question avec un ton *positif et non défensif*. Même un retour négatif est une info précieuse pour vos prochains entretiens. __C'est une question qui reflète votre maturité professionnelle.__",
        },
        {
          id: 'rh-30',
          question: 'Relance après l\'entretien',
          answer: "Envoyez un **email de remerciement** dans les 24h : remerciez, rappelez votre intérêt et ajoutez une info pertinente oubliée pendant l'entretien.\n\nSi pas de réponse après le délai annoncé, relancez **une fois** avec courtoisie. La relance montre votre **persistance** et votre sérieux. __Ne jamais harceler, mais ne jamais rester passif non plus.__",
        },
      ],
    },
  ],
};