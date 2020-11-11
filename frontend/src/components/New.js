import { React, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function New() {
    const history = useHistory();
    const forwardToEditor = () => {
        history.push(`/editor/${getRoomId()}/`);
    }

    useEffect(() => {
        forwardToEditor();
    }, [])
    
    return (
        <div>
        </div>
    )

    function getRoomId() {
        var length = 20;
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
}

export default New
