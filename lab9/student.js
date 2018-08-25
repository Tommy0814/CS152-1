var print = console.log;

function Student(firstName, lastName, studentID) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.studentID = studentID;
	this.display = function () { print(this.firstName + " " + this.lastName + " " + this.studentID); }
}

var studentArray = [];

studentArray.push(new Student("Nicholas", "Gadjali", 0));
studentArray.push(new Student("Jack", "Mccliney", 1));

var bobRoss = new Student("Bob", "Ross", 2);
bobRoss.graduated = true;
studentArray.push(bobRoss);

var calvinHobbes = {
	firstName: "Calvin",
	lastName: "Hobbes",
	studentID: 3,
	__proto__: new Student
};
studentArray.push(calvinHobbes);

//PRINT
for (let i = 0; i < studentArray.length; i++)
	studentArray[i].display();