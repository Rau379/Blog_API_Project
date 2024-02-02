import mongoose from "mongoose"

const Schema = mongoose.Schema;

const  userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:8
    },
    blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", required:true}]
});
// Method to compare a given password with the password stored in the database
export default mongoose.model("user", userSchema);
// userSchema.methods.isCorrectPassword=function(password){
// }