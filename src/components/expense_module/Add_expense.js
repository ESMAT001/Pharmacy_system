import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import BASE_URL from "../BASE_URL";
function AddExpense() {
    const [description, setDescription] = useState("");
    const [Amount, setAmount] = useState(0);
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


const formHandlerExpense=(browser)=>{
    browser.preventDefault();
    var formData=new FormData()
    formData.append("description",description)
    formData.append("amount",Amount)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expense_module/add_expense.php`,jsonData)
    .then(response=>{
       if(response.data.status==="true"){
            history.push("/expenseList")
       }else{
           console.log(response.data)
       }
    })
}



    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
               <h1 className="text-lg text-center font-bold">Add Expense</h1>
               <div className="p-2">
               <form className="text-center" onSubmit={formHandlerExpense}>
                   <input type="text" placeholder="Description" className="focus:outline-none w-96 border border-blue-400 p-2 rounded-md" onChange={(e)=>setDescription(e.target.value)} required/>
                   <br />
                   <input type="number" min="0" placeholder="Amount" className="focus:outline-none mt-4 w-96 border border-blue-400 p-2 rounded-md"  onChange={(e)=>setAmount(e.target.value)}  required/>
                   <br />

                   <input type="submit" value="Add" className="cursor-pointer focus:outline-none bg-blue-400 text-white font-bold mt-4 w-56  border border-blue-400 p-2 rounded-md" />
                   <br />
               </form>
               </div>
            </div>
            </div>
        </div>
    )
}

export default AddExpense
