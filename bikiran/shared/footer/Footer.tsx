"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p>© </p>
          <p>Bikiran. 2025</p>
        </div>
        <div className="flex">
          <p>
            Made with By:{" "}
            <button
              onClick={() => window.open("https://www.bikiran.com/")}
              className="text-pink"
            >
              BIKIRAN
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
