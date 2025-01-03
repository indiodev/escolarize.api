import ClassRepository from '#contracts/class.repository'
import { Create, Query, QueryPaginate, Update } from '#dtos/base.dto'
import Model from '#models/class.model'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class LucidClassRepository implements ClassRepository {
  constructor() {}

  async create(payload: Create<typeof Model>): Promise<Model> {
    return await Model.create(payload)
  }

  async update(payload: Update<typeof Model>): Promise<Model> {
    const entity = await Model.query().where('id', payload?.id!).firstOrFail()
    entity?.merge(payload)
    return await entity?.save()
  }

  async delete(id: number): Promise<void> {
    const entity = await Model.query().where('id', id!).firstOrFail()
    return await entity?.delete()
  }

  async paginate(query: QueryPaginate<typeof Model>): Promise<ModelPaginatorContract<Model>> {
    return await Model.query().paginate(query.page!, query.per_page)
  }

  async findById(id: number): Promise<Model | null> {
    return await Model.query().where('id', id).first()
  }

  async list(query: Query<typeof Model>): Promise<Model[] | null> {
    return await Model.query().if(query.schoolId, (s) =>
      s.where('school_id', query.schoolId!).preload('courses')
    )
  }
}
