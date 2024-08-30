/* eslint-disable react-hooks/rules-of-hooks */
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormTable } from "./components/FormTable";
import Header from "./components/Header";
import Footer from "./components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function AddProduct() {
  const [file, setFile] = useState();
  const [addSection, setAddSection] = useState(false);

  const [formData, setFormData] = useState({
    s_no: "",
    product_id: "",
    product_name: "",
    unit: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/product/create", formData);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData(); // Assuming this function fetches and updates the data.
      } else {
        alert(data.data.message); // Display the server's error message.
      }
    } catch (error) {
      console.error("Error with the create request:", error);
      // You can also set a state to show a user-friendly error message.
      // setError("An error occurred while processing your request.");
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/product"); // Fix the URL by adding a "/"
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

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post("/product/upload", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/product/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="contain">
        <button
          className="btn btn-add"
          style={{ backgroundColor: "#9dccba" }}
          onClick={() => setAddSection(true)}
        >
          Add
        </button>

        {addSection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleUpload={handleUpload}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}

        <br />
        <br />
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>MUSHROOM NAME</th>
                <th>IMAGE</th>
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
                    <td>{el.image}</td>
                    <td>{el.volume}</td>
                    <td>{el.price}</td>
                    <td>{el.description}</td>
                    <td>{el.deliveryTime}</td>
                    <td>{el.schedule}</td>
                    <td>
                      <button
                        className="btn btn-delete"
                        style={{ backgroundColor: "#9dccba" }}
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
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
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
