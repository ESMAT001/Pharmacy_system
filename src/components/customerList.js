import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
function CustomerList() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [customerList, setCustomerList] = useState([]);
useEffect(() => {
    axios.get("http://localhost:8080/pharmacyproject/backend/customer_module/select_all_customer.php")
    .then(res=>{
        setCustomerList(res.data);
        
    })
    return () => {
        
    }
}, [])
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center ">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <table className="w-full">
                <thead className="bg-blue-400 text-white font-semibold shadow">
                    <tr className="bg-blue-400 text-white">
                        <th className="p-1">Customer Name</th>
                        <th className="p-1">Phone No</th>
                        <th className="p-1">Address</th>
                        <th className="p-1">Province</th>
                        <th className="p-1">List Of Bills</th>
                    </tr>
                </thead>

                <tbody  className="divide-y-2 divide-blue-300 ">
                    {
                        
                    customerList.length >0 && customerList.map(list=>(
                        <tr className="text-center" key={list.customer_id}>
                            <td>{list.customer_name}</td>
                            <td>{list.phone_no}</td>
                            <td>{list.address}</td>
                            <td>{list.province}</td>
                            <td  className="cursor-pointer text-green-400 font-bold">Bills Display</td>
                        </tr>


    ))
                    }      
                    </tbody> 
                </table>
            
            </div>
            </div>
        </div>
    )
}

export default CustomerList
