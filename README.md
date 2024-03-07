# Backend Practice

This project is a Node.js application using TypeScript, GraphQL, and PostgreSQL, designed to demonstrate backend capabilities, including API integration, database management, and modern JavaScript practices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   Docker and Docker Compose (for running PostgreSQL and the app in containers)
-   A PostgreSQL database instance (if not using Docker)

### Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/GabrielFagundes/graphql-backend-practice.git
    cd graphql-backend-practice
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Environment Variables**

-   Create a copy of the file `.env.example` and rename it to `.env`
-   Add your `FOOTBALL_DATA_API_KEY=` with the key you got from the [FOOTBALL-DATA.ORG](https://www.football-data.org/client/home)

### If using Docker

-   Run the docker compose up to start the Postgres DB (on port 5432:5432) and the App (Node application) on port 4001:4001
    ```sh
     docker compose up
    ```

### If not using Docker

-   Make sure your Postgres DB is running
-   Execute the following code to generate the tables inside the database

```sh
   npx prisma migrate dev --name init
```

-   Start the application in development mode:

```sh
    npm run dev
```

-   Start the application in production mode:

```sh
    npm start
```

> You can also use only the Postgres image from docker and conect the NodeJS app from you local machine

---

## Libraries and Tools

-   **TypeScript**: Chosen for its strong typing system, which enhances code quality and maintainability by enabling type checking at compile time.

-   **GraphQL**: Used for building the API due to its flexibility in allowing clients to request exactly the data they need, reducing over-fetching and under-fetching problems common in REST APIs.

-   **@apollo/server & @as-integrations/fastify**: Apollo Server integrated with Fastify for GraphQL API. Fastify was chosen for its high performance and low overhead, and Apollo Server is a popular, feature-rich GraphQL server.

-   **Prisma**: An ORM for Node.js and TypeScript, I selected this lib for its ease of use, type safety, and powerful database management capabilities. It simplifies data modeling, migrations, and querying.

-   **PostgreSQL**: The chosen database for its robustness, performance, and compatibility with Prisma. And less problems working with transactions compared to MySQL, for example.

-   **Docker & Docker Compose**: Used to containerize the application and PostgreSQL database, ensuring consistency across development, testing, and production environments.

-   **eslint & @typescript-eslint**: ESLint with TypeScript support for linting, improving code quality and consistency.

-   **nodemon & ts-node**: Used in development for hot reloading capabilities, automatically restarting the application when file changes in the directory are detected.

-   **Zod**: A TypeScript-first schema validation with static type inference, used for validating API inputs and ensuring the integrity of data being processed.
