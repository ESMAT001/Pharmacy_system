import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";


function InvoicesWithProfit() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    


    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
    const [bodyVisibility, setbodyVisibility] = useState("hidden")
    const [VisitorList, setVisitorList] = useState([])
    const [InvoiceListsWithProfit, setInvoiceListsWithProfit] = useState([])
        useEffect(() => {
        
            axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
            .then(response=>{
                setCustomerListForSelect(response.data)
            })
            axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
            .then(response=>{
                setVisitorList(response.data)
            })


    
          
        }, [])




        const customerSelectHandler=(e)=>{
            if(e.target.value===""){
                setbodyVisibility("hidden")
            }
            setbodyVisibility("")
            var formData=new FormData();
            formData.append("customerId",e.target.value)
            var convertedToJson=Object.fromEntries(formData)
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/invoiceWithProfit.php`,convertedToJson)
            .then(response=>{
                setInvoiceListsWithProfit(response.data)
            })
        }
        


const [SearchCustomer, setSearchCustomer] = useState("")


const filteredList=CustomerListForSelect.filter(li=>li.customer_name.toLowerCase().includes(SearchCustomer.toLowerCase()))

const visitorFinder=(visitorId)=>{
   const filteredListOfVisitor=VisitorList.filter(list=>list.visitor_id.includes(visitorId))
   var name="";
   filteredListOfVisitor.map(list=>{
        name=list.name +"  "+list.last_name;
   })
   return name;
}

const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
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

const [invoiceModalVisibility, setinvoiceModalVisibility] = useState(false)
const [InvoiceItemListWithProfit, setInvoiceItemListWithProfit] = useState([])

const invoiceDetailsHanlder=(invoiceId)=>{
    setinvoiceModalVisibility(true)

    var DataSend=new FormData();

    DataSend.append("invoiceId",invoiceId)
    var convertedToJson=Object.fromEntries(DataSend)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/per_invoice_item_profit.php`,convertedToJson)
    .then(response=>{
        setInvoiceItemListWithProfit(response.data)
    })

}


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
            <div className="text-center pb-3">
                <input type="text" value={SearchCustomer} onChange={(e)=>setSearchCustomer(e.target.value)} className="p-2 font-bold max-w-max border rounded-md border-blue-400 focus:outline-none" placeholder="Search Customer" />
            </div>

        <div>
                <select onChange={customerSelectHandler}  className="p-2 font-bold max-w-max border rounded-md border-blue-400 focus:outline-none">
                    <option value="">Select Customer</option>
                    {
                        filteredList.length > 0 && filteredList.map((list,id)=>(
                            <option ksy={id} value={list.customer_id}>{list.customer_name} {list.page_no} {list.address}  {list.province}</option>
                        ))
                    }
                </select>
            </div>


            </div>
            </div>
            <div className={ `bg-white mt-3 p-3  ${bodyVisibility}`}>
               {
                   InvoiceListsWithProfit.length === 0 && <h1 className="text-center font-bold text-2xl">No Data Found</h1>
               }

<table className="w-full">
                {
                   InvoiceListsWithProfit.length >0 && <thead>
                       <tr>
                           <th className="border border-black">Invoice No .</th>
                           <th className="border border-black">Visitor Name </th>
                           <th className="border border-black">Supplier Name</th>
                           <th className="border border-black">Invoice Date</th>
                           <th className="border border-black">Total Amount of Invoice</th>
                           <th className="border border-black">Total Profit</th>
                           <th className="border border-black">Total Loss</th>
                       </tr>
                   </thead>
               }
            {
                InvoiceListsWithProfit.length >0 && InvoiceListsWithProfit.map((list,id)=>(
                    <tbody key={id}>
                        <tr className="hover:bg-blue-300 cursor-pointer" onClick={()=>invoiceDetailsHanlder(list.invoice_id)}>
                            <th className="border border-black">{list.invoice_id}</th>
                            <th className="border border-black">{visitorFinder(list.visitor_id)}</th>
                            <th className="border border-black">{visitorFinder(list.supplier_id)}</th>

                            <th className="border border-black">{list.invoice_date} --- {DateChangerFromGerordgiaToSolarDate(list.invoice_date)}</th>

                            <th className="border border-black">{parseFloat(list.total_of_invoice).toFixed(2)}</th>
                            <th className="border border-black">{parseFloat(list.advantage).toFixed(2)}</th>
                            <th className="border border-black">{parseFloat(list.disadvantage).toFixed(2)}</th>
                        </tr>
                    </tbody>
                ))
            }

</table>


            </div>



<Modal 
isOpen={invoiceModalVisibility}
className=" mt-6 p-4 rounded absolute top-4 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 
<div className="mb-2">
<h1 className="text-md mr-10 float-left font-bold mb-2 text-center inline">
Invoice Details
</h1>
<div className="text-md inline float-right  ml-10 font-bold cursor-pointer" onClick={()=>setinvoiceModalVisibility(false)}>
x
    
</div>
</div>

<div className="my-3">
    <hr className="border border-gray-400 clear-both" />
</div>

<div>
{
    InvoiceItemListWithProfit.length ===0 && <h1 className="text-center font-bold text-2xl">No Data Found</h1>
}
<table className="w-full" cellPadding="5px">
{
    InvoiceItemListWithProfit.length >0 && <thead>
        <tr>
            <th className="border border-black">No.</th>
            <th className="border border-black">Product Name</th>
            <th className="border border-black">Generic Name</th>
            <th className="border border-black">Sell Quantity</th>
            <th className="border border-black">Cost Price</th>
            <th className="border border-black">Sell Price</th>
            <th className="border border-black">Total Profit</th>
            <th className="border border-black">Total Loss</th>
        </tr>
    </thead>
}

{
    InvoiceItemListWithProfit.length >0 && InvoiceItemListWithProfit.map((list,id)=>(
        <tbody key={id}>
            <tr>
                    <th className="border border-black">{id+1}</th>
                    <th className="border border-black">{list.product_name}</th>
                    <th className="border border-black">{list.generic_name}</th>
                    <th className="border border-black">{list.sell_pack_quantity}</th>
                    <th className="border border-black">{list.cost_price}</th>
                    <th className="border border-black">{parseFloat(list.sell_price).toFixed(2)}</th>
                    <th className="border border-black">{parseFloat(list.profit).toFixed(2)}</th>
                    <th className="border border-black">{parseFloat(list.loss).toFixed(2)}</th>
            </tr>
        </tbody>
    ))
}

</table>



</div>



</Modal>





        </div>
    )
}

export default InvoicesWithProfit
