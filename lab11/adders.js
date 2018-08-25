function makeListOfAdders(lst) {
	var returnMe = [];
	for (let i = 0; i < lst.length; i++)
		returnMe.push(function(y) { return lst[i] + y; });  //new makeAdder(lst[i]));
	return returnMe;
}
/*
function makeAdder(x) {
	return function(y) {
		return x + y;
	}
} */

var a = makeListOfAdders([1, 5]);
console.log(a[0](42)); //43
console.log(a[1](42)); //47