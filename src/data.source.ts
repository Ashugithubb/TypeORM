import { DataSource } from 'typeorm';
import { User } from './practice/user/entity/user.entity';

//for seeding

export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  entities: [User], 
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
