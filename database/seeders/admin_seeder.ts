import User from '#models/user.model'
import { Role } from '#utils/enum.util'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    const exist = await User.query().where('email', 'admin@jedais.com.br').first()

    if (exist) return

    await User.create({
      email: 'administrador@indiosm.com',
      password: 'administrador@indiosm.com',
      name: 'Administrador',
      role: Role.ADMIN,
    })
  }
}