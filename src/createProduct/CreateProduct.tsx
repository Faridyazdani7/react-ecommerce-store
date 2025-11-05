import { useState } from "react";
import axios from "axios";


 function CreateProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    discount: "",
  });

  const [loading,setLoading]=useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async () => {

    if(loading) return;
    setLoading(true);

    await axios.post("http://localhost:8001/products", {
      id: Date.now().toString(),
      ...product,
      category: "string",
      price: Number(product.price),
      discount: Number(product.discount) || "",
      rating: { rate: 0, count: 0 },
    });
    setLoading(false);
    alert("محصول با موفقیت ایجاد شد");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">🛒 ساخت محصول جدید</h1>
        {/* فیلد عنوان محصول */}
        <div className="flex flex-col">
          <label>عنوان</label>
          <input name="title" value={product.title} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        {/* فیلد قیمت محصول */}
        <div className="flex flex-col">
          <label>قیمت</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        {/* فیلد آدرس تصویر محصول */}
        <div className="flex flex-col">
          <label>آدرس عکس</label>
          <input name="image" value={product.image} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        {/* فیلد درصد تخفیف */}
        <div className="flex flex-col">
          <label>درصد تخفیف</label>
          <input type="number" name="discount" value={product.discount} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        {/* فیلد توضیحات محصول */}
        <div className="flex flex-col">
          <label>توضیحات محصول</label>
          <textarea name="description" value={product.description} onChange={handleChange} rows={3} className="border px-3 py-2 rounded" />
        </div>
        {/* دکمه ایجاد محصول */}
        <button onClick={handleCreateProduct} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          {loading ? "در حال ایجاد..." : "ایجاد محصول"}
        </button>
      </div>
    </div>
  );
}

export default CreateProduct
