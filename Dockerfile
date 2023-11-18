FROM node:20 as builder

# install pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /site

# coy files for npm install
COPY package.json      /site/package.json
COPY pnpm-lock.yaml /site/pnpm-lock.yaml

# install node modules
RUN pnpm install --frozen-lockfile

# copy remaining files
COPY . /site

# build site
RUN pnpm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /site/_site /usr/share/nginx/html
