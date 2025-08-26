import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const json = bodyParser.json;
const PORT = process.env.PORT || 4000;

// SCHEMA
const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;


// RESOLVERS
const resolvers = {
    Query: {
        hello: () => 'Hello from Apollo Server!'
    }
};


async function start() {
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app.use('/graphql', cors(), json(), expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
}

start();