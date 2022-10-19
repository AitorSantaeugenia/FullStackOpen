const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  // Comment for populate later: const users = await User.find({}).populate("blogs", { content: 1, date: 1 });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || username.length < 3) {
    return response
      .status(400)
      .send({ error: "username is required and min. 3 char. length" });
  } else if (password === undefined || password.length < 3) {
    return response
      .status(400)
      .send({ error: "password is required and min. 3 char. length" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
