//CONTRACT
function isNumber(v) {
  return !Number.isNaN(v) && typeof v === 'number';
}
isNumber.expected = "number";

/**
 * @param preList Array of contracts to check
 * @param post Expected result type as a contract
 * @param f the function
 */
function contract (preList, post, f) {
	//??? No idea
	//precondition
	for (let i = 0; i < preList.length; i++) {  //THIS DOESNT WORK
		let valid = preList[i].call(this, f.arguments[i]);
		if (valid === false) throw "caller's fault";
	}
	//postcondition
	let result = f.call(this, f.arguments);
	if ((post.call(this, result)) === false) throw "library's fault";
}

//EXAMPLE

var mult = contract(
  [isNumber, isNumber],
  isNumber,
  function mult (x, y) {
    return x*y;
  });
  
//TEST CODE

console.log("First test")
console.log(mult(3, 4));
console.log();

console.log("Second test")
try {
  console.log(mult(3, "four"));
} catch (e) {
  console.log(e.message);
}
console.log();