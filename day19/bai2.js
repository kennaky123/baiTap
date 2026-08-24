const url = "http://localhost:3000";

async function getProductById(id = "") {
  const rep = await fetch(`${url}/products?id=${id}`);
  if (rep.status === 404) {
    throw new Error("Không tìm thấy sản phẩm");
  }
  const data = await rep.json();
  console.log(data);
}

getProductById(4);
