import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesForMedicalRecords1753679885400 implements MigrationInterface {
    name = 'CreateTablesForMedicalRecords1753679885400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "patient_id" integer NOT NULL, "visit_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "visit"`);
    }

}
