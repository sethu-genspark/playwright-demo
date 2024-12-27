import {test, expect} from '@playwright/test'

test.describe('initial test', () => {
    test('Login', {
        annotation : {
            type : 'issue',
            description : 'There is some issue with login'
        }}, async({page}) => {
        await page.pause() //Debugger
    
        await page.goto('http://localhost:5173')
    
        await page.getByRole('textbox', {name : 'username'}).fill('user')
        await page.getByRole('textbox', {name:'password'}).fill('password')
    
        await page.getByRole('button',{name:'Login'}).click()
    
        await expect(page.getByRole('heading', {name: 'Todo list'})).toBeVisible()
    })
    
    test ('Mock test', async({page}) => {
    
        
    
        await page.goto('http://localhost:5173')
    
        await page.getByRole('textbox', {name : 'username'}).fill('user')
        await page.getByRole('textbox', {name:'password'}).fill('password')
    
        await page.getByRole('button',{name:'Login'}).click()
    
        // await page.getByPlaceholder('Add todo').fill('task1')
        // await page.getByRole('button', {name : 'Add todo'}).click()
    
    
        await page.route(`http://localhost:3500/todos`, async route => {
            const json = {
                'todos' : [
                    {
                        'id':1735281073039,
                        'value':'sdfsfs'
                    }
                ]
            }
            await route.fulfill({json})
        })
    
    
        await page.route(`http://localhost:3500/addToDo`, async route => {
            const json = {
                'todos' : [
                    {
                        'id':1735281073039,
                        'value':'sdfsfs'
                    },
                    {
                        'id':1735281073023,
                        'value':'task1'
                    }
                ]
            }
            await route.fulfill({json})
        })
    
    
        await expect(page.getByRole('list')).toContainText('task1')
    })
})

test.describe('API test', () => {
    test ('Get Todos', async ({request}) => {
        const todos = await request.get('http://localhost:3500/todos')
        expect(todos.ok()).toBeTruthy()

        const todosVal = await todos.json()
        expect(todosVal).toContainEqual({
            id:23, value: 'Complete React project'
        })
    })

    test('Add todo', async({request}) => {
        const newTodo = await request.post('http://localhost:3500/addTodo', {
            data : {
                id:1,
                value:'Task 1'
            }
        })

        expect(newTodo.ok()).toBeTruthy()

        const todos = await request.get('http://localhost:3500/todos')
        expect(todos.ok()).toBeTruthy()

        const todosVal = await todos.json()
        expect(todosVal).toContainEqual({
            id:1, value: 'Task 1'
        })
    })
})




