const task = {
    id: "1",
    text: "выучить html",
    completed: true
};
let tasksList = [
    // { id: "1", text: "выучить html", completed: true },
    // { id: "2", text: "выучить css", completed: false },
    // { id: "3", text: "выучить js", completed: false },
    // { id: "4", text: "выучить фреймворк", completed: false },
    // // { id: "5", text: "написать несколько учебных проектов", completed: false },
    // // { id: "6", text: "пройти собеседование", completed: true },
    // // { id: "7", text: "получить работу", completed: false }
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
    const li = createListItem();
    ul.append(li);
    const input = document.querySelectorAll('.toggle');
    const label = document.querySelectorAll('.todo-list li label');
    for (let i = 0; i < tasksList.length; i++) {
        li.id = tasksList[i].id
        label[i].innerHTML = tasksList[i].text;
        input[i].checked = tasksList[i].completed;
    };
    console.log(ul);
};
function getid(arr) {
    if (arr.length > 0) {
        return arr[arr.length - 1]['id'];
    } else {
        return arr;
    };
};
function createNewTask() {
    let inputValueTask = document.querySelector('.new-todo');
    inputValueTask.addEventListener('keydown', function (inter) {
        if (inter.keyCode == 13) {
            if(inputValueTask.value.length == 0) return;
            let id = getid(tasksList);
            id++;
            const task = {
                id: "" + id,
                text: inputValueTask.value,
                completed: false
            };
            tasksList.push(task);
            renderTasks()
            countActiveTasks()
            inputValueTask.value = "";
        };
    });
};
function deleteTask() {
    const ul = document.querySelector('.todo-list');
    ul.addEventListener('click', function(event) {
        if (event.target.className == "destroy") {
            const li = event.target.closest('li');
            const liId = li.id;
            li.remove();
            let task = tasksList.find(item => item.id == liId);
            tasksList = tasksList.filter(t => t.id !== task.id);
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
    ul.addEventListener('click', function(event) {
        if (event.target.type != "checkbox") return;
        let li = event.target.closest('li');
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
        } else {
            li.classList.remove('completed');
            task.completed = false;
            countActiveTasks()
            checkClearCompleted()
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
};
createNewTask()
deleteTask()
toggleTask()
checkClearCompleted() 
deleteCompleteTask()
countActiveTasks()

