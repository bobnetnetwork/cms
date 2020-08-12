# BobNET Network CMS 
[![CodeFactor](https://www.codefactor.io/repository/github/bobnetnetwork/cms/badge)](https://www.codefactor.io/repository/github/bobnetnetwork/cms) ![GitHub language count](https://img.shields.io/github/languages/count/bobnetnetwork/cms)  [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) [![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=bugs)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=code_smells)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=ncloc)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=alert_status)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=bobnetnetwork_cms&metric=security_rating)](https://sonarcloud.io/dashboard?id=bobnetnetwork_cms) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1a48c0cd143546c9a2e04cafbe1f089a)](https://www.codacy.com/gh/bobnetnetwork/cms?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bobnetnetwork/cms&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.com/bobnetnetwork/cms.svg?branch=master)](https://travis-ci.com/bobnetnetwork/cms)

frontend:  [![Known Vulnerabilities](https://snyk.io/test/github/bobnetnetwork/cms/badge.svg?targetFile=frontend/src/package.json)](https://snyk.io/test/github/bobnetnetwork/cms?targetFile=frontend/src/package.json)

backend: [![Known Vulnerabilities](https://snyk.io/test/github/bobnetnetwork/cms/badge.svg?targetFile=backend/src/package.json)](https://snyk.io/test/github/bobnetnetwork/cms?targetFile=backend/src/package.json)

An open source CMS based on NodeJS and Angular. 

## Motivation

I started the project to develop my skills by myself.

## Buy me a coffee

Whether you use this project, have learned something from it, or just like it, please consider supporting it by [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C51L9LE), so I can dedicate more time on open-source projects like this :)

## Technologies
* NodeJS
* TypeScript
* Angular
* MongoDB
* Docker

## Docker Images
https://hub.docker.com/r/bobnetnetwork/cms
* **[Dev]Frontend**  _docker pull bobnetnetwork/cms:frontend-dev_
* **[Dev]Backend**  _docker pull bobnetnetwork/cms:backend-dev_

### ENV

####Frontend

* TIME_ZONE
* APP_PORT
* BE_PORT
* BE_ADDRESS
* NODE_ENV

####Backend

* TIME_ZONE
* APP_PORT
* DB_SERVER_TYPE
* DB_SERVER_ADDRESS
* DB_SERVER_PORT
* DB_SERVER_USER
* DB_SERVER_PWD
* DB_SERVER_DATABASE
* NODE_ENV

## License
This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
