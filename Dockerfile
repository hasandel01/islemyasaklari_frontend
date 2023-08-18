# Use a base image that includes Node.js and npm
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app/react-app

# Copy the package.json, package-lock.json, and tsconfig.json to the container
COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite app (you may need to adjust this command based on your project setup)
RUN npm run build

EXPOSE 5173

# Define the command to start your Vite app
CMD ["npm", "run", "dev"]



