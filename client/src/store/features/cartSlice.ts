import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Cart{
    id: string;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
    orderQuantity: number;
}

interface CartState{
    products: Cart[];
}

const initialState: CartState = {
    products: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<{
            id: string;
            productName: string;
            productImage: string;
            description: string;
            quantity: number;
            unitPrice: number;
            orderQuantity: number;
        }>) => {
            if(state.products.find(item => item.id === action.payload.id)){
                state.products.map(item => {
                    if(item.id === action.payload.id){
                        item.orderQuantity += 1;
                    }
                })   
            }  else{
                state.products.push(action.payload);
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(item => item.id === action.payload);
            state.products.splice(index, 1);
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            state.products.map(item => {
                if(item.id === action.payload){
                    item.orderQuantity += 1;
                }
            })
        },
        decerementItem: (state, action: PayloadAction<string>) => {
            state.products.map(item => {
                if(item.id === action.payload){
                    item.orderQuantity -= 1;
                }
            })
        },
        orderPlaced: (state) => {
            state.products = [];
        }
    }
})

export default CartSlice.reducer;
export const { addProduct, deleteProduct, incrementItem, decerementItem,orderPlaced } = CartSlice.actions;