import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function TotalCustomerOgrayi() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setCustomerListForSelect(response.data)
        })

        return () => {
            
        }
    }, [])

    const [CustomerLedgerList, setCustomerLedgerList] = useState([])
const [CustomerDetailsVisiblility, setCustomerDetailsVisiblility] = useState("hidden")
    const CustomerSelectHandler=(CustomerId)=>{
        if(CustomerId===""){
            setCustomerDetailsVisiblility("hidden")
        }else{
            setCustomerDetailsVisiblility("")
            var formData=new FormData();
            formData.append("customerId",CustomerId)
            var jsonData=Object.fromEntries(formData)
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/total_customer_ograyi.php`,jsonData)
            .then(response=>{
                setCustomerLedgerList(response.data.reverse())
            })


        }


    }
    console.log(CustomerLedgerList)

    const DateChangerFromGerordgiaToSolarDate=(date)=>{
        let today = new Date(date).toLocaleDateString('fa-IR');
        return today;
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
    


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 flex justify-center">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
               <div className="text-center">
               <select onChange={(e)=>CustomerSelectHandler(e.target.value)} className="border border-blue-400 px-4 py-2 focus:outline-none rounded-md font-bold w-80">
                    <option value="">Select Customer </option>
                    {
                        CustomerListForSelect.length > 0 && CustomerListForSelect.map(list=>(
                            <option className="font-bold" value={list.customer_id}>{list.customer_name +" "+ list.address+" "+list.province}</option>
                        ))
                    }
                </select>
               </div>
            </div>
            
            </div>
            <div className={`w-full bg-white mt-4 px-12 py-6 ${CustomerDetailsVisiblility}`}>
                    <div className="text-center my-4">
                    <button className="px-4 py-2 bg-blue-400 hover:bg-blue-600 font-bold cursor-pointer text-white rounded-md" onClick={()=>printDiv("dataForPrint")}>Print</button>
                    </div>
                    <div id="dataForPrint">
                        <table className="w-full mx-auto text-center">
                            {
                                CustomerLedgerList.length >0 && <thead>
                                    <tr>
                                        <th className="border border-black">Customer Name</th>
                                        <th className="border border-black">Receiver Name</th>
                                        <th className="border border-black">Recipt Date</th>
                                        <th className="border border-black">Amount</th>
                                        <th className="border border-black">Remaining</th>
                                    </tr>
                                </thead>
                            }
                            
                            <tbody>
                                {
                                CustomerLedgerList.length >0 && CustomerLedgerList.map(list=>(
                                        <tr>
                                            <th className="border border-black">{list.customer_name}</th>
                                            <th className="border border-black">{list.visitor}</th>
                                            <th className="border border-black">{list.reciptDate} --- {DateChangerFromGerordgiaToSolarDate(list.reciptDate)}</th>
                                            <th className="border border-black">{list.amount_recieved}</th>
                                            <th className="border border-black">{list.remain}</th>
                                        </tr>
                                ))
                            }

                         </tbody>

                        </table>
                    </div>
                    {
                        CustomerLedgerList.length===0 && <h1 className="text-2xl font-bold text-center">No Data Found </h1>
                    }
            </div>
        </div>
    )
}

export default TotalCustomerOgrayi
