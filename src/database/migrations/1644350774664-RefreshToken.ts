import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RefreshToken1644350774664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "refresh_tokens",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "expires_in",
                        type: "int",
                        isUnique: true
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_refresh_token_user",
                        columnNames: ['user_id'],
                        referencedTableName: "users",
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("refresh_tokens");
    }

}
