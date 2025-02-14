import { getDealerships } from '../db/dealership.js';
import { notAuthorizedError } from '../error/index.js';

const validate = (user) => !user && notAuthorizedError();

export const QueryDealership = {
  dealerships: async (_root, _args, { user }) => {
    validate(user);
    return getDealerships();
  },
};
