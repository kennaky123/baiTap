const url = "http://localhost:3000";

async function getProducts() {
  const rep = await fetch(`${url}/products`);
  if (!rep.ok) {
    throw new Error(`Lỗi lấy sản phẩm: ${rep.status}`);
  }
  return await rep.json();
}

async function addProduct(data) {
  const rep = await fetch(`${url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!rep.ok) {
    throw new Error(`Lỗi thêm sản phẩm: ${rep.status}`);
  }
  return await rep.json();
}

async function updateProduct(id, updatedFields) {
  const rep = await fetch(`${url}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });
  if (!rep.ok) {
    throw new Error(`Lỗi cập nhật sản phẩm: ${rep.status}`);
  }
  return await rep.json();
}

async function deleteProduct(id) {
  const rep = await fetch(`${url}/products/${id}`, {
    method: "DELETE",
  });
  if (!rep.ok) {
    throw new Error(`Lỗi xóa sản phẩm: ${rep.status}`);
  }
  return true;
}
async function main() {
  try {
    console.log("- Bước 1: Lấy danh sách sản phẩm -");

    const products = await getProducts();
    console.table(products);

    console.log("- Bước 2: Thêm sản phẩm mới -");

    const newProduct = await addProduct({
      name: "iPhone 17",
      price: 30000000,
      category: "Điện thoại",
      quantity: 10,
      description: "Sản phẩm mới",
    });

    console.log("Sản phẩm vừa thêm:");
    console.log(newProduct);

    console.log("- Bước 3: Sửa giá sản phẩm vừa thêm -");

    const updatedProduct = await updateProduct(newProduct.id, {
      price: 32000000,
    });

    console.log("Sản phẩm sau khi sửa:");
    console.log(updatedProduct);
    console.log("- Bước 4: Xóa sản phẩm vừa thêm -");
    await deleteProduct(newProduct.id);
    console.log("Đã xóa sản phẩm có id:", newProduct.id);
    console.log("- Bước 5: Lấy lại danh sách sản phẩm -");
    const finalProducts = await getProducts();
    console.table(finalProducts);
  } catch (error) {
    console.log("Có lỗi xảy ra:", error.message);
  }
}

main();
