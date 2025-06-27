import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.dataSource.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_username_not_deleted
      ON "Users" (username)
      WHERE "deletedAt" IS NULL;
    `);

    await this.dataSource.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_email_not_deleted
      ON "Users" (email)
      WHERE "deletedAt" IS NULL;
    `);
  }
}
