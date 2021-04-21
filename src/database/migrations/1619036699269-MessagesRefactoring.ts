import {MigrationInterface, QueryRunner} from "typeorm";

export class MessagesRefactoring1619036699269 implements MigrationInterface {
    name = 'MessagesRefactoring1619036699269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "admin_id" varchar NULL, "user_id" varchar, "text" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_f0c944cdeed2d9b4ea7797eeae5" UNIQUE ("user_id"), CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE SET NULL)`);
        await queryRunner.query(`INSERT INTO "messages"("id", "admin_id", "user_id", "text", "created_at") SELECT "id", "admin_id", "text", "created_at", "user_id" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
        await queryRunner.query(`CREATE INDEX "IDX_MESSAGES_USER_ID" ON "messages" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}