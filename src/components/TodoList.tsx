import axios from 'axios';
import { useEffect, useState } from 'react'

type TodoItem = {
    id: number;
    value: string;
}

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState<TodoItem | null>(null);

    useEffect(() => {
        fetchToDoData()
    },[])

    const fetchToDoData = async () => {
        const response = await axios.get(`http://localhost:3500/todos`)
            setTodos(response.data)
    }

    const handleAddTodo = async () => {
        if (newTodo && newTodo.value.trim() !== '') {
            const response = await axios.post(`http://localhost:3500/addToDo`,newTodo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setTodos(response.data)
            setNewTodo(null);
        }
    }

    const handleDelete = async (id: number) => {
       try{
        const response = await axios.delete(`http://localhost:3500/delete/${id}`)
        console.log(response)
        setTodos(response.data)
       }
       catch(error)
       {
            console.error(`Error detected : `, error)
       }
    }

    return (
        <div>
            <h2 className='text-2xl font-medium mb-4 text-center'>Todo list</h2>
            <input className='p-2 px-3 rounded' type="text" placeholder='Add todo' value={newTodo?.value ?? ''} onChange={(e) => setNewTodo({ id: new Date().getTime(), value: e.target.value })} />
            <button onClick={handleAddTodo} className='bg-zinc-900 transition hover:bg-blue-900 mt-3 p-2 px-3 ms-3 treansition rounded font-bold'>Add todo</button>
            <ul className='mt-4'>
                {todos.map((todo, index) => {
                    return <li className='px-2 py-1 bg-gray-700 rounded cursor-pointer mb-3 hover:bg-red-900 transition' key={index} onClick={() => handleDelete(todo.id)}>{todo.value}</li>
                })}
            </ul>
        </div>
    )
}
