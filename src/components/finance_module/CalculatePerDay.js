import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
function CalculatePerDay() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
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

    const [dateDisplay, setDateDisplay] = useState(formatDate())
    const dateHandler=(e)=>{
        
        setDateDisplay(e.target.value)

       }
       const [TotalSell, setTotalSell] = useState(0);
       const [TotalExpense, setTotalExpense] = useState(0);
       const [TotalLedgerMoney, setTotalLedgerMoney] = useState(0);
       const [TotalProfit, setTotalProfit] = useState(0);
       const [MedicineUnderPrice, setMedicineUnderPrice] = useState(0);
       const [TotalInvoiceQuantity, setTotalInvoiceQuantity] = useState(0);
       const [TotalSampleDistribution, setTotalSampleDistribution] = useState(0);
       const [PureProfitOfDay, setPureProfitOfDay] = useState(0);
    

 
       useEffect(() => {
        var formData=new FormData();
        formData.append("date",dateDisplay)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/total_sell.php`,jsonData)
          .then(response=>{
              setTotalSell(response.data.total_sell)
              axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/expense_calculator.php`,jsonData)
              .then(response=>{
                  setTotalExpense(response.data.total_expense)
                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/ledger_money_calculator.php`,jsonData)
                .then(response=>{
                    setTotalLedgerMoney(response.data.total_ledger)
                    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/profit_calculator.php`,jsonData)
                    .then(response=>{
                        setTotalProfit(response.data.total)
                        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/total_medcine_under_price.php`,jsonData)
                        .then(response=>{
                            setMedicineUnderPrice(response.data.total)
                            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/invoice_quantity_calculator.php`,jsonData)
                            .then(response=>{
                                
                                setTotalInvoiceQuantity(response.data.invoice_quantity)
                                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_perday/calculate_smaple_distribution.php`,jsonData)
                                .then(response=>{
                                    setTotalSampleDistribution(response.data.total);
                                    (async function set(){
                                        await setPureProfitOfDay()
                                    }())
                              
                                })
                                
                            })
                        })
                    })
                })

              })
          })
       }, [dateDisplay])



       const pureProfit=()=>{
           return TotalProfit-MedicineUnderPrice-TotalExpense-TotalSampleDistribution;
       }
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg w-full text-center">
           <input type="date"  value={dateDisplay} onChange={dateHandler}  className="m-2 mb-10 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>
        <div className="flex flex-row justify-center flex-wrap">
            
            <div className="p-2 bg-blue-400 max-w-max text-white rounded-md p-2 mb-4 mr-2">
                    <h1 className=" font-bold">Total Sales of {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalSell
                    }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Expense of {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalExpense
                    }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Cash in Hand in {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                    {
                        TotalLedgerMoney
                    }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Profit of {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalProfit
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Medicine Sold below cost Price in {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                {
                    MedicineUnderPrice
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total No of Invoices in {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalInvoiceQuantity
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Sample Distribution {dateDisplay}</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalSampleDistribution
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-center text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Net Profit in {dateDisplay}
                    
                    </h1>
                     <h1 className=" font-bold text-center">
                {
                    parseFloat(pureProfit()).toFixed(2)
                }
                    </h1>
                
            </div>

        </div>
            </div>
            </div>



        </div>
    )
}

export default CalculatePerDay
