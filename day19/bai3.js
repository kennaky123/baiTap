const url = "http://localhost:3000";

async function safeFetch(url) {
  try {
    const rep = await fetch(`${url}/products`);
    if (!rep.ok) {
      console.log(`Lỗi HTTP: ${rep.status}`);
      return;
    }
    const data = await rep.json();
    console.log(data);
  } catch (error) {
    console.log("Lỗi mạng:", error.message);
  }
}
safeFetch(url);
