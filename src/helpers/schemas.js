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
  image: "",
  likes: [],
  comments: [],
  date: Date.now(),
};

export const commentSchema = {
  id: 1,
  postid: 1,
  userid: 2,
  content: "",
  date: Date.now(),
  likes: 0,
};
export const imageSchema = {
  postid: 1,
  url: "",
}