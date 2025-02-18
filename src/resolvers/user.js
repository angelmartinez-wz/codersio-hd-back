import { validate, notFoundError } from '../error/index.js';
import { getAppointmentsByUserId } from '../db/appointment.js';
import { getMotorcycle } from '../db/motorcycles.js';
import { getUser, getUsers } from '../db/users.js';

const getError = (id) => `User with ID: ${id}`;

export const QueryUser = {
  users: (_root, _args, { user }) => {
    validate(user);
    return getUsers()();
  },

  user: async (_root, { id }, { user }) => {
    validate(user);

    const userFound = await getUser(id);

    if (!userFound) {
      notFoundError(getError(id));
    }

    return userFound;
  },
};

export const User = {
  motorcycle: (user) => getMotorcycle(user.motorcycleId),
  appointments: (user) => getAppointmentsByUserId(user.id),
};
