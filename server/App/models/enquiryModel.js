let mongoose=require("mongoose");
let enquirySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
let enquiryModel=mongoose.model('Enquiry',enquirySchema);
module.exports=enquiryModel;