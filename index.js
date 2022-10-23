const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require("cors")
const methodOverride = require('method-override')
//Initate express server 
const app = express() 
// Enable JSON to read boyd
app.use(express.json())
//Enable fornt end communitcaiton
app.use(cors())
//Load task fucntion from file 
const loadTasks = () => {
     try {
          const dataBuffer = fs.readFileSync('taskData.json')
          const dataJson = dataBuffer.toString()
          return JSON.parse(dataJson)
     } catch (e) {
          return[]
     }
}
//save login writen in one fuction to prevent having to write it again 
const saveTasks = (notes) => {
     const dataJson = JSON.stringify(notes)
     fs.writeFileSync('taskData.json', dataJson)
}
const addTask = (body) => {
     const tasks = loadTasks()
     let idNumber = tasks.length + 1 
     let obj = {id: idNumber, ...body}
     tasks.push(obj)
     saveTasks(tasks)
}


const updateTask = (task) => {
     const tasks = loadTasks()
     const updatedTasks = []
     for(const each of tasks) {
          if (each.id === task.id) {
               each.body =task.body
          }
          updatedTasks.push(each)
     }
     saveTasks(updatedTasks)
}


app.listen(3000)

app.get('/', (req, res)=> {
     const tasks = loadTasks()
     res.json(tasks)
})

app.post('/tasks/new', (req, res) => {
     task = req.body
     addTask(task)
     res.status(200).send({ status: 'OK'});
})

app.delete('/:id', (req, res)=> {
     const { id } = req.params
     removeTask(id)
})

app.put('/update/:id', (req, res)=> {
     const { id } = req.params
     task = req.body 
     updateTask(task)
})




const removeTask = (id) => {
     const tasks = loadTasks()
     const keepTasks = tasks.filter((task) => task.id != id
     )
     saveTasks(keepTasks)
}






