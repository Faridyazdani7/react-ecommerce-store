import { createContext, useContext, useEffect, useState, } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { IProducts } from "../types/server";




type ProductItem = IProducts

interface ShoppingCartProvider {
    children: React.ReactNode;
}
interface CartItem {
    id: number;
    qty: number;
}

interface ShoppingCartContext {
    cartItems: CartItem[];
    handleIncreaseProductQty: (id: number) => void;
    handleDecreaseProductQtr: (id: number) => void;
    getProductQty: (id: number) => number;
    handleRemoveProduct: (id: number) => void;
    cartQty: number;
    isLogin: boolean;
    handleLogin: (username: string, password: string) => void;
    handleLogOut: () => void;
    finalPrice: ({ price, discount }: IProducts) => number;
    totalPrice: (product: ProductItem) => number;
    finalTotalPrice:(products:ProductItem[])=>number;
    finalTotalDiscount:(products:ProductItem[])=>number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext)

// ایجاد کاستوم هوک برای بهینه سازی استفاده در کامپوننت ها
export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }: ShoppingCartProvider) {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cartItems", [])
     //مدیریت تعداد محصولات 
    const handleIncreaseProductQty = (id: number) => {
        setCartItems((currentItems) => {
            let selecteditem = currentItems.find((item) => item.id == id)
            if (selecteditem == null) {
                return [...currentItems, { id: id, qty: 1 }];
            }
            else {
                return currentItems.map((item) => {
                    if (item.id == id) {
                        return { ...item, qty: item.qty + 1 }
                    }
                    else {
                        return item
                    }
                })

            }
        })
    }

    const handleDecreaseProductQtr = (id: number) => {
        setCartItems((currentItems) => {
            let selectedItem = currentItems.find((item) => item.id == id)
            if (selectedItem?.qty === 1) {
                return currentItems.filter((item) => item.id !== id)
            }
            else {
                return currentItems.map((item) => {
                    if (item.id == id) {
                        return { ...item, qty: item.qty - 1 }
                    }
                    else {
                        return item
                    }
                })

            }
        })
    }
     //دریافت تعداد یک محصول خاص با ایدی خاصش
    const getProductQty = (id: number) => {
        return cartItems.find(item => item.id == id)?.qty || 0
    }
     
    const handleRemoveProduct = (id: number) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== id))
    }

    const cartQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0)

    const [isLogin, setIsLogin] = useState(false)

    const navigate = useNavigate()

    const handleLogin = (username: string, password: string) => {
        login(username, password).finally(() => {
            //چون ای پی ای رو از بک اند نمیگیریم به جای دن از فاینالی استفاده میکنیم

            let token = "N2IxYjUzMzQtMDkwYi00ODE0LWIzZWQtOWI4YWRkMDlkOGI4OjY0YWNmYTc4LWJmMzEtNDQ1Zi04NDI3LTgzOGJiYjEyMWRkMg=="

            localStorage.setItem("token", token)

            setIsLogin(true)

            navigate("/")
        })

    }

    const handleLogOut = () => {
        setIsLogin(false)
        navigate("/login")
        localStorage.removeItem("token")
    }


    useEffect(() => {
        let token = localStorage.getItem("token")

        if (token) {
            setIsLogin(true)
        }
    }, [])

    const finalPrice = ({ price, discount }: ProductItem): number => {
        const result = discount ? (price - (price * discount) / 100) : price
        return Number(result.toFixed(2));
    }

    const totalPrice = (product: ProductItem): number => {
        const qty = getProductQty(Number(product.id));
        const total = finalPrice(product) * qty;
        return Number(total.toFixed(2));
    }



   const finalTotalPrice = (products: ProductItem[]): number => {
    let total = 0;

    products.forEach((product) => {
        const qty = getProductQty(Number(product.id));
        if (qty > 0) {
            total += finalPrice(product) * qty;
        }
    });

    return Number(total.toFixed(2));
};

    


const finalTotalDiscount = (products: ProductItem[]): number => {
    let discount = 0;
    products.forEach((product) => {
        const qty = getProductQty(Number(product.id));
        if (product.discount && qty > 0) {
            const before = product.price * qty;
            const after = finalPrice(product) * qty;
            discount += before - after;
        }
    });
    return Number(discount.toFixed(2));
};

return (
    <ShoppingCartContext.Provider value={
        {
            cartItems, handleIncreaseProductQty
            , handleDecreaseProductQtr, getProductQty,
            handleRemoveProduct, cartQty, isLogin,
            handleLogin, handleLogOut, finalPrice, totalPrice,
            finalTotalPrice,finalTotalDiscount
        }}>
        {children}
    </ShoppingCartContext.Provider>
)
}