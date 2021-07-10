import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function CustomerInvoiceListForPrint() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    const [InvoiceListsForModal, setInvoiceListsForModal] = useState([]);
    const [CustomerTotalBillsAmount, setCustomerTotalBillsAmount] = useState(0);
    const [CustomerTotalPaidAmount, setCustomerTotalPaidAmount] = useState(0)
    const [CustomerTotalRemainAmount, setCustomerTotalRemainAmount] = useState(0)
    const [TotalFromReturningMedicine, setTotalFromReturningMedicine] = useState(0)
    


    const [invoiceVisibility, setinvoiceVisibility] = useState("hidden")
    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
    useEffect(() => {
        
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            console.log(response.data)
            setCustomerListForSelect(response.data)
        })


        
    }, [])

    const customerSelectHandler=(e)=>{
        setinvoiceVisibility("")
        if(e.target.value===""){
            setinvoiceVisibility("hidden")

        }
        var formData=new FormData();
        formData.append("customerId",e.target.value);
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


const [SearchInputForSearch, setSearchInputForSearch] = useState("")

const filteredCustomers=CustomerListForSelect.filter(li=>li.customer_name.toLowerCase().includes(SearchInputForSearch.toLowerCase()))



    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 pb-2 flex justify-center no-print">
            <div className="p-2 bg-white shadow-lg rounded-lg">

          <div className="text-center mb-2">
          <input type="text" onChange={(e)=>setSearchInputForSearch(e.target.value)} placeholder="Search Customer"  className="p-2 font-bold max-w-max border rounded-md border-blue-400 focus:outline-none" />
          </div>
            <div>
                <select onChange={customerSelectHandler}  className="p-2 font-bold max-w-max border rounded-md border-blue-400 focus:outline-none">
                    <option value="">Select Customer</option>
                    {
                        filteredCustomers.length > 0 && filteredCustomers.map((list,id)=>(
                            <option value={list.customer_id}>{list.customer_name} {list.page_no} {list.address}  {list.province}</option>
                        ))
                    }
                </select>
            </div>



            </div>
            </div>

<div className={`bg-white p-2 ${invoiceVisibility}`} >
<div className="flex flex-row mb-4 justify-center ">
<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1 className="color_default">Total Invoice Amount</h1>
    <h1 className="color_default">{CustomerTotalBillsAmount}</h1>
</div>
<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1 className="color_default">Total Paid Amount</h1>
    <h1 className="color_default">{CustomerTotalPaidAmount}</h1>
</div>

<div className="bg-blue-400 p-2 mx-4 font-bold rounded-md text-white  text-center">
    <h1 className="color_default">Total Remain Amount</h1>
    <h1 className="color_default">{CustomerTotalRemainAmount}</h1>
</div>


<div className="bg-blue-400 p-2 mx-4 no-print font-bold rounded-md text-white  text-center">
    <h1>Total Return Medicine Amount </h1>
    <h1>{TotalFromReturningMedicine}</h1>
</div>


</div>

{
    InvoiceListsForModal.length >0 && <div className="p-2 no-print">
        <button className="bg-blue-400 hover:bg-blue-500 rounded-md text-white font-bold p-2" onClick={()=>window.print()}>Print</button>
    </div>
}


{
    InvoiceListsForModal.length >0 && <table className="w-full">
        <thead >
            <tr>
            <th className="border border-black">Invoice ID</th>
            <th className="border border-black">Customer Name</th>
            <th className="border border-black">Customer Address</th>
            <th className="border border-black">Customer Province</th>
            <th className="border border-black">Book Page No</th>
            <th className="border border-black">Visitor</th>
            <th className="border border-black">Total Invoice</th>
            <th className="border border-black">Paid Amount</th>
            <th className="border border-black">Remain</th>
            </tr>
        </thead>

            {
                InvoiceListsForModal.length>0 && InvoiceListsForModal.map((list,id)=>(
        <tbody key={id}>
            <tr>
                    <th className="border border-black">{list.invoice_id}</th>
                    <th className="border border-black">{list.customer_name}</th>
                    <th className="border border-black">{list.customer_address}</th>
                    <th className="border border-black">{list.customer_province}</th>
                    <th className="border border-black">{list.book_page_no}</th>
                    <th className="border border-black">{list.visitor_name+" "+ list.visitor_lastname}</th>
                    <th className="border border-black">{parseFloat(list.total_invoice).toFixed(2)}</th>
                    <th className="border border-black">{list.paid_amount}</th>
                    <th className="border border-black">{parseFloat(list.remain).toFixed(2)}</th>
                    </tr>

        </tbody>

                ))
            }
    </table>
}

            </div>
        </div>
    )
}

export default CustomerInvoiceListForPrint
