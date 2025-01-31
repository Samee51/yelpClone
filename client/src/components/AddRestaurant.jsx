import React, { useContext, useState } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import {RestaurantsContext} from '../context/RestaurantsContext';


const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name , setName] = useState("");
    const [location , setlocation] = useState("");
    const [priceRange , setpriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await restaurantFinder.post("/" , {
                name: name,
                location: location,
                price_range: priceRange
            });

            addRestaurants(response.data.data.restaurant);
        } catch (error) {
            
        }
    }

    return <>

        <div className="by-4 ">
            <form action="" className='d-flex justify-content-center'>
                <div className="d-flex justify-content-center col-8 ">

                    <input type="text" value={name} onChange={e => setName(e.target.value)} className='form-control mx-1 ' placeholder='name' />

                    <input type="text" value={location} onChange={e => setlocation(e.target.value)} className='form-control  mx-1' placeholder='location' />

                    <select 
                    value={priceRange} onChange={e => setpriceRange(e.target.value)}
                    className='custom-select my-1 mr-sm-2  mx-1 col-2'>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>

                    <button type='submit' onClick={handleSubmit} className='btn btn-primary mx-1  col-1 '>Add</button>
                </div>
            </form>
        </div>
    </>
}


export default AddRestaurant;