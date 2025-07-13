import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AddProduct from './AddProduct';
import Register from './Register';
import Login from './Login';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<Protected Cpm={AddProduct}/>} />
          <Route path='/update-product/' element={<Protected Cpm={UpdateProduct}/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
