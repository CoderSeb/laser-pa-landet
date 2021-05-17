# Container with node version 14
FROM node:14

# Application directory
WORKDIR /lpl/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]