
var data = {
    todo: [],
    completed: []
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


    parent.removeChild(item);
}

function addItemToDom(text) {
    var list = document.getElementById('todo');

    var note = document.createElement('li');
    note.classList.add('list-group-item');
    note.innerText = text;


    var removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    // removeBtn.innerText = "delete";

    removeBtn.addEventListener('click', removeNote);

    note.appendChild(removeBtn);

    

    list.insertBefore(note, list.childNodes[0]);
}












