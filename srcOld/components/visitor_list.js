import React,{useState,useEffect} from 'react'
import Navbar from "./navbar";
import {useHistory} from "react-router-dom";
import BASE_URL from "./BASE_URL";
import axios from 'axios';
import Modal from "react-modal";
function VisitorList() {
    var [visitorList, setData] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
        .then(res=>{
           setData(res.data)
           
        })
        return () => {
            
        }
    },[])
    
    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
 const [EditVisitorVisibility, setEditVisitorVisibility] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchHandler=(e)=>{
        setSearchInput(e.target.value);
        
    }
    const filteredMedicines=visitorList.filter(mo=>mo.name.toLowerCase().includes(searchInput.toLowerCase()))
   const [VisitorNameForModal, setVisitorNameForModal] = useState("");
   const [VisitorLastNameForModal, setVisitorLastNameForModal] = useState("");
   const [PhoneNoForModal, setPhoneNoForModal] = useState(0);
   const [AddressForModal, setAddressForModal] = useState("");
   const [VisitorProvinceForModal, setVisitorProvinceForModal] = useState("")
   const [VisitorIdForModal, setVisitorIdForModal] = useState(0)
    const VisitorEditModalHandler=(visitorId)=>{
    setEditVisitorVisibility(true)
    if(visitorList.length>0){
    const filteredItem=visitorList.filter(li=>li.visitor_id.includes(visitorId))
    if(filteredItem.length>0){
        filteredItem.map(item=>{
            setVisitorNameForModal(item.name)
            setVisitorLastNameForModal(item.last_name)
            setPhoneNoForModal(item.phone_no)
            setAddressForModal(item.address)
            setVisitorProvinceForModal(item.province)
            setVisitorIdForModal(item.visitor_id)
        })
    }

    }



   }

   const editVisitorHandlerFormSubmit=(browser)=>{
       browser.preventDefault();
       var formData=new FormData();
       formData.append("visitorName",VisitorNameForModal)
       formData.append("visitorLastName",VisitorLastNameForModal)
       formData.append("phoneNo",PhoneNoForModal)
       formData.append("address",AddressForModal)
       formData.append("province",VisitorProvinceForModal)
       formData.append("visitorId",VisitorIdForModal)
        var jsonData=Object.fromEntries(formData)
        axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/edit_visitor_information.php`,jsonData)
        .then(response=>{
            if(response.data.status==="true"){
                alert("Data Updated")
                window.location.reload()
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
            <div className="p-2 bg-white shadow-lg rounded-lg w-full">
                <h1 className="text-center text-xl">List Of Visitors</h1>
                <input type="text" placeholder="Search Visitors by Name" onChange={searchHandler}  className="m-2 w-56 p-2 focus:outline-none rounded-md border border-green-700"/>


                <table className="text-center w-full mt-3" cellPadding="10px">

                    <thead className="bg-blue-500 text-white rounded-md" >
                    <tr>
                        <th >Visitor Name</th>
                        <th>Last Name</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Province</th>
                        <th>More Info</th>
                        <th></th>
                    </tr>
                    </thead>
                {
                    filteredMedicines.map(list=>{
                       return(
                           <tbody>
                       <tr className="">
                            <td>{list.name}</td>
                            <td>{list.last_name}</td>
                            <td>{list.phone_no}</td>
                            <td>{list.address}</td>
                            <td>{list.province}</td>
                            <td onClick={()=>history.push(`/visitorsellinformation/${list.visitor_id}`)} className="cursor-pointer font-bold">Sell Information</td>
                            <td>
                                <button 
                                className="p-2 bg-green-400 hover:bg-green-500 font-bold text-white rounded-md focus:outline-none" onClick={()=>VisitorEditModalHandler(list.visitor_id)}>Edit Info</button>
                            </td>
                            
                        </tr>
                        </tbody>
                       )
                    })
                }
                </table>
            </div>
            </div>

            {/* Modal For Editing Visitor Info */}
<Modal isOpen={EditVisitorVisibility} >
<div className="">
<div className="text-center">
        <h1 className="font-bold text-xl inline">Edit Visitor Information</h1>
      <span className="float-right font-bold cursor-pointer inline" onClick={()=>setEditVisitorVisibility(false)}>X</span>

      </div>
    <hr className="my-3"/>

    <div className="flex justify-center bg-blue-400 max-w-max p-2 rounded-md mx-auto ">
        <form onSubmit={editVisitorHandlerFormSubmit}>
        <table className="" cellPadding="8px">
            <tbody>
                <tr>
                    <td><label className="font-bold">Visitor Name</label></td>
                    <td>
                        <input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setVisitorNameForModal(e.target.value)} value={VisitorNameForModal}/>
                    </td>
                </tr>
                <tr>
                    <td><label className="font-bold">Last Name</label></td>
                    <td>
                        <input type="text" onChange={(e)=>setVisitorLastNameForModal(e.target.value)} className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" value={VisitorLastNameForModal}/>
                    </td>
                </tr>

                <tr>
                    <td><label className="font-bold">Phone No:</label></td>
                    <td>
                        <input type="number" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setPhoneNoForModal(e.target.value)} min="0"  value={PhoneNoForModal}/>
                    </td>
                </tr>


                
                <tr>
                    <td><label className="font-bold">Address</label></td>
                    <td>
                        <input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setAddressForModal(e.target.value)} value={AddressForModal}/>
                    </td>
                </tr>
                <tr>
                    <td><label className="font-bold">Province</label></td>
                    <td>
                        <input type="text" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md" onChange={(e)=>setVisitorProvinceForModal(e.target.value)} value={VisitorProvinceForModal}/>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <input type="submit" className="font-bold border border-blue-400 focus:outline-none p-2 rounded-md w-56 bg-red-400 hover:bg-red-500 text-white" value="Edit"/>
                    </td>
                </tr>

            </tbody>
        </table>
</form>
    </div>

</div>
</Modal>
            
{/* end of edit info modal */}


        </div>
    )
}

export default VisitorList
