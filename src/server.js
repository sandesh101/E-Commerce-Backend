//This is the main file of our backend project
//Initilizing Express
const express = require("express");
//Initilizing Different Packages
const bodyParser = require("body-parser");
const helmet = require("helmet"); //=> Helmet is used for securing the HTTP Headers
const morgan = require("morgan"); //=> Morgan is used to keep the logs of request details
const cors = require("cors"); //=> Middleware 
const mongoose = require("mongoose");

//FOR ROUTE MIDDLEWARE  
const UserRoutes = require("./routes/user_routes");
const CategoryRoutes = require("./routes/category_routes");
const ProductRoutes = require("./routes/product_routes");
const CartRoutes = require("./routes/cart_routes");


const app = express();


//Defining the PORT
const PORT = 5000;

//Setting up the Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


//Using ROUTE Middleware
app.use("/api", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);


//Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>{
    console.log("Database Connection Successfull");
}).catch((err)=>{
    console.log(err);
})


//Defining HOME Route
app.get("/", (req,res)=>{
    res.send("Hello world || Ecommerce-Backend");
})


//Making the server listen to PORT
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
})
