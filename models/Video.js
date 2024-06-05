const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
     src: {
          type: String,
          required: true
     },
     title: {
          type: String,
          required: true
     },
     category: {
          type: String
     }
});


module.exports = mongoose.model("Video", videoSchema);