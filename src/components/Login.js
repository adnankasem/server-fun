import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm';

const Login = ({login, setLogin, handleLogin, loginError, values, errors,handleChange,handleUseFormSubmit}) => {
    // const {values,errors,handleChange, handleUseFormSubmit} = useForm(handleLogin);

    useEffect(() =>{
        console.log('values LOGIN: ', values)
    })
    
    return (
        <div>
            <h1>Login Page</h1>
            <div className='form'>
                <label htmlFor='email'>
                    Email
                </label>
                <input 
                    onChange={handleChange}
                    placeholder='Email'
                    name='email'
                    id='email'
                    type='email'
                    required
                />
                {errors.emailPeriod && <p>{errors.emailPeriod}</p>}
                {errors.emailAtSign && <p>{errors.emailAtSign}</p>}
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {handleUseFormSubmit(e)}
                    }}
                    placeholder='Password'
                    name='password'
                    id='password'
                    type='password'
                    required
                />
                <button type='submit'>Submit</button>
            </div>
           
            <h3>Need an account? <Link to='register'>Register</Link></h3>
            {/* {loginError.includeZ && <p>{loginError.includeZ}</p>}
            {loginError.passLength && <p>{loginError.passLength}</p>} */}

        </div>
    )
}

export default Login
