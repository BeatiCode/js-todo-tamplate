const task = { 
    id: "1", 
    text: "выучить html", 
    completed: true 
};
const tasksList = [
    { id: "1", text: "выучить html", completed: true },
    { id: "2", text: "выучить css", completed: true },
    { id: "3", text: "выучить js", completed: false },
    { id: "4", text: "выучить фреймворк", completed: false },
    { id: "5", text: "написать несколько учебных проектов", completed: false },
    { id: "6", text: "пройти собеседование", completed: false },
    { id: "7", text: "получить работу", completed: false }
    ];

function createListItem() {
    const li = document.createElement('li');
    

    const div = document.createElement('div');
    div.className = "view";

    const input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";
    // input.checked = tasksList.completed;

    const label = document.createElement('label');
    // label.innerHTML =    

    const button = document.createElement('button');
    button.className = "destroy";

    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

    return li;

};

function renderTasks() {

    if(tasksList.length > 0) {
        const ul = document.querySelector('.todo-list');
        for(let i = 0; i < tasksList.length; i++) {
            const li = createListItem();
            ul.append(li);
            li.id = tasksList[i].id;  
        }
    }

        const input = document.querySelectorAll('.toggle');
        const label = document.querySelectorAll('.todo-list li label');
        console.log(label);
        for(let i = 0; i < tasksList.length; i++) {
            label[i].innerHTML = tasksList[i].text;
            input[i].checked = tasksList[i].completed;
            
        }   


}

renderTasks()