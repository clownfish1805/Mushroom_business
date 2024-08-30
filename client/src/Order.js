import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/sales");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data.map((item) => ({ ...item, num: 0 }))); // Assuming 'num' is initialized to 0.
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);
  console.log(dataList);
  return (
    <>
      <Header />
      <center>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>USER</th>
                <th>PRODUCTS</th>
                <th>SHIPPING ADDRESS</th>
                <th>PAYMENT METHOD</th>
                {/* <th>INVOICE_DATE</th>
          <th>TYPE</th>
          <th>PAYMENT</th> */}
              </tr>
            </thead>
            <tbody>
              {dataList && dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el.user}>
                    <td>{el.user}</td>
                    <td>{el.products}</td>
                    <td>{el.shippingAddress}</td>
                    <td>{el.paymentMethod}</td>
                    {/* <td>{el.Invoiceno}</td>
        <td>{el.Invoicedate}</td>
        <td>{el.Type}</td>
        <td>{el.Paymentstatus}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <p>No data</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </center>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default App;
