import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/Home"
import Store from "./pages/store/Store"
import Layout from "./components/layout/Layout"
import Product from "./pages/Product"
import Cart from "./pages/cart/Cart"
import {  useShoppingCartContext } from "./context/ShoppingCartContext"
import PrivateRoute from "./components/privateRoute/PrivateRoute"
import Login from "./components/login/Login"
import CreateProduct from "./createProduct/CreateProduct"




function App() {

const {isLogin}=useShoppingCartContext()

  return (
    
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/create-product" element={<CreateProduct/>} />
          <Route path="/login" element={isLogin?<Navigate to="/"/>:<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

        </Routes>
      </Layout>
    





  )
}

export default App
