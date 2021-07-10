import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function ProvinceList() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

const [ProvinceList, setProvinceList] = useState([])

const provinceListFetch=()=>{
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/province_list.php`)
    .then(response=>{
        setProvinceList(response.data)
    })

}

useEffect(() => {
    provinceListFetch()

}, [])



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

const [EditModalVisibility, setEditModalVisibility] = useState(false)
const [ProvinceNameForModal, setProvinceNameForModal] = useState("")
const [ProvinceIdForModal, setProvinceIdForModal] = useState(0)
const EdiProvinceDetails=(ProvinceId)=>{
setProvinceIdForModal(ProvinceId)
const filterProvince=ProvinceList.filter(list=>list.province_id.includes(ProvinceId))
setProvinceDetails(filterProvince)
setEditModalVisibility(true)

}
const setProvinceDetails=(details)=>{
details.map(list=>{
    setProvinceNameForModal(list.province_name)
})
    
}


const EditProvinceFormSubmit=(browser)=>{
    browser.preventDefault()
    var formData=new FormData()
    formData.append("provinceId",ProvinceIdForModal)
    formData.append("provinceName",ProvinceNameForModal)
    var convertedFiles=Object.fromEntries(formData)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/edit_province_name.php`,convertedFiles)
    .then(respnse=>{
        if(respnse.data.status==="true"){
            setEditModalVisibility(false)
            provinceListFetch()
        }else{
            console.log(respnse.data)
        }
    })

}

    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />
            <Modal
        isOpen={EditModalVisibility}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-1/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >

<div>
<h1 className="float-left font-bold">Edit Province Details</h1>
</div>
<div>
<h1 className="float-right font-bold cursor-pointer " onClick={()=>setEditModalVisibility(false)}>X</h1>
</div>

<div className="clear-both my-3 py-3">
    <hr className="border border-gray-500 " />
</div>

<div className="text-center">

<form onSubmit={EditProvinceFormSubmit}>
            <input type="text" className="border-2 mb-2 font-bold focus:outline-none border-blue-400 rounded-md w-52 px-3 py-1 mx-2 " placeholder="Province Name" 
            value={ProvinceNameForModal}
            onChange={(e)=>setProvinceNameForModal(e.target.value)} 
           
           />
           <br />
            <input type="submit" className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white border-2 mb-2 font-bold focus:outline-none  rounded-md w-52 px-3 py-1 mx-2 " placeholder="Province Name"  
            value="Add Province"
           />
            
            </form>
</div>



          </Modal>
            <div className="p-16 flex justify-center">
            <div className="p-2 bg-white shadow-lg rounded-lg">
               <h1 className="text-center text-xl font-bold">List of Provinces</h1>

               <table className="w-full" cellPadding="5px">
                    <thead>
                            {
                                ProvinceList.length >0 &&
                                <tr>
                                   <th className="border border-black">#</th>
                                   <th className="border border-black">Province Name</th> 
                                   <th className="border border-black"></th> 
                                </tr>
                            }

                            {
                                ProvinceList.length > 0 && ProvinceList.map((list,id)=>(
                                    <tr key={id}>
                                        <th className="border border-black">{id+1}</th>
                                        <th className="border border-black">{list.province_name}</th>
                                        <th  className="border border-black text-green-500 hover:text-green-600 cursor-pointer" onClick={()=>EdiProvinceDetails(list.province_id)}>Edit</th>
                                    </tr>
                                ))
                            }
                    </thead>
               </table>
            </div>
            </div>
        </div>
    )
}

export default ProvinceList
