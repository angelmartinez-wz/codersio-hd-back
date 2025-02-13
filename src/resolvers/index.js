import {
  Appointment,
  MutationAppointment,
  QueryAppointment,
} from './appointment.js';
import { Motorcycle, QueryMotorcycle } from './motorcycle.js';
import { QueryUser, User } from './user.js';

export const resolvers = {
  Query: {
    ...QueryUser,
    ...QueryMotorcycle,
    ...QueryAppointment,
  },

  Mutation: {
    ...MutationAppointment,
  },

  User,
  Motorcycle,
  Appointment,

  // User: {
  //   motorcycle: () => ({
  //     id: '7yWazK89iJ',
  //     model: 'name',
  //     color: 'phone',
  //     plate: 'phone',
  //     registration: 'phone',
  //   }),
  // },
};
