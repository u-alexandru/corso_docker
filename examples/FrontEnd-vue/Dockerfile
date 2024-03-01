ARG node_version=latest
FROM node:${node_version} as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
LABEL authors="alexandru"
# Perform health check
HEALTHCHECK --interval=5s --timeout=3s \
CMD wget -q -O /dev/null http://localhost/ || exit 1
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]