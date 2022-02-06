export const userSchema = {
  username: "",
  name: "",
  email: "",
  password: "",
  date: Date.now(),
  about: "",
  remember: false,
  posts: 0,
  comments: 1,
  fb: "",
  tw: "",
  lin: "",
  git: "",
  vib: "",
  wapp: "",
  friends: [],
};

export const postSchema = {
  content:
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  userid: 1,
  image: "",
  likes: 0,
  date: Date.now(),
};

export const commentSchema = {
  id: 1,
  postid: 1,
  userid: 2,
  content: "Nisl nisi scelerisque eu ultrices vitae.",
  date: Date.now(),
  likes: 0,
};
