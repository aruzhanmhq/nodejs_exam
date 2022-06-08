const loginInput = $("#login_input");
const passwordInput = $("#password_input");
const loginBtn = $("#login_btn");

loginBtn.click(() => {
    let settings = {
        url: "http://localhost:8080/users/login",
        method: 'post',
        data: {
            login: loginInput.val(),
            password: passwordInput.val()
        },
        success: (response) => {
            localStorage.setItem("user", JSON.stringify(response));

            if(response.roleId == 1){
                location.href = "teacher.html";
            }else if(response.roleId == 2){
                location.href = "student.html";
            }
        },
        error: () => {
            console.log('Error')
        }
    }

    $.ajax(settings)
})

