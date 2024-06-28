const router = require('express').Router();
const userController = require('../controllers/userController.js');
const auth = require('../auth.js');

const {
     getAllUsers,
     registerUser,
     loginUser,
     getUserDetails
} = userController;

const {
     userAuth
} = auth;


router.get('/', userAuth, getAllUsers);

router.get('/details', userAuth, getUserDetails);

router.post('/register', registerUser);

router.post('/login', loginUser);




module.exports = router;