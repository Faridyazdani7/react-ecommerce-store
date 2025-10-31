import { useParams } from "react-router-dom"
import Container from "../components/container/Container"
import Button from "../components/button/Button"
import { useEffect, useState } from "react"
import { getProduct } from "../services/api"
import type { IProducts } from "../types/server"
import { useShoppingCartContext } from "../context/ShoppingCartContext"



function Product() {

    const params = useParams<{ id: string }>()

    const [product, setProduct] = useState<IProducts>();

    const { handleIncreaseProductQty, cartItems, handleDecreaseProductQtr, getProductQty, handleRemoveProduct, finalPrice,totalPrice } = useShoppingCartContext();

    useEffect(() => {
        getProduct(params.id as string).then((data) => {
            setProduct(data)
        })
    }, [])
    console.log(cartItems)
    return (
        <div>
            <Container>
                <div className="h-96 shadow mt-5 grid grid-cols-12">
                    <div className=" col-span-9 p-4">
                        <h1 className="text-right">{product?.title}</h1>
                        <div>
                            <p className="text-right">
                            {product?.discount ? (
                                <>
                                    <span className="flex flex-row-reverse text-gray-400 line-through ml-2">{product.price}$</span>
                                    <span className="flex flex-row-reverse text-green-500 font-bold">
                                        {finalPrice(product)} $
                                    </span>
                                </>
                            ) : (
                                <span className="text-green-500 font-bold">
                                    {product?.price} $
                                </span>
                            )}</p>
                            <p className="text-right">{product?.description} </p>
                            <p className="text-green-500 flex flex-row-reverse mt-12"> : قیمت کل <span className="text-amber-900 font-extrabold mr-2">${product?totalPrice(product):0}</span></p>
                        </div>
                    </div>



                    <div className=" col-span-3 p-4 bg-blue-200 flex flex-col ">
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg">
                            <img className="w-full h-full object-cover rounded-lg shadow-md" src={product?.image} alt="" />
                        </div>
                        <div className="">
                            {
                                getProductQty(parseInt(params.id as string)) === 0 ? (
                                    <Button
                                        className="mt-2 w-full !py-3 "
                                        style={{ padding: "6px 12px", borderRadius: "5px" }}
                                        variant="primary"
                                        onClick={() => handleIncreaseProductQty(parseInt(params.id as string))}
                                    >اضافه به سبد
                                    </Button>

                                ) : (

                                    <>
                                        <div className="grid grid-cols-3">
                                            <Button
                                                className="mt-2 w-full  "
                                                style={{ padding: "6px 12px", borderRadius: "5px" }}
                                                variant="success"
                                                onClick={() => handleIncreaseProductQty(parseInt(params.id as string))}
                                            >+
                                            </Button>


                                            <span className="flex justify-center items-center"> {getProductQty(parseInt(params.id as string))}</span>

                                            <Button
                                                className="mt-2 w-full  "
                                                style={{ padding: "6px 12px", borderRadius: "5px" }}
                                                variant="danger"
                                                onClick={() => { handleDecreaseProductQtr(parseInt(params.id as string)) }}
                                            >-
                                            </Button>

                                        </div>

                                        <Button
                                            className="mt-2 w-full !py-3  "
                                            style={{ padding: "6px 12px", borderRadius: "5px" }}
                                            variant="warning"
                                            onClick={() => { handleRemoveProduct(parseInt(params.id as string)) }}
                                        >حذف
                                        </Button>

                                    </>

                                )}
                        </div>
                    </div>



                </div>

            </Container>

        </div>
    )
}
export default Product