let title = $("#title")
let description = $("#description")
let addCourse = $("#addCourse")
let usersSelect = $("#usersSelect")

let settings = {
    url: 'http://localhost:8080/users',
    method: 'get',
    success: (response) => {
        console.log(response)
        for(let item of response)
        if(item.roleId == 2){
            usersSelect.append(`
            <option value=${item.fullName}>${item.fullName}</option>
            `)
        }
    }
}

$.ajax(settings)
addCourse.click(() => {
    let settings = {
        url: 'http://localhost:8080/courses',
        method: 'post',
        data: {
            title: title.val(),
            description: description.val(),
            owner: JSON.parse(localStorage.getItem('user')).fullName
        },
        success: (response) => {
            console.log(response)
            getCourses()
        },
        error: () => {
            console.log('error')
        }
    }

    $.ajax(settings)
})

let coursesBlock = $('#coursesBlock')

function getCourses(){
    let settings = {
        url: 'http://localhost:8080/courses',
        method: 'get',
        success: (response) => {
            console.log(response)
            coursesBlock.css('display', 'flex')
            coursesBlock.empty()
            localStorage.setItem('courses', JSON.stringify(response))
            for(let i = 0; i < response.length; i++){
                coursesBlock.append(`
                    <div id=courseInfo onclick=showInfo(${i})>
                        <h3>Title: ${response[i].title}</h3>
                        <p>${response[i].description.slice(0, 100).concat('<b>...</b>')}</p>
                        <em>${response[i].owner}</em>
                    </div>
                `)
            }
        },
        error: () => {
            console.log('error')
        }
    }

    $.ajax(settings)
}

getCourses()

let showCourse = $("#showCourse")

showCourse.click(() => {
    let settings = {
        url: 'http://localhost:8080/courses',
        method: 'get',
        success: (response) => {
            console.log(response)
            coursesBlock.css('display', 'flex')
            coursesBlock.empty()
            localStorage.setItem('courses', JSON.stringify(response))
            for(let i = 0; i < response.length; i++){
                if(usersSelect.val() == response[i].owner){
                    coursesBlock.append(`
                    <div id=courseInfo onclick=showInfo(${i})>
                        <h3>Title: ${response[i].title}</h3>
                        <p>${response[i].description.slice(0, 100).concat('<b>...</b>')}</p>
                        <em>${response[i].owner}</em>
                    </div>
                `)
                }
            }
        },
        error: () => {
            console.log('error')
        }
    }

    $.ajax(settings)
})

function showInfo(index){
    let array = JSON.parse(localStorage.getItem('courses'))
    let clickedCourse = array[index]


    let fullInfo = $('#fullInfo')

    fullInfo.css('display', 'flex')

    let arrayCourse = []

    for(let item in clickedCourse){
        arrayCourse.push(clickedCourse[item])
    }

    console.log(arrayCourse)

   coursesBlock.empty()
   coursesBlock.append(`
   <button onclick=getCourses() style="padding: 10px;
   font-size: 19px;">Back</button>
   <div id=fullInfo>
        <h2>${arrayCourse[1]}</h2>
        <p>${arrayCourse[2]}</p>
        <em>${arrayCourse[3]}</em>
        <div id=studentsInfo>
        </div>
    </div>
        `)
    
    let studentsInfo = $('#studentsInfo')

    for(let item of arrayCourse[4]){
        
    }
}