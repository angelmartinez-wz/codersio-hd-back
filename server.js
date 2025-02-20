import cors from 'cors';
import express from 'express';
import { WebSocketServer } from 'ws';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer as createHttpServer } from 'node:http';
import { useServer as useWsServer } from 'graphql-ws/use/ws';
import { authMiddleware, handleLogin, decodeToken } from './auth.js';
import schema from './src/graphql/index.js';
import { getUser } from './src/db/users.js';
import { getMotorcycle } from './src/db/motorcycles.js';
import { config } from './src/config/index.js';
import { getAppointmentByUserId } from './src/db/appointment.js';

const startService = async () => {
  const app = express();

  const getHttpContext = async ({ req }) => {
    const context = {};

    if (req.auth) {
      const user = await getUser(req.auth.sub);
      const motorcycle = await getMotorcycle(user.motorcycleId);
      const appointment = await getAppointmentByUserId(user.id);
      context.user = user;
      context.motorcycle = motorcycle;
      context.appointment = appointment;
    }
    return context;
  };

  const getWsContext = ({ connectionParams }) => {
    if (connectionParams?.accessToken) {
      const { accessToken } = connectionParams;
      const payload = decodeToken(accessToken);
      return { user: payload.sub };
    }
    return {};
  };

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  app.use(cors(), express.json(), authMiddleware);
  app.post('/login', handleLogin);

  const httpServer = createHttpServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useWsServer({ schema, context: getWsContext }, wsServer);

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => getHttpContext({ req }),
    }),
  );

  httpServer.listen({ port: config.PORT }, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

startService().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
