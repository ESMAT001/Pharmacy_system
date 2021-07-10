import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';

import BASE_URL from "../BASE_URL";

function Backup() {

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
                <table>
                    <thead>
                        <tr>
                            <td><label className="font-bold mx-3">Select Disk</label></td>
                            <td><input type="file"/></td>
                        </tr>
                    </thead>
                </table>
            </div>
            </div>
        </div>
    )
}

export default Backup
