// @ts-ignore
import { Model } from 'objection';

export interface RbacItemChildModel {
  parent: string;
  child: string;
}

class RbacItemChild extends Model implements RbacItemChildModel {
  parent!: string;
  child!: string;

  static get tableName(): string {
    return 'rbac_item_children';
  }

  static get idColumn(): string[] {
    return ['parent', 'child'];
  }
}

export default RbacItemChild;
