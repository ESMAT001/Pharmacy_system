import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Modal from "react-modal";
import BASE_URL from "../BASE_URL";

function Users() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
const [UsersList, setUsersList] = useState([])
useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/users_module/users_list.php`)    
        .then(response=>{
            setUsersList(response.data)
        })
        return () => {
        
    }
}, [])

const userDelete=(userEmail)=>{
var formData=new FormData()
formData.append("email",userEmail)
var jsonData=Object.fromEntries(formData);
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/users_module/delete_user.php`,jsonData)
.then(response=>{
    if(response.data.status==="true"){
        alert("User Delete Successfully")
        window.location.reload()

    }else if(response.data.status==="unable"){
        alert("Admin User Cannot Be deleted")
    }else{
        console.log(response.data)
    }
})

}
const [EmailForModal, setEmailForModal] = useState("")
const [PasswordForModal, setPasswordForModal] = useState("")
const [AddUserVisibility, setAddUserVisibility] = useState(false)


const userCreationFormSubmit=(browser)=>{
browser.preventDefault();
var formData=new FormData();
formData.append("email",EmailForModal)
formData.append("password",PasswordForModal)
var jsonData=Object.fromEntries(formData)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/users_module/create_user.php`,jsonData)
.then(response=>{
    console.log(response.data)
    if(response.data.status==="true"){
        alert("User Created Successfully")
        setAddUserVisibility(false)
        window.location.reload()

    }else if(response.data.status==="exist"){
        alert("Email is Already Exist Please write new Email")
        
    }
    else{
        console.log(response.data)
    }
})
}
const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

const [ChangePasswordModalVisibility, setChangePasswordModalVisibility] = useState(false)
const [CurrentPassowrdForModalPasswordChamge, setCurrentPassowrdForModalPasswordChamge] = useState("")
const [EmailForPasswrdChange, setEmailForPasswrdChange] = useState("");
const [NewPasswordForPasswordChangeModal, setNewPasswordForPasswordChangeModal] = useState("")


const changePasswordModalHandler=(browser)=>{
    browser.preventDefault();
    var formData=new FormData()
    formData.append("email",EmailForPasswrdChange)
    formData.append("newPassword",NewPasswordForPasswordChangeModal)
    formData.append("currentPassword",CurrentPassowrdForModalPasswordChamge)
    var jsonData=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/users_module/change_password.php`,jsonData)
    .then(response=>{
        if(response.data.status==="true"){
            alert("Password Change Successfully")
            setChangePasswordModalVisibility(false)
        }else if(response.data.status==="problem"){
            alert("Email And Password is not Match")
            setCurrentPassowrdForModalPasswordChamge("")
            setNewPasswordForPasswordChangeModal("")
        }else{
            console.log(response.data)
        }
    })    
}
const changePasswordHandlerModal=()=>{
    setChangePasswordModalVisibility(true)
    setEmailForPasswrdChange("")
    setNewPasswordForPasswordChangeModal("")
    setCurrentPassowrdForModalPasswordChamge("")
}
    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

{/* Modal for Password Change */}
<Modal isOpen={ChangePasswordModalVisibility} 
               style={customStyles}
        contentLabel="Example Modal"
        className="w-2/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60">


<div className="cursor-pointer font-bold float-right inline" onClick={()=>setChangePasswordModalVisibility(false)}>X</div>
            <div className="text-center text-xl">
            <h1 className="inline text-center">Change Password</h1>
            </div>
            <hr className="border-2 border-gray-300 my-3"/>
            <form onSubmit={changePasswordModalHandler} autocomplete="off">

            <table className="mx-auto" cellPadding="5px">
                <thead>
                    <tr>
                        <td><label className="font-bold">Email</label></td>
                        <td><input type="email" value={EmailForPasswrdChange} onChange={(e)=>setEmailForPasswrdChange(e.target.value)} className="border border-blue-400 p-2 rounded-md focus:outline-none" autocomplete="off" /></td>
                    </tr>
                    <tr>
                        <td><label className="font-bold">Current Password</label></td>
                        <td><input type="password" value={CurrentPassowrdForModalPasswordChamge} onChange={(e)=>setCurrentPassowrdForModalPasswordChamge(e.target.value)} className="border border-blue-400 p-2 rounded-md focus:outline-none" required /></td>
                    </tr>

                    <tr>
                        <td><label className="font-bold">New Pasword Password</label></td>
                        <td><input type="password" value={NewPasswordForPasswordChangeModal} onChange={(e)=>setNewPasswordForPasswordChangeModal(e.target.value)} className="border border-blue-400 p-2 rounded-md focus:outline-none" required /></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><input type="submit" value="Change Password"  className="border border-blue-400 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer font-bold w-48 p-2 rounded-md focus:outline-none" /></td>
                    </tr>
                </thead>
            </table>
            </form>
            
</Modal>


{/* end of Modal for Password Change */}


{/* Add User Module */}

<Modal isOpen={AddUserVisibility} 
               style={customStyles}
        contentLabel="Example Modal"
        className="w-2/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60">


<div className="cursor-pointer font-bold float-right inline" onClick={()=>setAddUserVisibility(false)}>X</div>
            <div className="text-center text-xl">
            <h1 className="inline text-center">Create New User</h1>
            </div>
            <hr className="border-2 border-gray-300 my-3"/>
            <form onSubmit={userCreationFormSubmit}>

            <table className="mx-auto" cellPadding="5px">
                <thead>
                    <tr>
                        <td><label className="font-bold">Email</label></td>
                        <td><input type="email" value={EmailForModal} onChange={(e)=>setEmailForModal(e.target.value)} className="border border-blue-400 p-2 rounded-md focus:outline-none" required /></td>
                    </tr>
                    <tr>
                        <td><label className="font-bold">Password</label></td>
                        <td><input type="password" value={PasswordForModal} onChange={(e)=>setPasswordForModal(e.target.value)} className="border border-blue-400 p-2 rounded-md focus:outline-none" required /></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><input type="submit" value="Create User"  className="border border-blue-400 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer font-bold w-48 p-2 rounded-md focus:outline-none" /></td>
                    </tr>
                </thead>
            </table>
            </form>
            
</Modal>
{/* End of Add User Module */}
            <div className="p-16 flex justify-center">
            <div className="w-full p-2 bg-white shadow-lg rounded-lg">
                 <div className="text-center my-4">
                 <button onClick={()=>setAddUserVisibility(true)} className="mx-3 bg-blue-500 hover:bg-blue-700 p-2 font-bold text-white rounded-md">Add User</button>    
                <button className="mx-3 bg-blue-500 hover:bg-blue-700 p-2 font-bold text-white rounded-md" onClick={changePasswordHandlerModal}>Change Password</button>  
                 </div>
            <hr/>

            <table className="mx-auto " cellPadding="5">
                <thead>
                    <tr>
                        <th>Emails of Users</th>
                        <th></th>
                    </tr>
                        {
                            UsersList.length>0 && UsersList.map(list=>(
                                <tbody >
                                    <tr className="border">
                                        <th>{list.email}</th>
                                        <th className="cursor-pointer text-red-500 hover:text-red-700" onClick={()=>userDelete(list.email)}>Delete</th>
                                    </tr>
                                </tbody> 
                            )

                            )
                        }
                </thead>
            </table>

            </div>
            </div>
        </div>
    )
}

export default Users
