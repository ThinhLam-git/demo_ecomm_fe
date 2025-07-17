import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import Register from './Register';
import Login from './Login';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Cpm={ProductList} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<Protected Cpm={AddProduct} />} />
          <Route path='/update-product/:id' element={<Protected Cpm={UpdateProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
