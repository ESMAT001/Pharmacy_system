import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "./BASE_URL";


function VisitorSellInformation(props) {

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
const [VisitorId, setVisitorId] = useState(props.match.params.visitorId)
const [VisitorName, setVisitorName] = useState("")
const [VisitorLastName, setVisitorLastName] = useState("")
useEffect(() => {
    var formData2=new FormData()
    formData2.append("visitorId",VisitorId)
    var visitorIdForSend=Object.fromEntries(formData2)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/specific_visitor_list.php`,visitorIdForSend)
    .then(response=>{
        setVisitorName(response.data.name)
        setVisitorLastName(response.data.last_name)
    })

}, [])
  const [sellList, setSellList] = useState([]);
  const [totalOfThisMonth, setTotalOfThisMonth] = useState(0);
    useEffect(() => {
        var formData=new FormData();
        formData.append("visitorId",props.match.params.visitorId)
        var jsonData=Object.fromEntries(formData);
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/selectting_visitor_invoice_list.php`,jsonData)
        .then(response=>{
            setSellList(response.data)
            var formData1=new FormData();

            formData1.append("date",searchDate)
            formData1.append("visitorId",props.match.params.visitorId)
            var jsonData1=Object.fromEntries(formData1);
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/fetching_total_of_all_bills.php`,jsonData1)
            .then(response=>{
                setTotalOfThisMonth(response.data.total)
            })
        })






        
       
    }, [searchDate])
    
    const [dateDisplay, setDateDisplay] = useState(formatDate())
   const dateHandler=(e)=>{
    var splitedDate=e.target.value.split("-");
    var monthAndYear=splitedDate[0]+"-"+splitedDate[1];
    setSearchDate(monthAndYear);
    setDateDisplay(e.target.value)
   }
   
    const filteredList=sellList.filter(list=> (list.invoice_date.includes(searchDate)))
    
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <h1 className="text-center text-2xl font-bold">{VisitorName} {VisitorLastName} Sell List</h1>
                <input type="date"  value={dateDisplay} onChange={dateHandler}  className="m-2 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>

            <div className="mt-2">
            <table className="w-full">
            {
                filteredList.length ==0 && 
                <h1 className="text-center text-xl font-bold">No Data Found</h1>
            }
        {
            <thead className="bg-blue-400 text-white">
                <th>Invoice Date</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Province</th>
                <th>Book Page No</th>
                <th>Total Amount</th>
            </thead>
        }

            {
                filteredList.length> 0 && filteredList.map(list=>(
                    <tbody>
                        <th>{list.invoice_date}</th>
                        <th>{list.customer_name}</th>
                        <th>{list.address}</th>
                        <th>{list.province}</th>
                        <th>{list.book_page_no}</th>
                        <th>{parseFloat(list.total_of_invoice).toFixed(2)}</th>
                    </tbody>
                ))
            }
            
        </table>

            </div>
            </div>
            
            </div>
            <div className="flex justify-center px-16">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <h1 className="text-center font-bold">Visitor Sales Details</h1>
                <div className="p-2 bg-blue-400 max-w-max text-white rounded-md p-2">
                <h1 className=" font-bold">Total Sell Of this Month</h1>
                <h1 className=" font-bold text-center">{
                    parseFloat(totalOfThisMonth).toFixed(2)

                }
                </h1>
                

                </div>
            </div>
            </div>
        </div>
    )
}

export default VisitorSellInformation
