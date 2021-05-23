import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
function AddNewInvoice() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    return (
        <div>
            {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-4 bg-white shadow-lg rounded-lg ">
                <div className="flex flex-col space-y-4 items-center">
                <button className="block text-center border-2 border-blue-400 p-2 rounded-lg font-bold hover:text-white hover:bg-blue-400 focus:outline-none focus:bg-blue-200" onClick={()=>history.push("/AddNewCustomerInvoice")}>New Customer</button>
                <button className="block text-center border-2 border-blue-400 p-2 rounded-lg font-bold hover:text-white hover:bg-blue-400 focus:outline-none focus:bg-blue-200">Previous Customer</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AddNewInvoice
