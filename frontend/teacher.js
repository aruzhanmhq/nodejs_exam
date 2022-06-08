const titleInput = $("#title_input");
const descriptionInput = $("#description_input");
const createBtn = $("#create_btn");

if(localStorage.getItem("user") === null){
    location.href = "login.html";
}

createBtn.click(() => {
    let settings = {
        url: "http://localhost:8080/courses",
        method: 'post',
        data: {
            title: titleInput.val(),
            description: descriptionInput.val(),
            owner: localStorage.getItem("user")
        },
        success: () => {
            console.log("Course created")
        },
        error: () => {
            console.log('Error')
        }
    }

    $.ajax(settings)

})

let loadCourses = () => {
    let coursesBlock = $("#courses_block");

    let settings = {
        url: `http://localhost:8080/courses`,
        method: 'get',
        success: (response) => {
            localStorage.setItem("courses", JSON.stringify(response))
            coursesBlock.empty()
            console.log(response[0].owner._id)
            let teacher = JSON.parse(localStorage.getItem("user")) 
            console.log(teacher)

            for(let i = 0; i < response.length; i++){
                if(teacher._id == response[i].owner._id){
                    coursesBlock.append(`
                        <div class="course">     
                            <div class="course_title"><b>${response[i].title}</b></div>
                            <div class="course_description">${response[i].description}</div>
                        </div>
                    `)

                }
 
            }
        }
    }

    $.ajax(settings)
}

loadCourses();
