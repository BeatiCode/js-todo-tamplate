function filterTask() {
    const ulFilter = document.querySelector('.filters');
    ulFilter.addEventListener('click', function (event) {
        let filter = event.target;
        switch (filter.getAttribute('href')) {
            case '#/':
                filterAll(filter);
                break;
            case '#/active':
                filterActive(filter);
                break;
            case '#/completed':
                filterComplete(filter);
                break;
        };
    });
};
function filterAll(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const taskLi = document.querySelectorAll('.todo-list > li');
    for (const task of taskLi) {
        task.style.display = "block";
    };

};
function filterActive(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const active = document.querySelectorAll('.todo-list > li');
    for (const task of active) {
        if (task.className !== "completed") {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    };
};
function filterComplete(filter) {
    let selected = document.querySelectorAll('.selected');
    selected[0].classList.remove('selected');
    filter.classList.add('selected');
    const notCompleted = document.querySelectorAll('.todo-list > li');
    for (const task of notCompleted) {
        if (task.className == "completed") {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    };
};
function checkFilter() {
    const hash = window.location.hash;
    let filter = document.querySelectorAll(`.filters [href="${hash}"]`)
    if (hash == '#/') {
        filterAll(filter[0])
    } else if (hash == '#/active') {
        filterActive(filter[0]);
    } else if (hash == '#/completed') {
        filterComplete(filter[0])
    };
};