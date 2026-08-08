const queryString = "q=lập+trình&status=active&cat=1&cat=2&cat=3";
const result = {};
for (const item of queryString.split("&")) {
  const [key, value] = item.split("=");
  const newValue = value.replaceAll("+", " ");
  if (!(key in result)) {
    result[key] = newValue;
  } else {
    if (!Array.isArray(result[key])) {
      result[key] = [result[key]];
    }
    result[key].push(newValue);
  }
}
console.log(result);