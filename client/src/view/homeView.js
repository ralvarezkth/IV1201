import '../App.css';

const HomeView = (props) => {
    return (
        <div className="App">
            <h1>{props.hometitle}</h1>
            
            <div>
                 {props.homecontent}
            </div>

        </div>

        
            
        );
}
export default HomeView;