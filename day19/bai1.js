const url = "http://localhost:3000";

async function getAllProducts() {
  const rep = await fetch(`${url}/products`);
  const data = await rep.json();
  console.table(data);
}

getAllProducts();
