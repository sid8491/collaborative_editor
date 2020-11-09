import React from 'react'

function Share() {
    const copyLink = (e) => {
        navigator.clipboard.writeText(window.location.href);
        e.preventDefault();
    }

    return (
        <div>
            <button onClick={copyLink}>Copy Link</button>

            <div class="toast" role="alert" aria-live="polite" aria-atomic="true" data-delay="10000">
                <div role="alert" aria-live="assertive" aria-atomic="true">...</div>
            </div>
        </div>
    )
}
export default Share;
