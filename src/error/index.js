import { GraphQLError } from 'graphql';

export const notFoundError = (element = '') => {
  throw new GraphQLError(`Not Found: ${element}`, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
};

export const notAuthorizedError = (message = 'Unauthorized User') => {
  throw new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED',
    },
  });
};
