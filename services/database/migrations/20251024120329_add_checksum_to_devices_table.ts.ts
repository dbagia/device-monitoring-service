import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.raw(`
    alter table "public"."devices" 
      ADD column "checksum_algorithm" varchar(255) not null,
      ADD column "has_external_checksum" boolean not null default false,
      ADD column "checksum_generator" integer not null references "public"."checksum_generators" (id)
  `)
}


export async function down(knex: Knex): Promise<void> {
  return await knex.raw(`
    alter table "public"."devices" 
      DROP column "checksum_algorithm",
      DROP column "has_external_checksum",
      DROP column "checksum_generator"
  `)
}

