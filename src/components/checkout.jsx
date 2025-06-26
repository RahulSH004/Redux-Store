import React from 'react';
import swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartitemstate'

const Checkout =() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        swal.fire({
            icon: 'success',
            title: 'Thank you for your purchase!',
            text: 'Your order has been placed successfully.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            dispatch(clearCart());
            navigate('/');
        })
    },[dispatch, navigate]);
    
    return null;
}

export default Checkout;