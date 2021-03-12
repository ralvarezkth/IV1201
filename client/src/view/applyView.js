import React, { useRef, useState } from 'react';

/**
 * Handles the apply view
 * @returns the apply view.
 */
const ApplyView = ({handleApplicationSubmit, state, props}) => {
    const [competence, setCompetence] = useState('');
    const [duration, setDuration] = useState('');
    const [availability, setAvailability] = useState('');

    return(
        <div className="App">
            <h1>{props.applytitle}</h1>
            {state && state.success != null && state.msg &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }
            {state && state.success != null && (
                <div>
                    <h3>Fill out and submit this form to apply</h3>
                    
                    <form onSubmit={(e)=> {
                        let newApplication = {
                            competence: competence,
                            duration: duration,
                            availability: availability   
                        };
                        handleApplicationSubmit(e, newApplication)

                        }} id="apply">
                        <div>
                            <input type="text" onChange={(event)=>setCompetence(event.target.value)} id="competence" placeholder="Competence" required/>
                        </div>
                        <div>
                            <input type="text" onChange={(event)=>setDuration(event.target.value)} id="duration" placeholder="Duration" required/>
                        </div>
                        <div>
                            <input type="text" onChange={(event)=>setAvailability(event.target.value)} id="availability" placeholder="Availability" required/>
                        </div>
                        <div>
                            <button type="submit" id="send">{props.registerbutton}</button>
                        </div>
                    </form>
                </div>
                )
            }


             
        </div>
    )
}
export default ApplyView;
