function countVowels(a) {
  a.toLowerCase();
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i] === "a" ||
      a[i] === "e" ||
      a[i] === "i" ||
      a[i] === "o" ||
      a[i] === "u"
    ) {
      count++;
    }
  }
  console.log(count);
}

countVowels("Xin chao cac ban");
