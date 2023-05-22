import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import PayFees from './component/payFees';
import Home from './component/home';
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
