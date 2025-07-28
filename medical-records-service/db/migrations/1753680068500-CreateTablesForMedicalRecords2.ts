import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesForMedicalRecords21753680068500 implements MigrationInterface {
    name = 'CreateTablesForMedicalRecords21753680068500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "visit_id" integer NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
