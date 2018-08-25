// Your code here.
for (let i = "#"; i.length < 8; i += "#") {
  console.log(i);
}

// Your code here.
for (let i = 1; i <= 100; i++) {
  let fb = i;
  if (i % 3 == 0) {
    fb = "Fizz";
    if (i % 5 == 0) {
      fb += "Buzz";
    }
  } else if (i % 5 == 0) {
    fb = "Buzz"
  }
  console.log(fb);
}

// Your code here.
let size = 50;
let pr = "";
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (i % 2 == 0) {
      if (j % 2 == 0) {
        pr += " ";
      } else {
        pr += "#";
      }
    } else {
      if (j % 2 == 1) {
        pr += " ";
      } else {
        pr += "#";
      }
    }
  }
  pr += "\n";
}
console.log(pr);
      