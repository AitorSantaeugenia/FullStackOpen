const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  //we can improve this, we've done this func really fast, and it was working so ez, so brain was off
  const arrLikes = [];
  let maxLikes = 0;

  for (const i of blogs) {
    arrLikes.push(i.likes);
    maxLikes = Math.max(...arrLikes);
  }

  const author = blogs.find(({ likes }) => likes === maxLikes);
  const returnedObj = {
    title: author.title,
    author: author.author,
    likes: author.likes,
  };

  return returnedObj;
};

const mostBlogs = (blogs) => {
  const result = Object.entries(
    blogs.reduce((acc, { author }) => {
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {})
  ).map(([k, v]) => ({ author: k, blogs: v }));

  let maximum = Math.max.apply(
    Math,
    result.map((o) => o.blogs)
  );

  return result.find((element) => element.blogs === maximum);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
