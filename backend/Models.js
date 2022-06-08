const mongoose = require("mongoose");
const schemas = require("./Schemas");

const User = new mongoose.model("User", schemas.UserSchema);
const Course = new mongoose.model("Course", schemas.CourseSchema);

module.exports = {
    User,
    Course
}