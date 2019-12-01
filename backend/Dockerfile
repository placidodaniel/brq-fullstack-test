FROM mhart/alpine-node:12

WORKDIR /backend

COPY package.json /backend/
COPY yarn.lock /backend/
COPY . /backend/

RUN yarn install
RUN yarn build

EXPOSE 3000