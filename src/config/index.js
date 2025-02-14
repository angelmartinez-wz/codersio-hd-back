import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: 9000,
  OPEN_IA_TOKEN: process.env.OPEN_IA_TOKEN,
};
