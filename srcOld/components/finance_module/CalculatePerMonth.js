import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
function CalculatePerMonth() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [SearchVIsibility, setSearchVIsibility] = useState("hidden");
const getDropList = () => {
        const year = new Date().getFullYear();
      return (
          Array.from( new Array(3), (v,i) =>
            <option key={i} value={year-i} className="font-bold">{year-i}</option>
        )
      );
};
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
const contcatinateMonth=(year,month)=>{

    return year+"-"+"0"+month
}

const [TotalAmountOfPrevious, setTotalAmountOfPrevious] = useState(0)
const [TotalAmountCollectedFromPreviousAccount, setTotalAmountCollectedFromPreviousAccount] = useState(0)
const [TotalAmountLeftFromPrevious, setTotalAmountLeftFromPrevious] = useState(0)
const [TotalSell, setTotalSell] = useState(0);
       const [TotalExpense, setTotalExpense] = useState(0);
       const [TotalLedgerMoney, setTotalLedgerMoney] = useState(0);
       const [TotalProfit, setTotalProfit] = useState(0);
       const [MedicineUnderPrice, setMedicineUnderPrice] = useState(0);
       const [TotalInvoiceQuantity, setTotalInvoiceQuantity] = useState(0);
       const [TotalSampleDistribution, setTotalSampleDistribution] = useState(0);
       const [PureProfitOfDay, setPureProfitOfDay] = useState(0)
const [ExpiredMedicineTotal, setExpiredMedicineTotal] = useState(0)

       const fetchData=()=>{
        
        var searchYearMonth=contcatinateMonth(Year,Month)

        setSearchVIsibility("");
        var formData=new FormData();
        formData.append("date",searchYearMonth)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/total_sell.php`,jsonData)
          .then(response=>{
              setTotalSell(response.data.total_sell)
              axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/expense_calculator.php`,jsonData)
              .then(response=>{
                  setTotalExpense(response.data.total_expense)
                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/ledger_money_calculator.php`,jsonData)
                .then(response=>{
                    setTotalLedgerMoney(response.data.total_ledger)
                    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/profit_calculator.php`,jsonData)
                    .then(response=>{
                        setTotalProfit(response.data.total)
                        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/total_medcine_under_price.php`,jsonData)
                        .then(response=>{
                            setMedicineUnderPrice(response.data.total)
                            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/invoice_quantity_calculator.php`,jsonData)
                            .then(response=>{
                                
                                setTotalInvoiceQuantity(response.data.invoice_quantity)
                                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/calculate_smaple_distribution.php`,jsonData)
                                .then(response=>{
                                    setTotalSampleDistribution(response.data.total)
                                    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/calculate_expire_medicine_per_month.php`,jsonData)
                                    .then(response=>{
                                        setExpiredMedicineTotal(response.data.total)
                                    })
                                    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/calculate_remain_and_paid_pre.php`,jsonData)
                                    .then(response=>{
                                        console.log(response.data)
                                        setTotalAmountCollectedFromPreviousAccount(response.data.paid)
                                        setTotalAmountOfPrevious(response.data.total)
                                        setTotalAmountLeftFromPrevious(response.data.remain)
                                    })
                                    
                                })
                                
                            })
                        })
                    })
                })

              })
          })
    
    }
 const pureProfit=()=>{
     return TotalProfit-MedicineUnderPrice-TotalExpense-TotalSampleDistribution-ExpiredMedicineTotal;
 }
       return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
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
                
            </div>
            
            </div>
        
        <div className={SearchVIsibility}>
            <div className="px-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">

<div className="flex flex-row justify-center flex-wrap">
            <div className="p-2 bg-blue-400 max-w-max text-white rounded-md p-2 mb-4 mr-2">
                    <h1 className=" font-bold">Total Sales</h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalSell
                    }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Expense</h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalExpense
                    }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Cash In Hand </h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalLedgerMoney
                    }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Profit</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalProfit
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Medicine Sold below cost Price</h1>
                     <h1 className=" font-bold text-center">
                {
                    MedicineUnderPrice
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total No of Invoices </h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalInvoiceQuantity
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Sample Distribution</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalSampleDistribution
                }
                    </h1>
                
            </div>


            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Medicne Expire In this Month</h1>
                     <h1 className=" font-bold text-center">
                {
                    ExpiredMedicineTotal
                }
                    </h1>
                
            </div>


            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Money of Previous Database</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalAmountOfPrevious
                }
                    </h1>
                
            </div>



            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Money Collected From Previous Database</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalAmountCollectedFromPreviousAccount
                }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Money Left with Customer</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalAmountLeftFromPrevious
                }
                    </h1>
                
            </div>




            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Net Profit In this Month</h1>
                     <h1 className=" font-bold text-center">
                {
                    pureProfit()
                }
                    </h1>
                
            </div>

           
            
</div>



                
            </div>
            </div>
        </div>






        

        </div>
    )
}

export default CalculatePerMonth
