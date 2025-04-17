import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserIdType20250416204925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. 외래 키 제약조건 제거
    await queryRunner.query(`
      ALTER TABLE \`chat_messages\` DROP FOREIGN KEY \`FK_9e5fc47ecb06d4d7b84633b1718\`
    `);

    // 2. users 테이블의 id 컬럼 타입 변경
    await queryRunner.query(`
      ALTER TABLE \`users\` CHANGE \`id\` \`id\` int NOT NULL
    `);

    // 3. 외래 키 제약조건 다시 추가
    await queryRunner.query(`
      ALTER TABLE \`chat_messages\` 
      ADD CONSTRAINT \`FK_9e5fc47ecb06d4d7b84633b1718\` 
      FOREIGN KEY (\`sender_id\`) REFERENCES \`users\` (\`id\`)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 롤백 로직
    await queryRunner.query(`
      ALTER TABLE \`chat_messages\` DROP FOREIGN KEY \`FK_9e5fc47ecb06d4d7b84633b1718\`
    `);

    await queryRunner.query(`
      ALTER TABLE \`users\` CHANGE \`id\` \`id\` varchar(36) NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE \`chat_messages\` 
      ADD CONSTRAINT \`FK_9e5fc47ecb06d4d7b84633b1718\` 
      FOREIGN KEY (\`sender_id\`) REFERENCES \`users\` (\`id\`)
    `);
  }
} 