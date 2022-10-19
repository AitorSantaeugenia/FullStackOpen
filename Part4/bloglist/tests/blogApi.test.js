const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("(4.8, step1) - API tests:", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

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

describe("(4.10, step3) - POST /api/blogs:", () => {
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
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDb();
    expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsInDB.map((n) => n.title);
    expect(contents).toContain("Canonical string reduction");
  });

  test("if property likes is missing ", async () => {
    const newBlog = {
      title: "Aitor's Github 1",
      author: "Aitor J. Santaeugenia Marí",
      url: "https://github.com/AitorSantaeugenia",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDb();
    const contents = await blogsInDB.find(
      (blog) => blog.title === "Aitor's Github 1"
    );

    const likes = contents.likes ? contents.likes : 0;

    expect(likes).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
