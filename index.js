let task = {
    // id: "1",
    // text: "выучить html",
    // completed: true
};
let tasksList = [
    // { id: "1", text: "выучить html", completed: false },
    // { id: "2", text: "выучить css", completed: false },
    // { id: "3", text: "выучить js", completed: false },
    // { id: "4", text: "выучить фреймворк", completed: false },
    // { id: "5", text: "написать несколько учебных проектов", completed: false },
    // { id: "6", text: "пройти собеседование", completed: true },
    // { id: "7", text: "получить работу", completed: false }
];
// Создание вложенности эллементов

function createListItem() {
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.className = "view";

    const input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";

    const label = document.createElement('label');

    const button = document.createElement('button');
    button.className = "destroy";

    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

    return li;

};
// массив задач
function renderTasks() {
    const ul = document.querySelector('.todo-list');
    const li = ul.children;
    tasksList.forEach(function (i) {
        ul.append(createListItem(i));
    });
    const label = document.querySelectorAll('.todo-list li label');
    const input = document.querySelectorAll('.toggle');
    for (let i = 0; i < tasksList.length; i++) {
        li[i].id = tasksList[i].id;
        input[i].checked = tasksList[i].completed;
        label[i].innerHTML = tasksList[i].text;
    };
};
function getId(arr) {
    if (arr.length > 0) {
        return arr[arr.length - 1]['id'];
    } else {
        return arr;
    };
};
function createNewTask() {
    let inputValueTask = document.querySelector('.new-todo');
    inputValueTask.addEventListener('keydown', function (enter) {
        if (enter.keyCode == 13) {
            if (inputValueTask.value.length == 0) return;
            let id = getId(tasksList);
            id++;
            const task = {
                id: "" + id,
                text: inputValueTask.value,
                completed: false
            };
            tasksList.push(task);
            const ul = document.querySelector('.todo-list');
            ul.append(createListItem());
            ul.lastChild.id = id;
            document.querySelector('ul > li:last-child > div > Label').innerHTML = task.text;
            document.querySelector('ul > li:last-child > div > input').checked = task.completed;
            countActiveTasks();
            checkFooter();
            updateLocalStorage();
            checkFilter()
            inputValueTask.value = "";
        };
    });
};
function deleteTask() {
    const ul = document.querySelector('.todo-list');
    ul.addEventListener('click', function (event) {
        if (event.target.className == "destroy") {
            const li = event.target.closest('li');
            const liId = li.id;
            li.remove();
            let task = tasksList.find(item => item.id == liId);
            tasksList = tasksList.filter(t => t.id !== task.id);
            countActiveTasks();
            checkClearCompleted();
            checkFooter();
        };

    });
};
function toggleTask() {
    const ul = document.querySelector('.todo-list');
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].completed == true) {
            const li = ul.children[i];
            li.classList.add('completed');
        };
    };
    ul.addEventListener('click', function (event) {
        if (event.target.type != "checkbox") return;
        let li = event.target.closest('li');
        filterTask()
        if (!li) return;
        let liId = li.id;
        let check = event.target.checked;
        let task = tasksList.find(item => item.id == liId);
        if (check) {
            li.classList.add('completed');
            task.completed = true;
            countActiveTasks();
            deleteCompleteTask();
            checkClearCompleted()
            checkFilter()
        } else {
            li.classList.remove('completed');
            task.completed = false;
            countActiveTasks()
            checkClearCompleted()
            checkFilter()
        };
    });
};
function countActiveTasks() {
    let task = tasksList.filter(item => item.completed == false);
    let count = document.querySelector('.todo-count');
    count.style.display = "block";
    if (task.length == 1) {
        count.innerHTML = "<strong>" + task.length + "</strong> item left";
    } else {
        count.innerHTML = "<strong>" + task.length + "</strong> items left";
    };
};
function deleteCompleteTask() {
    const clearButton = document.querySelector('.clear-completed');
    const liComplete = document.querySelectorAll('.completed');
    clearButton.onclick = function () {
        for (let i = 0; i < liComplete.length; i++) {
            liComplete[i].remove();
        };
        tasksList = tasksList.filter(t => t.completed !== true);
        checkClearCompleted()
        checkFooter()
        updateLocalStorage()
    };
};
function checkClearCompleted() {
    const clearButton = document.querySelector('.clear-completed');
    let task = tasksList.filter(item => item.completed == true);
    if (task.length == 0) {
        clearButton.style.display = "none";
    } else {
        clearButton.style.display = "block";
    };
    updateLocalStorage()
};
function filterTask() {
    const ulFilter = document.querySelector('.filters');
    ulFilter.addEventListener('click', function (event) {
        // if (!event.target.getAttribute('href')) return;
        let filter = event.target;
        switch (filter.getAttribute('href')) {
            case '#/':
                filterAll(filter);
                break;
            case '#/active':
                filterActive(filter);
                break;
            case '#/completed':
                filterComplete(filter);
                break;
        };
    });
};

function filterAll(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const taskLi = document.querySelectorAll('.todo-list > li');
    for (const task of taskLi) {
        task.style.display = "block";
    };

};
function filterActive(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const active = document.querySelectorAll('.todo-list > li');
    for (const task of active) {
        if (task.className !== "completed") {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    };
};
function filterComplete(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const notCompleted = document.querySelectorAll('.todo-list > li');
    for (const task of notCompleted) {
        if (task.className == "completed") {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    };
};
function checkFooter() {
    const footer = document.querySelector('footer');
    if (tasksList.length == 0) {
        footer.style.display = "none";
    } else {
        footer.style.display = "block";
    };
};
function updateLocalStorage() {
    let stringify = JSON.stringify(tasksList);
    localStorage.setItem('taskList', stringify);
};
function getLocalStorage() {
    let jsonParseTasks = JSON.parse(localStorage.getItem('taskList'));
    if (jsonParseTasks) tasksList = jsonParseTasks;
};

function checkFilter() {
    const hash = window.location.hash;
    let filter = document.querySelectorAll(`.filters [href="${hash}"]`)
    if (hash == '#/') {
        filterAll(filter[0])
    } else if (hash == '#/active') {
        filterActive(filter[0]);
    } else if (hash == '#/completed') {
        filterComplete(filter[0])
    };
};
getLocalStorage()
renderTasks()
createNewTask()
deleteTask()
toggleTask()
checkFilter()
checkClearCompleted()
checkFooter()
filterTask()