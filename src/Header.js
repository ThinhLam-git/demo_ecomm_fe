import { Nav, Navbar } from "react-bootstrap";
import {Link} from "react-router-dom";
function Header (){
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Ecomm Dashboard</Navbar.Brand>
                <Nav className="mr-auto nav-wrapper">
                    <Link to="/add-product" className="nav-link">Add Product</Link>
                    <Link to="/update-product" className="nav-link">Update Product</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;