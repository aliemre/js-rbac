interface RbacItemChild {
  parent: string;
  child: string;
}

export default class RbacInMemoryItemChildAdapter {
  private rbacItemChildren: RbacItemChild[];

  constructor() {
    this.rbacItemChildren = [];
  }

  async store(rbacItemChildren: RbacItemChild[]): Promise<void> {
    this.rbacItemChildren = rbacItemChildren;
  }

  async load(): Promise<RbacItemChild[]> {
    return this.rbacItemChildren;
  }

  async create(parent: string, child: string): Promise<void> {
    if (this.rbacItemChildren.find(itemChild => itemChild.parent === parent && itemChild.child === child)) {
      throw new Error(`Association of ${parent} and ${child} already exists.`);
    }
    this.rbacItemChildren.push({ parent, child });
  }

  async findByParent(parent: string): Promise<RbacItemChild[]> {
    return this.rbacItemChildren.filter(rbacItemChild => rbacItemChild.parent === parent);
  }
}
