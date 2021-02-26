import { Link } from 'react-router-dom';

const HomeView = () => {

    return (
        <div className="App">
            <h1>Welcome to the recruitment application!</h1>
            <br/>
            <br/>
            <br/>
            <div>
                <Link to="/login">Login with existing account</Link><br/><br/>
                <Link to="/register">Create new account</Link><br/><br/>
                <Link to="/apply">Apply for a position</Link>
            </div>

        </div>

        
            
        );
}
export default HomeView;
