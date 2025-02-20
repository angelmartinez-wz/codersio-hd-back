/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { notFoundError, validate } from '../error/index.js';
import {
  getAppointment,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../db/appointment.js';
import { getUser } from '../db/users.js';
import { getErrorsByAppointmentId } from '../db/error.js';

const getError = (id) => `Appointment with ID: ${id}`;

export const QueryAppointment = {
  appointments: (_root, _args, { user }) => {
    validate(user);
    return getAppointments();
  },

  appointment: async (_root, { id }, { user }) => {
    validate(user);

    const appointment = await getAppointment(id);

    if (!appointment) {
      notFoundError(getError(id));
    }

    return appointment;
  },
};

export const MutationAppointment = {
  createAppointment: (
    _root,
    { input: { diagnosis, date, time } },
    { user },
  ) => {
    validate(user);
    return createAppointment({ userId: user.id, diagnosis, date, time });
  },

  updateAppointment: async (
    _root,
    { input: { date, time, phone } },
    { user, appointment },
  ) => {
    validate(user);

    const appointmentId = appointment.id;

    const updatedAppointment = await updateAppointment({
      id: appointmentId,
      userId: user.id,
      date,
      time,
      phone: phone || user.phone,
      status: 'Scheduled',
    });

    if (!appointment) {
      notFoundError(getError(appointmentId));
    }

    return updatedAppointment;
  },

  deleteAppointment: async (_root, _args, { user, appointment }) => {
    validate(user);

    const appointmentId = appointment.id;

    const deletedAppointment = await updateAppointment({
      id: appointmentId,
      userId: user.id,
      status: 'Pending',
    });

    if (!appointment) {
      notFoundError(getError(appointmentId));
    }

    return deletedAppointment;
  },
};

export const Appointment = {
  user: (appointment) => getUser(appointment.userId),
  errors: (appointment) => getErrorsByAppointmentId(appointment.id),
};
