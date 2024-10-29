import RbacAssignment, { RbacAssignmentModel } from '../models/RbacAssignment';

class RbacPostgresAssignmentAdapter {
  async store(rbacAssignments: RbacAssignmentModel[]): Promise<RbacAssignmentModel[]> {
    await RbacAssignment.query().delete();
    const assignments = await RbacAssignment.query().insert(rbacAssignments);
    return assignments.map(assignment => assignment.toJSON());
  }

  async load(): Promise<RbacAssignmentModel[]> {
    const assignments = await RbacAssignment.query();
    return assignments.map(assignment => assignment.toJSON());
  }

  async create(userId: string, role: string): Promise<RbacAssignmentModel> {
    let assignment = await RbacAssignment.query().findById([userId, role]);
    if (assignment) {
      throw new Error(`Role ${role} is already assigned to user ${userId}.`);
    }
    assignment = await RbacAssignment.query().insert({ userId, role });
    return assignment.toJSON();
  }

  async find(userId: string, role: string): Promise<RbacAssignmentModel | null> {
    const assignment = await RbacAssignment.query().findById([userId, role]);
    return assignment ? assignment.toJSON() : null;
  }

  async findByUserId(userId: string): Promise<RbacAssignmentModel[]> {
    const assignments = await RbacAssignment.query().where({ userId });
    return assignments.map(assignment => assignment.toJSON());
  }

  async delete(userId: string, role: string): Promise<RbacAssignmentModel> {
    const assignment = await RbacAssignment.query().findById([userId, role]);
    if (!assignment) {
      throw new Error(`No assignment between ${userId} and ${role} was found.`);
    }
    await RbacAssignment.query().deleteById([userId, role]);
    return assignment.toJSON();
  }

  async deleteByUser(userId: string): Promise<RbacAssignmentModel[]> {
    let assignments = await RbacAssignment.query().where({ userId });
    await RbacAssignment.query().where({ userId }).delete();
    return assignments.map(assignment => assignment.toJSON());
  }
}

export default RbacPostgresAssignmentAdapter;
