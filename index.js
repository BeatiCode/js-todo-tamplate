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
        let i = 0;
        while(i < tasksList.length) {
            const li = createListItem();
            ul.append(li);
            li.id = tasksList[i].id;  
            i++
        }
    }

        const input = document.querySelectorAll('.toggle');
        const label = document.querySelectorAll('.todo-list li label');
        console.log(label);
        
        let i = 0;
        while(i < tasksList.length) {
            label[i].innerHTML = tasksList[i].text;
            input[i].checked = tasksList[i].completed;
            i++
        
        }   


}

renderTasks()