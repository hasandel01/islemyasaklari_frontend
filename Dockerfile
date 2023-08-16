# Use a base image that includes Node.js and npm
FROM node:latest

# Set the working directory inside the container
WORKDIR /react-app

# Copy the package.json and package-lock.json to the container
COPY package.json .
COPY tsconfig.json .

# Install project dependencies
RUN npm install

COPY . .

# Define the command to start your React app
CMD ["npm", "run","dev"]
