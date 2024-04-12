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
    const checkboxes = document.querySelectorAll('.toggle');
    const todos = document.querySelector('.todo-list').children;

    const allChecked = [...checkboxes].every(checkbox => checkbox.checked);

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = !allChecked;
        todos[index].classList.toggle('completed', !allChecked);
        tasksList[index].completed = !allChecked;
    });

    deleteCompleteTask();
    checkClearCompleted();
    countActiveTasks();
};