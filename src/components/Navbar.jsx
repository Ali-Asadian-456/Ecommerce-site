import { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaYoutube } from "react-icons/fa";
import { products_categories } from "../data/product";
import { ProductContext } from "../context/ProductContext";
import ThemeToggle from "./themetoggle";
import LoginSignUpModal from "./LoginSignUpModal";
import Button from "react-bootstrap/Button";
import { UserContext } from '../context/UserContext';
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

export default function Navbar({ onOpenModal, onLogout }) {
  const { invoice } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(UserContext); // Use 'user' instead of 'User'
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user !== null && user !== undefined);
  }, [user]);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("jwtToken", token);
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const isActive = ({ isActive }) => (isActive ? "text-blue-600" : "");

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="w-full h-20 shadow-lg border flex justify-between px-8 items-center bg-white dark:bg-emerald-700 ">
      <div className="relative">
        <div
          // to={"/"}
          className="flex flex-col items-center"
          onClick={toggleDropdown}
        >
          <FaYoutube className="text-red-500 text-4xl" />
          <span>Ali Asadian</span>
        </div>
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md">
            <ul className="flex flex-col ">
              <li className="px-4 py-2 hover:bg-gray-200 rounded-md">
                <NavLink to="/dashboard"  className="flex items-center gap-2"><MdDashboardCustomize />Dashbord</NavLink>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 rounded-md">
                <NavLink to="/" className="flex items-center gap-2"><FaHome />Home</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

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

      {!isLoggedIn ? (
        <nav className="bg-blue-500 p-4 flex justify-between items-center rounded-md text-white">
          <Button onClick={() => setShowModal(true)}>ورود/ثبت نام</Button>
        </nav>
      ) : (
        <nav className="bg-red-500 p-4 flex justify-between items-center rounded-md text-white">
          <Button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              setIsLoggedIn(false);
              onLogout();
            }}
          >
            خروج
          </Button>
        </nav>
      )}

      <ThemeToggle />

      <LoginSignUpModal
        show={showModal}
        setShow={setShowModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
