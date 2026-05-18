import type { InterviewCategory } from '../models/interview.models';

export const linuxCategory: InterviewCategory = {
  id: 'linux',
  title: 'Linux',
  color: 'bg-yellow-100 text-yellow-700',
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
          code: '# Navigation\nls -la          # liste détaillée avec fichiers cachés\ncd /var/log     # aller dans /var/log\npwd             # afficher le chemin courant\n\n# Recherche\nfind / -name "*.conf" 2>/dev/null\ngrep -r "ERROR" /var/log/ --include="*.log"',
          language: 'bash',
        },
        {
          id: 'linux-2',
          question: 'Comment fonctionnent les permissions de fichiers sous Linux ?',
          answer: 'Chaque fichier a 3 types de droits : **`r`** (lecture), **`w`** (écriture), **`x`** (exécution), appliqués à 3 catégories : **propriétaire** (owner), **groupe** (group), **autres** (others). Affichés via `ls -l` : `-rwxr-xr--`.\n\n**`chmod`** modifie les droits : symbolique (`chmod u+x script.sh`) ou octal (`chmod 755 script.sh` = rwxr-xr-x). **`chown`** change le propriétaire : `chown user:group fichier`.\n\n__755 pour les exécutables/scripts, 644 pour les fichiers classiques, 600 pour les fichiers sensibles (clés SSH).__',
          code: '# Permissions octales\nchmod 755 script.sh   # rwxr-xr-x\nchmod 644 config.yml  # rw-r--r--\nchmod 600 id_rsa      # rw-------\n\n# Changement de propriétaire\nchown www-data:www-data /var/www/html\n\n# Notation symbolique\nchmod u+x,g-w,o-r file',
          language: 'bash',
        },
        {
          id: 'linux-3',
          question: 'Comment gérer les processus sous Linux ?',
          answer: '**`ps aux`** liste tous les processus. **`top`**/`htop` donne une vue temps réel (CPU, mémoire). **`kill <PID>`** envoie un signal (défaut : `SIGTERM` = arrêt propre). **`kill -9 <PID>`** = `SIGKILL` (arrêt forcé, impossible à intercepter).\n\n**`&`** lance en arrière-plan. **`nohup`** protège contre la déconnexion SSH. **`jobs`** liste les processus du shell. **`fg`**/`bg` ramène/envoie en avant/arrière-plan.\n\n__Préférez toujours `SIGTERM` (kill) à `SIGKILL` (kill -9)`__ — le processus peut nettoyer ses ressources proprement.',
          code: 'ps aux | grep java       # chercher les processus java\nkill -15 1234            # SIGTERM (propre)\nkill -9 1234             # SIGKILL (forcé)\nnohup ./server.sh &      # exécuter en arrière-plan persistant',
          language: 'bash',
        },
        {
          id: 'linux-4',
          question: 'Comment utiliser les pipes et la redirection ?',
          answer: '**Pipe** (`|`) : connecte la sortie d\'une commande à l\'entrée de la suivante. Exemple : `ps aux | grep nginx | wc -l` (compter les processus nginx).\n\n**Redirection** : `>` (écraser un fichier), `>>` (ajouter à la fin), `<` (entrée depuis un fichier), `2>` (rediriger stderr), `2>&1` (stderr vers stdout), `/dev/null` (poubelle).\n\n__Le pipe est la puissance d\'Unix : combiner des commandes simples pour des tâches complexes.__',
          code: '# Pipes\nps aux | grep java | awk \'{print $2}\'\ncat access.log | sort | uniq -c | sort -rn | head -10\n\n# Redirection\necho "log" >> app.log       # ajouter\ncommand 2> errors.log       # stderr vers fichier\ncommand > out.txt 2>&1     # stdout+stderr vers fichier\ncommand > /dev/null 2>&1   # tout supprimer',
          language: 'bash',
        },
        {
          id: 'linux-5',
          question: 'Comment fonctionne SSH ?',
          answer: '**SSH** (*Secure Shell*) permet une connexion chiffrée à distance. Authentification par **mot de passe** (déconseillé) ou **clé publique/privée** (recommandé) : la clé privée reste sur votre machine, la clé publique est copiée sur le serveur via `ssh-copy-id`.\n\nConfiguration dans `~/.ssh/config` pour les raccourcis. Le fichier `~/.ssh/authorized_keys` sur le serveur liste les clés autorisées. **Port forwarding** : `ssh -L 8080:localhost:8080 user@server` (tunnel local).\n\n__Désactivez l\'authentification par mot de passe en production__ (`PasswordAuthentication no` dans `/etc/ssh/sshd_config`). Utilisez des clés **ED25519**.',
          code: '# Connexion\nssh user@192.168.1.10\nssh -i ~/.ssh/my_key user@host\n\n# Config raccourci (~/.ssh/config)\nHost myserver\n  HostName 192.168.1.10\n  User admin\n  IdentityFile ~/.ssh/my_key\n\n# Puis simplement\nssh myserver',
          language: 'bash',
        },
        {
          id: 'linux-6',
          question: 'Quelles commandes réseau connaître ?',
          answer: '**`curl`** : requêtes HTTP depuis le terminal (`curl -v https://api.example.com`). **`ping`** : teste la connectivité réseau. **`netstat`**/`ss` : liste les connexions et ports en écoute (`ss -tlnp`). **`nslookup`**/`dig` : résolution DNS.\n\n**`traceroute`** : chemin réseau vers une destination. **`ip addr`** : adresses réseau. **`wget`** : téléchargement de fichiers.\n\n__En dev, `curl` et `ss` sont les plus utiles au quotidien__ — pour tester des APIs et vérifier les ports en écoute.',
          code: 'curl -X GET https://api.example.com/users\nping google.com\nss -tlnp              # ports en écoute\ndig example.com       # résolution DNS\nip addr show          # adresses réseau',
          language: 'bash',
        },
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
        },
        {
          id: 'linux-8',
          question: 'Comment utiliser les gestionnaires de paquets ?',
          answer: '**Debian/Ubuntu** : `apt` — `apt update` (rafraîchir les sources), `apt install nginx` (installer), `apt remove nginx` (supprimer), `apt upgrade` (mettre à jour).\n\n**RHEL/CentOS** : `yum` (ancien) ou `dnf` (nouveau) — commandes similaires. Les paquets sont signés et vérifiés. Les dépôts officiels garantissent la stabilité.\n\n__Règle : ne jamais installer de paquets non vérifiés.__ Préférez les dépôts officiels. Pour des versions récentes, utilisez les PPA (Ubuntu) ou les dépôts officiels de l\'éditeur.',
          code: '# Debian/Ubuntu\nsudo apt update && sudo apt upgrade\nsudo apt install nginx\nsudo apt remove nginx\napt list --installed\n\n# RHEL/CentOS\nsudo dnf install nginx\nsudo dnf remove nginx',
          language: 'bash',
        },
        {
          id: 'linux-9',
          question: 'Qu\'est-ce que systemd et comment l\'utiliser ?',
          answer: '**`systemd`** est le système d\'init par défaut sur la plupart des distributions Linux. Il gère les **services** (daemons) via des fichiers **unit** (`/etc/systemd/system/mon-service.service`).\n\nCommandes : `systemctl start/stop/restart mon-service`, `systemctl status mon-service`, `systemctl enable mon-service` (démarrage auto au boot), `journalctl -u mon-service` (logs du service).\n\n__Pour toute application en production, créez un service systemd__ — ça assure le démarrage automatique, le restart en cas de crash, et la gestion des logs.',
          code: '# /etc/systemd/system/app.service\n[Unit]\nDescription=My App\nAfter=network.target\n\n[Service]\nExecStart=/opt/app/start.sh\nRestart=on-failure\nUser=appuser\nEnvironment=JAVA_HOME=/usr/lib/jvm/java-17\n\n[Install]\nWantedBy=multi-user.target\n\n# Activation\nsudo systemctl daemon-reload\nsudo systemctl enable app\nsudo systemctl start app',
          language: 'ini',
        },
        {
          id: 'linux-10',
          question: 'Comment configurer des cron jobs ?',
          answer: '**`cron`** exécute des tâches planifiées. Éditer avec `crontab -e`. Syntaxe : `min heure jour mois jour-semaine commande`. Exemples : `0 2 * * * /opt/backup.sh` (tous les jours à 2h), `*/5 * * * * /opt/check.sh` (toutes les 5 min).\n\nLes logs vont dans `/var/log/syslog` ou sont redirigés dans la commande. Toujours utiliser des **chemins absolus** dans les cron jobs (le PATH est minimal).\n\n__Astuce : redirigez toujours les sorties__ (`>> /var/log/backup.log 2>&1`), sinon cron envoie un mail root à chaque exécution.',
          code: '# Crontab\n* * * * *     # chaque minute\n*/5 * * * *   # toutes les 5 minutes\n0 2 * * *     # chaque jour à 2h00\n0 0 * * 0     # chaque dimanche minuit\n0 0 1 * *     # chaque 1er du mois\n\n# Exemples pratiques\n0 2 * * * /opt/backup.sh >> /var/log/backup.log 2>&1\n*/10 * * * * /opt/health-check.sh',
          language: 'bash',
        },
        {
          id: 'linux-11',
          question: 'Comment gérer les variables d\'environnement ?',
          answer: 'Les **variables d\'environnement** configurent le comportement des programmes. Définir : `export DB_HOST=localhost`. Afficher : `echo $DB_HOST` ou `env` (toutes les variables). Supprimer : `unset DB_HOST`.\n\n**Persistance** : `~/.bashrc` ou `~/.zshrc` (utilisateur), `/etc/environment` (système), `.env` (par projet). Pour systemd : directive `Environment=` ou `EnvironmentFile=`.\n\n__Ne mettez jamais de secrets en clair dans les fichiers de config__ — utilisez un vault (`HashiCorp Vault`, AWS Secrets Manager) ou au minimum des permissions restrictives (`chmod 600`).',
          code: '# Session courante\nexport DB_HOST=localhost\nexport API_KEY=secret123\n\n# Persistance (~/.bashrc)\necho \'export DB_HOST=localhost\' >> ~/.bashrc\nsource ~/.bashrc\n\n# Vérifier\nenv | grep DB_HOST\necho $DB_HOST',
          language: 'bash',
        },
        {
          id: 'linux-12',
          question: 'Les bases de vim pour survivre en entretien ?',
          answer: '**`vim`** a 3 modes : **Normal** (navigation/commandes), **Insertion** (édition), **Ligne de commande** (sauvegarde/quitter). Entrer en insertion : `i` (avant curseur), `a` (après), `o` (nouvelle ligne dessous). Revenir en normal : `Échap`.\n\nCommandes essentielles : `:w` (sauvegarder), `:q` (quitter), `:wq` ou `ZZ` (sauver+quitter), `:q!` (quitter sans sauver). Navigation : `gg` (début), `G` (fin), `/mot` (rechercher), `n` (suivant). Supprimer : `dd` (ligne), `x` (caractère).\n\n__Si vous êtes bloqué dans vim : appuyez sur Échap, puis tapez `:q!` et Entrée.__ C\'est la question piège classique en entretien.',
          code: '# Modes\ni      → mode insertion\nÉchap  → mode normal\n:      → mode commande\n\n# Sauvegarder/Quitter\n:w     → sauvegarder\n:q     → quitter\n:q!    → quitter sans sauver\n:wq    → sauver et quitter\n\n# Navigation\ngg     → début du fichier\nG      → fin du fichier\n/mot   → rechercher\nn      → occurrence suivante',
          language: 'vim',
        },
      ],
    },
  ],
};