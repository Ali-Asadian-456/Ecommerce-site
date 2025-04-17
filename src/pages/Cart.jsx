import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Cart() {
  const {cart,invoice,removeCart,setCart,setInvoice} = useContext(ProductContext);
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      // Save cart to server as purchase history
      await fetch("http://localhost:5000/api/purchase-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      // Clear the cart and reset invoice
      setCart([]);
      setInvoice({ count: 0, subTotal: 0 });
      navigate("/success");
    } catch (error) {
      console.error("Failed to save purchase history:", error);
    }
  };
  
  return (
    <div className=''>
      {
        cart.length>0?
        <div>
          {
            cart.map(product=>{
              return(
                <div key={product.id} className='shadow-md p-4 flex items-center gap-4 justify-between'>
                  <img src={product.image} alt={product.name} className='w-[120px] h-[120px] object-contain' />

                  <div className='flex flex-col gap-2 w-[450px]'>
                    <p className='font-bold'>{product.name}</p>
                    <p className='text-xs text-gray-500'>{product.smallDescription}</p>
                    <p className='text-xs '>Qty: {product.quantity}</p>
                  </div>
                  <p className='font-semibold'>${product.price}</p>
                 <IoIosRemoveCircleOutline className='text-red-600 text-2xl cursor-pointer' onClick={()=>removeCart(product)}/>
                </div>
              )
            })
          }
          <div className='flex flex-col items-end gap-3 py-4'>
            <p className='font-bold'>Subtotal({invoice.count} {invoice.count > 1 ? 'items':'item'}): ${invoice.subTotal.toFixed(2)}</p>
            <button className='bg-blue-600 text-sm text-white p-2 w-[200px] rounded-md' onClick={placeOrder}>Place Order</button>
          </div>
        </div>
        :
        <div className='flex items-center text-2xl justify-center p-4 gap-2 '>
           <span>Empty</span>
           <FaShoppingCart className='text-2xl' />
          <Link className='text-blue-600' to={'/'}>Add Products</Link>
        </div>
      }
    </div>
  )
}