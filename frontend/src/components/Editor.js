import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/markdown/markdown';
import { Controlled as ControlledEditor } from 'react-codemirror2';

let socket;

function Editor() {
    const [value, setValue] = useState('')
    const language = "css"

    useEffect(() => {
        console.log('page loaded');
        const userName = getUsername();
        console.log(userName);
        console.log(window.location.pathname);
        const websocketUrl = `ws://127.0.0.1:8000/ws${window.location.pathname}/`;
        socket = new W3CWebSocket(websocketUrl);

        socket.onopen = () => {
            console.log('WebSocket Client Connected');
            socket.send(JSON.stringify({
                'name': userName,
                'event': 'chat_joined'
            }));

            socket.onclose = () => {
                console.log('WebSocket Closed!');
                socket.send(JSON.stringify({
                    'name': userName,
                    'event': 'chat_left'
                }));
            };
        };

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);

            if (data.event === 'chat_joined') {
                console.log(data.name + ' joined');
            }

            if (data.event === 'value_update') {
                console.log(data.name + ' ' + data.value);
                if (userName !== data.name) {
                    setValue(data.value);
                }
            }
        };

    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(value);
        }, 500)

        return () => clearTimeout(timeout)
    }, [value]);

    const handleChange = (editor, data, value) => {
        setValue(value)
    }
    return (
        <div>
            <div className="editor-container">
                <div className="pane">
                    Language
                </div>
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={value}
                    className="code-mirror-wrapper"
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: language,
                        theme: 'material',
                        lineNumbers: true,
                    }}
                />
            </div>
        </div>
    )
}


function getUsername() {
    var length = 8;
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export default Editor;
