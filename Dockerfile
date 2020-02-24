FROM node:12.2.0-alpine AS build

WORKDIR /code
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
# RUN npm build
# RUN yarn global add serve
# Copy the contents of the project to the image
# COPY . .
# CMD ["serve", "-p", "3000", "-s", "."]
# CMD ["yarn", "start"]

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /code/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]