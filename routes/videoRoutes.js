const router = require('express').Router();
const videoController = require('../controllers/videoController.js');
const auth = require('../auth.js');

const {
     getVideos,
     addVideo
} = videoController

const {
	userAuth
} = auth

router.get('/', userAuth, getVideos);
router.post('/', addVideo);


module.exports = router;