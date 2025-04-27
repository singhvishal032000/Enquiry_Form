let express=require('express');
const {enquiryInsert,enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdateRow} = require('../../controllers/web/enquiryController');



let enquiryRouter=express.Router();
enquiryRouter.post("/insert",enquiryInsert);
enquiryRouter.get("/view",enquiryList);
enquiryRouter.delete("/delete/:id",enquiryDelete);
enquiryRouter.get("/single/:id",enquirySingleRow);
enquiryRouter.put("/update/:id",enquiryUpdateRow);

module.exports=enquiryRouter;