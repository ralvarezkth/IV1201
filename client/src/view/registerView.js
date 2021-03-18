import React, { useState } from "react";

/**
 * Handles the view, for the registration page
 * @param handleRegistrationSubmit is a parent
 * function for handling the submit event
 * @returns the View for the registration page
 */
const RegisterView = ({ handleRegistrationSubmit, state, content }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState(""); // social security number
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    return (
        <div className="App">
            <h1>{content.registertitle}</h1>
            {state != null && state.success != null &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }
            <form onSubmit={(e)=> {
                let newUser = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    ssn: ssn,
                    username: username,
                    password: password
                };
                handleRegistrationSubmit(e, newUser)

            }} id="registration">
                <div>
                    <input type="text" onChange={(event)=>setFirstName(event.target.value)} id="firstName" placeholder={content.registerfirstname} required/>
                </div>
                <div>
                    <input type="text" onChange={(event)=>setLastName(event.target.value)} id="lastName" placeholder={content.registerlastname} required/>
                </div>
                <div>
                    <input type="email" onChange={(event)=>setEmail(event.target.value)} id="email" placeholder={content.registeremail} required/>
                </div>

                <div>
                    <input type="numbers" onChange={(event)=>setSsn(event.target.value)} id="socialSecurityNumber" placeholder="YYMMDD-XXXX"
                           pattern="[0-9]{2}[0-1]((?<=0)[1-9]|(?<=1)[0-2])((?<!02)[0-3]|(?<=02)[0-2])((?<=[0-2])[0-9]|(?<=(013|033|053|073|083|103|123))[0-1]|(?<!(013|033|053|073|083|103|123))0)-[0-9]{4}"
                           title="Social security number" required/>
                </div>
                <div>
                    <input type="text" onChange={(event)=>setUsername(event.target.value)} id="username" placeholder={content.registerusername} required/>
                </div>
                <div>
                    <input type="password" onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder={content.registerpassword} required/>
                </div>
                <div>
                    <button type="submit" id="send">{content.registerbutton}</button>
                </div>
            </form>
    </div>
  );
};
export default RegisterView;
