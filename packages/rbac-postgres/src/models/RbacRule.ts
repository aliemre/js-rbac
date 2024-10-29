import { Model } from 'objection';

export interface RbacRuleModel {
  name: string;
}

class RbacRule extends Model implements RbacRuleModel {
  name!: string;

  static get tableName(): string {
    return 'rbac_rules';
  }

  static get idColumn(): string {
    return 'name';
  }
}

export default RbacRule;
