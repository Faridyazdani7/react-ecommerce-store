import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import Button from "../button/Button";
import { useState } from "react";

function Navbar() {
    const { cartQty, handleLogOut } = useShoppingCartContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // کنترل باز و بسته شدن منو در موبایل
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="flex top-0 left-0 w-full bg-white shadow-md border-b border-gray-300 z-50">
            <Container>
                <div className="flex flex-row-reverse justify-between items-center py-3">

                    {/*  دکمه منوی موبایل */}
                    <div className="md:hidden cursor-pointer text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? "✖" : "☰"}
                    </div>

                    {/*  لیست لینک‌ها */}
                    <ul
                        className={`flex flex-col text-right md:flex-row-reverse gap-4 absolute md:static bg-white md:bg-transparent left-0 w-full md:w-auto top-14 md:top-auto p-4 md:p-0 border-t md:border-none transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"
                            }`}
                    >
                        <li>
                            <Link
                                to="/"
                                onClick={handleLinkClick}
                                className="block hover:text-blue-600 transition-all duration-200 hover:scale-105"
                            >
                                خانه
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/store"
                                onClick={handleLinkClick}
                                className="block hover:text-blue-600 transition-all duration-200 hover:scale-105"
                            >
                                فروشگاه
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/create-product"
                                onClick={handleLinkClick}
                                className="block hover:text-blue-600 transition-all duration-200 hover:scale-105"
                            >
                                ساخت محصول
                            </Link>
                        </li>
                    </ul>

                    {/*  بخش خروج و سبد خرید */}
                    <div className="flex items-center">
                        <Button
                            className="text-red-500 hover:text-red-700 transition-all duration-200"
                            onClick={handleLogOut}
                        >
                            خروج
                        </Button>

                        <Link to="/cart" className="relative ml-3">
                            <button className="bg-green-500 hover:bg-green-600 transition-all duration-200 rounded px-3 py-1.5 text-white">
                                سبد خرید
                            </button>

                            {cartQty !== 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {cartQty}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;
