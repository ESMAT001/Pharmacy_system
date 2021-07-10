import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
function AddToLooseStock() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    
    const [medicineListForSelect, setMedicineListForSelect] = useState([]);

    
    
 useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/medicine_with_id.php`)
    .then(response=>{
        setMedicineListForSelect(response.data)
    })
    


 }, [])
    
    
    
    


    const [QuantityLeftInStock, setQuantityLeftInStock] = useState(0)


const [MedicineIdAfterAdd, setMedicineIdAfterAdd] = useState(0)
const [MedicineNameAfterAdd, setMedicineNameAfterAdd] = useState("")


    function medicineHandler(medicineId){
        var formData=new FormData();
        formData.append("medicineId",medicineId);
        var jsonData=Object.fromEntries(formData);
         axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/calculate_remaining_medicine.php`,jsonData).then(response=>{
            if(response.data.status==="true"){
                setQuantityLeftInStock(response.data.remain)
                setStockQuantity(response.data.remain)
                
            }else{
                console.log(response);
            }
    
         })
        
         const filteredList=medicineListForSelect.filter(mo=>mo.medicine_id.includes(medicineId))

        setMedicneDetailsAfterAdd(filteredList)





        setSellQuantityHandler(0)
    }

function setMedicneDetailsAfterAdd(list){
    list.map(li=>{
        setMedicineIdAfterAdd(li.medicine_id)
        setMedicineNameAfterAdd(li.product_name)
    })
}





    const [stockQuantity, setStockQuantity] = useState(0);
   
    

    const [medicineQuantity, setMedicineQuantity] = useState(0);

const [sellQuantityHandler, setSellQuantityHandler] = useState("");
 const  medicineSellQuantityHandler=(e)=>{
    setSellQuantityHandler(e.target.value);
 }
const [medicineList, setMedicineList] = useState([]);
const addToLooseStockFormHandler=(browser)=>{
    browser.preventDefault();
    
    const newObj={
        medicineId:MedicineIdAfterAdd,
        sellQuantity:sellQuantityHandler,
        medicineName:MedicineNameAfterAdd,
    }

    

    setMedicineList(prev=>[...prev,newObj]);
    setSellQuantityHandler("");
    

}
const medicineNameFinder=(id)=>{
    for(let key in medicineListForSelect){
        if(key===id){
            return medicineListForSelect[key];
        }
    }
}

const savingAllDataToDataBase=()=>{

    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/stock_module/inserting_in_loose_stock.php`,medicineList)
    .then(response=>{
        if(response.data.status==="true"){
            history.push("/looseStockList");
        }
    })
}
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center flex-row">
            <div className="p-2 bg-white  shadow-lg rounded-lg ">
           
            <div>
            <form  onSubmit={addToLooseStockFormHandler}>
                
                <div>
                <select  onChange={(e)=>medicineHandler(e.target.value)} id="medicineName" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" required>
                    <option value="">Select One Medicine</option>
                    {
                        medicineListForSelect.length > 0 && medicineListForSelect.map(list=>(
                            <option value={list.medicine_id}>{list.product_name}</option>

                        )

                        )
                    }
                </select>
                <input type="text" id="quantityInStock" value={QuantityLeftInStock}   className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3" readOnly />

                <input type="text" placeHolder="Quantity" value={sellQuantityHandler}  onChange={medicineSellQuantityHandler}  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3" required  />
                

                <input type="submit" className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"  value="Add"/>

                </div>



                </form>

            </div>
            <div className="flex  justify-center">
{ medicineList.length >0 &&
            <table className=" w-full text-center" cellPadding="5px"  border="2px">
               <caption className="my-2 font-bold">Medicine List for Adding in Loose Stock</caption>
               <thead>
                    <th className="border border-black">Medicine Name</th>
                    <th className="border border-black">Quantity</th>
                </thead>
                <tbody>
            {

                
                medicineList.length >0 && medicineList.map(list=>(

                        <tr key={list.medicineId} >
                        <td className="border border-black">{list.medicineName}</td>
                        <td className="border border-black">{list.sellQuantity}</td>
                    </tr>
                ))



            }
            </tbody>
</table>



            

}

</div>

{
    medicineList.length >0 &&
    <div className="flex justify-center">
    <button onClick={savingAllDataToDataBase} className=" p-2 bg-green-400 mt-2 text-white font-bold rounded-lg hover:bg-green-500">Save</button>
    </div>
}
            </div>

            

            </div>
        </div>
    )
}

export default AddToLooseStock
