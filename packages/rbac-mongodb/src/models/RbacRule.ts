import mongoose, { Document, Schema, Model } from 'mongoose';

interface RbacRule extends Document {
  name: string;
}

const RbacRuleSchema: Schema<RbacRule> = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

const RbacRuleModel: Model<RbacRule> = mongoose.model<RbacRule>(
  'RbacRule',
  RbacRuleSchema,
  'RbacRule'
);

export default RbacRuleModel;
