import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../BASE_URL";
import Modal from "react-modal";
function SampleDistributionInfo({
  el,
  i,
  openModal,
  setProductNames,
  externalVal,
}) {

  const history =useHistory();
  const [quantity, setQuantity] = useState(el.quantity);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [description, setDescription] = useState(el.description);
  const [date, setDate] = useState(el.dis_date);
  const [medicineId, setMedicineId] = useState(parseInt(el.medicine_id));
  const [productName, setProductName] = useState("");
  const [costPrice, setCostPrice] = useState(0);

  const [total, setTotal] = useState(parseInt(el.total_amount));
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (costPrice !== 0) setTotal(costPrice * quantity);
  }, [quantity]);

  async function getInfo() {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/get_specific_medicine_info.php`,
        [medicineId]
      )
      .then((res) => {
        if (res.data.status) {
          setProductName(res.data.data[0].product_name);
          setProductNames((prev) => ({
            ...prev,
            [res.data.data[0].product_name]: medicineId,
          }));
          axios
            .post(
              `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/cost_price_of_a_specific_medicine.php`,
              medicineId
            )
            .then((res) => {
              if (res.data.status) setCostPrice(parseInt(res.data.cost_price));
            });

          axios
            .post(
              `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,
              { medicineId }
            )
            .then((res) => setTotalQuantity(res.data.remain));
        }
      });
  }
  useEffect(() => {
    getInfo();
  }, []);

const [EditSampleDistributionModal, setEditSampleDistributionModal] = useState(false);
const [DescriptionForModal, setDescriptionForModal] = useState("");
const [QuantityForModal, setQuantityForModal] = useState(0);
const [DateForModal, setDateForModal] = useState("");
const [DisId, setDisId] = useState(0);
const [MedicineInformationId, setMedicineInformationId] = useState(0);

const EditSampleDistributionHandler=(disId)=>{
   setEditSampleDistributionModal(true);
  setDescriptionForModal(el.description)
  setQuantityForModal(el.quantity)
  setDateForModal(el.dis_date)
  setDisId(el.dis_id)
setMedicineInformationId(el.medicine_information_id)
 }

const ModalHandlerForFormOFEditSample=(browser)=>{
browser.preventDefault();
var formData=new FormData();
formData.append("disId",DisId)
formData.append("description",DescriptionForModal)
formData.append("quantity",QuantityForModal)
formData.append("date",DateForModal)
formData.append("MedicineInformationId",MedicineInformationId)
var jsonData=Object.fromEntries(formData)
axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/edit_sample_distribution_module.php`,jsonData)
.then(response=>{
  if(response.data.status==="true"){
    alert("Data Updated")
    setEditSampleDistributionModal(false)
    window.location.reload();
  }
  else if(response.data.status==="out_of_box"){
    alert("Not Enough Medicne With this Description in Stock")
  }
  else{
    console.log(response.data)
  }
})
}
  return (
    <>

    <Modal isOpen={EditSampleDistributionModal}>
      <div className="text-center">
        <h1 className="font-bold text-cl inline">Edit Sample Ditribution Item</h1>
      <span className="float-right font-bold cursor-pointer inline" onClick={()=>setEditSampleDistributionModal(false)}>X</span>

      </div>

      <hr className="my-3"/>
    <div>

    <form onSubmit={ModalHandlerForFormOFEditSample} >

{/* Main Div for label And input */}
        
<div className="w-full mx-auto flex justify-center">
   <table className="" cellPadding="5px">
     <tbody>
<tr className="">
  <td> <label htmlFor="" className="font-bold mx-4">Description</label> </td>
<td>
<input type="text" onChange={(e)=>setDescriptionForModal(e.target.value)} className="font-bold p-2 border-blue-300 border rounded-md" value={DescriptionForModal}/>

</td>
</tr>

<tr>
  <td> <label htmlFor="" className="font-bold mx-4">Quantity</label> </td>
<td>
<input type="number" min="0"  onChange={(e)=>setQuantityForModal(e.target.value)} className="font-bold p-2 border-blue-300 border rounded-md" value={QuantityForModal}/>

</td>
</tr>

<tr>
  <td> <label htmlFor="" className="font-bold mx-4">Date</label> </td>
<td>
<input type="date" onChange={(e)=>setDateForModal(e.target.value)} className="font-bold w-56 p-2 border-blue-300 border rounded-md" value={DateForModal}/>

</td>
</tr>
<tr>
  <td></td>
  <td>
    <input type="submit" value="Edit" className="py-2 px-4 w-24 float-right font-bold text-white rounded-md bg-green-400 hover:bg-green-500"/>
  </td>
</tr>
</tbody>
        </table>

        </div>
{/* End of Main Div for label And input */}




    </form>


    </div>

    </Modal>
      {show && (
        <tr key={i} className="">
          <td className="border text-sm border-black">{++i}</td>
          <td className="border text-sm border-black  ">{productName}</td>
          <td className="border border-black py-1">
            <textarea
              type="number"
              min="0"
              className="px-2 text-center text-sm w-full  mx-auto   focus:outline-none"
              rows="1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            readOnly></textarea>
          </td>
          <td className="border border-black">
            <input
              type="number"
              min="0"
              className="px-2 text-center w-full  py-1 text-sm focus:outline-none"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            readOnly/>
          </td>
          <td className="border border-black no-print">{totalQuantity}</td>
          <td className="border border-black">
            <input
              type="date"
              className="px-2 text-center w-full  py-1 text-sm focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            readOnly/>
          </td>
          <td className="border border-black  text-sm text-center">{total}</td>
          <td className="no-print">
          <button
              className="py-1 px-2 bg-green-400 text-white  focus:outline-none hover:bg-green-500 transition duration-200 "
             onClick={()=>EditSampleDistributionHandler(el.dis_id)}
             >Edit</button>
          </td>
          <td className="no-print">
            <button
              className="py-1 px-2 bg-red-400 text-white  focus:outline-none hover:bg-red-500 transition duration-200 "
              onClick={() => {
                axios
                  .post(
                    `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/specific_distribution_delete_data.php`,
                    el.dis_id
                  )
                  .then((res) => {
                    if (res.data.status) {
                      alert("data deleted!");
                      setShow(false);
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

export default SampleDistributionInfo;
