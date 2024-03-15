### Docker Compose

#### Cosa è Docker Compose?
- Docker Compose è uno strumento per definire e gestire applicazioni Docker multi-container. Con Compose, è possibile utilizzare un file YAML per configurare i servizi delle applicazioni. Quindi, con un singolo comando, è possibile creare e avviare tutti i servizi da un file di configurazione.
- Docker Compose è utile per sviluppatori che vogliono testare le proprie applicazioni in un ambiente simile a quello di produzione. Inoltre, è utile per i team che vogliono collaborare su un'applicazione, poiché è possibile definire un file di configurazione che può essere utilizzato da tutti i membri del team.

#### Come funziona Docker Compose?
- Docker Compose utilizza un file YAML per definire i servizi delle applicazioni. Il file YAML contiene informazioni sui servizi, come il nome del servizio, l'immagine Docker da utilizzare, le variabili d'ambiente, le porte esposte e altro ancora.
- Una volta definiti i servizi, è possibile utilizzare il comando `docker-compose up` per creare e avviare tutti i servizi definiti nel file YAML. Inoltre, è possibile utilizzare il comando `docker-compose down` per arrestare e rimuovere tutti i servizi.
- Docker Compose è in grado di gestire le dipendenze tra i servizi, quindi è possibile definire un servizio che dipende da un altro servizio. Ad esempio, è possibile definire un servizio web che dipende da un servizio di database.
- Inoltre, Docker Compose è in grado di gestire le variabili d'ambiente, quindi è possibile definire variabili d'ambiente che verranno passate ai servizi durante la creazione.
- Infine, Docker Compose è in grado di gestire i volumi, quindi è possibile definire volumi che verranno montati nei servizi durante la creazione.
- In generale, Docker Compose semplifica la gestione delle applicazioni Docker multi-container, consentendo di definire e gestire i servizi delle applicazioni con un singolo file di configurazione.
- Esempio di file YAML per Docker Compose:
```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: example
```
#### Installazione di Docker Compose
- Docker Compose è disponibile per Linux, macOS e Windows. È possibile scaricare l'ultima versione di Docker Compose dal sito ufficiale di Docker.
- Inoltre, Docker Compose è incluso in Docker Desktop per Windows e macOS, quindi non è necessario scaricarlo separatamente.
- Per verificare l'installazione di Docker Compose, è possibile eseguire il comando `docker-compose --version`.
- Esempio di output del comando `docker-compose --version`:
```
docker-compose version 1.29.2, build 5becea4c
```
#### Commandi utili di Docker Compose
- `docker-compose up`: Crea e avvia tutti i servizi definiti nel file YAML.
- `docker-compose down`: Arresta e rimuove tutti i servizi definiti nel file YAML.
- `docker-compose ps`: Mostra lo stato dei servizi definiti nel file YAML.
- `docker-compose logs`: Mostra i log dei servizi definiti nel file YAML.
- `docker-compose exec`: Esegue un comando all'interno di un servizio definito nel file YAML.
- `docker-compose build`: Costruisce le immagini dei servizi definiti nel file YAML.
- `docker-compose pull`: Scarica le immagini dei servizi definite nel file YAML.
- `docker-compose push`: Carica le immagini dei servizi definite nel file YAML.
- `docker-compose config`: Verifica la validità del file YAML.
- `docker-compose help`: Mostra l'elenco dei comandi disponibili.
- `docker-compose --version`: Mostra la versione di Docker Compose.
- `docker-compose -f <file>`: Specifica un file YAML diverso da `docker-compose.yml`.
- `docker-compose -p <project>`: Specifica un nome di progetto diverso da quello predefinito.

#### Componenti di Docker Compose

##### Versione
- La versione del file YAML di Docker Compose specifica la versione del formato del file. Attualmente, la versione più recente è la 3.
- Esempio di definizione della versione nel file YAML:
```yaml
version: '3'
```

##### Name
- Il nome del progetto di Docker Compose. Il nome predefinito è il nome della directory in cui si trova il file YAML.
- Esempio di definizione del nome nel file YAML:
```yaml
version: '3'
name: myproject

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
```
##### Servizi
- Un servizio è un'istanza di un'immagine Docker in esecuzione. Un file YAML di Docker Compose può definire uno o più servizi, ognuno dei quali può essere configurato con variabili d'ambiente, volumi, porte esposte e altro ancora.
- Esempio di definizione di un servizio nel file YAML:
```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
```
> Proprietà di un servizio:
> - `image`: L'immagine Docker da utilizzare per il servizio.
> - `build`: La directory del contesto di build per il servizio.
>> Attributi di `build`:
>> - `context`: La directory del contesto di build.
>> - `dockerfile`: Il nome del file Dockerfile da utilizzare.
>> - `target`: Il target del Dockerfile da utilizzare.
>> - `labels`: Le etichette da applicare all'immagine.
>> - `network`: Il nome della rete da utilizzare per il servizio.
>> - `platform`: La piattaforma su cui eseguire il servizio.
>> - `ssh`: Le informazioni sull'agente SSH da utilizzare durante la build.
>> - `secrets`: I segreti da utilizzare durante la build.
>> Esempio di definizione di `build` nel file YAML:
>> - Essempio di definizione di `build` nel file YAML:
>> ```yaml
>> version: '3'
>> 
>> services:
>>   web:
>>     build:
>>       context: .
>>       dockerfile: Dockerfile
>>       args:
>>         version: 1.0
>> ```
>> - Essempio senza argomenti:
>> ```yaml
>>   version: '3'
>> 
>>   services:
>>     web:
>>       build: .
>>   ```
>> In questo esempio, il contesto di build è la directory corrente, il file Dockerfile predefinito è `Dockerfile` e non ci sono argomenti da passare al Dockerfile.
> - `command`: Il comando da eseguire all'avvio del servizio, sostituendo il comando predefinito dell'immagine.
> - `environment`: Le variabili d'ambiente da passare al servizio.
>> Esempio di definizione di `environment` nel file YAML:
>> ```yaml
>> version: '3'
>> 
>> services:
>>  web:
>>   image: nginx:latest
>>  environment:
>>    - DEBUG=1
>>    - PORT=8080
>> ```
>> In questo esempio, il servizio `web` riceve le variabili d'ambiente `DEBUG` e `PORT`.
> - `env_file`: Il file contenente le variabili d'ambiente da passare al servizio.
>> Esempio di definizione di `env_file` nel file YAML:
>> ```yaml
>> version: '3'
>> 
>> services:
>>  web:
>>    image: nginx:latest
>>    env_file:
>>      - .env
>> ```
>> In questo esempio, il servizio `web` riceve le variabili d'ambiente definite nel file `.env`.
> - `expose`: Le porte esposte dal servizio. Solo le porte interne del servizio sono esposte, non le porte esterne.
> - `ports`: Le porte esposte dal servizio.
>> Esempio di definizione di `ports` nel file YAML:
>> ```yaml
>> ports:
>> - "3000"
>> - "3000-3005"
>> - "8000:8000"
>> - "9090-9091:8080-8081"
>> - "49100:22"
>> - "8000-9000:80"
>> - "127.0.0.1:8001:8001"
>> - "127.0.0.1:5000-5010:5000-5010"
>> - "6060:6060/udp"
> - `restart`: La politica di riavvio del servizio.
>> Esempio di definizione di `restart` nel file YAML:
>> ```yaml
>> restart: "no"
>> restart: always
>> restart: on-failure
>> restart: on-failure:3
>> restart: unless-stopped
>> ```
> - `container_name`: Cambia il nome del container alla creazione
> - 'hostname': Dichiara il hostname da usare per il container
>> Essempio `container_name`,`hostname`.
>>```yaml
>> version: '3'
>> 
>> services:
>>  web:
>>    container_name: myweb
>>    hostname: myhostname
>>    image: nginx:latest
>>    ports:
>>      - "8080:80"
>> ```
> - `networks`: Il nome della rete da utilizzare per il servizio.
>> Esempio di definizione di `networks` nel file YAML:
>>```yaml
>> version: '3'
>>
>> services:
>>  web:
>>    image: nginx:latest
>>    networks:
>>      - frontend
>>      - backend
>> ```
> - `volumes`: I volumi da montare nel servizio.
>> Essempio di definizione di `volumes` nel file YAML:
>>```yaml
>> version: '3'
>>
>> services:
>>  web:
>>    image: nginx:latest
>>    volumes:
>>      - /path/to/local:/path/to/container
>>      - volume_name:/path/to/container
>>      - /path/to/local
>>      - volume_name
>> ```
> - `entrypoint`: Overwrites the default entrypoint of the image. The entrypoint is the command that is executed when the container starts. You can provide it as a string or as a list. If you provide it as a list, the first item is the executable, the rest are the arguments.
>> Esempio di definizione di `entrypoint` nel file YAML:
>> ```yaml
>> version: '3'
>>
>> services:
>>   web:
>>     image: nginx:latest
>>     entrypoint: ["/bin/bash", "-c", "echo 'Hello, Docker!' && sleep 30"]
>> ```
>> In questo esempio, il servizio web esegue il comando echo 'Hello, Docker!' && sleep 30 all'avvio del container.
- `healthcheck`: Docker fornisce un'istruzione `healthcheck` per specificare un comando in un Dockerfile che può essere utilizzato per determinare la salute di un container. Un codice di uscita di 0 indica successo (il container è sano), e qualsiasi altro codice indica un fallimento.
>
> L'istruzione `healthcheck` ha due forme:
> - `HEALTHCHECK [OPTIONS] CMD command` (controlla la salute del container eseguendo un comando all'interno del container)
> - `HEALTHCHECK NONE` (disabilita qualsiasi controllo di salute ereditato dall'immagine di base)
>
> Le opzioni che possono apparire prima di `CMD` sono:
> - `--interval=DURATION` (il tempo di attesa tra i controlli, il default è 30s)
> - `--timeout=DURATION` (il tempo di attesa prima di considerare il controllo come bloccato, il default è 30s)
> - `--start-period=DURATION` (il tempo di attesa per l'inizializzazione del container prima di iniziare i tentativi di salute, il default è 0s)
> - `--retries=N` (il numero di fallimenti consecutivi necessari per considerare un container come non sano, il default è 3)
>
> Ecco un esempio di un `healthcheck` in un Dockerfile:
> ```yaml
> FROM nginx:alpine LABEL authors="alexandru"  
> 
> HEALTHCHECK --interval=5s --timeout=3s CMD wget -q -O /dev/null http://localhost/ || exit 1  COPY index.html /usr/share/nginx/html/index.html
> ```
> In questo Dockerfile, l'istruzione `HEALTHCHECK` specifica che Docker dovrebbe testare la salute del container ogni 5 secondi, con un timeout di 3 secondi, eseguendo il comando wget -q -O /dev/null http://localhost/ || exit 1. Se il comando restituisce un codice non zero più di tre volte di seguito, Docker considererà il container come non sano.
>
> In Docker Compose, è possibile specificare anche un `healthcheck` per un servizio. La sintassi è simile alla sintassi del Dockerfile, ma è espressa come un dizionario YAML. Ecco un esempio:
>
> ```yaml
> version: '3.8'
> 
> services:
>  web:
>    image: nginx:latest
>    healthcheck:
>      test: ["CMD", "wget", "-q", "-O", "/dev/null", "http://localhost/"]
>      interval: 5s
>      timeout: 3s
>      retries: 3
>```
- `networks`: Le reti da utilizzare per il servizio.
> Il top-level `networks` permette di definire reti che possono essere usate di servizi multipli.
>```yaml
> version: '3'
>
> services:
>   web:
>     image: nginx:latest
>     networks:
>       - web-network
>   db:
>    image: mysql:latest
>    networks:
>       - web-network
>
> networks:
>   web-network:
>```
> Attributi di networks
> - `driver`: Ti permette di scegliere il driver di rete per questa rete.
> - I seguenti driver sono disponibili di default:
>> - `bridge`: Il driver di default. Questo sarà usato se nessun altro driver è specificato. Crea una rete privata interna all'host in cui i container possono comunicare.
>> - `host`: Rimuove l'isolamento tra il container e il Docker host, e usa direttamente la rete del host. Questo è utile quando il container non ha bisogno di isolamento di rete rispetto al host.
>> - `overlay`: Connette più Docker daemons insieme e consente ai container su host diversi di comunicare come se fossero sulla stessa rete. È utilizzato in configurazioni di swarm.
>> - `ipvlan`: Permette ai container di essere inseriti direttamente nella rete e all'IP host, in modo che i container possano essere indirizzati come se fossero fisicamente collegati alla rete.
>> - `macvlan`: Assegna un indirizzo MAC univoco a ciascun container, rendendoli indistinguibili dai host fisici sulla rete.
>> - `none`: Disabilita tutta la rete. In genere, questo non è ciò che vuoi, a meno che il container non debba gestire la propria rete.

- `volumes`: I volumi da montare nel servizio. I volumi sono utilizzati per persistere i dati generati e utilizzati dai container Docker. Essi sono completamente gestiti da Docker.
>
> Il top-level `volumes` permette di definire volumi che possono essere usati da servizi multipli.
>
> ```yaml
> version: '3'
>
> services:
>   web:
>     image: nginx:latest
>     volumes:
>       - web-data:/var/www/html
>   db:
>     image: mysql:latest
>     volumes:
>       - db-data:/var/lib/mysql
>
> volumes:
>   web-data:
>   db-data:
> ```
> In questo esempio, il servizio web monta il volume web-data nella directory /var/www/html del container, e il servizio db monta il volume db-data nella directory /var/lib/mysql del container.
> Attributi di volumes  
> - `driver`: Ti permette di scegliere il driver di volume per questo volume. Il driver di default è local, che memorizza i dati nel filesystem dell'host.
> - `driver_opts`: Ti permette di specificare opzioni per il driver di volume.
> - `labels`: Ti permette di aggiungere metadati al volume.
> - `name`: Ti permette di specificare un nome per il volume.
> - I seguenti driver sono disponibili di default:  
> - `local`: Il driver di default. Questo memorizza i dati nel filesystem dell'host. Puoi specificare l'opzione o per indicare il percorso nel filesystem dell'host.
> - `tmpfs`: Questo memorizza i dati in una memoria temporanea nel filesystem dell'host. Questo è utile per i dati temporanei che non devono persistere tra i riavvii del container.
> Esempio di definizione di volumes nel file YAML con driver e driver_opts:
>```yaml
> version: '3'
> 
> services:
>   web:
>       image: nginx:latest
>       volumes:
>       - web-data:/var/www/html
> 
> volumes:
>   web-data:
>       driver: local
>       driver_opts:
>         o: bind
>         type: none
>         device: /path/on/host
>```
>
- `secrets`: I segreti da utilizzare durante la build.
> I segreti sono file o stringhe che contengono dati sensibili, come password, chiavi SSH o certificati SSL. I segreti sono memorizzati in modo sicuro e possono essere utilizzati dai servizi durante la creazione.
> Esempio di definizione di `secrets` nel file YAML:
> ```yaml
> version: '3.8'
> 
> services:
>   web:
>     image: nginx:latest
>     secrets:
>     - mysecret
>     - myothersecret
> 
> secrets:
>   mysecret:
>     file: ./mysecret.txt
> ```
> In questo esempio, il servizio web riceve i segreti `mysecret` e `myothersecret` durante la creazione. Il segreto `mysecret` è definito nel file YAML come un file `mysecret.txt`.


#### Examples
```yaml
version: '3.8'

services:
  web:
    image: nginx:latest
    container_name: myweb
    hostname: myhostname
    command: ["/bin/bash", "-c", "echo 'Hello, Docker!' && sleep 30"]
    environment:
      - DEBUG=1
      - PORT=8080
    expose:
      - "8080"
    ports:
      - "8080:80"
    restart: unless-stopped
    networks:
      - webnet
    volumes:
      - web-data:/var/www/html

  db:
    image: mysql:latest
    container_name: mydb
    hostname: mydbhostname
    environment:
      - MYSQL_ROOT_PASSWORD=example
    expose:
      - "3306"
    ports:
      - "3306:3306"
    restart: unless-stopped
    networks:
      - dbnet
    volumes:
      - db-data:/var/lib/mysql

networks:
  webnet:
    driver: bridge
  dbnet:
    driver: bridge

volumes:
  web-data:
    driver: local
  db-data:
    driver: local
```