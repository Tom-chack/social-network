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
  avatar: "",
  cover: "",
};

export const postSchema = {
  content: "",
  userid: 0,
  likes: 0,
  liked: [],
  comments: [],
  image: "",
  date: Date.now(),
};

export const commentSchema = {
  postid: 0,
  userid: 0,
  content: "",
  date: Date.now(),
};
