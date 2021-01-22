const task = { 
    id: "1", 
    text: "выучить html", 
    completed: true 
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
    const ul = document.getElementsByTagName("ul");
    ul[0].prepend(li);

    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);
};

function renderTask() {
    createListItem();

    const li = document.getElementsByTagName("li");
    li[0].id = task.id;

    const label = document.getElementsByTagName("label");
    label[1].textContent = task.text;
}

renderTask()