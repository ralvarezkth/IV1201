import { Link } from 'react-router-dom';

const HeaderView = () => {

    return (
        <div className="Header">
            <Link to="/">Home   </Link>
            <Link to="/register">Register   </Link>
            <Link to="/login">Login   </Link>
            <Link to="/apply">Apply   </Link>
        </div>
    );
}
export default HeaderView;
