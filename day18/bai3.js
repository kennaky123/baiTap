function layDonHang(id) {
  return new Promise((resolve, reject) => {
    resolve({
      id,
      sanPham: "Áo thun",
    });
  });
}

function tinhTien(donHang) {
  return new Promise((resolve, reject) => {
    resolve(50);
  });
}

function apDungGiamGia(gia) {
  return new Promise((resolve, reject) => {
    resolve((gia * 90) / 100);
  });
}

layDonHang(1)
  .then((donHang) => {
    console.log(donHang);
    return tinhTien(donHang);
  })
  .then((gia) => {
    console.log(gia);
    return apDungGiamGia(gia);
  })
  .then((giaSauGiam) => {
    console.log(giaSauGiam);
  });
