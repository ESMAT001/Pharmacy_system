import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";
import settingIcon from "../images/setting.svg";
import axios from "axios";

function Index() {
  const history = useHistory();
  var email = sessionStorage.getItem("email");
  if (email == null) {
    history.push("/login");
  }

  const [rangeQ, setRangeQ] = useState(0);
  const [rangeE, setRangeE] = useState(0);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/pharmacyproject/backend/invoice_module/medicine_range_p.php",
        {
          method: "get",
        }
      )
      .then((res) => {
        setRangeE(parseInt(res.data.data.medicine_range_expire));
        setRangeQ(parseInt(res.data.data.medicine_range_quantity));
      });
  }, []);

  async function saveData(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/pharmacyproject/backend/invoice_module/medicine_range_p.php",
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
  return (
    <div>
      {" "}
      {document.getElementById("body").classList.add("bg-blue-500")}{" "}
      <div className=" ">
        <Navbar />
        <div id="body-content" className="p-16 ">
          <div className="">
            {isSettingOpen && (
              <form
                onSubmit={saveData}
                className={`flex flex-row w-3/4 mx-auto ${
                  isSettingOpen ? "bg-white" : ""
                } transition duration-500 p-4 rounded justify-between shadow-lg`}
              >
                <label className="flex items-center space-x-4">
                  <p className="font-semibold text-blue-500">Set Range</p>
                  <input
                    type="number"
                    value={rangeQ}
                    required={true}
                    onChange={(e) => setRangeQ(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-blue-500"
                  />
                </label>
                <label className="flex items-center space-x-4">
                  <p className="font-semibold text-blue-500">
                    Set expire range (month)
                  </p>
                  <input
                    type="number"
                    value={rangeE}
                    required={true}
                    onChange={(e) => setRangeE(e.target.value)}
                    className="border-2 border-blue-400 rounded py-1 px-2 focus:outline-none text-blue-500"
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
          <div className="flex flex-row justify-between mt-20">
            <div>1</div>
            <div>2</div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Index;
