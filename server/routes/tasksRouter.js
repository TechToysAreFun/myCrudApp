const path = require('path');
const express = require('express');

const router = express.Router();

const tasksController = require('../controllers/tasksController');
const userController = require('../controllers/userController');

router.get("/getTasks",
    userController.verifyUser,
    tasksController.getTasks,
    (req, res) => {
        console.log('Inside of /getTasks route');
        res.status(200).json(res.locals.tasks);
    });

router.post('/deleteTask',
    tasksController.deleteTask,
    (req, res) => {
        console.log('Inside of /deleteTask route');
        res.redirect('/tasks/getTasks');
    })



module.exports = router;