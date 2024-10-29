import { Model } from 'objection';

export interface RbacItemModel {
  name: string;
  type: 'permission' | 'role';
  rule?: string;
}

class RbacItem extends Model implements RbacItemModel {
  name!: string;
  type!: 'permission' | 'role';
  rule?: string;

  static get tableName(): string {
    return 'rbac_items';
  }

  static get idColumn(): string {
    return 'name';
  }
}

export default RbacItem;
