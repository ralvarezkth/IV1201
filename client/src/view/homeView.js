import { Link } from 'react-router-dom';

const HomeView = () => {

    return (
        <div className="App">
            <h1>Recruitment application</h1>

            <div>
                <Link to="/login">Login with existing account</Link><br>
                <Link to="/register">Create new account</Link>
            </div>

        </div>

        
            
        );
}
export default HomeView;
