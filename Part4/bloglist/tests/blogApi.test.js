const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((e) => e.save());
  await Promise.all(promiseArray);
});

describe("(4.8, step1) - API tests:", () => {
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

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsInDB = await helper.blogsInDb();

    expect(blogsInDB).toHaveLength(helper.initialBlogs.length);
  });

  describe("(4.13) - DELETE request", () => {
    test("deleting saved blog from DB", async () => {
      const currentBlogsInDB = await helper.blogsInDb();
      const blogToDelete = currentBlogsInDB[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsInDB = await helper.blogsInDb();

      expect(blogsInDB).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsInDB.map((e) => e.title);

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
