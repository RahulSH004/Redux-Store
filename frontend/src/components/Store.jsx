import React from 'react'
import { Storeheader } from './storeheader'
import ProductCard from './ProductCard'
// import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addToCart } from '../store/cartitemstate'
import { useEffect } from 'react'



const Store = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const products = [
    {
      id: 1,
      "name": "Pen Drive 64GB - SanFlash Ultra",
      "description": "High-speed USB 3.0 pen drive with 64GB capacity for quick data transfers.",
      "price": 955.00,
      "image": "https://shop.sandisk.com/content/dam/store/en-us/assets/products/usb-flash-drives/ultra-luxe-usb-3-1/gallery/ultra-luxe-usb-3-1-angle-top-right.png.thumb.1280.1280.png"
    },
    {
      "id": 2,
      "name": "Laptop - SwiftBook Air 14",
      "description": "14-inch lightweight laptop with Intel i5, 8GB RAM, and 256GB SSD.",
      "price": 74999.00,
      "image": "https://m.media-amazon.com/images/I/81KPCN4+OSL._AC_SX466_.jpg"
    },
    {
      "id": 3,
      "name": "Smartwatch - ChronoFit Z3",
      "description": "Waterproof smartwatch with SpO2 monitoring, step counter, and notification sync.",
      "price": 8999,
      "image": "https://m.media-amazon.com/images/I/61HOBA37XXL._SX679_.jpg"
    },
    {
      "id": 4,
      "name": "Laptop Charger - 65W Type-C",
      "description": "Universal USB-C laptop charger compatible with major brands. Fast charging support.",
      "price": 3450,
      "image": "https://m.media-amazon.com/images/I/61YISsrdreL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
      "id": 5,
      "name": "Memory Card 128GB - MicroSD Pro",
      "description": "Class 10 UHS-I microSD card suitable for phones, cameras, and tablets.",
      "price": 2499,
      "image": "https://shop.sandisk.com/content/dam/store/en-us/assets/products/memory-cards/extreme-pro-uhs-i-microsd/gallery/extreme-pro-uhs-i-microsd-128gb.png.wdthumb.1280.1280.webp"
    },
    {
      "id": 6,
      "name": "Wireless Charger - QuickCharge Pad",
      "description": "Fast wireless charging pad compatible with iPhone and Android devices.",
      "price": 1995,
      "image": "https://m.media-amazon.com/images/I/41IXUBmZRNL._UF894%2C1000_QL80_.jpg"
    },
    {
      "id": 7,
      "name": "Bluetooth Earbuds - SoundX Air",
      "description": "Compact earbuds with noise cancellation, mic, and 20-hour battery life.",
      "price": 599,
      "image": "https://www.rinovelty.com/Products/Import/ECTWAEA/128613/image-thumb__128613__rinco-gallery-main/ECTWAEA.215d595c.webp"
    },
    {
      "id": 8,
      "name": "External HDD - 1TB QuickStore",
      "description": "1TB USB 3.0 portable hard drive for reliable and fast backup.",
      "price": 6999,
      "image": "https://m.media-amazon.com/images/I/81wwLOgkLgL.jpg"
    }
  ]

  const handletocart = (product) => {
    console.log("Product added to cart:", product);
    dispatch(addToCart(product));
    // navigate('/cart'); // Uncomment if you want to navigate to cart page after adding
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Storeheader />
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Our Products</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handletocart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Store
