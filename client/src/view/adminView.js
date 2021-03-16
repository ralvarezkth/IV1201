import React, { useRef, useState } from 'react';

/**
 * Handles the admin view
 * @returns the admin view.
 */
const AdminView = ({setApplication, setStatus, updateApplication, state, props, lang}) => {

    return(
        <div className="App">
            <h1>{props.admintitle}</h1>

            {state != null && state.success != null &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg instanceof Array ? state.msg.filter(msg => msg.langId == lang).map(msg => msg.msg) : state.msg}
                </div>
            }

            <form onSubmit={(e)=> { updateApplication(e)}}>
                <div className="form-group">
                    {state && state.applications && state.applicationId &&
                        <div>
                            <p>{props.adminavailability}</p>
                            {state.appData.availability.map((avail, i) => {
                                return <p key={i}>{avail.from} - {avail.to}</p>
                            })}
                            {state.appData.competence.map((comp, i) => {
                                return <p key={i}>{comp.competence[lang - 1].name}: {comp.duration} {props.admintimemetric}</p>
                            })}
                            <p>Status: {state.appData.status.filter(stat => stat.langId == lang).map(stat => <span key={stat.langId}>{stat.name}</span>)}</p>
                        </div>
                    }
                    {state && state.applications &&
                        <select id="application" name="application" defaultValue={0} onChange={ev => {setApplication(ev)}}>
                        <option key={0} disabled value={0}>{props.adminchooseapp}</option>
                            {state.applications instanceof Array && 
                            state.applications.map(app => <option key={app.id} value={app.id}>{app.id}</option>)}
                        </select>
                    }
                    

                </div>
                <div className="form-group">
                    {state !== null && state.applicationId &&
                    <select id="status" name="status" defaultValue={0} onChange={ev => {setStatus(ev)}}>
                        <option key={0} disabled value={0}>{props.adminchoosestatus}</option>
                        {state.status[lang - 1].map(stat => <option key={stat.id} value={stat.id} value={stat.id}>{stat.name}</option>)}
                    </select>}
                </div>
                <div className="form-group">
                    <button type="submit" id="send">{props.adminbutton}</button>
                </div>
            </form>             
        </div>
    )
}
export default AdminView;
