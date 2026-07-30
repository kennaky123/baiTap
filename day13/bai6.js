function createAccount(initialBalance) {
  let balance = initialBalance;
  return function (action, amount) {
    if (action === "deposit") {
      balance += amount;
    }
    if (action === "withdraw") {
      if (amount > balance) {
        return "Insufficient balance";
      }
      balance -= amount;
    }
    if (action === "balance") {
      return balance;
    }
  };
}

const account = createAccount(100000);

account("deposit", 50000);
account("withdraw", 30000);
console.log(account("balance")); // 120000

account("withdraw", 999999); // phải báo lỗi "Insufficient balance", không cho rút âm
