FROM mhart/alpine-node:12
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY . /frontend/
EXPOSE 8081