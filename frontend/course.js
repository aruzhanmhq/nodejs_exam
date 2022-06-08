let courseInfoBlock = $("#course_info");

let courseInfo = JSON.parse(localStorage.getItem("selectedCourse"));
console.log(courseInfo)

let drawCourseInfo = () => {
    courseInfoBlock.append(`
    <div class="text"><b>Desc:</b> ${courseInfo.description}</div>

    `)
}

drawCourseInfo();