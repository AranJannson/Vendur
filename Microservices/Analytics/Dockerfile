FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install -g typescript
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8001

CMD ["node", "dist/index.js"]
