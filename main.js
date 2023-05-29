let input = document.querySelector('#input');
let date = document.querySelector('input[type = "date"]');
let important = document.querySelector('#important');
let create = document.querySelector('#create');
let taskList = document.querySelector(".task-list");
let expireDate = document.querySelector('.expire-date');
let all = document.querySelector("#all-tasks");
let today = document.querySelector("#today");
let overdue = document.querySelector("#overdue");
let completed = document.querySelector("#completed");
let uncompleted = document.querySelector("#uncompleted");
let tasks = [];

create.addEventListener('click', addTask);

input.addEventListener("keydown", function (e) {
	if (e.code == "Enter") addTask();
});

expireDate.addEventListener('click', show);

function addTask() {
	if (input.value) {
		let newTask = new toDoList(input.value, important.checked, date.value);
		newTask.createIn(taskList);
		tasks.push(newTask);

		input.value = "";
	} else {
		alert("введіть ім'я завдання");
	}
}

function show(e) {
	switch (e.target) {
		case all:
			showAll();
			break;
		case today:
			showAll();
			break;
		case overdue:
			showAll();
			break;
		case completed:
			showCompleted();
			break;
		case uncompleted:
			showNotCompleted();
			break;
	}
}

function showAll() {
	taskList.innerHTML = "";
	tasks.forEach(task => {
		task.createIn(taskList);
	});
}

function showTodayTasks() {
	taskList.innerHTML = "";
	tasks
		.filter(task => task.date == false)
		.forEach(task => {
			task.createIn(taskList);
		});
}

function showCompleted() {
	taskList.innerHTML = "";
	tasks
		.filter(task => task.isDone == true)
		.forEach(task => {
			task.createIn(taskList);
		});
}

function showNotCompleted() {
	taskList.innerHTML = "";
	tasks
		.filter(task => task.isDone == false)
		.forEach(task => {
			task.createIn(taskList);
		});
}

class toDoList {
	constructor(text, isImportant, date) {
		this.text = text;
		this.isImportant = isImportant;
		this.date = date;
		this.isDone = false;
		this.div = null;

	}

	createIn(element) {
		this.div = document.createElement("div");
		this.div.classList.add("task");

		let input = document.createElement("input");
		input.addEventListener("click", this.changeState.bind(this));

		input.type = "checkbox";

		let p = document.createElement("p");
		p.innerText = this.text;

		let pDate = document.createElement("p");
		pDate.innerText = this.date;

		let deleteBtn = document.createElement('button');
		deleteBtn.classList.add('delete-btn');
		deleteBtn.addEventListener('click', this.remove.bind(this));

		this.div.append(input);
		this.div.append(p);
		this.div.append(pDate);
		this.div.append(deleteBtn);

		if (this.isDone) {
			this.div.classList.add("completed");
			input.checked = true;
		}

		if (this.isImportant) {
			this.div.classList.add("important");
		}

		element.append(this.div);
	}

	changeState() {
		this.isDone = !this.isDone;
		this.div.classList.toggle("completed");
	}

	remove() {
		this.div.remove();
	}
}

let todayDate = function () {
	let date = new Date();
	let dateArray = [];
	dateArray.push(date.getFullYear());
	let month = function () {
		a = date.getMonth() + 1;
		if (a < 10) {
			a = 0 + String(month);
		}
		return a;
	}
	dateArray.push(month());
	dateArray.push(date.getDate());
	return dateArray.join('-');
}

console.log(todayDate())
