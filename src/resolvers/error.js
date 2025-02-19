/* eslint-disable no-param-reassign */
import { PubSub } from 'graphql-subscriptions';
import {
  createError,
  deleteErrorsByAppointmentId,
  getErrors,
  getErrorsByAppointmentId,
} from '../db/error.js';
import {
  createAppointment,
  getAppointment,
  getAppointmentByUserId,
  updateAppointment,
} from '../db/appointment.js';
import { generateRandomErrors, getDiagnosis } from '../utils/index.js';
import { validate } from '../error/index.js';

const pubSub = new PubSub();

export const QueryError = {
  errors: async (_root, _args, { user }) => {
    validate(user);
    return getErrors();
  },
};

export const MutationError = {
  randomErrors: async (_root, _args, { user }) => {
    validate(user);

    const { id: userId } = user;

    let appointment = await getAppointmentByUserId(userId);

    if (!appointment) {
      appointment = await createAppointment({ userId });
    }

    const { id } = appointment;
    let appointmentErrors = await getErrorsByAppointmentId(id);
    appointmentErrors = appointmentErrors?.map(
      // eslint-disable-next-line array-callback-return
      (error) => {
        delete error?.id;
        delete error?.createdAt;
        delete error?.appointmentId;
        return error;
      },
    );

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
          appointmentId: id,
        });

        errors.push(error);

        pubSub.publish('ERROR_ADDED', { errorAdded: error });
      }),
    );

    const diagnosis = await getDiagnosis([...errors, ...appointmentErrors]);
    console.log('[DIAGNOSIS]', diagnosis);

    await updateAppointment({ id, userId, diagnosis });

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
