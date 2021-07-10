import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import SampleDistributionInfo from "./SampleDistributionInfo";
import Modal from "react-modal";
import logo from "../../images/logo.png";

function NameOfJsFile() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [sampleDistributionData, setSampleDistributionData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [loadAll, setLoadAll] = useState(false);
  async function fetchData() {
    let data = await fetch(
      "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/get_all_sample_distribution.php"
    );
    data = await data.json();
    if (data.status) {
      //console.log(data.data);
      setSampleDistributionData(data.data);
      setCopyData(data.data);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    //console.log("loading all");
    fn(fetchData);
  }, [loadAll]);
  //search section

  const [productNames, setProductNames] = useState({});

  const [searchMethod, setSearchMethod] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  function fn(cl) {
    const val = productNames["notFOUNDEDEDED"];
    let arr = copyData.filter((el, i) => {
      if (searchMethod === "name") {
        //console.log(el["medicine_id"], val, i);
        return parseInt(el["medicine_id"]) === val;
      } else if (searchMethod === "dis_date") {
        return el["dis_date"] === "noDAte";
      }
    });
    setSampleDistributionData(arr);
    setTimeout(() => {
      cl();
    }, 500);
  }

  function searchData(e) {
    e.preventDefault();
    fn(() => {
      //console.log("seatch");
      const val = productNames[searchProductName];
      let arr = copyData.filter((el, i) => {
        if (searchMethod === "name") {
          //console.log(el["medicine_id"], val, i);
          return parseInt(el["medicine_id"]) === val;
        } else if (searchMethod === "dis_date") {
          //console.log(el["dis_date"],searchDate)
          return el["dis_date"] === searchDate;
        }
      });

      setSampleDistributionData(arr);
    });
  }

  //end of search section

  Modal.setAppElement("#root");
  const [modalMedicineId, setModalMedicineId] = useState("");
  const [modalProductName, setModalProductName] = useState("");
  const [modalNeededQuantity, setModalNeededQuantity] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  async function openModal(medId, medName, medNeededQ) {
    setModalMedicineId(medId);
    setModalProductName(medName);
    setModalNeededQuantity(medNeededQ);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    window.location.reload();  
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
              <td className="py-2">Product name</td>
              <td>Remain quantity</td>
            </tr>
          </thead>
          <tbody>
            {modalNeededQuantity && (
              <tr key={modalMedicineId}>
                <td>{modalProductName}</td>
                <td>{modalNeededQuantity}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>{" "}
      {document.getElementById("body").classList.add("bg-blue-500")}
      <div className=" flex justify-center">
        <div className="p-2 bg-white  rounded-lg w-full">
          <div className="flex justify-end no-print">
            <button
              onClick={() => window.print()}
              className="py-2 px-3 bg-blue-400 text-white shadow font-semibold focus:outline-none mr-4"
            >
              Print
            </button>
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
                <p className="font-semibold">
                  (ثبت و راجستر شده وزرات صحت عامه)
                </p>
              </div>
            </div>
          </div>
          <div class="no-print flex flex-row justify-center">
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
              {searchMethod === "name" && (
                <>
                  <input
                    type="text"
                    required={true}
                    placeholder="product name"
                    className="border-2 border-blue-400 focus:outline-none py-1 px-3"
                    value={searchProductName}
                    onChange={(e) => setSearchProductName(e.target.value)}
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
                    onClick={() => setLoadAll((prev) => !prev)}
                  >
                    load all
                  </button>
                </>
              )}
              {searchMethod === "dis_date" && (
                <>
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
                    onClick={() => setLoadAll((prev) => !prev)}
                  >
                    load all
                  </button>
                </>
              )}
            </form>
          </div>
          {sampleDistributionData.length > 0 && (
            <table className="w-full mt-2 text-center border border-black">
              <thead>
                <tr className="text-black font-semibold w-full">
                  <td className="py-2 px-2 border border-black w-1/12 text-sm">
                    #
                  </td>
                  <td className="border border-black  w-3/12 text-sm px-8">
                    Product Name
                  </td>
                  <td className="border px-2 border-black w-5/12 text-sm">
                    Description
                  </td>
                  <td className="border border-black  w-1/12 text-sm px-8">
                    quantity
                  </td>
                  <td className="border border-black  w-1/12 text-sm px-8 no-print">
                    remaining
                  </td>
                  <td className="border border-black  w-1/12 text-sm px-8">
                    Date
                  </td>
                  <td className="border border-black  w-1/12 text-sm px-8">
                    total Amount
                  </td>
                  <td className="no-print"></td>
                  <td className="no-print"></td>
                </tr>
              </thead>
              <tbody className="">
                {sampleDistributionData.map((el, i) => {
                  return (
                    <SampleDistributionInfo
                      el={el}
                      i={i}
                      setProductNames={setProductNames}
                      openModal={openModal}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
          {sampleDistributionData.length === 0 && (
            <p className="text-center mt-4 text-red-400 font-semibold">
              No result!
            </p>
          )}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default NameOfJsFile;
