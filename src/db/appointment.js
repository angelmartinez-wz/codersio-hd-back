import { connection } from './connection.js';
import { generateId } from './ids.js';

const getAppointmentTable = () => connection.table('appointment');

export async function getAppointments() {
  return getAppointmentTable().select();
}

export async function getAppointment(id) {
  return getAppointmentTable().first().where({ id });
}

export async function getAppointmentsByUserId(userId) {
  return getAppointmentTable().select().where({ userId });
}

export async function getAppointmentByUserId(userId) {
  return getAppointmentTable().select().where({ userId }).first();
}

export async function createAppointment({ userId }) {
  const appointment = {
    id: generateId(),
    userId,
    status: 'Pending',
  };
  await getAppointmentTable().insert(appointment);
  return appointment;
}

export async function updateAppointment({
  id,
  userId,
  diagnosis,
  date,
  time,
  status,
}) {
  const appointment = await getAppointmentTable().first().where({ id, userId });
  if (!appointment) {
    return null;
  }
  const updatedFields = {
    diagnosis: diagnosis || appointment.diagnosis,
    date: date || appointment.date,
    time: time || appointment.time,
    status: status || appointment.status,
  };
  await getAppointmentTable().update(updatedFields).where({ id, userId });
  return { ...updatedFields, ...appointment };
}

export async function deleteAppointment({ id, userId }) {
  const appointment = await getAppointmentTable().first().where({ id, userId });
  if (!appointment) {
    return null;
  }
  await getAppointmentTable().delete().where({ id, userId });
  return appointment;
}
