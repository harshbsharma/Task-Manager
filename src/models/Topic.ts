import mongoose, { Schema, Document, Model,Types } from 'mongoose';
import { UserDocument } from './User';
// Define the interface for the topic document
export interface TopicDocument extends Document {
    title: string;
    description: string;
    pending:boolean;
    user:Types.ObjectId;
}

// Define the interface for the topic model
interface TopicModel extends Model<TopicDocument> {}

// Define the topic schema
const topicSchema = new Schema<TopicDocument>({
    title: {type:String,required:true},
    description: {type:String,required:true},
    pending: {type:Boolean,default:true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

// Define the Topic model using a singleton pattern to prevent redefinition
const Topic: TopicModel = mongoose.models.Topic as TopicModel || mongoose.model<TopicDocument, TopicModel>('Topic', topicSchema);

export default Topic;
