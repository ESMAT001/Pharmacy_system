import React,{useState,useEffect} from 'react'
import Navbar from "../navbar";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../BASE_URL";

function AddInvoiceForProvince() {

    const history=useHistory();
    var email=sessionStorage.getItem("email");
    if(email==null){
        history.push("/login")
    }
    var [sellQuantity, setSellQuantity] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);

    const [dataArray, setDataArray] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);
const [MedicneIdBeforeAdd, setMedicneIdBeforeAdd] = useState(0)
const [totalOfMedicineQuantityMultiple, settotalOfMedicineQuantityMultiple] = useState(0)
    
    const [sellPrice, setSellPrice] = useState("");
    const [MedicineListForSell, setMedicineListForSell] = useState([])
    const [TotalOfCurrentInvoice, setTotalOfCurrentInvoice] = useState(0)
    const [ProductNameAfterAdd, setProductNameAfterAdd] = useState("")
    const [MedicineIdAfterAdd, setMedicineIdAfterAdd] = useState(0)
    const [QuanityLeftInStock, setQuanityLeftInStock] = useState(0)
    const [ProvinceCustomerList, setProvinceCustomerList] = useState([])
    const [CustomerIdSelectedFromDropDown, setCustomerIdSelectedFromDropDown] = useState("")
useEffect(() => {
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/list_of_province_customers.php`)
    .then(response=>{
        setProvinceCustomerList(response.data)

    })
    

}, [])
const [MedicineListForSend, setMedicineListForSend] = useState([])
const [InvoiceVisibility, setInvoiceVisibility] = useState("hidden")
const [SearchProvince, setSearchProvince] = useState("")
const filterList=ProvinceCustomerList.filter(list=>list.province_name.toLowerCase().includes(SearchProvince.toLowerCase()))

useEffect(() => {
    if(CustomerIdSelectedFromDropDown===""){
        setInvoiceVisibility("hidden")
    }else{
        setInvoiceVisibility("")
    }



}, [CustomerIdSelectedFromDropDown])


useEffect(() => {
    axios.get(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/add_to_previous_medicine.php`
      )
      .then(response=>{
        setMedicineListForSell(response.data)
      })
    



}, [])


const medicineHandler=(medicineId)=>{
    setMedicneIdBeforeAdd(medicineId)
    var formData1=new FormData()
    formData1.append("medicineId",medicineId)
    
    var convertedForSalePrice=Object.fromEntries(formData1)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/finding_price_of_medicine.php`,convertedForSalePrice)
    .then(response=>{
      setSellPrice(response.data.sale_price)
    })
    const filteredMedicine=MedicineListForSell.filter(mo=>mo.medicine_id.includes(medicineId))
    setMedicneDetails(filteredMedicine)


}    

async function setMedicneDetails(list){
    list.map(list=>{
      setProductNameAfterAdd(list.product_name)
      setMedicineIdAfterAdd(list.medicine_id)
    })
    }
useEffect(() => {
   var formDataForMedicineleft=new FormData()
   formDataForMedicineleft.append("medicineId",MedicneIdBeforeAdd)
    var convertedToJsonForSend=Object.fromEntries(formDataForMedicineleft)
   axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,convertedToJsonForSend)
   .then(response=>{
    if (response.data.status === "true") {
        setQuanityLeftInStock(response.data.remain)
      } else {
        console.log(response);
      }
   })


}, [MedicneIdBeforeAdd])




function handleAddClick(e) {
    e.preventDefault();
    if(sellQuantity> QuanityLeftInStock){
      alert("Quantity in Stock is less than Sell Quantity")
      setSellQuantity(0)
    }else{
    
    const newDataObj = {
      customerid:CustomerIdSelectedFromDropDown,
      medicineName: ProductNameAfterAdd,
      medicineId: MedicineIdAfterAdd,
      sellQuantity: sellQuantity,
      sellPrice: sellPrice,
      discount: discount,
      finalPrice: finalPrice,
      totalOfMultiple:totalOfMedicineQuantityMultiple,
      
    };
    setMedicineListForSend(prev=>[...prev,newDataObj])
    setDataArray((prev) => [...prev, newDataObj]);
    



    setSellQuantity("");
    setSellPrice("");
    setDiscount("");
    setQuanityLeftInStock(0)
    setBtnDisabled(true);


  }
  }



useEffect(() => {
 
let dicountedValue=sellPrice-((sellPrice*discount)/100);

setFinalPrice(dicountedValue)


}, [discount,sellPrice])

useEffect(() => {

    if(sellPrice >0 && discount >=0 && finalPrice >0 && sellQuantity >0){

      let totalCalculator=finalPrice*sellQuantity;
      settotalOfMedicineQuantityMultiple(totalCalculator)
        setBtnDisabled(false)
    }

}, [sellPrice,discount,finalPrice,sellQuantity])



useEffect(() => {

    let finalPrice=0;
    let quantity=0;
    let Pre=0;
    dataArray.map(list=>{
          finalPrice=list.finalPrice;
          quantity=list.sellQuantity;
          Pre+=finalPrice*quantity;
    
    })
    
    setTotalOfCurrentInvoice(Pre)
    
    
    
    }, [dataArray])





const saveAllData=()=>{
  axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/province_module/add_invoice_for_province.php`,MedicineListForSend)
  .then(response=>{
    if(response.data.status==="true"){
      alert("Successfully Invoice Added");
      history.push("/invoicelistofprovince")
    }
    
  })
}


    return (
        <div>
             {
                    document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="pt-16 flex justify-center">

            <div className="p-2 bg-white shadow-lg rounded-lg">


            <input type="text"
            value={SearchProvince}
            onChange={(e)=>setSearchProvince(e.target.value)}
            className="p-1 mx-1 focus:outline-none border-2 font-bold border-blue-300 rounded-md  w-full mb-3" placeholder="Search Customer By Province" />
            <br />
            <select
              className="p-1 mx-1 focus:outline-none border-2 font-bold border-blue-300 rounded-md  w-full mb-3"
            onChange={(e)=>setCustomerIdSelectedFromDropDown(e.target.value)}
            >
                <option value="" className="w-full font-bold">Select Customer</option>
                {
                    filterList.length >0 && filterList.map((list,id)=>(
                        <option className="px-2 font-bold" value={list.customer_id} key={id}>{list.customer_name} {list.address} {list.province_name}</option>
                    ))
                }
            </select>

            </div>
           
            </div>
            <div className={`flex justify-center mt-4 ${InvoiceVisibility}`}>
            <div className="p-2 bg-white shadow-lg rounded-lg max-w-max">
            <form>
              <table cellPadding="5px">
               
              <div>
                <tr>
                  <th>Select Medicine</th>
                  <th>Quantity In Stock</th>
                  <th>Sale Quantity</th>
                  <th>Sale Price</th>
                  <th>Discount</th>
                  <th>Final Price</th>
                </tr>
              <tr>
                  <th >

                <select
                  id="medicineName"
                  onChange={(e)=>medicineHandler(e.target.value)}
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3"
                  required
                >

                  <option value="">Select One Medicine</option>
                  {
                    MedicineListForSell.length >0 && MedicineListForSell.map(list=>(
                      <option key={list.medicine_id} value={list.medicine_id}>{list.product_name}</option>
                      ))
                  }

                </select>

                </th>

                <th>
                <input
                  type="number"
                  min="0"
                  value={QuanityLeftInStock}
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3"
                  readOnly
                />
                </th>
                  
                <th>
                <input
                  type="number"
                  min="0"
                  placeHolder="Sell quantity"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={sellQuantity}
                  onChange={(e) => {
                    setSellQuantity(e.target.value);
                  }}
                />
                </th>
                <th>  
                <input
                  type="number"
                  min="0"
                  placeHolder="Sell Price"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                />
                </th>
                <th>
                <input
                  type="number"
                  min="0"
                  placeHolder="Discount"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                </th>
                <th>
                <input
                  type="number"
                  min="0"
                  placeHolder="Final price"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  readOnly={true}
                  value={finalPrice}
                />
                </th>
                <th>
                <input
                  type="submit"
                  value="Add"
                  className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"
                  onClick={handleAddClick}
                  disabled={btnDisabled}
                />
                </th>
                </tr>
              </div>
              </table>
            </form>
            {dataArray.length !== 0 && (
              <table className="w-full text-center">
                <thead className="bg-blue-400 text-white font-semibold shadow">
                  <tr>
                    <td className="py-2"> Medicine name </td>
                    <td> sell quantity </td> <td>sell price </td>
                    <td> discount </td> <td>final price </td>
                    <td>Total</td>
                     <td> </td>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-blue-300">
                  
                  {dataArray.map((el, i) => {
                    return (
                      <tr key={el.medicineId + i}>
                        <td className="py-3 "> {el.medicineName} </td>
                        <td className="py-3 "> {el.sellQuantity} </td>
                        <td className="py-3 "> {el.sellPrice} </td>
                        <td className="py-3 "> {el.discount} </td>
                        <td className="py-3 "> {el.finalPrice} </td>
                        <td className="py-3 "> {el.totalOfMultiple} </td>


                        <td className="py-3 ">
                          
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {dataArray.length > 0 &&
            <div className="my-2">
              <table className="text-center w-full">
                <thead>
                  <tr>
                  <th>
                    Total Of Current Invoice
                  </th>
                  </tr>
                 
                <tr>
                <th>
                  <input
                  value={TotalOfCurrentInvoice}
                  onChange={(e)=>setTotalOfCurrentInvoice(e.target.value)}
              className="p-2  rounded-lg px-3 border border-blue-400 focus:outline-none "
              type="text"  readOnly  />
                  </th>
                </tr>
                </thead>
              </table>
            </div>


            }

            {dataArray.length > 0 && (
             <div className="text-center">
            <button
                className="bg-green-400 py-2 px-10 text-white font-semibold"
                onClick={saveAllData}
              >
                Save
              </button>

             </div>
            )}

            </div>
            </div>
        </div>
    )
}

export default AddInvoiceForProvince
