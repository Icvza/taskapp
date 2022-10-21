const taskContainer = document.getElementsByClassName('feed')[0]
const addTaskForm = document.getElementsByClassName("addTaskForm")
const taskInput = document.getElementsByClassName("formInput")[0]
document.addEventListener('DOMContentLoaded', fetchTasks)

function fetchTasks() {
     fetch('http://localhost:3000')
     .then(resp => resp.json())
     .then(tasks => {
          diaplayTasks(tasks)
     })
}

function diaplayTasks (tasks) {
     tasks.map((task) => {
          const div = document.createElement('div')
          div.innerHTML = task.body
          taskContainer.append(div)
     })
}
debugger
addTaskForm.addEventListener('submit', (e) => {

})