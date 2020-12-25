import react ,{useState ,useContext ,useEffect, createContext} from 'react';

import { addItemToCart ,removeItemFromCart,filterCartItem ,getCartItemCount ,getTotalItem} from './cart.utils';


export const CartdropContext = createContext({
    hidden:true,
    toggleCart:()=>{},
    cartItems:[],
    addItem:()=>{},
    removeItem:()=>{},
    clearItemFromCart:()=>{},
    itemCount:0,
    totalItem:0

})

const CartProvider=({children})=>{
    const [hidden, setHidden] = useState(true);
    const toggleHidden =()=> setHidden(!hidden);
    const [cartItems ,setCartItems] =useState([]);
    const [itemCount ,setItemCount] =useState(0);
    const [totalItem ,setTotalItem] =useState(0);
    const addItem = item =>setCartItems(addItemToCart(cartItems ,item));
    const removeItem = item =>setCartItems(removeItemFromCart(cartItems ,item));
    const clearItemFromCart =item =>setCartItems(filterCartItem(cartItems ,item));

    useEffect(()=>{
        setItemCount(getCartItemCount(cartItems));
        setTotalItem(getTotalItem(cartItems))
    },[cartItems])


    return(<CartdropContext.Provider value={{
        hidden,
        toggleHidden,
        cartItems,
        itemCount,
        addItem,
        removeItem,
        clearItemFromCart,
        totalItem
    }}>
    {children}
    </CartdropContext.Provider>)
}

export default CartProvider;