const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const helper = require("./test_helper");

const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    username: "administrator",
    name: "Aitor",
    passwordHash,
  });

  await user.save();
});

describe("(USER Creation test)):", () => {
  test("POST - New user", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      username: "blogger1",
      name: "Victor",
      password: "qwer1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersInDB = await helper.usersInDb();
    expect(usersInDB).toHaveLength(users.length + 1);

    const username = usersInDB.map((user) => user.username);
    expect(username).toContain(newUser.username);
  });

  test("POST - Invalid user (invalid username)", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      username: "ad",
      name: "Aitor",
      password: "qwer1234",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username is required and min. 3 char. length"
    );

    const usersInDB = await helper.usersInDb();
    expect(usersInDB).toHaveLength(users.length);

    const username = usersInDB.map((user) => user.username);
    expect(username).not.toContain(newUser.username);
  });

  test("POST - Invalid user (invalid password)", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      username: "blogger2",
      name: "Aitor",
      password: "qw",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password is required and min. 3 char. length"
    );

    const usersInDB = await helper.usersInDb();
    expect(usersInDB).toHaveLength(users.length);

    const username = usersInDB.map((user) => user.username);
    expect(username).not.toContain(newUser.username);
  });

  test("POST - Invalid user (username missing)", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      name: "blogger4",
      password: "qwer1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersInDB = await helper.usersInDb();
    expect(usersInDB).toHaveLength(users.length);

    const username = usersInDB.map((user) => user.username);
    expect(username).not.toContain(newUser.username);
  });

  test("POST - Invalid user (password missing)", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      username: "blogger3",
      name: "Aitor",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password is required and min. 3 char. length"
    );

    const usersInDB = await helper.usersInDb();
    expect(usersInDB).toHaveLength(users.length);

    const username = usersInDB.map((user) => user.username);
    expect(username).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
