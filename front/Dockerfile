# Use a node docker image
FROM node:19-alpine3.16

# Project source at /front
WORKDIR /front

# Install dependencies, if any
COPY package.json .
COPY package-lock.json .
RUN npm install

# Expose this port
EXPOSE 3000

# Run the server
CMD npm start
