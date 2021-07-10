import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function AddNewCustomer() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    const [ProvinceList, setProvinceList] = useState([])

const [CustomerName, setCustomerName] = useState("")
const [CustomerAddress, setCustomerAddress] = useState("")
const [CustomerPhoneNo, setCustomerPhoneNo] = useState("")
const [CustomerProvinceId, setCustomerProvinceId] = useState(0)


useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/province_list.php`)
    .then(response=>{
            setProvinceList(response.data)
    })
    
}, [])



const setCutomerPhoneDetails=(e)=>{
if(CustomerPhoneNo.length >9){
    alert("Phone No Can't br Greater than 10 digit")
setCustomerPhoneNo("")
}else{
    setCustomerPhoneNo(e.target.value)
}


}

const formSubmitForAddingNewCustomer=(browser)=>{
    browser.preventDefault()
    var formData=new FormData()
    formData.append("customerName",CustomerName)
    formData.append("customerAddress",CustomerAddress)
    formData.append("customerPhone",CustomerPhoneNo)
    formData.append("provinceId",CustomerProvinceId)
    var dataConvertedToJson=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/add_new_customer.php`,dataConvertedToJson)
    .then(response=>{
        if(response.data.status==="true"){
            history.push("/customerList");
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
                <h1 className="font-bold text-center my-2">Add New Customer</h1>
            <form onSubmit={formSubmitForAddingNewCustomer}>
            <input type="text" 
            value={CustomerName}
            onChange={(e)=>setCustomerName(e.target.value)}

            className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Customer Name"
            required
            />  
            <br />
            <input type="text"
            value={CustomerAddress}
            onChange={(e)=>setCustomerAddress(e.target.value)}
            className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Customer Address"
            required
            />  
            <br />
            <input type="number"
            value={CustomerPhoneNo}
            onChange={setCutomerPhoneDetails}
            className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Phone No"
            required
            />  
            <br />
            <select onChange={(e)=>setCustomerProvinceId(e.target.value)} className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " required>
                <option value="">Select Province</option>
                {
                    ProvinceList.length > 0 && ProvinceList.map((list,id)=>(
                        <option key={id} value={list.province_id}>{list.province_name}</option>
                    ))
                }
            </select>
            <br />
            <input type="submit" className="border-2 mb-2 cursor-pointer font-bold focus:outline-none bg-blue-400 hover:bg-blue-500 rounded-md text-white w-52 px-3 py-2 mx-2 " 
            value="ADD New Customer"
            required
            />


            </form>

                    
            
            
            
             </div>
            </div>
        </div>
    )
}

export default AddNewCustomer
