const url = "http://localhost:3000";

async function post(data) {
  const rep = await fetch(`${url}/products`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const repData = await rep.json();
  console.log(repData);
}

post({
  id: 9,
  name: "iPhone 16 Pro Max",
  price: 29990000,
  category: "Điện thoại",
  quantity: 12,
  description: "Điện thoại Apple iPhone 16 Pro Max",
});
