FROM node:17 as builder

WORKDIR /site

# coy files for npm install
COPY package.json      /site/package.json
COPY package-lock.json /site/package-lock.json

# install node modules
RUN npm install

# copy remaining files
COPY . /site

# build site
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /site/_site /usr/share/nginx/html
