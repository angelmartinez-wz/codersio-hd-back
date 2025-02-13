// eslint-disable-next-line import/extensions
import { connection } from '../src/db/connection.js';

const { schema } = connection;

async function setupDatabase() {
  await schema.dropTableIfExists('motorcycle');
  await schema.dropTableIfExists('user');
  await schema.dropTableIfExists('appointment');

  await schema.createTable('motorcycle', (table) => {
    table.text('id').notNullable().primary();
    table.text('model').notNullable();
    table.text('color').notNullable();
    table.text('plate').notNullable();
    table.text('registration').notNullable();
  });

  await schema.createTable('user', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.text('phone').notNullable();
    table.text('password').notNullable();
    table.text('membership').notNullable();
    table
      .text('motorcycleId')
      .notNullable()
      .references('id')
      .inTable('motorcycle');
  });

  await schema.createTable('appointment', (table) => {
    table.text('id').notNullable().primary();
    table.text('userId').notNullable().references('id').inTable('user');
    table.text('diagnosis').notNullable();
    table.text('date').notNullable();
    table.text('time').notNullable();
    table.enu('status', ['Pending', 'Completed']).notNullable();
  });

  await connection.table('motorcycle').insert([
    {
      id: 'LFcExWtbWDbL',
      model: 'Road King Special',
      color: 'Black',
      plate: 'NY-764M2C',
      registration: 'NY, NY',
    },
    {
      id: 'sa4V2DqJBPvn',
      model: 'CVO Road Glide ST',
      color: 'Black',
      plate: 'CA-82X6HP',
      registration: 'Los Angeles, California',
    },
  ]);

  await connection.table('user').insert([
    {
      id: 'AcMJpL7b413Z',
      name: 'Angel Martinez',
      email: 'angel@hd.com',
      phone: '5512325489',
      password: 'angel123',
      membership: 'HD-2025-001',
      motorcycleId: 'LFcExWtbWDbL',
    },
    {
      id: 'BvBNW636Z89L',
      name: 'Mitzi Torales',
      email: 'mitzi@hd.com',
      phone: '5526398745',
      password: 'mitzi123',
      membership: 'HD-2025-002',
      motorcycleId: 'sa4V2DqJBPvn',
    },
  ]);

  await connection.table('appointment').insert([
    {
      id: 'f3YzmnBZpK0o',
      userId: 'AcMJpL7b413Z',
      diagnosis: 'Air Bag',
      date: '2025-01-26',
      time: '13:45 PM',
      status: 'Pending',
    },
    {
      id: 'GSwvGr28YZGU',
      userId: 'BvBNW636Z89L',
      diagnosis: 'Motor',
      date: '2025-01-26',
      time: '11:20 AM',
      status: 'Pending',
    },
  ]);

  process.exit();
}

setupDatabase().catch((err) => {
  console.error('Error setting up database:', err);
  process.exit(1);
});
