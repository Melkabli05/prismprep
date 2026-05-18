import type { InterviewCategory } from '../models/interview.models';

export const devopsCategory: InterviewCategory = {
  id: 'devops',
  title: 'DevOps',
  color: 'bg-slate-100 text-slate-700',
  description: 'Docker, CI/CD, Kubernetes, IaC',
  sections: [
    {
      id: 'dv-conteneurs',
      title: 'Conteneurisation',
      questions: [
        {
          id: 'dv-1',
          question: 'Docker',
          answer: "Outil de **conteneurisation** : package l'application avec toutes ses dépendances dans un **conteneur** léger et portable. Contrairement à une VM, le conteneur partage le noyau hôte — démarrage rapide, empreinte minimale.\n\nLe même conteneur tourne de façon identique du laptop du dev à la production. Le `Dockerfile` décrit la construction de l'image, distribuée via un registre (`Docker Hub`).\n\n**Standard de fait** pour le déploiement, brique de base de `Kubernetes`.",
          code: 'FROM openjdk:17-jdk-slim\nCOPY target/app.jar /app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "/app.jar"]',
          language: 'dockerfile',
        },
        {
          id: 'dv-2',
          question: 'Docker vs VM',
          answer: "**VM** : émule un système complet (OS, noyau, libs) — lourde (Go), démarrage en minutes, isolation totale. **Conteneur Docker** : partage le noyau hôte, isole via namespaces/cgroups — léger (Mo), démarrage en secondes.\n\nLes conteneurs sont **plus rapides** et **plus efficaces** en ressources. Les VM restent nécessaires pour isoler des OS différents ou des noyaux différents.\n\nEn pratique : conteneurs pour les applications, VMs pour l'infrastructure de base. __Les deux coexistent — les conteneurs tournent souvent dans des VMs.__",
        },
        {
          id: 'dv-3',
          question: 'Docker Compose',
          answer: "Outil orchestrant **multi-conteneurs** sur une seule machine. Un fichier `docker-compose.yml` définit les services (app, BDD, cache), leurs dépendances et leur configuration réseau.\n\nUne seule commande `docker compose up` démarre toute la stack. Idéal pour le **développement local** : chaque dev a le même environnement sans installer PostgreSQL, Redis, etc.\n\nNe remplace pas Kubernetes (pas de scaling, pas de haute dispo) — c'est un outil **développement/test**, pas production.",
          code: 'services:\n  app:\n    build: .\n    ports: ["8080:8080"]\n    depends_on: [db]\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret',
          language: 'yaml',
        },
        {
          id: 'dv-4',
          question: 'Kubernetes',
          answer: "**Orchestrateur de conteneurs** pour gérer des dizaines/centaines de conteneurs : déploiement sur cluster, **scaling automatique** (`HPA`), load balancing, résilience (health checks, redémarrages auto), rolling updates et rollbacks, gestion des secrets et config.\n\nArchitecture **déclarative** (`YAML` décrivant l'état souhaité). Courbe d'apprentissage raide (`Pods`, `Deployments`, `Services`, `Ingress`, `ConfigMaps`…).\n\nBeaucoup d'équipes utilisent des solutions managées (`EKS`, `GKE`) pour éviter de gérer le control plane.",
        },
      ],
    },
    {
      id: 'dv-pipeline',
      title: 'CI/CD & Déploiement',
      questions: [
        {
          id: 'dv-5',
          question: 'CI/CD',
          answer: "**CI** (`Continuous Integration`) : intégration régulière du code avec **pipeline automatique** (compilation, tests, analyse) à chaque push pour détecter les problèmes tôt.\n\n**CD** : `Continuous Delivery` (déploiement semi-auto avec validation) ou `Continuous Deployment` (full auto, chaque commit testé arrive en prod).\n\nBénéfices : moins d'erreurs humaines, livraisons fréquentes et fiables, *feedback loop court*. Outils : `Jenkins`, `GitLab CI`, `GitHub Actions`, `CircleCI`.",
        },
        {
          id: 'dv-6',
          question: 'Stratégies de déploiement',
          answer: "**Rolling update** (défaut K8s) : remplacement progressif des pods — zero-downtime, mais rollback lent. **Blue-green** : deux environnements identiques, bascule instantanée par switch de trafic — rollback immédiat mais coûteux en ressources.\n\n**Canary** : déploiement sur un petit % du trafic d'abord, augmentation progressive si OK — détection précoce des problèmes. **Feature flags** : activation/désactivation sans redéploiement.\n\n__Le choix dépend du risque toléré et du budget infrastructure.__",
        },
        {
          id: 'dv-7',
          question: 'GitOps',
          answer: "Pratique où **Git est la source de vérité** pour l'infrastructure et les déploiements. Tout changement passe par un **commit + PR** dans un dépôt Git, puis un outil (`ArgoCD`, `Flux`) synchronise automatiquement le cluster avec l'état déclaré.\n\nAvantages : **audit trail** natif (historique Git), **rollbacks** via `git revert`, **revue de code** sur les changements d'infra, **drift detection** (alerte si le cluster dérive).\n\n__GitOps = IaC + CI/CD + revue de code pour l'infrastructure.__",
        },
      ],
    },
    {
      id: 'dv-infra',
      title: 'Infrastructure & Observabilité',
      questions: [
        {
          id: 'dv-8',
          question: 'Infrastructure as Code (IaC)',
          answer: "Gérer l'infrastructure via du **code versionné** au lieu de clics manuels. `Terraform` (multi-cloud, déclaratif, état versionné) est le leader. `Ansible` cible la configuration de serveurs (idempotent, procédural).\n\nAvantages : **reproductibilité** (même infra à l'identique), **versionning** (historique des changements), **auditabilité**, **automatisation** du provisioning.\n\n__Règle : si ce n'est pas dans le code, ça n'existe pas.__ L'infrastructure manuelle est un risque (snowflake servers).",
          code: '# Terraform\nresource "aws_instance" "app" {\n  ami           = "ami-123456"\n  instance_type = "t3.micro"\n}',
          language: 'hcl',
        },
        {
          id: 'dv-9',
          question: 'Monitoring & Logging',
          answer: "**Monitoring** : métriques en temps réel (CPU, mémoire, latence, throughput) via `Prometheus` + `Grafana` pour la visualisation. Alertes configurées sur les seuils critiques.\n\n**Logging** : centralisation des logs via `ELK Stack` (Elasticsearch, Logstash, Kibana) ou `Loki` + `Grafana`. Corrélation des logs entre services via le **trace ID**.\n\n__En production, sans monitoring et logging, vous êtes aveugle__. Les incidents se détectent et se résolvent 10x plus vite avec les bons outils.",
        },
        {
          id: 'dv-10',
          question: 'Distributed tracing',
          answer: "Dans une chaîne d'appels inter-services, un seul requête utilisateur peut traverser **5-10 services**. Le *distributed tracing* suit le parcours complet via un **correlation ID** (`trace ID`) unique propagé de service en service.\n\nOutils : **Jaeger**, **Zipkin**, **AWS X-Ray**. Visualisation : timeline de chaque span (unité de travail) dans la trace.\n\n__Indispensable pour diagnostiquer les problèmes de latence et les erreurs en architecture distribuée.__ Sans tracing, le debugging est quasi impossible.",
        },
      ],
    },
  ],
};