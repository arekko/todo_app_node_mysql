
// var data = (localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : {
//     todo: [],
//     completed: []
// };

// renderToDoList();

// function renderToDoList() {
//     // if (!data.todo.length && !data.completed) return;

//     // for (var i = 0; i < data.todo.length; i++) {
//     //     addItemToDom(data.todo[i]);
//     // }
//     // for (var j = 0; j < data.completed.length; j++) {
//     //     addItemToDom(data.completed[j], true);
//     // }



// }
// fetch all tasks from api and add them to dom
getTasks( (tasks) => {
    tasks.forEach(item => {
        addItemToDom(item, item.completed);
    });
});

// function dataObjectUpdated() {
//     localStorage.setItem('notes', JSON.stringify(data));
//   };

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
    document.getElementById('item').value = "";
    
    sendItemToApi(value , (item) => {

        addItemToDom(item);
    });
};

function removeNote() {
    var item = this.parentNode;
    var parent = item.parentNode;
    var taskId = parseInt(item.getAttribute('data-id'));

    parent.removeChild(item);
  
    var req = new XMLHttpRequest();
    req.open('POST', '/tasks/' + taskId + '/remove');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send();
  
    req.addEventListener('load', () => {
        console.log(parent, item);
        
        
      var results = JSON.parse(req.responseText);
      if (results.error) return console.log(results.error);
  
      
    });
  
    req.addEventListener('error', (e) => {
      console.log('Shit, something bad happened.');
      console.log(e);
    });
  }

function completeItem() {
    var item = this;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    var taskId = parseInt(item.getAttribute('data-id'));


    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    
    var req = new XMLHttpRequest();
    req.open('POST', '/tasks/' + taskId + '/update');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ completed: (id === 'todo') }));

  
    req.addEventListener('load', () => {
        console.log(parent, item);
        
        
      var results = JSON.parse(req.responseText);
      if (results.error) return console.log(results.error);
  
        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);
    });
  
    req.addEventListener('error', (e) => {
      console.log('Shit, something bad happened.');
      console.log(e);
    });

    
}

function addItemToDom(task, completed) {
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
    // var list = document.getElementById('todo');

    var note = document.createElement('li');
    note.classList.add('list-group-item');
    note.innerText = task.description;
    note.setAttribute('data-id', task.id);

    var removeBtn = document.createElement('button');

    removeBtn.className = "remove btn btn-danger float-right";
    
    
    removeBtn.addEventListener('click', removeNote);
    note.addEventListener('click', completeItem);



    note.appendChild(removeBtn);
    list.insertBefore(note, list.childNodes[0]);
}



function sendItemToApi(item, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', '/tasks/add');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({item: item}));
    // console.log(req);

    req.addEventListener('load', () => {
        var results = JSON.parse(req.responseText);
        
        if (results.error) return console.log(results.error);
        
        if (callback) callback(results);
    });

    req.addEventListener('error', () => {
        console.log('shit happens');
        console.log(e);
        
    });

};

//will fetch all tasks from api

function getTasks(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', '/tasks');
    req.send();
    
    req.addEventListener('load', () => {
        var results = JSON.parse(req.responseText);
        
        if (results.error) return console.log(results.error);
        
        if (callback) callback(results);
    });

    req.addEventListener('error', () => {
        console.log('shit happens');
        console.log(e);
        
    });
};

