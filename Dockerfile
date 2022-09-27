FROM node:14-alpine AS build

WORKDIR /build

COPY . .

RUN yarn install
RUN yarn build
RUN yarn export

FROM node:14-alpine AS final

WORKDIR /app
RUN mkdir static
COPY --from=build ./build/out ./static

RUN npm i -g serve

EXPOSE 5000

CMD ["serve", "-s", "static"]
