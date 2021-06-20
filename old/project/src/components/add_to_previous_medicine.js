import React,{useEffect,useState} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
function AddToPreviousMedicine() {
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
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
       document.getElementById("selectMedicine").innerHTML=medicineInOne;
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

const [selectInput, setSelectInput] = useState("")
const [batchNo, setBatchNo] = useState("")
const [mfgDate, setMfgDate] = useState("");
const [expDate, setExpDate] = useState("");
const [packQuantity, setPackQuantity] = useState("");
const [perPack, setPerPack] = useState("");
const [costPrice, setCostPrice] = useState("")

const selectHandler=(e)=>{
        setSelectInput(e.target.value);
        
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
    

   const formHandlerSubmit=(browser)=>{
        browser.preventDefault();
        var formData=new FormData();
        formData.append("medicineID",selectInput);
        formData.append("batchNo",batchNo);
        formData.append("mfgDate",mfgDate);
        formData.append("expDate",expDate);
        formData.append("costPrice",costPrice);
        formData.append("packQuantity",packQuantity);
        formData.append("perPack",perPack);
        var jsonData=JSON.stringify(Object.fromEntries(formData));
        axios.post("http://localhost:8080/pharmacyproject/backend/medicine_module/inst_add_to_previous_handler.php",jsonData)
        .then(res=>{
            if(res.data.status==="true"){
                history.push("/")
            }else{
                console.log(res.data);
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
            <div className="p-5 bg-white rounded-md shadow-xl">
                <form onSubmit={formHandlerSubmit} >
                    <select onChange={selectHandler}  className="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" id="selectMedicine"  required>
                        
                    </select>
                    <div className>
                        <FormInput type="text" handler={batchNoHandler} placeHolder="Batch No" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                        <br />
                        <h1>Mfg Date</h1>
                        <FormInput type="date" handler={mfgDateHandler} placeHolder="Mfg Date" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                        <br />
                        <h1>Expire Date</h1>
                        <FormInput type="date" handler={expDateHandler} placeHolder="Expire Date" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                        <br />
                        <FormInput type="text" handler={costHandler} placeHolder="Cost Price" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                        <br />
                        <FormInput type="text" handler={packQuantityHandler} placeHolder="Packs Quantity" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                        <br />
                        <FormInput type="text" handler={perPackHandler} placeHolder="Per Packs (exp 2x7)" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"  />
                        <br />
                        <SubmitBtn style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600" value="Add To Medicine" />
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default AddToPreviousMedicine
