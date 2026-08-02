function isAnagram(a, b) {
  let temp = a.toLowerCase().replaceAll(" ", "");
  let temp2 = b.toLowerCase().replaceAll(" ", "");
  if (temp.length !== temp2.length) {
    return false;
  }
  while (temp.length > 0) {
    let ch = temp[0];
    let count1 = 0;
    let count2 = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === ch) {
        count1++;
      }
    }
    for (let i = 0; i < temp2.length; i++) {
      if (temp2[i] === ch) {
        count2++;
      }
    }
    if (count1 !== count2) {
      return false;
    }
    temp = temp.replaceAll(ch, "");
    temp2 = temp2.replaceAll(ch, "");
  }
  return true;
}

console.log(isAnagram("nghe si", "sinh e"));
console.log(isAnagram("hello", "world"));
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("aaa", "abc"));
console.log(isAnagram("aabb", "bbaa"));
