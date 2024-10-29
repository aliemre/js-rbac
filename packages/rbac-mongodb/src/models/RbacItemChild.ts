import mongoose, { Document, Schema, Model } from 'mongoose';

interface RbacItemChild extends Document {
  parent: string;
  child: string;
}

const RbacItemChildSchema: Schema<RbacItemChild> = new Schema({
  parent: {
    type: String,
    ref: 'RbacItem',
    required: true
  },
  child: {
    type: String,
    ref: 'RbacItem',
    required: true
  }
});

const RbacItemChildModel: Model<RbacItemChild> = mongoose.model<RbacItemChild>(
  'RbacItemChild',
  RbacItemChildSchema,
  'RbacItemChild'
);

export default RbacItemChildModel;
