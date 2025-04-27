let express=require('express');
const enquiryModel = require('../../models/enquiryModel');
let enquiryInsert=(req,res)=>{
    console.log(req.body);
        let {name,email,phone,message}=req.body;
        let enquiry=new enquiryModel({
            name,email,phone,message
        });
        enquiry.save().then(()=>{
            res.send({status:1,message:"Enquiry saved Successfully"});
        }).catch((error)=>{
            res.send({status:0,message:"Error while saving enquiry",err:error});
    })
    }
    let enquiryList=async(req,res)=>{
        let enquiry=await enquiryModel.find();
        res.status(200).json({satus:1,message:"Enquiry List",enquiry:enquiry});
    }
    let enquiryDelete=async(req,res)=>{
        let enId=req.params.id;
        let enquiry=await enquiryModel.deleteOne({_id:enId});
        res.send({status:1,message:"Enquiry Delete Successfully",enquiry});
    }
    let enquirySingleRow=async(req,res)=>{
        let enId=req.params.id;
        let enquiry=await enquiryModel.findOne({_id:enId});
        res.send({status:1,enquiry});
    } 
    let enquiryUpdateRow=async(req,res)=>{
        let enquiryId=req.params.id;
        let {name,email,phone,message}=req.body;
        let updateObj={
            name,
            email,
            phone,
            message
        }
        let updateRes=await enquiryModel.updateOne({_id:enquiryId},updateObj);
        res.send({status:1,message:"Enquiry Update Successfully",updateRes});

    }
    module.exports={enquiryInsert,enquiryList,enquiryDelete,enquirySingleRow,enquiryUpdateRow};