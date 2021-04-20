import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateConnections1618935400621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "connections",
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
            name: "updated_at",
            type: "timestamp",
            default: "now()",
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
      "connections",
      new TableIndex({
        name: "IDX_CONNECTIONS_USER_ID",
        columnNames: ["user_id"],
      })
    );

    await queryRunner.createForeignKey(
      "connections",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("connections");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
    await queryRunner.dropForeignKey("connections", foreignKey);
    await queryRunner.dropColumn("connections", "user_id");
    await queryRunner.dropTable("connections");
  }
}
