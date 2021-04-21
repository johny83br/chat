import {MigrationInterface, QueryRunner} from "typeorm";

export class ConnectionRefactoring1619033933587 implements MigrationInterface {
    name = 'ConnectionRefactoring1619033933587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" RENAME TO "temporary_connections"`);
        await queryRunner.query(`CREATE TABLE "connections" ("id" uuid PRIMARY KEY NOT NULL, "admin_id" uuid NULL, "user_id" uuid NOT NULL, "updated_at" timestamp NOT NULL DEFAULT (now()), "created_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "FK_86337b5c9ed96b6fb381a40ae61" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "connections"("id", "admin_id", "user_id", "updated_at", "created_at") SELECT "id", "admin_id", "user_id", "updated_at", "created_at" FROM "temporary_connections"`);
        await queryRunner.query(`DROP TABLE "temporary_connections"`);
        await queryRunner.query(`CREATE INDEX "IDX_CONNECTIONS_USER_ID" ON "connections" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
