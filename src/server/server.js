const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/dbMethods');

const app = express();

app.use( bodyParser.json() );

// подключение базы данных
db.setUpConnection();

// получение всех статей из базы
app.get('/getArticles', function (req, res) {
    db.getAllArticles().then(data => res.json(data));
});

// получение статьи по id из базы
app.get('/:id', function (req, res) {
    db.getOneArticle(req.params.id).then(data => res.json(data));
});

// добавление статьи в базу
app.post('/addArticle', function (req, res) {
    db.createArticle(req.body).then(data => res.json(data));
});

// изменение статьи в базе
app.post('/editArticle', function (req, res) {
    db.editArticle(req.body).then(data => res.json(data));
});

// удаление статьи из базы
app.delete('/deleteArticle/:id', function (req, res) {
    db.deleteArticle(req.params.id).then(data => res.json(data));
});



const port = 1212;

app.listen(port, function () {
  console.log(`server is started on port: ${port}`)
});



