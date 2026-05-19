import type { InterviewCategory } from '../../../../core/models/interview.models';

export const cloudCategory: InterviewCategory = {
  id: 'cloud',
  title: 'Cloud',
  color: 'background: var(--color-info); color: white',
  description: 'AWS, Azure, concepts cloud, serverless',
  sections: [
    {
      id: 'cloud-fondamentaux',
      title: 'Fondamentaux Cloud',
      questions: [
        {
          id: 'cloud-1',
          question: 'Quelle est la différence entre IaaS, PaaS et SaaS ?',
          answer: '**IaaS** (*Infrastructure as a Service*) : le fournisseur fournit les serveurs virtuels, le stockage et le réseau — vous gérez l\'OS, le runtime et l\'application (ex: `EC2`, `Azure VMs`). **PaaS** : le fournisseur gère l\'OS et le runtime — vous déployez juste le code (ex: `Heroku`, `Azure App Service`, `Elastic Beanstalk`). **SaaS** : application clé en main, rien à gérer (ex: `Gmail`, `Salesforce`).\n\nPlus on monte vers SaaS, moins on contrôle, plus on gagne en productivité.\n\n__Le choix dépend du contrôle voulu vs la productivité recherchée.__ En startup, on privilégie PaaS pour aller vite.',
        },
        {
          id: 'cloud-2',
          question: 'Quels sont les services AWS essentiels à connaître ?',
          answer: '**Compute** : `EC2` (serveurs virtuels), `Lambda` (serverless), `ECS`/`EKS` (conteneurs). **Stockage** : `S3` (objets/files), `EBS` (volumes pour EC2). **BDD** : `RDS` (SQL managé), `DynamoDB` (NoSQL serverless), `Aurora` (SQL haute perf).\n\n**Réseau** : `VPC` (réseau privé), `Route 53` (DNS), `CloudFront` (CDN). **Autre** : `IAM` (identité), `CloudFormation` (IaC), `SQS`/`SNS` (messagerie), `CloudWatch` (monitoring).\n\n__Pour un entretien, maîtrisez EC2, S3, RDS, Lambda, IAM et VPC — ce sont les basiques indispensables.__',
        },
        {
          id: 'cloud-3',
          question: 'Que sont les régions et zones de disponibilité ?',
          answer: 'Une **région** est un ensemble de data centers géographiquement isolés (ex: `eu-west-1` = Irlande). Chaque région contient plusieurs **Availability Zones** (AZ) — des data centers physiquement séparés avec alimentation et réseau indépendants.\n\nDéployer sur **plusieurs AZs** assure la haute disponibilité : si un data center tombe, les autres prennent le relais. Déployer sur **plusieurs régions** assure la reprise après sinistre (DR) et la faible latence pour les utilisateurs mondiaux.\n\n__Règle : au minimum 2 AZs en production pour la haute disponibilité.__ Le choix de région impacte latence, coûts et conformité (RGPD → données en Europe).',
        },
        {
          id: 'cloud-4',
          question: 'Qu\'est-ce que l\'auto-scaling ?',
          answer: 'L\'**auto-scaling** ajuste automatiquement le nombre d\'instances en fonction de la charge : **scale-out** (ajout d\'instances) quand la charge monte, **scale-in** (retrait) quand elle baisse.\n\nSe configure via des **métriques** : CPU > 70% → scale-out, CPU < 30% → scale-in. Sur AWS : `Auto Scaling Groups` + `Application Load Balancer`. Sur Kubernetes : `HPA` (*Horizontal Pod Autoscaler*).\n\n__L\'auto-scaling réduit les coûts (on ne paie que ce qu\'on utilise) et assure la résilience sous charge.__ Configurez aussi un *minimum* d\'instances pour absorber les montées en charge soudaines.',
          code: '# AWS Auto Scaling Group\nMinSize: 2\nMaxSize: 10\nDesiredCapacity: 3\n\n# Policies\nScaleOut: CPU > 70% → +2 instances\nScaleIn:  CPU < 30% → -1 instance',
          language: 'yaml',
        },
        {
          id: 'cloud-5',
          question: 'CloudFormation vs Terraform : quel IaC choisir ?',
          answer: '**`CloudFormation`** : IaC native AWS, syntaxe `JSON`/`YAML`, gère uniquement l\'écosystème AWS, gratuit, intégration native avec les services AWS.\n\n**`Terraform`** : IaC **multi-cloud** (`AWS` + `Azure` + `GCP` + on-premise), syntaxe `HCL` plus lisible, état versionné, énorme communauté et registry de modules.\n\n__Si vous êtes 100% AWS, CloudFormation est pertinent. Sinon, Terraform est le choix par défaut__ grâce à sa portabilité et son écosystème. En pratique, Terraform domine le marché de l\'IaC.',
          code: '# Terraform\nresource "aws_s3_bucket" "app_data" {\n  bucket = "mon-app-data"\n}\n\nresource "aws_instance" "web" {\n  ami           = "ami-123456"\n  instance_type = "t3.micro"\n}',
          language: 'hcl',
        },
      ],
    },
    {
      id: 'cloud-serverless',
      title: 'Services & Serverless',
      questions: [
        {
          id: 'cloud-6',
          question: 'Qu\'est-ce que le serverless et quels sont ses avantages ?',
          answer: 'Le **serverless** ne signifie pas « sans serveur » — c\'est le fournisseur qui gère les serveurs. Vous ne provisionnez rien, vous **déployez du code** qui s\'exécute à la demande. Paiement à l\'exécution réelle (millisecondes), scaling automatique, zéro administration.\n\nAvantages : **coût optimisé** (pas de serveur idle), **scaling infini**, **time-to-market rapide**. Inconvénients : **cold starts** (latence au premier appel), limites d\'exécution (15 min sur `Lambda`), debugging et observabilité plus complexes.\n\n__Le serverless est idéal pour les workloads événementiels, intermittents ou imprévisibles.__ Pas pour les traitements longs ou la charge constante.',
        },
        {
          id: 'cloud-7',
          question: 'Qu\'est-ce que le cold start en serverless ?',
          answer: 'Le **cold start** est la latence initiale quand une fonction serverless est invoquée après une période d\'inactivité. Le fournisseur doit **provisionner un conteneur**, charger le runtime et le code — cela peut prendre de 100ms à plusieurs secondes (surtout en Java/.NET).\n\nFacteurs aggravants : runtime lourd (JVM), grosse fonction (dependencies), VPC (configuration réseau), peu d\'invocations (le conteneur est recyclé vite).\n\nMitigation : **provisioned concurrency** (instances préchauffées sur `Lambda`), runtime léger (Node.js, Python), minimiser les dépendances, garder les fonctions chaudes avec des appels périodiques.\n\n__Le cold start est le principal argument contre le serverless pour les APIs basse latence.__',
        },
        {
          id: 'cloud-8',
          question: 'Serverless vs conteneurs : quand choisir quoi ?',
          answer: '**Serverless** (`Lambda`, `Cloud Functions`) : zéro infra à gérer, scaling auto, paiement à l\'usage. Idéal pour : événements, APIs à faible/moyenne charge, tâches ponctuelles, prototypage rapide.\n\n**Conteneurs** (`ECS`, `EKS`, `Fargate`) : contrôle total sur le runtime, pas de limite de durée, portabilité, stateful possible. Idéal pour : services longue durée, charge prévisible, workloads complexes, migration progressive depuis un monolithe.\n\n__Serverless pour la simplicité et le coût variable, conteneurs pour le contrôle et la prévisibilité.__ Beaucoup d\'équipes combinent les deux : serverless pour les events, conteneurs pour les services principaux.',
        },
        {
          id: 'cloud-9',
          question: 'Qu\'est-ce qu\'un CDN et pourquoi l\'utiliser ?',
          answer: '**CDN** (*Content Delivery Network*) : réseau de serveurs répartis mondialement (*edge nodes*) qui mettent en cache le contenu statique (images, CSS, JS) au plus près des utilisateurs. Résultat : **latence réduite**, **charge du serveur d\'origine diminuée**, **meilleure disponibilité**.\n\nSur AWS : `CloudFront`. Sur Azure : `Azure CDN`. Le CDN cache le contenu aux *edge locations* et ne contacte l\'origine que pour un *cache miss*.\n\n__Un CDN est quasi obligatoire pour toute application web publique__ — il améliore drastiquement les performances et réduit les coûts de bande passante.',
        },
        {
          id: 'cloud-10',
          question: 'Quels sont les principes du cloud-native ?',
          answer: '**Cloud-native** = conçu *pour* le cloud, pas juste *déployé sur* le cloud. Principes : **microservices** (services indépendants et déployables séparément), **conteneurisation** (reproductibilité), **orchestration dynamique** (`Kubernetes`), **DevOps/CI-CD** (livraison continue), **observabilité** (métriques, logs, traces), **résilience** (circuit breakers, retries, graceful degradation).\n\nL\'antithèse : *lift and shift* (migrer une app on-premise telle quelle vers le cloud) sans adapter l\'architecture.\n\n__Cloud-native = exploiter les capacités du cloud (élasticité, services managés) plutôt que de reproduire l\'on-premise.__',
        },
        {
          id: 'cloud-11',
          question: 'Qu\'est-ce qu\'AWS IAM et pourquoi est-il crucial ?',
          answer: '**IAM** (*Identity and Access Management*) gère l\'authentification et l\'autorisation sur AWS. Concepts : **Users** (personnes), **Groups** (ensembles de users), **Roles** (permissions assumables temporairement par des services), **Policies** (documents JSON définissant les droits).\n\nPrincipes : **moindre privilège** (ne donner que les permissions nécessaires), **pas de clés d\'accès sur les instances** (utiliser des roles IAM à la place), **MFA** sur les comptes root, **rotation des credentials**.\n\n__Une mauvaise config IAM = la faille de sécurité la plus courante et la plus grave sur AWS.__ Des buckets S3 publics ou des clés leakées peuvent exposer toute l\'infrastructure.',
          code: '{\n  "Effect": "Allow",\n  "Action": [\n    "s3:GetObject",\n    "s3:PutObject"\n  ],\n  "Resource": "arn:aws:s3:::my-bucket/*"\n}',
          language: 'json',
        },
        {
          id: 'cloud-12',
          question: 'Que connaître d\'Azure pour un entretien ?',
          answer: '**Azure** est le cloud de Microsoft, 2e marché mondial derrière AWS. Services clés : **`Azure VMs`** (compute), **`Azure App Service`** (PaaS web), **`Azure Functions`** (serverless), **`Azure SQL Database`** (SQL managé), **`Azure Blob Storage`** (stockage objet), **`Azure Active Directory`** (identité/SSO).\n\nAvantages : intégration native avec l\'écosystème Microsoft (`Active Directory`, `Office 365`, `.NET`), très présent en entreprise. **`Azure DevOps`** (Boards, Repos, Pipelines) est très utilisé pour CI/CD.\n\n__AWS domine en start-up et pure-tech, Azure domine en entreprise traditionnelle.__ Les concepts cloud (régions, IaC, scaling) sont identiques — la différence est dans les noms de services.',
        },
      ],
    },
  ],
};