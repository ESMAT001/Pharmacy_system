import React from 'react'

function SubmitBtn(props) {
    return (
        <>
            <input type="submit" className={props.style} value={props.value}/>
        </>
    )
}

export default SubmitBtn
