import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function InvoiceInfo({ el, i, setTotalBillAmount }) {
  const [packQuantity, setPackQuantity] = useState(el.pack_quantity);
  const [sellPrice, setSellPrice] = useState(el.sell_price);
  const [discount, setDiscount] = useState(el.discount);
  const [GenericName, setGenericName] = useState(el.generic_name)
  const [EditInvoiceItemVisibility, setEditInvoiceItemVisibility] = useState(false)
  function discountAmount() {
    const val1 = ((discount * sellPrice * packQuantity) / 100).toFixed(2);
    const val2 = sellPrice * packQuantity;
    return val2 - val1;
  }

  const [total, setTotal] = useState(discountAmount());
  const [show, setShow] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setTotal(discountAmount());
    if (isSaved) setIsSaved(false);
  }, [sellPrice, discount, packQuantity]);

  useEffect(() => {
    setTotalBillAmount((prev) => prev + total);
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,
        { medicineId: el.medicine_id }
      )
      .then((res) => setTotalQuantity(res.data.remain));
  }, []);

  const [totalQuantity, setTotalQuantity] = useState(0);

  const [invoiceItemIdForModal, setInvoiceItemIdForModal] = useState(0);
  const [discountForModal, setDiscountForModal] = useState(0);
  const [PackQuantityForModal, setPackQuantityForModal] = useState(0);
  const [SellPriceForModal, setSellPriceForModal] = useState(0);
const [ProductNameForModal, setProductNameForModal] = useState("")
const EditInvoiceItemHandler=(medicineDetails)=>{
  setEditInvoiceItemVisibility(true)
  setInvoiceItemIdForModal(medicineDetails.invoice_medicine_list_id)
  setDiscountForModal(medicineDetails.discount)
  setSellPriceForModal(medicineDetails.sell_price)
  setPackQuantityForModal(medicineDetails.pack_quantity)
  setProductNameForModal(medicineDetails.product_name)

}


const formHandlerForEditingInvoiceItem=(browser)=>{
  browser.preventDefault();
  var formData=new FormData();
  formData.append("invoiceInformationMedicineId",invoiceItemIdForModal)
  formData.append("discount",discountForModal)
  formData.append("packQuantity",PackQuantityForModal)
  formData.append("sellPrice",SellPriceForModal)
  var jsonData=Object.fromEntries(formData)
  axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/edit_invoice_one_item.php`,jsonData)
  .then(response=>{
    if(response.data.status==="true"){
      alert("Data Updated")
      window.location.reload();
    }else if((response.data.status==="out_of_qunatity")){
      alert("quantity can't Increase");
      setEditInvoiceItemVisibility(false)

    }
    else{
      console.log(response.data)
    }


  })


}
  return (
    <>
      {show && (
        <tr key={el.invoice_medicine_list_id} className="">
          <td className="border text-sm border-black">{++i}</td>
          <td className="border text-sm border-black " >{el.product_name}</td>
          <td className="border text-sm border-black">{el.generic_name}</td>
          <td className="border border-black py-1">
            <input
              type="number"
              min="0"
              className="px-2 text-center text-sm w-full  mx-auto  py-1  focus:outline-none"
              value={packQuantity}
              onChange={(e) => setPackQuantity(e.target.value)}
           readOnly />
          </td>
          <td className="no-print border border-black">{totalQuantity}</td>
          <td className="border border-black">
            <input
              type="number"
              min="0"
              className="px-2 text-center max-w-max  py-1 text-sm focus:outline-none"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            readOnly/>
          </td>
          <td className="border border-black">
            <input
              type="text"
              min="0"
              className="px-2 py-1 text-center w-full text-sm  mx-auto  focus:outline-none"
              value={discount +" %"}
              onChange={(e) => setDiscount(e.target.value)}
           readOnly />
          </td>
          <td className="border border-black  text-sm text-center">{total}</td>
          <td className="no-print">
           <button onClick={()=>EditInvoiceItemHandler(el)} className="py-1 px-2 bg-green-400 text-white  focus:outline-none hover:bg-green-300 transition duration-200">Edit</button>

          <Modal isOpen={EditInvoiceItemVisibility}>
            <div>
              <span className="font-bold float-right cursor-pointer" onClick={()=>setEditInvoiceItemVisibility(false)}>X</span>
            <div className="text-center">
            <h1 className="inline  text-center text-xl">Edit Invoice Item</h1>

            </div>
            <hr className="my-3"/>
              </div>

            <div>
              <form  onSubmit={formHandlerForEditingInvoiceItem}>

                  <div className="flex flex-col space-y-4" >


                       <div className="flex flex-row justify-center items-center">
                    
                               <div className="w-34 text-center">
                                   <label htmlFor="" className="font-bold">Product Name</label>
                                 </div>
                          <div className="w-48">
                                  <input value={ProductNameForModal} onChange={(e)=>setProductNameForModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2 " type="text" readOnly/>
                         </div>
    

                      </div>

                  <div className="flex flex-row justify-center items-center">
                    
                    <div className="w-34 text-center">
                        <label htmlFor="" className="font-bold">Pack Quantity</label>
                      </div>
                      <div className="w-48">
                       <input value={PackQuantityForModal} onChange={(e)=>setPackQuantityForModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" min="0" type="number" />
                      </div>

                    </div>
                    <div className="flex flex-row justify-center items-center">
                    
                    <div className="w-34 text-center mr-8">
                        <label htmlFor="" className="font-bold">Sell Price</label>
                      </div>
                      <div className="w-48">
                       <input value={SellPriceForModal} onChange={(e)=>setSellPriceForModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" min="0"  type="number" />
                      </div>

                    </div>

                    <div className="flex flex-row justify-center items-center">
                    
                    <div className="w-34 text-center mr-8">
                        <label htmlFor="" className="font-bold">Discount</label>
                      </div>
                      <div className="w-48">
                       <input value={discountForModal} onChange={(e)=>setDiscountForModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" min="0"  type="number" />
                      </div>

                    </div>
                      
                  

                 


                  

                  <div className="text-center ">
                    <input type="submit" className="p-2 bg-blue-400 font-bold text-white rounded-md w-24 cursor-pointer"  value="Edit"/>
                  </div>
                </div>
                

                 
                
              </form>
            </div>
          </Modal>
          </td>
          <td className="no-print">
            <button
              className="py-1 px-2 bg-red-400 text-white  focus:outline-none hover:bg-red-500 transition duration-200 "
              onClick={() => {
                axios
                  .post(
                    `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/specific_invoice_delete_data.php`,
                    el.invoice_medicine_list_id
                  )
                  .then((res) => {
                    if (res.data.status==="true") {
                      alert("data deleted!");
                      window.location.reload()
                      setShow(false);
                    }else{
                      console.log(res.data)
                    }
                  });
              }}
            >
              delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default InvoiceInfo;
