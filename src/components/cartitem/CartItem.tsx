import { useEffect, useState } from "react";
import Button from "../button/Button"
import { getProduct } from "../../services/api";
import type { IProducts } from "../../types/server";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";

// تعریف اینترفیس برای آیتم‌های سبد خرید
interface ICartItem {
    id: number;
    qty: number
}


function CartItem({ id, qty }: ICartItem) {
     
    // state برای نگهداری اطلاعات محصول
    const [product, setProduct] = useState<IProducts>()
    const { handleIncreaseProductQty, handleDecreaseProductQtr, handleRemoveProduct,totalPrice } = useShoppingCartContext()

    useEffect(() => {

        getProduct(id).then(data => {
            setProduct(data)
        })

    }, [])



    

    return (
        <div className="flex flex-row-reverse mt-5 border-b pb-2">

            <Link to={`/product/${id}`}><img
                className="rounded w-28 aspect-[4/3] overflow-hidden"
                src={product?.image}
                alt="" /></Link>

            {/* بخش اطلاعات و کنترل‌های محصول */}
            <div className="mr-4 text-right">
                <h3 className="text-right">{product?.title} </h3>
                <div className="mt-2">
                    {/* دکمه حذف محصول از سبد خرید */}
                    <Button onClick={() => { handleRemoveProduct(id) }} className="mr-2 mt-2" style={{ padding: "1px 2px", borderRadius: "5px" }} variant="danger">Remove</Button>
                    {/* کنترل‌های افزایش و کاهش تعداد محصول */}
                    <Button onClick={() => handleIncreaseProductQty(id)} className="mt-2  " style={{ padding: "1px 5px", borderRadius: "5px" }} variant="primary">+</Button>
                    <span className="mx-2">{qty}</span>
                    <Button onClick={() => { handleDecreaseProductQtr(id) }} className="mt-2  " style={{ padding: "1px 5px", borderRadius: "5px" }} variant="primary">-</Button>
                    {/* نمایش مبلغ کل برای این محصول */}
                    <h5 className="text-green-400">مبلغ کل : <span className="text-amber-900  font-extrabold"> {product?totalPrice(product):0} </span></h5>
                </div>
            </div>
        </div>
    )
}
export default CartItem