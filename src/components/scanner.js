import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "./Scanner.css"; // Import the CSS file for styling

const Scanner = () => {
  const [data, setData] = useState("No result");
  const [found, setFound] = useState(null); // State to track if the ID is found

  // Predefined list of IDs
  const predefinedIds = [
    "CILAPH18315",
    "CILAPH14000",
    "FDLT210834",
    "ADLT210829",
  ];

  // Function to extract ID from data
  const extractId = (data) => {
    const dataArray = data.split(",");
    const id = dataArray[1];
    return id;
  };

  // Function to check if the extracted ID matches any predefined ID
  const checkId = (id) => {
    return predefinedIds.includes(id);
  };

  // Handle QR code scan results
  const handleScanResult = (result, error) => {
    if (!!result) {
      setData(result.text);
      const extractedId = extractId(result.text);
      const isFound = checkId(extractedId);
      setFound(isFound);
    }
    if (!!error) {
      console.error(error);
    }
  };

  // Function to reset the scanner
  const handleReset = () => {
    setData("No result");
    setFound(null);
  };

  return (
    <div className="scanner-container">
      <div className="camera-overlay" />
      <QrReader
        onResult={handleScanResult}
        style={{ width: "100%" }}
        willReadFrequently={true}
        constraints={{ aspectRatio: 1, facingMode: { ideal: "environment" } }}
      />
      <div className="result-container">
        <p className="data">{data}</p>
        <p className={found ? "found" : "not-found"}>
          {found ? "Found" : "Not found"}
        </p>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Scanner;
