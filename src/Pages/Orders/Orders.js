import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate =useNavigate();
    // console.log(orders);
    useEffect(() => {
        const getOrders = async () => {
            const email = user?.email;
            const url = `https://frozen-temple-37604.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch (error) {
                console.log(error.message)
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth)
                    navigate('/login')
                }
            }
        }
        getOrders()

    }, [user])
    return (
        <div className='container'>
            <div className='w-50 mx-auto'>
            <h1>Your Orders {orders.length}</h1>

            {
                orders.map(order=><div key={order._id}>
                    {order.email}: {order.service} 
                   
                </div>)
            }
        </div>
        </div>
    );
};

export default Orders;