import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.raw(`
    create table "public"."checksum_generators" (
      "id" serial not null,
      "name" VARCHAR(255) not null,
      "created_at" timestamp not null default NOW(),
      
      constraint "checksum_generators_pkey" primary key ("id")
    )
  `)
}


export async function down(knex: Knex): Promise<void> {
  return await knex.raw(`
    drop table "public"."checksum_generators"
  `)
}

