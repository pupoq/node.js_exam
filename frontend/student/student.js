let usersSelect = $('#usersSelect')

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

let coursesBlock = $('#coursesBlock')

let showCourse = $('#showCourse')

function getCourses(){
    let settings = {
        url: 'http://localhost:8080/courses',
        method: 'get',
        success: (response) => {
            coursesBlock.css('display', 'flex')
            coursesBlock.empty()
            localStorage.setItem('courses', JSON.stringify(response))
            for(let i = 0; i < response.length; i++){
                coursesBlock.append(`
                    <div id=courseInfo onclick=enroll(${response[i]._id})>
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

showCourse.click(() => {
    let settings = {
        url: 'http://localhost:8080/courses',
        method: 'get',
        success: (response) => {
            coursesBlock.css('display', 'flex')
            coursesBlock.empty()
            localStorage.setItem('courses', JSON.stringify(response))
            for(let i = 0; i < response.length; i++){
                if(usersSelect.val() == response[i].owner){
                    coursesBlock.append(`
                    <div id=courseInfo onclick=enroll(${response[i]._id})>
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

function enroll(id){
    console.log(id)
    // let settings = {
    //     url: 'http://localhost:8080/courses/enroll',
    //     method: 'post',
    //     data: {
    //         userId: localStorage.getItem('user')._id,
    //          courseId: id 
    //     }
    // }
}