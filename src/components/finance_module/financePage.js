import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import BASE_URL from "../BASE_URL";
function FinancePage() {

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
            <div className="p-2 bg-white shadow-lg rounded-lg">
                <button className="border-2 px-4 py-2 text-xl font-bold w-64 mb-4 rounded-md border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none" onClick={()=>history.push("/calculateperday")}>Calculate Sales and Expense by Day</button>
                <br />
                <button className="border-2 px-4 py-2 text-xl font-bold w-64 mb-4 rounded-md border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none" onClick={()=>history.push("/calculatepermonth")}>Calculate Sales and Expense by Month</button>

                <br />
                <button className="border-2 px-4 py-2 text-xl font-bold w-64 mb-4 rounded-md border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none" onClick={()=>history.push("/calculateperyear")}>Calculate Sales and Expense by Year</button>

            </div>
            </div>
        </div>
    )
}

export default FinancePage
