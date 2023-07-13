 FROM node:18

 WORKDIR /assignment1

 COPY package*.json ./

 RUN npm install

 COPY . .

 ENV PORT=3000

 EXPOSE 3000

 CMD [ "node","app.js"]