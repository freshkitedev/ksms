import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import PayFees from './component/payFees';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
     
      <Routes>
          <Route path="/" element={<PayFees />} />
      </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
