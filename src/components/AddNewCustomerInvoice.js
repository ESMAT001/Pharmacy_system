import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
function AddNewCustomerInvoice() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

const [customerName, setCustomerName] = useState("")
const [address, setAddress] = useState("")
const [phone, setPhone] = useState("")
const [province, setProvince] = useState("")
const customerHandler=(userData)=>{
setCustomerName(userData);
}
const addressHandler=(userData)=>{
    setAddress(userData);
}
const phoneHandler=(userData)=>{
    setPhone(userData);
}
const provinceHandler=(userData)=>{
    setProvince(userData);
}
const addCutomerForm=(browser)=>{
browser.preventDefault();
var formData=new FormData();
formData.append("customerName",customerName);
formData.append("address",address);
formData.append("phone",phone);
formData.append("province",province);
var dataJson=Object.fromEntries(formData);
axios.post("http://localhost:8080/pharmacyproject/backend/invoice_module/add_new_invoice.php",dataJson)
.then(res=>{
if(res.data.status==="true"){
document.getElementById("Invoice").classList.remove("hidden");
document.getElementById("addCustomerSubmitBtn").classList.add("hidden");         
}else{
    console.log(res)
}
})



}

const [data, setData] = useState("");

useEffect(() => {
    fetchData()
    
}, [])
async function fetchData(){
    const dataFromApi=await axios.get("http://localhost:8080/pharmacyproject/backend/medicine_module/add_to_previous_medicine.php");
    const dataTaken=await dataFromApi.data;
    const convertingDataToJson=dataTaken;
    
   const medicineInOne= await  makeOptionForSelect([convertingDataToJson]);
   document.getElementById("medicineName").innerHTML=medicineInOne;
}
async function DataSet(data){
    setData(data)
}

async function makeOptionForSelect(data){
    
    var output="";
    data.map(element=>{
        output+="<option value=''>Select One Medicine</option>"
        for(let key in element){
            output+=`<option value=${key}>${element[key]}</option>`
        }
    })
    return output
}


const [MedicineValue, setMedicineValue] = useState("");
var [quantityInStock, setQuantityInStock] = useState("")
const [sellPrice, setSellPrice] = useState("")
const [discount, setDiscount] = useState("")
const [sellQuantity, setSellQuantity] = useState("");
var quatityInS="";
async function medicineHandler(e){
   
    var fetchQuantity=await QuantityFetcher(e.target.value);
    console.log(quatityInS)
}
async function QuantityFetcher(medicineId){
   
    var formData=new FormData();
    formData.append("medicineId",medicineId);
    var jsonData=Object.fromEntries(formData);
    var response=await axios.post("http://localhost:8080/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php",jsonData);
    if(response.data.status==="true"){
        document.getElementById("quantityInStock").value=response.data.remain;
        quatityInS=response.data.remain;
        
    }else{
        console.log(response);
    }
    
}

const sellQuantityHandeler=(userData)=>{
    setSellQuantity(userData);

} 




    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">

            <div className="flex flex-col">
            <div className="p-2 bg-white shadow-lg rounded-lg text-center ">
                <h1 className="font-bold">Add New Customer</h1>
                <form onSubmit={addCutomerForm}>
                <FormInput type="text" handler={customerHandler} placeHolder="Customer Name" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                <FormInput type="text" handler={addressHandler} placeHolder="Address" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                <br />
                <FormInput type="text" handler={phoneHandler} placeHolder="Phone No." style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                <FormInput type="text" handler={provinceHandler} placeHolder="Province" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                <br />
                <div id="addCustomerSubmitBtn">
                <SubmitBtn  style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600" value="Add Customer" />
                </div>
                </form>
            </div>
            <div className="p-2 bg-white shadow-lg rounded-lg text-center mt-5 hidden" id="Invoice">
                <form>
                <FormInput type="text"  placeHolder="Book Page No" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
               <br />
                <div>
                <select default={MedicineValue} onChange={medicineHandler} id="medicineName" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3">

                </select>
                <input type="text" id="quantityInStock"   className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3" readOnly />
                <FormInput type="text" handler={sellQuantityHandeler}  placeHolder="Sell quantity" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"  />
                <FormInput type="text"   placeHolder="Sell Price" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"  />
                <FormInput type="text"  placeHolder="Discount" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"  />
                <input type="submit" value="Add" className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"></input>
                
                </div>
                </form>


            </div>
            </div>


            </div>
        </div>
    )
}

export default AddNewCustomerInvoice
