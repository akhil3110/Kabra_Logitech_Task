import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/store";
import { formatPrice } from "../utils/price-format";
import toast from "react-hot-toast";
import { orderPlaced } from "../store/features/cartSlice";
import { redirect } from "react-router-dom";

const Bill = () => {

    const cart = useAppSelector(state =>state.cart.products);
    const dispatch = useAppDispatch();

    const totatPrice = () => {
        let total = 0;
        cart.map(product => {
            total += product.unitPrice * product.orderQuantity;
        })
        return total;
    }

    const CheckOut = async () => {
        try {
            await axios.post("http://localhost:4000/api/products/checkOut",{cart}).then(()=>{
                toast.success("Check Out Success")
                dispatch(orderPlaced())
            })

        } catch (error) {
            console.log("CHECK_OUT",error)
        }
    }
    return ( 
        <div className="mt-5">
            <div className="card">
                <div className="row g-0">
                    <div className="card-header">
                        <h3>Bill</h3>
                    </div>
                    <ul className="list-group list-group-flush fw-bolder">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            ProductName
                            <span>Quantity</span>
                            <span>Total Price</span>
                        </li>
                    </ul>
                    <ul className="list-group list-group-flush">
                        {cart.map((product) =>{
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {product.productName}
                                        <span>{product.unitPrice}</span>
                                        <span>{product.unitPrice * product.orderQuantity}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="list-group list-group-flush fw-bold">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Total
                            <span>{formatPrice(totatPrice())}</span>
                        </li>
                    </ul>
                </div>
                <div className="card-footer">
                    <button onClick={CheckOut} className="btn btn-success">Check Out</button>
                </div>
            </div>
        </div>
     );
}
 
export default Bill;