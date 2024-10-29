import RbacItem, { RbacItemDocument } from '../models/RbacItem';

export default class RbacMongodbItemAdapter {
  constructor() {}

  async store(rbacItems: RbacItemDocument[]): Promise<RbacItemDocument[]> {
    await RbacItem.deleteMany({});
    return await RbacItem.create(rbacItems);
  }

  async load(): Promise<RbacItemDocument[]> {
    return await RbacItem.find({});
  }

  async create(name: string, type: string, rule?: string): Promise<RbacItemDocument> {
    const currentItem = await RbacItem.findOne({ name });
    if (currentItem) {
      throw new Error(`Item ${name} already exists.`);
    }

    return await RbacItem.create({ name, type, rule });
  }

  async find(name: string): Promise<RbacItemDocument | null> {
    return await RbacItem.findOne({ name });
  }

  async findByType(type: string): Promise<RbacItemDocument[]> {
    return await RbacItem.find({ type });
  }
}
