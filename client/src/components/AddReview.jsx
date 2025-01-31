import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import restaurantFinder from "../apis/restaurantFinder";

const AddReview = () => {

    const {id} = useParams();
    

    const [name , setName] = useState("");
    const [reviewText , setReviewText] = useState("");
    const [rating , setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {


        try {
            const response = await restaurantFinder.post(`/${id}/addReview`, {
              name,
              review: reviewText,
              rating,
            });
            console.log("Review submitted:", response.data);

           

          } catch (err) {
            console.error("Error submitting review:", err);
          }
        };

    return(
        <div className="mb-2  col-7">
            <form action="">
                <div className="form-row d-flex justify-content-between">
                    <div className="form-group col-6 mt-4">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
                    </div>
                    <div className="form-group  mt-4 col-6 mx-2">
                        <label htmlFor="rating">Rating </label>
                        <select value={rating} onChange={e => setRating(e.target.value)}  id="rating" className="form-select ">
                            <option value="" disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                </div>
                <div className="form-group mt-4 ">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} name="" id="Review" className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
}


export default AddReview;