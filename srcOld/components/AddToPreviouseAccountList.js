import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import BASE_URL from "./BASE_URL";

function AddToPreviouseAccountList() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


    const [ListOfAccout, setListOfAccout] = useState([])
useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/list_of_add_to_previous_account.php`)
    .then(response=>{
        setListOfAccout(response.data)
    })

    return () => {
        
    }
}, [])

const [searchCustomer, setsearchCustomer] = useState("");


const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }
  const filteredCustomer=ListOfAccout.filter(mo=>mo.customer_name.toLowerCase().includes(searchCustomer.toLowerCase()))

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
                <h1 className="text-center font-semibold">List of Previous Account To Customer Ograyi</h1>
                
            <input type="text" className="px-2 py-1 border focus:outline-none border-blue-400 rounded-md w-60" value={searchCustomer} onChange={(e)=>setsearchCustomer(e.target.value)} placeholder="Search Customer by Name" />

                <table className="w-full my-6">
                        {
                            filteredCustomer.length===0 && <h1 className="text-center font-bold my-3">No Result</h1>
                        }
                        {
                            filteredCustomer.length >0 && <thead>
                                <tr>
                                    <th className="border border-black">Customer Name</th>
                                    <th className="border border-black">Customer Address</th>
                                    <th className="border border-black">Description</th>
                                    <th className="border border-black">Amount</th>
                                    <th className="border border-black">Entry Date</th>
                                </tr>
                            </thead>
                        }
                        {
                            filteredCustomer.length >0 && filteredCustomer.map(list=>(
                                <tbody>
                                    <tr>
                                        <th className="border border-black">{list.customer_name}</th>
                                        <th className="border border-black">{list.address}</th>
                                        <th className="border border-black">{list.description}</th>
                                        <th className="border border-black">{list.amount}</th>
                                        <th className="border border-black">{list.entry_date} --- {DateChangerFromGerordgiaToSolarDate(list.entry_date)}</th>
                                    </tr>
                                </tbody>
                            ))
                        }
                </table>
            </div>
            </div>
        </div>
    )
}

export default AddToPreviouseAccountList
