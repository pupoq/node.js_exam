let login = $("#login")
let password = $("#password")
let fullName = $("#fullName")
let roleId = $("#roleId")
let createUser = $("#createUser")

let error = $('#error')

createUser.click(() => {
    if(login.val().length < 3 || password.val().length < 3 || fullName.val().length < 3){
        error.empty()
        error.css('color', 'red')
        error.append(`Incorrect inputs!`)
    } else {
        let settings = {
            url: "http://localhost:8080/users",
            method: "post",
            data: {
                fullName: fullName.val(), 
                login: login.val(), 
                password: password.val(), 
                roleId: roleId.val()
            },
            success: (response) => {
                console.log(response)
                error.empty()
                error.css('color', 'green')
                error.append(`User created!`)
            },
            error: () => {
                console.log(error)
            }
        }
    
        $.ajax(settings)
    }
})

let loginLog = $("#loginLog")
let passwordLog = $("#passwordLog")
let loginBtn = $('#loginBtn')

let error2 = $('#errorLog')

loginBtn.click(() => {
    let settings = {
        url: "http://localhost:8080/users/login",
        method: "post",
        data: {
            login: loginLog.val(),
            password: passwordLog.val(),
        },
        success: (response) => {
            console.log(response)
            localStorage.setItem('user', JSON.stringify(response))
            if(response.roleId == 1){
                location.href = "student.html"
            } else {
                location.href = "teacher/teacher.html"
            }
        }, 
        error: () => {
            console.log('error2')
            error2.empty()
            error2.css('color', 'red')
            error2.append(`<span style="animation: arr 0.3s">Incorrect login or password.<span>`)
        }
    }

    $.ajax(settings)
})

let removeBtn2 = $('#removeBtn2')
let removeBtn = $('#removeBtn')

let loginBlock = $('#loginBlock')
let registerBlock = $('#registerBlock')
let column = $('#column')

removeBtn2.click(() => {
    loginBlock.css('display', 'none')

    column.css('display', 'flex')
})

removeBtn.click(() => {
    loginBlock.css('display', 'flex')
    column.css('display', 'none')
})