import {RbacManagerParamsType} from "./types/RbacManagerParamsType";

export class RbacManager {
  private readonly rbacCacheAdapter: any;
  private readonly rbacPersistentAdapter: any;
  private readonly rbacRuleFactory: any;
  private isCacheLoaded: boolean;

  constructor({ rbacCacheAdapter, rbacPersistentAdapter, rbacRuleFactory }: RbacManagerParamsType) {
    this.rbacCacheAdapter = rbacCacheAdapter;
    this.rbacPersistentAdapter = rbacPersistentAdapter;
    this.rbacRuleFactory = rbacRuleFactory;
    this.isCacheLoaded = false;
  }

  /**
   * To be used with @brainstaff/injector.
   * @returns {string[]}
   */
  get dependencies(): string[] {
    return [
      'rbacCacheAdapter',
      'rbacPersistentAdapter',
      'rbacRuleFactory'
    ];
  }

  async loadCache(): Promise<void> {
    await this.rbacCacheAdapter.store(await this.rbacPersistentAdapter.load());
    this.isCacheLoaded = true;
  }

  get currentAdapter(): any {
    return this.isCacheLoaded ? this.rbacCacheAdapter : this.rbacPersistentAdapter;
  }

  async checkAccess(userId: string, permissionOrRoleName: string, payload: any): Promise<boolean> {
    const assignments = await this.currentAdapter.findAssignmentsByUserId(userId);
    for (let i = 0; i < assignments.length; i++) {
      if (await this.checkItem(assignments[i].role, permissionOrRoleName, payload)) {
        return true;
      }
    }
    return false;
  }

  async checkItem(currentItemName: string, expectedItemName: string, payload: any): Promise<boolean> {
    const currentItem = await this.currentAdapter.findItem(currentItemName);
    if (!currentItem) {
      return false;
    }
    if (currentItemName === expectedItemName) {
      if (currentItem.type === 'permission' && currentItem.rule) {
        return await this.rbacRuleFactory.createRule(currentItem.rule).execute(payload);
      } else {
        return true;
      }
    } else {
      if (currentItem.type === 'permission' && currentItem.rule) {
        if (!(await this.rbacRuleFactory.createRule(currentItem.rule).execute(payload))) {
          return false;
        }
      }
      const children = await this.currentAdapter.findItemChildrenByParent(currentItemName);
      for (let i = 0; i < children.length; i++) {
        if (await this.checkItem(children[i].child, expectedItemName, payload)) {
          return true;
        }
      }
      return false;
    }
  }

  async assign(userId: string, role: string): Promise<boolean> {
    const item = await this.currentAdapter.findItem(role);
    if (!item || item.type !== 'role') {
      throw new Error(`No such role ${role}.`);
    }
    const assignment = await this.currentAdapter.findAssignment(userId, role);
    if (assignment) {
      return true;
    }
    if (this.isCacheLoaded) {
      await this.rbacCacheAdapter.createAssignment(userId, role);
    }
    return await this.rbacPersistentAdapter.createAssignment(userId, role);
  }

  async revoke(userId: string, role: string): Promise<boolean> {
    const assignment = await this.currentAdapter.findAssignment(userId, role);
    if (!assignment) {
      throw new Error(`Role "${role}" is not attached to the "${userId}".`);
    }
    if (this.isCacheLoaded) {
      await this.rbacCacheAdapter.deleteAssignment(userId, role);
    }
    return await this.rbacPersistentAdapter.deleteAssignment(userId, role);
  }

  async revokeAll(userId: string): Promise<boolean> {
    if (this.isCacheLoaded) {
      await this.rbacCacheAdapter.deleteAssignment(userId);
    }
    return await this.rbacPersistentAdapter.deleteAssignment(userId);
  }

  async fetchUserAssignments(userId: string): Promise<any[]> {
    return await this.currentAdapter.findAssignmentsByUserId(userId);
  }

  async fetchRoles(): Promise<any[]> {
    return await this.currentAdapter.findRoles();
  }

  async fetchAllAssignments(): Promise<any[]> {
    return await this.currentAdapter.findAllAssignments();
  }

  async fetchAllItems(): Promise<any[]> {
    return await this.currentAdapter.findAllItems();
  }

  async fetchAllItemsChild(): Promise<any[]> {
    return await this.currentAdapter.findAllItemsChild();
  }

  async fetchAllRules(): Promise<any[]> {
    return await this.currentAdapter.findAllRules();
  }
}
