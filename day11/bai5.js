let kwh = 150;

let tien = (kwh <= 100 && kwh * 1500) || (kwh > 100 && kwh * 2000);

console.log(tien);
