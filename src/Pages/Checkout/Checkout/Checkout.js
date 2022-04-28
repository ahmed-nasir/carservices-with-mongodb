import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';


const Checkout = () => {
    const {serviceId}=useParams();
    const [service]=useServiceDetail(serviceId)
    const [user] = useAuthState(auth);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order ={
            email: user.email,
            service:service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone:event.target.phone.value

        }
        axios.post('https://frozen-temple-37604.herokuapp.com/order',order)
        .then(response=>{
            const {data}=response;
            if(data.insertedId){
                toast('Your order is booked')
                event.target.reset();
            }
        })
    }
    return (
        <div className='container w-50 mx-auto'>
            <h2>Please order : {service.name}</h2>
            <form className='d-flex flex-column gap-2' onSubmit={handlePlaceOrder}>
                <input type="text" name='name' value={user?.displayName} placeholder='Name' required readOnly disabled />
                <input type="email" name='email' value={user?.email} placeholder='Email' required readOnly disabled />
                <input type="text" name='service' value={service.name} placeholder='Service' readOnly required  />
                <input type="text" name='address' placeholder='Address' required autoComplete='off' />
                <input type="number" name='phone' placeholder='Phone' required />
                <input type="submit" value='Place Order' />
            </form>
        </div>
    );
};

export default Checkout;