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