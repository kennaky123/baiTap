
function deepEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) {
      return false;
    }
    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }
  return true;
}
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(obj1 === obj2);
console.log(deepEqual(obj1, obj2));
