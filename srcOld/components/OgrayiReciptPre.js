import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "./BASE_URL";
import Modal from "react-modal";
function OgrayiReciptPre() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


    
const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }
    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
const [VisitorListForModal, setVisitorListForModal] = useState([])
    const [ledgerList, setledgerList] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/ograyi_pre_list.php`)
        .then(response=>{
            setledgerList(response.data)
        })


        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setCustomerListForSelect(response.data)
        })
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
        .then(response=>{
            setVisitorListForModal(response.data)
        })

        return () => {
        }
    }, [])


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

      const [CustomerReciptListModalVisibility, setCustomerReciptListModalVisibility] = useState(false)

      const [ListOfCustomerPaid, setListOfCustomerPaid] = useState([]);
    
    const [TotalAmount, setTotalAmount] = useState(0)
    const [TotalPaid, setTotalPaid] = useState(0)
    const [leftAmount, setleftAmount] = useState(0)
      const cutomerOgrayiList=(e)=>{
        const filtered_list=ledgerList.filter(mo=>mo.customer_id.includes(e.target.value))
        setListOfCustomerPaid(filtered_list)

        var formData=new FormData();
        formData.append("customerId",e.target.value)
        var DataForSend=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/calculate_paid_and_remain.php`,DataForSend)
        .then(response=>{
            console.log(response.data)
            setTotalAmount(response.data.total)
            setTotalPaid(response.data.paid)
            setleftAmount(response.data.remain)
        })
    }

    const [LedgerVisitorVisibility, setLedgerVisitorVisibility] = useState(false)


const yearGenerator=()=>{
    return new Date().getFullYear();
}
const [Year, setYear] = useState(yearGenerator);
const [Month, setMonth] = useState(1);
const yearHandler=(e)=>{
setYear(e.target.value)

}
const MonthHandler=(e)=>{
    setMonth(e.target.value)
    
}
    const getDropList = () => {
        const year = new Date().getFullYear();
      return (
          Array.from( new Array(3), (v,i) =>
            <option key={i} value={year-i} className="font-bold">{year-i}</option>
        )
      );
};



const [VisitorIdFromModal, setVisitorIdFromModal] = useState(0)

const contcatinateMonth=(year,month)=>{

    return year+"-"+"0"+month
}
const [TotalOgrayiCollected, setTotalOgrayiCollected] = useState(0)
const formVisitorHandler=(browser)=>{
    browser.preventDefault()
    
    var searchYearMonth=contcatinateMonth(Year,Month)
    var formData=new FormData()
    formData.append("visitorId",VisitorIdFromModal)
    formData.append("date",searchYearMonth)
    var jsonForSend=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/calculate_visitor_leder_for_pre.php`,jsonForSend)
    .then(response=>{
        setTotalOgrayiCollected(response.data.total)
    })
    
    }



    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
               

            <div className="mb-4 text-center space-x-8">
                <button className="px-2 py-1 bg-blue-400 hover:bg-blue-600 font-bold text-white rounded-md" onClick={()=>setCustomerReciptListModalVisibility(true)}>Customer Previous Account Details</button>
     <Modal
        isOpen={CustomerReciptListModalVisibility}
        style={customStyles}
        contentLabel="Example Modal"
        className=" p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >

<div >
<div className="text-center" className="inline pb-3">
               <select onChange={cutomerOgrayiList}  className="border border-blue-400 px-4 py-2 focus:outline-none rounded-md font-bold w-80">
                    <option value="">Select Customer </option>
                    {
                        CustomerListForSelect.length > 0 && CustomerListForSelect.map(list=>(
                            <option className="font-bold" value={list.customer_id}>{list.customer_name +" "+ list.address+" "+list.province}</option>
                        ))
                    }
                </select>
               </div>
<div className="inline float-right font-bold cursor-pointer " onClick={()=>setCustomerReciptListModalVisibility(false)}>X</div>


</div>

<div className="mt-5 flex justify-center space-x-5 text-center">
                    <div className="bg-blue-500 max-w-max p-2 font-bold text-white rounded-md">
                        <h1>Total Amount </h1>
                        <h1>{TotalAmount}</h1>
                    </div>
                    <div className="bg-blue-500 max-w-max p-2 font-bold text-white rounded-md">
                        <h1>Paid Amount </h1>
                        <h1>{TotalPaid}</h1>
                    </div>
                    <div className="bg-blue-500 max-w-max p-2 font-bold text-white rounded-md">
                        <h1>Remain Amount </h1>
                        <h1>{leftAmount}</h1>
                    </div>


</div>



<table className="w-full mt-5" >
                    {
                        ListOfCustomerPaid.length >0 && <thead>
                            <tr>
                                <th className="border border-black">Customer Name</th>
                                <th className="border border-black">Address</th>
                                <th className="border border-black">Province</th>
                                <th className="border border-black">Visitor Name</th>
                                <th className="border border-black">Recipt No</th>
                                <th className="border border-black">Recipt Amount</th>
                                <th className="border border-black">Recipt Date</th>
                            </tr>
                        </thead>
                    }

                    {
                        ListOfCustomerPaid.length > 0 && ListOfCustomerPaid.map(list=>(
                            <tbody>
                                <tr>
                                    <th className="border border-black">{list.customer_name}</th>
                                    <th className="border border-black">{list.customer_address}</th>
                                    <th className="border border-black">{list.customer_province}</th>
                                    <th className="border border-black">{list.name}</th>
                                    <th className="border border-black">{list.recipt_no}</th>
                                    <th className="border border-black">{list.amount_received}</th>
                                    <th className="border border-black">{list.recipt_date} --- {DateChangerFromGerordgiaToSolarDate(list.recipt_date)}</th>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>



          </Modal>
                <button className="px-2 py-1 bg-blue-400 hover:bg-blue-600 font-bold text-white rounded-md" onClick={()=>setLedgerVisitorVisibility(true)}>Visitor Ledger Previous </button>


    <Modal
        isOpen={LedgerVisitorVisibility}
        style={customStyles}
        contentLabel="Example Modal"
        className=" p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >

<div className="font-bold mx-auto inline">
<h1 className="inline mr-10 float-left">Select Month and Year</h1>

<span className="font-bold float-right cursor-pointer" onClick={()=>setLedgerVisitorVisibility(false)}>X</span>
</div>
<br />
<br />


<form onSubmit={formVisitorHandler} className="my-2 focus:outline-none">
    <select onChange={(e)=>setVisitorIdFromModal(e.target.value)} className="font-bold px-3 mr-3 py-2 focus:outline-none border border-blue-400 rounded-md" required>
        <option value="">Select Visitor</option>
        {
            VisitorListForModal.length >0 && VisitorListForModal.map(list=>(
                <option value={list.visitor_id}>{list.name} {list.lastname}</option>
            ))
        }

    </select>



    <select onChange={yearHandler} className="font-bold px-3 py-2 focus:outline-none border border-blue-400 rounded-md">
                            {
                                getDropList()
                            }
                    </select>
                     <select onChange={MonthHandler} className="font-bold mx-4 px-3 py-2 focus:outline-none border border-blue-400 rounded-md">
                         <option className="font-bold" value="1" >January</option>
                         <option className="font-bold" value="2" >February</option>
                         <option className="font-bold" value="3" >March</option>
                         <option className="font-bold" value="4" >April</option>
                         <option className="font-bold" value="5" >May</option>
                         <option className="font-bold" value="6" >June</option>
                         <option className="font-bold" value="7" >July</option>
                         <option className="font-bold" value="8" >August</option>
                         <option className="font-bold" value="9" >September</option>
                         <option className="font-bold" value="10" >October</option>
                         <option className="font-bold" value="11" >November</option>
                         <option className="font-bold" value="12" >December</option>
                    </select>       
                    
<input type="Submit" className="bg-blue-400 hover:bg-blue-600 font-bold px-4 py-3 rounded-md text-white" value="Calculate" />




</form>
<div className="mt-4">
    <div className="text-center font-bold bg-blue-400 max-w-max mx-auto p-3 text-white">
        <h1>Total Ograyi Collected In This Month</h1>
        <h1>{TotalOgrayiCollected}</h1>
    </div>
</div>

      </Modal>
            </div>




            <div>
                {
                    ledgerList.length===0 && <h1>No Result</h1>
                }

                <table className="w-full">
                    {
                        ledgerList.length >0 && <thead>
                            <tr>
                                <th className="border border-black">Customer Name</th>
                                <th className="border border-black">Address</th>
                                <th className="border border-black">Province</th>
                                <th className="border border-black">Visitor Name</th>
                                <th className="border border-black">Recipt No</th>
                                <th className="border border-black">Recipt Amount</th>
                                <th className="border border-black">Recipt Date</th>
                            </tr>
                        </thead>
                    }

                    {
                        ledgerList.length > 0 && ledgerList.map(list=>(
                            <tbody>
                                <tr>
                                    <th className="border border-black">{list.customer_name}</th>
                                    <th className="border border-black">{list.customer_address}</th>
                                    <th className="border border-black">{list.customer_province}</th>
                                    <th className="border border-black">{list.name}</th>
                                    <th className="border border-black">{list.recipt_no}</th>
                                    <th className="border border-black">{list.amount_received}</th>
                                    <th className="border border-black">{list.recipt_date}
                                    --- {DateChangerFromGerordgiaToSolarDate}</th>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>


            </div>
            </div>
        </div>
    )
}

export default OgrayiReciptPre
