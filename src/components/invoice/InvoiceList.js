import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import InvoiceInfo from "./InvoiceInfo";
import logo from "../../images/logo.png";
import BASE_URL from "../BASE_URL";
import Navbar from "../navbar";
function InvoiceList() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }
const [VisitorListForSupplier, setVisitorListForSupplier] = useState([])
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/invoice_list.php`
      );
      response = await response.json();
      if (response.status) {
        setData(response.data);
        setCopyData(response.data);
      }
    };
    fetchData();
    axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
    .then(response=>{
      setVisitorListForSupplier(response.data)
    })

  }, []);

  const [invoiceId, setInvoiceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  useEffect(() => {
    if (invoiceId !== "") {
      getInvoiceData();
      openModal();
    }
  }, [invoiceId]);

  const [modalData, setModalData] = useState([]);

  async function getInvoiceData() {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/specific_invoice_get_data.php`,
        invoiceId
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.status) {
          setModalData(res.data.data);
          openModal();
        }
      });
  }

  const [totalBillAmount, setTotalBillAmount] = useState(0);

  async function deleteInvoiceInfo(index) {
    const arr = modalData.filter((_, i) => i !== index);
    setModalData(arr);
  }

  //  "invoice_id"
  //   "book_page_no"=>$row["book_page_no"],
  //         "total_amount"=>$row["total_amount"],
  //         "invoice_date"=>$row["invoice_date"],
  //         "user_id"=>$row["user_id"],
  //         "customer_name"=>$row["customer_name"],
  //         "name"=>$row["name"],
  //         "last_name"=>$row["last_name"]

  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  async function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setTotalBillAmount(0);
    setInvoiceId("");
    setModalData([]);
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "0%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };

  const customStylesForReturnMedicine = {
    content: {
      top: "10%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
    },
  };


  //search
  const [searchMethod, setSearchMethod] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  function searchData(e) {
    e.preventDefault();
    var val;
    if (searchMethod === "customer_name") {
      val = searchCustomerName;
    } else if (searchMethod === "province") {
      val = searchProvince;
    } else if (searchMethod === "invoice_date") {
      val = searchDate;
    }
    let arr = copyData.filter((el, i) => {
      return el[searchMethod] === val;
    });

    setData(arr);
  }

  //end search

  function deleteInvoice(id) {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/delete_invoice.php`,
        id
      )
      .then((res) => {
        if (res.data.status) {
          let arr = copyData.filter((el) => {
            return el.invoice_id !== id;
          });

          setData(arr);
          setCopyData(arr);
        }
      });
  }
const [invoiceListEditVisibility, setinvoiceListEditVisibility] = useState(false);
const [inoviceSelectByUser, setInoviceSelectByUser] = useState([])
const [VisitorListForModel, setVisitorListForModel] = useState([])


const [BookPageNoFromModal, setBookPageNoFromModal] = useState("");
const [VisitorIdFromModal, setVisitorIdFromModal] = useState(0);
const [InvoiceDateFromModal, setInvoiceDateFromModal] = useState("");
const [invoiceIdForModalUpdateion, setinvoiceIdForModalUpdateion] = useState(0)

const invoiceListEditHandler=(invoiceId)=>{
  setinvoiceIdForModalUpdateion(invoiceId)
setinvoiceListEditVisibility(true);
const dataSelected=data.filter(mo=>mo.invoice_id.includes(invoiceId))
setInoviceSelectByUser(dataSelected)
dataSelected.map(list=>{
  setBookPageNoFromModal(list.book_page_no)
  setVisitorIdFromModal(list.visitor_id)
  setInvoiceDateFromModal(list.invoice_date)
})
axios.get(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`)
.then(response=>{
  setVisitorListForModel(response.data)
})
}
const [SupplierIdFromModalEdit, setSupplierIdFromModalEdit] = useState(0)

 const modalFormHandlerForSubmit=(browser)=>{
  browser.preventDefault();
  var formData=new FormData();
  formData.append("visitorId",VisitorIdFromModal)
  formData.append("invoiceId",invoiceIdForModalUpdateion)
  formData.append("bookPageNo",BookPageNoFromModal)
  formData.append("invoiceDate",InvoiceDateFromModal)
  formData.append("supplierId",SupplierIdFromModalEdit)
  var jsonData=Object.fromEntries(formData);

  axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/update_invoice_list.php`,jsonData)
  .then(response=>{
    if(response.data.status=="true"){
      setinvoiceListEditVisibility(false)
      window.location.reload()
    }else{
      console.log(response.data)
    }
  })
}


const DateChangerFromGerordgiaToSolarDate=(date)=>{
  let today = new Date(date).toLocaleDateString('fa-IR');
  return today;
}

const fetchNewData=()=>{
 return "aaa"
}
const [SupplierName, setSupplierName] = useState("")




const [invoiceItemList, setinvoiceItemList] = useState([])
const [ReturnInvoiceVisiblility, setReturnInvoiceVisiblility] = useState(false)
const invoiceReturnHandler=(invoiceId)=>{
  setReturnInvoiceVisiblility(true)

  var formData=new FormData();
  formData.append("invoiceId",invoiceId)
  var jsonData=Object.fromEntries(formData)
  axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/return_medicine/show_invoice_list.php`,jsonData)
  .then(response=>{
    setinvoiceItemList(response.data)
  })

}
const [ReturnItemDetailsList, setReturnItemDetailsList] = useState([])
const [ReturnItemVisibility, setReturnItemVisibility] = useState(false)


const [ReturnQuantityFromModal, setReturnQuantityFromModal] = useState(0)
const [ReturnPriceFromModal, setReturnPriceFromModal] = useState(0)
 
const [sellPriceForModal, setsellPriceForModal] = useState(0)
const [PackQuantityForModal, setPackQuantityForModal] = useState(0)

const [MedicineIdForModal, setMedicineIdForModal] = useState(0)
const [CustomerIdForModal, setCustomerIdForModal] = useState(0)
const [invoiceMedicineListIdForModal, setinvoiceMedicineListIdForModal] = useState(0)
const [loose_stock_id, setloose_stock_id] = useState(0)

const [CustomerNameForReturnModal, setCustomerNameForReturnModal] = useState("")
const [ProductNameForModalReturn, setProductNameForModalReturn] = useState("")

const [SellPriceDiscoutnForReturnMedicine, setSellPriceDiscoutnForReturnMedicine] = useState("")

const returnItemHandler=(invoiceInfoId)=>{
  setReturnInvoiceVisiblility(false)
  setReturnItemVisibility(true)
 var formData=new FormData()
 formData.append("invoiceMedicineListId",invoiceInfoId)
 var jsonData=Object.fromEntries(formData)
 axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/return_medicine/show_item_of_invoice_list.php`,jsonData)
 .then(response=>{
  setsellPriceForModal(response.data.sell_price_after_discount)
  setPackQuantityForModal(response.data.pack_quantity)
  setMedicineIdForModal(response.data.medicine_id)
  setCustomerIdForModal(response.data.customer_id)
  setinvoiceMedicineListIdForModal(response.data.invoice_medicine_list_id)
  setloose_stock_id(response.data.loose_stock_id)
  setCustomerNameForReturnModal(response.data.customer_name)
  setProductNameForModalReturn(response.data.product_name)
  setSellPriceDiscoutnForReturnMedicine(response.data.discount)

 })
 



}



const returnItemHandlerSubmit=()=>{
  if(ReturnPriceFromModal >0 && ReturnQuantityFromModal){
      var formData=new FormData()
      formData.append("returnQuantity",ReturnQuantityFromModal)
      formData.append("returnPrice",ReturnPriceFromModal)
      formData.append("customerId",CustomerIdForModal)
      formData.append("costPrice",sellPriceForModal)
      formData.append("packQuantityfromInvoice",PackQuantityForModal)
      formData.append("invoiceMedicineListId",invoiceMedicineListIdForModal)
      formData.append("medicineId",MedicineIdForModal)
      formData.append("looseStockId",loose_stock_id)
      var dataForSend = Object.fromEntries(formData)
      axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/return_medicine/calculate_return_items.php`,dataForSend)
      .then(response=>{
        if(response.data.status==="true"){
          alert("Medcine Return Successfully")
          window.location.reload()
        }else{
          console.log(response.data)
        }
      })

    

  }else{
    alert("Please Fill Requaired Input")
  }
}


const filterVisitor=(supplierId)=>{
 const visitor_finded=VisitorListForSupplier.filter(mo=>mo.visitor_id.includes(supplierId))
 var name=""
 visitor_finded.map(list=>{
   name=list.name +" "+ list.last_name
 })
 return name
}

return (
    <div className="no-print">
<Navbar />
{/* Return Item Details  */}
<Modal
        isOpen={ReturnItemVisibility}
        onRequestClose={closeModal}
        style={customStylesForReturnMedicine}
        contentLabel="Example Modal"
        className="w-auto p-4 rounded absolute top-5 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
      >
<div className="w-full pb-5">
<h1 className="font-bold inline float-left mr-24">Add Details To Return Items</h1>
<h1 className="inline float-right font-bold ml-14 cursor-pointer " onClick={()=> setReturnItemVisibility(false)}>X</h1>
</div>
<hr className="border-2 border-blue-300 my-3" />

<div>
<table className="text-center" cellPadding="8px">
  
      <thead>
    <tr>
      <th>Customer Name : <span>{CustomerNameForReturnModal}</span>   </th>
      
    </tr>
    <tr>
    <th>Product Name : <span>{ProductNameForModalReturn}</span>   </th>
    </tr>
    <tr>
    <th>Pack Quantity : <span>{PackQuantityForModal}</span>   </th>
    </tr>


    <tr>
    <th>Discount <span>{SellPriceDiscoutnForReturnMedicine}</span>   </th>
    </tr>


    <tr>
    <th>Sell Price : <span>{sellPriceForModal}</span>   </th>
    </tr>

    <tr className="">
    <th>Return Quantity: <span><input type="number" min="0" max=""  className="border border-blue-400 focus:outline-none rounded-md w-24 py-1 px-2" value={ReturnQuantityFromModal} onChange={(e)=>setReturnQuantityFromModal(e.target.value)} /></span>   </th>
    </tr>

    <tr>
    <th>Return Price: <span><input type="number" min="0" max=""  className="border border-blue-400 focus:outline-none rounded-md w-24 py-1 px-2" value={ReturnPriceFromModal} onChange={(e)=>setReturnPriceFromModal(e.target.value)} /></span>   </th>
    </tr>
    <tr className="">
    <th className=""><button className="bg-blue-400  text-white hover:bg-blue-500 font-semibold px-2 py-1 rounded-md" onClick={()=>returnItemHandlerSubmit()}>Return Medicine </button></th>
    </tr>

  </thead>


  
    


</table>

</div>

</Modal>


{/* end Return Item Details */}

{/* Return Invoice Modal */}

<Modal
        isOpen={ReturnInvoiceVisiblility}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-auto p-4 mt-16 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
      >

<div className="mb-12">
<div className="">
  <h2 className="text-center float-left font-bold inline mr-4">Invoice Item List</h2>
  <h2 className="font-bold inline float-right ml-4 cursor-pointer" onClick={()=>setReturnInvoiceVisiblility(false)}>X</h2>
  
</div>
</div>
<table className="w-full" cellPadding="5px">
{
  invoiceItemList.length >0 && <thead>
    <tr>
      <th className="border border-black">Prodoct Name</th>
      <th className="border border-black">Generic Name</th>
      <th className="border border-black">Packs Qunatity</th>
      <th className="border border-black"></th>
    </tr>
  </thead>
}
{
  invoiceItemList.length > 0 && invoiceItemList.map(list=>(
    <tbody key={list.medicine_lit_id}>
      <tr>
        <th className="border border-black">{list.product_name}</th>
        <th className="border border-black">{list.generic_name}</th>
        <th className="border border-black">{list.pack_quantity}</th>
        <th className="border border-black text-blue-400 hover:text-blue-600 cursor-pointer" onClick={()=>returnItemHandler(list.invoice_medicine_list_id)}>Return Item</th>

      </tr>
    </tbody>
  ))
}
</table>


</Modal>




{/* End Return Invoice Modal */}







      {/* Invoice Modal for Print */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-auto p-4 rounded mt-5 absolute top-0 left-0 bottom-0 right-0 bg-white "
        overlayClassName="fixed top-10 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
      >
        <div className=" flex justify-end max-w-max z-2 float-right no-print">
          <div className="max-w-max">
            <button
              onClick={()=>window.print()}
              className="py-1 px-2 bg-blue-400 text-white shadow font-semibold focus:outline-none mr-4"
            >
              Print
            </button>
            <button
              onClick={closeModal}
              className="py-1 px-2 bg-red-400 text-white shadow font-semibold"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex flex-row  pb-2">
          <div className="w-2/5 ">
            <img src={logo} className="w-2/4 h-4/5 mx-auto" alt="logo" />
          </div>
          <div className="w-3/5  ">
            <div className="space-y-2 text-center w-3/4 text-xs">
              <p className="text-xl font-semibold ">شرکت صحت زعفران لمیتد</p>
              <p className="font-semibold">Sehat-E-Zefran Ltd</p>
              <p className="font-semibold ">Saga Laboratories London - UK</p>
              <p className="font-semibold ">WHO,GMP and ISO Certified Company</p>
              <p className="font-semibold  pb-4">(ثبت و راجستر شده وزرات صحت عامه)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between px-2">
          <p className="font-semibold ">
            Customer name: <span className="capitalize">{customerName}</span>{" "}
          </p>
          <p className="font-semibold">Bill number: {invoiceId} </p>
          <p className="font-semibold">Date: {invoiceDate}   ---    {DateChangerFromGerordgiaToSolarDate(invoiceDate)}</p>
        </div>
        {modalData.length && (
          <table className="w-full mt-2 text-center border border-black">
            <thead>
              <tr className="text-black font-semibold w-full">
                <td className="py-2 px-2 border border-black max-w-max text-sm">
                  #
                </td>
                <td className="border px-2 border-black max-w-max text-sm">
                  Product name
                </td>
                <td className="border border-black  max-w-max text-sm px-2">
                  Generic name
                </td>
                <td className="border border-black  max-w-max text-sm px-2">
                  Quantity
                </td>
                <td className="no-print border border-black  max-w-max text-sm px-2">
                  Remaining
                </td>
                <td className="border border-black max-w-max text-sm px-2">
                  Price
                </td>
                <td className="border border-black  max-w-max text-sm px-2">
                  Discount
                </td>
                <td className="border border-black  max-w-max text-sm px-2">
                  Total
                </td>
                <td className="no-print"></td>
                <td className="no-print"></td>
              </tr>
            </thead>
            <tbody className="">
              {modalData.map((el, i) => {
                return (
                  <InvoiceInfo
                    el={el}
                    i={i}
                    delFn={deleteInvoiceInfo}
                    setTotalBillAmount={setTotalBillAmount}
                  />
                );
              })}
              <tr>
                <td></td>
                <td className="border text-sm border-black">TOTAL</td>
                <td></td>
                
                <td></td>
                <td></td>
                <td></td>
                <td className="no-print"></td>

                <td className="border text-sm border-black">
                  {totalBillAmount}
                </td>
              </tr>
            </tbody>
            
          </table>
        )}
        <div id="addressdetails" className="bg-blue-500 mt-3 p-2 flex flex-row justify-around hidden" dir="rtl">
          <div className="inline text-white font-bold">
          <h1 className="inline text-xs ml-5">آدرس: خوشحال خان مینه- حوزه پنجم امنیتی - جوار مسجد کویتی</h1>

          </div>
          <div className="inline font-bold text-white">
              <h1 className="inline text-xs mr-4">شماره های تماس : 0789040128 - 0202564668</h1>
          </div>
        </div>
      </Modal>


      {/* End of Invoice Modal for Print */}
      {document.getElementById("body").classList.add("bg-blue-500")}
      <div className="py-16 px-20 w-full  flex flex-col space-y-4 justify-center">
        <div class=" flex flex-row justify-center">
          <form
            className="flex flex-row space-x-4"
            onSubmit={(e) => searchData(e)}
          >
            <select
              value={searchMethod}
              onChange={(e) => setSearchMethod(e.target.value)}
              className="py-1 px-3 focus:outline-none border-2 border-blue-400 rounded"
            >
              <option>select search method</option>
              <option value="customer_name">Search by customer name</option>
              <option value="province">search by province</option>
              <option value="invoice_date">Search by date</option>
            </select>

            {searchMethod === "invoice_date" && (
              <input
                type="date"
                required={true}
                placeholder="date"
                className="border-2 border-blue-400 focus:outline-none py-1 px-3"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            )}

            {searchMethod === "customer_name" && (
              <input
                type="text"
                required={true}
                placeholder="customer date"
                className="border-2 border-blue-400 focus:outline-none py-1 px-3"
                value={searchCustomerName}
                onChange={(e) => setSearchCustomerName(e.target.value)}
              />
            )}

            {searchMethod === "province" && (
              <input
                type="text"
                required={true}
                placeholder="province"
                className="border-2 border-blue-400 focus:outline-none py-1 px-3"
                value={searchProvince}
                onChange={(e) => setSearchProvince(e.target.value)}
              />
            )}

            {searchMethod && (
              <>
                <button
                  type="submit"
                  className="py-1 px-2 bg-green-400 text-white shadow font-semibold focus:outline-none"
                >
                  Search
                </button>
                <button
                  type="button"
                  className="py-1 px-2 bg-blue-400 text-white shadow font-semibold focus:outline-none"
                  onClick={() => setData(copyData)}
                >
                  load all
                </button>
              </>
            )}
          </form>
        </div>
        <div className="p-2 w-full bg-white shadow-lg rounded-lg">
          {data.length > 0 && (
            <table className="text-center w-full">
              <thead>
                <tr className="text-white bg-blue-400   shadow">
                  <td className=" px-2 py-2">#</td>
                  <td> customer name </td>
                  <td>book page number</td>
                  <td>Province</td>
                  
                  <td> visitor name</td>
                  <td> invoice date </td>
                  <td>Supplier Name</td>
                  <td>total amount</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.map((el, i) => {
                  return (
                    <tr
                      className="cursor-pointer"
                      key={i}
                      onClick={() => {
                        setInvoiceId(el.invoice_id);
                        setCustomerName(el.customer_name);
                        setInvoiceDate(el.invoice_date);
                      }}
                    >
                      <td className=" py-3">{++i}</td>
                      <td>{el.customer_name}</td>
                      <td>{el.book_page_no}</td>
                      <td>{el.real_province}</td>
                      <td>
                        {el.name} {el.last_name}
                      </td>
                      <td>{el.invoice_date} --- {DateChangerFromGerordgiaToSolarDate(el.invoice_date)}</td>
                      <td>{filterVisitor(el.supplier_id)}</td>
                      <td>{el.total}</td>
                      <td>


                        {" "}


                     

                      </td>
                      <td>
                      <button onClick={(e)=>{
                        e.stopPropagation()
                        invoiceListEditHandler(el.invoice_id)
                      }
                        } className="px-2 py-1 text-white rounded-md bg-green-400 hover:bg-green-500 shadow shadow focus:outline-none">Edit</button>

                        
           <button className="px-2 py-1 text-white ml-3 rounded-md bg-red-400 hover:bg-red-500 shadow shadow focus:outline-none" onClick={(e)=>{
                        e.stopPropagation()
                        invoiceReturnHandler(el.invoice_id)

           }}>
             Return
           </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {data.length === 0 && (
            <p className="text-red-400 text-center font-semibold">no result!</p>
          )}
        </div>
        <Modal isOpen={invoiceListEditVisibility}>
            <div className="cursor-pointer font-bold float-right inline" onClick={()=>setinvoiceListEditVisibility(false)}>X</div>
            <div className="text-center text-xl">
            <h1 className="inline text-center">Edit Invoice</h1>
            </div>
            <hr className="my-3"/>
            <div>
              <form onSubmit={modalFormHandlerForSubmit}>

                {
                  inoviceSelectByUser.length >0 && inoviceSelectByUser.map(list=>(
                    <div className="flex flex-col space-y-4" key={list.invoice_id}>
                  <div className="flex flex-row justify-center items-center">
                    
                    <div className="w-34 text-center">
                        <label htmlFor="" className="font-bold">Customer Name</label>
                    </div>
                    <div className="w-48">
                  <input className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" type="text" value={list.customer_name} readOnly/>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                  
                    <div className="w-34 text-center">
                        <label htmlFor="" className="font-bold">Book Page no</label>
                    </div>
                    <div className="w-48">
                  <input onChange={(e)=> setBookPageNoFromModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" type="text" value={BookPageNoFromModal}/>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center items-center">
                 
                    <div className="w-34 text-center">
                        <label htmlFor="" className="font-bold">Visitor name</label>
                    </div>
                    <div className="w-48">
                      <select onChange={(e)=> setVisitorIdFromModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2">
                          <option value={list.visitor_id}>{list.name} {list.last_name}</option>
                          {
                            VisitorListForModel.map(visitor=>(
                              <option value={visitor.visitor_id}>{visitor.name} {visitor.last_name}</option>
                            ))
                          }
                      </select>
                    </div>
                  </div>


                  <div className="flex flex-row justify-center items-center">
                 
                 <div className="w-34 text-center">
                     <label htmlFor="" className="font-bold">Supplier Name</label>
                 </div>
                 <div className="w-48">
                   <select onChange={(e)=> setSupplierIdFromModalEdit(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2">
                       <option value={list.supplier_id}>{filterVisitor(list.supplier_id)}</option>
                       {
                         VisitorListForModel.map(visitor=>(
                           <option value={visitor.visitor_id}>{visitor.name} {visitor.last_name}</option>
                         ))
                       }
                   </select>
                 </div>
               </div>





                  <div className="flex flex-row justify-center items-center">
                  
                    <div className="w-34 text-center">
                        <label htmlFor="" className="font-bold">Invoice Date</label>
                    </div>
                    <div className="w-48">
                  <input onChange={(e)=> setInvoiceDateFromModal(e.target.value)} className="border mx-6 border-blue-300 focus:outline-none rounded-md py-1 px-2" type="date" value={InvoiceDateFromModal}/>
                    </div>
                  </div>

                  <div className="text-center ">
                    <input type="submit" className="p-2 bg-blue-400 font-bold text-white rounded-md w-24 cursor-pointer"  value="Edit"/>
                  </div>
                </div>
                

                  ))
                }
              </form>
            </div>


        </Modal>
      </div>
    </div>
  );
}

export default InvoiceList;
