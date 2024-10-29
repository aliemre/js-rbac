import RbacPostgresAssignmentAdapter from './adapters/RbacPostgresAssignmentAdapter';
import RbacPostgresItemAdapter from './adapters/RbacPostgresItemAdapter';
import RbacPostgresItemChildAdapter from './adapters/RbacPostgresItemChildAdapter';
import RbacPostgresRuleAdapter from './adapters/RbacPostgresRuleAdapter';

import RbacAssignment from './models/RbacAssignment';
import RbacItem from './models/RbacItem';
import RbacItemChild from './models/RbacItemChild';
import RbacRule from './models/RbacRule';

interface RbacHierarchy {
  rbacAssignments: any[];
  rbacItems: any[];
  rbacItemChildren: any[];
  rbacRules: any[];
}

class RbacPostgresAdapter {
  private assignmentAdapter: RbacPostgresAssignmentAdapter;
  private itemAdapter: RbacPostgresItemAdapter;
  private itemChildAdapter: RbacPostgresItemChildAdapter;
  private ruleAdapter: RbacPostgresRuleAdapter;

  constructor({ knex }: { knex: any }) {
    RbacAssignment.knex(knex);
    RbacItem.knex(knex);
    RbacItemChild.knex(knex);
    RbacRule.knex(knex);

    this.assignmentAdapter = new RbacPostgresAssignmentAdapter();
    this.itemAdapter = new RbacPostgresItemAdapter();
    this.itemChildAdapter = new RbacPostgresItemChildAdapter();
    this.ruleAdapter = new RbacPostgresRuleAdapter();
  }

  async store(rbacHierarchy: RbacHierarchy): Promise<void> {
    await this.assignmentAdapter.store(rbacHierarchy.rbacAssignments);
    await this.itemAdapter.store(rbacHierarchy.rbacItems);
    await this.itemChildAdapter.store(rbacHierarchy.rbacItemChildren);
    await this.ruleAdapter.store(rbacHierarchy.rbacRules);
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

export default RbacPostgresAdapter;
