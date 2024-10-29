import RbacInMemoryAssignmentAdapter from './adapters/RbacInMemoryAssignmentAdapter';
import RbacInMemoryItemAdapter from './adapters/RbacInMemoryItemAdapter';
import RbacInMemoryItemChildAdapter from './adapters/RbacInMemoryItemChildAdapter';
import RbacInMemoryRuleAdapter from './adapters/RbacInMemoryRuleAdapter';

interface RbacHierarchy {
  rbacAssignments: any[];
  rbacItems: any[];
  rbacItemChildren: any[];
  rbacRules: any[];
}

export default class RbacInMemoryAdapter {
  private assignmentAdapter: RbacInMemoryAssignmentAdapter;
  private itemAdapter: RbacInMemoryItemAdapter;
  private itemChildAdapter: RbacInMemoryItemChildAdapter;
  private ruleAdapter: RbacInMemoryRuleAdapter;

  constructor() {
    this.assignmentAdapter = new RbacInMemoryAssignmentAdapter();
    this.itemAdapter = new RbacInMemoryItemAdapter();
    this.itemChildAdapter = new RbacInMemoryItemChildAdapter();
    this.ruleAdapter = new RbacInMemoryRuleAdapter();
  }

  /**
   * To be used with @brainstaff/injector.
   * @returns {string[]}
   */
  get dependencies(): string[] {
    return [];
  }

  async store(rbacHierarchy: RbacHierarchy): Promise<void> {
    await this.assignmentAdapter.store([...rbacHierarchy.rbacAssignments]);
    await this.itemAdapter.store([...rbacHierarchy.rbacItems]);
    await this.itemChildAdapter.store([...rbacHierarchy.rbacItemChildren]);
    await this.ruleAdapter.store([...rbacHierarchy.rbacRules]);
  }

  async load(): Promise<RbacHierarchy> {
    return {
      rbacAssignments: await this.assignmentAdapter.load(),
      rbacItems: await this.itemAdapter.load(),
      rbacItemChildren: await this.itemChildAdapter.load(),
      rbacRules: await this.ruleAdapter.load(),
    };
  }

  async findAllAssignments(): Promise<any[]> {
    return await this.assignmentAdapter.load();
  }

  async findAllItems(): Promise<any[]> {
    return await this.itemAdapter.load();
  }

  async findAllItemsChild(): Promise<any[]> {
    return await this.itemChildAdapter.load();
  }

  async findAllRules(): Promise<any[]> {
    return await this.ruleAdapter.load();
  }

  // Core for checkAccess

  async findAssignmentsByUserId(userId: string): Promise<any[]> {
    return await this.assignmentAdapter.findByUserId(userId);
  }

  async findItem(name: string): Promise<any> {
    return await this.itemAdapter.find(name);
  }

  async findItemChildrenByParent(name: string): Promise<any[]> {
    return await this.itemChildAdapter.findByParent(name);
  }

  // Core for management

  async createAssignment(userId: string, role: string): Promise<any> {
    return await this.assignmentAdapter.create(userId, role);
  }

  async findAssignment(userId: string, role: string): Promise<any> {
    return await this.assignmentAdapter.find(userId, role);
  }

  async findRoles(): Promise<any[]> {
    return await this.itemAdapter.findByType('role');
  }

  async deleteAssignment(userId: string, role?: string): Promise<any> {
    if (role) {
      return await this.assignmentAdapter.delete(userId, role);
    }
    return await this.assignmentAdapter.deleteByUser(userId);
  }

  // Management

  async createItem(name: string, type: string): Promise<any> {
    return await this.itemAdapter.create(name, type);
  }

  async createItemChild(parent: string, child: string): Promise<any> {
    return await this.itemChildAdapter.create(parent, child);
  }

  async createRule(name: string): Promise<any> {
    return await this.ruleAdapter.create(name);
  }
}
