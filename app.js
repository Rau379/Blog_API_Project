import express from 'express';
import mongoose from "mongoose";
import userrouter from './routes/UserRoutes.js';
import blogrouter from './routes/BlogRoutes.js';


 const app= express();
//middleware
app.use(express.json());
 const PORT=5000;

 app.use("/api/user", userrouter);
 app.use("/api/blog", blogrouter);
 mongoose.connect(
    "mongodb+srv://blog:l8gvkL1yj8b0HMkD@cluster0.5xtzhh6.mongodb.net/BLOGAPP?retryWrites=true&w=majority"
 )

  // Call app.listen method with PORT
  .then(()=> app.listen(PORT))
 .then(()=>
  console.log(`server is connected on the ${PORT}`)
  )
  .catch((err) => console.log(err));
 app.use("/api", (req, res, next)=>{
    res.send("Hello my World")
 })


//  app.listen(PORT, ()=>{
//     console.log(`server is connected on the ${PORT}`);
//  });
