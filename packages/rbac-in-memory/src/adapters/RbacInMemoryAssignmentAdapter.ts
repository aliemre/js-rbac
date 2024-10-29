interface RbacAssignment {
  userId: string;
  role: string;
}

export default class RbacInMemoryAssignmentAdapter {
  private rbacAssignments: RbacAssignment[];

  constructor() {
    this.rbacAssignments = [];
  }

  async store(rbacAssignments: RbacAssignment[]): Promise<void> {
    this.rbacAssignments = rbacAssignments;
  }

  async load(): Promise<RbacAssignment[]> {
    return this.rbacAssignments;
  }

  async create(userId: string, role: string): Promise<void> {
    if (this.rbacAssignments.find(assignment => assignment.userId === userId && assignment.role === role)) {
      throw new Error(`Role ${role} is already assigned to user ${userId}.`);
    }
    this.rbacAssignments.push({ userId, role });
  }

  async find(userId: string, role: string): Promise<RbacAssignment | undefined> {
    return this.rbacAssignments.find(assignment => assignment.userId === userId && assignment.role === role);
  }

  async findByUserId(userId: string): Promise<RbacAssignment[]> {
    return this.rbacAssignments.filter(assignment => assignment.userId === userId);
  }

  async delete(userId: string, role: string): Promise<void> {
    const assignmentIndex = this.rbacAssignments.findIndex(assignment => assignment.userId === userId && assignment.role === role);
    if (assignmentIndex !== -1) {
      this.rbacAssignments.splice(assignmentIndex, 1);
    } else {
      throw new Error(`No assignment between ${userId} and ${role} was found.`);
    }
  }

  async deleteByUser(userId: string): Promise<void> {
    let i = this.rbacAssignments.length;
    while (i--) {
      if (this.rbacAssignments[i].userId === userId) {
        this.rbacAssignments.splice(i, 1);
      }
    }
  }
}
