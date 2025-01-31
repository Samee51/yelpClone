import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import restaurantFinder from "../apis/restaurantFinder";

const UpdateRestaurant = (props) => {

   const {id} =  useParams();
   const [name , setName] = useState();
   const [location , setLocation] = useState();
   const [priceRange , setPriceRange] = useState();
   let navigate = useNavigate();

    useEffect(()=>{

       async function fetchData (){
            const response = await restaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }

        fetchData();
    },[setName]);

    let handleSubmit = async(e) => {
        e.preventDefault();

        const updatedRestaurant = await restaurantFinder.put(`/${id}` , {
            name,
            location,
            price_range: priceRange
        });
        navigate("/");

    }

    return (

        <div className="container col-6 mt-4">
        <form action="" method="post">
            <div className="form-group mt-3">
                <label htmlFor="name">Name</label>
                <input id="name" value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} id="location" type="text" className="form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="price_range">Price Range 1 to 5</label>
                <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" type="number" className="form-control" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-5">Submit</button>
            
        </form>
        </div>
    );
}


export default UpdateRestaurant;