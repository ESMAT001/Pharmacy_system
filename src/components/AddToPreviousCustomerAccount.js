import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "./BASE_URL";

function AddToPreviousCustomerAccount() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [CustomerList, setCustomerList] = useState([])
useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
    .then(res=>{
        setCustomerList(res.data);
        
    })
    return () => {
        
    }
}, [])

const [CustomerIdFromSelect, setCustomerIdFromSelect] = useState(0);
const [AmountFromSelect, setAmountFromSelect] = useState(0)
const [DescriptionForPreviousAccount, setDescriptionForPreviousAccount] = useState("")

const accountFormSubmit=(browser)=>{
    browser.preventDefault()
    var formData=new FormData()
    formData.append("customerId",CustomerIdFromSelect)
    formData.append("amount",AmountFromSelect)
    formData.append("description",DescriptionForPreviousAccount)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/add_to_previouse_account.php`,jsonData)
    .then(response=>{
        if(response.data.status==="true"){
            history.push("/addtopreviousaccountlist")
        }else{
            console.log(response.data)
        }
    })
    
}

const [SearchInputForCustomer, setSearchInputForCustomer] = useState("")

const filteredListOfcustomer=CustomerList.filter(li=>li.customer_name.toLowerCase().includes(SearchInputForCustomer.toLowerCase()))

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
                <input type="text" onChange={(e)=>setSearchInputForCustomer(e.target.value)} className="p-2 w-72 my-2 border border-blue-400 hover:border-blue-500 rounded-md focus:outline-none" placeholder="Search Customer by Name" />
                <form  className="text-center" onSubmit={accountFormSubmit}>
                <select onChange={(e)=>setCustomerIdFromSelect(e.target.value)}  className="font-bold px-2 py-3 focus:outline-none border border-blue-400 rounded-md w-72" required>
                    <option value="">Select Customer</option>
                    {
                        filteredListOfcustomer.length > 0 && filteredListOfcustomer.map(list=>(
                            <option value={list.customer_id} >{list.customer_name} {list.page_no} {list.address} {list.province}</option>
                        ))

                        
                    }
                </select>
                <div className="my-3">
                    <input type="text" value={DescriptionForPreviousAccount} onChange={(e)=>setDescriptionForPreviousAccount(e.target.value)} placeholder="Descrtiption" className="p-2 w-72 border border-blue-400 hover:border-blue-500 rounded-md focus:outline-none" required />
                </div>
                <div className="my-3">
                    <input type="number" placeholder="Amount" onChange={(e)=>setAmountFromSelect(e.target.value)} className="p-2 w-72 border border-blue-400 hover:border-blue-500 rounded-md focus:outline-none" min="0" required />
                </div>
                    <div className="my-3">
                    <input type="submit" className="px-3 bg-blue-400 hover:bg-blue-600 py-2 font-bold cursor-pointer text-white rounded-md" value="Add to Customer Account" />
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AddToPreviousCustomerAccount
