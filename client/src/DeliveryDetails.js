import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function DeliveryDetails() {
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/deliveryDetails");
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
                <th>S_NO</th>
                <th>USER NAME</th>
                <th>PERSON NAME</th>
                <th>PHONE NUMBER</th>
                <th>DELIVERY STATUS</th>
              </tr>
            </thead>
            <tbody>
              {dataList && dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el.s_no}>
                    <td>{el.s_no}</td>
                    <td>{el.user_name}</td>
                    <td>{el.person_name}</td>
                    <td>{el.phn}</td>
                    {/* <td>{el.delivery_items}</td> */}
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          id="myCheckbox"
                          style={{ marginRight: "4px" }}
                        />
                        Delivered
                      </label>
                    </td>
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

export default DeliveryDetails;
