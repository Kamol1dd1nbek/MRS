import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientTable1753629156114 implements MigrationInterface {
    name = 'CreatePatientTable1753629156114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dob" date NOT NULL, "doctor_id" integer NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
