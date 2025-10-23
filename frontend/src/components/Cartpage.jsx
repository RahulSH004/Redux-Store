import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Storeheader } from './storeheader'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { removeFromCart, updateQuantity } from '../store/cartitemstate'
import { selectCartSummary } from '../store/carttotalseclector'
import { useNavigate } from 'react-router-dom'

const Cartpage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalQuantity, totalAmount } = useSelector(selectCartSummary)

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Storeheader />
        <div className='container mx-auto px-4 py-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Your Cart is Empty</h1>
          <p className='text-gray-600'>Add some products to your cart to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Storeheader />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          
          {/* Cart Items Section */}
          <div className='lg:col-span-2'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Shopping Cart</h1>
            
            {items.map(item => (
              <div key={item.id} className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4'>
                <div className='flex items-start gap-4'>
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded-lg bg-gray-100'
                  />
                  
                  {/* Product Details */}
                  <div className='flex-1'>
                    <h3 className='text-lg font-medium text-gray-800 mb-1'>{item.name}</h3>
                    <p className='text-sm text-green-600 mb-3'>
                      {item.description}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50'
                      >
                        <Minus size={16} />
                      </button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50'
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className='text-red-600 hover:text-red-800 ml-4 flex items-center gap-1'
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className='text-right'>
                    <p className='text-xl font-semibold text-gray-800'>₹{item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4'>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>Order Summary</h2>
              
              <div className='space-y-3 mb-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Items ({totalQuantity}):</span>
                  <span className='font-semibold'>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <hr className='my-4' />
              
              <div className='flex justify-between text-lg font-bold mb-6'>
                <span>Order Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className='w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200'>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartpage
