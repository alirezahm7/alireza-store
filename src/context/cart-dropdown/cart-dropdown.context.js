import {createContext} from 'react';


const CartdropContext = createContext({
    hidden:true,
    toggleCart:()=>{}
})

export default CartdropContext;