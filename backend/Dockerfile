FROM node:14
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

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY src/. /usr/src/app

#Install Typescritp for conversion
RUN npm install -g typescript

#Add App user
RUN adduser --disabled-password backend

RUN chown -R backend:backend /usr/src/app

USER backend

# Install production only dependencies
RUN npm install --only=production

# Convert typescript source to javascript
RUN npm run build

USER root

# Remove typescript
RUN npm uninstall -g typescript

USER backend

EXPOSE $APP_PORT

# Start
CMD [ "npm", "start" ]
