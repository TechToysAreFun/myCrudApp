const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import Routers
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/tasksRouter');

app.use(express.static(path.resolve(__dirname, '../client')));


app.use('/', userRouter);
app.use('/tasks', taskRouter);

//! TO-DO: CATCH ALL HANDLER 

//! TO-DO: GLOBAL ERR HANDLER


app.use((err, req, res, next) => {
    const defaultErr = {
        log: `Global err handler, unknown middleware err`,
        status: 500,
        message: 'Unknown server error. Our appologies!'
    }
    const errObj = Object.assign({}, defaultErr, err)
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

module.exports = app;