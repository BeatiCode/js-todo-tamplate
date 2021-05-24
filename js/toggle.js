function toggleTask() {
    const ul = document.querySelector('.todo-list');
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].completed) {
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
            checkClearCompleted();
            checkFilter();
        } else {
            li.classList.remove('completed');
            task.completed = false;
            countActiveTasks();
            deleteCompleteTask();
            checkClearCompleted();
            checkFilter();
        };
    });
};
function allCheckLabel() {
    const toggleAll = document.querySelectorAll('.toggle');
    for (let i = 0; i < toggleAll.length; i++) {
        toggleAll[i].checked = !toggleAll[i].checked;
    };
    const ul = document.querySelector('.todo-list');
    const li = ul.children;
    for (let i = 0; i < tasksList.length; i++) {
        if (toggleAll[i].checked){
            li[i].classList.add('completed');
            tasksList[i].completed = true;
        } else {
            li[i].classList.remove('completed');
            tasksList[i].completed = false;
        };
    };
    deleteCompleteTask()
    checkClearCompleted()
    countActiveTasks()
};