FROM node:14 as LealRedemption

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3003

# CMD [ "npm", "run" , "start-debug" ]
