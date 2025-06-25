// seed.ts
import { pgconfig } from 'src/pgconfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { MainSeeder } from './main.seeder';
// import { UserFactory } from './user/user.factory';
// import { MainSeeder } from './user/main.seeder';
// import { pgconfig } from './pgconfig';

const options: DataSourceOptions & SeederOptions = {
  ...pgconfig,
  synchronize: true, // clear+sync schema for seeding
  factories: [UserFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  console.log('Seeding done!');
  process.exit(0);
});
