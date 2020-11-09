import React from 'react'

function Share() {
    const copyLink = (e) => {
        navigator.clipboard.writeText(window.location.href);
        e.preventDefault();
    }

    return (
        <div>
            <button onClick={copyLink} className='btn btn-light'>Copy Link</button>
        </div>
    )
}
export default Share;
