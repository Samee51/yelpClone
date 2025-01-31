import 'dotenv/config'
import express from "express";
import db from './db/index.js'
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());


// Get All Restaurants

app.get('/api/v1/restaurants', async (req, res) => {


    try {

        const restaurantsRatingData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT  restaurant_id , COUNT(*) , TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id");

        res.status(200).json({

            status: "Succes",
            results: restaurantsRatingData.rows.length,
            data: {

                restaurants: restaurantsRatingData.rows,
            },
        });

    } catch (err) {

        console.error(err);
    }

});


// Get a Restaurants

app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {


        let restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT  restaurant_id , COUNT(*) , TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1 ", [req.params.id]);

        let reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1 ", [req.params.id]);

        res.status(201).json({

            status: "Succes",
            data: {

                restaurant: restaurant.rows[0],
                reviews : reviews.rows

            },
        });

    } catch (err) {

        console.log(err);
    }

});



// Create  a Restaurants

app.post("/api/v1/restaurants", async (req, res) => {

    try {

        let results = await db.query("INSERT INTO restaurants (name , location , price_range) VALUES ( $1, $2, $3 ) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);

        res.status(201).json({

            status: "Succes",
            data: {

                restaurant: results.rows[0],
            },
        });

    } catch (err) {

        console.error(err);
    }



}
);


// Update a Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        let results = await db.query("UPDATE restaurants SET name = $1 , location = $2 , price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range , req.params.id]);

        res.status(200).json({

            status: "Succes",
            data: {
    
                restaurants: results.rows[0],
            },
        });

    } catch (err) {

        console.error(err);

    }

    

}
);


// Delete a Restaurants

app.delete("/api/v1/restaurants/:id", async(req, res) => {

   try{

    let results = await db.query("DELETE FROM restaurants WHERE id = $1 " , [req.params.id]);

   } catch (err){

        console.error(err);

   }
    res.status(204).json({

        status: "Succes",
        data: {

            restaurants: ["macdonalds", "wendys"],
        },
    });

}
);

// Add a review 

app.post("/api/v1/restaurants/:id/addReview" , async(req,res) =>{

    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id , name , review ,rating) VALUES ($1,$2,$3,$4) returning * ;",[req.params.id,req.body.name,req.body.review,req.body.rating]);

        res.status(201).json({
            status : "success",
            data : {

                review : newReview.rows[0],
            }
        })

    } catch (error) {
        console.error(error);
    }
});
 
app.listen(port, () => {

    console.log(`Server is up and listening on port ${port}`);
});