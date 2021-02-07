const task = {
    id: "1",
    text: "выучить html",
    completed: true
};
const tasksList = [
    { id: "1", text: "выучить html", completed: true },
    // { id: "2", text: "выучить css", completed: true },
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

    if (tasksList.length > 0) {
        const ul = document.querySelector('.todo-list');
        for (let i = 0; i < tasksList.length; i++) {
            const li = createListItem();
            ul.append(li);
            li.id = tasksList[i].id;
        };

        const input = document.querySelectorAll('.toggle');
        const label = document.querySelectorAll('.todo-list li label');
        for (let i = 0; i < tasksList.length; i++) {
            label[i].innerHTML = tasksList[i].text;
            input[i].checked = tasksList[i].completed;
        };
    };

    const input = document.querySelectorAll('.toggle');
    const label = document.querySelectorAll('.todo-list li label');
    for (let i = 0; i < tasksList.length; i++) {
        label[i].innerHTML = tasksList[i].text;
        input[i].checked = tasksList[i].completed;
    };
};


function getid(arr) {
    if (arr.length > 0) {
        return arr[arr.length - 1]['id'];
    } else {
        return arr;
    };
};

function createNewTask() {
    let id = getid(tasksList);
    id++;
    const task = {
        id: "" + id,
        text: "",
        completed: false
    };
    tasksList.push(task);
};

function deleteTask() {
    const ul = document.querySelector('.todo-list');
    ul.onclick = function (event) {
        if (event.target.className != "destroy") return;
        const li = event.target.closest('li');
        const liId = li.id;
        if (!li) return;
        let task = tasksList.find(item => item.id == liId);
        tasksList = tasksList.filter(t => t.id !== task.id);
        li.remove();
    };
};
renderTasks()
toggleTask()


