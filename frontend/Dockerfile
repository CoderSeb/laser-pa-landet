# Container with node version 14
FROM node:14

# Application directory
WORKDIR /lpl/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]