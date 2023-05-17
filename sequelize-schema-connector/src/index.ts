import { Model, ModelStatic } from 'sequelize'
import { MakeNullishOptional } from 'sequelize/types/utils';

interface Actions<Attributes extends { id: string | number }, CreationAttributes extends object = Attributes> {
    getOne: (
        identifier: Attributes['id'],
        opts?: { req: any; res: any; }
    ) => Promise<Model<Attributes, CreationAttributes> | null>,
    create: (
        body: CreationAttributes,
        opts?: { req: any; res: any; }
    ) => Promise<Model<Attributes, CreationAttributes>>,
    destroy: (id: Attributes['id'], opts?: { req: any; res: any; }) => Promise<{ id: Attributes['id'] }>,
    update: (
        id: Attributes['id'],
        data: Partial<Attributes>,
        opts?: { req: any; res: any; }
    ) => Promise<Model<Attributes, CreationAttributes>>,
    getList: (
        conf: {
            filter: Record<string, any>
            limit: number
            offset: number
            order: Array<[string, string]>
        },
        opts?: { req: any; res: any; }
    ) => Promise<{rows: Model<Attributes, CreationAttributes>[], count: number }>
}

const schema = (opts?: { req: any, res: any }) => opts?.req?.user?.schema

const sequelizeSchemaCrud = <
    Attributes extends { id: string | number },
    CreationAttributes extends object = Attributes
    >(model: ModelStatic<Model<Attributes, CreationAttributes>>): Actions<Attributes, CreationAttributes> => {
    return {
        create: (body, opts) => model.schema(schema(opts)).create(body as unknown as MakeNullishOptional<CreationAttributes>),
        update: async (id, body, opts) => {
            const record = await model.schema(schema(opts)).findByPk(id)
            if (!record) {
                throw new Error('Record not found')
            }
            return record.update(body)
        },
        getOne: async (id, opts) =>  model.schema(schema(opts)).findByPk(id),
        getList: async ({ filter, limit, offset, order }, opts) => {
            return model.schema(schema(opts)).findAndCountAll({
                limit,
                offset,
                order,
                where: filter,
                raw: true,
            })
        },
        destroy: async (id, opts) => {
            const record = await model.schema(schema(opts)).findByPk(id)
            if (!record) {
                throw new Error('Record not found')
            }
            await record.destroy()
            return { id }
        },
    }
}

export default sequelizeSchemaCrud
