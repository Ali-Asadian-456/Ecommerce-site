import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaYoutube } from "react-icons/fa";
import { products_categories } from "../data/product";
import { ProductContext } from "../context/ProductContext";
import ThemeToggle from "./themetoggle" ;
// import {LoginModal} from "./LoginModal";
import LoginModal from "./LoginModal";  // import LoginModal
import Button from "react-bootstrap/Button"; // import Button from react-bootstrap

// import Bootstrap styles just for LoginModal
// import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Navbar({ onOpenModal }) {
  const { invoice, handleOpen, handleClose } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);

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
        <Link className="relative" to={"/cart"}>
          <FaShoppingCart className="text-2xl" />
          {invoice?.count > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-blue-700 text-white flex items-center justify-center rounded-full">
              {invoice?.count}
            </div>
          )}
        </Link>
      </div>

      {/* Navbar section where Bootstrap is used */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center rounded-md text-white " >
        {/* <h1 className="text-white text-xl">لوگو</h1> */}
        <Button     onClick={() => setShowModal(true)}>
          ورود/ثبت نام
        </Button>
      </nav>

      <ThemeToggle/>

      {/* Pass the state and function for showing modal */}
      <LoginModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
