import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div className='container'>
            <div className="jumbotron bg-light text-dark text-center shadow ">
                <div className="container">
                    <h1 className="card-title h1">Collaborative Editor</h1>
                    <p className="lead">Editing files with friends have never been simpler than this. <br />
                    Just create a room and share the link with your friends. <br />
                    When your friends join your room you will be edit the files together.</p>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                <button type="button" className="btn btn-primary btn-lg font-weight-bold">
                    <Link to={{ pathname: `/editor/${getRoomId()}`, state: {userName: 'test_username'}}} className="text-light text-decoration-none">
                        CREATE YOUR ROOM
                    </Link>
                </button>
                </div>
            </div>
        </div>
    )
}

function getRoomId() {
    var length = 20;
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export default Home;