import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Animals extends BaseSchema {
  protected tableName = 'animals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('codigo_animal').primary().unsigned()
      table.string('nombre_animal', 100).notNullable()
      table.string('especie', 100).notNullable()
      table.string('raza', 100).notNullable()
      table.string('genero', 100).notNullable()
      table.integer('edad').notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
