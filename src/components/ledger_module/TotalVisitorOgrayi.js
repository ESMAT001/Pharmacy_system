import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function TotalVisitorOgrayi() {

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
    const [VisitorDetailsVisiblility, setVisitorDetailsVisiblility] = useState("hidden");
const [VisitorListForSelect, setVisitorListForSelect] = useState([]);
    useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
    .then(response=>{
        setVisitorListForSelect(response.data)
    })


    
    return () => {
        
    }
}, [])

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
const [VisitorIdFromSelect, setVisitorIdFromSelect] = useState(0);
const VisitorSelectHandler=(visitorId)=>{
setVisitorIdFromSelect(visitorId)
if(visitorId===""){
    setVisitorDetailsVisiblility("hidden")
}else{
setVisitorDetailsVisiblility("")
fetchData()
}

}

const contcatinateMonth=(year,month)=>{

    if(month<=9){

        return year+"-"+"0"+month
      }
      else{
        return year+"-"+month
      
      }
      
}
const [TotalAmount, setTotalAmount] = useState(0)
const fetchData=()=>{
        
    var searchYearMonth=contcatinateMonth(Year,Month)
    var formData=new FormData();
    formData.append("date",searchYearMonth)
    formData.append("visitorId",VisitorIdFromSelect)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/ledger_module/calculate_month_collected_money_by_visitor.php`,jsonData)
    .then(response=>{
        setTotalAmount(response.data.total)
    })

}


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-14 px-4 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <div className="text-center">
                <select onChange={(e)=>VisitorSelectHandler(e.target.value)}  className="border border-blue-400 px-4 py-2 focus:outline-none rounded-md font-bold w-80">
                    <option value="">Select Visitor </option>
                    {
                       VisitorListForSelect.length >0 && VisitorListForSelect.map(list=>(
                           <option value={list.visitor_id}>{list.name} {list.last_name}</option>
                       ))
                    }
                </select>
                </div>
            </div>
            </div>

            <div className={`w-full bg-white mt-4 p-2  ${VisitorDetailsVisiblility}`}>
                    <div className="text-center my-4">
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
                    <button className="bg-blue-400 px-3 py-2 rounded-lg font-bold text-white focus:outline-none focus:bg-blue-300" onClick={fetchData}>Calculate</button>



                </div>
                            <div className="mt-6 bg-blue-500 max-w-max text-center font-bold mx-auto text-white p-2 rounded-md">
                                <h1>Total Sell Of this Month</h1>
                                <h1>{TotalAmount}</h1>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default TotalVisitorOgrayi
