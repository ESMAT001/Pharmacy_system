import React from 'react'

function FormInput(props) {
    const userInput=(e)=>{
        props.handler(e.target.value)
    }
    return (
        <>
            <input type={props.type} value={props.default} placeholder={props.placeHolder}  className={props.style} onChange={userInput} required/>
        </>
    )
}

export default FormInput
