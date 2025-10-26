import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.raw(`
    create table "public"."device_status" (
      "id" serial not null,
      "device_id" integer not null references "public"."devices" (id),
      "HW_version" varchar(255) not null,
      "SW_version" varchar(255) not null,
      "FW_version" varchar(255) not null,
      "status" TEXT not null,
      "created_at" timestamp not null default NOW(),
      
      constraint "device_status_pkey" primary key ("id")
    )
  `)
}


export async function down(knex: Knex): Promise<void> {
  return await knex.raw(`
    drop table "public"."device_status"
  `)
}

