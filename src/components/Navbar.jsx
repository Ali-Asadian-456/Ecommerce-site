import React, { useContext } from "react";
import { FaShoppingCart, FaYoutube } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";
import { products_categories } from "../data/product";
import { ProductContext } from "../context/ProductContext";

export default function Navbar({ onOpenModal }) {
  const { invoice,handleOpen,handleClose } = useContext(ProductContext);

  const isActive = (element) => {
    return element?.isActive ? "text-blue-600" : "";
  };

  return (
    <div className="w-full h-20 shadow-lg border flex justify-between px-8 items-center bg-white">
      <NavLink to={"/"} className="flex flex-col items-center">
        <FaYoutube className="text-red-500 text-4xl" />
        <span>Ali Asadian</span>
      </NavLink>

      <ul className="flex justify-center gap-4 font-semibold">
        {products_categories.map((category) => (
          <li key={category.value}>
            <NavLink className={isActive} to={`/${category.value}`}>
              {category.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* دکمه ورود / ثبت‌نام */}
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          ورود / ثبت‌نام
        </button>

        <Link className="relative" to={"/cart"}>
          <FaShoppingCart className="text-2xl" />
          {invoice?.count > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-blue-700 text-white flex items-center justify-center rounded-full">
              {invoice?.count}
            </div>
          )}
        </Link>
      </div>



    
    </div>
  );
}
