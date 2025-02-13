import { connection } from './connection.js';

const getMotorcycleTable = () => connection.table('motorcycle');

export async function getMotorcycles() {
  return getMotorcycleTable().select();
}

export async function getMotorcycle(id) {
  return getMotorcycleTable().first().where({ id });
}
