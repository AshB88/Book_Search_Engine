import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';


const server = new ApolloServer({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {

  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  if (process.env.Node_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.on('error', console.error.bind(console, 'MongoDB connection:'));

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();