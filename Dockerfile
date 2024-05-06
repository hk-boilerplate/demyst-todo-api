FROM node:16.14.2-alpine3.14 as build
ARG NODE_AUTH_TOKEN
RUN apk add --no-cache git
WORKDIR /home/node/app
COPY package*.json ./
RUN --mount=type=secret,mode=0644,id=npmrc,target=/home/node/app/.npmrc ["npm", "install", "--unsafe-perm"]
COPY . .
RUN ["npm", "run", "build"]

FROM node:16.14.2-alpine3.14 as production
USER node
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/build ./build
COPY --chown=node:node . .
EXPOSE 3000
CMD ["node", "build/index.js"]