import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import CartItem from "./cart-item";
import OrderList from "./order-list";
import { Link } from "react-router-dom";

const CheckOut = () => {
    
    const cart = useAppSelector(state =>state.cart.products)


    return ( 
        <div className="mt-2">
            <h1>Check Out</h1>
            <div className="row">
                <div className="col-md-8">
                    {cart.map((product) =>{
                        return (
                        <CartItem 
                            key={product.productImage}
                            id={product.id}
                            productName={product.productName}
                            productImage={product.productImage}
                            description={product.description}
                            quantity={product.quantity}
                            unitPrice={product.unitPrice}
                            orderQuantity={product.orderQuantity}
                        />)
                    })}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Order Summary</h3>
                        </div>
                        <div>
                            <OrderList />
                        </div>
                        <div className="card-footer">
                            <Link to="/bill">
                                <button className="btn btn-success">Proceed to Bill</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CheckOut;