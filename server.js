import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authMiddleware, handleLogin } from './auth.js';
import schema from './src/graphql/index.js';
import { getUser } from './src/db/users.js';
import { getMotorcycle } from './src/db/motorcycles.js';

const startService = async () => {
  const PORT = 9000;
  const app = express();

  app.use(cors(), express.json(), authMiddleware);

  app.post('/login', handleLogin);

  const getContext = async ({ req }) => {
    const context = {};

    if (req.auth) {
      const user = await getUser(req.auth.sub);
      const motorcycle = await getMotorcycle(user.motorcycleId);
      context.user = user;
      context.motorcycle = motorcycle;
    }
    return context;
  };

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => getContext({ req }),
    }),
  );

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startService().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
