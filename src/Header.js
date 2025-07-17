import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Header() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    let navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    function handleNavBarLogout() {
        if (user) {
            return (
                <Nav className="nav-wrapper">
                    <NavDropdown title={user && user.name} id="basic-nav-dropdown" className="nav-dropdown">
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" className="nav_header">Ecomm Dashboard</Navbar.Brand>
                <Nav className="me-auto nav-wrapper">
                    {
                        localStorage.getItem("user-info") ?
                            <>
                                <Link to="/" className="nav-link">Product List</Link>
                                <Link to="/add-product" className="nav-link">Add Product</Link>
                                <Link to="/update-product" className="nav-link">Update Product</Link>
                            </>
                            :
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </>
                    }
                </Nav>

                localStorage.getItem(user-info) ?
                {handleNavBarLogout()}
            </Navbar>
        </div>
    )
}

export default Header;