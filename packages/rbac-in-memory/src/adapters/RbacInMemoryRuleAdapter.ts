interface RbacRule {
  name: string;
}

export default class RbacInMemoryRuleAdapter {
  private rbacRules: RbacRule[];

  constructor() {
    this.rbacRules = [];
  }

  async store(rbacRules: RbacRule[]): Promise<void> {
    this.rbacRules = rbacRules;
  }

  async load(): Promise<RbacRule[]> {
    return this.rbacRules;
  }

  async create(name: string): Promise<void> {
    if (this.rbacRules.find(rule => rule.name === name)) {
      throw new Error(`Rule ${name} already exists.`);
    }
    this.rbacRules.push({ name });
  }
}
