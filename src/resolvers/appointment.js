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
    { input: { id, diagnosis, date, time, status } },
    { user },
  ) => {
    validate(user);

    const appointment = await updateAppointment({
      id,
      userId: user.id,
      diagnosis,
      date,
      time,
      status,
    });

    if (!appointment) {
      notFoundError(getError(id));
    }

    return appointment;
  },

  deleteAppointment: async (_root, { input: { id } }, { user }) => {
    validate(user);

    const appointment = await deleteAppointment({ id, userId: user.id });

    if (!appointment) {
      notFoundError(getError(id));
    }

    return appointment;
  },
};

export const Appointment = {
  user: (appointment) => getUser(appointment.userId),
  errors: (appointment) => getErrorsByAppointmentId(appointment.id),
};
