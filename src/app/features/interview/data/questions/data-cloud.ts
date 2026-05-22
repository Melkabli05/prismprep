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
        
          deepDive: `# IaaS, PaaS et SaaS — Les Modèles de Service Cloud

## Qu'est-ce que c'est ?

Les trois modèles de service cloud — **IaaS** (Infrastructure as a Service), **PaaS** (Platform as a Service), et **SaaS** (Software as a Service) — définissent différents niveaux d'abstraction entre le fournisseur cloud et le client. Plus on monte dans la pile, plus le fournisseur gère de couches, et moins le client a de contrôle (et de responsabilité).

Le choix entre ces modèles détermine : le niveau de contrôle, la charge opérationnelle, la flexibilité, et le coût.

## Concept détaillé

### IaaS (Infrastructure as a Service)

Le fournisseur met à disposition l'infrastructure de base : serveurs virtuels (VM), stockage (disques), réseau (VPC, load balancer). Le client installe et gère tout le reste : OS, runtime, base de données, application.

- **Responsabilité client** : OS, runtime, application, données, sécurité.
- **Responsabilité fournisseur** : virtualisation, réseau physique, data center.
- **Exemples** : AWS EC2, Google Compute Engine, Azure VMs, DigitalOcean Droplets.

### PaaS (Platform as a Service)

Le fournisseur gère l'OS, le runtime, et souvent la base de données. Le client déploie uniquement son code et ses données.

- **Responsabilité client** : application, données.
- **Responsabilité fournisseur** : tout le reste (OS, runtime, scaling, haute disponibilité).
- **Exemples** : Heroku, Google App Engine, Azure App Service, AWS Elastic Beanstalk.

### SaaS (Software as a Service)

Le fournisseur livre une application complète, prête à l'emploi. Le client est un simple utilisateur.

- **Responsabilité client** : données (configuration utilisateur).
- **Responsabilité fournisseur** : absolument tout.
- **Exemples** : Gmail, Salesforce, Microsoft 365, Slack, Notion.

## Schéma / Architecture

\`\`\`
┌───────────────────────────────────────────────────────────┐
│                    CE QUE VOUS GÉREZ                        │
├─────────────┬──────────────────┬───────────────────────────┤
│    IaaS     │      PaaS        │          SaaS             │
│             │                  │                           │
│ ┌─────────┐ │ ┌──────────────┐│ ┌───────────────────────┐ │
│ │Applicat.│ │ │ Application  ││ │   Rien à gérer !       │ │
│ ├─────────┤ │ ├──────────────┤│ │   Application prête   │ │
│ │ Données │ │ │  Données     ││ │   à l'emploi          │ │
│ ├─────────┤ │ ├──────────────┤│ │                       │ │
│ │ Runtime │─│─│─ (Géré par   ││ │                       │ │
│ ├─────────┤ │ │  fournisseur)││ │                       │ │
│ │   OS    │─│─│─             ││ │                       │ │
│ ├─────────┤ ├────────────────┤│ ├───────────────────────┤ │
│ │ Virtual.│ │ Virtualisation ││ │ Virtualisation        │ │
│ ├─────────┤ ├────────────────┤│ ├───────────────────────┤ │
│ │ Serveur │ │ Serveur        ││ │ Serveur               │ │
│ ├─────────┤ ├────────────────┤│ ├───────────────────────┤ │
│ │ Stock.  │ │ Stockage       ││ │ Stockage              │ │
│ ├─────────┤ ├────────────────┤│ ├───────────────────────┤ │
│ │ Réseau  │ │ Réseau         ││ │ Réseau                │ │
│ └─────────┘ └────────────────┘│ └───────────────────────┘ │
├───────────────────────────────────────────────────────────┤
│                     GÉRÉ PAR LE FOURNISSEUR                │
└───────────────────────────────────────────────────────────┘
\`\`\`

## Comparaison détaillée

| Aspect | IaaS | PaaS | SaaS |
|--------|------|------|------|
| Contrôle | Maximum | Partiel | Aucun |
| Flexibilité | Haute | Moyenne | Faible |
| Maintenance | Lourde (OS, runtime) | Légère (app only) | Aucune |
| Time-to-market | Lent (provisioning) | Rapide (déploiement) | Immédiat |
| Scalabilité | Manuel ou auto-scaling | Automatique | Automatique |
| Coût prévisible | Oui (instance réservée) | Oui (plan) | Abonnement |
| Portabilité | Haute (VM) | Moyenne (vendor lock-in) | Faible |
| Sécurité | Client responsable | Partagée | Fournisseur |

## Avantages et inconvénients

**IaaS :**
- Avantages : contrôle total, choix de l'OS, personnalisation, migration on-premise facile.
- Inconvénients : charge opérationnelle élevée, responsabilité sécurité, scaling manuel.

**PaaS :**
- Avantages : productivité développeur, scaling automatique, pas de gestion d'infrastructure.
- Inconvénients : lock-in fournisseur, moins de contrôle sur le runtime, debugging limité.

**SaaS :**
- Avantages : zéro maintenance, mise à jour automatique, accessible partout.
- Inconvénients : pas de personnalisation, données chez le fournisseur, dépendance.

## Cas d'usage typiques

1. **Startup en phase early** : choisir le PaaS (Heroku, Railway) pour itérer rapidement sans ingénieur infra.
2. **Migration de datacenter** : IaaS (AWS EC2) pour « lift and shift » sans changer l'architecture.
3. **Application métier** : SaaS (Salesforce, HubSpot) pour CRM, pas besoin de développer.
4. **Application régulée** : IaaS on-premise ou cloud privé pour respecter les contraintes de conformité.

## Bonnes pratiques

1. **Commencer par le PaaS** : sauf si vous avez des contraintes spécifiques (OS personnalisé, performance extrême).
2. **Ne pas sous-estimer le coût IaaS** : la gestion OS (patches, sécurité, monitoring) à un coût humain caché.
3. **Éviter le lock-in PaaS** : utiliser des services standard (PostgreSQL plutôt que DynamoDB) pour garder la portabilité.
4. **Combiner les modèles** : IaaS pour le calcul intensif + PaaS pour l'API + SaaS pour le CRM.
5. **Prévoir un plan de sortie** : savoir comment quitter un fournisseur avant d'y entrer.

## Pièges courants

1. **Choisir IaaS « au cas où »** : provisionner des VM sans nécessité réelle → coût et complexité inutiles.
2. **Croire que PaaS = pas d'ops** : le PaaS nécessite toujours du monitoring, des alertes, de la gestion des logs.
3. **Ignorer le lock-in SaaS** : exporter des millions de données depuis Salesforce coûte cher et est complexe.
4. **SaaS sans gouvernance** : les employés souscrivent à des SaaS sans approbation IT (Shadow IT).

Source : [AWS — Types of Cloud Computing](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html)`},
        {
          id: 'cloud-2',
          question: 'Quels sont les services AWS essentiels à connaître ?',
          answer: '**Compute** : `EC2` (serveurs virtuels), `Lambda` (serverless), `ECS`/`EKS` (conteneurs). **Stockage** : `S3` (objets/files), `EBS` (volumes pour EC2). **BDD** : `RDS` (SQL managé), `DynamoDB` (NoSQL serverless), `Aurora` (SQL haute perf).\n\n**Réseau** : `VPC` (réseau privé), `Route 53` (DNS), `CloudFront` (CDN). **Autre** : `IAM` (identité), `CloudFormation` (IaC), `SQS`/`SNS` (messagerie), `CloudWatch` (monitoring).\n\n__Pour un entretien, maîtrisez EC2, S3, RDS, Lambda, IAM et VPC — ce sont les basiques indispensables.__',
        
          deepDive: `# Services AWS Essentiels à Connaître

## Qu'est-ce que c'est ?

AWS propose plus de 200 services cloud. Pour un entretien ou une utilisation quotidienne, une dizaine de services couvrent 80% des besoins. Les connaître en profondeur (cas d'usage, limites, coût) est essentiel.

Ces services s'organisent en grandes familles : **compute**, **stockage**, **base de données**, **réseau**, **sécurité/IAM**, et **observabilité**.

## Concept détaillé

### Compute

- **EC2 (Elastic Compute Cloud)** : machines virtuelles à la demande. Choix de l'OS, de la puissance (CPU/RAM), du stockage. Paiement à l'heure ou à la seconde. Réservations et instances spot pour réduire les coûts.
- **Lambda** : serverless. Exécution de code en réponse à des événements (requête HTTP, upload S3, file SQS). Paiement à l'exécution (ms). Limite : 15 min, 10 Go RAM.
- **ECS / EKS** : orchestration de conteneurs. ECS = AWS natif (plus simple). EKS = Kubernetes managé (portable).
- **Fargate** : serverless compute pour conteneurs (sans gérer les nœuds).

### Stockage

- **S3 (Simple Storage Service)** : stockage d'objets. 11 9s de durabilité. Classes de stockage : Standard, Infrequent Access, Glacier (archivage). Pay-per-use.
- **EBS (Elastic Block Store)** : volumes de disque pour EC2. SSD ou HDD. Snapshots pour backup.
- **EFS (Elastic File System)** : système de fichiers NFS partagé entre plusieurs instances EC2.

### Base de données

- **RDS (Relational Database Service)** : bases SQL managées (PostgreSQL, MySQL, Oracle, SQL Server). Multi-AZ, read replicas, auto-scaling de stockage.
- **Aurora** : MySQL/PostgreSQL compatible, 5x plus performant que RDS standard. Serverless optionnel.
- **DynamoDB** : NoSQL clé-valeur/serverless. Latence < 10ms. Scaling automatique. Idéal pour les workloads prévisibles.
- **ElastiCache** : cache Redis ou Memcached managé.

### Réseau

- **VPC (Virtual Private Cloud)** : réseau privé isolé dans AWS. Subnets publics/privés, route tables, NAT Gateway.
- **CloudFront** : CDN mondial. Cache aux edge locations. Protection DDoS (AWS Shield).
- **Route 53** : DNS managé. Routing policies (simple, weighted, latency-based, geolocation).

### Sécurité

- **IAM** : gestion des identités et des accès. Utilisateurs, groupes, rôles, politiques. Moindre privilège.
- **KMS** : gestion des clés de chiffrement. Chiffrement au repos et en transit.
- **WAF** : pare-feu applicatif web. Protection contre SQL injection, XSS, bots.

## Schéma / Architecture

\`\`\`
                    ┌──────────────────────────────────────────┐
                    │          Utilisateur final                │
                    └────────────────┬─────────────────────────┘
                                     │ HTTPS
                            ┌────────▼────────┐
                            │  Route 53 (DNS) │
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │  CloudFront     │ ← CDN
                            │ (+ WAF Shield)  │ ← Sécurité
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │  ALB (L7)       │ ← Load balancing
                            └────────┬────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
        ┌─────▼─────┐         ┌──────▼──────┐        ┌─────▼─────┐
        │   EC2     │         │   Lambda    │        │   ECS     │
        │ (compute) │         │ (serverless)│        │(conteneurs)│
        └─────┬─────┘         └──────┬──────┘        └─────┬─────┘
              │                      │                      │
        ┌─────▼─────┐         ┌──────▼──────┐        ┌─────▼─────┐
        │   RDS     │         │  DynamoDB   │        │ElastiCache│
        │ (SQL)     │         │  (NoSQL)    │        │ (Cache)   │
        └───────────┘         └─────────────┘        └───────────┘
              │
        ┌─────▼─────┐
        │   S3      │ ← Stockage objets
        └───────────┘
\`\`\`

## Comparaison des alternatives de compute

| Service | Type | Scaling | Gestion | Cas d'usage |
|---------|------|---------|---------|-------------|
| EC2 | VM | Manuel / auto-scaling | OS + runtime | Apps legacy, workload prévisible |
| Lambda | FaaS | Automatique | Code uniquement | Événements, APIs burst |
| ECS/EKS | Conteneurs | Automatique (K8s) | App + conteneur | Microservices, workloads longs |
| Fargate | Conteneurs serverless | Automatique | App uniquement | Microservices sans ops |

## Bonnes pratiques

1. **IAM first** : ne jamais utiliser le compte root. Créer des utilisateurs avec les droits minimaux.
2. **Taguer toutes les ressources** : pour le suivi des coûts, l'automatisation, et l'organisation.
3. **Utiliser les instances réservées pour la charge stable** : jusqu'à 72% d'économie.
4. **Activer le chiffrement au repos sur S3, RDS, EBS** : par défaut.
5. **Multi-AZ pour la production** : base minimale de résilience.
6. **CloudTrail + CloudWatch** : audit de toutes les actions API et monitoring des métriques.

## Pièges courants

1. **Bucket S3 public** : la cause #1 des fuites de données sur AWS. Toujours configurer Block Public Access par défaut.
2. **Instance EC2 sur-dimensionnée** : choisir une taille trop grande « au cas où » → gaspillage. Commencer petit, auto-scaler.
3. **Pas de budget alert** : une instance oubliée (ou une API mal configurée) peut générer une facture de milliers d'euros.
4. **Vendor lock-in inconscient** : utiliser DynamoDB Streams, SQS FIFO, ou Lambda Edge → difficile à migrer ensuite.
5. **Ignorer les limites de service** : Lambda 15 min, 1000 connexions RDS, 3000 buckets S3 par compte.

Source : [AWS Documentation](https://docs.aws.amazon.com/)`},
        {
          id: 'cloud-3',
          question: 'Que sont les régions et zones de disponibilité ?',
          answer: 'Une **région** est un ensemble de data centers géographiquement isolés (ex: `eu-west-1` = Irlande). Chaque région contient plusieurs **Availability Zones** (AZ) — des data centers physiquement séparés avec alimentation et réseau indépendants.\n\nDéployer sur **plusieurs AZs** assure la haute disponibilité : si un data center tombe, les autrès prennent le relais. Déployer sur **plusieurs régions** assure la reprise après sinistre (DR) et la faible latence pour les utilisateurs mondiaux.\n\n__Règle : au minimum 2 AZs en production pour la haute disponibilité.__ Le choix de région impacte latence, coûts et conformité (RGPD → données en Europe).',
        
          deepDive: `# Régions et Zones de Disponibilité AWS

## Qu'est-ce que c'est ?

L'infrastructure AWS est organisée en **régions** et **zones de disponibilité (AZ)** pour offrir une combinaison de proximité (latence), de résilience et de conformité. Comprendre cette hiérarchie est fondamental pour concevoir des architectures cloud hautement disponibles et performantes.

- **Région** : zone géographique distincte (ex : eu-west-1 = Irlande). Chaque région est indépendante (réseau, alimentation, API).
- **Zone de disponibilité (AZ)** : un ou plusieurs data centers physiquement séparés au sein d'une région, avec alimentation, refroidissement et réseau indépendants. Reliées par des fibres à très faible latence (< 2ms).
- **Edge location** : points de présence CloudFront pour le cache CDN, plus de 400 dans le monde.

## Concept détaillé

### Pourquoi plusieurs régions ?

1. **Latence** : déployer près des utilisateurs réduit le temps de réponse (ex : région ap-southeast-1 pour les utilisateurs asiatiques).
2. **Conformité** : le RGPD exige que les données des citoyens européens restent en Europe.
3. **Reprise après sinistre (DR)** : une région peut tomber (très rare mais possible). Avoir un déploiement dans une seconde région permet la continuité.

### Pourquoi plusieurs AZ dans une région ?

Une AZ n'est PAS un simple rack serveur. C'est un ensemble de data centers avec :
- Alimentation redondante (générateurs de secours).
- Connexions réseau redondantes à plusieurs opérateurs.
- Sites physiquement séparés de plusieurs kilomètres.

Déployer sur plusieurs AZ = haute disponibilité : si une AZ tombe (orage, incendie), les autrès continuent.

### Qu'est-ce qu'une Edge Location ?

Les edge locations sont des data centers plus petits, répartis dans le monde entier. Elles ne font pas tourner vos applications — elles **mettent en cache** le contenu statique (CloudFront) et servent de points d'entrée DNS (Route 53).

## Schéma / Architecture

\`\`\`
Région : eu-west-1 (Irlande)
│
├── AZ : eu-west-1a
│   ├── Data Center 1
│   ├── Data Center 2
│   └── Data Center 3 (physiquement séparés)
│
├── AZ : eu-west-1b
│   ├── Data Center 1
│   └── Data Center 2
│
├── AZ : eu-west-1c
│   └── Data Center 1
│
├── Edge Locations : Dublin, Londres, Paris, Amsterdam, Francfort, …
└── Regional Edge Cache : Francfort

Architecture multi-AZ :
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  AZ 1a   │    │  AZ 1b   │    │  AZ 1c   │
    │          │    │          │    │          │
    │  EC2 A   │◄──►│  EC2 B   │◄──►│  EC2 C   │ ← Load Balancer
    │          │    │          │    │          │
    │  RDS     │    │  RDS     │    │          │ ← Réplication synchrone
    │  Primary │───►│  Standby │    │          │
    └──────────┘    └──────────┘    └──────────┘
\`\`\`

## Comparaison Région vs AZ vs Edge

| Critère | Région | Zone de disponibilité | Edge Location |
|---------|--------|----------------------|---------------|
| Nombre | ~30 | 2-6 par région | 400+ |
| Distance entre sites | Des milliers de km | Quelques km | Partout dans le monde |
| Latence inter-site | 50-200ms | < 2ms | Variable |
| Usage principal | Compute, stockage, BDD | Haute disponibilité | CDN, DNS, caching |
| Coût de transfert | Élevé (inter-région) | Faible (intra-région) | Faible (cache out) |
| Conformité | Régionale (RGPD) | Aucune | Aucune |

## Bonnes pratiques

1. **Minimum 2 AZ en production** : toute architecture critique doit être déployée sur au moins deux AZ.
2. **Choisir la région la plus proche des utilisateurs** : tester la latence depuis différentes localisations.
3. **Respecter la conformité** : pour le RGPD, choisir eu-west-1, eu-west-2, eu-central-1.
4. **Éviter le « AZ pinning »** : ne pas coder en dur les AZ. Si une AZ est ajoutée/supprimée, votre code doit s'adapter.
5. **Traffic entre AZ** : le transfert entre AZ est facturé (même région). Optimiser les échanges.
6. **DR multi-région** : pour les systèmes critiques, prévoir une bascule vers une autre région.

## Pièges courants

1. **Déploiement mono-AZ** : un orage sur un data center = toute l'application down pour des heures.
2. **Latence inter-région ignorée** : une application déployée aux US mais utilisée en Europe → latence de 200ms.
3. **Coût de transfert inter-AZ sous-estimé** : une application qui échange beaucoup entre AZ peut générer des coûts importants.
4. **Conformité mal comprise** : la région « GovCloud » (US Government) n'est pas appropriée pour les données européennes.
5. **AZ non uniformes** : les AZ ont des capacités différentes (tailles d'instances disponibles). Vérifier la disponibilité dans chaque AZ.

Source : [AWS Global Infrastructure](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)`},
        {
          id: 'cloud-4',
          question: 'Qu\'est-ce que l\'auto-scaling ?',
          answer: 'L\'**auto-scaling** ajuste automatiquement le nombre d\'instances en fonction de la charge : **scale-out** (ajout d\'instances) quand la charge monte, **scale-in** (retrait) quand elle baisse.\n\nSe configure via des **métriques** : CPU > 70% → scale-out, CPU < 30% → scale-in. Sur AWS : `Auto Scaling Groups` + `Application Load Balancer`. Sur Kubernetes : `HPA` (*Horizontal Pod Autoscaler*).\n\n__L\'auto-scaling réduit les coûts (on ne paie que ce qu\'on utilise) et assure la résilience sous charge.__ Configurez aussi un *minimum* d\'instances pour absorber les montées en charge soudaines.',
          code: '# AWS Auto Scaling Group\nMinSize: 2\nMaxSize: 10\nDesiredCapacity: 3\n\n# Policies\nScaleOut: CPU > 70% → +2 instances\nScaleIn:  CPU < 30% → -1 instance',
          language: 'yaml',
        
          deepDive: `# Auto-Scaling

## Qu'est-ce que c'est ?

L'**auto-scaling** ajuste automatiquement le nombre de ressources (instances, pods, conteneurs) en fonction de la charge réelle ou prévue. C'est un des piliers du cloud computing : on ne paie que pour ce qu'on utilise, et le système s'adapte aux variations de trafic sans intervention humaine.

Un système d'auto-scaling repose sur trois composants : la **métrique** qui déclenche le scaling, la **politique** qui décide de l'ampleur du changement, et le **groupe** qui maintient le nombre d'instances dans les limites définies.

## Concept détaillé

### Types d'auto-scaling

**Horizontal (Scale Out/In)** : ajouter ou retirer des instances. Approche préférée pour les applications cloud-natives. Résilience et flexibilité maximales.

**Vertical (Scale Up/Down)** : augmenter ou diminuer la puissance d'une instance (CPU, RAM). Plus simple (pas de changement d'architecture) mais nécessite un redémarrage et à une limite haute. AWS graviton en fait partie.

**Predictive scaling** : utiliser le machine learning pour analyser les patterns de trafic et anticiper les besoins de scaling. Idéal pour les charges cycliques (ex : plus de trafic le lundi matin).

### Métriques de scaling

Les métriques les plus courantes :
- **CPU** : utilisation moyenne du CPU (ex : > 70% scale out, < 30% scale in).
- **RAM** : utilisation mémoire (important pour les applications java/Nginx).
- **Requêtes par seconde** : métrique applicative plus fiable que CPU.
- **File de messages** : profondeur de la file (messages en attente).
- **Latence** : P95 ou P99 de la latence de réponse.

### Composants AWS

- **Auto Scaling Group (ASG)** : définit la configuration (AMI, type d'instance, VPC), les limites (min, max, desired), et les politiques de scaling.
- **Launch Template** : versionné, contient la configuration de l'instance (image, type, security groups, user data).
- **CloudWatch Alarm** : surveille une métrique et déclenche une action (scale out/in).
- **Lifecycle Hooks** : actions personnalisées lors du lancement/arrêt d'une instance (ex : ajouter au load balancer, exécuter un script de bootstrap).

## Schéma / Architecture

\`\`\`
Trafic web
    │
    ▼
┌──────────────┐
│  ALB (L7)    │ ← Distribue le trafic
└──────┬───────┘
       │
       ├──────────────────────────────────┐
       │          │          │          │
    ┌──▼──┐   ┌──▼──┐   ┌──▼──┐   ┌──▼──┐
    │EC2  │   │EC2  │   │EC2  │   │EC2  │  ← Instances dans l'ASG
    └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘
       │          │          │          │
       └──────────┴──────────┴──────────┘
                    │
            ┌───────▼────────┐
            │  CloudWatch    │ ← Surveille CPU/latence
            └───────┬────────┘
                    │
            ┌───────▼────────┐
            │  Auto Scaling  │ ← Décide scale out/in
            │    Group       │
            └───────────────┘

    Scale out : CPU > 70% → +2 instances (cooldown: 120s)
    Scale in  : CPU < 30% → -1 instance (cooldown: 300s)
    Min: 2 | Max: 10 | Desired: 3
\`\`\`

## Comparaison des types de scaling

| Critère | Horizontal | Vertical | Prédictif |
|---------|-----------|---------|-----------|
| Flexibilité | Très élevée | Limitée (max hardware) | Adaptative |
| Résilience | Haute (multi-instances) | Faible (SPOF) | Haute |
| Complexité | Modérée | Faible | Élevée |
| Down time | Aucun (rolling) | Oui (redémarrage) | Aucun |
| Coût | Linéaire | Exponentiel | Optimisé |
| Cas d'usage | Web apps, API | BDD monolithique | Charges cycliques |

## Avantages et inconvénients

**Avantages :**
- Coût optimisé : pas d'instances inactives.
- Résilience : le système survit à la perte d'une instance (remplacement automatique).
- Disponibilité : le système s'adapte aux pics de trafic sans intervention humaine.
- Automatisation : pas de garde d'astreinte pour scale manuellement à 3h du matin.

**Inconvénients :**
- Complexité de configuration : trouver les bons seuils demande de l'expérimentation.
- Oscillation (flapping) : scale out puis scale in en boucle si les seuils sont mal configurés.
- Warm-up : une nouvelle instance peut mettre plusieurs minutes avant d'être pleinement opérationnelle.
- Coût des instances de rechange : le minimum défini (2 instances) tourne 24/7.

## Cas d'usage typiques

1. **Application web avec pics saisonniers** : Black Friday → scale out massif, puis scale in progressif.
2. **API burst** : traitement par lots qui génère des pics de CPU le soir.
3. **Environnement de dev** : scale in à 0 la nuit et le week-end (coût zéro).
4. **Traitement vidéo** : scale out sur la profondeur de la file de jobs de transcodage.

## Bonnes pratiques

1. **Définir un cooldown** : éviter les oscillations. Attendre 60-300s entre chaque action de scaling.
2. **Utiliser plusieurs métriques** : CPU + RAM + RequestCount pour une décision plus fiable.
3. **Warm-up pool** : prévoir 1-2 instances toujours prêtes pour absorber les montées en charge soudaines.
4. **Lifecycle hooks** : exécuter un script de préparation (vider les caches, charger le JIT) avant de mettre l'instance en service.
5. **Tests de scaling** : simuler une montée en charge en pré-prod pour valider les seuils.
6. **Notifications** : alerter quand un scale out se produit (trop de scale out = peut-être un problème).

## Pièges courants

1. **Oscillation (flapping)** : scale out à 70% CPU, scale in à 65% → l'ASG ajoute/enlève des instances en boucle. Prévoir une marge suffisante.
2. **Cooldown trop court** : avant que la nouvelle instance ne soit prête, l'alarme se déclenche à nouveau et ajoute encore des instances.
3. **Scale in trop agressif** : retirer une instance qui est encore chaude → perte de capacité en cas de nouveau pic.
4. **Instance non éligible au load balancer** : la nouvelle instance n'est pas encore chaude (JVM à compiler, caches à remplir) mais reçoit déjà du trafic.
5. **Dépendance non scalable** : scaler les serveurs web ne sert à rien si la base de données est saturée.

Source : [AWS Auto Scaling Documentation](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)`},
        {
          id: 'cloud-5',
          question: 'CloudFormation vs Terraform : quel IaC choisir ?',
          answer: '**`CloudFormation`** : IaC native AWS, syntaxe `JSON`/`YAML`, gère uniquement l\'écosystème AWS, gratuit, intégration native avec les services AWS.\n\n**`Terraform`** : IaC **multi-cloud** (`AWS` + `Azure` + `GCP` + on-premise), syntaxe `HCL` plus lisible, état versionné, énorme communauté et registry de modules.\n\n__Si vous êtes 100% AWS, CloudFormation est pertinent. Sinon, Terraform est le choix par défaut__ grâce à sa portabilité et son écosystème. En pratique, Terraform domine le marché de l\'IaC.',
          code: '# Terraform\nresource "aws_s3_bucket" "app_data" {\n  bucket = "mon-app-data"\n}\n\nresource "aws_instance" "web" {\n  ami           = "ami-123456"\n  instance_type = "t3.micro"\n}',
          language: 'hcl',
        
          deepDive: `# CloudFormation vs Terraform — Quel IaC Choisir ?

## Qu'est-ce que c'est ?

L'**Infrastructure as Code (IaC)** est la pratique de gérer l'infrastructure via des fichiers de configuration déclaratifs plutôt que des actions manuelles. Devenir compétent en IaC est aujourd'hui indispensable pour tout ingénieur cloud.

Les deux outils dominants sont **AWS CloudFormation** (natif AWS) et **Terraform** (HashiCorp, multi-cloud). Le choix entre eux dépend de votre écosystème, de vos besoins de portabilité et de vos préférences de workflow.

## Concept détaillé

### CloudFormation

Service AWS natif qui modélise et provisionne les ressources AWS via des templates JSON ou YAML.

- **Intégration profonde** : gère tous les services AWS, y compris les plus récents et les plus obscurs.
- **Stack management** : les ressources sont regroupées en stacks. Création, mise à jour, suppression = opérations sur la stack.
- **Rollback automatique** : si une création échoue, CloudFormation nettoie automatiquement les ressources créées.
- **Drift detection** : détecte si des ressources ont été modifiées manuellement en dehors de CloudFormation.

### Terraform

Outil open-source multi-cloud de HashiCorp, utilisant son propre langage HCL (HashiCorp Configuration Language).

- **Multi-cloud** : AWS, Azure, GCP, et des centaines de providers (Kubernetes, Datadog, Cloudflare).
- **State file** : Terraform maintient un fichier d'état (terraform.tfstate) qui fait le lien entre la configuration et le monde réel.
- **Plan/Apply** : \`terraform plan\` montre les changements avant de les appliquer. Permet la revue dans une PR.
- **Modules** : partage de configurations réutilisables via le Terraform Registry.

## Comparaison

| Critère | CloudFormation | Terraform |
|---------|---------------|-----------|
| Multi-cloud | Non (AWS uniquement) | Oui (AWS, Azure, GCP, …) |
| Langage | JSON/YAML | HCL (plus lisible) |
| State management | Intégré (AWS gère) | Fichier .tfstate (backend S3/GCS) |
| Planification | Non (applique directement) | Oui (plan/apply) |
| Rollback | Automatique | Manuel (ou via state) |
| Modules | AWS Resource Manager | Terraform Registry (1000+) |
| Gestion des erreurs | Rollback automatique | S'arrête sur erreur (state partiel) |
| Gratuit | Oui (pas de surcoût) | Oui (Terraform Cloud payant) |
| Support services récents | Immédiat (service AWS) | Décalé (provider à mettre à jour) |

## Avantages et inconvénients

**CloudFormation :**
- Avantages : intégration AWS native, rollback automatique, pas de state à gérer, gratuit.
- Inconvénients : AWS uniquement, syntaxe verbeuse, pas de planification avant apply.

**Terraform :**
- Avantages : multi-cloud, écosystème riche, plan/apply pour validation, modules partagés.
- Inconvénients : state file à sécuriser (chiffrement S3 + DynamoDB lock), courbe d'apprentissage HCL, gestion des versions de providers.

## Cas d'usage typiques

1. **100% AWS → CloudFormation** : si vous n'utilisez qu'AWS et que l'équipe est familière avec YAML/JSON, CloudFormation est le choix naturel.
2. **Multi-cloud → Terraform** : si vous utilisez AWS + GCP, ou AWS + Cloudflare, Terraform est indispensable.
3. **Équipe DevOps chevronnée → Terraform** : la planification, les modules, et l'intégration CI/CD en font un outil très puissant.
4. **Startup 100% AWS → CloudFormation CDK** : le CDK (Cloud Development Kit) permet d'écrire l'IaC en TypeScript/Python au lieu de YAML.

## Bonnes pratiques

1. **Sécuriser le state Terraform** : utiliser un backend S3 avec versioning et chiffrement, et DynamoDB pour le locking.
2. **Structurer par environnement** : dossiers \`dev/\`, \`staging/\`, \`prod/\` avec des workspaces ou des configurations séparées.
3. **Importer les ressources existantes** : plutôt que de tout reconstruire, \`terraform import\` récupère l'état des ressources déjà créées.
4. **Préférer les modules aux copier-coller** : créer des modules pour les patterns récurrents (VPC, cluster ECS, base de données).
5. **Utiliser le CloudFormation drift detection** : même avec Terraform, vérifier que personne n'a modifié l'infra manuellement.
6. **CI/CD automatique** : \`terraform plan\` dans la PR → revue humaine → \`terraform apply\` automatique sur merge.

## Pièges courants

1. **State Terraform non sécurisé** : stocker le state localement ou sans chiffrement → fuite d'informations sensibles (IPs, IDs de ressources).
2. **Pas de locking** : deux membres de l'équipe qui appliquent en même temps → corruption du state.
3. **CloudFormation sans changelog** : CloudFormation n'a pas de preview. Un \`UPDATE\` peut supprimer par accident une ressource critique.
4. **Mélanger les outils** : gérer une partie en CloudFormation et une autre en Terraform → confusion et conflits.
5. **Ressources manuelles** : des ressources créées hors IaC (console AWS) sont invisibles dans la configuration → perte de contrôle.

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
          answer: 'Le **serverless** ne signifie pas « sans serveur » — c\'est le fournisseur qui gère les serveurs. Vous ne provisionnez rien, vous **déployez du code** qui s\'exécute à la demande. Paiement à l\'exécution réelle (millisecondes), scaling automatique, zéro administration.\n\nAvantages : **coût optimisé** (pas de serveur idle), **scaling infini**, **time-to-market rapide**. Inconvénients : **cold starts** (latence au premier appel), limites d\'exécution (15 min sur `Lambda`), debugging et observabilité plus complexes.\n\n__Le serverless est idéal pour les workloads événementiels, intermittents ou imprévisibles.__ Pas pour les traitements longs où la charge constante.',
        
          deepDive: `# Serverless — Principes et Avantages

## Qu'est-ce que c'est ?

Le **serverless** (ou Function-as-a-Service — FaaS) est un modèle d'exécution dans lequel le fournisseur cloud (AWS Lambda, Azure Functions, Google Cloud Functions) alloue dynamiquement les ressources et facture en fonction du temps d'exécution réel. Le développeur écrit uniquement le code métier, sans provisionner ni gérer de serveurs.

« Serverless » ne signifie pas « sans serveur » — les serveurs existent toujours, mais ils sont gérés par le fournisseur. L'équipe gagne en productivité (plus d'ops) mais perd en contrôle.

## Concept détaillé

### Comment ça marche

1. Le développeur écrit une fonction et la déploie chez le fournisseur.
2. La fonction est déclenchée par un **événement** : requête HTTP, upload de fichier S3, message dans une file SQS, changement dans une table DynamoDB.
3. Le fournisseur alloue un conteneur, charge le runtime (Node.js, Python, Java, Go, etc.) et exécute la fonction.
4. Après exécution, le conteneur reste « chaud » pendant quelques minutes pour répondre rapidement aux appels suivants.
5. Si la fonction n'est pas appelée pendant un certain temps, le conteneur est recyclé (cold start).

### Tarification

On paie pour :
- Le nombre d'exécutions (requêtes).
- Le temps d'exécution (en ms, multiplié par la mémoire allouée).
- Le trafic réseau sortant (egress).

On ne paie PAS pour les périodes d'inactivité — contrairement à un serveur EC2 qui tourne 24/7.

### Avantages par rapport au serveur traditionnel

| Aspect | Serveur (EC2) | Serverless (Lambda) |
|--------|--------------|---------------------|
| Provisionnement | Minutes à heures | Millisecondes |
| Scaling | Manuel ou auto-scaling | Automatique (instantané) |
| Paie pour | Capacité allouée (24/7) | Exécutions réelles |
| Maintenance | OS, runtime, patches, logs | Aucune |
| Limite durée | Aucune | 15 minutes |

## Comparaison des fournisseurs FaaS

| Critère | AWS Lambda | Azure Functions | Google Cloud Functions |
|---------|-----------|----------------|----------------------|
| Runtimes | Node.js, Python, Java, Go, .NET, Ruby | Node.js, Python, Java, .NET, PowerShell | Node.js, Python, Go, Java, .NET |
| Mémoire max | 10 Go | 1.5 Go (Premium: 14 Go) | 8 Go |
| Timeout max | 15 min | 10 min (Premium: 60 min) | 60 min (Gen2: 60 min) |
| Déploiement | ZIP/container, SAM, CDK, Serverless | ZIP, container, Kudu | ZIP, container, gcloud CLI |
| Pricing | $0.20/1M req + $0.0000166667/GB-s | $0.20/1M req + $0.000016/GB-s | $0.40/1M req + $0.0000100/GB-s |

## Avantages et inconvénients

**Avantages :**
- **Zéro administration** : pas de serveur à patcher, à sécuriser, à redimensionner.
- **Scaling infini** : le fournisseur gère des milliers d'exécutions simultanées.
- **Coût optimisé** : pas d'instances inactives. Idéal pour les charges intermittentes.
- **Time-to-market** : déployer une fonction prend quelques minutes.
- **Événementiel** : s'intègre naturellement avec les services cloud (S3, SQS, DynamoDB Streams).

**Inconvénients :**
- **Cold starts** : latence de 100ms à plusieurs secondes sur la première invocation.
- **Limites d'exécution** : 15 minutes max (Lambda), 10 Go mémoire.
- **Debugging** : pas d'accès SSH, logs CloudWatch, debugging distribué complexe.
- **Verrouillage fournisseur** : chaque fournisseur a ses spécificités (Lambda SnapStart, EFS, VPC).
- **Coût à grande échelle** : à très haut volume (milliers de req/s), un serveur dédié peut être moins cher.
- **État** : les fonctions sont stateless. L'état doit être externalisé (DynamoDB, S3, Redis).

## Cas d'usage typiques

1. **API REST** : Lambda + API Gateway pour une API serverless. Idéal pour les charges variables.
2. **Traitement d'images** : upload S3 → Lambda redimensionne → stocke la miniature.
3. **Tâches cron** : EventBridge Scheduler + Lambda pour des tâches périodiques (cleanup, rapports).
4. **ETL léger** : Lambda lit depuis S3, transforme, écrit dans DynamoDB ou Redshift.
5. **Webhooks** : réception d'événements Stripe, GitHub, Slack → traitement dans Lambda.

## Bonnes pratiques

1. **Fonctions ciblées** : une fonction = une responsabilité. Pas de Lambda monolithique.
2. **Idempotence** : une même invocation ne doit pas produire d'effets de bord en double (retry naturel).
3. **Connexions hors handler** : initialiser les clients BDD/API en dehors de la fonction handler (reuse entre invocations).
4. **Variables d'environnement pour la configuration** : pas de configuration codée en dur.
5. **Dead Letter Queue** : capturer les échecs pour les analyser et retenter.
6. **Provisioned Concurrency** : pour les fonctions critiques (API temps réel), préchauffer des instances.
7. **Monitoring** : CloudWatch Logs, X-Ray, métriques personnalisées (durée, erreurs, cold starts).

## Pièges courants

1. **Timeout trop court** : des fichiers volumineux ou des API lentes → la fonction expire. Passer de 3s à 30s si nécessaire.
2. **Mémoire insuffisante** : la mémoire allouée est aussi CPU. 128 Mo = peu de CPU. 1024+ Mo = plus de CPU.
3. **Dépendances lourdes** : plus le package est gros, plus le cold start est long. Optimiser les layers.
4. **VPC sans NAT** : une fonction Lambda dans un VPC privé n'a pas accès à Internet → impossible d'appeler une API externe.
5. **Concurrence insuffisante** : par défaut, 1000 exécutions simultanées. Pour des pics soudains, demander une augmentation.
6. **Coût exponentiel** : une boucle infinie ou un flux d'événements mal configuré → facture astronomique. Mettre des alarmes de budget.

Source : [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html)`},
        {
          id: 'cloud-7',
          question: 'Qu\'est-ce que le cold start en serverless ?',
          answer: 'Le **cold start** est la latence initiale quand une fonction serverless est invoquée après une période d\'inactivité. Le fournisseur doit **provisionner un conteneur**, charger le runtime et le code — cela peut prendre de 100ms à plusieurs secondes (surtout en Java/.NET).\n\nFacteurs aggravants : runtime lourd (JVM), grosse fonction (dependencies), VPC (configuration réseau), peu d\'invocations (le conteneur est recyclé vite).\n\nMitigation : **provisioned concurrency** (instances préchauffées sur `Lambda`), runtime léger (Node.js, Python), minimiser les dépendances, garder les fonctions chaudes avec des appels périodiques.\n\n__Le cold start est le principal argument contre le serverless pour les APIs basse latence.__',
        
          deepDive: `# Cold Start en Serverless

## Qu'est-ce que c'est ?

Le **cold start** est la latence initiale subie lors de la première invocation d'une fonction serverless après une période d'inactivité. Pendant ce temps, le fournisseur doit **allouer un conteneur**, **charger le runtime**, **initialiser le code**, et **établir les connexions** — avant de pouvoir traiter la requête.

C'est l'inconvénient n°1 du serverless, et le principal argument contre son utilisation pour les applications nécessitant des latences prévisibles et faibles.

## Concept détaillé

### Les phases du cold start

1. **Allocation du conteneur** (10-100ms) : le fournisseur choisit un serveur et alloue un espace d'exécution.
2. **Chargement du runtime** (50-500ms) : téléchargement et démarrage de l'environnement (Node.js, Python, JVM, .NET CLR).
3. **Initialisation du code** (50-1000ms+) : exécution du code en dehors du handler (imports, connexions, chargement de fichiers).
4. **Exécution du handler** : la requête est enfin traitée.

La durée totale varie de **100ms à plusieurs secondes** selon le runtime et la taille du package.

### Facteurs aggravants

- **Runtime :** Java/.NET sont les plus lents (JVM/Garbage Collector), Node.js/Python/Go les plus rapides.
- **Taille du package :** plus il y a de dépendances, plus le téléchargement est long (S3 → conteneur).
- **VPC :** si la fonction est dans un VPC, l'attribution d'une ENI (Elastic Network Interface) ajoute 2-5 secondes.
- **Mémoire allouée :** plus de mémoire = plus de CPU alloué = démarrage plus rapide.
- **Fréquence d'invocation :** après ~5-15 min d'inactivité, le conteneur est recyclé → prochain appel = cold start.

### L'atténuation : Provisioned Concurrency

AWS Lambda propose les **Provisioned Concurrency** : des instances préchauffées, toujours prêtes. Le nombre d'instances est configurable et peut être ajusté automatiquement avec Application Auto Scaling. Coût : on paie pour les instances réservées (même si elles ne sont pas utilisées).

AWS Lambda SnapStart (Java) : prend un snapshot de l'état initial (code + JVM) après initialisation, et restaure ce snapshot au lieu de redémarrer la JVM. Réduit le cold start Java de plusieurs secondes à ~200ms.

## Comparaison cold start par runtime

| Runtime | Cold start typique | Taille package typique | Recommandé pour |
|---------|-------------------|----------------------|-----------------|
| Node.js | 50-200ms | 1-5 Mo | APIs légères, webhooks |
| Python | 50-300ms | 1-10 Mo | Data processing, AI/ML |
| Go | 50-150ms | 5-15 Mo | APIs haute performance |
| Java | 500ms-5s+ | 10-50 Mo | Apps existantes, frameworks lourds |
| .NET | 500ms-3s+ | 10-30 Mo | Apps .NET Core |
| Ruby | 100-400ms | 1-5 Mo | Scripting, APIs simples |

## Avantages et inconvénients du warming

| Méthode | Coût | Complexité | Efficacité |
|---------|------|-----------|------------|
| Provisioned Concurrency | Élevé (paiement 24/7) | Faible | 100% (pas de cold start) |
| SnapStart (Java) | Aucun supplément | Très faible | 90-95% |
| Keep-warm ping (CloudWatch) | Faible | Modérée | 50-80% (dépend de la fréquence) |
| Langages légers (Go, Python) | Aucun | Aucun | Réduit à 50-200ms |

## Bonnes pratiques

1. **Choisir le bon runtime** : pour une API sensible à la latence, préférer Node.js, Python ou Go plutôt que Java.
2. **Minimiser les dépendances** : utiliser \`npm install --production\`, éviter les frameworks lourds (Spring Boot → Micronaut ou Quarkus).
3. **Initialisation paresseuse** : déplacer les imports lourds dans le handler (chargés uniquement si nécessaire).
4. **Taille de package optimisée** : utiliser des layers AWS Lambda pour les dépendances partagées.
5. **Connexions hors handler** : établir les connexions BDD/Redis au niveau du module (reuse entre invocations chaudes).
6. **Provisioned Concurrency pour les endpoints sensibles** : API temps réel, endpoints de login. Réservée aux fonctions critiques.
7. **SnapStart (Java)** : réduire le cold start Java de 5s à 200ms avec une configuration minimale.

## Pièges courants

1. **Ignorer les cold starts** : déployer une API Lambda sans mesurer la latence → mauvaises performances constatées en production.
2. **Chargement lourd dans le handler** : initialiser une connexion BDD à chaque invocation → même les appels « chauds » sont lents.
3. **VPC inutile** : si Lambda n'accède pas à RDS ou ElastiCache, ne pas la mettre dans un VPC (l'ENI ajoute 2-5s).
4. **Trop de provisioned concurrency** : 100 instances provisionnées qui ne sont jamais utilisées → coût inutile.
5. **Keep-warming toutes les minutes** : une Lambda qui s'exécute toutes les minutes coûte 1440 exécutions par jour × 365 jours. Vérifier que le coût est justifié.

Source : [AWS Lambda — Cold Starts](https://docs.aws.amazon.com/lambda/latest/dg/functions-states.html)`},
        {
          id: 'cloud-8',
          question: 'Serverless vs conteneurs : quand choisir quoi ?',
          answer: '**Serverless** (`Lambda`, `Cloud Functions`) : zéro infra à gérer, scaling auto, paiement à l\'usage. Idéal pour : événements, APIs à faible/moyenne charge, tâches ponctuelles, prototypage rapide.\n\n**Conteneurs** (`ECS`, `EKS`, `Fargate`) : contrôle total sur le runtime, pas de limite de durée, portabilité, stateful possible. Idéal pour : services longue durée, charge prévisible, workloads complexes, migration progressive depuis un monolithe.\n\n__Serverless pour la simplicité et le coût variable, conteneurs pour le contrôle et la prévisibilité.__ Beaucoup d\'équipes combinent les deux : serverless pour les events, conteneurs pour les services principaux.',
        
          deepDive: `# Serverless vs Conteneurs — Quand Choisir Quoi ?

## Qu'est-ce que c'est ?

**Serverless (Lambda, Cloud Functions)** et **Conteneurs (Docker, Kubernetes, ECS/EKS)** sont deux approches pour déployer et exécuter des applications dans le cloud. Les deux éliminent la gestion des serveurs nus, mais à des degrés différents et avec des compromis distincts.

Le choix n'est pas binaire : beaucoup d'équipes utilisent les **deux** dans la même architecture, choisissant l'approche la mieux adaptée à chaque workload.

## Concept détaillé

### Serverless (FaaS)

- Le fournisseur gère tout : runtime, scaling, haute disponibilité.
- Le code est organisé en fonctions déclenchées par des événements.
- Scaling instantané et automatique.
- Paiement à l'exécution (ms).
- Limite : 15 min, 10 Go RAM, pas d'état local.

### Conteneurs (CaaS / Containers as a Service)

- L'équipe définit l'environnement (Dockerfile) et le fournisseur l'exécute.
- Le code tourne en continu (process long).
- Scaling manuel ou automatique (HPA Kubernetes).
- Paiement à l'instance ou au pod (temps d'exécution continu).
- Pas de limite de durée, état local possible.

### Fargate — le meilleur des deux mondes ?

AWS Fargate est un moteur d'exécution serverless pour conteneurs. On définit un Dockerfile, et AWS le déploie sans gérer les nœuds. On conserve la portabilité des conteneurs avec la simplicité du serverless — mais on paie pour le temps d'exécution du conteneur (pas à la requête).

## Comparaison

| Critère | Serverless (Lambda) | Conteneurs (ECS/EKS) | Fargate |
|---------|-------------------|---------------------|---------|
| Contrôle runtime | Aucun | Total (Dockerfile) | Total (Dockerfile) |
| Scaling | Automatique, instantané | Manuel (HPA) ou automatique | Automatique |
| Durée d'exécution | Max 15 min | Illimitée | Illimitée |
| État local | Non (stateless) | Oui (volumes) | Oui (EFS) |
| Latence démarrage | Cold start possible | Faible (déjà running) | Faible à modérée |
| Débogage | Logs CloudWatch | Shell dans le conteneur | Shell dans le conteneur |
| Coût | Pay-per-execution | Pay-per-instance | Pay-per-CPU/RAM |
| Portabilité | Faible (lock-in provider) | Haute (Docker standard) | Haute (Docker standard) |

## Avantages et inconvénients

**Serverless (Lambda) :**
- Avantages : coût proche de zéro pour les faibles volumes, scaling automatique, ops minimal.
- Inconvénients : cold starts, limite de durée, pas d'état, debugging difficile, lock-in.

**Conteneurs (ECS/EKS) :**
- Avantages : contrôle total de l'environnement, pas de limite de temps, portabilité, debugging facile.
- Inconvénients : plus d'ops (K8s), scaling plus lent, coût continu (instances allumées 24/7).

**Fargate (serverless conteneurs) :**
- Avantages : équilibre entre contrôle et simplicité, scaling automatique, pas de gestion de nœuds.
- Inconvénients : cold start modéré (téléchargement image Docker), coût plus élevé que instances réservées.

## Cas d'usage typiques

**Serverless :**
1. **API à faible volume** : 1000 requêtes/jour → Lambda coûte quasi 0€.
2. **Tâches événementielles** : transformation d'images uploadées, notifications.
3. **Prototypes et MVP** : déploiement en 5 minutes, pas d'infrastructure.
4. **Tâches cron** : nettoyage, génération de rapports, envoi d'emails périodiques.

**Conteneurs :**
1. **API à volume élevé** : 10 000 requêtes/s → prévisible, moins cher qu'en Lambda.
2. **Services longue durée** : WebSocket, streaming, traitement vidéo.
3. **Workloads complexes** : plusieurs processus, dépendances système.
4. **Migration depuis un monolithe** : conteneuriser l'existant, découper progressivement.

**Combinaison :**
1. API Gateway → Lambda pour les endpoints à faible latence + ECS pour le traitement lourd.
2. Lambda pour les transformations de données + EKS pour le service principal.
3. Frontend statique (S3 + CloudFront) + Lambda pour API + ECS pour workers.

## Bonnes pratiques

1. **Commencer par Lambda, itérer vers les conteneurs** : si les limites du serverless deviennent bloquantes, migrer vers Fargate/ECS.
2. **Utiliser Fargate comme intermédiaire** : portabilité Docker + ops réduits.
3. **Mesurer le point d'équilibre coût** : à partir de X requêtes/s, les conteneurs deviennent moins chers que Lambda.
4. **Éviter le lock-in** : utiliser Docker et Kubernetes API standard.
5. **Monitoring unifié** : Datadog, CloudWatch, ou OpenTelemetry pour les deux types de workloads.
6. **Sécurité cohérente** : les mêmes règles IAM s'appliquent aux deux.

## Pièges courants

1. **Lambda pour tout** : même pour des traitements de 30 minutes → timeout.
2. **Kubernetes pour 2 microservices** : sur-engineering. ECS Fargate ou même Elastic Beanstalk suffit.
3. **Pas de warm-up des conteneurs** : une nouvelle réplica Kubernetes peut mettre 30s avant d'être prête (image pull + init).
4. **Coût Lambda sous-estimé** : à 1 million de requêtes/minute, Lambda devient plus cher qu'ECS Fargate.
5. **Ignorer le cold start** : une API avec Lambda doit être testée sous charge réelle.

Source : [AWS — Lambda vs Containers](https://aws.amazon.com/compare/the-difference-between-lambda-and-containers/)`},
        {
          id: 'cloud-9',
          question: 'Qu\'est-ce qu\'un CDN et pourquoi l\'utiliser ?',
          answer: '**CDN** (*Content Delivery Network*) : réseau de serveurs répartis mondialement (*edge nodes*) qui mettent en cachée le contenu statique (images, CSS, JS) au plus près des utilisateurs. Résultat : **latence réduite**, **charge du serveur d\'origine diminuée**, **meilleure disponibilité**.\n\nSur AWS : `CloudFront`. Sur Azure : `Azure CDN`. Le CDN cachée le contenu aux *edge locations* et ne contacte l\'origine que pour un *cachée miss*.\n\n__Un CDN est quasi obligatoire pour toute application web publique__ — il améliore drastiquement les performances et réduit les coûts de bande passante.',
        
          deepDive: `# CDN — Content Delivery Network

## Qu'est-ce que c'est ?

Un **Content Delivery Network (CDN)** est un réseau de serveurs répartis géographiquement dans le monde entier (**edge locations**) qui mettent en cache le contenu statique (images, CSS, JS, vidéos) au plus près des utilisateurs finaux. Le CDN réduit la **latence**, diminue la **charge sur le serveur d'origine**, et améliore la **disponibilité** grâce à la redondance.

Sans CDN, un utilisateur à Tokyo qui visite un site hébergé en Irlande subit ~200ms de latence aller-retour (contre ~10ms avec un edge local).

## Concept détaillé

### Comment ça marche

1. L'utilisateur demande \`https://cdn.monsite.com/image.webp\`.
2. Le DNS résout vers l'edge location le plus proche (géographiquement).
3. Si l'edge à la ressource en cache (TTL valide), il la sert directement → **cache HIT**.
4. Si l'edge n'a pas la ressource, il la demande au serveur d'origine (Origin Fetch), la met en cache, et la sert → **cache MISS**.
5. Les resources sont stockées en cache selon les headers \`Cache-Control\` définis par l'origine.

### Headers de cache essentiels

- **Cache-Control: public, max-age=31536000, immutable** : pour les assets statiques versionnés (nom avec hash). Cache d'un an.
- **Cache-Control: public, no-cache** : vérifier l'ETag à chaque requête. Si inchangé → 304 Not Modified.
- **Cache-Control: private, max-age=300** : contenu personnalisé (ex : avatar). Cache navigateur uniquement, 5 minutes.
- **Cache-Control: no-store** : ne jamais mettre en cache (données sensibles).

### Sécurité

Un CDN ajoute aussi une couche de sécurité :
- **DDoS protection** : absorbe les attaques volumétriques (Cloudflare, AWS Shield).
- **WAF** : filtrage des requêtes malveillantes (SQL injection, XSS).
- **Bot management** : bloque les bots malveillants (scrapers, bruteforce).
- **SSL/TLS** : gestion des certificats, HTTPS de bout en bout.

## Schéma / Architecture

\`\`\`
SANS CDN :

    ┌──────────┐        200ms         ┌──────────┐
    │ User     │ ──────────────────►  │ Origin   │
    │ (Tokyo)  │ ◄──────────────────  │ (Irlande)│
    └──────────┘        200ms         └──────────┘

AVEC CDN :

    ┌──────────┐    5ms    ┌──────────────┐
    │ User     │ ───────► │ Edge (Tokyo) │──┐
    │ (Tokyo)  │ ◄─────── │ (HIT si cache)│  │ MISS
    └──────────┘          └──────────────┘  │
                                            │
                                     ┌──────▼──────┐
                                     │  Origin     │
                                     │  (Irlande)  │
                                     └─────────────┘
\`\`\`

## Comparaison des fournisseurs

| Critère | CloudFront (AWS) | Cloudflare | Fastly | Azure CDN |
|---------|-----------------|------------|--------|-----------|
| Nombre d'edges | 450+ | 330+ | 70+ | 130+ |
| Compute at edge | Lambda@Edge, CloudFront Functions | Workers | Edge Compute | Azure Front Door |
| WAF intégré | Oui (AWS WAF) | Oui (WAF gratuit) | Non | Oui |
| Prix | Pay-per-use | Plan gratuit généreux | Pay-per-use | Pay-per-use |
| Cache invalidation | Payante (par chemin) | Gratuite (immédiate) | Gratuite | Gratuite |
| Custom SSL | AWS Certificate Manager (gratuit) | Gratuit (certificat partagé) | Payant | Gratuit |

## Avantages et inconvénients

**Avantages :**
- Latence réduite : le contenu est servi depuis l'edge le plus proche (10-50ms au lieu de 200-500ms).
- Charge serveur réduite : les ressources statiques ne sollicitent plus l'origine.
- Résilience : si l'origine tombe, le CDN sert le contenu en cache (stale-while-revalidate).
- Sécurité : protection DDoS, WAF, SSL managé.
- Coût : le CDN est généralement moins cher que la bande passante directe du serveur d'origine.

**Inconvénients :**
- Cache invalidation : forcer la mise à jour du cache après un déploiement peut être lent ou coûteux.
- Complexité : configuration des headers, comportement en fonction du type de contenu.
- Coût d'egress : le trafic sortant du CDN vers Internet est facturé (mais moins cher que l'origine).
- Contenu dynamique : un CDN n'aide pas pour les pages personnalisées (sauf avec edge computing).

## Cas d'usage typiques

1. **Site e-commerce** : images produits, CSS/JS, polices → CDN. Pages HTML → serveur d'origine (dynamique).
2. **Streaming vidéo** : segments vidéo (HLS/DASH) servis depuis le CDN. Latence réduite pour le live.
3. **Application mobile** : API responses mises en cache au CDN pour les endpoints GET.
4. **Mise à jour OTA** : fichiers APK/IPA distribués via CDN pour les mises à jour d'app.

## Bonnesses pratiques

1. **Versionner les assets statiques** : \`style.a1b2c3.css\` plutôt que \`style.css\` → cache long (1 an) + invalidation immédiate (nouveau hash = nouveau fichier).
2. **Utiliser stale-while-revalidate** : servir le contenu en cache même périmé pendant la revalidation → zéro temps d'attente.
3. **Compression** : activer gzip/brotli au niveau du CDN (souvent plus performant que l'origine).
4. **Origin Shield** (CloudFront) : un point d'entrée unique pour les origin fetches → réduit la charge sur l'origine.
5. **Préchauffage du cache** : après un déploiement, générer du trafic vers les URLs critiques pour peupler le cache.
6. **Lambda@Edge / CloudFront Functions** : personnaliser la réponse au niveau de l'edge (redirection, réécriture d'URL).

## Pièges courants

1. **Pas de Cache-Control** : sans headers, le CDN sert tout avec des TTL par défaut inappropriés.
2. **Cache-Control: no-store partout** : nier tout bénéfice du CDN.
3. **Assets non versionnés** : après un déploiement, des clients voient l'ancienne version (cache périmé).
4. **Coût d'invalidation** : sur CloudFront, chaque chemin invalidé coûte ~$0.005. 1000 chemins = $5.
5. **Contenu dynamique en cache** : ne pas mettre en cache les pages personnalisées (panier, profil) → fuite de données entre utilisateurs.
6. **SSL pas activé** : HTTP sans TLS → contenu vulnérable au MITM. Activer HTTPS sur le CDN.

Source : [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)`},
        {
          id: 'cloud-10',
          question: 'Quels sont les principes du cloud-native ?',
          answer: '**Cloud-native** = conçu *pour* le cloud, pas juste *déployé sur* le cloud. Principes : **microservices** (services indépendants et déployables séparément), **conteneurisation** (reproductibilité), **orchestration dynamique** (`Kubernetes`), **DevOps/CI-CD** (livraison continue), **observabilité** (métriques, logs, traces), **résilience** (circuit breakers, retries, graceful degradation).\n\nL\'antithèse : *lift and shift* (migrer une app on-premise telle quelle vers le cloud) sans adapter l\'architecture.\n\n__Cloud-native = exploiter les capacités du cloud (élasticité, services managés) plutôt que de reproduire l\'on-premise.__',
        
          deepDive: `# Principes du Cloud-Native

## Qu'est-ce que c'est ?

**Cloud-native** est une approche de conception et d'exécution qui exploite pleinement les capacités du cloud (élasticité, services managés, API). Une application cloud-native est **conçue pour le cloud** — pas simplement déployée sur le cloud (lift-and-shift).

Le Cloud Native Computing Foundation (CNCF) définit le cloud-native comme l'utilisation de **conteneurs**, **orchestration**, **microservices**, et **DevOps** pour construire des applications résilientes, observables et évolutives.

## Concept détaillé

### Les cinq piliers du cloud-native

**1. Microservices**
L'application est décomposée en services indépendants, chacun responsable d'une capacité métier spécifique. Chaque microservice peut être développé, déployé, et scalé indépendamment.

**2. Conteneurisation**
Chaque microservice est empaqueté avec ses dépendances dans un conteneur (Docker). Garantit la reproductibilité entre environnements (dev, staging, prod).

**3. Orchestration dynamique**
Un orchestrateur (Kubernetes, ECS) gère le cycle de vie des conteneurs : placement, scaling, santé, mises à jour. Il optimise l'utilisation des ressources et maintient l'état désiré.

**4. DevOps et CI/CD**
Automatisation de tous les processus entre le commit et la production : tests, build, déploiement, monitoring. L'équipe est autonome (you build it, you run it).

**5. Observabilité**
Logs structurés, métriques, et traces distribuées (OpenTelemetry). Le système est compréhensible sans intervention humaine — on peut diagnostiquer les problèmes à distance.

### Cloud-ready vs Cloud-native

| Critère | Cloud-ready (Lift-and-shift) | Cloud-native |
|---------|------------------------------|-------------|
| Architecture | Monolithique | Microservices |
| Déploiement | VM (EC2) | Conteneurs (Kubernetes) |
| Scaling | Manuel ou auto-scaling de VM | Automatique (HPA) |
| Résilience | Reboot de VM | Circuit breaker, retry, chaos |
| Mise à jour | Fenêtre de maintenance | Rolling update, blue-green |
| État | Local (sessions) | Externalisé (Redis, BDD) |
| Coût | Pay-per-instance | Pay-per-use (serverless/container) |
| Équipe | Ops séparée | DevOps intégrée |

## Patterns cloud-native

**Résilience :**
- **Circuit Breaker** : éviter les appels à un service défaillant (Netflix Hystrix, Resilience4j).
- **Retry avec backoff** : réessayer avec délai exponentiel en cas d'échec temporaire.
- **Bulkhead** : isoler les ressources par service (un service qui tombe ne fait pas tomber les autres).
- **Graceful degradation** : désactiver des fonctionnalités non essentielles sous charge.

**Déploiement :**
- **Blue-Green** : deux environnements identiques, bascule instantanée.
- **Canary** : déployer progressivement (5%, 25%, 100%) en surveillant les erreurs.
- **Rolling update** : mise à jour progressive des pods avec health check.

## Architecture cloud-native type

\`\`\`
                    ┌────────────────────────────────────┐
                    │        API Gateway (Kong, APIGW)    │
                    │  Auth, Rate limiting, Routing       │
                    └────────────────┬───────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │            │              │              │            │
    ┌────▼────┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
    │ Service │  │ Service │  │ Service │  │ Service │  │ Service │
    │ Users   │  │ Orders  │  │Payment  │  │ Stock   │  │ Notif.  │
    │ ┌──────┐│  │ ┌──────┐│  │ ┌──────┐│  │ ┌──────┐│  │ ┌──────┐│
    │ │  K8s ││  │ │  K8s ││  │ │  K8s ││  │ │  K8s ││  │ │  K8s ││
    │ │ pod  ││  │ │ pod  ││  │ │ pod  ││  │ │ pod  ││  │ │ pod  ││
    │ └──────┘│  │ └──────┘│  │ └──────┘│  │ └──────┘│  │ └──────┘│
    └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
         │            │            │            │            │
    ┌────▼────────────▼────────────▼────────────▼────────────▼────┐
    │              Infrastructure / Data Layer                      │
    │  ┌────────┐  ┌────────┐  ┌──────────┐  ┌────────────────┐   │
    │  │RDS/Aur │  │DynamoDB│  │ElastiCache│  │Kafka/RabbitMQ  │   │
    │  └────────┘  └────────┘  └──────────┘  └────────────────┘   │
    └──────────────────────────────────────────────────────────────┘

    Observabilité :
    ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
    │Logs     │  │Metrics  │  │Traces   │  │Alerts   │
    │(Elastic)│  │(Prom)   │  │(Jaeger) │  │(PagerD.)│
    └─────────┘  └─────────┘  └─────────┘  └─────────┘
\`\`\`

## Bonnes pratiques

1. **12-Factor App** : suivre les principes (code base unique, dépendances explicites, configuration externalisée).
2. **Health endpoints** : \`/health\` (vivant) et \`/ready\` (prêt à recevoir du trafic) pour l'orchestrateur.
3. **Graceful shutdown** : intercepter SIGTERM et terminer les requêtes en cours avant de s'arrêter.
4. **Externaliser la configuration** : variables d'environnement, ConfigMaps, ou service de configuration (Consul, Vault).
5. **Metrics et dashboards** : RED method (Rate, Errors, Duration) pour les services, USE method (Utilization, Saturation, Errors) pour les ressources.
6. **Chaos Engineering** : tester la résilience en injectant des pannes (Chaos Monkey, Litmus).

## Pièges courants

1. **Container antipatterns** : stocker l'état dans le conteneur, logs sur le disque local, pas de health check.
2. **Microservices distribués sans observabilité** : impossible de comprendre une panne qui traverse 10 services.
3. **Héritage du monolithe** : une application monolithique mise dans un conteneur n'est pas cloud-native.
4. **Sur-ingénierie** : Kubernetes pour 2 services, 15 microservices pour une app CRUD simple.
5. **Ignorer le réseau** : sans service mesh (Istio, Linkerd), la communication entre services devient complexe (mTLS, retry, tracing).

Source : [CNCF — Cloud Native Definition](https://github.com/cncf/toc/blob/main/DEFINITION.md)`},
        {
          id: 'cloud-11',
          question: 'Qu\'est-ce qu\'AWS IAM et pourquoi est-il crucial ?',
          answer: '**IAM** (*Identity and Access Management*) gère l\'authentification et l\'autorisation sur AWS. Concepts : **Users** (personnes), **Groups** (ensembles de users), **Roles** (permissions assumables temporairement par des services), **Policies** (documents JSON définissant les droits).\n\nPrincipes : **moindre privilège** (ne donner que les permissions nécessaires), **pas de clés d\'accès sur les instances** (utiliser des rôles IAM à la place), **MFA** sur les comptes root, **rotation des credentials**.\n\n__Une mauvaise config IAM = la faille de sécurité la plus courante et la plus grave sur AWS.__ Des buckets S3 publics ou des clés leakées peuvent exposer toute l\'infrastructure.',
          code: '{\n  "Effect": "Allow",\n  "Action": [\n    "s3:GetObject",\n    "s3:PutObject"\n  ],\n  "Resource": "arn:aws:s3:::my-bucket/*"\n}',
          language: 'json',
        
          deepDive: `# AWS IAM — Gestion des Identités et Accès

## Qu'est-ce que c'est ?

**AWS Identity and Access Management (IAM)** est le service central qui contrôle **qui** (authentification) peut faire **quoi** (autorisation) sur **quelles ressources** AWS. IAM est le fondement de la sécurité sur AWS : une configuration IAM incorrecte est la cause #1 des failles de sécurité sur le cloud.

Le principe fondamental est le **moindre privilège** : chaque identité (utilisateur, rôle, service) ne reçoit que les permissions strictement nécessaires à sa fonction, rien de plus.

## Concept détaillé

### Composants IAM

**Users** : représentent une personne ou une application. Chaque user a des credentials (mot de passe console, clés d'accès API).

**Groups** : ensembles d'utilisateurs. Les permissions sont attachées au groupe, pas à l'utilisateur directement. Facilite la gestion : ajouter/retirer un utilisateur d'un groupe = changer ses permissions.

**Roles** : une identité temporaire assumable par une entité (utilisateur, service AWS, compte externe). Contrairement à un user, un rôle n'a pas de credentials permanents — il génère des credentials temporaires via STS (Security Token Service).

**Policies** : documents JSON qui définissent les permissions. Trois types :
- **AWS managed** : policies pré-définies par AWS (ReadOnlyAccess, AdministratorAccess).
- **Customer managed** : policies personnalisées créées par l'administrateur.
- **Inline** : policies attachées directement à une identité (non réutilisables).

### Structure d'une policy

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::mon-bucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "10.0.0.0/8"
        }
      }
    }
  ]
}
\`\`\`

- **Effect** : Allow ou Deny (Deny toujours prioritaire).
- **Action** : les opérations autorisées/interdites (\`s3:*\`, \`ec2:Describe*\`, \`iam:CreateUser\`).
- **Resource** : les ressources concernées (ARN).
- **Condition** : contexte (IP, heure, MFA, tag, SSL).

## Schéma / Architecture

\`\`\`
                    ┌─────────────────────────────┐
                    │          Compte AWS           │
                    │                               │
                    │  ┌─────────────────────────┐  │
                    │  │     Root User            │  │ ← Ne jamais utiliser !
                    │  │   (déverrouillage, facture) │
                    │  └─────────────────────────┘  │
                    │                               │
                    │  ┌─────────────────────────┐  │
                    │  │  IAM Users               │  │ ← Personnes
                    │  │  ┌────┐ ┌────┐ ┌────┐   │  │
                    │  │  │ A  │ │ B  │ │ C  │   │  │
                    │  │  └────┘ └────┘ └────┘   │  │
                    │  └──────┬──────────────────┘  │
                    │         │ appartient à         │
                    │  ┌──────▼──────────────────┐  │
                    │  │  IAM Groups               │  │
                    │  │  ┌──────────┐┌────────┐  │  │
                    │  │  │Admins    ││Devs    │  │  │
                    │  │  └──────────┘└────────┘  │  │
                    │  └──────────────────────────┘  │
                    │                               │
                    │  ┌──────────────────────────┐  │
                    │  │  IAM Roles                │  │ ← Services/Apps
                    │  │  ┌────────┐ ┌─────────┐  │  │
                    │  │  │Lambda  │ │EC2      │  │  │
                    │  │  │ExecRole│ │Instance  │  │  │
                    │  │  └────────┘ └─────────┘  │  │
                    │  └──────────────────────────┘  │
                    └─────────────────────────────────┘
\`\`\`

## Bonnes pratiques (AWS Well-Architected)

1. **Root account : MFA + jamais utilisé** : configurer MFA sur le compte root, le verrouiller, ne jamais s'en servir.
2. **Principe du moindre privilège** : commencer par \`Deny\` tout, n'ouvrir que ce qui est nécessaire.
3. **Utiliser les rôles plutôt que les clés d'accès** : les instances EC2 utilisent un Instance Profile (rôle), pas des clés codées en dur.
4. **Rotation des clés** : faire tourner les clés d'accès tous les 90 jours (automatisé avec Secrets Manager).
5. **MFA pour tous les utilisateurs** : exiger MFA, surtout pour les actions sensibles (suppression de ressources).
6. **Audit avec CloudTrail** : activer CloudTrail (toutes les régions) pour tracer chaque action API.
7. **Policies basées sur les tags** : contrôler les permissions par environnement (\`env=prod\`, \`env=dev\`).
8. **IAM Access Analyzer** : identifier les accès externes non intentionnels (bucket public, rôle cross-compte).

## Pièges courants

1. **Clés AWS codées en dur** : dans le code source, dans les variables d'environnement, dans les fichiers de config → fuite via GitHub.
2. **Politique « Allow */* »** : donner \`"Action": "*"\` + \`"Resource": "*"\` à un utilisateur de dev → risque d'explosion de la facture ou de suppression de production.
3. **Pas de rotation des clés** : une clé volée reste valide indéfiniment → un ancien employé peut toujours accéder aux ressources.
4. **Bucket S3 public** : ne pas configurer \`Block Public Access\` → des milliers de fuites de données.
5. **Confusion entre user et rôle** : créer un utilisateur IAM avec des clés long terme pour une application qui tourne sur EC2 → risque. Utiliser un rôle avec STS à la place.
6. **Pas de least privilege dans les rôles Lambda** : un rôle Lambda qui peut tout faire sur S3 → si la fonction est compromise, l'attaquant a accès à tout S3.

Source : [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)`},
        {
          id: 'cloud-12',
          question: 'Que connaître d\'Azure pour un entretien ?',
          answer: '**Azure** est le cloud de Microsoft, 2e marché mondial derrière AWS. Services clés : **`Azure VMs`** (compute), **`Azure App Service`** (PaaS web), **`Azure Functions`** (serverless), **`Azure SQL Database`** (SQL managé), **`Azure Blob Storage`** (stockage objet), **`Azure Active Directory`** (identité/SSO).\n\nAvantages : intégration native avec l\'écosystème Microsoft (`Active Directory`, `Office 365`, `.NET`), très présent en entreprise. **`Azure DevOps`** (Boards, Repos, Pipelines) est très utilisé pour CI/CD.\n\n__AWS domine en start-up et pure-tech, Azure domine en entreprise traditionnelle.__ Les concepts cloud (régions, IaC, scaling) sont identiques — la différence est dans les noms de services.',
        
          deepDive: `# Azure — Concepts Fondamentaux pour Entretiens

## Qu'est-ce que c'est ?

**Microsoft Azure** est la plateforme de cloud computing de Microsoft, deuxième acteur mondial du cloud (~25% de parts de marché) derrière AWS (~32%). Azure est particulièrement présent dans les **grandes entreprises** et les **organisations gouvernementales**, grâce à son intégration native avec l'écosystème Microsoft (Active Directory, Office 365, SQL Server, .NET).

Les concepts fondamentaux sont les mêmes que sur AWS (régions, zones de disponibilité, IaaS/PaaS/SaaS, IaC). La différence est dans les **noms des services** et certains **services spécifiques** à l'écosystème Microsoft.

## Concept détaillé

### Services Azure clés (équivalents AWS)

| Azure | AWS | Description |
|-------|-----|-------------|
| **Azure VMs** | EC2 | Machines virtuelles (Windows, Linux) |
| **Azure App Service** | Elastic Beanstalk | PaaS web (auto-scaling, CI/CD) |
| **Azure Functions** | Lambda | Serverless (FaaS) |
| **Azure Blob Storage** | S3 | Stockage d'objets (blobs, blocks, append) |
| **Azure SQL Database** | RDS | SQL Server managé (PaaS) |
| **Cosmos DB** | DynamoDB | NoSQL multi-modèle (global distribution) |
| **Azure Kubernetes Service (AKS)** | EKS | Kubernetes managé |
| **Azure DevOps** | CodeBuild + CodePipeline | CI/CD, Boards, Repos, Artifacts |
| **Azure Active Directory** | IAM | Identité et accès (SSO, MFA, Conditional Access) |
| **Virtual Network (VNet)** | VPC | Réseau privé virtuel |
| **Azure Load Balancer** | ALB/NLB | Load balancing L4/L7 |
| **Azure CDN** | CloudFront | Content Delivery Network |
| **Azure Monitor** | CloudWatch | Monitoring, logs, alerts |

### Spécificités d'Azure

**Hybridité** : Azure est conçu pour le **cloud hybride** — connecter les data centers on-premise au cloud via Azure Arc, Azure Stack, ou ExpressRoute (connexion réseau dédiée).

**Active Directory** : Azure AD (maintenant Entra ID) est le service d'identité central. Il gère l'authentification unique (SSO), l'authentification multi-facteurs (MFA), le Conditional Access (exiger MFA si l'utilisateur est hors réseau corporate).

**Portail de gestion** : portail web complet pour gérer toutes les ressources. Beaucoup d'entreprises Microsoft l'utilisent exclusivement (pas de IaC).

### Azure DevOps

Plateforme complète pour le cycle de vie du développement :
- **Azure Boards** : gestion de projet (Kanban, Scrum).
- **Azure Repos** : dépôts Git (comme GitHub).
- **Azure Pipelines** : CI/CD (build, test, déployer sur Azure ou n'importe où).
- **Azure Test Plans** : tests manuels et exploratoires.
- **Azure Artifacts** : gestion des packages (NuGet, npm, Maven).

## Comparaison Azure vs AWS

| Critère | Azure | AWS |
|---------|-------|-----|
| Marché cible | Grandes entreprises | Startups + Entreprises |
| Intégration Microsoft | Maximale (Office 365, AD, SQL Server) | Aucune |
| Services PaaS | Très matures (App Service, SQL Database) | Matures (Beanstalk, RDS) |
| Serverless | Azure Functions, Logic Apps | Lambda, Step Functions |
| Kubernetes | AKS (Premium, défense en profondeur) | EKS (Fargate optionnel) |
| Hybrid Cloud | Leader (Azure Arc, Stack, ExpressRoute) | AWS Outposts |
| Pricing | Pay-as-you-go + Reserved Instances | Pay-as-you-go + Reserved + Spot |
| Régions | 60+ | 30+ |
| Portail | Web (très complet) | Web + CLI |

## Avantages et inconvénients

**Avantages :**
- Intégration native avec l'écosystème Microsoft (Visual Studio, Office, Teams, SharePoint).
- Présence massive dans les grandes entreprises et le secteur public.
- Services PaaS très matures (App Service, SQL Managed Instance).
- Hybrid Cloud leader (Azure Arc, Azure Stack).
- Outils de migration (Azure Migrate) très complets.

**Inconvénients :**
- Services parfois moins performants que les équivalents AWS (ex : Functions moins rapidès que Lambda).
- Portail très riche mais parfois lent et complexe (des centaines de panneaux).
- Documentation moins claire que AWS (mais s'améliore).
- Verrouillage Microsoft (si on utilise .NET + SQL Server + AD, difficile de partir).

## Cas d'usage typiques

1. **Entreprise .NET** : migration de données center vers Azure App Service + Azure SQL Database + Azure AD.
2. **Application multi-cloud** : AWS pour le compute + Azure AD pour l'identité + Azure DevOps pour CI/CD.
3. **Analyse de données** : Azure Synapse Analytics (Big Data), Azure Data Lake, Power BI intégré.
4. **Hybrid cloud** : extension du datacenter on-premise via Azure Arc + ExpressRoute.

## Bonnes pratiques

1. **Azure Policy** : définir des règles de conformité (exiger le chiffrement, taguer les ressources, bloquer certaines régions).
2. **Management Groups** : organiser les abonnements par service/département, appliquer des politiques à tous les niveaux.
3. **Azure Blueprints** : packs réutilisables de ressources + politiques (pour créer un environnement conforme).
4. **Cost Management** : budgets, alertes de dépassement, recommandations d'optimisation.
5. **Ressource Groups** : organiser les ressources par cycle de vie (un groupe = ce qui est déployé ensemble, supprimé ensemble).
6. **RBAC (Role-Based Access Control)** : attribuer des rôles (Owner, Contributor, Reader) au niveau des Resource Groups.
7. **Tagging** : tagger systématiquement (environnement, propriétaire, coût).

## Pièges courants

1. **Souscrire au mauvais abonnement** : un abonnement Azure Dev/Test n'a pas le même SLA qu'un abonnement standard.
2. **Pas de Azure Policy** : sans règles, les développeurs peuvent créer des ressources onéreuses sans autorisation.
3. **Confondre Azure AD et Active Directory on-premise** : Azure AD n'est pas un DC Windows — il ne gère pas les GPO, les imprimantes, etc.
4. **Oublier Azure Backup** : une suppression accidentelle d'un Resource Group supprime toutes les ressources — sans backup, c'est définitif.
5. **Portail Azure comme seul outil de gestion** : impossible à reproduire entre environnements. Utiliser Terraform ou ARM templates.
6. **Penser qu'Azure = Microsoft seulement** : Azure supporte parfaitement Linux (40%+ des VMs Azure sont Linux).

Source : [Azure Documentation](https://docs.microsoft.com/azure/)`},
      ],
    },
  ],
};