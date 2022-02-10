import ActivityCard from "./ActivityCard";
const post=[
  {
    "id": 1,
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus.",
    "userid": 1,
    "image": "ggg",
    "likes": 0,
    "date": 1519211809934
  },
  {
    "id": 2,
    "content": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "userid": 1,
    "image": "jjjj",
    "likes": 0,
    "date": 1519213809934
  }

]
const comments= [
  {
    "id": 1,
    "postid": 1,
    "userid": 2,
    "content": "Nisl nisi scelerisque eu ultrices vitae.",
    "date": 1519212809934,
    "likes": 0
  },
  {
    "id": 2,
    "postid": 1,
    "userid": 3,
    "content": "A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Ac turpis egestas sed tempus urna.",
    "date": 1519212809934,
    "likes": 0
  },
  {
    "id": 3,
    "postid": 2,
    "userid": 1,
    "content": "Risus nullam eget felis eget. Facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris. ",
    "date": 1519213809934,
    "likes": 0
  },
  {
    "id": 4,
    "postid": 2,
    "userid": 3,
    "content": " Lectus vestibulum mattis ullamcorper velit sed.",
    "date": 1519213809934,
    "likes": 0
  }
]
const  users= [
  {
    "username": "Tom",
    "name": "Tom Chack",
    "email": "tom@gmail.com",
    "password": "123456",
    "date": 1519210809934,
    "about": "",
    "remember": true,
    "posts": 1,
    "comments": 0,
    "fb": "",
    "tw": "",
    "lin": "",
    "git": "",
    "vib": "",
    "wapp": "",
    "friends": [
      2,
      3
    ],
    "id": 1
  },
  {
    "username": "Sara",
    "name": "Sara Pike",
    "email": "sara@gmail.com",
    "password": "1234",
    "date": 1519210009934,
    "about": "",
    "remember": false,
    "posts": 0,
    "comments": 1,
    "fb": "",
    "tw": "",
    "lin": "",
    "git": "",
    "vib": "",
    "wapp": "",
    "friends": [
      1,
      3
    ],
    "covers": "",
    "avatar": "",
    "id": 2
  },
  {
    "username": "Karine",
    "email": "karine@gmail.com",
    "password": "1234",
    "date": 1519210709934,
    "about": "",
    "remember": false,
    "posts": 1,
    "comments": 0,
    "fb": "",
    "tw": "",
    "lin": "",
    "git": "",
    "vib": "",
    "wapp": "",
    "friends": [
      1,
      2
    ],
    "covers": "",
    "avatar": "",
    "id": 3
  }
]
const name=()=>{users.map((user)=>user.username)}
function Activity() {
  return (
    <div>
    {post.map(({id,date,image,content,likes})=>
    <ActivityCard classname="activityCard"
           name={name} 
           key={id} 
           date={date} 
           image={image} 
           id={id} 
           content={content} 
           likes={likes}
       />)}
    </div>
  );
}
export default Activity
