import type { InterviewCategory } from '../../../../core/models/interview.models';

export const aiCategory: InterviewCategory = {
  id: 'ai',
  title: 'IA & Outils IA',
  color: 'background: #7C3AED; color: white',
  description: 'Usage de l\'IA au quotidien, prompting, outils, éthique et productivité',
  sections: [
    {
      id: 'ai-usage',
      title: 'IA au Quotidien',
      questions: [
        {
          id: 'ai-1',
          question: 'Comment utilisez-vous l\'IA dans votre travail quotidien ?',
          answer: "L'IA intervient à **plusieurs étapes** de mon workflow : **génération de code** (scaffolding, boilerplate), **debugging** (analyse d'erreurs, suggestions de fixes), **rédaction** de documentation et de tests unitaires, **recherche** rapide de syntaxe ou API sans lire toute la doc.\n\nJ'utilise aussi l'IA pour **expliquer du code legacy** complexe, **résumer** des PR volumineuses, et **optimiser** des requêtes SQL ou des algorithmes.\n\n__L'IA accélère les tâches répétitives mais je valide toujours le résultat — c'est un assistant, pas un remplacement.__",
        
          deepDive: `
# Utiliser l'IA au Quotidien

## Quest-ce que cest

L'IA peut etre интегрирована dans le workflow quotidien pour accelerer des tâches repetitives : code generation, documentation, debugging, recherche.

## Syntaxe et exemples

Cas d'usage quotidiens :
- Generation de code (Copilot, Claude)
- Refactorisation et объяснения
- Recherche de documentation
- Debugging et optimisation

\`\`\`typescript
// Integrer dans le workflow
const dailyTasks = [
  { task: "explain this error", tool: "claude" },
  { task: "generate unit tests", tool: "copilot" },
  { task: "document this function", tool: "claude" }
];
\`\`\`

## Bonnes pratiques

1. Identifier les tâches chronophages
2. Commencer par des outils simples
3. Etablir des checkpoints de validation
4. Partager les bonnes pratiques en équipe

## Pieges courants

1. Dependence excessive
2. Ignorer la qualité des sorties
3. Négliger l'apprentissage continu
4. Utiliser sans comprendre

Source : [AI in Daily Workflow](https://github.com/features/copilot)
`},
        {
          id: 'ai-2',
          question: 'Quels outils IA utilisez-vous ?',
          answer: "**GitHub Copilot** : autocomplétion intelligente dans l'IDE, suggestions en temps réel, génération de fonctions entières. **ChatGPT / Claude** : conversations détaillées pour l'architecture, le debugging complexe, l'explication de concepts.\n\n**Cursor** : IDE basé sur l'IA avec editing contextuel. **Amazon CodeWhisperer / Q** : suggestions orientées AWS. **JetBrains AI** : intégré dans IntelliJ/WebStorm.\n\nPour les ops : **AI dans Datadog** (analyse d'incidents), **AI dans PR reviews** (CodeRabbit). Pour la documentation : **Mintlify**.\n\n__Le choix dépend du contexte — Copilot pour le code, ChatGPT/Claude pour la réflexion.__",
        
          deepDive: `
# Outils IA Utilisés

## Quest-ce que cest

Les outils IA pour développeurs incluent des assistants de code (Copilot, Claude Code), des agents (Cursor, Replit Agent) et des services API (OpenAI, Anthropic).

## Syntaxe et exemples

Catégories d'outils :
- Assistants code : GitHub Copilot, Claude, Cursor
- Agents : Replit Agent, Cursor Agent, Claude Agent
- APIs : OpenAI GPT-4, Anthropic Claude, Google Gemini

\`\`\`typescript
// Configuration typical
const tools = {
  editor: "cursor", // ou vscode + copilot
  aiModel: "claude-sonnet-4",
  ciIntegration: "github copilot cli"
};
\`\`\`

## Bonnes pratiques

1. Tester pluseurs outils avant de choisir
2. Combiner plusieurs outils pour des tasks variées
3. Garder une liste а jour des alternatives
4. Former l'équipe aux shortcuts

## Pieges courants

1. Se limiter à un seul outil
2. Ignorer les couts
3. Négliger la courbe d'apprentissage
4. Faire confiance aveuglément

Source : [AI Tools for Developers](https://github.com/features/copilot)
`},
        {
          id: 'ai-3',
          question: 'Quelle est votre approche du prompt engineering ?',
          answer: "Un bon prompt suit la structure **Rôle → Contexte → Tâche → Format** : définir le **rôle** de l'IA (« Tu es un architecte Java senior »), donner le **contexte** technique précis (stack, contraintes, version), formuler la **tâche** clairement, et spécifier le **format** de sortie attendu.\n\nTechniques clés : **few-shot prompting** (donner 2-3 exemples), **chain-of-thought** (« raisonne étape par étape »), **itération** (affiner progressivement au lieu d'un seul prompt parfait).\n\n__Plus le contexte est précis, meilleure est la réponse. Un prompt vague donne une réponse vague.__",
          example: 'Prompt faible : « Écris un service Java »\nPrompt fort : « Tu es un développeur Spring Boot senior. Écris un service REST pour gérer des commandes (CRUD) avec validation, gestion d\'erreurs, et JPA. Utilise Spring Boot 3, Java 17. Format : classe complète avec commentaires. »',
        
          deepDive: `
# Prompt Engineering

## Quest-ce que cest

Le prompt engineering est l'art de formuler des instructions efficaces pour obtenir des réponses de qualité des modèles de langage.

## Syntaxe et exemples

Techniques principales :
- Zero-shot : demande directe
- Few-shot : exemples dans le prompt
- Chain-of-thought : raisonner étape par étape
- Role prompting : assigner un rôle

\`\`\`typescript
// Chain-of-thought prompt
const prompt = \`Question: \${question}
Think step by step:
1. Identify the key concepts
2. Analyze the relationships
3. Draw conclusions
Based on your reasoning, answer:\`;
\`\`\`

## Bonnes pratiques

1. Etre precis et explicite
2. Fournir du contexte
3. Structurer avec des sections
4. Iterer et affiner

## Pieges courants

1. Questions trop vagues
2. Manque de constraints
3. Instructions contradictoires
4. Négliger le format desire

Source : [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
`},
        {
          id: 'ai-4',
          question: 'Quelles tâches déléguez-vous à l\'IA vs ce que vous faites manuellement ?',
          answer: "**À l'IA** : boilerplate et scaffolding, tests unitaires simples, documentation Javadoc/README, conversion de formats (JSON → POJO), refactorings mécaniques, explication de code existant, recherche de bugs évidents.\n\n**Manuellement** : décisions d'architecture, review de sécurité, logique métier critique, algorithmes complexes, debugging de problèmes subtils, design d'API publique.\n\n**En collaboration** : optimisation de performances (l'IA propose, je benchmark), rédaction technique (l'IA draft, je refine), exploration de solutions (l'IA brainstorm, je choisis).\n\n__Règle : si l'erreur a un coût élevé → je le fais moi-même. Si l'erreur est rattrapable → l'IA accélère.__",
        
          deepDive: `
# Delegation IA vs Travail Manuel

## Quest-ce que cest

La delegation IA consiste a identifier quelles taches sont mieux traitees par l'IA (generative, repetitives, a forte volume) versus celles necessitant l'intervention humaine (cognitives, creatrices, decisionnelles).

## Syntaxe et exemples

Deleguez a l'IA :
- Generation de code standard / templates
- Refactorisation mechanicale
- Documentation de code existant
- Debugging系统性
- Recherche syntaxique

Faites manuellement :
- Architecture et design de systemes
- Decisions strategiques
- Code critique / sensible
- Review et validation finale
- Resolutions de bugs complexes

\`\`\`typescript
// Deleguer les taches repetitives
const aiSuggestions = await analyzeCodeWithAI(codeSnippet);
// Valider manuellement les suggestions
const validated = humanReview(aiSuggestions);
\`\`\`

## Bonnes pratiques

1. Etablir une matrice de delegation claire
2. Toujours valider les sorties IA
3. Commencer par des taches a faible risque
4. Documenter les decisions de delegation

## Pieges courants

1. Tout deleguer aveuglément
2. Ignorer les biais de l'IA
3. Négliger la validation humaine
4. Utiliser l'IA pour des decisions sensibles

Source : [AI Delegation Best Practices](https://arxiv.org/abs/2304.12395)
`},
        {
          id: 'ai-5',
          question: 'Comment gérez-vous les hallucinations de l\'IA ?',
          answer: "Les **hallucinations** sont des réponses plausibles mais factuellement incorrectes (API inexistantes, méthodes inventées, paramètres faux). Je les gère par **vérification systématique**.\n\nStratégies : **croiser avec la documentation officielle** (javadoc, MDN, docs Spring), **tester le code généré** immédiatement, **ne jamais copier-coller sans lire**, vérifier les **imports et dépendances** (l'IA invente souvent des bibliothèques).\n\nSignaux d'alerte : réponse trop **confiante** sans source, code qui **compile pas**, API qui n'existe pas dans la version indiquée.\n\n__L'IA est un accélérateur de productivité, pas un oracle. Toujours valider avant d'intégrer.__",
        
          deepDive: `
# Hallucinations de l'IA

## Quest-ce que cest

Les hallucinations IA sont des reponses plausibles mais incorrectes ou incoherentesGenerated par un modele de langage. Elles resultent du mode de prediction probabiliste du modele.

## Syntaxe et exemples

Types d'hallucinations :
- Faits inventés (citations, dates, statistiques)
- Reasoning incorrect mais coherent
- Confabulations logiques

\`\`\`typescript
// Verifier les informations critiques
const facts = await extractFacts(aiResponse);
const verified = await factCheck(facts); // Toujours valider
\`\`\`

## Bonnes pratiques

1. Cross-verifier avec sources multiples
2. Poser des questions de validation
3. Utiliser des modeles avec citation
4. Implémenter des couches de verification

## Pieges courants

1. Faire confiance aveuglément
2. Manquer de contexte dans le prompt
3. Utiliser pour des domains critiques sans validation
4. Ignorer les incertitudes du modele

Source : [Understanding AI Hallucinations](https://arxiv.org/abs/2311.09555)
`},
      ],
    },
    {
      id: 'ai-coding',
      title: 'IA & Développement',
      questions: [
        {
          id: 'ai-6',
          question: 'Comment utiliser l\'IA pour le debugging ?',
          answer: "Processus : **coller le message d'erreur** complet avec le stack trace → l'IA identifie la cause probable et suggère un fix. Pour les bugs complexes : décrire le **comportement attendu vs observé**, partager le **contexte d'exécution** (données d'entrée, environnement).\n\nL'IA excelle pour : erreurs de compilation obscures, problèmes de configuration (`Spring`, `Webpack`), incompatibilités de versions, problèmes d'encodage/charset.\n\nLimites : bugs de concurrence, race conditions, problèmes de performance à l'échelle — ces problèmes nécessitent un **raisonnement systémique** que l'IA ne maîtrise pas.\n\n__L'IA réduit le temps de diagnostic de 70% sur les bugs classiques, mais ne remplace pas l'analyse en profondeur.__",
        
          deepDive: `
# Debugging avec l'IA

## Quest-ce que cest

L'IA peut accelerer le debugging en analysant les erreurs, suggérant des causes et proposant des corrections. Elle excelle pour les erreurs communes et les patterns connus.

## Syntaxe et exemples

\`\`\`typescript
// Decrire le probleme clairement
const debugSession = {
  error: "TypeError: Cannot read property 'map' of undefined",
  context: "users.map() dans UserService",
  stack: error.stack
};
const analysis = await ai.analyzeError(debugSession);
\`\`\`

## Bonnes pratiques

1. Decrire le contexte complet (langage, framework, version)
2. Inclure le message d'erreur et la stack trace
3. Fournir le code environnant
4. Valider chaque suggestion avant application

## Pieges courants

1. Copier-coller sans comprendre
2. Ignorer le contexte prealable
3. Faire confiance aux suggestions sans verification
4. Utiliser pour des bugs de securite non audités

Source : [AI-Assisted Debugging](https://platform.openai.com/docs/guides/debugging)
`},
        {
          id: 'ai-7',
          question: 'Comment utiliser l\'IA pour les tests ?',
          answer: "L'IA **génère rapidement** des tests unitaires de base : cas nominaux, cas limites évidents (null, vide, overflow), paramètres invalides. Elle comprend le code à tester et crée les mocks/stubs nécessaires.\n\nPour les **tests d'intégration** : l'IA peut scaffold les configurations `@SpringBootTest`, les setups de base de données de test. Pour les **tests E2E** : génération de scénarios Playwright/Cypress.\n\nAttention : l'IA génère souvent des tests qui **passent toujours** sans vraiment tester la logique (tests tautologiques). Il faut **revoir** chaque test pour vérifier qu'il détecterait effectivement une régression.\n\n__L'IA excelle pour la couverture quantitative, je m'assure de la qualité qualitative.__",
          code: '// AI-generated test — à valider !\n@Test\nvoid shouldReturnEmptyWhenNoOrders() {\n  when(orderRepo.findAll()).thenReturn(List.of());\n  assertThat(orderService.getOrders()).isEmpty();\n}\n\n@Test\nvoid shouldThrowWhenNullInput() {\n  assertThatThrownBy(() -> service.process(null))\n    .isInstanceOf(IllegalArgumentException.class);\n}',
          language: 'java',
        
          deepDive: `
# Tests avec l'IA

## Quest-ce que cest

L'IA peut aider à générer des tests unitaires, d'intégration et E2E. Elle accélère la création de cas de test et peut identifier des cas limites.

## Syntaxe et exemples

\`\`\`typescript
// Generer des tests unitaires
const testRequest = {
  function: complexFunction,
  framework: "vitest",
  coverage: "80%"
};
const tests = await ai.generateTests(testRequest);

// Identifier les cas limites
const edgeCases = await ai.findEdgeCases(functionCode);
\`\`\`

## Bonnes pratiques

1. Definir le framework et les conventions
2. Revoir les tests générés
3. Ajouter des cas limites manuellement
4. Combiner avec des tools de coverage

## Pieges courants

1. Générer des tests sans значение
2. Ignorer les cas limites réels
3. Copier-coller sans comprendre
4. Négliger les tests de regression

Source : [AI Test Generation](https://jestjs.io)
`},
        {
          id: 'ai-8',
          question: 'Comment utiliser l\'IA pour la refactorisation ?',
          answer: "L'IA est excellente pour les **refactorings mécaniques** : renommage cohérent dans tout le projet, extraction de méthodes, conversion de syntaxe (Java 8 → Java 17, callbacks → async/await), migration de frameworks.\n\nProcessus : décrire le **refactoring souhaité** avec le pattern source et cible, fournir le **fichier/la classe** à refactorer, vérifier chaque changement dans la **diff du PR**.\n\nL'IA gère aussi : séparation de gros monolithes en modules, modernisation de code legacy, application de **design patterns** sur du code procédural.\n\n__J'utilise l'IA pour les refactorings de grande ampleur mais je valide chaque fichier modifié — un refactoring mal fait est pire que pas de refactoring.__",
        
          deepDive: `
# Refactorisation avec l'IA

## Quest-ce que cest

L'IA peut accelerer la refactorisation en identifiant les patterns aameliorer, suggérant des simplifications et générant du code de migration. Elle aide pour les transformations mécaniques.

## Syntaxe et exemples

\`\`\`typescript
// Refactoriser du code Angular vers signals
const refactorRequest = {
  code: legacyComponentCode,
  target: "use signals instead of RxJS",
  constraints: ["keep OnPush", "preserve behavior"]
};
const suggestion = await ai.refactor(refactorRequest);
\`\`\`

## Bonnes pratiques

1. Definir clairement les contraintes de refactorisation
2. Demander des explications avant d'appliquer
3. Tester aprèes chaque modification mineure
4. Garder les commits atomiques

## Pieges courants

1. Appliquer sans comprendre le changement
2. Refactoriser trop en une fois
3. Ignorer les tests existants
4. Perte de logique métier subtile

Source : [AI Code Refactoring Guide](https://github.com/features/copilot)
`},
        {
          id: 'ai-9',
          question: 'Comment utiliser l\'IA pour la documentation ?',
          answer: "L'IA **génère rapidement** : Javadoc/JavaDoc pour les classes et méthodes, README de projet, guides d'installation, changelogs à partir de commits, commentaires inline pour la logique complexe.\n\nProcessus : partager le code source → demander la documentation au format souhaité → **revoir et corriger** (l'IA peut mal décrire l'intention, omettre des effets de bord, générer des docs génériques).\n\nL'IA est aussi utile pour **traduire** la documentation technique en langage métier pour les parties prenantes non-techniques.\n\n__La doc générée par IA est un **brouillon**. Le développeur doit s'assurer qu'elle reflète exactement le comportement réel du code.__",
        
          deepDive: `
# Documentation avec l'IA

## Quest-ce que cest

L'IA peut générer de la documentation technique (JSDoc, README, docstrings) a partir du code, ou améliorer des drafts existants. Elle accélère la création de documentation de base.

## Syntaxe et exemples

\`\`\`typescript
// Generer de la documentation
const docRequest = {
  code: complexFunction,
  style: "JSDoc",
  audience: "developers"
};
const documentation = await ai.generateDocs(docRequest);
\`\`\`

## Bonnes pratiques

1. Revoir et valider toute documentation generee
2. Ajouter des examples специфиques au projet
3. Maintenir un style cohérent
4. Enrichir avec du contexte business

## Pieges courants

1. Publier sans relecture humaine
2. Generer du contenu incorrect techniquement
3. Négliger les специфиités du domaine
4. Copier verbatim sans personalisation

Source : [AI Documentation Best Practices](https://documentation.divio.com)
`},
      ],
    },
    {
      id: 'ai-productivity',
      title: 'Productivité & Workflows',
      questions: [
        {
          id: 'ai-10',
          question: 'Comment intégrer l\'IA dans un workflow de code review ?',
          answer: "L'IA intervient à **deux niveaux** : en tant qu'**auteur** (revue auto de mon code avant le push) et en tant que **reviewer** (analyse des PRs de l'équipe).\n\nComme auteur : demander à l'IA de **relire** mon code pour les bugs évidents, violations de conventions, problèmes de sécurité, edge cases manquants. Comme reviewer : outils comme **CodeRabbit** ou **GitHub Copilot for PRs** font une première passe automatique.\n\nL'IA détecte les patterns courants (ressources non fermées, gestion d'erreurs manquante, injections SQL) mais **rate les problèmes de logique métier** et les contextes implicites.\n\n__L'IA automatise la review mécanique, l'humain reste essentiel pour la review conceptuelle.__",
        
          deepDive: `
# IA dans le Code Review

## Quest-ce que cest

L'IA peut analyser les PRs pour detecting les bugs, suggerer des améliorations et vérifier le respect des conventions de code.

## Syntaxe et exemples

Checks automatises :
- Detection de bugs potentiels
- Analyse de complexité
- Conformité aux standards
- Performance suggestions

\`\`\`typescript
// Integration CI/CD
const prAnalysis = {
  pr: pullRequest,
  rules: ["security", "performance", "style"],
  threshold: 0.8
};
const review = await ai.analyzePR(prAnalysis);
\`\`\`

## Bonnes pratiques

1. Configurer les regles selon le projet
2. Traiter les suggestions comme advisory
3. Combiner avec linting automatisé
4. Former l'équipe aux patterns detectés

## Pieges courants

1. Dependence aux suggestions automatiques
2. Ignorer les faux positifs
3. Négliger le contexte business
4. Traiter les warnings comme erreurs

Source : [AI Code Review Tools](https://github.com/features/copilot)
`},
        {
          id: 'ai-11',
          question: 'Comment mesurer le gain de productivité avec l\'IA ?',
          answer: "Métriques **quantitatives** : temps passé par tâche (avant/après IA), nombre de PRs mergées par sprint, temps de review réduit, couverture de tests augmentée.\n\nMétriques **qualitatives** : moins de bugs en production (l'IA catch des erreurs avant), meilleure documentation, onboarding plus rapide des nouveaux (l'IA explique le code legacy).\n\nAttention aux **fausses métriques** : plus de lignes de code ≠ plus de productivité. L'IA peut générer du code verbeux qui **augmente** la maintenance.\n\n__Le vrai gain est dans les tâches à faible valeur ajoutée : l'IA libère du temps pour les décisions complexes et la réflexion architecturale.__",
        
          deepDive: `
# Mesurer la Productivité IA

## Quest-ce que cest

Mesurer le gain de_productivite IA implique de quantifier le temps économisé, la qualité améliorée et les erreurs réduites. Several метрики are useful.

## Syntaxe et exemples

Métriques principales :
- Temps moyen par tâche (avant / après)
- Nombre de lignes générées / validées
- Taux d'erreurs avant/après review
- Velocity de l'équipe

\`\`\`typescript
// Tracker les metrics
const metrics = {
  tasksCompleted: 45,
  aiAssisted: 32, // 71%
  timeSaved: 12.5, // heures
  errorsCaught: 8
};
\`\`\`

## Bonnes pratiques

1. Etablir un baseline pre-implementation
2. Tracker le temps réellement économisé
3. Mesurer la qualité pas juste la productivité
4. Recueillir le feedback des équipes

## Pieges courants

1. Mesurer uniquement la vitesse
2. Ignorer la qualité des sorties
3. Négliger le temps de validation
4. Comparer des tâches non comparables

Source : [Measuring AI Productivity](https://github.com/blog/ai-productivity-metrics)
`},
        {
          id: 'ai-12',
          question: 'Quelles sont les limites actuelles des outils IA ?',
          answer: "**Hallucinations** : l'IA invente des API, bibliothèques ou solutions qui n'existent pas. **Contexte limité** : fenêtre de tokens finie, l'IA perd le fil sur de gros projets. **Pas de raisonnement systémique** : elle ne comprend pas les implications globales d'un changement.\n\n**Sécurité** : risque de leak de code propriétaire dans les modèles, suggestions contenant des vulnérabilités. **Dépendance** : risque de ne plus comprendre son propre code, de perdre en autonomie.\n\n**Biais** : l'IA reproduit les biais de son training data (code obsolète, anti-patterns populaires). **Licences** : code généré peut violer des licences open source.\n\n__L'IA est un multiplicateur de capacité, pas un substitut de compétence. Le développeur reste le garant de la qualité.__",
        
          deepDive: `
# Limites des Outils IA

## Quest-ce que cest

Les outils IA actuels ont des limitesKnown : manque de raisonnement complexe, connaissances-bornées, problèmes de confidentialité et de fiabilité.

## Syntaxe et exemples

Limites principales :
- Connaissances limitees dans le temps (cutoff)
- Pas de raisonnement multi-étapes fiable
- Difficulté avec les специфиités domain
- Vulnerabilite aux prompts adversarials

\`\`\`typescript
// Pattern de fallback
const response = await ai.generate(input);
if (!isReliable(response)) {
  return fallbackToManualProcess(input);
}
\`\`\`

## Bonnes pratiques

1. Connaitre les limites de chaque outil
2. Implementer des fallback humains
3. Tester sur des cas limites
4. Rester critique sur les sorties

## Pieges courants

1. Sur-estimer les capacités
2. Ignorer les cas d'erreur
3. Utiliser pour des tâches hors scope
4. Négliger la maintenance des prompts

Source : [AI Tools Limitations](https://arxiv.org/abs/2401.04111)
`},
      ],
    },
    {
      id: 'ai-ethics',
      title: 'Éthique & Bonnes Pratiques',
      questions: [
        {
          id: 'ai-13',
          question: 'Quelles sont les considérations éthiques de l\'utilisation de l\'IA ?',
          answer: "**Propriété intellectuelle** : le code généré peut provenir de sources sous licence — vérifier la politique de l'outil. **Transparence** : indiquer quand l'IA a été utilisée (dans les commits, la doc), ne pas présenter du code IA comme entièrement sien.\n\n**Qualité** : l'IA peut introduire des bugs subtils ou des anti-patterns — **responsabilité** du développeur. **Impact emploi** : l'IA automatise des tâches, pas des emplois — se former en continu reste essentiel.\n\n**Biais algorithmiques** : l'IA peut reproduire des discriminations présentes dans les données d'entraînement. **Surveillance** : attention aux données sensibles envoyées aux modèles cloud.\n\n__Règle d'or : je suis responsable du code que je livre, quelle que soit son origine — humaine ou IA.__",
        
          deepDive: `
# Considérations Éthiques de l'IA

## Quest-ce que cest

L'utilisation de l'IA soulève des questions éthiques : bias algorithmique, transparence, responsabilité, impact sur l'emploi et vie privée.

## Syntaxe et exemples

Points clés :
- Biais dans les données d'entraînement
- Transparence des décisions IA
- Responsabilité en cas d'erreur
- Protection des données personnelles

\`\`\`typescript
// Audit de bias
const biasCheck = {
  model: selectedModel,
  dataset: trainingData,
  protectedAttributes: ["gender", "race"],
  fairnessMetrics: ["disparate impact"]
};
const audit = await checkFairness(biasCheck);
\`\`\`

## Bonnes pratiques

1. Documenter l'usage de l'IA
2. Evaluer regulierement les biais
3. Maintenir la transparence
4. Respecter la vie privee

## Pieges courants

1. Ignorer les biais systemiques
2. Utiliser sans consentement
3. Deleguer des decisions ethiques
4. Manquer de accountability

Source : [AI Ethics Guidelines](https://www.ieee.org/ai-ethics)
`},
        {
          id: 'ai-14',
          question: 'Quelles données ne faut-il jamais envoyer à une IA ?',
          answer: "**Jamais** : mots de passe, clés API, tokens, secrets, certificats. **Jamais** : données personnelles (PII), données clients, données de santé, informations financières.\n\n**Jamais** : code propriétaire critique (algorithmes de trading, logique de sécurité), code sous licence restrictive sans autorisation.\n\n**Bonnes pratiques** : utiliser des outils **on-premise** ou avec garantie de non-rétention (Copilot Business, Claude pour entreprises), anonymiser les données avant envoi, utiliser des **variables d'environnement** pour les secrets.\n\nPolitique d'entreprise : vérifier la **DPA** (Data Processing Agreement) de l'outil IA, respecter le **RGPD** pour les données européennes.\n\n__Si vous ne feriez pas un `console.log()` de cette donnée, ne l'envoyez pas à une IA.__",
        
          deepDive: `
# Données à Risque pour l'IA

## Quest-ce que cest

Certaines données ne doivent jamais etre envoyees a une IA externe : secrets, donnees personnelles sensibles, Propriete intellectuelle, credentials.

## Syntaxe et exemples

Ne jamais envoyer :
- Clés API / passwords
- Données personnelles (RGPD)
- Code propriétaire confidentiel
- Secrets d'entreprise
- Données financieres non aggregées

\`\`\`typescript
// Validation pre-envoi
function canSendToAI(data: string): boolean {
  const riskyPatterns = [
    /password/i,
    /api[_-]?key/i,
    /\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b/, // cartes banca
    /ssn/i
  ];
  return !riskyPatterns.some(p => p.test(data));
}
\`\`\`

## Bonnes pratiques

1. Etablir une politique de données
2. Former les équipes
3. Utiliser des solutions on-premise
4. Scrubber les données sensibles

## Pieges courants

1. Confusion sur le lieu de traitement
2. Manque de politique claire
3. Oubli dans les prompts
4.信任 aveugle au provider

Source : [Data Security with AI](https://owasp.org/www-project-ai-security/)
`},
        {
          id: 'ai-15',
          question: 'Comment rester à jour avec l\'évolution rapide de l\'IA ?',
          answer: "**Sources techniques** : blogs de `OpenAI`, `Anthropic`, `Google AI`, newsletters comme **The Batch** (DeepLearning.AI), **TLDR AI**. **Pratique** : tester régulièrement les nouveaux outils, participer à des hackathons IA.\n\n**Communauté** : suivre les retours d'expérience sur les implémentations réelles (pas juste les démos marketing), échanger avec les pairs sur les workflows efficaces.\n\n**Mindset** : distinguer le **hype** de la valeur réelle. Pas besoin de tester chaque nouvel outil — se concentrer sur ceux qui s'intègrent dans le workflow existant.\n\n__L'IA évolue vite, mais les principes fondamentaux du développement restent : qualité, sécurité, maintenabilité. L'IA est un outil de plus dans la boîte.__",
        
          deepDive: `
# Rester à Jour avec l'IA

## Quest-ce que cest

L'ecosystème IA evolue extremement vite. Rester à jour necessite une stratégie combineant veille active, experimentation et communauté.

## Syntaxe et exemples

Strategies de veille :
- Newsletters techniques (The Batch, TLDR)
- Papers arXiv (filtrer par keyword)
- Blogs des providers (OpenAI, Anthropic)
- Communautés Discord / Reddit

\`\`\`typescript
// Agregateur de veille
const sources = [
  "https://arxiv.org/cs.AI",
  "https://news.ycombinator.com",
  "https://twitter.com/AndrewYNg"
];
const digest = await aggregateNews(sources);
\`\`\`

## Bonnes pratiques

1. Definir un temps hebdomadaire dedicated
2. Expérimenter regulierement avec les nouveaux outils
3. Partager les découvertes en équipe
4. Following les researchers clés

## Pieges courants

1. Information overload
2. Confondre hype et realité
3. Négliger les fondamentaux
4.追随 aveuglement tous les trends

Source : [Staying Current in AI](https://learn.deeplearning.ai)
`},
        {
          id: 'ai-16',
          question: 'Comment convaincre une équipe d\'adopter l\'IA ?',
          answer: "**Ne pas imposer** — montrer la valeur avec des **exemples concrets** : « cette tâche prenait 2h, maintenant 30min avec l'IA ». Commencer par les **quick wins** : autocomplétion, génération de tests, documentation.\n\n**Formation** : organiser des sessions pratiques, partager des prompts efficaces, créer un **canal Slack** d'échange IA. **Règles claires** : définir ce qu'on peut/confie à l'IA et ce qui reste manuel, politique de sécurité.\n\n**Mesurer** : tracker le gain de productivité pour prouver la valeur. **Rassurer** : l'IA ne remplace personne, elle élimine les tâches répétitives pour se concentrer sur l'interesting work.\n\n__L'adoption vient naturellement quand les développeurs voient le gain par eux-mêmes. Forcer l'outil crée de la résistance.__",
        
          deepDive: `
# Convaincre une Équipe d'Adopter l'IA

## Quest-ce que cest

Persuader une équipe d'adopter l'IA nécéssite de démontrer la valeur, adresser les fears et montrer des gains concrets. La résistance vient souvent du manque de familiarité.

## Syntaxe et exemples

Strategies efficaces :
- Demontrer sur des cas concrets de l'équipe
- Commencer par des tâches à quick wins
- Montrer le temps économisé concrètement
- Addresser les fears de remplacement

\`\`\`typescript
// Demo concrete
const demoCase = {
  task: "generer documentation API",
  timeBefore: 45, // minutes
  timeAfter: 5, // minutes avec IA
  improvement: "9x faster"
};
// Partager les résultats équipe
\`\`\`

## Bonnes pratiques

1. Commencer petit avec des POC
2. Montrer des résultats avant de demander adoption
3. Impliquer les skeptics comme early adopters
4. Fournir formation et support

## Pieges courants

1. Imposer sans consensus
2. Promettre trop d'efficacité
3. Ignorer les préoccupations
4. Négliger la courbe d'apprentissage

Source : [Leading AI Adoption](https://hbr.org/ai-leadership)
`},
      ],
    },
    {
      id: 'ai-advanced',
      title: 'Concepts & Intégration',
      questions: [
        {
          id: 'ai-17',
          question: 'Quelle est la différence entre IA générative et IA prédictive ?',
          answer: "**IA prédictive** : analyse des données existantes pour **prédire** un résultat (classification, régression, recommandation). Exemples : détection de fraude, recommandation Netflix, prévision de demande.\n\n**IA générative** : crée du **nouveau contenu** (texte, code, images) à partir de patterns appris. Exemples : ChatGPT, Copilot, Midjourney, Stable Diffusion.\n\nEn développement, l'IA **prédictive** sert à l'analyse (prédiction de bugs, estimation de charge), l'IA **générative** sert à la création (code, doc, tests).\n\n__Les deux se complètent : la prédictive pour les décisions basées sur les données, la générative pour l'accélération de la production.__",
        
          deepDive: `
# IA Générative vs IA Prédictive

## Quest-ce que cest

L'IA générative cree du contenu nouveau (text, images, code) tandis que l'IA prédictive analyse des données pour predire des résultats futurs.

## Syntaxe et exemples

IA Générative :
- GPT, Claude, DALL-E
- Creé du contenu original
- Tasks : generation, summarisation, translation

IA Prédictive :
- Regression, classification
- Anticipe des événements
- Tasks : forecasting, risk scoring, anomaly detection

\`\`\`typescript
// Choisir selon le use case
const useCase = "generer du code";
const modelType = useCase.type === "create" ? "generative" : "predictive";
// Generative : GPT-4, Claude
// Predictive : sklearn, XGBoost
\`\`\`

## Bonnes pratiques

1. Definir clairement le besoin (creer vs predire)
2. Choisir le bon type de modele
3. Combinér les deux pour des tasks complexes
4. Evaluer les performances séparément

## Pieges courants

1. Utiliser génératif pour des tasks prédictives
2. Confondre les deux approches
3. Négliger les couts de génération
4. Ignorer les limitations de chaque type

Source : [Generative vs Predictive AI](https://blogs.nvidia.com/generative-ai)
`},
        {
          id: 'ai-18',
          question: 'RAG (Retrieval-Augmented Generation) — c\'est quoi ?',
          answer: "**RAG** enrichit les réponses d'un LLM avec des **documents externes** en temps réel. Au lieu de compter uniquement sur les connaissances du modèle (figées à la date d'entraînement), on **recherche** d'abord les documents pertinents, puis on les injecte dans le prompt.\n\nPipeline : **Query** → Retrieval (recherche vectorielle dans une base de connaissances) → **Augmented prompt** (question + documents trouvés) → **Génération** par le LLM.\n\nCas d'usage : chatbot qui répond d'après la **documentation interne** de l'entreprise, assistant qui cite les **politiques RH**, support client basé sur les **tickets passés**.\n\n__RAG = LLM + base de connaissances à jour. C'est le pattern le plus utilisé en entreprise pour l'IA.__",
        
          deepDive: `
# RAG - Retrieval-Augmented Generation

## Quest-ce que cest

RAG combine retrieval de documents avec generation de texte. Le modele recupere des informations pertinents d'une base de connaissances avant de générer une réponse.

## Syntaxe et exemples

Architecture RAG :
1. Indexer les documents (embeddings)
2. Retrieval selon la query
3. Augmenter le prompt avec le context
4. Generation avec le context récupérer

\`\`\`typescript
// RAG Pipeline
const query = "comment installer Angular CLI";
const relevantDocs = await vectorStore.similaritySearch(query, 3);
const context = relevantDocs.map(d => d.content).join("\\n");
const prompt = \`Context: \${context}\\n\\nQuestion: \${query}\`;
const response = await llm.complete(prompt);
\`\`\`

## Bonnes pratiques

1. Chunker intelligemment les documents
2. Utiliser des embeddings de qualité
3. Limiter le nombre de documents retrieved
4. Tester differentes stratégies de ranking

## Pieges courants

1. Indexer des documents non fiables
2. Retrieval trop large ou trop étroit
3. Ignorer les mises a jour des documents
4. Trop зависимости du retrieval

Source : [RAG Architecture](https://arxiv.org/abs/2312.10991)
`},
        {
          id: 'ai-19',
          question: 'Comment intégrer l\'IA dans une application ?',
          answer: "**Trois approches** : API directe (`OpenAI API`, `Anthropic API`) pour des cas simples, **framework** (`LangChain`, `LlamaIndex`) pour des pipelines complexes, **modèle local** (`Ollama`, `LM Studio`) pour la confidentialité.\n\nPattern classique : **Backend** → appel API → traitement de la réponse → retour au frontend. Ne **jamais** appeler l'API IA directement depuis le frontend (coût, sécurité, clé API exposée).\n\nConsidérations : **rate limiting** (coût par token), **latence** (streaming pour les réponses longues), **fallback** (que faire si l'API est down), **cachée** (même question = même réponse).\n\n__En production : monitorer les coûts, implémenter le retry, cachéer les réponses fréquentes, toujours valider les sorties.__",
          code: '// Spring Boot — appel API OpenAI\n@Service\npublic class AiService {\n  private final RestTemplate restTemplate;\n  @Value("${openai.api.key}")\n  private String apiKey;\n\n  public String complete(String prompt) {\n    var request = Map.of(\n      "model", "gpt-4",\n      "messages", List.of(Map.of("role","user","content",prompt))\n    );\n    var headers = new HttpHeaders();\n    headers.setBearerAuth(apiKey);\n    // ... appel + gestion erreurs + cachée\n  }\n}',
          language: 'java',
        
          deepDive: `
# Intégrer l'IA dans une Application

## Quest-ce que cest

Integrer l'IA dans une application peut se faire via API (OpenAI, Anthropic), SDKs，或者是 modèles self-hosted. Le choix dépend des besoins de confidentialite et de performance.

## Syntaxe et exemples

Options d'intégration :
- API tierces (OpenAI, Anthropic, Google)
- SDKs clients (Langchain, LlamaIndex)
- Modèles self-hosted (Ollama, vLLM)
- Fine-tuning sur données propres

\`\`\`typescript
// Integration API simple
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  })
});
\`\`\`

## Bonnes pratiques

1. Commencer avec une API simple
2. Implementer du retry et error handling
3. Ajouter du caching si pertinent
4. Monitorer les couts et performances

## Pieges courants

1. Négliger la sécurité des clés API
2. Pas de fallback en cas d'indisponibilité
3. Ignorer les latences
4. Trop de dependances au provider

Source : [Building with AI APIs](https://platform.openai.com/docs)
`},
        {
          id: 'ai-20',
          question: 'Agents IA et LLM agents — c\'est quoi ?',
          answer: "Un **agent IA** est un système où le LLM ne se contente pas de générer du texte — il **prend des décisions** et **exécute des actions** de manière autonome via des **outils** (tools/functions).\n\nArchitecture : le LLM reçoit une tâche → **raisonne** (planning) → **choisit** un outil → **exécute** → observe le résultat → **itération** jusqu'à résolution. C'est le pattern **ReAct** (Reason + Act).\n\nExemples : un agent qui peut **chercher sur le web**, **exécuter du code**, **interroger une BDD**, **envoyer un email** — le LLM décide quand et comment utiliser chaque outil.\n\nFrameworks : **LangChain Agents**, **AutoGPT**, **CrewAI**, **Microsoft AutoGen**.\n\n__Les agents sont la prochaine étape après les simples chatbots — mais ils nécessitent des garde-fous stricts pour éviter les actions non désirées.__",
        
          deepDive: `
# Agents IA et LLM Agents

## Quest-ce que cest

Un LLM Agent est un système où un modele de langage peut reasoning, planifier et exécuter des actions (tool use) de manière autonome pour accomplir des tâches.

## Syntaxe et exemples

Composants d'un Agent :
- Modele de langage (brain)
- Tools (code executor, web search, file system)
- Planning (task decomposition)
- Memory (état entre étapes)

\`\`\`typescript
// Agent simple
const agent = {
  model: "claude-3-opus",
  tools: [webSearch, codeExecutor, fileRead],
  maxSteps: 10
};
const result = await agent.run("Find all TODO comments in the codebase and create a summary");
\`\`\`

## Bonnes pratiques

1. Definir clairement les tools disponibles
2. Implementer du guardrails
3. Limiter le nombre d'étapes
4. Ajouter de la validation entre étapes

## Pieges courants

1. Pas de limites sur les actions
2. Hallucinations amplifiées sur plusieurs étapes
3. Loop infinies sans stopping criteria
4. Négliger la sécurité des tools

Source : [LLM Agents Guide](https://arxiv.org/abs/2308.03688)
`},
      ],
    },
  ],
};