import mongoose, { Document, Schema, Model } from 'mongoose';

interface RbacAssignment extends Document {
  role: string;
  userId: string;
}

const RbacAssignmentSchema: Schema<RbacAssignment> = new Schema({
  role: {
    type: String,
    ref: 'RbacItem',
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const RbacAssignmentModel: Model<RbacAssignment> = mongoose.model<RbacAssignment>(
  'RbacAssignment',
  RbacAssignmentSchema,
  'RbacAssignment'
);

export default RbacAssignmentModel;
