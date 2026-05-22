import type { InterviewCategory } from '../../../../core/models/interview.models';

export const devopsCategory: InterviewCategory = {
  id: 'devops',
  title: 'DevOps',
  color: 'background: var(--color-text-muted); color: white',
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
        
          deepDive: `# Docker

## Qu'est-ce que c'est ?

Docker est une plateforme de conteneurisation qui permet d'emballer une application et ses dépendances dans un conteneur isolé. Les conteneurs sont légers, rapides à démarrer et cohérents entre les environnements.

## Concepts cles

### Image
Template en lecture seule pour créer des conteneurs. Ex: node:18, nginx:latest

### Conteneur
Instance en cours d'exécution d'une image.

### Dockerfile
Fichier texte définissant comment construire une image.

### Registry
Dépôt d'images (Docker Hub, GCR, ECR).

## Dockerfile exemple

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

## Commandes esenciales

docker build -t myapp:latest .
docker run -d -p 3000:3000 myapp:latest
docker ps
docker logs <container_id>
docker exec -it <container_id> sh
docker-compose up -d

## Volumes

Partage de données entre host et conteneur:

docker run -v /host/path:/container/path myapp

Volumes nommés pour la persistance:
docker run -v mydata:/container/path myapp

## Bonnes pratiques

1. Utiliser des images officielles minimales (alpine)
2. Ne pas exécuter en root (USER directive)
3. Multi-stage builds pour réduire la taille
4. Ajouter .dockerignore pour exclure des fichiers
5. Ne pas stocker de secrets dans les images

## Pièges courants

1. Conteneurs qui s'arrêtent immédiatement (pas de processus foreground)
2. Permissions de fichiers
3. Variables d'environnement non définies
4. Ports non exposés

Source : [Docker Docs](https://docs.docker.com/get-started/)`},
        {
          id: 'dv-2',
          question: 'Docker vs VM',
          answer: "**VM** : émule un système complet (OS, noyau, libs) — lourde (Go), démarrage en minutes, isolation totale. **Conteneur Docker** : partage le noyau hôte, isole via namespaces/cgroups — léger (Mo), démarrage en secondes.\n\nLes conteneurs sont **plus rapides** et **plus efficaces** en ressources. Les VM restent nécessaires pour isoler des OS différents ou des noyaux différents.\n\nEn pratique : conteneurs pour les applications, VMs pour l'infrastructure de base. __Les deux coexistent — les conteneurs tournent souvent dans des VMs.__",
        
          deepDive: `# Docker vs VM

## Qu'est-ce que c'est ?

Comparaison entre la conteneurisation (Docker) et les machines virtuelles (VM) pour déployer des applications.

## Architecture VM

 Chaque VM inclut:
- OS complet (kernel, systeme)
- Applications
- Bibliothèques

[VM1: OS + Apps] [VM2: OS + Apps] [VM3: OS + Apps]
            |
      [Hyperviseur]
            |
      [Hardware physique]

## Architecture Conteneur

 Les conteneurs partagent le kernel de l'hôte:

[Conteneur1] [Conteneur2] [Conteneur3]
            |
      [Docker Engine]
            |
      [OS Hôte + Kernel]
            |
      [Hardware physique]

## Comparaison

| Aspect | Docker | VM |
|--------|---------|-----|
| Taille | 10-100 MB | 1-10 GB |
| Démarrage | Secondes | Minutes |
| Isolation | Processus | Complete |
| Performance | Bare metal | Overhead |
| Portabilité | Tres haute | Haute |
| Sécurité | Moins isolée | Plus isolée |

## Avantages Docker

1. **Léger** : Partage du OS, démarrage rapide
2. **Efficace** : Densité plus élevée sur le même hardware
3. **Cohérent** : Same environment everywhere
4. **CI/CD** : Integration continue simplifiée

## Avantages VM

1. **Sécurité** : Isolation complète, hyperviseur
2. **Flexibilité** : Different OS sur même hardware
3. **Maturité** : Plus ancienne, plus d'outils
4. **Compliance** : Convient mieux aux audits

## Cas d'usage

- **Docker** : Microservices, CI/CD, applications cloud-native
- **VM** : Applicationslegacy, differents OS requis, haute sécurité

## Combinaison possible

 utiliser des VMs comme hôte Docker pour combiner les avantages:
[VM: Docker Host] -> [Conteneur1] [Conteneur2]

Source : [Docker vs VMs](https://www.docker.com/blog/docker-vs-virtual-machines/)`},
        {
          id: 'dv-3',
          question: 'Docker Compose',
          answer: "Outil orchestrant **multi-conteneurs** sur une seule machine. Un fichier `docker-compose.yml` définit les services (app, BDD, cachée), leurs dépendances et leur configuration réseau.\n\nUne seule commande `docker compose up` démarre toute la stack. Idéal pour le **développement local** : chaque dev a le même environnement sans installer PostgreSQL, Redis, etc.\n\nNe remplace pas Kubernetes (pas de scaling, pas de haute dispo) — c'est un outil **développement/test**, pas production.",
          code: 'services:\n  app:\n    build: .\n    ports: ["8080:8080"]\n    depends_on: [db]\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret',
          language: 'yaml',
        
          deepDive: `# Docker Compose

## Qu'est-ce que c'est ?

Docker Compose est un outil pour définir et exécuter des applications multi-conteneurs. Il utilise un fichier YAML pour configurer les services, réseaux et volumes.

## Fichier docker-compose.yml

version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:14-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge

## Commandes principales

docker-compose up -d
docker-compose down
docker-compose ps
docker-compose logs -f web
docker-compose exec db psql -U user myapp
docker-compose build
docker-compose scale web=3

## Variables d'environnement

# .env file
POSTGRES_DB=myapp
POSTGRES_USER=user
POSTGRES_PASSWORD=secret

# docker-compose.yml reference
services:
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}

## Dépendances et santé

services:
  web:
    depends_on:
      db:
        condition: service_healthy
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

## Networks

Par défaut, les services comunicaquent sur le même réseau.
Pour isoler: créer des réseaux séparés.

## Bonnes pratiques

1. Utiliser des versions explicites (3.8)
2. Ne pas stocker de secrets en dur (utiliser .env)
3. Définir healthchecks pour les dépendances
4. Utiliser des images officielles tagguées
5. Helper scripts pour les tâches init

Source : [Docker Compose Docs](https://docs.docker.com/compose/)`},
        {
          id: 'dv-4',
          question: 'Kubernetes',
          answer: "**Orchestrateur de conteneurs** pour gérer des dizaines/centaines de conteneurs : déploiement sur cluster, **scaling automatique** (`HPA`), load balancing, résilience (health checks, redémarrages auto), rolling updates et rollbacks, gestion des secrets et config.\n\nArchitecture **déclarative** (`YAML` décrivant l'état souhaité). Courbe d'apprentissage raide (`Pods`, `Deployments`, `Services`, `Ingress`, `ConfigMaps`…).\n\nBeaucoup d'équipes utilisent des solutions managées (`EKS`, `GKE`) pour éviter de gérer le control plane.",
        
          deepDive: `# Kubernetes

## Qu'est-ce que c'est ?

Kubernetes (K8s) est un orchestrateur de conteneurs open source. Il automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.

## Concepts fondamentaux

### Pod
Plus petite unité déployable. Un ou plusieurs conteneurs partageant le même réseau et stockage.

### Node
Machine (physique ou virtuelle) qui exécute les Pods.

### Cluster
Ensemble de Nodes gérés par le control plane.

### ReplicaSet
Garantit le nombre de Pods en cours d'exécution.

### Deployment
Gestion des déploiements et mises à jour des Pods.

## Architecture

Control Plane (Master)
- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager

Nodes
- kubelet
- kube-proxy
- container runtime (containerd)

## Fichier Deployment

apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

## Services

apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer

## Commandes kubectl

kubectl apply -f deployment.yaml
kubectl get pods
kubectl describe pod webapp-xxx
kubectl logs webapp-xxx
kubectl exec -it webapp-xxx -- sh
kubectl scale deployment webapp --replicas=5
kubectl delete pod webapp-xxx
kubectl get services

## Ingress

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webapp-service
            port:
              number: 80

## Bonnes pratiques

1. Toujours définir resources (requests/limits)
2. Utiliser readiness/liveness probes
3. Stocker les secrets dans Kubernetes secrets
4. Prévoir la tolérance aux pannes (anti-affinity)
5. Utiliser Helm pour gérer les charts

Source : [Kubernetes Docs](https://kubernetes.io/docs/)`},
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
        
          deepDive: `# CI/CD

## Qu'est-ce que c'est ?

CI/CD signifie Intégration Continue / Déploiement Continu. C'est une pratique qui automatise l'intégration du code, les tests et le déploiement.

## Integration Continue (CI)

### Définition
Automatiser l'intégration du code des développeurs dans un dépôt partagé avec tests automatiques.

### Etapes
1. Push de code vers la branche feature
2. Build automatique déclenché
3. Tests unitaires exécutés
4. Analyse de code (lint, SAST)
5. Notification de l'équipe

### Benefits
- Détection rapide des bugs
- Meilleure qualité du code
- Moins de conflits d'intégration

## Deploiement Continu (CD)

### Pipeline CD
1. Tests d'intégration
2. Tests de performance
3. Déploiement en staging
4. Tests de smoke
5. Déploiement en production (canary, blue-green, rolling)

### Strategies de déploiement

**Rolling**: Remplacement progressif des instances

**Blue-Green**: Deux environnements identiques, commutation instantanée

**Canary**: Déploiement progressif vers un sous-ensemble d'utilisateurs

## Outils populaires

### GitHub Actions
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm ci
    - run: npm test

### GitLab CI
stages:
  - build
  - test
  - deploy

### Jenkins
Pipeline as Code avec Jenkinsfile

## Bonnes pratiques

1. Commits fréquents et petits
2. Tests automatisés à tous les niveaux
3. Pipeline rapide (< 10 minutes)
4. Rollback automatique sur erreur
5. Environment parity (dev/staging/prod identiques)

## Trunk-Based Development

- Branches courtes (< 2 jours)
- Feature flags pour les fonctionnalités incomplètes
- Intégration continue vers main

Source : [Atlassian CI/CD](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)`},
        {
          id: 'dv-6',
          question: 'Stratégies de déploiement',
          answer: "**Rolling update** (défaut K8s) : remplacement progressif des pods — zero-downtime, mais rollback lent. **Blue-green** : deux environnements identiques, bascule instantanée par switch de trafic — rollback immédiat mais coûteux en ressources.\n\n**Canary** : déploiement sur un petit % du trafic d'abord, augmentation progressive si OK — détection précoce des problèmes. **Feature flags** : activation/désactivation sans redéploiement.\n\n__Le choix dépend du risque toléré et du budget infrastructure.__",
        
          deepDive: `# Deployment Strategies

## Qu'est-ce que c'est

Deployment strategies define how software is released to production environments. The main strategies are:

- **Rolling**: Replace instances gradually
- **Blue-Green**: Run two identical environments, switch traffic
- **Canary**: Route small percentage to new version
- **Recreate**: Shut down old, deploy new (causes downtime)

## Syntaxe et exemples

### Blue-Green Deployment

apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue-green
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

### Canary Deployment (Kubernetes)

apiVersion: v1
kind: Service
metadata:
  name: my-app-canary
spec:
  selector:
    app: my-app
  ports:
  - port: 80

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"

### ArgoCD Rollout

apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app-rollout
spec:
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: {}
      - setWeight: 50
      - pause: {duration: 10m}

## Bonnes pratiques

- Always have rollback plan
- Use feature flags for granular control
- Monitor error rates during rollout
- Automate health checks
- Implement traffic mirroring for testing

## Pièges courants

- Forgetting to test rollback procedure
- Not monitoring during deployment
- Setting too aggressive rolling parameters
- Ignoring database schema migrations
- Not accounting for session persistence

## Sources

https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ | https://argoproj.github.io/argo-cd/ | https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/load_balancing/canary`},
        {
          id: 'dv-7',
          question: 'GitOps',
          answer: "Pratique où **Git est la source de vérité** pour l'infrastructure et les déploiements. Tout changement passe par un **commit + PR** dans un dépôt Git, puis un outil (`ArgoCD`, `Flux`) synchronise automatiquement le cluster avec l'état déclaré.\n\nAvantages : **audit trail** natif (historique Git), **rollbacks** via `git revert`, **revue de code** sur les changements d'infra, **drift detection** (alerte si le cluster dérive).\n\n__GitOps = IaC + CI/CD + revue de code pour l'infrastructure.__",
        
          deepDive: `# GitOps

## Qu'est-ce que c'est

GitOps is a deployment approach where the desired state of infrastructure and applications is stored in a Git repository. Changes are made via pull requests, and automated tools sync the cluster to match the desired state.

Core principles:
- The entire system description is declarative
- The canonical desired state is in Git
- Approved changes auto-apply

Popular tools: ArgoCD, Flux, Jenkins X

## Syntaxe et exemples

### ArgoCD Application

apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/user/repo.git
    targetRevision: HEAD
    path: k8s/overlays/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true

### Flux Kustomization

apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: my-app
  namespace: flux-system
spec:
  sourceRef:
    kind: GitRepository
    name: my-repo
  path: ./deploy
  interval: 10m
  prune: true
  syncWave: 1

### GitOps Workflow

1. Developer creates PR with k8s manifests
2. PR triggers CI pipeline
3. Code reviewed and merged
4. GitOps operator detects change
5. Cluster state reconciled automatically

## Bonnes pratiques

- Use separate repo for cluster configs
- Implement branch protection rules
- Use Kustomize or Helm for environment differences
- Enable drift detection
- Require signed commits

## Pièges courants

- Storing secrets in Git (use Sealed Secrets, Vault)
- Not enabling auto-sync can cause drift
- Large monorepos slow down reconciliation
- Not monitoring sync status
- Overlooking manual cluster changes

## Sources

https://argoproj.github.io/argo-cd/ | https://fluxcd.io/ | https://www.gitops.tech/ | https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/`},
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
        
          deepDive: `# Infrastructure as Code (IaC)

## Qu'est-ce que c'est

IaC is the practice of managing infrastructure using configuration files rather than manual processes. It enables version control, reproducibility, and automation of infrastructure provisioning.

Tools: Terraform (HCL), Pulumi (code), Ansible (procedural), AWS CDK

## Syntaxe et exemples

### Terraform

provider "aws" {
  region = "eu-west-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "production-vpc"
  }
}

resource "aws_ec2_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = file("init.sh")
}

### Pulumi (TypeScript)

import * as aws from "@pulumi/aws";

const vpc = new aws.ec2.Vpc("main", {
  cidrBlock: "10.0.0.0/16",
  enableDnsHostnames: true,
});

### Ansible Playbook

- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    - name: Start nginx
      service:
        name: nginx
        state: started

## Bonnes pratiques

- Use modules for reusable components
- Store state remotely (S3 + DynamoDB for Terraform)
- Enable state locking
- Use workspaces for environments
- Implement policy as code (OPA, Sentinel)
- Always run plan before apply

## Pièges courants

- Committing secrets to state files
- Not using remote state with locking
- State drift from manual changes
- Oversized workspaces
- Not versioning modules

## Sources

https://www.terraform.io/docs | https://www.pulumi.com/docs/ | https://docs.ansible.com/ | https://developer.hashicorp.com/terraform/language/state`},
        {
          id: 'dv-9',
          question: 'Monitoring & Logging',
          answer: "**Monitoring** : métriques en temps réel (CPU, mémoire, latence, throughput) via `Prometheus` + `Grafana` pour la visualisation. Alertes configurées sur les seuils critiques.\n\n**Logging** : centralisation des logs via `ELK Stack` (Elasticsearch, Logstash, Kibana) ou `Loki` + `Grafana`. Corrélation des logs entre services via le **trace ID**.\n\n__En production, sans monitoring et logging, vous êtes aveugle__. Les incidents se détectent et se résolvent 10x plus vite avec les bons outils.",
        
          deepDive: `# Monitoring & Logging

## Qu'est-ce que c'est

Monitoring and logging are essential for observing system health, troubleshooting issues, and optimizing performance. The three pillars of observability: metrics, logs, and traces.

Stack examples:
- Metrics: Prometheus + Grafana
- Logs: ELK Stack (Elasticsearch, Logstash, Kibana), Loki
- Traces: Jaeger, Zipkin

## Syntaxe et exemples

### Prometheus Metrics

# TYPE http_requests_total counter
# HELP http_requests_total Total HTTP requests
http_requests_total{status="200", method="GET"} 1523

# Histogram for request duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 1023
http_request_duration_seconds_bucket{le="0.5"} 1540
http_request_duration_seconds_bucket{le="1.0"} 1598
http_request_duration_seconds_bucket{le="+Inf"} 1600

### Prometheus scrape config

global:
  scrape_interval: 15s
scrape_configs:
  - job_name: "my-app"
    static_configs:
      - targets: ["my-app:9090"]
    metrics_path: /metrics

### Grafana Dashboard JSON

{
  "dashboard": {
    "title": "My App Overview",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      }
    ]
  }
}

### ELK Stack (Logstash pipeline)

input {
  file {
    path => "/var/log/nginx/access.log"
    start_position => "beginning"
  }
}
filter {
  grok {
    match => { "message" => "%{IPORHOST:client} - %{DATA:user} \\[%{HTTPDATE:timestamp}\\] %{QS:request} %{NUMBER:status}" }
  }
}
output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "nginx-%{+YYYY.MM.dd}"
  }
}

## Bonnes pratiques

- Use structured logging (JSON)
- Set up alerting on SLOs, not just symptoms
- Implement cardinality limits on metrics
- Use labels consistently
- Correlate logs with traces
- Create runbooks for alerts

## Pièges courants

- Too many dashboards without focus
- Alert fatigue from noisy alerts
- Not instrumenting early enough
- Ignoring log aggregation costs
- Missing correlation IDs across services

## Sources

https://prometheus.io/docs/introduction/overview/ | https://grafana.com/docs/ | https://www.elastic.co/guide/en/observability/current/logging.html | https://opencensus.io/`},
        {
          id: 'dv-10',
          question: 'Distributed tracing',
          answer: "Dans une chaîne d'appels inter-services, un seul requête utilisateur peut traverser **5-10 services**. Le *distributed tracing* suit le parcours complet via un **correlation ID** (`trace ID`) unique propagé de service en service.\n\nOutils : **Jaeger**, **Zipkin**, **AWS X-Ray**. Visualisation : timeline de chaque span (unité de travail) dans la trace.\n\n__Indispensable pour diagnostiquer les problèmes de latence et les erreurs en architecture distribuée.__ Sans tracing, le debugging est quasi impossible.",
        
          deepDive: `# Distributed Tracing

## Qu'est-ce que c'est

Distributed tracing tracks requests across multiple services, helping identify latency issues and bugs in microservices architectures. Each request gets a unique trace ID that propagates through all services.

Tools: Jaeger, Zipkin, AWS X-Ray, OpenTelemetry

## Syntaxe et exemples

### OpenTelemetry Go Client

package main

import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/jaeger"
    "go.opentelemetry.io/otel/sdk/trace"
)

func initTracer() (*trace.TracerProvider, error) {
    exporter, err := jaeger.New(jaeger.WithAgentEndpoint("jaeger:6831"))
    if err != nil {
        return nil, err
    }

    tp := trace.NewTracerProvider(
        trace.WithBatcher(exporter),
        trace.WithResource(
            resource.NewWithAttributes(
                semconv.ServiceNameKey.String("my-service"),
            ),
        ),
    )

    otel.SetTracerProvider(tp)
    return tp, nil
}

// Example middleware for HTTP
func tracingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx, span := tracer.Start(r.Context(), r.URL.Path)
        defer span.End()

        // Inject trace context to headers for downstream
        r = r.WithContext(ctx)
        next.ServeHTTP(w, r)
    })
}

### Jaeger Trace Example (JSON)

{
  "traceId": "4d52e3c7f2b8a9d4",
  "spans": [
    {
      "operationName": "HTTP GET /api/users",
      "startTime": 1704067200000,
      "duration": 45,
      "tags": [
        {"key": "http.status_code", "value": 200},
        {"key": "service.name", "value": "user-service"}
      ],
      "references": []
    }
  ]
}

### W3C Trace Context Headers

traceparent: 00-4d52e3c7f2b8a9d4-abc123-def456-00
tracestate: Congo=t61rcWkgMzE

## Bonnes pratiques

- Propagate trace context in all service calls (HTTP, gRPC, messaging)
- Use sampling for high-volume services (tail-based sampling for errors)
- Instrument at least: HTTP requests, database queries, external API calls
- Use OpenTelemetry for vendor-neutral instrumentation
- Include business-relevant tags in spans

## Pièges courants

- Not propagating trace context to async workers
- Missing spans for middleware layers
- Over-instrumenting causing noise
- Storing too much data (sample intelligently)
- Ignoring trace correlation with logs

## Sources

https://opentelemetry.io/docs/concepts/observability-primer/ | https://www.jaegertracing.io/docs/1.50/ | https://www.w3.org/TR/trace-context/ | https://zipkin.io/pages/tracingsystem`},
      ],
    },
  ],
};