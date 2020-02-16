FROM node:12.2.0-alpine AS alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy the contents of the project to the image
COPY . .