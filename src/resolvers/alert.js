import { PubSub } from 'graphql-subscriptions';
import { notAuthorizedError } from '../error/index.js';
import { createAlert, getAlerts } from '../db/alert.js';
import { getAppointment } from '../db/appointment.js';
// import { getDiagnosis } from '../utils/index.js';

const pubSub = new PubSub();
const validate = (user) => !user && notAuthorizedError();

export const QueryAlert = {
  alerts: async (_root, _args, { user }) => {
    validate(user);
    const alerts = await getAlerts();
    // const description = await getDiagnosis(alerts);
    // console.log(description);
    return alerts;
  },
};

export const MutationAlert = {
  addAlerts: async (_root, { input: { alerts, appointmentId } }, { user }) => {
    validate(user);

    const alertMessages = await Promise.all(
      alerts.map(async ({ alertCode, alertDescription }) => {
        const response = await createAlert({
          alertCode,
          alertDescription,
          appointmentId,
        });

        pubSub.publish('ALERT_ADDED', { alertAdded: response });

        return response;
      }),
    );

    return alertMessages;
  },
};

export const SubscriptionAlert = {
  alertAdded: {
    subscribe: (_root, _args, { user }) => {
      validate(user);
      return pubSub.asyncIterableIterator('ALERT_ADDED');
    },
  },
};

export const Alert = {
  appointment: (alert) => getAppointment(alert.appointmentId),
};
