import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [dataList, setDataList] = useState();

  const getFetchData = async () => {
    try {
      const response = await axios.get("/users");
      console.log("API Response:", response.data);

      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="contain">
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>User name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Address</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {dataList && dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile_no}</td>
                    <td>{el.address}</td>
                    <td>{el.orders}</td>
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
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default App;
