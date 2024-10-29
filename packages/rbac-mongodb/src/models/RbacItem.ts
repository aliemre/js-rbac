import mongoose, { Document, Schema, Model } from 'mongoose';

interface RbacItem extends Document {
  name: string;
  type: 'permission' | 'role';
  rule?: string;
}

const RbacItemSchema: Schema<RbacItem> = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['permission', 'role'],
    required: true
  },
  rule: {
    type: String,
    ref: 'RbacRule'
  }
});

const RbacItemModel: Model<RbacItem> = mongoose.model<RbacItem>(
  'RbacItem',
  RbacItemSchema,
  'RbacItem'
);

export default RbacItemModel;
