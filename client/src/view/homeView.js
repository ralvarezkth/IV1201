import { Link } from 'react-router-dom';

const HomeView = () => {

    return (
        <div className="App">
            <h1>Recruitment application</h1>

            <div>
                <Link to="/register">Register new applicant</Link>
            </div>

        </div>

        
            
        );
}
export default HomeView;
