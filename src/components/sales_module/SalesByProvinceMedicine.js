import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function SalesByProvinceMedicine() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [MedicineListForTable, setMedicineListForTable] = useState([])
    const [ProvinceNameForSelect, setProvinceNameForSelect] = useState([])
    const [TableVisibility, setTableVisibility] = useState("hidden")


    useEffect(() => {

        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/province_list.php`)
        .then(response=>{
            setProvinceNameForSelect(response.data)
        })


       
        
    }, [])
const [MedicneInfoModalDisplay, setMedicneInfoModalDisplay] = useState(false)
const [MedicineSellList, setMedicineSellList] = useState([])



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


const [SelectedProvinceByUser, setSelectedProvinceByUser] = useState("")

const SelectProvinceHandler=(e)=>{
    setSelectedProvinceByUser(e.target.value)

    setTableVisibility("")
    var formData=new FormData()
    formData.append("province",e.target.value)
    var convertedJson=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sales_by_province_medicine.php`,convertedJson)
    .then(response=>{
        setMedicineListForTable(response.data)
    })
    
}


const medicineSellInfo=(medicineId)=>{
    setMedicneInfoModalDisplay(true)
    
    var formDataInfo=new FormData()
    formDataInfo.append("medicineId",medicineId)
    formDataInfo.append("province",SelectedProvinceByUser)
    var dataForSend=Object.fromEntries(formDataInfo)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sales_report_by_province_medicine.php`,dataForSend)
    .then(response=>{
        
        setMedicineSellList(response.data)
    })
    
    }

    return (
        <div>
        {
               document.getElementById("body").classList.add("bg-blue-500")
       }
       <Navbar />


       <div className="pt-16 pb-5 flex justify-center">
       <div className=" p-2 bg-white shadow-lg rounded-lg">
            <select 
            value={SelectedProvinceByUser}
            onChange={SelectProvinceHandler}
            className="font-bold p-2 focus:outline-none border border-blue-400 rounded-md w-72"
            >
                <option value="" className="font-bold">Select Province</option>
                {
                    ProvinceNameForSelect.length >0 && ProvinceNameForSelect.map((list,id)=>(
                        <option key={id} className="font-bold" value={list.province_id}>{list.province_name}</option>
                    ))
                }
            
            </select> 
          
       </div>
       </div>


<div className={`mx-auto bg-white max-w-max p-2 rounded-md ${TableVisibility}`}>
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

export default SalesByProvinceMedicine
