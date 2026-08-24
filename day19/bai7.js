const url = "http://localhost:3000";
async function searchProducts(keyword, minPrice, maxPrice) {
  const rep = await fetch(
    `${url}/products/?name_like=${keyword}&price_gte=${minPrice}&price_lte=${maxPrice}`,
  );
  const data = await rep.json();
  console.log(data);
}

searchProducts("mac", 1000, 30000000);
