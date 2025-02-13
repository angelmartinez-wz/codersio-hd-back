import { getUserByMotorcycleId } from '../db/users.js';
import { getMotorcycles } from '../db/motorcycles.js';

export const QueryMotorcycle = {
  motorcycles: () => getMotorcycles(),
};

export const Motorcycle = {
  user: (motorcycle) => getUserByMotorcycleId(motorcycle.id),
};
