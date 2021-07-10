import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "./BASE_URL";
import Modal from "react-modal";

function CustomerList() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [customerList, setCustomerList] = useState([]);
useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
    .then(res=>{
        setCustomerList(res.data);
        
    })
    return () => {
        
    }
}, [])
const customStyles2 = {
    content: {
      top: "10%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };

const [CustomerTotalBillsAmount, setCustomerTotalBillsAmount] = useState(0);
const [CustomerTotalPaidAmount, setCustomerTotalPaidAmount] = useState(0)
const [CustomerTotalRemainAmount, setCustomerTotalRemainAmount] = useState(0)
const [TotalFromReturningMedicine, setTotalFromReturningMedicine] = useState(0)


const [CustomerInvoicesDisplayModal, setCustomerInvoicesDisplayModal] = useState(false);
const [CustomerId, setCustomerId] = useState(0)
const [InvoiceListsForModal, setInvoiceListsForModal] = useState([]);
const ModalHandler=(customerId)=>{
setCustomerInvoicesDisplayModal(true);
var formData=new FormData();
formData.append("customerId",customerId);
var jsonData=Object.fromEntries(formData);
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/invoice_list_of_customers.php`,jsonData)
.then(response=>{
    setInvoiceListsForModal(response.data)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/total_of_by_sprcific_customer.php`,jsonData)
    .then(response=>{
        setCustomerTotalBillsAmount(response.data.total_amount)
        setCustomerTotalPaidAmount(response.data.total_paid)
        setCustomerTotalRemainAmount(response.data.remain_amount)
        setTotalFromReturningMedicine(response.data.total_return)
    })
})



}


const customStyles = {
    content: {
      top: "10%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };


const [CustomerEditInfoVisibility, setCustomerEditInfoVisibility] = useState(false);

const [CustomerNameForModal, setCustomerNameForModal] = useState("")
const [PhoneNoForModal, setPhoneNoForModal] = useState(0);
const [AddressForModal, setAddressForModal] = useState("")
const [ProvinceForModal, setProvinceForModal] = useState("")
const [CustomerIdForModal, setCustomerIdForModal] = useState(0);

const [ProvinceList, setProvinceList] = useState([])

const [ProvinceIdForCustomer, setProvinceIdForCustomer] = useState(0)
const EditInfoHandlerModal=(customerId)=>{
    setCustomerEditInfoVisibility(true)
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/province_list.php`)
    .then(response=>{
      setProvinceList(response.data)
    })

    const filteredList=customerList.filter(list=>list.customer_id.includes(customerId))
    filteredList.map(list=>{
        setCustomerIdForModal(list.customer_id)
        setCustomerNameForModal(list.customer_name)
        setAddressForModal(list.address)
        setPhoneNoForModal(list.phone_no)
        setProvinceForModal(list.province)
        setProvinceIdForCustomer(list.province_id_of_customer)

    })
    console.log(filteredList)

}


const FormHandlerForEditingCustomerInformation=(browser)=>{
    browser.preventDefault();
    var formData=new FormData();
    formData.append("customerId",CustomerIdForModal)
    formData.append("customerName",CustomerNameForModal)
    formData.append("phoneNo",PhoneNoForModal)
    formData.append("address",AddressForModal)
    formData.append("province",ProvinceIdForCustomer)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/edit_customer_information_details.php`,jsonData)
    .then(response=>{
        if(response.data.status==="true"){
            alert("data updated")
            window.location.reload()
        }else{
            console.log(response.data)
        }
    })

}



const [AddCustomerBookPageNoModalVisibility, setAddCustomerBookPageNoModalVisibility] = useState(false)

const [CutomerIdFromModal, setCutomerIdFromModal] = useState(0)
const [CustomerNameFromModal, setCustomerNameFromModal] = useState("")
const [CustomerAddressFormModal, setCustomerAddressFormModal] = useState("")
const [CustomerProvinceFromModal, setCustomerProvinceFromModal] = useState("")

const ModalDisplayOfAddingCustomerBookPageNo=(customerId)=>{
    setAddCustomerBookPageNoModalVisibility(true)
    var formDataForCustomerId=new FormData()
    formDataForCustomerId.append("customerId",customerId)
    var dataForSendCustomerId=Object.fromEntries(formDataForCustomerId)

    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_specific_customer_by_id.php`,dataForSendCustomerId)
    .then(response=>{
setCutomerIdFromModal(customerId)
setCustomerNameFromModal(response.data.customer_name)
setCustomerAddressFormModal(response.data.address)
setCustomerProvinceFromModal(response.data.province)
    })

}





const [BookPageNoForAddingNew, setBookPageNoForAddingNew] = useState("")

const AddBookPageNoFormSubmit=(browser)=>{
    browser.preventDefault();
   var formDataForAddPage=new FormData()
   formDataForAddPage.append("customerId",CutomerIdFromModal)
   formDataForAddPage.append("bookPageNo",BookPageNoForAddingNew)
   var dataForSendtoBackend=Object.fromEntries(formDataForAddPage)
   axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/add_customer_book_page_no.php`,dataForSendtoBackend)
   .then(response=>{
       if(response.data.status==="true"){
           alert("Book Page No Successfully Added")
        setAddCustomerBookPageNoModalVisibility(false)   
        window.location.reload()
           
       }else{
           console.log(response.data)
       }
   })

}



const [SearchInputForCustomerName, setSearchInputForCustomerName] = useState("")


const filteredCustomer=customerList.filter(mo=>mo.customer_name.toLowerCase().includes(SearchInputForCustomerName.toLowerCase()))


return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />


            {/* Invoice Details Information */}
<Modal 
isOpen={CustomerInvoicesDisplayModal}
className="w-full p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 
<div className="mb-2">
<h1 className="text-xl mb-2 text-center inline">
Customer Invoice Lists
</h1>
<div className="text-xl inline float-right font-bold cursor-pointer" onClick={()=>setCustomerInvoicesDisplayModal(false)}>
x
    
</div>
</div>

<hr className="mb-2"/>
<div className="flex flex-row mb-4 justify-center">
<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1>Total Invoice Amount</h1>
    <h1>{CustomerTotalBillsAmount}</h1>
</div>
<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1>Total Paid Amount</h1>
    <h1>{CustomerTotalPaidAmount}</h1>
</div>

<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1>Total Remain Amount</h1>
    <h1>{CustomerTotalRemainAmount}</h1>
</div>


<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1>Total Return Medicine Amount </h1>
    <h1>{TotalFromReturningMedicine}</h1>
</div>


</div>

{
    InvoiceListsForModal.length >0 && <table className="w-full">
        <thead className="bg-blue-400 text-white p-2">
            <th>Invoice ID</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Province</th>
            <th>Book Page No</th>
            <th>Visitor</th>
            <th>Total Invoice</th>
            <th>Paid Amount</th>
            <th>Remain</th>
        </thead>

            {
                InvoiceListsForModal.length>0 && InvoiceListsForModal.map(list=>(
        <tbody>

                    <th>{list.invoice_id}</th>
                    <th>{list.customer_name}</th>
                    <th>{list.customer_address}</th>
                    <th>{list.customer_province}</th>
                    <th>{list.book_page_no}</th>
                    <th>{list.visitor_name+" "+ list.visitor_lastname}</th>
                    <th>{parseFloat(list.total_invoice).toFixed(2)}</th>
                    <th>{list.paid_amount}</th>
                    <th>{parseFloat(list.remain).toFixed(2)}</th>


        </tbody>

                ))
            }
    </table>
}

</Modal>

            {/* End of Invoice Details Information */}

            <div className="p-16 flex justify-center ">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">

    <div className="pb-2">
        <input type="text" onChange={(e)=>setSearchInputForCustomerName(e.target.value)} className="font-bold p-2 font-bold rounded-md border border-blue-400" placeholder="Search Customer by Name" />
    </div>
                <table className="w-full" >
                <thead className="bg-blue-400 text-white font-semibold shadow">
                    <tr className="bg-blue-400 text-white">
                        <th className="p-1">Customer Name</th>
                        <th className="p-1">Customer Book Page No</th>

                        <th className="p-1">Phone No</th>
                        <th className="p-1">Address</th>
                        <th className="p-1">Province</th>
                        <th className="p-1">List Of Bills</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody  className="divide-y-2 divide-blue-300 ">
                    {
                        
                        filteredCustomer.length >0 && filteredCustomer.map(list=>(
                        <tr className="text-center" key={list.customer_id}>
                            <td>{list.customer_name}</td>
                            <td>{list.page_no}</td>
                            <td>{list.phone_no}</td>
                            <td>{list.address}</td>
                            <td>{list.province}</td>
                            <td  className="cursor-pointer text-green-400 font-bold" onClick={()=>ModalHandler(list.customer_id)}>Bills Display</td>
                            <td onClick={()=>EditInfoHandlerModal(list.customer_id)} className="font-bold text-red-500 hover:text-red-600 cursor-pointer" >Edit Info</td>
                            <td className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer" onClick={()=>ModalDisplayOfAddingCustomerBookPageNo(list.customer_id)}>Add Book Page No</td>
                        </tr>


    ))
                    }      
                    </tbody> 
                </table>
            
            </div>
            </div>


        <Modal
        isOpen={CustomerEditInfoVisibility}
        className=" p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}>

<div>
    <h1 className="text-xl font-bold text-center inline mx-24">Edit Customer Information</h1>
    <span className="font-bold float-right cursor-pointer" onClick={()=>setCustomerEditInfoVisibility(false)}>X</span>
    <hr className="my-3"/>

</div>


<div className="flex justify-center">
    <form onSubmit={FormHandlerForEditingCustomerInformation}>
        <table cellPadding="4">
            <tbody>
                <tr>
                    <td><label className="font-bold mx-4">Customer Name</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setCustomerNameForModal(e.target.value)} value={CustomerNameForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Phone No</label></td>
                    <td><input type="number" min="0" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setPhoneNoForModal(e.target.value)} value={PhoneNoForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Address</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setAddressForModal(e.target.value)} value={AddressForModal} /></td>
                </tr>

                <tr>
                    <td><label className="font-bold mx-4">Province</label></td>
                    <td>
                        <select className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md w-full" onChange={(e)=>setProvinceIdForCustomer(e.target.value)} required>
                            <option value={ProvinceIdForCustomer}>{ProvinceForModal}</option>

                            {
                                ProvinceList.length > 0 && ProvinceList.map((list,id)=>(
                                    <option value={list.province_id}>{list.province_name}</option>
                                ))
                            }
                        </select>
                        
                        </td>
                </tr>
                <tr>
                  <td>

                  </td>
                  <td className="text-center">
                      <input className="cursor-pointer bg-blue-400 hover:bg-blue-500 focus:outline-none  py-2 px-6 rounded-md font-bold text-white" value="Edit" type="submit"/>
                  </td>
                </tr>
                
            </tbody>
        </table>
    </form>
</div>



        </Modal>

        <Modal 
isOpen={AddCustomerBookPageNoModalVisibility}
className=" mt-6 p-4 rounded absolute top-4 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles2}
> 

<div className="mb-2">
<h1 className="text-md mr-10 float-left font-bold mb-2 text-center inline">
Add Book Page No
</h1>
<div className="text-md inline float-right  ml-10 font-bold cursor-pointer" onClick={()=>setAddCustomerBookPageNoModalVisibility(false)}>
x
    
</div>
</div>
<hr className="mb-2 border border-gray-400 clear-both"/>
<div>
 <table className="w-full">
     <thead>
     <th>Customer Name: {CustomerNameFromModal}</th>

     </thead>
     <thead>
         <th>Customer Address: {CustomerAddressFormModal}</th>
     </thead>
     <thead>
         <th>Customer Province: {CustomerProvinceFromModal}</th>
     </thead>

        
 </table>
 <div className="my-4">

 <form onSubmit={AddBookPageNoFormSubmit}>

     <div className="text-center">
     <input type="text" className="border border-blue-400 focus:outline-none p-2 rounded-md" placeholder="Book Page no" onChange={(e)=>setBookPageNoForAddingNew(e.target.value)}  required/>
     </div>
     <div className="text-center mt-5">
      <input type="submit" value="Add Book Page No"  className="cursor-pointer bg-blue-400 hover:bg-blue-600 p-2 text-white font-bold rounded-md" />   
    </div>       
</form>
</div>

</div>

</Modal>


 
        </div>
    )
}

export default CustomerList
