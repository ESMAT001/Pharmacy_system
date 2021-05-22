import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import InvoiceInfo from "./InvoiceInfo";

function InvoiceList() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "http://localhost:8080/pharmacyproject/backend/invoice_module/invoice_list.php"
      );
      response = await response.json();
      if (response.status) {
        setData(response.data);
      }
      console.log(response);
    };
    fetchData();
  }, []);

  const [invoiceId, setInvoiceId] = useState("");
  useEffect(() => {
   
    if (invoiceId !== ""){     
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

  async function deleteInvoiceInfo(index) {
      console.log('filter')
    const arr = modalData.filter((_, i) => i !== index);
    console.log('filter done')
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
    setInvoiceId("");
    setModalData([]);
    setIsOpen(false);
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

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-auto p-4 rounded shadow absolute top-0 left-0 bottom-0 right-0 bg-white"
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
        {/* p.product_name,ip.invoice_medicine_list_id,ip.pack_quantity,ip.sell_price,ip.discount,ip.status */}
        {modalData.length && (
          <table className="w-full mt-2 text-center">
            <thead>
              <tr className="text-white bg-blue-400  shadow">
                <td className="py-2 px-2">#</td>
                <td>Product name</td>
                <td>pack quantity</td>
                <td>sell price</td>
                <td>discount</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody className="">
              {modalData.map((el, i) => {
                return <InvoiceInfo el={el} i={i} delFn={deleteInvoiceInfo} />;
              })}
            </tbody>
          </table>
        )}
      </Modal>
      {document.getElementById("body").classList.add("bg-blue-500")}
      {/* <Navbar /> */}
      <div className="py-16 px-20 w-full  flex justify-center">
        <div className="p-2 w-full bg-white shadow-lg rounded-lg">
          {data.length && (
            <table className="text-center w-full">
              <thead>
                <tr className="text-white bg-blue-400   shadow">
                  <td className=" px-2 py-2">#</td>
                  <td>id</td>
                  <td> user id </td>
                  <td>book page number</td>
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
                      onClick={() => setInvoiceId(el.invoice_id)}
                    >
                      <td>{i++}</td>
                      <td>{el.invoice_id}</td>
                      <td>{el.user_id}</td>
                      <td>{el.book_page_no}</td>
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
