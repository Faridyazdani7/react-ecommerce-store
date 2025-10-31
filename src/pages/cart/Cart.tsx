import Button from "../../components/button/Button"
import CartItem from "../../components/cartitem/CartItem"
import Container from "../../components/container/Container"
import { useShoppingCartContext } from "../../context/ShoppingCartContext"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import type { IProducts } from "../../types/server";


function Cart() {

    // const {cartItems}=useContext(ShoppingCartContext)
    //بهینه شده ی خط بالا که با انجام یکسری تغییرات در کامپوننت کارت روش اعمال میکنیم

    const { cartItems, finalTotalPrice, finalTotalDiscount } = useShoppingCartContext()
    const [products, setProducts] = useState<IProducts[]>([]);

    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, []);



    return (
        <div>
            <Container>
                {/* نمایش لیست آیتم‌های سبد خرید با انیمیشن */}
                <div>
                    {
                        cartItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                            >
                                <CartItem key={item.id} {...item} />
                            </motion.div>
                        ))
                    }
                </div>
                {/* بخش خلاصه سبد خرید و محاسبات قیمت */}
                <div className="bg-gray-200 rounded p-6 mt-5">
                    <p className="text-right">تخفیف شما: {finalTotalDiscount(products)}</p>
                    <p className="text-right">قیمت نهایی: {finalTotalPrice(products)}</p>
                </div>

                <Button className="mt-2 rounded p-2 mb-10" variant="success">ثبت سفارش</Button>
            </Container>
        </div>
    )
}
export default Cart