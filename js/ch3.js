// Your code here.
function min(a, b) {
  if (a < b)
    return a;
  else return b;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

// Your code here.
function isEven(n) {
  if (n < 0) return false;
  else if (n == 0) return true;
  else if (n == 1) return false;
  else return isEven(n - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

// Your code here.
function countBs(s) {
  return countChar(s, "B");
}

function countChar(s, c) {
  let count = 0;
  for (let i = 0; i < s.length; i++)
    if (s[i] == c) count++;
  return count;
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4