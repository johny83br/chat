import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey} from "typeorm";

export class CreateMessages1618941375293 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: "messages",
            columns: [
            {
                name: "id",
                type: "uuid",
                isPrimary: true,
            },
            {
                name: "admin_id",
                type: "uuid",
            },
            {
                name: "user_id",
                type: "uuid",
            },
            {
                name: "text",
                type: "varchar"
            },
            {
                name: "created_at",
                type: "timestamp",
                default: "now()",
            },
            ],
        })
        );

        await queryRunner.createIndex(
            "messages",
            new TableIndex({
                name: "IDX_MESSAGES_USER_ID",
                columnNames: ["user_id"],
            })
        );

        await queryRunner.createForeignKey(
            "messages",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("messages");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("messages", foreignKey);
        await queryRunner.dropColumn("messages", "user_id");
        await queryRunner.dropTable("messages");
    }

}
