FROM node:12.2.0-alpine AS alpine

WORKDIR /code
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
# RUN npm build
RUN yarn global add serve
# Copy the contents of the project to the image
# CMD ["npm", "start"]
COPY . .
CMD ["serve", "-p", "3000", "-s", "."]
