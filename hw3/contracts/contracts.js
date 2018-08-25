// NOTE: This library uses non-standard JS features (although widely supported).
// Specifically, it uses Function.name.

function any(v) {
  return true;
}

function isNumber(v) {
  return !Number.isNaN(v) && typeof v === 'number';
}
isNumber.expected = "number";

// Nicholas Gadjali
// ***YOUR CODE HERE***
// IMPLEMENT THE FOLLOWING CONTRACTS
//
function isBoolean(v){
	if (v === true || v === false)
		return true;
	else
		return false;
}
isBoolean.expected = "boolean";

function isDefined(v){
	if (v === null || v === undefined)
		return false;
	else
		return true;
}
isDefined.expected = "defined";

function isString(v){
	if (typeof v === 'string' || v instanceof String)
		return true;
	else
		return false;
}
isString.expected = "string";

function isNegative(v){
	if (isNaN(v))
		return false;
	else {
		if (v >= 0 || typeof v === 'boolean')
			return false;
		else
			return true;
	}
}
isNegative.expected = "negative number";

function isPositive(v){
	if (isNaN(v))
		return false;
	else {
		if (v <= 0 || typeof v === 'boolean')
			return false;
		else
			return true;
	}
}
isPositive.expected = "positive number";

// Combinators:

function and() {
  let args = Array.prototype.slice.call(arguments);
  let cont = function(v) {
    for (let i in args) {
      if (!args[i].call(this, v)) {
        return false;
      }
    }
    return true;
  }
  cont.expected = expect(args[0]);
  for (let i=1; i<args.length; i++) {
    cont.expected += " and " + expect(args[i]);
  }
  return cont;
}

//
// ***YOUR CODE HERE***
// IMPLEMENT THESE CONTRACT COMBINATORS
//
function or(){
	let args = Array.prototype.slice.call(arguments);
	let cont = function(v) {
		for (let i in args) {
			if (args[i].call(this, v)) { //if even one contract is true
				return true;
			}
		}
		return false;
	}
	cont.expected = expect(args[0]);
  for (let i=1; i<args.length; i++) {
    cont.expected += " or " + expect(args[i]);
  }
  return cont;
};

function not(cont){
	let notCont = function(v) {
		let result = cont.call(this, v);
		return !result;
	}
	notCont.expected = "not " + cont.expected;
	return notCont;
};



// Utility function that returns what a given contract expects.
function expect(f) {
  // For any contract function f, return the "expected" property
  // if it is specified.  (This allows developers to specify what
  // the expected property should be in a more readable form.)
  if (f.expected) {
    return f.expected;
  }
  // If the function name is available, use that.
  if (f.name) {
    return f.name;
  }
  // In case an anonymous contract is specified.
  return "ANONYMOUS CONTRACT";
}

/**
 * @param preList Array of contracts to check
 * @param post Expected result type as a contract
 * @param f the function
 */
function contract (preList, post, f) {
	return function() {
		for (let i = 0; i < preList.length; i++) {
			let valid = preList[i].call(this, arguments[i]);
			if (!valid)
				throw new Error("Contract violation in position " + i + ". Expected " + preList[i].expected + " but received " + arguments[i] + ".  Blame -> Top-level code");
		}
		
		let result = f.apply(this, arguments);
		if (!post(result))
			throw new Error("Contract violation. Expected " + post.expected + " but returned " + result + ".  Blame -> " + f.name);
		
		return result;
	}
}


module.exports = {
  contract: contract,
  any: any,
  isBoolean: isBoolean,
  isDefined: isDefined,
  isNumber: isNumber,
  isPositive: isPositive,
  isNegative: isNegative,
  isInteger: Number.isInteger,
  isString: isString,
  and: and,
  or: or,
  not: not,
};

