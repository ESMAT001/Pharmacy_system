import React from 'react'
import {useHistory} from "react-router-dom";
import Navbar from "./navbar";


function Index() {
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    return (
       

        <div >
              {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <div className=" ">
                <Navbar />

                <div id="body-content" className="p-16">
                <h1>Index Page</h1>
             </div>  
            </div>
        </div>
    )
}

export default Index
