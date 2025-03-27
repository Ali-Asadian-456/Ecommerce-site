import './App.css';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from './context/ProductContext';

function App() {
  const { filteredProducts } = useContext(ProductContext);
  const { category } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // فیلتر محصولات فقط در صورتی که category مقدار معتبری داشته باشد
  useEffect(() => {
    if (category) filteredProducts(category);
  }, [category, filteredProducts]);

  return (
    <div className="min-h-screen h-auto bg-slate-200  dark:bg-slate-700">
      <Navbar />

      <div className="w-[80%] m-auto my-4 bg-white p-4">
        <Outlet />
      </div>

    </div>
  );
}

export default App;
