

const express        = require('express');
const mysql          = require('mysql2');
const bodyParser     = require('body-parser');
const app            = express();
const path           = require('path');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo'
});


try {
    connection.connect();
} catch(e) {
    console.log('conneciton to Mysql falled');
    console.log(e);
    
}

//<-----------Middleware------------>

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
    
// });

app.listen(3000, () => {
    console.log('app listening port 3000!');
    // console.log(path.join(__dirname) );

});


app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks ORDER BY created DESC', (error, result) => {
        if (error) return res.json({ error: error });
        
        res.json(result);
    });
});

app.post('/tasks/add', (req, res) => {
    connection.query('INSERT INTO tasks (description) VALUE (?)', [req.body.item], (error, result) => {
        if (error) return res.json({ error: error });

        connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, result) => {
            if (error) return res.json({ error: error });
            
             res.json({
                id: result[0]['LAST_INSERT_ID()'],
                description: req.body.item
            });
            
        });
    });
});

app.post('/tasks/:id/update', (req, res)  => {
    connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [req.body.completed, req.params.id], (error, result) => {
        if (error) return res.json({ error: error });
    
        res.json({});
       });
});


app.post('/tasks/:id/remove', (req, res) => {
    
   connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error, result) => {
    if (error) return res.json({ error: error });

    res.json({});
   }); 
});





     