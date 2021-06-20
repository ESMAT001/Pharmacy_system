import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
        "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/get_specific_medicine_info.php",
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
              "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/cost_price_of_a_specific_medicine.php",
              medicineId
            )
            .then((res) => {
              if (res.data.status) setCostPrice(parseInt(res.data.cost_price));
            });

          axios
            .post(
              "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/findQunatityOFMedicine.php",
              { medicineId }
            )
            .then((res) => setTotalQuantity(res.data.remain));
        }
      });
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {show && (
        <tr key={i} className="">
          <td className="border text-sm border-black">{++i}</td>
          <td className="border text-sm border-black  ">{productName}</td>
          <td className="border border-black py-1">
            <textarea
              type="number"
              className="px-2 text-center text-sm w-full  mx-auto   focus:outline-none"
              rows="1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </td>
          <td className="border border-black">
            <input
              type="number"
              className="px-2 text-center w-full  py-1 text-sm focus:outline-none"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </td>
          <td className="border border-black no-print">{totalQuantity}</td>
          <td className="border border-black">
            <input
              type="date"
              className="px-2 text-center w-full  py-1 text-sm focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </td>
          <td className="border border-black  text-sm text-center">{total}</td>
          <td className="no-print">
            <button
              className="py-1 px-3 bg-green-400 text-white shadow focus:outline-none hover:bg-green-500 transition duration-200 "
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/specific_distribution_edit_data.php",
                    [
                      {
                        medicine_id: medicineId,
                        dis_id: el.dis_id,
                        quantity,
                        description,
                        date,
                        total,
                      },
                    ]
                  )
                  .then((res) => {
                    if (res.data.status) {
                      alert("data updated!");
                      if (
                        res.data.modal &&
                        res.data.data[0].quantity_needed > 0) {
                        openModal(
                          res.data.data[0].medicine_id,
                          productName,
                          res.data.data[0].quantity_needed
                        );
                      }else{
                        window.location.reload(); 
                      }
                    }else if(res.data.error){
                      alert(res.data.error);
                      window.location.reload(); 
                    }
                    console.log(res.data);
                  });
              }}
            >
              save
            </button>
          </td>
          <td className="no-print">
            <button
              className="py-1 px-2 bg-red-400 text-white  focus:outline-none hover:bg-red-500 transition duration-200 "
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/pharmacyproject/backend/sample_distribution_module/specific_distribution_delete_data.php",
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
