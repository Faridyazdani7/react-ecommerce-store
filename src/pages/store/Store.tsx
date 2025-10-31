import { Link } from "react-router-dom"
import Container from "../../components/container/Container"
import ProductItem from "../../components/productitem/ProductItem"
import { useEffect, useState } from "react"
import { getProducts } from "../../services/api"
import type { IProducts } from "../../types/server"
import { motion } from "framer-motion"

function Store() {
    const [products, setProducts] = useState<IProducts[]>([])
     
    useEffect(() => {
         getProducts().then((result) => {
             setProducts(result) 
            }) 
            }, [])
    return (
        <div>
            <Container>
                {/* عنوان صفحه */}
                <h1 className="text-right mt-5">جدیدترین محصولات</h1>
                {/* گرید محصولات با طراحی ریسپانسیو */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 ">

                    {
                        products.map((item, index) => (
                             // انیمیشن اسکرول برای هر محصول
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                            >
                                <Link key={item.id} to={`/product/${item.id}`}>
                                    <ProductItem {...item} />
                                </Link>
                            </motion.div>
                        ))
                    }


                </div>
            </Container>
        </div>
    )
}
export default Store 