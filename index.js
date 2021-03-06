const task = {
    id: "1",
    text: "выучить html",
    completed: true
};
let tasksList = [
    { id: "1", text: "выучить html", completed: false },
    { id: "2", text: "выучить css", completed: false },
    { id: "3", text: "выучить js", completed: false },
    { id: "4", text: "выучить фреймворк", completed: false },
    { id: "5", text: "написать несколько учебных проектов", completed: false },
    { id: "6", text: "пройти собеседование", completed: true },
    { id: "7", text: "получить работу", completed: false }
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
    tasksList.forEach( function(i) {
        ul.append(createListItem(i));
    });
    // ul.append(createListItem());
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
            if(inputValueTask.value.length == 0) return;
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
function filterTask() {
    const ulFilter = document.querySelector('.filters');
    
    ulFilter.addEventListener('click', function(event){
        if(!event.target.getAttribute('href')) return;
        let ul = event.target.closest('ul');
        switch(event.target.getAttribute('href')) {
            case '#/':
                renderTasks()
                console.log(ul);
                break;
            case '#/active':
                const liComplete = document.querySelectorAll('.completed');
                event.target.classList.add('selected');
                console.log(event.target);
                break;
            case '#/completed':

                event.target.classList.add('selected');
                console.log(event.target);
                break;
        }
    });
    console.log(ulFilter);
    console.log(tasksList);
};
renderTasks()
createNewTask()