// Import db
const db = require('../models/data')

const userController = {};

userController.login = async (req, res, next) => {
    console.log('Inside of login middleware');
    console.log('req.body.username: ', req.body.username);
    console.log('req.body.password: ', req.body.password);

    const queryObj = {
        text: `SELECT username, id FROM users WHERE username = $1 AND password = $2`,
        values: [
            req.body.username,
            req.body.password
        ]
    };

    try {
        const user = await db.query(queryObj);

        if (user.rows[0]) {
            console.log('USER: ', user.rows[0]);
            res.locals.user = user.rows[0];
            return next();
        }
        else {
            next({
                log: 'No User Found',
                status: 500,
                message: 'Invalid username or password'
            })
        }
    }
    catch (err) {
        console.log('Login Query Error: ', err);
        next({
            log: 'Login query error',
            status: 500,
            message: '!Login error!'
        });
    }
}

userController.setCookie = async (req, res, next) => {
    console.log('res.locals.user.id: ', res.locals.user.id);
    res.cookie('user_id', res.locals.user.id, { httpOnly: true });
    return next();
}

userController.verifyUser = async (req, res, next) => {
    res.cookie = req.cookies.user_id;
    return next();
}

userController.signup = async (req, res, next) => {
    console.log('Inside of signup middleware');

    const signupValues = [
        req.body.signup_firstname,
        req.body.signup_lastname,
        req.body.signup_email,
        req.body.new_username,
        req.body.new_password
    ];

    const signupQuery = `INSERT INTO users (
            firstname,
            lastname,
            email,
            username,
            password
        )
        VALUES (
            $1, $2, $3, $4, $5
        ) RETURNING id`;

    const signupQueryResult = await db.query(signupQuery, signupValues)
        .then((data) => {
            console.log('User added to db. Response: ', data.rows[0].id);
            res.locals.user = data.rows[0];
            return next();
        })
        .catch((err) => {
            console.log('Error adding new user to db: ', err);
            return next((err));
        });
}

module.exports = userController;