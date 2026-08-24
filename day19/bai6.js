const url = "http://localhost:3000";

async function deleteUser(id) {
  const rep = await fetch(`${url}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await rep.json();
  console.log(data);
}
deleteUser(6);
