import { useAppSelector } from "../store/store";
import { formatPrice } from "../utils/price-format";

const OrderList = () => {

    const cart = useAppSelector(state =>state.cart.products)

    const totatPrice = () => {
        let total = 0;
        cart.map(product => {
            total += product.unitPrice * product.orderQuantity;
        })
        return total;
    }

    return ( 
        <div>
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
     );
}
 
export default OrderList;