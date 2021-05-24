function getId(arr) {
    if (arr.length > 0) {
        return arr[arr.length - 1]['id'];
    } else {
        return arr;
    };
};
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