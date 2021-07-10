import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function OgrayiReciptListForPrint() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    const [ledgerList, setledgerList] = useState([])
    const [ListOfCustomerPaid, setListOfCustomerPaid] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0)
    const [TotalPaid, setTotalPaid] = useState(0)
    const [leftAmount, setleftAmount] = useState(0)
    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
    const [VisitorListForModal, setVisitorListForModal] = useState([])




    const DateChangerFromGerordgiaToSolarDate=(date)=>{
        let today = new Date(date).toLocaleDateString('fa-IR');
        return today;
      }


    const cutomerOgrayiList=(e)=>{
        const filtered_list=ledgerList.filter(mo=>mo.customer_id.includes(e.target.value))
        setListOfCustomerPaid(filtered_list)
        if(e.target.value===""){
            setListOfCustomerPaid([])
        }
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

    function printDiv(divName){
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
    
        document.body.innerHTML = printContents;
    
        window.print();
    
        document.body.innerHTML = originalContents;
        window.location.reload();
        history.push("/");
    
    }

const [SearchCustomerInput, setSearchCustomerInput] = useState("")
const filteredCustomerList=CustomerListForSelect.filter(list=>list.customer_name.toLowerCase().includes(SearchCustomerInput.toLowerCase()))

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 flex justify-center padding-zero">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
        

<div >
<div className=" no-print  pb-3 text-center">
<input type="text" value={SearchCustomerInput} onChange={(e)=>setSearchCustomerInput(e.target.value)} className="no-print  border border-blue-400 mb-3 px-4 py-2 focus:outline-none rounded-md font-bold w-80 " placeholder="Search Customer" />
<br />

               <select onChange={cutomerOgrayiList}  className="no-print  border border-blue-400 px-4 py-2 focus:outline-none rounded-md font-bold w-80">
                    <option value="">Select Customer </option>
                    {
                        filteredCustomerList.length > 0 && filteredCustomerList.map(list=>(
                            <option className="font-bold" value={list.customer_id}>{list.customer_name +" "+ list.page_no +" "+ list.address+" "+list.province}</option>
                        ))
                    }
                </select>
</div>



</div>

<div className="no-print mt-5 flex mb-5 justify-center space-x-5 text-center">
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
{
    ListOfCustomerPaid.length >0 &&
<div className="float-left mb-2 no-print">
    <button className="bg-blue-500 hover:bg-blue-600 p-2 text-semibold text-white rounded-md focus:outline-none" onClick={()=>window.print()}>Print</button>
</div>

}




<table className="w-full " >
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



            </div>
            </div>
        </div>
    )
}

export default OgrayiReciptListForPrint
