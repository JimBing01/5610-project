import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./Home";

function App() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/"         element={<Home/>}/>
          </Routes>
        </div>
      </HashRouter>
  );
}

export default App;
