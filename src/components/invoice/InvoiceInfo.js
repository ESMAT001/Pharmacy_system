import React, { useState } from "react";
import axios from "axios";

function InvoiceInfo({ el, i }) {
  const [packQuantity, setPackQuantity] = useState(el.pack_quantity);
  const [sellPrice, setSellPrice] = useState(el.sell_price);
  const [discount, setDiscount] = useState(el.discount);
  const [show, setShow] = useState(true);
  return (
    <>
      {
        show && <tr key={i} className="my-2">
          <td>{i++}</td>
          <td>{el.product_name}</td>
          <td>
            <input
              type="text"
              className="px-2 text-center w-3/4 py-1 border border-blue-400 focus:outline-none"
              value={packQuantity}
              onChange={(e) => setPackQuantity(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              className="px-2 text-center w-3/4 py-1 border border-blue-400 focus:outline-none"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              className="px-2 text-center w-3/4 py-1 border border-blue-400 focus:outline-none"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </td>
          <td>
            <button
              className="py-1 px-3 bg-green-400 text-white shadow focus:outline-none hover:bg-green-500 transition duration-200"
              // invoice_medicine_list_id
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
                  .then((res) => console.log(res.data));
              }}
            >
              save
            </button>
          </td>
          <td>
            <button
              className="py-1 px-3 bg-red-400 text-white shadow focus:outline-none hover:bg-red-500 transition duration-200"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/pharmacyproject/backend/invoice_module/specific_invoice_delete_data.php",
                    el.invoice_medicine_list_id
                  )
                  .then((res) => {
                    if (res.data.status) {
                     setShow(false)
                    }
                  });
              }}
            >
              delete
            </button>
          </td>
        </tr>
      }
    </>
  );
}

export default InvoiceInfo;
