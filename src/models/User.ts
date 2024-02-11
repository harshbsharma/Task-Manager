// import mongoose, {Document,Model,Schema,model} from "mongoose";


// interface User{
//     firstname:string,
//     lastname:string,
//     email:string
// }

// interface UserDocument extends User, Document {}    


// const userSchema = new Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     // Define schema fields corresponding to User interface
// });

// // Create and export User model
// const UserModel = mongoose.model("UserModel",userSchema);
// export default UserModel;


import mongoose, { Schema, Document, Model,Types } from 'mongoose';
import { TopicDocument } from './Topic';

// Define the interface for the topic document
export interface UserDocument extends Document {
    firstname: string;
    lastname: string;
    email:string;
    password:string;
    topics:Types.ObjectId[]
}

// Define the interface for the topic model
interface UserModel extends Model<UserDocument> {}

// Define the topic schema
const userSchema = new Schema<UserDocument>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String, required:true},
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],

}, {
    timestamps: true,
});

// Define the Topic model using a singleton pattern to prevent redefinition
const User: UserModel = mongoose.models.User as UserModel || mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
