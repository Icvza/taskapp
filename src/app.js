const taskContainer = document.getElementsByClassName('feed')[0]
const addTaskForm = document.getElementsByClassName("addTaskForm")[0]
const taskInput = document.getElementsByClassName("formInput")[0]

const corsUrl = "https://cors-everywhere.herokuapp.com/http://3.95.199.36"

document.addEventListener('DOMContentLoaded', fetchTasks)
//debugger
function fetchTasks() {
     fetch(`${corsUrl}`)
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
     return `     <section class=" id:${task.id} py-8 px-8 pr-8 bg-blue-50 w-1/3" id="contactForm">

     <div class="flex items-center  justify-center md:items-row min-h-[25%] bg-blue-50">
          <div class="relative flex flex-col w-2/3 min-h-2/3  max-h-2/3 md:flex-row py-8  space-y-2 bg-white shadow-2xl rounded-2xl md:flex-row ">
               <div class="p-6 md:p-20 md:w-full">
                    <h1> ${task.id} </h1> <h2 class="mb-5 text-4xl font-bold text-center text-wrap"> ${task.body} </h2>
                    <form class="addTaskForm" action="">
                         <div
                              class="flex flex-col items-center justify-center mt-6 space-y-6 md:flex-row md:space-y-0">
                              <button onClick=(editTask(event)) class="w-1/2  flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-909 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 ">
                              Edit
                         </button>
                         
                         <button onClick=(deleteTask(event)) class="w-1/2 delete flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-909 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 ">
                              Delete
                         </button>
                         
                         </div>
                    </form>
               </div>
          </div>
     </div>

</section>

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

     const idrep = parseInt(document.getElementsByClassName('feed')[0].childElementCount)
     const idreplacement = idrep + 1
     const fakeTask = {id: idreplacement, ...task}
     function nonDataTask (task){
          let html = generateHTML(task)
          let element = elementFromHtml(html)
          taskContainer.append(element)
     }

     nonDataTask(fakeTask)

     fetch(`${corsUrl}/tasks/new`, configObj)
          .then(resp => resp.json())
          .then(task => {
               console.log(task)
          })
})
// ================================ DELETIng

const deleteTask = (event) => {
     
     let id = parseInt(event.target.parentElement.parentElement.parentElement.children[0].innerHTML)
     event.preventDefault()
     const taskHtml = document.getElementsByClassName(`id:${id}`)[0]
     taskHtml.remove()
     fetch(`${corsUrl}/` + id, {
          method: 'DELETE',
          headers: {
               'Content-Type': 'application/json'
          }
     })
          .then(resp => resp)
          .then(json => {
               console.log('Deleted')
          })
}



//===============EDIT============================

const editSubmit = (event) => {
     event.preventDefault()

     let id = parseInt(event.target.parentElement.parentElement.parentElement.children[0].innerHTML)
     const taskBody = document.getElementsByClassName("formInput edit")[0].value

     const task = { id: id, body: taskBody }

     function createNode(passedfunction) {
          const html = passedfunction 
          debugger
          const element = elementFromHtml(html)
          return element
     }

     const sectionTodel = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
     const secionParent = sectionTodel.parentNode
     secionParent.replaceChild(createNode(generateHTML(task)), sectionTodel)

     const configObj = {
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
     }

     fetch(`${corsUrl}/update/` + id, configObj)
          .then(resp => resp.json())
          .then(task => {
               console.log(task)
          })
}


const editTask = (event) =>{
     event.preventDefault()
     let id = parseInt(event.target.parentElement.parentElement.parentElement.children[0].innerHTML)
     const currentTaskBody = document.getElementsByClassName(`id:${id}`)[0].children[0].children[0].children[0].children[1].innerHTML

     function formHTMLGenerator (){
          return(
               `
               <form>                      
                    <div class="2-full">
                         <input class="w-full formInput edit p-6 mt-2 border border-gray-300 rounded-md placeholder placeholder:font-light" placeholder="${currentTaskBody}" type="text" required>
                    </div>
                    <div class="flex flex-col items-center justify-center mt-6 space-y-6 md:flex-row md:space-y-0">
                         <button onClick=(editSubmit(event)) class="w-1/2 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-909 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 ">
                              <input type="submit">
                         </button>
                    </div>
               <form>
               `
          )
     }    


     function createNode(passedfunction) {
          const html = passedfunction 
          const element = elementFromHtml(html)
          return element
     }


     const taskForRemoval = document.getElementsByClassName(`id:${id}`)[0].children[0].children[0].children[0].children[1]
     const formForRemoval = document.getElementsByClassName(`id:${id}`)[0].children[0].children[0].children[0].children[2]
     const parentDiv = formForRemoval.parentNode
     parentDiv.replaceChild(createNode(formHTMLGenerator()), taskForRemoval)
     formForRemoval.remove()
}
