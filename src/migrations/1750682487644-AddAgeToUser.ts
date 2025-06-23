import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToUser1750682487644 implements MigrationInterface {
    name = 'AddAgeToUser1750682487644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL DEFAULT '50'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
