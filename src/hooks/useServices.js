import { useEffect, useState } from "react";

const useServices = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://frozen-temple-37604.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])

    return[services,setServices]

}

export default useServices;