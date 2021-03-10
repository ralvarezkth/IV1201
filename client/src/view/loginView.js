import React, { useRef, useState } from 'react';

/**
 * Handles the view, for the login page
 * @param handleLogin is a parent
 * function for handling the submit event
 * @returns the View for the registration page
 */
const LoginView = ({handleLogin, state, props}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className="App">
            <h1>{props.logintitle}</h1>
            {
                state != null && state.success != null &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }
            {
                state != null && state.msg.includes("Access denied") &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }
            <form onSubmit={(e)=> {
                    let loginRequest = {
                        username: username,
                        password: password
                    };
                    handleLogin(e, loginRequest)
                }}>
                <div>
                    <input type="text" onChange={(event)=>setUsername(event.target.value)} id="username" placeholder="Username" required/>
                </div>
                <div>
                    <input type="password" onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder="Password" required/>
                </div>
                <div>
                    <button type="submit" id="send">{props.loginbutton}</button>
                </div>
            </form>
            
        </div>
    )
}
export default LoginView;
