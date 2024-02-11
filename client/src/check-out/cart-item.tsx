import { Trash } from "lucide-react";
import { formatPrice } from "../utils/price-format";
import { useAppDispatch } from "../store/store";
import { decerementItem, deleteProduct, incrementItem } from '../store/features/cartSlice';
import axios from "axios";
import toast from "react-hot-toast";


interface CartItemProps {
    id: string;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
    orderQuantity: number;
}

const CartItem = ({
    id,
    productName,
    productImage,
    description,
    quantity,
    unitPrice,
    orderQuantity
}: CartItemProps) => {

    const dispatch = useAppDispatch();

    const deleteItem = (id:string) => {
        dispatch(deleteProduct(id))
    }

    const IncreaseItem =async (id:string) => {
        try {
            const res = await axios.get("http://localhost:4000/api/products/getParticularProduct?id="+id);
            console.log("CHECH+OUT_INCREMENT",res.data);
            
            if(res.data.quantity <= orderQuantity){
                toast.error(`Only ${res.data.quantity} items are available in stock`);
                return;
            }
            dispatch(incrementItem(id))
        } catch (error) {
            console.log("CHECH+OUT_INCREMENT",error);
        }
    }

    const DecreaseItem = (id:string) => {
        if(orderQuantity <1){
            toast.error("Quantity can't be less than 1 \n Please remove the item from cart.");
            return;
        }
        dispatch(decerementItem(id))
    }

    return ( 
        <div className="card mb-3">
            <div className="row g-0 p-3">
                <div className="col-md-4">
                    <img src={`http://localhost:4000/images/${productImage}`} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{productName}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">{formatPrice(unitPrice)}</p>
                    </div>
                    <button onClick={() => DecreaseItem(id)} className="btn btn-sm btn-danger">-</button> 
                    <span className="mx-2">{orderQuantity}</span>  
                    <button onClick={() => IncreaseItem(id)} className="btn btn-sm btn-danger">+</button>
                    <button onClick={()=> deleteItem(id)} className="mx-2 btn btn-sm btn-danger"><Trash size={16} /></button>
                </div>
            </div>
         </div>
     );
}
 
export default CartItem;