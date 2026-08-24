const url = "http://localhost:3000";

async function getUserWithPosts(userId) {
  const userRep = await fetch(`${url}/users/${userId}`);
  const user = await userRep.json();
  const postsRep = await fetch(`${url}/posts?userId=${userId}`);
  const posts = await postsRep.json();
  const result = {
    user,
    posts,
  };

  console.log(result);
}

getUserWithPosts("1");