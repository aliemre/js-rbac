import RbacAssignment, { RbacAssignmentDocument } from '../models/RbacAssignment';

export default class RbacMongodbAssignmentAdapter {
  constructor() {}

  async store(rbacAssignments: RbacAssignmentDocument[]): Promise<RbacAssignmentDocument[]> {
    await RbacAssignment.deleteMany({});
    return await RbacAssignment.create(rbacAssignments);
  }

  async load(): Promise<RbacAssignmentDocument[]> {
    return await RbacAssignment.find({});
  }

  async create(userId: string, role: string): Promise<RbacAssignmentDocument> {
    const currentRole = await RbacAssignment.findOne({ userId: userId, role: role });
    if (currentRole) {
      throw new Error(`Role ${role} is already assigned to user ${userId}.`);
    }

    return await RbacAssignment.create({ userId: userId, role: role });
  }

  async find(userId: string, role: string): Promise<RbacAssignmentDocument | null> {
    return await RbacAssignment.findOne({ userId: userId, role: role });
  }

  async findByUserId(userId: string): Promise<RbacAssignmentDocument[]> {
    return await RbacAssignment.find({ userId: userId });
  }

  async delete(userId: string, role: string): Promise<RbacAssignmentDocument | null> {
    const currentRole = await RbacAssignment.findOne({ userId: userId, role: role });

    if (!currentRole) {
      throw new Error(`No assignment between ${userId} and ${role} was found.`);
    }

    return await RbacAssignment.findByIdAndRemove(currentRole._id);
  }

  async deleteByUser(userId: string): Promise<{ deletedCount?: number }> {
    return await RbacAssignment.deleteMany({ userId });
  }
}
