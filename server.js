const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path');
const { log } = require('console');
const app = express();


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'user_db'
})

connection.connect()
console.log('Connected to MySQL Database');

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/confirmation.html'));
})

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, result, fields) => {
        if (err)
            throw err;
        else
            res.send(result)
    })
})

app.post('/addUser', (req, res) => {
    let reqObj = req.body;
    let name = reqObj['uName']
    let email = reqObj['uEmail']
    let mobile = reqObj['uMobile']
    let location = reqObj['uLocation']

    let sqlQuery = "INSERT INTO users(name,email,mobile,location) values(?,?,?,?)";
    let value = [name, email, mobile, location]

    console.log(sqlQuery);
    connection.query(sqlQuery, value, (err, result) => {
        if (err) throw err;
        console.log(path.join('public', '/confirmation.html'));
        res.sendFile(path.join(__dirname, 'public/confirmation.html'));
    })
})

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('User Management Server is wokring on port 8080')
})