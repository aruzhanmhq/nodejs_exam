let courseInfoBlock = $("#course_info");
let showAllCourses = $("#text");

let courseInfo = JSON.parse(localStorage.getItem("selectedCourse"));

let drawCourseInfo = () => {
    courseInfoBlock.append(`
        <div class="course">     
            <div class="text"><b>Title:</b> ${courseInfo.title}</div>
            <div class="text"><b>Owner:</b> ${courseInfo.owner.fullName}</div>
            <div class="text"><b>Description:</b> ${courseInfo.description}</div>
            <div class="text"><b>Created At:</b> ${courseInfo.createdAt}</div>
            <button onclick="enrollInCourse()" id="enroll_btn">Enroll</button>
        </div>
    `)
}

drawCourseInfo();

let enrollInCourse = () => {
    let settings = {
        url: `http://localhost:8080/courses/enroll`,
        method: 'post',
        data: {
            userId: JSON.parse(localStorage.getItem("user"))._id,
            courseId: courseInfo._id
        },
        success: () => {
            console.log("student added")
        },
        error: () => {
            console.log('Error')
        }
    }

    $.ajax(settings)
}

showAllCourses.click(() => {
    let student = JSON.parse(localStorage.getItem("user"))
    let coursesBlock = $("#courses_block");

    let settings = {
        url: `http://localhost:8080/courses`,
        method: 'get',
        success: (response) => {
            courseInfoBlock.empty()

            for(let i = 0; i < response.length; i++){
                if(student._id == response[i].enrolledStudents[0]._id){
                    console.log(response)
                    coursesBlock.append(`
                        <div class="course">     
                            <div class="course_title"><b>${response[i].title}</b></div>
                            <div class="course_description">${response[i].description}</div>
                            <div class="course_description">Owner: ${response[i].owner.fullName}</div>
                            <div class="course_description">Created At: ${response[i].createdAt}</div>
                        </div>
                    `)
                }
            }
        }
    }

    $.ajax(settings)
})