import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function ExpiredMedicineLists() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const yearGenerator=()=>{
        return new Date().getFullYear();
    }
    const [Year, setYear] = useState(yearGenerator);
    const [Month, setMonth] = useState(1);
    const yearHandler=(e)=>{
    setYear(e.target.value)
    
    }
    const getDropList = () => {
        const year = new Date().getFullYear();
      return (
          Array.from( new Array(3), (v,i) =>
            <option key={i} value={year-i} className="font-bold">{year-i}</option>
        )
      );
    };
    const MonthHandler=(e)=>{
        setMonth(e.target.value)
        
    }
    const contcatinateMonth=(year,month)=>{

        return year+"-"+"0"+month
    }
    const [expiredMedicineDetailsVisibility, setexpiredMedicineDetailsVisibility] = useState("hidden")

    const [TotalOfThisMonthMedicines, setTotalOfThisMonthMedicines] = useState(0)
    const [TotalQuantityOfMedicins, setTotalQuantityOfMedicins] = useState(0)
    const [ListOfExpiredMedicines, setListOfExpiredMedicines] = useState([])

    const fetchData=()=>{
         
        var searchYearMonth=contcatinateMonth(Year,Month)
        var formData=new FormData();
        formData.append("date",searchYearMonth)
        var jsonData=Object.fromEntries(formData)
        setexpiredMedicineDetailsVisibility("")
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expire_medicine/calculate_total_amount_per_month.php`,jsonData)
        .then(response=>{
           setTotalOfThisMonthMedicines(response.data.total)
           setTotalQuantityOfMedicins(response.data.quantity)
        })
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/expire_medicine/list_of_expired_medicine_by_month.php`,jsonData)
        .then(response=>{
            setListOfExpiredMedicines(response.data)
        })
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
                    <button className="bg-blue-400 px-3 py-2 rounded-lg font-bold text-white focus:outline-none focus:bg-blue-300" onClick={fetchData}>Display Expired Medicine</button>

                </div>
            </div>
            </div>
            <div className={`bg-white py-3 w-full mt-4 px-8 ${expiredMedicineDetailsVisibility}`}>
                           <div className="flex flex-row flex-wrap">
                           <div className="text-lg font-bold rounded-md mx-auto p-2 text-white bg-blue-400  max-w-max text-center">
                                <h1>Total Expired Medicine Worth</h1>
                                <h1>{TotalOfThisMonthMedicines}</h1>

                            </div>
                            <div className="text-lg font-bold rounded-md mx-auto p-2 text-white bg-blue-400  max-w-max text-center">
                                <h1>Total Quantity Expired Medicine</h1>
                                <h1>{TotalQuantityOfMedicins}</h1>
                            </div>
                           </div>

<table className="w-full my-3 mx-auto">
    {
        ListOfExpiredMedicines.length >0 && <caption className="font-bold text-xl my-2">List of Expired Medicines</caption>
        
    }

    {
        ListOfExpiredMedicines.length===0 && <h1 className="text-center font-bold">
            No Medicine Expired In this Month
        </h1>
    }
    {
        ListOfExpiredMedicines.length>0 && <thead>
            <tr>
                <th className="border border-black">Product Name</th>
                <th className="border border-black">Generic Name</th>
                <th className="border border-black">Mfg Date</th>
                <th className="border border-black">Expire Date</th>
                <th className="border border-black">Cost Price</th>
                <th className="border border-black">Total Quantity</th>
                <th className="border border-black">Quantity of Medicines Expired</th>
            </tr>
        </thead>
    }
    {
        ListOfExpiredMedicines.length >0 && ListOfExpiredMedicines.map(list=>(
            <tbody>
                <tr>
                    <th className="border border-black">{list.product_name}</th>
                    <th className="border border-black">{list.generic_name}</th>
                    <th className="border border-black">{list.mfg_date}</th>
                    <th className="border border-black">{list.expire_date}</th>
                    <th className="border border-black">{list.cost_price}</th>
                    <th className="border border-black">{list.packs_quantity}</th>
                    <th className="border border-black">{list.quantity}</th>
                </tr>
            </tbody>
        ))
    }
</table>



            </div>
        </div>
    )
}

export default ExpiredMedicineLists
