import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function Inventory() {
  const [dataList, setDataList] = useState([]);

  // Maintain a state object where keys are row IDs and values are Alter values
  const [alterValues, setAlterValues] = useState({});

  const getFetchData = async () => {
    try {
      const data = await axios.get("/product");
      if (data.data.success) {
        const initialAlterValues = {};
        data.data.data.forEach((item) => {
          initialAlterValues[item._id] = 0;
        });
        setAlterValues(initialAlterValues);
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    getFetchData();
  }, []);

  const Alterdata = async (a) => {
    try {
      const data = await axios.put("/product/update", a);
      console.log("Updated Data:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleAdd = async (id, value) => {
    try {
      let updateArr = [];
      const updatedDataList = dataList.map((item) => {
        if (item._id === id) {
          const updatedVolume = Number(item.volume) + Number(value);
          item.volume = updatedVolume;
          updateArr.push(item);
          return { ...item, volume: updatedVolume };
        }
        return item;
      });

      setDataList(updatedDataList);

      const updatedAlterValues = { ...alterValues, [id]: value };
      setAlterValues(updatedAlterValues);

      await Alterdata(updateArr);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubtract = async (id, value) => {
    try {
      let updateArr = [];
      const updatedDataList = dataList.map((item) => {
        if (item._id === id) {
          const newVolume =
            Number(item.volume) - Number(value) < 0
              ? 0
              : Number(item.volume) - Number(value);
          item.volume = newVolume;
          updateArr.push(item);
          return { ...item, volume: newVolume };
        }
        return item;
      });

      setDataList(updatedDataList);

      const updatedAlterValues = { ...alterValues, [id]: value };
      setAlterValues(updatedAlterValues);

      await Alterdata(updateArr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <center>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>MUSHROOM NAME</th>
                <th>VOLUME</th>
                <th>PRICE</th>
                <th>DESCRIPTION</th>
                <th>DELIVERY TIME</th>
                <th>SCHEDULE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList && dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.mushroomName}</td>
                    <td>{el.volume}</td>
                    <td>{el.price}</td>
                    <td>{el.description}</td>
                    <td>{el.deliveryTime}</td>
                    <td>{el.schedule}</td>
                    <td>
                      <input
                        type="number"
                        value={alterValues[el._id]}
                        style={{ width: "50px" }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setAlterValues((prevValues) => ({
                            ...prevValues,
                            [el._id]: newValue,
                          }));
                          console.log(newValue);
                        }}
                      />
                      <button
                        className="btn btn-delete"
                        onClick={() => handleAdd(el._id, alterValues[el._id])}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() =>
                          handleSubtract(el._id, alterValues[el._id])
                        }
                      >
                        Minus
                      </button>
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

export default Inventory;
