import { connection } from './connection.js';
import { generateId } from './ids.js';

const getAlertTable = () => connection.table('alert');

export async function getAlerts() {
  return getAlertTable().select().orderBy('createdAt', 'asc');
}

export async function getAlertsByAppointmentId(appointmentId) {
  return getAlertTable().select().where({ appointmentId });
}

export async function createAlert({
  alertCode,
  alertDescription,
  appointmentId,
}) {
  const message = {
    id: generateId(),
    appointmentId,
    alertCode,
    alertDescription,
    createdAt: new Date().toISOString(),
  };
  await getAlertTable().insert(message);
  return message;
}
