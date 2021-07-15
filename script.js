function load_tasks() {
    let loaded_tasks = JSON.parse(localStorage.getItem('data'));
    for(let i in loaded_tasks) {
        if (loaded_tasks[i] === 'created') {
            let list = document.querySelector('#task-list');
            let li = document.createElement('li');
            li.innerHTML = "<input type=\"checkbox\" class=\"checkbox-line\" onchange=\"doalert(this)\"><span class=\"task\">"+ i +"</span>\n" +
                "<button class=\"delete-btn\" >X</button>";
            list.appendChild(li);

        } else if ( loaded_tasks[i] === 'done') {
            let list = document.querySelector('#task-list');
            let li = document.createElement('li');
            li.innerHTML = "<input type=\"checkbox\" checked class=\"checkbox-line\" onchange=\"doalert(this)\"><span class=\"task task-done\">"+ i +"</span>\n" +
                "<button class=\"delete-btn\" >X</button>";
            list.appendChild(li);
        }

    }

}


let taskList = JSON.parse(localStorage.getItem("data")) || {};
document.getElementById("add-task-button").addEventListener("click", function () {
    let new_task = document.getElementById('input-task').value;
    taskList[new_task] = "created";
    localStorage.setItem('data',JSON.stringify(taskList));
    let list = document.querySelector('#task-list');
    let li = document.createElement('li');
    li.innerHTML = "<input type=\"checkbox\" class=\"checkbox-line\" onchange=\"doalert(this)\"><span class=\"task\">"+ new_task +"</span>\n" +
        "<button class=\"delete-btn\" >X</button>";
    list.appendChild(li);
    deletion()
    document.getElementById("input-task").value = "";
});

function doalert (box) {
    let checkbox = document.getElementsByClassName('checkbox-line');
    let span = document.getElementsByClassName('task');
    for(let i=0;i<checkbox.length;i++) {
        if(checkbox[i].checked){
            span[i].classList.add('task-done');
             taskList[span[i].textContent] = "done";
             localStorage.setItem('data',JSON.stringify(taskList));
        } else{
            span[i].classList.remove('task-done');
        }
    }
}

function deletion() {
    let delete_btns = document.getElementsByClassName('delete-btn');

    for (let i = 0; i < delete_btns.length; i++) {
        delete_btns[i].addEventListener("click", dodelete);

    }
}

function dodelete()
{
    deleted_task = this.parentNode.innerText.slice(0,-2);
    taskList[deleted_task] = "deleted";
    localStorage.setItem('data',JSON.stringify(taskList));
    return this.parentNode.remove();
}


load_tasks()

deletion()