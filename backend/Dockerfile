FROM node:latest
# Env
ENV TIME_ZONE=Europe/Budapest
ENV APP_PORT=9421
ENV DB_SERVER_TYPE=MNG
ENV DB_SERVER_ADDRESS=localhost
ENV DB_SERVER_PORT=27017
ENV DB_SERVER_USER=cms_dev
ENV DB_SERVER_PWD=Almafa1.
ENV DB_SERVER_DATABASE=cms_dev
ENV NODE_ENV=production

# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY src/package*.json ./

#Install Typescritp
RUN npm install -g typescript

#Add App user
RUN adduser --disabled-password backend

# Copy all other source code to work directory
COPY src/. /usr/src/app

RUN chown -R backend:backend /usr/src/app
USER backend

# Install all Packages
RUN npm install

# TypeScript
RUN npm run build

EXPOSE $APP_PORT

# Start
CMD [ "node", "dist/server.js" ]
