import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

function SampleDistribution() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [medicineName, setMedicineName] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [medicineQuantityText, setMedicineQuantityText] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState("");
  const [data, setData] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [costPrice, setCostPrice] = useState("");
  const [costPriceValue, setCostPriceValue] = useState("");
  const [description, setDescription] = useState("");
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(
        "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/add_to_previous_medicine.php"
      );
      data = await data.json();
      console.log(data);
      const arr = [];

      for (const key in data) {
        arr.push({
          id: key,
          medicineName: data[key],
        });
      }
      console.log(arr);
      setMedicineList(arr);
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/findQunatityOFMedicine.php",
        { medicineId }
      )
      .then((res) => setMedicineQuantityText(res.data.remain));
  }, [medicineId]);

  useEffect(() => {
    console.log("cost", costPrice, medicineQuantity);
    if (medicineQuantity && costPrice)
      setCostPriceValue(parseInt(costPrice) * parseInt(medicineQuantity));
  }, [costPrice, medicineQuantity]);

  useEffect(() => {
    if (medicineId !== "") {
      axios
        .post(
          "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/cost_price_of_a_specific_medicine.php",
          medicineId.split("|")[0]
        )
        .then((res) => {
          // console.log(res);
          if (res.data.status) setCostPrice(res.data.cost_price);
        });
    }

    if (medicineId !== "" && medicineQuantity !== "" && description !== "") {
      setBtnDisabled(false);
    }
  }, [medicineId, medicineQuantity, description]);

  function handleAddClick(e) {
    e.preventDefault();
    const medInfo = medicineId.split("|");
    const newDataObj = {
      description,
      medicine_name: medInfo[1],
      medicine_id: medInfo[0],
      quantity: medicineQuantity,
      finalPrice: costPriceValue,
    };
    setData((prev) => [...prev, newDataObj]);
    setDescription("");
    setMedicineQuantity("");
    setMedicineQuantity("");
    setBtnDisabled(true);
  }

  async function saveData() {
    console.log(data);
    axios
      .post(
        "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/add_sample_distribution.php",
        data
      )
      .then((res) => {
        console.log("response");
        console.log(res.data);
        if (res.data.status && res.data.modal) {
          const medData = res.data.data;
          console.log(medData);
          remainAmount = medData;
          const medicineIds = [];
          for (let i = 0; i < medData.length; i++) {
            medicineIds.push(medData[i].medicine_id);
          }
          getSpecificMedicineInfo(medicineIds);
        } else if (res.data.status) {
          alert("data saved !");
          history.push("/sampleDistributionList");
        }
      });
  }

  function handleDelete(i) {
    setData((prev) => prev.filter((el, index) => index !== i));
  }

  let remainAmount = [];

  Modal.setAppElement("#root");

  useEffect(() => {
    if (modalData.length > 0) openModal();
  }, [modalData]);

  async function getSpecificMedicineInfo(medicineIds) {
    console.log(medicineIds);
    axios
      .post(
        "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/get_specific_medicine_info.php",
        medicineIds
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.status) {
          const data = res.data.data;
          console.log(data);
          console.log(remainAmount);
          const newData = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].medicine_id == remainAmount[i].medicine_id) {
              console.log("cuptured");
              newData.push({
                medicine_id: data[i].medicine_id,
                product_name: data[i].product_name,
                needed_qunatity: remainAmount[i].quantity_needed,
              });
            }
          }
          console.log(newData);
          setModalData([...newData]);
        }
      });
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    history.push("/sampleDistributionList");
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
      {" "}
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
                    <tr key={el.medicine_id + "-" + i}>
                      <td className="py-2">{i++}</td>
                      <td>{el.product_name}</td>
                      <td>{el.needed_qunatity}</td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </Modal>
      {document.getElementById("body").classList.add("bg-blue-500")} <Navbar />
      <div className="py-16 flex justify-center">
        <div className="p-2 bg-white shadow-lg rounded-lg w-7/12 flex flex-col justify-center">
          <form className="flex flex-col mt-3">
            <div className="flex flex-row justify-evenly items-center w-full">
              <select
                className="p-1 focus:outline-none border-2 border-blue-300 rounded-md   "
                required={true}
                value={medicineId}
                onChange={(e) => {
                  console.log(e.target.value);
                  return setMedicineId(e.target.value);
                }}
              >
                <option> select medicine </option>
                {medicineList.map((el) => (
                  <option value={el.id + "|" + el.medicineName}>
                    {el.medicineName}
                  </option>
                ))}
              </select>
              <label className="">
                Available Amount {medicineQuantityText}
              </label>
              <input
                type="text"
                placeholder="quantity"
                className="p-1  focus:outline-none border-2 border-blue-300 rounded-md "
                value={medicineQuantity}
                onChange={(e) => setMedicineQuantity(e.target.value)}
                required
              />

              <input
                type="submit"
                value="Add"
                className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"
                onClick={handleAddClick}
                disabled={btnDisabled}
              />
            </div>
            <label className="px-7 py-4">
              description :
              <textarea
                className="p-1  focus:outline-none border-2 border-blue-300 rounded-md w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              ></textarea>
            </label>
          </form>
          {data.length !== 0 && (
            <table className="w-full mt-5 text-center">
              <thead className="bg-blue-400 text-white font-semibold shadow">
                <tr>
                  <td className="py-2 px-2"> # </td>
                  <td className="py-2"> Medicine name </td>
                  <td className="py-2"> Discription </td>
                  <td> Quantity </td>
                  <td>final price </td>
                  <td> </td>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-blue-300">
                {data.map((el, i) => {
                  return (
                    <tr key={el.medicineId + i}>
                      <td className="py-3 px-2"> {i + 1} </td>
                      <td className="py-3 "> {el.medicine_name} </td>
                      <td className="py-3 "> {el.description} </td>
                      <td className="py-3 "> {el.quantity} </td>
                      <td className="py-3 "> {el.finalPrice} </td>
                      <td className="py-3 ">
                        <button
                          className="bg-red-400 text-white font-semibold px-3 py-1 text-center shadow-xl hover:bg-red-500 hover:shadow-xl transition duration-300 focus:outline-none"
                          onClick={() => handleDelete(i)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {data.length > 0 && (
            <button
              className="bg-green-400 py-2 px-10 mx-auto inline-block text-white font-semibold"
              onClick={saveData}
            >
              Save
            </button>
          )}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default SampleDistribution;
