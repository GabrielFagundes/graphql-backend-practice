import { ApolloServer, BaseContext } from "@apollo/server";
import fastifyApollo, {
    fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import fastify from "fastify";
import gql from "graphql-tag";
import path from "path";
import fs from "fs";
import resolvers from "./graphql/resolvers/index.js";

// Construct the directory path using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correcting for Windows file path if necessary
const correctPath = path.resolve(
    __dirname,
    process.platform === "win32" ? __dirname.substring(1) : __dirname
);

// Read and parse the schema file
const schemaPath = path.join(correctPath, "./graphql/schemas/index.graphql");

// Imports the GraphQL schema and resolvers
const typeDefs = gql`
    ${fs.readFileSync(schemaPath, "utf8")}
`;

const PORT = process.env.PORT || 4001;

const server = fastify();
const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(server)],
});

// Applies Apollo Server to Fastify
await apollo.start();
await server.register(fastifyApollo(apollo));

server.get("/", async (_, reply) => {
    reply.redirect("/graphql");
});

// Starts the server
const start = async () => {
    try {
        await server.listen({ port: 4001 });
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (err) {
        console.error("Error starting server:", err);
    }
};

start();
