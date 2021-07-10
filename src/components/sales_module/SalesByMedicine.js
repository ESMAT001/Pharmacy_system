import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function SalesByMedicine() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [MedicineListForTable, setMedicineListForTable] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sales_by_medicine.php`)
        .then(response=>{
            setMedicineListForTable(response.data)
        })
        
    }, [])
const [MedicneInfoModalDisplay, setMedicneInfoModalDisplay] = useState(false)
const [MedicineSellList, setMedicineSellList] = useState([])


const medicineSellInfo=(medicineId)=>{
setMedicneInfoModalDisplay(true)

var formDataInfo=new FormData()
formDataInfo.append("medicineId",medicineId)
var dataForSend=Object.fromEntries(formDataInfo)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sales_report_by_medicine.php`,dataForSend)
.then(response=>{
    
    setMedicineSellList(response.data)
})

}

const customStyles = {
    content: {
      top: "10%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };

  const DateChangerFromGerordgiaToSolarDate=(date)=>{
    let today = new Date(date).toLocaleDateString('fa-IR');
    return today;
  }

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />


            <div className="p-16 flex justify-center">
            <div className=" p-2 bg-white shadow-lg rounded-lg">
                
                <table cellPadding="5px">
                    {
                        MedicineListForTable.length===0 && 
                        <div className="text-center">
                        <h1 className="text-xl font-bold">No Result</h1>
                        </div>
                    }

                    {
                        MedicineListForTable.length > 0 && <thead>
                            <th className="border border-black">Medicine Name</th>
                            <th className="border border-black">Generic Name</th>
                            <th className="border border-black">Total Sale Quantity</th>
                        </thead>
                    }

                    {
                        MedicineListForTable.length >0 && MedicineListForTable.map(list=>(
                            <tbody>
                                <tr className="cursor-pointer hover:bg-blue-200" onClick={()=>medicineSellInfo(list.medicine_id)}>
                                    <th className="border border-black">{list.product_name}</th>
                                    <th className="border border-black">{list.generic_name}</th>
                                    <th className="border border-black">{list.total_sold_a}</th>

                                </tr>

                            </tbody>
                        ))
                    }
                </table>
            </div>
            </div>

            

<Modal 
isOpen={MedicneInfoModalDisplay}
className=" mt-6 p-4 rounded absolute top-4 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 

<div className="mb-2">
<h1 className="text-md mr-10 float-left font-bold mb-2 text-center inline">
Medicine Sales Information
</h1>
<div className="text-md inline float-right  ml-10 font-bold cursor-pointer" onClick={()=>setMedicneInfoModalDisplay(false)}>
x
    
</div>
</div>
<hr className="mb-2 border border-gray-400 clear-both"/>
<div>
    {
        MedicineSellList.length===0 && <h1 className="font-bold "> No result</h1>
    }

    <table cellPadding="5px">
        {
            MedicineSellList.length > 0 && <thead>
                <th className="border border-black ">Medicine Name</th>

                <th className="border border-black ">Customer Name</th>
                <th className="border border-black ">Customer Address</th>
                <th className="border border-black ">Customer Province</th>
                <th className="border border-black ">Visitor Name</th>
                <th className="border border-black ">Invoice Date</th>
                <th className="border border-black ">Pack Quantity</th>
            </thead>
        }

        {
            MedicineSellList.length >0 && MedicineSellList.map(list=>(
                <tbody>
                    <tr>
                        <th className="border border-black">{list.product_name}</th>
                        <th className="border border-black">{list.customer_name}</th>
                        <th className="border border-black">{list.customer_address}</th>
                        <th className="border border-black">{list.customer_province}</th>
                        <th className="border border-black">{list.name}</th>
                        <th className="border border-black">{list.invoice_date} --- {DateChangerFromGerordgiaToSolarDate(list.invoice_date)}</th>
                        <th className="border border-black">{list.pack_quantity}</th>
                    </tr>
                </tbody>
            ))
        }
    </table>
</div>

<div className="my-4 text-center">
    <button className="bg-blue-400 text-white font-bold p-2 rounded-md hover:bg-blue-600" onClick={()=>setMedicneInfoModalDisplay(false)}>Close</button>
</div>
            </Modal>
        </div>
    )
}

export default SalesByMedicine
