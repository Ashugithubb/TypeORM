import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUser1750739355373 implements MigrationInterface {
    name = 'AddPasswordToUser1750739355373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL DEFAULT 'password'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
