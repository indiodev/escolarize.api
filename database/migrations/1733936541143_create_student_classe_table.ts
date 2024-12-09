import { StudentClassStatus } from '#utils/enum.util'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_class'
  private status = Object.keys(StudentClassStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('student_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')

      table
        .integer('class_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')

      table.enum('status', this.status).defaultTo(StudentClassStatus.RESERVE)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}