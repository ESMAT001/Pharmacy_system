import React from 'react'
import {useHistory} from "react-router-dom";

var menuTransform=false;

const menuCheckTransform=()=>{
    if(menuTransform===false){
    document.getElementById("burger-icon").style.transform='rotate(90deg)';
    document.getElementById("aside-menu").classList.remove("-left-3/4");
    menuTransform=true;
    

    }else{
        document.getElementById("burger-icon").style.transform='rotate(0deg)';
        document.getElementById("aside-menu").classList.add("-left-3/4");

        menuTransform=false;
        
    }

}
const displayMenu=()=>{
    menuCheckTransform();
}
var invoiceDisplayStatus=false;
const invoiceDisplay=()=>{
    if(invoiceDisplayStatus===false){
        document.getElementById("invoiceSubMenu").classList.remove("hidden");
        invoiceDisplayStatus=true;

    }else{
        document.getElementById("invoiceSubMenu").classList.add("hidden");
        invoiceDisplayStatus=false;

    }
}

var medicineDisplayStatus=false;
const medicineDisplay=()=>{
    if(medicineDisplayStatus===false){
        document.getElementById("medicineMenu").classList.remove("hidden");
        medicineDisplayStatus=true;
    }else{
        document.getElementById("medicineMenu").classList.add("hidden");
        medicineDisplayStatus=false;
    }
}

var visitorDisplayStatus=false;
const visitorDisplay=()=>{
if (visitorDisplayStatus===false){
    document.getElementById("visitorSection").classList.remove("hidden");
    visitorDisplayStatus=true;
}else{
    document.getElementById("visitorSection").classList.add("hidden");
    visitorDisplayStatus=false;
}
}
var customerDisplayStatus=false;
const customerDisplay=()=>{
if(customerDisplayStatus===false){
    document.getElementById("customerSection").classList.remove("hidden");
    customerDisplayStatus=true;
}else{
    document.getElementById("customerSection").classList.add("hidden");
    customerDisplayStatus=false;
}
}
var stockDisplayStatus=false;
const stockDisplay=()=>{
if(stockDisplayStatus===false){
    document.getElementById("stockSection").classList.remove("hidden");
    stockDisplayStatus=true;
}else{
    document.getElementById("stockSection").classList.add("hidden");
    stockDisplayStatus=false;
}
}
var ledgerDisplayStatus=false;
const ledgerDisplay=()=>{
if(ledgerDisplayStatus===false){
    document.getElementById("ledgerSection").classList.remove("hidden");
    ledgerDisplayStatus=true;
}else{
    document.getElementById("ledgerSection").classList.add("hidden");
    ledgerDisplayStatus=false;
}
}

var customerPreviousDisplay=false;

const customerPrevious=()=>{
    if(customerPreviousDisplay===false){
        document.getElementById("customerPreviousSection").classList.remove("hidden");
        customerPreviousDisplay=true;
    }else{
        document.getElementById("customerPreviousSection").classList.add("hidden");
        customerPreviousDisplay=false;
    }
}


var financeDisplayStatus=false;
const financeDisplay=()=>{
if(financeDisplayStatus===false){
    document.getElementById("financeSection").classList.remove("hidden");
    financeDisplayStatus=true;
}else{
    document.getElementById("financeSection").classList.add("hidden");
    financeDisplayStatus=false;
}
}

var saleDisplay=false;
const saleDisplayFuncion=()=>{
if(saleDisplay===false){
    document.getElementById("saleSection").classList.remove("hidden");
    saleDisplay=true;
}else{
    document.getElementById("saleSection").classList.add("hidden");
    saleDisplay=false;
}
}










var backupDisplayStatus=false;
const backupDisplay=()=>{
    
if(backupDisplayStatus===false){
    document.getElementById("backupSection").classList.remove("hidden");
    backupDisplayStatus=true;
}else{
    document.getElementById("backupSection").classList.add("hidden");
    backupDisplayStatus=false;
}
}

function Navbar() {
    const history =useHistory();

    const logoutHandler=()=>{
        
        sessionStorage.setItem("email","")
        history.push("/login")
    }
    return (
        <div className="no-print">
         <div className="w-full h-12 bg-gray-900 shadow-lg  fixed z-10">
         <div className="flex flex-row justify-between mx-4 mt-1 items-center">
           <div>
                   <div id="" className="cursor-pointer border border-white rounded-md" onClick={displayMenu}>
                   <div className="burger-icon " id="burger-icon">
                        <div className="icon"></div>
                        <div className="icon"></div>
                         <div className="icon"></div>
                    </div>
                   </div>
            </div>
            <div className="logout">
                <h1 className="text-white text-md"><div className="cursor-pointer font-bold" onClick={logoutHandler}>Logout</div></h1>
            </div>
           </div>


         </div>

            <div className="w-60 p-3 h-full bg-red-200 absolute mt-12 z=0  -left-3/4 " id="aside-menu">
                <table>
                <div onClick={()=>history.push("/")}>
                    <h1 className="text-md cursor-pointer font-bold" >Home Page</h1>
                </div>

{/* Start of Invoice Section */}
                    <div className=" cursor-pointer" id="invoiceSection" onClick={invoiceDisplay}>
                    <tr>
                        <th><div >Invoice Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="invoiceSubMenu">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addnewinvoice")}>Add New Invoice</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addsuplier")}>Add Supplier For Delivery</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/invoiceList")}>Invoice List</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/sampleDistribution")}>Sample Distrubution</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/sampleDistributionList")}>Sample Distribution List</div></tr>
                    </div>
         {/* End of Invoice Section */}

{/* Medicine Secion */}

                    <div className=" cursor-pointer" id="medicineSubMenu" onClick={medicineDisplay}>
                    <tr>
                        <th><div >Medicine Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="medicineMenu">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>{history.push("/addnewmedicine")}}>Add New Medicine</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>{history.push("/addtopreviousmedicine")}}>Add to Previous Medicine</div></tr>
                    </div>
{/* End of Medicne Secion */}

{/* Visitor Section */}



<div className=" cursor-pointer" id="visitorSubMenu" onClick={visitorDisplay}>
                    <tr>
                        <th><div >Visitor Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="visitorSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addvisitor")}>Add Visitor</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/visitorlist")}>Visitor List</div></tr>
                    </div>




{/* End of  Visitor Section */}

{/* Customer Section */}



<div className=" cursor-pointer" id="customerSubMenu" onClick={customerDisplay}>
                    <tr>
                        <th><div >Customer Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
</div>
                    <div className="hidden" id="customerSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/customerList")}>Customer List</div></tr>
                    </div>



{/* End of Customer Section */}


{/* Customer Previous Database */}

<div className=" cursor-pointer" id="customerPrevious" onClick={customerPrevious}>
            <tr>
        <th><div >Customer Previous  <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>


                <div className="hidden" id="customerPreviousSection">
                     <tr><div className="cursor-pointer pl-4 " onClick={()=>history.push("/addtopreviousaccount")}>Add To Previous Accout Of Customer </div></tr>
                    <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addtopreviousaccountlist")}>List of Customer Previous Account </div></tr>
                     <tr>
                    <div className="cursor-pointer pl-4" onClick={()=>history.push("/ledgerreciptprevious")}>Ograyi Recipt</div>
                     </tr>

                     <tr>
                    <div className="cursor-pointer pl-4" onClick={()=>history.push("/ograyireciptlist")}>Ograyi Recipt List Pr</div>
                     </tr>

        </div>
</div>
        






{/* End Of Customer Previous Database */}



{/* Stock Section */}
<div className=" cursor-pointer" id="stockSubMenu" onClick={stockDisplay}>
                    <tr>
                        <th><div >Stock Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="stockSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/stockRoomView")}>Stock Room View</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addtoloosestock")}>Add to Loose Stock</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/looseStockList")}>Loose Stock List</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/expiredmedicinelist")}>Expired Medicine List</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/returnmedicinelist")}>Return Medicine List</div></tr>
                    </div>

{/* End of  Stock Section */}


{/* Ledger Section */}

<div className=" cursor-pointer" id="ledgerSubMenu" onClick={ledgerDisplay}>
                    <tr>
                        <th><div >Ledger Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="ledgerSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/ledger")}>Ledger</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/ledgerRecipt")}>Ograyi Recipt</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/ledgerReciptList")}>Ograyi Recipt List</div></tr>

                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/totalcustomerograyi")}>Total Customer Ograyi</div></tr>

                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/totalvisitorograyi")}>Total Visitor Ograyi</div></tr>
                    </div>

{/* End of Ledger Section */}

{/* Finance Section */}
<div className=" cursor-pointer" id="financeSubMenu" onClick={financeDisplay}>
                    <tr>
                        <th><div >Finance Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="financeSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/financePage")}>Finance Section</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addExpense")}>Add Expense</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/expenseList")}>Expense List</div></tr>
                    
                    </div>

{/* End of finance Section */}


{/* Sales Section Start */}

<div className=" cursor-pointer" id="saleSubMenu" onClick={saleDisplayFuncion}>
                    <tr>
                        <th><div >Sales Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="saleSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/salebymedicine")}>Sales By Medicine</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/salebyvisitor")}>Sales By Visitor</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/salebycustomer")}>Sales By Customer</div></tr>
                    
                    </div>




{/* End of Sale Section */}

{/* Back up section */}

<div className=" cursor-pointer" id="backupSubMenu" onClick={backupDisplay}>
                    <tr>
                        <th><div >Back Up Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="backupSection">
                        <tr><div className="cursor-pointer pl-4"onClick={()=>history.push("/backup")}>Back Up </div></tr>
                    </div>

{/* End of Back up section */}
{/* User Creation */}
<div className=" cursor-pointer" onClick={()=>history.push("/users")}>

<tr>
    <th><div >Users Settings <span className=""></span></div></th>
                        
                    </tr>
</div>

{/* End of User Creation */}



                </table>
            </div>


        </div>
    )
}

export default Navbar
