const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/task', userController.AddTask);
router.get('/selectTasks', userController.selectTasks);
router.delete(`/deleteTask/:id`, userController.DeleteTask);
router.put('/updateTask/:id', userController.Update);


router.post('/view', auth,userController.view);

module.exports = router;