import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({registration, setRegistration, handleSubmit}) => {
    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>
                    First Name
                </label>
                <input 
                    value={registration.firstName}
                    onChange={(e) => setRegistration({...registration, firstName: e.target.value})}
                    placeholder='First Name'
                    name='firstName'
                    id='firstName'
                    type='text'
                    required
                />
                <label htmlFor='lastName'>
                    Last Name
                </label>
                <input 
                    value={registration.lastName}
                    onChange={(e) => setRegistration({...registration, lastName: e.target.value})}
                    placeholder='Last Name'
                    name='lastName'
                    id='lastName'
                    type='text'
                    required
                />
                <label htmlFor='email'>
                    Email
                </label>
                <input 
                    value={registration.email}
                    onChange={(e) => setRegistration({...registration, email: e.target.value})}
                    placeholder='Email'
                    name='email'
                    id='email'
                    type='email'
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    value={registration.password}
                    onChange={(e) => setRegistration({...registration, password: e.target.value})}
                    placeholder='Password'
                    name='password'
                    id='password'
                    type='password'
                    required
                />
                <button type='submit'>Submit</button>
            </form>
            <h3>Have an account? <Link to='/'>Login</Link></h3>
        </div>
    )
}

export default Register
