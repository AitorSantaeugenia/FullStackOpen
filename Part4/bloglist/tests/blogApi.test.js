const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const helper = require("./test_helper");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await User.deleteMany({});

  let headers;

  const passwordHash = await bcrypt.hash("password", 10);

  const user = new User({
    username: "administrator",
    name: "Aitor",
    blogs: [],
    passwordHash,
  });

  const loginUser = await api.post("/api/login").send(user);

  headers = {
    Authorization: `bearer ${loginUser.body.token}`,
  };

  await user.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const users = await User.find({});
  const user = users[0];
  const id = users[0].id;

  const blogObject = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: id,
        likes: blog.likes ? blog.likes : 0,
      })
  );
  blogObject.map((blog) => {
    blog.save();
    user.blogs = user.blogs.concat(blog.id);
  });
  await user.save();
});

describe("(4.17 step5) blogs.user._id match the first user _id", () => {
  test("creators id", async () => {
    const users = await User.find({});
    const id = users[0]._id;

    const blogs = await helper.blogsInDb();

    const contents = blogs.map((response) => response.user);

    // console.log(contents);
    // console.log(users[0]._id);
    // console.log(users[0].id);

    expect(contents).toContainEqual(id);
  });
});

describe("(4.8, step1) - API tests:", () => {
  let headers;

  beforeEach(async () => {
    const user = {
      username: "root",
      password: "password",
    };

    const loginUser = await api.post("/api/login").send(user);

    headers = {
      Authorization: `bearer ${loginUser.body.token}`,
    };
  });

  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("(4.9*, step2) - id definition - GET /api/blogs:", () => {
  test("verify if the unique identifier property `id` exists", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("(4.10 - 4.12) - POST /api/blogs:", () => {
  let headers;

  beforeEach(async () => {
    const user = {
      username: "administrator",
      password: "password",
    };

    const loginUser = await api.post("/api/login").send(user);

    headers = {
      Authorization: `bearer ${loginUser.body.token}`,
    };
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Aitor's Github",
      author: "Aitor J. Santaeugenia Marí",
      url: "https://github.com/AitorSantaeugenia",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDb();
    expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsInDB.map((e) => e.title);
    expect(contents).toContain("Canonical string reduction");
  });

  test("if property likes is missing, return 0", async () => {
    const newBlog = {
      title: "Aitor's Github 1",
      author: "Aitor J. Santaeugenia Marí",
      url: "https://github.com/AitorSantaeugenia",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDb();
    const contents = await blogsInDB.find(
      (blog) => blog.title === "Aitor's Github 1"
    );

    const likes = contents.likes ? contents.likes : 0;

    expect(likes).toBe(0);
  });

  test("if title and url are missing, return status(400) bad request", async () => {
    const newBlog = {
      author: "Aitor's Github 111",
      likes: 111,
    };

    await api.post("/api/blogs").send(newBlog).expect(400).set(headers);

    const blogsInDB = await helper.blogsInDb();

    expect(blogsInDB).toHaveLength(helper.initialBlogs.length);
  });

  describe("(4.13) - DELETE request", () => {
    //This one is for the 4.13
    // test("deleting saved blog from DB", async () => {
    //   const currentBlogsInDB = await helper.blogsInDb();
    //   const blogToDelete = currentBlogsInDB[0];

    //   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    //   const blogsInDB = await helper.blogsInDb();

    //   expect(blogsInDB).toHaveLength(helper.initialBlogs.length - 1);

    //   const contents = blogsInDB.map((e) => e.title);

    //   expect(contents).not.toContain(blogToDelete.title);
    // });

    //This one is for the 4.21 once we have jwt
    test("Logged user deleting a saved blog", async () => {
      const currentBlogsInDb = await helper.blogsInDb();
      const blogToDelete = currentBlogsInDb[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        .set(headers);

      const blogsAfterDelete = await helper.blogsInDb();

      expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsAfterDelete.map((e) => e.title);

      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("(4.14) - UPDATE request:", () => {
    test("updating likes from a blog in the DB", async () => {
      const currentBlogsInDB = await helper.blogsInDb();
      //we updating last one created
      const index = currentBlogsInDB.length - 1;
      const blogToUpdate = currentBlogsInDB[index];
      blogToUpdate.likes = 2;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200);

      const blogsInDB = await helper.blogsInDb();
      const contents = blogsInDB.map((e) => e.likes);

      expect(contents).toContain(blogToUpdate.likes);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
