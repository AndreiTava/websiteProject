const express = require('express');
const bodyParser = require('body-parser')
const mysql = require("mysql");
const cors = require('cors');

const app = express();
const port = 8000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1337",
    database: "project",
    multipleStatements: true
});

connection.connect((err) => {
    if(!err) {
        console.log("Connected to the database")
    } else {
        console.log(`Error: ${err}`);
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.set('view engine','ejs');


//realized my paths are a mess but it's too late to fix them

app.post('/search',(req,res)=>
{
    data = req.body;

    let query = `SELECT DISTINCT Id,Title,Price FROM games JOIN categories ON(game_id = Id)
    WHERE Title LIKE '%${data.key}%'
    AND Price >='${data.low_p}'
    AND Price <='${data.high_p}'`;
    if(data.category != null)
        query += `\nAND category = '${data.category}'`;

    console.log(query);
    connection.query(query, (err, rows)=> {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })    
})

app.get('/list',(req,res) =>
{
    connection.query("SELECT * from games", (err, rows)=> {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.get('/products', (req,res) =>
{
    res.render('pages/product',req.query);
});

app.get('/info', (req,res) =>
{
    res.sendFile(__dirname + "/public/info.html");
})

app.post('/questions', (req,res) =>
{
    connection.query(`INSERT INTO questions (question) VALUES('${req.body.question}')`,(err,data) =>
    {
        if(!err) {
            res.redirect('http://localhost:8000/info');
        } else {
            console.log(err);
        }
    });
})

app.get('/questions',(req,res) =>
{
    connection.query("SELECT * from questions", (err, rows)=> {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.delete('/questions/:id',(req,res)=>{
    connection.query(`DELETE FROM questions WHERE question_id = ${req.params.id}`,(err,data) =>
    {
        if(!err) {
            res.end();
        } else {
            console.log(err)
            res.end();
        }
    });
    res.end();
});

app.put('/questions/:id',(req,res)=>
{
    connection.query(`UPDATE questions SET answer = '${req.body.answer}' WHERE question_id = ${req.params.id}`,(err,data) =>
    {
        if(!err) {
            res.end();
        } else {
            console.log(err);
        }
    });
    res.end();
})

app.listen(port);
console.log("Server Succesfully started");