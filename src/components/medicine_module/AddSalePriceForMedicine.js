import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";

function AddSalePriceForMedicine() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

const [ListOfMedicineWithPrice, setListOfMedicineWithPrice] = useState([])

useEffect(() => {
    fetchDataFromDatabase()
    
}, [])

const fetchDataFromDatabase=()=>{

    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/medicine_list_with_sale.php`)
    .then(response=>{
    setListOfMedicineWithPrice(response.data)
    })

}

const [MedicinePriceModalVisibility, setMedicinePriceModalVisibility] = useState(false)

const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };
const [MedicneSalePriceFromModal, setMedicneSalePriceFromModal] = useState(0)
  const [ProductNameForModal, setProductNameForModal] = useState("")
  const [GenericNameForModal, setGenericNameForModal] = useState("")
const [RealMedicineIdForModal, setRealMedicineIdForModal] = useState(0)

  const setMedicneDetails=(medicineList)=>{
      
    medicineList.map(list=>{
        setProductNameForModal(list.product_name)
        setGenericNameForModal(list.generic_name)
    })
  }
const addSalePriceModal=(medicineId)=>{
    setRealMedicineIdForModal(medicineId)
setMedicinePriceModalVisibility(true)
const filterMedcine=ListOfMedicineWithPrice.filter(list=>list.real_id.includes(medicineId))

setMedicneDetails(filterMedcine)


}

const FormSubmitFormFromModal=(browser)=>{
browser.preventDefault()
var DataForm=new FormData()
DataForm.append("salePrice",MedicneSalePriceFromModal)
DataForm.append("medicineId",RealMedicineIdForModal)
var convertedToJson=Object.fromEntries(DataForm)

axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/updating_price_of_medicine.php`,convertedToJson)
.then(response=>{
    if(response.data.status==="true"){
        alert("Sale Price is Add For Medicne")
        setMedicinePriceModalVisibility(false)
        setMedicneSalePriceFromModal(0)
        fetchDataFromDatabase()
    }else{
        console.log(response.data)
    }
})
}


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
       <table className="w-full" cellPadding="5px">
           <thead className="bg-blue-400 text-white font-semibold shadow">
           <tr className="bg-blue-400 text-white">
                        <th className="p-1 border border-white">Product Name</th>
                        <th className="p-1 border border-white">Generic Name</th>
                        <th className="p-1 border border-white">Sell Price</th>
                        <th className="p-1 border border-white"></th>
                        
                    </tr>
           </thead>
           <tbody>
               {
                   ListOfMedicineWithPrice.length >0 && ListOfMedicineWithPrice.map((list,id)=>(
                        <tr key={id}>
                            <th className="border border-blue-400">{list.product_name}</th>
                            <th className="border border-blue-400">{list.generic_name}</th>
                            <th className="border border-blue-400">{list.sale_price}</th>

                            <th className="border border-blue-400 text-green-500 hover:text-green-600 cursor-pointer" onClick={()=>addSalePriceModal(list.real_id)}>
                                Add Sale Price For Medicine
                            </th>
                        </tr>
                   ))
               }
           </tbody>
       </table>
            </div>
            <Modal
        isOpen={MedicinePriceModalVisibility}
        className=" p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}>

<div>
    <h1 className="text-xl font-bold text-center inline mx-24">Add Sale Price For Medicne</h1>
    <span className="font-bold float-right cursor-pointer" onClick={()=>setMedicinePriceModalVisibility(false)} >X</span>
    <hr className="my-3"/>

</div>

<div>

<form onSubmit={FormSubmitFormFromModal}>
    <table className="w-full" cellPadding="5px">
               <thead>
                   <tr>
                       <th>Product Name</th>
                       <th>{ProductNameForModal}</th>
                   </tr>
                   <tr>
                       <th>Generic Name</th>
                       <th>
                           {GenericNameForModal}
                       </th>
                   </tr>

                   <tr>
                       <th>Sale Price</th>
                       <th><input type="number" min="0" value={MedicneSalePriceFromModal} onChange={(e)=>setMedicneSalePriceFromModal(e.target.value)} className="p-2 border border-blue-400  focus:outline-none rounded-md" required/></th>
                   </tr>
                   <tr>
                       <th></th>
                       <th>
                       <input type="submit" value="Add" className="p-2 border border-blue-400 bg-blue-400 cursor-pointer text-white hover:bg-blue-500 font-bold px-10 focus:outline-none rounded-md" required/>
                       </th>
                   </tr>
               </thead>
    </table>
</form>


</div>


</Modal>


            </div>
        </div>
    )
}

export default AddSalePriceForMedicine
