// eslint-disable-next-line import/extensions
import { connection } from '../src/db/connection.js';

const { schema } = connection;

async function setupDatabase() {
  await schema.dropTableIfExists('error');
  await schema.dropTableIfExists('appointment');
  await schema.dropTableIfExists('user');
  await schema.dropTableIfExists('dealership');
  await schema.dropTableIfExists('motorcycle');

  await schema.createTable('motorcycle', (table) => {
    table.text('id').notNullable().primary();
    table.text('model').notNullable();
    table.text('color').notNullable();
    table.text('plate').notNullable();
    table.text('registration').notNullable();
    table.text('image').notNullable();
  });

  await schema.createTable('dealership', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('direction').notNullable();
    table.text('phone').notNullable();
    table.text('image').notNullable();
    table.text('distance').notNullable();
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
    table
      .text('dealershipId')
      .notNullable()
      .references('id')
      .inTable('dealership');
  });

  await schema.createTable('appointment', (table) => {
    table.text('id').notNullable().primary();
    table.text('userId').notNullable().references('id').inTable('user');
    table.text('diagnosis').notNullable();
    table.text('date').notNullable();
    table.text('time').notNullable();
    table.enu('status', ['Pending', 'Completed']).notNullable();
  });

  await schema.createTable('error', (table) => {
    table.text('id').notNullable().primary();
    table.text('code').notNullable();
    table.text('fault').notNullable();
    table.text('severity').notNullable();
    table.text('createdAt').notNullable();
    table
      .text('appointmentId')
      .notNullable()
      .references('id')
      .inTable('appointment');
  });

  await connection.table('motorcycle').insert([
    {
      id: 'LFcExWtbWDbL',
      model: 'Road King Special',
      color: 'Black',
      plate: 'NY-764M2C',
      registration: 'NY, NY',
      image:
        'https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2025/2025-road-king-special/2025-road-king-special-m04b/360/2025-road-king-special-m04b-motorcycle-01.jpg',
    },
    {
      id: 'sa4V2DqJBPvn',
      model: 'CVO Road Glide ST',
      color: 'Green',
      plate: 'CA-82X6HP',
      registration: 'Los Angeles, California',
      image:
        'https://d2bywgumb0o70j.cloudfront.net/2022/01/27/2e20af57d0a9930ce3ed3b3d95ff3582_8c8bb363e7ce3a44.jpg',
    },
  ]);

  await connection.table('dealership').insert([
    {
      id: 'U5YBHVlLdPDb',
      name: 'Javelina Harley-Davidson',
      direction: '29078 Interstate 10 Frontage Rd, Boerne, TX 78006, USA',
      phone: '+18307555202',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipPSFgadVhJ_PF40cPuy1FLioCMQpcafpL0VpwAL=w427-h240-k-no',
      distance: '2.2 mi',
    },
    {
      id: 'CbtZ8fLywLl3',
      name: "Teddy Morse's Cowboy Harley",
      direction: '11005 I-35 Frontage Rd, San Antonio, TX 78233, USA',
      phone: '+12106460499',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOdfKbGy5rxpbevcuj0xtmzERT1WAEP6H2QrShl=w408-h270-k-no',
      distance: '8.9 mi',
    },
    {
      id: 'lI0CosZ65gHP',
      name: 'Gruene Harley-Davidson',
      direction: '1288 TX-337 Loop, New Braunfels, TX 78130, USA',
      phone: '+18306242473',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipMRjDDUf-8mRpHV1j8YBfeVxkMaKGBdeT8mjed7=w426-h240-k-no',
      distance: '5.7 mi',
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
      dealershipId: 'U5YBHVlLdPDb',
    },
    {
      id: 'BvBNW636Z89L',
      name: 'Mitzi Torales',
      email: 'mitzi@hd.com',
      phone: '5526398745',
      password: 'mitzi123',
      membership: 'HD-2025-002',
      motorcycleId: 'sa4V2DqJBPvn',
      dealershipId: 'lI0CosZ65gHP',
    },
  ]);

  await connection.table('appointment').insert([
    {
      id: 'f3YzmnBZpK0o',
      userId: 'AcMJpL7b413Z',
      diagnosis: '',
      date: '2025-01-26',
      time: '13:45 PM',
      status: 'Pending',
    },
    {
      id: 'GSwvGr28YZGU',
      userId: 'BvBNW636Z89L',
      diagnosis: '',
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
