FROM node:20-bullseye

COPY ./app /apps/api

# RUN cd /

# RUN mkdir apps && cd apps && mkdir api && cd api

WORKDIR /apps/api

# COPY package*.json ./

RUN npm install -g @nestjs/cli@9.4.1

RUN npm install 

# COPY . .

EXPOSE 3000

RUN rm -rf dist temp

CMD [ "npm", "run", "start:dev" ]