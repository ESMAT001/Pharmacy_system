import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function StockRoomView() {
   const [medicineList, setMedicineList] = useState([]);
   
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/stock_room_view.php`)
        .then(res=>{
            setMedicineList(res.data)
        })
        return () => {
            
        }
    }, [])
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [searchInput, setSearchInput] = useState("");
    const searchHandler=(e)=>{
        setSearchInput(e.target.value);
    }

    const filteredMedicnes=medicineList.filter(mo=>mo.product_name.toLowerCase().includes(searchInput.toLowerCase()))
    
const [EditMedicineInfoInStockView, setEditMedicineInfoInStockView] = useState(false);
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
  const [MedicineInfoIdForModal, setMedicineInfoIdForModal] = useState(0)
  const [ProductNameForModal, setProductNameForModal] = useState("")
  const [GenericNameForModal, setGenericNameForModal] = useState("")
  const [BatchNoForModal, setBatchNoForModal] = useState("")
  const [PackQuantityForModal, setPackQuantityForModal] = useState(0)
  const [MfgDateForModal, setMfgDateForModal] = useState("")
  const [ExpDateForModal, setExpDateForModal] = useState("")
  const [CostPriceForModal, setCostPriceForModal] = useState(0)
  const [PerPackForModal, setPerPackForModal] = useState("")
  const [EntryDateForModal, setEntryDateForModal] = useState("")
  const [MedicineIdForModal, setMedicineIdForModal] = useState(0)

const EditMedicineInfo=(medicineInfoId)=>{
    setEditMedicineInfoInStockView(true)
 const filteredListForModal=medicineList.filter(list=>list.medicine_info_id.includes(medicineInfoId))
    filteredListForModal.map(list=>{
        setMedicineInfoIdForModal(list.medicine_info_id)
        setProductNameForModal(list.product_name)
        setGenericNameForModal(list.generic_name)
        setBatchNoForModal(list.batch_no)
        setPackQuantityForModal(list.packs_quantity)
        setMfgDateForModal(list.mfg_date)
        setExpDateForModal(list.expire_date)
        setCostPriceForModal(list.cost_price)
        setEntryDateForModal(list.entry_date)
        setPerPackForModal(list.per_packs)
        setMedicineIdForModal(list.medicine_id)

        
    })
}

const EditMedicineInformationHandler=(browser)=>{
    browser.preventDefault()
    var formData=new FormData()
    formData.append("medicineInfoId",MedicineInfoIdForModal)
    formData.append("productName",ProductNameForModal)
    formData.append("genericName",GenericNameForModal)
    formData.append("batchNo",BatchNoForModal)
    formData.append("packQuantity",PackQuantityForModal)
    formData.append("mfgDate",MfgDateForModal)
    formData.append("expireDate",ExpDateForModal)
    formData.append("costPrice",CostPriceForModal)
    formData.append("perPacks",PerPackForModal)
    formData.append("entryDateToStock",EntryDateForModal)
    formData.append("medicineId",MedicineIdForModal)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/editing_stock_list.php`,jsonData)
    .then(response=>{
        if(response.data.status==="true"){
            alert("Data Updated")
            window.location.reload()
        }else if(response.data.status==="less_quantity"){
            alert("You can't reduce the quantity of medicine you already sold")
            setEditMedicineInfoInStockView(false)
            
        }
        else{
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

            <div className="pt-16 flex justify-center">

            <div className="w-full flex flex-col">
            <input type="text" placeholder="Search Medicine" onChange={searchHandler}  className="m-2 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>
            
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
            <h1 className="text-center py-2 text-xl">Main Stock List</h1>

{   
filteredMedicnes.length >0 && 
            <table className="w-full" >
                <thead className="bg-blue-400 text-white font-semibold shadow">
                    <tr className="bg-blue-400 text-white">
                        <th className="p-1">Product Name</th>
                        <th className="p-1">Generic Name</th>
                        <th className="p-1">Batch No</th>
                        <th>Pack Quantity</th>
                        <th className="p-1">Mfg Date</th>
                        <th className="p-1">Expire Date</th>
                        <th className="p-1">Cost Price</th>
                        <th className="p-1">Per Packs</th>
                        <th className="p-1">Entry Date to Stock</th>
                        <th className="p-1">Remain In Stock</th>
                        <th>Action</th>
                       
                    </tr>
                </thead>
                <tbody  className="divide-y-2 divide-blue-300 text-center">
                    {
                        filteredMedicnes.length > 0 && filteredMedicnes.map(list=>(
                            <tr className="" key={list.medicine_info_id}>
                            <td className="font-semibold">{list.product_name}</td>
                            <td className="font-semibold">{list.generic_name}</td>
                            <td className="font-semibold">{list.batch_no}</td>
                            <td className="font-semibold">{list.packs_quantity}</td>
                            <td className="font-semibold">{list.mfg_date}</td>
                            <td className="font-semibold">{list.expire_date}</td>
                            <td className="font-semibold">{list.cost_price}</td>
                            <td className="font-semibold">{list.per_packs}</td>
                            <td className="font-semibold">{list.entry_date}</td>
                            <td className="font-semibold">{list.remain}</td>
                            <td className="cursor-pointer font-semibold text-red-500 hover:text-red-700" onClick={()=>EditMedicineInfo(list.medicine_info_id)}>Edit</td>
                            

                            </tr>
                            ))
                    }
                </tbody>
                </table>
            }

{
    filteredMedicnes.length==0 && <h1 className="text-center font-bold text-2xl mt-3">No Medicine Found</h1>
}

            </div>
            </div>
                
          
            
            
            
            </div>

<Modal
        isOpen={EditMedicineInfoInStockView}
        className=" p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}>
    <div>
        <h1 className="text-xl font-bold text-center inline mx-24">Edit Medicine Information</h1>
        < span className="font-bold float-right cursor-pointer" onClick={()=>setEditMedicineInfoInStockView(false)}>X</span>
        <hr className="border border-gray-500 my-3"/>
        <form onSubmit={EditMedicineInformationHandler}>
        <table cellPadding="5">
        <tbody>
                <tr>
                    <td><label className="font-bold mx-4">Product Name</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setProductNameForModal(e.target.value)} value={ProductNameForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Generic Name</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setGenericNameForModal(e.target.value)} value={GenericNameForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Batch No</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setBatchNoForModal(e.target.value)} value={BatchNoForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Pack Quantity</label></td>
                    <td><input type="number" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setPackQuantityForModal(e.target.value)} min="0"  value={PackQuantityForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Mfg Date</label></td>
                    <td><input type="date" className="w-56 font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setMfgDateForModal(e.target.value)} value={MfgDateForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Expire Date</label></td>
                    <td><input type="date" className="w-56 font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setExpDateForModal(e.target.value)} value={ExpDateForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Cost Price</label></td>
                    <td><input type="number" className="font-bold border border-blue-400 focus:outline-none p-2  rounded-md" min="0"  onChange={(e)=>setCostPriceForModal(e.target.value)} value={CostPriceForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Per Packs</label></td>
                    <td><input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setPerPackForModal(e.target.value)} value={PerPackForModal} /></td>
                </tr>
                <tr>
                    <td><label className="font-bold mx-4">Entry Date To Stock</label></td>
                    <td><input type="date" className="w-56 font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setEntryDateForModal(e.target.value)} value={EntryDateForModal} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="Submit" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md bg-green-500 hover:bg-green-600 text-white w-56" value="Edit" / ></td>
                </tr>
        </tbody>
        </table>
        </form>
    </div>

    
    
    </Modal>
            
        </div>
    )
}

export default StockRoomView
