import React, { useContext, useEffect } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import {RestaurantsContext} from '../context/RestaurantsContext';
import {useNavigate} from 'react-router-dom';
import StarRating from '../components/StarRating';

const RestaurantList = (props) => {
    const {restaurants , setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {

        async function fetchData() {

            try {
                const response = await restaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [setRestaurants]);

    const handleDelete = async( e,id) => {
        e.stopPropagation();
        try {
            await restaurantFinder.delete(`/${id}`);
           setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id ;
           }));
        } catch (error) {
            
        }
    };

    const handleUpdate = (e,id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {

        navigate(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) =>{

        if(!restaurant.count){

            return <span className="text-warning">0 reviews</span>
        }

        return(<><StarRating rating={restaurant.average_rating}/>
        <span className="text-warning ml-1">({restaurant.count})</span></>);
    };

    return (
        <div className='d-flex justify-content-center my-5' >
            <div className='col-8'>
                <table className="table table-hover table-dark">
                    <thead >
                        <tr className=" bg-primary ">
                            <th className=" bg-primary " scope='col'>Restaurants</th>
                            <th className=" bg-primary " scope='col'>Location</th>
                            <th className=" bg-primary " scope='col'>Price Range</th>
                            <th className=" bg-primary " scope='col'>Ratings</th>
                            <th className=" bg-primary " scope='col'>Edit</th>
                            <th className=" bg-primary " scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.map(restaurant => {

                            return(
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handleUpdate(e , restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e , restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default RestaurantList;