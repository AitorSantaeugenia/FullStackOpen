const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const savedBlog = Blog.save();
  response.status(201).json(savedBlog.toJSON());
});

module.exports = blogsRouter;
