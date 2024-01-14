const db = require('../models/data');

const tasksController = {};

tasksController.getTasks = async (req, res, next) => {
    console.log('res.cookies.user_id: ', req.cookies.user_id);

    const getTasksValues = [
        req.cookies.user_id
    ];
    const getTasksQuery = `SELECT * FROM tasks WHERE user_id = $1`;

    await db.query(getTasksQuery, getTasksValues)
        .then((data) => {
            console.log('Tasks received:', data.rows);
            res.locals.tasks = data.rows;
            return next();
        })
        .catch((err) => {
            console.log('Error getting user tasks');
            return next(err);
        });
};

module.exports = tasksController;