import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./Home";
import Restaurant from "./Order/Restaurant";
import Customer from "./Order/Customer";
import Delivery from "./Order/Delivery";

function App() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/"         element={<Home/>}/>
            <Route path="/customer"         element={<Customer/>}/>
            <Route path="/delivery"         element={<Delivery/>}/>
            <Route path="/restaurant"         element={<Restaurant/>}/>
          </Routes>
        </div>
      </HashRouter>
  );
}

export default App;
