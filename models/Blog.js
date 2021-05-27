const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    postedAt: {
        type: 'string',
        default: new Date().toString()
    }
})

module.exports = new mongoose.model("Blog", BlogSchema);