import type { InterviewCategory } from '../../../../core/models/interview.models';

export const rhCategory: InterviewCategory = {
  id: 'rh',
  title: 'Entretien RH',
  color: 'background: var(--color-error); color: white',
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
        
          deepDive: `# Gerer le Stress

## Quest-ce que cest

Les entretiens veulent evaluer votre capacite a rester efficace sous pression. Ils cherchent a comprendre vos strategies de gestion du stress, pas a savoir si vous en ressentez.

## Reponses

**Methode STAR:**
- **Situation**: Decrivez un contexte charge (deadline serree, multiple projets simultanes).
- **Tache**: Quelle etait votre responsabilite specifique?
- **Action**: Comment avez-vous priorise? Comment avez-vous communique?
- **Resultat**: Quel fut le denouement? Quel apprentisage?

**Exemple STAR:**
> "Lors dun projet critique (S), jai eu 3 livrables simultanes pour un client enterprise. Je devais deliver dans la semaine (T). Jai decompose chaque tache en sous-taches de 2h max, communique regulierement avec le chef de projet sur les bloquants, et dellegue les tests unitaires a un collegue (A). Le client a valide les 3 livrables dans les delais, et jai ete promo au role de tech lead sur le projet suivant (R)."

**Framework additionnel:**
- **Prevention**: Comment vous organisez-vous pour eviter le stress? (bloc-notes, daily standups, priorisation)
- **Signaux daggravation**: A quel moment vous rendez-vous compte que le stress augmente?
- **Techniques**: Respiration, sport, delegation, dire non

## Pieges courants

- Nier tout stress: "Je ne ressens jamais de stress" sonne faux. Vous ETES humain.
- Se concentrer sur le negatif: Decrivez le stress mais accentuez les solutions.
- Blamer les autres: Responsabilisez-vous dans la gestion.
- Oublier lequipe: Montrer comment vous avez soutenu vos collegues compte autant.

Source : [Glassdoor - Handling Stress Questions](https://www.glassdoor.com/career-advice/)`},
        {
          id: 'rh-2',
          question: 'Justifiez vos compétences avec des exemples',
          answer: "Chaque compétence doit être appuyée par un **exemple concret et chiffré**. Dire « j'ai géré une équipe » est vague ; préférez « j'ai géré **5 développeurs** sur un projet de **6 mois**, budget **200k€** ». C'est la méthode **STAR** : *Situation, Tâche, Action, Résultat*. __Plus vous êtes précis, plus vous êtes crédible.__",
        
          deepDive: `# Justifiez vos competences avec des exemples

## Quest-ce que cest

Les recruteurs ne croient pas aux declarations. Ils veulent des preuves concretes de vos competences techniques et transversales.

## Reponses

**Methode STAR appliquee:**
- Selectionnez des experiences pertinentes pour chaque competence declaree.
- Concentrez-vous sur les resultats mesurables.
- Preparation prealable: identifiez 3-5 stories pour differentes competencies.

**Exemple de competence technique:**
> "Vous mentionnez expertise en React. Sur mon projet recent (S), nous avions une application AngularJS legacy qui souffrait de temps de rendu lents. Je ai propose et implémenté une migration progressive vers React avec une architecture de micro-frontends (T). Jai personnellement migré les 5 composants principaux, forme 3 autres devs, et mis en place une library de composants partages (A). Le resultat: reduction de 40 pour cent du temps de chargement initial et amelioration du score Lighthouse de 45 a 85 (R)."

**Exemple de competence transversale:**
> "Sur le leadership (S), jai eu loccasion de coordonner une equipe de 4 devs sur un projet deadline. Jai organise des daily standups, delegue les taches selon les forces de chacun, et maintenu la motivation par descode reviews constructifs (A). Nous avons delivered dans les temps avec 0 bug en production (R)."

## Pieges courants

- Etre vague: Pas "jesuis bon en JS" mais "jai utilise JS pour..."
- Ngliger les details: Trop general tue la credibilite.
- Stories invented: Elles doivent etre vraies et vérifiables.
- Focus uniquement sur les succès: Les lecons apprises montrent la profondeur.

Source : [Harvard Business Review - Competency-Based Questions](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-3',
          question: 'Présentez-vous efficacement',
          answer: "Présentez-vous en **2 à 3 minutes maximum**, structuré en trois temps : **parcours**, **compétences clés**, **pourquoi vous êtes ici**. Exemple : « BTS puis licence en informatique, **2 ans** chez X sur des `APIs REST`, et votre projet microservices correspond à mon objectif. » Gardez les détails pour les questions suivantes — l'objectif est de *donner envie d'en savoir plus*.",
        
          deepDive: `# Presentez-vous efficacement

## Quest-ce que cest

Cest souvent la premiere question et elle fixe le ton de lentretien. En 2-3 minutes, vous devez donner une vision claire de qui vous etes professionnellement.

## Reponses

**Structure recommandee (elevator pitch):**
1. **Actuel** (30 secondes): Poste actuel, entreprise, specialite.
2. **Parcours** (1 minute): Etapes cles, decisions de carriere.
3. **Accomplissements** (30 secondes): 2-3 realisations quantifiables.
4. **Cible** (30 secondes): Pourquoi ce poste, cette entreprise.

**Exemple:**
> "Je suis developpeur full-stack depuis 6 ans, actuellement chez Entreprise ou je lead une equipe de 5 sur une app React/Node (Actuel). Jai debute en startup ou jai appris a porter un produit de 0 a 1, puis jai rejoint GrandeBoite ou jai scale un systeme a 1M utilisateurs (Parcours). Maplus belle reussite: refondre une API qui a reduit les temps de reponse de 80 pour cent (Accomplissements). Je cherche maintenant un poste ou je pourrais approfondir larchitecture cloud-native, et votre focus sur tech me mintrigue (Cible)."

## Pieges courants

- Reciter votre CV: Respirez la passion, pas la liste.
- Etre trop long: 3 minutes max.
- Mentions personnelles inutiles: Restez professionnel.
- Oublier le lien avec le poste: Connectez votre histoire au role.
- Ton monoton: Variez votre inflexion.

Source : [The Muse - Elevator Pitch](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-23',
          question: 'Se renseigner sur l\'entreprise',
          answer: "Avant l'entretien, étudiez le **site web**, les **réseaux sociaux**, les **actualités récentes** et la **culture d'entreprise**. Connaître leurs produits, leurs concurrents et leurs défis actuels vous permet de personnaliser vos réponses et de poser des questions pertinentes.\n\nCiter une actualité ou un projet spécifique de l'entreprise prouve votre **intérêt authentique**. __Un candidat informé se démarque immédiatement.__",
        
          deepDive: `# Se renseigner sur lentreprise

## Quest-ce que cest

Les entretiens testent si vous avez fait vos devoirs. Arriver sans connaissance de lentreprise montre un manque dinteret. Cette question evalue votre curiosity et votre serieux.

## Reponses

**Framework de recherche:**
1. **Site corporate**: Mission, valeurs, produits.
2. **LinkedIn**: Taille, croissance, culture.
3. **Glassdoor**: Avis employees, salaire, processus.
4. **Presse**: Articles recents, funding, launches.
5. **Tech blog**: Si present, montrez que vous avez lu.

**Ce quil faut savoir:**
- Chiffre daffaires, nombre demployes, localisation des bureaux.
- Produits ou services principaux.
- Culture de lentreprise (startup vs corporate).
- Defis actuels ou recent changes.
- Technologies utilisees (reveale par les job descriptions).

**Exemple de ce quil faut dire:**
> "Jesuis impressionne par la trajectoire de croissance de votre entreprise. Vous avez triple votre base client en 18 mois tout en maintenant un NPS de 70. Votre approche technique basee sur les retours utilisateurs resonne avec ma philosophie de produit."

## Pieges courants

- Arriver sans rien savoir: Questionable.
- Mentir sur ce que vous avez lu: Vous serez decouvre.
- Ne parler que du salaire: Montrez un interet pour la mission.
- Oublier de-linked-in: Les recruteurs verifient si vous avez cherche.

Source : [The Muse - Company Research](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-24',
          question: 'Préparer ses questions à l\'avance',
          answer: "Arrivez avec **3 à 5 questions préparées** sur le poste, l'équipe, les technologies, la culture et les perspectives d'évolution. Des questions maladroites ou l'absence de questions donnent l'impression d'un désintérêt.\n\nAdaptez vos questions au recruteur : techniques avec le lead dev, organisationnelles avec le manager, culturelles avec les RH. __Poser de bonnes questions est aussi important que donner de bonnes réponses.__",
        
          deepDive: `# Preparer ses questions a lavance

## Quest-ce que cest

Avoir des questions montre votre interet et votre reflexion. Les entretiens sont une rue a double sens: vous evaluez aussi lentreprise.

## Reponses

**Types de questions a preparer:**

**Sur le poste:**
- "Quelle est la journee type dun developpeur ici?"
- "Quels sont les defis techniques majeurs de lequipe?"
- "Comment mesurez-vous le succes dans ce role?"

**Sur la culture:**
- "Comment decririez-vous la culture technique?"
- "Quest-ce qui vous a decide a rejoindre lentreprise?"
- "Comment fonctionne la collaboration entre teams?"

**Sur la croissance:**
- "Quelles opportunites de developpement professionnel?"
- "Comment sont structurees les carrieres techniques?"
- "Pouvez-vous me donner un exemple de promotion recente?"

**Exemple:**
> "jai trois questions. Premiere: comment evaluez-vous le fit culturel pendant le recrutement? Deuxieme: quel est le plus grand defi technique sur lequel lequipe travaille? Troisieme: comment sont decidees les priorites de produit?"

## Pieges courants

- Ne pas avoir de questions: Paraît desinteresse.
- Poser des questions dont la reponse est sur le site: Parait paresseux.
- Interrompre: Laissez le recruteur finir avant de poser vos questions.
- Poser que des questions salaries/avantages: Attendez une offre.

Source : [Harvard Business Review - Questions to Ask](https://hbr.org/2023/01/the-art-of-the-interview)`},
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
        
          deepDive: `# Votre comportement et votre sourire

## Quest-ce que cest

Les premiers minutes de lentretien sont critiques. Les recruteurs font des jugementements rapides bases sur la premiere impression (sourire, posture, handshake).

## Reponses

**Framework des premieres secondes:**
- **Regard**: Contactez visuellement, souriez.
- **Poignee de main**: Firm but not crushing.
- **Posture**: Droite, ouverte, lean-in leger.
- **Voix**: Claire, ton interesse.

**Exemple STAR:**
> "Sur mon dernier entretien en personne (S), je suis arrive 10 minutes en avance, jaileve ma blouse, et me suis presente au receptionist avec un sourire naturel (T). Quand le recruteur est venu me chercher, je me suis leve avec une posture droite, la main tendue, et jaietabli un contact visuel chaleureux (A). Le recruteur ma ensuite dit que javais les meilleures premieres minutes quil ait vue (R)."

**Preparation clef:**
- Prectisez le handshake avec un ami.
- Souriez dans le miroir (pas forcé).
- Respirez profondément avant dentrer.
- Preparez unopening line positif.

## Pieges courants

- Etre trop nerveux: Respiration profonde.
- Handshake mou ou trop fort: Practice.
- Eviter le regard: Contact visuel, pas stare.
- Etre fige: Beweging, pas de tree.

Source : [Forbes - First Impression](https://www.forbes.com/careers/)`},
        {
          id: 'rh-5',
          question: 'Gérez les questions surprises',
          answer: "Prenez **2 à 3 secondes** pour respirer et structurer votre réponse avant de parler. Un silence court vaut mieux qu'une réponse précipitée. Reformuler la question à voix haute vous donne du temps et prouve votre compréhension. __Mieux vaut répondre juste que répondre vite.__",
        
          deepDive: `# Gerer les questions surprises

## Quest-ce que cest

Les questions inattendues testent votre capacite a reflechir sur vos pieds, votre creativite, et votre capacite a gerer linattendu. Les pire sont les questions techniques surchauffe.

## Reponses

**Framework pour les questions difficiles:**
1. **Acknowledge**: "Bonne question, laisse-moi reflechir."
2. **Structure**: Donnez une structure (1, 2, 3).
3. **Partial answer**: Meme incomplet, montrez votre raisonnement.
4. **Honesty**: Si vous ne savez pas, dites-le.

**Methode STAR pour questions comportementales surprise:**
> "Pouvez-vous me decrire un scenario ou vous avez du influencer sans autorite?" (S) Un projet cross-fonctionnel ou je devais convaincre 3 teams differentes (T). Jai organise des sessions individuelles pour comprendre leurs contraintes, puis propose une roadmap commune basee sur des objectifs partages (A). Le projet a ete delivered 2 semaines en avance et le manager a salute mon initiative (R)."

**Preparation:**
- Revoyez vos experiences avec la methode STAR.
- Preparez 5 stories diferentes pour differents themes.
- Pratiquez avec un ami qui pose des questions aleatoires.

## Pieges courants

- Dire "je ne sais pas" sans suite: Au moins hazardez une reponse.
- Mentir: Les intervieweurs detectent rapidement.
- Rester silencieux: Le silence est votre ennemi.
- Etre sur la defensive: Prenez les questions comme des opportunites.

Source : [Harvard Business Review - Curveball Questions](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-6',
          question: 'Temps de réponse',
          answer: "Réfléchir avant de répondre est une **preuve de maturité**, pas de faiblesse. Une réponse posée vaut toujours mieux qu'une réponse précipitée qui part dans tous les sens. Prenez le temps de digérer la question et de structurer votre pensée. __Mieux vaut répondre juste que répondre vite.__",
        
          deepDive: `# Temps de reponse

## Quest-ce que cest

Les recruteurs observent comment vous prenez le temps de reflechir avant depondre. Une pause nest pas un probleme, elle montre de la reflexion.

## Reponses

**Techniques pour bien repondre:**
- **Pause intentionnelle**: 2-3 secondes avant de commencer.
- **Reformulation**: "Donc si je comprends bien..." pour gagner du temps.
- **Structure**: "Je vais répondre en 3 points."
- **Water sip**: Une gorgée deeau peut calmer les nerfs.

**Exemple de gestion du temps:**
> "Cest une excellente question. Laissez-moi une seconde pour structurer ma pensee." [pause] "Je vais répondre en 3 parties: le contexte, mon approche, et le resultat."

**Pour les questions techniques:**
- Re化之ez le probleme a voix haute.
- Discutez de votre raisonnement a haute voix.
- Si bloque, demontrez ce que vous savez deja.

## Pieges courants

- Repondre trop vite: Vous pouvez dire des betises.
- Rester trop longtemps silencieux: Un "bonne question" peut remplir le vide.
- Mentir pour impressionner: Vous serez decouvert.
- Ne pas preparer dopening line: Vous devez pouvoir commencer.

Source : [The Muse - Thinking Time](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-7',
          question: 'Créer une relation avec le recruteur',
          answer: "Un entretien est un **échange**, pas un interrogatoire. Posez des questions sur le poste, l'équipe et les projets en cours pour montrer votre intérêt actif. Mieux encore : prouvez que vous avez fait vos recherches sur l'entreprise (« J'ai vu que vous venez de lancer tel produit »). __Transformez l'entretien en véritable dialogue.__",
        
          deepDive: `# Creer une relation avec le recruteur

## Quest-ce que cest

Les entretiens sont humains avant tout. Un recruteur qui vous aime sera plus enclin a vous推荐 ou a négocier en votre faveur.

## Reponses

**Framework rapport-building:**
- **Authenticite**: Etre vous-même, pas un personnage.
- **Interet sincere**: Posez des questions sur leur parcours.
- **Valeurs partagees**: Trouvez des points communs.
- **Professionalisme**: Respectez leur temps et leur processus.

**Exemple dopening:**
> "Avant de commencer, jai une question. Je vois sur votre profil que vous avez passe 5 ans dans le secteur FinTech. Quest-ce qui vous a amene a rejoindre cette entreprise?"

**Techniques pour construire le rapport:**
- Mentionnez quelque chose de personnel dans leur parcours.
- Souriez naturellement et mantenir un ton chaleureux.
- Demontrer de lhumour quandappropriate.
- Find common ground (ville, ecole, interets).

## Pieges courants

- Etre trop formel: Le professionnalisme nexclude pas la chaleur humaine.
- Etre trop familier: Restez professionnel.
- Manipuler: Les gens detectent when its fake.
- Oublier que cest双向: Vous evaluez aussi lentreprise.

Source : [The Muse - Building Rapport](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-8',
          question: 'Présentez bien votre personnalité',
          answer: "Soyez **authentique** — les recruteurs détectent vite les rôles joués. Présentez la meilleure version de vous-même en restant vous-même : montrez vos passions et ce qui vous anime. Si vous êtes curieux, illustrez-le avec un exemple concret. __Les recruteurs cherchent des personnes avec qui travailler, pas des robots.__",
        
          deepDive: `# Presentez bien votre personnalite

## Quest-ce que cest

Les entreprises ne recrutent pas que des competences. Elles recrutent des personnes qui vont sintegrer a l-equipe et contribuer a la culture.

## Reponses

**Framework pour montrer sa personnalite:**
- **Authenticite**: Ne jouez pas un r-le.
- **Professionalisme**: Certain traits sont plus valorises.
- **Exemples**: Des histoires qui illustrent who you are.

**Qualites a demontrer:**
- Passion pour le metier.
- Curiosite intellectuality.
- Sens de lhumour.
- Intelligence emotionnelle.
- Adaptabilite.

**Exemple STAR:**
> "Je suis quelquun de curieux (S). Quand je ne comprends pas quelque chose, je ne peux pas laisser tomber. Lannee derniere, je me suis auto-forme au machine learning sur mes weekend pour mieux comprendre les recommendations de notre produit (T). Jai contribue a deux features ML qui ont ameliore la retention de 8 pour cent (A/R). Cette curiosite me pousse a rester a jour sur les tendances tech."

## Pieges courants

- Etre generique: "Jesuis quelquun de sympas" npporte rien.
- Over-sharing: Gardez le professionnel.
- Etre arrogant: La confiance sans arrogance.
- Paraître inautenthique: Les intervieweurs sentainent le fake.

Source : [Glassdoor - Showing Personality](https://www.glassdoor.com/career-advice/)`},
        {
          id: 'rh-9',
          question: 'Expliquez clairement vos idées',
          answer: "La **clarté** de votre discours est aussi importante que son contenu. Allez droit au but avec des termes simples et accessibles — un recruteur RH qui ne comprend pas perd intérêt vite. Pour un concept complexe, utilisez une *analogie* ou un exemple concret. __Savoir simplifier preuve que vous maîtrisez votre sujet.__",
        
          deepDive: `# Expliquez clairement vos idees

## Quest-ce que cest

La capacite a communiquer des idees complexes simplement est une competence rare et tres valorisee. Les entretiens testent cela directement.

## Reponses

**Framework pour expliquer clairement:**
1. **Context**: Donnez le strict necessary background.
2. **Structure**: 1, 2, 3 ou Debut/Milieu/Fin.
3. **Simplicite**: Avoid jargon when possible.
4. **Visual**: Decrivez les diagrammes ou concepts visuellement.
5. **Confirm**: "Est-ce que je suis assez clair?"

**Exemple STAR:**
> "Sur mon poste precedent (S), javais a presenter une refonte darchitecture compliquee a des stakeholders non-techniques (T). Jai commence par un analogue simple: si larchitecture actuelle etait une maison, la nouvelle serait un immeuble avec des appartements independants (A). Javais prepare un schema avec des icones simples. A la fin, meme le CFO a compris et approve le budget (R)."

**Techniques cles:**
- Analogie avec quelque chose de quotidien.
- Schema ou dessin sur papier.
- Pas de jargon technique pour public non-technique.
- Check for understanding.

## Pieges courants

- Etre trop technique: Adaptez au public.
- Sauter le contexte: Vous perdez votre audiance.
- Etre trop simpliste: Trouvez le juste milieu.
- Ne pas verifier la comprehension: Demandez si clair.

Source : [Harvard Business Review - Communicating Clearly](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-10',
          question: 'Restez calme et sûr de vous',
          answer: "La **confiance** vient de la **préparation** : si vous connaissez vos réponses, l'entreprise et vos exemples, vous êtes naturellement serein. Être confiant ne signifie pas être arrogant — assumez vos compétences sans vous vanter, reconnaissez vos axes d'amélioration sans vous dévaloriser. __Si vous êtes prêt, vous êtes confiant.__",
        
          deepDive: `# Rester Calme et Sur de Soi

## Quest-ce que cest

Les recruteurs evaluent votre confiance sans arrogance. Ils veulent voir que vous pouvez maintenir votre sang-froid dans des situations tendues, incluant des entretiens nerveux ou des questions difficiles.

## Reponses

**Methode STAR:**
- **Situation**: Entretien tendu, question inattendue, desaccord avec un pair.
- **Tache**: Garder le controle, demontrer votre competence.
- **Action**: Techniques de respiration, pause avant de repondre, reformulation.
- **Resultat**: Resolution positive, lecon apprise.

**Techniques concretes:**
- **Pause intentionnelle**: Prenez 2-3 secondes avant de repondre. Vous semblez reflechi, pas stresse.
- **Reformulation**: "Donc si je comprends bien, vous voulez savoir..." Gagnez du temps et montrez que vous ecoutez.
- **Respiration**: 4 secondes inspiration, 4 secondes expiration avant de commencer.
- **Posture**: Epaules en arriere, regard stable, sourire leger.

**Exemple STAR:**
> "En presentation client (S), le directeur IT ma pose une question technique piegeante sur la securite. Jai dabord pris une pause de 3 secondes, reconnu que ctait une bonne question, puis propose deettelhir notre approche (T). Jai structure ma reponse en 3 points, maintenu le contact visuel, et conclu par une demonstration live (A). Le directeur a hocht la tete et le contrat a ete signe (R)."

## Pieges courants

- Parler trop vite: Ralentissez consciemment.
- Eviter le contact visuel: Regardez le recruteur, pas vos pieds.
- Mentir sur son stress: Admettez la nervosite avec grace ("Je suis content detre ici").
- Reagir defensivement: Prenez les questions difficiles comme des opportunites, pas des attaques.

Source : [Forbes - Interview Confidence](https://www.forbes.com/careers/)`},
        {
          id: 'rh-25',
          question: 'Parler d\'un échec ou d\'une erreur',
          answer: "Le recruteur évalue votre **capacité à rebondir**, pas l'échec lui-même. Structurez votre réponse : **contexte** → **ce qui s'est mal passé** → **ce que vous avez appris** → **ce que vous feriez différemment**.\n\nL'important est de montrer une **démarche d'amélioration** : « J'ai raté une deadline car j'avais sous-estimé la complexité. Depuis, je décompose les tâches et ajoute une marge de sécurité. » __Un échec bien vaut mieux qu'un succès banal.__",
        
          deepDive: `# Parler dun echec ou dune erreur

## Quest-ce que cest

Les recruteurs posent cette question pour evaluer votre honnetete, votre capacite a apprendre, et votre intelligence emotionnelle. Les echecs font partie du parcours.

## Reponses

**Methode STAR appliquee aux echecs:**

**Exemple STAR:**
> "Sur un projet precedent (S), jai decide de refondre entierement une bibliotheque interne sans consulter lquipe au prealable. Javais identifie des problemes de performance et javais une solution elegante (T). Jai implemente la refonte en 2 semaines sans demander de feedback intermediate (A). Le resultat fut un code plus rapide mais incomprehensible pour les autres devs, qui ont du passer 3 semaines a seformer. Jai appris que le consensus et la communication valent mieux que la perfection technique individuelle (R)."

**Framework pour les echecs:**
- Choisissez un echec reel, pas un demi-succes.
- Concentrez-vous sur votre apprentissage.
- Montrez que vous avez grandi depuis.
- Evitez les echecs qui revelent des valeurs non négociables.

**Questions de suivi a anticiper:**
- Quavez-vous appris?
- Que feriez-vous differemment?
- Comment avez-vous surmonte?

## Pieges courants

- Mentir: Les bons intervieweurs detectent les histoires fabriquees.
- Blamer les autres: Restez responsable.
- Etre trop negatif: Vouslez pas vous декvaloir.
- Eviter de parler dun vrais echec: "Je nai jamais echoue" nest pas credible.

Source : [The Muse - Talking About Failures](https://www.themuse.com/advice/tell-me-about-a-project-youre-proud-of)`},
        {
          id: 'rh-26',
          question: 'Posture en visioconférence',
          answer: "En visio, le **cadre** compte autant qu'en présentiel : caméra à hauteur des yeux, fond neutre et éclairage de face. Regardez la **caméra** (pas l'écran) quand vous parlez — cela simule le contact visuel.\n\nÉvitez les distractions visibles (téléphone, onglets ouverts). Testez votre matériel avant : son, image, connexionion. __La visio n'excuse pas un manque de professionnalisme.__",
        
          deepDive: `# Posture en visioconference

## Quest-ce que cest

Les entretiens en visio sont devenus courants. Les recruteurs evaluent votre professionnalisme a distance et votre Maitrise des outils.

## Reponses

**Technique STAR pour la posture:**

**Exemple STAR:**
> "Sur un entretien en visio recent (S), javais prepare mon environnement en avance. Jai teste ma connexion, choisi un fond neutre, et place ma webcam au niveau des yeux (T). Jai maintenu une posture droite, regarde regulierement dans la camera (pas ecran), et jaileve le ton pour compenser labsence de contact visuel direct (A). Le recruteur ma ensuite dit que javais la meilleure presence digitale quil ait vue (R)."

**Bonnes pratiques techniques:**
- Testez votre materiel AVANT.
- Bonne lumiere naturelle ou ring light.
- Fond professionnel ou floute.
- Casque oreillette pour meilleure audio.
- Fermez les autres applications.

**Bonnes pratiques presentation:**
- Regardez la camera (pas ecran) pour simulacre de contact visuel.
- Levez les mains pour emphasize.
- Souriez naturellement au debut et fin.
- Taux de presence: 100 pour cent (pas de multitasking).

## Pieges courants

- Fond distrayant: Bibliotheque, lit, enfants.
- Mauvaise connexion audio: Resolvez avant.
- Regarder lequipe: Deplace le regard vers la camera.
- Oublier leTimeout: Restez concentre tout le temps.

Source : [Glassdoor - Video Interview Tips](https://www.glassdoor.com/career-advice/)`},
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
        
          deepDive: `# Presentez-vous

## Quest-ce que cest

Cest souvent la premiere question et elle fixe le ton de lentretien. En 2-3 minutes, vous devez donner une vision claire de qui vous etes professionnellement, ce que vous avez accompli, et pourquoi vous etes la.

## Reponses

**Structure recommandee (elevator pitch):**
1. **Actuel** (30 secondes): Poste actuel, entreprise, specialite.
2. **Parcours** (1 minute): Etapes cles, decisions de carriere, continuite.
3. **Accomplissements** (30 secondes): 2-3 realisations quantifiables.
4. **Cible** (30 secondes): Pourquoi ce poste, cette entreprise.

**Exemple:**
> "Je suis developpeur full-stack depuis 6 ans, actuellement chez [Entreprise] ou je lead une equipe de 5 sur une app React/Node (Actuel). Jai debute en startup ou jai appris a porter un produit de 0 a 1, puis jai rejoint [GrandeBoite] ou jai scale un systeme a 1M utilisateurs (Parcours). Maplus belle reussite: refondre une API qui a reduit les temps de reponse de 80 pour cent et ameliore le NPS de 15 points (Accomplissements). Je cherche maintenant un poste ou je pourrais approfondir larchitecture cloud-native, et votre focus sur [tech/domaine] mintrigue particulierement (Cible)."

## Pieges courants

- Reciter votre CV: Respirez la passion, pas la liste.
- Etre trop long: 3 minutes max. Vous devez pouvoir vous arreter si le recruteur change de sujet.
- Mentions personnelles inutiles: Evitez les loisirs non pertinents.
- Oublier le lien avec le poste: Connectez toujours votre histoire a ce que vous pouvez faire pour eux.
- Ton monoton: Variiez votre inflexion pour garder lattention.

Source : [The Muse - Elevator Pitch](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-12',
          question: 'Questions sur vos expériences',
          answer: "Couvrez **trois angles** : le **personnel** (valeurs, éthique de travail, motivations), le **professionnel** (exemples concrets et chiffrés : `Scrum`, collaboration, résolution de problèmes), et le **bilan** (ce que vous avez appris, comment vous avez évolué). Les recruteurs veulent comprendre *comment vous avez grandi*, pas juste ce que vous avez fait. Structure gagnante : **personnel → pro → bilan**.",
        
          deepDive: `# Questions sur vos Experiences

## Quest-ce que cest

Les recruteurs creusent vos experiences pour evaluer la pertinence, la profondeur, et la maniere dont vous racontez. Ils cherchent des preuves concretes de vos competences.

## Reponses

**Methode STAR:**
- Selectionnez une experience pertinente pour le poste.
- Decrivez le contexte en 2-3 phrases (Situation + Tache).
- Detaillez vos actions (pas "nous", mais "je").
- Quantifiez le resultat.

**Exemple STAR:**
> "Sur mon dernier projet (S), larchitecture existante ne passait pas a lextelle. Je devais concevoir une refonte without downtime (T). Jai propose une approche strangler pattern, decompose le monolithe en 5 microservices, et implemente un API gateway. En parallele, jai forme les 3 autres dev aux nouveaux patterns (A). Le projet a ete livre en 4 mois, zero downtime, et la maintenance est maintenant 60 pour cent plus rapide (R)."

**Questions de suivi possibles:**
- Quel a ete votre plus grand defi?
- Quelle est la realisation dont vous etes le plus fier?
- Que referiez vous differemment?

## Pieges courants

- Etre vague: "Jai travaille sur un gros projet" ne dit rien. Dites "un systeme de paiement processing 10K transactions par jour".
- Nutiliser que "nous": Le recruteur veut voir VOTRE contribution.
- Eviter les echecs: Les gens qui nont jamais echoue nont pas pris de risques.
- Mentir: Les recruteurs sont bons pour detecter les histoires fabricate.

Source : [Harvard Business Review - Storytelling](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-13',
          question: 'Pourquoi ce rôle ?',
          answer: "Activez **deux leviers** : les **valeurs de l'entreprise** (si elles résonnent avec vous, expliquez pourquoi) et les **contacts avec ses employés** (salon, `LinkedIn`, alumni). Cela prouve une démarche proactive et un intérêt concret. __Le recruteur veut vérifier que votre choix est réfléchi, pas une candidature envoyée à 50 entreprises.__",
        
          deepDive: `# Pourquoi ce Role

## Quest-ce que cest

Cette question teste votre motivation et votre recherche prealable. Le recruteur veut voir que vous avez compris le poste ET que vous letes pour les bonnes raisons (pas juste un salaire).

## Reponses

**Framework a 3 volets:**
1. **Le poste**: "Ce role mattire car il combine X et Y, qui correspondent a mes strengths."
2. **Lentreprise**: Demontrez que vous avez fait vos devoirs. Mentionnez un produit, une culture, une mission.
3. **Vous**: Ce que vous apportez. "Mon experience en Z me permet de..."

**Exemple:**
> "Ce poste de senior developer mattire pour 3 raisons. Dabord, la dimension architecture systemes (le poste). Votre approche domain-driven design mentionnee dans larticle de votre CTO sur Medium montre une philosophie technique qui me parle (entreprise). Enfin, ma experience sur les migrations cloud chez PrecedentEmployer me donne un raccourci pour etre operationnel rapidement (vous)."

**Preparation essentielle:**
- Lisez la description de poste 3 fois.
- Recherchez sur LinkedIn, Glassdoor, blog tech de lentreprise.
- Parlez a des employes actuels si possible.
- Identifiez 2-3 choses qui vous differencient des autres candidats.

## Pieges courants

- Etre vague: "Cest une bonne opportunite" nest pas une answer.
- Critiquer son ancien employeur: Si c est vrai, gardez le positif.
- Dire "parce que jai besoin dun emploi": Montrez votre enthousiasme, pas du desespoir.
- Eviter lentreprise: Parlez specifics, pas generalites.

Source : [LinkedIn Learning - Why This Role](https://www.linkedin.com/learning/)`},
        {
          id: 'rh-14',
          question: 'Où vous voyez-vous dans 5 ans ?',
          answer: "Montrez une **vision d'évolution** cohérente avec le poste visé. Exemple : « Dans 5 ans, je me vois **leader technique** avec des responsabilités architecturales et d'encadrement, tout en continuant à coder. Je veux approfondir le cloud computing, notamment `AWS`. » Soyez *ambitieux mais réaliste*, avec un plan compatible avec les perspectives de l'entreprise.",
        
          deepDive: `# Ou vous voyez-vous dans 5 ans

## Quest-ce que cest

Cette question evalue vos ambitions, votre stabilite, et votre fit avec lentreprise. Ils veulent savoir si vous allez rester et grandir avec eux.

## Reponses

**Framework SMART pour Carriere:**
- **S**pecific: Un domaine ou un role precis.
- **M**esurable: Des competences ou responsibilities quantifiable.
- **A**tteignable: Realiste dans le contexte de lentreprise.
- **R**elevant: Lié au poste et a lentreprise.
- **T**ime-bound: 3-5 ans, pas 20 ans.

**Exemple:**
> "Dans 3-5 ans, je me vois avoir grandi en tant quarchitecte technique dans cette entreprise. Jespere mener des decisions darchitecture sur des projets a fort impact, et peut-etre contribuer au mentoring de Juniors. A horizon 5 ans, je pourrais evoluer vers un role de staff engineer ou de tech lead si lopportunite se presente et que je delege mes preuves de leadership technique."

**Points cles:**
- Montrez que vous voulez rester: "Je vois ici" plutot que "Je ne sais pas".
- Alignez vos ambitions avec la croissance de lentreprise.
- Mentiez sur les promotions visees: Pas "tech lead" si le poste est IC.

## Pieges courants

- Etre trop vague: "Je ne sais pas" ou "je verrai".
- Etre trop ambitieux: "Je veux etre CEO dans 5 ans" est presumptueux.
- Etre desaligne: Vouloir monter votre boite alors quils cherchent quelquun pour 10 ans.
- Oublier le present: Vous pouvez mentionner ce que vous ferez dans 1 an aussi.

Source : [Indeed - 5 Year Plan Answer](https://www.indeed.com/career-advice/interviewing/where-do-you-see-yourself-in-5-years)`},
        {
          id: 'rh-15',
          question: 'Projet marquant ?',
          answer: "Parlez d'un projet **mesurable et concret** où vous avez eu un impact visible. Structurez en **STAR** (Situation, Task, Action, Result) en insistant sur vos **contributions personnelles** et les **chiffres** (réduction de temps, coûts économisés, users touchés).\n\nÉvitez les réponses vagues (« on a fait une refonte ») —说不出具体的、数字的成果，显得没有影响力。Privilégiez un projet récent et pertinent pour le poste.",
        
          deepDive: `# Projet Marquant

## Quest-ce que cest

Les recruteurs posent cette question pour decouvrir ce qui vous motive et comment vous abordez un defi. Ils cherchent des realisations ou le impact est mesurable et la valeur ajoutee evidente.

## Reponses

**Methode STAR + Impact:**
Choisissez un projet qui демонстра votre expertise technique ET vos soft skills.

**Exemple STAR:**
> "Mon projet le plus marquant fut la migration dun e-commerce legacy vers une architecture microservices (S). Le systeme avait 8 ans, zero tests, et plantait regulierement. Je devais orchestrer la migration sans interruption de service (T). Jai introduit une approche strangler fig, ajouter des tests de regression автоматиises, et former léquipe de 4 devs aux nouveaux patterns (A). Le resultat: 99.9 pour cent de uptime pendant la migration, reduction de 40 pour cent du temps de deploiement, et le NPS client a augmente de 12 points (R)."

**Guide de selection:**
- Projet avec impact business mesurable (revenue, users, efficiency).
- Projet qui montre votre initiative ou leadership.
- Projet qui демонстра des compétences demandees pour le poste vise.
- Defis surmontés qui montrent votre problem-solving.

## Pieges courants

- Choisir un projet banal: "Jai refait le CSS du site" napporte rien.
- Ngliger lequipe: Meme si vous avez lead, acknowledgment le travail collectif.
- Etre modeste: Cest le moment de montrer vos accomplissements, pas de vous dévaloriser.
- Mentir sur votre role: Le recruteur creusera et découvrira la vérité.

Source : [The Muse - Proudest Accomplishment](https://www.themuse.com/advice/tell-me-about-a-project-youre-proud-of)`},
        {
          id: 'rh-16',
          question: 'Qualités et défauts ?',
          answer: "**Qualités** : organisé et méthodique, bonne capacité d'analyse, travail en équipe efficace même à distance.\n\n**Défauts** : tendance à vouloir tout faire en même temps — je corrige avec la **matrice d'Eisenhower** pour gérer les priorités. Autre point : je fonce parfois trop vite sans prendre assez de recul.\n\n__L'important est de montrer une conscience de soi et une démarche d'amélioration continue.__",
        
          deepDive: `# Qualites et Defauts

## Quest-ce que cest

Cette question testa la conscience de soi et lhonnetete. Les recruteurs veulent voir que vous vous connaissez et que vous êtes reflexif. Pour les defauts, ils evaluent si vous êtes capable de les gérer ou de vous ameliorer.

## Reponses

**Framework pour les qualites:**
- 2-3 qualites pertinentes pour le poste.
- Exemple concret pour chacune.
- Liees a ce que lentreprise recherche.

**Exemple qualites:**
> "Je suis persévérant. Quand je rencontre un probleme complexe, je ne lache pas. Sur mon dernier projet, nous avons passé 3 semaines sur un bug de performance que dautres auraient contourné. Jai fini par trouver la cause: un query N+1. Le fix a amélioré les temps de réponse de 500ms a 50ms."

**Framework pour les defauts (strategie COIN):**
- **C**onnect: Defaut qui semble negatif mais peut être positif dans le bon contexte.
- **O**wn: Assumez le defaut sans Blamer.
- **I**mprove: Decrivez ce que vous faites pour vous ameliorer.
- **N**uance: Montrez que vous êtes conscient des limites.

**Exemple defaut:**
> "Jai tendance a être perfectionniste (C). Je passe parfois trop de temps sur des détails quand le deadline approche (O). Je travaille dessus en definissant des priorities claires et en mettant un timer sur les tâches (I). Je suis en train dapprendre que "done is better than perfect" dans certains contextes (N)."

## Pieges courants

- Defaut cliché: "Je travaille trop" est perçu comme bs.
- Defaut trop grave: "Je nécoute jamais" nest pas recruitant.
- Qualités sans preuve: "Je suis créative" sans exemplе.
- Etre trop negatif sur soit: Gardez un ton professionnel.

Source : [Glassdoor - Strengths and Weaknesses](https://www.glassdoor.com/career-advice/)`},
        {
          id: 'rh-17',
          question: 'Pourquoi vous et pas les autres ?',
          answer: "Combinez **trois éléments** : votre **expérience technique** appliquée au poste (« Votre équipe travaille sur les microservices, j'ai déjà migré un monolithe vers cette architecture »), vos **soft skills** (communication, travail en équipe, gestion de la pression), et votre **motivation spécifique** pour cette entreprise — pas de réponse générique. __Personnalisez pour rendre votre réponse unique et mémorable.__",
        
          deepDive: `# Pourquoi vous et pas les autres

## Quest-ce que cest

Cette question teste votre confiance et votre differenciation. Le recruteur veut savoir ce qui vous rend unique parmi les candidats et pourquoi ils devraient vous choisir.

## Reponses

**Framework USP (Unique Selling Proposition):**
1. **Ce qui vous differencie**: Une combinaison unique de skills, expérience, ou approche.
2. **Preuve concrete**: Un exemple recent qui демонстра cette difference.
3. **Valeur pour eux**: Comment cela se traduit en beneficios pour lentreprise.

**Exemple:**
> "Ce qui me differencie est ma double expertise technique et produit. Jai passé 2 ans a trabajar como product owner en plus de developer, donc je comprends les contraintes business autant que les defis techniques. Sur mon dernier poste, jai propose et implémenté une refonte de lAPI qui a reduce les couts dinfrastructure de 30 pour cent tout en amelioreant la DX pour les equipes internes. Je pense que cette combination me permet de prendre des décisions plus alignees avec les objectifs business."

**Preparation cles:**
- Etudiez les autres candidats (si connu) et leurs faiblesses potentielles.
- Identifiez 2-3 choses que vous faites mieux que quiconque.
- Preouvez avec des métriques ou des exemples concrets.

## Pieges courants

- Etre arrogant: "Je suis le meilleur" sonne mal.
- Etre modeste: Vous devez vendre vos forces sans honte.
- Critiquer les autres candidats: Parlez de vos forces, pas de leurs faiblesses.
- Etre vague: "Je suis travailleur" ne suffit pas.

Source : [Forbes - Why Should We Hire You](https://www.forbes.com/careers/)`},
        {
          id: 'rh-18',
          question: 'Passer à une autre langue',
          answer: "Préparez à l'avance une anecdote simple et structurée dans la langue demandée. Le recruteur évalue votre **aisance** et **capacité à communiquer**, pas votre niveau académique. Si vous hésitez sur un mot, reformulez ou utilisez des synonymes — *la fluidité et la confiance priment*. __Montrez que la langue n'est pas un obstacle.__",
        
          deepDive: `# Passer a une autre langue

## Quest-ce que cest

Cette question evalue votre flexibilite et votre capacite a vous adapter. Elle peut aussi révéler votre experience avec des environnements multiculturels ou internationaux.

## Reponses

**Methode STAR:**
- **Situation**: Contexte ou vous avez du changer de langue (equipe internationale, client etranger).
- **Tache**: Quel etait lobjectif de la communication?
- **Action**: Comment avez-vous géré la transition?
- **Resultat**: Le message a-t-il ete compris?

**Exemple STAR:**
> "Dans mon poste precedent (S), je travaillais avec une equipe situee a Paris, Bangalore et San Francisco. Jespiondais regulierement entre francais et anglais lors des daily standups (T). Pour eviter les malentendus, jutilisais un glossaire partage, je confirmais la comprehension apres chaque point critique, et japprenais quelques mots clefs dans la langue maternelle de mes collegues (A). Le taux de misinterpretation sur les tickets a baisse de 60 pour cent en 3 mois (R)."

**Competences cles a demontrer:**
- Adaptation rapide aux préférences linguistiques.
- Sensibilite culturelle dans la communication.
- Capacite a clarifier sans paraitre condescendant.

## Pieges courants

- Dire que vous ne pouvez pas le faire: Montrez de la flexibilite.
- Mentir sur votre niveau: Soyez honnete sur vos limites.
- Oublier linteret professionnel: Expliquez pourquoi cest valuable pour le poste.
- Rester fige dans une langue: Montrez que vous savez sadapter au contexte.

Source : [The Balance Careers - Switching Languages](https://www.thebalancecareers.com/)`},
        {
          id: 'rh-27',
          question: 'Négocier son salaire',
          answer: "Renseignez-vous sur les **fourchettes du marché** avant l'entretien (`Glassdoor`, `LinkedIn Salary`, cabinets de recrutement). Ne donnez jamais un chiffre en premier si possible — retournez la question : « Quel est le budget prévu pour ce poste ? »\n\nSi vous devez avancer un chiffre, donnez une **fourchette haute** (« Entre X et Y ») où X est votre minimum acceptable. Justifiez par la **valeur apportée**, pas par vos besoins personnels. __La négociation est un échange, pas un affrontement.__",
        
          deepDive: `# Negocier son salaire

## Quest-ce que cest

Negocier son salaire montre que vous connaissez votre valeur. Les recruteurs sattendent a une negociation et la craignent souvent moins quon ne le pense.

## Reponses

**Framework SALARY:**
- **S**alary research: Quest-ce qui est juste sur le marche?
- **A**llocation: Total comp (salaire + bonus + equity).
- **L**egitimacy: Votre valeur pour lentreprise.
- **Y**ield: Votre meilleure alternative (BATNA).
- **A**llow flexibility: Sur quels elements pouvez-vous bouger?
- **R**easoning: Arguments factuels, pas emotionnels.
- **Y**our move: Attendez loffre avant de donner un nombre.

**Exemple:**
> "Jesuis content de cette offre. Avant dy répondre, javoue quelques questions sur les details. Pouvez-vous me confirmer le package complet incluant le bonus et les avantages? [Apres confirmation] Merci. Base sur ma recherche et mon experience, javoue en tete un montant de X euros. Jesuis ouvert a discuter si il y a de la flexibilite."

**Preparation essentielle:**
- Recherchez les salaries sur Glassdoor, LinkedIn Salary, levels.fyi.
- Connaissez votre minimum acceptable (walk-away).
- Identifiez dautres avantages valorisables (remote, formation, equity).

## Pieges courants

- Etre le premier a donner un nombre: Vous perdez du pouvoir de negociation.
- Negocies sans research: Vous ne savez pas ce qui est juste.
- Etre trop agressif: Vous pourriez perdre loffre.
- Oublier le package global: Bonus et equity peuvent compenser un plus bas salary.

Source : [Forbes - Salary Negotiation](https://www.forbes.com/careers/)`},
        {
          id: 'rh-28',
          question: 'Pourquoi quitter votre poste actuel ?',
          answer: "Restez **positif** — ne critiquez jamais votre employeur actuel. Formulez en termes d'**aspiration** plutôt que de fuite : « Je cherche de nouveaux défis techniques » plutôt que « Je m'ennuie ».\n\nFocus sur ce qui vous attire dans le **nouveau poste**, pas ce qui vous déplaît dans l'ancien. Si on insiste : « L'entreprise se recentre sur X, alors que je veux approfondir Y. » __Tournez toujours la page vers l'avenir.__",
        
          deepDive: `# Pourquoi quitter votre poste actuel

## Quest-ce que cest

Les recruteurs evaluent vos motivations et cherchent des drapeaux rouges (serial job hopper, incapacite a garder un emploi, conflit non resolu).

## Reponses

**Framework positif:**
- Ne blabmez jamais lentreprise ou les collegues.
- Concentrez-vous sur ce que vous recherchez, pas ce qui vous repousse.
- Parlez de opportunites de croissance.

**Exemple STAR:**
> "Jai passe 3 ans chez MonAncienEmployeur et jesuis fier de ce que jai accompli (S). Cependant, jai atteint un palier: larchitecture de reference ne me permettait plus dapprendre au rythme que je souhaitais (T). Je recherche maintenant une role ou je pourrais travailler sur des problemes de scaling et architecturer des systemes distribues a grande echelle. Votre offre correspond exactement a cette direction (R)."

**Raisons acceptables:**
- Manque de croissance ou de challenge.
- Changement de direction de carriere.
- Culture ou valeurs non alignees.
- Reorganisation ou restructure.
- Opportunite irrefusable (poste ideal).

**Raisons a eviter:**
- Conflit avec le manager.
- Performance insufisante.
- Salaire trop bas (sans autre raison).

## Pieges courants

- Critiquer lentreprise: Meme si justifié, gardez le positif.
- Mentir: Le nouveau employeur peut appeler vos references.
- Etre negative sur lancien poste: Montrez de la gratitude.
- Job hopper: Si vous avez change souvent, anticipez la question.

Source : [Harvard Business Review - Job Change](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-29',
          question: 'Disponibilité et télétravail',
          answer: "Soyez **clair et honnête** sur vos contraintes. Pour le télétravail, montrez que vous avez déjà prouvé votre **autonomie** à distance avec des résultats concrets.\n\nPréférez le dialogue : « Je suis à l'aise en présentiel et en remote, quel est l'organisation de l'équipe ? » plutôt qu'une exigence ferme. Le télétravail est un sujet de **négociation** — abordez-le avec ouverture. __La flexibilité est un atout, la rigidité un frein.__",
        
          deepDive: `# Disponibilite et teletravail

## Quest-ce que cest

Les employeurs veulent savoir si vous etes disponible aux horaires du poste et quelle est votre position sur le remote work. Cest souvent un facteur decideur.

## Reponses

**Methode STAR:**

**Exemple STAR - Flexibilite:**
> "Sur mon poste precedent (S), nous avions 2 jours de remote par semaine. Je devais organiser mon temps entre collaborations synchrones et travail focus (T). Jai mis en place une routine: matins pour les meetings, apres-midis pour le code. Jespere appliquer ce meme discipline ici tout en restant ouvert aux formats hybride (A). Lentreprise sapparente a etre flexible sur le remote, ce qui correspond a mes attentes (R)."

**Points cles a clarifier:**
- Jours disponibles par semaine.
- Heures de presence要求和 (standup time zones).
- Distance depuis le bureau et temps de trajet.
- Preference remote/hybrid/onsite.
- Events obligatoires en personne (sprints, offsites).

**Preparation:**
- Connaissez la politique de lentreprise avant.
- Soyez honnete sur vos contraintes reelles.
- Montrez votre productivite en remote (exemples).

## Pieges courants

- Etre trop rigide: Le marche est flexible, soyez le aussi.
- Mentir sur vos contraintes: Cela vous rattrapera.
- Oublier les time zones: Si le role inclut global teams.
- Paraître desinteresse: Montrez de lenthousiasme pour le format.

Source : [Glassdoor - Remote Work](https://www.glassdoor.com/career-advice/)`},
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
        
          deepDive: `# Vous proposez des formations

## Quest-ce que cest

Le recruteur evalue votre engagement envers le developpement professionnel et votre capacite a partager vos connaissances. Cest aussi un test de votre initiative et de votre vision a long terme.

## Reponses

**Framework FORM:**
- **F**utur: Comment vous voyez votre evolution.
- **O**pportunity: Les formations que vous avez suivies ou proposez.
- **R**esults: Les benefits pour lentreprise.
- **M**anifestation: Comment vous implementer ces skills.

**Exemple:**
> "Jesuis convaincu que la formation continue est essentiel. Lannee derniere, jai suivi une certification AWS Solutions Architect sur mes propres fonds (opportunite). Jai ensuite forme mes 3 collegues de lequipe pendant des sessions de 30 minutes chaque vendredi (manifestation). Le resultat: nous avons pu internaliser un projet qui etait vorher outsource, economisant 40K euros a lannee (results)."

**Types de formations a mentionner:**
- Certifications techniques (AWS, GCP, Azure, Scrum, PMP).
- Conferences et meetups.
- Formation interne a destination des collegues.
- Auto-formation (MOOCs, livres techniques).

## Pieges courants

- Dire que vous navez pas besoin de formation: Vous paraissez arrogant.
- Lister des formations sans rapport avec le poste.
- Oublier de mentionner comment vous partagez: Les entreprises valorisent le knowledge sharing.
- Etre vague sur le ROI: Quantifiez quand possible.

Source : [Harvard Business Review - Learning and Development](https://hbr.org/2023/01/the-art-of-the-interview)`},
        {
          id: 'rh-20',
          question: 'Stage de 6 ou 8 mois ?',
          answer: "Poser cette question preuve que vous **planifiez déjà votre intégration** et que vous êtes *flexible*. La durée du stage impacte le type de missions : **8 mois** permettent d'aller plus loin dans un projet que **6 mois**. C'est une question pratique qui montre votre sens de l'organisation et votre implication.",
        
          deepDive: `# Stage de 6 ou 8 mois

## Quest-ce que cest

Cette question concerne vos preferences et votre engagement. Elle peut aussi révéler votre situation actuelle (etudes, reconversion) et votre flexibilite.

## Reponses

**Methode STAR:**
- **Situation**: Votre contexte actuel (etudes, emploi actuel, personnalite).
- **Tache**: Ce qui est important pour vous dans un stage.
- **Action**: Comment vous avez evaluate lopportunite.
- **Resultat**: Votre decision et sa logique.

**Si vous preferez 6 mois:**
> "Je prefere 6 mois car cela permet de sintegrer pleinement dans un projet, de la phase de conception au delivery final. Jai deja fait un stage de 6 mois ou jai pu voir le projet evoluer et presenter les resultats au client. Cest cette profondeur dexperience qui mintresse."

**Si vous preferez 8 mois:**
> "Je prefere 8 mois car cela couvre un cycle complet, incluant les tests, le deploiement et la retrospective. Sur mon precedent stage de 4 mois, je nai pas eu le temps de voir les retombees de mes choix techniques. Avec 8 mois, je pourrais vraiment valider la valeur ajoutee de mes contributions."

**Points cles:**
- Justifiez par des raisons professionnelles, pas personales.
- Montrez de la flexibilite si possible.
- Demontrer que vous comprenez la valeur de chaque duree.

## Pieges courants

- Etre inflexible: Montrez que vous pouvez sadapter.
- Mentir sur vos contraintes: Si vous avez des obligations, soyez honnete.
- Ne pas avoir reflechi: Montrez que vous avez analyse lalternatives.

Source : [Glassdoor - Internship Tips](https://www.glassdoor.com/career-advice/)`},
        {
          id: 'rh-21',
          question: "Quelle est l'étape suivante ?",
          answer: "__Posez toujours cette question en fin d'entretien__ : elle montre votre implication et votre côté proactif. Concrètement, elle vous informe sur la suite du processus (autre tour, test technique, délai de retour). C'est important pour ne pas rester dans l'incertitude et prouver que vous prenez votre candidature au sérieux.",
        
          deepDive: `# Quelle est letape suivante

## Quest-ce que cest

Cette question evalue votre interesse pour le poste et votre proactive. Elle montre aussi si vous avez bien compris le processus de recrutement.

## Reponses

**Framework:**
- Montrez que vous avez suivi le processus.
- Demandez les etapes concrete next steps.
- Expr une date butoir si mentionnee.

**Exemple:**
> "Dapres ce que vous mavez explique, je comprends que la prochaine etape serait un entretien technique avec lquipe. Quand pourrais-je espérer un retour sur ma performance aujourdhui? Y a-t-il dautres entretiens prevus? Je suis disponible les 2 prochaines semaines a votre convenance."

**Points cles:**
- Montrez de lenthousiasme sans etre impatient.
- Montrez que vous etes toujours interesse.
- Montrez que vous planifiez la suite.

## Pieges courants

- Etre passif: "Je vais attendre votre retour" montre peu dinitiative.
- Etre trop insistant: Pas de relances quotidiennes.
- Ne pas avoir de questions: Preoyez toujours des questions pour le recruteur.
- Oublier de remercier: Politesse essentielle.

Source : [The Muse - Interview Process Questions](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
        {
          id: 'rh-22',
          question: 'Votre impression de cet entretien ?',
          answer: "Demander un **feedback** montre votre **ouverture à la critique constructive** et votre volonté de vous améliorer. Posez la question avec un ton *positif et non défensif*. Même un retour négatif est une info précieuse pour vos prochains entretiens. __C'est une question qui reflète votre maturité professionnelle.__",
        
          deepDive: `# Votre impression de cet entretien

## Quest-ce que cest

Cette question finale permet au recruteur devaluer votre reflection et votre feedback. Elle montre aussi si vous avez suivi et compris les enjeux du poste.

## Reponses

**Framework positif et constructif:**
- Donnez une impression positive general.
- Mentionnez des elements specifiques qui vous ont anime.
- Si des doutes, formulez de maniere constructive.

**Exemple:**
> "Mon impression est tres positive. Japprecie particulierement la clarte avec laquelle vous avez presente les defis techniques de lquipe. Le probleme de scaling que vous avez decrit menthousiasme beaucoup car javoue deja reflechi a des solutions similaires sur mon precedent poste. La culture de collaboration que vous avez decrite correspond a ce que je recherche."

**Points cles:**
- Montrez de lenthousiasme sincere.
- Speculez sur votre fit avec lquipe.
- Montrez que vous avez ecoute attentivement.
- Si vous avez des reserva, formulez-les avec tact.

## Pieges courants

- Etre negative: "Lentretien etait confus" nest pas professionnel.
- Etre trop flateur: "Cest parfait" parait faux sans examples.
- Mentir: Si quelque chose ne vous plait pas, soyez diplomate mais honnete.
- Terminer sans question: Vous devez toujours avoir des questions.

Source : [Forbes - Interview Feedback](https://www.forbes.com/careers/)`},
        {
          id: 'rh-30',
          question: 'Relance après l\'entretien',
          answer: "Envoyez un **email de remerciement** dans les 24h : remerciez, rappelez votre intérêt et ajoutez une info pertinente oubliée pendant l'entretien.\n\nSi pas de réponse après le délai annoncé, relancez **une fois** avec courtoisie. La relance montre votre **persistance** et votre sérieux. __Ne jamais harceler, mais ne jamais rester passif non plus.__",
        
          deepDive: `# Relance apres lentretien

## Quest-ce que cest

Une relance bien timinge montre votre interet et votre professionalisme. Elle peut faire la difference entre deux candidats similaires.

## Reponses

**Timeline optimal:**
- 24-48h apres lentretien: Thank you email.
- 5-7 jours apres: Relance si pas de nouvelle.
- Pas plus de 2 relances.

**Exemple de thank you email:**
> "Bonjour [Recruteur], Je vous remercie pour le temps que vous avez accorde a notre entretien aujourdhui. Jesuis plus que jamais interesse par le poste et convaincu que mon experience en [domaine] pourrait contribuer a [equipe/projet]. Je reste a votre disposition pour tout complement dinformation. Cordialement, [Votre nom]"

**Exemple de relance:**
> "Bonjour [Recruteur], Jespere que vous allez bien. Je wished renormaliser concernant le poste de [titre]. Jai eu un retour de votre part ou de lequipe? Je suis toujours interesse et disponible pour un prochain entretien si necessaire. Cordialement, [Votre nom]"

## Pieges courants

- Relancer tous les jours: Patience, pas insistance excessive.
- Etre negatif: "Je nai toujours pas de reponse" est aggressif.
- Ne pas relancer du tout: Vous pouvez paraitre desinteresse.
- Contenu generic: Personalisez chaque message.

Source : [The Muse - Follow Up](https://www.themuse.com/advice/introduce-yourself-in-an-interview)`},
      ],
    },
  ],
};