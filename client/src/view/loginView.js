import React, { useRef, useState } from 'react';

const LoginView = ({handleLogin,}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div>
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
                    <button type="submit" id="send">Log in</button>
                </div>
            </form>
        </div>
    )
}
export default LoginView;
