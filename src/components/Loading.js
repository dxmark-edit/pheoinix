// src/components/Loading.jsx
import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loader">
        <img src="/assets/Fire_pheonix.png" alt="Logo" className="loading-logo" />
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}
