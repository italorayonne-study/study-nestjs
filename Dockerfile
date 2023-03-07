FROM node:18-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install && npm install -g @nestjs/cli && npm install --save-dev prisma
COPY . .

RUN npx prisma generate

EXPOSE 3000
EXPOSE 9229

CMD npm run start:debug