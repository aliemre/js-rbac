import RbacHttpAssignmentAdapter from './adapters/RbacHttpAssignmentAdapter';
import RbacHttpRuleAdapter from './adapters/RbacHttpRuleAdapter';
import RbacHttpItemAdapter from './adapters/RbacHttpItemAdapter';
import RbacHttpItemChildAdapter from './adapters/RbacHttpItemChildAdapter';

interface RbacHttpConfiguration {
  baseUrl: string;
  headers: Record<string, string>;
}

interface RbacHierarchy {
  rbacAssignments: any;
  rbacItems: any;
  rbacItemChildren: any;
  rbacRules: any;
}

export default class RbacHttpAdapter {
  private config: RbacHttpConfiguration;
  private assignmentAdapter: RbacHttpAssignmentAdapter;
  private itemAdapter: RbacHttpItemAdapter;
  private itemChildAdapter: RbacHttpItemChildAdapter;
  private ruleAdapter: RbacHttpRuleAdapter;

  constructor({ rbacHttpConfiguration }: { rbacHttpConfiguration?: RbacHttpConfiguration }) {
    this.config = rbacHttpConfiguration || {
      baseUrl: 'http://localhost:4000',
      headers: {}
    };
    this.assignmentAdapter = new RbacHttpAssignmentAdapter(this.config);
    this.itemAdapter = new RbacHttpItemAdapter(this.config);
    this.itemChildAdapter = new RbacHttpItemChildAdapter(this.config);
    this.ruleAdapter = new RbacHttpRuleAdapter(this.config);
  }

  get dependencies(): string[] {
    return ['rbacHttpConfiguration'];
  }

  async store(rbacHierachy: RbacHierarchy): Promise<void> {
    await this.assignmentAdapter.store(rbacHierachy.rbacAssignments);
    await this.itemAdapter.store(rbacHierachy.rbacItems);
    await this.itemChildAdapter.store(rbacHierachy.rbacItemChildren);
    await this.ruleAdapter.store(rbacHierachy.rbacRules);
  }

  async load(): Promise<RbacHierarchy> {
    return {
      rbacAssignments: await this.assignmentAdapter.load(),
      rbacItems: await this.itemAdapter.load(),
      rbacItemChildren: await this.itemChildAdapter.load(),
      rbacRules: await this.ruleAdapter.load(),
    };
  }

  async findAllAssignments(): Promise<any> {
    return await this.assignmentAdapter.load();
  }

  async findAllItems(): Promise<any> {
    return await this.itemAdapter.load();
  }

  async findAllItemsChild(): Promise<any> {
    return await this.itemChildAdapter.load();
  }

  async findAllRules(): Promise<any> {
    return await this.ruleAdapter.load();
  }

  // Core for checkAccess

  async findAssignmentsByUserId(userId: string): Promise<any> {
    return await this.assignmentAdapter.findByUserId(userId);
  }

  async findItem(name: string): Promise<any> {
    return await this.itemAdapter.find(name);
  }

  async findItemChildrenByParent(name: string): Promise<any> {
    return await this.itemChildAdapter.findByParent(name);
  }

  // Core for management

  async createAssignment(userId: string, role: string): Promise<any> {
    return await this.assignmentAdapter.create(userId, role);
  }

  async findAssignment(userId: string, role: string): Promise<any> {
    return await this.assignmentAdapter.find(userId, role);
  }

  async findRoles(): Promise<any> {
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
