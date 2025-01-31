import React from "react";
import StarRating from "./StarRating";

const Reviews = ({reviews}) => {

    if (!reviews || !Array.isArray(reviews)) {
        console.error("Invalid reviews data passed to the Reviews component.");
        return <p>No reviews available</p>;
      }

    return(<div className="row row-cols-3 mb-2 container d-flex gap-4 justify-content-center mt-5  ">
        
        {reviews.map((review) => {

            return (<div key={review.id} className="card col-3 text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>{review.name}</span>
                    <span><StarRating rating={review.rating}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">{review.review}</p>
                </div>
            </div>);

        })}
        {/* <div className="card col-3 text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>Joann</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">This restaurant was awesome</p>
            </div>
        </div>
        <div className="card col-3 text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>Joann</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">This restaurant was awesome</p>
            </div>
        </div>
        <div className="card col-3 text-white bg-primary mb-3 mr-4" style={{maxWidth:"30%"}}>
            <div className="card-header d-flex justify-content-between">
                <span>Joann</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">This restaurant was awesome</p>
            </div>
        </div> */}
        
        
    </div>);
}


export default Reviews;