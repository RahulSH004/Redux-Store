import React from 'react'
import { Link } from 'react-router-dom'

const storeheader = () => {
  return (
    <header>
      <div className='bg-blue-900 rounded-b-xl'>
        <nav className='flex justify-between items-center p-4'>
          <h1 className='font-bold text-xl text-white'>My Store</h1>
          <ul className='flex space-x-6 items-center'>
            <li>
              <Link to="/" className='text-white hover:text-gray-300 underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className='text-white hover:text-gray-300 underline'>
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { storeheader as Storeheader }
