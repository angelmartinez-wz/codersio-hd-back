import { connection } from '../db/connection.js';

const getUserTable = () => connection.table('user');

export async function getUsers() {
  return getUserTable().select();
}

export async function getUser(id) {
  return getUserTable().first().where({ id });
}

export async function getUserByEmail(email) {
  return getUserTable().first().where({ email });
}

export async function getUserByMotorcycleId(motorcycleId) {
  return getUserTable().first().where({ motorcycleId });
}
