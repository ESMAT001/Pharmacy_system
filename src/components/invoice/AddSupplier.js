import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function AddSupplier() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


    const [InvoiceList, setInvoiceList] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/Add_supilier_in_invoice/list_of_invoice.php`)
        .then(response=>{
            setInvoiceList(response.data)
        })
        return () => {
            
        }
    }, [])

    const [AddSupplierModalVisibility, setAddSupplierModalVisibility] = useState(false);
    const customStyles = {
        content: {
          top: "0%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, 0%)",
        },
      };
      const [InvoiceIdFromModal, setInvoiceIdFromModal] = useState(0)
      const [VisitorListFormModal, setVisitorListFormModal] = useState([]);
      const SupplierModalDisplay=(invoiceId)=>{
          setAddSupplierModalVisibility(true);
          setInvoiceIdFromModal(invoiceId)
          axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
          .then(response=>{
            setVisitorListFormModal(response.data)
          })
      }

const [VisitorIdFromModal, setVisitorIdFromModal] = useState(0)

const submitModalFormForAddSupplier=(browser)=>{
    browser.preventDefault();
    var formData=new FormData();
    formData.append("invoiceId",InvoiceIdFromModal)
    formData.append("visitorId",VisitorIdFromModal)
    var jsonData=Object.fromEntries(formData);

    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/Add_supilier_in_invoice/update_invoice_table_supplier_id.php`,jsonData)
    .then(response=>{
        if(response.data.status==="true"){
            alert("Supplier Successfully Added")
            history.push("/invoiceList")
        }else{
            console.log(response.data)
        }
    })


}

    return (

        

        <div>
        <Modal
        isOpen={AddSupplierModalVisibility}
        
        style={customStyles}
        contentLabel="Example Modal"
        className="w-auto p-4 rounded mt-16 absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
      >
            
        <div>
            <h1 className="font-bold text-center inline text-xl">Add Supplier</h1>    
                <div className="font-bold cursor-pointer ml-40 inline float-right" onClick={()=> setAddSupplierModalVisibility(false)}>X</div>
        </div>   
        <hr className="my-3 border-2 border-gray-300" /> 
        <div>
            <form onSubmit={submitModalFormForAddSupplier}>
                <table cellPadding="10px">
                    <thead>
                    <tr>
                        <th>Select Supplier </th>
                        <td>
                            <select className="border border-blue-400 p-2 rounded-md font-bold" onChange={(e)=> setVisitorIdFromModal(e.target.value)} required>
                                <option value="">Select One Supplier</option>
                                {
                                    VisitorListFormModal.length >0 && VisitorListFormModal.map(list=>(
                                        <option value={list.visitor_id}>{list.name} {list.last_name}</option>
                                    ))
                                }
                            </select>


                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="text-center">
                            <input type="submit" className="cursor-pointer bg-blue-400 hover:bg-blue-600 font-bold px-3 py-2 text-white rounded-md" value="Add Supplier" />
                        </td>
                    </tr>
                    </thead>
                </table>

            </form>
        </div>

    </Modal>


             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
                <table className="w-full">
                    {
                        InvoiceList.length >0 &&
                        <thead>
                            <tr>
                            <th className="border border-black">Invoice ID</th>
                            <th className="border border-black">Customer Name</th>
                            <th className="border border-black">Visitor Name</th>
                            <th className="border border-black">Customer Address</th>
                            <th className="border border-black">Customer Phone No</th>
                            <th className="border border-black"></th>
                        </tr>
                        </thead>
                        
                    }
                    {
                        InvoiceList.length > 0 && InvoiceList.map(list=>(
                            <tbody>
                                <tr>
                                <th className="border border-black">{list.invoice_id}</th>
                                <th className="border border-black">{list.customer_name}</th>
                                <th className="border border-black">{list.visitor_name}</th>
                                <th className="border border-black">{list.customer_address}</th>
                                <th className="border border-black">{list.customer_phone}</th>
                                <th className="border border-black text-green-500 hover:text-green-600 cursor-pointer" onClick={()=>SupplierModalDisplay(list.invoice_id)}>Add Supplier </th>
                                </tr>
                            </tbody>
                        ))
                    }

                    {
                        InvoiceList.length ===0 && <h1 className="font-bold text-center">No Invoice for Adding Supplier </h1>
                    }
                </table>
            </div>
            </div>
        </div>
    )
}

export default AddSupplier
