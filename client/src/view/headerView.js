import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const HeaderView = (props) => {
    const [hasLang, setHasLang] = useState(false);
    const [lang, setLang] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/content').then(res => {
            res.json().then(data => {
                setLang(data);
                setHasLang(true);
            });
            
        }).catch(err => {
            setError(err.error);
        });
    }, [hasLang]);
 
    return (
        <div className="Header">
            <Link to="/">{props.content.menuhome}   </Link>
            <Link to="/register">{props.content.menuregister}   </Link>
            <Link to="/login">{props.content.menulogin}   </Link>
            <Link to="/apply">{props.content.menuapply}   </Link>
            <label htmlFor="lang">Language</label>
            <select id="lang" name="lang" onChange={(ev) => props.setLang(ev.target.value)}>
                {hasLang &&
                    lang.map(lang => <option value={lang.id} key={lang.id}>{lang.lang}</option>)}
            </select>
            {error &&
                <span class={error ? 'bg-red' : ''}>{error}</span>
            }
        </div>
    );
}
export default HeaderView;