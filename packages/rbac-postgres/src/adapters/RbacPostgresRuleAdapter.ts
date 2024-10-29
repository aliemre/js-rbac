import RbacRule, { RbacRuleModel } from '../models/RbacRule';

class RbacPostgresRuleAdapter {
  async store(rbacRules: RbacRuleModel[]): Promise<RbacRuleModel[]> {
    await RbacRule.query().delete();
    const rules = await RbacRule.query().insert(rbacRules);
    return rules.map(rule => rule.toJSON());
  }

  async load(): Promise<RbacRuleModel[]> {
    const rules = await RbacRule.query();
    return rules.map(rule => rule.toJSON());
  }

  async create(name: string): Promise<RbacRuleModel | null> {
    let rule = await RbacRule.query().findById(name);
    if (rule) {
      throw new Error(`Rule ${name} already exists.`);
    }
    rule = await RbacRule.query().insert({ name });
    return rule.toJSON();
  }
}

export default RbacPostgresRuleAdapter;
