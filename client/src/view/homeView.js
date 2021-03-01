import { Link } from 'react-router-dom';

const HomeView = (props) => {
    return (
        <div className="App">
            <br/><br/><br/><br/>
            <h1>{props.hometitle}</h1>
            
            <div>
                 {props.homecontent}
            </div>
            <br/><br/>

        </div>

        
            
        );
}
export default HomeView;