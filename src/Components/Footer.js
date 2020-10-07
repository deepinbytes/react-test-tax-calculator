import React, { Component } from "react";
import "../App.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>
          Developed by{" "}
          <a
            href="https://github.com/deepinbytes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ajay P
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
