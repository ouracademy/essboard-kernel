FROM node:10.13-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "start:prod", '--', '-p', '$PORT']