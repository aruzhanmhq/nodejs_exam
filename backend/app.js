const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRouter = require("./routers/UsersRouter");
const coursesRouter = require("./routers/CoursesRouter");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);


const CONNECTION_STRING = 'mongodb+srv://tooag:anjumongodb@cluster0.zd3j3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_STRING, (err) => {
    if(err) return console.log(err);
    app.listen(8080, () => console.log("Сервер запущен"));
});