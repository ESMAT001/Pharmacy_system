import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import Modal from "react-modal";
import BASE_URL from "../BASE_URL";
function AddNewCustomerInvoice() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }
  const [ProductNameAfterAdd, setProductNameAfterAdd] = useState("")
  const [MedicineIdAfterAdd, setMedicineIdAfterAdd] = useState(0)
  const [QuanityLeftInStock, setQuanityLeftInStock] = useState(0)

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
const [CustomerBookPageNoForCreatingCustomer, setCustomerBookPageNoForCreatingCustomer] = useState("");
  const customerHandler = (userData) => {
    setCustomerName(userData);
  };
  const addressHandler = (userData) => {
    setAddress(userData);
  };
  const phoneHandler = (userData) => {
    setPhone(userData);
  };
  const provinceHandler = (userData) => {
    setProvince(userData);
  };

  const [userId, setUserId] = useState("");

  const addCutomerForm = (browser) => {
    browser.preventDefault();
    var formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("province", province);
    formData.append("customerBookPage",CustomerBookPageNoForCreatingCustomer);
    var dataJson = Object.fromEntries(formData);
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/add_new_invoice.php`,
        dataJson
      )
      .then(async (res) => {
        // let resp= JSON.parse(res.data.sql)
        if (res.data.status === "true") {
          document.getElementById("Invoice").classList.remove("hidden");
          document
            .getElementById("addCustomerSubmitBtn")
            .classList.add("hidden");
          setUserId(res.data.id);
          getVisitor();
        } else {
          console.log(res);
        }
      });
  };
const [MedicineListForSell, setMedicineListForSell] = useState([])
 

 

  async function getVisitor() {
    let response = await fetch(
      `${BASE_URL(document.location.origin)}/pharmacyproject/backend/visitor_module/visitor_list.php`
    );
    response = await response.json();
    setVisitorList(response);
  }

  const [MedicineValue, setMedicineValue] = useState("");
  var [sellQuantity, setSellQuantity] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [visitorList, setVisitorList] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [bookPageNo, setBookPageNo] = useState("");
  const [visitor, setVisitor] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [dataArray, setDataArray] = useState([]);

 

  function handleAddClick(e) {
    e.preventDefault();
    console.log("data===", QuanityLeftInStock);
    console.log("dat2", sellQuantity);
    if (parseInt(sellQuantity) > QuanityLeftInStock) {
      alert("Invalid sell quantity!");
      return setSellQuantity(0);
    }
    const newDataObj = {
      visitor: visitor,
      bookPageNo: CustomerBookPageNoForCreatingCustomer,
      userId: userId,
      medicineName: ProductNameAfterAdd,
      medicineId: MedicineIdAfterAdd,
      sellQuantity: sellQuantity,
      sellPrice: sellPrice,
      discount: discount,
      finalPrice: finalPrice,
    };
    setDataArray((prev) => [...prev, newDataObj]);

    setSellQuantity("");
    setSellPrice("");
    setDiscount("");
    setQuanityLeftInStock(0)
    setBtnDisabled(true);
  }

  

  useEffect(() => {
    axios.get(
      `${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/add_to_previous_medicine.php`
    )
    .then(response=>{
      setMedicineListForSell(response.data)
    })


    if (discount !== "" && sellPrice !== "") {
      setFinalPrice(
        sellPrice - (parseInt(discount) * parseInt(sellPrice)) / 100
      );
    } else if (discount === "" || sellPrice === "") {
      setFinalPrice(0);
    }
    if (discount !== "" && sellPrice !== "" && sellQuantity !== "") {
      setBtnDisabled(false);
    }
  }, [discount, sellPrice, sellQuantity, dataArray]);

  function handleDelete(i) {
    setDataArray((prev) => prev.filter((el, index) => index !== i));
  }

  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (modalData.length > 0) openModal();
  }, [modalData]);

  async function getSpecificMedicineInfo(medicineIds) {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/get_specific_medicine_info.php`,
        medicineIds
      )
      .then((res) => {
        if (res.data.status) {
          const data = res.data.data;
          const newData = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].medicine_id == remainAmount[i].medicine_id)
              newData.push({
                medicine_id: data[i].medicine_id,
                product_name: data[i].product_name,
                needed_qunatity: remainAmount[i].quantity_needed,
              });
          }
          setModalData([...newData]);
        }
      });
  }

  let remainAmount = [];

  async function saveData() {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/add_all_invoice.php`,
        dataArray
      )
      .then((res) => {
        if (res.data.status && res.data.modal) {
          const medData = res.data.data;
          remainAmount = medData;
          const medicineIds = [];
          for (let i = 0; i < medData.length; i++) {
            medicineIds.push(medData[i].medicine_id);
          }
          getSpecificMedicineInfo(medicineIds);
        } else if (res.data.status) {
          alert("Data saved!");
          history.push("/addsuplier");
        }
      });
  }
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    history.push("/addsuplier");
  }
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



const medicineHandler=(medicineId)=>{
  

var formData = new FormData();
    formData.append("medicineId", medicineId);
    var jsonData = Object.fromEntries(formData);
    axios.post(
      `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,
      jsonData
    ).then(response=>{
      if (response.data.status === "true") {
        setQuanityLeftInStock(response.data.remain)
      } else {
        console.log(response);
      }
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
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-2/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >
        <div className="flex justify-between">
          <h2> Medicine data </h2>{" "}
          <button
            onClick={closeModal}
            className="py-1 px-2 bg-red-400 text-white shadow font-semibold"
          >
            {" "}
            Close{" "}
          </button>{" "}
        </div>{" "}
        <table className="w-full mt-2 text-center">
          <thead>
            <tr className="text-white bg-blue-400  shadow">
              <td className="py-2"> # </td> <td> Product name </td>{" "}
              <td> Remain quantity </td>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {
              // medicine_id: data[i].medicine_id,
              // product_name: data[i].product_name,
              // needed_qunatity
              modalData &&
                modalData.map((el, i) => {
                  return (
                    <tr key={el.medicine_id}>
                      <td className="py-2"> {i++} </td>{" "}
                      <td> {el.product_name} </td>{" "}
                      <td> {el.needed_qunatity} </td>{" "}
                    </tr>
                  );
                })
            }{" "}
          </tbody>{" "}
        </table>{" "}
      </Modal>{" "}
      {document.getElementById("body").classList.add("bg-blue-500")} <Navbar />
      <div className="p-16 flex justify-center">
        <div className="flex flex-col">
          <div className="p-2 bg-white shadow-lg rounded-lg text-center ">
            <h1 className="font-bold"> Add New Customer </h1>{" "}
            <form onSubmit={addCutomerForm}>
              <FormInput
                type="text"
                handler={customerHandler}
                placeHolder="Customer Name"
                style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
              />
              <FormInput
                type="text"
                handler={addressHandler}
                placeHolder="Address"
                style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
              />
              <br />
              <FormInput
                type="text"
                handler={phoneHandler}
                placeHolder="Phone No."
                style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
              />
              <FormInput
                type="text"
                handler={provinceHandler}
                placeHolder="Province"
                style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
              />
              <br />
              <input type="text" 
              value={CustomerBookPageNoForCreatingCustomer}
              onChange={(e)=>setCustomerBookPageNoForCreatingCustomer(e.target.value)}
              className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
              placeholder="Book Page No"
              required
              />
              <div id="addCustomerSubmitBtn">
                <SubmitBtn
                  style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600"
                  value="Add Customer"
                />
              </div>{" "}
            </form>{" "}
          </div>{" "}
          <div
            className="p-2 bg-white shadow-lg rounded-lg text-center mt-5 hidden"
            id="Invoice"
          >
            <form>
              <select
                className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3"
                required={true}
                value={visitor}
                onChange={(e) => {
                  return setVisitor(e.target.value);
                }}

                required
              >
                <option> select visitor </option>{" "}
                {visitorList.length >= 0 &&
                  visitorList.map((el, i) => {
                    return (
                      <option value={el.visitor_id} key={i}>
                        {" "}
                        {el.name} {el.last_name}{" "}
                      </option>
                    );
                  })}{" "}
              </select>{" "}
              <input
                type="hidden"
                placeholder="Book Page No"
                className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
                
                value={CustomerBookPageNoForCreatingCustomer}
                onChange={(e) => setCustomerBookPageNoForCreatingCustomer(e.target.value)}
              />{" "}
              <br />
              <div>
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
                <input
                  type="number"
                  min="0"
                  value={QuanityLeftInStock}
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3"
                  readOnly
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Sell quantity"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={sellQuantity}
                  onChange={(e) => {
                    setSellQuantity(e.target.value);
                  }}
                />{" "}
                <input
                  type="number"
                  min="0"
                  placeholder="Sell Price"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                />{" "}
                <input
                  type="number"
                  min="0"
                  placeholder="Discount"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  required
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />{" "}
                <input
                  type="number"
                  min="0"
                  placeholder="Final price"
                  className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                  readOnly={true}
                  value={finalPrice}
                />{" "}
                <input
                  type="submit"
                  value="Add"
                  className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"
                  onClick={handleAddClick}
                  disabled={btnDisabled}
                />{" "}
              </div>{" "}
            </form>{" "}
            {dataArray.length !== 0 && (
              <table className="w-full">
                <thead className="bg-blue-400 text-white font-semibold shadow">
                  <tr>
                    <td className="py-2"> Medicine name </td>{" "}
                    <td> sell quantity </td> <td>sell price </td>
                    <td> discount </td> <td>final price </td> <td> </td>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody className="divide-y-2 divide-blue-300">
                  {" "}
                  {dataArray.map((el, i) => {
                    return (
                      <tr key={el.medicineId + i}>
                        <td className="py-3 "> {el.medicineName} </td>{" "}
                        <td className="py-3 "> {el.sellQuantity} </td>{" "}
                        <td className="py-3 "> {el.sellPrice} </td>{" "}
                        <td className="py-3 "> {el.discount} </td>{" "}
                        <td className="py-3 "> {el.finalPrice} </td>{" "}
                        <td className="py-3 ">
                          <button
                            className="bg-red-400 text-white font-semibold px-3 py-1 text-center shadow-xl hover:bg-red-500 hover:shadow-xl transition duration-300 focus:outline-none"
                            onClick={() => handleDelete(i)}
                          >
                            X{" "}
                          </button>{" "}
                        </td>{" "}
                      </tr>
                    );
                  })}{" "}
                </tbody>{" "}
              </table>
            )}{" "}
            {dataArray.length > 0 && (
              <button
                className="bg-green-400 py-2 px-10 text-white font-semibold"
                onClick={saveData}
              >
                Save{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default AddNewCustomerInvoice;
