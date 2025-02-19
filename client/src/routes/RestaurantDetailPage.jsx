import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import restaurantFinder from '../apis/restaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';


const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await restaurantFinder.get(`/${id}`);
                
                setSelectedRestaurant(response.data.data);
               
                
            } catch (error) {

                console.error(error)

            }

        }

        fetchData();
    }, [id, setSelectedRestaurant]);

    

    return <div>{selectedRestaurant && (

        <>
        <h1 className='text-center display-1 mt-2'>{selectedRestaurant.restaurant?.name.toUpperCase()  || "Restaurant Name Not Available" }</h1>
        <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
            <span className="text-warning ml-1">
                {
                    selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"
                }
            </span>
        </div>
            <div className="mt-3 d-flex justify-content-center">
                <Reviews reviews={selectedRestaurant.reviews}/>
            </div>
            <div className="mb-1 d-flex justify-content-center ">
                <AddReview />
            </div>


        </>
    )}</div>;
}



export default RestaurantDetailPage;