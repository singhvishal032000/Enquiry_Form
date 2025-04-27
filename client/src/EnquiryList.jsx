import React from "react";
import { Button, Checkbox, Label, TableCell, TextInput, Textarea } from "flowbite-react";
import { Table } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export function EnquiryList({ data,getAllenquiry,Swal,setFormData}) {
   let deleteRow=(delid)=>{
    Swal.fire({
      title: "Do you want to delete the data?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save"
    }).then((result) => {
      
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
        .then((res)=>{
          toast.success("Enquiry Delete Successfully");
          getAllenquiry();
        })
      
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
        
   }

   let editRow=(edited)=>{
       
    axios.get(`http://localhost:8000/api/website/enquiry/single/${edited}`)
    .then((res)=>{
        let data=res.data;
        setFormData(data.enquiry);

    })
   }
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            { data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.message}</Table.Cell>
                  <Table.Cell>
                    <button onClick={()=>deleteRow(item._id)} className="bg-red-500 text-white px-4 py-1 rounded-md">Delete</button>
                  </Table.Cell>
                  <Table.Cell><button onClick={()=>editRow(item._id)} className="bg-blue-500 text-white px-4 py-1 rounded-md">Edit</button></Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan="7" className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                  No Data Found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
