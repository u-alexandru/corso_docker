# Dockerfile

- Dockerfile puo creare immagini in modo automatico leggendo le istruzioni da un file di testo in formato yaml.
- Dockerfile contiene una serie di istruzioni che vengono eseguite sequenzialmente per creare un'immagine.

### Esempio di Dockerfile
```Dockerfile
# Usa un'immagine di Python 2.7 come base
FROM python:2.7-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file corrente nella directory di lavoro
COPY . /app

# Installa le dipendenze

RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Fa esporre la porta 80

EXPOSE 80

# Definisce la variabile d'ambiente

ENV NAME World

# Esegue l'applicazione

CMD ["python", "app.py"]
```

### Istruzioni Dockerfile
- FROM: Specifica l'immagine di base da cui iniziare
> L'istruzione FROM specifica l'immagine di base da cui iniziare la costruzione di un nuovo livello e impostare l'immagine di base per le istruzioni successive.
> Un Dockerfile valido deve iniziare con un'istruzione FROM apparte del istruzione ARG che puo essere usata per definire variabili che possono essere usate in FROM.
> ```Dockerfile 
> ARG node_version=10
> FROM node:${node_version}
>```
> Da tenere in considerazione che l'istruzione ARG usata prima del primo FROM non puo essere usata per definire variabili d'ambiente, e quindi usarla nel build stage, a meno che essa non sia ridichiarata dopo il primo FROM.
> ```Dockerfile
> ARG VERSION=latest
> FROM busybox:$VERSION
> ARG VERSION
> RUN echo $VERSION > image_version
>```
>
> #### Multi-stage builds
> FROM puo essere usato piu volte in un Dockerfile per creare immagini multi-stage.
> ```Dockerfile
> FROM node:10 AS build
> WORKDIR /app
> COPY package.json .
> RUN npm install
> COPY . .
> RUN npm run build
> 
> FROM nginx:alpine
> COPY --from=build /app/dist /usr/share/nginx/html
> ```
> In questo esempio, la prima fase del Dockerfile usa un'immagine di node per creare un'immagine di build. La seconda fase usa un'immagine di nginx per creare un'immagine finale che copia i file dalla fase di build.
> COPY non e limitato a copiare file da una fase di build all'altra, ma puo essere usato per copiare file da qualsiasi immagine.
- LABEL: Aggiunge metadati all'immagine
> L'istruzione LABEL aggiunge metadati all'immagine. Un'etichetta e una coppia chiave-valore.
> ```Dockerfile
> LABEL "com.example.vendor"="ACME Incorporated"
> LABEL com.example.label-with-value="foo"
> LABEL version="1.0"
> LABEL description="Questo dimostra \
> che le etichette possono essere multiriga"
> LABEL maintainer="John Doe" author="John Doe"
> ```
> Questo e utile per documentare l'immagine e per fornire informazioni aggiuntive.
> 
- WORKDIR: Imposta la directory di lavoro
> L'istruzione WORKDIR imposta la directory di lavoro per qualsiasi istruzione RUN, CMD, ENTRYPOINT, COPY e ADD che seguono nell'immagine.
> ```Dockerfile
> WORKDIR /path/to/workdir
> RUN pwd
> ```
> Questo e utile per evitare di dover specificare la directory di lavoro in ogni istruzione.
> L'istruzione WORKDIR puo essere usata piu volte in un Dockerfile. Se la path specificata non esiste, verra creata.
> ```Dockerfile
> WORKDIR /a
> WORKDIR b
> RUN pwd # /a/b
> ```
> In questo esempio, la directory di lavoro e stata cambiata da /a a /a/b. Questo perche WORKDIR e relativo alla directory di lavoro corrente.
- RUN: Esegue comandi in un nuovo livello
> L'istruzione RUN esegue qualsiasi comando in una nuova immagine e crea un nuovo livello (layer) sopra l'immagine corrente.
> ```Dockerfile
> RUN apt-get update && apt-get install -y \
>    package1 \
>   package2 \
>  package3
> ```
> L'istruzione RUN puo essere usata in forma di shell o in forma di exec.
> ```Dockerfile
> RUN /bin/bash -c "source $HOME/.bashrc; echo $HOME" # forma shell
> RUN ["executable", "param1", "param2"] # forma exec
> ```
> La forma shell e la piu comune e ti permette di separare comandi lunghi su piu righe.
> ```Dockerfile
> RUN apt-get update && apt-get install -y \
>    package1 \
>    package2 \
>```
> Oppure usando heredocs.
> ```Dockerfile
> RUN <<EOF
> apt-get update
> apt-get install -y \
>   package1 \
>  package2
> EOF
> ```

- CMD: Fornisce comandi di default per l'immagine
> L'istruzione CMD fornisce comandi di default per l'immagine. Questi comandi vengono eseguiti quando un contenitore viene avviato.
> Da non confondere con run, che esegue comandi durante la costruzione dell'immagine.
> CMD puo essere scritto in forma shell or exec.
> - Se l'immagine e avviata senza specificare un comando, CMD verra eseguito.
> - Se l'immagine e avviata con un comando, CMD verra sovrascritto.
> ```Dockerfile
> CMD ["executable","param1","param2"] # forma exec
> CMD ["param1","param2"] # come parametro di ENTRYPOINT
> CMD command param1 param2 # forma shell
> ```
> 
- COPY: Copia file o directory da un percorso a un altro
> L'istruzione COPY ha due forme
> ```Dockerfile
> COPY [--chown=<user>:<group>] <src>... <dest>
> COPY [--chown=<user>:<group>] ["<src>",... "<dest>"] # forma json per quando le path contengono spazi
> ```
> \<src> e una path relativa al contesto di build, e \<dest> e una path relativa al filesystem dell'immagine.
> - Se --chown e specificato, i file copiati avranno i permessi specificati.
> ```Dockerfile
> COPY --chown=55:mygroup files* /somedir/
> ```
> - Se --chown non e specificato, i file saranno copiati con GID e UID 0.
> - COPY accetta il flag --from per copiare file da un altro stage di build.
> ```Dockerfile
> FROM alpine AS builder
> RUN echo "hello" > /file
> 
> FROM alpine
> COPY --from=builder /file /file
> ```
> 
- ADD: Copia file o directory da un percorso a un altro
> L'istruzione ADD ha due forme
> ```Dockerfile
> ADD [--chown=<user>:<group>] <src>... <dest>
> ADD [--chown=<user>:<group>] ["<src>",... "<dest>"] # forma json per quando le path contengono spazi
> ```
> \<src> e una path relativa al contesto di build, e \<dest> e una path relativa al filesystem dell'immagine.
> - Se --chown e specificato, i file copiati avranno i permessi specificati.
> - Se --chown non e specificato, i file saranno copiati con GID e UID 0.
> - ADD copia file da URL e archivi tar.
> - Se \<src> e un archivio tar, esso verra estratto in \<dest>. Solo se il formato di compressione e identity, gzip, bzip2 o xz.
> - ADD non sopporta autenticazione, quindi e meglio usare curl o wget con RUN o altri metodi in questi casi.
> - ADD ci permete di verificare l'integrita del file con checksum. (Sopporta solo HTTP al momento)
> ```Dockerfile
> ADD --checksum=sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef file /path/
> ```
> Usare ADD con una respository git usando il flag --keep-git-dir=<bool> per mantenere la directory .git.
> ```Dockerfile
> # syntax=docker/dockerfile:1
> FROM alpine
> ADD --keep-git-dir=true https://github.com/moby/buildkit.git#v0.10.1 /buildkit
> ```
> 
> #### Usare ADD con SSH
> - Per usare ADD con SSH, e necessario copiare la chiave publica del server SSH nel contesto di build e aggiungere il host a known_hosts.
> ```Dockerfile
> # syntax=docker/dockerfile:experimental
> FROM alpine
> # install ssh client and git
> RUN apk add --no-cache openssh-client git
> # download public key for github.com
> RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
> # clone our private repository
> RUN --mount=type=ssh git clone git@github.com:myorg/myproject.git myproject
> 
> ADD git@github.com:myorg/myproject.git myproject
> ```
> - Piutosto che copirare la chiave ssh nel contesto di build, e meglio usare il flag --ssh per specificare la chiave ssh nel comando di build.
> ```bash
> docker build --ssh default .
> ```
> "--ssh default" e un flag che specifica la chiave ssh da usare. In questo caso default e tradotto nel path del host ~/.ssh. Docker andra a creare un socket read-only e espone la variabile d'ambiente SSH_AUTH_SOCK che viene usata in automatico da programmi ssh.
> Da notare che usando la configurazione di default, docker non eseguira il mount della chiave ssh ~/.ssh/id_rsa nel contesto di build. In questo caso bisogna aggiungere la chiave ssh al ssh agent.
> Usa "ssh-add -L" in locale per vedere le chiavi ssh aggiunte.
> Puoi aggiungere chiavi al ssh-agent con "ssh-add <path/to/key>" / ssh-add -K o per macOS "ssh-add --apple-use-keychain".
> 
- CMD: Esegue un comando
> L'istruzione CMD fornisce comandi di default per l'immagine. Questi comandi vengono eseguiti quando un contenitore viene avviato.
> Da non confondere con run, che esegue comandi durante la costruzione dell'immagine.
> CMD puo essere scritto in forma shell or exec.
> - Se l'immagine e avviata senza specificare un comando, CMD verra eseguito.
> - Se l'immagine e avviata con un comando, CMD verra sovrascritto.
> - CMD puo essere usato come parametro di ENTRYPOINT, in questo caso il comando specificato in CMD verra eseguito come parametro di ENTRYPOINT.
> ```Dockerfile
>   CMD ["executable","param1","param2"] # forma exec
>   CMD ["param1","param2"] # come parametro di ENTRYPOINT
>   CMD command param1 param2 # forma shell
> - ```
> ```Dockerfile
> FROM ubuntu
> CMD ["World"]
> ENTRYPOINT ["echo", "Hello"] # Verremo eseguiti "echo Hello World"
> ```
> - CMD puo essere sovrascritto da docker run.
> - CMD puo essere sovrascritto da un comando specificato in docker-compose.yml.
- ENTRYPOINT: Configura un eseguibile che verra eseguito al lancio del contenitore
> L'istruzione ENTRYPOINT ha due forme
> ```Dockerfile
> ENTRYPOINT ["executable", "param1", "param2"] # forma exec
> ENTRYPOINT command param1 param2 # forma shell
> ```
> I comandi passati come parametro a docker run vengono aggiunti a quelli specificati in ENTRYPOINT in forma exec.
> - Solo l'ultimo ENTRYPOINT verra eseguito.
> - Se CMD e specificato, verra eseguito come parametro di ENTRYPOINT.
> ```Dockerfile
> FROM ubuntu
> ENTRYPOINT ["echo", "Hello"]
> CMD ["World"] # L'output sara "Hello World"
> ```
> #### Essempio di ENTRYPOINT
> Nel seguente esempio, ENTRYPOINT e usato per avviare un server apache in FOREGROUND.
> ```Dockerfile
> FROM debian:stable
> RUN apt-get update && apt-get install -y --force-yes apache2
> EXPOSE 80 443
> VOLUME ["/var/www", "/var/log/apache2", "/etc/apache2"]
> ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
> ```

- ENV: Imposta una variabile d'ambiente
> L'istruzione ENV imposta una variabile d'ambiente de build time o run time.
> ```Dockerfile
> ENV MY_NAME="John Doe"
> ENV MY_DOG=Rex\ The\ Dog
> ENV MY_CAT=fluffy
> ```
> Le variabili d'ambiente possono essere usate in qualsiasi istruzione di Dockerfile. 
> ```Dockerfile
> ENV MY_PATH=/usr/local/bin
> RUN echo $MY_PATH
> ```
> - Le variabili d'ambiente possono essere sovrascritte da docker run.
> - Le variabili d'ambiente possono essere sovrascritte da un comando specificato in docker-compose.yml
> - Le variabili impostate con ENV persistone anche quando il container viene avviato dal imagine.

- EXPOSE: Esprime le porte su cui il container ascolta
> L'istruzione EXPOSE informa Docker che il container ascolta le porte specificate in runtime, il protocolo di default e tcp.
> ```Dockerfile
> EXPOSE 80
> EXPOSE 443
> ```
> - EXPOSE non pubblica le porte, ma serve solo come documentazione.
> Puoi specificare il protocolo da usare con EXPOSE usando /tcp o /udp.
> ```Dockerfile
> EXPOSE 80/tcp
> EXPOSE 80/udp
> ```
> Usando il flag -P con docker run, Docker mappa le porte esposte con porte casuali sul host.
> ```bash
> docker run -P -d nginx
> ```
> Usando il flag -p con docker run, Docker mappa le porte esposte con porte specificate sul host.
> ```bash
> docker run -p 80:80 -d nginx
> ```
> 
- HEALTHCHECK: Esegue comandi per verificare lo stato del container
> L'istruzione HEALTHCHECK ha due forme
> ```Dockerfile
> HEALTHCHECK [OPTIONS] CMD command # forma exec
> HEALTHCHECK NONE # disabilita il controllo di salute
> ```
> L'istruzione HEALTHCHECK dice a Docker come verificare lo stato del container. Questo e utile per verificare se un container e sano, e non solo se e in esecuzione.
> Quando HEALTHCHECK e specificato, il container avra un "health status" che puo essere "starting", "healthy" o "unhealthy".
> Le opzioni che possiamo usare prima di CMD sono:
> - --interval=DURATA (default 30s)
> - --timeout=DURATA (default 30s)
> - --start-period=DURATA (default 0s)
> - --retries=N (default 3)
> ```Dockerfile
> HEALTHCHECK --interval=5m --timeout=3s \
>  CMD curl -f http://localhost/ || exit 1
> ```
> Lo stato di exit del comando specificato in CMD e usato per determinare lo stato di salute del container.
> - 0 indica che il container e sano
> - 1 indica che il container e non sano
> - 2 e riservato, non usare.

- SHELL: Cambia il SHELL di default usato da RUN, CMD, ENTRYPOINT
> SHELL di default in linux e
> ```bash ["/bin/sh", "-c"]```
> e in windows e 
> ```bash ["cmd", "/S", "/C"]```
> ```Dockerfile
> SHELL ["powershell", "-Command"]
> RUN echo $env:PATH
> ```

- USER: Imposta l'utente o il gruppo di default usato da RUN, CMD, ENTRYPOINT
> L'istruzione USER imposta l'utente o UID e il gruppo o GID di default usato da RUN, CMD, ENTRYPOINT.
> ```Dockerfile
> USER <user>[:<group>]
> USER <UID>[:<GID>]
> ```
> 
- VOLUME: Crea un punto di mount per memorizzare i dati
> L'istruzione VOLUME crea un punto di mount con il nome specificato e lo aggiunge al filesystem dell'immagine.
> ```Dockerfile
> VOLUME /var/log
> VOLUME /var/db
> VOLUME ["/var/log", "/var/db"]
> ```
> - I dati memorizzati in un volume persistono anche quando il container viene eliminato.
> - Al momento della creazione del container, i dati presenti nella directory di destinazione del volume vengono copiati nel volume.
> ```Dockerfile
> FROM ubuntu
> RUN mkdir /myvol
> RUN echo "hello world" > /myvol/greeting
> VOLUME /myvol
> ```
> Possiamo creare un volume con 
> ```bash
> docker volume create myvol
> ```
> E poi montare il volume in un container con
> ```bash
> docker run -v myvol:/myvol ubuntu
> docker run --mount source=myvol,target=/path/in/container ubuntu
> ```
> - In questo caso possiamo condividere il volume tra piu container.
> ```bash
> docker run -v myvol:/path/in/container1 image1
> docker run -v myvol:/path/in/container2 image2
> ```
> Quindi il contenuto di /path/in/container1 e /path/in/container2 sara lo stesso.
> ```bash 
> docker volume create hello
> docker run -d -v hello:/world busybox ls /world
> ```
- BIND MOUNTS: Monta un file o una directory dall'host in un container
> I bind mounts permettono di montare un file o una directory dall'host in un container.
> ```bash
> docker run -v /path/on/host:/path/in/container -it ubuntu
> ```
> - I bind mounts possono essere usati per condividere file o directory tra host e container.
> - Da notare che i bind mounts non sono isolati dal filesystem dell'host.
> - Da notare che i bind nascondono i file o le directory presenti nella destinazione del mount.
> - bind mounts non possono essere usati in Dockerfile, ma al momento della creazione del container.
> 
> 