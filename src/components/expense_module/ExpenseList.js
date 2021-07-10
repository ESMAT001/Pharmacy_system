import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {BrowserRouter, useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";

function ExpenseList() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [searchDate, setSearchDate] = useState(formatYearAndMonth())
    function formatYearAndMonth() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month].join('-');
    }


    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }
    const [dateDisplay, setDateDisplay] = useState(formatDate())
    const dateHandler=(e)=>{
        var splitedDate=e.target.value.split("-");
        var monthAndYear=splitedDate[0]+"-"+splitedDate[1];
        setSearchDate(monthAndYear);
        setDateDisplay(e.target.value);

       }
       const [expenseList, setExpenseList] = useState([]);
       const [totalExpense, setTotalExpense] = useState(0);
       useEffect(() => {
        var formData=new FormData();
        formData.append("date",searchDate)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expense_module/expense_list.php`,jsonData)
        .then(response=>{
            setExpenseList(response.data)
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expense_module/total_expense_month.php`,jsonData)
            .then(response=>{
                setTotalExpense(response.data.total)
            })

        })

           return () => {
           }
       }, [searchDate])

      const deleteOneExpenseItem=(expenseId)=>{
        var formData=new FormData();
        formData.append("expenseId",expenseId)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expense_module/delete_one_item_expense.php`,jsonData)
        .then(response=>{
            if (response.data.status==="true"){
                window.location.reload();
            }else{
                console.log(response.data)
            }
        })
      }

      const [ListOfExpneseVisibility, setListOfExpneseVisibility] = useState(false)

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

const [DescriptionForModal, setDescriptionForModal] = useState("")
const [ExpenseAmountForModal, setExpenseAmountForModal] = useState(0)
const [ExpiredateForModal, setExpiredateForModal] = useState("")
const [ExpenseIdForModal, setExpenseIdForModal] = useState(0)
const EditOneExpenseItem=(expenseId)=>{
    setListOfExpneseVisibility(true)
    var filteredExpenseList=expenseList.filter(list=>list.expense_id.includes(expenseId))
    filteredExpenseList.map(list=>{
        setDescriptionForModal(list.description)
        setExpenseAmountForModal(list.amount)
        setExpiredateForModal(list.expense_date)
        setExpenseIdForModal(list.expense_id)
    })
}

const EditExpneseHandlerModal=(browser)=>{
browser.preventDefault();
var formData=new FormData()
formData.append("expense_id",ExpenseIdForModal)
formData.append("description",DescriptionForModal)
formData.append("expenseAmount",ExpenseAmountForModal)
formData.append("expenseDate",ExpiredateForModal)
var jsonData=Object.fromEntries(formData)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expense_module/edit_expense_info.php`,jsonData)
.then(response=>{
    if(response.data.status==="true"){
        setListOfExpneseVisibility(false)
        alert("Data Edited Successfully")
        window.location.reload()
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

<Modal 
isOpen={ListOfExpneseVisibility}
className=" p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 
<div className="mb-2">
<h1 className="text-xl mb-2 mr-56 text-center inline">
Edit Expnense Info
</h1>
<div className="text-xl inline  float-right font-bold cursor-pointer" onClick={()=>setListOfExpneseVisibility(false)}>
x
    
</div>
</div>

<hr className="mb-2 border-2 border-gray-300"/>

<div className="flex justify-center">
    <form onSubmit={EditExpneseHandlerModal}>
        <table cellPadding="4">
            <tbody>
                <tr>
                    <td><label className="font-bold mx-4">Description</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setDescriptionForModal(e.target.value)} value={DescriptionForModal}  /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Amount</label></td>
                    <td><input type="number" min="0" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setExpenseAmountForModal(e.target.value)} value={ExpenseAmountForModal}  /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Expense Date</label></td>
                    <td><input type="Date" className="w-56 font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setExpiredateForModal(e.target.value)} value={ExpiredateForModal}  /></td>
                </tr>

                <tr>
                  <td>

                  </td>
                  <td className="text-center">
                      <input className="cursor-pointer bg-blue-400 hover:bg-blue-500 focus:outline-none  py-2 px-6 w-56 rounded-md font-bold text-white" value="Edit" type="submit"/>
                  </td>
                </tr>
</tbody>
</table>
</form>
</div>


</Modal>

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
            <h1 className="font-bold text-xl text-center">List Of Expense This Month</h1>
           <input type="date"  value={dateDisplay} onChange={dateHandler}  className="m-2 mb-10 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>
            
            <div>
                <table className="w-full">
                    {
                       expenseList.length >0 && <thead>
                           <tr>
                               <th className="border border-black">Description</th>
                               <th className="border border-black">Amount</th>
                               <th className="border border-black">Expense Date</th>
                               <th className="border border-black"></th>
                               <th className="border border-black"></th>
                           </tr>
                       </thead> 
                    }
                    {
                        expenseList.length>0 && expenseList.map(list=>(
                            <tbody key={list.expense_id}>
                                <tr key={list.expense_id}>
                                    <th className="border border-black">{list.description}</th>
                                    <th className="border border-black">{list.amount}</th>
                                    <th className="border border-black">{list.expense_date}</th>
                                    <th className="text-green-500 hover:text-green-700 border border-black cursor-pointer" onClick={()=>EditOneExpenseItem(list.expense_id)}>Edit</th>
                                    <th className="text-red-500 hover:text-red-700 border border-black cursor-pointer" onClick={()=>deleteOneExpenseItem(list.expense_id)}>Delete</th>
                                
                                </tr>
                            </tbody>
                        ))
                       

                    }
                </table>
            </div>


            </div>
            
            </div>
            <div className=" flex justify-center px-16">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
            <div className="p-2 bg-blue-400 max-w-max text-white rounded-md p-2">
                <h1 className=" font-bold">Total Expense of This Month</h1>
                <h1 className=" font-bold text-center">
                    {
                        totalExpense
                    }
                </h1>
                
                </div>
            </div>
            </div>
        </div>
    )
}

export default ExpenseList
