# Use an official Node.js runtime as the base image
FROM node:18

# Set environment variables for your application (adjust these as needed)
ENV NODE_ENV=development
ENV PORT=3000

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client


# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port that your Node.js app will run on
EXPOSE $PORT

# Start your Node.js application in development mode
ENTRYPOINT [ "npm", "start" ]
