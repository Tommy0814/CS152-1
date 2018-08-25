// Your code here.
function range(a, b, step = 1) {
  let numbers = [];
  if (step > 0) 
    for (let i = a; i <= b; i+= step)
      numbers.push(i);
  else
    for (let i = a; i >= b; i+= step)
      numbers.push(i);
  return numbers;
}

function sum(input) {
  let sum = 0;
  for (let each of input)
    sum += each;
  return sum;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// Your code here.
function reverseArray(arr) {
  let arr2 = [];
  for (let each of arr)
    arr2.unshift(each)
  return arr2;
}

function reverseArrayInPlace(arr) {
  let temp;
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    temp = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = temp;
  }
  return arr
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// Your code here.
function arrayToList(arr) {
  let rest = null;
  for (let each of arr.reverse()) {
    rest = {
      value: each,
      rest: rest
    }
  }
  return rest;
}

function listToArray(lst) {
  let arr = [], run = true;
  while (run) {
    if (lst.rest == null) {
		arr.push(lst.value);
		run = false;
    } else {
      	arr.push(lst.value);
   		lst = lst.rest;
    }
  }
  return arr;
}

function prepend(ele, lst) {
  lst = {
    value: ele,
    rest: lst
  }
  return lst;
}

function nth(lst, num) {
  if (num == 0) return lst.value;
  else if (lst.rest == null || num < 0) return;
  else return nth(lst.rest, num - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

//v1
// Your code here.
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  else if (obj1 == null || obj2 == null) return false;
  else return (JSON.stringify(obj1) == JSON.stringify(obj2));
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

