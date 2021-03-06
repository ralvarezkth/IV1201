import {useState, useEffect} from 'react';

const FooterView = (props) => { 
    return (
        <div className="footer">
            {props.content.footercontent}
        </div>
    );
}
export default FooterView;