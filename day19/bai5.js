const url = "http://localhost:3000";
async function updateProduct(id, updatedFields) {
  const rep = await fetch(`${url}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  const repData = await rep.json();
  console.log(repData);
}

updateProduct("4", { price: 29990000, name: "iphone" });
