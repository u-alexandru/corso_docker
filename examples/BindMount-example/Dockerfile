FROM nginx:alpine
LABEL authors="alexandru"

# Perform health check
HEALTHCHECK --interval=5s --timeout=3s \
CMD wget -q -O /dev/null http://localhost/ || exit 1

COPY website/index.html /usr/share/nginx/html/index.html