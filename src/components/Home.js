import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = ({todos, setTodos, addTodo,handleSignOut, token, user, deleteTodo}) => {
    const [input, setInput] = useState('')

    // useEffect( () => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:4400/gettodos', {
    //               method: 'GET',
    //               headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'authorization': "Bearer " + token
    //               }
    //             })
    //             console.log('response in useeffect fetch: ', response)
          
    //             const data = await response.json();
    //             console.log('data in  useeffect fetch: ', data)
    //             setTodos(data)
                
    //           } catch (error) {
    //             console.log('error in handleLogin: ', error)
    //           }
    //     }
    //     fetchData()
        
    // },[])

    return (
        <>
        <div>
        <button onClick={handleSignOut}>Sign out</button>
            HOME COMPONENT
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='What would you like to accomplish?'
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        addTodo(input); 
                        setInput('');
                    }
                }}
               
            />
          
            <p>{`Logged in as ${user.firstName}`}</p>
        </div>
        <div>
            {todos.map((todo) => {
                return (
                    <div key={todo._id}>
                        <p>{todo.text}</p>
                        <p onClick={() => deleteTodo(todo._id)}>X</p>
                    </div>
                    
                )
            })}
        </div>
        </>
    )
}

export default Home
