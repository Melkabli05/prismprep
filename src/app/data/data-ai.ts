import type { InterviewCategory } from '../models/interview.models';

export const aiCategory: InterviewCategory = {
  id: 'ai',
  title: 'IA & Outils IA',
  color: 'bg-violet-100 text-violet-700',
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
        },
        {
          id: 'ai-2',
          question: 'Quels outils IA utilisez-vous ?',
          answer: "**GitHub Copilot** : autocomplétion intelligente dans l'IDE, suggestions en temps réel, génération de fonctions entières. **ChatGPT / Claude** : conversations détaillées pour l'architecture, le debugging complexe, l'explication de concepts.\n\n**Cursor** : IDE basé sur l'IA avec editing contextuel. **Amazon CodeWhisperer / Q** : suggestions orientées AWS. **JetBrains AI** : intégré dans IntelliJ/WebStorm.\n\nPour les ops : **AI dans Datadog** (analyse d'incidents), **AI dans PR reviews** (CodeRabbit). Pour la documentation : **Mintlify**.\n\n__Le choix dépend du contexte — Copilot pour le code, ChatGPT/Claude pour la réflexion.__",
        },
        {
          id: 'ai-3',
          question: 'Quelle est votre approche du prompt engineering ?',
          answer: "Un bon prompt suit la structure **Rôle → Contexte → Tâche → Format** : définir le **rôle** de l'IA (« Tu es un architecte Java senior »), donner le **contexte** technique précis (stack, contraintes, version), formuler la **tâche** clairement, et spécifier le **format** de sortie attendu.\n\nTechniques clés : **few-shot prompting** (donner 2-3 exemples), **chain-of-thought** (« raisonne étape par étape »), **itération** (affiner progressivement au lieu d'un seul prompt parfait).\n\n__Plus le contexte est précis, meilleure est la réponse. Un prompt vague donne une réponse vague.__",
          example: 'Prompt faible : « Écris un service Java »\nPrompt fort : « Tu es un développeur Spring Boot senior. Écris un service REST pour gérer des commandes (CRUD) avec validation, gestion d\'erreurs, et JPA. Utilise Spring Boot 3, Java 17. Format : classe complète avec commentaires. »',
        },
        {
          id: 'ai-4',
          question: 'Quelles tâches déléguez-vous à l\'IA vs ce que vous faites manuellement ?',
          answer: "**À l'IA** : boilerplate et scaffolding, tests unitaires simples, documentation Javadoc/README, conversion de formats (JSON → POJO), refactorings mécaniques, explication de code existant, recherche de bugs évidents.\n\n**Manuellement** : décisions d'architecture, review de sécurité, logique métier critique, algorithmes complexes, debugging de problèmes subtils, design d'API publique.\n\n**En collaboration** : optimisation de performances (l'IA propose, je benchmark), rédaction technique (l'IA draft, je refine), exploration de solutions (l'IA brainstorm, je choisis).\n\n__Règle : si l'erreur a un coût élevé → je le fais moi-même. Si l'erreur est rattrapable → l'IA accélère.__",
        },
        {
          id: 'ai-5',
          question: 'Comment gérez-vous les hallucinations de l\'IA ?',
          answer: "Les **hallucinations** sont des réponses plausibles mais factuellement incorrectes (API inexistantes, méthodes inventées, paramètres faux). Je les gère par **vérification systématique**.\n\nStratégies : **croiser avec la documentation officielle** (javadoc, MDN, docs Spring), **tester le code généré** immédiatement, **ne jamais copier-coller sans lire**, vérifier les **imports et dépendances** (l'IA invente souvent des bibliothèques).\n\nSignaux d'alerte : réponse trop **confiante** sans source, code qui **compile pas**, API qui n'existe pas dans la version indiquée.\n\n__L'IA est un accélérateur de productivité, pas un oracle. Toujours valider avant d'intégrer.__",
        },
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
        },
        {
          id: 'ai-7',
          question: 'Comment utiliser l\'IA pour les tests ?',
          answer: "L'IA **génère rapidement** des tests unitaires de base : cas nominaux, cas limites évidents (null, vide, overflow), paramètres invalides. Elle comprend le code à tester et crée les mocks/stubs nécessaires.\n\nPour les **tests d'intégration** : l'IA peut scaffold les configurations `@SpringBootTest`, les setups de base de données de test. Pour les **tests E2E** : génération de scénarios Playwright/Cypress.\n\nAttention : l'IA génère souvent des tests qui **passent toujours** sans vraiment tester la logique (tests tautologiques). Il faut **revoir** chaque test pour vérifier qu'il détecterait effectivement une régression.\n\n__L'IA excelle pour la couverture quantitative, je m'assure de la qualité qualitative.__",
          code: '// AI-generated test — à valider !\n@Test\nvoid shouldReturnEmptyWhenNoOrders() {\n  when(orderRepo.findAll()).thenReturn(List.of());\n  assertThat(orderService.getOrders()).isEmpty();\n}\n\n@Test\nvoid shouldThrowWhenNullInput() {\n  assertThatThrownBy(() -> service.process(null))\n    .isInstanceOf(IllegalArgumentException.class);\n}',
          language: 'java',
        },
        {
          id: 'ai-8',
          question: 'Comment utiliser l\'IA pour la refactorisation ?',
          answer: "L'IA est excellente pour les **refactorings mécaniques** : renommage cohérent dans tout le projet, extraction de méthodes, conversion de syntaxe (Java 8 → Java 17, callbacks → async/await), migration de frameworks.\n\nProcessus : décrire le **refactoring souhaité** avec le pattern source et cible, fournir le **fichier/la classe** à refactorer, vérifier chaque changement dans la **diff du PR**.\n\nL'IA gère aussi : séparation de gros monolithes en modules, modernisation de code legacy, application de **design patterns** sur du code procédural.\n\n__J'utilise l'IA pour les refactorings de grande ampleur mais je valide chaque fichier modifié — un refactoring mal fait est pire que pas de refactoring.__",
        },
        {
          id: 'ai-9',
          question: 'Comment utiliser l\'IA pour la documentation ?',
          answer: "L'IA **génère rapidement** : Javadoc/JavaDoc pour les classes et méthodes, README de projet, guides d'installation, changelogs à partir de commits, commentaires inline pour la logique complexe.\n\nProcessus : partager le code source → demander la documentation au format souhaité → **revoir et corriger** (l'IA peut mal décrire l'intention, omettre des effets de bord, générer des docs génériques).\n\nL'IA est aussi utile pour **traduire** la documentation technique en langage métier pour les parties prenantes non-techniques.\n\n__La doc générée par IA est un **brouillon**. Le développeur doit s'assurer qu'elle reflète exactement le comportement réel du code.__",
        },
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
        },
        {
          id: 'ai-11',
          question: 'Comment mesurer le gain de productivité avec l\'IA ?',
          answer: "Métriques **quantitatives** : temps passé par tâche (avant/après IA), nombre de PRs mergées par sprint, temps de review réduit, couverture de tests augmentée.\n\nMétriques **qualitatives** : moins de bugs en production (l'IA catch des erreurs avant), meilleure documentation, onboarding plus rapide des nouveaux (l'IA explique le code legacy).\n\nAttention aux **fausses métriques** : plus de lignes de code ≠ plus de productivité. L'IA peut générer du code verbeux qui **augmente** la maintenance.\n\n__Le vrai gain est dans les tâches à faible valeur ajoutée : l'IA libère du temps pour les décisions complexes et la réflexion architecturale.__",
        },
        {
          id: 'ai-12',
          question: 'Quelles sont les limites actuelles des outils IA ?',
          answer: "**Hallucinations** : l'IA invente des API, bibliothèques ou solutions qui n'existent pas. **Contexte limité** : fenêtre de tokens finie, l'IA perd le fil sur de gros projets. **Pas de raisonnement systémique** : elle ne comprend pas les implications globales d'un changement.\n\n**Sécurité** : risque de leak de code propriétaire dans les modèles, suggestions contenant des vulnérabilités. **Dépendance** : risque de ne plus comprendre son propre code, de perdre en autonomie.\n\n**Biais** : l'IA reproduit les biais de son training data (code obsolète, anti-patterns populaires). **Licences** : code généré peut violer des licences open source.\n\n__L'IA est un multiplicateur de capacité, pas un substitut de compétence. Le développeur reste le garant de la qualité.__",
        },
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
        },
        {
          id: 'ai-14',
          question: 'Quelles données ne faut-il jamais envoyer à une IA ?',
          answer: "**Jamais** : mots de passe, clés API, tokens, secrets, certificats. **Jamais** : données personnelles (PII), données clients, données de santé, informations financières.\n\n**Jamais** : code propriétaire critique (algorithmes de trading, logique de sécurité), code sous licence restrictive sans autorisation.\n\n**Bonnes pratiques** : utiliser des outils **on-premise** ou avec garantie de non-rétention (Copilot Business, Claude pour entreprises), anonymiser les données avant envoi, utiliser des **variables d'environnement** pour les secrets.\n\nPolitique d'entreprise : vérifier la **DPA** (Data Processing Agreement) de l'outil IA, respecter le **RGPD** pour les données européennes.\n\n__Si vous ne feriez pas un `console.log()` de cette donnée, ne l'envoyez pas à une IA.__",
        },
        {
          id: 'ai-15',
          question: 'Comment rester à jour avec l\'évolution rapide de l\'IA ?',
          answer: "**Sources techniques** : blogs de `OpenAI`, `Anthropic`, `Google AI`, newsletters comme **The Batch** (DeepLearning.AI), **TLDR AI**. **Pratique** : tester régulièrement les nouveaux outils, participer à des hackathons IA.\n\n**Communauté** : suivre les retours d'expérience sur les implémentations réelles (pas juste les démos marketing), échanger avec les pairs sur les workflows efficaces.\n\n**Mindset** : distinguer le **hype** de la valeur réelle. Pas besoin de tester chaque nouvel outil — se concentrer sur ceux qui s'intègrent dans le workflow existant.\n\n__L'IA évolue vite, mais les principes fondamentaux du développement restent : qualité, sécurité, maintenabilité. L'IA est un outil de plus dans la boîte.__",
        },
        {
          id: 'ai-16',
          question: 'Comment convaincre une équipe d\'adopter l\'IA ?',
          answer: "**Ne pas imposer** — montrer la valeur avec des **exemples concrets** : « cette tâche prenait 2h, maintenant 30min avec l'IA ». Commencer par les **quick wins** : autocomplétion, génération de tests, documentation.\n\n**Formation** : organiser des sessions pratiques, partager des prompts efficaces, créer un **canal Slack** d'échange IA. **Règles claires** : définir ce qu'on peut/confie à l'IA et ce qui reste manuel, politique de sécurité.\n\n**Mesurer** : tracker le gain de productivité pour prouver la valeur. **Rassurer** : l'IA ne remplace personne, elle élimine les tâches répétitives pour se concentrer sur l'interesting work.\n\n__L'adoption vient naturellement quand les développeurs voient le gain par eux-mêmes. Forcer l'outil crée de la résistance.__",
        },
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
        },
        {
          id: 'ai-18',
          question: 'RAG (Retrieval-Augmented Generation) — c\'est quoi ?',
          answer: "**RAG** enrichit les réponses d'un LLM avec des **documents externes** en temps réel. Au lieu de compter uniquement sur les connaissances du modèle (figées à la date d'entraînement), on **recherche** d'abord les documents pertinents, puis on les injecte dans le prompt.\n\nPipeline : **Query** → Retrieval (recherche vectorielle dans une base de connaissances) → **Augmented prompt** (question + documents trouvés) → **Génération** par le LLM.\n\nCas d'usage : chatbot qui répond d'après la **documentation interne** de l'entreprise, assistant qui cite les **politiques RH**, support client basé sur les **tickets passés**.\n\n__RAG = LLM + base de connaissances à jour. C'est le pattern le plus utilisé en entreprise pour l'IA.__",
        },
        {
          id: 'ai-19',
          question: 'Comment intégrer l\'IA dans une application ?',
          answer: "**Trois approches** : API directe (`OpenAI API`, `Anthropic API`) pour des cas simples, **framework** (`LangChain`, `LlamaIndex`) pour des pipelines complexes, **modèle local** (`Ollama`, `LM Studio`) pour la confidentialité.\n\nPattern classique : **Backend** → appel API → traitement de la réponse → retour au frontend. Ne **jamais** appeler l'API IA directement depuis le frontend (coût, sécurité, clé API exposée).\n\nConsidérations : **rate limiting** (coût par token), **latence** (streaming pour les réponses longues), **fallback** (que faire si l'API est down), **cache** (même question = même réponse).\n\n__En production : monitorer les coûts, implémenter le retry, cacher les réponses fréquentes, toujours valider les sorties.__",
          code: '// Spring Boot — appel API OpenAI\n@Service\npublic class AiService {\n  private final RestTemplate restTemplate;\n  @Value("${openai.api.key}")\n  private String apiKey;\n\n  public String complete(String prompt) {\n    var request = Map.of(\n      "model", "gpt-4",\n      "messages", List.of(Map.of("role","user","content",prompt))\n    );\n    var headers = new HttpHeaders();\n    headers.setBearerAuth(apiKey);\n    // ... appel + gestion erreurs + cache\n  }\n}',
          language: 'java',
        },
        {
          id: 'ai-20',
          question: 'Agents IA et LLM agents — c\'est quoi ?',
          answer: "Un **agent IA** est un système où le LLM ne se contente pas de générer du texte — il **prend des décisions** et **exécute des actions** de manière autonome via des **outils** (tools/functions).\n\nArchitecture : le LLM reçoit une tâche → **raisonne** (planning) → **choisit** un outil → **exécute** → observe le résultat → **itération** jusqu'à résolution. C'est le pattern **ReAct** (Reason + Act).\n\nExemples : un agent qui peut **chercher sur le web**, **exécuter du code**, **interroger une BDD**, **envoyer un email** — le LLM décide quand et comment utiliser chaque outil.\n\nFrameworks : **LangChain Agents**, **AutoGPT**, **CrewAI**, **Microsoft AutoGen**.\n\n__Les agents sont la prochaine étape après les simples chatbots — mais ils nécessitent des garde-fous stricts pour éviter les actions non désirées.__",
        },
      ],
    },
  ],
};