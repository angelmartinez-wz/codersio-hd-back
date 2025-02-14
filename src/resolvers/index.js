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
import { QueryDealership } from './dealership.js';
import { Motorcycle, QueryMotorcycle } from './motorcycle.js';
import { QueryUser, User } from './user.js';

export const resolvers = {
  Query: {
    ...QueryUser,
    ...QueryMotorcycle,
    ...QueryAppointment,
    ...QueryAlert,
    ...QueryDealership,
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
