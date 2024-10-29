import RbacItem, { RbacItemModel } from '../models/RbacItem';

class RbacPostgresItemAdapter {
  async store(rbacItems: RbacItemModel[]): Promise<RbacItemModel[]> {
    await RbacItem.query().delete();
    const items = await RbacItem.query().insert(rbacItems);
    return items.map(item => item.toJSON());
  }

  async load(): Promise<RbacItemModel[]> {
    const items = await RbacItem.query();
    return items.map(item => item.toJSON());
  }

  async create(name: string, type: string, rule?: string): Promise<RbacItemModel> {
    let item = await RbacItem.query().findOne({ name });
    if (item) {
      throw new Error(`Item ${name} already exists.`);
    }

    item = await RbacItem.query().insert({ name, type, rule });
    return item.toJSON();
  }

  async find(name: string): Promise<RbacItemModel | null> {
    const item = await RbacItem.query().findById(name);
    return item ? item.toJSON() : null;
  }

  async findByType(type: string): Promise<RbacItemModel[]> {
    const items = await RbacItem.query().where({ type });
    return items.map(item => item.toJSON());
  }
}

export default RbacPostgresItemAdapter;
