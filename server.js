const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
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

app.post('/test', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

app.post('/addUser', (req, res) => {
    let reqObj = req.body;
    let name = reqObj['uName']
    let email = reqObj['uEmail']
    let mobile = reqObj['uMobile']
    let location = reqObj['uLocation']

    let sqlQuery = "INSERT INTO users(name,email,mobile,location) values('" + name + "','" + email + "','" + mobile + "','" + location + "')";

    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.send('User Added.')
    })
})

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('User Management Server is wokring on port 8080')
})