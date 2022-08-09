FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /usr/src/frontend-admin-cms

COPY package* ./
RUN npm install --production
COPY . ./

RUN npm run build

EXPOSE 3000

# build for the production served by nginx
FROM nginx:1.23-alpine
ENV NODE_ENV production

#copy build assets from app builder
COPY --from=builder /usr/src/frontend-admin-cms/build /usr/share/nginx/html

#load the config file
COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]