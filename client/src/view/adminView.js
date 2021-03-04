import React, { useRef, useState } from 'react';

/**
 * Handles the apply view
 * @returns the apply view.
 */
const ApplyView = ({setApplication, setStatus, updateApplication, state, props}) => {

    return(
        <div className="App">
            <h1>{props.admintitle}</h1>

            {state != null && state.success != null &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }

            <form onSubmit={(e)=> { updateApplication(e)}}>
                <div className="form-group">
                    {state && state.applications &&
                        <select id="application" name="application" defaultValue={0} onChange={ev => {setApplication(ev)}}>
                        <option key={0} disabled value={0}>choose application</option>
                            {state.applications.map(app => <option key={app.id} value={app.id}>{app.id}</option>)}
                        </select>
                    }
                    

                </div>
                <div className="form-group">
                    {state !== null && state.applicationId &&
                    <select id="status" name="status" defaultValue={0} onChange={ev => {setStatus(ev)}}>
                        <option key={0} disabled value={0}>choose status</option>
                        {state.status.map(stat => <option key={stat.id} value={stat.id} value={stat.id}>{stat.name}</option>)}
                    </select>}
                </div>
                <div className="form-group">
                    <button type="submit" id="send">{props.adminbutton}</button>
                </div>
            </form>             
        </div>
    )
}
export default ApplyView;
