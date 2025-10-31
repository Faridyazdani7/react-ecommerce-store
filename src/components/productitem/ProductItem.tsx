import { useShoppingCartContext } from "../../context/ShoppingCartContext"
import type { IProducts } from "../../types/server"


type ProductItem =IProducts

function ProductItem({ title, price, description, image, discount }: ProductItem) {
      const{finalPrice}=useShoppingCartContext()
  return (
    <div className=" h-full w-full flex flex-col shadow-lg shadow-gray-300 border-gray-400 rounded pb-2 hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-50  ">
      {/* بخش تصویر محصول */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      {/* بخش عنوان و قیمت */}
      <div className="flex justify-between flex-row-reverse px-3 sm:px-4 mt-2 gap-2">
        <h3 className="line-clamp-1 font-bold text-sm sm:text-base ">{title}</h3>
        {/* نمایش قیمت با در نظر گرفتن تخفیف */}
        {discount ?
          <div className="flex flex-col items-end">
            <span className=" text-gray-400 line-through text-xs sm:text-sm">{price}$</span>
            <span className=" font-bold text-green-600 text-sm sm:text-base">{finalPrice({price,discount} as ProductItem)}$</span>
          </div> :
          <span className=" font-bold text-green-500">{price}$</span>
        }
      </div>
      {/* بخش توضیحات محصول */}
      <div className="px-3 sm:px-4 mt-1">
        <p className="line-clamp-2 text-right text-gray-500 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {/* نمایش درصد تخفیف در صورت وجود */}
      {discount && (
        <div className="px-3 sm:px-4 mt-2">
          <span className="text-xs sm:text-sm font-semibold text-red-500">
            {discount}% OFF
          </span>
        </div>
        
      )}


    </div>
  )
}
export default ProductItem 