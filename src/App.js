import './App.css';
import Board from "./components/Board";
import store from "./redux/store";
import {Provider} from "react-redux";


function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <Board/>
            </div>
        </Provider>
    );
}

export default App;
