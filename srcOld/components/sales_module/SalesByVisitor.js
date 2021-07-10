import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function SalesByVisitor() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }

    const [VisitorList, setVisitorList] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sale_by_visitor.php`)
        .then(response=>{
            setVisitorList(response.data)

        })
        
    }, [])


    const customStyles = {
        content: {
          top: "10%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, 0%)",
        },
      };

const [VisitorSellInformationModal, setVisitorSellInformationModal] = useState(false)
const [VisitorSellInformationList, setVisitorSellInformationList] = useState([])
  const visitorInformation=(visitorId)=>{
      setVisitorSellInformationModal(true)
    var formVisitorId=new FormData()
    formVisitorId.append("visitorId",visitorId)
    var visitorIdForSend=Object.fromEntries(formVisitorId)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/sales_module/sale_report_by_visitor.php`,visitorIdForSend)
    .then(response=>{
        setVisitorSellInformationList(response.data)
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
                {
                    VisitorList.length===0 && <h1 className="font-bold text-center">
                        No result
                    </h1>
                }

                <table cellPadding="5px">
                    {
                        VisitorList.length >0 && <thead>

                            <th className="border border-black">Visitor Name</th>
                            <th className="border border-black">Visitor Last name</th>
                            <th className="border border-black">Total Sale</th>
                        </thead>
                    }

                    {
                        VisitorList.length >0 && VisitorList.map(list=>(
                            <tbody>
                            <tr className="cursor-pointer hover:bg-blue-200" onClick={()=>visitorInformation(list.visitor_id)}>
                            <th className="border border-black">{list.name}</th>
                            <th className="border border-black">{list.last_name}</th>
                            <th className="border border-black">{list.total_of_sale}</th>

                                </tr>
                            </tbody>
                            ))
                    }
                </table>
            </div>
            </div>

<Modal 
isOpen={VisitorSellInformationModal}
className=" mt-6 p-4 rounded absolute top-4 left-0 bottom-0 right-0 bg-white"
overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
style={customStyles}
> 

<div className="mb-2">
<h1 className="text-md mr-10 float-left font-bold mb-2 text-center inline">
Sales Information
</h1>
<div className="text-md inline float-right  ml-10 font-bold cursor-pointer" onClick={()=>setVisitorSellInformationModal(false)}>
x
    
</div>
</div>
<hr className="mb-2 border border-gray-400 clear-both"/>
<div>
    {
        VisitorSellInformationList.length===0 && <h1 className="font-bold text-center">
            No Result
        </h1>
    }
    <table cellPadding="5px">
    {

        VisitorSellInformationList.length > 0 && <thead>
            <th className="border border-black">Visitor Name</th>
            <th className="border border-black">Product Name</th>
            <th className="border border-black">Pack Quantity</th>
            <th className="border border-black">Total Amount</th>
            <th className="border border-black">Customer Name</th>
            <th className="border border-black">Customer Address</th>
            <th className="border border-black">Customer Province</th>
        </thead>
    }

    {
        VisitorSellInformationList.length >0 && VisitorSellInformationList.map(list=>(
            <tbody>
                <tr>
                    <th className="border border-black">{list.name}</th>
                    <th className="border border-black">{list.product_name}</th>
                    <th className="border border-black">{list.pack_quantity}</th>
                    <th className="border border-black">{list.total_of_sale}</th>
                    <th className="border border-black">{list.customer_name}</th>
                    <th className="border border-black">{list.customer_address}</th>
                    <th className="border border-black">{list.customer_province}</th>
                </tr>
            </tbody>
        ))
    }
    </table>
</div>

<div className="my-4 text-center">
    <button className="bg-blue-400 text-white font-bold p-2 rounded-md hover:bg-blue-600" onClick={()=>setVisitorSellInformationModal(false)}>Close</button>
</div>

</Modal>


        </div>
    )
}

export default SalesByVisitor
