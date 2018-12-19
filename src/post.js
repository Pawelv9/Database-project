const mongoose = require('mongoose');

Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;