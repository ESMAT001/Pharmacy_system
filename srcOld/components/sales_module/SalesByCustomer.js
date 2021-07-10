import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function SalesByCustomer() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    const [CustomerListWithTotalPurchase, setCustomerListWithTotalPurchase] = useState([])
useEffect(() => {
   axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sales_by_customer.php`)
   .then(response=>{
       setCustomerListWithTotalPurchase(response.data)
   })
   
}, [])
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
  const [CustomerSaleInformationModalDisplay, setCustomerSaleInformationModalDisplay] = useState(false)
const [CustomerSaleInformationForModal, setCustomerSaleInformationForModal] = useState([])
const customerSellDetails=(customerId)=>{
setCustomerSaleInformationModalDisplay(true)
var customerIdForm=new FormData()
customerIdForm.append("customerId",customerId)
var customerIdForSend=Object.fromEntries(customerIdForm)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sale_report_by_customer.php`,customerIdForSend)
.then(response=>{
    setCustomerSaleInformationForModal(response.data)
})


}

const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
                {
                    CustomerListWithTotalPurchase.length===0 && <h1 className="font-bold text-center">
                        No Result
                    </h1>
                }

                <table className="w-full" cellPadding="5px">
                    {
                        CustomerListWithTotalPurchase.length > 0 &&
                        <thead>
                            <th className="border border-black">Customer Name</th>
                            <th className="border border-black">Customer Address</th>
                            <th className="border border-black">Customer Province</th>
                            <th className="border border-black">Total Purchase</th>
                        </thead>
                    }

                    {
                        CustomerListWithTotalPurchase.length > 0 && CustomerListWithTotalPurchase.map(list=>(
                            <tbody>
                                <tr className="cursor-pointer hover:bg-blue-200" onClick={()=>customerSellDetails(list.customer_id)}>
                                    <th className="border border-black">{list.customer_name}</th>
                                    <th className="border border-black">{list.customer_address}</th>
                                    <th className="border border-black">{list.customer_province}</th>
                                    <th className="border border-black">{list.total_purchase}</th>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
            </div>

            <Modal 
isOpen={CustomerSaleInformationModalDisplay}
className=" mt-6 p-4 rounded absolute top-4 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 

<div className="mb-2">
<h1 className="text-md mr-10 float-left font-bold mb-2 text-center inline">
Customer Purchase Information
</h1>
<div className="text-md inline float-right  ml-10 font-bold cursor-pointer" onClick={()=>setCustomerSaleInformationModalDisplay(false)}>
x
    
</div>
</div>
<hr className="mb-2 border border-gray-400 clear-both"/>

<div>
{
    CustomerSaleInformationForModal.length===0 && <h1 className="font-bold text-center">
        No Result
    </h1>
}

<table className="w-full" cellPadding="5px">

{
    CustomerSaleInformationForModal.length >0 && <thead>
        <tr>
            <th className="border border-black">Customer Name</th>
            <th className="border border-black">Customer Address</th>
            <th className="border border-black">Customer Province</th>
            <th className="border border-black">Product Name</th>
            <th className="border border-black">Total Quantity</th>
            <th className="border border-black">Total Amount</th>
            <th className="border border-black">Purchase Date</th>
        </tr>
    </thead>
}

{
    CustomerSaleInformationForModal.length >0 && CustomerSaleInformationForModal.map(list=>(
        <tbody>
            <tr>
                <th className="border border-black">{list.customer_name}</th>
                <th className="border border-black">{list.customer_address}</th>
                <th className="border border-black">{list.customer_province}</th>
                <th className="border border-black">{list.product_name}</th>
                <th className="border border-black">{list.pack_quantity}</th>
                <th className="border border-black">{list.total_purchase}</th>
                <th className="border border-black">{list.invoice_date} --- {DateChangerFromGerordgiaToSolarDate(list.invoice_date)}</th>
            </tr>
        </tbody>
    ))
}

</table>


</div>
<div className="my-4 text-center">
    <button className="bg-blue-400 text-white font-bold p-2 rounded-md hover:bg-blue-600" onClick={()=>setCustomerSaleInformationModalDisplay(false)}>Close</button>
</div>

</Modal>


        </div>
    )
}

export default SalesByCustomer
