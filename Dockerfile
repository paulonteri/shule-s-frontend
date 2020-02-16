FROM node:12.2.0-alpine

WORKDIR /app/frontend
COPY package.json /app/frontend

RUN npm install

CMD ["npm","run","build"]