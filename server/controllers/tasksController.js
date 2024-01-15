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

tasksController.addTask = async (req, res, next) => {
    console.log('Inside of addTask middleware');

    const addTaskValues = [
        res.cookies.user_id,
        req.body.title,
        req.body.description,
        req.body.due_date,
        req.body.status
    ];

    const addTaskStatement = `INSERT INTO tasks (
        user_id,
        title,
        description,
        due_date,
        status
      )
      VALUES (
        $1, $2, $3, $4, $5
      )`;

    await db.query(addTaskStatement, addTaskValues)
        .then((data) => {
            console.log('Successfully added task');
            return next();
        })
        .catch((err) => {
            return next(err);
        });
}

tasksController.deleteTask = async (req, res, next) => {
    console.log('Inside of deleteTask middleware');
    console.log('req.body.id: ', req.body.id);

    const deleteTaskQuery = `DELETE FROM tasks WHERE id = $1`;

    await db.query(deleteTaskQuery, [req.body.id])
        .then((data) => {
            console.log('Successfully deleted task.')
            return next();
        })
        .catch((err) => {
            return next((err));
        });
};

module.exports = tasksController;