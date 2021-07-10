import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import BASE_URL from "../BASE_URL";
function AddPreviousCustomerInvoice() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }
  const [MedicineListForSell, setMedicineListForSell] = useState([])
  const [TotalOfCurrentInvoice, setTotalOfCurrentInvoice] = useState(0)

  const [userId, setUserId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [ProductNameAfterAdd, setProductNameAfterAdd] = useState("")
  const [MedicineIdAfterAdd, setMedicineIdAfterAdd] = useState(0)
  const [QuanityLeftInStock, setQuanityLeftInStock] = useState(0)
  // wasim part

  //   const addCutomerForm = (browser) => {
  //     browser.preventDefault();
  //     var formData = new FormData();
  //     formData.append("customerName", customerName);
  //     formData.append("address", address);
  //     formData.append("phone", phone);
  //     formData.append("province", province);
  //     var dataJson = Object.fromEntries(formData);
  //     axios
  //       .post(
  //         `${document.location.origin}/pharmacyproject/backend/invoice_module/add_new_invoice.php`,
  //         dataJson
  //       )
  //       .then(async (res) => {
  //         console.log("response customer");
  //         // let resp= JSON.parse(res.data.sql)
  //         console.log(res);
  //         if (res.data.status === "true") {
  //           document.getElementById("Invoice").classList.remove("hidden");
  //           document
  //             .getElementById("addCustomerSubmitBtn")
  //             .classList.add("hidden");
  //           setUserId(res.data.id);
  //           getVisitor();
  //         } else {
  //           console.log(res);
  //         }
  //       });
  //   };

  //wasim part

  useEffect(() => {
    const getCustomers = async () => {
      let data = await fetch(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/customer_module/select_all_customer.php`
      );
      data = await data.json();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  useEffect(() => {
    if (userId !== "") {
      axios.get(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/medicine_module/add_to_previous_medicine.php`
      )
        .then(response => {
          setMedicineListForSell(response.data)
        })



      getVisitor();
    }
  }, [userId]);

  //   fetchData();



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

  var quatityInS = "";



  const [batchNumber, setBatchNumber] = useState(null)
  const [batchBtnDisabled, setBatchBtnDisabled] = useState(true)
  const [medicineModalData, setMedicineModalData] = useState([])
  const [medicineInfoId, setMedicineInfoId] = useState(null)
  useEffect(() => {
    if (sellQuantity > QuanityLeftInStock) {
      alert("Invalid amount! please choose quantity that is less then quantity in stock")
      setSellQuantity(0)
    }
  }, [sellQuantity])

  const handleBatchBtnSelect = (medIndex) => {
    setBatchNumber(
      medicineModalData[medIndex].medInfo.batch_no
    )

    setMedicineInfoId(
      medicineModalData[medIndex].medInfo.medicine_info_id
    )

    setQuanityLeftInStock(medicineModalData[medIndex].remain)
    closeBatchModal()
  }


  const medicineHandler = (medicineId) => {
    setBatchNumber(null)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/medicine_info.php`, { medicineId })
      .then(res => {
        if (res.data.status) {
          console.log(res.data)
          const { medData } = res.data
          setMedicineModalData(medData)
          setBatchBtnDisabled(false)

          var formData1 = new FormData()
          formData1.append("medicineId", medicineId)
          var convertedForSalePrice = Object.fromEntries(formData1)
          axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/finding_price_of_medicine.php`, convertedForSalePrice)
            .then(response => {
              setSellPrice(response.data.sale_price)
            })


          // var formData = new FormData();
          // formData.append("medicineId", medicineId);
          // var jsonData = Object.fromEntries(formData);
          // axios.post(
          //   `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,
          //   jsonData
          // ).then(response => {
          //   if (response.data.status === "true") {
          //     setQuanityLeftInStock(response.data.remain)
          //   } else {
          //     console.log(response);
          //   }
          // })

          const filteredMedicine = MedicineListForSell.filter(mo => mo.medicine_id.includes(medicineId))
          setMedicneDetails(filteredMedicine)
        }
      })

  }

  async function setMedicneDetails(list) {
    list.map(list => {
      setProductNameAfterAdd(list.product_name)
      setMedicineIdAfterAdd(list.medicine_id)
    })
  }



  function handleAddClick(e) {
    e.preventDefault();
    if (parseInt(sellQuantity) > QuanityLeftInStock) {
      alert("Invalid sell quantity!");
      return setSellQuantity(0);
    }


    const newDataObj = {
      visitor: visitor,
      bookPageNo: bookPageNo,
      userId: userId,
      medicineName: ProductNameAfterAdd,
      medicineId: MedicineIdAfterAdd,
      sellQuantity: sellQuantity,
      sellPrice: sellPrice,
      discount: discount,
      finalPrice: finalPrice,
      batchNumber,
      medicineInfoId
    };
    setDataArray((prev) => [...prev, newDataObj]);

    setSellQuantity("");
    setSellPrice("");
    setDiscount("");
    setQuanityLeftInStock(0)
    setBtnDisabled(true);
  }

  useEffect(() => {

    let finalPrice = 0;
    let quantity = 0;
    let Pre = 0;
    dataArray.map(list => {
      finalPrice = list.finalPrice;
      quantity = list.sellQuantity;
      Pre += finalPrice * quantity;

    })

    setTotalOfCurrentInvoice(Pre)



  }, [dataArray])



  async function QuantityFetcher(medicineId) {
    var formData = new FormData();
    formData.append("medicineId", medicineId);
    var jsonData = Object.fromEntries(formData);
    var response = await axios.post(
      `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php`,
      jsonData
    );
    if (response.data.status === "true") {
      document.getElementById("quantityInStock").value = response.data.remain;
      quatityInS = response.data.remain;
    } else {
      console.log(response);
    }
  }

  useEffect(() => {
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

  useEffect(() => {
    if (parseInt(sellQuantity) >= parseInt(quatityInS)) {
      setSellQuantity("");
    }
  }, [sellQuantity, quatityInS]);

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
        // console.log(res.data);
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
    console.log(dataArray)
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/add_all_invoice.php`,
        dataArray
      )
      .then((res) => {
        console.log(res)
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
  const [modalBatchIsOpen, setModalBatchIsOpen] = useState(false);
  function openBatchModal() {
    setModalBatchIsOpen(true);
  }

  function closeBatchModal() {
    setModalBatchIsOpen(false);
  }

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



  const [BookPageListForCustomer, setBookPageListForCustomer] = useState([])

  const selectCutomerIdForSelect = (customerId) => {
    setUserId(customerId)
    var formData1 = new FormData()
    formData1.append("customerId", customerId)
    var sendData = Object.fromEntries(formData1)
    axios.post(`${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/book_page_no_list.php`, sendData)
      .then(response => {
        setBookPageListForCustomer(response.data)
      })
  }
  const [SearchForCustomerLists, setSearchForCustomerLists] = useState("")
  const filteredCustomers = customers.filter(list => list.customer_name.toLowerCase().includes(SearchForCustomerLists.toLowerCase()))
  return (
    <div>
      <Modal
        isOpen={modalBatchIsOpen}
        onRequestClose={closeBatchModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-3/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >
        <div className="flex justify-between">
          <h2>Medicine info</h2>
          <button
            onClick={closeBatchModal}
            className="py-1 px-2 bg-red-400 text-white shadow font-semibold"
          >
            Close
          </button>
        </div>
        <table className="w-full mt-2 text-center">
          <thead>
            <tr className="text-white bg-blue-400  shadow">
              <td className="py-2 px-2">#</td>
              <td>Product name</td>
              <td>Generic Name</td>
              <td>Batch No</td>
              <td>MFg date</td>
              <td>Expire Date</td>
              <td>Entry Date</td>
              <td>Quantity in Stock</td>
              <td>Per Packs</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              medicineModalData.map(
                (el, i) => {
                  const { medInfo, remain } = el
                  return (
                    <tr key={i + "hash44"}>
                      <td className="py-2">{i + 1}</td>
                      <td>
                        {medInfo.product_name}
                      </td>
                      <td>
                        {medInfo.generic_name}
                      </td>
                      <td>
                        {medInfo.batch_no}
                      </td>
                      <td>
                        {medInfo.mfg_date}
                      </td>
                      <td>
                        {medInfo.expire_date}
                      </td>
                      <td>
                        {medInfo.entry_date}
                      </td>
                      <td>
                        {remain}
                      </td>
                      <td>
                        {medInfo.per_packs}
                      </td>
                      <td>
                        <button
                          onClick={() => handleBatchBtnSelect(i)}
                          className="px-2 py-1 text-white bg-blue-400 font-semibold ">
                          select
                        </button>
                      </td>
                    </tr>
                  )
                }
              )
            }

          </tbody>
        </table>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-2/4 p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60"
      >
        <div className="flex justify-between">
          <h2>Medicine data</h2>
          <button
            onClick={closeModal}
            className="py-1 px-2 bg-red-400 text-white shadow font-semibold"
          >
            Close
          </button>
        </div>
        <table className="w-full mt-2 text-center">
          <thead>
            <tr className="text-white bg-blue-400  shadow">
              <td className="py-2">#</td>
              <td>Product name</td>
              <td>Remain quantity</td>
            </tr>
          </thead>
          <tbody>
            {
              // medicine_id: data[i].medicine_id,
              // product_name: data[i].product_name,
              // needed_qunatity
              modalData &&
              modalData.map((el, i) => {
                return (
                  <tr key={el.medicine_id}>
                    <td className="py-2">{++i}</td>
                    <td>{el.product_name}</td>
                    <td>{el.needed_qunatity}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Modal>
      {document.getElementById("body").classList.add("bg-blue-500")}
      <Navbar />

      <div className="p-16 flex justify-center">
        <div className="flex flex-col">
          <form className="mx-auto w-96 ">
            <input type="text"

              className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-full mb-3"
              onChange={(e) => setSearchForCustomerLists(e.target.value)}
              placeholder="Search Customer"
            />
            <select
              className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-full mb-3"
              required={true}
              value={userId}
              onChange={(e) => selectCutomerIdForSelect(e.target.value)}
            >
              <option> Select Customer </option>


              {filteredCustomers.length >= 0 &&
                filteredCustomers.map((el, i) => {
                  return (
                    <option value={el.customer_id} key={i}>
                      {el.customer_name + " " + " " + el.page_no + "  " + el.address + " " + el.province}
                    </option>
                  );
                })}
            </select>
          </form>
          {userId && (
            <div
              className="p-6 bg-white shadow-lg rounded-lg text-center mt-5"
              id="Invoice"
            >
              <form>
                <table cellPadding="5px">

                  <select
                    className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3"
                    required={true}
                    value={visitor}
                    onChange={(e) => {
                      return setVisitor(e.target.value);
                    }}
                    required
                  >
                    <option> select visitor </option>
                    {visitorList.length >= 0 &&
                      visitorList.map((el, i) => {
                        return (
                          <option value={el.visitor_id} key={i}>
                            {el.name} {el.last_name}
                          </option>
                        );
                      })}
                  </select>


                  <select
                    className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3"
                    onChange={(e) => setBookPageNo(e.target.value)}


                    required

                  >
                    <option value="">Select One Book Page No</option>
                    {
                      BookPageListForCustomer.length > 0 && BookPageListForCustomer.map(list => (
                        <option value={list.book_page_no}>{list.book_page_no}</option>
                      ))
                    }
                  </select>
                  <br />
                  <div>


                    <tr>
                      <th>Select Medicine</th>
                      <th>Batch No</th>
                      <th>Quantity In Stock</th>
                      <th>Sale Quantity</th>
                      <th>Sale Price</th>
                      <th>Discount</th>
                      <th>Final Price</th>
                    </tr>



                    <tr>

                      <td>
                        <select
                          id="medicineName"
                          onChange={(e) => medicineHandler(e.target.value)}
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3"
                          required
                        >

                          <option value="">Select One Medicine</option>
                          {
                            MedicineListForSell.length > 0 && MedicineListForSell.map(list => (
                              <option key={list.medicine_id} value={list.medicine_id}>{list.product_name}</option>
                            ))
                          }

                        </select>

                      </td>

                      <td>
                        {!batchNumber && <button
                          type="button"
                          className="mx-auto px-2 py-1 bg-green-400  text-sm text-white font-semibold rounded shadow-lg"
                          disabled={batchBtnDisabled}
                          onClick={openBatchModal}
                        >
                          select batch no
                        </button>
                        }
                        {
                          batchNumber && <input
                            type="text"
                            value={batchNumber}
                            className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3"
                            readOnly
                          />
                        }

                      </td>
                      <td>
                        <input
                          type="text"
                          value={QuanityLeftInStock}
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3"
                          readOnly
                        />

                      </td>


                      <td>
                        <input
                          type="text"
                          placeholder="Sell quantity"
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                          required
                          value={sellQuantity}
                          onChange={(e) => {
                            setSellQuantity(e.target.value);
                          }}
                        />

                      </td>

                      <td>
                        <input
                          type="text"
                          placeholder="Sell Price"
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                          required
                          value={sellPrice}
                          onChange={(e) => setSellPrice(e.target.value)}
                        />

                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Discount"
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                          required
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Final price"
                          className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                          readOnly={true}
                          value={finalPrice}
                        />
                      </td>
                      <td>
                        <input
                          type="submit"
                          value="Add"
                          className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"
                          onClick={handleAddClick}
                          disabled={btnDisabled}
                        />
                      </td>


                    </tr>

                  </div>
                </table>

              </form>
              {dataArray.length !== 0 && (
                <table className="w-full">
                  <thead className="bg-blue-400 text-white font-semibold shadow">
                    <tr>
                      <td className="py-2"> Medicine name </td>
                      <td> sell quantity </td> <td>sell price </td>
                      <td> discount </td> <td>final price </td>
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
                            onChange={(e) => setTotalOfCurrentInvoice(e.target.value)}
                            className="p-2  rounded-lg px-3 border border-blue-400 focus:outline-none "
                            type="text" readOnly />
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>


              }



              {dataArray.length > 0 && (
                <button
                  className="bg-green-400 py-2 px-10 text-white font-semibold"
                  onClick={saveData}
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPreviousCustomerInvoice
