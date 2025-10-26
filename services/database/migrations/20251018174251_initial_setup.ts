import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.raw(`
    create table "public"."devices" (
      "id" serial not null,
      "name" varchar(255) not null,
      "url" varchar(255) not null,
      "capabilities" TEXT[] not null,
      "created_at" timestamp not null default NOW(),
      
      constraint "devices_pkey" primary key ("id")
    )
  `)
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw(`
    drop table "public"."devices"
  `)
}
