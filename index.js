const express = require('express')
const fs = require('fs')
const cors = require("cors")
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
     fs.writeFileSync('taskData.json')
}
const addTask= (body) => {
     const tasks = loadTasks()
     const duplicateTasks = tasks.find((task) => task.body === body)
     if (!duplicateTasks){
          tasks.push({
               body: body
          })
     } else {
          console.log('Task already taken')
     } 
     
     saveTasks(notes)
}

app.listen(3000)

app.get('/', (req, res)=> {
     const tasks = loadTasks()
     res.json(tasks)
     console.log(tasks)
})

app.post('/tasks/new', (req, res) => {
     const tasks = loadTasks()
})   






