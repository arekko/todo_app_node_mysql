
var data = (localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : {
    todo: [],
    completed: []
};

renderToDoList();

function renderToDoList() {
    if (!data.todo.length && !data.completed) return;

    for (var i = 0; i < data.todo.length; i++) {
        addItemToDom(data.todo[i]);
    }
    for (var j = 0; j < data.completed.length; j++) {
        addItemToDom(data.completed[j], true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('notes', JSON.stringify(data));
  };

document.getElementById('add').addEventListener('click', function () {
    var value = document.getElementById('item').value; // this = button

    if (value) {
        addNewNotes(value);
    }

});
//add new notes by press enter key
document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value; // this = input
    
    
    if (e.code === 'Enter' && value) {
        addNewNotes(value);
    }
});

function addNewNotes(value) {
    addItemToDom(value);
    document.getElementById('item').value = "";

    data.todo.push(value);
    dataObjectUpdated();
}

function removeNote() {
    var item = this.parentNode;
    var parent = item.parentNode;
    
    var listId = parent.id;
    var value = item.innerText;
    
    if (listId === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    console.log(target);
    
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
    
}

function addItemToDom(text, completed) {
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
    // var list = document.getElementById('todo');

    var note = document.createElement('li');
    note.classList.add('list-group-item');
    note.innerText = text;


    var removeBtn = document.createElement('button');

    removeBtn.className = "remove btn btn-danger float-right";
    
    
    // removeBtn.innerText = "delete";

    removeBtn.addEventListener('click', removeNote);
    note.addEventListener('click', completeItem);



    note.appendChild(removeBtn);
    list.insertBefore(note, list.childNodes[0]);
}












