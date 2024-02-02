 import Blog from "../models/blog.js"
 import User from "../models/user.js"
 import mongoose from "mongoose"

 export const getAllBlogs = async (req, res, next)=>{
    let blogs;
    try{
      blogs= await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(401).json({msg:"No blogs found"});

    }
    return res.status(200).json({blogs});
 }
// export const createNewBlog = async (req,res) => {
export const createNewBlog= async(req, res, next) =>{
    const {title, description, image, user} = req.body;
    //checking whether the user already exists or not
    // and validation check
    let existingUSer;
    try{
        existingUSer= await User.findById(user);

    }catch(err){
        return console.log(err);
    }

    if(!existingUSer){
        return  res.status(400).json({msg: 'User does not exist by this id'})
    }


    const blog= new Blog({
        title,
        description,
        image, 
        user 
    });

    try{
        //define the session and use mongoose
        const session= await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUSer.blogs.push(blog);
        await existingUSer.save(session);
        await session.commitTransaction();
    } catch(err){
        return console.log(err);
        return res.status(500).json({msg:err});
    }
    //return json response of the created blog
    return res.status(200).json({blog});
};

// Updateing the Blog
export const updateexitingBlog= async(req, res, next)=>{
    const {title, description, image}= req.body;
    const  blogid = req.params.id;
    let blog;
    try{
        blog= await Blog.findByIdAndUpdate(blogid,{
            title,
            description,
            image
        });
    }catch(err){
        return console.log(err);
    }
     
    if (!blog) {
        return res.status(404).json({ msg: "Blog not Found Hence cannot be update"})
    }
    return res.status(200).json({blog});
}

// get the blog
export const getById= async(req, res, next)=>{
    const id= req.params.id;
    let blog;
    try{
         blog= await Blog.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return  res.status(404).json({msg:"No Blog found with this id"});
    }
    return res.status(200).json({blog});
}



// delete the blog
export const  deleteBlog= async (req,res, next)=>{
    const id= req.params.id;
    // find the user by its id from the database
    let blog;
    try{
        blog= await Blog.findByIdAndDelete(id).populate('user');
        //removing blog from the users array
        await blog.user.blogs.pull(blog)
        await blog.user.save()

    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"No Blog found for delete"});
    }

    return res.status(200).json({message:"message deleted successfully"});

} 

export const getByUserId=async(req, res, next)=>{
      const id= req.params.id;
      let userblog;
      try{
        userblog =await User.findById(id).populate("blogs");

      }catch(err){
        console.log(err);
      }
      if(!userblog){
        return res.status(401).json({msg:'No blogs found'})
      }
      return res.status(200).json({blogs:userblog});
}