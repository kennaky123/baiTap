// ==========================================
// Bài 3: Quán trà sữa
// ==========================================

// 1. Tạo kiểu Size chỉ nhận một trong 3 giá trị: "S", "M", "L"
type Size = "S" | "M" | "L";

// 2. Tạo interface Drink gồm: Tên món, Size, Số lượng, Có thêm topping hay không
interface Drink {
  name: string;
  size: Size;
  quantity: number;
  hasTopping: boolean;
}

/**
 * Hàm lấy đơn giá theo size:
 * - Size S: 25.000 đ
 * - Size M: 30.000 đ
 * - Size L: 35.000 đ
 */
function getPriceBySize(size: Size): number {
  switch (size) {
    case "S":
      return 25000;
    case "M":
      return 30000;
    case "L":
      return 35000;
  }
}

/**
 * Hàm tính tiền của một món:
 * Đơn giá 1 ly = giá theo size + (nếu có topping: +5.000 đ).
 * Tổng tiền món = đơn giá 1 ly * số lượng.
 */
function calculateDrink(drink: Drink): number {
  const toppingPrice: number = drink.hasTopping ? 5000 : 0;
  const unitPrice: number = getPriceBySize(drink.size) + toppingPrice;
  return unitPrice * drink.quantity;
}

/**
 * Hàm tính tổng tiền toàn bộ các món trong đơn hàng (chưa trừ giảm giá).
 */
function calculateOrder(order: Drink[]): number {
  let total: number = 0;
  for (const drink of order) {
    total += calculateDrink(drink);
  }
  return total;
}

/**
 * Hàm định dạng số tiền có dấu chấm phân cách hàng nghìn (ví dụ 195000 thành "195.000 đ")
 */
function formatMoney(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} đ`;
}

// 3. Khai báo đơn hàng theo ví dụ đề bài
const order: Drink[] = [
  {
    name: "Trà sữa trân châu",
    size: "M",
    quantity: 2,
    hasTopping: true,
  },
  {
    name: "Trà đào",
    size: "L",
    quantity: 1,
    hasTopping: false,
  },
  {
    name: "Matcha latte",
    size: "S",
    quantity: 3,
    hasTopping: true,
  },
];

// 4. In chi tiết từng món trong đơn hàng
order.forEach((drink: Drink): void => {
  const itemTotal: number = calculateDrink(drink);
  console.log(`${drink.name} (${drink.size}) x${drink.quantity}: ${itemTotal} đ`);
});

// 5. Tính tổng tiền, áp dụng giảm giá 10% nếu tổng tiền >= 200.000 đ
const subTotal: number = calculateOrder(order);
const discountPercent: number = subTotal >= 200000 ? 0.1 : 0;
const discountAmount: number = subTotal * discountPercent;
const finalPayment: number = subTotal - discountAmount;

console.log(`Tổng tiền: ${subTotal} đ`);
console.log(`Giảm giá: ${discountAmount} đ`);
console.log(`Thanh toán: ${finalPayment} đ`);

// In thêm dòng sử dụng hàm formatMoney để thể hiện đúng yêu cầu hàm
console.log("\n--- Định dạng có dấu chấm phân cách hàng nghìn (formatMoney) ---");
console.log(`Tổng tiền: ${formatMoney(subTotal)}`);
console.log(`Giảm giá: ${formatMoney(discountAmount)}`);
console.log(`Thanh toán: ${formatMoney(finalPayment)}`);

