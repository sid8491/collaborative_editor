import React from 'react'

function SelectLanguage(props) {
    return (
        <div>
            <select onChange={(event) => props.onChange(event.target.value)} className='btn btn-light'>
                <option value="javascript"> Javascript </option>
                <option value="python"> Python </option>
                <option value="xml"> HTML </option>
                <option value="css"> CSS </option>
                <option value="markdown"> Markdown </option>
            </select>
        </div>
    )
}

export default SelectLanguage
