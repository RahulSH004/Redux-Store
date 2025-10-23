import{ Routes, Route } from 'react-router-dom'
import Store from './components/Store'
import Cartpage from './components/Cartpage'
import Checkout from './components/checkout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Store/>} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App
