import {MigrationInterface, QueryRunner} from "typeorm";

export class ConnectionsRefactoring1619110130438 implements MigrationInterface {
    name = 'ConnectionsRefactoring1619110130438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_CONNECTIONS_USER_ID"`);
        await queryRunner.query(`DROP TABLE "connections"`);
        await queryRunner.query(`CREATE TABLE "connections" ("id" varchar PRIMARY KEY NOT NULL, "admin_id" varchar NULL, "user_id" varchar NOT NULL, "socket_id" varchar NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_86337b5c9ed96b6fb381a40ae61" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE SET NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_CONNECTIONS_USER_ID" ON "connections" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
