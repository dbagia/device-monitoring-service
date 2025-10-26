FROM node:20-alpine as deps
WORKDIR /database
COPY ./package.json ./package.json
RUN npm install

FROM node:20-alpine as migrations
WORKDIR /database
COPY . .
COPY --from=deps /database/node_modules ./node_modules
