import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/orders';

//create order
export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createorder`,{
        amount,
        receipt: 'order_'+Date.now()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

//verfiy payment

export const verifyPayment = async(paymentData) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/verifypayment`, paymentData);
        return response.data;
    }catch(error){
        console.error('Error verifying payment:', error);
        throw error;
    
    }
}

// load razorpay 

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const openRazorpayCheckout = (options) => {
    const rzp = new window.Razorpay(options);
    rzp.open();
}