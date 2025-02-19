import {
  Error,
  MutationError,
  QueryError,
  SubscriptionError,
} from './error.js';
import {
  Appointment,
  MutationAppointment,
  QueryAppointment,
} from './appointment.js';
import { QueryDealership } from './dealership.js';
import { Motorcycle, QueryMotorcycle } from './motorcycle.js';
import { QueryUser, User } from './user.js';

export const resolvers = {
  Query: {
    ...QueryUser,
    ...QueryMotorcycle,
    ...QueryAppointment,
    ...QueryError,
    ...QueryDealership,
  },

  Mutation: {
    ...MutationAppointment,
    ...MutationError,
  },

  User,
  Motorcycle,
  Appointment,
  Error,

  Subscription: {
    ...SubscriptionError,
  },
};
