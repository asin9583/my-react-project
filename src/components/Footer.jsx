import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} FANTASY. All rights reserved.</p>
      <div className="footer-links">
        <a href="/Terms and Conditions">Terms and Conditions</a>
        <a href="/Privacy Policy">Privacy Policy</a>
        <a href="/Cookie Policy">Cookie Policy</a>
      </div>
    </footer>
  );
}

export default Footer;
