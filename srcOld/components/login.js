import React from 'react';
import {useState} from 'react'
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn"
import axios from "axios";
import {useHistory} from "react-router-dom";
import BASE_URL from "./BASE_URL";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const emailInput=(childData)=>{
        setEmail(childData);
        
    }
    const passwordInput=(childData)=>{
        setPassword(childData)
    }
    const history=useHistory();
    const LoginUser=(browser)=>{
        browser.preventDefault();
        if(email.length<1){
            alert("Please enter Email Address");
            return 0;
        }
        if(password.length<1){
            alert("Please enter Password");
            return 0;
        }
        var formData=new FormData();
        formData.append("email",email);
        formData.append("password",password);
        var jsonData=JSON.stringify(Object.fromEntries(formData));
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/login_module/login.php`,jsonData)
        .then(res=>{
            return res.data
            
        }).then(res=>{
           JSON.stringify(res)
            if(res.status==="true"){
                console.log(res);
                sessionStorage.setItem("email",email);
                history.push("/")
            }else{
                setPassword("");
                console.log(res);
                alert("User Name or Password Is not Valid");
                
            }
        })
        
    }

    return (
        
        <div className="bg-white border max-w-max mx-auto px-12 py-5 mt-32 rounded-md shadow-2xl">
            {
            document.getElementById("body").classList.add("bg-blue-400")
            
            }
            <h1 className="text-3xl text-center">Login</h1>
            <div className="mt-6">
                <form onSubmit={LoginUser}>
                <div>
                <FormInput type="email" default={email} style="focus:outline-none border-2 border-blue-200 p-1 px-2 rounded-md w-56" placeHolder="Email" handler={emailInput}  />
                </div>
                <div className="mt-4">
                <FormInput type="password" default={password}  style="focus:outline-none border-2 border-blue-200 p-1 px-2 rounded-md w-56" placeHolder="Password" handler={passwordInput}  />
                </div>
                <div className="text-center mt-3">
                    <SubmitBtn value="Login" style="p-2 focus:outline-none rounded-full px-12 bg-blue-400 text-lg text-white hover:bg-blue-500 cursor-pointer" />
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login
