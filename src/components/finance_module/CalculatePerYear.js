import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
function CalculatePerYear() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

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

const [TotalAmountOfPrevious, setTotalAmountOfPrevious] = useState(0)

const [Year, setYear] = useState(yearGenerator);
const [TotalAmountCollectedFromPreviousAccount, setTotalAmountCollectedFromPreviousAccount] = useState(0)
const [TotalAmountLeftFromPrevious, setTotalAmountLeftFromPrevious] = useState(0)
    const [SearchVIsibility, setSearchVIsibility] = useState("");


    const [TotalSell, setTotalSell] = useState(0);
    const [TotalExpense, setTotalExpense] = useState(0);
    const [TotalLedgerMoney, setTotalLedgerMoney] = useState(0);
    const [TotalProfit, setTotalProfit] = useState(0);
    const [MedicineUnderPrice, setMedicineUnderPrice] = useState(0);
    const [TotalInvoiceQuantity, setTotalInvoiceQuantity] = useState(0);
    const [TotalSampleDistribution, setTotalSampleDistribution] = useState(0);
    const [PureProfitOfDay, setPureProfitOfDay] = useState(0)

const [TotalPurchaseFromFactory, setTotalPurchaseFromFactory] = useState(0)

const [QuantityLeftInMainStock, setQuantityLeftInMainStock] = useState(0)
const [WorthOfMainSock, setWorthOfMainSock] = useState(0)
const [QuantityLeftInLooseStock, setQuantityLeftInLooseStock] = useState(0)
const [WorthOfLooseStock, setWorthOfLooseStock] = useState(0)
const [TotalExpiredMedicines, setTotalExpiredMedicines] = useState(0)
useEffect(() => {
   
    var formData=new FormData();
    formData.append("date",Year)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /total_sell.php`,jsonData)
      .then(response=>{
          setTotalSell(response.data.total_sell)
          axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /expense_calculator.php`,jsonData)
          .then(response=>{
              setTotalExpense(response.data.total_expense)
            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /ledger_money_calculator.php`,jsonData)
            .then(response=>{
                setTotalLedgerMoney(response.data.total_ledger)
                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /profit_calculator.php`,jsonData)
                .then(response=>{
                    setTotalProfit(response.data.total)
                    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /total_medcine_under_price.php`,jsonData)
                    .then(response=>{
                        setMedicineUnderPrice(response.data.total)
                        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /invoice_quantity_calculator.php`,jsonData)
                        .then(response=>{
                            
                            setTotalInvoiceQuantity(response.data.invoice_quantity)
                            axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear /calculate_smaple_distribution.php`,jsonData)
                            .then(response=>{
                                setTotalSampleDistribution(response.data.total)
                                axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear/calculate_total_medicine_bought_from_market.php`,jsonData)
                                .then(response=>{
                                    setTotalPurchaseFromFactory(response.data.total_bo)
                                    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear/medicine_in_stocks_calculator.php`)
                                    .then(response=>{
                                        setQuantityLeftInMainStock(response.data.quantity_left_in_main_stock)
                                        setWorthOfMainSock(response.data.worth_of_main_stock)
                                        setQuantityLeftInLooseStock(response.data.quantity_left_loose_stock)
                                        setWorthOfLooseStock(response.data.worth_of_loose_stock)

                                        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_peryear/calculate_expire_medicine.php`,jsonData)
                                        .then(response=>{
                                            setTotalExpiredMedicines(response.data.total)
                                        })

                                        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/finance_module/calculate_permonth/calculate_remain_and_paid_pre.php`,jsonData)
                                    .then(response=>{
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

          })
      })


}, [Year])

    const yearHandler=(e)=>{
        setYear(e.target.value)
        
        
    
    }
 const pureProfit=()=>{
     return TotalProfit-MedicineUnderPrice-TotalExpense-TotalSampleDistribution-TotalExpiredMedicines;
 }

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
            <div className="text-center">
                    <select onChange={yearHandler} className="font-bold px-3 py-2 focus:outline-none border border-blue-400 rounded-md">
                            {
                                getDropList()
                            }
                    </select>
                    </div>
                     
        <div className="mt-10">
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
                    <h1 className=" font-bold">Total Cash in Hand </h1>
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
                    <h1 className=" font-bold">Total Money in Market</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalSell-TotalLedgerMoney
                }
                    </h1>
                
            </div>


            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Purchase of Medicine</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalPurchaseFromFactory
                }
                    </h1>
                
            </div>



            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Quantity Of Medicine Left In Main Stock</h1>
                     <h1 className=" font-bold text-center">
                {
                    QuantityLeftInMainStock
                }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Worth Of Main Stock</h1>
                     <h1 className=" font-bold text-center">
                {
                    WorthOfMainSock
                }
                    </h1>
                
            </div>
            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Quantity of Medicine left In Loose Stock</h1>
                     <h1 className=" font-bold text-center">
                {
                    QuantityLeftInLooseStock
                }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Worth Of Loose Stock</h1>
                     <h1 className=" font-bold text-center">
                {
                    WorthOfLooseStock
                }
                    </h1>
                
            </div>

            <div className="p-2 bg-blue-400 max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Total Expired Medicines</h1>
                     <h1 className=" font-bold text-center">
                {
                    TotalExpiredMedicines
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








            <div className="p-2 bg-blue-400 text-center max-w-max text-white mb-4 rounded-md p-2 mr-2">
                    <h1 className=" font-bold">Net Profit In this Year 
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



            </div>
            </div>
        </div>
    )
}

export default CalculatePerYear
