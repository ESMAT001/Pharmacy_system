import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import InvoiceInfo from "./InvoiceInfo";
import logo from "../../images/logo.png";

function InvoiceList() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "http://localhost:8080/pharmacyproject/backend/invoice_module/invoice_list.php"
      );
      response = await response.json();
      if (response.status) {
        console.log(response.data)
        setData(response.data);
        setCopyData(response.data);
      }
      console.log(response);
    };
    fetchData();
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
        "http://localhost:8080/pharmacyproject/backend/invoice_module/specific_invoice_get_data.php",
        invoiceId
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setModalData(res.data.data);
          openModal();
        }
      });
  }

  const [totalBillAmount, setTotalBillAmount] = useState(0);

  async function deleteInvoiceInfo(index) {
    console.log("filter");
    const arr = modalData.filter((_, i) => i !== index);
    console.log("filter done");
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

  //search
  const [searchMethod, setSearchMethod] = useState("");
  const [searchDate, setSearchDate] = useState("");
  function searchData(e) {
    e.preventDefault();
    let arr = copyData.filter((el, i) => {
      return el["invoice_date"] === searchDate;
    });

    setData(arr);
  }

  //end search

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-auto p-4 rounded absolute top-0 left-0 bottom-0 right-0 bg-white"
        overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 overflow-y-scroll"
      >
        <div className="flex justify-end no-print">
          <div>
            <button
              onClick={() => window.print()}
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
        <div className="flex flex-row ">
          <div className="w-2/5 ">
            <img src={logo} className="w-2/4 h-4/5 mx-auto" alt="logo" />
          </div>
          <div className="w-3/5  ">
            <div className="space-y-4 text-center w-3/4">
              <p className="text-3xl font-semibold">شرکت صحت زعفران لمیتد</p>
              <p className="font-semibold">Sehat-E-Zefran Ltd</p>
              <p className="font-semibold">Saga Laboratories London - UK</p>
              <p className="font-semibold">(ثبت و راجستر شده وزرات صحت عامه)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between px-2">
          <p className="font-semibold ">
            Customer name: <span className="capitalize">{customerName}</span>{" "}
          </p>
          <p className="font-semibold">Bill number: {invoiceId} </p>
          <p className="font-semibold">Date: {invoiceDate} </p>
        </div>
        {modalData.length && (
          <table className="w-full mt-2 text-center border border-black">
            <thead>
              <tr className="text-black font-semibold w-full">
                <td className="py-2 px-2 border border-black w-1/12 text-sm">
                  #
                </td>
                <td className="border px-2 border-black w-7/12 text-sm">
                  Product name
                </td>
                <td className="border border-black  w-1/12 text-sm px-8">
                  quantity
                </td>
                <td className="border border-black  w-1/12 text-sm px-8">
                  price
                </td>
                <td className="border border-black  w-1/12 text-sm px-8">
                  discount
                </td>
                <td className="border border-black  w-1/12 text-sm px-8">
                  total
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
                <td className="border text-sm border-black">
                  {totalBillAmount}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Modal>
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
                <option value="name">Search by name</option>
                <option value="dis_date">Search by date</option>
              </select>


            <input
              type="date"
              required={true}
              placeholder="date"
              className="border-2 border-blue-400 focus:outline-none py-1 px-3"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button
              type="submit"
              className="py-1 px-2 bg-blue-400 text-white shadow font-semibold focus:outline-none"
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
          </form>
        </div>
        <div className="p-2 w-full bg-white shadow-lg rounded-lg">
          {data.length && (
            <table className="text-center w-full">
              <thead>
                <tr className="text-white bg-blue-400   shadow">
                  <td className=" px-2 py-2">#</td>
                  <td>book page number</td>
                  <td>Province</td>
                  <td> customer name </td>
                  <td> visitor name</td>
                  <td> invoice date </td>
                  <td>total amount</td>
                </tr>
              </thead>
              <tbody>
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
                      <td>{++i}</td>
                      <td>{el.book_page_no}</td>
                      <td>{el.province}</td>
                      <td>{el.customer_name}</td>
                      <td>
                        {el.name} {el.last_name}
                      </td>
                      <td>{el.invoice_date}</td>
                      <td>{el.total_amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
