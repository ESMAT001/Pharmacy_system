import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";

import axios from 'axios';
function VisitorList() {
    var [visitorList, setData] = useState([{"a":null}]);
    useEffect(() => {
        axios.get("http://localhost:8080/pharmacyproject/backend/visitor_module/visitor_list.php")
        .then(res=>{
           setData(res.data)
           
        })
        return () => {
            
        }
    },[visitorList])
    
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    return (
     
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
                <h1 className="text-center text-xl">List Of Visitors</h1>
                <table className="text-center" cellPadding="10px">

                    
                    <tr>
                        <th >Visitor Name</th>
                        <th>Last Name</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Province</th>
                    </tr>
                {
                    visitorList.map(list=>{
                       return(
                       <tr className="">
                            <td>{list.name}</td>
                            <td>{list.last_name}</td>
                            <td>{list.phone_no}</td>
                            <td>{list.address}</td>
                            <td>{list.province}</td>
                            <td onClick={()=>history.push(`/sellinformationvisitor/${list.visitor_id}`)} className="cursor-pointer font-bold">Sell Information</td>
                        </tr>
                       )
                    })
                }
                </table>
            </div>
            </div>

            
        </div>
    )
}

export default VisitorList
