let express=require("express");
let mongoose=require('mongoose');
var bodyParser = require('body-parser')
let cors=require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
// configure to dotenv file
require('dotenv').config();
let app=express();
app.use(cors());
app.use(bodyParser.json());
//Routes
app.use('/api/website/enquiry',enquiryRouter);

//connect to mongoose
mongoose.connect(process.env.DBURL).then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log("Server is running");
    });
    console.log("Connect to MongoDB");
}).catch((error)=>{
    console.log(error);
});