FROM node:14 as LealAccumulate

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3002

# CMD [ "npm", "run" , "start-debug" ]
