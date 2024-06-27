const Video = require('../models/Video.js');




/* const getVideos = (req, res) => {
     Video.find({})
     .then(videos => {
          const filteredVideos = videos.filter(video => video.category == req.user.financingType)

          res.json(filteredVideos);
     })  
     .catch(err => res.json(err));
} */

     const getVideos = (req, res) => {
          Video.find({})
            .then(videos => {
              const filteredVideos = videos.filter(video => {
                // Check for financing type match first
                if (video.category === req.user.financingType) {
                  return true; // Include video if category matches financing type
                }
        
                // Then check for videos with no category
                return !video.category || video.category === '';
              });
        
              res.json(filteredVideos);
            })
            .catch(err => res.json(err));
        };

const addVideo = (req, res) => {

     Video.findOne({src: req.body.src})
     .then(videoExist => {
          if(videoExist)
          return res.sendStatus(409);
     })

     newVideo = new Video({
          src: req.body.src,
          title: req.body.title,
          category: req.body.category
     })

     newVideo.save()
     .then(newVideo => res.json(newVideo))
     .catch(err => res.status(400).json(err.message));


}


module.exports = {
     getVideos,
     addVideo
}