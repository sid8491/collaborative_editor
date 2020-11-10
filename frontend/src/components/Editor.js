import React, { useState, useEffect } from 'react';
import SelectLanguage from './SelectLanguage';
import Share from './Share';
import DownloadCode from './DownloadCode';
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
let userName;

function Editor() {
    const [value, setValue] = useState('')
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        console.log('page loaded');
        userName = getUsername();
        console.log(`my username is ${userName}`);
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

            if (data.event === 'chat_joined') {
                console.log(data.name + ' joined');
            }

            if (data.event === 'value_update') {
                // console.log(data.name + ' ' + data.value);
                if (userName !== data.name) {
                    console.log('updating value');
                    setValue(data.value);
                    setLanguage(data.language);
                }
            }
        };
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value) {
                socket.send(JSON.stringify({
                    'name': userName,
                    'event': 'value_update',
                    'value': value,
                    'language': language
                }));
            }
        }, 1000)
        return () => clearTimeout(timeout)
    }, [value]);

    const handleChange = (editor, data, value) => {
        setValue(value)
    }

    const selectLanguageChange = (language_value) => {
        setLanguage(language_value);
        socket.send(JSON.stringify({
            'name': userName,
            'event': 'value_update',
            'value': value,
            'language': language_value
        }));
    }

    const fileExtensionMapping = {
        'python': 'py',
        'xml': 'html',
        'css': 'css',
        'javascript': 'js',
        'markdown': '.md'
    }

    const downloadTxtFile = () => {
        const curTime = new Date().toTimeString().slice(0,9).replace(/:/g, '').trim();
        alert(curTime);
        const element = document.createElement("a");
        const file = new Blob(
            [value],
            {type: 'text/plain; charset=utf-8'}
        );
        element.href = URL.createObjectURL(file);
        element.download = `editor-${curTime}.${fileExtensionMapping[language]}`;
        document.body.appendChild(element);
        element.click();
    }


    return (
        <div>
            <div className="editor-container"> 
                <div className="pane container-fluid">
                    <div class="row">
                        <div class="col-sm">
                            <SelectLanguage onChange={selectLanguageChange} />
                        </div>
                        <div class="col-sm">
                            <Share />
                        </div>
                        <div class="col-sm">
                            <DownloadCode onClick={downloadTxtFile} />
                        </div>
                    </div>
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
