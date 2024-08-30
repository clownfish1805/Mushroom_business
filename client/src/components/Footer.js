import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer" style={{ marginTop: "180px" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div className="col" style={{ textAlign: "left" }}>
          <h5>MushyMate</h5>
          <p>
            Manage your store efficiently. Access detailed sales and user
            analytics. Customize your store preferences. Contact us for any
            admin-related assistance.
          </p>
        </div>

        <div className="col" style={{ textAlign: "left", marginLeft: "80px" }}>
          <h5>Contact Us</h5>
          <ul>
            <li>
              <a href="mailto:info@mushymate.com" target="_blank">
                <FaEnvelope style={{ fontSize: "20px", marginRight: "5px" }} />
                Email: info@mushymate.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" target="_blank">
                <FaPhone style={{ fontSize: "20px", marginRight: "5px" }} />
                Phone: +91 82xx499xx
              </a>
            </li>
            <li>
              <FaMapMarkerAlt
                style={{ fontSize: "20px", marginRight: "5px" }}
              />
              123 Street Name, City, Country
            </li>
          </ul>
        </div>

        <div className="col" style={{ textAlign: "left", flex: "1" }}>
          <h5>Social Media</h5>
          <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
            <li style={{ marginRight: "10px" }}>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram style={{ fontSize: "30px" }} />
              </a>
            </li>
            <li style={{ marginRight: "10px" }}>
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp style={{ fontSize: "30px" }} />
              </a>
            </li>
            <li>
              <a
                href="https://telegram.me/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram style={{ fontSize: "30px" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom-bar">© 2024 Copyright</div>
    </footer>
  );
};

export default Footer;
