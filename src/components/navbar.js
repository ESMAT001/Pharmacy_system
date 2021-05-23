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
    return (
        <div >
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
                <h1 className="text-white text-md"><div className="cursor-pointer">Logout</div></h1>
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
                        <tr><div className="cursor-pointer pl-4">Invoice List</div></tr>
                        <tr><div className="cursor-pointer pl-4">Edit Invoice</div></tr>
                        <tr><div className="cursor-pointer pl-4">Sample Distrubution</div></tr>
                        <tr><div className="cursor-pointer pl-4">Sample Distribution List</div></tr>
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



{/* Stock Section */}
<div className=" cursor-pointer" id="stockSubMenu" onClick={stockDisplay}>
                    <tr>
                        <th><div >Stock Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="stockSection">
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/stockRoomView")}>Stock Room View</div></tr>
                        <tr><div className="cursor-pointer pl-4" onClick={()=>history.push("/addtoloosestock")}>Add to Loose Stock</div></tr>
                        <tr><div className="cursor-pointer pl-4">Loose Stock List</div></tr>
                    </div>

{/* End of  Stock Section */}


{/* Ledger Section */}

<div className=" cursor-pointer" id="ledgerSubMenu" onClick={ledgerDisplay}>
                    <tr>
                        <th><div >Ledger Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="ledgerSection">
                        <tr><div className="cursor-pointer pl-4">Ledger</div></tr>
                        <tr><div className="cursor-pointer pl-4">Ledger Recipt</div></tr>
                    </div>

{/* End of Ledger Section */}

{/* Finance Section */}
<div className=" cursor-pointer" id="financeSubMenu" onClick={financeDisplay}>
                    <tr>
                        <th><div >Finance Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="financeSection">
                        <tr><div className="cursor-pointer pl-4">Finance Section</div></tr>
                        <tr><div className="cursor-pointer pl-4">Add Expense</div></tr>
                    </div>

{/* End of finance Section */}

{/* Back up section */}

<div className=" cursor-pointer" id="backupSubMenu" onClick={backupDisplay}>
                    <tr>
                        <th><div >Back Up Section <span className=" ml-2 arrow arrow-down"></span></div></th>
                        
                    </tr>
                    </div>
                    <div className="hidden" id="backupSection">
                        <tr><div className="cursor-pointer pl-4">Back Up </div></tr>
                    </div>

{/* End of Back up section */}



                </table>
            </div>


        </div>
    )
}

export default Navbar
