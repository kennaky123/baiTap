function isPalindrome(a) {
  let bool;
  for (let i = 0; i < a.length; i++) {
    let b = a.length - i - 1;

    if (a[i] === a[b]) {
      bool = true;
    } else {
      bool = false;
    }
  }

  return bool;
}

console.log(isPalindrome("madam"));
// → true
console.log(isPalindrome("Toi yeu Viet Nam"));
// → false
