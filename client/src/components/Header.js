import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header class="header" style={{ padding: "30px" }}>
        <div class="container">
          <a href="/" class="logo">
            <img
              src="data:image/jpeg;base64,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"
              alt="Mushymate Logo"
            />
            Mushymate
          </a>
          <nav className="nav">
            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Dashboard
            </a>
            <a onClick={() => navigate("/Order")} style={{ cursor: "pointer" }}>
              Sales
            </a>
            <a
              onClick={() => navigate("/Inventory")}
              style={{ cursor: "pointer" }}
            >
              Inventory
            </a>
            <a onClick={() => navigate("/Users")} style={{ cursor: "pointer" }}>
              Users
            </a>

            <li className="dropdown" style={{ display: "inline-block" }}>
              <a style={{ cursor: "pointer" }}>Admin</a>
              <ul className="dropdown-content">
                <li>
                  <a
                    onClick={() => navigate("/AddProduct")}
                    style={{ cursor: "pointer" }}
                  >
                    Add Products
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/AddDelivery")}
                    style={{ cursor: "pointer" }}
                  >
                    Add Delivery Person
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/Complaint")}
                    style={{ cursor: "pointer" }}
                  >
                    Complaints
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/DeliveryDetails")}
                    style={{ cursor: "pointer" }}
                  >
                    Delivered Details
                  </a>
                </li>
              </ul>
            </li>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
