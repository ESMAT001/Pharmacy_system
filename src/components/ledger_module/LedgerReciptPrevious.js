import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import BASE_URL from "../BASE_URL";
function LedgerReciptPrevious() {

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

const [RemainingAmountFromPrevious, setRemainingAmountFromPrevious] = useState();

    const formHandler=(browser)=>{
        browser.preventDefault();
        var formData=new FormData();
        formData.append("visitorId",visitorId)
        formData.append("amount",amount)
        formData.append("reciptNo",reciptNo)
        formData.append("customerId",customerId)
        formData.append("date",date)
        var jsonData=Object.fromEntries(formData)
        if(amount<=RemainingAmountFromPrevious){
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/insert_in_previous_ledger.php`,jsonData)
            .then(response=>{
                if(response.data.status==="true"){
                    history.push("/ograyireciptlist")
                }else{
                    console.log(response.data)
                }
            })
        }else{
            alert("cant because Remain is less than paid")
        }

    }

const CustomerSelectHandler=(customerId)=>{
    setCustomerId(customerId)
    var formData=new FormData()
    formData.append("customerId",customerId)
    var dataToSend=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/remaining_previous_calculator.php`,dataToSend)
    .then(response=>{
        setRemainingAmountFromPrevious(response.data.remain)
    })


}
const [SearchInputCustomerName, setSearchInputCustomerName] = useState("")
const filteredCutomerList=customerList.filter(list=>list.customer_name.toLowerCase().includes(SearchInputCustomerName.toLocaleLowerCase()))

return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-center mb-4 font-bold">Ledger For Previous Account</h1>
               <form className="text-center" onSubmit={formHandler}>
               <input type="text" value={SearchInputCustomerName} onChange={(e)=>setSearchInputCustomerName(e.target.value)} className="border-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 mb-2" placeholder="Search Customer" />

                <br />

               <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " onChange={(e)=>CustomerSelectHandler(e.target.value)}  required>
                    <option >Select Customer</option>
                    {
                        filteredCutomerList.length>0 && filteredCutomerList.map(list=>(
                            <option key={list.customer_id} value={list.customer_id} >{list.customer_name +" "+ list.address}</option>
                        ))
                    }
                </select>
                    <br />

                    <input type="number" min="0" className="border-2 border-blue-400 my-2 rounded-md px-2 py-1 w-52 focus:outline-none"  value={RemainingAmountFromPrevious}   readOnly />



                <br />


                <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md px-3 py-1 mx-2 w-52 " onChange={selectVisitorHandler} required>
                    <option value="">Select Visitor</option>
                    {
                        visitorList.length>0 && visitorList.map(list=>(
                            <option key={list.visitor_id} value={list.visitor_id} >{list.name +" "+ list.last_name}</option>
                        ))
                    }
                </select>
                    <br />
                    <input type="number" min="0" className="border-2 border-blue-400 my-2 rounded-md px-2 py-1 w-52 focus:outline-none"  placeholder="Amount Received" onChange={(e)=>setAmount(e.target.value)}  required />
                    <br />
                    <input type="number" min="0" className="border-2 border-blue-400 my-2 rounded-md px-2 py-1 w-52 focus:outline-none"  placeholder="Recipt no" onChange={(e)=>setReciptNo(e.target.value)} required />
                    <br />

                    
              

                
                
                
                <input type="Date" onChange={(e)=>setDate(e.target.value)} className="border-2 w-52 border-blue-200 mb-4 rounded-md px-2 py-1 focus:outline-none "  placeholder="Recipt Date" />
               
               <br />
               <input type="submit" value="Save" className="w-32 cursor-pointer p-2 focus:bg-green-700 rounded-md bg-green-300 font-bold text-white text-md"/>
               </form>
            </div>
            </div>
        </div>
    )
}

export default LedgerReciptPrevious
