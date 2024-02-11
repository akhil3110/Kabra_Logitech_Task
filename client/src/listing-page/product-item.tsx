import toast from 'react-hot-toast';
import { addProduct } from '../store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import {formatPrice} from '../utils/price-format';


interface ProductItemProps {
    id: string;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
}



const ProductItem = ({
    id,
    productName,
    productImage,
    description,
    quantity,
    unitPrice
}: ProductItemProps) => {
   

    const dispatch = useAppDispatch();
    const cart = useAppSelector(state =>state.cart.products)

    const addCart = (product:ProductItemProps) => {


        let data = {
            ...product,
            orderQuantity: 1
        }

        if(cart.find(item => item.id === product.id)){
            toast.success("Item Already in Cart! \n Quantity Updated! \n Check Cart for Details!");
            cart.map(item => {
                if(item.id === product.id){
                    data = {
                        ...product,
                        orderQuantity: item.orderQuantity + 1
                    }
                   
                }
            })
        }else{
            toast.success("Item Added to Cart! \n Check Cart for Details!");
        }

        dispatch(addProduct(data));
    }
    return (
        <>
        {quantity>0 && (
            <>
                <div className='container my-3'>
                    <div className="card">
                        <img src={`http://localhost:4000/images/${productImage}`} className="card-img-top " alt="..." />
                        <div className="card-body text-white bg-dark rounded-4">
                            <h5 className="card-title">{productName}</h5>
                            <p className="card-text"> 
                                {description.length>88 ? description.slice(0, 40) : description}
                                {description.length>88 && '...'}
                            </p>
                            <p>price: {formatPrice(unitPrice)}</p>
                            <button 
                                className="btn btn-sm btn-primary rounded-4" 
                                onClick={() =>{
                                    addCart({id,productName,productImage,description,quantity,unitPrice});
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )}
        </>
     );
}
 
export default ProductItem;