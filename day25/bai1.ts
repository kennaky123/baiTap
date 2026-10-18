// ==========================================
// Bài 1: Máy tính tiền điện
// ==========================================

// 1. Khai báo biến lưu tên chủ hộ và số điện (kWh) đã dùng trong tháng (khai báo kiểu rõ ràng)
const customerName: string = "Nguyễn Văn An";
const usedKwh: number = 120;

/**
 * Hàm tính tiền điện theo bảng giá bậc thang lũy tiến:
 * - 50 kWh đầu tiên: 1.800 đ/kWh
 * - Từ kWh thứ 51 đến 100: 2.000 đ/kWh
 * - Từ kWh thứ 101 trở lên: 2.500 đ/kWh
 *
 * @param kwh Số điện đã sử dụng trong tháng
 * @returns Tổng số tiền điện phải trả
 */
function calculateBill(kwh: number): number {
  if (kwh <= 0) {
    return 0;
  }

  const tier1Price: number = 1800;
  const tier2Price: number = 2000;
  const tier3Price: number = 2500;

  let totalBill: number = 0;

  if (kwh <= 50) {
    totalBill = kwh * tier1Price;
  } else if (kwh <= 100) {
    totalBill = 50 * tier1Price + (kwh - 50) * tier2Price;
  } else {
    totalBill = 50 * tier1Price + 50 * tier2Price + (kwh - 100) * tier3Price;
  }

  return totalBill;
}

/**
 * Hàm kiểm tra hộ gia đình có dùng nhiều điện hay không (trên 200 kWh)
 *
 * @param kwh Số điện đã sử dụng trong tháng
 * @returns true nếu kwh > 200, ngược lại trả về false
 */
function isHighUsage(kwh: number): boolean {
  return kwh > 200;
}

// 2. Tính toán và in kết quả ra màn hình
const bill: number = calculateBill(usedKwh);
const highUsage: boolean = isHighUsage(usedKwh);

console.log(`Chủ hộ: ${customerName}`);
console.log(`Số điện: ${usedKwh} kWh`);
console.log(`Tiền điện: ${bill} đ`);
console.log(`Dùng nhiều điện: ${highUsage ? "có" : "không"}`);

