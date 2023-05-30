let currentDate = document.querySelector('#current-date');
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

expireDate.addEventListener('click', function (e) {
	let filter = new Filter(e.target, taskList);
	filter.show();
});

let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDate.textContent = new Date().toLocaleString('en-US', dateOptions);

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
		pDate.classList.add('date');

		let deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
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

class Filter {
	constructor(element, elementCreateIn) {
		this.element = element;
		this.elementCreateIn = elementCreateIn;
	}

	show() {
		switch (this.element) {
			case all:
				this.showAll();
				break;
			case today:
				this.showToday();
				break;
			case overdue:
				this.showOverdue();
				break;
			case completed:
				this.showCompleted();
				break;
			case uncompleted:
				this.showNotCompleted();
				break;
		}
	}

	showAll() {
		this.elementCreateIn.innerHTML = "";
		tasks.forEach(task => {
			task.createIn(this.elementCreateIn);
		});
	}

	showCompleted() {
		this.elementCreateIn.innerHTML = "";
		tasks
			.filter(task => task.isDone == true)
			.forEach(task => {
				task.createIn(this.elementCreateIn);
			});
	}

	showNotCompleted() {
		this.elementCreateIn.innerHTML = "";
		tasks
			.filter(task => task.isDone == false)
			.forEach(task => {
				task.createIn(this.elementCreateIn);
			});
	}

	showToday() {
		this.elementCreateIn.innerHTML = "";
		tasks
			.filter(task => this.compareDate(task.date) == 'today')
			.forEach(task => {
				task.createIn(this.elementCreateIn);
			});
	}

	showOverdue() {
		this.elementCreateIn.innerHTML = "";
		tasks
			.filter(task => this.compareDate(task.date) == 'overdue')
			.forEach(task => {
				task.createIn(this.elementCreateIn);
			});
	}

	compareDate(value) {
		let array = value.split('-');
		let year = array[0];
		let month = array[1];
		let day = array[2];
		let date = new Date();
		let currentYear = date.getFullYear();
		let currentMonth = () => {
			if (date.getMonth() < 10) {
				return '0' + String(date.getMonth() + 1)
			} else {
				return date.getMonth() + 1;
			}
		}
		let currentDay = () => {
			if (date.getDate() < 10) {
				return '0' + String(date.getDate() + 1)
			} else {
				return date.getDate();
			}
		}

		if (year == currentYear) {
			if (month == currentMonth()) {
				if (day == currentDay()) {
					return 'today';
				} else if (day < currentDay()) {
					return 'overdue';
				}
			} else if (month < currentMonth()) {
				return 'overdue';
			}
		} else if (year < currentYear()) {
			return 'overdue';
		}
	}
}

