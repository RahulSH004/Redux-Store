import React from 'react'
import { toast } from 'react-toastify'

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart()
    toast.success(`${product.name} added to cart!`)
  }
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <img 
        src={product.image} 
        alt={product.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>{product.name}</h3>
        <p className='text-gray-600 text-sm mb-3'>{product.description}</p>
        <div className='text-center'>
          <div className='text-xl font-bold text-blue-600 mb-3'>₹{product.price}</div>
          <button 
            onClick={handleAddToCart}
            className='w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard