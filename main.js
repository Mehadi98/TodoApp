let task = document.querySelector('#taskText')
let taskBtn = document.querySelector('#taskBtn')
let searchInput = document.querySelector('#searchInput')
let clearBtn = document.querySelector('#clearBtn')
let ol = document.querySelector('ol')


taskBtn.addEventListener('click', taskAdd)
ol.addEventListener('click', taskRemove)
clearBtn.addEventListener('click', clearTask)
searchInput.addEventListener('keyup',searchTask)
document.addEventListener('DOMContentLoaded',dataShow)

function taskAdd(){
    if (task.value ===''){
        alert('Please Enter a Task ')
    }else{

        let li = document.createElement('li')
        let p = document.createElement('p')
        let a = document.createElement('a')
        a.setAttribute('href','#')
        a.innerHTML = 'Delete'
        p.appendChild(document.createTextNode(task.value))
        li.appendChild(p)
        li.appendChild(a)
        ol.appendChild(li)

        storeTask(task.value)

        task.value = ''
        
    }
}


function taskRemove(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you Sure ?')){
            let li = e.target.parentElement
            li.remove()
            taskRemoveLc(li)
        }
    }
}

function clearTask(){
    ol.innerHTML = ""
    localStorage.clear()
}


function searchTask(e){
    let userInput = e.target.value.toLowerCase()
    let value = document.querySelectorAll('li')
    value.forEach((task)=>{
    let data = task.firstChild.textContent
    if(data.toLowerCase().indexOf(userInput)!=-1){
        task.style.display = 'block'
    }else{
        task.style.display = 'none'

    }
})
}




function storeTask(taskValue){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(taskValue)
    localStorage.setItem('tasks',JSON.stringify(tasks))


}


function dataShow(){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach((task)=>{
        let li = document.createElement('li')
        let p = document.createElement('p')
        let a = document.createElement('a')
        a.setAttribute('href','#')
        a.innerHTML = 'Delete'
        p.appendChild(document.createTextNode(task))
        li.appendChild(p)
        li.appendChild(a)
        ol.appendChild(li)
    })

}


function taskRemoveLc(taskList){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let data = taskList.firstChild.textContent.trim()
    
    tasks.forEach((task,index)=>{
        if (data===task){
            tasks.splice(index,1)
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks))
}