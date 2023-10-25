# base image 
FROM node:16 

#Creating Working directory inside container 

WORKDIR /usr/src/app

# COPYING PACKAGE.JSON ONLY 
# COPY <src-path> <destination-path>

COPY package*.json ./

# Installing All the packages which is in package.json 

RUN npm install --force 

# Copying All the Source code
COPY . . 

# Exposing the Port Number 

EXPOSE 3000 

# CMD Which will executed when we create conatiner 

CMD ["npm","start"]


