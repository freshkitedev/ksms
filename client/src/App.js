import logo from './logo.svg';
import { BrowserRouter , Routes, Route, Switch } from "react-router-dom";
import './App.css';
import PayFees from './component/payFees';
import Home from './component/home';
import Header from './component/header';
import { Link } from "react-router-dom";
import Reports from './component/reports';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
     
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="payFees" element={<PayFees />} />
          <Route path="reports" element={<Reports />} />
      </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
