import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.quantity
        },
        removeProduct : (state,action)=>{
            state.products = state.products.filter(product=>product._id!==action.payload);
            state.quantity -=1;
            state.total = state.products.reduce((acc,product)=> acc+product.price*product.quantity,0)
        }
    }
})

export const {addProduct,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;

