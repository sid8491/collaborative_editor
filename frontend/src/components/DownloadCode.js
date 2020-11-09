import React from 'react'

function DownloadCode(props) {
    return (
        <div>
            <button onClick={props.onClick} className='btn btn-light'>Download</button>
        </div>
    )
}

export default DownloadCode;
