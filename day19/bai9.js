const url = "http://localhost:3000";

async function getDashboardDataSequential() {
  console.time("sequential");

  const productRep = await fetch(`${url}/products`);
  const products = await productRep.json();
  const userRep = await fetch(`${url}/users`);
  const users = await userRep.json();
  const orderRep = await fetch(`${url}/orders`);
  const orders = await orderRep.json();
  console.timeEnd("sequential");
  console.log({
    products,
    users,
    orders,
  });
}

getDashboardDataSequential();
