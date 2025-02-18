import { PubSub } from 'graphql-subscriptions';
import { createAlert, getAlerts } from '../db/alert.js';
import { getAppointment } from '../db/appointment.js';
import { generateRandomErrors, getDiagnosis } from '../utils/index.js';
import { validate } from '../error/index.js';

const pubSub = new PubSub();

export const QueryAlert = {
  alerts: async (_root, _args, { user }) => {
    validate(user);
    const alerts = await getAlerts();
    const description = await getDiagnosis(alerts);
    console.log(description);
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

  randomAlerts: async (_root, _args, { user }) => {
    validate(user);
    const alerts = generateRandomErrors();
    const updatedAlerts = [];
    alerts.forEach((alert) => {
      const message = {
        alertCode: alert.ErrorCode,
        alertDescription: alert.Description,
        alertFault: alert.Fault,
        severity: alert.SeverityLevel,
      };
      updatedAlerts.push(message);
      pubSub.publish('ALERT_ADDED', { alertAdded: message });
    });
    return updatedAlerts;
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
