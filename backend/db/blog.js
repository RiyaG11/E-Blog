const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    name: String,
    blog: String

})
module.exports = mongoose.model('blogs', blogSchema);