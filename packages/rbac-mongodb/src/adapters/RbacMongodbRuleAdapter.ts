import RbacRule, { RbacRuleDocument } from '../models/RbacRule';

export default class RbacMongodbRuleAdapter {
  constructor() {}

  async store(rbacRules: RbacRuleDocument[]): Promise<RbacRuleDocument[]> {
    await RbacRule.deleteMany({});
    return await RbacRule.create(rbacRules);
  }

  async load(): Promise<RbacRuleDocument[]> {
    return await RbacRule.find({});
  }

  async create(name: string): Promise<RbacRuleDocument> {
    return await RbacRule.create({ name });
  }
}
