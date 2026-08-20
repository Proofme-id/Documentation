# docsify has no build step — it's a client-side markdown renderer, so the whole repo
# checkout *is* the served output. No Node.js is needed at runtime (docsify-cli's
# `npm run start` / `docsify serve` is a local dev convenience only, not a production
# server); this image just serves the static files with nginx.
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY . .
# Strip repo/tooling files that aren't documentation content — there's no separate
# dist/ output to copy from instead, so these have to be removed explicitly.
RUN rm -rf .git .github .gitignore .dockerignore Dockerfile nginx.conf security-headers.conf \
    package.json package-lock.json CLAUDE.md README.md test.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
