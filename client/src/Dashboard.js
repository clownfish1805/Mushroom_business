import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [dataList, setDataList] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const getFetchData = async () => {
    try {
      const response = await axios.get("/dashboard");
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

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <Header />

      <div
        className="container"
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center" /* Align text to center */,
        }}
      >
        <div
          className="dataContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Date: {currentDate}</h2>
          {dataList.length > 0 ? (
            dataList.map((el, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h3>Mushroom product {el.s_no}</h3>
                <p>
                  <strong>PLANNED:</strong> {el.planned}
                </p>
                <p>
                  <strong>UNPLANNED:</strong> {el.unplanned}
                </p>
                <p>
                  <strong>STOCK:</strong> {el.stock}
                </p>
                <p>
                  <strong>TOTAL:</strong> {el.total}
                </p>
              </div>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
