// pgconfig.ts
import { DataSourceOptions } from 'typeorm';
import { User } from './user/entity/user.entity';

export const pgconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'test_db',
  entities: [User],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // We’ll override this in seed.ts
};
