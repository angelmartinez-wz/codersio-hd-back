import { PubSub } from 'graphql-subscriptions';
import {
  createError,
  deleteErrorsByAppointmentId,
  getErrors,
} from '../db/error.js';
import {
  createAppointment,
  getAppointment,
  getAppointmentByUserId,
} from '../db/appointment.js';
import { generateRandomErrors, getDiagnosis } from '../utils/index.js';
import { validate } from '../error/index.js';

const pubSub = new PubSub();

export const QueryError = {
  errors: async (_root, _args, { user }) => {
    validate(user);
    const errors = await getErrors();
    const description = await getDiagnosis(errors);
    console.log(description);
    return errors;
  },
};

export const MutationError = {
  randomErrors: async (_root, _args, { user }) => {
    validate(user);

    const { id } = user;

    let appointment = await getAppointmentByUserId(id);

    if (!appointment) {
      appointment = await createAppointment({ userId: id });
    }

    const randomErrors = generateRandomErrors();
    const errors = [];

    await Promise.all(
      randomErrors?.map(async ({ code, fault, severity }) => {
        const error = {
          code,
          fault,
          severity,
        };

        await createError({
          ...error,
          appointmentId: appointment.id,
        });

        errors.push(error);

        pubSub.publish('ERROR_ADDED', { errorAdded: error });
      }),
    );

    return errors;
  },

  deleteErrors: async (_root, _args, { user }) => {
    validate(user);
    const appointment = await getAppointmentByUserId(user.id);
    await deleteErrorsByAppointmentId(appointment.id);
    return true;
  },
};

export const SubscriptionError = {
  errorAdded: {
    subscribe: (_root, _args, { user }) => {
      validate(user);
      return pubSub.asyncIterableIterator('ERROR_ADDED');
    },
  },
};

export const Error = {
  appointment: (error) => getAppointment(error.appointmentId),
};
