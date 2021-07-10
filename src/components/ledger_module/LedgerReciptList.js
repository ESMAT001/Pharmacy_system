import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function LedgerReciptList() {

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

    const [listOfRecipts, setListOfRecipts] = useState([]);
    const [totalMoneyRecieved, setTotalMoneyRecieved] = useState(0);
       useEffect(() => {
           var formData=new FormData();
           formData.append("date",searchDate)
           var jsonData=Object.fromEntries(formData)
           axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/ledger_list.php`,jsonData)
           .then(response=>{
            setListOfRecipts(response.data)
             axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/calculating_each_month_received_money.php`,jsonData)
             .then(response=>{
                 setTotalMoneyRecieved(response.data.total);
             })
           })
           return () => {
               
           }
       }, [searchDate])
       const [dateDisplay, setDateDisplay] = useState(formatDate())
       const dateHandler=(e)=>{
        var splitedDate=e.target.value.split("-");
        var monthAndYear=splitedDate[0]+"-"+splitedDate[1];
        setSearchDate(monthAndYear);
        setDateDisplay(e.target.value)

       }
       
 const deleteOneRecipt=(reciptId)=>{
     var formData=new FormData()
    formData.append("reciptId",reciptId);
    var jsonData=Object.fromEntries(formData)
     axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/remove_ledger_recipt.php`,jsonData)
     .then(response=>{
         if(response.data.status==="true"){
             window.location.reload();
         }else{
             console.log(response.data.status)

         }
     })
 }

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


const [EditLedgerInfoVisibility, setEditLedgerInfoVisibility] = useState(false);
const [CustomerNameForModal, setCustomerNameForModal] = useState("");
const [CustomerAddressForModal, setCustomerAddressForModal] = useState("")
const [VisitorNameForModal, setVisitorNameForModal] = useState("")
const [ReceivedAmountForModal, setReceivedAmountForModal] = useState(0)
const [ReciptDateForModal, setReciptDateForModal] = useState("")
const [ReciptIdForModal, setReciptIdForModal] = useState(0)
const [ReciptNoInLittleBook, setReciptNoInLittleBook] = useState(0)
const EditOneReciptModal=(reciptId)=>{
    setEditLedgerInfoVisibility(true)
    const filteredReciptList=listOfRecipts.filter(list=>list.recipt_id.includes(reciptId))
    filteredReciptList.map(list=>{
        setCustomerNameForModal(list.customer_name)
        setCustomerAddressForModal(list.customer_address)
        setVisitorNameForModal(list.name)
        setReceivedAmountForModal(list.amount_recieved)
        setReciptDateForModal(list.recipt_date)
        setReciptIdForModal(list.recipt_id)
        setReciptNoInLittleBook(list.recipt_no)
    })
}

const EditReciptModalHandler=(browser)=>{
browser.preventDefault();

var formData=new FormData();
formData.append("receivedAmount",ReceivedAmountForModal)
formData.append("reciptDate",ReciptDateForModal)
formData.append("reciptId",ReciptIdForModal)
formData.append("reciptNo",ReciptNoInLittleBook)
var jsonData=Object.fromEntries(formData)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/edit_ledger_recipt.php`,jsonData)
.then(response=>{
    if(response.data.status==="true"){
        setEditLedgerInfoVisibility(false)
        window.location.reload()
    }else{
        console.log(response.data)
    }
})



}


const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }
  
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
<Modal
isOpen={EditLedgerInfoVisibility}
className=" p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}>
  <h1 className="text-xl font-bold text-center inline mx-24">Edit Ledger Recipt Details</h1>
< span className="font-bold float-right cursor-pointer" onClick={()=>setEditLedgerInfoVisibility(false)} >X</span>
<hr className="border border-gray-400 my-3" / >

<div className="flex justify-center">
    <form onSubmit={EditReciptModalHandler}>
        <table cellPadding="4">
            <tbody>
                <tr>
                    <td><label className="font-bold mx-4">Customer Name</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setCustomerNameForModal(e.target.value)} value={CustomerNameForModal} readOnly /></td>
                </tr>

                <tr>
                    <td><label className="font-bold mx-4">Address</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setCustomerAddressForModal(e.target.value)} value={CustomerAddressForModal} readOnly /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Visitor Name</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setVisitorNameForModal(e.target.value)} value={VisitorNameForModal} readOnly /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Received Amount</label></td>
                    <td><input type="number" className="font-bold border border-blue-400 focus:outline-none p-2  rounded-md" min="0"  onChange={(e)=>setReceivedAmountForModal(e.target.value)} value={ReceivedAmountForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Recipt No</label></td>
                    <td><input type="number" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" min="0"  onChange={(e)=>setReciptNoInLittleBook(e.target.value)} value={ReciptNoInLittleBook} /></td>
                </tr>

                <tr>
                    <td><label className="font-bold mx-4">Recipt Date</label></td>
                    <td><input type="date" className="font-bold w-56 border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setReciptDateForModal(e.target.value)} value={ReciptDateForModal} /></td>
                </tr>
                <tr>
                  <td>

                  </td>
                  <td className="text-center">
                      <input className="cursor-pointer bg-blue-400 hover:bg-blue-500 focus:outline-none  py-2 px-6 rounded-md font-bold text-white" value="Edit" type="submit"/>
                  </td>
                </tr>
</tbody>
</table>
</form>
</div>
</Modal>
            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
            <h1 className="font-bold text-xl text-center">Recipt List by Month</h1>
           <input type="date"  value={dateDisplay} onChange={dateHandler}  className="m-2 mb-10 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>
            

            <table className="w-full">
                {
                    listOfRecipts.length==0 && 
                    <h1 className=" text-2xl  font-bold text-center mt-4 ">No Data in this date</h1>
                }

                {
                    listOfRecipts.length>0 && <thead >
                        <th className="border border-black">Customer Name</th>
                        <th className="border border-black">Address</th>
                        <th className="border border-black">Visitor Name</th>
                        <th className="border border-black">Recipt No</th>
                        <th className="border border-black">Received Amount</th>
                        <th className="border border-black">Recipt Date</th>
                        <th className="border border-black no-print"></th>
                        <th className="border border-black no-print"></th>
                    </thead>
                }
                {
                    <tbody>
                        {
                            listOfRecipts.length>0 && listOfRecipts.map(list=>(
                                <tr>
                                <th className="border border-black">{list.customer_name}</th>
                                <th className="border border-black">{list.customer_address}</th>
                                <th className="border border-black">{list.name}</th>
                                <th className="border border-black">{list.recipt_no}</th>
                                
                                <th className="border border-black">{list.amount_recieved}</th>
                                <th className="border border-black">{list.recipt_date}  --- {DateChangerFromGerordgiaToSolarDate(list.recipt_date)}</th>
                                <th className="border border-black no-print text-green-500 hover:text-green-700 cursor-pointer" onClick={()=>EditOneReciptModal(list.recipt_id)}>Edit</th>
                                <th className="border border-black no-print text-red-500 cursor-pointer hover:text-red-700" onClick={()=>deleteOneRecipt(list.recipt_id)}>Delete</th>
                                </tr>
                            ))
                        }
                    </tbody>
                }
            </table>
            </div>
            </div>

            <div>
            <div className=" flex justify-center px-16">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full ">
                <div className="p-2 bg-blue-400 max-w-max text-white rounded-md p-2">
                <h1 className=" font-bold">Total Money from Recipts of This Month</h1>
                <h1 className=" font-bold text-center">
                {
                    totalMoneyRecieved
                }
                </h1>
                
                </div>
             </div>
            </div>
            </div>
        </div>
    )
}

export default LedgerReciptList
