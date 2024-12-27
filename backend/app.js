const express = require('express')
const PORT = 3500
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let todos = [
    {id:23, value: 'Complete React project'}
]

app.get('/todos', (request, response) => {
    
    response.status(200).json(todos)
})

app.post('/addToDo', (request, response) => {
    todos = [...todos, request.body]
    console.log(todos)
    response.status(201).json(todos)
})

app.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id)

    const index = todos.findIndex(todo => todo.id === id)

    if (index !== -1)
    {
        todos.splice(index, 1)
        return response.status(200).json({message : 'Deleted successfully', todos})
    }
    else
    {  
        return response.status(404).json({message : 'Invalid id'})
    }
})

app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}`)
})