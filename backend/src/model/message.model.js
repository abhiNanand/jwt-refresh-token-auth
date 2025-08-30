import mongoose, {Schema, model} from "mongoose";  

const messageSchema = new Schema({ 
  message:{
    type:String,
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
 },{timestamps: true});

const Message = model("Message",messageSchema);

export default Message;