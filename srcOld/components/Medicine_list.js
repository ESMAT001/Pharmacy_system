import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
function MedicineList() {

     
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    const [allData, setAllData] = useState("");
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/dislay_all_medicine.php`)
        .then(res=>{
           return res.data
        })
        .then(res=>{
           console.log(res);
           var allData=retriveData(res);
           document.getElementById("allDataDisplay").innerHTML=allData
        })
      const retriveData=(data)=>{
            let output=""
            data.map(list=>{
                output+=`<tr>
                    <td class="text-center">${list.product_name}</td>
                    <td class="text-center">${list.generic_name}</td>
                    <td class="text-center">
                        <span  class='font-bold cursor-pointer mr-2'>Edit</span>
                        <span class='font-bold  cursor-pointer'>Medicine Info</span>
                        
                    <td>

                </tr>`
            })
            return output
        }
        
        

        return () => {
     
        }
    })


     
    return (
        <div >
            {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
           <div className="flex justify-center p-16">
            <div className="bg-white p-2 rounded-md">
                <table  >
                    <tr className="">
                        <th className="border border-gray-600 px-4 ">Product Name</th>
                        <th className="border border-gray-600 px-14">Generic Name</th>
                        <th className="border border-gray-600 px-14">Action</th>
                    </tr>
                <tbody id="allDataDisplay">

                </tbody>
                   
                </table>
            </div>
           </div>
        </div>
    )
}

export default MedicineList
