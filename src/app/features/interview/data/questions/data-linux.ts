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
        
          deepDive: `# Essential Linux Commands

## Quest-ce que cest

Linux provides a powerful command-line interface that is essential for system administration, development, and DevOps work. The shell (bash or zsh) allows you to interact with the kernel through commands for file manipulation, process control, networking, and system monitoring.

## Syntaxe et exemples

\`\`\`bash
# File and directory operations
ls -la /home/user        # List all files including hidden
cd /var/log              # Change directory
pwd                      # Print working directory

# File content viewing
cat /etc/passwd          # Display file content
less /var/log/syslog     # Paginate large files
head -n 20 /etc/hosts    # First 20 lines
tail -f /var/log/auth.log # Follow log in real-time

# File creation and editing
touch newfile.txt        # Create empty file
mkdir -p /data/backups   # Create directory tree
cp file1.txt file2.txt    # Copy file
rm -i important.txt      # Remove with confirmation

# Search and filtering
grep -r "error" /var/log # Recursive search
find /home -name "*.log" # Find by name
wc -l filename           # Count lines
\`\`\`bash
ls -la /home/user
cd /var/log
grep -r "error" /var/log
\`\`\`

## Bonnes pratiques

1. Always use tab completion to avoid typos and speed up navigation
2. Check file permissions before executing scripts
3. Use \`--help\` or \`man\` pages when unsure about a command
4. Create aliases for frequently used complex commands in \`~/.bashrc\`
5. Always verify paths before using \`rm -rf\`

## Pieges courants

1. Accidentally running \`sudo rm -rf /\` when trying to delete a specific directory
2. Forgetting to quote paths with spaces: \`rm "my file.txt"\` not \`rm my file.txt\`
3. Using relative paths when absolute paths would be safer in scripts
4. Not checking disk space before large operations

Source : [Linux Documentation](https://www.kernel.org/doc/man-pages/)
`},
        {
          id: 'linux-2',
          question: 'Comment fonctionnent les permissions de fichiers sous Linux ?',
          answer: 'Chaque fichier a 3 types de droits : **`r`** (lecture), **`w`** (écriture), **`x`** (exécution), appliqués à 3 catégories : **propriétaire** (owner), **groupe** (group), **autres** (others). Affichés via `ls -l` : `-rwxr-xr--`.\n\n**`chmod`** modifie les droits : symbolique (`chmod u+x script.sh`) ou octal (`chmod 755 script.sh` = rwxr-xr-x). **`chown`** change le propriétaire : `chown user:group fichier`.\n\n__755 pour les exécutables/scripts, 644 pour les fichiers classiques, 600 pour les fichiers sensibles (clés SSH).__',
          code: '# Permissions octales\nchmod 755 script.sh   # rwxr-xr-x\nchmod 644 config.yml  # rw-r--r--\nchmod 600 id_rsa      # rw-------\n\n# Changement de propriétaire\nchown www-data:www-data /var/www/html\n\n# Notation symbolique\nchmod u+x,g-w,o-r file',
          language: 'bash',
        
          deepDive: `# Linux File Permissions

## Quest-ce que cest

Linux uses a permission model based on three entities (owner, group, others) and three permission types (read, write, execute). Every file and directory has an owner and a set of permissions that control who can access it. Special permission bits exist for setuid, setgid, and sticky bit scenarios.

## Syntaxe et exemples

\`\`\`bash
# Viewing permissions
ls -la /home/user/file.txt
# Output: -rw-r--r-- 1 user group 4096 May 21 10:00 file.txt

# Permission notation
# Owner: rwx (4+2+1 = 7)
# Group: r-x (4+0+1 = 5)
# Other: r-- (4+0+0 = 4)

# Changing permissions
chmod 755 script.sh       # rwxr-xr-x
chmod +x script.sh        # Add execute for all
chmod u+x script.sh        # Add execute for owner only

# Changing ownership
chown user:group file.txt # Change owner and group
chgrp group file.txt      # Change group only

# Special permissions
chmod 4755 executable     # Setuid bit (owner executes as root)
chmod 2755 directory      # Setgid bit (group inherits)
chmod 1777 /tmp           # Sticky bit (only owner can delete)
\`\`\`

## Bonnes pratiques

1. Use the principle of least privilege - only grant minimum necessary permissions
2. Prefer group permissions over world-readable files
3. Use numeric notation for precision and avoid ambiguity
4. Regularly audit sensitive directories with \`find / -perm -004\`
5. Set directories to 755 and files to 644 by default for new files

## Pieges courants

1. Setting 777 permissions (world writable) - major security risk
2. Accidentally removing execute permission from scripts
3. Not understanding the difference between symbolic and numeric chmod
4. Using \`chown\` on files you do not own (requires sudo)
5. Forgetting that permissions are inherited from parent directories

Source : [Linux File Permissions Guide](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)
`},
        {
          id: 'linux-3',
          question: 'Comment gérer les processus sous Linux ?',
          answer: '**`ps aux`** liste tous les processus. **`top`**/`htop` donne une vue temps réel (CPU, mémoire). **`kill <PID>`** envoie un signal (défaut : `SIGTERM` = arrêt propre). **`kill -9 <PID>`** = `SIGKILL` (arrêt forcé, impossible à intercepter).\n\n**`&`** lance en arrière-plan. **`nohup`** protège contre la déconnexionion SSH. **`jobs`** liste les processus du shell. **`fg`**/`bg` ramène/envoie en avant/arrière-plan.\n\n__Préférez toujours `SIGTERM` (kill) à `SIGKILL` (kill -9)`__ — le processus peut nettoyer ses ressources proprement.',
          code: 'ps aux | grep java       # chercher les processus java\nkill -15 1234            # SIGTERM (propre)\nkill -9 1234             # SIGKILL (forcé)\nnohup ./server.sh &      # exécuter en arrière-plan persistant',
          language: 'bash',
        
          deepDive: `# Managing Linux Processes

## Quest-ce que cest

Linux processes are instances of running programs. Each process has a PID (process ID), a parent process (PPID), and consumes system resources like CPU and memory. The kernel scheduler manages process execution, prioritizing based on nice values and scheduling policies. Processes can be in various states: running, sleeping, stopped, or zombie.

## Syntaxe et exemples

\`\`\`bash
# Listing processes
ps aux                    # All processes with details
ps -ef                    # Full format listing
top                       # Real-time process monitor
htop                      # Enhanced interactive viewer

# Process management
kill 1234                 # Terminate process by PID
kill -9 1234              # Force kill (SIGKILL)
kill -STOP 1234           # Suspend process
kill -CONT 1234           # Resume suspended process

# Job control
bg                         # Resume job in background
fg                         # Bring job to foreground
jobs                       # List background jobs
Ctrl+Z                     # Suspend current job

# Process information
pstree -p                  # Tree view of processes
lsof -p 1234               # Files opened by process
strace -p 1234             # Trace system calls

# Daemon management
systemctl start nginx      # Start service
systemctl stop nginx       # Stop service
systemctl restart nginx    # Restart service
systemctl status nginx     # Check status
\`\`\`

## Bonnes pratiques

1. Always try gentle termination (kill) before force kill (kill -9)
2. Use \`nohup\` or \`screen\` for long-running processes that must survive logout
3. Monitor resource usage with \`top\` or \`htop\` to identify runaway processes
4. Set appropriate nice values for batch jobs to avoid starving interactive processes
5. Use \`pkill\` with pattern matching for mass process termination when needed

## Pieges courants

1. Accidentally killing the wrong process (always double-check PID)
2. Not using \`nohup\` for background tasks that should survive terminal closure
3. Forgetting that child processes may continue running after parent terminates
4. Using \`kill -9\` as first resort instead of last resort
5. Not checking if a process is critical before terminating system services

Source : [Linux Process Management](https://man7.org/linux/man-pages/man1/ps.1.html)
`},
        {
          id: 'linux-4',
          question: 'Comment utiliser les pipes et la redirection ?',
          answer: '**Pipe** (`|`) : connecte la sortie d\'une commande à l\'entrée de la suivante. Exemple : `ps aux | grep nginx | wc -l` (compter les processus nginx).\n\n**Redirection** : `>` (écraser un fichier), `>>` (ajouter à la fin), `<` (entrée depuis un fichier), `2>` (rediriger stderr), `2>&1` (stderr vers stdout), `/dev/null` (poubelle).\n\n__Le pipe est la puissance d\'Unix : combiner des commandes simples pour des tâches complexes.__',
          code: '# Pipes\nps aux | grep java | awk \'{print $2}\'\ncat access.log | sort | uniq -c | sort -rn | head -10\n\n# Redirection\necho "log" >> app.log       # ajouter\ncommand 2> errors.log       # stderr vers fichier\ncommand > out.txt 2>&1     # stdout+stderr vers fichier\ncommand > /dev/null 2>&1   # tout supprimer',
          language: 'bash',
        
          deepDive: `# Pipes and Redirection in Linux

## Quest-ce que cest

Pipes (|) connect the stdout of one command to the stdin of another, creating data pipelines. Redirection operators (>, >>, <, 2>) control where input comes from and where output goes. File descriptors: stdin (0), stdout (1), stderr (2). This allows chaining commands to perform complex data transformations efficiently.

## Syntaxe et exemples

\`\`\`bash
# Pipes - chain commands
cat /var/log/syslog | grep "error" | head -n 20
ls -la | grep "\\.log$" | wc -l
ps aux | grep nginx | awk '{print $2}'

# Output redirection
command > output.txt      # Redirect stdout to file (overwrite)
command >> output.txt     # Append stdout to file
command 2> errors.txt     # Redirect stderr only
command &> all.txt        # Redirect both stdout and stderr

# Input redirection
command < input.txt       # Read from file instead of stdin
sort < unsorted.txt > sorted.txt

# Here documents and here strings
cat << EOF > file.txt
Multi-line
content here
EOF

# Advanced piping
# Tee - show output and also save to file
ps aux | tee processes.txt | grep root

# Xargs - build arguments from stdin
find /var/log -name "*.log" | xargs rm

# Process substitution
diff <(command1) <(command2)  # Compare outputs directly
\`\`\`

## Bonnes pratiques

1. Use pipes instead of temporary files for better performance and atomicity
2. Remember that pipes only pass stdout, not stderr - use \`2>&1\` to include errors
3. Use \`tee\` when you need to see output and save it simultaneously
4. Chain \`sort | uniq\` to eliminate duplicates from sorted data
5. Use \`xargs -I {}\` for complex substitutions in piped commands

## Pieges courants

1. Forgetting that \`>\` overwrites files - use \`>>\` when appending is needed
2. Not realizing that pipe order matters: \`grep error file.txt | head\` vs \`head file.txt | grep error\`
3. Using pipes with commands that do not support stdin (some interactive programs)
4. Forgetting to quote or escape special characters when they should not be interpreted by the shell
5. Pipeline subshells - variables set in a pipe are not available in the parent shell

Source : [Bash Redirection Guide](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
`},
        {
          id: 'linux-5',
          question: 'Comment fonctionne SSH ?',
          answer: '**SSH** (*Secure Shell*) permet une connexionion chiffrée à distance. Authentification par **mot de passe** (déconseillé) ou **clé publique/privée** (recommandé) : la clé privée reste sur votre machine, la clé publique est copiée sur le serveur via `ssh-copy-id`.\n\nConfiguration dans `~/.ssh/config` pour les raccourcis. Le fichier `~/.ssh/authorized_keys` sur le serveur liste les clés autorisées. **Port forwarding** : `ssh -L 8080:localhost:8080 user@server` (tunnel local).\n\n__Désactivez l\'authentification par mot de passe en production__ (`PasswordAuthentication no` dans `/etc/ssh/sshd_config`). Utilisez des clés **ED25519**.',
          code: '# Connexion\nssh user@192.168.1.10\nssh -i ~/.ssh/my_key user@host\n\n# Config raccourci (~/.ssh/config)\nHost myserver\n  HostName 192.168.1.10\n  User admin\n  IdentityFile ~/.ssh/my_key\n\n# Puis simplement\nssh myserver',
          language: 'bash',
        
          deepDive: `# SSH Protocol and Usage

## Quest-ce que cest

SSH (Secure Shell) provides encrypted remote access to Linux systems. It replaces insecure protocols like telnet and rlogin. SSH uses asymmetric encryption for key exchange, then symmetric encryption for the session. Authentication methods include passwords, SSH keys (public/private), and certificate-based auth.

## Syntaxe et exemples

\`\`\`bash
# Basic connection
ssh user@hostname.example.com
ssh -p 2222 user@hostname.example.com  # Custom port
ssh -i ~/.ssh/custom_key user@hostname  # Custom key

# Key generation and use
ssh-keygen -t ed25519 -C "your_email@example.com"  # Modern algorithm
ssh-keygen -t rsa -b 4096 -C "your_comment"
ssh-copy-id user@hostname.example.com  # Install public key

# Config file (~/.ssh/config)
Host myserver
    HostName server.example.com
    User admin
    Port 2222
    IdentityFile ~/.ssh/special_key
    ForwardAgent yes

# Tunnels and port forwarding
ssh -L 8080:localhost:80 user@webserver    # Local port forward
ssh -R 2222:localhost:22 user@gateway      # Remote port forward
ssh -D 1080 user@gateway                   # SOCKS proxy

# Execute remote commands
ssh user@host "df -h && free -m"
ssh user@host 'bash -s' < local_script.sh
\`\`\`

## Bonnes pratiques

1. Always use SSH key authentication instead of passwords - disable password auth in sshd_config
2. Use ed25519 keys (256 bits) instead of RSA for better security and performance
3. Protect your private key with a strong passphrase and never share it
4. Use the SSH config file for managing multiple connections cleanly
5. Rotate keys periodically and remove old keys from authorized_keys when people leave

## Pieges courants

1. Leaving the default port 22 open - use a non-standard port or fail2ban
2. Not setting proper permissions on ~/.ssh directory (700) and private keys (600)
3. Using the same key for multiple hosts - create dedicated keys per environment
4. Forgetting to add your public key to the remote server before expecting key-only login
5. Not using \`ssh-agent\` when managing multiple keys, leading to repeated passphrase prompts

Source : [OpenSSH Manual](https://www.man.openbsd.org/ssh.1)
`},
        {
          id: 'linux-6',
          question: 'Quelles commandes réseau connaître ?',
          answer: '**`curl`** : requêtes HTTP depuis le terminal (`curl -v https://api.example.com`). **`ping`** : teste la connectivité réseau. **`netstat`**/`ss` : liste les connexionions et ports en écoute (`ss -tlnp`). **`nslookup`**/`dig` : résolution DNS.\n\n**`traceroute`** : chemin réseau vers une destination. **`ip addr`** : adresses réseau. **`wget`** : téléchargement de fichiers.\n\n__En dev, `curl` et `ss` sont les plus utiles au quotidien__ — pour tester des APIs et vérifier les ports en écoute.',
          code: 'curl -X GET https://api.example.com/users\nping google.com\nss -tlnp              # ports en écoute\ndig example.com       # résolution DNS\nip addr show          # adresses réseau',
          language: 'bash',
        
          deepDive: `
# Quelles commandes reseau connaitre ?

## Quest-ce que cest

Network diagnostics commands help troubleshoot connectivity, view connections, capture packets, and monitor network interfaces on Linux systems.

## Syntaxe et exemples

### Connection Status

# netstat (deprecated, use ss)
netstat -tulnp           # Listening TCP/UDP ports
netstat -an              # All connections
netstat -r               # Routing table

# ss (modern alternative)
ss -tulnp                # Listening sockets
ss -tulnp | grep :80     # Filter by port
ss -state established    # Established connections

### Interface Configuration

ip addr show             # Show IP addresses
ip link set eth0 up       # Bring interface up
ip addr add 192.168.1.10/24 dev eth0   # Add IP
ip route show            # Show routing table

# Legacy (ifconfig)
ifconfig; ifconfig eth0

### Network Diagnostics

ping -c 4 8.8.8.8        # Ping with count
ping -i 0.5 host         # Ping every 0.5s
traceroute google.com    # Trace route
tracepath google.com     # Alternative traceroute

# DNS
dig example.com          # Full DNS query
nslookup example.com     # DNS lookup
host example.com         # Simple lookup
getent hosts example.com

### Packet Capture

# tcpdump (requires root)
tcpdump -i eth0                          # Capture on interface
tcpdump -i eth0 port 80                  # Filter by port
tcpdump -i eth0 host 192.168.1.1         # Filter by host
tcpdump -i eth0 -w capture.pcap          # Save to file
tcpdump -r capture.pcap                  # Read file

# nmap (port scanning)
nmap -sT localhost           # TCP scan
nmap -sU localhost           # UDP scan
nmap -sP 192.168.1.0/24      # Ping sweep
nmap -O remote-host         # OS detection
nmap -A remote-host          # Aggressive scan

### Testing and Curl

curl -v https://api.example.com           # Verbose request
curl -X POST -d '{"key":"value"}' https://api.example.com
curl -H "Authorization: Bearer token" https://api.example.com
wget -O output.html https://example.com

### Firewall (iptables)

iptables -L                          # List rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -j DROP

## Bonnes pratiques

- Use ss instead of netstat (ss is faster)
- Use tcpdump -n to avoid DNS lookups
- Filter early to reduce capture size
- Check firewall rules with iptables -L -n -v
- Use telnet or nc to test port connectivity
- Understand TIME_WAIT for socket debugging

## Pieges courants

- Forgetting sudo for privileged commands
- Capturing too much data causing disk issues
- Not using filters on high-traffic interfaces
- Ignoring UDP vs TCP differences
- Running nmap scans on unauthorized networks
- Confusing port vs interface in commands

## Sources

https://man7.org/linux/man-pages/man8/ss.8.html | https://man7.org/linux/man-pages/man8/tcpdump.1.html | https://nmap.org/book/man.html | https://www.tcpdump.org/pcap.html
`},
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
        
          deepDive: `
# Comment ecrire un script shell de base ?

## Quest-ce que cest

Shell scripting automates tasks in Unix/Linux. The script is interpreted by a shell (bash being most common) and executes commands sequentially.

## Syntaxe et exemples

### Basic Script Structure

#!/bin/bash
# My first script

echo "Hello, World!"
date

### Variables

name="Alice"                    # No spaces around =
echo "Hello, $name"            # Variable expansion
echo 'Hello, \${name}!'        # Brace notation

# Command substitution
current_date=$(date)
files=$(ls -1)

echo "Date: $current_date"

### Conditionals

if [ "$name" = "Alice" ]; then
    echo "Welcome, Alice"
elif [ "$name" = "Bob" ]; then
    echo "Hello, Bob"
else
    echo "Unknown user"
fi

# Numeric comparison
if [ $count -gt 10 ]; then
    echo "Count is greater than 10"
fi

# File test
if [ -f "file.txt" ]; then
    echo "File exists"
fi

### Loops

# For loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# For loop with glob
for file in *.txt; do
    echo "Processing $file"
done

# While loop
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

### Functions

greet() {
    local name="$1"    # First argument
    echo "Hello, $name!"
}

greet "World"

### Arguments

$0      # Script name
$1      # First argument
$#      # Number of arguments
$@      # All arguments

if [ $# -eq 0 ]; then
    echo "Usage: $0 <name>"
    exit 1
fi

### Input/Output

read -p "Enter your name: " name
read -s -p "Enter password: " password
echo ""

echo "Name: $name" > output.txt
echo "Append" >> output.txt

### Making Executable

chmod +x myscript.sh
./myscript.sh

## Bonnes pratiques

- Always use #!/bin/bash (or #!/usr/bin/env bash)
- Quote variables to handle spaces: "$variable"
- Use set -e to exit on error
- Use set -u to error on undefined variables
- Use descriptive variable and function names
- Add comments explaining non-obvious logic
- Check shellcheck for issues

## Pieges courants

- Spaces around = in assignments: var = "value" fails
- Not quoting variables containing spaces
- Forgetting to make script executable
- Using bash-isms in sh
- Not handling edge cases (empty variables)
- Redirecting stdout and stderr incorrectly

## Sources

https://www.gnu.org/software/bash/manual/html_node/index.html | https://www.shellcheck.net/ | https://tldp.org/LDP/abs/html/ | https://www.cyberciti.biz/howto/
`},
        {
          id: 'linux-8',
          question: 'Comment utiliser les gestionnaires de paquets ?',
          answer: '**Debian/Ubuntu** : `apt` — `apt update` (rafraîchir les sources), `apt install nginx` (installer), `apt remove nginx` (supprimer), `apt upgrade` (mettre à jour).\n\n**RHEL/CentOS** : `yum` (ancien) ou `dnf` (nouveau) — commandes similaires. Les paquets sont signés et vérifiés. Les dépôts officiels garantissent la stabilité.\n\n__Règle : ne jamais installer de paquets non vérifiés.__ Préférez les dépôts officiels. Pour des versions récentes, utilisez les PPA (Ubuntu) ou les dépôts officiels de l\'éditeur.',
          code: '# Debian/Ubuntu\nsudo apt update && sudo apt upgrade\nsudo apt install nginx\nsudo apt remove nginx\napt list --installed\n\n# RHEL/CentOS\nsudo dnf install nginx\nsudo dnf remove nginx',
          language: 'bash',
        
          deepDive: `
# Comment utiliser les gestionnaires de paquets ?

## Quest-ce que cest

Package managers install, update, and remove software packages on Linux systems. Different distributions use different package managers and formats (deb, rpm, etc.).

## Syntaxe et exemples

### APT (Debian/Ubuntu)

apt update                        # Update package lists
apt upgrade                      # Upgrade all packages
apt install nginx                # Install package
apt remove nginx                 # Remove package (keep config)
apt purge nginx                   # Remove package and config
apt search nginx                 # Search for package
apt show nginx                   # Show package info
apt list --installed             # List installed packages
apt autoclean                    # Remove old cached packages
apt autoremove                  # Remove unused dependencies

### YUM/DNF (RHEL/CentOS/Fedora)

yum update                       # Update all packages
yum install nginx                # Install package
yum remove nginx                 # Remove package
yum search nginx                 # Search packages
yum info nginx                  # Show package info
yum list installed               # List installed
yum clean all                    # Clean cache

# DNF is the modern replacement for YUM
dnf install nginx

### Pacman (Arch Linux)

pacman -Syu                      # Sync and update
pacman -S nginx                  # Install package
pacman -R nginx                  # Remove package
pacman -Ss nginx                 # Search packages
pacman -Qi nginx                 # Package info
pacman -Qdt                      # List orphans

### Zypper (SUSE)

zypper install nginx
zypper remove nginx
zypper search nginx
zypper update

### Snap and Flatpak (Universal)

# Snap
snap install --classic code     # Install VS Code
snap list                        # List installed snaps
snap remove code                 # Remove snap
snap refresh                     # Update snaps

# Flatpak
flatpak install flathub org.mozilla.firefox
flatpak list
flatpak update

### Examples with Version pinning

# Pin a specific version (APT)
apt install nginx=1.18.0*

# Hold package at current version
apt-mark hold nginx
apt-mark unhold nginx

### Working with .deb/.rpm directly

# Debian packages
dpkg -i package.deb              # Install .deb
dpkg -r package-name              # Remove
dpkg -l                           # List installed

# RPM packages
rpm -ivh package.rpm             # Install
rpm -e package-name               # Remove
rpm -qa                           # Query all

## Bonnes pratiques

- Always run update before install
- Use apt instead of apt-get (more user-friendly)
- Clean cache periodically: apt clean
- Check package integrity with debsums (deb) or rpm -Va (rpm)
- Review dependencies before installing
- Use --dry-run to preview changes

## Pieges courants

- Forgetting to update package lists before installing
- Mixing package managers (apt on Arch, etc.)
- Installing .deb on RPM system without conversion
- Ignoring held/backported packages
- Not cleaning old kernels (Ubuntu)
- Using sudo for packages that need it

## Sources

https://help.ubuntu.com/community/AptGet/Howto | https://dnf.readthedocs.io/en/latest/index.html | https://wiki.archlinux.org/title/Pacman | https://snapcraft.io/docs
`},
        {
          id: 'linux-9',
          question: 'Qu\'est-ce que systemd et comment l\'utiliser ?',
          answer: '**`systemd`** est le système d\'init par défaut sur la plupart des distributions Linux. Il gère les **services** (daemons) via des fichiers **unit** (`/etc/systemd/system/mon-service.service`).\n\nCommandes : `systemctl start/stop/restart mon-service`, `systemctl status mon-service`, `systemctl enable mon-service` (démarrage auto au boot), `journalctl -u mon-service` (logs du service).\n\n__Pour toute application en production, créez un service systemd__ — ça assure le démarrage automatique, le restart en cas de crash, et la gestion des logs.',
          code: '# /etc/systemd/system/app.service\n[Unit]\nDescription=My App\nAfter=network.target\n\n[Service]\nExecStart=/opt/app/start.sh\nRestart=on-failure\nUser=appuser\nEnvironment=JAVA_HOME=/usr/lib/jvm/java-17\n\n[Install]\nWantedBy=multi-user.target\n\n# Activation\nsudo systemctl daemon-reload\nsudo systemctl enable app\nsudo systemctl start app',
          language: 'ini',
        
          deepDive: `
# Qu'est-ce que systemd et comment l'utiliser ?

## Quest-ce que cest

Systemd is the init system and service manager for most Linux distributions. It provides parallel startup, socket activation, and dependency-based service control.

## Syntaxe et exemples

### Basic Unit Files

[Unit]
Description=My Application
After=network.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/opt/myapp/server
ExecStop=/opt/myapp/stop.sh
Restart=on-failure
RestartSec=5
User=myapp

[Install]
WantedBy=multi-user.target

### Managing Services

systemctl start myapp.service        # Start service
systemctl stop myapp.service         # Stop service
systemctl restart myapp.service      # Restart service
systemctl reload myapp.service       # Reload config
systemctl status myapp.service       # Show status
systemctl enable myapp.service       # Enable at boot
systemctl disable myapp.service      # Disable at boot
systemctl is-enabled myapp.service   # Check if enabled
systemctl daemon-reload              # Reload systemd config

### Viewing Logs

journalctl -u myapp.service          # Service logs
journalctl -u myapp.service -f       # Follow logs
journalctl -u myapp.service --since "1 hour ago"
journalctl -xe                        # System logs
journalctl --disk-usage               # Log size
journalctl --vacuum-time=7d          # Clean old logs

### System Commands

systemctl poweroff                    # Power down
systemctl reboot                      # Reboot
systemctl halt                        # Halt
systemctl emergency                   # Emergency mode
systemctl isolate multi-user.target   # Change target

systemctl list-dependencies myapp.service
systemctl list-units --type=service
systemctl cat myapp.service           # Show unit file

### Targets

systemctl list-units --type=target
systemctl get-default                 # Default target
systemctl set-default graphical.target
systemctl isolate multi-user.target

### Timer Units (cron alternative)

[Unit]
Description=Daily backup

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target

[Service]
Type=oneshot
ExecStart=/opt/backup.sh

## Bonnes pratiques

- Use Type=simple for foreground services
- Always specify Restart policy
- Use WantedBy=multi-user.target unless GUI needed
- Run services as non-root user
- Place custom units in /etc/systemd/system/
- Use timers instead of cron for important tasks
- Test with systemctl start before enable

## Pieges courants

- Forgetting systemctl daemon-reload after editing unit
- Not specifying correct Type (simple vs forking)
- Missing dependencies causing startup failures
- Not using ExecStartPre for validation
- Assuming service starts without checking status
- Editing /usr/lib/systemd directly (use override)

## Sources

https://www.freedesktop.org/software/systemd/man/systemd.service.html | https://www.freedesktop.org/software/systemd/man/systemd.timer.html | https://wiki.archlinux.org/title/Systemd | https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units
`},
        {
          id: 'linux-10',
          question: 'Comment configurer des cron jobs ?',
          answer: '**`cron`** exécute des tâches planifiées. Éditer avec `crontab -e`. Syntaxe : `min heure jour mois jour-semaine commande`. Exemples : `0 2 * * * /opt/backup.sh` (tous les jours à 2h), `*/5 * * * * /opt/check.sh` (toutes les 5 min).\n\nLes logs vont dans `/var/log/syslog` ou sont redirigés dans la commande. Toujours utiliser des **chemins absolus** dans les cron jobs (le PATH est minimal).\n\n__Astuce : redirigez toujours les sorties__ (`>> /var/log/backup.log 2>&1`), sinon cron envoie un mail root à chaque exécution.',
          code: '# Crontab\n* * * * *     # chaque minute\n*/5 * * * *   # toutes les 5 minutes\n0 2 * * *     # chaque jour à 2h00\n0 0 * * 0     # chaque dimanche minuit\n0 0 1 * *     # chaque 1er du mois\n\n# Exemples pratiques\n0 2 * * * /opt/backup.sh >> /var/log/backup.log 2>&1\n*/10 * * * * /opt/health-check.sh',
          language: 'bash',
        
          deepDive: `
# Comment configurer des cron jobs ?

## Quest-ce que cest

Cron is a time-based job scheduler in Unix-like systems. Jobs are defined in crontab (cron table) files with syntax specifying minute, hour, day, month, and weekday.

## Syntaxe et exemples

### Crontab Format

# +---------------- minute (0-59)
# |  +------------- hour (0-23)
# |  |  +---------- day of month (1-31)
# |  |  |  +------- month (1-12)
# |  |  |  |  +---- day of week (0-6, Sunday=0)
# |  |  |  |  |
*  *  *  *  *  command

### Examples

# Run every day at 3am
0 3 * * * /backup.sh

# Run every Monday at 9am
0 9 * * 1 /scripts/weekly-report.sh

# Run every 15 minutes
*/15 * * * * /monitoring/check.sh

# Run on 1st of every month at midnight
0 0 1 * * /scripts/monthly-cleanup.sh

# Run every weekday at 6pm
0 18 * * 1-5 /scripts/end-of-day.sh

### System Cron (/etc/cron.d)

# /etc/cron.d/backup-job
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

0 2 * * * root /opt/backup/backup.sh

### Special Strings

@reboot    # Run once at startup
@yearly    # Run once a year (0 0 1 1 *)
@monthly   # Run once a month (0 0 1 * *)
@weekly    # Run once a week (0 0 * * 0)
@daily     # Run once a day (0 0 * * *)
@hourly    # Run once an hour (0 * * * *)

### Managing Crontab

crontab -l           # List current user crontab
crontab -e           # Edit current user crontab
crontab -r           # Remove current user crontab
crontab -u user -l   # List specific user crontab

## Bonnes pratiques

- Use absolute paths in commands
- Redirect output to log files: 0 3 * * * /script.sh >> /var/log/script.log 2>&1
- Set PATH explicitly at the top of crontab
- Use environment variables for repeated values
- Test scripts manually before adding to cron
- Lock files to prevent overlapping runs

## Pieges courants

- Assuming home directory or PATH is set
- Missing newline at end of crontab
- Script permissions not executable
- Not handling overlapping job executions
- Hardcoded paths that differ from cron environment
- Forgetting to check spam/junk for email reports

## Sources

https://www.gnu.org/software/mcron/manual/html_node/index.html | https://man7.org/linux/man-pages/man5/crontab.5.html | https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux/
`},
        {
          id: 'linux-11',
          question: 'Comment gérer les variables d\'environnement ?',
          answer: 'Les **variables d\'environnement** configurent le comportement des programmes. Définir : `export DB_HOST=localhost`. Afficher : `echo $DB_HOST` ou `env` (toutes les variables). Supprimer : `unset DB_HOST`.\n\n**Persistance** : `~/.bashrc` ou `~/.zshrc` (utilisateur), `/etc/environment` (système), `.env` (par projet). Pour systemd : directive `Environment=` ou `EnvironmentFile=`.\n\n__Ne mettez jamais de secrets en clair dans les fichiers de config__ — utilisez un vault (`HashiCorp Vault`, AWS Secrets Manager) ou au minimum des permissions restrictives (`chmod 600`).',
          code: '# Session courante\nexport DB_HOST=localhost\nexport API_KEY=secret123\n\n# Persistance (~/.bashrc)\necho \'export DB_HOST=localhost\' >> ~/.bashrc\nsource ~/.bashrc\n\n# Vérifier\nenv | grep DB_HOST\necho $DB_HOST',
          language: 'bash',
        
          deepDive: `
# Comment gerer les variables d'environnement ?

## Quest-ce que cest

Environment variables are key-value pairs that affect process behavior and configuration. They are inherited by child processes and used to configure shells, applications, and system behavior.

## Syntaxe et exemples

### View Variables

printenv                 # List all environment variables
printenv HOME            # View specific variable
echo $HOME               # Using echo
env                      # List all (sorted)

### Temporary Setting (Session)

export DB_HOST=localhost
export DB_PORT=5432

### Persistently (User)

# Add to ~/.bashrc or ~/.profile
export JAVA_HOME=/usr/lib/jvm/java-17
export PATH=$PATH:/opt/myapp/bin
export EDITOR=vim

# Apply immediately (current session)
source ~/.bashrc

### System-wide (All Users)

# /etc/environment
JAVA_HOME=/usr/lib/jvm/java-17
DB_HOST=db.example.com

# /etc/profile.d/*.sh
#!/bin/bash
export APP_ENV=production

### Docker/Containers

# Dockerfile
ENV NODE_ENV=production
ENV PORT=8080

# docker run
docker run -e DB_HOST=localhost -e API_KEY=secret myapp

# docker-compose.yml
environment:
  - DB_HOST=localhost
  - DB_HOST: \${DB_HOST}

### Kubernetes

apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
---
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
stringData:
  DB_PASSWORD: "supersecret"

### Process Environment (Node.js/Go/Java)

// Node.js
console.log(process.env.NODE_ENV);

// Go
os.Getenv("DB_HOST");

// Java
System.getenv("DB_HOST");

## Bonnes pratiques

- Never commit secrets to version control
- Use .env.example for documentation (without real values)
- Separate config from code (12-factor methodology)
- Use Vault or cloud secrets manager for production
- Prefix variables clearly: APP_*, DB_*, API_*
- Document all required environment variables

## Pieges courants

- Hardcoding secrets in Docker images
- Exposing secrets in logs or error messages
- Not validating required env vars at startup
- Using wrong variable names (case sensitivity)
- Overriding production vars with local defaults
- Leaving .env files in git history

## Sources

https://www.gnu.org/software/bash/manual/html_node/Environment.html | https://12factor.net/config | https://docs.docker.com/engine/reference/commandline/run/#env | https://kubernetes.io/docs/tasks/inject-data-application/
`},
        {
          id: 'linux-12',
          question: 'Les bases de vim pour survivre en entretien ?',
          answer: '**`vim`** a 3 modes : **Normal** (navigation/commandes), **Insertion** (édition), **Ligne de commande** (sauvegarde/quitter). Entrer en insertion : `i` (avant curseur), `a` (après), `o` (nouvelle ligne dessous). Revenir en normal : `Échap`.\n\nCommandes essentielles : `:w` (sauvegarder), `:q` (quitter), `:wq` ou `ZZ` (sauver+quitter), `:q!` (quitter sans sauver). Navigation : `gg` (début), `G` (fin), `/mot` (rechercher), `n` (suivant). Supprimer : `dd` (ligne), `x` (caractère).\n\n__Si vous êtes bloqué dans vim : appuyez sur Échap, puis tapez `:q!` et Entrée.__ C\'est la question piège classique en entretien.',
          code: '# Modes\ni      → mode insertion\nÉchap  → mode normal\n:      → mode commande\n\n# Sauvegarder/Quitter\n:w     → sauvegarder\n:q     → quitter\n:q!    → quitter sans sauver\n:wq    → sauver et quitter\n\n# Navigation\ngg     → début du fichier\nG      → fin du fichier\n/mot   → rechercher\nn      → occurrence suivante',
          language: 'vim',
        
          deepDive: `
# Les bases de vim pour survivre en entretien

## Quest-ce que cest

Vim is a modal text editor with modes for navigation, editing, and command execution. It is available on virtually all Unix systems and is essential for developers.

## Syntaxe et exemples

### Modes

i       # Insert mode (before cursor)
a       # Append mode (after cursor)
I       # Insert at beginning of line
A       # Append at end of line
o       # New line below
O       # New line above
esc     # Return to Normal mode
:       # Command mode

### Basic Navigation (Normal mode)

h       # Left
j       # Down
k       # Up
l       # Right
w       # Next word start
b       # Previous word start
0       # Beginning of line
$       # End of line
gg      # First line
G       # Last line
5j      # Down 5 lines
5k      # Up 5 lines

### Search

/text       # Search forward for text
?text       # Search backward
n           # Next match
N           # Previous match
*           # Search for word under cursor
:%s/old/new/g    # Replace all old with new

### Editing

x         # Delete character
dd        # Delete line
dw        # Delete word
d$        # Delete to end of line
yy        # Yank (copy) line
p         # Paste below
P         # Paste above
u         # Undo
ctrl+r    # Redo
.         # Repeat last command

### File Operations

:w        # Save
:wq       # Save and quit
:q!       # Quit without saving
:x        # Save and quit (same as :wq)
:e file   # Open file
:sp file  # Split horizontally
:vsp file # Split vertically

### Visual Mode

v         # Character visual mode
V         # Line visual mode
ctrl+v    # Block visual mode
y         # Yank selection
d         # Delete selection
>         # Indent
<         # Unindent

### Useful Commands

:set number      # Show line numbers
:set paste       # Paste without auto-indent
ctrl+w w         # Switch windows
:make            # Run make
:!cmd            # Run shell command
:r!cmd           # Insert command output

## Bonnes pratiques

- Master basic navigation before learning advanced features
- Use hjkl instead of arrows for efficiency
- Learn to use registers (qa to record, @a to play)
- Use :set relativenumber for better navigation
- Configure .vimrc with essential settings
- Practice with vimtutor (run: vimtutor)

## Pieges courants

- Forgetting Esc to exit insert mode
- Accidentally entering visual mode instead of normal
- Not saving before quit (:q! vs :wq)
- Using arrow keys instead of hjk
- Making changes in wrong mode
- Losing unsaved changes

## Sources

https://www.vim.org/docs.php | https://missing.csail.mit.edu/editor/vim/ | https://neovim.io/doc/user/ | https://github.com/mhinz/vim-galore
`},
      ],
    },
  ],
};