// In Enquiry component
import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import { EnquiryList } from './EnquiryList';

export default function Enquiry() {
    const [enquiryList, setEnquiryList] = useState([]);
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        message:"",
        _id:""
    });

     const saveEnquiry=async(e)=>{
        e.preventDefault();
        if(formData._id)
        {
            //update
           let response= await axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`,formData);
                toast.success("Enquiry Update Sussessfully");
                console.log(response.data);
                 // Refresh the enquiry list after saving
              getAllenquiry();

             // Clear form data
              setFormData({
               name:'',
               email:'',
               phone:'',
               message:'',
               _id:''
               
              });
              
        }
        else
        { 
            //insert
            try {
                const response = await axios.post('http://localhost:8000/api/website/enquiry/insert', formData);
                console.log(response);
                toast.success("Enquiry saved successfully");

           // Refresh the enquiry list after saving
           getAllenquiry();

           // Clear form data
              setFormData({
               name:'',
               email:'',
               phone:'',
               message:''
              });
           } catch (error) {
            console.error('There was an error!', error);
           }
       
        }
         
    };

    const getAllenquiry=async()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/website/enquiry/view');
            if (  response.data.satus) {
            
                setEnquiryList(response.data.enquiry); // Update state with fetched data
            }
        } catch (error) {
            console.error("Error fetching enquiry list", error);
        }
    }; 

    const getValue = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        let oldData = {...formData};
        oldData[inputName] = inputValue;
        setFormData(oldData);
    };

    useEffect(() => {
         getAllenquiry();
    }, []); 

    return (
        <div>
            <ToastContainer />
            <h1 className='text-[40px] text-center py-5 font-bold'>User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto] gap-40'>
                <div className='bg-gray-200 p-4'>
                    <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
                    <form onSubmit={saveEnquiry}>
                        <div className='py-4'>
                            <Label htmlFor='name' value='Name' />
                            <TextInput type='text' value={formData.name} onChange={getValue} name='name' placeholder='Enter your name' required />
                        </div>
                        <div className='py-4'>
                            <Label htmlFor='email' value='Email' />
                            <TextInput type='email' value={formData.email} onChange={getValue} name='email' placeholder='Enter your email' required />
                        </div>
                        <div className='py-4'>
                            <Label htmlFor='phone' value='Phone' />
                            <TextInput type='text' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter your phone' required />
                        </div>
                        <div className='py-4'>
                            <Label htmlFor='message' value='Message' />
                            <Textarea name='message' value={formData.message} onChange={getValue} placeholder='Enter your message...' required rows={4} />
                        </div>

                        <div className='py-4'>
                            <Button type="submit" className='w-[100%]'>
                                {formData._id? 'updat' : 'save'}
                            </Button>
                        </div>
                    </form>
                </div>
                <EnquiryList  data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData} />
            </div>
        </div>
    );
}
