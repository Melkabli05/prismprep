import type { InterviewCategory } from '../../../../core/models/interview.models';

export const linuxCategory: InterviewCategory = {
  id: 'linux',
  title: 'Linux',
  color: 'background: var(--color-warning); color: white',
  description: 'Commandes, permissions, shell scripting',
  sections: [
    {
      id: 'linux-commandes',
      title: 'Commandes Essentielles',
      questions: [
        {
          id: 'linux-1',
          question: 'Quelles sont les commandes de base Linux indispensables ?',
          answer: '**Navigation** : `ls` (lister), `cd` (changer de répertoire), `pwd` (répertoire courant), `tree` (arborescence). **Fichiers** : `cp` (copier), `mv` (déplacer/renommer), `rm` (supprimer), `mkdir` (créer répertoire), `touch` (créer fichier vide).\n\n**Consultation** : `cat` (afficher), `less` (pager), `head`/`tail` (début/fin), `wc` (compter lignes/mots). **Recherche** : `find` (par nom/type), `grep` (par contenu), `which`/`whereis` (localiser une commande).\n\n__Ces commandes sont le minimum vital — on les utilise quotidiennement en dev et en ops.__',
          code: '# Navigation\nls -la          # liste détaillée avec fichiers cachéés\ncd /var/log     # aller dans /var/log\npwd             # afficher le chemin courant\n\n# Recherche\nfind / -name "*.conf" 2>/dev/null\ngrep -r "ERROR" /var/log/ --include="*.log"',
          language: 'bash',
        
          deepDive: `# Commandes Linux Essentielles

## Qu'est-ce que c'est ?

Les commandes Linux sont les outils de base de tout développeur et administrateur système. Elles permettent d'interagir avec le noyau Linux via le shell (bash, zsh) pour manipuler des fichiers, gérer des processus, configurer le réseau et automatiser des tâches. La philosophie Unix repose sur des commandes simples et composables via des pipes.

## Syntaxe et exemples

### Navigation

\`\`\`bash
ls -la /home/user        # Liste détaillée avec fichiers cachés
cd /var/log              # Changement de répertoire
pwd                      # Affiche le chemin absolu courant
tree -d /etc             # Arborescence des répertoires seulement
\`\`\`

### Manipulation de fichiers

\`\`\`bash
cp -r /src /dst          # Copie récursive
mv fichier.txt /tmp/     # Déplacement
rm -rf /tmp/build        # Suppression récursive forcée
mkdir -p a/b/c/d         # Création d'arborescence complète
touch main.ts            # Crée un fichier vide ou met à jour la date
ln -s /usr/bin/python3 python  # Lien symbolique
\`\`\`

### Consultation de fichiers

\`\`\`bash
cat /etc/hosts           # Affiche tout le fichier
less /var/log/syslog     # Pagination (q pour quitter)
head -n 5 fichier.csv    # 5 premières lignes
tail -f access.log       # Suivi en temps réel
wc -l script.sh          # Compte les lignes
\`\`\`

### Recherche

\`\`\`bash
find /var -name "*.log" -type f -size +10M  # Fichiers > 10 Mo
grep -rn "FATAL" --include="*.java" ./src    # Recherche récursive
which node                # Localise l'exécutable
type -a ls                # Toutes les occurrences d'une commande
\`\`\`

## Fonctionnement interne

Chaque commande est un processus. Le shell utilise le PATH (\`echo $PATH\`) pour localiser l'exécutable. Quand vous tapez \`ls\`, le shell cherche dans \`/usr/bin/ls\`, \`/bin/ls\`, etc. Les commandes peuvent être des binaires compilés, des scripts shell, ou des alias définis dans \`~/.bashrc\`.

## Comparaison : commandes anciennes vs modernes

| Ancienne | Moderne | Différence |
|----------|---------|------------|
| ifconfig | ip addr | ip gère les namespaces réseau |
| netstat  | ss      | ss est 10x plus rapide |
| route    | ip route | Syntaxe unifiée |
| iptables | nftables | nft améliore les performances |

## Performance et complexité

- \`ls\` : O(n) où n = nombre d'entrées
- \`find\` : O(n) où n = nombre de fichiers parcourus
- \`grep\` : O(m * n) où m = motifs, n = taille des fichiers

## Bonnes pratiques

1. Utilisez la complétion par Tab pour éviter les fautes de frappe
2. Consultez toujours \`man\` ou \`--help\` avant une commande inconnue
3. Créez des alias dans \`~/.bashrc\` pour vos commandes fréquentes
4. Utilisez \`rm -i\` pour confirmer avant suppression
5. Vérifiez toujours le répertoire courant avant \`rm -rf\`
6. Préférez \`ls -la\` à \`ls\` pour voir les permissions et fichiers cachés
7. Utilisez \`set -o vi\` ou \`set -o emacs\` pour la navigation dans le shell

## Pièges courants

1. \`rm -rf / \` avec un espace après le slash supprime le système
2. Oublier de quoter les chemins avec espaces : \`rm "mon fichier.txt"\`
3. Confondre \`>\` (écrase) et \`>>\` (ajoute)
4. Utiliser des chemins relatifs dans des scripts exécutés depuis un autre répertoire
5. Ne pas vérifier l'existence d'un fichier avant de le supprimer
6. Confondre \`-r\` (récursif) et \`-f\` (force) dans les options

Source : [GNU Coreutils Manual](https://www.gnu.org/software/coreutils/manual/)`},
        {
          id: 'linux-2',
          question: 'Comment fonctionnent les permissions de fichiers sous Linux ?',
          answer: 'Chaque fichier a 3 types de droits : **`r`** (lecture), **`w`** (écriture), **`x`** (exécution), appliqués à 3 catégories : **propriétaire** (owner), **groupe** (group), **autres** (others). Affichés via `ls -l` : `-rwxr-xr--`.\n\n**`chmod`** modifie les droits : symbolique (`chmod u+x script.sh`) ou octal (`chmod 755 script.sh` = rwxr-xr-x). **`chown`** change le propriétaire : `chown user:group fichier`.\n\n__755 pour les exécutables/scripts, 644 pour les fichiers classiques, 600 pour les fichiers sensibles (clés SSH).__',
          code: '# Permissions octales\nchmod 755 script.sh   # rwxr-xr-x\nchmod 644 config.yml  # rw-r--r--\nchmod 600 id_rsa      # rw-------\n\n# Changement de propriétaire\nchown www-data:www-data /var/www/html\n\n# Notation symbolique\nchmod u+x,g-w,o-r file',
          language: 'bash',
        
          deepDive: `# Permissions de fichiers sous Linux

## Qu'est-ce que c'est ?

Linux gère les accès aux fichiers vià un modèle de permissions à trois niveaux : propriétaire (owner), groupe (group) et autrès (others). Chaque fichier et répertoire possède trois types de droits : lecture (r), écriture (w) et exécution (x). Ce système permet un contrôle d'accès discrétionnaire (DAC) où le propriétaire définit qui peut lire, écrire ou exécuter.

## Syntaxe et exemples

### Structure des permissions

\`\`\`bash
-rwxr-xr--  1 user group  4096 mai 22 10:00 script.sh
\`\`\`

Le premier caractère indique le type : \`-\` (fichier), \`d\` (répertoire), \`l\` (lien symbolique).

Les 9 caractères suivants sont trois groupes de trois : \`rwx\` (propriétaire), \`r-x\` (groupe), \`r--\` (autres).

### Mode octal

\`\`\`bash
chmod 755 script.sh       # rwxr-xr-x (propriétaire: tout, groupe/autres: R+E)
chmod 644 config.yml      # rw-r--r-- (fichier classique)
chmod 600 id_rsa          # rw------- (clé SSH privée)
chmod 777 public/          # rwxrwxrwx (ATTENTION : tout le monde écrit)
\`\`\`

### Mode symbolique

\`\`\`bash
chmod u+x script.sh       # Ajoute exécution pour le propriétaire
chmod g-w fichier         # Retire écriture pour le groupe
chmod o+r fichier         # Ajoute lecture pour les autres
chmod a+x script.sh       # Ajoute exécution pour tous (ugo)
\`\`\`

### Changement de propriétaire

\`\`\`bash
chown user:group fichier  # Change propriétaire et groupe
chown user: fichier       # Change propriétaire seulement
chgrp group fichier       # Change groupe seulement
chown -R user:group /var/www  # Récursif
\`\`\`

### Permissions spéciales

\`\`\`bash
chmod 4755 executable     # SUID (4) : exécute avec les droits du propriétaire
chmod 2755 repertoire     # SGID (2) : les nouveaux fichiers héritent du groupe
chmod 1777 /tmp           # Sticky bit (1) : seul le propriétaire peut supprimer
\`\`\`

## Fonctionnement interne

Quand un processus accède à un fichier, le noyau compare l'UID du processus avec l'UID du fichier :
1. Si UID identique → permissions propriétaire
2. Si GID du processus dans le groupe du fichier → permissions groupe
3. Sinon → permissions autres

Les ACL (Access Control Lists) étendent ce modèle : \`setfacl -m u:john:rwx fichier\`.

## Cas d'utilisation concrets

- \`chmod 600 ~/.ssh/id_rsa\` : clé privée SSH
- \`chmod 755 /usr/bin/\` : exécutables système
- \`chmod 644 /etc/nginx/nginx.conf\` : fichiers de configuration
- \`chmod 1777 /tmp\` : répertoire temporaire partagé
- \`chmod 2750 /data/project\` : projet collaboratif avec héritage de groupe

## Bonnes pratiques

1. Appliquez le principe du moindre privilège
2. Ne jamais utiliser \`chmod 777\` (monde en écriture)
3. Préférez le mode octal pour sa précision
4. Utilisez des ACLs pour des permissions fines
5. Auditez régulièrement avec \`find / -perm -002\`
6. Définissez un umask (\`umask 022\`) pour les nouveaux fichiers
7. Restreignez les répertoires personnels à 750

## Pièges courants

1. \`chmod 777\` récursif sur toute l'application = faille de sécurité
2. Oublier le \`x\` sur un script = "Permission denied"
3. SUID sur un script shell (ignoré par sécurité, utiliser un binaire)
4. \`chown\` nécessite \`sudo\` sauf pour ses propres fichiers
5. Les permissions du répertoire parent affectent l'accès aux fichiers enfants
6. Confondre permissions fichier et permissions répertoire (x sur répertoire = traverser)

Source : [GNU Coreutils - File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)`},
        {
          id: 'linux-3',
          question: 'Comment gérer les processus sous Linux ?',
          answer: '**`ps aux`** liste tous les processus. **`top`**/`htop` donne une vue temps réel (CPU, mémoire). **`kill <PID>`** envoie un signal (défaut : `SIGTERM` = arrêt propre). **`kill -9 <PID>`** = `SIGKILL` (arrêt forcé, impossible à intercepter).\n\n**`&`** lance en arrière-plan. **`nohup`** protège contre la déconnexionion SSH. **`jobs`** liste les processus du shell. **`fg`**/`bg` ramène/envoie en avant/arrière-plan.\n\n__Préférez toujours `SIGTERM` (kill) à `SIGKILL` (kill -9)`__ — le processus peut nettoyer ses ressources proprement.',
          code: 'ps aux | grep java       # chercher les processus java\nkill -15 1234            # SIGTERM (propre)\nkill -9 1234             # SIGKILL (forcé)\nnohup ./server.sh &      # exécuter en arrière-plan persistant',
          language: 'bash',
        
          deepDive: `# Gestion des processus sous Linux

## Qu'est-ce que c'est ?

Un processus est une instance en cours d'exécution d'un programme. Linux associe à chaque processus un PID (Process ID), un PPID (Parent PID), et des ressources (CPU, mémoire, fichiers ouverts). Le noyau utilise un ordonnanceur pour répartir le temps CPU entre les processus selon leur priorité (nice value) et leur politique d'ordonnancement.

## Syntaxe et exemples

### Lister les processus

\`\`\`bash
ps aux                    # Tous les processus (BSD syntaxe)
ps -ef                    # Tous les processus (POSIX syntaxe)
ps -eo pid,ppid,cmd,%cpu,%mem --sort=-%cpu  # Tri par CPU
top                       # Moniteur interactif temps réel
htop                      # Version améliorée avec arborescence
pstree -p                 # Arbre des processus avec PIDs
\`\`\`

### Signaux et contrôle

\`\`\`bash
kill 1234                 # SIGTERM (15) : arrêt propre
kill -9 1234              # SIGKILL (9) : arrêt forcé (dernier recours)
kill -STOP 1234           # SIGSTOP : suspend le processus
kill -CONT 1234           # SIGCONT : reprend le processus suspendu
killall nginx             # Tue tous les processus nommés nginx
pkill -f "node server"    # Tue par motif (attention !)
\`\`\`

### Jobs shell

\`\`\`bash
./long_task.sh &          # Lance en arrière-plan
nohup ./server.sh &       # Résiste à la déconnexion
jobs                      # Liste les jobs du shell
fg %1                     # Ramène le job 1 au premier plan
bg %2                     # Envoie le job 2 en arrière-plan
Ctrl+Z                    # Suspend le job courant
\`\`\`

### Surveillance et débogage

\`\`\`bash
lsof -p 1234              # Fichiers ouverts par le processus
strace -p 1234            # Appels système en temps réel
pmap -x 1234              # Carte mémoire du processus
nice -n 10 ./script.sh    # Lance avec priorité basse
renice -n 5 -p 1234       # Change la priorité d'un processus en cours
\`\`\`

## Fonctionnement interne

### États d'un processus

\`\`\`
[Running] <--> [Sleeping] --> [Waiting] --> [Zombie]
    |                          |
    v                          v
[Stopped]                [Terminated]
\`\`\`

- **Running** : utilise le CPU
- **Sleeping** : attend une ressource (E/S, timer)
- **Stopped** : suspendu par SIGSTOP
- **Zombie** : terminé mais pas encore récupéré par le parent (wait())

### Ordonnancement CFS (Completely Fair Scheduler)

Le CFS alloue le CPU équitablement. Chaque processus à une \`nice\` value de -20 (priorité max) à +19 (priorité min). Par défaut : 0.

## Cas d'utilisation concrets

\`\`\`bash
# Trouver et tuer un processus qui consume trop
ps aux --sort=-%mem | head -5
kill -15 <PID>

# Lancer un serveur résistant au logout
nohup java -jar app.jar > app.log 2>&1 &

# Surveiller un processus spécifique
while true; do ps -p 1234 -o %cpu,%mem,etime --no-headers; sleep 2; done
\`\`\`

## Comparaison : commandes de monitoring

| Commande | Usage | Avantage |
|----------|-------|----------|
| top      | Temps réel | Simple, disponible partout |
| htop     | Temps réel | Interactif, couleur, arbre |
| ps       | Instantané | Scriptable, filtré |
| atop     | Historique | Enregistre les métriques |
| glances  | Vue d'ensemble | Tout-en-un, web UI |

## Bonnes pratiques

1. Toujours essayer SIGTERM avant SIGKILL (nettoyage propre)
2. Utiliser \`nohup\` ou \`screen\`/\`tmux\` pour les tâches longues
3. Surveiller les processus orphelins et zombies
4. Configurer des limites (\`ulimit -n\`, \`ulimit -u\`)
5. Logger les processus critiques (\`pidfile\`)
6. Utiliser systemd pour les services de production

## Pièges courants

1. \`kill -9\` en première intention = perte de données non sauvegardées
2. Oublier les jobs en arrière-plan qui continuent après logout
3. Processus enfant non nettoyé = fuite de processus zombie
4. Confondre PID et nom de processus dans \`killall\`
5. \`pkill -f\` trop générique peut tuer des processus légitimes
6. Ignorer les limites de fichiers ouverts (ulimit -n)

Source : [man7.org - Linux Process Management](https://man7.org/linux/man-pages/man7/capabilities.7.html)`},
        {
          id: 'linux-4',
          question: 'Comment utiliser les pipes et la redirection ?',
          answer: '**Pipe** (`|`) : connecte la sortie d\'une commande à l\'entrée de la suivante. Exemple : `ps aux | grep nginx | wc -l` (compter les processus nginx).\n\n**Redirection** : `>` (écraser un fichier), `>>` (ajouter à la fin), `<` (entrée depuis un fichier), `2>` (rediriger stderr), `2>&1` (stderr vers stdout), `/dev/null` (poubelle).\n\n__Le pipe est la puissance d\'Unix : combiner des commandes simples pour des tâches complexes.__',
          code: '# Pipes\nps aux | grep java | awk \'{print $2}\'\ncat access.log | sort | uniq -c | sort -rn | head -10\n\n# Redirection\necho "log" >> app.log       # ajouter\ncommand 2> errors.log       # stderr vers fichier\ncommand > out.txt 2>&1     # stdout+stderr vers fichier\ncommand > /dev/null 2>&1   # tout supprimer',
          language: 'bash',
        
          deepDive: `# Pipes et redirection sous Linux

## Qu'est-ce que c'est ?

Les pipes et redirections sont le cœur de la philosophie Unix : combiner des commandes simples pour accomplir des tâches complexes. Un pipe (\`|\`) connecte la sortie standard (stdout) d'une commande à l'entrée standard (stdin) d'une autre. Les redirections (\`>\`, \`>>\`, \`<\`, \`2>\`) contrôlent les flux d'entrée/sortie vers des fichiers.

## Syntaxe et exemples

### Pipes (tuyaux)

\`\`\`bash
# Compter les processus nginx
ps aux | grep nginx | wc -l

# Top 10 IPs les plus actives dans un log Apache
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# Trouver les fichiers les plus volumineux
find /var -type f -size +100M | xargs ls -lhS | head -5

# Comparer deux listes de fichiers
ls dir1 | sort > list1.txt && ls dir2 | sort > list2.txt && diff list1.txt list2.txt
\`\`\`

### Redirection des flux

\`\`\`bash
# stdout
echo "hello" > fichier.txt    # Écrase
echo "world" >> fichier.txt   # Ajoute

# stderr
commande_inexistante 2> error.log

# Les deux flux
commande &> tout.log                    # Bash 4+
commande > tout.log 2>&1               # Portable
commande 1> stdout.log 2> stderr.log    # Séparés

# /dev/null (le trou noir)
commande > /dev/null 2>&1              # Ignorer toute sortie

# stdin
sort < unsorted.txt > sorted.txt
mail -s "Sujet" user@example.com < body.txt
\`\`\`

### Here documents et here strings

\`\`\`bash
# Here document : multi-lignes dans un fichier
cat << EOF > config.json
{
  "name": "app",
  "version": "1.0"
}
EOF

# Here string : une chaîne comme stdin
grep "error" <<< "no errors here"
\`\`\`

### tee : bifurcation

\`\`\`bash
# Voir la sortie ET l'écrire dans un fichier
ps aux | tee processes.txt | grep root
# Ajouter (tee -a)
echo "new entry" | tee -a log.txt
\`\`\`

### xargs : construire des arguments

\`\`\`bash
# Supprimer tous les fichiers .tmp
find /tmp -name "*.tmp" | xargs rm

# Avec substitution positionnelle
find . -name "*.txt" | xargs -I {} cp {} /backup/

# Parallélisation
cat urls.txt | xargs -P 4 -I {} curl -s {}
\`\`\`

## Fonctionnement interne

### Descripteurs de fichiers

\`\`\`
stdin  (0)  ←── clavier/fichier
stdout (1)  ──→ terminal/fichier (tamponné)
stderr (2)  ──→ terminal/fichier (non tamponné)
\`\`\`

Un pipe crée un buffer en mémoire (taille par défaut : 65536 octets sous Linux). Le producteur écrit dans le buffer, le consommateur lit. Si le buffer est plein, le producteur est bloqué (back-pressure).

### Diagramme d'un pipeline

\`\`\`
[commande1] --stdout--> |pipe| --stdin--> [commande2] --stdout--> |pipe| --stdin--> [commande3]
                             ↑                                    ↑
                      buffer mémoire                       buffer mémoire
\`\`\`

## Cas d'utilisation concrets

\`\`\`bash
# Analyse de logs en temps réel
tail -f /var/log/nginx/access.log | grep -o "GET [^ ]*" | sort | uniq -c

# Backup avec compression
mysqldump -u root ma_base | gzip > backup.sql.gz

# Détection d'anomalies réseau
tcpdump -i eth0 -n | awk '{print $3}' | sort | uniq -c | sort -rn | head -20

# Monitoring de l'espace disque
df -h | grep -v tmpfs | awk '{print $5, $6}' | sort -rn | head -5
\`\`\`

## Bonnes pratiques

1. Utilisez des pipes plutôt que des fichiers temporaires (performance et atomicité)
2. Redirigez stderr avec \`2>&1\` pour capturer les erreurs
3. Utilisez \`tee\` pour logger ET afficher pendant le débogage
4. Préférez \`xargs -P\` pour paralléliser les traitements
5. Vérifiez toujours la commande avant \`xargs rm\` (testez avec \`echo\`)
6. Nettoyez les pipes vides avec \`head -c\` pour éviter les blocages

## Pièges courants

1. \`>\` écrase sans avertir (utilisez \`set -o noclobber\` dans bash)
2. Les variables définies dans un pipe ne sont pas accessibles après (sous-shell)
3. Pipes avec \`sudo\` : seul le premier élément a les droits root
4. \`tail -f | grep\` ne termine jamais (grep ne détecte pas EOF)
5. Oublier que \`sort\` a besoin de tout l'input avant de produire un résultat
6. Commandes interactives (vim, nano) ne fonctionnent pas avec des pipes

Source : [Bash Reference Manual - Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)`},
        {
          id: 'linux-5',
          question: 'Comment fonctionne SSH ?',
          answer: '**SSH** (*Secure Shell*) permet une connexionion chiffrée à distance. Authentification par **mot de passe** (déconseillé) ou **clé publique/privée** (recommandé) : la clé privée reste sur votre machine, la clé publique est copiée sur le serveur via `ssh-copy-id`.\n\nConfiguration dans `~/.ssh/config` pour les raccourcis. Le fichier `~/.ssh/authorized_keys` sur le serveur liste les clés autorisées. **Port forwarding** : `ssh -L 8080:localhost:8080 user@server` (tunnel local).\n\n__Désactivez l\'authentification par mot de passe en production__ (`PasswordAuthentication no` dans `/etc/ssh/sshd_config`). Utilisez des clés **ED25519**.',
          code: '# Connexion\nssh user@192.168.1.10\nssh -i ~/.ssh/my_key user@host\n\n# Config raccourci (~/.ssh/config)\nHost myserver\n  HostName 192.168.1.10\n  User admin\n  IdentityFile ~/.ssh/my_key\n\n# Puis simplement\nssh myserver',
          language: 'bash',
        
          deepDive: `# SSH : Secure Shell

## Qu'est-ce que c'est ?

SSH (Secure Shell) est un protocole réseau qui permet d'accéder à une machine distante de manière chiffrée. Il remplace les protocoles non sécurisés comme Telnet, rlogin ou rsh. SSH assure trois garanties : confidentialité (chiffrement), intégrité (HMAC) et authentification du serveur (certificat). L'authentification repose sur un système de clé publique/privée ou sur mot de passe.

## Syntaxe et exemples

### Connexion de base

\`\`\`bash
# Connexion simple
ssh user@192.168.1.10

# Port personnalisé
ssh -p 2222 user@host.example.com

# Clé spécifique
ssh -i ~/.ssh/production_key deploy@app.example.com

# Mode verbeux (débogage)
ssh -vvv user@host
\`\`\`

### Génération de clés

\`\`\`bash
# Moderne (recommandé)
ssh-keygen -t ed25519 -C "user@email.com"

# Compatible (anciens systèmes)
ssh-keygen -t rsa -b 4096 -C "user@email.com"

# Copie vers le serveur
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host

# Agent SSH (évite de rétaper la passphrase)
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
\`\`\`

### Fichier de configuration (~/.ssh/config)

\`\`\`
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes

Host prod
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/prod_key
    ForwardAgent no
\`\`\`

### Tunnels et forwarding

\`\`\`bash
# Tunnel local (port local -> serveur distant)
ssh -L 8080:localhost:80 user@webserver

# Tunnel distant (port serveur -> machine locale)
ssh -R 2222:localhost:22 user@gateway

# SOCKS proxy (navigation sécurisée)
ssh -D 1080 user@gateway

# Jump host (vià un bastion)
ssh -J bastion.example.com target.internal
\`\`\`

### Exécution de commandes à distance

\`\`\`bash
# Commande unique
ssh user@host "df -h && free -m && uptime"

# Script local exécuté à distance
ssh user@host 'bash -s' < local_script.sh

# Rsync via SSH (transfert de fichiers)
rsync -avz -e ssh ./dist/ user@host:/var/www/
\`\`\`

## Fonctionnement interne

### Processus de connexion

\`\`\`
1. Client → Serveur : TCP handshake (port 22)
2. Serveur → Client : envoie sa clé d'hôte
3. Négociation : version du protocole, algorithmes de chiffrement
4. Échange de clés (Diffie-Hellman) : clé de session partagée
5. Authentification client : clé publique ou mot de passe
6. Session chiffrée établie
\`\`\`

Algorithmes supportés : AES-256-GCM (chiffrement), SHA-256 (HMAC), Curve25519 (échange de clés), Ed25519 (signature).

## Cas d'utilisation concrets

- Administration de serveurs distants
- Tunnels pour bases de données (ssh -L 5432:localhost:5432 user@bastion)
- Git via SSH (dépôts distants)
- Transferts sécurisés (SCP, SFTP, Rsync)
- Jump hosts pour réseaux isolés

## Bonnes pratiques

1. Désactivez l'authentification par mot de passe (\`PasswordAuthentication no\`)
2. Utilisez Ed25519 plutôt que RSA (plus rapide, plus sûr)
3. Protégez vos clés privées avec une passphrase (chmod 600)
4. Utilisez \`ssh-agent\` pour éviter de rétaper la passphrase
5. Configurez \`MaxAuthTries 3\` et \`ClientAliveInterval\` côté serveur
6. Bannissez IPs après échecs avec fail2ban
7. Utilisez des bastions/jump hosts pour l'accès aux réseaux privés

## Pièges courants

1. Laisser le port 22 ouvert sans protection (cibles de bots en permanence)
2. \`~/.ssh\` avec permissions 777 = SSH refuse de fonctionner
3. Utiliser la même clé pour tous les environnements
4. Oublier d'ajouter la clé publique au serveur et se retrouver bloqué
5. ForwardAgent oublié = propagation d'accès involontaire
6. Clés sans passphrase = compromission totale si le fichier est volé

Source : [OpenSSH Manual](https://www.man.openbsd.org/ssh.1)`},
        {
          id: 'linux-6',
          question: 'Quelles commandes réseau connaître ?',
          answer: '**`curl`** : requêtes HTTP depuis le terminal (`curl -v https://api.example.com`). **`ping`** : teste la connectivité réseau. **`netstat`**/`ss` : liste les connexionions et ports en écoute (`ss -tlnp`). **`nslookup`**/`dig` : résolution DNS.\n\n**`traceroute`** : chemin réseau vers une destination. **`ip addr`** : adresses réseau. **`wget`** : téléchargement de fichiers.\n\n__En dev, `curl` et `ss` sont les plus utiles au quotidien__ — pour tester des APIs et vérifier les ports en écoute.',
          code: 'curl -X GET https://api.example.com/users\nping google.com\nss -tlnp              # ports en écoute\ndig example.com       # résolution DNS\nip addr show          # adresses réseau',
          language: 'bash',
        
          deepDive: `# Commandes réseau sous Linux

## Qu'est-ce que c'est ?

Linux fournit un ensemble de commandes pour diagnostiquer, configurer et surveiller le réseau. Ces outils permettent de tester la connectivité, inspecter les ports, résoudre des DNS, capturer du trafic et configurer les interfaces réseau. La connaissance de ces commandes est indispensable pour tout développeur qui déploie ou maintient des applications.

## Syntaxe et exemples

### Diagnostic de connectivité

\`\`\`bash
# Ping : test ICMP de base
ping -c 4 8.8.8.8          # 4 paquets seulement
ping -i 0.5 google.com     # Toutes les 500ms

# Traceroute : chemin réseau
traceroute -n google.com   # Sans résolution DNS
mtr google.com             # Combinaison ping + traceroute

# Connexion à un port
nc -zv 192.168.1.1 22      # Test port TCP
nc -zvu 192.168.1.1 53     # Test port UDP
telnet db.example.com 5432 # Vérification PostgreSQL
\`\`\`

### Ports et connexions

\`\`\`bash
# ss (moderne, remplace netstat)
ss -tulnp                  # Ports en écoute (TCP+UDP)
ss -tlnp                   # TCP seulement
ss -tn sport = :80         # Toutes les connexions sur le port 80
ss -state established      # Connexions établies

# netstat (ancien, encore utilisé)
netstat -tulnp
netstat -an | grep :80
\`\`\`

### Configuration réseau

\`\`\`bash
# ip (moderne, remplace ifconfig)
ip addr show               # Adresses IP
ip link show               # Interfaces
ip route show              # Table de routage
ip neigh                   # Cache ARP

# Configuration d'interface
ip addr add 10.0.0.5/24 dev eth0
ip link set eth0 up
\`\`\`

### DNS

\`\`\`bash
dig example.com            # Requête DNS complète
dig +short example.com     # Résultat court
dig -x 8.8.8.8             # Reverse DNS
nslookup example.com       # Simple
host example.com           # Encore plus simple
getent hosts example.com   # Via libc (utilise /etc/hosts)
\`\`\`

### Requêtes HTTP

\`\`\`bash
# curl
curl -v https://api.example.com      # Verbeux
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}'
curl -o output.html https://example.com
curl -w "
%{http_code}" url         # Affiche le code HTTP

# wget
wget https://example.com/file.zip
wget -r -l2 https://example.com/     # Récursif, 2 niveaux
\`\`\`

### Capture de paquets

\`\`\`bash
# tcpdump
tcpdump -i eth0                      # Toute l'interface
tcpdump -i eth0 port 80              # Filtrer par port
tcpdump -i eth0 host 10.0.0.1       # Filtrer par hôte
tcpdump -i eth0 -w capture.pcap     # Sauvegarder
tcpdump -r capture.pcap              # Lire le fichier
tcpdump -n -c 100                    # 100 paquets, sans DNS

# Scan de ports (nmap)
nmap -sT localhost                   # Scan TCP
nmap -sV localhost                   # Version detection
nmap -A 10.0.0.1                     # Agressif (OS + version + scripts)
\`\`\`

## Fonctionnement interne

### Modèle en couches et outils associés

\`\`\`
Couche        | Protocoles       | Outils de diagnostic
--------------|------------------|---------------------
Application   | HTTP, DNS, SSH   | curl, dig, ssh
Transport     | TCP, UDP         | ss, nc, telnet
Réseau        | IP, ICMP         | ping, traceroute, ip
Liaison       | Ethernet, ARP    | ip neigh, tcpdump
Physique      | Câble, Wi-Fi     | ethtool, iwconfig
\`\`\`

## Cas d'utilisation concrets

\`\`\`bash
# Vérifier si une API répond
curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health

# Trouver l'IP d'un service
dig +short service.consul

# Compter les connexions par IP
ss -tn | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10

# Surveiller un port spécifique
watch -n 2 'ss -tn sport = :8080'
\`\`\`

## Bonnes pratiques

1. Utilisez \`ss\` plutôt que \`netstat\` (plus rapide, plus complet)
2. Ajoutez \`-n\` aux commandes pour éviter les résolutions DNS lentes
3. Filtrez tcpdump tôt pour éviter de saturer le disque
4. Utilisez \`curl -w\` pour mesurer les temps de réponse
5. Testez la connectivité avec \`nc -zv\` (léger et efficace)
6. Préférez \`ip\` à \`ifconfig\` et \`route\` (maintenu activement)

## Pièges courants

1. \`sudo\` oublié pour les commandes privilégiées (tcpdump, nmap)
2. tcpdump sans filtre = fichier de capture qui grossit à l'infini
3. Confondre TCP et UDP (nc nécessite \`-u\` pour UDP)
4. Nmap sur des réseaux sans autorisation = illégal
5. \`dig\` sans paramètre utilise le DNS configuré, pas forcément le bon
6. \`ping\` bloqué par certains pare-feux (ICMP filtré) n'indique pas une panne

Source : [man7.org - Linux Network Commands](https://man7.org/linux/man-pages/man8/ss.8.html)`},
      ],
    },
    {
      id: 'linux-admin',
      title: 'Administration & Scripting',
      questions: [
        {
          id: 'linux-7',
          question: 'Comment écrire un script shell de base ?',
          answer: 'Un script shell commence par un **shebang** (`#!/bin/bash`), est rendu exécutable avec `chmod +x`, et utilise des **variables** (`$VAR` ou `${VAR}`), des **conditions** (`if/else`), des **boucles** (`for`, `while`), et des **fonctions**.\n\nLes arguments sont accessibles via `$1`, `$2`... `$0` est le nom du script, `$#` le nombre d\'arguments, `$?` le code de retour de la dernière commande.\n\n__Toujours utiliser `set -euo pipefail` en début de script__ : exit sur erreur, variable non définie = erreur, échec de pipe = échec du script.',
          code: '#!/bin/bash\nset -euo pipefail\n\nDEPLOY_DIR="${1:-/opt/app}"\n\necho "Deploying to $DEPLOY_DIR"\n\nif [ ! -d "$DEPLOY_DIR" ]; then\n  mkdir -p "$DEPLOY_DIR"\nfi\n\ncp -r ./dist/* "$DEPLOY_DIR/"\necho "Deploy done ✅"',
          language: 'bash',
        
          deepDive: `# Scripts Shell

## Qu'est-ce que c'est ?

Un script shell est un fichier texte contenant une séquence de commandes Linux exécutées par un interpréteur (bash, zsh, sh). Il permet d'automatiser des tâches répétitives : déploiements, sauvegardes, traitements par lots. Le shebang (\`#!/bin/bash\`) indique l'interpréteur. Les scripts sont rendus exécutables avec \`chmod +x\`.

## Syntaxe et exemples

### Structure de base

\`\`\`bash
#!/bin/bash
set -euo pipefail

# Variables
APP_DIR="\${1:-/opt/app}"
LOG_FILE="/var/log/deploy.log"

# Fonction utilitaire
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Exécution conditionnelle
if [ ! -d "$APP_DIR" ]; then
    log "Création du répertoire $APP_DIR"
    mkdir -p "$APP_DIR"
fi

log "Déploiement terminé"
\`\`\`

### Variables et paramètres

\`\`\`bash
#!/bin/bash

# Types de variables
NOM="Alice"
AGE=30
FRUITS=("pomme" "banane" "cerise")
declare -r CONSTANTE="valeur"   # Lecture seule

# Paramètrès positionnels
echo "Script: $0"
echo "Args: $#"
echo "Premier: $1"
echo "Tous: $@"

# Substitution
DATE=$(date +%Y-%m-%d)
FILES=$(ls -1 | wc -l)

# Expansion arithmétique
RESULTAT=$(( (5 + 3) * 2 ))
\`\`\`

### Conditions

\`\`\`bash
# Tests sur fichiers
if [ -f "$FICHIER" ]; then echo "Fichier existe"; fi
if [ -d "$REP" ]; then echo "Répertoire existe"; fi
if [ -x "$SCRIPT" ]; then echo "Exécutable"; fi
if [ -z "$VAR" ]; then echo "Variable vide"; fi
if [ -n "$VAR" ]; then echo "Variable non vide"; fi

# Tests numériques
if [ "$AGE" -gt 18 ]; then echo "Majeur"; fi

# Tests chaînes
if [ "$NOM" = "Alice" ]; then echo "Bonjour Alice"; fi

# Test composé
if [ -f "$FICHIER" ] && [ -r "$FICHIER" ]; then
    echo "Fichier lisible"
fi
\`\`\`

### Boucles

\`\`\`bash
# for sur une liste
for fichier in *.txt; do
    echo "Traitement de $fichier"
done

# for style C
for (( i=0; i<10; i++ )); do
    echo "Itération $i"
done

# while
while IFS= read -r ligne; do
    echo "Ligne: $ligne"
done < fichier.csv

# until
count=10
until [ $count -eq 0 ]; do
    echo $count
    ((count--))
done
\`\`\`

## Fonctionnement interne

Quand vous exécutez \`./script.sh\`, le shell :
1. Lit le shebang (\`#!/bin/bash\`) pour choisir l'interpréteur
2. Forke un nouveau processus
3. Exécute les commandes séquentiellement
4. Chaque commande est un sous-processus (sauf les builtins comme \`cd\`, \`echo\`)
5. Le code de retour (\`$?\`) détermine le succès (0) ou échec (non-0)

### set -euo pipefail expliqué

\`\`\`bash
set -e   # Exit immédiatement si une commande échoue
set -u   # Erreur si variable non définie (évite les bugs silencieux)
set -o pipefail  # Un pipe échoue si une commande du pipe échoue
\`\`\`

## Cas d'utilisation concrets

\`\`\`bash
#!/bin/bash
set -euo pipefail

# Backup de base de données
BACKUP_DIR="/backups/$(date +%Y/%m)"
mkdir -p "$BACKUP_DIR"
pg_dump ma_base | gzip > "$BACKUP_DIR/ma_base.sql.gz"

# Déploiement
rsync -avz --delete ./dist/ user@server:/var/www/
ssh user@server "systemctl reload nginx"
\`\`\`

## Bonnes pratiques

1. Toujours utiliser \`set -euo pipefail\` en début de script
2. Quotez les variables : \`"$VAR"\` gère les espaces
3. Préférez \`[[ ]]\` à \`[ ]\` pour les conditions bash (plus de fonctionnalités)
4. Nommez vos variables en MAJUSCULES pour les constantes
5. Utilisez des fonctions pour structurer le code
6. Vérifiez les scripts avec ShellCheck (\`shellcheck script.sh\`)
7. Documentez l'utilisation avec un commentaire d'en-tête

## Pièges courants

1. Espaces autour de \`=\` dans les affectations (interdits !)
2. Variables non quotées qui cassent avec des espaces
3. \`if [ $var = "x" ]\` échoue si var est vide (utilisez \`"$var"\`)
4. \`for f in $(ls)\` dangereux avec espaces dans les noms (préférez \`for f in *\`)
5. Oublier \`exit 1\` après une erreur non rattrapée
6. Script bash avec shebang sh (\`#!/bin/sh\` = pas de [[, arrays...)

Source : [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)`},
        {
          id: 'linux-8',
          question: 'Comment utiliser les gestionnaires de paquets ?',
          answer: '**Debian/Ubuntu** : `apt` — `apt update` (rafraîchir les sources), `apt install nginx` (installer), `apt remove nginx` (supprimer), `apt upgrade` (mettre à jour).\n\n**RHEL/CentOS** : `yum` (ancien) ou `dnf` (nouveau) — commandes similaires. Les paquets sont signés et vérifiés. Les dépôts officiels garantissent la stabilité.\n\n__Règle : ne jamais installer de paquets non vérifiés.__ Préférez les dépôts officiels. Pour des versions récentes, utilisez les PPA (Ubuntu) où les dépôts officiels de l\'éditeur.',
          code: '# Debian/Ubuntu\nsudo apt update && sudo apt upgrade\nsudo apt install nginx\nsudo apt remove nginx\napt list --installed\n\n# RHEL/CentOS\nsudo dnf install nginx\nsudo dnf remove nginx',
          language: 'bash',
        
          deepDive: `# Gestionnaires de paquets Linux

## Qu'est-ce que c'est ?

Un gestionnaire de paquets automatise l'installation, la mise à jour et la suppression des logiciels. Il résout les dépendances, vérifie les signatures, et maintient une base de données des paquets installés. Chaque distribution Linux a son propre format (.deb pour Debian/Ubuntu, .rpm pour RHEL/Fedora) et son gestionnaire attitré.

## Syntaxe et exemples

### APT (Debian/Ubuntu)

\`\`\`bash
# Mise à jour des paquets
sudo apt update                  # Rafraîchit la liste
sudo apt upgrade                 # Met à jour les paquets
sudo apt full-upgrade            # Met à jour avec résolution de conflits
sudo apt autoremove              # Supprime les dépendances inutiles

# Recherche et installation
apt search nginx                 # Recherche dans les dépôts
apt show nginx                   # Détails du paquet
sudo apt install nginx           # Installation
sudo apt install nginx=1.18.0    # Version spécifique
sudo apt remove nginx            # Supprime (garde les configs)
sudo apt purge nginx             # Supprime tout (config comprises)

# Gestion des paquets installés
apt list --installed             # Liste des paquets installés
apt list --upgradable           # Paquets pouvant être mis à jour
apt-mark hold nginx             # Bloque la version
apt-mark unhold nginx           # Débloque
\`\`\`

### DNF (Fedora/RHEL 8+)

\`\`\`bash
sudo dnf install nginx
sudo dnf remove nginx
sudo dnf update                  # Met à jour
sudo dnf search nginx
sudo dnf info nginx
sudo dnf groupinstall "Web Server"
sudo dnf history                 # Historique des opérations
sudo dnf reinstall nginx         # Réinstallation
\`\`\`

### YUM (RHEL/CentOS 7)

\`\`\`bash
sudo yum install nginx
sudo yum remove nginx
sudo yum update
sudo yum search nginx
sudo yum info nginx
sudo yum list installed
sudo yum clean all               # Nettoie le cache
\`\`\`

### Pacman (Arch Linux)

\`\`\`bash
sudo pacman -Syu                 # Synchronisation + mise à jour
sudo pacman -S nginx             # Installation
sudo pacman -R nginx             # Suppression
sudo pacman -Rs nginx            # Suppression + dépendances
sudo pacman -Ss nginx            # Recherche
sudo pacman -Qi nginx            # Info paquet installé
sudo pacman -Qdt                 # Dépendances orphelines
\`\`\`

### Paquets isolés (Snap, Flatpak)

\`\`\`bash
# Snap
snap install --classic code     # VS Code
snap list                        # Liste des snaps
snap refresh                     # Mise à jour de tous
snap remove code

# Flatpak
flatpak install flathub org.mozilla.firefox
flatpak list
flatpak update
flatpak remove org.mozilla.firefox
\`\`\`

### Manipulation directe .deb/.rpm

\`\`\`bash
# Debian
sudo dpkg -i package.deb         # Installation
sudo dpkg -r package               # Suppression
dpkg -l                            # Liste
dpkg -L package                    # Fichiers installés

# RPM
sudo rpm -ivh package.rpm
sudo rpm -e package
rpm -qa                            # Query all
rpm -ql package                    # Fichiers du paquet
\`\`\`

## Fonctionnement interne

### Structure d'un gestionnaire

\`\`\`
Dépôts (/etc/apt/sources.list)  ──→  Base de données des paquets
           ↓
   Résolution des dépendances
           ↓
   Téléchargement (.deb/.rpm)
           ↓
   Vérification (signature GPG)
           ↓
   Installation + scripts post-install
           ↓
   Base de données locale (/var/lib/dpkg/)
\`\`\`

Les dépendances d'un paquet sont déclarées dans son fichier de contrôle. Le gestionnaire construit un graphe de dépendances et les installe dans l'ordre correct.

## Cas d'utilisation concrets

\`\`\`bash
# Mise à jour de sécurité complète
sudo apt update && sudo apt upgrade -y

# Installation d'un environnement LAMP
sudo apt install apache2 mysql-server php libapache2-mod-php

# Recherche de la version disponible d'un paquet
apt policy nginx

# Épinglage de version (APT pinning)
echo "Package: docker-ce
Pin: version 20.10.*
Pin-Priority: 1001" | sudo tee /etc/apt/preferences.d/docker
\`\`\`

## Comparaison

| Gestionnaire | Distribution | Format | Commandes clés |
|-------------|--------------|--------|----------------|
| APT | Debian/Ubuntu | .deb | apt, dpkg |
| DNF | Fedora/RHEL 8+ | .rpm | dnf, rpm |
| YUM | RHEL/CentOS 7 | .rpm | yum, rpm |
| Pacman | Arch | .pkg.tar.zst | pacman |
| Zypper | SUSE/openSUSE | .rpm | zypper |
| Snap | Universel | .snap | snap |
| Flatpak | Universel | .flatpak | flatpak |

## Bonnes pratiques

1. Toujours faire \`apt update\` avant \`apt install\`
2. Utilisez \`apt\` (pas \`apt-get\`) pour l'interaction humaine
3. Nettoyez régulièrement : \`apt autoremove\`, \`apt autoclean\`
4. Préférez les paquets officiels aux installations manuelles
5. Vérifiez les signatures GPG des dépôts ajoutés
6. Évitez \`sudo apt upgrade\` sur un serveur de production sans test préalable

## Pièges courants

1. \`apt update\` oublié = installation de version obsolète ou introuvable
2. Mélanger \`pip\` (Python) avec \`apt\` pour les libs système peut casser l'OS
3. Ajouter des PPA non officiels = risque de sécurité
4. Forcer une installation ignore les dépendances (\`dpkg -i --force-depends\`)
5. \`sudo apt upgrade\` peut modifier des fichiers de configuration
6. Versionning : les gestionnaires ne gèrent pas plusieurs versions simultanées

Source : [APT Howto (Debian)](https://www.debian.org/doc/manuals/apt-howto/)`},
        {
          id: 'linux-9',
          question: 'Qu\'est-ce que systemd et comment l\'utiliser ?',
          answer: '**`systemd`** est le système d\'init par défaut sur la plupart des distributions Linux. Il gère les **services** (daemons) via des fichiers **unit** (`/etc/systemd/system/mon-service.service`).\n\nCommandes : `systemctl start/stop/restart mon-service`, `systemctl status mon-service`, `systemctl enable mon-service` (démarrage auto au boot), `journalctl -u mon-service` (logs du service).\n\n__Pour toute application en production, créez un service systemd__ — ça assure le démarrage automatique, le restart en cas de crash, et la gestion des logs.',
          code: '# /etc/systemd/system/app.service\n[Unit]\nDescription=My App\nAfter=network.target\n\n[Service]\nExecStart=/opt/app/start.sh\nRestart=on-failure\nUser=appuser\nEnvironment=JAVA_HOME=/usr/lib/jvm/java-17\n\n[Install]\nWantedBy=multi-user.target\n\n# Activation\nsudo systemctl daemon-reload\nsudo systemctl enable app\nsudo systemctl start app',
          language: 'ini',
        
          deepDive: `# systemd

## Qu'est-ce que c'est ?

systemd est le système d'init et le gestionnaire de services de la plupart des distributions Linux modernes. Il remplace SysV init et Upstart. Il démarre les processus en parallèle (plus rapide au boot), gère les dépendances entre services, et centralise les logs via \`journalctl\`. Les services sont définis dans des fichiers **unit** avec l'extension \`.service\`.

## Syntaxe et exemples

### Fichier unit type service

\`\`\`ini
[Unit]
Description=Application Spring Boot
Documentation=https://docs.example.com
After=network.target postgresql.service
Wants=redis.service
Requires=postgresql.service

[Service]
Type=simple
User=appuser
Group=appgroup
WorkingDirectory=/opt/app
Environment=JAVA_HOME=/usr/lib/jvm/java-17
EnvironmentFile=/etc/app/config.env
ExecStart=/usr/bin/java -jar /opt/app/app.jar
ExecStartPre=/opt/app/check-db.sh
ExecStop=/opt/app/stop.sh
Restart=on-failure
RestartSec=5
TimeoutStartSec=60
TimeoutStopSec=10
LimitNOFILE=65536
MemoryMax=512M
CPUQuota=80%

[Install]
WantedBy=multi-user.target
\`\`\`

### Gestion des services

\`\`\`bash
# Contrôle de base
systemctl start app.service
systemctl stop app.service
systemctl restart app.service
systemctl reload app.service        # Recharge la config (si supporté)

# Statut
systemctl status app.service        # Avec logs récents
systemctl is-active app.service     # active/inactive
systemctl is-enabled app.service    # enabled/disabled
systemctl show app.service          # Toutes les propriétés

# Activation au démarrage
systemctl enable app.service        # Active au boot
systemctl disable app.service       # Désactive au boot
systemctl enable --now app.service  # Active ET démarre
systemctl mask app.service          # Empêche totalement le démarrage
\`\`\`

### Journald (logs)

\`\`\`bash
# Logs d'un service
journalctl -u app.service           # Tous les logs
journalctl -u app.service -f        # Suivi en temps réel
journalctl -u app.service --since "1 hour ago"
journalctl -u app.service -p err    # Erreurs seulement

# Logs système
journalctl -xe                      # Dernières entrées + explication
journalctl --disk-usage             # Taille occupée
journalctl --vacuum-size=200M       # Limiter à 200 Mo
journalctl --vacuum-time=7d         # Garder 7 jours

# Format JSON
journalctl -u app.service -o json-pretty
\`\`\`

### Minuteries (remplacement cron)

\`\`\`ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Sauvegarde quotidienne

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=1800

[Install]
WantedBy=timers.target
\`\`\`

\`\`\`ini
# /etc/systemd/system/backup.service
[Unit]
Description=Exécution de la sauvegarde

[Service]
Type=oneshot
ExecStart=/opt/scripts/backup.sh
\`\`\`

\`\`\`bash
# Gestion des timers
systemctl enable --now backup.timer
systemctl list-timers
\`\`\`

## Fonctionnement interne

### Arbre de dépendances au démarrage

\`\`\`
systemd (PID 1)
  ├── basic.target
  ├── network.target
  │   ├── NetworkManager.service
  │   └── systemd-networkd.service
  ├── postgresql.service
  └── multi-user.target
      ├── app.service (After=postgresql.service)
      ├── nginx.service
      └── sshd.service
\`\`\`

### Cibles principales

| Cible | Équivalent SysV | Description |
|-------|-----------------|-------------|
| poweroff.target | 0 | Arrêt |
| rescue.target | 1 | Mode mono-utilisateur |
| multi-user.target | 3 | Multijoueur sans interface graphique |
| graphical.target | 5 | Avec interface graphique |
| reboot.target | 6 | Redémarrage |

## Cas d'utilisation concrets

\`\`\`bash
# Redémarrer Nginx après modification de config
sudo systemctl reload nginx

# Voir les logs d'erreur d'un service qui ne démarre pas
journalctl -u mon-service -xe --no-pager

# Activer un service perso
sudo systemctl daemon-reload
sudo systemctl enable --now mon-service

# Debug : lancer un service manuellement
sudo systemctl stop mon-service
sudo -u appuser /opt/app/start.sh
\`\`\`

## Bonnes pratiques

1. Utilisez \`Type=simple\` pour les processus au premier plan (la majorité)
2. Spécifiez toujours \`Restart=on-failure\` pour les services de production
3. Utilisez \`EnvironmentFile\` pour externaliser la configuration
4. Limitez les ressources avec \`MemoryMax\`, \`CPUQuota\`, \`LimitNOFILE\`
5. Testez avec \`systemctl start\` avant \`systemctl enable\`
6. Préférez les timers systemd à cron pour les services critiques

## Pièges courants

1. Oublier \`systemctl daemon-reload\` après modification du fichier unit
2. \`Type=forking\` utilisé à mauvais escient (le service doit créer un PID file)
3. Variables d'environnement ignorées (utiliser \`Environment=\` ou \`EnvironmentFile=\`)
4. Service qui échoue silencieusement car \`ExecStart\` n'est pas un chemin absolu
5. Confondre \`enable\` (démarrage au boot) et \`start\` (démarrage immédiat)
6. Modifier \`/usr/lib/systemd/system/\` au lieu de \`/etc/systemd/system/\`

Source : [systemd Documentation](https://www.freedesktop.org/software/systemd/man/systemd.service.html)`},
        {
          id: 'linux-10',
          question: 'Comment configurer des cron jobs ?',
          answer: '**`cron`** exécute des tâches planifiées. Éditer avec `crontab -e`. Syntaxe : `min heure jour mois jour-semaine commande`. Exemples : `0 2 * * * /opt/backup.sh` (tous les jours à 2h), `*/5 * * * * /opt/check.sh` (toutes les 5 min).\n\nLes logs vont dans `/var/log/syslog` ou sont redirigés dans la commande. Toujours utiliser des **chemins absolus** dans les cron jobs (le PATH est minimal).\n\n__Astuce : redirigez toujours les sorties__ (`>> /var/log/backup.log 2>&1`), sinon cron envoie un mail root à chaque exécution.',
          code: '# Crontab\n* * * * *     # chaque minute\n*/5 * * * *   # toutes les 5 minutes\n0 2 * * *     # chaque jour à 2h00\n0 0 * * 0     # chaque dimanche minuit\n0 0 1 * *     # chaque 1er du mois\n\n# Exemples pratiques\n0 2 * * * /opt/backup.sh >> /var/log/backup.log 2>&1\n*/10 * * * * /opt/health-check.sh',
          language: 'bash',
        
          deepDive: `# Cron : planification de tâches

## Qu'est-ce que c'est ?

Cron est le planificateur de tâches historique sous Unix/Linux. Il exécute des commandes à des moments définis (minute, heure, jour, mois, jour de la semaine). Chaque utilisateur peut avoir sa propre crontab. Les tâches cron sont idéales pour les sauvegardes, nettoyages, rapports et autrès opérations récurrentes.

## Syntaxe et exemples

### Format crontab

\`\`\`
 # ┌───────── minute (0-59)
 # │ ┌───────── heure (0-23)
 # │ │ ┌───────── jour du mois (1-31)
 # │ │ │ ┌───────── mois (1-12)
 # │ │ │ │ ┌───────── jour de la semaine (0-7, 0=dimanche)
 # │ │ │ │ │
   * * * * * commande
\`\`\`

### Exemples commentés

\`\`\`bash
# Exécution toutes les minutes (debug)
* * * * * /opt/check.sh

# Toutes les 5 minutes
*/5 * * * * /opt/health-check.sh

# Tous les jours à 2h du matin
0 2 * * * /opt/backup.sh

# Tous les lundis à 9h
0 9 * * 1 /opt/weekly-report.sh

# 1er du mois à minuit
0 0 1 * * /opt/monthly-cleanup.sh

# Toutes les heures pendant les heures de bureau (9h-18h)
0 9-18 * * 1-5 /opt/business-check.sh

# Toutes les 30 secondes (pas possible directement, utiliser sleep)
* * * * * /opt/task.sh
* * * * * sleep 30 && /opt/task.sh
\`\`\`

### Chaînes spéciales

\`\`\`bash
@reboot     # Au démarrage du système
@yearly     # 0 0 1 1 *
@monthly    # 0 0 1 * *
@weekly     # 0 0 * * 0
@daily      # 0 0 * * *
@hourly     # 0 * * * *
\`\`\`

\`\`\`bash
# Exemple : script au reboot
@reboot /opt/init-node.sh > /var/log/init.log 2>&1
\`\`\`

### Gestion de la crontab

\`\`\`bash
crontab -l                # Liste vos tâches
crontab -e                # Édite vos tâches (vim par défaut)
crontab -r                # Supprime votre crontab
crontab -u user -l        # Liste celle d'un autre utilisateur (root)
\`\`\`

### Cron système (/etc/crontab)

Le fichier \`/etc/crontab\` à un champ supplémentaire : l'utilisateur.

\`\`\`
# /etc/crontab
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

0 2 * * * root /opt/backup.sh
*/15 * * * * www-data /opt/health-check.sh
\`\`\`

### /etc/cron.d, cron.hourly, etc.

\`\`\`bash
# /etc/cron.d/mon-tâche
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin
MAILTO=admin@example.com

0 3 * * * root /opt/nettoyage.sh

# Dossiers préconfigurés :
# /etc/cron.hourly/  → scripts exécutés toutes les heures
# /etc/cron.daily/   → scripts exécutés chaque jour
# /etc/cron.weekly/  → scripts exécutés chaque semaine
# /etc/cron.monthly/ → scripts exécutés chaque mois
\`\`\`

## Fonctionnement interne

Le démon cron (\`crond\`) s'exécute en permanence. Il vérifie chaque minute les crontabs et exécute les tâches dont l'horaire correspond.

\`\`\`
crond (processus démon)
  ├── Lit /var/spool/cron/crontabs/*  (crontabs utilisateurs)
  ├── Lit /etc/crontab                (crontab système)
  ├── Lit /etc/cron.d/*               (fragments)
  └── Exécute les tâches correspondant à la minute courante
\`\`\`

L'environnement d'exécution est minimal (PATH restreint, pas de DISPLAY). Toujours utiliser des chemins absolus.

## Cas d'utilisation concrets

\`\`\`bash
# Sauvegarde PostgreSQL quotidienne
0 3 * * * pg_dump -U postgres mabase | gzip > /backups/mabase_$(date +%Y%m%d).sql.gz

# Rotation des logs (si logrotate non disponible)
0 0 * * * find /var/log/app -name "*.log" -mtime +30 -delete

# Monitoring de processus
*/5 * * * * pgrep -x nginx > /dev/null || systemctl restart nginx
\`\`\`

## Bonnes pratiques

1. Toujours utiliser des chemins **absolus** (PATH minimal dans cron)
2. Redirigez stdout et stderr vers un fichier de log
3. Définissez PATH et SHELL en haut de la crontab
4. Testez le script manuellement avant de l'ajouter à cron
5. Utilisez un mécanisme de verrouillage pour éviter les chevauchements
6. Configurez une alerte si une tâche cron échoue
7. Utilisez \`MAILTO=\` pour recevoir les erreurs par email

## Pièges courants

1. Oublier le PATH : les commandes sans chemin absolu échouent
2. Pas de redirection = mail root à chaque exécution
3. Tâches qui se chevauchent (exécution suivante avant la fin de la précédente)
4. Pourcentage \`%\` dans la commande (doit être échappé : \`%\`)
5. Script sans permission d'exécution (cron n'exécute pas \`sh script.sh\`)
6. Nouvelle ligne manquante à la fin du fichier crontab (dernière ligne ignorée)

Source : [man7.org - crontab(5)](https://man7.org/linux/man-pages/man5/crontab.5.html)`},
        {
          id: 'linux-11',
          question: 'Comment gérer les variables d\'environnement ?',
          answer: 'Les **variables d\'environnement** configurent le comportement des programmes. Définir : `export DB_HOST=localhost`. Afficher : `echo $DB_HOST` ou `env` (toutes les variables). Supprimer : `unset DB_HOST`.\n\n**Persistance** : `~/.bashrc` ou `~/.zshrc` (utilisateur), `/etc/environment` (système), `.env` (par projet). Pour systemd : directive `Environment=` ou `EnvironmentFile=`.\n\n__Ne mettez jamais de secrets en clair dans les fichiers de config__ — utilisez un vault (`HashiCorp Vault`, AWS Secrets Manager) ou au minimum des permissions restrictives (`chmod 600`).',
          code: '# Session courante\nexport DB_HOST=localhost\nexport API_KEY=secret123\n\n# Persistance (~/.bashrc)\necho \'export DB_HOST=localhost\' >> ~/.bashrc\nsource ~/.bashrc\n\n# Vérifier\nenv | grep DB_HOST\necho $DB_HOST',
          language: 'bash',
        
          deepDive: `# Variables d'environnement sous Linux

## Qu'est-ce que c'est ?

Les variables d'environnement sont des paires clé-valeur qui influencent le comportement des processus. Chaque processus hérite de l'environnement de son parent. Elles servent à configurer les applications sans modifier le code (12-factor app), à définir le PATH, la locale, les options du shell, et à transmettre des secrets (tokens, clés API) de manière séparée du code source.

## Syntaxe et exemples

### Visualisation

\`\`\`bash
# Afficher toutes les variables
env                         # Liste triée
printenv                    # Idem
declare -p                  # Variables shell + environnement

# Variable spécifique
echo "$HOME"
printenv HOME
echo \${HOME:-/tmp}          # Avec valeur par défaut

# Test d'existence
if [ -z "\${DB_HOST:-}" ]; then
    echo "DB_HOST non défini"
fi
\`\`\`

### Définition temporaire (session)

\`\`\`bash
# Dans le shell courant
export DB_HOST=localhost
export DB_PORT=5432
export APP_ENV=development

# Pour une seule commande
DB_HOST=localhost DB_PORT=5432 ./mon-script.sh

# Retirer une variable
unset DB_HOST

# Variable en lecture seule
declare -r APP_NAME="MonApp"
\`\`\`

### Persistance par utilisateur

\`\`\`bash
# ~/.bashrc (shells interactifs)
echo 'export JAVA_HOME=/usr/lib/jvm/java-17' >> ~/.bashrc
echo 'export PATH=$PATH:$JAVA_HOME/bin' >> ~/.bashrc
echo 'export EDITOR=vim' >> ~/.bashrc
source ~/.bashrc

# ~/.profile (shells de login)
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.profile

# ~/.ssh/environment (pour SSH)
echo "MY_VAR=value" >> ~/.ssh/environment
# Nécessite PermitUserEnvironment yes dans sshd_config
\`\`\`

### Persistance système

\`\`\`bash
# /etc/environment (tous les utilisateurs)
# Format : VAR=valeur (pas d'export, pas de substitution)
JAVA_HOME=/usr/lib/jvm/java-17
APP_ENV=production

# /etc/profile.d/*.sh (scripts shell chargés au login)
# /etc/profile.d/monapp.sh
export APP_CONFIG=/etc/monapp/config.yml
\`\`\`

### Docker

\`\`\`dockerfile
# Dockerfile
ENV NODE_ENV=production
ENV PORT=8080
ENV JAVA_OPTS="-Xmx512m -Xms256m"
\`\`\`

\`\`\`yaml
# docker-compose.yml
services:
  app:
    environment:
      - DB_HOST=db
      - DB_NAME=\${DB_NAME:-mydb}  # Valeur par défaut
    env_file:
      - .env
\`\`\`

\`\`\`bash
# Docker run
docker run -e DB_HOST=prod-db -e DB_PASSWORD=secret myapp
docker run --env-file .env myapp
\`\`\`

### Kubernetes

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
---
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    env:
    - name: DB_HOST
      value: "prod-db.internal"
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
    envFrom:
    - configMapRef:
        name: app-config
\`\`\`

### Systemd

\`\`\`ini
[Service]
Environment=JAVA_HOME=/usr/lib/jvm/java-17
Environment=APP_OPTS="--max-memory=512"
EnvironmentFile=-/etc/default/monapp
\`\`\`

## Fonctionnement interne

\`\`\`
Processus parent
    │
    ├── fork() → copie de l'environnement
    │
    └── execve() → nouveau programme, environnement hérité

Modification : l'enfant ne peut PAS modifier l'environnement du parent.
\`\`\`

L'environnement est stocké dans un tableau de chaînes \`"KEY=VALUE"\`. Sous Linux, la taille totale est limitée par \`getconf ARG_MAX\` (généralement 2 Mo).

## Cas d'utilisation concrets

\`\`\`bash
# Spring Boot profile
export SPRING_PROFILES_ACTIVE=production

# Node.js
export NODE_ENV=production
export DEBUG=app:*

# Proxy
export HTTP_PROXY=http://proxy:3128
export HTTPS_PROXY=http://proxy:3128
export NO_PROXY=localhost,127.0.0.1,.internal

# Locale
export LANG=fr_FR.UTF-8
export LC_ALL=fr_FR.UTF-8
\`\`\`

## Bonnes pratiques

1. Ne jamais committer de secrets dans Git (utilisez \`.env.example\`)
2. Séparez la configuration du code (12-factor app)
3. Utilisez des préfixes clairs : \`DB_*\`, \`APP_*\`, \`API_*\`
4. Validez les variables requises au démarrage de l'application
5. Préférez les secrets managers (Vault, AWS Secrets Manager) en production
6. Documentez toutes les variables requises dans le README
7. Utilisez \`.env\` pour le développement local (jamais en production)

## Pièges courants

1. Hardcoder des secrets dans le code où les Dockerfiles
2. Exposer des variables dans les logs où les stacktraces
3. Variable non définie = comportement silencieusement incorrect
4. \`.env\` commité dans Git = fuite de secrets dans l'historique
5. Confondre variables shell (locale) et variables d'environnement (exportée)
6. Taille des variables limitée par le système (ne pas mettre tout un fichier de config)
7. Injection de variable via \`env\` dans une API non sécurisée

Source : [12factor.net - Config](https://12factor.net/config)`},
        {
          id: 'linux-12',
          question: 'Les bases de vim pour survivre en entretien ?',
          answer: '**`vim`** a 3 modes : **Normal** (navigation/commandes), **Insertion** (édition), **Ligne de commande** (sauvegarde/quitter). Entrer en insertion : `i` (avant curseur), `a` (après), `o` (nouvelle ligne dessous). Revenir en normal : `Échap`.\n\nCommandes essentielles : `:w` (sauvegarder), `:q` (quitter), `:wq` ou `ZZ` (sauver+quitter), `:q!` (quitter sans sauver). Navigation : `gg` (début), `G` (fin), `/mot` (rechercher), `n` (suivant). Supprimer : `dd` (ligne), `x` (caractère).\n\n__Si vous êtes bloqué dans vim : appuyez sur Échap, puis tapez `:q!` et Entrée.__ C\'est la question piège classique en entretien.',
          code: '# Modes\ni      → mode insertion\nÉchap  → mode normal\n:      → mode commande\n\n# Sauvegarder/Quitter\n:w     → sauvegarder\n:q     → quitter\n:q!    → quitter sans sauver\n:wq    → sauver et quitter\n\n# Navigation\ngg     → début du fichier\nG      → fin du fichier\n/mot   → rechercher\nn      → occurrence suivante',
          language: 'vim',
        
          deepDive: `# Vim : bases essentielles

## Qu'est-ce que c'est ?

Vim (Vi Improved) est un éditeur de texte modal présent sur tous les systèmes Unix. Il dérive de vi (1976). Contrairement aux éditeurs modernes où on tape directement, Vim a des **modes** distincts pour naviguer, éditer et commander. La maîtrise de Vim est souvent testée en entretien technique car c'est le seul éditeur garanti disponible sur n'importe quel serveur Linux.

## Syntaxe et exemples

### Les trois modes fondamentaux

\`\`\`
┌──────────────┐     Échap      ┌──────────────┐
│   NORMAL     │ ────────────→ │   INSERTION   │
│ (navigation) │ ←──────────── │   (édition)   │
└──────────────┘     i, a, o    └──────────────┘
       │                              │
       │  :                            │
       v                              │
┌──────────────┐                      │
│  COMMANDE    │ ←────────────────────┘
│ (exécution)  │        Échap
└──────────────┘
\`\`\`

### Navigation (mode Normal)

\`\`\`vim
h       ← curseur à gauche
j       ↓ curseur en bas
k       ↑ curseur en haut
l       → curseur à droite
w       ← mot suivant
b       ← mot précédent
0       ← début de ligne
$       ← fin de ligne
gg      ← début du fichier
G       ← fin du fichier
50G     ← va à la ligne 50
Ctrl+d  ← descend d'une demi-page
Ctrl+u  ← monte d'une demi-page
\`\`\`

### Édition (mode Insertion)

\`\`\`vim
i       ← insère avant le curseur
I       ← insère au début de la ligne
a       ← insère après le curseur
A       ← insère à la fin de la ligne
o       ← nouvelle ligne en dessous
O       ← nouvelle ligne au-dessus
s       ← supprime le caractère et passe en insertion
S       ← supprime la ligne et passe en insertion
\`\`\`

### Suppression et copier/coller (mode Normal)

\`\`\`vim
x       ← supprime le caractère
dd      ← supprime la ligne
3dd     ← supprime 3 lignes
dw      ← supprime le mot
d$      ← supprime jusqu'à la fin de la ligne
yy      ← copie (yank) la ligne
3yy     ← copie 3 lignes
p       ← colle après le curseur
P       ← colle avant le curseur
u       ← undo (annuler)
Ctrl+r  ← redo (rétablir)
\`\`\`

### Recherche et remplacement

\`\`\`vim
/mot    ← recherche "mot" vers l'avant
?mot    ← recherche "mot" vers l'arrière
n       ← occurrence suivante
N       ← occurrence précédente
*       ← recherche le mot sous le curseur
:%s/ancien/nouveau/g     ← remplace toutes les occurrences
:%s/ancien/nouveau/gc    ← avec confirmation
:5,20s/ancien/nouveau/g  ← entre les lignes 5 et 20
\`\`\`

### Commandes fréquentes

\`\`\`vim
:w          ← sauvegarder
:q          ← quitter
:q!         ← quitter sans sauvegarder
:wq ou ZZ   ← sauvegarder et quitter
:e fichier  ← ouvrir un fichier
:sp fichier ← ouvrir en split horizontal
:vsp fichier ← ouvrir en split vertical
:!ls        ← exécuter une commande shell
:r!date     ← insérer la sortie d'une commande
:help       ← aide intégrée
\`\`\`

### Configuration rapide (.vimrc)

\`\`\`vim
" ~/.vimrc minimal
set number              " Affiche les numéros de ligne
set relativenumber      " Numéros relatifs
set tabstop=4           " Taille des tabulations
set shiftwidth=4        " Taille de l'indentation
set expandtab           " Convertit les tabs en espaces
set autoindent          " Indentation automatique
set hlsearch            " Surbrillance de la recherche
set incsearch           " Recherche incrémentale
syntax on               " Coloration syntaxique
set mouse=a             " Support de la souris
\`\`\`

## Fonctionnement interne

Vim suit la philosophie Unix : des commandes composables. La puissance vient des **opérateurs + mouvements** :

\`\`\`
    d   w     → supprime un mot
    c   $     → change jusqu'à la fin de ligne
    y   G     → copie jusqu'à la fin du fichier
    ^         opérateur    mouvement
\`\`\`

## Cas d'utilisation concrets

\`\`\`bash
# Scénario : éditer un fichier de config sur un serveur
ssh server
vim /etc/nginx/nginx.conf
/error_log         # Rechercher la directive
n                  # Aller à la suivante
cw                 # Changer le mot
/var/log/nginx/error.log  # Nouveau chemin
:wq                # Sauvegarder et quitter
\`\`\`

## Bonnes pratiques

1. Maîtrisez d'abord la navigation (hjkl, w, b, gg, G)
2. Utilisez \`vimtutor\` pour apprendre (30 min suffisent pour les bases)
3. Apprenez les combinaisons opérateur + mouvement (d, c, y)
4. Configurez un \`.vimrc\` minimal mais utile
5. Utilisez les nombres pour répéter : \`5dd\`, \`3p\`, \`10j\`
6. En entretien : sachez sortir de Vim (\`:q!\`)

## Pièges courants

1. Impossible de quitter Vim (classique des entretiens) : \`Échap\` → \`:q!\` → Entrée
2. Modifier sans être en mode insertion (les lettrès sont des commandes)
3. Oublier de sauvegarder avant de quitter (\`:q\` au lieu de \`:wq\`)
4. \`:q!\` ne sauvegarde pas les modifications (les pertes sont irrécupérables)
5. Coller du texte avec l'auto-indentation qui décale tout (utilisez \`:set paste\`)
6. Appuyer sur Ctrl+S (gel du terminal, débloquer avec Ctrl+Q)

Source : [Vim Documentation](https://www.vim.org/docs.php)`},
      ],
    },
  ],
};