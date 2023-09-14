# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application source code to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Define the command to start your Next.js application
CMD ["npm", "start"]
