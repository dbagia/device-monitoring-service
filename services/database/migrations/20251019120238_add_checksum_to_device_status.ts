import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.raw(`
    alter table "public"."device_status" 
      ADD column "checksum" TEXT not null
  `)
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw(`
    alter table "public"."device_status" 
      drop column "checksum"
  `)
}
