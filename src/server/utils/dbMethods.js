const mongoose = require('mongoose');
require('../model/article');

const Article = mongoose.model('article');

function setUpConnection() {
    mongoose.connect(`mongodb://localhost/articles`, { useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true });
}
exports.setUpConnection = setUpConnection;

// получение всех статей из базы
function getAllArticles() {
    return Article.find();
}
exports.getAllArticles = getAllArticles;

// получение статьи по id из базы
function getOneArticle(id) {
    return Article.find({id: id});
}
exports.getOneArticle = getOneArticle;

// добавление статьи в базу
function createArticle(data) {
    const article = new Article({
        id: data.id,
        title: data.title,
        description: data.description
    });
    return article.save();
}
exports.createArticle = createArticle;

// изменение статьи в базе
function editArticle(data) {
    return Article.findOneAndUpdate(
        { id: data.id, },
        { $set: { 'title': data.title, 'description': data.description} }
    )
}
exports.editArticle = editArticle;

// удаление статьи из базы
function deleteArticle(id) {
    return Article.deleteOne({id: id});
}
exports.deleteArticle = deleteArticle;


