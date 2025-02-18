import { validate } from '../error/index.js';
import { getDealerships } from '../db/dealership.js';

export const QueryDealership = {
  dealerships: async (_root, _args, { user }) => {
    validate(user);
    return getDealerships();
  },
};
