import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import BASE_URL from "../BASE_URL";
function LedgerReciptAdd() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


    useEffect(() => {
        fetchVisitorList()

        return () => {
           
        }
    }, [])

    const [PreviousBalance, setPreviousBalance] = useState(0)
    const [NewInvoicesAmount, setNewInvoicesAmount] = useState(0)
    const [TotalOfPreviousAndNew, setTotalOfPreviousAndNew] = useState(0)


    const [visitorList, setVisitorList] = useState([]);
    const [customerList, setCustomerList] = useState([])
    const fetchVisitorList=()=>{
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
        .then(response=>{
            setVisitorList(response.data)
            axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
            .then(response=>{
                setCustomerList(response.data)
            })
        })
    }
    const [visitorId, setVisitorId] = useState(0);

    const selectVisitorHandler=(e)=>{
        
        setVisitorId(e.target.value);
    }
    const [amount, setAmount] = useState(0);
    
    const [reciptNo, setReciptNo] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [date, setDate] = useState("");
    const formHandler=(browser)=>{
        browser.preventDefault();
        var formData=new FormData();
        formData.append("visitorId",visitorId)
        formData.append("amount",amount)
        formData.append("reciptNo",reciptNo)
        formData.append("customerId",customerId)
        formData.append("date",date)
        formData.append("previous_balance",PreviousBalance)
        formData.append("new_invoices",NewInvoicesAmount)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/ledger_recipt_add.php`,jsonData)
        .then(response=>{
            if(response.data.status==="true"){
                history.push("/ledgerReciptList");
            }else{
                console.log(response.data)
                alert("Please Fill inputs Properly");
                window.location.reload();
            }
        })
    }

const [SearchCustomerName, setSearchCustomerName] = useState("")
const filterCustomerList=customerList.filter(list=>list.customer_name.toLowerCase().includes(SearchCustomerName.toLowerCase()))




useEffect(() => {
      var formDataForCustomerId=new FormData()
      formDataForCustomerId.append('customerId',customerId)
        var convertedToJson=Object.fromEntries(formDataForCustomerId)
      axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/calculating_previousand_current_balance.php`,convertedToJson)
      .then(response=>{
          setPreviousBalance(response.data.previous_balance)
          setNewInvoicesAmount(response.data.new_invoices)
          setTotalOfPreviousAndNew(response.data.total_of_both)
      })



}, [customerId])



    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-4 bg-white shadow-lg rounded-lg">
               <form className="text-center" onSubmit={formHandler}>

<table>
<thead>
<tr>
        <th>Search Customer</th>
    
    <th>
                   <input type="text" className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Search Customer" value={SearchCustomerName} onChange={(e)=>setSearchCustomerName(e.target.value)} />

                   </th>
    </tr>
                   <tr>
                       <th>Select Customer</th>
                   <th>
               <select  className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " onChange={(e)=>setCustomerId(e.target.value)}  required>
                    <option >Select Customer</option>
                    {
                        filterCustomerList.length>0 && filterCustomerList.map(list=>(
                            <option key={list.customer_id} value={list.customer_id} >{list.customer_name +" "+ list.page_no +" " +" "+ list.address}</option>
                        ))
                    }
                </select>
                </th>
                </tr>
<tr>
    <th>Previous Balance</th>
<th>

<input type="text"
className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 "

value={PreviousBalance}

readOnly />
</th>
</tr>

<tr>
    <th>New Invoices</th>
<th>
<input type="text"
className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 "

value={NewInvoicesAmount}

readOnly />
</th>
</tr>
<tr>
    <th>Total of Both</th>
<th>
<input type="text"
value={TotalOfPreviousAndNew}


className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 "
readOnly />


</th>
</tr>

<tr>
    <th>Select Visitor</th>
<th>
                <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md px-3 py-1 mx-2 w-52 " onChange={selectVisitorHandler} required>
                    <option value="">Select Visitor</option>
                    {
                        visitorList.length>0 && visitorList.map(list=>(
                            <option key={list.visitor_id} value={list.visitor_id} >{list.name +" "+ list.last_name}</option>
                        ))
                    }
                </select>
                </th>
                </tr>
                <tr>
                    <th>Amount Received</th>
                <th>
                    <input type="number" min="0" className="border-2 border-blue-400 my-2 rounded-md px-2 py-1 w-52 focus:outline-none"  placeholder="Amount Received" onChange={(e)=>setAmount(e.target.value)}  required />
                    </th>
                    </tr>
                    <tr>
                        <th>Recipt no</th>
                    <th>
                    <input type="number" min="0" className="border-2 border-blue-400 my-2 rounded-md px-2 py-1 w-52 focus:outline-none"  placeholder="Recipt no" onChange={(e)=>setReciptNo(e.target.value)} required />
                    </th>
                    </tr>
                    <tr>
                    <th>Recipt Date</th>
               <th>

                <input type="Date" onChange={(e)=>setDate(e.target.value)} className="border-2 w-52 border-blue-200 mb-2 rounded-md px-2 py-1 focus:outline-none "  placeholder="Recipt Date" />
               
                </th>

                </tr>
                <tr>
                    <th></th>
                <th>
               <input type="submit" value="Save" className="w-32 cursor-pointer p-2 focus:bg-green-700 rounded-md bg-green-300 font-bold text-white text-md"/>
               </th>
               </tr>
               </thead>
               </table>
        
               </form>
            </div>
            </div>
        </div>
    )
}

export default LedgerReciptAdd
