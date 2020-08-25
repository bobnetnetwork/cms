FROM node:14
# Env
ENV TIME_ZONE=Europe/Budapest
ENV APP_PORT=9422
ENV BE_PORT=9421
ENV BE_ADDRESS=localhost
ENV NODE_ENV=production

# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

# Create Directory for the Container
WORKDIR /usr/src/app

#Install Angular
RUN npm i -g @angular/cli

#Install Typescritp
RUN npm install -g typescript

#Add App user
RUN adduser --disabled-password frontend

# Copy all other source code to work directory
COPY . /usr/src/app

RUN chown -R frontend:frontend /usr/src/app
USER frontend

# Install all Packages
RUN npm install

RUN npm run build

EXPOSE $APP_PORT

# Start
CMD [ "ng", "serve" ]