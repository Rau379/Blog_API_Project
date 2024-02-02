import express from 'express';
import { createNewBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateexitingBlog } from '../controllers/BlogController.js';

const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/add", createNewBlog);
blogrouter.put("/update/:id", updateexitingBlog);
blogrouter.get("/:id", getById);
blogrouter.delete("/:id", deleteBlog);
blogrouter.get("/user/:id", getByUserId);

export default blogrouter;
