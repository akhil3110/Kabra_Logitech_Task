import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () =>{
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-white" to="/">Kabra Logitech </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
              <li className="nav-item ">
                <Link className="nav-link " aria-current="page" to="/">Listing Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/addProducts">Add Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/checkOut"><ShoppingCart size={20}/> Cart</Link>
              </li>
            </ul>
            </div>
        </div>
      </nav>
    )
}


export default Navbar