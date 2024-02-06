FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Update package lists and install netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

# Make sure the entrypoint script is executable
RUN chmod +x entrypoint.sh

EXPOSE 4001

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
