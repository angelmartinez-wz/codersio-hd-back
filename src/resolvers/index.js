import {
  Alert,
  MutationAlert,
  QueryAlert,
  SubscriptionAlert,
} from './alert.js';
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
    ...QueryAlert,
  },

  Mutation: {
    ...MutationAppointment,
    ...MutationAlert,
  },

  User,
  Motorcycle,
  Appointment,
  Alert,

  Subscription: {
    ...SubscriptionAlert,
  },
};
