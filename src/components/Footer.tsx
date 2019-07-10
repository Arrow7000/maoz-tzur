import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="Footer" id="footer">
      <p className="credits">
        Website by{" "}
        <a href="mailto:aron@adler.dev" target="_blank">
          Aron Adler
        </a>
      </p>
    </section>
  );
}

export default Footer;
