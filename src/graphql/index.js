/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '../resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typesArray = loadFilesSync(join(__dirname, './schemas'), {
  extensions: ['graphql'],
});

const mergedTypeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers,
});

export default schema;
