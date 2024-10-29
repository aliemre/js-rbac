interface RbacItem {
  name: string;
  type: string;
  rule?: string;
}

export default class RbacInMemoryItemAdapter {
  private rbacItems: RbacItem[];

  constructor() {
    this.rbacItems = [];
  }

  async store(rbacItems: RbacItem[]): Promise<void> {
    this.rbacItems = rbacItems;
  }

  async load(): Promise<RbacItem[]> {
    return this.rbacItems;
  }

  async create(name: string, type: string, rule?: string): Promise<void> {
    if (this.rbacItems.find(item => item.name === name)) {
      throw new Error(`Item ${name} already exists.`);
    }
    this.rbacItems.push({ name, type, rule });
  }

  async find(name: string): Promise<RbacItem | undefined> {
    return this.rbacItems.find(rbacItem => rbacItem.name === name);
  }

  async findByType(type: string): Promise<RbacItem[]> {
    return this.rbacItems.filter(rbacItem => rbacItem.type === type);
  }
}
