import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./product-item";


type productsType ={
    _id: string;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

const ListingPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setProducts(response.data) ;
            } catch (error) {
                console.log("LISTING_PAGE",error);
            }
            
        }
        getProducts();

    }, [setProducts]);
    return ( 
        <>
            <h1>Listing Page</h1>
            <div className="container">
                <div className="row">
                    {products.map((product:productsType) => {
                        return (
                            <div key={product._id} className="col-md-4 col-sm-6 h-25">
                                <ProductItem 
                                    id={product._id}
                                    productName={product.productName}
                                    productImage={product.productImage}
                                    description={product.description}
                                    quantity={product.quantity}
                                    unitPrice={product.unitPrice}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
     );
}
 
export default ListingPage;