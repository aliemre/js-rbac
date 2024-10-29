import RbacItemChild, { RbacItemChildDocument } from '../models/RbacItemChild';

export default class RbacMongodbItemChildAdapter {
  constructor() {}

  async store(rbacItemChildren: RbacItemChildDocument[]): Promise<RbacItemChildDocument[]> {
    await RbacItemChild.deleteMany({});
    return await RbacItemChild.create(rbacItemChildren);
  }

  async load(): Promise<RbacItemChildDocument[]> {
    return await RbacItemChild.find({});
  }

  async create(parent: string, child: string): Promise<RbacItemChildDocument> {
    const currentItemChild = await RbacItemChild.findOne({ parent, child });
    if (currentItemChild) {
      throw new Error(`Association of ${parent} and ${child} already exists.`);
    }

    return await RbacItemChild.create({ parent, child });
  }

  async findByParent(parent: string): Promise<RbacItemChildDocument[]> {
    return await RbacItemChild.find({ parent });
  }
}
