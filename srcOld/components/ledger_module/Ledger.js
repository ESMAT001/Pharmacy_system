import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
Modal.setAppElement("#root")
function Ledger() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
const [customerListForModal, setcustomerListForModal] = useState([]);
    useEffect(() => {
        fetchVisitorList()
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setcustomerListForModal(response.data)
        })

        return () => {
           
        }
    }, [])
    const [visitorList, setVisitorList] = useState([]);
    const fetchVisitorList=()=>{
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
        .then(response=>{
            setVisitorList(response.data)
        })
    }

const [ledgerDayVisibility, setLedgerDayVisibility] = useState("hidden");
const [visitorId, setVisitorId] = useState(0);
const selectHandler=(e)=>{


    setVisitorId(e.target.value);
    fetchVisitorWorkDays(e.target.value)
}
 function fetchVisitorWorkDays(visitorId){
     if(visitorId==="0"){
    setLedgerDayVisibility("hidden")
     }
     else{
        setLedgerDayVisibility("")
     }
     

}

const [customerListAfterSelectDay, setcustomerListAfterSelectDay] = useState([]);
    const DayHandler=(e)=>{
    
 console.log(visitorId)

    var formData1=new FormData();
    formData1.append("dayOfTheWeek",e.target.value)
    formData1.append("visitorId",visitorId)
    var jsonData1=Object.fromEntries(formData1);

    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/visitor_list_of_days.php`,jsonData1)
    .then(response=>{
        setcustomerListAfterSelectDay(response.data)
    })
 

}

const deleteCustomerFromDay=(ledgerId)=>{
    if(window.confirm("Do you want To remove it")){
        var formData=new FormData();
        formData.append("ledgerId",ledgerId)
        var jsonData=Object.fromEntries(formData);
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/remove_customer_from_day.php`,jsonData)
        .then(response=>{
            if(response.data.status==="true"){
                window.location.reload();
            }else{
                console.log(response.data)
            }
        })
    }else{
        
    }
}


const [AddLedgerForVisitorVisibility, setAddLedgerForVisitorVisibility] = useState(false);
const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };



const [DayOfTheWeekForModal, setDayOfTheWeekForModal] = useState(0);
const [CustomerIdForModal, setCustomerIdForModal] = useState(0);
const DayForModalHandler=(e)=>{
setDayOfTheWeekForModal(e.target.value)
axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setcustomerListForModal(response.data)
        })


}
const customerIdModalHandler=(e)=>{
    setCustomerIdForModal(e.target.value)
}

const modelFormSubmit=(browser)=>{
    browser.preventDefault();
    if(DayOfTheWeekForModal=="0" ||CustomerIdForModal=="0"||DayOfTheWeekForModal===0 || CustomerIdForModal===0 || DayOfTheWeekForModal==="Select One Day" || CustomerIdForModal==="Select Customer"){
        alert("Please fill Empty Inputs")
    }else{
        var formData=new FormData()
        formData.append("visitorId",visitorId)
        formData.append("day",DayOfTheWeekForModal)
        formData.append("customerId",CustomerIdForModal)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/insert_in_ledger.php`,jsonData)
        .then(response=>{
            if(response.data.status==="true"){
                setAddLedgerForVisitorVisibility(false)
                setDayOfTheWeekForModal(0);
                setCustomerIdForModal(0);
                window.location.reload();
            }else{
                console.log(response.data)
            }
        })


    }
}
function printDiv(divName){
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
    history.push("/");

}

const DisplayModalHandler=()=>{
    setAddLedgerForVisitorVisibility(true);
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setcustomerListForModal(response.data)
        })
}
return (

   
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full no-print">
            <div className="text-center">
                <div>
                <label className="font-bold">
                    Select Visitor
                </label>
                <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md px-3 py-1 mx-2 " onChange={selectHandler}>
                    <option value="0">Select Visitor</option>
                    {
                        visitorList.length>0 && visitorList.map(list=>(
                            <option key={list.visitor_id} value={list.visitor_id} >{list.name +" "+ list.last_name}</option>
                        ))
                    }
                </select>
                </div>
            </div>
            </div>
            
            </div>
            <div className={ledgerDayVisibility}>
            <div className="mx-10 flex justify-center">
            <div className=" mx-4 p-2 bg-white shadow-lg rounded-lg w-full">
                
            <div className="text-center">
            
                <label className="font-bold">
                    Select Day
                </label>
                <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md px-3 py-1 mx-2 " onChange={DayHandler} >
                    <option> Select One Day</option>
                    <option value="1">Saturday</option>
                    <option value="2">Sunday</option>
                    <option value="3">Monday</option>
                    <option value="4">Tuesday</option>
                    <option value="5">Wednesday</option>
                    <option value="6">Thursday</option>
                    <option value="7">Friday</option>
                </select>

            

                <button className="ml-20 font-bold bg-blue-400 text-white p-2 rounded-md" onClick={DisplayModalHandler}>Add New Ledger For Visitor</button>
               <Modal isOpen={AddLedgerForVisitorVisibility} 
               style={customStyles}
        contentLabel="Example Modal"
        className="w-2/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60">
                        <div>
                           
                            <div className="mb-4">
                            <h1 className="text-center mx-auto text-xl mb-2 inline">Add Ledger For Visitor</h1>
                            <p onClick={()=>setAddLedgerForVisitorVisibility(false)} className="inline text-center float-right cursor-pointer text-lg">x</p>

                            </div>
                            <hr/>
                            <form className="mt-5 text-center mb-4" onSubmit={modelFormSubmit}>
                                <select onChange={DayForModalHandler} className="border border-blue-400 font-bold p-2 rounded-md focus:outline-none" required>
                                    <option value="0">Select One Day</option>
                                    <option value="1">Saturday</option>
                                    <option value="2">Sunday</option>
                                    <option value="3">Monday</option>
                                    <option value="4">Tuesday</option>
                                    <option value="5">Wednesday</option>
                                    <option value="6">Thursday</option>
                                    <option value="7">Friday</option>
                                </select>
                                <select  className="border-2 font-bold focus:outline-none border-blue-400 rounded-md p-2 mx-2 " onChange={customerIdModalHandler} required={true}>
                                 <option className="font-bold" value="0">Select Customer</option>
                                 {
                                     customerListForModal.length > 0 && customerListForModal.map(list=>(
                                    <option value={list.customer_id} >{list.customer_name +" "+ list.address}</option>    
                                    ))
                                 }
                                </select>

                                <input type="submit" value="Save" className="p-2 bg-blue-400 rounded-md mx-4 font-bold text-white focus:outline-none cursor-pointer"/>
                            </form >
                            <hr/>
                            <div className="mt-5 text-center">
                                <button onClick={()=>setAddLedgerForVisitorVisibility(false)} className="p-2 bg-blue-400 rounded-md mx-4 font-bold text-white focus:outline-none cursor-pointer">Close</button>
                            </div>
                        </div>
               </Modal>
               
               
                </div>
                <div id="section-to-print" className="mb-2">
                    {
                        customerListAfterSelectDay.length>0 &&
                        <table className="w-full  mt-4  border-black ">
                        <thead>
                            <th className="border border-black">Customer Name</th>
                            <th className="border border-black">Address </th>
                            <th className="border border-black">Remaining Amount</th>
                            <th className="border border-black no-print">Action</th>
                        </thead>
                        
                                    {
                                        customerListAfterSelectDay.length>0 && customerListAfterSelectDay.map(list=>(
                                           <tbody>
                                           <tr>
                                                <th className="border border-black">{list.customer_name}</th>
                                                <th className="border border-black">{list.address}</th>
                                                <th className="border border-black">{list.remain_amount}</th>
                                                <th className="border border-black cursor-pointer text-red-500 no-print" onClick={()=>deleteCustomerFromDay(list.ledger_id)}>Remove</th>

                                            </tr>
                                            </tbody>
                                        ))
                                    }
                        <button className="cursor-pointer mx-auto no-print m-4 bg-blue-400 text-white font-bold p-2 rounded-md" onClick={()=>printDiv('section-to-print')}>Print</button>
                    </table>
                    
                    }
                    {
                        customerListAfterSelectDay.length==0 && <h1 className="mt-5 text-center font-bold text-2xl">No data Found</h1>
                    }
                    
                </div>
                


            </div>
            </div>
            </div>
        </div>
    )
}

export default Ledger
