let teachersSelect = $("#teachers_select");
let filterBtn = $("#filter_btn");
let courseBlock = $("#courses_block");

if(localStorage.getItem("user") === null){
    location.href = "login.html";
}

let loadTeachers = () => {
    let settings = {
        url: `http://localhost:8080/users`,
        method: 'get',
        success: (response) => {
            for(let i = 0; i < response.length; i++){
                if(response[i].roleId == 1){
                    teachersSelect.append(`
                        <option value="${response[i]._id}">${response[i].fullName}</option>
                    `)
                }
            } 
        }
    }

    $.ajax(settings)
}

loadTeachers();

let loadCourses = () => {
    let coursesBlock = $("#courses_block");

    let settings = {
        url: `http://localhost:8080/courses`,
        method: 'get',
        success: (response) => {
            localStorage.setItem("courses", JSON.stringify(response))
            coursesBlock.empty()

            for(let i = 0; i < response.length; i++){
                coursesBlock.append(`
                    <div onclick="showCourse(${i})" class="course">     
                        <div class="course_title"><b>${response[i].title}</b></div>
                        <div class="course_description">${response[i].description}</div>
                        <div class="course_description">Owner: ${response[i].owner.fullName}</div>

                    </div>
                `)
            }
        }
    }

    $.ajax(settings)
}

loadCourses();

filterBtn.click(() => {
    let courses = JSON.parse(localStorage.getItem("courses"));
    courseBlock.empty();

    for(let i = 0; i < courses.length; i++){
        if(courses[i].owner._id == teachersSelect.val()){
            courseBlock.append(`
                <div class="course">
                    <div class="course_title"><b>${courses[i].title}</b></div>
                    <div class="course_description">${courses[i].description}</div>
                    <div class="course_description">Owner: ${courses[i].owner.fullName}</div>
                </div>
            `)
        }
    }
})

let showCourse = (index) => {
    let courses = JSON.parse(localStorage.getItem("courses"));
    localStorage.setItem("selectedCourse", JSON.stringify(courses[index]));
    location.href = "course.html";
}