import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDoctorTable1753294049561 implements MigrationInterface {
    name = 'CreateDoctorTable1753294049561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "doctor"`);
    }

}
