import { connection } from './connection.js';
import { generateId } from './ids.js';

const getErrorTable = () => connection.table('error');

export async function getErrors() {
  return getErrorTable().select().orderBy('createdAt', 'asc');
}

export async function getErrorsByAppointmentId(appointmentId) {
  return getErrorTable().select().where({ appointmentId });
}

export async function deleteErrorsByAppointmentId(appointmentId) {
  return getErrorTable().delete().where({ appointmentId });
}

export async function createError({ code, fault, severity, appointmentId }) {
  const error = {
    id: generateId(),
    code,
    fault,
    severity,
    appointmentId,
    createdAt: new Date().toISOString(),
  };
  await getErrorTable().insert(error);
  return error;
}
