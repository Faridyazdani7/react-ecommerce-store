import { useState } from "react"
import { useShoppingCartContext } from "../../context/ShoppingCartContext"
import Button from "../button/Button"
import Container from "../container/Container"

function Login() {
  const { handleLogin } = useShoppingCartContext()

  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      <Container>
        <div className="bg-white shadow-2xl p-10 rounded-2xl max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            ورود به حساب کاربری
          </h2>
           
          <div className="flex flex-col gap-5">
            {/* فیلد نام کاربری */}
            <input
              onChange={handleChange}
              type="text"
              placeholder="نام کاربری"
              name="username"
              value={user.username}
              className="p-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {/* فیلد رمز عبور */}
            <input
              onChange={handleChange}
              type="password"
              placeholder="رمز عبور"
              name="password"
              value={user.password}
              className="p-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {/* دکمه ورود */}
            <Button
              onClick={() => handleLogin(user.username, user.password)}
              className="!py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              ورود
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Login
