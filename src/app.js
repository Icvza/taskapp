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
          <div class="id:${task.id}">
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
     const currentTaskBody = document.getElementsByClassName(`id:${id}`)[0].children[1].innerHTML

     //Creating the form to diaplay 
     let form = document.createElement('form')
     form.classList = "addTaskForm edit"
     let inputText = document.createElement('input')
     inputText.type ="text"
     inputText.classList = "formInput edit"
     inputText.placeholder = `${currentTaskBody}`
     let inputSubmit = document.createElement('input')
     inputSubmit.type = "submit"

     form.append(inputText)
     form.append(inputSubmit)

     const x = document.getElementsByClassName(`id:${id}`)[0]
     const y = document.getElementsByClassName(`id:${id}`)[0].children[1]

     y.remove()
     x.insertBefore(form, document.getElementsByClassName(`id:${id}`)[0].children[1])
     
     
     const i = document.getElementsByClassName('addTaskForm edit')[0]
     i.addEventListener('submit', (event) => {
          event.preventDefault()

          const editedInput= document.getElementsByClassName("formInput edit")[0]

          const taskBody = editedInput.value
     
          const task = { id: id, body: taskBody }
     
          const configObj = {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(task)
          }
     
          fetch('http://localhost:3000/update/' + id, configObj)
               .then(resp => resp.json())
               .then(task => {
                    console.log(task)
               })
     })

}
