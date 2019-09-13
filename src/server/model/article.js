const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id: {type: String},
    title: {type: String},
    description: {type: String}
});

const article = mongoose.model('article', ArticleSchema);
