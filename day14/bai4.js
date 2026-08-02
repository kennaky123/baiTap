function compressString(a) {
  let count = 1;
  let temp2 = "";
  let temp3 = a;
  while (a.length > 0) {
    for (let j = 1; j < a.length; j++) {
      if (a[0] === a[j]) {
        count++;
      }
    }

    temp2 = temp2 + a[0] + count;
    count = 1;
    a = a.replaceAll(a[0], "");
  }
  if (temp3.length < temp2.length) {
    console.log(temp3);
    return;
  }
  console.log(temp2);
}

compressString("aaabbbccd"); // → "a3b3c2d1"
compressString("abc"); // → "abc" (vì nén ra "a1b1c1" dài hơn)
