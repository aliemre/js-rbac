import { Model } from 'objection';

export interface RbacAssignmentModel {
  userId: string;
  role: string;
}

class RbacAssignment extends Model implements RbacAssignmentModel {
  userId!: string;
  role!: string;

  static get tableName(): string {
    return 'rbac_assignments';
  }

  static get idColumn(): string[] {
    return ['userId', 'role'];
  }
}

export default RbacAssignment;
