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
        
          deepDive: `# IaaS vs PaaS vs SaaS

## Quest-ce que cest ?

Les modeles de service cloud definissent le niveau de controle et de gestion que le client a sur ses ressources.

## IaaS (Infrastructure as a Service)

- **Definition** : Fourniture d'infrastructures informatiques virtualisees
- **Exemples** : AWS EC2, Google Compute Engine, Azure VMs
- **Controle** : Le client gere OS, stockage, applications
- **Cas d usage** : Migration de serveurs physiques, haute personnalite

## PaaS (Platform as a Service)

- **Definition** : Plateforme de developpement et de deploiement d applications
- **Exemples** : Heroku, Google App Engine, Azure App Service
- **Controle** : Le client gere les applications et donnees
- **Cas d usage** : Developpement d applications, APIs

## SaaS (Software as a Service)

- **Definition** : Applications completes accessibles via internet
- **Exemples** : Salesforce, Microsoft 365, Gmail
- **Controle** : Le client utilise uniquement l application
- **Cas d usage** : Productivite, CRM, email

## Comparaison

| Aspect | IaaS | PaaS | SaaS |
|--------|------|------|------|
| Control | Complet | Partiel | Aucun |
| Maintenance | Client | Partagee | Fournisseur |
| Flexibilite | Haute | Moyenne | Faible |
| Complexite | Haute | Moyenne | Faible |

## Bonnes pratiques

1. Choisir le modele selon vos besoins techniques
2. Evaluer les couts a long terme
3. Verifier la compatibilite avec vos outils
4. Considerer la portabilite et le verrouillage fournisseur

Source : [AWS Cloud Types](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html)`},
        {
          id: 'cloud-2',
          question: 'Quels sont les services AWS essentiels à connaître ?',
          answer: '**Compute** : `EC2` (serveurs virtuels), `Lambda` (serverless), `ECS`/`EKS` (conteneurs). **Stockage** : `S3` (objets/files), `EBS` (volumes pour EC2). **BDD** : `RDS` (SQL managé), `DynamoDB` (NoSQL serverless), `Aurora` (SQL haute perf).\n\n**Réseau** : `VPC` (réseau privé), `Route 53` (DNS), `CloudFront` (CDN). **Autre** : `IAM` (identité), `CloudFormation` (IaC), `SQS`/`SNS` (messagerie), `CloudWatch` (monitoring).\n\n__Pour un entretien, maîtrisez EC2, S3, RDS, Lambda, IAM et VPC — ce sont les basiques indispensables.__',
        
          deepDive: `# Services AWS essentiels

## Quest-ce que cest ?

AWS propose plus de 200 services. Les services essentiels a connaetre sont organises par categorie.

## Compute (Calcul)

### EC2 (Elastic Compute Cloud)
Machines virtuelles dans le cloud. Permet de lancer des serveurs a la demande.

### Lambda
Service de serverless computing. Excecution de code sans gestion de serveurs.

### ECS/EKS
Conteneurisation avec Docker/Kubernetes managé.

## Stockage

### S3 (Simple Storage Service)
Stockage d'objets hautement disponible et scalable.
- Standard: donnees frequentes
- IA: donnees infrequent
- Glacier: archivage

### EBS (Elastic Block Store)
Volumes de stockage pour EC2.

## Bases de donnees

### RDS (Relational Database Service)
Bases de donnees relationnelles managées (MySQL, PostgreSQL, Oracle).

### DynamoDB
Base de donnees NoSQL serverless.

### ElastiCache
Cache Redis/Memcached managé.

## Resautage

### VPC (Virtual Private Cloud)
Reseau isole dans AWS.

### CloudFront
CDN pour la distribution de contenu.

### Route 53
Service DNS managé.

## Bonnes pratiques

1. Utiliser les groupes de securite pour controler l'acces
2. Mettre en place du monitoring avec CloudWatch
3. Utiliser IAM pour les permissions
4. Activer le chiffrement des donnees au repos et en transit

Source : [AWS Documentation](https://docs.aws.amazon.com/)`},
        {
          id: 'cloud-3',
          question: 'Que sont les régions et zones de disponibilité ?',
          answer: 'Une **région** est un ensemble de data centers géographiquement isolés (ex: `eu-west-1` = Irlande). Chaque région contient plusieurs **Availability Zones** (AZ) — des data centers physiquement séparés avec alimentation et réseau indépendants.\n\nDéployer sur **plusieurs AZs** assure la haute disponibilité : si un data center tombe, les autres prennent le relais. Déployer sur **plusieurs régions** assure la reprise après sinistre (DR) et la faible latence pour les utilisateurs mondiaux.\n\n__Règle : au minimum 2 AZs en production pour la haute disponibilité.__ Le choix de région impacte latence, coûts et conformité (RGPD → données en Europe).',
        
          deepDive: `# Regions et Zones de Disponibilite

## Quest-ce que cest ?

AWS dispose de centres de donnees a travers le monde, organises en regions et zones de disponibilite.

## Regions AWS

Une region est un emplacement geographique contenant plusieurs zones de disponibilite.

- **Exemples** : us-east-1 (Virginie du Nord), eu-west-1 (Irlande), ap-southeast-1 (Singapour)
- **Choisir** selon la latence, les exigences de conformite, et les couts

## Zones de Disponibilite (AZ)

Une AZ est un ou plusieurs centres de donnees independants avec :
- Alimentation, reseau, et refroidissement redondants
- Connexion a bas latence entre elles
- Isolation des pannes physiques

## Relation Region/AZ

Region us-east-1
  - AZ us-east-1a
  - AZ us-east-1b
  - AZ us-east-1c

## Points de presence

### Edge Locations
Endpoints CloudFront pour le cache de contenu plus proche des utilisateurs.

### Regional Edge Caches
Plus grands emplacements pour le cache de donnees moins frequentes.

## Haute disponibilite

### Architecture multi-AZ
- Deployer les instances dans plusieurs AZ
- Utiliser un Load Balancer pour distribuer le trafic
- Repliquer les donnees entre AZ

### Exemple d architecture HA
[Internet] -> [Load Balancer] -> [EC2 AZ1] -> [EC2 AZ2]
                                      [RDS Primary] <- [RDS Standby]

## Bonnes pratiques

1. Repliquer les donnees sur plusieurs AZ
2. Utiliser des instances spot pour les charges tolerant les interruptions
3. Choisir une region proche de vos utilisateurs
4. Considerer les exigences de conformite (donnees en Europe)

Source : [AWS Global Infrastructure](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)`},
        {
          id: 'cloud-4',
          question: 'Qu\'est-ce que l\'auto-scaling ?',
          answer: 'L\'**auto-scaling** ajuste automatiquement le nombre d\'instances en fonction de la charge : **scale-out** (ajout d\'instances) quand la charge monte, **scale-in** (retrait) quand elle baisse.\n\nSe configure via des **métriques** : CPU > 70% → scale-out, CPU < 30% → scale-in. Sur AWS : `Auto Scaling Groups` + `Application Load Balancer`. Sur Kubernetes : `HPA` (*Horizontal Pod Autoscaler*).\n\n__L\'auto-scaling réduit les coûts (on ne paie que ce qu\'on utilise) et assure la résilience sous charge.__ Configurez aussi un *minimum* d\'instances pour absorber les montées en charge soudaines.',
          code: '# AWS Auto Scaling Group\nMinSize: 2\nMaxSize: 10\nDesiredCapacity: 3\n\n# Policies\nScaleOut: CPU > 70% → +2 instances\nScaleIn:  CPU < 30% → -1 instance',
          language: 'yaml',
        
          deepDive: `# Auto-Scaling

## Quest-ce que cest ?

L auto-scaling ajuste automatiquement le nombre d'instances computes en fonction de la demande. Cela garantit performance et optimisation des couts.

## Types d'auto-scaling

### Scaling horizontal
Ajout ou suppression d'instances.
- Augmente la capacite globale
- Preferer pour la haute disponibilite

### Scaling vertical
Augmentation de la puissance (CPU/RAM) d'une instance.
- Limite par la taille maximale des machines
- downtime lors du redimensionnement

## Composants

### Launch Configuration/Template
Definit la configuration des nouvelles instances (AMI, type, security groups).

### Auto Scaling Group (ASG)
Groupe de ressources avec :
- Minimum, maximum, et capacite desiree
- VPC et subnets
- Load Balancer target group

### Scaling Policies

#### Policy based on metrics
cpu > 70% -> add 1 instance
cpu < 30% -> remove 1 instance

#### Scheduled scaling
Ajout de capacite a des heures predefinies (Black Friday).

#### Predictive scaling
ML pour prevoir la demande future.

## Bonnes pratiques

1. Definir des seuils de scaling adaptes
2. Utiliser plusieurs metriques (CPU, RAM, requetes)
3. Configurer le cooldown pour eviter les oscillations
4. Tester regulierement le fonctionnement
5. Prevoir la degradation progressive

## CloudWatch Alarms

aws autoscaling put-scaling-policy --auto-scaling-group-name MyASG --policy-name CPUHigh --scaling-adjustment 1 --adjustment-type ChangeInCapacity

Source : [AWS Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)`},
        {
          id: 'cloud-5',
          question: 'CloudFormation vs Terraform : quel IaC choisir ?',
          answer: '**`CloudFormation`** : IaC native AWS, syntaxe `JSON`/`YAML`, gère uniquement l\'écosystème AWS, gratuit, intégration native avec les services AWS.\n\n**`Terraform`** : IaC **multi-cloud** (`AWS` + `Azure` + `GCP` + on-premise), syntaxe `HCL` plus lisible, état versionné, énorme communauté et registry de modules.\n\n__Si vous êtes 100% AWS, CloudFormation est pertinent. Sinon, Terraform est le choix par défaut__ grâce à sa portabilité et son écosystème. En pratique, Terraform domine le marché de l\'IaC.',
          code: '# Terraform\nresource "aws_s3_bucket" "app_data" {\n  bucket = "mon-app-data"\n}\n\nresource "aws_instance" "web" {\n  ami           = "ami-123456"\n  instance_type = "t3.micro"\n}',
          language: 'hcl',
        
          deepDive: `# CloudFormation vs Terraform

## Quest-ce que cest ?

Deux outils majeurs d Infrastructure as Code (IaC) pour provisionner et gerer l infrastructure cloud.

## CloudFormation

### Avantages
- Native AWS, integration profonde
- Aucun cout supplementaire
- Gestionnaire de pile (Stack) integre
- Rollback automatique sur erreur

### Inconvenients
- Syntaxe JSON/YAML parfois verbeuse
- Limite aux ressources AWS
- Pas de state file externe

## Terraform

### Avantages
- Multi-cloud (AWS, Azure, GCP)
- State file pour suivi de l etat
- Planification avant application
- Module registry vaste
- langage HCL declaratif

### Inconvenients
- Necessite Terraform Cloud ou backend pour etat distant
- Courbe d apprentissage

## Comparaison

| Aspect | CloudFormation | Terraform |
|--------|----------------|-----------|
| Multi-cloud | Non | Oui |
| State management | Integre | Externe |
| Planification | Non (execute directement) | Oui |
| Modules | Limites | Vaste registry |
| Cout | Gratuit | Gratuit (cloud payant) |

## Example CloudFormation

AWSTemplateFormatVersion: 2010-09-09
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      ImageId: ami-0c55b159cbfafe1f0

## Exemple Terraform

resource "aws_instance" "example" {
  instance_type = "t2.micro"
  ami           = "ami-0c55b159cbfafe1f0"
}

## Bonnes pratiques

1. Choisir selon l ecosysteme cible
2. Utiliser un backend distant pour Terraform
3. Versionner les templates
4. Separer les environnements (dev/staging/prod)
5. Implementer des pipelines CI/CD

Source : [Terraform vs CloudFormation](https://www.terraform.io/intro/vs/cloudformation)`},
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
        
          deepDive: `# Le Serverless - Principes et Avantages

## Quest-ce que cest

Le serverless (ou Function as a Service - FaaS) est un modele de calcul ou le fournisseur cloud alloue dynamiquement les ressources et facture en fonction de lexecution reelle (temps de calcul et memoire utilises). Le developpeur ecrit uniquement la logique metier sans se soucier des serveurs, du systeme dexploitation ou de la capacite. Le code est organise en fonctions qui sexecutent en reponse a des evenements.

## Syntaxe et exemples

\`\`\`javascript
// AWS Lambda - serveur HTTP API Gateway
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const client = new LambdaClient({ region: "eu-west-1" });

async function callLambda(payload) {
  const command = new InvokeCommand({
    FunctionName: "my-function",
    Payload: JSON.stringify(payload),
  });
  const response = await client.send(command);
  return JSON.parse(new TextDecoder().decode(response.Payload));
}
\`\`\`

\`\`\`python
# Google Cloud Functions
import functions_framework

@functions_framework.http
def hello_http(request):
    name = request.args.get("name", "World")
    return f"Hello {name}!"
\`\`\`

\`\`\`yaml
# Azure Functions - host.json
{
  "version": "2.0",
  "extensions": {
    "http": {
      "routePrefix": "api",
      "maxConcurrentRequests": 100,
      "maxOutstandingRequests": 200
    }
  },
  "functionTimeout": "00:05:00"
}
\`\`\`

## Bonnes pratiques

- **Conception orientee evenement**: Decomposez votre application en fonctions indepedance qui reagissent a des evenements (S3 put, SQS message, HTTP request).
- **Statelessness**: Ne comptez pas sur la memoire locale entre executions. Utilisez un storage externe (DynamoDB, S3, Redis) pour conserver letat.
- **Petites fonctions, forte cohesion**: Une fonction doit faire une seule chose. Cela ameliore le temps de demarrage et la maintenance.
- **Environnements multiples**: Utilisez des variables denvironnement pour distinguer dev/staging/prod.
- **Limiter les dependances**: Reduisez le temps de cold start en minimisant le nombre de packages.
- **Utiliser les Dead Letter Queues**: Capturez les messages qui echouent pour les retraiter ulterieurement.

## Pieges courants

- **Cold startsnon optm**: Un cold start de plusieurs secondes peut degrader lexperience utilisateur. Mitigez avec provisioned concurrency ou en optant pour des runtimes plus legers.
- **Timeouts trop courts**: Des operations I/O lente peuvent echouer silencieusement. Surveillez les durees dans CloudWatch.
- **Couplage fort**: Convertir un monolithe en 200 fonctions Lambda sans refactoriser la logique peut creer un cauchemar de dependances.
- **Debugging distribue**: Tracer une requete qui traverse 10 fonctions Lambda necessite des outils como X-Ray ou OpenTelemetry.
- **Facturation inattendue**: Un flux de messages infini peut generer des couts eleves. Mettez en place des alarmes budget.

Source : [Serverless Architecture on AWS](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html)`},
        {
          id: 'cloud-7',
          question: 'Qu\'est-ce que le cold start en serverless ?',
          answer: 'Le **cold start** est la latence initiale quand une fonction serverless est invoquée après une période d\'inactivité. Le fournisseur doit **provisionner un conteneur**, charger le runtime et le code — cela peut prendre de 100ms à plusieurs secondes (surtout en Java/.NET).\n\nFacteurs aggravants : runtime lourd (JVM), grosse fonction (dependencies), VPC (configuration réseau), peu d\'invocations (le conteneur est recyclé vite).\n\nMitigation : **provisioned concurrency** (instances préchauffées sur `Lambda`), runtime léger (Node.js, Python), minimiser les dépendances, garder les fonctions chaudes avec des appels périodiques.\n\n__Le cold start est le principal argument contre le serverless pour les APIs basse latence.__',
        
          deepDive: `# Cold Start en Serverless

## Quest-ce que cest

Un cold start est le temps necessaire a linfrastructure serverless pour initialiser une nouvelle instance de fonction avant de traiter une requete. Ce processus inclut le demarrage du runtime, le chargement du code et des dependances, et etablissement des connexions. Les subsequent requests utilisent une instance chaude (warm) deja initialisee et sont donc instantanees.

## Syntaxe et exemples

\`\`\`javascript
// Mesurer le cold start avec CloudWatch Logs Insights
fields @timestamp, @message
| filter @message like /START RequestId/
| sort @timestamp desc
| limit 20

// Logger le temps dinitialisation
let startTime;
exports.handler = async (event) => {
  const initTime = Date.now() - startTime;
  console.log(\`Cold start took: \${initTime}ms\`);
  return { statusCode: 200, body: JSON.stringify({ coldStartMs: initTime }) };
};

// Bloc dannotation pour forcer le chargement eager
exports.handler = async (event) => {
  const { heavyLib } = await import("./heavyLib.mjs"); // Eager import
  return { result: heavyLib.process() };
};
\`\`\`

\`\`\`python
# Python -Utilisation de PACKAGE_CACHE_DISABLE pour eviter les cold starts
import os
os.environ["AWS_LAMBDA_FUNCTION_NAME"] = "my-function"
# Chaque appel recharge le module (pas de cache persistente)
\`\`\`

\`\`\`yaml
# serverless.yml - Provisioned Concurrency
service: my-service
provider:
  name: aws
  runtime: nodejs18.x
functions:
  hello:
    handler: handler.hello
    provisionedConcurrency: 5  # 5 instances toujours chaudes
\`\`\`

## Bonnes pratiques

- **Provisioned Concurrency**: Allouez des instances toujours pretes pour les fonctions sensibles a la latence (API, chatbot). AWSApplication Auto Scaling peut automatiser cela.
- **SnapStart**: Pour Java (Corretto), AWS Lambda SnapStart reduit les cold starts a quelques millisecondes en prenstant letat de lextcution.
- **Minimiser les dependances**: Reduisez la taille du package de deploiement. Un package plus legermeans un telechargement plus rapide depuis S3.
- **Chargement paresseux vs eager**: Importez les modules lourds uniquement quand necessaire, mais attention aux cold starts cause par les imports dynamiques.
- **Connexion RDS hors fonction**: Etablissez les connexions a la base de donnees a lextrieur du handler (au niveau superieur) pour beneficier du connection pooling.
- **Gravementton 3**: Les processeurs ARM Graviton3 offrent de meilleures performances et des cold starts plus courts que x86.

## Pieges courants

- **Initialisation lente dans le handler**: Evitez les operations lourdes (lecture de fichiers, appels API) dans le code dinitialisation du handler.
- **Dependances Node_modules volumineuses**: Un simple \`npm install\` peut ajouter 50+ MB. Utilisez \`npm ci --production\` et Tree shaking.
- **Connexion base de donnees dans le handler**: Etablir une connexion a chaque invocation ajoute un overhead. Utilisez le connection pooling et initialisez au niveau superieur.
- **Mmoire insuffisante**: Si la memoire est trop basse, le CPU est aussi limite et les performances sen resentent. Testez differentes configurations.
- **Ne pas surveiller les cold starts**: Sans Amazon CloudWatch Contributor Insights ou X-Ray, vous navez aucune visibilite sur la frequent et limpact des cold starts.

Source : [AWS Lambda Cold Starts](https://docs.aws.amazon.com/lambda/latest/dg/functions-states.html)`},
        {
          id: 'cloud-8',
          question: 'Serverless vs conteneurs : quand choisir quoi ?',
          answer: '**Serverless** (`Lambda`, `Cloud Functions`) : zéro infra à gérer, scaling auto, paiement à l\'usage. Idéal pour : événements, APIs à faible/moyenne charge, tâches ponctuelles, prototypage rapide.\n\n**Conteneurs** (`ECS`, `EKS`, `Fargate`) : contrôle total sur le runtime, pas de limite de durée, portabilité, stateful possible. Idéal pour : services longue durée, charge prévisible, workloads complexes, migration progressive depuis un monolithe.\n\n__Serverless pour la simplicité et le coût variable, conteneurs pour le contrôle et la prévisibilité.__ Beaucoup d\'équipes combinent les deux : serverless pour les events, conteneurs pour les services principaux.',
        
          deepDive: `# Serverless vs Conteneurs - Quand Choisir Quoi

## Quest-ce que cest

Les conteneurs (Docker) empackettent une application avec ses dependances dans une unite legere et portable. Le serverless (Lambda, Azure Functions) execute du code en reponse a des evenements sans gestion dinfrastructure. Le choix depend du cas dutilisation, du controle requis, et du modele de cout.

| Critere | Serverless | Conteneurs |
|----------|-----------|------------|
| Control | Fournisseur manage | Vous gerez le runtime |
| Scaling | Automatique et instantane | Scaling plus lent (Kubernetes HPA) |
| Duree max | 15 min (Lambda) | Pas de limite |
| Cost | Pay-per-invocation | Pay-per-usage (EC2/ECS/EKS) |
| Cold start | Oui | Non (si toujours running) |

## Syntaxe et exemples

\`\`\`yaml
# Docker container - Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Docker Compose pour dev
version: "3.8"
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
\`\`\`

\`\`\`yaml
# Kubernetes - deployment.yaml (pour conteneurs)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    spec:
      containers:
        - name: my-app
          image: my-app:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
\`\`\`

\`\`\`yaml
# AWS ECS Task Definition (serverless-ish via Fargate)
{
  "containerDefinitions": [
    {
      "name": "my-app",
      "image": "my-repo/my-app:latest",
      "memory": 512,
      "cpu": 256,
      "essential": true
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc"
}
\`\`\`

## Bonnes pratiques

- **Fonction episodique, traffic variable = Serverless**: Pour des jobs Cron, des webhooks, des triggers evenements.
- **Workload permanent, previsible = Conteneurs**: Pour des API avec trafic constant, des services qui doivent demarrer en < 100ms.
- **Combinez les deux**: Un API Gateway -> Lambda pour les endpoints burst-friendly; EKS pour le traitement de fond intensif.
- **EKS ou ECS Fargate?**: Fargate si vous ne voulez pas gerer des noeuds; EKS si vous avez besoin dun controle fin (custom CNI, DaemonSets).
- **Architecture hybride**: Un cluster EKS avec des nodes Spot pour le batch processing + Lambda pour les API.

## Pieges courants

- **Serverless antipattern**: Utiliser Lambda pour des long-running jobs (depasse la limite de 15 min), du polling constant, ou des charges de travail intensives en CPU.
- **Conteneurs surdimensionnes**: Deployer un monolithique dans un conteneur de 8 Go alors quune fonction Lambda suffirait.
- **Ignorer les couts a grande echelle**: A fort trafic, Lambda peut devenir plus cher quECS Fargate. Estimez la charge attendue.
- **Pas de strategie de deployment**: Les conteneurs necessitent un plan de deploiement (rolling, blue-green, canary) qui doit etre explicite.
- **Oublier la securite**: Les conteneurs doivent etre scannes pour les vulnerabilités (Trivy, Clair) et les images signe.

Source : [AWS Containers vs Lambda](https://aws.amazon.com/compare/the-difference-between-lambda-and-containers/)`},
        {
          id: 'cloud-9',
          question: 'Qu\'est-ce qu\'un CDN et pourquoi l\'utiliser ?',
          answer: '**CDN** (*Content Delivery Network*) : réseau de serveurs répartis mondialement (*edge nodes*) qui mettent en cachée le contenu statique (images, CSS, JS) au plus près des utilisateurs. Résultat : **latence réduite**, **charge du serveur d\'origine diminuée**, **meilleure disponibilité**.\n\nSur AWS : `CloudFront`. Sur Azure : `Azure CDN`. Le CDN cachée le contenu aux *edge locations* et ne contacte l\'origine que pour un *cachée miss*.\n\n__Un CDN est quasi obligatoire pour toute application web publique__ — il améliore drastiquement les performances et réduit les coûts de bande passante.',
        
          deepDive: `# CDN - Content Delivery Network

## Quest-ce que cest

Un Content Delivery Network (CDN) est un reseau de serveurs repartis geographiquement qui met en cache le contenu statique proche des utilisateurs finaux. Le CDN reduit la latence, decrease le trafic sur le serveur dorigine, et ameliore la disponibilite grace a la redundance.

## Syntaxe et exemples

\`\`\`bash
# CloudFront - Creer une distribution
aws cloudfront create-distribution \\
  --origin-domain-name my-bucket.s3.amazonaws.com \\
  --default-cache-behavior TargetOriginId=my-bucket \\
  --enabled

# Tester le cache avec curl
curl -I https://my-dist.cloudfront.net/image.png
# Reponse: X-Cache: Hit from cloudfront
\`\`\`

\`\`\`yaml
# CloudFront Cache Policy
{
  "CachePolicyConfig": {
    "Name": "OptimizedCache",
    "MinTTL": 86400,
    "DefaultTTL": 31536000,
    "MaxTTL": 31536000,
    "ParametersInCacheKeyAndForwardedToOrigin": {
      "QueryStringsConfig": { "QueryStringBehavior": "None" },
      "CookiesConfig": { "CookieBehavior": "None" },
      "HeadersConfig": { "HeaderBehavior": "None" }
    }
  }
}
\`\`\`

\`\`\`nginx
# Configuration Cache-Control (serveur dorigine)
# Dans un serveur nginx ou Express
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=31536000, immutable");
  next();
});
\`\`\`

## Bonnes pratiques

- **Choix du provider**: CloudFront (AWS), Cloudflare, Fastly, Azure CDN. Chacun a ses forces (Cloudflare pour la securite, Fastly pour le compute at the edge).
- **Origin Shield**: Activez Origin Shield pour reduire la charge sur le serveur dorigine quand le cache est perdu sur plusieurs PoP.
- **Cache invalidation**: Mettez en place des regles de purge automatique sur les mises a jour de contenu. Attention: linvalidation generee facturée sur AWS CloudFront.
- **Content compression**: Activez la compression gzip/brotli au niveau du CDN pour reducer la bande passante.
- **Stale-while-revalidate**: Utilisez Cache-Control: public, stale-while-revalidate=3600 pour servir du contenu perime pendant la revalidation en arriere-plan.
- **Prefetching**: Anticipez les besoins en prechargeant le contenu probable grace aux patterns dutilisation.

## Pieges courants

- **Melanger contenu dynamique et statique**: Ne pas mettre en cache du contenu personnalise peut exposer des donnees sensibles.
- **TTL trop long**: Un Time-To-Live de 1 an peut servir du contenu obsolete si le contenu change souvent.
- **Pas de purge du cache**: Apres un deploy, le cache peut servir danciennes versions. Automatisez la purge du cache post-deploy.
- **Cache bypass inconsidere**: Des headers Cache-Control: no-store sur des assets statiques neguent le benefice du CDN.
- **Cname non secures**: Utilisez toujours HTTPS avec des certificats valides. Le HTTP non crypte est vulnerable au MITM.

Source : [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)`},
        {
          id: 'cloud-10',
          question: 'Quels sont les principes du cloud-native ?',
          answer: '**Cloud-native** = conçu *pour* le cloud, pas juste *déployé sur* le cloud. Principes : **microservices** (services indépendants et déployables séparément), **conteneurisation** (reproductibilité), **orchestration dynamique** (`Kubernetes`), **DevOps/CI-CD** (livraison continue), **observabilité** (métriques, logs, traces), **résilience** (circuit breakers, retries, graceful degradation).\n\nL\'antithèse : *lift and shift* (migrer une app on-premise telle quelle vers le cloud) sans adapter l\'architecture.\n\n__Cloud-native = exploiter les capacités du cloud (élasticité, services managés) plutôt que de reproduire l\'on-premise.__',
        
          deepDive: `# AWS Lambda et le Serverless

## Quest-ce que cest

AWS Lambda est un service de calcul serverless qui permet dexecuter du code sans provisionner ni gerer des serveurs. Le code samuse dans un fonction Lambda qui se declenche en reponse a des evenements. Le modele serverless elimine la necessite de gerer linfrastructure sous-jacente: le fournisseur sen charge (auto-scaling, haute disponibilite, maintenance).

## Syntaxe et exemples

\`\`\`javascript
// Exemple de fonction Lambda AWS
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
  return response;
};
\`\`\`

\`\`\`python
# Python Lambda avec boto3
import boto3
import json

def lambda_handler(event, context):
    s3 = boto3.client("s3")
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]
    return { "statusCode": 200, "body": json.dumps(f"File: {key}") }
\`\`\`

\`\`\`yaml
# Serverless Framework (serverless.yml)
service: my-service
provider:
  name: aws
  runtime: nodejs18.x
  memorySize: 256
  timeout: 10
functions:
  hello:
    handler: handler.hello
    events:
      - httpApi:
          path: /hello
          method: get
\`\`\`

## Bonnes pratiques

- **Conception sans etat**: Les fonctions Lambda sont stateless. Stockez letat dans S3, DynamoDB ou Redis.
- **Idempotence**: Concevez vos fonctions pour etre idempotentes (meme entree = meme sortie, meme effet secondaire).
- **Memoire et timeout**: Ajustez memorySize selon vos besoins. Le CPU est lie a la memoire allouee.
- **Layers**: Reutilisez les dependances via Lambda Layers pour reduire la taille du deploiement et accelerer les deploiements.
- **VPC**: Si Lambda accede a RDS ou Elasticache, configurez les sous-réseaux privees avec NAT Gateway.
- **Concurrency**: Utilisez les provisioned concurrency pour eviter les cold starts sur les fonctions critiques.

## Pieges courants

- **Cold starts longs**: Le temps de demarrage a froid peut etre de plusieurs secondes en Node.js/Python. Mitigez avec provisioned concurrency ou AWS Graviton.
- **Duree de timeout trop courte**: Des operations I/O imprevues peuvent depasser le timeout. Analysez les logs CloudWatch.
- **Dependances trop lourdes**: Des packages NPM/Python volumineux ralentissent le cold start. Minifiez et splitez les couches.
- **Variables denvironnement non cryptees**: Ne stockez jamais de secrets dans les variables denvironnement. Utilisez AWS Secrets Manager ou AWS Systems Manager Parameter Store.
- **Taille du package > 50 MB (ZIP) ou 250 MB (ZIP extrait)**: Utilisez S3 pour les gros artifacts.

Source : [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)`},
        {
          id: 'cloud-11',
          question: 'Qu\'est-ce qu\'AWS IAM et pourquoi est-il crucial ?',
          answer: '**IAM** (*Identity and Access Management*) gère l\'authentification et l\'autorisation sur AWS. Concepts : **Users** (personnes), **Groups** (ensembles de users), **Roles** (permissions assumables temporairement par des services), **Policies** (documents JSON définissant les droits).\n\nPrincipes : **moindre privilège** (ne donner que les permissions nécessaires), **pas de clés d\'accès sur les instances** (utiliser des roles IAM à la place), **MFA** sur les comptes root, **rotation des credentials**.\n\n__Une mauvaise config IAM = la faille de sécurité la plus courante et la plus grave sur AWS.__ Des buckets S3 publics ou des clés leakées peuvent exposer toute l\'infrastructure.',
          code: '{\n  "Effect": "Allow",\n  "Action": [\n    "s3:GetObject",\n    "s3:PutObject"\n  ],\n  "Resource": "arn:aws:s3:::my-bucket/*"\n}',
          language: 'json',
        
          deepDive: `# AWS IAM - Gestion des Identites et Acces

## Quest-ce que cest

AWS Identity and Access Management (IAM) est le service central qui controle qui est authentifie (identite) et autorise (permissions) sur AWS. IAM permet de manager les utilisateurs, groupes, roles et politiques daccess dans votre compte AWS. Cest le fondement de la securite sur AWS: sans IAM correctement configure, toute ressource peut etre accessible ou modifiable par nimporte qui.

## Syntaxe et exemples

\`\`\`json
// Politique IAM (JSON)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": ["10.0.0.0/8"]
        }
      }
    },
    {
      "Effect": "Deny",
      "Action": ["s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
\`\`\`

\`\`\`bash
# Creer un utilisateur IAM
aws iam create-user --user-name deploy-bot

# Attacher une politique geree
aws iam attach-user-policy \\
  --user-name deploy-bot \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

# Creer un role pour Lambda
aws iam create-role \\
  --role-name lambda-execution-role \\
  --assume-role-policy-document file://trust-policy.json
\`\`\`

\`\`\`json
// Trust policy pour Lambda
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
\`\`\`

## Bonnes pratiques

- **Principe du moindre privilege**: Attribuez uniquement les permissions necessaires a chaque identite. Pas dAdmin pour tout le monde.
- **Utiliser les roles plutot que les cles daccentes**: Les roles IAM (via STS AssumeRole) sont preferes pour les applications tournant sur AWS.
- **MFA sur le compte root**: Activez lauthentification multifacteur sur le root account et stockez les codes dans un coffre-fort.
- **Rotation reguliere des cles Access Key**: Rotatez les cles tous les 90 jours. Utilisez AWS Secrets Manager pour automatiser.
- **Password policy**: Definissez une politique de mot de passe stricte (longueur, expiration, complexite).
- **Audit avec CloudTrail**: Activez CloudTrail pour tracer toutes les appels API IAM.
- **Utiliser les politiques gerees AWS**: Preferez arn:aws:iam::aws:policy/ReadOnlyAccess plutot que des politiques personnalisees incompletes.

## Pieges courants

- **Utiliser le compte root pour les operations quotidiennes**: Cest une surface dattaque massive. Creer un utilisateur IAM admin avec les droits appropries.
- **Cles daccentes codees en dur**: Jamais dans le code source. Toujours dans les variables denvironnement ou Secrets Manager.
- **Politique "Effect": "Allow" sans restriction**: Donner "*" sur toutes les ressources et actions est equivalentes a ne pas avoir de securite.
- **Oublier de detacher les politiques inutilisees**: Quand un employe quitte, ses acces doivent etre revokes immediatement.
- **Ne pas utiliser les tags pour segmenter les ressources**: Les tags permettent un facturation detaillee et des restrictions basees sur lenvironnement (prod vs dev).

Source : [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)`},
        {
          id: 'cloud-12',
          question: 'Que connaître d\'Azure pour un entretien ?',
          answer: '**Azure** est le cloud de Microsoft, 2e marché mondial derrière AWS. Services clés : **`Azure VMs`** (compute), **`Azure App Service`** (PaaS web), **`Azure Functions`** (serverless), **`Azure SQL Database`** (SQL managé), **`Azure Blob Storage`** (stockage objet), **`Azure Active Directory`** (identité/SSO).\n\nAvantages : intégration native avec l\'écosystème Microsoft (`Active Directory`, `Office 365`, `.NET`), très présent en entreprise. **`Azure DevOps`** (Boards, Repos, Pipelines) est très utilisé pour CI/CD.\n\n__AWS domine en start-up et pure-tech, Azure domine en entreprise traditionnelle.__ Les concepts cloud (régions, IaC, scaling) sont identiques — la différence est dans les noms de services.',
        
          deepDive: `# Azure - Concepts Fondamentaux pour Entretiens

## Quest-ce que cest

Microsoft Azure est une plateforme de cloud computing publique offrant plus de 200 services (IaaS, PaaS, SaaS). Les concepts cles a connatre pour un entretien sont les memes que pour AWS: le modele de responsabilite partage, les regions et zones de disponibilite, et les services comparables aux solutions AWS/GCP.

## Syntaxe et exemples

\`\`\`bash
# Azure CLI - Creer un resource group
az group create --name myResourceGroup --location eastus

# Deployer une Web App
az webapp create \\
  --resource-group myResourceGroup \\
  --plan myAppServicePlan \\
  --name myUniqueAppName \\
  --deployment-local-git

# Creer un VM
az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image UbuntuLTS \\
  --admin-username azureuser \\
  --generate-ssh-keys
\`\`\`

\`\`\`json
// Azure Resource Manager (ARM) template snippet
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-09-01",
      "name": "mystorageaccount",
      "location": "eastus",
      "kind": "StorageV2",
      "sku": { "name": "Standard_LRS" }
    }
  ]
}
\`\`\`

## Bonnes pratiques

- **Utiliser Azure Resource Manager (ARM)**: Deployez et gerez les ressources via des templates ARM ou Terraform pour une infrastructure-as-code reproductible.
- **Choisir le bon service**: Azure Functions (serverless), Azure Containers Instances (ACI), ou AKS (Kubernetes manege) selon le cas dutilisation.
- **Securite**: Azure Active Directory (AAD) est le service direnfermetaire. Configurez Conditional Access et RBAC (Role-Based Access Control).
- **Azure Policy**: Definissez des regles de conformite pour vos ressources (ex: obriger le chiffrement, taguer les ressources).
- **Surveillance**: Utilisez Azure Monitor et Application Insights pour le monitoring centralise.
- **Bonnes regions**: Choisissez une region proche de vos utilisateurs. Evitez les regions avec limitations rglementaires (ex: German Sovereign Cloud).

## Pieges courants

- **Nomenclature incoherente**: Sans conventions de nommage et tags, la gestion des ressources devient un chaos. Suivez le naming convention Azure.
- **Oublier le chiffrement**: Par defaut, Azure chiffre les donnees au repos avec des cles managees par Microsoft. Pour plus de securite, utilisez Azure Key Vault avec des cles managees par le client.
- **Souscrire au mauvais abonnement**: Les abonnements DEV/Test nont pas les memes SLA en production. Choisissez le bon type.
- **Pas de plan de reprise dactivite**: Sans Backup et Azure Site Recovery, une perte de donnees peut etre permanente.

Source : [Azure Documentation](https://docs.microsoft.com/azure/azure-resource-manager/)`},
      ],
    },
  ],
};