import { connection } from './connection.js';

const getDealershipTable = () => connection.table('dealership');

export async function getDealerships() {
  return getDealershipTable().select();
}
