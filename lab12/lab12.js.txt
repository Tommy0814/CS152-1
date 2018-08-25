//Nicholas Gadjali

let changeHandler = {
	has: function(t, p) {
		console.log(t.constructor.name + " has " + p);
		return p in t;
	},
	get: function(t, p, r) {
		console.log(t.constructor.name + " gets " + p);
		return Reflect.get(...arguments);
	},
	set: function(t, p, v, r) {
		console.log("Set " + t.constructor.name + " " + p + " to " + v);
		t[p] = v;
		return true;
	},
	deleteProperty: function(t, p) {
		console.log("Deleted " + p + " in " + t.constructor.name);
		return delete t[p];
	},
	apply: function(target, thisArg, argumentsList) {
		console.log(target.constructor.name + " applied with " + thisArg + " with " + argumentsList);
		return target.apply(thisArg, argumentsList);
	},
	construct: function(target, argumentsList, newTarget) { //needs test
		console.log(" Constructing " + t.constructor.name);
		return new target(...args);
	},
	getOwnPropertyDescriptor: function(t, p) {
		console.log("Getting " + t.constructor.name + "'s Property Descriptor for " + p);
		return Object.getOwnPropertyDescriptor(t, p);
	},
	getPrototypeOf: function(t) {
		console.log("Getting Prototype Of " + t.constructor.name);
		return Object.getPrototypeOf(t);
	},
	setPrototypeOf: function(t, p) {
		console.log("Setting Prototype Of " + t.constructor.name + " to " + p.constructor.nam);
		return Reflect.setPrototypeOf(t, p);
	},
	isExtensible: function(t) {
		console.log(t.constructor.name + " is Extensible ");
		return Reflect.isExtensible(t);
	},
	preventExtensions: function(t) {
		console.log(t.constructor.name + " is now preventing Extensions");
		return Object.preventExtensions(t);
	},
	defineProperty: function(t, k, d) {
		console.log("Defining " + k + " for " + t.constructor.name + " to " + d);
		return true;
	},
	ownKeys: function(t) {
		console.log("Listing " + t.constructor.name + "'s own keys");
		return Reflect.ownKeys(t);
	}
}
	
function trace(obj) {
	return new Proxy(obj, changeHandler);
}

function TestObj1() {
	this.test1 = '1';
	this.test2 = '2';
	this.foo = 'foo';
}

function TestObj2() {
	this.bar = 'bar';
	__proto__: TestObj1.prototype;
}

function p(data) { console.log(data);}

function test(obj) {
	
	"test0" in obj;
	obj.test1;
	obj.foo = "bar";
	delete obj.test1;
	//obj(1, 2);  //apply needs test
		//function needs test
	new trace(obj2).disposition;
	Object.getOwnPropertyDescriptor(obj, "test2");
	Object.getPrototypeOf(obj);
	Reflect.setPrototypeOf(obj, obj2);
	Object.isExtensible(obj);
	Object.preventExtensions(obj);
	obj.test3 = '3';  //defineProperty calls set?
	for (let k of Object.keys(obj)) ;
}

let obj1 = new TestObj1();
let obj2 = new TestObj2();
test(trace(obj1));