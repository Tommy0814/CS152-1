export {}; //https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files

class Rabbit {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}
	
var name: string = "Monty";
var r = new Rabbit("Python");

console.log(r.name);
console.log(name);
