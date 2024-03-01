# Docker Compose

Docker Compose e un tool per definire e gestire applicazioni multi-container. Con Docker Compose, è possibile utilizzare un file YAML per configurare i servizi dell'applicazione. Quindi, con un singolo comando, è possibile creare e avviare tutti i servizi da un'applicazione definita in un file `docker-compose.yml`.

## Installazione

Per installare Docker Compose, seguire le istruzioni ufficiali per il proprio sistema operativo:

- [Installazione di Docker Compose su Linux](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)
- [Installazione di Docker Compose su macOS](https://docs.docker.com/compose/install/#install-compose-on-macos)
- [Installazione di Docker Compose su Windows](https://docs.docker.com/compose/install/#install-compose-on-windows)
- [Installazione di Docker Compose su Windows Server](https://docs.docker.com/compose/install/#install-compose-on-windows-server)
- [Installazione di Docker Compose su altri sistemi](https://docs.docker.com/compose/install/#install-compose)

## Utilizzo

Dopo aver installato Docker Compose, è possibile utilizzare il comando `docker-compose` per gestire le applicazioni multi-container. Ad esempio, per avviare un'applicazione definita in un file `docker-compose.yml`, eseguire il seguente comando:

```bash
docker-compose up
```

## Essempio di file `docker-compose.yml`

```yaml
version: '3.3'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  api:
    image: node:alpine
    command: sh -c "yarn install && yarn run start"
    volumes:
      - .:/app
    ports:
      - "3000:3000"
```