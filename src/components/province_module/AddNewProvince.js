import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function AddNewProvince() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }


    const [ProvinceName, setProvinceName] = useState("")

    const submitormHandler=(browser)=>{
        browser.preventDefault()
        var formData=new FormData()
        formData.append("provinceName",ProvinceName)
        var convertedToJson=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/add_province.php`,convertedToJson)
        .then(response=>{
            if(response.data.status==="true"){
                history.push("/provincelist")

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
                <h1 className="text-center font-bold text-xl
                mb-3">Add Province</h1>
            <form onSubmit={submitormHandler}>
            <input type="text" className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Province Name" 
            value={ProvinceName}
            onChange={(e)=>setProvinceName(e.target.value)} 
           required
           />
           <br />
            <input type="submit" className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white border-2 mb-2 font-bold focus:outline-none  rounded-md w-52 px-3 py-1 mx-2 " placeholder="Province Name"  
            value="Add Province"
           />
            
            </form>



            </div>
            </div>
        </div>
    )
}

export default AddNewProvince
