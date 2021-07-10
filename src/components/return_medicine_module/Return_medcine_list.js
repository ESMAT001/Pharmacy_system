import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function Return_medicine_list() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`)
        .then(response=>{
            setCustomerListForSelect(response.data)
        })

        return () => {
            
        }
    }, [])
    const [CustomerListForSelect, setCustomerListForSelect] = useState([])
const [DetailsVisibility, setDetailsVisibility] = useState("hidden");
const [returnList, setreturnList] = useState([])
const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }

const selectHandler=(customerId)=>{
        setDetailsVisibility("")
        var formData=new FormData()
        formData.append("customerId",customerId)
        var jsonData=Object.fromEntries(formData);
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/return_medicine/return_medicine_list.php`,jsonData)
        .then(response=>[
            setreturnList(response.data)
        ])
    }
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
            <div className="text-center">
               <select onChange={(e)=>selectHandler(e.target.value)}  className="border border-blue-400 px-4 py-2 focus:outline-none rounded-md font-bold w-80">
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
            <div>
                <div className={`bg-white py-4 mt-4 px-4 ${DetailsVisibility}`}>
                    {
                        returnList.length===0 && <h1 className="text-center font-bold">No Data Found</h1>
                    }
<table className="w-full" cellPadding="5px">
                    {
                        returnList.length >0 && <thead>
                            <th className="border border-black">Product Name</th>
                            <th className="border border-black">Generic Name</th>
                            <th className="border border-black"> Return Price</th>
                            <th className="border border-black"> Return Quantity</th>
                            <th className="border border-black"> Return Date</th>
                            
                        </thead>

                      
                    }

                    {
                        returnList.length >0 && returnList.map(list=>(
                            <tr>
                                <th className="border border-black">{list.product_name}</th>
                                <th className="border border-black">{list.generic_name}</th>
                                <th className="border border-black">{list.return_price}</th>
                                <th className="border border-black">{list.return_quantity}</th>

                                <th className="border border-black">{list.return_date} ---{DateChangerFromGerordgiaToSolarDate(list.return_date)}</th>
                            </tr>
                        ))
                    }
</table>
                </div>
            </div>
        </div>
    )
}

export default Return_medicine_list
