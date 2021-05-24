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
function checkFooter() {
    const footer = document.querySelector('footer');
    if (tasksList.length == 0) {
        footer.style.display = "none";
    } else {
        footer.style.display = "block";
    };
};