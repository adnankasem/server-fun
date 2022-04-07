import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Home from './Home';
import useForm from '../hooks/useForm';

function App() {

  const {values,setValues,errors,handleChange, handleUseFormSubmit} = useForm(handleLogin);

  useEffect(() => {
    console.log('values: ', values)
  })

  const navigate = useNavigate();

  const [todos, setTodos] = useState([])
  const [token, setToken] = useState()
  const [registration, setRegistration] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const [user, setUser] = useState({})

  const [loginError, setLoginError] = useState({})

  // useEffect(() => {
  //   console.log(registration)
  // }, [registration])

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    try {
      const response = await fetch('http://localhost:4400/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: registration.email,
          password: registration.password,
          firstName: registration.firstName,
          lastName: registration.lastName
        })
      })
  
      const data = await response.json()
      console.log('data',data)
      setRegistration({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
      navigate('/')
    } catch (error) {
      console.log('error in handlesubmit', error)
    }

    
  }

  async function handleLogin(e,test) {
    if(e) e.preventDefault();
    console.log('values in  handlelogin: ', values)
    
    // let testValue = test ? test : 'no test'
    // console.log('testValue: ', testValue)

    // if(login.password.length < 6) {
    //   setLoginError({
    //     ...loginError,
    //     passLength: 'password must be atleast 6 characters long'
    //   })
    //   return
    // }
    try {
      const response = await fetch('http://localhost:4400/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })

      const data = await response.json();
      console.log('data in  handle login: ', data)
      setUser(data)
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setTodos(data.todos)
      console.log('token from localstorage after handle login',localStorage.getItem('token'))
      setLogin({
        email: '',
        password: ''
      })
      navigate('home')
    } catch (error) {
      console.log('error in handleLogin: ', error)
    }
  }

  const addTodo = async (input) => {
    // e.preventDefault();
    try {
      const response = await fetch('http://localhost:4400/addtodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer " + token
        },
        body: JSON.stringify({
          text: input,
          completed: false
        })
      })
      console.log('response in addtodo: ', response)

      const data = await response.json();
      console.log('data in  addtodo: ', data)
      setTodos(data.todos)
      
    } catch (error) {
      console.log('error in handleLogin: ', error)
    }
  }

  const deleteTodo = async (deleteId) => {
    try {
      const response = await fetch('http://localhost:4400/deletetodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer " + token
        },
        body: JSON.stringify({
          _id: deleteId
        })
      })
      console.log('response in deletetodo: ', response)

      const data = await response.json();
      console.log('data in  deletetodo: ', data)
      setTodos(data.todos)
      
    } catch (error) {
      console.log('error in deletetodo: ', error)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setTodos([])
    setUser({})
    navigate('/')
  }

  useEffect(() => {
    console.log('token in state is: ', token)
    console.log('todos after addtodo: ', todos)
    console.log('user: ', user)
  }, [token, todos,user])

  // lets fix Login component, it should have correct value and onchange. lets figure out 
  // if app does not have jwt token, or a boolean isLoggedIn then we start at login screen with 
  //button to register screen. figure out how to login using jwt tokens and storen them on front end
  // watch react router 6

  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Login values={values} errors={errors} handleChange={handleChange} handleUseFormSubmit={handleUseFormSubmit} loginError={loginError} login={login} setLogin={setLogin} handleLogin={handleLogin} />} />
      <Route path='register' element={<Register handleSubmit={handleSubmit} registration={registration} setRegistration={setRegistration} />} />
      <Route path='home' element={<Home deleteTodo={deleteTodo} user={user} token={token} handleSignOut={handleSignOut} todos={todos} setTodos={setTodos} addTodo={addTodo} />} />
    </Routes>
      {/* <Register handleSubmit={handleSubmit} registration={registration} setRegistration={setRegistration} /> */}
    </div>
  );
}

export default App;
