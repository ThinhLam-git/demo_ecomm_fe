import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AddProduct from './AddProduct';
import Register from './Register';
import Login from './Login';
import UpdateProduct from './UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/update-product/' element={<UpdateProduct/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
