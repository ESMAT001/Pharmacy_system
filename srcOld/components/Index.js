import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";
import settingIcon from "../images/setting.svg";
import axios from "axios";
import BASE_URL from "./BASE_URL";
function Index() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [rangeQ, setRangeQ] = useState(0);
  const [rangeE, setRangeE] = useState(0);
  const [expireData, setExpireData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  useEffect(() => {
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/medicine_range_p.php`,
        {
          method: "get",
        }
      )
      .then((res) => {
        setRangeE(parseInt(res.data.data.medicine_range_expire));
        setRangeQ(parseInt(res.data.data.medicine_range_quantity));
      });


  }, []);

  useEffect(() => {

    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/range.php`,
        {
          method: "expire_date",
        }
      )
      .then((res) => setExpireData(res.data.data));
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/range.php`,
        {
          method: "quantity",
        }
      )
      .then((res) => {

        const count = res.data.data
        const medicineNames = []
        for (let index = 0; index < count.length; index++) {
          if (medicineNames.indexOf(count[index].name) === -1) medicineNames.push(count[index].name);
        }

        console.log(count)
        for (let index = 0; index < medicineNames.length; index++) {
          let medicineCount = 0;
          for (let j = 0; j < count.length; j++) {
            if (count[j].name === medicineNames[index]) {
              medicineCount += parseInt(count[j].quantity)
            }
          }
          console.log(medicineCount)
          if (medicineCount < rangeQ) {
            medicineNames[index] = {
              name: medicineNames[index],
              quantity: medicineCount
            }
          } else {
            medicineNames[index] = false
          }

        }

        console.log(medicineNames)

        setQuantityData(medicineNames)
      });
  }, [rangeQ])



  async function saveData(e) {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL(document.location.origin)}/pharmacyproject/backend/invoice_module/medicine_range_p.php`,
        {
          method: "set",
          data: {
            medicine_range_expire: rangeE,
            medicine_range_quantity: rangeQ,
          },
        }
      )
      .then((res) => {
        if (res.data.status) window.location.reload();
      });
  }

  const [isSettingOpen, setIssSettingOpen] = useState(false);
  const [settingMethod, setSettingMethod] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <div>
      {" "}
      {document.getElementById("body").classList.add("bg-blue-500")}{" "}
      <div className=" ">
        <Navbar />
        <div id="body-content" className="p-16 ">
          <div className=" flex flex-col justify-center">
            {isSettingOpen && (
              <select
                value={settingMethod}
                onChange={(e) => setSettingMethod(e.target.value)}
                className="focus:outline-none mb-8 p-2 rounded shadow mx-auto"
              >
                <option>Select settings</option>
                <option value="range">Range settings</option>
              </select>
            )}
            {settingMethod === "range" && (
              <form
                onSubmit={saveData}
                className={`flex flex-row w-4/5 mx-auto ${isSettingOpen ? "bg-white" : ""
                  } transition duration-500 p-4 rounded justify-between shadow-lg`}
              >
                <label className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-800">
                    Set quantity Range
                  </p>
                  <input
                    type="number"
                    value={rangeQ}
                    required={true}
                    onChange={(e) => setRangeQ(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-gray-800"
                  />
                </label>
                <label className="flex items-center space-x-4">
                  <p className="font-semibold text-gray-800">
                    Set expire range (month)
                  </p>
                  <input
                    type="number"
                    value={rangeE}
                    required={true}
                    onChange={(e) => setRangeE(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-gray-800"
                  />
                </label>
                <button
                  type="submit"
                  className="text-white bg-green-400 px-5 py-2 font-bold rounded shadow focus:outline-none hover:bg-green-500 transition duration-300"
                >
                  Save
                </button>
              </form>
            )}
            {settingMethod === "password" && (
              <form
                onSubmit={saveData}
                className={`flex flex-row w-4/5 mx-auto ${isSettingOpen ? "bg-white" : ""
                  } transition duration-500 p-4 rounded justify-between shadow-lg`}
              >
                <label className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-800">
                    current password
                  </p>
                  <input
                    type="password"
                    value={currentPassword}
                    required={true}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-gray-800"
                  />
                </label>
                <label className="flex items-center space-x-4">
                  <p className="font-semibold text-gray-800">new password</p>
                  <input
                    type="number"
                    value={newPassword}
                    required={true}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-gray-800"
                  />
                </label>
                <button
                  type="submit"
                  className="text-white bg-green-400 px-5 py-2 font-bold rounded shadow focus:outline-none hover:bg-green-500 transition duration-300"
                >
                  Save
                </button>
              </form>
            )}
            <button
              className="focus:outline-none absolute right-12 top-20"
              onClick={() => setIssSettingOpen((prev) => !prev)}
            >
              <img src={settingIcon} alt="icon" className="w-10" />
            </button>
          </div>
          <div className="flex flex-row justify-evenly mt-20">
            <div className="bg-white py-4 px-7 rounded shadow-lg">
              <h1 className="font-semibold text-lg text-gray-800">
                List of medicine which will expire in {rangeE} or less then{" "}
                {rangeE} months.
              </h1>
              <table className="w-full text-center mt-4">
                <thead>
                  <tr className="bg-blue-400 text-white shadow">
                    <td className="py-1 px-2">#</td>
                    <td>Product Name</td>
                    <td>Expire Date</td>
                    <td>Quantity</td>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {expireData.length &&
                    expireData.map((el, i) => {
                      return (
                        <tr key={i}>
                          <td className="py-1">{++i}</td>
                          <td>{el.name}</td>
                          <td>{el.expire_date}</td>
                          <td>{el.quantity}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="bg-white py-4 px-7 rounded shadow-lg">
              <h1 className="font-semibold text-lg text-gray-800">
                List of medicine which there quantity is less then {rangeQ}.
              </h1>
              <table className="w-full text-center mt-4">
                <thead>
                  <tr className="bg-blue-400 text-white shadow">
                    <td className="py-1 px-2">#</td>
                    <td>Product Name</td>
                    {/* <td>entry date</td> */}
                    <td>Quantity</td>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {quantityData.length &&
                    quantityData.map((el, i) => {
                      if (el) {
                        return (
                          <tr key={i}>
                            <td className="py-1">{++i}</td>
                            <td>{el.name}</td>
                            {/* <td>{el.entry_date}</td> */}
                            <td>{el.quantity}</td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Index;
