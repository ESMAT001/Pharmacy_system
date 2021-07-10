import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import BASE_URL from "../BASE_URL";
function LooseStockList() {
    const [looseStockList, setLooseStockList] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/loose_stock_list.php`)
        .then(response=>{
            console.log(response.data)
            setLooseStockList(response.data);
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
    const filteredMedicnes=looseStockList.filter(mo=>mo.product_name.toLowerCase().includes(searchInput.toLowerCase()))
    
    
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
            
            <div className="p-16 flex justify-center flex-col">
            <input type="text" placeholder="Search Medicine" onChange={searchHandler}  className="m-2 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>
            <div className="p-2 bg-white shadow-lg rounded-lg">
                <h1 className="text-lg font-bold text-center">Medicines in Loose Stock List</h1>
               {
                   filteredMedicnes.length >0 &&
               <table className="text-center mx-auto w-full" cellPadding="5px" >
                   <thead  className="bg-blue-400 text-white font-semibold shadow">
                       <th>Product Name</th>
                       <th>Generic Name</th>
                       <th>Qunatity</th>
                       <th>Date Added To Loose Stock</th>
                       <th>Mfg Date</th>
                       <th>Expire Date</th>
                       <th>Per Packs</th>
                       <th>Remain In Loose Stock</th>
                   </thead>
                   <tbody className="divide-y-2 divide-blue-400">
                {
                    filteredMedicnes.length >0 && filteredMedicnes.map(list=>(
                        <tr>
                          <td className="font-semibold">{list.product_name}</td>      
                          <td className="font-semibold">{list.generic_name}</td>  
                          <td className="font-semibold">{list.quantity}</td>    
                          <td className="font-semibold">{list.loose_stock_date}</td>      
                          <td className="font-semibold">{list.mfg_date}</td>      
                          <td className="font-semibold">{list.expire_date}</td>      
                          <td className="font-semibold">{list.per_packs}</td>      
                          <td className="font-semibold">{list.remain}</td>      
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
    )
}

export default LooseStockList
