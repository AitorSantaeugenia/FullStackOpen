const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).end();
  } else if (!body.likes) {
    body.likes = 0;
  }

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  logger.info(`added ${blog.title} to the blog list`);

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(204).end();
  }

  const user = request.user;

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
