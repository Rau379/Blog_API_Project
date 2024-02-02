import user from "../models/user.js";
import bcrypt from "bcryptjs";
import simplecrypt from "simplecrypt";
 
export const getAllUser= async(req, res, next)=>{
    let users;
    try{
        // it will return an array
        users = await user.find();

    }catch{
        console.log("Error in getting all users");

    }
    if(!users){
        return res.status(401).json({msg: 'No User Found'});
    }
    return res.status(200).json({users});
}

//Sign Up Function

export const signUp= async(req, res, next) =>{
    const{name, email, password}= req.body;

    let existingUSer;
    try{
        existingUSer = await user.findOne({email: email})
    }catch{
        console.log("Error is Present");
    }
    if(existingUSer){
        return res.status(400).json({msg:'Email already exists ! Login Instead'});
     }

     const  encryptedpassword= bcrypt.hashSync(password);

     const newUser = new user({
        name,
        email,
        password:encryptedpassword,
        blogs:[],
     });
     

     try{
        await newUser.save();
     } catch(err){
        console.log(err);
     }
   return res.status(201).json({newUser});
}

// create a Login Page

export const  login= async (req,res, next)=>{
    const {email, password}= req.body;
    let existingUSer;
    try{
        existingUSer= await  user.findOne({email: email})
    }catch(err){
        console.log(err);
    }
    if(!existingUSer)
    {
        return res
        .status(404)
        .json({message:"User cannot be found with this email id! Please sign Up"})
    }

    const isCorrectPassword= bcrypt.compareSync(password, existingUSer.password);
    if (!isCorrectPassword) {
        return res.status(401).json({ message: 'Invalid Password!' })
    }
    return res.status(200).json({message:"Welcome to the site"});

}
