import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

export default function Products() {
  const {products,addCart}=useContext(ProductContext)
  return (
    // <div>Products</div>
    <div className='flex flex-wrap gap-6 justify-between'>
      {/* {JSON.stringify(products)} */}
      {
        products.map(product=>{
          return(
            <div key={product.id} className='w-[270px]   hover:shadow-lg'>
              <img src={product.image} alt={product.name} className='w-[200px] h-[150px] object-contain block m-auto '></img>
              {/* Product Info */}
              <div className='flex  flex-col gap-2 my-4 p-2'>
                <p className='text-center font-bold'>{product.name}</p>
                <p className='text-center text-sm'>{product.price}</p>
                <p className='text-xs text-gray-500'>{product.smallDescription}</p>
              </div>
              <button  onClick={()=>addCart(product)} className='m-auto bg-blue-700 text-white text-sm  block m-auto w-full p-2  text-sm'>+ Add To Cart</button>
            </div>
          )
        })

      }


    </div>
  )
}
