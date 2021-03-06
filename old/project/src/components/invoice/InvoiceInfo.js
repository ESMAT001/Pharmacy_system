import React, { useState, useEffect } from "react";
import axios from "axios";

function InvoiceInfo({ el, i, setTotalBillAmount }) {
  const [packQuantity, setPackQuantity] = useState(el.pack_quantity);
  const [sellPrice, setSellPrice] = useState(el.sell_price);
  const [discount, setDiscount] = useState(el.discount);
  const [lineThrough, setLineThrough] = useState(el.status === "returned" ? true : false);


  function discountAmount() {
    const val1 = ((discount * sellPrice * packQuantity) / 100).toFixed(2);
    const val2 = sellPrice * packQuantity;
    return val2 - val1;
  }

  const [total, setTotal] = useState(discountAmount());
  const [show, setShow] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setTotal(discountAmount());
    if (isSaved) setIsSaved(false);
  }, [sellPrice, discount, packQuantity]);

  useEffect(() => {
    setTotalBillAmount((prev) => prev + total);
    // axios
    //   .post(
    //     "http://localhost:8080/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php",
    //     { medicineId: el.medicine_id }
    //   )
    //   .then((res) => setTotalQuantity(res.data.remain));
  }, []);

  // const [totalQuantity, setTotalQuantity] = useState(0);

  return (
    <>
      {show && (
        <tr key={i} className="">
          <td className={"border text-sm border-black " + (lineThrough ? "line-through" : "")}>{++i}</td>
          <td className={"border text-sm border-black  " + (lineThrough ? "line-through" : "")}>{el.product_name}</td>
          <td className="border border-black py-1">
            <input
              type="number"
              className={"px-2 text-center text-sm w-full  mx-auto  py-1  focus:outline-none " + (lineThrough ? "line-through" : "")}
              value={packQuantity}
              onChange={(e) => setPackQuantity(e.target.value)}
            />
          </td>
          {/* <td className={"no-print border border-black " + (lineThrough ? "line-through" : "")}>{totalQuantity}</td> */}
          <td className="border border-black">
            <input
              type="number"
              className={"px-2 text-center w-full  py-1 text-sm focus:outline-none " + (lineThrough ? "line-through" : "")}
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </td>
          <td className="border border-black">
            <input
              type="number"
              className={"px-2 py-1 text-center w-full text-sm  mx-auto  focus:outline-none " + (lineThrough ? "line-through" : "")}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </td>
          <td className={"border border-black  text-sm text-center " + (lineThrough ? "line-through" : "")}>{total}</td>
          <td className="no-print">
            <button
              className="py-1 px-3 bg-green-400 text-white shadow focus:outline-none hover:bg-green-500 transition duration-200 "
              disabled={isSaved}
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/pharmacyproject/backend/invoice_module/specific_invoice_edit_data.php",
                    {
                      invoice_medicine_list_id: el.invoice_medicine_list_id,
                      pack_quantity: packQuantity,
                      sell_price: sellPrice,
                      discount: discount,
                    }
                  )
                  .then((res) => {
                    if (res.data.status) {
                      setIsSaved(true);
                      alert("data updated!");
                    }
                  });
              }}
            >
              save
            </button>
          </td>
          <td className="no-print">
            <button
              className="py-1 px-2 bg-red-400 text-white  focus:outline-none hover:bg-red-500 transition duration-200 "
              disabled={
                lineThrough
              }
              onClick={() => {
                const returnedQuantity = parseInt(prompt("Enter quantity to be returned!\ncurrent quantity :" + packQuantity));
                if (typeof returnedQuantity === 'number' && 0 < returnedQuantity <= packQuantity) {
                  console.log({ invoice_medicine_list_id: el.invoice_medicine_list_id, returnedQuantity })
                  axios
                    .post(
                      "http://localhost:8080/pharmacyproject/backend/invoice_module/specific_invoice_return.php",
                      { invoice_medicine_list_id: el.invoice_medicine_list_id, returnedQuantity }
                    )
                    .then((res) => {
                      if (res.data.status) {
                        alert("data returned!");
                        // setShow(false);
                        setLineThrough(true);
                        console.log(res.data)
                      } else {
                        console.log(res.data)
                      }
                    });
                } else {
                  alert("invalid input");
                }

              }}
            >
              {lineThrough ? "returned" : "return"}
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default InvoiceInfo;
