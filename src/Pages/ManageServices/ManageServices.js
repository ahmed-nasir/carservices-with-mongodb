import React from 'react';
import useServices from '../../hooks/useServices';

const ManageServices = () => {
    const [services,setServices] = useServices();
    // console.log(services);

    const handleDelete = id => {
        // console.log(id);
        const proceed = window.confirm('Are You sure?')
        if (proceed) {
            const url = `https://frozen-temple-37604.herokuapp.com/service/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = services.filter(service => service._id !== id)
                    setServices(remaining)
                })
        }
    }


    return (
        <div className='w-50 mx-auto'>
            <h1>Manage Your services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h5>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h5>

                </div>)
            }
        </div>
    );
};

export default ManageServices;