import { validate, notFoundError } from '../error/index.js';
import { getAppointmentsByUserId } from '../db/appointment.js';
import { getMotorcycle } from '../db/motorcycles.js';
import { getUser, getUsers, getUserByEmail } from '../db/users.js';
import { getDealershipById } from '../db/dealership.js';

const getError = (id) => `User with ID: ${id}`;

export const QueryUser = {
  users: (_root, _args, { user }) => {
    validate(user);
    return getUsers();
  },

  user: async (_root, _args, { user }) => {
    validate(user);

    const { id } = user;

    const userFound = await getUser(id);

    if (!userFound) {
      notFoundError(getError(id));
    }

    return userFound;
  },

  userByEmail: async (_root, _args, { user }) => {
    validate(user);

    const { email } = user;

    const userFound = await getUserByEmail(email);

    if (!userFound) {
      notFoundError(getError(email));
    }

    return userFound;
  },
};

export const User = {
  motorcycle: (user) => getMotorcycle(user.motorcycleId),
  appointments: (user) => getAppointmentsByUserId(user.id),
  dealership: (user) => getDealershipById(user.dealershipId),
};
