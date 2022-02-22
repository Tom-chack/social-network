export const userSchema = {
  username: "",
  name: "",
  email: "",
  password: "",
  date: Date.now(),
  about: "",
  remember: false,
  posts: 0,
  comments: 0,
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
  user: {},
  likes: 0,
  liked: [],
  comments: [],
  image: "",
  date: Date.now(),
};

export const commentSchema = {
  postid: 0,
  userid: 0,
  user: {},
  content: "",
  date: Date.now(),
};
export const imageSchema = {
  postid: 0,
  url: "",
}