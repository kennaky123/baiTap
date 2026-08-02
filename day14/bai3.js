function reverseEachWord(a) {
  let temp;
  let temp2 = "";
  let temp3 = "";
  for (let i = 0; i < a.length; i++) {
    temp2 = temp2 + a[i];
    if (a[i] === " ") {
      for (let j = temp2.length - 1; j >= 0; j--) {
        temp3 = temp3 + temp2[j];
      }
      temp2 = "";
    }
  }
  temp2 = "";
  for (let i = a.length - 1; i >= 0; i--) {
    temp2 = temp2 + a[i];
    if (a[i] === " ") {
      temp3 = temp3 + " " + temp2;
      break;
    }
  }
  console.log(temp3.trim());
}
reverseEachWord("Hoc lap trinh"); // → "coH pal hnirt"
