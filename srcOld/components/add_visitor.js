import React,{useState} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import axios from 'axios';
import BASE_URL from "./BASE_URL";


function AddVisitor() {
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
const [name, setName] = useState("")
const [lastName, setLastName] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState("")
const [province, setProvince] = useState("")
    const nameHandler=(userData)=>{
        setName(userData)
    }
    const lastNameHandler=(userData)=>{
        setLastName(userData)
    }
    const phoneHandler=(userData)=>{
        setPhone(userData)
    }
    const addressHandler=(userData)=>{
        setAddress(userData)
    }
    const provinceHandler=(userData)=>{
        setProvince(userData)
    }
    async function formSubmit(browser){
        browser.preventDefault();
        var formData =new FormData();
        formData.append("name",name);
        formData.append("lastName",lastName);
        formData.append("phone",phone);
        formData.append("address",address);
        formData.append("province",province);
        var allDataJson=Object.fromEntries(formData);

        var response=await axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/add_visitor.php`,allDataJson);
        var data=await response.data;
        if(data.status==="true"){
            history.push("/")
        }else{
            console.log(data)
        }


    }

    return (
        <div>
            {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
            <div className="p-16 flex justify-center ">
            <div className="p-4 bg-white rounded-md shadow-lg">
               <form onSubmit={formSubmit}>
                <FormInput type="text" handler={nameHandler} placeHolder="Visitor Name" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                <br />
                <FormInput type="text" handler={lastNameHandler} placeHolder="Visitor Last Name" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                <br />
                <FormInput type="text" handler={phoneHandler} placeHolder="Phone No" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                <br />
                <FormInput type="text" handler={addressHandler} placeHolder="Address" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                <br />
                <FormInput type="text" handler={provinceHandler} placeHolder="Province" style="p-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
               <br />
               <SubmitBtn style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600" value="Add Visitor"/>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AddVisitor
