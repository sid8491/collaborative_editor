import React from 'react'

function SelectLanguage(props) {
    return (
        <div>
            <select onChange={(event) => props.onChange(event.target.value)} className='btn btn-light'>
                <option value="javascript" selected={"javascript" === props.defaultValue ? true : false}> Javascript </option>
                <option value="python" selected={"python" === props.defaultValue ? true : false}> Python </option>
                <option value="xml" selected={"xml" === props.defaultValue ? true : false}> HTML </option>
                <option value="css" selected={"css" === props.defaultValue ? true : false}> CSS </option>
                <option value="markdown" selected={"markdown" === props.defaultValue ? true : false}> Markdown </option>
            </select>
        </div>
    )
}

export default SelectLanguage
