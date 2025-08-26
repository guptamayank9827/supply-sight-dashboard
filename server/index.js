import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const json = bodyParser.json;
const PORT = process.env.PORT || 4000;


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