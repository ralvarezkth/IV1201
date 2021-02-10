import React, { useRef, useState } from 'react';

const RegisterView = ({setUser, handleRegistrationSubmit}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    //const [ssn, setSsn] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="App">
            <h1>Registration</h1>
            <form onSubmit={(e)=> {
                setUser({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    dob:dob,
                    //ssn:ssn,
                    username: username,
                    password: password
                }, () => {
                        handleRegistrationSubmit(e)
                });

            }} id="registration">
                <div>
                    <input type="text" onChange={(event)=>setFirstName(event.target.value)} id="firstName" placeholder="First name" required/>
                </div>
                <div>
                    <input type="text" onChange={(event)=>setLastName(event.target.value)} id="lastName" placeholder="Last name" required/>
                </div>
                <div>
                    <input type="email" onChange={(event)=>setEmail(event.target.value)} id="email" placeholder="Email address" required/>
                </div>

                <div>
                    <input type="date" onChange={(event)=>setDob(event.target.value)} id="dateOfBirth" placeholder="Date of birth" required/>
                </div>
                <div>
                    <input type="text" onChange={(event)=>setUsername(event.target.value)} id="username" placeholder="Username" required/>
                </div>
                <div>
                    <input type="password" onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder="Password" required/>
                </div>
                <div>
                    <button type="submit" id="send">Submit Registration</button>
                </div>
            </form>
        </div>
        );
}
export default RegisterView;
