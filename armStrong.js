function isArmStrong(n) {
  const num = n.toString().split("");
  const len = num.length;

  const result = num.reduce((sum, digit) => {
    return sum + Number(digit) ** len;
  }, 0);
  return result === n;
}

console.log(isArmStrong(5235));
console.log(isArmStrong(153));
console.log(isArmStrong(370));
console.log(isArmStrong(9474));
