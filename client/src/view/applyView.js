import React, { useRef, useState } from 'react';

/**
 * Handles the apply view
 * @returns the apply view.
 */
const ApplyView = ({handleAccess, state, props}) => {

    return(
        <div className="App">
            <h1>{props.applytitle}</h1>

            <form onSubmit={(e)=> { handleAccess(e)}}>
                <button type="submit" id="send">{props.applybutton}</button>
            </form>
            
            {state != null && state.msg &&
                <div className={state.success ? 'bg-green' : 'bg-red'}>
                    {state.msg}
                </div>
            }


             
        </div>
    )
}
export default ApplyView;
