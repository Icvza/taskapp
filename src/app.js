const taskContainer = document.getElementsByClassName('feed')[0]
const addTaskForm = document.getElementsByClassName("addTaskForm")[0]
const taskInput = document.getElementsByClassName("formInput")[0]
document.addEventListener('DOMContentLoaded', fetchTasks)

function fetchTasks() {
     fetch('http://localhost:3000')
          .then(resp => resp.json())
          .then(tasks => {
               diaplayTasks(tasks)
          })
}
//========================================================
function diaplayTasks(tasks) {
     tasks.map((task) => {
          let html = generateHTML(task)
          let element = elementFromHtml(html)
          taskContainer.append(element)
     })
}

function generateHTML(task) {
     return ` 
          <div class=" ">
               <p> ${task.id} </p>
               <h1> ${task.body} </h2>
               <button onClick=(editTask()) class="edit"> Edit </button>
               <button onClick=(deleteTask()) class="delete"> Delete </button>
          </div>
     `
}

function elementFromHtml(html) {
     const template = document.createElement("template")
     template.innerHTML = html.trim()
     return template.content.firstElementChild
}


//===========================================================
addTaskForm.addEventListener('submit', (event) => {
     event.preventDefault()
     const taskBody = taskInput.value

     const task = { body: taskBody }

     const configObj = {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
     }

     fetch("http://localhost:3000/tasks/new", configObj)
          .then(resp => resp.json())
          .then(task => {
               console.log(task)
          })
})
// ================================ DELETIng

const deleteTask = () => {
     let id = parseInt(event.target.parentElement.firstElementChild.innerHTML)
     console.log(id)

     fetch('http://localhost:3000/' + id, {
          method: 'DELETE',
          headers: {
               'Content-Type': 'application/json'
          }
     })
          .then(resp => resp)
          .then(json => alert(json.message))
}

//===============EDIT============================

const editTask = () =>{
     let id = parseInt(event.target.parentElement.firstElementChild.innerHTML)
     let word = event.target.parentElement.children[1]
     let conatiner = document.querySelector("body > div > div")
     let form = document.createElement('form')
     form.classList = "addTaskForm"
     let inputText = document.createElement('input')
     inputText.type = type="text"
     inputText.classList = "formInput"
     let inputSubmit = document.createElement('input')
     inputSubmit.type = "submit"

     form.append(inputText)
     form.append(inputSubmit)

     conatiner.append(form)


}


