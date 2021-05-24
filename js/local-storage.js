function getLocalStorage() {
    let jsonParseTasks = JSON.parse(localStorage.getItem('taskList'));
    if (jsonParseTasks) tasksList = jsonParseTasks;
    countActiveTasks();
};
function updateLocalStorage() {
    let stringify = JSON.stringify(tasksList);
    localStorage.setItem('taskList', stringify);
};