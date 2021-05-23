import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';

function StockRoomView() {
   const [medicineList, setMedicineList] = useState([]);
   
    useEffect(() => {
        axios.get("http://localhost:8080/pharmacyproject/backend/stock_module/stock_room_view.php")
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
console.log(medicineList)
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">

            <div className="w-full flex flex-col">
            
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <h1 className="text-center py-2 text-xl">Main Stock List</h1>
            <table className="w-full">
                <thead className="bg-blue-400 text-white font-semibold shadow">
                    <tr className="bg-blue-400 text-white">
                        <th className="p-1">Product Name</th>
                        <th className="p-1">Generic Name</th>
                        <th className="p-1">Per Packs</th>
                        <th className="p-1">Quantity In Stock</th>
                    </tr>
                </thead>
                <tbody  className="divide-y-2 divide-blue-300 text-center">
                    {
                        medicineList.length > 0 && medicineList.map(list=>(
                            <tr>
                            <td>{list.product_name}</td>
                            <td>{list.generic_name}</td>
                            <td>{list.per_packs}</td>
                            <td>{list.remain}</td>
                            </tr>
                            ))
                    }
                </tbody>
                </table>




            </div>
            </div>
                
          
            
            
            
            </div>


            
        </div>
    )
}

export default StockRoomView
