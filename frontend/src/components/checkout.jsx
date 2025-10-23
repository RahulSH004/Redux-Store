import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';
import { clearCart } from '../store/cartitemstate';
import { selectCartSummary } from '../store/carttotalseclector';
import { loadRazorpay, createOrder, openRazorpayCheckout, verifyPayment } from '../utility/payemnnt';
import { Storeheader } from './storeheader';



const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Get cart details from Redux store
  const { totalAmount, items } = useSelector(selectCartSummary);
  
  // Handle successful payment
  const handlePaymentSuccess = async (response) => {
    try {
      setLoading(true);
      
      // Verify the payment with your backend
      const verificationData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      };
      
      const { success } = await verifyPayment(verificationData);
      
      if (success) {
        swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Thank you for your purchase!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          dispatch(clearCart());
          navigate('/');
        });
      } else {
        toast.error('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Payment verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Check if cart is empty
      if (items.length === 0) {
        toast.error('Your cart is empty');
        navigate('/cart');
        return;
      }
      
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        toast.error('Razorpay SDK failed to load');
        return;
      }
      
      
      const orderData = await createOrder(totalAmount);
      if (!orderData.success) {
        toast.error('Failed to create order');
        return;
      }
      
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Redux Store',
        description: 'Purchase from Redux Store',
        order_id: orderData.order.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };
      
      openRazorpayCheckout(options);
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Payment initiation error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (items.length > 0) {
      handlePayment();
    } else {
      navigate('/cart');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Storeheader />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">Processing your payment...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <p className="mb-6">Click the button below to proceed with payment.</p>
            <button 
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Pay Now (₹{totalAmount.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;