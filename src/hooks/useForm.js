import React from 'react'
import { useState } from 'react';
import {omit} from 'lodash';
import { useEffect } from 'react';

const useForm = (callback) => {

 

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({
        // emailPeriod: 'email must include a period.',
        // emailAtSign: 'email must include @ sign.'
    });

    useEffect(() => {
        console.log('values in useForm: ', values)
    }, [values])

    const validate = (event, name, value) => {

       
        switch(name) {
            case 'email': 
                // let atSymbol = value.indexOf('@');
                let periodSymbol = value.indexOf('.');
              
                if (periodSymbol !== -1) {
                    console.log('period')
                  
                    setErrors({})
                } else  {
                    // omit function removes/omits the value from given obj and returns
                    //new obj 
                    // let newObj = omit(errors, "email");
                    // setErrors(newObj)
                    setErrors({
                        ...errors,
                        emailPeriod: 'email must include a period.'
                        
                    })
                    

                }
                
                
            
                break;

            default: 
                break;
        }
    }

    const handleChange = (event) => {
        
        event.persist();
        console.log('event', event)
        let name = event.target.name;
        let val = event.target.value;
        console.log('name', name);
        console.log('val', val);

        validate(event,name,val);

        setValues({
            ...values,
            [name]: val
        })

        
    }

   

    const handleUseFormSubmit = (event) => {
        if(event) event.preventDefault();

        if(Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
            callback();
            setValues({})
        } else {
            alert('THERE IS AN ERROR')
        }
    }

    console.log('values after setting usefrm: ',values)

    return {
        handleUseFormSubmit,
        values,
        setValues,
        errors,
        handleChange,
    };
}

export default useForm
