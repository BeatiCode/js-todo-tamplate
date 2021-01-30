const task = { 
    id: "1", 
    text: "выучить html", 
    completed: true 
};

function createListItem() {
    const li = document.createElement('li');
    li.id = task.id;

    const div = document.createElement('div');
    div.className = "view";

    const input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";
    input.checked = task.completed;

    const label = document.createElement('label');
    label.innerHTML = task.text;   

    const button = document.createElement('button');
    button.className = "destroy";

    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

    return li;

};

function renderTask() {

    const ul = document.getElementsByTagName("ul");
    const li = createListItem();

    ul[0].prepend(li);

}

 renderTask()