function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.replaceAll(" ", "");
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("Nam va van"));
console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));
