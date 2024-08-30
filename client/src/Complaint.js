import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function Complaint() {
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/complaints");
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
                <th>EMAIL</th>
                <th>TYPE OF COMPLAINT</th>
                <th>DATE OF ISSUE</th>
                <th>DETAILS OF ISSUE</th>
                {/* <th>Attachment</th> */}
              </tr>
            </thead>
            <tbody>
              {dataList && dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el.email}>
                    <td>{el.email}</td>
                    <td>{el.typeofComplaint}</td>
                    <td>{el.issueDate}</td>
                    <td>{el.detailsOfIssue}</td>
                    {/* <td>{el.pictureOfIssue}</td> */}
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

export default Complaint;
