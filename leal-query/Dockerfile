FROM node:14 as LealQuery

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

# CMD [ "npm", "run" , "start-debug" ]
