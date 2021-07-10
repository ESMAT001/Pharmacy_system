import React,{useState} from 'react'
import {useHistory} from "react-router-dom";
import Navbar from "./navbar"
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import axios from 'axios';
import BASE_URL from "./BASE_URL";





function AddNewMedicine() {
    const [prductName, setProductName] = useState("");
    const [genericName, setGenericName] = useState("");
    const [batchNo, setBatchNo] = useState("");
    const [mfgDate, setMfgDate] = useState("");
    const [expDate, setExpDate] = useState("");
    const [packQuantity, setPackQuantity] = useState("");
    const [perPack, setPerPack] = useState("");
    const [costPrice, setCostPrice] = useState("")
    const formSubmit=(browser)=>{
        browser.preventDefault();
        var formData=new FormData();
        formData.append("productName",prductName);
        formData.append("genericName",genericName);
        formData.append("batchNo",batchNo);
        formData.append("mfgDate",mfgDate); 
        formData.append("expDate",expDate);
        formData.append("packQuantity",packQuantity);
        formData.append("perPack",perPack);
        formData.append("costPrice",costPrice)
        var dataJson=Object.fromEntries(formData);
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/add_medicine.php`,dataJson)
        .then(res=>{
            return res.data
            
        }).then(res=>{
           JSON.stringify(res)
            if(res.status==="true"){
                history.push("/stockRoomView")
            }else{
                console.log(res);
                
            }
        })
   
   
    }
const productHandler=(userData)=>{
    setProductName(userData);
}
const genericHandler=(userData)=>{
    setGenericName(userData);
}

const batchNoHandler=(userData)=>{
    setBatchNo(userData);
}
const mfgDateHandler=(userData)=>{
setMfgDate(userData);
}
const expDateHandler=(userData)=>{
    setExpDate(userData);
}

const packQuantityHandler=(userData)=>{
    setPackQuantity(userData);
}
const perPackHandler=(userData)=>{
setPerPack(userData)
}
const costHandler=(userData)=>{
setCostPrice(userData)
}
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }

            <Navbar />
            <div className="p-16 flex justify-center">
            <form onSubmit={formSubmit}>
                    <div className="p-5 bg-white rounded-md shadow-xl">
                        <div className="text-center mb-3 text-xl">Add New Medicine</div>
              

                        <FormInput type="text" placeHolder="Product Name" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={productHandler} />
                        <br />
                        <FormInput type="text" placeHolder="Generic Name" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={genericHandler} />
                        <br />
                        <FormInput type="text" placeHolder="Batch No." style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={batchNoHandler} />
                        <br />
                        <h1>Mfg Date</h1>
                        <FormInput type="date" placeHolder="Mfg Date" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={mfgDateHandler} />
                        <br />
                        <h1>Expire Date</h1>
                        <FormInput type="date" placeHolder="Expire Date" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={expDateHandler} />
                        <br />
                        <FormInput type="text" placeHolder="Cost Price" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={costHandler} />
                        <br />
                        <FormInput type="text" placeHolder="Packs Quantity" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={packQuantityHandler} />
                        <br />
                        <FormInput type="text" placeHolder="Per Packs (exp 2x7)" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" handler={perPackHandler} />
                        <br />
                        <SubmitBtn style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600" value="Add New Medicine" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddNewMedicine;
