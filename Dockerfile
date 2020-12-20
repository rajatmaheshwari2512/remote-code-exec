FROM ubuntu
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -y
RUN npm install -y
RUN apt-get install build-essential -y
RUN apt-get install python3
COPY . .
CMD ["npm","run","dev"]
