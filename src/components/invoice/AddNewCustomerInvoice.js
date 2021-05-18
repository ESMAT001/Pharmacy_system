import React, { useState, useEffect } from 'react'
import Navbar from "../navbar";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
function AddNewCustomerInvoice() {

    const history = useHistory();
    var email = sessionStorage.getItem("email");
    if (email == null) {
        history.push("/login")
    }

    const [customerName, setCustomerName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [province, setProvince] = useState("")
    const customerHandler = (userData) => {
        setCustomerName(userData);
    }
    const addressHandler = (userData) => {
        setAddress(userData);
    }
    const phoneHandler = (userData) => {
        setPhone(userData);
    }
    const provinceHandler = (userData) => {
        setProvince(userData);
    }

    const [userId, setUserId] = useState("")

    const addCutomerForm = (browser) => {
        browser.preventDefault();
        var formData = new FormData();
        formData.append("customerName", customerName);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("province", province);
        var dataJson = Object.fromEntries(formData);
        axios.post("http://localhost:8080/pharmacyproject/backend/invoice_module/add_new_invoice.php", dataJson)
            .then(async (res) => {
                console.log('response customer')
                // let resp= JSON.parse(res.data.sql)
                console.log(res)
                if (res.data.status === "true") {
                    document.getElementById("Invoice").classList.remove("hidden");
                    document.getElementById("addCustomerSubmitBtn").classList.add("hidden");
                    setUserId(res.data.id)
                    getVisitor()
                } else {
                    console.log(res)
                }
            })



    }



    useEffect(() => {
        fetchData()

    }, [])
    async function fetchData() {
        const dataFromApi = await axios.get("http://localhost:8080/pharmacyproject/backend/medicine_module/add_to_previous_medicine.php");
        const dataTaken = await dataFromApi.data;
        const convertingDataToJson = dataTaken;

        const medicineInOne = await makeOptionForSelect([convertingDataToJson]);
        document.getElementById("medicineName").innerHTML = medicineInOne;
    }
    async function DataSet(data) {
        setData(data)
    }

    async function makeOptionForSelect(data) {

        var output = "";
        data.map(element => {
            output += "<option value=''>Select One Medicine</option>"
            for (let key in element) {
                output += `<option value=${key + "|" + element[key]}>${element[key]}</option>`
            }
        })
        return output
    }


    async function getVisitor() {
        let response = await fetch("http://localhost:8080/pharmacyproject/backend/visitor_module/visitor_list.php")
        response = await response.json()
        setVisitorList(response)
        console.log(response)
    }

    const [MedicineValue, setMedicineValue] = useState("");
    var [sellQuantity, setSellQuantity] = useState("")
    const [sellPrice, setSellPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [finalPrice, setFinalPrice] = useState(0)
    const [visitorList, setVisitorList] = useState([])
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [bookPageNo, setBookPageNo] = useState("")
    const [visitor, setVisitor] = useState("")
    const [data, setData] = useState([]);


    const [dataArray, setDataArray] = useState([])



    var quatityInS = "";
    async function medicineHandler(e) {

        var fetchQuantity = await QuantityFetcher(e.target.value);
        console.log(quatityInS)
    }

    function handleAddClick(e) {
        e.preventDefault()
        const medInfo = document.getElementById("medicineName").value.split("|")
        const newDataObj = {
            visitor:visitor,
            bookPageNo: bookPageNo,
            userId: userId,
            medicineName: medInfo[1],
            medicineId: medInfo[0],
            sellQuantity: sellQuantity,
            sellPrice: sellPrice,
            discount: discount,
            finalPrice: finalPrice
        }
        setDataArray(prev => [...prev, newDataObj])

        setSellQuantity("")
        setSellPrice("")
        setDiscount("")
        setBtnDisabled(true)
    }

    async function QuantityFetcher(medicineId) {

        var formData = new FormData();
        formData.append("medicineId", medicineId);
        var jsonData = Object.fromEntries(formData);
        var response = await axios.post("http://localhost:8080/pharmacyproject/backend/invoice_module/findQunatityOFMedicine.php", jsonData);
        if (response.data.status === "true") {
            document.getElementById("quantityInStock").value = response.data.remain;
            quatityInS = response.data.remain;

        } else {
            console.log(response);
        }

    }

    useEffect(() => {
        console.log(dataArray)
        console.log(discount, sellPrice)
        if (discount !== "" && sellPrice !== "") {
            setFinalPrice((parseInt(discount) * parseInt(sellPrice)) / 100)
        } else if (discount === "" || sellPrice === "") {
            setFinalPrice(0)
        }
        if (discount !== "" && sellPrice !== "" && sellQuantity !== "") {
            setBtnDisabled(false)
        }

    }, [discount, sellPrice, sellQuantity, dataArray])

    function handleDelete(i) {
        setDataArray(prev => prev.filter((el, index) => index !== i))
    }

    async function saveData() {

        axios.post("http://localhost:8080/pharmacyproject/backend/invoice_module/add_all_invoice.php", dataArray)
            .then(res => {
                console.log('response')
                console.log(res.data)
            })
    }

    return (
        <div>
            {
                document.getElementById("body").classList.add("bg-blue-500")
            }
            <Navbar />

            <div className="p-16 flex justify-center">

                <div className="flex flex-col">
                    <div className="p-2 bg-white shadow-lg rounded-lg text-center ">
                        <h1 className="font-bold">Add New Customer</h1>
                        <form onSubmit={addCutomerForm}>

                            <FormInput type="text" handler={customerHandler} placeHolder="Customer Name" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                            <FormInput type="text" handler={addressHandler} placeHolder="Address" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                            <br />
                            <FormInput type="text" handler={phoneHandler} placeHolder="Phone No." style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                            <FormInput type="text" handler={provinceHandler} placeHolder="Province" style="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" />
                            <br />
                            <div id="addCustomerSubmitBtn">
                                <SubmitBtn style="bg-blue-500 p-2 text-white w-64 rounded-md cursor-pointer focus:bg-blue-300 focus:text-blue-600" value="Add Customer" />
                            </div>
                        </form>
                    </div>
                    <div className="p-2 bg-white shadow-lg rounded-lg text-center mt-5 hidden" id="Invoice">
                        <form>
                            <select className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3" required={true}
                                value={visitor} onChange={(e) => setVisitor(e.target.value)}>
                                <option>select visitor</option>
                                {
                                    visitorList.length >= 0 && visitorList.map((el, i) => {
                                        return (
                                            <option value={el.visitor_id} key={i}>
                                                {el.name} {el.last_name}
                                            </option>
                                        )
                                    }
                                    )
                                }
                            </select>
                            <input type="text" placeholder="Book Page No" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-64 mb-3" required
                                value={bookPageNo}
                                onChange={(e) => setBookPageNo(e.target.value)}
                            />
                            <br />
                            <div>
                                <select default={MedicineValue} onChange={medicineHandler} id="medicineName" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-54 mb-3" required>

                                </select>
                                <input type="text" id="quantityInStock" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-16 mb-3" readOnly />
                                <input type="text" placeholder="Sell quantity" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                                    required
                                    value={sellQuantity}
                                    onChange={e => setSellQuantity(e.target.value)}
                                />
                                <input type="text" placeholder="Sell Price" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                                    required
                                    value={sellPrice}
                                    onChange={e => setSellPrice(e.target.value)}
                                />
                                <input type="text" placeholder="Discount" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                                    required
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                />
                                <input type="text" placeholder="Final price" className="p-1 mx-1 focus:outline-none border-2 border-blue-300 rounded-md  w-20 mb-3"
                                    readOnly={true}
                                    value={finalPrice}
                                />
                                <input type="submit" value="Add" className="p-2 bg-blue-400 rounded-lg px-3 text-white focus:outline-none focus:bg-blue-200"
                                    onClick={handleAddClick}
                                    disabled={btnDisabled}
                                />

                            </div>
                        </form>

                        {dataArray.length !== 0 && <table className="w-full" >
                            <thead className="bg-blue-400 text-white font-semibold shadow">
                                <tr>
                                    <td className="py-2">
                                        Medicine name
                                    </td>
                                    <td>
                                        sell quantity
                                    </td>
                                    <td>
                                        sell price
                                    </td>
                                    <td>
                                        discount
                                    </td>
                                    <td>
                                        final price
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-blue-300">
                                {
                                    dataArray.map((el, i) => {
                                        return (
                                            <tr key={el.medicineId + i} >
                                                <td className="py-3 ">
                                                    {el.medicineName}
                                                </td>
                                                <td className="py-3 ">
                                                    {el.sellQuantity}
                                                </td>
                                                <td className="py-3 ">
                                                    {el.sellPrice}
                                                </td>
                                                <td className="py-3 ">
                                                    {el.discount}
                                                </td>
                                                <td className="py-3 ">
                                                    {el.finalPrice}
                                                </td>
                                                <td className="py-3 ">
                                                    <button className="bg-red-400 text-white font-semibold px-3 py-1 text-center shadow-xl hover:bg-red-500 hover:shadow-xl transition duration-300 focus:outline-none"
                                                        onClick={
                                                            () => handleDelete(i)
                                                        }
                                                    >
                                                        X
                                                   </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>}
                        {
                            dataArray.length > 0 && <button className="bg-green-400 py-2 px-10 text-white font-semibold" onClick={saveData} >Save</button>
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddNewCustomerInvoice
