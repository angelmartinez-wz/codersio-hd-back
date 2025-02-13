import { getMotorcycle } from '../db/motorcycles.js';
import { getUsers } from '../db/users.js';

export const QueryUser = {
  users: () => getUsers(),
};

export const User = {
  motorcycle: (user) => getMotorcycle(user.motorcycleId),
};
