import React from 'react'

// That looks into props and assigns the content of props.input into
// a variable called input and then the same thing with label and meta
// then we can do 2 level destructuring with meta
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                {...input} 
                style = {{
                    marginBottom: '.3rem'
                }}
            />
            <div 
                className = 'red-text' 
                style = {{
                    marginBottom: '1.2rem'
                }}
            >
                {touched && error}
            </div>
        </div>
    )
}